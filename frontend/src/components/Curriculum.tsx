"use client";

import Link from "next/link";
import { StatusIcon } from "@/components/ui";
import { hoursLabel, statusOf, type ProgMap } from "@/lib/curriculum";
import type { Category, TopicSummary } from "@/lib/types";

/** Course content list grouped into sections, like a course curriculum. */
export default function Curriculum({
  categories, topics, prog, currentId, compact = false, onNavigate,
}: {
  categories: Category[];
  topics: TopicSummary[];
  prog: ProgMap;
  currentId?: string;
  compact?: boolean;
  onNavigate?: () => void;
}) {
  const currentCat = topics.find((t) => t.id === currentId)?.category;
  return (
    <div className={`curr${compact ? " compact" : ""}`}>
      {categories.map((cat, ci) => {
        const list = topics.filter((t) => t.category === cat.slug);
        if (!list.length) return null;
        const done = list.filter((t) => statusOf(prog, t.id) === 3).length;
        const hours = list.reduce((s, t) => s + t.hours, 0);
        return (
          <details key={cat.slug} open={compact ? cat.slug === currentCat : true}>
            <summary>
              <span className="sec-t">
                <span className="sec-n">Section {ci + 1}</span>
                {cat.name}
              </span>
              <span className="sec-m num">{done}/{list.length} · {hoursLabel(hours)}</span>
            </summary>
            <ol>
              {list.map((t, i) => {
                const st = statusOf(prog, t.id);
                const cur = t.id === currentId;
                return (
                  <li key={t.id}>
                    <Link href={`/topics/${t.id}`} className={`lec${cur ? " cur" : ""}`}
                      aria-current={cur ? "page" : undefined} onClick={onNavigate}>
                      <StatusIcon status={st} />
                      <span className="lec-t">
                        <span>{i + 1}. {t.title}</span>
                        <span className="lec-m">
                          {t.has_lesson ? "Lesson" : "Outline"} · {hoursLabel(t.hours)}
                          {!compact && t.priority === "P0" && <span className="tag core">Core</span>}
                          {!compact && t.kind === "Refresh" && <span className="tag">Refresher</span>}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </details>
        );
      })}
    </div>
  );
}
