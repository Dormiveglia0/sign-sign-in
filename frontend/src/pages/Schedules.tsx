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
  Switch,
  Table,
  TimePicker,
} from "antd";
import dayjs, { type Dayjs } from "dayjs";
import {
  BellRing,
  CalendarPlus,
  Clock3,
  Pencil,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { api, formatDateTime } from "../api";
import { PageHeader, SectionHeading, StateTag } from "../components";
import type { ImageItem, ScheduleState, ScheduleTask } from "../types";

type TaskDraft = {
  time: Dayjs;
  mode: ScheduleTask["mode"];
  image?: string;
  randomImage?: boolean;
};

const modeLabels: Record<ScheduleTask["mode"], string> = {
  in: "普通签到",
  out: "普通签退",
  photo_in: "拍照签到",
  photo_out: "拍照签退",
};

export default function Schedules() {
  const { message, modal } = App.useApp();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [state, setState] = useState<ScheduleState | null>(null);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [taskModal, setTaskModal] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [taskForm] = Form.useForm<TaskDraft>();
  const [gotifyToken, setGotifyToken] = useState("");
  const [clearToken, setClearToken] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const [schedule, imageResult] = await Promise.all([
        api<ScheduleState>("/api/schedules"),
        api<{ items: ImageItem[] }>("/api/images"),
      ]);
      setState(schedule);
      setImages(imageResult.items);
    } catch (error) {
      message.error(error instanceof Error ? error.message : "加载失败");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function openTask(task?: ScheduleTask, index?: number) {
    const [hour, minute] = (task?.time || "08:55").split(":").map(Number);
    setEditing(index ?? null);
    taskForm.setFieldsValue({
      time: dayjs().hour(hour).minute(minute).second(0),
      mode: task?.mode || "in",
      image: task?.image || "",
      randomImage: task?.randomImage ?? true,
    });
    setTaskModal(true);
  }

  async function saveTask() {
    const values = await taskForm.validateFields();
    const photoTask = values.mode.startsWith("photo_");
    const task: ScheduleTask = {
      time: values.time.format("HH:mm"),
      mode: values.mode,
      image: photoTask && !values.randomImage ? values.image || "" : "",
      randomImage: photoTask && Boolean(values.randomImage),
    };
    if (
      task.mode.startsWith("photo_") &&
      !task.randomImage &&
      !task.image
    ) {
      message.warning("拍照任务必须选择图片");
      return;
    }
    setState((current) => {
      if (!current) return current;
      const tasks = [...current.tasks];
      if (editing === null) tasks.push(task);
      else tasks[editing] = task;
      return { ...current, tasks, taskCount: tasks.length };
    });
    setTaskModal(false);
  }

  function removeTask(index: number) {
    modal.confirm({
      title: "删除这条定时任务？",
      content: "保存配置后，该时间点将不再触发。",
      okText: "删除",
      okButtonProps: { danger: true },
      cancelText: "取消",
      onOk: () =>
        setState((current) => {
          if (!current) return current;
          const tasks = current.tasks.filter((_, itemIndex) => itemIndex !== index);
          return { ...current, tasks, taskCount: tasks.length };
        }),
    });
  }

  async function save() {
    if (!state) return;
    setSaving(true);
    try {
      const next = await api<ScheduleState>("/api/schedules", {
        method: "PUT",
        json: {
          enabled: state.enabled,
          randomMinutes: state.randomMinutes,
          timezone: state.timezone,
          tasks: state.tasks.map(({ time, mode, image, randomImage }) => ({
            time,
            mode,
            image: image || "",
            randomImage: Boolean(randomImage),
          })),
          notificationsEnabled: state.notificationsEnabled,
          gotifyUrl: state.gotifyUrl,
          gotifyToken,
          clearGotifyToken: clearToken,
        },
      });
      setState(next);
      setGotifyToken("");
      setClearToken(false);
      message.success("定时任务已保存并立即生效");
    } catch (error) {
      message.error(error instanceof Error ? error.message : "保存失败");
    } finally {
      setSaving(false);
    }
  }

  async function testNotification() {
    try {
      await api("/api/schedules/test-notification", {
        method: "POST",
        json: {
          url: state?.gotifyUrl || "",
          token: gotifyToken,
        },
      });
      message.success("测试通知已发送");
    } catch (error) {
      message.error(error instanceof Error ? error.message : "发送失败");
    }
  }

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="AUTOMATION / SCHEDULER"
        title="定时任务"
        description="按服务器指定时区常驻调度；浏览器关闭后仍会照常执行。"
        actions={
          <Button
            type="primary"
            icon={<Save size={16} />}
            loading={saving}
            onClick={save}
            disabled={!state}
          >
            保存并应用
          </Button>
        }
      />

      <Alert
        className="page-alert"
        type="info"
        showIcon
        message="调度由 Linux 后端执行"
        description="服务器系统时间可以是 UTC；这里的时区单独决定触发时间。校友邦凭证由服务端低频维护，失效时会自动恢复并重试任务。"
      />

      <div className="schedule-layout">
        <Card loading={loading} className="schedule-main">
          <SectionHeading
            title="执行计划"
            description={state ? `当前共 ${state.tasks.length} 项` : "正在读取"}
            extra={
              <Button
                icon={<Plus size={16} />}
                onClick={() => openTask()}
                disabled={!state}
              >
                添加任务
              </Button>
            }
          />
          <Table
            rowKey={(_, index) => String(index)}
            dataSource={state?.tasks || []}
            pagination={false}
            locale={{ emptyText: "还没有定时任务" }}
            columns={[
              {
                title: "时间",
                dataIndex: "time",
                width: 120,
                render: (value) => (
                  <div className="schedule-time">
                    <Clock3 size={17} />
                    <strong>{value}</strong>
                  </div>
                ),
              },
              {
                title: "操作",
                dataIndex: "mode",
                render: (value: ScheduleTask["mode"], record) => (
                  <div className="table-primary">
                    <strong>{modeLabels[value]}</strong>
                    <span>
                      {record.randomImage
                        ? "图片库不重复随机（全部用完后重置）"
                        : record.image || "无需图片"}
                    </span>
                  </div>
                ),
              },
              {
                title: "下次执行",
                dataIndex: "nextAt",
                responsive: ["md"],
                render: (value) =>
                  value ? formatDateTime(value) : <span className="muted">保存后计算</span>,
              },
              {
                title: "",
                width: 96,
                align: "right",
                render: (_, record, index) => (
                  <Space size={2}>
                    <Button
                      type="text"
                      icon={<Pencil size={15} />}
                      aria-label="编辑任务"
                      onClick={() => openTask(record, index)}
                    />
                    <Button
                      type="text"
                      danger
                      icon={<Trash2 size={15} />}
                      aria-label="删除任务"
                      onClick={() => removeTask(index)}
                    />
                  </Space>
                ),
              },
            ]}
          />
        </Card>

        <div className="schedule-side">
          <Card loading={loading}>
            <SectionHeading
              title="调度开关"
              description="保存后立即重载计划。"
              extra={
                state?.enabled ? (
                  <StateTag state="success">运行中</StateTag>
                ) : (
                  <StateTag state="neutral">已关闭</StateTag>
                )
              }
            />
            <div className="setting-row">
              <div>
                <strong>启用定时执行</strong>
                <span>使用下面的全部计划</span>
              </div>
              <Switch
                checked={state?.enabled}
                onChange={(enabled) =>
                  setState((current) => (current ? { ...current, enabled } : current))
                }
              />
            </div>
            <div className="stacked-field">
              <label>业务时区</label>
              <Select
                value={state?.timezone}
                onChange={(timezone) =>
                  setState((current) => (current ? { ...current, timezone } : current))
                }
                options={[
                  { value: "Asia/Shanghai", label: "中国标准时间（上海）" },
                  { value: "Asia/Hong_Kong", label: "香港时间" },
                  { value: "Asia/Tokyo", label: "日本标准时间" },
                  { value: "UTC", label: "UTC" },
                ]}
              />
            </div>
            <div className="stacked-field">
              <label>随机浮动（分钟）</label>
              <InputNumber
                min={0}
                max={120}
                value={state?.randomMinutes}
                addonAfter="± 分钟"
                onChange={(value) =>
                  setState((current) =>
                    current ? { ...current, randomMinutes: Number(value || 0) } : current,
                  )
                }
              />
              <small>每项任务每天只计算一次随机时间。</small>
            </div>
            <div className="security-note">
              <ShieldCheck size={16} />
              随机图片本轮已使用 {state?.imageRotation?.used || 0} /{" "}
              {state?.imageRotation?.total || 0}，剩余{" "}
              {state?.imageRotation?.remaining || 0} 张；全部使用后自动开始新一轮。
            </div>
          </Card>

          <Card loading={loading}>
            <SectionHeading
              title="结果通知"
              description="通过自建 Gotify 服务推送任务结果。"
              extra={<BellRing size={18} />}
            />
            <div className="setting-row">
              <div>
                <strong>发送任务结果</strong>
                <span>成功与失败都会推送</span>
              </div>
              <Switch
                checked={state?.notificationsEnabled}
                onChange={(notificationsEnabled) =>
                  setState((current) =>
                    current ? { ...current, notificationsEnabled } : current,
                  )
                }
              />
            </div>
            <div className="stacked-field">
              <label>Gotify 服务器地址</label>
              <Input
                value={state?.gotifyUrl || ""}
                onChange={(event) =>
                  setState((current) =>
                    current
                      ? { ...current, gotifyUrl: event.target.value }
                      : current,
                  )
                }
                placeholder="例如 https://push.example.com"
                autoComplete="url"
              />
              <small>填写 Gotify 根地址；系统会自动调用 /message 接口。</small>
            </div>
            <div className="stacked-field">
              <label>Gotify 应用 Token</label>
              <Input.Password
                value={gotifyToken}
                onChange={(event) => {
                  setGotifyToken(event.target.value);
                  setClearToken(false);
                }}
                placeholder={
                  state?.gotifyConfigured ? "已保存；留空表示不修改" : "填写应用 Token"
                }
                autoComplete="off"
              />
              <div className="secret-actions">
                {state?.gotifyConfigured && (
                  <Button
                    size="small"
                    danger={clearToken}
                    onClick={() => {
                      setClearToken((value) => !value);
                      setGotifyToken("");
                    }}
                  >
                    {clearToken ? "将清除（撤销）" : "清除已保存 Token"}
                  </Button>
                )}
                <Button size="small" onClick={testNotification}>
                  发送测试
                </Button>
              </div>
            </div>
            <div className="security-note">
              <ShieldCheck size={16} />
              Token 只保存在服务器配置中，读取页面时不会回传。
            </div>
          </Card>
        </div>
      </div>

      <Modal
        open={taskModal}
        title={
          <div className="modal-title">
            <CalendarPlus size={19} />
            {editing === null ? "添加定时任务" : "编辑定时任务"}
          </div>
        }
        okText="保存到列表"
        cancelText="取消"
        onOk={() => void saveTask()}
        onCancel={() => setTaskModal(false)}
        destroyOnClose
      >
        <Form form={taskForm} layout="vertical" requiredMark={false}>
          <Form.Item
            name="time"
            label="执行时间"
            rules={[{ required: true, message: "请选择时间" }]}
          >
            <TimePicker format="HH:mm" minuteStep={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="mode"
            label="执行操作"
            rules={[{ required: true }]}
          >
            <Select
              options={Object.entries(modeLabels).map(([value, label]) => ({
                value,
                label,
              }))}
            />
          </Form.Item>
          <Form.Item noStyle shouldUpdate>
            {({ getFieldValue }) => {
              if (!String(getFieldValue("mode") || "").startsWith("photo_")) {
                return null;
              }
              const usesRandomImage = Boolean(getFieldValue("randomImage"));
              return (
                <>
                  <Form.Item
                    name="randomImage"
                    label="图片策略"
                    valuePropName="checked"
                  >
                    <Switch
                      checkedChildren="不重复随机"
                      unCheckedChildren="固定图片"
                    />
                  </Form.Item>
                  {usesRandomImage ? (
                    <Alert
                      type="info"
                      showIcon
                      message="每次从图片库抽取一张未使用图片，全部用完后自动重置。"
                    />
                  ) : (
                    <Form.Item
                      name="image"
                      label="签到图片"
                      rules={[{ required: true, message: "请选择图片" }]}
                    >
                      <Select
                        placeholder="选择服务器图片"
                        options={images.map((item) => ({
                          value: item.name,
                          label: item.name,
                        }))}
                      />
                    </Form.Item>
                  )}
                </>
              );
            }}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
