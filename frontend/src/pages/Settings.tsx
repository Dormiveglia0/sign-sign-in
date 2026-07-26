import { useEffect, useState } from "react";
import {
  Alert,
  App,
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Tabs,
  Tag,
} from "antd";
import {
  Bot,
  KeyRound,
  MapPinned,
  RefreshCw,
  Save,
  ShieldCheck,
  Smartphone,
  Trash2,
} from "lucide-react";
import { api } from "../api";
import { PageHeader, SectionHeading } from "../components";
import type { AppConfig } from "../types";

type ConfigForm = Omit<AppConfig, "secrets">;

export default function SettingsPage() {
  const { message } = App.useApp();
  const [form] = Form.useForm<ConfigForm>();
  const [passwordForm] = Form.useForm<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>();
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [clearSecrets, setClearSecrets] = useState<string[]>([]);

  async function load() {
    setLoading(true);
    try {
      const result = await api<AppConfig>("/api/config");
      setConfig(result);
      form.setFieldsValue(result);
      setClearSecrets([]);
    } catch (error) {
      message.error(error instanceof Error ? error.message : "配置加载失败");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function toggleClear(secret: string) {
    setClearSecrets((current) =>
      current.includes(secret)
        ? current.filter((item) => item !== secret)
        : [...current, secret],
    );
  }

  async function save() {
    setSaving(true);
    try {
      const values = await form.validateFields();
      const result = await api<AppConfig>("/api/config", {
        method: "PUT",
        json: { ...values, clearSecrets },
      });
      setConfig(result);
      form.setFieldsValue(result);
      setClearSecrets([]);
      message.success("配置已保存并应用");
    } catch (error) {
      if (error instanceof Error) message.error(error.message);
    } finally {
      setSaving(false);
    }
  }

  async function generateUserAgent() {
    try {
      const device = await form.validateFields([
        ["device", "brand"],
        ["device", "model"],
        ["device", "system"],
        ["device", "platform"],
      ]);
      const result = await api<{ userAgent: string }>("/api/config/user-agent", {
        method: "POST",
        json: device.device,
      });
      form.setFieldValue("userAgent", result.userAgent);
      message.success("User-Agent 已按设备信息生成");
    } catch (error) {
      if (error instanceof Error) message.error(error.message);
    }
  }

  async function changePassword() {
    const values = await passwordForm.validateFields();
    setSaving(true);
    try {
      await api("/api/auth/password", {
        method: "POST",
        json: {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
      });
      message.success("密码已修改，本次登录即将失效");
      setPasswordOpen(false);
      window.setTimeout(
        () => window.dispatchEvent(new CustomEvent("auth-expired")),
        600,
      );
    } catch (error) {
      message.error(error instanceof Error ? error.message : "修改失败");
    } finally {
      setSaving(false);
    }
  }

  const secretButton = (key: string, configured: boolean) =>
    configured ? (
      <Button
        size="small"
        type="text"
        danger={clearSecrets.includes(key)}
        icon={<Trash2 size={13} />}
        onClick={() => toggleClear(key)}
      >
        {clearSecrets.includes(key) ? "保存时清除（撤销）" : "清除已保存值"}
      </Button>
    ) : null;

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="SYSTEM / CONFIGURATION"
        title="系统配置"
        description="管理位置、设备指纹、地图与生成模型；敏感值只写入服务器。"
        actions={
          <Space>
            <Button icon={<RefreshCw size={16} />} onClick={() => void load()}>
              放弃修改
            </Button>
            <Button
              type="primary"
              icon={<Save size={16} />}
              loading={saving}
              onClick={save}
            >
              保存配置
            </Button>
          </Space>
        }
      />

      {config?.secrets.initialPassword && (
        <Alert
          className="page-alert"
          type="warning"
          showIcon
          message="当前仍在使用首次生成的管理员密码"
          description="完成测试后请在本页“访问安全”中修改密码；修改成功后服务器会删除初始密码文件并使旧会话失效。"
        />
      )}

      <Form
        form={form}
        layout="vertical"
        requiredMark="optional"
        disabled={loading}
        className="settings-form"
      >
        <Tabs
          className="settings-tabs"
          items={[
            {
              key: "location",
              label: (
                <span className="tab-label">
                  <MapPinned size={16} /> 位置与地图
                </span>
              ),
              children: (
                <Card>
                  <SectionHeading
                    title="签到位置"
                    description="经纬度用于逆地理解析；抖动会在每次任务开始时单独计算。"
                  />
                  <div className="form-grid">
                    <Form.Item
                      label="经度"
                      name={["location", "longitude"]}
                      rules={[{ required: true, message: "请输入经度" }]}
                    >
                      <Input placeholder="116.397128" />
                    </Form.Item>
                    <Form.Item
                      label="纬度"
                      name={["location", "latitude"]}
                      rules={[{ required: true, message: "请输入纬度" }]}
                    >
                      <Input placeholder="39.916527" />
                    </Form.Item>
                    <Form.Item
                      label="位置抖动半径"
                      name="locationJitterMeters"
                      rules={[{ required: true }]}
                    >
                      <InputNumber min={0} max={500} addonAfter="米" />
                    </Form.Item>
                    <Form.Item
                      label="地图服务"
                      name="mapProvider"
                      rules={[{ required: true }]}
                    >
                      <Select
                        options={[
                          { value: "amap", label: "高德地图" },
                          { value: "tencent", label: "腾讯地图" },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      className="secret-form-item"
                      label={
                        <span>
                          高德 Web Key{" "}
                          {config?.secrets.amapKey && <Tag color="green">已配置</Tag>}
                        </span>
                      }
                      name={["mapApiKeys", "amap"]}
                    >
                      <Input.Password
                        placeholder={
                          config?.secrets.amapKey ? "留空表示不修改" : "可选"
                        }
                        autoComplete="off"
                      />
                    </Form.Item>
                    <Form.Item
                      className="secret-form-item"
                      label={
                        <span>
                          腾讯地图 Key{" "}
                          {config?.secrets.tencentKey && (
                            <Tag color="green">已配置</Tag>
                          )}
                        </span>
                      }
                      name={["mapApiKeys", "tencent"]}
                    >
                      <Input.Password
                        placeholder={
                          config?.secrets.tencentKey ? "留空表示不修改" : "可选"
                        }
                        autoComplete="off"
                      />
                    </Form.Item>
                  </div>
                  <div className="secret-footer">
                    {secretButton("amapKey", Boolean(config?.secrets.amapKey))}
                    {secretButton(
                      "tencentKey",
                      Boolean(config?.secrets.tencentKey),
                    )}
                  </div>
                </Card>
              ),
            },
            {
              key: "device",
              label: (
                <span className="tab-label">
                  <Smartphone size={16} /> 设备指纹
                </span>
              ),
              children: (
                <Card>
                  <SectionHeading
                    title="模拟设备"
                    description="设备字段必须与 User-Agent 保持一致，保存时后端会再次校验。"
                    extra={
                      <Button
                        icon={<RefreshCw size={15} />}
                        onClick={generateUserAgent}
                      >
                        按设备生成 UA
                      </Button>
                    }
                  />
                  <div className="form-grid">
                    <Form.Item
                      label="品牌"
                      name={["device", "brand"]}
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="型号"
                      name={["device", "model"]}
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="系统"
                      name={["device", "system"]}
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Android 15" />
                    </Form.Item>
                    <Form.Item
                      label="小程序平台"
                      name={["device", "platform"]}
                      rules={[{ required: true }]}
                    >
                      <Select
                        options={[
                          { value: "android", label: "Android" },
                          { value: "ios", label: "iOS" },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item
                      className="span-2"
                      label="User-Agent"
                      name="userAgent"
                      rules={[
                        { required: true, message: "User-Agent 不能为空" },
                        { min: 20 },
                      ]}
                    >
                      <Input.TextArea autoSize={{ minRows: 5, maxRows: 9 }} />
                    </Form.Item>
                  </div>
                </Card>
              ),
            },
            {
              key: "model",
              label: (
                <span className="tab-label">
                  <Bot size={16} /> 周记模型
                </span>
              ),
              children: (
                <Card>
                  <SectionHeading
                    title="OpenAI 兼容模型"
                    description="三项完整配置后，周记优先走你的模型；留空则使用校友邦现有生成接口。"
                  />
                  <div className="form-grid">
                    <Form.Item
                      className="span-2"
                      label="Base URL"
                      name={["model", "baseUrl"]}
                    >
                      <Input placeholder="https://api.example.com/v1" />
                    </Form.Item>
                    <Form.Item label="模型名称" name={["model", "model"]}>
                      <Input placeholder="模型 ID" />
                    </Form.Item>
                    <Form.Item
                      label={
                        <span>
                          API Key{" "}
                          {config?.secrets.modelApiKey && (
                            <Tag color="green">已配置</Tag>
                          )}
                        </span>
                      }
                      name={["model", "apiKey"]}
                    >
                      <Input.Password
                        placeholder={
                          config?.secrets.modelApiKey ? "留空表示不修改" : "可选"
                        }
                        autoComplete="off"
                      />
                    </Form.Item>
                  </div>
                  <div className="secret-footer">
                    {secretButton(
                      "modelApiKey",
                      Boolean(config?.secrets.modelApiKey),
                    )}
                  </div>
                </Card>
              ),
            },
            {
              key: "security",
              label: (
                <span className="tab-label">
                  <ShieldCheck size={16} /> 访问安全
                </span>
              ),
              children: (
                <Card>
                  <SectionHeading
                    title="管理员访问"
                    description="密码使用 scrypt 哈希保存；修改后所有旧登录会话立即失效。"
                    extra={<KeyRound size={19} />}
                  />
                  <div className="security-panel">
                    <div>
                      <span>当前管理员</span>
                      <strong>admin</strong>
                    </div>
                    <div>
                      <span>会话有效期</span>
                      <strong>12 小时</strong>
                    </div>
                    <div>
                      <span>Cookie 策略</span>
                      <strong>HttpOnly · SameSite Strict</strong>
                    </div>
                    <Button type="primary" onClick={() => setPasswordOpen(true)}>
                      修改管理员密码
                    </Button>
                  </div>
                </Card>
              ),
            },
          ]}
        />
      </Form>

      <Modal
        open={passwordOpen}
        title={
          <div className="modal-title">
            <KeyRound size={19} />
            修改管理员密码
          </div>
        }
        okText="修改并退出"
        cancelText="取消"
        confirmLoading={saving}
        onOk={() => void changePassword()}
        onCancel={() => setPasswordOpen(false)}
        destroyOnClose
      >
        <Form
          form={passwordForm}
          layout="vertical"
          requiredMark={false}
          preserve={false}
        >
          <Form.Item
            label="当前密码"
            name="currentPassword"
            rules={[{ required: true }]}
          >
            <Input.Password autoComplete="current-password" />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="newPassword"
            rules={[
              { required: true },
              { min: 12, message: "至少 12 个字符" },
            ]}
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>
          <Form.Item
            label="确认新密码"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return !value || getFieldValue("newPassword") === value
                    ? Promise.resolve()
                    : Promise.reject(new Error("两次输入的密码不一致"));
                },
              }),
            ]}
          >
            <Input.Password autoComplete="new-password" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
