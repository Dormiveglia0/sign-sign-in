import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  App,
  Button,
  Card,
  Input,
  Modal,
  Radio,
  Select,
  Skeleton,
  Table,
  Tooltip,
} from "antd";
import {
  Activity,
  CalendarClock,
  Camera,
  CheckCircle2,
  CircleStop,
  Clock3,
  KeyRound,
  ListChecks,
  Play,
  RefreshCw,
  Server,
  ShieldCheck,
  TerminalSquare,
} from "lucide-react";
import { api, formatDateTime } from "../api";
import { PageHeader, SectionHeading, StateTag } from "../components";
import { useWorkspace } from "../App";
import type { ImageItem, LogEntry, TaskState } from "../types";

const modes = [
  {
    value: "in",
    title: "普通签到",
    detail: "开始当日实习",
    icon: CheckCircle2,
  },
  {
    value: "out",
    title: "普通签退",
    detail: "结束当日实习",
    icon: Clock3,
  },
  {
    value: "both",
    title: "签到并签退",
    detail: "按顺序执行两步",
    icon: ListChecks,
  },
  {
    value: "photo_in",
    title: "拍照签到",
    detail: "上传带水印照片",
    icon: Camera,
  },
  {
    value: "photo_out",
    title: "拍照签退",
    detail: "照片完成签退",
    icon: Camera,
  },
] as const;

function taskStateTag(status?: string) {
  if (status === "success") return <StateTag state="success">成功</StateTag>;
  if (status === "failed") return <StateTag state="danger">失败</StateTag>;
  if (status === "cancelled") return <StateTag state="neutral">已停止</StateTag>;
  if (["queued", "running", "stopping"].includes(status || ""))
    return <StateTag state="working">执行中</StateTag>;
  return <StateTag state="neutral">待命</StateTag>;
}

export default function Dashboard() {
  const { message } = App.useApp();
  const { status, statusError, refreshStatus } = useWorkspace();
  const [mode, setMode] = useState<(typeof modes)[number]["value"]>("in");
  const [image, setImage] = useState("");
  const [randomImage, setRandomImage] = useState(true);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [history, setHistory] = useState<TaskState[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [sessionOpen, setSessionOpen] = useState(false);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);

  const activeTask = ["queued", "running", "stopping"].includes(
    status?.task.status || "",
  );
  const photoMode = mode.startsWith("photo_");

  async function loadSupportData() {
    const results = await Promise.allSettled([
      api<{ items: ImageItem[] }>("/api/images"),
      api<TaskState[]>("/api/tasks/history"),
      api<{ items: LogEntry[] }>("/api/logs?limit=12"),
    ]);
    if (results[0].status === "fulfilled") setImages(results[0].value.items);
    if (results[1].status === "fulfilled") setHistory(results[1].value);
    if (results[2].status === "fulfilled") setLogs(results[2].value.items);
  }

  useEffect(() => {
    void loadSupportData();
  }, [status?.task.finishedAt]);

  async function startTask() {
    if (photoMode && !images.length) {
      message.warning("图片库为空，请先到图片资产上传图片");
      return;
    }
    if (photoMode && !randomImage && !image) {
      message.warning("拍照模式需要先选择一张图片");
      return;
    }
    setBusy(true);
    try {
      await api("/api/tasks", {
        method: "POST",
        json: {
          mode,
          image: photoMode && !randomImage ? image : "",
          randomImage: photoMode && randomImage,
        },
      });
      message.success("任务已启动");
      await refreshStatus();
    } catch (error) {
      message.error(error instanceof Error ? error.message : "启动失败");
    } finally {
      setBusy(false);
    }
  }

  async function stopTask() {
    setBusy(true);
    try {
      await api("/api/tasks/current", { method: "DELETE" });
      message.info("正在停止，当前网络请求结束后生效");
      await refreshStatus();
    } catch (error) {
      message.error(error instanceof Error ? error.message : "停止失败");
    } finally {
      setBusy(false);
    }
  }

  async function refreshSession() {
    setBusy(true);
    try {
      await api("/api/session/refresh", {
        method: "POST",
        json: { code: code.trim() },
      });
      setCode("");
      setSessionOpen(false);
      message.success("校友邦凭证初始化任务已启动");
      await refreshStatus();
    } catch (error) {
      message.error(error instanceof Error ? error.message : "刷新失败");
    } finally {
      setBusy(false);
    }
  }

  async function verifyAutoRenewal() {
    setBusy(true);
    try {
      await api("/api/session/auto-renew", { method: "POST" });
      message.success("自动续期验证成功");
      await refreshStatus();
    } catch (error) {
      message.error(error instanceof Error ? error.message : "验证失败");
    } finally {
      setBusy(false);
    }
  }

  const nextRun = status?.scheduler.tasks
    .filter((item) => item.nextAt)
    .sort(
      (left, right) =>
        new Date(left.nextAt!).getTime() - new Date(right.nextAt!).getTime(),
    )[0];

  const statusCards = useMemo(
    () => [
      {
        label: "Linux 服务",
        value: statusError ? "连接异常" : "在线运行",
        detail: status ? `进程 PID ${status.pid}` : "正在读取",
        icon: Server,
        tone: statusError ? "danger" : "success",
      },
      {
        label: "校友邦自动续期",
        value:
          status?.session.autoRenew.status === "renewing"
            ? "正在续期"
            : status?.session.autoRenew.status === "retrying"
              ? "自动重试中"
              : status?.session.renewalAvailable
                ? "运行正常"
                : "未初始化",
        detail:
          status?.session.autoRenew.status === "retrying"
            ? `下次 ${formatDateTime(status.session.autoRenew.nextAttemptAt)} 重试`
            : status?.session.autoRenew.lastSuccessAt
              ? `上次成功 ${formatDateTime(status.session.autoRenew.lastSuccessAt)}`
              : "首次使用需要一个有效 Code",
        icon: KeyRound,
        tone:
          status?.session.autoRenew.status === "retrying"
            ? "danger"
            : status?.session.renewalAvailable
              ? "success"
              : "warning",
      },
      {
        label: "定时调度",
        value: status?.scheduler.enabled
          ? `${status.scheduler.taskCount} 项已启用`
          : "未启用",
        detail: nextRun
          ? `下次 ${formatDateTime(nextRun.nextAt)}`
          : `时区 ${status?.scheduler.timezone || "Asia/Shanghai"}`,
        icon: CalendarClock,
        tone: status?.scheduler.enabled ? "success" : "neutral",
      },
      {
        label: "当前任务",
        value: activeTask ? status?.task.action || "执行中" : "空闲",
        detail: status?.task.message || "等待指令",
        icon: Activity,
        tone: activeTask ? "working" : "neutral",
      },
    ],
    [activeTask, nextRun, status, statusError],
  );

  if (!status && !statusError) {
    return (
      <div className="page-container">
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  return (
    <div className="page-container dashboard-page">
      <PageHeader
        eyebrow="OPERATIONS / OVERVIEW"
        title="运行总览"
        description="发起任务并查看服务、校友邦凭证与定时调度状态。"
        actions={
          <Tooltip title="刷新全部状态">
            <Button
              icon={<RefreshCw size={16} />}
              onClick={() => {
                void refreshStatus();
                void loadSupportData();
              }}
            >
              刷新
            </Button>
          </Tooltip>
        }
      />

      {statusError && (
        <Alert
          type="error"
          showIcon
          message="无法读取服务器状态"
          description={statusError}
          className="page-alert"
        />
      )}

      <section className="status-strip">
        {statusCards.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.label} className={`status-block ${item.tone}`}>
              <div className="status-block-icon">
                <Icon size={19} />
              </div>
              <div>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <small>{item.detail}</small>
              </div>
            </article>
          );
        })}
      </section>

      <div className="dashboard-grid">
        <Card className="run-card">
          <SectionHeading
            title="发起任务"
            description="业务逻辑直接在服务器执行；关闭浏览器不会中断任务。"
            extra={taskStateTag(status?.task.status)}
          />

          <Radio.Group
            value={mode}
            onChange={(event) => setMode(event.target.value)}
            className="mode-grid"
            disabled={activeTask}
          >
            {modes.map((item) => {
              const Icon = item.icon;
              return (
                <Radio.Button key={item.value} value={item.value}>
                  <Icon size={18} />
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </span>
                </Radio.Button>
              );
            })}
          </Radio.Group>

          {photoMode && (
            <>
              <div className="inline-field">
                <label>图片来源</label>
                <Radio.Group
                  value={randomImage ? "random" : "fixed"}
                  onChange={(event) =>
                    setRandomImage(event.target.value === "random")
                  }
                  optionType="button"
                  buttonStyle="solid"
                  options={[
                    { value: "random", label: "从图片库随机抽取" },
                    { value: "fixed", label: "指定图片" },
                  ]}
                />
              </div>
              {!randomImage && (
                <div className="inline-field">
                  <label htmlFor="dashboard-image">签到图片</label>
                  <Select
                    id="dashboard-image"
                    value={image || undefined}
                    onChange={setImage}
                    placeholder="从图片资产中选择"
                    options={images.map((item) => ({
                      value: item.name,
                      label: item.name,
                    }))}
                    notFoundContent="还没有图片，请先到图片资产上传"
                  />
                </div>
              )}
            </>
          )}

          <div className="run-summary">
            <div>
              <span>准备执行</span>
              <strong>
                {modes.find((item) => item.value === mode)?.title}
              </strong>
            </div>
            <div>
              <span>校友邦凭证</span>
              <strong
                className={
                  status?.session.valid || status?.session.renewalAvailable
                    ? "good"
                    : "warn"
                }
              >
                {status?.session.valid
                  ? "已就绪"
                  : status?.session.renewalAvailable
                    ? "执行前自动续期"
                    : "未初始化"}
              </strong>
            </div>
            <div>
              <span>执行位置</span>
              <strong>Linux 服务端</strong>
            </div>
          </div>

          <div className="run-actions">
            <Button
              icon={<KeyRound size={16} />}
              onClick={() => setSessionOpen(true)}
              disabled={activeTask}
            >
              管理校友邦凭证
            </Button>
            {activeTask ? (
              <Button
                danger
                type="primary"
                icon={<CircleStop size={16} />}
                loading={busy}
                onClick={stopTask}
              >
                停止任务
              </Button>
            ) : (
              <Button
                type="primary"
                icon={<Play size={16} />}
                loading={busy}
                disabled={
                  !(status?.session.valid || status?.session.renewalAvailable)
                }
                onClick={startTask}
              >
                开始执行
              </Button>
            )}
          </div>

          {status?.task.status !== "idle" && (
            <div className={`live-task ${status?.task.status}`}>
              <span className="task-pulse" />
              <div>
                <strong>{status?.task.action || "最近任务"}</strong>
                <span>{status?.task.message}</span>
              </div>
              <time>
                {formatDateTime(
                  status?.task.finishedAt || status?.task.startedAt,
                )}
              </time>
            </div>
          )}
        </Card>

        <Card className="session-card">
          <SectionHeading
            title="校友邦自动续期"
            description="由 Linux 后台守护运行，与管理后台登录状态互不影响。"
            extra={<ShieldCheck size={19} />}
          />
          <div className="session-orbit">
            <div
              className={
                status?.session.renewalAvailable
                  ? "session-ring valid"
                  : "session-ring"
              }
            >
              <KeyRound size={28} />
            </div>
            <strong>
              {status?.session.autoRenew.status === "renewing"
                ? "正在自动续期"
                : status?.session.autoRenew.status === "retrying"
                  ? "续期失败，等待重试"
                  : status?.session.renewalAvailable
                    ? "自动续期守护运行中"
                    : "尚未初始化"}
            </strong>
            <span>
              {status?.session.renewalAvailable
                ? `每 ${status.session.autoRenew.intervalMinutes} 分钟主动换新；接口返回未登录时也会立即续期并重试`
                : "需要先用一个有效 Code 初始化，之后无需日常手动操作"}
            </span>
            <div className="session-detail-grid">
              <div>
                <span>上次成功</span>
                <strong>
                  {formatDateTime(status?.session.autoRenew.lastSuccessAt)}
                </strong>
              </div>
              <div>
                <span>下次检查</span>
                <strong>
                  {formatDateTime(status?.session.autoRenew.nextAttemptAt)}
                </strong>
              </div>
              <div>
                <span>当前 SESSION</span>
                <strong>
                  {status?.session.valid
                    ? `有效 · 尾号 ${status.session.suffix}`
                    : status?.session.renewalAvailable
                      ? "等待自动换新"
                      : "不可用"}
                </strong>
              </div>
            </div>
          </div>
          {status?.session.autoRenew.lastError && (
            <Alert
              type="warning"
              showIcon
              message="最近一次自动续期失败"
              description={status.session.autoRenew.lastError}
              className="session-renew-error"
            />
          )}
          <div className="session-card-actions">
            <Button
              block
              type="primary"
              icon={<RefreshCw size={15} />}
              loading={busy}
              disabled={!status?.session.renewalAvailable || activeTask}
              onClick={() => void verifyAutoRenewal()}
            >
              立即验证自动续期
            </Button>
            <Button block type="text" onClick={() => setSessionOpen(true)}>
              初始化或恢复凭证
            </Button>
          </div>
        </Card>
      </div>

      <div className="dashboard-lower-grid">
        <Card>
          <SectionHeading
            title="最近任务"
            description="保留最近 50 次执行结果。"
          />
          <Table
            rowKey="id"
            size="small"
            pagination={false}
            dataSource={history.slice(0, 6)}
            locale={{ emptyText: "尚未执行过任务" }}
            columns={[
              {
                title: "任务",
                dataIndex: "action",
                render: (value, record) => (
                  <div className="table-primary">
                    <strong>{value || "未知任务"}</strong>
                    <span>{record.source === "auto" ? "定时触发" : "手动触发"}</span>
                  </div>
                ),
              },
              {
                title: "状态",
                dataIndex: "status",
                width: 96,
                render: (value) => taskStateTag(value),
              },
              {
                title: "时间",
                dataIndex: "finishedAt",
                width: 130,
                render: (value, record) =>
                  formatDateTime(value || record.startedAt),
              },
            ]}
          />
        </Card>

        <Card className="log-preview-card">
          <SectionHeading
            title="实时日志"
            description="最近的服务端事件。"
            extra={<TerminalSquare size={18} />}
          />
          <div className="mini-log">
            {logs.length ? (
              logs.slice(-8).map((entry) => (
                <div key={entry.id}>
                  <time>{formatDateTime(entry.time).split(" ").at(-1)}</time>
                  <span className={`log-level ${entry.level}`}>
                    {entry.level}
                  </span>
                  <p>{entry.message}</p>
                </div>
              ))
            ) : (
              <div className="mini-log-empty">暂无运行日志</div>
            )}
          </div>
        </Card>
      </div>

      <Modal
        open={sessionOpen}
        onCancel={() => setSessionOpen(false)}
        footer={null}
        width={640}
        title={
          <div className="modal-title">
            <KeyRound size={19} />
            校友邦登录凭证
          </div>
        }
      >
        <Alert
          type={status?.session.renewalAvailable ? "success" : "info"}
          showIcon
          message={
            status?.session.renewalAvailable
              ? "后续无需再手动更新"
              : "首次初始化需要一个有效 Code"
          }
          description={
            status?.session.renewalAvailable
              ? "服务器已保存小程序登录凭证，会按源码中的 AutoLogin 流程自动换取新 SESSION。下面的方式只在你主动退出、解绑或凭证被服务端撤销后才需要。"
              : "首次成功登录后会保存 AutoLogin 凭证，后续 SESSION 失效将由服务器静默续期。"
          }
          style={{ marginBottom: 16 }}
        />
        <div className="session-tab">
          <Alert
            type="warning"
            showIcon
            message="这里只用于凭证被撤销后的重新初始化"
            description="wx.login Code 由微信运行时签发，Linux 服务不会伪造。当前凭证正常时无需填写任何内容。"
          />
          <label htmlFor="session-code">新的小程序 Code</label>
          <Input.Password
            id="session-code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="仅在自动续期凭证失效后填写"
            autoComplete="off"
          />
          <Button
            type="primary"
            block
            loading={busy}
            disabled={!code.trim()}
            onClick={refreshSession}
          >
            重新初始化校友邦凭证
          </Button>
        </div>
      </Modal>
    </div>
  );
}
