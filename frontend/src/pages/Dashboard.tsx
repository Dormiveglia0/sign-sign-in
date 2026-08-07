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

function formatRenewInterval(minutes: number) {
  if (minutes < 60 || minutes % 60 !== 0) return `${minutes} 分钟`;
  return `${minutes / 60} 小时`;
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
  const reauthRequired = Boolean(status?.session.reauthRequired);
  const credentialReadyCount = reauthRequired
    ? 0
    : [
        status?.session.usable,
        status?.session.autoLoginAvailable,
        status?.session.wechatRecoveryAvailable,
      ].filter(Boolean).length;
  const credentialStages = [
    {
      step: "01",
      title: "当前 SESSION",
      detail: reauthRequired
        ? "服务端已拒绝恢复，需要新的小程序 Code"
        : status?.session.usable
        ? `正在使用 · 尾号 ${status.session.suffix}`
        : status?.session.renewalAvailable
          ? "后台维护完成后恢复执行"
          : "等待首次初始化",
      state: reauthRequired
        ? "需重置"
        : status?.session.usable
        ? "当前使用"
        : status?.session.renewalAvailable
          ? "维护中"
          : "未就绪",
      tone: status?.session.usable
        ? "active"
        : status?.session.renewalAvailable
          ? "standby"
          : "missing",
    },
    {
      step: "02",
      title: "AutoLogin 静默换新",
      detail: `每 ${formatRenewInterval(
        status?.session.autoRenew.intervalMinutes || 1200,
      )}提前轮换 encryptValue`,
      state: reauthRequired
        ? "已失效"
        : status?.session.autoLoginAvailable
          ? "已备妥"
          : "未就绪",
      tone: status?.session.autoLoginAvailable ? "ready" : "missing",
    },
    {
      step: "03",
      title: "微信绑定自动恢复",
      detail: "第二层失效时，使用已绑定身份重新签发凭证",
      state: reauthRequired
        ? "已失效"
        : status?.session.wechatRecoveryAvailable
          ? "已备妥"
          : "未就绪",
      tone: status?.session.wechatRecoveryAvailable ? "ready" : "missing",
    },
  ];

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
        label: "校友邦凭证",
        value:
          status?.session.reauthRequired
            ? "需要重新初始化"
            : status?.session.autoRenew.status === "renewing"
            ? "正在维护"
            : status?.session.autoRenew.status === "retrying"
              ? "维护异常"
              : status?.session.renewalAvailable
                ? "三层守护中"
                : "未初始化",
        detail:
          status?.session.reauthRequired
            ? "恢复链已被服务端拒绝，请提交新的 Code"
            : status?.session.autoRenew.nextAttemptAt
            ? `下次 ${formatDateTime(status.session.autoRenew.nextAttemptAt)}`
            : status?.session.renewalAvailable
              ? "AutoLogin + 微信绑定恢复已就绪"
              : "恢复链等待首次激活",
        icon: KeyRound,
        tone:
          status?.session.reauthRequired ||
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
                  status?.session.usable ? "good" : "warn"
                }
              >
                {status?.session.usable
                  ? "已就绪"
                  : status?.session.reauthRequired
                    ? "需要重新初始化"
                    : status?.session.renewalAvailable
                      ? "等待凭证维护"
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
                disabled={!status?.session.usable}
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
            title="登录凭证守护"
            description="优先自动恢复；服务端拒绝恢复时会明确要求重新初始化。"
            extra={<ShieldCheck size={19} />}
          />
          <div
            className={`credential-guard ${
              status?.session.reauthRequired ||
              status?.session.autoRenew.status === "retrying"
                ? "danger"
                : status?.session.renewalAvailable
                  ? "healthy"
                  : "waiting"
            }`}
          >
            <div className="credential-guard-copy">
              <span>
                <ShieldCheck size={14} /> CREDENTIAL GUARD
              </span>
              <strong>
                {status?.session.reauthRequired
                  ? "需要新的小程序 Code"
                  : status?.session.autoRenew.status === "renewing"
                  ? "正在维护凭证"
                  : status?.session.autoRenew.status === "retrying"
                    ? "自动恢复等待重试"
                    : status?.session.renewalAvailable
                      ? "自动守护正在运行"
                      : "等待首次初始化"}
              </strong>
              <small>
                {credentialReadyCount}/3 层可用
              </small>
            </div>
            <div className="credential-score" aria-label={`${credentialReadyCount} 层可用`}>
              <strong>{credentialReadyCount}</strong>
              <span>/ 3</span>
            </div>
          </div>

          <ol className="credential-chain" aria-label="校友邦凭证自动恢复链">
            {credentialStages.map((stage) => (
              <li key={stage.step} className={stage.tone}>
                <span className="credential-step" aria-hidden="true">
                  {stage.step}
                </span>
                <div>
                  <strong>{stage.title}</strong>
                  <small>{stage.detail}</small>
                </div>
                <span className="credential-stage-state">{stage.state}</span>
              </li>
            ))}
          </ol>

          <div className="credential-maintenance">
            <div>
              <span>上次成功</span>
              <strong>
                {formatDateTime(status?.session.autoRenew.lastSuccessAt)}
              </strong>
            </div>
            <div>
              <span>下次后台动作</span>
              <strong>
                {formatDateTime(status?.session.autoRenew.nextAttemptAt)}
              </strong>
            </div>
          </div>
          {status?.session.autoRenew.lastError && (
            <Alert
              type={status.session.reauthRequired ? "error" : "warning"}
              showIcon
              message={
                status.session.reauthRequired
                  ? "自动恢复已停止"
                  : "最近一次凭证维护失败"
              }
              description={status.session.autoRenew.lastError}
            />
          )}
          <div className="session-card-actions">
            <Button block onClick={() => setSessionOpen(true)}>
              {status?.session.reauthRequired
                ? "使用新 Code 重新初始化"
                : status?.session.renewalAvailable
                ? "管理或重新初始化"
                : "首次初始化凭证"}
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
        width={700}
        title={
          <div className="modal-title">
            <KeyRound size={19} />
            校友邦登录凭证
          </div>
        }
      >
        <Alert
          type={
            status?.session.reauthRequired
              ? "error"
              : status?.session.renewalAvailable
                ? "success"
                : "info"
          }
          showIcon
          message={
            status?.session.reauthRequired
              ? "需要一个新的小程序 Code"
              : status?.session.renewalAvailable
              ? "后续无需再手动更新"
              : "首次初始化需要一个有效 Code"
          }
          description={
            status?.session.reauthRequired
              ? "AutoLogin 与微信绑定恢复均已被服务端拒绝。提交新的 wx.login Code 后，自动守护会重新启用。"
              : status?.session.renewalAvailable
              ? "服务器已保存小程序登录凭证，会按源码中的 AutoLogin 流程自动换取新 SESSION。下面的方式只在你主动退出、解绑或凭证被服务端撤销后才需要。"
              : "首次成功登录后会保存 AutoLogin 凭证，后续 SESSION 失效将由服务器静默续期。"
          }
          style={{ marginBottom: 16 }}
        />
        <Tabs
          items={[
            {
              key: "manual",
              label: "输入 Code",
              children: (
                <div className="session-tab">
                  <Alert
                    type="warning"
                    showIcon
                    message="Code 只能换取一次"
                    description="请提交尚未被小程序发送的 wx.login Code；已经请求过 getOpenId.action 的 Code 会失效。"
                  />
                  <label htmlFor="session-code">新的小程序 Code</label>
                  <Input.Password
                    id="session-code"
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                    placeholder="输入尚未使用的 Code"
                    autoComplete="off"
                  />
                  <Button
                    type="primary"
                    block
                    loading={busy}
                    disabled={!code.trim()}
                    onClick={refreshSession}
                  >
                    更新校友邦凭证
                  </Button>
                </div>
              ),
            },
            {
              key: "capture",
              label: "代理自动获取",
              children: (
                <div className="session-tab">
                  <Alert
                    type="info"
                    showIcon
                    message="通过代理自动捕获 Code 并更新 SESSION"
                    description="启动后会显示设备连接、访问域名、目标请求和 TLS 失败；捕获成功后会自动关闭代理并刷新凭证。"
                  />
                  <ol className="capture-steps">
                    <li>
                      <span>1</span>
                      <div>
                        <strong>启动临时代理</strong>
                        <p>仅允许当前公网 IP 连接，5 分钟后自动关闭。</p>
                      </div>
                    </li>
                    <li>
                      <span>2</span>
                      <div>
                        <strong>设置设备代理</strong>
                        <p>
                          主机 <code>{window.location.hostname}</code>，端口{" "}
                          <code>13140</code>；普通网站会透传，目标域名才解密。
                        </p>
                      </div>
                    </li>
                    <li>
                      <span>3</span>
                      <div>
                        <strong>查看实时活动</strong>
                        <p>
                          始终为 0 条表示设备未连到代理；TLS-FAILED
                          表示客户端不信任用户 CA。
                        </p>
                      </div>
                    </li>
                  </ol>
                  <div className="capture-status">
                    <RadioTower size={18} />
                    <div>
                      <strong>{status?.capture.message}</strong>
                      <span>
                        {status?.capture.diagnosis || "当前未占用代理端口"}
                      </span>
                      {status?.capture.expiresAt && (
                        <span>
                          {formatDateTime(status.capture.expiresAt)} 自动关闭
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="capture-diagnostics" aria-live="polite">
                    <div className="capture-diagnostics-head">
                      <strong>实时代理活动</strong>
                      <span>{status?.capture.events?.length || 0} 条</span>
                    </div>
                    {status?.capture.events?.length ? (
                      <ol>
                        {status.capture.events.map((event, index) => (
                          <li key={`${index}-${event}`}>{event}</li>
                        ))}
                      </ol>
                    ) : (
                      <p>连接设备后，这里会持续显示实际收到的代理活动。</p>
                    )}
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
                        启动 5 分钟代理
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
