"use client";

import Link from "next/link";
import CourseCard from "@/components/CourseCard";
import TopBar from "@/components/TopBar";
import { Meter, Ring, StatusIcon } from "@/components/ui";
import { api } from "@/lib/api";
import { useAuth, useRequireAuth } from "@/lib/auth";
import {
  categoryOf, hoursLabel, nextUp, orderedTopics, percentDone, phaseCategories, phaseTopics, statusOf,
} from "@/lib/curriculum";
import { hoursDone } from "@/lib/progress";
import { STATUS } from "@/lib/types";
import { useLearning } from "@/lib/useLearning";

export default function Home() {
  const { user } = useRequireAuth();
  const { refresh } = useAuth();
  const { catalog, prog, error } = useLearning(user);

  if (!user) return null;
  if (error) return (<><TopBar /><div className="wrap"><p className="error">{error}</p></div></>);
  if (!catalog) return (<><TopBar /><div className="wrap"><div className="skeleton hero-sk" /><div className="skeleton" /></div></>);

  const all = orderedTopics(catalog);
  const doneCount = all.filter((t) => statusOf(prog, t.id) === 3).length;
  const pct = percentDone(all, prog);
  const totalH = all.reduce((s, t) => s + t.hours, 0);
  const studied = hoursDone(all, prog);
  const hpw = Math.max(1, user.hours_per_week || 8);
  const weeks = Math.ceil((totalH - studied) / hpw);
  const resume = nextUp(all, prog);
  const resumeCat = resume ? categoryOf(catalog, resume) : undefined;
  const resumePhase = resumeCat ? catalog.phases.find((p) => p.number === resumeCat.phase) : undefined;
  const resumeSt = resume ? statusOf(prog, resume.id) : 0;
  const phasePct = resumePhase ? percentDone(phaseTopics(catalog, resumePhase.number), prog) : 0;
  const first = user.name.split(/\s+/)[0] || user.name;
  const recent = all
    .filter((t) => prog[t.id]?.updated_at && statusOf(prog, t.id) > 0 && t.id !== resume?.id)
    .sort((a, b) => (prog[b.id]?.updated_at ?? "").localeCompare(prog[a.id]?.updated_at ?? ""))
    .slice(0, 4);

  async function setHpw(v: number) {
    await api.updateMe({ hours_per_week: Math.min(60, Math.max(1, v || 8)) });
    await refresh();
  }

  return (
    <>
      <TopBar />
      <main className="wrap">
        {user.must_change_password && (
          <div className="notice">You’re using a temporary password. <Link href="/account">Set your own password</Link>.</div>
        )}

        <section className="hero">
          <div className="hero-l">
            <p className="eyebrow">My learning</p>
            <h1>{doneCount === 0 ? `Welcome, ${first}` : `Welcome back, ${first}`}</h1>
            <p className="muted">
              {doneCount === 0
                ? "Your path to AI-enabled TPM: seven short courses, from how software works to taking websites and apps live."
                : `${doneCount} of ${all.length} topics done. Pick up where you left off below.`}
            </p>
          </div>
          <div className="hero-r">
            <Ring value={pct} size={84} label={`${pct}% of the whole path complete`} />
            <dl className="stats">
              <div><dt>Topics done</dt><dd className="num">{doneCount}<small>/{all.length}</small></dd></div>
            </dl>
          </div>
        </section>

        {resume && resumeCat && resumePhase && (
          <section className="resume" aria-labelledby="resume-h">
            <div className={`resume-art ph${((resumePhase.number - 1) % 7) + 1}`} aria-hidden="true">
              <span>{String(resumePhase.number).padStart(2, "0")}</span>
            </div>
            <div className="resume-b">
              <p className="eyebrow" id="resume-h">{resumeSt > 0 ? "Continue where you left off" : "Start here"}</p>
              <h2><Link href={`/topics/${resume.id}`}>{resume.title}</Link></h2>
              <p className="muted small">
                Phase {resumePhase.number}: {resumePhase.name} · {resumeCat.name} · {hoursLabel(resume.hours)}
              </p>
              <div className="course-p">
                <Meter value={phasePct} label="Course progress" />
                <span className="num small">{phasePct}% of this course</span>
              </div>
            </div>
            <Link className="btn primary lg" href={`/topics/${resume.id}`}>{resumeSt > 0 ? "Resume" : "Start lesson"}</Link>
          </section>
        )}

        <section aria-labelledby="courses-h" className="stack-l">
          <div className="sec-head">
            <h2 id="courses-h">Your courses</h2>
            <Link href="/browse" className="small">Browse all {all.length} topics</Link>
          </div>
          <div className="courses">
            {catalog.phases.map((ph) => (
              <CourseCard key={ph.number} phase={ph} categories={phaseCategories(catalog, ph.number)}
                topics={phaseTopics(catalog, ph.number)} prog={prog} />
            ))}
          </div>
        </section>

        <div className="split">
          <section className="card" aria-labelledby="recent-h">
            <h2 id="recent-h" className="card-h">Recently studied</h2>
            {recent.length ? (
              <ul className="mini">
                {recent.map((t) => (
                  <li key={t.id}>
                    <StatusIcon status={statusOf(prog, t.id)} />
                    <Link href={`/topics/${t.id}`}>{t.title}</Link>
                    <span className="muted small">{STATUS[statusOf(prog, t.id)]}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted small">Topics you open will show up here.</p>
            )}
          </section>
          <section className="card" aria-labelledby="pace-h">
            <h2 id="pace-h" className="card-h">Your pace</h2>
            <label className="hpw" htmlFor="hpw">
              I can study <input id="hpw" className="num" type="number" min={1} max={60} defaultValue={hpw}
                onBlur={(e) => setHpw(Number(e.target.value))} /> hours a week
            </label>
            <p className="muted small">
              At this pace you have about {weeks} {weeks === 1 ? "week" : "weeks"} to go. Hours include hands-on practice,
              not just reading.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
