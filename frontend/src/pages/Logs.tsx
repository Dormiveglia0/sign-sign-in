import { useCallback, useEffect, useMemo, useState } from "react";
import { App, Button, Card, Empty, Segmented, Space, Switch } from "antd";
import {
  Clipboard,
  Eraser,
  Pause,
  Play,
  RefreshCw,
  TerminalSquare,
} from "lucide-react";
import { api, formatDateTime } from "../api";
import { PageHeader, SectionHeading, StateTag } from "../components";
import type { LogEntry } from "../types";

export default function Logs() {
  const { message, modal } = App.useApp();
  const [items, setItems] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState("all");
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result = await api<{ items: LogEntry[] }>("/api/logs?limit=500");
      setItems(result.items);
    } catch (error) {
      message.error(error instanceof Error ? error.message : "日志加载失败");
    } finally {
      setLoading(false);
    }
  }, [message]);

  useEffect(() => {
    void load();
    if (paused) return;
    const timer = window.setInterval(load, 2000);
    return () => window.clearInterval(timer);
  }, [load, paused]);

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "warning") {
      return items.filter((item) => ["warning", "warn"].includes(item.level));
    }
    return items.filter((item) => item.level === filter);
  }, [filter, items]);

  async function copy() {
    const text = filtered
      .map(
        (item) =>
          `${item.time} [${item.level.toUpperCase()}] ${item.message}`,
      )
      .join("\n");
    await navigator.clipboard.writeText(text);
    message.success("当前筛选日志已复制");
  }

  function clear() {
    modal.confirm({
      title: "清空当前内存日志？",
      content: "只会清除 Web 服务本次运行的日志视图，不会删除任务历史。",
      okText: "清空",
      okButtonProps: { danger: true },
      cancelText: "取消",
      onOk: async () => {
        try {
          await api("/api/logs", { method: "DELETE" });
          setItems([]);
          message.success("日志已清空");
        } catch (error) {
          message.error(error instanceof Error ? error.message : "清空失败");
        }
      },
    });
  }

  const counts = {
    all: items.length,
    info: items.filter((item) => item.level === "info").length,
    warning: items.filter((item) =>
      ["warning", "warn"].includes(item.level),
    ).length,
    error: items.filter((item) => item.level === "error").length,
  };

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="OBSERVABILITY / LOGS"
        title="运行日志"
        description="查看后端任务、网络调用与调度事件；敏感凭据不会进入此视图。"
        actions={
          <Space>
            <Button icon={<Clipboard size={16} />} onClick={copy}>
              复制
            </Button>
            <Button danger icon={<Eraser size={16} />} onClick={clear}>
              清空
            </Button>
          </Space>
        }
      />

      <Card className="logs-card">
        <SectionHeading
          title="服务端事件流"
          description={`当前保留 ${items.length} 条，最多 800 条`}
          extra={
            <Space>
              <StateTag state={paused ? "warning" : "success"}>
                {paused ? "已暂停刷新" : "实时刷新"}
              </StateTag>
              <Switch
                checked={!paused}
                checkedChildren={<Play size={12} />}
                unCheckedChildren={<Pause size={12} />}
                onChange={(checked) => setPaused(!checked)}
                aria-label="切换实时刷新"
              />
            </Space>
          }
        />
        <div className="log-toolbar">
          <Segmented
            value={filter}
            onChange={(value) => setFilter(String(value))}
            options={[
              { value: "all", label: `全部 ${counts.all}` },
              { value: "info", label: `信息 ${counts.info}` },
              { value: "warning", label: `警告 ${counts.warning}` },
              { value: "error", label: `错误 ${counts.error}` },
            ]}
          />
          <Button
            type="text"
            icon={<RefreshCw size={15} />}
            loading={loading}
            onClick={load}
          >
            立即刷新
          </Button>
        </div>
        <div className="terminal-log" role="log" aria-live="polite">
          {filtered.length ? (
            filtered.map((entry) => (
              <div className="terminal-line" key={entry.id}>
                <time>{formatDateTime(entry.time)}</time>
                <span className={`terminal-level ${entry.level}`}>
                  {entry.level.toUpperCase()}
                </span>
                <p>{entry.message}</p>
              </div>
            ))
          ) : (
            <Empty
              image={<TerminalSquare size={40} strokeWidth={1.4} />}
              description="当前筛选下没有日志"
            />
          )}
        </div>
      </Card>
    </div>
  );
}
