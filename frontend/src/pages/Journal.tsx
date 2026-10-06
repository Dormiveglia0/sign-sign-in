import { useEffect, useRef, useState } from "react";
import {
  Alert, App, Button, Card, DatePicker, Empty, Form, Input,
  Select, Skeleton, Space, Tag, Tabs,
} from "antd";
import dayjs, { type Dayjs } from "dayjs";
import {
  BookOpenCheck, CalendarClock, FilePlus2, History, RefreshCw,
  Save, Send, Sparkles, Trash2,
} from "lucide-react";
import { api, formatDateTime } from "../api";
import { PageHeader, SectionHeading } from "../components";
import { useWorkspace } from "../App";

type BlogType = "1" | "2";
type JournalHistory = {
  generated: Array<{ timestamp: string; content: string }>;
  submitted: Array<{ timestamp: string; content: string }>;
};
type YearItem = { year: string; label: string; months: { value: string; label: string }[] };
type WeekItem = { startDate: string; endDate: string; label: string };
type Draft = {
  id: string;
  blogType: BlogType;
  blogTitle: string;
  blogBody: string;
  startDate: string | null;
  endDate: string | null;
  blogOpenType: "0" | "1" | "2";
  traineeId: string;
  scheduledAt: string | null;
  status: "draft" | "scheduled" | "submitting" | "submitted" | "failed" | "uncertain";
  updatedAt: string;
  error: string;
};
type EditorValues = {
  prompt: string;
  content: string;
  title: string;
  dateRange?: [Dayjs, Dayjs];
  openType: Draft["blogOpenType"];
  scheduledAt: string;
  traineeId: string;
};
const states = {
  draft: { label: "草稿", color: "default" },
  scheduled: { label: "待定时提交", color: "blue" },
  submitting: { label: "提交中", color: "processing" },
  submitted: { label: "已提交", color: "green" },
  failed: { label: "提交失败", color: "red" },
  uncertain: { label: "需核对结果", color: "orange" },
};

function normalizeYears(raw: unknown): YearItem[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const body = item as Record<string, unknown>;
    const year = String(body.id ?? body.year ?? body.value ?? "");
    const monthList = body.months || body.monthList || [];
    const months = Array.isArray(monthList)
      ? monthList.flatMap((month) => {
          const data = month && typeof month === "object" ? month as Record<string, unknown> : null;
          const value = String(data ? data.id ?? data.month ?? data.value ?? "" : month);
          return value ? [{ value, label: String(data?.name || `${value} 月`) }] : [];
        })
      : [];
    return year ? [{ year, label: String(body.name || `${year} 年`), months }] : [];
  });
}

function normalizeWeeks(raw: unknown): WeekItem[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const body = item as Record<string, unknown>;
    const startDate = String(body.startDate || "");
    const endDate = String(body.endDate || "");
    return startDate && endDate ? [{
      startDate, endDate,
      label: `第 ${body.week || ""} 周 · ${startDate} ~ ${endDate} · ${String(body.status) === "1" ? "已提交" : "未提交"}`,
    }] : [];
  });
}

function normalizeBlogs(raw: unknown): Array<Record<string, unknown>> {
  const body = raw && typeof raw === "object" ? raw as Record<string, unknown> : {};
  const list = Array.isArray(raw) ? raw : body.list || body.items || body.records;
  return Array.isArray(list) ? list.filter((item) => item && typeof item === "object") : [];
}

function scheduleInput(value: string | null, zone: string) {
  return value ? new Intl.DateTimeFormat("sv-SE", {
    timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  }).format(new Date(value)).replace(" ", "T") : "";
}

export default function Journal() {
  const { message, modal } = App.useApp();
  const { status } = useWorkspace();
  const credentialReady = Boolean(status?.session.valid);
  const [form] = Form.useForm<EditorValues>();
  const dateRange = Form.useWatch("dateRange", form) as EditorValues["dateRange"];
  const [blogType, setBlogType] = useState<BlogType>("1");
  const label = blogType === "1" ? "周报" : "月报";
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [traineeId, setTraineeId] = useState("");
  const [years, setYears] = useState<YearItem[]>([]);
  const [weeks, setWeeks] = useState<WeekItem[]>([]);
  const [blogs, setBlogs] = useState<Array<Record<string, unknown>>>([]);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [draftTab, setDraftTab] = useState("pending");
  const [zone, setZone] = useState("Asia/Shanghai");
  const [history, setHistory] = useState<JournalHistory>({ generated: [], submitted: [] });
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const loadSequence = useRef(0);
  const busy = generating || saving || submitting;

  async function loadDrafts(signal?: AbortSignal) {
    try {
      const result = await api<{ items: Draft[]; history: JournalHistory; timezone: string }>(
        "/api/journal/drafts", { signal },
      );
      if (signal?.aborted) return;
      setDrafts(result.items);
      setHistory(result.history);
      setZone(result.timezone);
    } catch (error) {
      if (!signal?.aborted) message.error(error instanceof Error ? error.message : "草稿箱加载失败");
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    void loadDrafts(controller.signal);
    const timer = window.setInterval(() => void loadDrafts(controller.signal), 30000);
    return () => { controller.abort(); window.clearInterval(timer); };
  }, [status?.task.finishedAt]);

  function changeType(next: BlogType) {
    loadSequence.current += 1;
    setBlogType(next);
    setLoaded(false);
    setLoading(false);
    setBlogs([]);
    setWeeks([]);
    setYears([]);
    setYear("");
    setMonth("");
  }

  async function bootstrap() {
    const sequence = ++loadSequence.current;
    setLoading(true);
    try {
      const result = await api<{ traineeId: string; years: unknown; blogs: unknown }>(
        `/api/journal/bootstrap?blogType=${blogType}`,
      );
      if (sequence !== loadSequence.current) return;
      const normalizedYears = normalizeYears(result.years);
      setTraineeId(result.traineeId);
      form.setFieldValue("traineeId", result.traineeId);
      setYears(normalizedYears);
      setBlogs(normalizeBlogs(result.blogs));
      setLoaded(true);
      setWeeks([]);
      setYear(normalizedYears[0]?.year || "");
      setMonth(normalizedYears[0]?.months[0]?.value || "");
      message.success(`校友邦${label}数据已加载`);
    } catch (error) {
      if (sequence === loadSequence.current) message.error(error instanceof Error ? error.message : "加载失败");
    } finally {
      if (sequence === loadSequence.current) setLoading(false);
    }
  }

  async function loadWeeks() {
    if (!year || !month) return;
    const sequence = ++loadSequence.current;
    setLoading(true);
    try {
      const result = await api<unknown>(
        `/api/journal/weeks?year=${encodeURIComponent(year)}&month=${encodeURIComponent(month)}`,
      );
      if (sequence === loadSequence.current) setWeeks(normalizeWeeks(result));
    } catch (error) {
      if (sequence === loadSequence.current) message.error(error instanceof Error ? error.message : "周次加载失败");
    } finally {
      if (sequence === loadSequence.current) setLoading(false);
    }
  }

  async function generate() {
    const prompt = form.getFieldValue("prompt")?.trim();
    if (!prompt) { message.warning(`先写下本${blogType === "1" ? "周" : "月"}做过的工作或关键词`); return; }
    setGenerating(true);
    try {
      const result = await api<{ content: string }>("/api/journal/generate", {
        method: "POST", json: { prompt, blogType },
      });
      form.setFieldValue("content", result.content);
      await loadDrafts();
      message.success(`${label}内容已生成，请校对后保存`);
    } catch (error) { message.error(error instanceof Error ? error.message : "生成失败"); }
    finally { setGenerating(false); }
  }

  async function persist(schedule = false) {
    const values = form.getFieldsValue(true);
    const item = await api<Draft>(draftId ? `/api/journal/drafts/${draftId}` : "/api/journal/drafts", {
      method: draftId ? "PUT" : "POST",
      json: {
        blogType, blogTitle: values.title || "", blogBody: values.content || "",
        startDate: values.dateRange?.[0]?.format("YYYY-MM-DD") || null,
        endDate: values.dateRange?.[1]?.format("YYYY-MM-DD") || null,
        blogOpenType: values.openType || "2", traineeId: values.traineeId || traineeId,
        scheduledAt: schedule ? values.scheduledAt : null,
      },
    });
    setDraftId(item.id);
    if (!schedule) form.setFieldValue("scheduledAt", "");
    await loadDrafts();
    return item;
  }

  async function save(schedule: boolean) {
    if (schedule) {
      try { await form.validateFields(["content", "title", "dateRange", "scheduledAt"]); }
      catch { return; }
      if (!form.getFieldValue("scheduledAt")) { message.warning("请设置定时提交时间"); return; }
    }
    const perform = async () => {
      setSaving(true);
      try {
        await persist(schedule);
        message.success(schedule ? "草稿已保存，将由服务端定时提交" : "草稿已保存，未安排自动提交");
      } catch (error) {
        message.error(error instanceof Error ? error.message : "保存失败");
        throw error;
      } finally { setSaving(false); }
    };
    if (schedule || drafts.find((draft) => draft.id === draftId)?.status === "scheduled") {
      modal.confirm({
        title: schedule ? `安排${label}自动提交？` : "仅保存草稿并取消定时？",
        content: schedule
          ? `${form.getFieldValue("scheduledAt")}（${zone}）将提交当前正文。关闭浏览器后仍会执行，请确认报告日期与内容。`
          : "当前草稿已安排定时提交，仅保存将取消该定时任务。",
        okText: "确认", cancelText: "返回编辑", onOk: perform,
      });
    } else {
      try { await perform(); } catch { /* 保存错误已显示，正文仍在编辑器。 */ }
    }
  }

  async function submit() {
    try { await form.validateFields(["content", "title", "dateRange"]); }
    catch { return; }
    modal.confirm({
      title: `确认立即提交这篇${label}？`,
      content: "请确认实习计划、报告日期与正文。正文会先保存到草稿箱，再提交到当前校友邦账号。",
      okText: "确认提交", cancelText: "返回编辑",
      onOk: async () => {
        setSubmitting(true);
        try {
          const draft = await persist();
          await api(`/api/journal/drafts/${draft.id}/submit`, { method: "POST" });
          setDraftId(null);
          form.resetFields();
          message.success(`${label}提交成功`);
          await bootstrap();
        } catch (error) {
          message.error(error instanceof Error ? error.message : "提交失败，正文保留在草稿箱");
          throw error;
        } finally { setSubmitting(false); await loadDrafts(); }
      },
    });
  }

  function openDraft(draft: Draft) {
    const copy = draft.status === "submitted" || draft.status === "uncertain";
    const open = () => {
      changeType(draft.blogType);
      setDraftId(copy ? null : draft.id);
      form.setFieldsValue({
        title: draft.blogTitle, content: draft.blogBody, prompt: "",
        dateRange: draft.startDate && draft.endDate ? [dayjs(draft.startDate), dayjs(draft.endDate)] : undefined,
        openType: draft.blogOpenType, traineeId: draft.traineeId,
        scheduledAt: copy ? "" : scheduleInput(draft.scheduledAt, zone),
      });
      document.getElementById("journal-editor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (draft.status === "uncertain") {
      modal.confirm({ title: "请先在校友邦核对是否已经提交", content: "该次提交结果不明。确认尚未提交后可复制正文另建草稿，避免重复提交。", okText: "已核对，复制正文", onOk: open });
    } else open();
  }

  async function cancelSchedule(draft: Draft) {
    try {
      await api(`/api/journal/drafts/${draft.id}`, {
        method: "PUT", json: {
          blogType: draft.blogType, blogTitle: draft.blogTitle, blogBody: draft.blogBody,
          startDate: draft.startDate, endDate: draft.endDate,
          blogOpenType: draft.blogOpenType, traineeId: draft.traineeId, scheduledAt: null,
        },
      });
      if (draftId === draft.id) form.setFieldValue("scheduledAt", "");
      await loadDrafts();
      message.success("已取消定时，草稿仍保留");
    } catch (error) { message.error(error instanceof Error ? error.message : "取消失败"); }
  }

  function deleteDraft(draft: Draft) {
    modal.confirm({
      title: "删除这条本地记录？", content: "正文与定时安排将从草稿箱删除，校友邦已提交的报告不受影响。",
      okText: "删除", okButtonProps: { danger: true }, cancelText: "保留",
      onOk: async () => {
        await api(`/api/journal/drafts/${draft.id}`, { method: "DELETE" });
        if (draftId === draft.id) { setDraftId(null); form.resetFields(); }
        await loadDrafts();
      },
    });
  }

  const months = years.find((item) => item.year === year)?.months || [];
  const selectedWeek = weeks.findIndex((week) => week.startDate === dateRange?.[0]?.format("YYYY-MM-DD") && week.endDate === dateRange?.[1]?.format("YYYY-MM-DD"));
  const visibleDrafts = drafts.filter((draft) => (draft.status === "submitted") === (draftTab === "submitted"));

  return (
    <div className="page-container">
      <PageHeader eyebrow="WORKLOG / JOURNAL" title="周报与月报"
        description="提前保存未来周次或月份的草稿，按指定时间由路由器自动提交。"
        actions={<Space wrap>
          <Button icon={<FilePlus2 size={16} />} disabled={busy} onClick={() => { setDraftId(null); form.resetFields(); }}>新建草稿</Button>
          <Button icon={<RefreshCw size={16} />} loading={loading} disabled={!credentialReady || busy} onClick={bootstrap}>
            {loaded ? "重新加载" : "加载校友邦数据"}
          </Button>
        </Space>}
      />
      {!credentialReady && <Alert className="page-alert" type="warning" showIcon
        message="草稿箱可独立使用；提交需要可用的校友邦凭证"
        description="请在运行总览初始化凭证或配置真实微信自动恢复。到期草稿会等待凭证恢复；自有模型生成和本地保存不受影响。" />}

      <Card className="journal-drafts-card">
        <SectionHeading title="草稿箱" description={`报告日期与提交时间分开设置，时间按 ${zone} 执行；服务重启后保留安排。`}
          extra={<Button type="text" icon={<RefreshCw size={16} />} aria-label="刷新草稿箱" onClick={() => void loadDrafts()} />} />
        <Tabs activeKey={draftTab} onChange={setDraftTab} items={[
          { key: "pending", label: `草稿与待提交 (${drafts.filter((draft) => draft.status !== "submitted").length})` },
          { key: "submitted", label: `已提交 (${drafts.filter((draft) => draft.status === "submitted").length})` },
        ]} />
        {visibleDrafts.length ? <div className="journal-draft-list">
          {visibleDrafts.map((draft) => <article key={draft.id} aria-label={draft.blogTitle || "未命名草稿"} className={draft.id === draftId ? "active" : ""}>
            <div className="journal-draft-main">
              <strong>{draft.blogTitle || "未命名草稿"}</strong>
              <Space wrap size={6}><Tag>{draft.blogType === "1" ? "周报" : "月报"}</Tag><Tag color={states[draft.status].color}>{states[draft.status].label}</Tag></Space>
              <span>{draft.startDate && draft.endDate ? `${draft.startDate} ~ ${draft.endDate}` : "报告日期待填写"}</span>
              {draft.scheduledAt && <time>提交时间：{scheduleInput(draft.scheduledAt, zone).replace("T", " ")}（{zone}）</time>}
              {draft.error && <span className="journal-draft-error">{draft.error}</span>}
            </div>
            <Space wrap>
              <Button size="small" disabled={busy || draft.status === "submitting"} onClick={() => openDraft(draft)}>
                {draft.status === "submitted" ? "复制正文" : draft.status === "uncertain" ? "核对后复制" : "继续编辑"}
              </Button>
              {draft.status === "scheduled" && <Button size="small" disabled={busy} onClick={() => void cancelSchedule(draft)}>取消定时</Button>}
              <Button size="small" danger icon={<Trash2 size={14} />} aria-label={`删除${draft.blogTitle || "未命名草稿"}`}
                disabled={busy || draft.status === "submitting"} onClick={() => deleteDraft(draft)} />
            </Space>
          </article>)}
        </div> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={draftTab === "submitted" ? "暂无本地提交记录" : "保存第一篇草稿，可提前安排后续周报和月报"} />}
      </Card>

      <div className="journal-layout">
        <Card className="journal-editor-card" id="journal-editor">
          <SectionHeading title={draftId ? "编辑草稿" : "新建报告"} description="填写实际工作内容，再保存或提交。" extra={<BookOpenCheck size={19} />} />
          <Form form={form} layout="vertical" disabled={busy} requiredMark={false}
            initialValues={{ openType: "2", prompt: "", content: "", title: "", scheduledAt: "", traineeId: "" }}>
            <Form.Item label="报告类型">
              <Select aria-label="报告类型" value={blogType} onChange={changeType} options={[{ value: "1", label: "周报" }, { value: "2", label: "月报" }]} />
            </Form.Item>
            <Form.Item label={`本${blogType === "1" ? "周" : "月"}素材`} name="prompt">
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 6 }} maxLength={5000} showCount placeholder="写下实际完成的工作、学习内容、遇到的困难和下一阶段计划……" />
            </Form.Item>
            <div className="journal-generate-row">
              <span>生成后可自由校对，点击保存才会进入草稿箱。</span>
              <Button type="primary" ghost icon={<Sparkles size={16} />} loading={generating} onClick={generate}>生成{label}内容</Button>
            </div>
            <Form.Item label={`${label}正文`} name="content" rules={[
              { required: true, whitespace: true, message: "请填写正文" },
              { validator: (_, value: string) => (value?.trim().length || 0) >= 50 ? Promise.resolve() : Promise.reject(new Error("提交时正文至少 50 个字符")) },
            ]}>
              <Input.TextArea className="journal-content" autoSize={{ minRows: 12, maxRows: 24 }} maxLength={10000} showCount placeholder="可保存尚未完成的正文草稿" />
            </Form.Item>
            <div className="form-grid journal-submit-fields">
              <Form.Item label="标题" name="title" rules={[{ required: true, whitespace: true, message: "请输入标题" }]}>
                <Input placeholder={`${label}工作总结`} maxLength={200} />
              </Form.Item>
              <Form.Item label="报告日期范围" name="dateRange" rules={[
                { required: true, message: "请选择报告日期" },
                { validator: (_, value?: [Dayjs, Dayjs]) => {
                  if (!value) return Promise.resolve();
                  const valid = blogType === "1" ? value[1].diff(value[0], "day") <= 6 : value[0].format("YYYY-MM") === value[1].format("YYYY-MM");
                  return valid ? Promise.resolve() : Promise.reject(new Error(blogType === "1" ? "周报不能超过 7 天" : "月报须在同一个月份"));
                } },
              ]}>
                <DatePicker.RangePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="查看权限" name="openType">
                <Select options={[{ value: "2", label: "仅老师可见" }, { value: "0", label: "老师和同学可见" }, { value: "1", label: "全网可见" }]} />
              </Form.Item>
              <Form.Item label="实习计划" name="traineeId"><Input placeholder="提交时加载当前实习计划" readOnly /></Form.Item>
              <Form.Item label={`定时提交时间（${zone}）`} name="scheduledAt" className="journal-schedule-field">
                <Input type="datetime-local" aria-label="定时提交时间" />
              </Form.Item>
            </div>
            <div className="journal-submit-action">
              <span>定时任务只提交已保存的正文；取消定时后草稿仍保留。</span>
              <Space wrap>
                <Button icon={<Save size={16} />} loading={saving} onClick={() => void save(false)}>仅保存草稿</Button>
                <Button icon={<CalendarClock size={16} />} disabled={!credentialReady} onClick={() => void save(true)}>保存并定时提交</Button>
                <Button type="primary" icon={<Send size={16} />} loading={submitting} disabled={!credentialReady} onClick={() => void submit()}>立即提交</Button>
              </Space>
            </div>
          </Form>
        </Card>

        <aside className="journal-sidebar">
          <Card>
            <SectionHeading title={blogType === "1" ? "选择周次" : "选择月份"} description="选择报告所覆盖的日期，可提前填写后续时段。" />
            {blogType === "2" ? <DatePicker aria-label="月报月份" picker="month" style={{ width: "100%" }} disabled={busy} value={dateRange?.[0] || null}
              placeholder="选择月报月份" onChange={(value) => form.setFieldValue("dateRange", value ? [value.startOf("month"), value.endOf("month")] : undefined)} /> :
              <Space direction="vertical" style={{ width: "100%" }}>
                <Select aria-label="周报年份" value={year || undefined} placeholder="年份" disabled={busy || loading}
                  options={years.map((item) => ({ value: item.year, label: item.label }))}
                  onChange={(value) => { setYear(value); setMonth(years.find((item) => item.year === value)?.months[0]?.value || ""); setWeeks([]); }} />
                <Select aria-label="周报月份" value={month || undefined} placeholder="月份" options={months} disabled={busy || loading}
                  onChange={(value) => { setMonth(value); setWeeks([]); }} />
                <Button block loading={loading} disabled={!year || !month || busy} onClick={() => void loadWeeks()}>查询周次</Button>
                <Select<number> aria-label="周报周次" placeholder="选择一周" disabled={busy || loading} value={selectedWeek >= 0 ? selectedWeek : undefined}
                  options={weeks.map((week, index) => ({ value: index, label: week.label }))}
                  onChange={(index) => form.setFieldValue("dateRange", [dayjs(weeks[index].startDate), dayjs(weeks[index].endDate)])} />
              </Space>}
          </Card>
          <Card>
            <SectionHeading title="生成历史" description="点击恢复正文，再保存为草稿。" extra={<History size={17} />} />
            {history.generated.length ? <div className="history-list">{history.generated.slice(0, 6).map((item, index) =>
              <button type="button" disabled={busy} key={`${item.timestamp}-${index}`} onClick={() => form.setFieldValue("content", item.content)}>
                <span>{item.content.slice(0, 46)}</span><time>{formatDateTime(item.timestamp)}</time>
              </button>)}</div> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无生成记录" />}
          </Card>
          <Card>
            <SectionHeading title={`校友邦已提交${label}`} description="点击复制正文到新草稿。" />
            {loading ? <Skeleton active paragraph={{ rows: 3 }} /> : blogs.length ? <div className="history-list server">{blogs.slice(0, 8).map((blog, index) =>
              <button type="button" disabled={busy} key={String(blog.blogId || index)} onClick={() => {
                setDraftId(null);
                form.setFieldsValue({ title: String(blog.blogTitle || ""), content: String(blog.blogBody || ""), scheduledAt: "",
                  dateRange: blog.startDate && blog.endDate ? [dayjs(String(blog.startDate)), dayjs(String(blog.endDate))] : undefined });
              }}><span>{String(blog.blogTitle || "无标题")}</span><Tag>{String(blog.commitDate || blog.endDate || "已提交")}</Tag></button>)}</div> :
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="点击上方加载校友邦数据" />}
          </Card>
        </aside>
      </div>
    </div>
  );
}
