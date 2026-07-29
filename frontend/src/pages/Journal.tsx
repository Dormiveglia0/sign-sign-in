import { useMemo, useState } from "react";
import {
  Alert,
  App,
  Button,
  Card,
  DatePicker,
  Empty,
  Form,
  Input,
  Select,
  Skeleton,
  Space,
  Tag,
} from "antd";
import dayjs, { type Dayjs } from "dayjs";
import {
  BookOpenCheck,
  History,
  LoaderCircle,
  RefreshCw,
  Send,
  Sparkles,
} from "lucide-react";
import { api, formatDateTime } from "../api";
import { PageHeader, SectionHeading } from "../components";
import { useWorkspace } from "../App";

type JournalHistory = {
  generated: Array<{ timestamp: string; content: string }>;
  submitted: Array<{ timestamp: string; content: string }>;
};

type YearItem = { year: string; months: string[] };
type WeekItem = {
  startDate: string;
  endDate: string;
  title?: string;
  label?: string;
};

function normalizeYears(raw: unknown): YearItem[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    if (typeof item === "string" || typeof item === "number") {
      return [{ year: String(item), months: [] }];
    }
    if (!item || typeof item !== "object") return [];
    const body = item as Record<string, unknown>;
    const year = String(body.year || body.Year || body.value || "");
    const monthList = body.monthList || body.MonthList || body.months || [];
    const months = Array.isArray(monthList)
      ? monthList.map((month) =>
          typeof month === "object" && month
            ? String(
                (month as Record<string, unknown>).month ||
                  (month as Record<string, unknown>).value ||
                  "",
              )
            : String(month),
        )
      : [];
    return year ? [{ year, months: months.filter(Boolean) }] : [];
  });
}

function normalizeWeeks(raw: unknown): WeekItem[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const body = item as Record<string, unknown>;
    const startDate = String(body.startDate || body.StartDate || "");
    const endDate = String(body.endDate || body.EndDate || "");
    return startDate && endDate
      ? [
          {
            startDate,
            endDate,
            title: String(body.title || body.Title || ""),
            label: String(body.label || body.week || ""),
          },
        ]
      : [];
  });
}

function normalizeBlogs(raw: unknown): Array<Record<string, unknown>> {
  if (Array.isArray(raw)) return raw.filter((item) => typeof item === "object");
  if (!raw || typeof raw !== "object") return [];
  const body = raw as Record<string, unknown>;
  const list = body.list || body.items || body.records;
  return Array.isArray(list) ? list.filter((item) => typeof item === "object") : [];
}

export default function Journal() {
  const { message, modal } = App.useApp();
  const { status } = useWorkspace();
  const credentialReady = Boolean(
    status?.session.valid || status?.session.renewalAvailable,
  );
  const [form] = Form.useForm<{
    prompt: string;
    content: string;
    title: string;
    dateRange: [Dayjs, Dayjs];
    openType: "1" | "2";
  }>();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [traineeId, setTraineeId] = useState("");
  const [years, setYears] = useState<YearItem[]>([]);
  const [weeks, setWeeks] = useState<WeekItem[]>([]);
  const [blogs, setBlogs] = useState<Array<Record<string, unknown>>>([]);
  const [history, setHistory] = useState<JournalHistory>({
    generated: [],
    submitted: [],
  });
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  async function bootstrap() {
    setLoading(true);
    try {
      const result = await api<{
        traineeId: string;
        years: unknown;
        blogs: unknown;
        history: JournalHistory;
      }>("/api/journal/bootstrap");
      const normalizedYears = normalizeYears(result.years);
      setTraineeId(result.traineeId);
      setYears(normalizedYears);
      setBlogs(normalizeBlogs(result.blogs));
      setHistory(result.history || { generated: [], submitted: [] });
      setLoaded(true);
      if (normalizedYears[0]) {
        setYear(normalizedYears[0].year);
        setMonth(normalizedYears[0].months[0] || "");
      }
      message.success("校友邦周记数据已加载");
    } catch (error) {
      message.error(error instanceof Error ? error.message : "加载失败");
    } finally {
      setLoading(false);
    }
  }

  async function loadWeeks(nextYear = year, nextMonth = month) {
    if (!nextYear || !nextMonth) return;
    setLoading(true);
    try {
      const result = await api<unknown>(
        `/api/journal/weeks?year=${encodeURIComponent(nextYear)}&month=${encodeURIComponent(nextMonth)}`,
      );
      setWeeks(normalizeWeeks(result));
    } catch (error) {
      message.error(error instanceof Error ? error.message : "周次加载失败");
    } finally {
      setLoading(false);
    }
  }

  async function generate() {
    const prompt = form.getFieldValue("prompt")?.trim();
    if (!prompt) {
      message.warning("先写下本周做过的工作或关键词");
      return;
    }
    setGenerating(true);
    try {
      const result = await api<{ content: string }>("/api/journal/generate", {
        method: "POST",
        json: { prompt },
      });
      form.setFieldValue("content", result.content);
      setHistory((current) => ({
        ...current,
        generated: [
          {
            timestamp: new Date().toISOString(),
            content: result.content,
          },
          ...current.generated,
        ].slice(0, 50),
      }));
      message.success("周记草稿已生成");
    } catch (error) {
      message.error(error instanceof Error ? error.message : "生成失败");
    } finally {
      setGenerating(false);
    }
  }

  async function submit() {
    const values = await form.validateFields([
      "content",
      "title",
      "dateRange",
      "openType",
    ]);
    modal.confirm({
      title: "确认提交这篇周记？",
      content: "提交会直接写入当前校友邦账号，请确认日期、权限与正文无误。",
      okText: "确认提交",
      cancelText: "再检查一下",
      onOk: async () => {
        setSubmitting(true);
        try {
          await api("/api/journal/submit", {
            method: "POST",
            json: {
              blogTitle: values.title,
              blogBody: values.content,
              startDate: values.dateRange[0].format("YYYY-MM-DD"),
              endDate: values.dateRange[1].format("YYYY-MM-DD"),
              blogOpenType: values.openType,
              traineeId,
            },
          });
          message.success("周记提交成功");
          await bootstrap();
        } catch (error) {
          message.error(error instanceof Error ? error.message : "提交失败");
        } finally {
          setSubmitting(false);
        }
      },
    });
  }

  const months = useMemo(
    () => years.find((item) => item.year === year)?.months || [],
    [year, years],
  );

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="WORKLOG / JOURNAL"
        title="实习周记"
        description="生成、校对并提交周记；最终提交前始终由你确认正文与日期。"
        actions={
          <Button
            icon={loading ? <LoaderCircle size={16} /> : <RefreshCw size={16} />}
            loading={loading}
            disabled={!credentialReady}
            onClick={bootstrap}
          >
            {loaded ? "重新加载" : "加载校友邦数据"}
          </Button>
        }
      />

      {!credentialReady && (
        <Alert
          className="page-alert"
          type="warning"
          showIcon
          message="需要可用的校友邦登录凭证"
          description="请先回到运行总览初始化校友邦凭证。凭证存在时，SESSION 失效后会自动续期。若已配置自有模型，草稿生成仍可使用。"
        />
      )}

      <div className="journal-layout">
        <Card className="journal-editor-card">
          <SectionHeading
            title="编辑工作台"
            description="先提供事实素材，再对生成内容进行人工校对。"
            extra={<BookOpenCheck size={19} />}
          />
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              openType: "2",
              prompt: "",
              content: "",
            }}
            requiredMark={false}
          >
            <Form.Item label="本周素材" name="prompt">
              <Input.TextArea
                autoSize={{ minRows: 3, maxRows: 6 }}
                maxLength={5000}
                showCount
                placeholder="例如：完成库存接口联调、学习 Redis 缓存、排查一次并发问题，并参与周会复盘……"
              />
            </Form.Item>
            <div className="journal-generate-row">
              <span>生成结果不会自动提交，你仍可自由修改。</span>
              <Button
                type="primary"
                ghost
                icon={<Sparkles size={16} />}
                loading={generating}
                onClick={generate}
              >
                生成周记草稿
              </Button>
            </div>
            <Form.Item
              label="周记正文"
              name="content"
              rules={[
                { required: true, message: "请填写周记正文" },
                { min: 50, message: "正文至少 50 个字符" },
              ]}
            >
              <Input.TextArea
                className="journal-content"
                autoSize={{ minRows: 14, maxRows: 24 }}
                maxLength={10000}
                showCount
                placeholder="生成或直接输入周记正文"
              />
            </Form.Item>
            <div className="form-grid journal-submit-fields">
              <Form.Item
                label="标题"
                name="title"
                rules={[{ required: true, message: "请输入标题" }]}
              >
                <Input placeholder="例如：本周实习工作总结" maxLength={200} />
              </Form.Item>
              <Form.Item
                label="日期范围"
                name="dateRange"
                rules={[{ required: true, message: "请选择日期范围" }]}
              >
                <DatePicker.RangePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="查看权限" name="openType">
                <Select
                  options={[
                    { value: "2", label: "仅自己可见" },
                    { value: "1", label: "公开" },
                  ]}
                />
              </Form.Item>
              <Form.Item label="实习计划">
                <Input
                  value={traineeId ? `traineeId · ${traineeId}` : "尚未加载"}
                  disabled
                />
              </Form.Item>
            </div>
            <div className="journal-submit-action">
              <span>提交属于外部写操作，点击后还会再次确认。</span>
              <Button
                type="primary"
                icon={<Send size={16} />}
                loading={submitting}
                disabled={!credentialReady || !loaded}
                onClick={() => void submit()}
              >
                提交到校友邦
              </Button>
            </div>
          </Form>
        </Card>

        <aside className="journal-sidebar">
          <Card>
            <SectionHeading title="选择周次" description="从账号数据回填日期。" />
            <Space direction="vertical" style={{ width: "100%" }}>
              <Select
                value={year || undefined}
                placeholder="年份"
                options={years.map((item) => ({
                  value: item.year,
                  label: `${item.year} 年`,
                }))}
                onChange={(value) => {
                  setYear(value);
                  const nextMonths =
                    years.find((item) => item.year === value)?.months || [];
                  setMonth(nextMonths[0] || "");
                  setWeeks([]);
                }}
              />
              <Select
                value={month || undefined}
                placeholder="月份"
                options={months.map((value) => ({
                  value,
                  label: `${value} 月`,
                }))}
                onChange={setMonth}
              />
              <Button
                block
                onClick={() => void loadWeeks()}
                disabled={!year || !month}
              >
                查询周次
              </Button>
              <Select
                placeholder="选择一周"
                options={weeks.map((week, index) => ({
                  value: index,
                  label:
                    week.label ||
                    week.title ||
                    `${week.startDate} — ${week.endDate}`,
                }))}
                onChange={(index) => {
                  const week = weeks[index];
                  form.setFieldValue("dateRange", [
                    dayjs(week.startDate),
                    dayjs(week.endDate),
                  ]);
                }}
              />
            </Space>
          </Card>

          <Card>
            <SectionHeading
              title="生成历史"
              description="点击即可恢复到编辑器。"
              extra={<History size={17} />}
            />
            {history.generated.length ? (
              <div className="history-list">
                {history.generated.slice(0, 6).map((item, index) => (
                  <button
                    type="button"
                    key={`${item.timestamp}-${index}`}
                    onClick={() => form.setFieldValue("content", item.content)}
                  >
                    <span>{item.content.slice(0, 46)}</span>
                    <time>{formatDateTime(item.timestamp)}</time>
                  </button>
                ))}
              </div>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无生成记录" />
            )}
          </Card>

          <Card>
            <SectionHeading title="已提交周记" description="账号最近记录。" />
            {loading ? (
              <Skeleton active paragraph={{ rows: 3 }} />
            ) : blogs.length ? (
              <div className="history-list server">
                {blogs.slice(0, 8).map((blog, index) => (
                  <button
                    type="button"
                    key={String(blog.blogId || index)}
                    onClick={() => {
                      form.setFieldsValue({
                        title: String(blog.blogTitle || ""),
                        content: String(blog.blogBody || ""),
                      });
                    }}
                  >
                    <span>{String(blog.blogTitle || "无标题")}</span>
                    <Tag>{String(blog.commitDate || blog.endDate || "已提交")}</Tag>
                  </button>
                ))}
              </div>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="尚未加载记录" />
            )}
          </Card>
        </aside>
      </div>
    </div>
  );
}
