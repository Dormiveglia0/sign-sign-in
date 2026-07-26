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

from app.config.common import CONFIG_FILE, MITM_CONF_DIR, SESSION_CACHE_FILE
from app.mitm.service import MitmService
from app.sign_flow import SignFlow, TaskCancelled, mode_to_option
from app.utils.code_channel import CodeChannel
from app.utils.files import get_valid_session_cache, read_config
from app.utils.pushplus import notify_pushplus

TASK_HISTORY_FILE = Path(SESSION_CACHE_FILE).with_name("web_task_history.json")


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


class TaskManager:
    def __init__(self):
        self.lock = threading.RLock()
        self.stop_event = threading.Event()
        self.thread: threading.Thread | None = None
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
    ) -> dict:
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
            action="刷新会话",
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
            notifications = settings.get("notifications") or []
            token = next(
                (
                    str(item.get("token") or "").strip()
                    for item in notifications
                    if isinstance(item, dict)
                    and item.get("type") == "pushplus"
                    and item.get("token")
                ),
                "",
            )
            if not token:
                token = str((settings.get("pushplus") or {}).get("token") or "").strip()
            if not token:
                return
            result = "成功" if success else "失败"
            notify_pushplus(
                title=f"{record.get('action') or '任务'}{result}",
                content=(
                    f"来源：{'定时任务' if record.get('source') == 'auto' else '手动'}\n"
                    f"时间：{record.get('finishedAt')}\n"
                    f"结果：{record.get('message')}"
                ),
                token=token,
            )
            logging.info("PushPlus 推送成功")
        except Exception as exc:
            logging.warning("PushPlus 推送失败: %s", exc)

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
        return f"{index}:{task['mode']}:{task['time']}:{task.get('image_path', '')}"

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


class CaptureManager:
    TIMEOUT_SECONDS = 5 * 60

    def __init__(self, task_manager: TaskManager):
        self.task_manager = task_manager
        self.lock = threading.RLock()
        self.stop_event = threading.Event()
        self.thread: threading.Thread | None = None
        self.service: MitmService | None = None
        self.allowed_client_ip = ""
        self.state = {
            "status": "idle",
            "message": "抓包服务未启动",
            "host": "0.0.0.0",
            "port": 13140,
            "startedAt": None,
            "expiresAt": None,
            "certReady": False,
        }

    def snapshot(self) -> dict:
        with self.lock:
            state = copy.deepcopy(self.state)
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
                self.state["message"] = "已捕获 Code，正在刷新会话"
            logging.info("✅ 已捕获 Code，正在关闭代理并刷新会话")
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
        self.tasks = TaskManager()
        self.scheduler = Scheduler(self.tasks)
        self.capture = CaptureManager(self.tasks)

    def start(self) -> None:
        root_logger = logging.getLogger()
        root_logger.setLevel(logging.INFO)
        if self.logs not in root_logger.handlers:
            root_logger.addHandler(self.logs)
        self.scheduler.start()
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
        self.scheduler.stop()
        logging.info("SignSignIn Linux 服务已停止")
        logging.getLogger().removeHandler(self.logs)

    def status(self) -> dict:
        session = get_valid_session_cache()
        raw_session = {}
        if os.path.exists(SESSION_CACHE_FILE):
            try:
                with open(SESSION_CACHE_FILE, "r", encoding="utf-8") as handle:
                    raw_session = json.load(handle)
            except (OSError, json.JSONDecodeError):
                pass
        expires_at = None
        if raw_session.get("timestamp"):
            expires_at = datetime.fromtimestamp(
                int(raw_session["timestamp"])
                + int(raw_session.get("expire_seconds", 86400))
            ).astimezone().isoformat(timespec="seconds")
        return {
            "time": iso_now(),
            "pid": os.getpid(),
            "session": {
                "valid": bool(session),
                "suffix": (
                    str(session.get("sessionId") or "")[-4:] if session else ""
                ),
                "expiresAt": expires_at,
            },
            "task": self.tasks.snapshot(),
            "scheduler": self.scheduler.snapshot(),
            "capture": self.capture.snapshot(),
        }
