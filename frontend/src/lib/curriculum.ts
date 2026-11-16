import type { Catalog, Category, Progress, TopicSummary } from "./types";

export type ProgMap = Record<string, Progress>;

export const statusOf = (prog: ProgMap, id: string) => prog[id]?.status ?? 0;

/** Categories of one phase, in course order. */
export function phaseCategories(c: Catalog, phase: number): Category[] {
  return c.categories.filter((x) => x.phase === phase).sort((a, b) => a.order - b.order);
}

/** Every topic in learning order: by category order, then topic order. */
export function orderedTopics(c: Catalog): TopicSummary[] {
  const cats = [...c.categories].sort((a, b) => a.order - b.order);
  return cats.flatMap((cat) => c.topics.filter((t) => t.category === cat.slug).sort((a, b) => a.order - b.order));
}

export function phaseTopics(c: Catalog, phase: number): TopicSummary[] {
  const slugs = new Set(phaseCategories(c, phase).map((x) => x.slug));
  return orderedTopics(c).filter((t) => slugs.has(t.category));
}

export function categoryOf(c: Catalog, topic: TopicSummary): Category | undefined {
  return c.categories.find((x) => x.slug === topic.category);
}

export function percentDone(topics: TopicSummary[], prog: ProgMap): number {
  if (!topics.length) return 0;
  const done = topics.filter((t) => statusOf(prog, t.id) === 3).length;
  return Math.round((done / topics.length) * 100);
}

/** The topic to resume: the most recently touched unfinished topic, else the first not started. */
export function nextUp(topics: TopicSummary[], prog: ProgMap): TopicSummary | null {
  const started = topics
    .filter((t) => [1, 2].includes(statusOf(prog, t.id)))
    .sort((a, b) => (prog[b.id]?.updated_at ?? "").localeCompare(prog[a.id]?.updated_at ?? ""));
  if (started.length) return started[0];
  return topics.find((t) => statusOf(prog, t.id) === 0) ?? null;
}

export function hoursLabel(h: number): string {
  if (h < 1) return `${Math.round(h * 60)} min`;
  return `${Number.isInteger(h) ? h : h.toFixed(1)} h`;
}
