"""Minimal end-to-end check for a running local web service."""

import json
import os
import tempfile
import time
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

import requests
from PIL import Image

from app.apis import xybsyw
from app.mitm.embedded_runner import build_mitmdump_args
from app.mitm.service import MitmService
from app.utils import files as file_utils
from webapp import runtime as runtime_module
from webapp import security as web_security
from webapp.runtime import ImageRotation, SessionKeeper, TaskManager


def check_session_cache_has_no_local_expiry():
    original = file_utils.SESSION_CACHE_FILE
    try:
        with tempfile.TemporaryDirectory() as directory:
            file_utils.SESSION_CACHE_FILE = str(Path(directory) / "session.json")
            file_utils.save_session_cache("session", "encrypt", "open", "union")
            cache = file_utils.load_session_cache()
            cache.update({"timestamp": 1, "expire_seconds": 1})
            Path(file_utils.SESSION_CACHE_FILE).write_text(
                json.dumps(cache),
                encoding="utf-8",
            )
            assert file_utils.get_valid_session_cache()["sessionId"] == "session"
    finally:
        file_utils.SESSION_CACHE_FILE = original


def check_consumed_code_message():
    response = SimpleNamespace(
        json=lambda: {"code": "202", "msg": "获取openid失败！"},
        text='{"code":"202"}',
    )
    config = {"device": {}, "userAgent": "test"}
    with (
        patch.object(
            xybsyw,
            "_build_security_context",
            return_value={"params": {}, "url_token": ""},
        ),
        patch.object(xybsyw, "get_device_code", return_value=""),
        patch.object(xybsyw.requests, "post", return_value=response),
    ):
        try:
            xybsyw.get_open_id(config, "used-code")
        except RuntimeError as exc:
            assert "请求发送前设置断点" in str(exc)
        else:
            raise AssertionError("Consumed Code should fail")


def check_silent_session_renewal():
    original = file_utils.SESSION_CACHE_FILE
    config = {
        "userAgent": "test",
        "device": {
            "brand": "OnePlus",
            "model": "PHP110",
            "system": "Android 15",
            "platform": "android",
        },
    }
    response = SimpleNamespace(
        status_code=200,
        json=lambda: {
            "code": "200",
            "data": {
                "sessionId": "new-session",
                "encryptValue": "new-encrypt",
            },
        },
    )
    try:
        with tempfile.TemporaryDirectory() as directory:
            file_utils.SESSION_CACHE_FILE = str(Path(directory) / "session.json")
            file_utils.save_session_cache(
                "old-session",
                "old-encrypt",
                "open",
                "union",
            )
            xybsyw.handle_invalid_session()
            assert file_utils.get_valid_session_cache() is None
            assert file_utils.load_session_cache()["encryptValue"] == "old-encrypt"
            with (
                patch.object(
                    xybsyw,
                    "_build_security_context",
                    return_value={"params": {}, "url_token": "token"},
                ),
                patch.object(xybsyw, "get_device_code", return_value="device"),
                patch.object(
                    xybsyw.requests,
                    "post",
                    return_value=response,
                ) as post,
            ):
                renewed = xybsyw.auto_login(config)
            assert renewed["sessionId"] == "new-session"
            assert renewed["openId"] == "open"
            assert file_utils.get_valid_session_cache()["encryptValue"] == "new-encrypt"
            _, request = post.call_args
            assert request["data"]["encryptValue"] == "old-encrypt"
            assert request["cookies"]["JSESSIONID"] == "old-session"
            assert request["headers"]["devicecode"] == "device"
    finally:
        file_utils.SESSION_CACHE_FILE = original


def check_task_retries_after_silent_renewal():
    manager = TaskManager()
    calls = 0

    def target(_flow):
        nonlocal calls
        calls += 1
        if calls == 1:
            try:
                raise xybsyw.SessionExpired("expired")
            except xybsyw.SessionExpired as exc:
                raise RuntimeError("wrapped") from exc
        return {"ok": True}

    with (
        patch("webapp.runtime.auto_login") as renew,
        patch("webapp.runtime._save_history"),
        patch.object(TaskManager, "_notify_result"),
    ):
        manager._start(
            mode="in",
            action="check",
            source="selfcheck",
            target=target,
        )
        manager.thread.join(timeout=3)
    assert manager.snapshot()["status"] == "success"
    assert calls == 2
    renew.assert_called_once()


def check_random_image_rotation():
    with tempfile.TemporaryDirectory() as directory:
        root = Path(directory)
        images = [root / name for name in ("a.jpg", "b.jpg", "c.jpg")]
        for image in images:
            image.touch()
        history = root / "history.json"
        with (
            patch.object(runtime_module, "SCHEDULE_IMAGE_HISTORY_FILE", history),
            patch.object(
                runtime_module,
                "list_images",
                return_value=[str(image) for image in images],
            ),
            patch.object(
                runtime_module.random,
                "choice",
                side_effect=lambda values: values[0],
            ),
        ):
            rotation = ImageRotation()
            assert Path(rotation.choose(remember=False)).name == "a.jpg"
            assert not history.exists()
            selected = [
                Path(rotation.choose(remember=True)).name for _ in range(4)
            ]
            assert selected == ["a.jpg", "b.jpg", "c.jpg", "a.jpg"]
            assert rotation.snapshot() == {"used": 1, "total": 3, "remaining": 2}


def check_session_keeper_status():
    manager = TaskManager()
    keeper = SessionKeeper(manager)
    now = int(time.time())
    cache = {
        "sessionId": "session",
        "encryptValue": "encrypt",
        "openId": "open",
        "unionId": "union",
        "timestamp": now,
        "valid": True,
    }
    with (
        patch.object(runtime_module, "load_session_cache", return_value=cache),
        patch.object(runtime_module, "read_config", return_value={"input": {}}),
        patch.object(runtime_module, "auto_login", return_value=cache),
    ):
        state = keeper.renew()
    assert state["status"] == "active"
    assert state["credentialAvailable"] is True
    assert state["lastSuccessAt"]
    assert state["nextAttemptAt"]

    retrying = SessionKeeper(manager)
    with (
        patch.object(runtime_module, "load_session_cache", return_value=cache),
        patch.object(runtime_module, "read_config", return_value={"input": {}}),
        patch.object(
            runtime_module,
            "auto_login",
            side_effect=RuntimeError("temporary failure"),
        ),
    ):
        try:
            retrying.renew()
        except RuntimeError:
            pass
        else:
            raise AssertionError("Failed renewal should be retried")
        state = retrying.snapshot()
    assert state["status"] == "retrying"
    assert state["nextAttemptAt"]
    assert state["lastError"] == "temporary failure"


def check_chinese_watermark_font():
    font = xybsyw._load_watermark_font(28)
    assert Path(font.path).name == "WenQuanYiZenHei.ttc"
    with tempfile.TemporaryDirectory() as directory:
        source = Path(directory) / "source.jpg"
        Image.new("RGB", (1200, 500), "#4b6575").save(source)
        output = xybsyw.render_watermarked_photo(
            str(source),
            {"time": "08:30", "today": "星期一", "info": "拍照签到"},
            "北京市海淀区中关村",
        )
        try:
            with Image.open(output) as image:
                assert image.size == (960, 400)
                assert image.getbbox()
        finally:
            Path(output).unlink(missing_ok=True)


def main():
    check_session_cache_has_no_local_expiry()
    check_consumed_code_message()
    check_silent_session_renewal()
    check_task_retries_after_silent_renewal()
    check_random_image_rotation()
    check_session_keeper_status()
    check_chinese_watermark_font()
    capture_command = MitmService(
        host="0.0.0.0",
        allowed_client_ip="203.0.113.7",
    )._build_launch_command()
    assert capture_command[-2:] == ["--allow-client", "203.0.113.7"]
    mitmdump_args = build_mitmdump_args(
        SimpleNamespace(
            host="0.0.0.0",
            port=13140,
            addon="addon.py",
            confdir="conf",
            allow_client="203.0.113.7",
        )
    )
    assert "--allow-hosts" in mitmdump_args

    base_url = os.environ.get("SIGN_WEB_TEST_URL", "http://127.0.0.1:8787")
    session = requests.Session()

    for _ in range(40):
        try:
            if session.get(f"{base_url}/api/health", timeout=1).status_code == 200:
                break
        except requests.RequestException:
            pass
        time.sleep(0.25)
    else:
        raise AssertionError("Web service did not become ready")

    assert session.get(f"{base_url}/api/status", timeout=3).status_code == 401
    password = Path(".runtime/initial_admin_password.txt").read_text(
        encoding="utf-8"
    ).strip()
    response = session.post(
        f"{base_url}/api/auth/login",
        json={"username": "admin", "password": password},
        timeout=5,
    )
    assert response.status_code == 200, response.text
    admin_cookie = next(
        cookie
        for cookie in session.cookies
        if cookie.name == "ssi_session"
    )
    assert admin_cookie.expires is None
    assert "exp" not in web_security.verify_session(admin_cookie.value)
    assert session.get(f"{base_url}/api/status", timeout=5).status_code == 200
    for path in (
        "/api/config",
        "/api/schedules",
        "/api/images",
        "/api/logs",
        "/api/tasks/history",
        "/api/jielong/settings",
    ):
        response = session.get(f"{base_url}{path}", timeout=5)
        assert response.status_code == 200, f"{path}: {response.text}"
    assert "SignSignIn" in session.get(f"{base_url}/", timeout=5).text

    csrf = session.cookies["ssi_csrf"]
    response = session.post(
        f"{base_url}/api/capture",
        headers={"X-CSRF-Token": csrf},
        timeout=5,
    )
    assert response.status_code == 200, response.text
    for _ in range(40):
        capture = session.get(f"{base_url}/api/status", timeout=5).json()["capture"]
        if capture["status"] != "starting":
            break
        time.sleep(0.25)
    assert capture["status"] == "waiting", capture
    assert isinstance(capture["events"], list)
    assert capture["diagnosis"]
    assert (
        session.get(f"{base_url}/api/capture/certificate", timeout=5).status_code
        == 200
    )
    response = session.delete(
        f"{base_url}/api/capture",
        headers={"X-CSRF-Token": csrf},
        timeout=5,
    )
    assert response.status_code == 200, response.text

    user_agent_payload = {
        "brand": "OnePlus",
        "model": "PHP110",
        "system": "Android 15",
        "platform": "android",
    }
    assert (
        session.post(
            f"{base_url}/api/config/user-agent",
            json=user_agent_payload,
            timeout=5,
        ).status_code
        == 403
    )
    response = session.post(
        f"{base_url}/api/config/user-agent",
        json=user_agent_payload,
        headers={"X-CSRF-Token": csrf},
        timeout=5,
    )
    assert response.status_code == 200, response.text
    assert "PHP110" in response.json()["userAgent"]

    response = session.post(
        f"{base_url}/api/auth/logout",
        headers={"X-CSRF-Token": csrf},
        timeout=5,
    )
    assert response.status_code == 200, response.text
    assert session.get(f"{base_url}/api/status", timeout=3).status_code == 401
    print("web self-check passed")


if __name__ == "__main__":
    main()
