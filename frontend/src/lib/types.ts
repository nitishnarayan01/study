export type Role = "admin" | "manager" | "learner";

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
  team_id: number | null;
  is_active: boolean;
  must_change_password: boolean;
  hours_per_week: number;
}

export interface Team {
  id: number;
  name: string;
}

export interface Phase {
  number: number;
  name: string;
}

export interface Category {
  slug: string;
  name: string;
  phase: number;
  order: number;
}

export interface TopicSummary {
  id: string;
  category: string;
  title: string;
  depth: "Understand" | "Use" | "Build";
  priority: "P0" | "P1" | "P2";
  kind: "New" | "Refresh";
  hours: number;
  order: number;
  status: "outline" | "full";
  has_lesson: boolean;
  concept_count: number;
}

export interface Catalog {
  phases: Phase[];
  categories: Category[];
  topics: TopicSummary[];
}

export interface Resource {
  key: string;
  title: string;
  url: string;
  kind: string;
}

export interface LessonSection {
  h: string;
  p?: string[];
  steps?: [string, string][];
  table?: string[][];
  bullets?: string[];
  gloss?: [string, string][];
  mis?: [string, string][];
  flow?: [string, [string, string][]][];
  flowLabel?: string;
}

export interface Lesson {
  sections: LessonSection[];
  quiz: [string, string][];
  deeper: string[];
}

export interface TopicDetail extends Omit<TopicSummary, "has_lesson" | "concept_count"> {
  summary: string;
  why: string;
  concepts: string[];
  resources: Resource[];
  do_it: string;
  prove: string;
  interview: string;
  covers: string[];
  lesson: Lesson | null;
  updated_at: string | null;
}

export interface Progress {
  topic_id: string;
  status: number;
  confidence: number;
  key_points: boolean[];
  notes: string;
  updated_at?: string | null;
}

export interface MemberProgress {
  user_id: number;
  name: string;
  email: string;
  done: number;
  in_progress: number;
  total: number;
  hours_done: number;
  by_phase: Record<string, { done: number; in_progress: number }>;
  last_activity: string | null;
}

export interface TeamProgress {
  team: Team;
  members: MemberProgress[];
}

export const STATUS = ["Not started", "Learning", "Practising", "Done"] as const;
