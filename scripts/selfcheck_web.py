"""Minimal end-to-end check for a running local web service."""

import base64
import hashlib
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
from app.utils.gotify import build_gotify_message_url, notify_gotify
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


def check_session_keeper_proactively_renews():
    original = file_utils.SESSION_CACHE_FILE
    try:
        with tempfile.TemporaryDirectory() as directory:
            file_utils.SESSION_CACHE_FILE = str(Path(directory) / "session.json")
            file_utils.save_session_cache(
                "old-session",
                "old-encrypt",
                "open",
                "union",
            )
            cache = file_utils.load_session_cache()
            cache["timestamp"] = int(time.time()) - 6 * 60
            Path(file_utils.SESSION_CACHE_FILE).write_text(
                json.dumps(cache),
                encoding="utf-8",
            )
            keeper = SessionKeeper(TaskManager(), interval_minutes=5)

            def renew(_config, stale_session_id=None):
                assert stale_session_id == "old-session"
                file_utils.save_session_cache(
                    "new-session",
                    "new-encrypt",
                    "open",
                    "union",
                )
                return file_utils.get_valid_session_cache()

            with (
                patch("webapp.runtime.auto_login", side_effect=renew) as rotate,
                patch(
                    "webapp.runtime.read_config",
                    return_value={"input": {}},
                ),
            ):
                keeper._tick()
            rotate.assert_called_once()
            assert file_utils.get_valid_session_cache()["sessionId"] == "new-session"
            assert keeper.snapshot()["status"] == "active"
            assert keeper.snapshot()["nextAttemptAt"]
    finally:
        file_utils.SESSION_CACHE_FILE = original


def check_invalid_session_requires_reinitialization():
    original = file_utils.SESSION_CACHE_FILE
    try:
        with tempfile.TemporaryDirectory() as directory:
            file_utils.SESSION_CACHE_FILE = str(Path(directory) / "session.json")
            file_utils.save_session_cache(
                "expired-session",
                "expired-encrypt",
                "open",
                "union",
            )
            file_utils.invalidate_session_cache()
            keeper = SessionKeeper(TaskManager(), interval_minutes=5)
            with patch("webapp.runtime.auto_login") as rotate:
                keeper._tick()
            rotate.assert_not_called()
            status = keeper.snapshot()
            assert status["status"] == "reauth_required"
            assert status["credentialAvailable"] is False
            assert "重新获取 Code" in status["lastError"]
    finally:
        file_utils.SESSION_CACHE_FILE = original


def check_device_platform_consistency():
    device = {
        "brand": "OnePlus",
        "model": "PHP110",
        "system": "Android 15",
        "platform": "ios",
    }
    assert "平台矛盾" in file_utils.validate_user_agent_matches_device(
        device,
        file_utils.build_user_agent(device),
    )


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


def check_proactive_session_rotation():
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
            with (
                patch.object(
                    xybsyw,
                    "_build_security_context",
                    return_value={"params": {}, "url_token": "token"},
                ) as build_security,
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
            build_security.assert_called_once_with(
                {"encryptValue": "old-encrypt"},
                config,
                args={"sessionId": "old-session"},
            )
    finally:
        file_utils.SESSION_CACHE_FILE = original


def check_task_does_not_retry_expired_session():
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
        patch("webapp.runtime.auto_login") as rotate,
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
    assert manager.snapshot()["status"] == "failed"
    assert "重新获取 Code" in manager.snapshot()["message"]
    assert calls == 1
    rotate.assert_not_called()


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


def check_stable_security_context():
    original = xybsyw.SECURITY_FINGERPRINT_FILE
    response = SimpleNamespace(
        status_code=200,
        text='{"code":"200","data":"1120-token"}',
        json=lambda: {"code": "200", "data": "1120-token"},
    )
    try:
        with tempfile.TemporaryDirectory() as directory:
            xybsyw.SECURITY_FINGERPRINT_FILE = (
                Path(directory) / "xyb_security_device_fp"
            )
            first = xybsyw._security_fingerprint({})
            second = xybsyw._security_fingerprint({})
            assert first == second
            assert xybsyw.SECURITY_FINGERPRINT_FILE.read_text() == first

            xybsyw._security_token_cache.clear()
            with patch.object(
                xybsyw.requests,
                "post",
                return_value=response,
            ) as post:
                assert xybsyw._fetch_security_token(
                    {"userAgent": "test"},
                    first,
                ) == "1120-token"
                assert xybsyw._fetch_security_token(
                    {"userAgent": "test"},
                    first,
                ) == "1120-token"
            post.assert_called_once()
    finally:
        xybsyw.SECURITY_FINGERPRINT_FILE = original
        xybsyw._security_token_cache.clear()


def check_security_token_fallback_matches_594():
    with (
        patch.object(xybsyw, "_security_fingerprint", return_value="f" * 32),
        patch.object(
            xybsyw,
            "_fetch_security_token",
            side_effect=RuntimeError("token unavailable"),
        ),
    ):
        context = xybsyw._build_security_context(
            {"username": "account"},
            {},
        )
    assert context["url_token"] == "5381"
    assert context["params"]["st"] == ""
    assert context["params"]["fp"] == "f" * 32


def check_account_password_recovery():
    original = file_utils.SESSION_CACHE_FILE
    png = base64.b64encode(b"\x89PNG\r\n\x1a\nselfcheck").decode("ascii")

    def response(payload):
        return SimpleNamespace(
            status_code=200,
            text=json.dumps(payload),
            json=lambda: payload,
        )

    class FakeCookies:
        def __init__(self):
            self.values = {}

        def set(self, key, value):
            self.values[key] = value

    class FakeClient:
        def __init__(self):
            self.cookies = FakeCookies()
            self.calls = []
            self.closed = False

        def post(self, url, **kwargs):
            self.calls.append((url, kwargs))
            if url.endswith("loadCaptcha.action"):
                return response({"code": "200", "data": png, "msg": "操作成功"})
            return response(
                {
                    "code": "200",
                    "data": {
                        "sessionId": "password-session",
                        "encryptValue": "password-encrypt",
                    },
                    "msg": "操作成功",
                }
            )

        def close(self):
            self.closed = True

    config = {
        "userAgent": "test",
        "device": {
            "brand": "OnePlus",
            "model": "PHP110",
            "system": "Android 15",
            "platform": "android",
        },
    }
    client = FakeClient()
    try:
        with tempfile.TemporaryDirectory() as directory:
            file_utils.SESSION_CACHE_FILE = str(Path(directory) / "session.json")
            file_utils.save_session_cache("expired", "old-encrypt")
            file_utils.invalidate_session_cache()
            xybsyw.clear_account_login_challenges()
            with (
                patch.object(xybsyw.requests, "Session", return_value=client),
                patch.object(
                    xybsyw,
                    "_build_security_context",
                    return_value={"params": {}, "url_token": "5381"},
                ),
                patch.object(xybsyw, "get_device_code", return_value="device"),
                patch.object(xybsyw, "_reset_security_context"),
            ):
                challenge = xybsyw.create_account_login_challenge(config)
                assert challenge["image"].startswith("data:image/png;base64,")
                renewed = xybsyw.account_password_login(
                    config,
                    challenge["challengeId"],
                    "15600000000",
                    "password",
                    "ABCD",
                )

            assert renewed["sessionId"] == "password-session"
            assert renewed["openId"] == ""
            login_data = client.calls[1][1]["data"]
            assert login_data["picCode"] == "ABCD"
            assert login_data["password"] == hashlib.md5(
                b"password"
            ).hexdigest()
            assert login_data["password"] != "password"
            assert client.closed is True
            assert xybsyw._redact_for_log(
                {
                    "JSESSIONID": "session",
                    "password": login_data["password"],
                    "safe": "visible",
                }
            ) == {
                "JSESSIONID": "***",
                "password": "***",
                "safe": "visible",
            }
            assert file_utils.get_valid_session_cache()["encryptValue"] == (
                "password-encrypt"
            )
    finally:
        xybsyw.clear_account_login_challenges()
        file_utils.SESSION_CACHE_FILE = original


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


def check_gotify_notification():
    response = SimpleNamespace(
        text='{"id":1}',
        raise_for_status=lambda: None,
    )
    with patch("app.utils.gotify.requests.post", return_value=response) as post:
        result = notify_gotify(
            title="签到成功",
            content="定时任务已完成",
            server_url="https://push.example.com/",
            token="A-test-token",
        )
    assert result == '{"id":1}'
    post.assert_called_once_with(
        "https://push.example.com/message",
        headers={"X-Gotify-Key": "A-test-token"},
        json={
            "title": "签到成功",
            "message": "定时任务已完成",
            "priority": 5,
        },
        timeout=15,
    )
    try:
        build_gotify_message_url("file:///tmp/message")
    except ValueError:
        pass
    else:
        raise AssertionError("Gotify URL should require HTTP(S)")


def main():
    check_session_cache_has_no_local_expiry()
    check_session_keeper_proactively_renews()
    check_invalid_session_requires_reinitialization()
    check_device_platform_consistency()
    check_consumed_code_message()
    check_proactive_session_rotation()
    check_task_does_not_retry_expired_session()
    check_random_image_rotation()
    check_stable_security_context()
    check_security_token_fallback_matches_594()
    check_account_password_recovery()
    check_chinese_watermark_font()
    check_gotify_notification()
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
