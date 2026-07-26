import { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  App,
  Button,
  Card,
  Empty,
  Input,
  Modal,
  Select,
  Skeleton,
  Space,
  Tag,
} from "antd";
import {
  FileImage,
  Link2,
  LoaderCircle,
  MapPin,
  QrCode,
  RefreshCw,
  Send,
  ShieldCheck,
  Waypoints,
} from "lucide-react";
import { api } from "../api";
import { PageHeader, SectionHeading, StateTag } from "../components";
import type {
  ImageItem,
  JielongAnswer,
  JielongBundle,
  JielongField,
} from "../types";

type Settings = {
  threadId: string;
  shareUrl: string;
  tokenConfigured: boolean;
};

type Option = { Text: string; Value: string; IsOtherOption: boolean };

function fieldId(field: JielongField) {
  return String(Number(field.Id || 0));
}

function parseOptions(field: JielongField): Option[] {
  let raw = field.ControlOptions;
  if (!raw) return [];
  if (typeof raw === "string") {
    const rawText = raw;
    try {
      raw = JSON.parse(rawText);
    } catch {
      return rawText.trim()
        ? [
            {
              Text: rawText.trim(),
              Value: rawText.trim(),
              IsOtherOption: false,
            },
          ]
        : [];
    }
  }
  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    raw = (raw as Record<string, unknown>).Options || [];
  }
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    if (typeof item === "string") {
      return item.trim()
        ? [{ Text: item.trim(), Value: item.trim(), IsOtherOption: false }]
        : [];
    }
    if (!item || typeof item !== "object") return [];
    const body = item as Record<string, unknown>;
    const text = String(
      body.Text || body.Name || body.Label || body.Value || "",
    ).trim();
    return text
      ? [
          {
            Text: text,
            Value: String(body.Value || text),
            IsOtherOption: Boolean(body.IsOtherOption),
          },
        ]
      : [];
  });
}

function fieldKind(field: JielongField) {
  if (Number(field.FieldType || 0) === 16) return "location";
  if (Number(field.FieldType || 0) === 25) return "media";
  if (field.IsTextarea) return "textarea";
  if (parseOptions(field).length) return "select";
  return "text";
}

function splitLocation(value: string) {
  const separator = value.includes("•") ? "•" : value.includes("·") ? "·" : "";
  if (!separator) return [value, ""];
  return value.split(separator, 2).map((item) => item.trim());
}

function initialAnswers(fields: JielongField[]) {
  const result: Record<string, JielongAnswer> = {};
  for (const field of fields) {
    const id = fieldId(field);
    const kind = fieldKind(field);
    if (kind === "media") {
      result[id] = { files: field.InitialFiles || [] };
    } else if (kind === "location") {
      const value = String(field.InitialValue || "");
      const [area, place] = splitLocation(value);
      result[id] = { value, area, place, longitude: "", latitude: "" };
    } else {
      result[id] = { value: String(field.InitialValue || "") };
    }
  }
  return result;
}

export default function Jielong() {
  const { message, modal } = App.useApp();
  const [settings, setSettings] = useState<Settings>({
    threadId: "",
    shareUrl: "",
    tokenConfigured: false,
  });
  const [token, setToken] = useState("");
  const [images, setImages] = useState<ImageItem[]>([]);
  const [bundle, setBundle] = useState<JielongBundle | null>(null);
  const [answers, setAnswers] = useState<Record<string, JielongAnswer>>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [qrImage, setQrImage] = useState("");
  const [qrUuid, setQrUuid] = useState("");
  const [qrStatus, setQrStatus] = useState("");
  const pollRef = useRef<number>();
  const draftRef = useRef<number>();

  async function loadSettings() {
    try {
      const [next, imageResult] = await Promise.all([
        api<Settings>("/api/jielong/settings"),
        api<{ items: ImageItem[] }>("/api/images"),
      ]);
      setSettings(next);
      setImages(imageResult.items);
    } catch (error) {
      message.error(error instanceof Error ? error.message : "加载失败");
    }
  }

  useEffect(() => {
    void loadSettings();
    return () => {
      if (pollRef.current) window.clearInterval(pollRef.current);
      if (draftRef.current) window.clearTimeout(draftRef.current);
    };
  }, []);

  function patchAnswer(id: string, patch: JielongAnswer) {
    setAnswers((current) => {
      const next = {
        ...current,
        [id]: { ...(current[id] || {}), ...patch },
      };
      if (patch.area !== undefined || patch.place !== undefined) {
        const answer = next[id];
        answer.value = [answer.area, answer.place].filter(Boolean).join("•");
      }
      scheduleDraft(next);
      return next;
    });
  }

  function scheduleDraft(next: Record<string, JielongAnswer>) {
    if (!bundle) return;
    if (draftRef.current) window.clearTimeout(draftRef.current);
    const threadId = String(bundle.thread.ThreadId || settings.threadId);
    draftRef.current = window.setTimeout(() => {
      void api(`/api/jielong/draft/${encodeURIComponent(threadId)}`, {
        method: "PUT",
        json: { answers: next },
      }).catch(() => undefined);
    }, 450);
  }

  function isVisible(field: JielongField) {
    const relationId = String(field.RelationId || "").trim();
    if (!relationId || !bundle) return true;
    let controlled = false;
    for (const controller of bundle.fields) {
      for (const condition of controller.VisibilityCondition || []) {
        const targets = (condition.RelationIdList || []).map(String);
        if (!targets.includes(relationId)) continue;
        controlled = true;
        if (
          String(answers[fieldId(controller)]?.option_value || "") ===
          String(condition.OptionValue || "")
        ) {
          return true;
        }
      }
    }
    return !controlled;
  }

  const visibleFields = useMemo(
    () => (bundle?.fields || []).filter(isVisible),
    [answers, bundle],
  );

  async function saveSettings() {
    const next = await api<Settings>("/api/jielong/settings", {
      method: "PUT",
      json: {
        authorization: token,
        threadId: settings.threadId,
        shareUrl: settings.shareUrl,
      },
    });
    setSettings(next);
    setToken("");
    return next;
  }

  async function parseShareUrl() {
    if (!settings.shareUrl.trim()) {
      message.warning("请先粘贴接龙分享链接");
      return;
    }
    setLoading(true);
    try {
      const result = await api<{ threadId: string }>("/api/jielong/parse", {
        method: "POST",
        json: { shareUrl: settings.shareUrl },
      });
      setSettings((current) => ({ ...current, threadId: result.threadId }));
      message.success(`已解析 threadId：${result.threadId}`);
    } catch (error) {
      message.error(error instanceof Error ? error.message : "解析失败");
    } finally {
      setLoading(false);
    }
  }

  async function startQr() {
    setLoading(true);
    setQrOpen(true);
    setQrStatus("正在生成二维码");
    try {
      const result = await api<{ uuid: string; image: string }>(
        "/api/jielong/qr",
        { method: "POST" },
      );
      setQrImage(result.image);
      setQrUuid(result.uuid);
      setQrStatus("等待微信扫码");
      if (pollRef.current) window.clearInterval(pollRef.current);
      pollRef.current = window.setInterval(
        () => void pollQr(result.uuid),
        1200,
      );
    } catch (error) {
      setQrStatus("二维码生成失败");
      message.error(error instanceof Error ? error.message : "生成失败");
    } finally {
      setLoading(false);
    }
  }

  async function pollQr(uuid: string) {
    try {
      const result = await api<{
        status: string;
        message: string;
        tokenConfigured: boolean;
      }>("/api/jielong/qr/poll", {
        method: "POST",
        json: { uuid },
      });
      setQrStatus(result.message);
      if (result.status === "confirmed" && result.tokenConfigured) {
        if (pollRef.current) window.clearInterval(pollRef.current);
        setSettings((current) => ({ ...current, tokenConfigured: true }));
        setQrStatus("登录成功");
        message.success("接龙 Token 已安全保存");
        window.setTimeout(() => setQrOpen(false), 700);
      } else if (["expired", "error"].includes(result.status)) {
        if (pollRef.current) window.clearInterval(pollRef.current);
      }
    } catch (error) {
      if (pollRef.current) window.clearInterval(pollRef.current);
      setQrStatus("登录失败");
      message.error(error instanceof Error ? error.message : "轮询失败");
    }
  }

  async function loadForm() {
    setLoading(true);
    try {
      await saveSettings();
      const result = await api<JielongBundle>("/api/jielong/form", {
        method: "POST",
        json: { authorization: token, threadId: settings.threadId },
      });
      const threadId = String(result.thread.ThreadId || settings.threadId);
      const draft = await api<Record<string, JielongAnswer>>(
        `/api/jielong/draft/${encodeURIComponent(threadId)}`,
      );
      setBundle(result);
      setAnswers({ ...initialAnswers(result.fields), ...draft });
      message.success("接龙表单已加载");
    } catch (error) {
      message.error(error instanceof Error ? error.message : "加载失败");
    } finally {
      setLoading(false);
    }
  }

  function validate() {
    for (const field of visibleFields) {
      const answer = answers[fieldId(field)] || {};
      if (!field.IsRequired) continue;
      const kind = fieldKind(field);
      if (kind === "location") {
        const longitude = Number(answer.longitude);
        const latitude = Number(answer.latitude);
        if (
          !answer.area ||
          !answer.place ||
          !Number.isFinite(longitude) ||
          !Number.isFinite(latitude) ||
          longitude < -180 ||
          longitude > 180 ||
          latitude < -90 ||
          latitude > 90
        ) {
          throw new Error(`请完整填写 ${field.Name || "位置字段"}`);
        }
      } else if (kind === "media") {
        if (!answer.files?.length) throw new Error(`请选择 ${field.Name || "图片"}`);
      } else if (kind === "select") {
        if (!answer.option_value) throw new Error(`请选择 ${field.Name || "选项"}`);
      } else if (!answer.value?.trim()) {
        throw new Error(`请填写 ${field.Name || "必填字段"}`);
      }
    }
  }

  async function submit() {
    if (!bundle) return;
    try {
      validate();
    } catch (error) {
      message.warning(error instanceof Error ? error.message : "请检查必填项");
      return;
    }
    modal.confirm({
      title: "确认提交当前接龙表单？",
      content: "这会直接写入接龙账号，请最后确认各字段与图片。",
      okText: "确认提交",
      cancelText: "返回检查",
      onOk: async () => {
        setSubmitting(true);
        try {
          const result = await api<Record<string, unknown>>(
            "/api/jielong/submit",
            {
              method: "POST",
              json: {
                threadId: String(bundle.thread.ThreadId || settings.threadId),
                signature:
                  answers["0"]?.value ||
                  String(
                    bundle.edit_detail.LastSignature ||
                      bundle.edit_detail.Signature ||
                      "",
                  ),
                number: String(bundle.edit_detail.Number || ""),
                answers,
              },
            },
          );
          message.success(String(result.Description || "接龙提交成功"));
        } catch (error) {
          message.error(error instanceof Error ? error.message : "提交失败");
        } finally {
          setSubmitting(false);
        }
      },
    });
  }

  const summary = bundle
    ? [
        ["主题", String(bundle.thread.Subject || "—")],
        [
          "状态",
          String(
            (
              bundle.check_in.CheckInStatus as Record<string, unknown> | undefined
            )?.CheckInMsg ||
              bundle.thread.AttendButtonText ||
              "—",
          ),
        ],
        [
          "参与",
          `${String(bundle.check_in.CheckInUserCount || 0)} 人`,
        ],
      ]
    : [];

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="JIELONG / FORM RUNNER"
        title="接龙表单"
        description="扫码登录、解析分享链接、拉取动态字段并在确认后提交。"
        actions={
          <Space>
            <Button
              icon={<QrCode size={16} />}
              loading={loading && qrOpen}
              onClick={startQr}
            >
              微信扫码登录
            </Button>
            <Button
              type="primary"
              icon={<RefreshCw size={16} />}
              loading={loading && !qrOpen}
              onClick={loadForm}
            >
              拉取表单
            </Button>
          </Space>
        }
      />

      <div className="jielong-connect-grid">
        <Card>
          <SectionHeading
            title="连接接龙"
            description="Token 读取时不会从服务器回传。"
            extra={
              settings.tokenConfigured ? (
                <StateTag state="success">Token 已配置</StateTag>
              ) : (
                <StateTag state="warning">等待登录</StateTag>
              )
            }
          />
          <div className="form-grid">
            <div className="stacked-field span-2">
              <label>接龙 Token</label>
              <Input.Password
                value={token}
                onChange={(event) => setToken(event.target.value)}
                placeholder={
                  settings.tokenConfigured
                    ? "已保存在服务器；留空表示继续使用"
                    : "扫码后自动保存，也可手动填写"
                }
                autoComplete="off"
              />
            </div>
            <div className="stacked-field span-2">
              <label>分享链接</label>
              <Input
                value={settings.shareUrl}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    shareUrl: event.target.value,
                  }))
                }
                placeholder="https://jielong.com/s/..."
                suffix={<Link2 size={15} />}
              />
            </div>
            <div className="stacked-field">
              <label>threadId</label>
              <Input
                value={settings.threadId}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    threadId: event.target.value,
                  }))
                }
                placeholder="解析后自动填写"
              />
            </div>
            <div className="stacked-field align-end">
              <Button
                block
                icon={<Waypoints size={16} />}
                loading={loading}
                onClick={parseShareUrl}
              >
                解析分享链接
              </Button>
            </div>
          </div>
          <div className="security-note">
            <ShieldCheck size={16} />
            登录凭据只保存在服务器配置文件，浏览器刷新后不会重新显示明文。
          </div>
        </Card>

        <Card className="jielong-summary-card">
          <SectionHeading title="表单概况" description="来自接龙实时接口。" />
          {summary.length ? (
            <div className="summary-stack">
              {summary.map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="尚未拉取表单"
            />
          )}
        </Card>
      </div>

      <Card className="jielong-form-card">
        <SectionHeading
          title="动态字段"
          description={
            bundle
              ? `已加载 ${visibleFields.length} 个当前可见字段`
              : "拉取后按接龙原始结构渲染"
          }
          extra={<FileImage size={18} />}
        />
        {loading && !bundle ? (
          <Skeleton active paragraph={{ rows: 8 }} />
        ) : bundle ? (
          <div className="dynamic-form-grid">
            {visibleFields.map((field) => {
              const id = fieldId(field);
              const answer = answers[id] || {};
              const kind = fieldKind(field);
              const options = parseOptions(field);
              const selected = options.find(
                (item) => item.Value === answer.option_value,
              );
              return (
                <article
                  key={`${id}-${String(field.Name)}`}
                  className={`dynamic-field ${kind === "textarea" || kind === "location" || kind === "media" ? "wide" : ""}`}
                >
                  <div className="dynamic-field-label">
                    <strong>{field.Name || "未命名字段"}</strong>
                    {field.IsRequired && <Tag color="red">必填</Tag>}
                    <Tag>{kind}</Tag>
                  </div>
                  {field.Tip && <p className="field-tip">{String(field.Tip)}</p>}
                  {kind === "text" && (
                    <Input
                      value={answer.value}
                      onChange={(event) =>
                        patchAnswer(id, { value: event.target.value })
                      }
                    />
                  )}
                  {kind === "textarea" && (
                    <Input.TextArea
                      value={answer.value}
                      autoSize={{ minRows: 3, maxRows: 8 }}
                      onChange={(event) =>
                        patchAnswer(id, { value: event.target.value })
                      }
                    />
                  )}
                  {kind === "select" && (
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Select
                        value={answer.option_value}
                        placeholder="请选择"
                        options={options.map((option) => ({
                          value: option.Value,
                          label: option.Text,
                        }))}
                        onChange={(value) => {
                          const option = options.find(
                            (item) => item.Value === value,
                          );
                          patchAnswer(id, {
                            option_value: value,
                            option_text: option?.Text || "",
                            other_value: "",
                          });
                        }}
                      />
                      {selected?.IsOtherOption && (
                        <Input
                          value={answer.other_value}
                          placeholder="请补充说明"
                          onChange={(event) =>
                            patchAnswer(id, { other_value: event.target.value })
                          }
                        />
                      )}
                    </Space>
                  )}
                  {kind === "location" && (
                    <div className="location-field-grid">
                      <Input
                        value={answer.area}
                        placeholder="市 / 区"
                        prefix={<MapPin size={14} />}
                        onChange={(event) =>
                          patchAnswer(id, { area: event.target.value })
                        }
                      />
                      <Input
                        value={answer.place}
                        placeholder="具体地点"
                        onChange={(event) =>
                          patchAnswer(id, { place: event.target.value })
                        }
                      />
                      <Input
                        value={answer.longitude}
                        placeholder="经度"
                        onChange={(event) =>
                          patchAnswer(id, { longitude: event.target.value })
                        }
                      />
                      <Input
                        value={answer.latitude}
                        placeholder="纬度"
                        onChange={(event) =>
                          patchAnswer(id, { latitude: event.target.value })
                        }
                      />
                    </div>
                  )}
                  {kind === "media" && (
                    <div className="media-field">
                      <Select
                        value={
                          typeof answer.files?.[0] === "string"
                            ? answer.files[0]
                            : undefined
                        }
                        placeholder="选择服务器图片"
                        allowClear
                        options={images.map((item) => ({
                          value: item.name,
                          label: item.name,
                        }))}
                        onChange={(value) =>
                          patchAnswer(id, { files: value ? [value] : [] })
                        }
                      />
                      <span>
                        {answer.files?.length
                          ? `已选择 ${answer.files.length} 个文件`
                          : "未选择图片"}
                      </span>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="完成登录和链接解析后，点击“拉取表单”"
          />
        )}
        {bundle && (
          <div className="jielong-submit-bar">
            <div>
              <strong>提交前检查</strong>
              <span>草稿会自动保存在服务器，提交仍需二次确认。</span>
            </div>
            <Button
              type="primary"
              icon={<Send size={16} />}
              loading={submitting}
              onClick={submit}
            >
              提交接龙
            </Button>
          </div>
        )}
      </Card>

      <Modal
        open={qrOpen}
        title={
          <div className="modal-title">
            <QrCode size={19} />
            接龙扫码登录
          </div>
        }
        footer={
          <Button
            onClick={() => {
              setQrOpen(false);
              if (pollRef.current) window.clearInterval(pollRef.current);
            }}
          >
            关闭
          </Button>
        }
        onCancel={() => {
          setQrOpen(false);
          if (pollRef.current) window.clearInterval(pollRef.current);
        }}
      >
        <div className="qr-login">
          {qrImage ? (
            <img src={qrImage} alt="接龙微信登录二维码" />
          ) : (
            <div className="qr-placeholder">
              <LoaderCircle size={28} />
            </div>
          )}
          <strong>{qrStatus || "准备登录"}</strong>
          <span>请使用微信扫码，并在手机上确认登录。</span>
        </div>
      </Modal>
    </div>
  );
}
