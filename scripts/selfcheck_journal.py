"""Run with: python -m scripts.selfcheck_journal. No real platform submissions."""

import json
import socket
import tempfile
import threading
import time
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta, timezone
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch
from zoneinfo import ZoneInfo

import requests
import uvicorn
from fastapi import HTTPException
from pydantic import ValidationError

from app.apis import xybsyw
from app.utils.report_text import readable_blog_list, report_body_html, report_body_text
from webapp import journal
from webapp import notifications
from webapp.journal import JournalDraftInput, JournalInput, JournalStore
from webapp.runtime import Scheduler, TaskManager

REPORT = {
    "blogType": "1", "blogTitle": "实习工作总结", "blogBody": "实际完成的工作与学习收获。" * 10,
    "startDate": "2099-11-02", "endDate": "2099-11-08",
    "traineeId": "plan", "blogOpenType": "2",
}
CONTEXT = (
    {"input": {"userAgent": "test", "device": {}}, "settings": {"timezone": "Asia/Shanghai", "auto_clock": {"enabled": False}}},
    {"sessionId": "session", "encryptValue": "encrypt", "openId": "owner", "traineeId": "plan"},
    "plan",
)


def rejected(function, exception=Exception):
    try:
        function()
    except exception:
        return
    raise AssertionError("Invalid operation should have failed")


def check_protocol():
    def response(data, code=200):
        return SimpleNamespace(status_code=200, json=lambda: {"code": code, "data": data}, text="test")

    with (
        patch.object(xybsyw, "_build_security_context", return_value={"params": {"st": "signed", "ts": "123", "fp": "device"}, "url_token": "token"}),
        patch.object(xybsyw, "get_device_code", return_value="device-code"),
        patch.object(xybsyw.requests, "post", return_value=response("blog-id")) as post,
    ):
        args, config = CONTEXT[1], CONTEXT[0]["input"]
        assert xybsyw.load_blog_year(args, config) == "blog-id"
        assert post.call_args.args[0].endswith("weekYear.action")
        assert xybsyw.load_blog_date(args, config, "2099", "11") == "blog-id"
        assert post.call_args.kwargs["data"]["month"] == "11"
        assert xybsyw.load_blog_months(args, config) == "blog-id"
        assert post.call_args.args[0].endswith("LoadBlogDate!month.action")
        assert post.call_args.kwargs["data"]["traineeId"] == "plan"
        assert xybsyw.blog_list(args, config, 1, "2") == "blog-id"
        assert post.call_args.kwargs["data"]["blogType"] == "2"
        assert xybsyw.submit_blog(args, config, "月报", REPORT["blogBody"], "2099-11-01", "2099-11-30", "0", "plan", blog_type="2") == "blog-id"
        request = post.call_args.kwargs
        assert request["data"]["blogType"] == "2"
        assert request["data"]["isDraft"] == "0"
        assert request["data"]["st"] == "signed"
        assert request["data"]["blogOpenType"] == "0"
        assert request["data"]["blogBody"] == report_body_html(REPORT["blogBody"])
        assert request["headers"]["devicecode"] == "device-code"
        assert request["cookies"] == {"JSESSIONID": "session"}
        assert request["params"] == {"t": "token"}
        post.return_value = SimpleNamespace(status_code=200, json=lambda: {"data": "unconfirmed"})
        rejected(lambda: xybsyw.submit_blog(args, config, "title", REPORT["blogBody"], "2099-11-02", "2099-11-08", "2", "plan"), xybsyw.BlogSubmissionUncertain)
        post.return_value = response(None, 205)
        with patch.object(xybsyw, "handle_invalid_session"):
            rejected(lambda: xybsyw.load_blog_year(args, config), xybsyw.SessionExpired)
        post.side_effect = requests.Timeout("lost confirmation")
        rejected(lambda: xybsyw.submit_blog(args, config, "title", REPORT["blogBody"], "2099-11-02", "2099-11-08", "2", "plan"), xybsyw.BlogSubmissionUncertain)


def check_validation_and_account():
    for values in (
        {"startDate": "2099-02-30"}, {"endDate": "2099-11-01"},
        {"endDate": "2099-11-10"}, {"blogType": "2", "endDate": "2099-12-10"},
        {"blogType": "3"}, {"blogOpenType": "3"},
    ):
        rejected(lambda: JournalInput(**{**REPORT, **values}), ValidationError)
    rejected(lambda: JournalInput(**{**REPORT, "blogBody": " " * 60}).require_complete(), ValueError)
    monthly = JournalInput(**{**REPORT, "blogType": "2", "startDate": "2099-11-26", "endDate": "2099-12-25"})
    monthly.require_complete()
    with patch.object(journal, "journal_context", return_value=CONTEXT), patch.object(journal, "submit_blog") as submit:
        rejected(lambda: journal.submit_report(JournalInput(**REPORT), "another-account"))
        rejected(lambda: journal.submit_report(JournalInput(**{**REPORT, "traineeId": "another-plan"})))
        submit.assert_not_called()
    with (
        patch.object(journal, "journal_context", return_value=CONTEXT),
        patch.object(journal, "submit_blog", side_effect=xybsyw.SessionExpired("expired")) as submit,
        patch.object(journal, "append_journal_entry") as history,
    ):
        rejected(lambda: journal.submit_report(JournalInput(**REPORT), "owner"), xybsyw.SessionExpired)
        submit.assert_called_once()
        history.assert_not_called()
    with (
        patch.object(journal, "journal_context", return_value=CONTEXT),
        patch.object(journal, "submit_blog", return_value="blog-id") as submit,
        patch.object(journal, "append_journal_entry", side_effect=ValueError("invalid history")),
    ):
        assert journal.submit_report(JournalInput(**REPORT), "owner") == "blog-id"
        submit.assert_called_once()


def check_text_and_notifications():
    text = "一、主要工作\n检查 A < B & C 的显示。\n\n二、下阶段计划\n继续整理记录。"
    html = report_body_html(text)
    assert "&lt; B &amp; C" in html and "<p><br></p>" in html
    assert report_body_text(html) == text
    legacy = '<p class="ql-align-left">工作<strong>总结</strong><br>排查&nbsp;记录</p><script>hidden()</script><style>.bad{}</style><p>下一阶段</p>'
    assert report_body_text(legacy) == "工作总结\n排查 记录\n下一阶段"
    assert readable_blog_list({"list": [{"blogBody": legacy}]})["list"][0]["blogBodyText"] == report_body_text(legacy)
    assert JournalInput(**{**REPORT, "blogBody": report_body_html(REPORT["blogBody"])}).blogBody == REPORT["blogBody"]
    with (
        patch.object(journal, "journal_context", return_value=CONTEXT),
        patch.object(journal, "submit_blog", return_value="blog-id") as submit,
        patch.object(journal, "append_journal_entry"),
        patch.object(journal, "notify_result") as notify,
        patch("webapp.runtime.notify_result") as task_notify,
    ):
        assert journal.submit_report(JournalInput(**REPORT), "owner") == "blog-id"
        assert notify.call_args.args[:2] == ("提交周报", True)
        assert notify.call_args.kwargs["source"] == "manual"
        notify.assert_called_once()
        notify.reset_mock()
        assert journal.submit_report(JournalInput(**REPORT), "owner", source="auto") == "blog-id"
        TaskManager._notify_result({"mode": "journal", "source": "auto"}, True)
        task_notify.assert_not_called()
        notify.assert_called_once()
        assert notify.call_args.kwargs["source"] == "auto"
        notify.reset_mock()
        submit.side_effect = RuntimeError("明确拒绝")
        rejected(lambda: journal.submit_report(JournalInput(**REPORT), "owner"), RuntimeError)
        notify.assert_called_once()
        assert notify.call_args.args[1] is False
        notify.reset_mock()
        submit.side_effect = xybsyw.BlogSubmissionUncertain("请核对")
        rejected(lambda: journal.submit_report(JournalInput(**REPORT), "owner"), xybsyw.BlogSubmissionUncertain)
        notify.assert_called_once()
        assert notify.call_args.kwargs["result_label"] == "需核对结果"
    enabled = {"settings": {"notifications_enabled": True, "notifications": [{"type": "gotify", "url": "https://notify.example", "token": "test"}]}}
    with patch.object(notifications, "read_config", return_value=enabled), patch.object(notifications, "notify_gotify") as gotify:
        assert notifications.notify_result("提交月报", True, "已确认", source="auto")
        assert gotify.call_args.kwargs["title"] == "提交月报成功"
        assert "定时任务" in gotify.call_args.kwargs["content"]
        gotify.side_effect = requests.Timeout("notification transport failed")
        assert notifications.notify_result("提交月报", True, "已确认") is False
        with patch.object(journal, "journal_context", return_value=CONTEXT), patch.object(journal, "submit_blog", return_value="blog-id"), patch.object(journal, "append_journal_entry"):
            assert journal.submit_report(JournalInput(**REPORT), "owner") == "blog-id"
    with patch.object(notifications, "read_config", return_value=CONTEXT[0]), patch.object(notifications, "notify_gotify") as gotify:
        assert notifications.notify_result("提交周报", True, "已确认") is False
        gotify.assert_not_called()


def check_drafts_and_scheduler(directory):
    path = Path(directory) / "drafts.sqlite3"
    store = JournalStore(path)
    partial = store.save(JournalDraftInput(blogBody="尚未写完"))
    assert JournalStore(path).list()[0]["blogBody"] == "尚未写完"
    assert path.stat().st_mode & 0o777 == 0o600
    rejected(lambda: store.submit(partial["id"]), ValueError)
    future = datetime.now(timezone.utc) + timedelta(hours=1)
    payload = JournalDraftInput(**REPORT, scheduledAt=future)
    rejected(lambda: store.save(payload), ValueError)
    rejected(lambda: store.save(JournalDraftInput(**REPORT, scheduledAt=datetime.now(timezone.utc) - timedelta(seconds=1)), owner="owner"), ValueError)
    item = store.save(payload, zone=ZoneInfo("Asia/Shanghai"), owner="owner")
    assert store.next_due() is None
    local_time = datetime(2099, 11, 8, 18, 30)
    local = store.save(JournalDraftInput(**REPORT, scheduledAt=local_time), zone=ZoneInfo("Asia/Shanghai"), owner="owner")
    assert datetime.fromisoformat(local["scheduledAt"]).hour == 10
    store.delete(local["id"])
    canceled = store.save(JournalDraftInput(**REPORT), item["id"])
    assert canceled["status"] == "draft" and canceled["scheduledAt"] is None
    rejected(lambda: store.submit(item["id"], due_only=True), HTTPException)
    store.save(payload, item["id"], owner="owner")
    with (
        patch.object(journal.time, "time", return_value=future.timestamp() + 1),
        patch.object(journal, "submit_report", return_value="blog-id") as submit,
        patch("webapp.runtime.get_valid_session_cache", return_value=CONTEXT[1]) as cache,
        patch("webapp.runtime.SCHEDULE_RETRY_FILE", Path(directory) / "retry.json"),
        patch("webapp.runtime._save_history"),
        patch.object(TaskManager, "_notify_result"),
    ):
        assert JournalStore(path).next_due()["id"] == item["id"]
        manager = TaskManager()
        scheduler = Scheduler(manager, store)
        cache.return_value = {}
        scheduler._tick()
        assert manager.thread is None and store.next_due()["id"] == item["id"]
        cache.return_value = CONTEXT[1]
        submit.side_effect = xybsyw.SessionExpired("expired")
        scheduler._tick()
        manager.thread.join(3)
        assert store.next_due()["status"] == "scheduled"
        assert scheduler.retry_runs == {}
        submit.side_effect = None
        scheduler._tick()  # 报表定时独立于签到定时开关。
        manager.thread.join(3)
        assert manager.snapshot()["status"] == "success"
        assert next(d for d in store.list() if d["id"] == item["id"])["status"] == "submitted"
        assert store.next_due() is None
        assert submit.call_count == 2  # 明确未登录拒绝后，恢复凭证再提交。
        assert submit.call_args.kwargs["source"] == "auto"
        rejected(lambda: store.submit(item["id"]), HTTPException)
    broken = store.save(JournalDraftInput(**REPORT))
    with patch.object(journal, "submit_report", side_effect=xybsyw.BlogSubmissionUncertain("核对结果")):
        rejected(lambda: store.submit(broken["id"]), xybsyw.BlogSubmissionUncertain)
    assert next(d for d in store.list() if d["id"] == broken["id"])["status"] == "uncertain"
    rejected(lambda: store.save(JournalDraftInput(**REPORT), broken["id"]), HTTPException)
    interrupted = store.save(JournalDraftInput(**REPORT))
    with store._connect(write=True) as db:
        db.execute("UPDATE drafts SET status='submitting' WHERE id=?", (interrupted["id"],))
    JournalStore(path).recover()
    assert next(d for d in store.list() if d["id"] == interrupted["id"])["status"] == "uncertain"
    store.delete(partial["id"])
    assert all(d["id"] != partial["id"] for d in store.list())

    concurrent = store.save(JournalDraftInput(**REPORT))
    entered, release = threading.Event(), threading.Event()
    def slow_submit(*_args, **_kwargs):
        entered.set()
        assert release.wait(5)
        return "blog-id"
    with patch.object(journal, "submit_report", side_effect=slow_submit) as submit:
        with ThreadPoolExecutor(max_workers=2) as pool:
            first = pool.submit(store.submit, concurrent["id"])
            try:
                assert entered.wait(3)
                rejected(lambda: store.submit(concurrent["id"]), HTTPException)
                rejected(lambda: store.delete(concurrent["id"]), HTTPException)
            finally:
                release.set()
            assert first.result()["result"] == "blog-id"
        submit.assert_called_once()


def check_api(directory):
    from webapp import main as web
    from webapp import security
    store = JournalStore(Path(directory) / "api.sqlite3")
    listener = socket.socket()
    listener.bind(("127.0.0.1", 0))
    url = f"http://127.0.0.1:{listener.getsockname()[1]}"
    server = uvicorn.Server(uvicorn.Config(web.app, log_level="error", lifespan="off"))
    with (
        patch.object(security, "RUNTIME_DIR", Path(directory) / "security"),
        patch.object(security, "SECURITY_FILE", Path(directory) / "security" / "web_security.json"),
        patch.object(security, "INITIAL_PASSWORD_FILE", Path(directory) / "security" / "initial_password.txt"),
        patch.object(web.runtime, "journals", store),
        patch.object(web, "read_config", return_value=CONTEXT[0]),
        patch.object(web, "_journal_context", return_value=CONTEXT),
        patch.object(web, "load_journal_history", return_value={"generated": [], "submitted": []}),
        patch.object(web, "load_blog_year", return_value=[{"id": 2099, "name": "2099年", "months": [{"id": 11, "name": "11月"}]}]),
        patch.object(web, "load_blog_date", return_value=[{"week": 1, "startDate": "2099-11-02", "endDate": "2099-11-08"}]),
        patch.object(web, "load_blog_months", return_value=[{"startDate": "2099.11.26", "endDate": "2099.12.25", "blogCount": 0}]),
        patch.object(web, "blog_list", return_value={"list": []}) as blogs,
        patch.object(web, "xyb_completion", return_value=REPORT["blogBody"]) as completion,
        patch.object(web, "append_journal_entry"),
        patch.object(journal, "submit_report", return_value="blog-id") as submit,
    ):
        _, password = security.ensure_security_config()
        thread = threading.Thread(target=server.run, kwargs={"sockets": [listener]}, daemon=True)
        thread.start()
        try:
            for _ in range(100):
                if server.started: break
                time.sleep(0.02)
            assert server.started
            session = requests.Session()
            assert session.get(url + "/api/journal/drafts").status_code == 401
            response = session.post(url + "/api/auth/login", json={"username": "admin", "password": password})
            assert response.status_code == 200, response.text
            session.headers["X-CSRF-Token"] = session.cookies["ssi_csrf"]
            response = session.get(url + "/api/journal/bootstrap")
            assert response.status_code == 200, response.text
            assert response.json()["years"][0]["months"][0]["id"] == 11
            monthly = session.get(url + "/api/journal/bootstrap?blogType=2").json()
            assert monthly["years"] == [] and monthly["months"][0]["startDate"] == "2099.11.26"
            assert blogs.call_args.args[-1] == "2"
            blogs.return_value = {"list": [{"blogBody": "<p>第一段</p><p>第二段</p>"}]}
            assert session.get(url + "/api/journal/blogs?blogType=2").json()["list"][0]["blogBodyText"] == "第一段\n第二段"
            response = session.post(url + "/api/journal/generate", json={"prompt": "本月的实际工作素材", "blogType": "2"})
            assert response.status_code == 200, response.text
            assert "月报" in completion.call_args.args[2]
            assert session.get(url + "/api/journal/weeks?year=2099&month=13").status_code == 422
            response = session.post(url + "/api/journal/submit", json={**REPORT, "blogBody": " " * 60})
            assert response.status_code == 422, response.text
            assert session.post(url + "/api/journal/drafts", json={**REPORT, "blogBody": "partial"}).status_code == 200
            scheduled = (datetime.now() + timedelta(days=1)).isoformat(timespec="minutes")
            response = session.post(url + "/api/journal/drafts", json={**REPORT, "blogType": "2", "startDate": "2099-11-26", "endDate": "2099-12-25", "scheduledAt": scheduled})
            assert response.status_code == 200, response.text
            item = response.json()
            assert item["status"] == "scheduled" and item["blogType"] == "2"
            assert session.post(url + f"/api/journal/drafts/{item['id']}/submit").status_code == 200
            assert session.post(url + f"/api/journal/drafts/{item['id']}/submit").status_code == 409
            submit.assert_called_once()
            assert session.get(url + "/api/journal/drafts").json()["timezone"] == "Asia/Shanghai"
            assert session.get(url + "/api/jielong/settings").status_code == 404
            assert session.delete(url + f"/api/journal/drafts/{item['id']}").status_code == 200
        finally:
            server.should_exit = True
            thread.join(5)
            listener.close()


if __name__ == "__main__":
    check_protocol()
    check_validation_and_account()
    check_text_and_notifications()
    with tempfile.TemporaryDirectory() as directory:
        check_drafts_and_scheduler(directory)
        check_api(directory)
    print("journal self-check passed (protocol, text formatting, notifications, monthly periods, persistence, scheduling, restart, concurrency, API)")
