"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Curriculum from "@/components/Curriculum";
import TopBar from "@/components/TopBar";
import { Meter, Ring } from "@/components/ui";
import { useRequireAuth } from "@/lib/auth";
import { hoursLabel, nextUp, percentDone, phaseCategories, phaseTopics, statusOf } from "@/lib/curriculum";
import { useLearning } from "@/lib/useLearning";

export default function PhasePage() {
  const { user } = useRequireAuth();
  const { n } = useParams<{ n: string }>();
  const { catalog, prog, error } = useLearning(user);

  if (!user) return null;
  if (error) return (<><TopBar /><div className="wrap"><p className="error">{error}</p></div></>);
  if (!catalog) return (<><TopBar /><div className="wrap"><div className="skeleton hero-sk" /></div></>);

  const num = Number(n);
  const phase = catalog.phases.find((p) => p.number === num);
  if (!phase) {
    return (<><TopBar /><div className="wrap"><p>That course doesn’t exist.</p><Link href="/dashboard">Back to my learning</Link></div></>);
  }
  const cats = phaseCategories(catalog, num);
  const topics = phaseTopics(catalog, num);
  const pct = percentDone(topics, prog);
  const done = topics.filter((t) => statusOf(prog, t.id) === 3).length;
  const hours = topics.reduce((s, t) => s + t.hours, 0);
  const core = topics.filter((t) => t.priority === "P0").length;
  const lessons = topics.filter((t) => t.has_lesson).length;
  const resume = nextUp(topics, prog);
  const started = topics.some((t) => statusOf(prog, t.id) > 0);
  const prev = catalog.phases.find((p) => p.number === num - 1);
  const next = catalog.phases.find((p) => p.number === num + 1);

  return (
    <>
      <TopBar />
      <header className={`course-hero ph${((num - 1) % 6) + 1}`}>
        <div className="inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/dashboard">My learning</Link> <span aria-hidden="true">›</span> Phase {num}
          </nav>
          <div className="course-hero-g">
            <div>
              <p className="eyebrow">Phase {num} of {catalog.phases.length}</p>
              <h1>{phase.name}</h1>
              <p className="lead">{cats.map((c) => c.name).join(" · ")}</p>
              <div className="course-m on-dark">
                <span>{topics.length} topics</span>
                <span>{cats.length} {cats.length === 1 ? "section" : "sections"}</span>
                <span>{hoursLabel(hours)} total</span>
                <span>{core} core topics</span>
              </div>
              <div className="hero-cta">
                {resume && pct < 100 && (
                  <Link className="btn primary lg" href={`/topics/${resume.id}`}>{started ? "Continue course" : "Start course"}</Link>
                )}
                {resume && pct < 100 && <span className="small">Next: {resume.title}</span>}
              </div>
            </div>
            <Ring value={pct} size={96} label={`${pct}% of this course complete`} />
          </div>
        </div>
      </header>

      <main className="wrap course-page">
        <section aria-labelledby="content-h" className="stack-l">
          <div className="sec-head">
            <h2 id="content-h">Course content</h2>
            <span className="muted small">{done} of {topics.length} complete</span>
          </div>
          <Curriculum categories={cats} topics={topics} prog={prog} />
          <div className="pager">
            {prev ? <Link className="btn ghost" href={`/phases/${prev.number}`}>‹ Phase {prev.number}: {prev.name}</Link> : <span />}
            {next && <Link className="btn ghost" href={`/phases/${next.number}`}>Phase {next.number}: {next.name} ›</Link>}
          </div>
        </section>

        <aside className="card includes" aria-labelledby="inc-h">
          <h2 id="inc-h" className="card-h">This course includes</h2>
          <ul>
            <li><b className="num">{lessons}</b> written lessons with diagrams and tables</li>
            <li><b className="num">{topics.length}</b> hands-on exercises you can do without code</li>
            <li><b className="num">{topics.length}</b> self-check quizzes and interview questions</li>
            <li><b className="num">{hoursLabel(hours)}</b> of study, including practice</li>
          </ul>
          <div className="course-p">
            <Meter value={pct} label="Course progress" />
            <span className="num small">{pct}%</span>
          </div>
        </aside>
      </main>
    </>
  );
}
