from __future__ import annotations

import base64
import copy
import io
import json
import logging
import os
import re
from contextlib import asynccontextmanager
from datetime import datetime
from pathlib import Path
from typing import Any, Literal
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from fastapi import (
    APIRouter,
    Body,
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
from pydantic import BaseModel, Field
from starlette.concurrency import run_in_threadpool

from app.apis.jielong import (
    build_local_media_files,
    build_submit_payload,
    create_qr_login,
    download_qrcode_image,
    exchange_qr_login_token,
    get_thread_id_by_url,
    load_form_bundle,
    poll_qr_login,
    submit_record,
)
from app.apis.xybsyw import (
    SESSION_REAUTH_REQUIRED,
    account_password_login,
    blog_list,
    clear_account_login_challenges,
    create_account_login_challenge,
    get_default_plan,
    get_plan,
    is_session_expired_error,
    load_blog_date,
    load_blog_year,
    login,
    submit_blog,
    xyb_completion,
)
from app.config.common import (
    CONFIG_FILE,
    IMAGE_DIR,
    JIELONG_FORM_DRAFTS_FILE,
    MITM_CONF_DIR,
    PROJECT_VERSION,
    SYSTEM_PROMPT,
    ensure_resource_layout,
)
from app.sign_flow import find_trainee_id
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
from app.utils.gotify import (
    build_gotify_message_url,
    get_gotify_config,
    notify_gotify,
)
from webapp.runtime import Runtime
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


def _client_ip(request: Request) -> str:
    return request.client.host if request.client else "unknown"


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
    jielong = settings.get("jielong") or {}
    _, gotify_token = get_gotify_config(settings)
    return {
        "amapKey": bool((input_config.get("mapApiKeys") or {}).get("amap")),
        "tencentKey": bool((input_config.get("mapApiKeys") or {}).get("tencent")),
        "modelApiKey": bool(model.get("apiKey")),
        "gotifyToken": bool(gotify_token),
        "jielongToken": bool(jielong.get("authorization")),
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
    if (
        request.method in {"POST", "PUT", "PATCH", "DELETE"}
        and request.url.path.startswith("/api/")
        and request.url.path != "/api/auth/login"
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
    newPassword: str = Field(min_length=12, max_length=256)


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
    return runtime.status()


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


def _journal_context() -> tuple[dict, dict, str]:
    config = read_config(CONFIG_FILE)
    args = login(config["input"], use_cache=True)
    plan = get_plan(
        config["input"]["userAgent"],
        args,
        config=config["input"],
    )
    trainee_id = find_trainee_id(plan)
    if not trainee_id:
        trainee_id = find_trainee_id(
            get_default_plan(
                config["input"]["userAgent"],
                args,
                config=config["input"],
            )
        )
    if not trainee_id:
        raise RuntimeError("未找到 traineeId")
    args["traineeId"] = trainee_id
    return config, args, trainee_id


@protected.get("/journal/bootstrap")
async def journal_bootstrap(page: int = Query(default=1, ge=1, le=1000)):
    def load():
        config, args, trainee_id = _journal_context()
        return {
            "traineeId": trainee_id,
            "years": load_blog_year(args, config["input"]),
            "blogs": blog_list(args, config["input"], page),
            "history": load_journal_history(),
        }

    return await _blocking(load)


@protected.get("/journal/weeks")
async def journal_weeks(
    year: str = Query(min_length=4, max_length=4),
    month: str = Query(min_length=1, max_length=2),
):
    def load():
        config, args, _ = _journal_context()
        return load_blog_date(args, config["input"], year, month)

    return await _blocking(load)


@protected.get("/journal/blogs")
async def journal_blogs(page: int = Query(default=1, ge=1, le=1000)):
    def load():
        config, args, _ = _journal_context()
        return blog_list(args, config["input"], page)

    return await _blocking(load)


class JournalGenerateInput(BaseModel):
    prompt: str = Field(min_length=1, max_length=5000)


@protected.post("/journal/generate")
async def journal_generate(payload: JournalGenerateInput):
    def generate():
        config = read_config(CONFIG_FILE)
        model = config.get("model") or {}
        if all(
            str(model.get(key) or "").strip()
            for key in ("baseUrl", "apiKey", "model")
        ):
            content = call_chat_model(model, payload.prompt, SYSTEM_PROMPT)
        else:
            _, args, _ = _journal_context()
            content = xyb_completion(
                args,
                config["input"],
                payload.prompt,
            )
        append_journal_entry("generated", content)
        return content

    return {"content": await _blocking(generate)}


class JournalSubmitInput(BaseModel):
    blogTitle: str = Field(min_length=1, max_length=200)
    blogBody: str = Field(min_length=50, max_length=10000)
    startDate: str = Field(pattern=r"^\d{4}-\d{2}-\d{2}$")
    endDate: str = Field(pattern=r"^\d{4}-\d{2}-\d{2}$")
    blogOpenType: Literal["1", "2"] = "2"
    traineeId: str = Field(default="", max_length=64)


@protected.post("/journal/submit")
async def journal_submit(payload: JournalSubmitInput):
    def submit():
        config, args, trainee_id = _journal_context()
        result = submit_blog(
            args=args,
            config=config["input"],
            blog_title=payload.blogTitle.strip(),
            blog_body=payload.blogBody.strip(),
            start_date=payload.startDate,
            end_date=payload.endDate,
            blog_open_type=payload.blogOpenType,
            trainee_id=payload.traineeId or trainee_id,
        )
        append_journal_entry("submitted", payload.blogBody.strip())
        return result

    return {"result": await _blocking(submit)}


@protected.delete("/journal/history")
def journal_clear_history(section: Literal["generated", "submitted", "all"] = "all"):
    clear_journal_history(None if section == "all" else section)
    return {"ok": True}


def _jielong_settings() -> dict:
    return (read_config(CONFIG_FILE).get("settings") or {}).get("jielong") or {}


def _save_jielong(values: dict) -> dict:
    config = read_config(CONFIG_FILE)
    settings = config.setdefault("settings", {})
    current = settings.setdefault("jielong", {})
    current.update(values)
    _atomic_save_config(config)
    return current


class JielongSettingsInput(BaseModel):
    authorization: str = Field(default="", max_length=5000)
    threadId: str = Field(default="", max_length=200)
    shareUrl: str = Field(default="", max_length=2000)
    clearToken: bool = False


@protected.get("/jielong/settings")
def get_jielong_settings():
    settings = _jielong_settings()
    return {
        "threadId": str(settings.get("thread_id") or ""),
        "shareUrl": str(settings.get("share_url") or ""),
        "tokenConfigured": bool(settings.get("authorization")),
    }


@protected.put("/jielong/settings")
def update_jielong_settings(payload: JielongSettingsInput):
    values = {
        "thread_id": payload.threadId.strip(),
        "share_url": payload.shareUrl.strip(),
    }
    if payload.authorization.strip():
        values["authorization"] = payload.authorization.strip()
    elif payload.clearToken:
        values["authorization"] = ""
    _save_jielong(values)
    return get_jielong_settings()


@protected.post("/jielong/qr")
async def jielong_qr():
    def create():
        result = create_qr_login()
        image = download_qrcode_image(result["qrcode_url"])
        image_type = "png" if image.startswith(b"\x89PNG\r\n\x1a\n") else "jpeg"
        return {
            "uuid": result["uuid"],
            "image": f"data:image/{image_type};base64,{base64.b64encode(image).decode()}",
        }

    return await _blocking(create)


class JielongPollInput(BaseModel):
    uuid: str = Field(min_length=1, max_length=500)


@protected.post("/jielong/qr/poll")
async def jielong_qr_poll(payload: JielongPollInput):
    def poll():
        state = poll_qr_login(payload.uuid)
        result = {
            "status": state.get("status"),
            "message": state.get("message"),
            "tokenConfigured": False,
        }
        if state.get("status") == "confirmed" and state.get("code"):
            token_response = exchange_qr_login_token(state["code"])
            body = token_response.get("Data") or {}
            token = str(
                body.get("Token")
                or body.get("token")
                or body.get("Authorization")
                or body.get("authorization")
                or ""
            ).strip()
            if not token:
                raise RuntimeError("接龙登录成功但未返回 Token")
            _save_jielong(
                {
                    "authorization": token,
                    "openId": str(body.get("OpenId") or ""),
                    "sId": str(body.get("SId") or ""),
                    "expire": body.get("Expire"),
                }
            )
            result["message"] = "接龙登录成功"
            result["tokenConfigured"] = True
        return result

    return await _blocking(poll)


class ShareUrlInput(BaseModel):
    shareUrl: str = Field(min_length=8, max_length=2000)


@protected.post("/jielong/parse")
async def jielong_parse(payload: ShareUrlInput):
    thread_id = await _blocking(get_thread_id_by_url, payload.shareUrl)
    _save_jielong(
        {"share_url": payload.shareUrl.strip(), "thread_id": thread_id}
    )
    return {"threadId": thread_id}


class JielongLoadInput(BaseModel):
    authorization: str = Field(default="", max_length=5000)
    threadId: str = Field(default="", max_length=200)


@protected.post("/jielong/form")
async def jielong_form(payload: JielongLoadInput):
    settings = _jielong_settings()
    token = payload.authorization.strip() or str(settings.get("authorization") or "")
    thread_id = payload.threadId.strip() or str(settings.get("thread_id") or "")
    if not token:
        raise HTTPException(status_code=422, detail="请先扫码登录或填写 Token")
    if not thread_id:
        raise HTTPException(status_code=422, detail="请先解析分享链接")
    bundle = await _blocking(load_form_bundle, token, thread_id)
    _save_jielong({"authorization": token, "thread_id": thread_id})
    return bundle


def _read_jielong_drafts() -> dict:
    try:
        return read_config(JIELONG_FORM_DRAFTS_FILE)
    except Exception:
        return {}


def _save_jielong_draft(thread_id: str, answers: dict) -> None:
    drafts = _read_jielong_drafts()
    drafts[str(thread_id)] = {"answers": answers}
    path = Path(JIELONG_FORM_DRAFTS_FILE)
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(".tmp")
    temporary.write_text(
        json.dumps(drafts, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    os.replace(temporary, path)


@protected.get("/jielong/draft/{thread_id}")
def jielong_get_draft(thread_id: str):
    return (_read_jielong_drafts().get(thread_id) or {}).get("answers") or {}


class JielongDraftInput(BaseModel):
    answers: dict[str, dict[str, Any]]


@protected.put("/jielong/draft/{thread_id}")
def jielong_save_draft(thread_id: str, payload: JielongDraftInput):
    if len(json.dumps(payload.answers, ensure_ascii=False)) > 200_000:
        raise HTTPException(status_code=413, detail="草稿内容过大")
    _save_jielong_draft(thread_id, payload.answers)
    return {"ok": True}


class JielongSubmitInput(BaseModel):
    threadId: str = Field(min_length=1, max_length=200)
    signature: str = Field(default="", max_length=200)
    number: str = Field(default="", max_length=200)
    answers: dict[str, dict[str, Any]]


@protected.post("/jielong/submit")
async def jielong_submit(payload: JielongSubmitInput):
    if len(json.dumps(payload.answers, ensure_ascii=False)) > 200_000:
        raise HTTPException(status_code=413, detail="表单内容过大")
    settings = _jielong_settings()
    token = str(settings.get("authorization") or "")
    if not token:
        raise HTTPException(status_code=422, detail="接龙 Token 未配置")

    def submit():
        bundle = load_form_bundle(token, payload.threadId)
        answers = copy.deepcopy(payload.answers)
        for answer in answers.values():
            raw_files = answer.get("files") or []
            if not raw_files:
                continue
            prepared_files = []
            for item in raw_files:
                if (
                    isinstance(item, dict)
                    and item.get("RelativePath")
                    and not item.get("LocalPath")
                ):
                    prepared_files.append(item)
                    continue
                name = (
                    item
                    if isinstance(item, str)
                    else item.get("name") or item.get("Name") or item.get("FileName")
                )
                if not name:
                    raise RuntimeError("接龙图片信息无效")
                path = _safe_image_path(str(name))
                prepared_files.extend(build_local_media_files([str(path)]))
            answer["files"] = prepared_files
        submit_payload = build_submit_payload(
            bundle,
            answers,
            signature=payload.signature,
            number=payload.number,
        )
        result = submit_record(token, submit_payload)
        _save_jielong_draft(payload.threadId, payload.answers)
        return result

    return await _blocking(submit)


app.include_router(protected)

if FRONTEND_DIST.is_dir():
    app.mount("/", StaticFiles(directory=FRONTEND_DIST, html=True), name="frontend")
else:
    @app.get("/")
    def frontend_missing():
        return JSONResponse(
            {"detail": "前端尚未构建"},
            status_code=503,
        )
