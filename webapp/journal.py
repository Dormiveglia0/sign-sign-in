"""Persistent report drafts shared by manual submission and the scheduler."""

import json
import logging
import os
import sqlite3
import time
import uuid
from contextlib import contextmanager
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Literal

from fastapi import HTTPException
from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

from app.apis.xybsyw import (
    BlogSubmissionUncertain, get_default_plan, get_plan,
    is_session_expired_error, login, submit_blog,
)
from app.config.common import CONFIG_FILE, JOURNAL_DRAFTS_FILE
from app.sign_flow import find_trainee_id
from app.utils.files import append_journal_entry, read_config
from app.utils.report_text import report_body_text
from webapp.notifications import notify_result


class JournalInput(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, extra="forbid")

    blogType: Literal["1", "2"] = "1"
    blogTitle: str = Field(default="", max_length=200)
    blogBody: str = Field(default="", max_length=10000)
    startDate: date | None = None
    endDate: date | None = None
    blogOpenType: Literal["0", "1", "2"] = "2"
    traineeId: str = Field(default="", max_length=64)

    @field_validator("blogBody", mode="before")
    @classmethod
    def editable_body(cls, value):
        return report_body_text(value) if isinstance(value, str) else value

    @model_validator(mode="after")
    def valid_dates(self):
        if self.startDate and self.endDate:
            if self.startDate > self.endDate:
                raise ValueError("结束日期不能早于开始日期")
            if self.blogType == "1" and (self.endDate - self.startDate).days > 6:
                raise ValueError("周报日期范围不能超过 7 天")
            if self.blogType == "2" and (self.endDate - self.startDate).days > 30:
                raise ValueError("月报日期范围不能超过 31 天，请使用校友邦月报周期")
        return self

    def require_complete(self):
        if not self.blogTitle or len(self.blogBody) < 50:
            raise ValueError("请填写标题及至少 50 个字符的正文")
        if not self.startDate or not self.endDate:
            raise ValueError("请选择报告日期范围")
        return self


class JournalDraftInput(JournalInput):
    scheduledAt: datetime | None = None


def journal_context():
    config = read_config(CONFIG_FILE)
    args = login(config["input"], use_cache=True)
    plan = get_plan(config["input"]["userAgent"], args, config=config["input"])
    trainee_id = find_trainee_id(plan) or find_trainee_id(
        get_default_plan(config["input"]["userAgent"], args, config=config["input"])
    )
    if not trainee_id:
        raise RuntimeError("未找到实习计划 traineeId")
    args["traineeId"] = trainee_id
    return config, args, trainee_id


def submit_report(payload: JournalInput, owner: str = "", *, source="manual"):
    action = f"提交{'周报' if payload.blogType == '1' else '月报'}"
    details = (f"标题：{payload.blogTitle}\n"
               f"报告时段：{payload.startDate} ~ {payload.endDate}\n")
    try:
        payload.require_complete()
        config, args, trainee_id = journal_context()
        if owner and owner != args.get("openId"):
            raise RuntimeError("登录账号已变化，请重新确认草稿所属账号")
        if payload.traineeId and payload.traineeId != trainee_id:
            raise RuntimeError("实习计划已变化，请重新加载后确认草稿日期")
        result = submit_blog(
            args, config["input"], payload.blogTitle, payload.blogBody,
            payload.startDate.isoformat(), payload.endDate.isoformat(),
            payload.blogOpenType, trainee_id, blog_type=payload.blogType,
        )
    except Exception as exc:
        notify_result(action, False, details + str(exc), source=source,
                      result_label="需核对结果" if isinstance(exc, BlogSubmissionUncertain) else None)
        raise
    # 平台确认成功后的本地历史失败不能触发重复提交。
    try:
        append_journal_entry("submitted", payload.blogBody)
    except Exception:
        logging.exception("报告已提交，保存本地历史失败")
    notify_result(action, True, details + "校友邦已确认提交成功", source=source)
    return result


class JournalStore:
    def __init__(self, path=JOURNAL_DRAFTS_FILE):
        self.path = Path(path)

    @contextmanager
    def _connect(self, write=False):
        self.path.parent.mkdir(parents=True, exist_ok=True)
        db = sqlite3.connect(self.path, timeout=5)
        db.row_factory = sqlite3.Row
        try:
            db.execute("""CREATE TABLE IF NOT EXISTS drafts (
                id TEXT PRIMARY KEY, data TEXT NOT NULL, status TEXT NOT NULL,
                submit_at REAL, owner TEXT NOT NULL, created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL, error TEXT NOT NULL DEFAULT '',
                result TEXT NOT NULL DEFAULT 'null'
            )""")
            if self.path.stat().st_mode & 0o777 != 0o600:
                os.chmod(self.path, 0o600)
            with db:
                if write:
                    db.execute("BEGIN IMMEDIATE")
                yield db
        finally:
            db.close()

    @staticmethod
    def _item(row):
        data = json.loads(row["data"])
        data["blogBody"] = report_body_text(data.get("blogBody", ""))
        return {
            **data, "id": row["id"], "status": row["status"],
            "scheduledAt": datetime.fromtimestamp(row["submit_at"], timezone.utc)
                .isoformat() if row["submit_at"] is not None else None,
            "createdAt": row["created_at"], "updatedAt": row["updated_at"],
            "error": row["error"], "result": json.loads(row["result"]),
        }

    @staticmethod
    def _row(db, draft_id):
        row = db.execute("SELECT * FROM drafts WHERE id = ?", (draft_id,)).fetchone()
        if row is None:
            raise HTTPException(404, "草稿不存在")
        return row

    def list(self):
        with self._connect() as db:
            return [self._item(row) for row in db.execute(
                "SELECT * FROM drafts ORDER BY updated_at DESC"
            )]

    def save(self, payload: JournalDraftInput, draft_id=None, *, zone=timezone.utc,
             owner=""):
        if not payload.blogTitle and not payload.blogBody:
            raise ValueError("请先填写标题或正文")
        scheduled = payload.scheduledAt
        if scheduled:
            payload.require_complete()
            if not owner or not payload.traineeId:
                raise ValueError("定时提交需要先加载并确认校友邦账号和实习计划")
            if scheduled.tzinfo is None:
                scheduled = scheduled.replace(tzinfo=zone)
            if scheduled.timestamp() <= time.time():
                raise ValueError("定时提交时间必须在未来")
        data = payload.model_dump(mode="json", exclude={"scheduledAt"})
        now = datetime.now(timezone.utc).isoformat()
        with self._connect(write=True) as db:
            if draft_id:
                row = self._row(db, draft_id)
                if row["status"] in ("submitting", "submitted", "uncertain"):
                    raise HTTPException(409, "该记录不可修改，请核对结果后另建草稿")
                created_at = row["created_at"]
                owner = owner or row["owner"]
            else:
                draft_id, created_at = uuid.uuid4().hex, now
            db.execute("""INSERT INTO drafts
                (id, data, status, submit_at, owner, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ON CONFLICT(id) DO UPDATE SET data=excluded.data,
                    status=excluded.status, submit_at=excluded.submit_at,
                    owner=excluded.owner, updated_at=excluded.updated_at,
                    error='', result='null'
                """, (draft_id, json.dumps(data, ensure_ascii=False),
                       "scheduled" if scheduled else "draft",
                       scheduled.timestamp() if scheduled else None,
                       owner, created_at, now))
            return self._item(self._row(db, draft_id))

    def delete(self, draft_id):
        with self._connect(write=True) as db:
            if self._row(db, draft_id)["status"] == "submitting":
                raise HTTPException(409, "报告正在提交，暂时无法删除")
            db.execute("DELETE FROM drafts WHERE id = ?", (draft_id,))

    def recover(self):
        with self._connect(write=True) as db:
            db.execute("""UPDATE drafts SET status='uncertain', error=?
                WHERE status='submitting'""",
                ("上次提交被中断，请先在校友邦核对结果；此记录不会自动重试",))

    def next_due(self):
        with self._connect() as db:
            row = db.execute("""SELECT * FROM drafts
                WHERE status='scheduled' AND submit_at <= ?
                ORDER BY submit_at LIMIT 1""", (time.time(),)).fetchone()
            return self._item(row) if row else None

    def submit(self, draft_id, *, due_only=False):
        with self._connect(write=True) as db:
            row = self._row(db, draft_id)
            if row["status"] not in ("draft", "scheduled", "failed"):
                raise HTTPException(409, "此记录已提交或需先核对结果，不可重复提交")
            if due_only and (row["status"] != "scheduled" or
                             row["submit_at"] > time.time()):
                raise HTTPException(409, "定时提交已取消或尚未到时间")
            payload = JournalInput.model_validate(json.loads(row["data"]))
            payload.require_complete()
            db.execute("UPDATE drafts SET status='submitting', error='' WHERE id=?",
                       (draft_id,))
        try:
            result = submit_report(payload, row["owner"], source="auto" if due_only else "manual")
        except Exception as exc:
            status = "uncertain" if isinstance(exc, BlogSubmissionUncertain) else "failed"
            if due_only and is_session_expired_error(exc):
                # 平台明确拒绝登录时没有产生报告，等待现有微信采集端恢复凭证。
                status = "scheduled"
            self._finish(draft_id, status, error=str(exc))
            raise
        # ponytail: 无法跨本地数据库与远端实现原子提交；中断时人工核对，
        # 平台提供幂等键后再增加安全重试。
        self._finish(draft_id, "submitted", result=result)
        return {"result": result}

    def _finish(self, draft_id, status, *, error="", result=None):
        with self._connect(write=True) as db:
            db.execute("""UPDATE drafts SET status=?, error=?, result=?, updated_at=?
                WHERE id=?""", (status, error, json.dumps(result, ensure_ascii=False),
                               datetime.now(timezone.utc).isoformat(), draft_id))
