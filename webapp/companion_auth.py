from __future__ import annotations

import hashlib
import hmac
import json
import os
import secrets
import threading
import time
from datetime import datetime, timezone
from pathlib import Path

from app.config.common import BASE_DIR


RUNTIME_DIR = Path(BASE_DIR) / ".runtime"
AUTH_FILE = RUNTIME_DIR / "companion_auth.json"
PAIRING_TTL_SECONDS = 10 * 60
TOKEN_PREFIX = "ssi_companion_"
_PAIRING_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

_lock = threading.RLock()
_pairing: dict[str, object] | None = None
_last_seen_at: float = 0.0
_pair_failures: dict[str, tuple[int, float]] = {}


def _iso_at(value: float | int) -> str | None:
    if not value:
        return None
    return datetime.fromtimestamp(float(value), timezone.utc).isoformat(
        timespec="seconds"
    )


def _atomic_write(path: Path, payload: dict) -> None:
    RUNTIME_DIR.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(".tmp")
    with temporary.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2)
    os.chmod(temporary, 0o600)
    os.replace(temporary, path)


def _read_auth() -> dict:
    try:
        with AUTH_FILE.open("r", encoding="utf-8") as handle:
            payload = json.load(handle)
    except (OSError, json.JSONDecodeError):
        return {}
    return payload if isinstance(payload, dict) else {}


def _normalize_pairing_code(value: str) -> str:
    return "".join(char for char in str(value or "").upper() if char.isalnum())


def _digest(value: str) -> str:
    return hashlib.sha256(str(value).encode("utf-8")).hexdigest()


def _new_pairing_code() -> str:
    raw = "".join(secrets.choice(_PAIRING_ALPHABET) for _ in range(12))
    return "-".join(raw[index : index + 4] for index in range(0, 12, 4))


def issue_pairing_code() -> dict:
    global _pairing
    code = _new_pairing_code()
    expires_at = time.time() + PAIRING_TTL_SECONDS
    with _lock:
        _pairing = {
            "digest": _digest(_normalize_pairing_code(code)),
            "expires_at": expires_at,
        }
    return {
        "code": code,
        "expiresAt": _iso_at(expires_at),
        "expiresInSeconds": PAIRING_TTL_SECONDS,
    }


def _check_pair_rate_limit(client_ip: str) -> None:
    attempts, blocked_until = _pair_failures.get(client_ip, (0, 0.0))
    if blocked_until > time.time():
        raise RuntimeError("配对尝试过多，请稍后重试")
    if attempts and blocked_until:
        _pair_failures.pop(client_ip, None)


def _record_pair_result(client_ip: str, success: bool) -> None:
    if success:
        _pair_failures.pop(client_ip, None)
        return
    attempts, _ = _pair_failures.get(client_ip, (0, 0.0))
    attempts += 1
    blocked_until = time.time() + 60 if attempts >= 6 else 0.0
    _pair_failures[client_ip] = (attempts, blocked_until)


def exchange_pairing_code(
    code: str,
    *,
    device_name: str = "",
    client_ip: str = "",
) -> str:
    global _pairing
    client_ip = str(client_ip or "unknown")
    _check_pair_rate_limit(client_ip)
    supplied = _digest(_normalize_pairing_code(code))

    with _lock:
        current = _pairing
        valid = bool(
            current
            and float(current.get("expires_at") or 0) >= time.time()
            and hmac.compare_digest(str(current.get("digest") or ""), supplied)
        )
        if not valid:
            if current and float(current.get("expires_at") or 0) < time.time():
                _pairing = None
            _record_pair_result(client_ip, False)
            raise ValueError("配对码无效或已过期")

        _pairing = None
        _record_pair_result(client_ip, True)
        token = TOKEN_PREFIX + secrets.token_urlsafe(32)
        _atomic_write(
            AUTH_FILE,
            {
                "version": 1,
                "token_hash": _digest(token),
                "device_name": str(device_name or "Windows 采集端")[:100],
                "created_at": int(time.time()),
            },
        )
        return token


def verify_companion_token(token: str) -> bool:
    global _last_seen_at
    token = str(token or "")
    if not token.startswith(TOKEN_PREFIX):
        return False
    stored = str(_read_auth().get("token_hash") or "")
    valid = bool(stored and hmac.compare_digest(stored, _digest(token)))
    if valid:
        with _lock:
            _last_seen_at = time.time()
    return valid


def companion_snapshot() -> dict:
    auth = _read_auth()
    with _lock:
        pairing = _pairing
        last_seen_at = _last_seen_at
    pairing_expires_at = float((pairing or {}).get("expires_at") or 0)
    if pairing_expires_at < time.time():
        pairing_expires_at = 0
    return {
        "configured": bool(auth.get("token_hash")),
        "deviceName": str(auth.get("device_name") or ""),
        "createdAt": _iso_at(int(auth.get("created_at") or 0)),
        "lastSeenAt": _iso_at(last_seen_at),
        "pairingExpiresAt": _iso_at(pairing_expires_at),
    }


def revoke_companion() -> None:
    global _pairing, _last_seen_at
    with _lock:
        _pairing = None
        _last_seen_at = 0.0
        AUTH_FILE.unlink(missing_ok=True)
