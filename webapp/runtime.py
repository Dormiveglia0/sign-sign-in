from __future__ import annotations

import copy
import ipaddress
import json
import logging
import os
import random
import threading
import time
import uuid
from collections import deque
from datetime import datetime, timedelta
from pathlib import Path
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from app.config.common import (
    CONFIG_FILE,
    MITM_CONF_DIR,
    PACKET_LOG_FILE,
    SESSION_CACHE_FILE,
)
from app.apis.xybsyw import (
    auto_login,
    is_session_expired_error,
)
from app.mitm.service import MitmService
from app.sign_flow import SignFlow, TaskCancelled, mode_to_option
from app.utils.code_channel import CodeChannel
from app.utils.files import (
    get_valid_session_cache,
    list_images,
    load_session_cache,
    read_config,
)
from app.utils.gotify import get_gotify_config, notify_gotify

TASK_HISTORY_FILE = Path(SESSION_CACHE_FILE).with_name("web_task_history.json")
SCHEDULE_IMAGE_HISTORY_FILE = Path(SESSION_CACHE_FILE).with_name(
    "scheduled_image_history.json"
)
CREDENTIAL_RENEW_SECONDS = 20 * 60 * 60
CREDENTIAL_RETRY_SECONDS = 6 * 60 * 60


def iso_now() -> str:
    return datetime.now().astimezone().isoformat(timespec="seconds")


class MemoryLogHandler(logging.Handler):
    def __init__(self, max_entries: int = 800):
        super().__init__(logging.INFO)
        self.entries: deque[dict] = deque(maxlen=max_entries)
        self.lock = threading.RLock()
        self.counter = 0

    def emit(self, record: logging.LogRecord) -> None:
        try:
            message = record.getMessage()
        except Exception:
            return
        with self.lock:
            self.counter += 1
            self.entries.append(
                {
                    "id": self.counter,
                    "time": datetime.fromtimestamp(record.created)
                    .astimezone()
                    .isoformat(timespec="seconds"),
                    "level": record.levelname.lower(),
                    "message": message,
                }
            )

    def snapshot(self, after: int = 0, limit: int = 300) -> list[dict]:
        with self.lock:
            items = [item.copy() for item in self.entries if item["id"] > after]
        return items[-max(1, min(limit, 500)) :]

    def clear(self) -> None:
        with self.lock:
            self.entries.clear()


def _load_history() -> deque[dict]:
    try:
        with TASK_HISTORY_FILE.open("r", encoding="utf-8") as handle:
            values = json.load(handle)
        if isinstance(values, list):
            return deque(values[-50:], maxlen=50)
    except (OSError, json.JSONDecodeError):
        pass
    return deque(maxlen=50)


def _save_history(history: deque[dict]) -> None:
    TASK_HISTORY_FILE.parent.mkdir(parents=True, exist_ok=True)
    temporary = TASK_HISTORY_FILE.with_suffix(".tmp")
    with temporary.open("w", encoding="utf-8") as handle:
        json.dump(list(history), handle, ensure_ascii=False, indent=2)
    os.replace(temporary, TASK_HISTORY_FILE)


class ImageRotation:
    """Select scheduled photos without repeats until the library is exhausted."""

    def __init__(self):
        self.lock = threading.RLock()

    @staticmethod
    def _available() -> list[Path]:
        return [Path(path) for path in list_images()]

    @staticmethod
    def _load_used() -> list[str]:
        try:
            with SCHEDULE_IMAGE_HISTORY_FILE.open("r", encoding="utf-8") as handle:
                payload = json.load(handle)
            if isinstance(payload, dict) and isinstance(payload.get("used"), list):
                return [str(name) for name in payload["used"]]
        except (OSError, json.JSONDecodeError):
            pass
        return []

    @staticmethod
    def _save_used(used: list[str]) -> None:
        SCHEDULE_IMAGE_HISTORY_FILE.parent.mkdir(parents=True, exist_ok=True)
        temporary = SCHEDULE_IMAGE_HISTORY_FILE.with_suffix(".tmp")
        with temporary.open("w", encoding="utf-8") as handle:
            json.dump(
                {"used": used, "updatedAt": iso_now()},
                handle,
                ensure_ascii=False,
                indent=2,
            )
        os.chmod(temporary, 0o600)
        os.replace(temporary, SCHEDULE_IMAGE_HISTORY_FILE)

    def choose(self, *, remember: bool) -> str:
        images = self._available()
        if not images:
            raise RuntimeError("图片库为空，请先上传签到图片")
        if not remember:
            return str(random.choice(images))

        with self.lock:
            names = {path.name for path in images}
            used = [name for name in self._load_used() if name in names]
            candidates = [path for path in images if path.name not in used]
            if not candidates:
                used = []
                candidates = images
            selected = random.choice(candidates)
            self._save_used([*used, selected.name])
            return str(selected)

    def snapshot(self) -> dict:
        with self.lock:
            images = self._available()
            names = {path.name for path in images}
            used = [name for name in self._load_used() if name in names]
        return {
            "used": len(used),
            "total": len(images),
            "remaining": max(0, len(images) - len(used)),
        }


class TaskManager:
    def __init__(self, image_rotation: ImageRotation | None = None):
        self.lock = threading.RLock()
        self.stop_event = threading.Event()
        self.thread: threading.Thread | None = None
        self.image_rotation = image_rotation or ImageRotation()
        self.history = _load_history()
        self.state = {
            "id": "",
            "status": "idle",
            "source": "",
            "mode": "",
            "action": "",
            "message": "等待任务",
            "startedAt": None,
            "finishedAt": None,
        }

    def snapshot(self) -> dict:
        with self.lock:
            return copy.deepcopy(self.state)

    def history_snapshot(self) -> list[dict]:
        with self.lock:
            return list(reversed(copy.deepcopy(self.history)))

    def _start(self, *, mode: str, action: str, source: str, target) -> dict:
        with self.lock:
            if self.state["status"] in {"queued", "running", "stopping"}:
                raise RuntimeError("已有任务正在执行")
            self.stop_event = threading.Event()
            self.state = {
                "id": uuid.uuid4().hex[:12],
                "status": "queued",
                "source": source,
                "mode": mode,
                "action": action,
                "message": "任务已进入执行队列",
                "startedAt": iso_now(),
                "finishedAt": None,
            }
            task_id = self.state["id"]
            self.thread = threading.Thread(
                target=self._run,
                args=(task_id, target),
                name=f"web-task-{task_id}",
                daemon=True,
            )
            self.thread.start()
            return copy.deepcopy(self.state)

    def start_sign(
        self,
        mode: str,
        image_path: str = "",
        source: str = "manual",
        random_image: bool = False,
    ) -> dict:
        with self.lock:
            if self.state["status"] in {"queued", "running", "stopping"}:
                raise RuntimeError("已有任务正在执行")
            if mode.startswith("photo_") and random_image:
                image_path = self.image_rotation.choose(remember=source == "auto")
                logging.info(
                    "🎲 %s随机图片: %s",
                    "定时任务不重复" if source == "auto" else "手动任务",
                    Path(image_path).name,
                )
            option = mode_to_option(mode, image_path)
            return self._start(
                mode=mode,
                action=option["action"],
                source=source,
                target=lambda flow: flow.run(option),
            )

    def start_session_refresh(self, code: str, source: str = "manual") -> dict:
        return self._start(
            mode="session",
            action="更新校友邦登录凭证",
            source=source,
            target=lambda flow: flow.refresh_session(code),
        )

    def _run(self, task_id: str, target) -> None:
        with self.lock:
            if self.state["id"] != task_id:
                return
            self.state["status"] = "running"
            self.state["message"] = "正在执行"

        success = False
        result = None
        try:
            try:
                result = target(SignFlow(stop_event=self.stop_event))
            except Exception as initial_error:
                if not is_session_expired_error(initial_error):
                    raise
                with self.lock:
                    if self.state["id"] == task_id:
                        self.state["message"] = "SESSION 已失效，正在静默续期"
                logging.warning("🔄 SESSION 已失效，正在静默续期")
                config = read_config(CONFIG_FILE)
                auto_login(config["input"])
                result = target(SignFlow(stop_event=self.stop_event))
            status = "success"
            message = "执行完毕"
            success = True
        except TaskCancelled:
            status = "cancelled"
            message = "任务已停止"
            logging.warning("🚫 任务已停止")
        except Exception as exc:
            status = "failed"
            message = str(exc)
            logging.error("❌ 任务失败: %s", message)

        with self.lock:
            if self.state["id"] != task_id:
                return
            self.state["status"] = status
            self.state["message"] = message
            self.state["finishedAt"] = iso_now()
            if result:
                self.state["result"] = result
            record = copy.deepcopy(self.state)
            self.history.append(record)
            try:
                _save_history(self.history)
            except OSError as exc:
                logging.warning("保存任务历史失败: %s", exc)
        self._notify_result(record, success)

    @staticmethod
    def _notify_result(record: dict, success: bool) -> None:
        try:
            settings = read_config(CONFIG_FILE).get("settings", {})
            if not settings.get("notifications_enabled"):
                return
            url, token = get_gotify_config(settings)
            if not url or not token:
                return
            result = "成功" if success else "失败"
            notify_gotify(
                title=f"{record.get('action') or '任务'}{result}",
                content=(
                    f"来源：{'定时任务' if record.get('source') == 'auto' else '手动'}\n"
                    f"时间：{record.get('finishedAt')}\n"
                    f"结果：{record.get('message')}"
                ),
                server_url=url,
                token=token,
            )
            logging.info("Gotify 推送成功")
        except Exception as exc:
            logging.warning("Gotify 推送失败: %s", exc)

    def cancel(self) -> dict:
        with self.lock:
            if self.state["status"] not in {"queued", "running"}:
                raise RuntimeError("当前没有可停止的任务")
            self.state["status"] = "stopping"
            self.state["message"] = "正在等待当前请求结束"
            self.stop_event.set()
            return copy.deepcopy(self.state)


def _timezone(config: dict) -> ZoneInfo:
    name = str((config.get("settings") or {}).get("timezone") or "Asia/Shanghai")
    try:
        return ZoneInfo(name)
    except ZoneInfoNotFoundError:
        logging.warning("无效时区 %s，已回退到 Asia/Shanghai", name)
        return ZoneInfo("Asia/Shanghai")


def _valid_schedule_tasks(config: dict) -> list[dict]:
    raw = ((config.get("settings") or {}).get("auto_clock") or {}).get("tasks")
    if not isinstance(raw, list):
        return []
    tasks = []
    for item in raw:
        if not isinstance(item, dict):
            continue
        mode = str(item.get("mode") or "").strip()
        task_time = str(item.get("time") or "").strip()
        try:
            hour, minute = (int(part) for part in task_time.split(":", 1))
        except (TypeError, ValueError):
            continue
        if mode not in {"in", "out", "photo_in", "photo_out"}:
            continue
        if not (0 <= hour <= 23 and 0 <= minute <= 59):
            continue
        tasks.append(
            {
                "time": f"{hour:02d}:{minute:02d}",
                "mode": mode,
                "image_path": str(
                    item.get("image_path") or item.get("imagePath") or ""
                ),
                "random_image": bool(
                    item.get("random_image") or item.get("randomImage")
                ),
            }
        )
    return tasks


class Scheduler:
    def __init__(self, task_manager: TaskManager):
        self.task_manager = task_manager
        self.stop_event = threading.Event()
        self.lock = threading.RLock()
        self.next_runs: dict[str, datetime] = {}
        self.thread = threading.Thread(
            target=self._loop,
            name="web-scheduler",
            daemon=True,
        )

    def start(self) -> None:
        self.reload()
        self.thread.start()

    def stop(self) -> None:
        self.stop_event.set()
        if self.thread.is_alive():
            self.thread.join(timeout=2)

    @staticmethod
    def _task_key(index: int, task: dict) -> str:
        return (
            f"{index}:{task['mode']}:{task['time']}:"
            f"{task.get('image_path', '')}:{int(task.get('random_image', False))}"
        )

    @staticmethod
    def _randomized_time(
        day: datetime,
        task_time: str,
        random_minutes: int,
    ) -> datetime:
        hour, minute = (int(part) for part in task_time.split(":"))
        base_minutes = hour * 60 + minute
        offset = random.randint(-random_minutes, random_minutes) if random_minutes else 0
        final_minutes = max(0, min(1439, base_minutes + offset))
        return day.replace(
            hour=final_minutes // 60,
            minute=final_minutes % 60,
            second=0,
            microsecond=0,
        )

    def _next_for(self, now: datetime, task: dict, random_minutes: int) -> datetime:
        candidate = self._randomized_time(now, task["time"], random_minutes)
        if candidate <= now:
            candidate = self._randomized_time(
                now + timedelta(days=1),
                task["time"],
                random_minutes,
            )
        return candidate

    def reload(self) -> None:
        config = read_config(CONFIG_FILE)
        settings = config.get("settings") or {}
        auto_clock = settings.get("auto_clock") or {}
        tasks = _valid_schedule_tasks(config)
        random_minutes = max(0, min(120, int(auto_clock.get("random_minutes") or 0)))
        now = datetime.now(_timezone(config))
        with self.lock:
            previous = self.next_runs
            self.next_runs = {}
            for index, task in enumerate(tasks):
                key = self._task_key(index, task)
                future = previous.get(key)
                self.next_runs[key] = (
                    future
                    if future is not None and future > now
                    else self._next_for(now, task, random_minutes)
                )

    def snapshot(self) -> dict:
        config = read_config(CONFIG_FILE)
        auto_clock = (config.get("settings") or {}).get("auto_clock") or {}
        tasks = _valid_schedule_tasks(config)
        with self.lock:
            next_items = []
            for index, task in enumerate(tasks):
                next_at = self.next_runs.get(self._task_key(index, task))
                next_items.append(
                    {
                        **task,
                        "nextAt": next_at.isoformat(timespec="seconds")
                        if next_at
                        else None,
                    }
                )
        return {
            "enabled": bool(auto_clock.get("enabled")) and bool(tasks),
            "randomMinutes": int(auto_clock.get("random_minutes") or 0),
            "taskCount": len(tasks),
            "tasks": next_items,
            "timezone": str(_timezone(config)),
            "imageRotation": self.task_manager.image_rotation.snapshot(),
        }

    def _loop(self) -> None:
        while not self.stop_event.wait(1):
            try:
                self._tick()
            except Exception:
                logging.exception("定时调度检查失败")

    def _tick(self) -> None:
        config = read_config(CONFIG_FILE)
        auto_clock = (config.get("settings") or {}).get("auto_clock") or {}
        if not auto_clock.get("enabled"):
            return
        tasks = _valid_schedule_tasks(config)
        if not tasks:
            return
        if self.task_manager.snapshot()["status"] in {"queued", "running", "stopping"}:
            return

        random_minutes = max(0, min(120, int(auto_clock.get("random_minutes") or 0)))
        now = datetime.now(_timezone(config))
        for index, task in enumerate(tasks):
            key = self._task_key(index, task)
            with self.lock:
                next_at = self.next_runs.get(key)
                if next_at is None:
                    next_at = self._next_for(now, task, random_minutes)
                    self.next_runs[key] = next_at
            if now < next_at:
                continue
            logging.info("⏱️ 触发定时任务 %s %s", task["time"], task["mode"])
            try:
                self.task_manager.start_sign(
                    task["mode"],
                    task.get("image_path", ""),
                    source="auto",
                    random_image=bool(task.get("random_image")),
                )
            except Exception as exc:
                logging.error("定时任务启动失败: %s", exc)
            with self.lock:
                self.next_runs[key] = self._randomized_time(
                    now + timedelta(days=1),
                    task["time"],
                    random_minutes,
                )
            break


class SessionKeeper:
    """在 encryptValue 失效窗口前低频轮换登录凭证。"""

    def __init__(self, task_manager: TaskManager):
        self.task_manager = task_manager
        self.stop_event = threading.Event()
        self.lock = threading.RLock()
        self.retry_at = 0
        self.state = {
            "status": "starting",
            "lastAttemptAt": None,
            "lastSuccessAt": None,
            "nextAttemptAt": None,
            "lastError": "",
        }
        self.thread = threading.Thread(
            target=self._loop,
            name="session-keeper",
            daemon=True,
        )

    @staticmethod
    def _iso(timestamp: int) -> str | None:
        if not timestamp:
            return None
        return datetime.fromtimestamp(timestamp).astimezone().isoformat(
            timespec="seconds"
        )

    @staticmethod
    def _cache_details() -> tuple[dict, bool, int]:
        cache = load_session_cache()
        available = bool(
            cache.get("encryptValue")
            and cache.get("openId")
            and cache.get("unionId")
        )
        try:
            timestamp = int(cache.get("timestamp") or 0)
        except (TypeError, ValueError):
            timestamp = 0
        return cache, available, timestamp

    def start(self) -> None:
        self.thread.start()

    def stop(self) -> None:
        self.stop_event.set()
        if self.thread.is_alive():
            self.thread.join(timeout=2)

    def _tick(self) -> None:
        cache, available, timestamp = self._cache_details()
        if not available:
            with self.lock:
                self.state.update(
                    status="not_initialized",
                    lastSuccessAt=None,
                    nextAttemptAt=None,
                    lastError="",
                )
            return

        now = int(time.time())
        if self.task_manager.snapshot()["status"] in {
            "queued",
            "running",
            "stopping",
        }:
            return
        if cache.get("valid") is not False and now < timestamp + CREDENTIAL_RENEW_SECONDS:
            self.retry_at = 0
            with self.lock:
                self.state.update(
                    status="active",
                    lastSuccessAt=self._iso(timestamp),
                    nextAttemptAt=self._iso(timestamp + CREDENTIAL_RENEW_SECONDS),
                    lastError="",
                )
            return
        if self.retry_at and now < self.retry_at:
            return

        attempted_at = iso_now()
        with self.lock:
            self.state.update(
                status="renewing",
                lastAttemptAt=attempted_at,
                lastError="",
            )
        try:
            config = read_config(CONFIG_FILE)
            session = auto_login(config["input"], cache.get("sessionId"))
        except Exception as exc:
            self.retry_at = now + CREDENTIAL_RETRY_SECONDS
            with self.lock:
                self.state.update(
                    status="retrying",
                    nextAttemptAt=self._iso(self.retry_at),
                    lastError=str(exc),
                )
            logging.warning("校友邦凭证维护失败，6 小时后重试: %s", exc)
            return

        self.retry_at = 0
        succeeded_at = int(time.time())
        with self.lock:
            self.state.update(
                status="active",
                lastSuccessAt=self._iso(succeeded_at),
                nextAttemptAt=self._iso(succeeded_at + CREDENTIAL_RENEW_SECONDS),
                lastError="",
            )
        logging.info(
            "✅ 校友邦凭证维护成功，SESSION 尾号 %s",
            str(session.get("sessionId") or "")[-4:],
        )

    def _loop(self) -> None:
        while not self.stop_event.is_set():
            try:
                self._tick()
            except Exception:
                logging.exception("校友邦凭证维护检查失败")
            if self.stop_event.wait(60):
                break

    def snapshot(self) -> dict:
        _, available, _ = self._cache_details()
        with self.lock:
            return {
                "enabled": True,
                "credentialAvailable": available,
                "intervalMinutes": CREDENTIAL_RENEW_SECONDS // 60,
                **copy.deepcopy(self.state),
            }


class CaptureManager:
    TIMEOUT_SECONDS = 5 * 60

    def __init__(self, task_manager: TaskManager):
        self.task_manager = task_manager
        self.lock = threading.RLock()
        self.stop_event = threading.Event()
        self.thread: threading.Thread | None = None
        self.service: MitmService | None = None
        self.allowed_client_ip = ""
        self.packet_log_offset = 0
        self.state = {
            "status": "idle",
            "message": "抓包服务未启动",
            "host": "0.0.0.0",
            "port": 13140,
            "startedAt": None,
            "expiresAt": None,
            "certReady": False,
            "events": [],
            "diagnosis": "尚未启动代理",
        }

    @staticmethod
    def _packet_log_size() -> int:
        try:
            return Path(PACKET_LOG_FILE).stat().st_size
        except OSError:
            return 0

    def _recent_events(self) -> list[str]:
        path = Path(PACKET_LOG_FILE)
        try:
            size = path.stat().st_size
            offset = self.packet_log_offset if self.packet_log_offset <= size else 0
            with path.open("rb") as handle:
                handle.seek(offset)
                lines = handle.read().decode("utf-8", errors="replace").splitlines()
        except OSError:
            return []

        hidden = ("[QUERY]", "[FORM]", "[BODY]", "content-type=")
        visible = (
            "[MITM][CLIENT]",
            "[MITM][CONNECT]",
            "[MITM][HOST]",
            "[MITM][TLS-FAILED]",
            "[MITM][REQ]",
            "[MITM][RES]",
            "code 已写入",
        )
        events = [
            line
            for line in lines
            if not any(marker in line for marker in hidden)
            and any(marker in line for marker in visible)
        ]
        return events[-18:]

    @staticmethod
    def _diagnosis(status: str, events: list[str]) -> str:
        tls_failures = [line for line in events if "[TLS-FAILED]" in line]
        if any(
            "xybsyw.com" in line or "jielong.com" in line
            for line in tls_failures
        ):
            return "目标小程序已连接，但客户端拒绝抓包 CA；该设备无法远程解密"
        if tls_failures:
            return "设备已连接，但部分 HTTPS 客户端拒绝抓包 CA"
        if any("code 已写入" in line for line in events):
            return "已捕获 Code，正在刷新 SESSION"
        if any("getOpenId.action" in line for line in events):
            return "已看到校友邦登录请求，正在提取 Code"
        if events:
            return f"代理已收到设备流量，当前显示最近 {len(events)} 条活动"
        if status in {"starting", "waiting", "refreshing"}:
            return "代理已启动，尚未收到设备连接"
        return "本次没有收到可显示的代理活动"

    def snapshot(self) -> dict:
        with self.lock:
            state = copy.deepcopy(self.state)
        events = self._recent_events()
        state["events"] = events
        state["diagnosis"] = self._diagnosis(state["status"], events)
        state["certReady"] = Path(
            MITM_CONF_DIR,
            "mitmproxy-ca-cert.cer",
        ).exists()
        return state

    def start(self, allowed_client_ip: str) -> dict:
        try:
            allowed_client_ip = str(
                ipaddress.ip_address(allowed_client_ip.split("%", 1)[0])
            )
        except ValueError as exc:
            raise RuntimeError("无法识别当前客户端公网 IP") from exc
        with self.lock:
            if self.state["status"] in {"starting", "waiting", "refreshing"}:
                raise RuntimeError("抓包服务已在运行")
            if self.task_manager.snapshot()["status"] in {"queued", "running", "stopping"}:
                raise RuntimeError("请先等待当前任务结束")
            self.stop_event = threading.Event()
            self.allowed_client_ip = allowed_client_ip
            self.packet_log_offset = self._packet_log_size()
            self.state = {
                "status": "starting",
                "message": "正在启动临时抓包代理",
                "host": "0.0.0.0",
                "port": 13140,
                "startedAt": iso_now(),
                "expiresAt": (
                    datetime.now().astimezone()
                    + timedelta(seconds=self.TIMEOUT_SECONDS)
                ).isoformat(timespec="seconds"),
                "certReady": False,
                "events": [],
                "diagnosis": "代理正在启动",
            }
            self.thread = threading.Thread(
                target=self._run,
                name="web-capture",
                daemon=True,
            )
            self.thread.start()
            return copy.deepcopy(self.state)

    def _run(self) -> None:
        try:
            channel = CodeChannel.instance()
            channel.reset()
            channel.start()
            self.service = MitmService(
                host="0.0.0.0",
                allowed_client_ip=self.allowed_client_ip,
            )
            if not self.service.start():
                with self.lock:
                    self.state["status"] = "failed"
                    self.state["message"] = (
                        self.service.last_error or "抓包代理启动失败"
                    )
                    self.state["expiresAt"] = None
                return
        except Exception as exc:
            with self.lock:
                self.state["status"] = "failed"
                self.state["message"] = f"抓包代理启动失败: {exc}"
                self.state["expiresAt"] = None
            logging.exception("抓包代理启动失败")
            return

        with self.lock:
            self.state["status"] = "waiting"
            self.state["message"] = (
                f"等待校友邦小程序请求（仅允许 {self.allowed_client_ip}）"
            )
            self.state["certReady"] = True
        logging.info("🛡️ 临时抓包代理已启动，5 分钟后自动关闭")

        try:
            payload = channel.wait_payload(
                timeout_seconds=self.TIMEOUT_SECONDS,
                source="xyb_code",
                stop_check=self._check_stop,
            )
            code = str(payload.get("code") or "").strip()
            if not code:
                raise RuntimeError("抓包结果中没有 Code")
            with self.lock:
                self.state["status"] = "refreshing"
                self.state["message"] = "已捕获 Code，正在更新校友邦登录凭证"
            logging.info("✅ 已捕获 Code，正在关闭代理并更新校友邦登录凭证")
            self.service.stop_mitm()
            self.task_manager.start_session_refresh(code, source="capture")
            while not self.stop_event.wait(0.3):
                task = self.task_manager.snapshot()
                if task["status"] not in {"queued", "running", "stopping"}:
                    with self.lock:
                        self.state["status"] = (
                            "success" if task["status"] == "success" else "failed"
                        )
                        self.state["message"] = task["message"]
                        self.state["expiresAt"] = None
                    break
        except TaskCancelled:
            with self.lock:
                self.state["status"] = "stopped"
                self.state["message"] = "抓包已停止"
                self.state["expiresAt"] = None
        except Exception as exc:
            with self.lock:
                self.state["status"] = "failed"
                self.state["message"] = str(exc)
                self.state["expiresAt"] = None
            logging.error("抓包失败: %s", exc)
        finally:
            if self.service and self.service.is_running():
                self.service.stop_mitm()

    def _check_stop(self) -> None:
        if self.stop_event.is_set():
            raise TaskCancelled("抓包已停止")

    def stop(self) -> dict:
        with self.lock:
            if self.state["status"] not in {"starting", "waiting", "refreshing"}:
                raise RuntimeError("抓包服务当前未运行")
            self.stop_event.set()
            self.state["message"] = "正在关闭抓包服务"
        if self.service and self.service.is_running():
            self.service.stop_mitm()
        return self.snapshot()


class Runtime:
    def __init__(self):
        self.logs = MemoryLogHandler()
        self.image_rotation = ImageRotation()
        self.tasks = TaskManager(self.image_rotation)
        self.scheduler = Scheduler(self.tasks)
        self.session_keeper = SessionKeeper(self.tasks)
        self.capture = CaptureManager(self.tasks)

    def start(self) -> None:
        root_logger = logging.getLogger()
        root_logger.setLevel(logging.INFO)
        if self.logs not in root_logger.handlers:
            root_logger.addHandler(self.logs)
        self.scheduler.start()
        self.session_keeper.start()
        logging.info("SignSignIn Linux 服务已启动")

    def stop(self) -> None:
        try:
            if self.capture.snapshot()["status"] in {
                "starting",
                "waiting",
                "refreshing",
            }:
                self.capture.stop()
        except Exception:
            pass
        self.session_keeper.stop()
        self.scheduler.stop()
        logging.info("SignSignIn Linux 服务已停止")
        logging.getLogger().removeHandler(self.logs)

    def status(self) -> dict:
        session = get_valid_session_cache()
        raw_session = load_session_cache()
        cached_at = None
        if raw_session.get("timestamp"):
            cached_at = datetime.fromtimestamp(
                int(raw_session["timestamp"])
            ).astimezone().isoformat(timespec="seconds")
        renewal_available = bool(
            raw_session.get("encryptValue")
            and raw_session.get("openId")
            and raw_session.get("unionId")
        )
        auto_login_available = bool(raw_session.get("encryptValue"))
        wechat_recovery_available = bool(
            raw_session.get("openId") and raw_session.get("unionId")
        )
        return {
            "time": iso_now(),
            "pid": os.getpid(),
            "session": {
                "valid": bool(session),
                "renewalAvailable": renewal_available,
                "autoLoginAvailable": auto_login_available,
                "wechatRecoveryAvailable": wechat_recovery_available,
                "suffix": (
                    str(session.get("sessionId") or "")[-4:] if session else ""
                ),
                "cachedAt": cached_at,
                "autoRenew": self.session_keeper.snapshot(),
            },
            "task": self.tasks.snapshot(),
            "scheduler": self.scheduler.snapshot(),
            "capture": self.capture.snapshot(),
        }
