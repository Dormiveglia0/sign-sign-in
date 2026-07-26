import {
  createContext,
  lazy,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  App as AntApp,
  Avatar,
  Button,
  ConfigProvider,
  Drawer,
  Dropdown,
  Form,
  Input,
  Spin,
  theme,
} from "antd";
import {
  BookOpenText,
  CalendarClock,
  ChevronDown,
  FileClock,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  Network,
  Settings,
  Waypoints,
} from "lucide-react";
import {
  HashRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { api } from "./api";
import Dashboard from "./pages/Dashboard";
import type { SystemStatus } from "./types";

const ImagesPage = lazy(() => import("./pages/Images"));
const Jielong = lazy(() => import("./pages/Jielong"));
const Journal = lazy(() => import("./pages/Journal"));
const Logs = lazy(() => import("./pages/Logs"));
const Schedules = lazy(() => import("./pages/Schedules"));
const SettingsPage = lazy(() => import("./pages/Settings"));

type WorkspaceValue = {
  status: SystemStatus | null;
  statusError: string;
  refreshStatus: () => Promise<void>;
};

const WorkspaceContext = createContext<WorkspaceValue | null>(null);

export function useWorkspace() {
  const value = useContext(WorkspaceContext);
  if (!value) throw new Error("useWorkspace must be used inside Workspace");
  return value;
}

const navItems = [
  { path: "/", label: "运行总览", icon: LayoutDashboard },
  { path: "/schedules", label: "定时任务", icon: CalendarClock },
  { path: "/images", label: "图片资产", icon: Images },
  { path: "/journal", label: "实习周记", icon: BookOpenText },
  { path: "/jielong", label: "接龙表单", icon: Waypoints },
  { path: "/logs", label: "运行日志", icon: FileClock },
  { path: "/settings", label: "系统配置", icon: Settings },
];

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const { message } = AntApp.useApp();
  const [loading, setLoading] = useState(false);
  const [serviceOnline, setServiceOnline] = useState<boolean | null>(null);

  useEffect(() => {
    api<{ ok: boolean }>("/api/health")
      .then((value) => setServiceOnline(value.ok))
      .catch(() => setServiceOnline(false));
  }, []);

  async function submit(values: { username: string; password: string }) {
    setLoading(true);
    try {
      await api("/api/auth/login", {
        method: "POST",
        json: values,
      });
      message.success("登录成功");
      onLogin();
    } catch (error) {
      message.error(error instanceof Error ? error.message : "登录失败");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-shell">
      <section className="login-panel">
        <div className="login-form-wrap">
          <div className="login-brand">
            <img src="/app-icon.svg" alt="" />
            <span>SignSignIn</span>
          </div>
          <div className="login-title">
            <span className="eyebrow">SECURE ACCESS</span>
            <h2>登录控制台</h2>
          </div>
          <div className="login-system-line">
            <span className={serviceOnline ? "online-dot" : "offline-dot"} />
            {serviceOnline === null
              ? "正在检查服务"
              : serviceOnline
                ? "Linux 服务在线"
                : "服务暂不可用"}
          </div>
          <Form
            layout="vertical"
            size="large"
            initialValues={{ username: "admin" }}
            onFinish={submit}
            requiredMark={false}
          >
            <Form.Item
              label="管理员账号"
              name="username"
              rules={[{ required: true, message: "请输入账号" }]}
            >
              <Input autoComplete="username" />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password autoComplete="current-password" />
            </Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={loading}
              className="login-submit"
            >
              进入控制台
            </Button>
          </Form>
          <p className="login-footnote">
            此密码只用于管理后台，不影响校友邦登录凭证与定时任务。
          </p>
        </div>
      </section>
    </main>
  );
}

function Sidebar({
  mobile = false,
  close,
}: {
  mobile?: boolean;
  close?: () => void;
}) {
  const location = useLocation();
  return (
    <div className={mobile ? "sidebar-inner mobile" : "sidebar-inner"}>
      <Link to="/" className="brand-lockup" onClick={close}>
        <img src="/app-icon.svg" alt="" />
        <div>
          <strong>SignSignIn</strong>
          <span>Linux Console</span>
        </div>
      </Link>
      <div className="nav-label">工作区</div>
      <nav className="main-navigation" aria-label="主导航">
        {navItems.map((item) => {
          const active =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={active ? "nav-link active" : "nav-link"}
              onClick={close}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{item.label}</span>
              {active && <i />}
            </Link>
          );
        })}
      </nav>
      <div className="sidebar-meta">
        <Network size={16} />
        <div>
          <span>服务模式</span>
          <strong>Remote / Headless</strong>
        </div>
      </div>
    </div>
  );
}

function Workspace({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { message } = AntApp.useApp();
  const [mobileNav, setMobileNav] = useState(false);
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [statusError, setStatusError] = useState("");

  const refreshStatus = useCallback(async () => {
    try {
      const next = await api<SystemStatus>("/api/status");
      setStatus(next);
      setStatusError("");
    } catch (error) {
      setStatusError(error instanceof Error ? error.message : "状态加载失败");
    }
  }, []);

  useEffect(() => {
    void refreshStatus();
    const timer = window.setInterval(refreshStatus, 2500);
    return () => window.clearInterval(timer);
  }, [refreshStatus]);

  async function logout() {
    try {
      await api("/api/auth/logout", { method: "POST" });
    } catch {
      // The local auth state still needs to close if the server already expired it.
    }
    onLogout();
  }

  const value = useMemo(
    () => ({ status, statusError, refreshStatus }),
    [status, statusError, refreshStatus],
  );

  const currentTitle =
    navItems.find((item) =>
      item.path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(item.path),
    )?.label || "控制台";

  return (
    <WorkspaceContext.Provider value={value}>
      <div className="app-frame">
        <aside className="desktop-sidebar">
          <Sidebar />
        </aside>
        <Drawer
          open={mobileNav}
          onClose={() => setMobileNav(false)}
          placement="left"
          width={280}
          closable={false}
          styles={{ body: { padding: 0, background: "#101820" } }}
        >
          <Sidebar mobile close={() => setMobileNav(false)} />
        </Drawer>

        <div className="app-workspace">
          <header className="topbar">
            <div className="topbar-left">
              <Button
                className="mobile-menu"
                type="text"
                icon={<Menu size={20} />}
                onClick={() => setMobileNav(true)}
                aria-label="打开导航"
              />
              <div>
                <span>工作区</span>
                <strong>{currentTitle}</strong>
              </div>
            </div>
            <div className="topbar-right">
              <div className="service-pill">
                <span className={statusError ? "offline-dot" : "online-dot"} />
                {statusError ? "状态异常" : "服务在线"}
              </div>
              <Dropdown
                trigger={["click"]}
                menu={{
                  items: [
                    {
                      key: "settings",
                      icon: <Settings size={15} />,
                      label: "系统配置",
                      onClick: () => navigate("/settings"),
                    },
                    { type: "divider" },
                    {
                      key: "logout",
                      danger: true,
                      icon: <LogOut size={15} />,
                      label: "退出登录",
                      onClick: () => void logout(),
                    },
                  ],
                }}
              >
                <button className="account-button" type="button">
                  <Avatar size={30}>A</Avatar>
                  <span>admin</span>
                  <ChevronDown size={14} />
                </button>
              </Dropdown>
            </div>
          </header>

          <div className="content-scroll">
            <Suspense
              fallback={
                <div className="route-loading">
                  <Spin />
                  <span>正在加载工作区</span>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/schedules" element={<Schedules />} />
                <Route path="/images" element={<ImagesPage />} />
                <Route path="/journal" element={<Journal />} />
                <Route path="/jielong" element={<Jielong />} />
                <Route path="/logs" element={<Logs />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </WorkspaceContext.Provider>
  );
}

function AuthenticatedApp() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const check = useCallback(async () => {
    try {
      const result = await api<{ authenticated: boolean }>("/api/auth/me");
      setAuthenticated(result.authenticated);
    } catch {
      setAuthenticated(false);
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    void check();
    const expired = () => setAuthenticated(false);
    window.addEventListener("auth-expired", expired);
    return () => window.removeEventListener("auth-expired", expired);
  }, [check]);

  if (checking) {
    return (
      <div className="app-loading">
        <img src="/app-icon.svg" alt="" />
        <Spin />
        <span>正在连接 Linux 服务</span>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <LoginScreen
        onLogin={() => {
          setAuthenticated(true);
          messageFallback();
        }}
      />
    );
  }
  return <Workspace onLogout={() => setAuthenticated(false)} />;
}

function messageFallback() {
  // Keeps the login callback synchronous for browser password managers.
}

export default function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: "#0f766e",
          colorInfo: "#0f766e",
          colorSuccess: "#168566",
          colorWarning: "#c47b18",
          colorError: "#c84343",
          colorText: "#182127",
          colorTextSecondary: "#66727a",
          colorBorder: "#dce2e3",
          colorBgLayout: "#f2f4f3",
          borderRadius: 8,
          borderRadiusLG: 10,
          fontFamily:
            '"Inter Variable", Inter, "Noto Sans SC", "Microsoft YaHei", sans-serif',
          controlHeight: 38,
        },
        components: {
          Button: { fontWeight: 600 },
          Card: { paddingLG: 22 },
          Menu: { itemBorderRadius: 6 },
          Table: { headerBg: "#f6f8f7" },
        },
      }}
    >
      <AntApp>
        <HashRouter>
          <AuthenticatedApp />
        </HashRouter>
      </AntApp>
    </ConfigProvider>
  );
}
