from __future__ import annotations

import ctypes
import logging
import os
import socket
import time
from contextlib import contextmanager
from pathlib import Path

import psutil

from app.companion.client import CompanionApi
from app.companion.config import load_config, record_refresh, refresh_due
from app.config.common import MITM_CONF_DIR, USER_DATA_DIR, XYB_APP_ID
from app.mitm.cert_state import summarize_cert_state
from app.mitm.service import MitmService
from app.utils.code_channel import CodeChannel
from app.utils.commands import (
    get_system_proxy,
    is_windows,
    open_path_or_url,
    reset_proxy,
    set_proxy,
)


LOGGER = logging.getLogger("credential_companion")
RENDERER_NAMES = {"wechatappex.exe", "weixinappex.exe"}
ERROR_ALREADY_EXISTS = 183


def configure_logging() -> Path:
    log_path = Path(USER_DATA_DIR) / "logs" / "credential_companion.log"
    log_path.parent.mkdir(parents=True, exist_ok=True)
    if not LOGGER.handlers:
        handler = logging.FileHandler(log_path, encoding="utf-8")
        handler.setFormatter(
            logging.Formatter("%(asctime)s | %(levelname)s | %(message)s")
        )
        LOGGER.addHandler(handler)
        LOGGER.setLevel(logging.INFO)
        LOGGER.propagate = False
    return log_path


def _free_proxy_port(start: int = 13140, count: int = 20) -> int:
    for port in range(start, start + count):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            try:
                sock.bind(("127.0.0.1", port))
            except OSError:
                continue
            return port
    raise RuntimeError("本机没有可用的临时代理端口")


@contextmanager
def _single_instance():
    if os.name != "nt":
        yield True
        return
    kernel32 = ctypes.windll.kernel32
    kernel32.CreateMutexW.argtypes = [ctypes.c_void_p, ctypes.c_int, ctypes.c_wchar_p]
    kernel32.CreateMutexW.restype = ctypes.c_void_p
    kernel32.GetLastError.argtypes = []
    kernel32.GetLastError.restype = ctypes.c_ulong
    kernel32.ReleaseMutex.argtypes = [ctypes.c_void_p]
    kernel32.ReleaseMutex.restype = ctypes.c_int
    kernel32.CloseHandle.argtypes = [ctypes.c_void_p]
    kernel32.CloseHandle.restype = ctypes.c_int
    handle = kernel32.CreateMutexW(
        None,
        1,
        "Local\\SignSignInCredentialCompanion",
    )
    if not handle:
        raise ctypes.WinError()
    acquired = kernel32.GetLastError() != ERROR_ALREADY_EXISTS
    try:
        yield acquired
    finally:
        if acquired:
            kernel32.ReleaseMutex(handle)
        kernel32.CloseHandle(handle)


def _stop_applet_renderers() -> int:
    stopped = 0
    processes = []
    for process in psutil.process_iter(["name"]):
        try:
            if str(process.info.get("name") or "").lower() in RENDERER_NAMES:
                process.kill()
                processes.append(process)
                stopped += 1
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            continue
    if processes:
        psutil.wait_procs(processes, timeout=5)
        # WeChat needs a short interval to tear down the old WMPF host before
        # it can accept a new launch request reliably.
        time.sleep(1)
    return stopped


def _wake_wechat_applet(retries: int = 3) -> None:
    urls = (
        f"weixin://launchapplet/?app_id={XYB_APP_ID}",
        f"weixin://launchapplet?app_id={XYB_APP_ID}",
    )
    last_error: Exception | None = None
    for attempt in range(retries):
        for url in urls:
            try:
                open_path_or_url(url)
                LOGGER.info("已发送第 %s 次校友邦小程序唤醒指令", attempt + 1)
                return
            except OSError as exc:
                last_error = exc
        time.sleep(0.8)
    raise RuntimeError(
        "无法通过 weixin:// 唤醒电脑版微信，请确认微信已安装并登录"
    ) from last_error


def _capture_wechat_code(timeout_seconds: int = 90) -> str:
    if not is_windows():
        raise RuntimeError("真实微信凭证采集只能在 Windows 上运行")

    channel = CodeChannel.instance()
    channel.reset()
    channel.start()
    port = _free_proxy_port()
    proxy = f"127.0.0.1:{port}"
    service = MitmService(host="127.0.0.1", port=port)
    original_proxy = get_system_proxy()
    proxy_changed = original_proxy != proxy
    code = ""

    try:
        if not service.start():
            raise RuntimeError(service.last_error or "本机临时代理启动失败")
        certificate_ready, certificate_detail = summarize_cert_state()
        if not certificate_ready:
            certificate = Path(MITM_CONF_DIR) / "mitmproxy-ca-cert.cer"
            raise RuntimeError(
                f"需要先把 {certificate} 安装到当前用户的‘受信任的根证书颁发机构’"
                f"（{certificate_detail}）"
            )
        if proxy_changed:
            set_proxy(proxy)
        _stop_applet_renderers()
        _wake_wechat_applet()
        LOGGER.info("已唤醒校友邦小程序，等待真实 wx.login 请求")

        def keep_proxy_active() -> None:
            if get_system_proxy() != proxy:
                LOGGER.warning("系统代理被其他程序改动，已自动切回临时代理")
                set_proxy(proxy)

        code = channel.wait_code(
            timeout_seconds=timeout_seconds,
            heartbeat=keep_proxy_active,
        )
        LOGGER.info("已捕获一次性 Code，准备交给 OpenWrt")
        return code
    finally:
        if service.is_running():
            service.stop_mitm()
        if proxy_changed:
            reset_proxy(original_proxy, proxy)
        if code:
            _stop_applet_renderers()


class CredentialCompanion:
    def __init__(self):
        self.config = load_config()
        self.api = CompanionApi(
            self.config["server_url"],
            self.config["token"],
        )

    def close(self) -> None:
        self.api.close()

    def _refresh_due(self, status: dict, force: bool) -> bool:
        return refresh_due(self.config, status, force=force)

    def _wait_for_refresh(self, task_id: str, timeout_seconds: int = 60) -> dict:
        deadline = time.time() + timeout_seconds
        while time.time() < deadline:
            task = self.api.task(task_id)
            if task.get("status") == "success":
                return self.api.status()
            if task.get("status") in {"failed", "cancelled"}:
                raise RuntimeError(str(task.get("message") or "OpenWrt 凭证刷新失败"))
            time.sleep(1)
        raise RuntimeError("OpenWrt 凭证刷新超时")

    def run_once(self, *, force: bool = False) -> str:
        status = self.api.status()
        if bool(status.get("busy")):
            LOGGER.info("OpenWrt 当前有任务运行，本轮跳过")
            return "busy"
        if not self._refresh_due(status, force):
            LOGGER.info("真实微信凭证尚在主动刷新周期内")
            return "fresh"

        code = _capture_wechat_code()
        task = self.api.refresh_session(code)
        task_id = str(task.get("id") or "")
        if not task_id:
            raise RuntimeError("OpenWrt 未返回凭证刷新任务 ID")
        final_status = self._wait_for_refresh(task_id)
        if bool(final_status.get("needsRefresh")):
            raise RuntimeError("OpenWrt 刷新任务结束后会话仍不可用")
        now = int(time.time())
        record_refresh(now)
        self.config["last_refresh_at"] = now
        LOGGER.info("真实微信凭证已在 OpenWrt 更新")
        return "refreshed"


def run_once(*, force: bool = False) -> str:
    configure_logging()
    with _single_instance() as acquired:
        if not acquired:
            LOGGER.info("另一凭证采集进程仍在运行，本轮跳过")
            return "busy-local"
        companion = CredentialCompanion()
        try:
            return companion.run_once(force=force)
        finally:
            companion.close()
