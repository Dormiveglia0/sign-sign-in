from urllib.parse import urlsplit

import requests


def build_gotify_message_url(server_url: str) -> str:
    server_url = (server_url or "").strip().rstrip("/")
    parsed = urlsplit(server_url)
    if (
        parsed.scheme not in {"http", "https"}
        or not parsed.netloc
        or parsed.query
        or parsed.fragment
    ):
        raise ValueError("Gotify 服务器地址必须是有效的 HTTP(S) URL")
    return server_url if parsed.path.endswith("/message") else f"{server_url}/message"


def get_gotify_config(settings: dict) -> tuple[str, str]:
    url = ""
    token = ""
    for item in settings.get("notifications") or []:
        if isinstance(item, dict) and item.get("type") == "gotify":
            url = str(item.get("url") or "").strip()
            token = str(item.get("token") or "").strip()
            break
    gotify = settings.get("gotify") or {}
    if isinstance(gotify, dict):
        url = url or str(gotify.get("url") or "").strip()
        token = token or str(gotify.get("token") or "").strip()
    return url, token


def notify_gotify(
    title: str,
    content: str,
    server_url: str,
    token: str,
) -> str:
    token = (token or "").strip()
    if not token:
        raise ValueError("Gotify 应用 Token 不能为空")

    resp = requests.post(
        build_gotify_message_url(server_url),
        headers={"X-Gotify-Key": token},
        json={
            "title": title,
            "message": content,
            "priority": 5,
        },
        timeout=15,
    )
    resp.raise_for_status()
    return (resp.text or "").strip()
