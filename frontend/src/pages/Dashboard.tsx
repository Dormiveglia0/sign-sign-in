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

interface AccountCaptchaChallenge {
  challengeId: string;
  image: string;
  expiresAt: number;
}

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
  const [sessionTab, setSessionTab] = useState("manual");
  const [code, setCode] = useState("");
  const [accountUsername, setAccountUsername] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [accountPicCode, setAccountPicCode] = useState("");
  const [accountChallenge, setAccountChallenge] =
    useState<AccountCaptchaChallenge | null>(null);
  const [accountBusy, setAccountBusy] = useState(false);
  const [busy, setBusy] = useState(false);

  const activeTask = ["queued", "running", "stopping"].includes(
    status?.task.status || "",
  );
  const photoMode = mode.startsWith("photo_");
  const sessionReady = Boolean(status?.session.valid);
  const sessionNeedsReauth =
    status?.session.autoRenew.status === "reauth_required";
  const sessionKeeper = status?.session.autoRenew;

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

  async function loadAccountCaptcha(showSuccess = false) {
    setAccountBusy(true);
    try {
      const challenge = await api<AccountCaptchaChallenge>(
        "/api/session/account/captcha",
        { method: "POST" },
      );
      setAccountChallenge(challenge);
      setAccountPicCode("");
      if (showSuccess) message.success("图形验证码已刷新");
      return true;
    } catch (error) {
      setAccountChallenge(null);
      message.error(
        error instanceof Error ? error.message : "获取图形验证码失败",
      );
      return false;
    } finally {
      setAccountBusy(false);
    }
  }

  async function recoverWithAccount() {
    if (!accountChallenge) {
      message.warning("请先获取图形验证码");
      return;
    }
    setAccountBusy(true);
    try {
      await api("/api/session/account/login", {
        method: "POST",
        json: {
          challengeId: accountChallenge.challengeId,
          username: accountUsername.trim(),
          password: accountPassword,
          picCode: accountPicCode.trim(),
        },
      });
      setAccountPassword("");
      setAccountPicCode("");
      setAccountChallenge(null);
      setSessionOpen(false);
      message.success("账号密码验证成功，校友邦 SESSION 已恢复");
      await refreshStatus();
    } catch (error) {
      message.error(error instanceof Error ? error.message : "账号登录失败");
      setAccountChallenge(null);
      setAccountPicCode("");
      await loadAccountCaptcha();
    } finally {
      setAccountBusy(false);
    }
  }

  function openSessionManager() {
    const nextTab = sessionNeedsReauth ? "account" : "manual";
    setSessionTab(nextTab);
    setSessionOpen(true);
    if (nextTab === "account" && !accountChallenge) {
      void loadAccountCaptcha();
    }
  }

  function closeSessionManager() {
    setSessionOpen(false);
    setAccountPassword("");
    setAccountPicCode("");
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
        value: sessionReady
          ? sessionKeeper?.status === "renewing"
            ? "正在主动续期"
            : sessionKeeper?.status === "retrying"
              ? "保活重试中"
              : "主动保活中"
          : sessionNeedsReauth
            ? "需要重新初始化"
            : "未初始化",
        detail:
          sessionReady && sessionKeeper?.nextAttemptAt
            ? `下次保活 ${formatDateTime(sessionKeeper.nextAttemptAt)}`
            : status?.session.cachedAt
              ? `更新于 ${formatDateTime(status.session.cachedAt)}`
              : "可用账号密码或有效 Code 初始化",
        icon: KeyRound,
        tone: sessionReady
          ? sessionKeeper?.status === "retrying"
            ? "warning"
            : "success"
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
                className={sessionReady ? "good" : "warn"}
              >
                {sessionReady
                  ? "已就绪"
                  : sessionNeedsReauth
                    ? "需要重新初始化"
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
              onClick={openSessionManager}
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
                disabled={!sessionReady}
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
            title="校友邦会话保活"
            description={`在 SESSION 仍有效时每 ${sessionKeeper?.intervalMinutes || 45} 分钟主动换新；失效后不会伪装成可恢复状态。`}
            extra={<ShieldCheck size={19} />}
          />
          <div className="session-orbit">
            <div
              className={
                sessionReady ? "session-ring valid" : "session-ring"
              }
            >
              <KeyRound size={28} />
            </div>
            <strong>
              {sessionReady
                ? sessionKeeper?.status === "renewing"
                  ? "正在主动换新 SESSION"
                  : sessionKeeper?.status === "retrying"
                    ? "主动保活正在重试"
                    : "主动保活运行中"
                : sessionNeedsReauth
                  ? "SESSION 已失效"
                  : "尚未初始化"}
            </strong>
            <span>
              {sessionReady
                ? sessionKeeper?.nextAttemptAt
                  ? `预计 ${formatDateTime(sessionKeeper.nextAttemptAt)} 再次保活`
                  : "保活调度正在同步"
                : sessionNeedsReauth
                  ? "可用账号密码和图形验证码恢复，或提交新的小程序 Code"
                  : "需要先用账号密码或有效 Code 初始化"}
            </span>
            <div className="session-detail-grid">
              <div>
                <span>凭证更新时间</span>
                <strong>
                  {formatDateTime(status?.session.cachedAt)}
                </strong>
              </div>
              <div>
                <span>续期策略</span>
                <strong>
                  每 {sessionKeeper?.intervalMinutes || 45} 分钟主动换新
                </strong>
              </div>
              <div>
                <span>当前 SESSION</span>
                <strong>
                  {sessionReady
                    ? `有效 · 尾号 ${status?.session.suffix || "—"}`
                    : sessionNeedsReauth
                      ? "已失效 · 可人工恢复"
                      : "不可用"}
                </strong>
              </div>
            </div>
          </div>
          {sessionKeeper?.lastError && (
            <Alert
              type={sessionNeedsReauth ? "error" : "warning"}
              showIcon
              message={
                sessionNeedsReauth
                  ? "需要人工恢复登录"
                  : "最近一次主动保活失败"
              }
              description={sessionKeeper.lastError}
              style={{ marginTop: 16 }}
            />
          )}
          <div className="session-card-actions">
            <Button block onClick={openSessionManager}>
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
        onCancel={closeSessionManager}
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
          type={sessionReady ? "success" : sessionNeedsReauth ? "error" : "info"}
          showIcon
          message={
            sessionReady
              ? "SESSION 主动保活已启用"
              : sessionNeedsReauth
                ? "SESSION 已失效，可使用账号密码恢复"
                : "首次初始化可使用账号密码或有效 Code"
          }
          description={
            sessionReady
              ? "服务器会在 SESSION 仍有效时每 45 分钟主动换新。若最终失效，可使用账号密码和图形验证码恢复，也可重新获取 Code。"
              : sessionNeedsReauth
                ? "现有 SESSION 已失效，缓存字段不能在过期后静默恢复；推荐使用账号密码和图形验证码换取新凭证，也可提交新的小程序 Code。"
                : "首次成功登录后会保存 AutoLogin 凭证，并在 SESSION 有效期内每 45 分钟主动换新。"
          }
          style={{ marginBottom: 16 }}
        />
        <Tabs
          activeKey={sessionTab}
          onChange={(key) => {
            setSessionTab(key);
            if (key === "account" && !accountChallenge && !accountBusy) {
              void loadAccountCaptcha();
            }
          }}
          items={[
            {
              key: "account",
              label: "账号密码（推荐）",
              children: (
                <div className="session-tab account-login-tab">
                  <Alert
                    type="info"
                    showIcon
                    message="不依赖微信运行时"
                    description="按 594 版小程序的 login.action 流程登录。图形验证码由服务端强制要求；明文密码只用于本次请求，不写入配置、缓存或日志。"
                  />
                  <label htmlFor="xyb-account-username">校友邦账号</label>
                  <Input
                    id="xyb-account-username"
                    value={accountUsername}
                    onChange={(event) => setAccountUsername(event.target.value)}
                    placeholder="手机号或校友邦账号"
                    autoComplete="username"
                    maxLength={64}
                  />
                  <label htmlFor="xyb-account-password">校友邦密码</label>
                  <Input.Password
                    id="xyb-account-password"
                    value={accountPassword}
                    onChange={(event) => setAccountPassword(event.target.value)}
                    placeholder="输入校友邦密码"
                    autoComplete="current-password"
                    maxLength={256}
                  />
                  <label htmlFor="xyb-account-captcha">图形验证码</label>
                  <div className="account-captcha-row">
                    <Input
                      id="xyb-account-captcha"
                      value={accountPicCode}
                      onChange={(event) => setAccountPicCode(event.target.value)}
                      placeholder="输入右侧验证码"
                      autoComplete="off"
                      maxLength={32}
                      onPressEnter={() => {
                        if (
                          accountChallenge &&
                          accountUsername.trim() &&
                          accountPassword &&
                          accountPicCode.trim()
                        ) {
                          void recoverWithAccount();
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="account-captcha-image"
                      disabled={accountBusy}
                      onClick={() => void loadAccountCaptcha(true)}
                      aria-label="刷新图形验证码"
                    >
                      {accountChallenge ? (
                        <img
                          src={accountChallenge.image}
                          alt="校友邦图形验证码"
                        />
                      ) : (
                        <span>{accountBusy ? "获取中…" : "获取验证码"}</span>
                      )}
                    </button>
                  </div>
                  <div className="account-challenge-meta">
                    <span>点击验证码图片可刷新</span>
                    {accountChallenge && (
                      <span>
                        有效至{" "}
                        {formatDateTime(
                          new Date(
                            accountChallenge.expiresAt * 1000,
                          ).toISOString(),
                        )}
                      </span>
                    )}
                  </div>
                  <Button
                    type="primary"
                    block
                    loading={accountBusy}
                    disabled={
                      !accountChallenge ||
                      !accountUsername.trim() ||
                      !accountPassword ||
                      !accountPicCode.trim()
                    }
                    onClick={recoverWithAccount}
                  >
                    验证并恢复 SESSION
                  </Button>
                </div>
              ),
            },
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
