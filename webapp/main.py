from __future__ import annotations

import copy
import io
import json
import logging
import os
import re
from contextlib import asynccontextmanager
from datetime import datetime
from pathlib import Path
from typing import Literal
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from fastapi import (
    APIRouter,
    Depends,
    FastAPI,
    File,
    HTTPException,
    Query,
    Request,
    Response,
    UploadFile,
)
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from PIL import Image
from pydantic import BaseModel, Field, model_validator
from starlette.concurrency import run_in_threadpool

from app.apis.xybsyw import (
    SESSION_REAUTH_REQUIRED,
    account_password_login,
    blog_list,
    clear_account_login_challenges,
    create_account_login_challenge,
    is_session_expired_error,
    load_blog_date,
    load_blog_months,
    load_blog_year,
    xyb_completion,
)
from app.config.common import (
    CONFIG_FILE,
    IMAGE_DIR,
    MITM_CONF_DIR,
    PROJECT_VERSION,
    SYSTEM_PROMPT,
    ensure_resource_layout,
)
from app.utils.files import (
    append_journal_entry,
    build_user_agent,
    clear_journal_history,
    clear_session_cache,
    list_images,
    load_journal_history,
    read_config,
    validate_config,
)
from app.utils.model_client import call_chat_model
from app.utils.report_text import readable_blog_list, report_body_text
from app.utils.gotify import (
    build_gotify_message_url,
    get_gotify_config,
    notify_gotify,
)
from webapp.companion_auth import (
    companion_snapshot,
    exchange_pairing_code,
    issue_pairing_code,
    revoke_companion,
    verify_companion_token,
)
from webapp.journal import (
    JournalDraftInput, JournalInput, journal_context as _journal_context, submit_report,
)
from webapp.runtime import Runtime, _timezone
from webapp.security import (
    CSRF_COOKIE,
    INITIAL_PASSWORD_FILE,
    SESSION_COOKIE,
    change_password,
    cookie_secure,
    create_session,
    ensure_security_config,
    login_allowed,
    record_login_result,
    require_auth,
    require_csrf,
    verify_password,
    verify_session,
)

FRONTEND_DIST = Path(__file__).resolve().parents[1] / "frontend" / "dist"
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}
MAX_IMAGE_BYTES = 10 * 1024 * 1024
runtime = Runtime()
COMPANION_API_PREFIX = "/api/companion/v1"


def _client_ip(request: Request) -> str:
    return request.client.host if request.client else "unknown"


def require_companion(request: Request) -> dict:
    authorization = str(request.headers.get("authorization") or "")
    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer" or not verify_companion_token(token.strip()):
        raise HTTPException(
            status_code=401,
            detail="Windows 采集端认证失败，请重新配对",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"authenticated": True}


def _set_auth_cookies(
    response: Response,
    request: Request,
    session_token: str,
    csrf_token: str,
) -> None:
    secure = cookie_secure(request)
    response.set_cookie(
        SESSION_COOKIE,
        session_token,
        httponly=True,
        secure=secure,
        samesite="strict",
        path="/",
    )
    response.set_cookie(
        CSRF_COOKIE,
        csrf_token,
        httponly=False,
        secure=secure,
        samesite="strict",
        path="/",
    )


def _atomic_save_config(config: dict) -> None:
    path = Path(CONFIG_FILE)
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(".tmp")
    with temporary.open("w", encoding="utf-8") as handle:
        json.dump(config, handle, ensure_ascii=False, indent=4)
    os.replace(temporary, path)


def _safe_image_path(name: str, must_exist: bool = True) -> Path:
    clean_name = Path(str(name or "")).name
    if clean_name != name or Path(clean_name).suffix.lower() not in IMAGE_EXTENSIONS:
        raise HTTPException(status_code=400, detail="图片名称无效")
    path = Path(IMAGE_DIR) / clean_name
    if must_exist and not path.is_file():
        raise HTTPException(status_code=404, detail="图片不存在")
    return path


def _image_item(path: str | Path) -> dict:
    value = Path(path)
    stat = value.stat()
    return {
        "name": value.name,
        "url": f"/api/images/{value.name}",
        "size": stat.st_size,
        "updatedAt": datetime.fromtimestamp(stat.st_mtime)
        .astimezone()
        .isoformat(timespec="seconds"),
    }


def _list_image_items() -> list[dict]:
    return [_image_item(path) for path in list_images()]


def _secret_state(config: dict) -> dict:
    input_config = config.get("input") or {}
    model = config.get("model") or {}
    settings = config.get("settings") or {}
    _, gotify_token = get_gotify_config(settings)
    return {
        "amapKey": bool((input_config.get("mapApiKeys") or {}).get("amap")),
        "tencentKey": bool((input_config.get("mapApiKeys") or {}).get("tencent")),
        "modelApiKey": bool(model.get("apiKey")),
        "gotifyToken": bool(gotify_token),
        "initialPassword": INITIAL_PASSWORD_FILE.exists(),
    }


async def _blocking(function, *args, **kwargs):
    try:
        return await run_in_threadpool(function, *args, **kwargs)
    except HTTPException:
        raise
    except Exception as exc:
        if is_session_expired_error(exc):
            raise HTTPException(
                status_code=409,
                detail=SESSION_REAUTH_REQUIRED,
            ) from exc
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@asynccontextmanager
async def lifespan(_: FastAPI):
    ensure_resource_layout()
    _, initial_password = ensure_security_config()
    runtime.start()
    if initial_password:
        logging.warning(
            "首次登录账号 admin，初始密码已写入 %s",
            INITIAL_PASSWORD_FILE,
        )
    yield
    runtime.stop()


app = FastAPI(
    title="SignSignIn Linux API",
    version=PROJECT_VERSION.lstrip("v"),
    docs_url=None,
    redoc_url=None,
    lifespan=lifespan,
)


@app.middleware("http")
async def security_headers(request: Request, call_next):
    companion_api = request.url.path.startswith(COMPANION_API_PREFIX)
    if (
        request.method in {"POST", "PUT", "PATCH", "DELETE"}
        and request.url.path.startswith("/api/")
        and request.url.path != "/api/auth/login"
        and not companion_api
    ):
        try:
            require_auth(request)
            require_csrf(request)
        except HTTPException as exc:
            return JSONResponse(
                {"detail": exc.detail},
                status_code=exc.status_code,
            )
    response = await call_next(request)
    token = request.cookies.get(SESSION_COOKIE, "")
    payload = verify_session(token)
    csrf = request.cookies.get(CSRF_COOKIE, "")
    if payload and "exp" in payload and csrf:
        _set_auth_cookies(response, request, token, csrf)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "same-origin"
    response.headers["Permissions-Policy"] = (
        "camera=(), microphone=(), geolocation=(), payment=()"
    )
    response.headers["Content-Security-Policy"] = (
        "default-src 'self'; "
        "script-src 'self'; "
        "style-src 'self' 'unsafe-inline'; "
        "img-src 'self' data: blob:; "
        "connect-src 'self'; "
        "font-src 'self' data:; "
        "object-src 'none'; base-uri 'self'; frame-ancestors 'none'"
    )
    if cookie_secure(request):
        response.headers["Strict-Transport-Security"] = (
            "max-age=31536000; includeSubDomains"
        )
    if request.url.path.startswith("/api/"):
        response.headers["Cache-Control"] = "no-store"
    return response


class LoginInput(BaseModel):
    username: str = Field(min_length=1, max_length=64)
    password: str = Field(min_length=1, max_length=256)


class PasswordInput(BaseModel):
    currentPassword: str = Field(min_length=1, max_length=256)
    newPassword: str = Field(min_length=1, max_length=256)


@app.get("/api/health")
def health():
    return {"ok": True, "version": PROJECT_VERSION}


@app.get("/api/auth/me")
def auth_me(request: Request):
    payload = verify_session(request.cookies.get(SESSION_COOKIE, ""))
    return {
        "authenticated": bool(payload),
        "user": {"username": payload["sub"]} if payload else None,
    }


@app.post("/api/auth/login")
def auth_login(payload: LoginInput, request: Request, response: Response):
    client_ip = _client_ip(request)
    login_allowed(client_ip)
    valid = verify_password(payload.username, payload.password)
    record_login_result(client_ip, valid)
    if not valid:
        raise HTTPException(status_code=401, detail="账号或密码不正确")
    session_token, csrf_token = create_session()
    _set_auth_cookies(response, request, session_token, csrf_token)
    logging.info("Web 管理员登录成功")
    return {"authenticated": True, "user": {"username": "admin"}}


protected = APIRouter(prefix="/api", dependencies=[Depends(require_auth)])
companion_api = APIRouter(
    prefix=COMPANION_API_PREFIX,
    dependencies=[Depends(require_companion)],
)


@protected.post("/auth/logout")
def auth_logout(response: Response):
    response.delete_cookie(SESSION_COOKIE, path="/")
    response.delete_cookie(CSRF_COOKIE, path="/")
    return {"ok": True}


@protected.post("/auth/password")
async def auth_change_password(payload: PasswordInput):
    await _blocking(
        change_password,
        payload.currentPassword,
        payload.newPassword,
    )
    return {
        "ok": True,
        "message": "管理员密码已更新，管理后台需要重新登录；校友邦凭证不受影响",
    }


@protected.get("/status")
def get_status():
    status = runtime.status()
    status["companion"] = companion_snapshot()
    return status


@protected.get("/tasks")
def get_task():
    return runtime.tasks.snapshot()


@protected.get("/tasks/history")
def get_task_history():
    return runtime.tasks.history_snapshot()


class TaskInput(BaseModel):
    mode: Literal["in", "out", "both", "photo_in", "photo_out"]
    image: str = Field(default="", max_length=255)
    randomImage: bool = False


@protected.post("/tasks")
def start_task(payload: TaskInput):
    status = runtime.status()
    if not status["session"]["valid"]:
        raise HTTPException(
            status_code=409,
            detail=SESSION_REAUTH_REQUIRED,
        )
    image_path = ""
    try:
        if payload.mode.startswith("photo_") and not payload.randomImage:
            image_path = str(_safe_image_path(payload.image))
        return runtime.tasks.start_sign(
            payload.mode,
            image_path,
            random_image=payload.randomImage,
        )
    except RuntimeError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc


@protected.delete("/tasks/current")
def stop_task():
    try:
        return runtime.tasks.cancel()
    except RuntimeError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc


class SessionInput(BaseModel):
    code: str = Field(min_length=4, max_length=4096)


class AccountLoginInput(BaseModel):
    challengeId: str = Field(min_length=16, max_length=128)
    username: str = Field(min_length=1, max_length=64)
    password: str = Field(min_length=1, max_length=256)
    picCode: str = Field(min_length=1, max_length=32)


class CompanionPairInput(BaseModel):
    code: str = Field(min_length=8, max_length=64)
    deviceName: str = Field(default="Windows 采集端", max_length=100)


class CompanionSessionInput(BaseModel):
    code: str = Field(min_length=4, max_length=4096)


@protected.post("/session/refresh")
def refresh_session(payload: SessionInput):
    code = payload.code.strip()
    if not code or "\n" in code or "\r" in code:
        raise HTTPException(status_code=422, detail="Code 格式无效")
    try:
        return runtime.tasks.start_session_refresh(code)
    except RuntimeError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc


@protected.post("/session/account/captcha")
async def account_login_captcha():
    config = read_config(CONFIG_FILE)
    return await _blocking(
        create_account_login_challenge,
        config["input"],
    )


@protected.post("/session/account/login")
async def account_login(payload: AccountLoginInput):
    config = read_config(CONFIG_FILE)
    session = await _blocking(
        account_password_login,
        config["input"],
        payload.challengeId,
        payload.username,
        payload.password,
        payload.picCode,
    )
    return {
        "ok": True,
        "sessionSuffix": str(session.get("sessionId") or "")[-4:],
    }


@protected.post("/companion/pairing")
def create_companion_pairing():
    return issue_pairing_code()


@protected.delete("/companion")
def delete_companion():
    revoke_companion()
    logging.info("已撤销 Windows 微信凭证采集端")
    return {"ok": True}


@app.post(f"{COMPANION_API_PREFIX}/pair")
def pair_companion(payload: CompanionPairInput, request: Request):
    try:
        token = exchange_pairing_code(
            payload.code,
            device_name=payload.deviceName,
            client_ip=_client_ip(request),
        )
    except RuntimeError as exc:
        raise HTTPException(status_code=429, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=401, detail=str(exc)) from exc
    logging.info("Windows 微信凭证采集端配对成功")
    return {"token": token}


@companion_api.get("/status")
def companion_status():
    status = runtime.status()
    session = status["session"]
    task = status["task"]
    return {
        "version": PROJECT_VERSION,
        "needsRefresh": not bool(session["valid"]),
        "sessionStatus": session["autoRenew"]["status"],
        "sessionUpdatedAt": session["cachedAt"],
        "busy": task["status"] in {"queued", "running", "stopping"},
        "task": {
            "id": task["id"],
            "status": task["status"],
            "source": task["source"],
            "mode": task["mode"],
            "message": task["message"],
        },
    }


@companion_api.get("/tasks/{task_id}")
def companion_task_status(task_id: str):
    task_id = str(task_id or "").strip()
    if not task_id or len(task_id) > 64:
        raise HTTPException(status_code=422, detail="任务 ID 格式无效")
    candidates = [
        runtime.tasks.snapshot(),
        *runtime.tasks.history_snapshot(),
    ]
    task = next(
        (
            item
            for item in candidates
            if str(item.get("id") or "") == task_id
            and str(item.get("source") or "") == "companion"
        ),
        None,
    )
    if not task:
        raise HTTPException(status_code=404, detail="未找到凭证刷新任务")
    return {
        "id": task_id,
        "status": task.get("status"),
        "message": task.get("message"),
        "startedAt": task.get("startedAt"),
        "finishedAt": task.get("finishedAt"),
    }


@companion_api.post("/session/refresh", status_code=202)
def companion_refresh_session(payload: CompanionSessionInput):
    code = payload.code.strip()
    if not code or "\n" in code or "\r" in code:
        raise HTTPException(status_code=422, detail="Code 格式无效")
    try:
        return runtime.tasks.start_session_refresh(code, source="companion")
    except RuntimeError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc


@protected.delete("/session")
def delete_session():
    clear_account_login_challenges()
    clear_session_cache()
    logging.info("已清除校友邦登录凭证")
    return {"ok": True}


@protected.post("/capture")
def start_capture(request: Request):
    try:
        return runtime.capture.start(_client_ip(request))
    except RuntimeError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc


@protected.delete("/capture")
def stop_capture():
    try:
        return runtime.capture.stop()
    except RuntimeError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc


@protected.get("/capture/certificate")
def capture_certificate():
    candidates = [
        Path(MITM_CONF_DIR) / "mitmproxy-ca-cert.cer",
        Path(MITM_CONF_DIR) / "mitmproxy-ca-cert.pem",
    ]
    certificate = next((path for path in candidates if path.is_file()), None)
    if certificate is None:
        raise HTTPException(
            status_code=404,
            detail="证书尚未生成，请先启动一次抓包服务",
        )
    return FileResponse(
        certificate,
        media_type="application/x-x509-ca-cert",
        filename="signsignin-mitmproxy-ca-cert.cer",
    )


@protected.get("/logs")
def get_logs(
    after: int = Query(default=0, ge=0),
    limit: int = Query(default=300, ge=1, le=500),
):
    return {"items": runtime.logs.snapshot(after, limit)}


@protected.delete("/logs")
def clear_logs():
    runtime.logs.clear()
    logging.info("运行日志已清空")
    return {"ok": True}


class LocationInput(BaseModel):
    longitude: str = Field(min_length=1, max_length=32)
    latitude: str = Field(min_length=1, max_length=32)


class DeviceInput(BaseModel):
    brand: str = Field(min_length=1, max_length=64)
    model: str = Field(min_length=1, max_length=64)
    system: str = Field(min_length=1, max_length=64)
    platform: Literal["android", "ios"]


class MapKeysInput(BaseModel):
    amap: str = Field(default="", max_length=256)
    tencent: str = Field(default="", max_length=256)


class ModelInput(BaseModel):
    baseUrl: str = Field(default="", max_length=500)
    apiKey: str = Field(default="", max_length=1000)
    model: str = Field(default="", max_length=128)


class ConfigInput(BaseModel):
    location: LocationInput
    locationJitterMeters: float = Field(ge=0, le=500)
    mapProvider: Literal["amap", "tencent"]
    mapApiKeys: MapKeysInput
    device: DeviceInput
    userAgent: str = Field(min_length=20, max_length=2000)
    model: ModelInput
    clearSecrets: list[
        Literal["amapKey", "tencentKey", "modelApiKey"]
    ] = Field(default_factory=list, max_length=3)


@protected.get("/config")
def get_config():
    config = read_config(CONFIG_FILE)
    input_config = config.get("input") or {}
    model = config.get("model") or {}
    return {
        "location": copy.deepcopy(input_config.get("location") or {}),
        "locationJitterMeters": input_config.get("locationJitterMeters", 100),
        "mapProvider": input_config.get("mapProvider", "amap"),
        "mapApiKeys": {"amap": "", "tencent": ""},
        "device": copy.deepcopy(input_config.get("device") or {}),
        "userAgent": input_config.get("userAgent", ""),
        "model": {
            "baseUrl": model.get("baseUrl", ""),
            "apiKey": "",
            "model": model.get("model", ""),
        },
        "secrets": _secret_state(config),
    }


@protected.put("/config")
def update_config(payload: ConfigInput):
    config = read_config(CONFIG_FILE)
    input_config = config.setdefault("input", {})
    input_config["location"] = payload.location.model_dump()
    input_config["locationJitterMeters"] = str(payload.locationJitterMeters)
    input_config["mapProvider"] = payload.mapProvider
    input_config["device"] = payload.device.model_dump()
    input_config["userAgent"] = payload.userAgent.strip()

    map_keys = input_config.setdefault("mapApiKeys", {})
    for key, secret_name in (("amap", "amapKey"), ("tencent", "tencentKey")):
        value = getattr(payload.mapApiKeys, key).strip()
        if value:
            map_keys[key] = value
        elif secret_name in payload.clearSecrets:
            map_keys[key] = ""

    model = config.setdefault("model", {})
    model["baseUrl"] = payload.model.baseUrl.strip()
    model["model"] = payload.model.model.strip()
    if payload.model.apiKey.strip():
        model["apiKey"] = payload.model.apiKey.strip()
    elif "modelApiKey" in payload.clearSecrets:
        model["apiKey"] = ""

    error = validate_config(config)
    if error:
        raise HTTPException(status_code=422, detail=error)
    _atomic_save_config(config)
    logging.info("配置已从 Web 控制台更新")
    return get_config()


@protected.post("/config/user-agent")
def generate_user_agent(device: DeviceInput):
    return {"userAgent": build_user_agent(device.model_dump())}


@protected.get("/images")
def get_images():
    return {"items": _list_image_items()}


@protected.post("/images")
async def upload_image(file: UploadFile = File(...)):
    filename = Path(file.filename or "").name
    extension = Path(filename).suffix.lower()
    if extension not in IMAGE_EXTENSIONS:
        raise HTTPException(
            status_code=422,
            detail="仅支持 PNG、JPG、JPEG、WEBP 图片",
        )
    content = await file.read(MAX_IMAGE_BYTES + 1)
    if len(content) > MAX_IMAGE_BYTES:
        raise HTTPException(status_code=413, detail="图片不能超过 10 MB")
    try:
        with Image.open(io.BytesIO(content)) as image:
            image.verify()
    except Exception as exc:
        raise HTTPException(status_code=422, detail="文件不是有效图片") from exc

    safe_stem = re.sub(r"[^0-9A-Za-z\u4e00-\u9fff_-]+", "-", Path(filename).stem)
    safe_stem = safe_stem.strip("-_")[:80] or "image"
    Path(IMAGE_DIR).mkdir(parents=True, exist_ok=True)
    destination = Path(IMAGE_DIR) / f"{safe_stem}{extension}"
    counter = 1
    while destination.exists():
        destination = Path(IMAGE_DIR) / f"{safe_stem}-{counter}{extension}"
        counter += 1
    temporary = destination.with_suffix(destination.suffix + ".tmp")
    temporary.write_bytes(content)
    os.replace(temporary, destination)
    logging.info("已上传图片 %s", destination.name)
    return _image_item(destination)


@protected.get("/images/{name}")
def serve_image(name: str):
    path = _safe_image_path(name)
    return FileResponse(path)


@protected.delete("/images/{name}")
def remove_image(name: str):
    path = _safe_image_path(name)
    path.unlink()
    logging.info("已删除图片 %s", name)
    return {"ok": True}


class ScheduleTaskInput(BaseModel):
    time: str = Field(pattern=r"^\d{2}:\d{2}$")
    mode: Literal["in", "out", "photo_in", "photo_out"]
    image: str = Field(default="", max_length=255)
    randomImage: bool = False


class ScheduleInput(BaseModel):
    enabled: bool
    randomMinutes: int = Field(ge=0, le=120)
    timezone: str = Field(min_length=1, max_length=64)
    tasks: list[ScheduleTaskInput] = Field(max_length=30)
    notificationsEnabled: bool = False
    gotifyUrl: str = Field(default="", max_length=1000)
    gotifyToken: str = Field(default="", max_length=500)
    clearGotifyToken: bool = False


@protected.get("/schedules")
def get_schedules():
    config = read_config(CONFIG_FILE)
    snapshot = runtime.scheduler.snapshot()
    settings = config.get("settings") or {}
    gotify_url, gotify_token = get_gotify_config(settings)
    snapshot["notificationsEnabled"] = bool(settings.get("notifications_enabled"))
    snapshot["gotifyUrl"] = gotify_url
    snapshot["gotifyConfigured"] = bool(gotify_url and gotify_token)
    for task in snapshot["tasks"]:
        task["image"] = Path(task.pop("image_path", "")).name
        task["randomImage"] = bool(task.pop("random_image", False))
    return snapshot


@protected.put("/schedules")
def update_schedules(payload: ScheduleInput):
    try:
        ZoneInfo(payload.timezone)
    except ZoneInfoNotFoundError as exc:
        raise HTTPException(status_code=422, detail="服务器不支持所选时区") from exc
    normalized_tasks = []
    seen = set()
    for task in payload.tasks:
        hour, minute = (int(part) for part in task.time.split(":"))
        if hour > 23 or minute > 59:
            raise HTTPException(status_code=422, detail=f"时间无效: {task.time}")
        key = (task.time, task.mode)
        if key in seen:
            raise HTTPException(status_code=422, detail="同一时间不能添加重复任务")
        seen.add(key)
        item = {"time": task.time, "mode": task.mode}
        if task.mode.startswith("photo_"):
            item["random_image"] = task.randomImage
            if task.randomImage:
                if not list_images():
                    raise HTTPException(
                        status_code=422,
                        detail="随机图片任务需要先在图片资产中上传图片",
                    )
            else:
                item["image_path"] = str(_safe_image_path(task.image))
        normalized_tasks.append(item)
    if payload.enabled and not normalized_tasks:
        raise HTTPException(status_code=422, detail="启用定时任务前至少添加一项")

    config = read_config(CONFIG_FILE)
    settings = config.setdefault("settings", {})
    settings["timezone"] = payload.timezone
    settings["auto_clock"] = {
        "enabled": payload.enabled,
        "poll_seconds": 10,
        "random_minutes": payload.randomMinutes,
        "tasks": normalized_tasks,
    }
    settings["notifications_enabled"] = payload.notificationsEnabled
    notifications = [
        item
        for item in settings.get("notifications") or []
        if isinstance(item, dict)
        and item.get("type") not in {"tray", "pushplus", "gotify"}
    ]
    _, saved_token = get_gotify_config(settings)
    url = payload.gotifyUrl.strip().rstrip("/")
    token = payload.gotifyToken.strip() or saved_token
    if payload.clearGotifyToken:
        token = ""
    if url:
        try:
            build_gotify_message_url(url)
        except ValueError as exc:
            raise HTTPException(status_code=422, detail=str(exc)) from exc
    if payload.notificationsEnabled and not (url and token):
        raise HTTPException(
            status_code=422,
            detail="启用结果通知前请填写 Gotify 服务器地址和应用 Token",
        )
    if url and token:
        notifications.append({"type": "gotify", "url": url, "token": token})
    settings["notifications"] = notifications
    settings["gotify"] = {"url": url, "token": token}
    settings.pop("pushplus", None)
    _atomic_save_config(config)
    runtime.scheduler.reload()
    logging.info("定时任务配置已更新")
    return get_schedules()


class NotificationTestInput(BaseModel):
    url: str = Field(default="", max_length=1000)
    token: str = Field(default="", max_length=500)


@protected.post("/schedules/test-notification")
async def test_notification(payload: NotificationTestInput):
    config = read_config(CONFIG_FILE)
    saved_url, saved_token = get_gotify_config(config.get("settings") or {})
    url = payload.url.strip() or saved_url
    token = payload.token.strip() or saved_token
    if not url or not token:
        raise HTTPException(
            status_code=422,
            detail="请先填写 Gotify 服务器地址和应用 Token",
        )
    await _blocking(
        notify_gotify,
        "SignSignIn 通知测试",
        f"Linux Web 服务通知正常\n时间：{datetime.now().astimezone().isoformat(timespec='seconds')}",
        url,
        token,
    )
    return {"ok": True}


@protected.get("/journal/bootstrap")
async def journal_bootstrap(
    page: int = Query(default=1, ge=1, le=1000),
    blogType: Literal["1", "2"] = "1",
):
    def load():
        config, args, trainee_id = _journal_context()
        return {
            "traineeId": trainee_id,
            "years": load_blog_year(args, config["input"]) if blogType == "1" else [],
            "months": load_blog_months(args, config["input"]) if blogType == "2" else [],
            "blogs": readable_blog_list(blog_list(args, config["input"], page, blogType)),
            "history": load_journal_history(),
        }

    return await _blocking(load)


@protected.get("/journal/weeks")
async def journal_weeks(
    year: str = Query(pattern=r"^\d{4}$"),
    month: str = Query(pattern=r"^(0?[1-9]|1[0-2])$"),
):
    def load():
        config, args, _ = _journal_context()
        return load_blog_date(args, config["input"], year, month)

    return await _blocking(load)


@protected.get("/journal/blogs")
async def journal_blogs(
    page: int = Query(default=1, ge=1, le=1000),
    blogType: Literal["1", "2"] = "1",
):
    def load():
        config, args, _ = _journal_context()
        return readable_blog_list(blog_list(args, config["input"], page, blogType))

    return await _blocking(load)


class JournalGenerateInput(BaseModel):
    prompt: str = Field(min_length=1, max_length=5000)
    blogType: Literal["1", "2"] = "1"


@protected.post("/journal/generate")
async def journal_generate(payload: JournalGenerateInput):
    def generate():
        config = read_config(CONFIG_FILE)
        model = config.get("model") or {}
        if all(
            str(model.get(key) or "").strip()
            for key in ("baseUrl", "apiKey", "model")
        ):
            system_prompt = SYSTEM_PROMPT
            if payload.blogType == "2":
                system_prompt = system_prompt.replace("周记", "月报").replace("本周", "本月").replace("下周", "下月").replace("一周", "一个月").replace("第几周", "第几个月")
            content = call_chat_model(model, payload.prompt, system_prompt)
        else:
            _, args, _ = _journal_context()
            content = xyb_completion(
                args,
                config["input"],
                f"请根据以下真实素材撰写实习{'周报' if payload.blogType == '1' else '月报'}：\n{payload.prompt}",
            )
        content = report_body_text(content)
        append_journal_entry("generated", content)
        return content

    return {"content": await _blocking(generate)}


class JournalSubmitInput(JournalInput):
    @model_validator(mode="after")
    def complete_report(self):
        return self.require_complete()


@protected.post("/journal/submit")
async def journal_submit(payload: JournalSubmitInput):
    return {"result": await _blocking(submit_report, payload)}


@protected.get("/journal/drafts")
def journal_drafts():
    return {
        "items": runtime.journals.list(),
        "history": load_journal_history(),
        "timezone": str(_timezone(read_config(CONFIG_FILE))),
    }


async def _save_journal_draft(payload: JournalDraftInput, draft_id=None):
    def save():
        owner = ""
        config = read_config(CONFIG_FILE)
        if payload.scheduledAt:
            config, args, trainee_id = _journal_context()
            if payload.traineeId and payload.traineeId != trainee_id:
                raise ValueError("实习计划已变化，请重新加载后确认草稿")
            payload.traineeId = trainee_id
            owner = args["openId"]
        return runtime.journals.save(
            payload, draft_id, zone=_timezone(config), owner=owner,
        )
    return await _blocking(save)


@protected.post("/journal/drafts")
async def journal_create_draft(payload: JournalDraftInput):
    return await _save_journal_draft(payload)


@protected.put("/journal/drafts/{draft_id}")
async def journal_update_draft(draft_id: str, payload: JournalDraftInput):
    return await _save_journal_draft(payload, draft_id)


@protected.delete("/journal/drafts/{draft_id}")
async def journal_delete_draft(draft_id: str):
    return await _blocking(runtime.journals.delete, draft_id)


@protected.post("/journal/drafts/{draft_id}/submit")
async def journal_submit_draft(draft_id: str):
    return await _blocking(runtime.journals.submit, draft_id)


@protected.delete("/journal/history")
def journal_clear_history(section: Literal["generated", "submitted", "all"] = "all"):
    clear_journal_history(None if section == "all" else section)
    return {"ok": True}


app.include_router(protected)
app.include_router(companion_api)

if FRONTEND_DIST.is_dir():
    app.mount("/", StaticFiles(directory=FRONTEND_DIST, html=True), name="frontend")
else:
    @app.get("/")
    def frontend_missing():
        return JSONResponse(
            {"detail": "前端尚未构建"},
            status_code=503,
        )
