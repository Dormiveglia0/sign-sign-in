from __future__ import annotations

import argparse
import os
import subprocess
import sys
import time
from pathlib import Path

from app.companion.client import CompanionApi
from app.companion.config import CONFIG_FILE, load_config, normalize_server_url, save_config


TASK_NAME = "SignSignIn Credential Companion"


def _pair(args) -> int:
    server_url = normalize_server_url(args.server)
    pairing_code = args.code or input("请输入管理页显示的一次性配对码: ").strip()
    api = CompanionApi(server_url)
    try:
        token = api.pair(pairing_code)
    finally:
        api.close()
    save_config(
        server_url,
        token,
        refresh_interval_hours=args.refresh_hours,
    )
    print(f"配对成功，令牌已使用 Windows DPAPI 保存到 {CONFIG_FILE}")
    return 0


def _status(_args) -> int:
    config = load_config()
    api = CompanionApi(config["server_url"], config["token"])
    try:
        status = api.status()
    finally:
        api.close()
    task = status.get("task") or {}
    print(
        "OpenWrt="
        + ("需要刷新" if status.get("needsRefresh") else "凭证可用")
        + f"，任务={task.get('status') or 'unknown'}"
    )
    return 0


def _run(args) -> int:
    from app.companion.runner import LOGGER, configure_logging, run_once

    configure_logging()
    if args.once:
        try:
            print(run_once(force=args.force))
        except Exception as exc:
            LOGGER.error("凭证采集失败: %s", exc)
            raise
        return 0
    while True:
        try:
            run_once(force=args.force)
        except Exception as exc:
            LOGGER.error("凭证采集失败: %s", exc)
            print(f"凭证采集失败: {exc}", file=sys.stderr)
        args.force = False
        time.sleep(max(60, args.poll_minutes * 60))


def _scheduled_action() -> str:
    root = Path(__file__).resolve().parents[2]
    script = root / "scripts" / "credential_companion.py"
    python = root / ".venv" / "Scripts" / "python.exe"
    pythonw = root / ".venv" / "Scripts" / "pythonw.exe"
    if not python.exists():
        raise RuntimeError("请先运行 scripts\\credential_companion.cmd 完成依赖初始化")
    executable = pythonw if pythonw.exists() else python
    return subprocess.list2cmdline(
        [str(executable), str(script), "run", "--once"]
    )


def _install_task(args) -> int:
    if os.name != "nt":
        raise RuntimeError("计划任务只能在 Windows 上安装")
    load_config()
    command = [
        "schtasks.exe",
        "/Create",
        "/TN",
        TASK_NAME,
        "/SC",
        "MINUTE",
        "/MO",
        str(max(5, min(args.minutes, 60))),
        "/TR",
        _scheduled_action(),
        "/RL",
        "LIMITED",
        "/IT",
        "/F",
    ]
    result = subprocess.run(command, capture_output=True, text=True, check=False)
    if result.returncode != 0:
        raise RuntimeError((result.stderr or result.stdout or "创建计划任务失败").strip())
    print("Windows 计划任务已安装；仅在当前用户登录且微信可用时运行。")
    return 0


def _remove_task(_args) -> int:
    if os.name != "nt":
        raise RuntimeError("计划任务只能在 Windows 上移除")
    result = subprocess.run(
        ["schtasks.exe", "/Delete", "/TN", TASK_NAME, "/F"],
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError((result.stderr or result.stdout or "移除计划任务失败").strip())
    print("Windows 计划任务已移除。")
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="SignSignIn 真实微信凭证采集端")
    subparsers = parser.add_subparsers(dest="command", required=True)

    pair = subparsers.add_parser("pair", help="使用管理页的一次性配对码进行配对")
    pair.add_argument("--server", required=True, help="OpenWrt 管理页根地址")
    pair.add_argument("--code", default="", help="一次性配对码")
    pair.add_argument("--refresh-hours", type=int, default=24)
    pair.set_defaults(handler=_pair)

    status = subparsers.add_parser("status", help="读取采集端和 OpenWrt 状态")
    status.set_defaults(handler=_status)

    run = subparsers.add_parser("run", help="运行凭证自动采集")
    run.add_argument("--once", action="store_true")
    run.add_argument("--force", action="store_true")
    run.add_argument("--poll-minutes", type=int, default=5)
    run.set_defaults(handler=_run)

    install = subparsers.add_parser("install-task", help="安装 Windows 计划任务")
    install.add_argument("--minutes", type=int, default=5)
    install.set_defaults(handler=_install_task)

    remove = subparsers.add_parser("remove-task", help="移除 Windows 计划任务")
    remove.set_defaults(handler=_remove_task)
    return parser


def main(argv=None) -> int:
    args = build_parser().parse_args(argv)
    try:
        return int(args.handler(args) or 0)
    except Exception as exc:
        print(f"错误: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
