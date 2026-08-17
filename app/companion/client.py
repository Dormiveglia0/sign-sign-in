from __future__ import annotations

import platform
import json
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


class CompanionApiError(RuntimeError):
    pass


def _error_message(status_code: int, body: bytes) -> str:
    try:
        payload = json.loads(body.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return f"HTTP {status_code}"
    if isinstance(payload, dict) and payload.get("detail"):
        return str(payload["detail"])
    return f"HTTP {status_code}"


class CompanionApi:
    def __init__(self, server_url: str, token: str = ""):
        self.server_url = str(server_url).rstrip("/")
        self.token = str(token or "")

    def close(self) -> None:
        return None

    def _request(self, method: str, path: str, **kwargs) -> Any:
        payload = kwargs.pop("json", None)
        timeout = kwargs.pop("timeout", 15)
        if kwargs:
            raise TypeError(f"Unsupported request options: {', '.join(kwargs)}")
        body = (
            json.dumps(payload, ensure_ascii=False).encode("utf-8")
            if payload is not None
            else None
        )
        headers = {"Accept": "application/json"}
        if body is not None:
            headers["Content-Type"] = "application/json"
        if self.token:
            headers["Authorization"] = f"Bearer {self.token}"
        request = Request(
            self.server_url + path,
            data=body,
            headers=headers,
            method=method,
        )
        try:
            with urlopen(request, timeout=timeout) as response:
                response_body = response.read()
        except HTTPError as exc:
            response_body = exc.read()
            raise CompanionApiError(
                _error_message(exc.code, response_body)
            ) from exc
        except (URLError, OSError) as exc:
            raise CompanionApiError(f"无法连接 OpenWrt 服务: {exc}") from exc
        try:
            return json.loads(response_body.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError) as exc:
            raise CompanionApiError("OpenWrt 服务返回了非 JSON 响应") from exc

    def pair(self, code: str) -> str:
        payload = self._request(
            "POST",
            "/api/companion/v1/pair",
            json={
                "code": str(code).strip(),
                "deviceName": platform.node() or "Windows 采集端",
            },
        )
        token = str(payload.get("token") or "") if isinstance(payload, dict) else ""
        if not token:
            raise CompanionApiError("配对成功响应中缺少采集端令牌")
        return token

    def status(self) -> dict:
        payload = self._request("GET", "/api/companion/v1/status")
        if not isinstance(payload, dict):
            raise CompanionApiError("OpenWrt 状态响应格式无效")
        return payload

    def task(self, task_id: str) -> dict:
        payload = self._request(
            "GET",
            f"/api/companion/v1/tasks/{str(task_id).strip()}",
        )
        if not isinstance(payload, dict):
            raise CompanionApiError("OpenWrt 任务响应格式无效")
        return payload

    def refresh_session(self, code: str) -> dict:
        payload = self._request(
            "POST",
            "/api/companion/v1/session/refresh",
            json={"code": code},
        )
        if not isinstance(payload, dict):
            raise CompanionApiError("OpenWrt 刷新响应格式无效")
        return payload
