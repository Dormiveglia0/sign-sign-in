"""Minimal end-to-end check for a running local web service."""

import json
import os
import sys
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


def check_valid_session_is_not_proactively_renewed():
    original = file_utils.SESSION_CACHE_FILE
    try:
        with tempfile.TemporaryDirectory() as directory:
            file_utils.SESSION_CACHE_FILE = str(Path(directory) / "session.json")
            file_utils.save_session_cache("session", "encrypt", "open", "union")
            cache = file_utils.load_session_cache()
            cache["timestamp"] = 1
            Path(file_utils.SESSION_CACHE_FILE).write_text(
                json.dumps(cache),
                encoding="utf-8",
            )
            with patch.object(xybsyw, "auto_login") as renew:
                assert xybsyw.login({}, use_cache=True)["sessionId"] == "session"
            renew.assert_not_called()
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


def check_wechat_bound_login_fallback():
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

    def response(payload):
        return SimpleNamespace(
            status_code=200,
            text=json.dumps(payload),
            json=lambda: payload,
        )

    responses = [
        response({"code": "202", "data": None, "msg": "操作失败"}),
        response(
            {
                "code": "200",
                "data": {"bind": True, "sessionId": "bind-session"},
            }
        ),
        response(
            {
                "code": "200",
                "data": {
                    "sessionId": "new-session",
                    "encryptValue": "new-encrypt",
                },
            }
        ),
    ]
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
                ),
                patch.object(xybsyw, "get_device_code", return_value="device"),
                patch.object(
                    xybsyw.requests,
                    "post",
                    side_effect=responses,
                ) as post,
            ):
                renewed = xybsyw.auto_login(config)

            assert renewed["sessionId"] == "new-session"
            assert file_utils.load_session_cache()["encryptValue"] == "new-encrypt"
            calls = post.call_args_list
            assert calls[1].args[0].endswith("login!checkWxBind.action")
            assert calls[2].args[0].endswith("login!wx.action")
            assert calls[2].kwargs["cookies"] == {"JSESSIONID": "bind-session"}
    finally:
        file_utils.SESSION_CACHE_FILE = original


def check_recovery_rejection_requires_new_code():
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

    def response(payload):
        return SimpleNamespace(
            status_code=200,
            text=json.dumps(payload),
            json=lambda: payload,
        )

    rejected = response({"code": "202", "data": None, "msg": "操作失败"})
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
                ),
                patch.object(xybsyw, "get_device_code", return_value="device"),
                patch.object(
                    xybsyw.requests,
                    "post",
                    side_effect=[rejected, rejected],
                ),
            ):
                try:
                    xybsyw.auto_login(config)
                except xybsyw.CredentialRecoveryError as exc:
                    assert exc.reauth_required is True
                    assert "AutoLogin=操作失败" in str(exc)
                else:
                    raise AssertionError("Rejected recovery should require a new Code")

            cache = file_utils.load_session_cache()
            assert cache["recoveryRequired"] is True
            assert cache["valid"] is False
            assert file_utils.get_valid_session_cache() is None

            file_utils.save_session_cache(
                "fresh-session",
                "fresh-encrypt",
                "open",
                "union",
            )
            assert "recoveryRequired" not in file_utils.load_session_cache()
    finally:
        file_utils.SESSION_CACHE_FILE = original


def check_transient_recovery_failure_remains_retryable():
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
    rejected = SimpleNamespace(
        status_code=200,
        text='{"code":"202","msg":"操作失败"}',
        json=lambda: {"code": "202", "data": None, "msg": "操作失败"},
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
                ),
                patch.object(xybsyw, "get_device_code", return_value="device"),
                patch.object(
                    xybsyw.requests,
                    "post",
                    side_effect=[rejected, requests.ConnectionError("offline")],
                ),
            ):
                try:
                    xybsyw.auto_login(config)
                except xybsyw.CredentialRecoveryError as exc:
                    assert exc.reauth_required is False
                else:
                    raise AssertionError("Transient recovery failure should be surfaced")

            cache = file_utils.load_session_cache()
            assert cache.get("recoveryRequired") is not True
            assert cache["valid"] is True
    finally:
        file_utils.SESSION_CACHE_FILE = original


def check_session_keeper_renews_old_credentials():
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
            cache["timestamp"] = 1
            Path(file_utils.SESSION_CACHE_FILE).write_text(
                json.dumps(cache),
                encoding="utf-8",
            )
            with patch(
                "webapp.runtime.auto_login",
                return_value={"sessionId": "new-session"},
            ) as renew:
                keeper = SessionKeeper(TaskManager())
                keeper._tick()
            renew.assert_called_once()
            assert keeper.snapshot()["status"] == "active"
            assert keeper.snapshot()["intervalMinutes"] == 45
    finally:
        file_utils.SESSION_CACHE_FILE = original


def check_session_keeper_blocks_tasks_after_rejection():
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
            cache["timestamp"] = 1
            Path(file_utils.SESSION_CACHE_FILE).write_text(
                json.dumps(cache),
                encoding="utf-8",
            )

            manager = TaskManager()
            keeper = SessionKeeper(manager)
            manager.configure_credentials(
                guard=keeper.can_run_tasks,
                changed_callback=keeper.notify_credentials_changed,
            )
            with patch(
                "webapp.runtime.auto_login",
                side_effect=xybsyw.CredentialRecoveryError(
                    "恢复链已被拒绝",
                    reauth_required=True,
                ),
            ):
                keeper._tick()

            snapshot = keeper.snapshot()
            assert snapshot["status"] == "reauth_required"
            assert snapshot["nextAttemptAt"] is None
            assert snapshot["credentialAvailable"] is False
            assert keeper.retry_at == 0
            try:
                manager.start_sign("in", source="selfcheck")
            except RuntimeError as exc:
                assert "重新初始化" in str(exc)
            else:
                raise AssertionError("Signing must be blocked after recovery rejection")

            file_utils.save_session_cache(
                "fresh-session",
                "fresh-encrypt",
                "open",
                "union",
            )
            keeper.notify_credentials_changed()
            assert keeper.snapshot()["status"] == "active"
            assert keeper.can_run_tasks() == (True, "")
    finally:
        file_utils.SESSION_CACHE_FILE = original


def check_session_keeper_retries_transient_failure():
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
            cache["timestamp"] = 1
            Path(file_utils.SESSION_CACHE_FILE).write_text(
                json.dumps(cache),
                encoding="utf-8",
            )
            keeper = SessionKeeper(TaskManager())
            with patch(
                "webapp.runtime.auto_login",
                side_effect=xybsyw.CredentialRecoveryError(
                    "网络暂时不可用",
                    reauth_required=False,
                ),
            ):
                keeper._tick()

            snapshot = keeper.snapshot()
            assert snapshot["status"] == "retrying"
            assert snapshot["nextAttemptAt"]
            assert keeper.retry_at > int(time.time())
            assert file_utils.load_session_cache().get("recoveryRequired") is not True
    finally:
        file_utils.SESSION_CACHE_FILE = original


def check_task_history_redacts_credentials():
    original = runtime_module.TASK_HISTORY_FILE
    try:
        with tempfile.TemporaryDirectory() as directory:
            runtime_module.TASK_HISTORY_FILE = Path(directory) / "history.json"
            runtime_module.TASK_HISTORY_FILE.write_text(
                json.dumps(
                    [
                        {
                            "id": "old",
                            "mode": "session",
                            "status": "success",
                            "result": {
                                "sessionId": "secret-session",
                                "encryptValue": "secret-encrypt",
                                "openId": "secret-open",
                                "unionId": "secret-union",
                            },
                        }
                    ]
                ),
                encoding="utf-8",
            )
            history = runtime_module._load_history()
            assert history[0]["result"] == {"credentialsUpdated": True}
            persisted = runtime_module.TASK_HISTORY_FILE.read_text(encoding="utf-8")
            assert "secret-session" not in persisted
            assert "secret-encrypt" not in persisted

            manager = TaskManager()
            with patch.object(TaskManager, "_notify_result"):
                manager._start(
                    mode="session",
                    action="refresh",
                    source="selfcheck",
                    target=lambda _flow: {
                        "sessionId": "new-secret-session",
                        "encryptValue": "new-secret-encrypt",
                    },
                )
                manager.thread.join(timeout=3)
            assert manager.snapshot()["result"] == {"credentialsUpdated": True}
            assert manager.history_snapshot()[0]["result"] == {
                "credentialsUpdated": True
            }
    finally:
        runtime_module.TASK_HISTORY_FILE = original


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


def run_logic_checks():
    check_session_cache_has_no_local_expiry()
    check_valid_session_is_not_proactively_renewed()
    check_device_platform_consistency()
    check_consumed_code_message()
    check_silent_session_renewal()
    check_wechat_bound_login_fallback()
    check_recovery_rejection_requires_new_code()
    check_transient_recovery_failure_remains_retryable()
    check_session_keeper_renews_old_credentials()
    check_session_keeper_blocks_tasks_after_rejection()
    check_session_keeper_retries_transient_failure()
    check_task_history_redacts_credentials()
    check_task_retries_after_silent_renewal()
    check_random_image_rotation()
    check_stable_security_context()
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


def main():
    run_logic_checks()
    if "--unit-only" in sys.argv:
        print("Logic self-check passed")
        return

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
