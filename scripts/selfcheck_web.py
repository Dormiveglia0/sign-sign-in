"""Minimal end-to-end check for a running local web service."""

import os
import time
from pathlib import Path

import requests

from app.mitm.service import MitmService


def main():
    capture_command = MitmService(
        host="0.0.0.0",
        allowed_client_ip="203.0.113.7",
    )._build_launch_command()
    assert capture_command[-2:] == ["--allow-client", "203.0.113.7"]

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
