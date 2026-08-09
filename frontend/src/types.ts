export type TaskStatus =
  | "idle"
  | "queued"
  | "running"
  | "stopping"
  | "success"
  | "failed"
  | "cancelled";

export interface TaskState {
  id: string;
  status: TaskStatus;
  source: string;
  mode: string;
  action: string;
  message: string;
  startedAt: string | null;
  finishedAt: string | null;
  result?: Record<string, unknown>;
}

export interface CaptureState {
  status: string;
  message: string;
  host: string;
  port: number;
  startedAt: string | null;
  expiresAt: string | null;
  certReady: boolean;
  events: string[];
  diagnosis: string;
}

export interface ScheduleTask {
  time: string;
  mode: "in" | "out" | "photo_in" | "photo_out";
  image?: string;
  randomImage?: boolean;
  nextAt?: string | null;
}

export interface ScheduleState {
  enabled: boolean;
  randomMinutes: number;
  taskCount: number;
  tasks: ScheduleTask[];
  timezone: string;
  notificationsEnabled: boolean;
  gotifyUrl: string;
  gotifyConfigured: boolean;
  imageRotation: {
    used: number;
    total: number;
    remaining: number;
  };
}

export interface SystemStatus {
  time: string;
  pid: number;
  session: {
    valid: boolean;
    renewalAvailable: boolean;
    suffix: string;
    cachedAt: string | null;
    autoRenew: {
      enabled: boolean;
      credentialAvailable: boolean;
      intervalMinutes: number;
      status:
        | "starting"
        | "active"
        | "renewing"
        | "retrying"
        | "reauth_required"
        | "not_initialized";
      lastAttemptAt: string | null;
      lastSuccessAt: string | null;
      nextAttemptAt: string | null;
      lastError: string;
    };
  };
  task: TaskState;
  scheduler: ScheduleState;
  capture: CaptureState;
}

export interface ImageItem {
  name: string;
  url: string;
  size: number;
  updatedAt: string;
}

export interface LogEntry {
  id: number;
  time: string;
  level: "debug" | "info" | "warning" | "error" | string;
  message: string;
}

export interface AppConfig {
  location: { longitude: string; latitude: string };
  locationJitterMeters: string | number;
  mapProvider: "amap" | "tencent";
  mapApiKeys: { amap: string; tencent: string };
  device: {
    brand: string;
    model: string;
    system: string;
    platform: "android" | "ios";
  };
  userAgent: string;
  model: { baseUrl: string; apiKey: string; model: string };
  secrets: {
    amapKey: boolean;
    tencentKey: boolean;
    modelApiKey: boolean;
    gotifyToken: boolean;
    jielongToken: boolean;
    initialPassword: boolean;
  };
}

export interface JielongField {
  Id: number | string;
  FieldType?: number;
  Name?: string;
  IsRequired?: boolean;
  IsTextarea?: boolean;
  InitialValue?: string;
  InitialFiles?: Array<Record<string, unknown>>;
  ControlOptions?: unknown;
  VisibilityCondition?: Array<{
    OptionValue?: string | number;
    RelationIdList?: string[];
  }>;
  RelationId?: string;
  Tip?: string;
  [key: string]: unknown;
}

export interface JielongBundle {
  thread: Record<string, unknown>;
  check_in: Record<string, unknown>;
  edit_detail: Record<string, unknown>;
  fields: JielongField[];
}

export type JielongAnswer = {
  value?: string;
  area?: string;
  place?: string;
  longitude?: string;
  latitude?: string;
  option_text?: string;
  option_value?: string;
  other_value?: string;
  files?: Array<string | Record<string, unknown>>;
};
