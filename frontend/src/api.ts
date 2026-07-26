export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function cookie(name: string) {
  return document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`))
    ?.split("=")
    .slice(1)
    .join("=");
}

export async function api<T>(
  path: string,
  init: RequestInit & { json?: unknown } = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  const method = (init.method || "GET").toUpperCase();
  if (init.json !== undefined) {
    headers.set("Content-Type", "application/json");
  }
  if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
    headers.set("X-CSRF-Token", decodeURIComponent(cookie("ssi_csrf") || ""));
  }
  const response = await fetch(path, {
    ...init,
    body: init.json === undefined ? init.body : JSON.stringify(init.json),
    headers,
    credentials: "same-origin",
  });
  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();
  if (!response.ok) {
    if (response.status === 401) {
      window.dispatchEvent(new CustomEvent("auth-expired"));
    }
    const message =
      typeof body === "object" && body && "detail" in body
        ? String(body.detail)
        : String(body || `请求失败 (${response.status})`);
    throw new ApiError(response.status, message);
  }
  return body as T;
}

export async function uploadImage(file: File) {
  const form = new FormData();
  form.append("file", file);
  return api<{ name: string; url: string }>("/api/images", {
    method: "POST",
    body: form,
  });
}

export function formatDateTime(value?: string | null, fallback = "—") {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
