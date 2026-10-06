"""Use the configured notification module without changing task outcomes."""

import logging
from datetime import datetime

from app.config.common import CONFIG_FILE
from app.utils.files import read_config
from app.utils.gotify import get_gotify_config, notify_gotify


def notify_result(action, success, message, *, source="manual", finished_at=None,
                  result_label=None):
    try:
        settings = read_config(CONFIG_FILE).get("settings", {})
        if not settings.get("notifications_enabled"):
            return False
        url, token = get_gotify_config(settings)
        if not url or not token:
            return False
        notify_gotify(
            title=f"{action}{result_label or ('成功' if success else '失败')}",
            content=(f"来源：{'定时任务' if source == 'auto' else '手动'}\n"
                     f"时间：{finished_at or datetime.now().astimezone().isoformat(timespec='seconds')}\n"
                     f"结果：{message}"),
            server_url=url, token=token,
        )
        logging.info("Gotify 推送成功")
        return True
    except Exception as exc:
        logging.warning("Gotify 推送失败: %s", exc)
        return False
