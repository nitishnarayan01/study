import type { Progress, TopicSummary } from "./types";

export const EMPTY: Omit<Progress, "topic_id"> = { status: 0, confidence: 0, key_points: [], notes: "" };

/** Share of a topic's hours counted for each status (matches the backend). */
const WEIGHT = [0, 0.3, 0.6, 1];

export function counts(topics: TopicSummary[], prog: Record<string, Progress>) {
  const c = [0, 0, 0, 0];
  topics.forEach((t) => c[prog[t.id]?.status ?? 0]++);
  return c;
}

export function hoursDone(topics: TopicSummary[], prog: Record<string, Progress>) {
  return topics.reduce((s, t) => s + t.hours * WEIGHT[prog[t.id]?.status ?? 0], 0);
}

export function promptFor(title: string, concepts: string[], interview: string) {
  return `I'm a project manager with 11 years of experience, moving into an AI-enabled Technical Program Manager role. I don't write code myself; I build things with Claude's help.

Teach me: "${title}".
Cover: ${concepts.join("; ")}.

Start with a plain-English explanation and an analogy from project delivery. Then give one real-world example from a software product, and the trade-offs or risks a TPM has to manage. Keep it practical.

Then quiz me with 5 questions, one at a time. Wait for my answer each time, tell me what I got right or wrong, and finish with one interview-style question: "${interview}"`;
}
