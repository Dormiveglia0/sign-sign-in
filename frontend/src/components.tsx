import type { ReactNode } from "react";
import { Button, Result, Tag } from "antd";
import { ArrowLeft, RefreshCw } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </header>
  );
}

export function StateTag({
  state,
  children,
}: {
  state: "success" | "warning" | "danger" | "neutral" | "working";
  children: ReactNode;
}) {
  const colors = {
    success: "green",
    warning: "gold",
    danger: "red",
    neutral: "default",
    working: "cyan",
  } as const;
  return (
    <Tag className="state-tag" color={colors[state]}>
      <span className={`state-dot state-dot-${state}`} />
      {children}
    </Tag>
  );
}

export function LoadFailure({
  title = "加载失败",
  message,
  onRetry,
}: {
  title?: string;
  message: string;
  onRetry?: () => void;
}) {
  return (
    <Result
      status="warning"
      title={title}
      subTitle={message}
      extra={
        onRetry ? (
          <Button icon={<RefreshCw size={15} />} onClick={onRetry}>
            重新加载
          </Button>
        ) : undefined
      }
    />
  );
}

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <Button type="text" icon={<ArrowLeft size={17} />} onClick={onClick}>
      返回
    </Button>
  );
}

export function SectionHeading({
  title,
  description,
  extra,
}: {
  title: string;
  description?: string;
  extra?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {extra}
    </div>
  );
}
