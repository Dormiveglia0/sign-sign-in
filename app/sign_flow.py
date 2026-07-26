"""Headless sign-in flow shared by the Linux web service.

The desktop client owns window/proxy orchestration. This module deliberately
contains only the reusable business flow so it can run without PySide6.
"""

from __future__ import annotations

import copy
import logging
import math
import random
import threading
from typing import Any

from app.apis.xybsyw import (
    get_default_plan,
    get_plan,
    login,
    photo_sign_in_or_out,
    regeo,
    simple_sign_in_or_out,
)
from app.config.common import CONFIG_FILE
from app.utils.files import check_img, read_config, validate_config


class TaskCancelled(RuntimeError):
    pass


def jitter_location(input_config: dict, rng=random) -> None:
    location = input_config.get("location")
    if not isinstance(location, dict):
        return

    try:
        longitude = float(location.get("longitude"))
        latitude = float(location.get("latitude"))
        radius = float(input_config.get("locationJitterMeters", 100))
    except (TypeError, ValueError):
        return

    radius = max(0.0, min(radius, 500.0))
    if radius == 0:
        return

    distance = radius * math.sqrt(rng.random())
    bearing = rng.random() * 2 * math.pi
    earth_radius = 6_378_137.0
    latitude_radians = math.radians(latitude)
    angular_distance = distance / earth_radius

    new_latitude = math.asin(
        math.sin(latitude_radians) * math.cos(angular_distance)
        + math.cos(latitude_radians)
        * math.sin(angular_distance)
        * math.cos(bearing)
    )
    new_longitude = math.radians(longitude) + math.atan2(
        math.sin(bearing)
        * math.sin(angular_distance)
        * math.cos(latitude_radians),
        math.cos(angular_distance)
        - math.sin(latitude_radians) * math.sin(new_latitude),
    )
    location["latitude"] = f"{math.degrees(new_latitude):.6f}"
    location["longitude"] = f"{math.degrees(new_longitude):.6f}"
    logging.info(
        "📍 已应用位置抖动，半径≈%sm，坐标更新为 %s, %s",
        int(radius),
        location["longitude"],
        location["latitude"],
    )


def find_trainee_id(value: Any) -> str:
    if isinstance(value, dict):
        trainee_id = value.get("traineeId")
        if trainee_id:
            return str(trainee_id)
        clock_vo = value.get("clockVo")
        if isinstance(clock_vo, dict) and clock_vo.get("traineeId"):
            return str(clock_vo["traineeId"])
        for item in value.values():
            found = find_trainee_id(item)
            if found:
                return found
    elif isinstance(value, list):
        for item in value:
            found = find_trainee_id(item)
            if found:
                return found
    return ""


def mode_to_option(mode: str, image_path: str = "") -> dict:
    options = {
        "in": {"action": "普通签到", "code": "2"},
        "out": {"action": "普通签退", "code": "1"},
        "both": {
            "action": "普通签到签退",
            "code": "2",
            "steps": [
                {"action": "普通签到", "code": "2"},
                {"action": "普通签退", "code": "1"},
            ],
        },
        "photo_in": {"action": "拍照签到", "code": "2"},
        "photo_out": {"action": "拍照签退", "code": "1"},
    }
    if mode not in options:
        raise RuntimeError(f"不支持的打卡模式: {mode}")
    option = copy.deepcopy(options[mode])
    if mode.startswith("photo_"):
        option["image_path"] = check_img(image_path)
    return option


class SignFlow:
    def __init__(
        self,
        config_file: str = CONFIG_FILE,
        stop_event: threading.Event | None = None,
    ):
        self.config_file = config_file
        self.stop_event = stop_event or threading.Event()

    def check_stop(self) -> None:
        if self.stop_event.is_set():
            raise TaskCancelled("任务已停止")

    def load_config(self) -> dict:
        config = read_config(self.config_file)
        error = validate_config(config)
        if error:
            raise RuntimeError(error)
        return config

    def refresh_session(self, code: str) -> dict:
        self.check_stop()
        code = str(code or "").strip()
        if not code:
            raise RuntimeError("Code 不能为空")
        config = self.load_config()
        input_config = copy.deepcopy(config["input"])
        input_config["code"] = code
        logging.info("🔐 正在使用新 Code 刷新会话")
        session = login(input_config, use_cache=False)
        self.check_stop()
        logging.info("✅ 会话刷新成功")
        return session

    def run(self, option: dict) -> dict:
        self.check_stop()
        config = self.load_config()
        input_config = copy.deepcopy(config["input"])
        jitter_location(input_config)

        action = str(option.get("action") or "")
        if action in {"拍照签到", "拍照签退"}:
            option = {**option, "image_path": check_img(option.get("image_path"))}

        logging.info("🚀 开始执行 %s", action)
        args = login(input_config, use_cache=True)
        self.check_stop()

        plan_data = get_plan(
            userAgent=input_config["userAgent"],
            args=args,
            config=input_config,
        )
        trainee_id = find_trainee_id(plan_data)
        if not trainee_id:
            logging.info("实习计划列表未返回 traineeId，读取默认计划")
            trainee_id = find_trainee_id(
                get_default_plan(
                    userAgent=input_config["userAgent"],
                    args=args,
                    config=input_config,
                )
            )
        if not trainee_id:
            raise RuntimeError("获取实习计划失败：未找到 traineeId")

        self.check_stop()
        geo = regeo(
            input_config["userAgent"],
            input_config["location"],
            input_config.get("mapProvider", "amap"),
            input_config.get("mapApiKeys", {}),
        )
        self.check_stop()

        if action in {"普通签到", "普通签退"}:
            simple_sign_in_or_out(
                args=args,
                config=input_config,
                geo=geo,
                traineeId=trainee_id,
                opt=option,
            )
        elif action == "普通签到签退":
            for step in option.get("steps") or []:
                self.check_stop()
                simple_sign_in_or_out(
                    args=args,
                    config=input_config,
                    geo=geo,
                    traineeId=trainee_id,
                    opt=step,
                )
        elif action in {"拍照签到", "拍照签退"}:
            photo_sign_in_or_out(
                args=args,
                config=input_config,
                geo=geo,
                traineeId=trainee_id,
                opt=option,
            )
        else:
            raise RuntimeError(f"不支持的打卡操作: {action}")

        self.check_stop()
        logging.info("✅ %s执行完毕", action)
        return {"action": action, "traineeId": trainee_id}


def _self_check() -> None:
    class FixedRandom:
        @staticmethod
        def random():
            return 0.5

    sample = {
        "location": {"longitude": "116.397128", "latitude": "39.916527"},
        "locationJitterMeters": 100,
    }
    jitter_location(sample, FixedRandom)
    assert sample["location"] != {
        "longitude": "116.397128",
        "latitude": "39.916527",
    }
    assert mode_to_option("both")["steps"][1]["code"] == "1"
    assert find_trainee_id({"dateList": [{"clockVo": {"traineeId": 42}}]}) == "42"


if __name__ == "__main__":
    _self_check()
