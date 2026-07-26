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
  Tabs,
  Tooltip,
} from "antd";
import {
  Activity,
  CalendarClock,
  Camera,
  CheckCircle2,
  CircleStop,
  Clock3,
  Download,
  KeyRound,
  ListChecks,
  Play,
  RadioTower,
  RefreshCw,
  Server,
  ShieldCheck,
  Smartphone,
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
    if (photoMode && !image) {
      message.warning("拍照模式需要先选择一张图片");
      return;
    }
    setBusy(true);
    try {
      await api("/api/tasks", {
        method: "POST",
        json: { mode, image },
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
      message.success("会话刷新任务已启动");
      await refreshStatus();
    } catch (error) {
      message.error(error instanceof Error ? error.message : "刷新失败");
    } finally {
      setBusy(false);
    }
  }

  async function startCapture() {
    setBusy(true);
    try {
      await api("/api/capture", { method: "POST" });
      message.success("临时抓包代理正在启动");
      await refreshStatus();
    } catch (error) {
      message.error(error instanceof Error ? error.message : "启动失败");
    } finally {
      setBusy(false);
    }
  }

  async function stopCapture() {
    setBusy(true);
    try {
      await api("/api/capture", { method: "DELETE" });
      message.info("抓包代理正在关闭");
      await refreshStatus();
    } catch (error) {
      message.error(error instanceof Error ? error.message : "关闭失败");
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
        label: "校友邦会话",
        value: status?.session.valid ? "有效" : "待刷新",
        detail: status?.session.valid
          ? `尾号 ${status.session.suffix} · ${formatDateTime(status.session.expiresAt)} 到期`
          : "执行任务前需要获取",
        icon: KeyRound,
        tone: status?.session.valid ? "success" : "warning",
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
        description="从这里发起一次真实任务，并持续查看服务、会话与调度状态。"
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

          <div className="run-summary">
            <div>
              <span>准备执行</span>
              <strong>
                {modes.find((item) => item.value === mode)?.title}
              </strong>
            </div>
            <div>
              <span>会话</span>
              <strong className={status?.session.valid ? "good" : "warn"}>
                {status?.session.valid ? "已就绪" : "需要刷新"}
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
              管理会话
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
                disabled={!status?.session.valid}
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
            title="会话状态"
            description="服务器缓存 24 小时，失效后需重新获取。"
            extra={<ShieldCheck size={19} />}
          />
          <div className="session-orbit">
            <div className={status?.session.valid ? "session-ring valid" : "session-ring"}>
              <KeyRound size={28} />
            </div>
            <strong>{status?.session.valid ? "SESSION 有效" : "SESSION 缺失"}</strong>
            <span>
              {status?.session.valid
                ? `${formatDateTime(status.session.expiresAt)} 到期`
                : "当前无法执行签到与周记操作"}
            </span>
          </div>
          <Button block type="default" onClick={() => setSessionOpen(true)}>
            {status?.session.valid ? "更新会话" : "立即获取会话"}
          </Button>
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
            获取校友邦会话
          </div>
        }
      >
        <Tabs
          items={[
            {
              key: "manual",
              label: "直接填入 Code",
              children: (
                <div className="session-tab">
                  <Alert
                    type="info"
                    showIcon
                    message="Code 只用于本次换取会话"
                    description="服务器不会把 Code 写入配置文件；换取成功后仅保存校友邦会话缓存。"
                  />
                  <label htmlFor="session-code">小程序 Code</label>
                  <Input.Password
                    id="session-code"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    placeholder="粘贴抓取到的 Code"
                    autoComplete="off"
                  />
                  <Button
                    type="primary"
                    block
                    loading={busy}
                    disabled={!code.trim()}
                    onClick={refreshSession}
                  >
                    安全换取会话
                  </Button>
                </div>
              ),
            },
            {
              key: "capture",
              label: "远程抓包",
              children: (
                <div className="session-tab">
                  <Alert
                    type="warning"
                    showIcon
                    message="手机与控制台须使用同一公网出口"
                    description="代理仅允许点击启动按钮时的公网 IP。请让手机与当前控制台连接同一 Wi-Fi；主机填写服务器公网 IP，端口填写 13140。"
                  />
                  <ol className="capture-steps">
                    <li>
                      <span>1</span>
                      <div>
                        <strong>启动临时代理</strong>
                        <p>仅向当前公网 IP 开放 13140，5 分钟后自动回收。</p>
                      </div>
                    </li>
                    <li>
                      <span>2</span>
                      <div>
                        <strong>设置手机 Wi-Fi 代理</strong>
                        <p>
                          主机填写服务器公网 IP，端口填写 <code>13140</code>。
                        </p>
                      </div>
                    </li>
                    <li>
                      <span>3</span>
                      <div>
                        <strong>安装证书并打开小程序</strong>
                        <p>先安装下方 CA 证书，再彻底关闭并重新进入校友邦。</p>
                      </div>
                    </li>
                  </ol>
                  <div className="capture-status">
                    <RadioTower size={18} />
                    <div>
                      <strong>{status?.capture.message}</strong>
                      <span>
                        {status?.capture.expiresAt
                          ? `${formatDateTime(status.capture.expiresAt)} 自动关闭`
                          : "当前未占用代理端口"}
                      </span>
                    </div>
                  </div>
                  <div className="capture-actions">
                    <Button
                      href="/api/capture/certificate"
                      target="_blank"
                      icon={<Download size={16} />}
                      disabled={!status?.capture.certReady}
                    >
                      下载 CA 证书
                    </Button>
                    {["starting", "waiting", "refreshing"].includes(
                      status?.capture.status || "",
                    ) ? (
                      <Button danger loading={busy} onClick={stopCapture}>
                        关闭代理
                      </Button>
                    ) : (
                      <Button
                        type="primary"
                        icon={<Smartphone size={16} />}
                        loading={busy}
                        onClick={startCapture}
                      >
                        启动 5 分钟抓包
                      </Button>
                    )}
                  </div>
                </div>
              ),
            },
          ]}
        />
      </Modal>
    </div>
  );
}
