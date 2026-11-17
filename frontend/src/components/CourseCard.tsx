import Link from "next/link";
import { Meter } from "@/components/ui";
import { hoursLabel, nextUp, percentDone, statusOf, type ProgMap } from "@/lib/curriculum";
import type { Category, Phase, TopicSummary } from "@/lib/types";

/** A phase shown as a course tile: banner, what it covers, progress and a call to action. */
export default function CourseCard({
  phase, categories, topics, prog,
}: {
  phase: Phase;
  categories: Category[];
  topics: TopicSummary[];
  prog: ProgMap;
}) {
  const pct = percentDone(topics, prog);
  const started = topics.some((t) => statusOf(prog, t.id) > 0);
  const hours = topics.reduce((s, t) => s + t.hours, 0);
  const resume = nextUp(topics, prog);
  const cta = pct === 100 ? "Review" : started ? "Continue" : "Start course";
  return (
    <article className={`course ph${((phase.number - 1) % 7) + 1}`}>
      <Link href={`/phases/${phase.number}`} className="banner" aria-label={`Phase ${phase.number}: ${phase.name}`}>
        <span className="banner-k">Phase {phase.number}</span>
        <span className="banner-n" aria-hidden="true">{String(phase.number).padStart(2, "0")}</span>
      </Link>
      <div className="course-b">
        <h3><Link href={`/phases/${phase.number}`}>{phase.name}</Link></h3>
        <p className="course-c">{categories.map((c) => c.name).join(" · ")}</p>
        <div className="course-m">
          <span>{topics.length} topics</span>
          <span>{categories.length} {categories.length === 1 ? "section" : "sections"}</span>
          <span>{hoursLabel(hours)}</span>
        </div>
        <div className="course-p">
          <Meter value={pct} label={`Phase ${phase.number} progress`} />
          <span className="num">{pct}%</span>
        </div>
        <div className="course-a">
          <Link className="btn primary sm" href={resume && pct < 100 ? `/topics/${resume.id}` : `/phases/${phase.number}`}>{cta}</Link>
          <Link className="btn ghost sm" href={`/phases/${phase.number}`}>Course content</Link>
        </div>
      </div>
    </article>
  );
}
