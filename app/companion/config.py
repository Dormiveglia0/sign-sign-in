from __future__ import annotations

import base64
import ctypes
import ipaddress
import json
import os
import time
from ctypes import wintypes
from pathlib import Path
from urllib.parse import urlsplit

from app.config.common import USER_DATA_DIR


CONFIG_FILE = Path(USER_DATA_DIR) / "config" / "credential_companion.json"


class _DataBlob(ctypes.Structure):
    _fields_ = [
        ("cbData", wintypes.DWORD),
        ("pbData", ctypes.POINTER(ctypes.c_ubyte)),
    ]


def _crypt32():
    if os.name != "nt":
        raise RuntimeError("Windows 凭证采集端只能在 Windows 当前用户会话中运行")
    return ctypes.windll.crypt32, ctypes.windll.kernel32


def _free_dpapi_buffer(kernel32, pointer) -> None:
    kernel32.LocalFree.argtypes = [ctypes.c_void_p]
    kernel32.LocalFree.restype = ctypes.c_void_p
    kernel32.LocalFree(ctypes.cast(pointer, ctypes.c_void_p))


def _input_blob(value: bytes) -> tuple[_DataBlob, ctypes.Array]:
    buffer = ctypes.create_string_buffer(value)
    pointer = ctypes.cast(buffer, ctypes.POINTER(ctypes.c_ubyte))
    return _DataBlob(len(value), pointer), buffer


def protect_token(token: str) -> str:
    crypt32, kernel32 = _crypt32()
    source, source_buffer = _input_blob(str(token).encode("utf-8"))
    destination = _DataBlob()
    crypt32.CryptProtectData.argtypes = [
        ctypes.POINTER(_DataBlob),
        wintypes.LPCWSTR,
        ctypes.POINTER(_DataBlob),
        ctypes.c_void_p,
        ctypes.c_void_p,
        wintypes.DWORD,
        ctypes.POINTER(_DataBlob),
    ]
    crypt32.CryptProtectData.restype = wintypes.BOOL
    if not crypt32.CryptProtectData(
        ctypes.byref(source),
        "SignSignIn Windows Companion",
        None,
        None,
        None,
        0x1,
        ctypes.byref(destination),
    ):
        raise ctypes.WinError()
    try:
        encrypted = ctypes.string_at(destination.pbData, destination.cbData)
    finally:
        _free_dpapi_buffer(kernel32, destination.pbData)
        del source_buffer
    return base64.b64encode(encrypted).decode("ascii")


def unprotect_token(value: str) -> str:
    crypt32, kernel32 = _crypt32()
    source, source_buffer = _input_blob(base64.b64decode(value))
    destination = _DataBlob()
    crypt32.CryptUnprotectData.argtypes = [
        ctypes.POINTER(_DataBlob),
        ctypes.POINTER(wintypes.LPWSTR),
        ctypes.POINTER(_DataBlob),
        ctypes.c_void_p,
        ctypes.c_void_p,
        wintypes.DWORD,
        ctypes.POINTER(_DataBlob),
    ]
    crypt32.CryptUnprotectData.restype = wintypes.BOOL
    if not crypt32.CryptUnprotectData(
        ctypes.byref(source),
        None,
        None,
        None,
        None,
        0x1,
        ctypes.byref(destination),
    ):
        raise ctypes.WinError()
    try:
        decrypted = ctypes.string_at(destination.pbData, destination.cbData)
    finally:
        _free_dpapi_buffer(kernel32, destination.pbData)
        del source_buffer
    return decrypted.decode("utf-8")


def normalize_server_url(value: str) -> str:
    value = str(value or "").strip().rstrip("/")
    parsed = urlsplit(value)
    if parsed.scheme not in {"http", "https"} or not parsed.hostname:
        raise ValueError("服务地址必须是完整的 HTTP(S) URL")
    if parsed.username or parsed.password or parsed.query or parsed.fragment:
        raise ValueError("服务地址不能包含账号、密码、查询参数或片段")
    if parsed.path not in {"", "/"}:
        raise ValueError("服务地址只能填写站点根地址")
    if parsed.scheme == "http":
        hostname = parsed.hostname.lower()
        private_host = hostname in {"localhost", "127.0.0.1", "::1"}
        try:
            private_host = private_host or ipaddress.ip_address(hostname).is_private
        except ValueError:
            private_host = private_host or hostname.endswith((".lan", ".local"))
        if not private_host:
            raise ValueError("公网服务必须使用 HTTPS；HTTP 仅允许本机或局域网地址")
    return value


def _atomic_write(payload: dict) -> None:
    CONFIG_FILE.parent.mkdir(parents=True, exist_ok=True)
    temporary = CONFIG_FILE.with_suffix(".tmp")
    with temporary.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2)
    os.chmod(temporary, 0o600)
    os.replace(temporary, CONFIG_FILE)


def save_config(
    server_url: str,
    token: str,
    *,
    refresh_interval_hours: int = 24,
) -> dict:
    payload = {
        "version": 1,
        "server_url": normalize_server_url(server_url),
        "token_protected": protect_token(token),
        "refresh_interval_hours": max(1, min(int(refresh_interval_hours), 168)),
        "last_refresh_at": 0,
    }
    _atomic_write(payload)
    return load_config()


def load_config() -> dict:
    try:
        with CONFIG_FILE.open("r", encoding="utf-8") as handle:
            payload = json.load(handle)
    except FileNotFoundError as exc:
        raise RuntimeError("Windows 采集端尚未配对") from exc
    except (OSError, json.JSONDecodeError) as exc:
        raise RuntimeError("Windows 采集端配置损坏，请重新配对") from exc
    if not isinstance(payload, dict) or not payload.get("token_protected"):
        raise RuntimeError("Windows 采集端配置不完整，请重新配对")
    return {
        **payload,
        "server_url": normalize_server_url(payload.get("server_url", "")),
        "token": unprotect_token(str(payload["token_protected"])),
    }


def record_refresh(timestamp: int) -> None:
    with CONFIG_FILE.open("r", encoding="utf-8") as handle:
        payload = json.load(handle)
    payload["last_refresh_at"] = max(0, int(timestamp))
    _atomic_write(payload)


def refresh_due(config: dict, status: dict, *, force: bool = False) -> bool:
    if force or bool(status.get("needsRefresh")):
        return True
    last_refresh = int(config.get("last_refresh_at") or 0)
    interval_hours = int(config.get("refresh_interval_hours") or 24)
    return not last_refresh or time.time() >= last_refresh + interval_hours * 3600
