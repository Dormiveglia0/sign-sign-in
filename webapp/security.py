from __future__ import annotations

import base64
import hashlib
import hmac
import json
import os
import secrets
import time
from pathlib import Path

from fastapi import HTTPException, Request, status

from app.config.common import BASE_DIR

RUNTIME_DIR = Path(BASE_DIR) / ".runtime"
SECURITY_FILE = RUNTIME_DIR / "web_security.json"
INITIAL_PASSWORD_FILE = RUNTIME_DIR / "initial_admin_password.txt"
SESSION_COOKIE = "ssi_session"
CSRF_COOKIE = "ssi_csrf"

_login_failures: dict[str, tuple[int, float]] = {}


def _b64encode(value: bytes) -> str:
    return base64.urlsafe_b64encode(value).decode().rstrip("=")


def _b64decode(value: str) -> bytes:
    return base64.urlsafe_b64decode(value + "=" * (-len(value) % 4))


def _atomic_write(path: Path, payload: dict) -> None:
    RUNTIME_DIR.mkdir(parents=True, exist_ok=True)
    temp_path = path.with_suffix(".tmp")
    with temp_path.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2)
    os.chmod(temp_path, 0o600)
    os.replace(temp_path, path)


def _password_hash(password: str, salt: bytes) -> str:
    digest = hashlib.scrypt(
        password.encode(),
        salt=salt,
        n=2**14,
        r=8,
        p=1,
        dklen=32,
    )
    return _b64encode(digest)


def ensure_security_config() -> tuple[dict, str]:
    if SECURITY_FILE.exists():
        with SECURITY_FILE.open("r", encoding="utf-8") as handle:
            return json.load(handle), ""

    password = secrets.token_urlsafe(15)
    salt = secrets.token_bytes(16)
    config = {
        "username": "admin",
        "password_salt": _b64encode(salt),
        "password_hash": _password_hash(password, salt),
        "signing_secret": _b64encode(secrets.token_bytes(32)),
        "session_version": 1,
    }
    _atomic_write(SECURITY_FILE, config)
    INITIAL_PASSWORD_FILE.write_text(password + "\n", encoding="utf-8")
    os.chmod(INITIAL_PASSWORD_FILE, 0o600)
    return config, password


def read_security_config() -> dict:
    return ensure_security_config()[0]


def verify_password(username: str, password: str) -> bool:
    config = read_security_config()
    if not hmac.compare_digest(str(username), str(config["username"])):
        return False
    salt = _b64decode(config["password_salt"])
    candidate = _password_hash(str(password), salt)
    return hmac.compare_digest(candidate, config["password_hash"])


def change_password(current_password: str, new_password: str) -> None:
    config = read_security_config()
    if not verify_password(config["username"], current_password):
        raise HTTPException(status_code=400, detail="当前密码不正确")
    if len(new_password) < 12:
        raise HTTPException(status_code=422, detail="新密码至少需要 12 个字符")
    salt = secrets.token_bytes(16)
    config["password_salt"] = _b64encode(salt)
    config["password_hash"] = _password_hash(new_password, salt)
    config["session_version"] = int(config.get("session_version", 1)) + 1
    _atomic_write(SECURITY_FILE, config)
    INITIAL_PASSWORD_FILE.unlink(missing_ok=True)


def create_session() -> tuple[str, str]:
    config = read_security_config()
    now = int(time.time())
    payload = {
        "sub": config["username"],
        "iat": now,
        "ver": int(config.get("session_version", 1)),
        "nonce": secrets.token_hex(8),
    }
    encoded = _b64encode(
        json.dumps(payload, separators=(",", ":"), sort_keys=True).encode()
    )
    signature = hmac.new(
        _b64decode(config["signing_secret"]),
        encoded.encode(),
        hashlib.sha256,
    ).digest()
    return f"{encoded}.{_b64encode(signature)}", secrets.token_urlsafe(24)


def verify_session(token: str) -> dict | None:
    try:
        encoded, supplied_signature = token.split(".", 1)
        config = read_security_config()
        expected_signature = hmac.new(
            _b64decode(config["signing_secret"]),
            encoded.encode(),
            hashlib.sha256,
        ).digest()
        if not hmac.compare_digest(
            _b64decode(supplied_signature),
            expected_signature,
        ):
            return None
        payload = json.loads(_b64decode(encoded))
        if int(payload["ver"]) != int(config.get("session_version", 1)):
            return None
        if payload["sub"] != config["username"]:
            return None
        return payload
    except (ValueError, KeyError, TypeError, json.JSONDecodeError):
        return None


def require_auth(request: Request) -> dict:
    payload = verify_session(request.cookies.get(SESSION_COOKIE, ""))
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="管理后台登录已失效",
        )
    return payload


def require_csrf(request: Request) -> None:
    cookie = request.cookies.get(CSRF_COOKIE, "")
    header = request.headers.get("x-csrf-token", "")
    if not cookie or not hmac.compare_digest(cookie, header):
        raise HTTPException(status_code=403, detail="请求校验失败，请刷新页面")


def login_allowed(client_ip: str) -> None:
    failures, blocked_until = _login_failures.get(client_ip, (0, 0))
    if blocked_until > time.time():
        wait_seconds = max(1, int(blocked_until - time.time()))
        raise HTTPException(
            status_code=429,
            detail=f"登录尝试过多，请 {wait_seconds} 秒后重试",
        )
    if failures and blocked_until:
        _login_failures.pop(client_ip, None)


def record_login_result(client_ip: str, success: bool) -> None:
    if success:
        _login_failures.pop(client_ip, None)
        return
    failures, _ = _login_failures.get(client_ip, (0, 0))
    failures += 1
    blocked_until = time.time() + 60 if failures >= 5 else 0
    _login_failures[client_ip] = (failures, blocked_until)


def cookie_secure(request: Request) -> bool:
    forwarded_proto = request.headers.get("x-forwarded-proto", "")
    return request.url.scheme == "https" or forwarded_proto.split(",")[0].strip() == "https"
