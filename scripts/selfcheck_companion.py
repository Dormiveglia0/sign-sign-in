from __future__ import annotations

import sys
import time
from pathlib import Path
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from app.companion import config as companion_config
from app.companion import runner as companion_runner
from app.config.common import XYB_APP_ID
from webapp import companion_auth


def check_pairing_token_lifecycle() -> None:
    stored: dict = {}

    def write_auth(_path, payload):
        stored.clear()
        stored.update(payload)

    with (
        patch.object(companion_auth, "_atomic_write", side_effect=write_auth),
        patch.object(companion_auth, "_read_auth", side_effect=lambda: dict(stored)),
        patch.object(companion_auth, "AUTH_FILE", ROOT / ".selfcheck-no-auth"),
    ):
        companion_auth.revoke_companion()
        pairing = companion_auth.issue_pairing_code()
        assert pairing["expiresInSeconds"] == 600
        try:
            companion_auth.exchange_pairing_code(
                "WRONG-CODE",
                client_ip="127.0.0.1",
            )
        except ValueError:
            pass
        else:
            raise AssertionError("Invalid pairing code should fail")

        token = companion_auth.exchange_pairing_code(
            pairing["code"],
            device_name="Selfcheck",
            client_ip="127.0.0.1",
        )
        assert token.startswith(companion_auth.TOKEN_PREFIX)
        assert token not in str(stored)
        assert companion_auth.verify_companion_token(token)
        assert not companion_auth.verify_companion_token(token + "x")
        snapshot = companion_auth.companion_snapshot()
        assert snapshot["configured"] is True
        assert snapshot["deviceName"] == "Selfcheck"
        assert snapshot["lastSeenAt"]

        try:
            companion_auth.exchange_pairing_code(
                pairing["code"],
                client_ip="127.0.0.1",
            )
        except ValueError:
            pass
        else:
            raise AssertionError("Pairing code must be single use")

        companion_auth.revoke_companion()
        stored.clear()
        assert companion_auth.companion_snapshot()["configured"] is False


def check_windows_token_storage() -> None:
    token = "ssi_companion_selfcheck_secret"
    protected = companion_config.protect_token(token)
    assert token not in protected
    assert companion_config.unprotect_token(protected) == token


def check_refresh_schedule() -> None:
    config = {
        "last_refresh_at": int(time.time()),
        "refresh_interval_hours": 24,
    }
    assert companion_config.refresh_due(config, {"needsRefresh": True})
    assert companion_config.refresh_due(
        config,
        {"needsRefresh": False},
        force=True,
    )
    assert not companion_config.refresh_due(config, {"needsRefresh": False})
    config["last_refresh_at"] = int(time.time()) - 25 * 3600
    assert companion_config.refresh_due(config, {"needsRefresh": False})


def check_server_url_policy() -> None:
    assert (
        companion_config.normalize_server_url("http://192.168.2.1:8787/")
        == "http://192.168.2.1:8787"
    )
    assert (
        companion_config.normalize_server_url("https://sign.example.com")
        == "https://sign.example.com"
    )
    try:
        companion_config.normalize_server_url("http://sign.example.com")
    except ValueError:
        pass
    else:
        raise AssertionError("Public companion server must require HTTPS")


def check_wechat_launch_protocol() -> None:
    opened: list[str] = []
    with patch.object(
        companion_runner,
        "open_path_or_url",
        side_effect=opened.append,
    ):
        companion_runner._wake_wechat_applet(retries=1)
    assert opened == [
        f"weixin://launchapplet/?app_id={XYB_APP_ID}",
    ]


def check_wechat_runtime_shutdown_waits() -> None:
    class FakeProcess:
        info = {"name": "WeChatAppEx.exe"}

        def __init__(self):
            self.killed = False

        def kill(self):
            self.killed = True

    process = FakeProcess()
    with (
        patch.object(companion_runner.psutil, "process_iter", return_value=[process]),
        patch.object(companion_runner.psutil, "wait_procs") as wait_procs,
        patch.object(companion_runner.time, "sleep") as sleep,
    ):
        assert companion_runner._stop_applet_renderers() == 1
    assert process.killed
    wait_procs.assert_called_once_with([process], timeout=5)
    sleep.assert_called_once_with(1)


def main() -> None:
    check_pairing_token_lifecycle()
    check_windows_token_storage()
    check_refresh_schedule()
    check_server_url_policy()
    check_wechat_launch_protocol()
    check_wechat_runtime_shutdown_waits()
    print("credential companion self-check passed")


if __name__ == "__main__":
    main()
