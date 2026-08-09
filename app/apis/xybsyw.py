import base64
import hashlib
import logging
import os
import secrets
import tempfile
import threading
import time
from functools import lru_cache
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from PIL import Image, ImageDraw, ImageFont

from app.config.common import (
    AMAP_WEB_KEY,
    BASE_DIR,
    SESSION_CACHE_FILE,
    XYB_N_HEADER,
    XYB_REFERER,
    XYB_VERSION,
)
from app.utils.common import get_timestamp
from app.utils.files import (
    check_img,
    get_img_file,
    get_valid_session_cache,
    invalidate_session_cache,
    load_session_cache,
    save_session_cache,
)
from app.utils.params import (
    create_security_fingerprint,
    get_device_code,
    get_header_token,
    get_security_params,
    get_security_url_token,
)

TENCENT_MAP_KEY = "GOZBZ-E4L67-6WLXT-PSLBH-2WEZZ-LOFLE"
SECURITY_FINGERPRINT_FILE = Path(SESSION_CACHE_FILE).with_name(
    "xyb_security_device_fp"
)
_auto_login_lock = threading.Lock()
_security_fingerprint_lock = threading.Lock()
_security_token_lock = threading.Lock()
_security_token_cache = {}
_account_login_challenge_lock = threading.Lock()
_account_login_challenges = {}
ACCOUNT_LOGIN_CHALLENGE_TTL = 5 * 60
ACCOUNT_LOGIN_CHALLENGE_LIMIT = 8
SESSION_REAUTH_REQUIRED = (
    "校友邦 SESSION 已失效，请使用账号密码和图形验证码恢复，"
    "或重新获取 Code 初始化凭证"
)


class SessionExpired(RuntimeError):
    pass


_SENSITIVE_LOG_KEYS = {
    "authorization",
    "cookie",
    "devicecode",
    "encryptvalue",
    "jsessionid",
    "openid",
    "password",
    "piccode",
    "sessionid",
    "unionid",
}


def _redact_for_log(value):
    if isinstance(value, dict):
        return {
            key: (
                "***"
                if str(key).lower() in _SENSITIVE_LOG_KEYS
                else _redact_for_log(item)
            )
            for key, item in value.items()
        }
    if isinstance(value, (list, tuple)):
        return [_redact_for_log(item) for item in value]
    return value


def _response_log_summary(response):
    try:
        payload = response.json()
    except Exception:
        return {
            "status": response.status_code,
            "contentType": response.headers.get("content-type", ""),
            "contentLength": len(response.content or b""),
        }
    if not isinstance(payload, dict):
        return {"status": response.status_code, "type": type(payload).__name__}
    data = payload.get("data")
    return {
        "status": response.status_code,
        "code": payload.get("code"),
        "msg": payload.get("msg", payload.get("message", "")),
        "hasData": data is not None,
        "dataType": type(data).__name__ if data is not None else "none",
    }


def is_session_expired_error(error):
    current = error
    while current is not None:
        if isinstance(current, SessionExpired):
            return True
        current = current.__cause__ or current.__context__
    return False


def _normalize_address_text(value):
    if value is None:
        return ""
    if isinstance(value, str):
        return value.strip()
    if isinstance(value, (list, tuple, set)):
        parts = [_normalize_address_text(item) for item in value]
        return " ".join(part for part in parts if part).strip()
    if isinstance(value, dict):
        for key in ("formatted_address", "address", "name", "value"):
            text = _normalize_address_text(value.get(key))
            if text:
                return text
        return str(value).strip()
    return str(value).strip()


def check_session_validity(response_json):
    """
    检查响应是否表示会话已失效
    当响应类似 {'code': '205', 'data': None, 'msg': '未登录', ...} 时返回True
    """
    if isinstance(response_json, dict):
        code = response_json.get('code')
        msg = response_json.get('msg', '')
        if code == '205' or (code == 205) or '未登录' in str(msg):
            return False
    return True


def handle_invalid_session():
    """标记当前 SESSION 失效，保留字段仅供状态诊断。"""
    invalidate_session_cache()
    logging.warning("❌ JSESSIONID 已失效，需要重新初始化凭证")


def _normalize_map_provider(provider):
    provider = str(provider or "amap").strip().lower()
    if provider in ("tencent", "qq", "qqmap"):
        return "tencent"
    return "amap"


def _map_key(custom_key, default_key):
    key = str(custom_key or "").strip()
    return key or default_key


def _response_message(data):
    if isinstance(data, dict):
        msg = data.get("msg", data.get("message"))
        if msg is not None and str(msg).strip():
            return str(msg)
    return str(data)


def _is_success_code(code):
    return code == "200" or code == 200


def _assert_session(response_json):
    if not check_session_validity(response_json):
        handle_invalid_session()
        raise SessionExpired('❌ JSESSIONID已失效')


def _require_data(response, context):
    try:
        res = response.json()
    except Exception as exc:
        raise RuntimeError(f"{context}: 响应解析失败 {exc}") from exc
    _assert_session(res)
    if response.status_code != 200 or not _is_success_code(res.get("code")) or "data" not in res:
        raise RuntimeError(f"{context}: {_response_message(res)}")
    return res.get("data")


def _require_success(response, context):
    try:
        res = response.json()
    except Exception as exc:
        raise RuntimeError(f"{context}: 响应解析失败 {exc}") from exc
    _assert_session(res)
    if response.status_code != 200 or not _is_success_code(res.get("code")):
        raise RuntimeError(f"{context}: {_response_message(res)}")
    return res


def _security_fingerprint(config):
    fingerprint = str(config.get("securityFingerprint") or "").strip().lower()
    if len(fingerprint) == 32 and all(
        char in "0123456789abcdef" for char in fingerprint
    ):
        return fingerprint

    with _security_fingerprint_lock:
        try:
            fingerprint = SECURITY_FINGERPRINT_FILE.read_text(
                encoding="utf-8"
            ).strip().lower()
        except OSError:
            fingerprint = ""
        if not (
            len(fingerprint) == 32
            and all(char in "0123456789abcdef" for char in fingerprint)
        ):
            fingerprint = create_security_fingerprint()
            SECURITY_FINGERPRINT_FILE.parent.mkdir(parents=True, exist_ok=True)
            temporary = SECURITY_FINGERPRINT_FILE.with_suffix(".tmp")
            temporary.write_text(fingerprint, encoding="utf-8")
            os.chmod(temporary, 0o600)
            os.replace(temporary, SECURITY_FINGERPRINT_FILE)

    config["securityFingerprint"] = fingerprint
    return fingerprint


def _base_xyb_headers(config):
    return {
        "v": XYB_VERSION,
        "xweb_xhr": "1",
        "content-type": "application/x-www-form-urlencoded",
        "referer": XYB_REFERER,
        "User-Agent": config["userAgent"],
    }


def _fetch_security_token(config, fingerprint, args=None, timeout=5):
    with _security_token_lock:
        cached = _security_token_cache.get(fingerprint)
        if cached and time.monotonic() + 40 < cached["expiresAt"]:
            return cached["value"]

        url = "https://xcx.xybsyw.com/common/GetToken.action"
        headers = _base_xyb_headers(config)
        cookies = (
            {"JSESSIONID": args["sessionId"]}
            if args and args.get("sessionId")
            else None
        )
        logging.debug(
            "准备请求校友邦风控Token: url:%s, headers:%s, "
            "data:{'fp': '***'}, cookies:%s",
            url,
            _redact_for_log(headers),
            _redact_for_log(cookies),
        )
        response = requests.post(
            url,
            headers=headers,
            cookies=cookies,
            data={"fp": fingerprint},
            timeout=timeout,
        )
        logging.debug(
            "收到风控Token响应: %s",
            _response_log_summary(response),
        )
        try:
            payload = response.json()
        except Exception as exc:
            raise RuntimeError(
                f"获取校友邦风控Token失败: 响应解析失败 {exc}"
            ) from exc
        data = payload.get("data") if isinstance(payload, dict) else None
        if (
            response.status_code != 200
            or not isinstance(payload, dict)
            or not _is_success_code(payload.get("code"))
            or not data
        ):
            raise RuntimeError(
                f"获取校友邦风控Token失败: {_response_message(payload)}"
            )
        if not data:
            raise RuntimeError("获取校友邦风控Token失败: data为空")
        token = str(data)
        try:
            expires_at = time.monotonic() + int(token[1:4])
        except (TypeError, ValueError):
            expires_at = 0
        if expires_at:
            _security_token_cache[fingerprint] = {
                "value": token,
                "expiresAt": expires_at,
            }
        return token


def _build_security_context(data, config, args=None):
    fingerprint = _security_fingerprint(config)
    try:
        security_token = _fetch_security_token(
            config,
            fingerprint,
            args=args,
        )
    except Exception as exc:
        # 594 小程序会捕获 GetToken 异常，并用空 token/st 继续原请求。
        # 这样公共登录接口在旧 SESSION 已失效时仍有机会返回验证码。
        logging.warning(
            "校友邦风控 Token 获取失败，按 594 逻辑以空 Token 继续: %s",
            exc,
        )
        security_token = ""
    return {
        "params": get_security_params(data, security_token, fingerprint),
        "url_token": get_security_url_token(security_token),
    }


def _form_post(
    url,
    data,
    config,
    args,
    include_device_code=False,
    timeout=5,
    request_client=None,
    use_session_cookies=False,
):
    security = _build_security_context(data, config, args=args)
    request_data = {**data, **security["params"]}
    headers = {
        **_base_xyb_headers(config),
        "encryptvalue": args.get("encryptValue", ""),
        "n": XYB_N_HEADER,
        "wechat": "1",
    }
    if include_device_code:
        headers["devicecode"] = get_device_code(openId=args.get("openId", ""), device=config["device"])
    session_id = str(args.get("sessionId") or "")
    cookies = {"JSESSIONID": session_id} if session_id else None
    logging.debug(
        "准备发起校友邦请求。url:%s, headers:%s, data:%s, cookies:%s",
        url,
        _redact_for_log(headers),
        _redact_for_log(request_data),
        _redact_for_log(cookies),
    )
    client = request_client or requests
    request_options = {
        "headers": headers,
        "data": request_data,
        "params": {"t": security["url_token"]},
        "timeout": timeout,
    }
    if not use_session_cookies:
        request_options["cookies"] = cookies
    response = client.post(url, **request_options)
    logging.debug("收到响应: %s", _response_log_summary(response))
    return response


def _account_login_args(cache=None):
    cache = cache or load_session_cache()
    return {
        "sessionId": str(cache.get("sessionId") or ""),
        "encryptValue": str(cache.get("encryptValue") or ""),
        "openId": str(cache.get("openId") or ""),
        "unionId": str(cache.get("unionId") or ""),
        "traineeId": cache.get("traineeId"),
    }


def _captcha_data_uri(value, client):
    if isinstance(value, dict):
        value = (
            value.get("image")
            or value.get("codeImage")
            or value.get("base64")
            or ""
        )
    text = str(value or "").strip()
    if not text:
        raise RuntimeError("获取图形验证码失败: 返回图片为空")
    if text.startswith("data:image/"):
        return text

    if text.startswith(("https://", "http://", "/")):
        image_url = urljoin("https://xcx.xybsyw.com/", text)
        parsed = urlparse(image_url)
        if parsed.scheme != "https" or parsed.hostname != "xcx.xybsyw.com":
            raise RuntimeError("获取图形验证码失败: 图片地址不受信任")
        response = client.get(image_url, timeout=10)
        response.raise_for_status()
        content_type = response.headers.get("content-type", "image/png")
        if not content_type.startswith("image/"):
            content_type = "image/png"
        encoded = base64.b64encode(response.content).decode("ascii")
        return f"data:{content_type};base64,{encoded}"

    compact = "".join(text.split())
    try:
        raw = base64.b64decode(compact, validate=True)
    except Exception as exc:
        raise RuntimeError("获取图形验证码失败: 图片格式无法解析") from exc
    if raw.startswith(b"\xff\xd8\xff"):
        content_type = "image/jpeg"
    elif raw.startswith(b"GIF8"):
        content_type = "image/gif"
    elif raw.startswith(b"RIFF") and raw[8:12] == b"WEBP":
        content_type = "image/webp"
    else:
        content_type = "image/png"
    return f"data:{content_type};base64,{compact}"


def _purge_account_login_challenges(now=None):
    now = time.time() if now is None else now
    expired = [
        challenge_id
        for challenge_id, challenge in _account_login_challenges.items()
        if challenge["expiresAt"] <= now
    ]
    for challenge_id in expired:
        challenge = _account_login_challenges.pop(challenge_id, None)
        if challenge:
            challenge["client"].close()


def clear_account_login_challenges():
    with _account_login_challenge_lock:
        for challenge in _account_login_challenges.values():
            challenge["client"].close()
        _account_login_challenges.clear()


def create_account_login_challenge(config):
    """获取账号登录图形验证码，并在内存中保留同一 HTTP 会话。"""
    cache = load_session_cache()
    args = _account_login_args(cache)
    client = requests.Session()
    if args["sessionId"]:
        client.cookies.set("JSESSIONID", args["sessionId"])

    response = _form_post(
        "https://xcx.xybsyw.com/school/common/plugins/loadCaptcha.action",
        {},
        config=config,
        args=args,
        include_device_code=False,
        timeout=10,
        request_client=client,
        use_session_cookies=True,
    )
    try:
        payload = response.json()
    except Exception as exc:
        raise RuntimeError(
            f"获取图形验证码失败: 响应解析失败 {exc}"
        ) from exc
    image = payload.get("data") if isinstance(payload, dict) else None
    if (
        response.status_code != 200
        or not isinstance(payload, dict)
        or not _is_success_code(payload.get("code"))
        or not image
    ):
        raise RuntimeError(
            f"获取图形验证码失败: {_response_message(payload)}"
        )

    try:
        image_uri = _captcha_data_uri(image, client)
    except Exception:
        client.close()
        raise

    challenge_id = secrets.token_urlsafe(32)
    expires_at = time.time() + ACCOUNT_LOGIN_CHALLENGE_TTL
    with _account_login_challenge_lock:
        _purge_account_login_challenges()
        while len(_account_login_challenges) >= ACCOUNT_LOGIN_CHALLENGE_LIMIT:
            oldest_id = min(
                _account_login_challenges,
                key=lambda item: _account_login_challenges[item]["expiresAt"],
            )
            oldest = _account_login_challenges.pop(oldest_id)
            oldest["client"].close()
        _account_login_challenges[challenge_id] = {
            "client": client,
            "args": args,
            "expiresAt": expires_at,
        }
    return {
        "challengeId": challenge_id,
        "image": image_uri,
        "expiresAt": int(expires_at),
    }


def _take_account_login_challenge(challenge_id):
    with _account_login_challenge_lock:
        _purge_account_login_challenges()
        challenge = _account_login_challenges.pop(challenge_id, None)
    if not challenge:
        raise RuntimeError("图形验证码已过期，请重新获取")
    return challenge


def _reset_security_context(config):
    with _security_token_lock:
        _security_token_cache.clear()
    with _security_fingerprint_lock:
        try:
            SECURITY_FINGERPRINT_FILE.unlink(missing_ok=True)
        except OSError:
            pass
    config.pop("securityFingerprint", None)


def account_password_login(
    config,
    challenge_id,
    username,
    password,
    pic_code,
):
    """按 594 小程序账号密码流程登录；明文密码只在本次调用内使用。"""
    username = str(username or "").strip()
    password = str(password or "")
    pic_code = str(pic_code or "").strip()
    if not username or not password or not pic_code:
        raise RuntimeError("账号、密码和图形验证码不能为空")

    challenge = _take_account_login_challenge(challenge_id)
    args = challenge["args"]
    device = config.get("device") or {}
    data = {
        "picCode": pic_code,
        "username": username,
        "password": hashlib.md5(password.encode("utf-8")).hexdigest(),
        "openId": args.get("openId", ""),
        "unionId": args.get("unionId", ""),
        "model": device.get("model", ""),
        "brand": device.get("brand", ""),
        "platform": device.get("platform", ""),
        "system": device.get("system", ""),
        "deviceId": "",
    }
    client = challenge["client"]
    try:
        response = _form_post(
            "https://xcx.xybsyw.com/login/login.action",
            data,
            config=config,
            args=args,
            include_device_code=True,
            timeout=15,
            request_client=client,
            use_session_cookies=True,
        )
    finally:
        client.close()
    try:
        payload = response.json()
    except Exception as exc:
        raise RuntimeError(
            f"账号密码登录失败: 响应解析失败 {exc}"
        ) from exc
    renewed = payload.get("data") if isinstance(payload, dict) else None
    if (
        response.status_code != 200
        or not isinstance(payload, dict)
        or not _is_success_code(payload.get("code"))
        or not isinstance(renewed, dict)
        or not renewed.get("sessionId")
        or not renewed.get("encryptValue")
    ):
        raise RuntimeError(
            f"账号密码登录失败: {_response_message(payload)}"
        )

    _reset_security_context(config)
    save_session_cache(
        session_id=renewed["sessionId"],
        encrypt_value=renewed["encryptValue"],
        open_id=str(renewed.get("openId") or args.get("openId") or ""),
        union_id=str(renewed.get("unionId") or args.get("unionId") or ""),
        trainee_id=args.get("traineeId"),
    )
    logging.info("✅ 校友邦账号密码登录成功")
    return get_valid_session_cache()


def auto_login(config, stale_session_id=None):
    """在现有 SESSION 仍有效时主动轮换登录凭证。"""
    with _auto_login_lock:
        cache = load_session_cache()
        if (
            stale_session_id
            and cache.get("sessionId")
            and cache.get("sessionId") != stale_session_id
            and cache.get("valid") is not False
        ):
            return get_valid_session_cache()

        if cache.get("valid") is False:
            raise SessionExpired(SESSION_REAUTH_REQUIRED)

        encrypt_value = str(cache.get("encryptValue") or "").strip()
        open_id = str(cache.get("openId") or "").strip()
        union_id = str(cache.get("unionId") or "").strip()
        if not encrypt_value:
            raise RuntimeError(
                "缺少主动续期凭证，请使用账号密码恢复或重新获取 Code 初始化"
            )

        url = "https://xcx.xybsyw.com/login/AutoLogin.action"
        data = {"encryptValue": encrypt_value}
        security = _build_security_context(
            data,
            config,
            args={"sessionId": cache.get("sessionId")},
        )
        headers = {
            **_base_xyb_headers(config),
            "encryptvalue": encrypt_value,
            "n": XYB_N_HEADER,
            "wechat": "1",
            "devicecode": get_device_code(open_id, config["device"]),
        }
        cookies = (
            {"JSESSIONID": cache["sessionId"]}
            if cache.get("sessionId")
            else None
        )
        response = requests.post(
            url,
            headers=headers,
            cookies=cookies,
            data={**data, **security["params"]},
            params={"t": security["url_token"]},
            timeout=10,
        )
        try:
            payload = response.json()
        except Exception as exc:
            raise RuntimeError(f"主动续期失败: 响应解析失败 {exc}") from exc
        renewed = payload.get("data") if isinstance(payload, dict) else None
        if (
            response.status_code != 200
            or not _is_success_code(payload.get("code"))
            or not isinstance(renewed, dict)
            or not renewed.get("sessionId")
            or not renewed.get("encryptValue")
        ):
            raise RuntimeError(
                f"主动续期失败: {_response_message(payload)}"
            )

        save_session_cache(
            session_id=renewed["sessionId"],
            encrypt_value=renewed["encryptValue"],
            open_id=open_id,
            union_id=union_id,
            trainee_id=cache.get("traineeId"),
        )
        logging.info("✅ SESSION 主动续期成功")
        return get_valid_session_cache()


def _is_plan_empty_body(data):
    message = _response_message(data)
    lower = message.lower()
    return (
        ("列表" in message and "空" in message)
        or ("list" in lower and "empty" in lower)
        or "empty list" in lower
    )


def _normalize_tencent_regeo(result):
    address_component = result.get("address_component") or {}
    ad_info = result.get("ad_info") or {}
    formatted_addresses = result.get("formatted_addresses") or {}
    formatted_address = _normalize_address_text(
        formatted_addresses.get("recommend")
        or formatted_addresses.get("rough")
        or result.get("address")
        or formatted_addresses.get("standard_address")
    )
    return {
        "formatted_address": formatted_address,
        "addressComponent": {
            "province": address_component.get("province", ""),
            "city": address_component.get("city") or address_component.get("province", ""),
            "district": address_component.get("district", ""),
            "street": address_component.get("street", ""),
            "streetNumber": address_component.get("street_number", ""),
            "adcode": ad_info.get("adcode", ""),
        },
    }


def _regeo_tencent(userAgent, location, key=None):
    url = "https://apis.map.qq.com/ws/geocoder/v1/"
    headers = {
        "xweb_xhr": "1",
        "Referer": XYB_REFERER,
        "User-Agent": userAgent,
    }
    params = {
        "location": f"{location['latitude']},{location['longitude']}",
        "key": _map_key(key, TENCENT_MAP_KEY),
        "get_poi": "1",
    }
    try:
        logging.debug(
            "🛩️ 准备发起请求。url:%s, headers:%s, params:%s",
            url,
            headers,
            params,
        )
        response = requests.get(url, headers=headers, params=params, timeout=5)
        logging.debug("📡 收到响应:%s %s", response, response.text)
        res = response.json()
        if response.status_code == 200 and res.get("status") == 0 and res.get("result"):
            regeocode = _normalize_tencent_regeo(res["result"])
            if not regeocode["formatted_address"]:
                regeocode["formatted_address"] = f"{location['longitude']},{location['latitude']}"
            logging.info("📍 解析位置: %s", regeocode["formatted_address"])
            return regeocode
        raise RuntimeError(f"位置解析失败: {res}")
    except Exception as e:
        logging.error("腾讯地图接口请求失败: %s", e)
        raise e


def regeo(userAgent, location, provider="amap", map_keys=None):
    map_keys = map_keys if isinstance(map_keys, dict) else {}
    if _normalize_map_provider(provider) == "tencent":
        return _regeo_tencent(userAgent, location, map_keys.get("tencent"))

    logging.info('正在调用高德地图解析经纬度...')
    url = "https://restapi.amap.com/v3/geocode/regeo"
    headers = {
        "xweb_xhr": "1", "Content-Type": "application/json",
        "Referer": XYB_REFERER,
        "User-Agent": userAgent,
    }
    amap_key = _map_key(map_keys.get("amap"), AMAP_WEB_KEY)
    params = {
        "s": "rsx", "platform": "WXJS", "logversion": "2.0", "extensions": "all",
        "sdkversion": "1.2.0", "key": amap_key,
        "appname": amap_key,
        "location": f"{location['longitude']},{location['latitude']}",
    }
    try:
        logging.debug(f"🛩️ 准备发起请求。url:{url}, headers:{headers}, params:{params}")
        response = requests.get(url, headers=headers, params=params, timeout=5)
        logging.debug(f"📡 收到响应:{response} {response.text}")
        res = response.json()
        if 'regeocode' in res:
            regeocode = dict(res['regeocode'] or {})
            formatted_address = _normalize_address_text(regeocode.get('formatted_address'))
            if not formatted_address:
                formatted_address = f"{location['longitude']},{location['latitude']}"
            regeocode['formatted_address'] = formatted_address
            logging.info(f"📍 解析位置: {formatted_address}")
            return regeocode
        else:
            raise RuntimeError(f"位置解析失败: {res}")
    except Exception as e:
        logging.error(f"高德接口请求失败: {e}")
        raise e


def get_plan(userAgent, args, config=None):
    logging.info('正在获取实习计划...')
    url = "https://xcx.xybsyw.com/student/clock/GetPlan.action"
    data = {}
    config = config if isinstance(config, dict) else {"userAgent": userAgent}

    try:
        response = _form_post(url, data, config=config, args=args, include_device_code=False, timeout=5)
        res = response.json()
        _assert_session(res)
        if _is_plan_empty_body(res):
            return []
        if 'data' in res and res['data']:
            return res['data']
        raise RuntimeError(f"获取计划失败: {res.get('msg', 'Unknown error')}")
    except Exception as e:
        raise RuntimeError(f"计划接口请求异常: {e}")


def get_default_plan(userAgent, args, config=None):
    logging.info('正在获取默认实习计划...')
    url = "https://xcx.xybsyw.com/student/clock/GetPlan!getDefault.action"
    data = {}
    config = config if isinstance(config, dict) else {"userAgent": userAgent}

    try:
        response = _form_post(url, data, config=config, args=args, include_device_code=False, timeout=5)
        res = response.json()
        _assert_session(res)
        if _is_plan_empty_body(res):
            return {}
        return _require_data(response, "获取默认实习计划失败") or {}
    except Exception as e:
        raise RuntimeError(f"默认计划接口请求异常: {e}")


def get_open_id(config, code):
    logging.info("正在获取open_id...")
    url = "https://xcx.xybsyw.com/common/getOpenId.action"
    data = {"code": code}

    try:
        security = _build_security_context(data, config)
        headers = {
            **_base_xyb_headers(config),
            "devicecode": get_device_code("", config['device']),
        }
        request_data = {**data, **security["params"]}
        logging.debug(f"🛩️ 准备发起请求。url:{url}, headers:{headers}, data:{request_data}")
        response = requests.post(
            url=url,
            headers=headers,
            data=request_data,
            params={"t": security["url_token"]},
            allow_redirects=False,
            timeout=5,
        )
        logging.debug(f"📡 收到响应:{response} {response.text}")
        res = response.json()
        if str(res.get('code')) == '202':
            raise RuntimeError(
                "Code 已被消费或过期。Reqable 必须在 getOpenId.action 请求发送前"
                "设置断点，复制 Code 后取消原请求，再立即提交；已完成请求或 "
                "Windows 客户端“获取 Code”日志里的 Code 不能二次使用。"
            )
        return _require_data(response, "获取OpenID失败")
    except Exception as e:
        raise RuntimeError(f"获取OpenID失败: {e}")


def wx_login(config, openIdData):
    logging.info("正在进行微信登录...")
    data = {
        "openId": openIdData['openId'],
        "unionId": openIdData['unionId']
    }
    url = "https://xcx.xybsyw.com/login/login!wx.action"
    try:
        response = _form_post(
            url,
            data,
            config=config,
            args=openIdData,
            include_device_code=True,
            timeout=5,
        )
        logging.debug(f"📡 收到响应:{response} {response.text}")
        return _require_data(response, "登录失败")
    except Exception as e:
        raise RuntimeError(f"登录失败: {e}")


def login(config, use_cache=True):
    """
    登录函数，支持JSESSIONID缓存
    :param config: 配置信息
    :param use_cache: 是否使用缓存，如果为True且缓存有效则直接返回缓存
    :return: 登录结果字典
    """
    # 尝试使用缓存
    if use_cache:
        cached = get_valid_session_cache()
        if cached:
            logging.info('✅ 使用缓存的JSESSIONID')
            return {
                'openId': cached['openId'],
                'unionId': cached['unionId'],
                'encryptValue': cached['encryptValue'],
                'sessionId': cached['sessionId'],
                'traineeId': cached.get('traineeId')
            }
        if load_session_cache().get("valid") is False:
            raise SessionExpired(SESSION_REAUTH_REQUIRED)

    code = config.get('code')
    if not code or code == '':
        raise RuntimeError('❌ Code为空，请重新获取！')

    ### 获取open_id、union_id等信息
    openIdData = get_open_id(config=config, code=code)

    ### 获取登录参数encryptValue、sessionId
    login_data = wx_login(config=config, openIdData=openIdData)

    result = {
        'openId': openIdData['openId'],
        'unionId': openIdData['unionId'],
        'encryptValue': login_data['encryptValue'],
        'sessionId': login_data['sessionId'],
    }

    # 保存到缓存
    save_session_cache(
        session_id=result['sessionId'],
        encrypt_value=result['encryptValue'],
        open_id=result['openId'],
        union_id=result['unionId'],
        trainee_id=result.get('traineeId')
    )
    logging.info('✅ 登录成功，已缓存JSESSIONID')

    return result


# ------------------------------拍照签到----------------------------------------


def photo_sign_in_or_out(args, config, geo, traineeId, opt):
    logging.info('正在执行拍照签到流程...')

    watermark = watermark_info(args=args, config=config, traineeId=traineeId)
    watermarked_path = render_watermarked_photo(opt.get('image_path'), watermark, geo.get('formatted_address', ''))
    policyData = commonPostPolicy(args=args, config=config)
    timestamp = get_timestamp()
    files = get_img_file(timestamp, watermarked_path)
    try:
        ossData = aliyun_OSS(files=files, timestamp=timestamp, policyData=policyData,config=config)
        post_new(args=args, config=config, traineeId=traineeId, geo=geo, imgUrl=ossData['key'], opt=opt)
        # deliver_value(args=args, config=config, traineeId=traineeId)
    finally:
        file_obj = files.get("file", [None, None, None])[1]
        if file_obj:
            file_obj.close()
        try:
            os.remove(watermarked_path)
        except OSError:
            pass


def watermark_info(args, config, traineeId):
    url = "https://xcx.xybsyw.com/student/clock/postNew!watermarkInfo.action"

    data = {
        "traineeId": str(traineeId)
    }

    response = _form_post(url, data, config=config, args=args, include_device_code=False, timeout=5)
    logging.info(f"{response} {response.text}")
    return _require_data(response, "获取拍照打卡水印信息失败")


@lru_cache(maxsize=4)
def _load_watermark_font(size):
    candidates = [
        os.environ.get("SIGN_WATERMARK_FONT", ""),
        os.path.join(
            BASE_DIR,
            "resources",
            "fonts",
            "WenQuanYiZenHei.ttc",
        ),
        r"C:\Windows\Fonts\msyh.ttc",
        r"C:\Windows\Fonts\simhei.ttf",
        "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc",
        "/usr/share/fonts/opentype/noto/NotoSansCJKsc-Regular.otf",
        "/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc",
    ]
    for path in candidates:
        if path and os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                pass
    raise RuntimeError(
        "缺少支持中文的水印字体：请保留 resources/fonts/"
        "WenQuanYiZenHei.ttc，或设置 SIGN_WATERMARK_FONT"
    )


def render_watermarked_photo(image_path, watermark, address):
    source_path = check_img(image_path)
    with Image.open(source_path) as image:
        image = image.convert("RGB")
        width, height = image.size
        scale = min(3000 / width, 3000 / height, 1)
        if scale < 1:
            image = image.resize((max(1, int(width * scale)), max(1, int(height * scale))), Image.LANCZOS)

        draw = ImageDraw.Draw(image)
        draw.text((100, 70), str(watermark.get("time", "")), fill=(255, 255, 255), font=_load_watermark_font(48))
        draw.text((280, 70), str(watermark.get("today", "")), fill=(255, 255, 255), font=_load_watermark_font(32))
        draw.text((100, 120), str(address or ""), fill=(255, 255, 255), font=_load_watermark_font(28))
        draw.text((100, 155), str(watermark.get("info", "")), fill=(255, 255, 255), font=_load_watermark_font(28))

        out_width = max(1, int(image.size[0] * 0.8))
        out_height = max(1, int(image.size[1] * 0.8))
        image = image.resize((out_width, out_height), Image.LANCZOS)
        fd, out_path = tempfile.mkstemp(prefix="xyb-watermark-", suffix=".jpg")
        os.close(fd)
        image.save(out_path, format="JPEG", quality=80)
        return out_path


def commonPostPolicy(args, config):
    logging.info('正在获取上传凭证...')
    url = "https://xcx.xybsyw.com/uploadfile/commonPostPolicy.action"

    data = {
        "customerType": "STUDENT",
        "uploadType": "UPLOAD_STUDENT_CLOCK_IMGAGES",
        "publicRead": "true"
    }

    response = _form_post(url, data, config=config, args=args, include_device_code=True, timeout=5)
    logging.info(f"{response} {response.text}")
    return _require_data(response, "commonPostPolicy请求异常")


def aliyun_OSS(files, timestamp, policyData,config):
    logging.info('正在上传至阿里云OSS...')

    url = policyData['host']

    headers = {
        "Referer": XYB_REFERER,
        "User-Agent": config['userAgent'],
    }

    key = f"{policyData['dir']}/{timestamp}.jpg"
    logging.info(f"key: {key}")

    data = {
        "key": key,
        "policy": policyData['policy'],
        "OSSAccessKeyId": policyData['accessid'],
        "signature": policyData['signature'],
        "success_action_status": "200",
        "customerType": policyData['customParams']['x:customer_type_key'],
        "uploadType": policyData['customParams']['x:upload_type_key'],
        "callback": policyData['callback'],
    }

    logging.debug(f"🛩️ 准备发起请求。url:{url}, headers:{headers}, data:{data}, files:{files}")
    response = requests.post(url, data=data, files=files, headers=headers)
    logging.debug(f"📡 收到响应:{response} {response.text}")

    if response.status_code != 200:
        raise RuntimeError(f"aliyun_OSS请求异常, {response} {response.text}")

    res = response.json()
    return res['vo']


def post_new(args, config, traineeId, geo, imgUrl, opt):
    url = "https://xcx.xybsyw.com/student/clock/PostNew.action"

    data = {
        "traineeId": str(traineeId),
        "adcode": geo['addressComponent']['adcode'],
        "lat": config['location']['latitude'],
        "lng": config['location']['longitude'],
        "address": geo['formatted_address'],
        "deviceName": config['device']['model'],
        # "punchInStatus": "1",
        "punchInStatus": "0",
        # 2：普通签到，1：普通签退
        # "clockStatus": "2",
        "clockStatus": str(opt['code']),
        # "imgUrl": "temp/20251119/school/14422/xcx/student/clock/11621617/1763557557282.jpg",
        "imgUrl": imgUrl,
        "reason": "",
        "addressId": "null"
    }

    response = _form_post(url, data, config=config, args=args, include_device_code=True, timeout=5)
    _require_success(response, "post_new请求异常")


def deliver_value(args, config, traineeId):
    url = "https://xcx.xybsyw.com/student/DeliverValue!post.action"

    data = {
        "traineeId": str(traineeId)
    }

    header_token = get_header_token(data)
    headers = {
        "content-type": "application/x-www-form-urlencoded",
        "encryptvalue": args['encryptValue'],
        "m": header_token['m'],
        "n": header_token['n'],
        "referer": XYB_REFERER,
        "s": header_token['s'],
        "t": header_token['t'],
        "user-agent": config['userAgent'],
        "v": XYB_VERSION,
        "wechat": "1",
        "xweb_xhr": "1"
    }
    cookies = {"JSESSIONID": args['sessionId']}

    logging.debug(f"🛩️ 准备发起请求。url:{url}, headers:{headers}, data:{data}, cookies:{cookies}")
    response = requests.post(url, headers=headers, cookies=cookies, data=data)
    logging.debug(f"📡 收到响应:{response} {response.text}")

    res = response.json()
    if response.status_code != 200 or res['code'] != "200":
        raise RuntimeError(f"deliver_value请求异常, {response} {response.text}")


def simple_sign_in_or_out(args, geo, traineeId, config, opt):
    logging.info(f'正在调用接口进行: {opt["action"]}...')
    url = "https://xcx.xybsyw.com/student/clock/Post.action"
    device = config['device']
    data = {'punchInStatus': "0",  # 2：普通签到，1：普通签退
            'clockStatus': str(opt['code']), 'traineeId': str(traineeId),
            'adcode': geo['addressComponent']['adcode'],
            'model': device['model'], 'brand': device['brand'], 'platform': device['platform'],
            'system': device['system'], 'openId': args['openId'], 'unionId': args['unionId'],
            'lng': config['location']['longitude'], 'lat': config['location']['latitude'],
            'address': geo['formatted_address'], 'deviceName': device['model'], }

    try:
        response = _form_post(url, data, config=config, args=args, include_device_code=True, timeout=5)
        logging.debug(f"📡 收到响应:{response} {response.text}")
        res = response.json()

        _assert_session(res)

        msg = res['msg']
        code = res['code']

        info = ''

        if code == "200":
            if msg == 'success':
                info = f'✅ {opt["action"]}成功！'
                logging.info(info)
            elif msg == '已经签到':
                info = f'✅ 已经{opt["action"]}过了。'
                logging.info(info)
        elif code == "403":
            logging.warning(f'⚠️ {msg}')
        elif code == "202":
            raise RuntimeError(f"配置错误，请检查device和userAgent参数 (Code 202): {msg}")
        else:
            raise RuntimeError(f'操作失败: {msg}')

        return info
    except Exception as e:
        raise RuntimeError(f"签到请求异常: {e}")


# ------------------------------周记相关接口----------------------------------------


def load_blog_year(args, config):
    """加载周记年份和月份"""
    logging.info('正在加载周记年份和月份...')
    url = "https://xcx.xybsyw.com/student/blog/LoadBlogDate!weekYear.action"

    data = {
        "traineeId": str(args.get('traineeId', ''))
    }

    header_token = get_header_token(data)
    headers = {
        "content-type": "application/x-www-form-urlencoded",
        "encryptvalue": args['encryptValue'],
        "m": header_token['m'],
        "n": header_token['n'],
        "referer": XYB_REFERER,
        "s": header_token['s'],
        "t": header_token['t'],
        "user-agent": config['userAgent'],
        "v": XYB_VERSION,
        "wechat": "1",
        "xweb_xhr": "1"
    }
    cookies = {
        "JSESSIONID": args['sessionId']
    }

    try:
        logging.debug(f"🛩️ 准备发起请求。url:{url}, headers:{headers}, data:{data}, cookies:{cookies}")
        response = requests.post(url, headers=headers, cookies=cookies, data=data, timeout=10)
        logging.debug(f"📡 收到响应:{response} {response.text}")
        res = response.json()

        _assert_session(res)

        logging.info(f"加载周记年份和月份：{res.get('data', 'Unknown error')}")
        if res.get('code') == '200' and 'data' in res:
            return res['data']
        else:
            raise RuntimeError(f"加载年份月份失败: {res.get('msg', 'Unknown error')}")
    except Exception as e:
        raise RuntimeError(f"加载年份月份请求异常: {e}")


def load_blog_date(args, config, year, month):
    """加载指定年月下的周信息"""
    logging.info(f'正在加载{year}年{month}月的周信息...')
    url = "https://xcx.xybsyw.com/student/blog/LoadBlogDate!week.action"

    data = {
        "year": str(year),
        "month": str(month),
        "traineeId": str(args.get('traineeId', '')),
        "id": ""
    }

    header_token = get_header_token(data)
    headers = {
        "content-type": "application/x-www-form-urlencoded",
        "encryptvalue": args['encryptValue'],
        "m": header_token['m'],
        "n": header_token['n'],
        "referer": XYB_REFERER,
        "s": header_token['s'],
        "t": header_token['t'],
        "user-agent": config['userAgent'],
        "v": XYB_VERSION,
        "wechat": "1",
        "xweb_xhr": "1"
    }
    cookies = {
        "JSESSIONID": args['sessionId']
    }

    try:
        logging.debug(f"🛩️ 准备发起请求。url:{url}, headers:{headers}, data:{data}, cookies:{cookies}")
        response = requests.post(url, headers=headers, cookies=cookies, data=data, timeout=10)
        logging.debug(f"📡 收到响应:{response} {response.text}")
        res = response.json()

        _assert_session(res)

        logging.info(f"加载周信息：{res.get('msg', 'Unknown error')}")
        if res.get('code') == '200' and 'data' in res:
            return res['data']
        else:
            raise RuntimeError(f"加载周信息失败: {res.get('msg', 'Unknown error')}")
    except Exception as e:
        raise RuntimeError(f"加载周信息请求异常: {e}")


def submit_blog(args, config, blog_title, blog_body, start_date, end_date, blog_open_type, trainee_id):
    """提交周记"""
    logging.info('正在提交周记...')
    url = "https://xcx.xybsyw.com/student/blog/Blog!save.action"

    data = {
        "blogType": "1",
        "blogTitle": blog_title,
        "blogBody": blog_body,
        "blogOpenType": str(blog_open_type),  # 查看权限：1-公开，2-仅自己
        "traineeId": str(trainee_id),
        "isDraft": "0",
        "startDate": start_date,
        "endDate": end_date,
        "backgroundTemplateId": "0",
        "fileJson": "[{\"fileName\":\"\"}]",
        "blogId": "undefined"
    }

    header_token = get_header_token(data)
    headers = {
        "content-type": "application/x-www-form-urlencoded",
        "devicecode": get_device_code(openId=args['openId'], device=config['device']),
        "encryptvalue": args['encryptValue'],
        "m": header_token['m'],
        "n": header_token['n'],
        "referer": XYB_REFERER,
        "s": header_token['s'],
        "t": header_token['t'],
        "user-agent": config['userAgent'],
        "v": XYB_VERSION,
        "wechat": "1",
        "xweb_xhr": "1"
    }
    cookies = {
        "JSESSIONID": args['sessionId']
    }

    try:
        logging.debug(f"🛩️ 准备发起请求。url:{url}, headers:{headers}, data:{data}, cookies:{cookies}")
        response = requests.post(url, headers=headers, cookies=cookies, data=data, timeout=10)
        logging.debug(f"📡 收到响应:{response} {response.text}")
        res = response.json()

        _assert_session(res)

        logging.info(f"提交周记结果: {res}")
        if res.get('code') == '200':
            logging.info(f"提交周记成功: {res.get('msg', 'Unknown error')}")
            return res.get('data')
        else:
            raise RuntimeError(f"提交周记失败: {res.get('msg', 'Unknown error')}")
    except Exception as e:
        raise RuntimeError(f"提交周记请求异常: {e}")


def xyb_completion(args, config, prompt, on_delta=None):
    """
    调用 AI 完成接口
    :param args: 登录参数
    :param config: 配置
    :param prompt: 提示词
    :param on_delta: 流式输出回调函数，接收每个文本片段
    :return: 完整的生成内容
    """
    data = {
        "processType": "0",
        "content": prompt,
        "questionType": "0",
        "type": "0",
        "aiSessionMsgType": "4"
    }
    header_token = get_header_token(data)
    headers = {
        "content-type": "application/x-www-form-urlencoded",
        "devicecode": get_device_code(openId=args['openId'], device=config['device']),
        "encryptvalue": args['encryptValue'],
        "m": header_token['m'],
        "n": header_token['n'],
        "referer": XYB_REFERER,
        "s": header_token['s'],
        "t": header_token['t'],
        "user-agent": config['userAgent'],
        "v": XYB_VERSION,
        "wechat": "1",
        "xweb_xhr": "1"
    }
    cookies = {
        "JSESSIONID": args['sessionId']
    }
    url = "https://xcx.xybsyw.com/careerplanning/saveSession.action"

    try:
        import json
        response = requests.post(url, data=data, headers=headers, cookies=cookies, timeout=60)
        res = response.json()

        if res.get('code') == '200' and 'data' in res:
            content = res['data'].get('content', '')
            if on_delta and content:
                # 模拟流式输出效果
                for char in content:
                    on_delta(char)
            return content
        else:
            raise RuntimeError(f"AI生成失败: {res.get('msg', 'Unknown error')}")
    except json.JSONDecodeError as e:
        logging.error(f"AI响应解析失败: {e}")
        raise RuntimeError(f"AI响应解析失败: {e}")
    except Exception as e:
        logging.error(f"AI生成请求异常: {e}")
        raise RuntimeError(f"AI生成请求异常: {e}")


def blog_list(args, config, page, blogType="1"):
    logging.info(f'正在加载第{page}页周记列表...')
    data = {
        "blogType": blogType,
        "planId": "",
        "reviewStatus": "null",
        "page": str(page)
    }
    header_token = get_header_token(data)
    headers = {
        "content-type": "application/x-www-form-urlencoded",
        "devicecode": get_device_code(openId=args['openId'], device=config['device']),
        "encryptvalue": args['encryptValue'],
        "m": header_token['m'],
        "n": header_token['n'],
        "referer": XYB_REFERER,
        "s": header_token['s'],
        "t": header_token['t'],
        "user-agent": config['userAgent'],
        "v": XYB_VERSION,
        "wechat": "1",
        "xweb_xhr": "1"
    }
    cookies = {
        "JSESSIONID": args['sessionId']
    }
    url = "https://xcx.xybsyw.com/student/blog/BlogList.action"

    try:
        logging.debug(f"🛩️ 准备发起请求。url:{url}, headers:{headers}, data:{data}, cookies:{cookies}")
        response = requests.post(url, headers=headers, cookies=cookies, data=data, timeout=10)
        logging.debug(f"📡 收到响应:{response} {response.text}")
        res = response.json()

        _assert_session(res)

        if res.get('code') == '200' and 'data' in res:
            return res['data']
        else:
            raise RuntimeError(f"获取周记列表失败: {res.get('msg', 'Unknown error')}")
    except Exception as e:
        raise RuntimeError(f"获取周记列表请求异常: {e}")
