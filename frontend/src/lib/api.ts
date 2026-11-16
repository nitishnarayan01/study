import type {
  Catalog,
  Lesson,
  Progress,
  Resource,
  Team,
  TeamProgress,
  TopicDetail,
  User,
} from "./types";

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/$/, "");
const TOKEN_KEY = "lh_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage unavailable */
  }
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, { ...init, headers });
  } catch {
    throw new ApiError(0, "Can't reach the server. Check that the backend is running.");
  }
  if (res.status === 401 && path !== "/api/auth/login") {
    setToken(null);
    if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
      window.location.href = "/login";
    }
  }
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (typeof data.detail === "string") msg = data.detail;
      else if (Array.isArray(data.detail)) msg = data.detail.map((d: { msg: string }) => d.msg).join("; ");
    } catch {
      /* not JSON */
    }
    throw new ApiError(res.status, msg);
  }
  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

const json = (body: unknown) => JSON.stringify(body);

export const api = {
  login: (email: string, password: string) =>
    request<{ access_token: string }>("/api/auth/login", { method: "POST", body: json({ email, password }) }),
  me: () => request<User>("/api/auth/me"),
  updateMe: (body: Partial<Pick<User, "name" | "hours_per_week">>) =>
    request<User>("/api/auth/me", { method: "PATCH", body: json(body) }),
  changePassword: (current_password: string, new_password: string) =>
    request<void>("/api/auth/change-password", { method: "POST", body: json({ current_password, new_password }) }),

  catalog: () => request<Catalog>("/api/catalog"),
  resources: () => request<Resource[]>("/api/resources"),
  topic: (id: string) => request<TopicDetail>(`/api/topics/${encodeURIComponent(id)}`),
  createTopic: (body: Record<string, unknown>) =>
    request<TopicDetail>("/api/topics", { method: "POST", body: json(body) }),
  updateTopic: (id: string, body: Record<string, unknown>) =>
    request<TopicDetail>(`/api/topics/${encodeURIComponent(id)}`, { method: "PUT", body: json(body) }),
  saveLesson: (id: string, lesson: Lesson) =>
    request<TopicDetail>(`/api/topics/${encodeURIComponent(id)}/lesson`, { method: "PUT", body: json(lesson) }),

  myProgress: () => request<Progress[]>("/api/progress/me"),
  saveProgress: (topicId: string, body: Partial<Omit<Progress, "topic_id">>) =>
    request<Progress>(`/api/progress/me/${encodeURIComponent(topicId)}`, { method: "PUT", body: json(body) }),

  users: () => request<User[]>("/api/users"),
  createUser: (body: { email: string; name: string; role: string; team_id: number | null; temporary_password: string }) =>
    request<User>("/api/users", { method: "POST", body: json(body) }),
  updateUser: (id: number, body: Partial<Pick<User, "name" | "role" | "team_id" | "is_active">>) =>
    request<User>(`/api/users/${id}`, { method: "PATCH", body: json(body) }),
  teams: () => request<Team[]>("/api/teams"),
  createTeam: (name: string) => request<Team>("/api/teams", { method: "POST", body: json({ name }) }),
  teamProgress: (id: number) => request<TeamProgress>(`/api/teams/${id}/progress`),
};
