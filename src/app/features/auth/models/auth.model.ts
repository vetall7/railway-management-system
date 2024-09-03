export interface AuthPayload {
  email: string;
  password: string;
}

export interface AuthRes {
  token?: string;
}

interface ErrorBody {
  message: string;
  reason: string;
}

interface Headers {
  normalizedNames: unknown;
  lazyUpdate?: null;
}

export interface ApiError {
  headers: Headers;
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: ErrorBody;
}
