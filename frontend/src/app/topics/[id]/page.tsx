"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Curriculum from "@/components/Curriculum";
import LessonView, { readingMinutes } from "@/components/LessonView";
import TopBar from "@/components/TopBar";
import { Meter } from "@/components/ui";
import { api } from "@/lib/api";
import { loadTopic, peekTopic, prefetchTopic } from "@/lib/cache";
import { useRequireAuth } from "@/lib/auth";
import {
  categoryOf, hoursLabel, orderedTopics, percentDone, phaseCategories, phaseTopics, statusOf,
} from "@/lib/curriculum";
import { EMPTY, promptFor } from "@/lib/progress";
import { STATUS, type Progress, type TopicDetail } from "@/lib/types";
import { useLearning } from "@/lib/useLearning";

type Tab = "lesson" | "practice" | "notes";

export default function TopicPage() {
  const { user } = useRequireAuth();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { catalog, prog, setProg, error: loadError } = useLearning(user);
  const [topic, setTopic] = useState<TopicDetail | null>(() => peekTopic(id));
  const [tab, setTab] = useState<Tab>(() => (peekTopic(id)?.lesson === null ? "practice" : "lesson"));
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");
  const [copied, setCopied] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [read, setRead] = useState(0);
  const notesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoStarted = useRef<string | null>(null);

  useEffect(() => {
    if (!user || !id) return;
    const cached = peekTopic(id);
    setTopic(cached);
    if (cached) setTab(cached.lesson ? "lesson" : "practice");
    setDrawer(false);
    loadTopic(id)
      .then((t) => {
        setTopic(t);
        if (!cached) setTab(t.lesson ? "lesson" : "practice");
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Couldn't load this topic."));
  }, [user, id]);

  // Reading progress bar for the lesson.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setRead(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [topic, tab]);

  const p: Omit<Progress, "topic_id"> = prog[id] ?? EMPTY;

  async function save(patch: Partial<Omit<Progress, "topic_id">>) {
    setProg((all) => ({ ...all, [id]: { ...EMPTY, ...(all[id] ?? {}), topic_id: id, ...patch } }));
    setSaved("Saving…");
    try {
      const s = await api.saveProgress(id, patch);
      setProg((all) => ({ ...all, [id]: s }));
      setSaved("Saved");
    } catch (e) {
      setSaved(e instanceof Error ? e.message : "Couldn’t save");
    }
  }

  // Opening a topic marks it as "Learning" so it shows up under Continue.
  useEffect(() => {
    if (!catalog || !topic || autoStarted.current === id) return;
    autoStarted.current = id;
    if (statusOf(prog, id) === 0) save({ status: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog, topic, id]);

  // Fetch the next and previous topics in the background so clicking them is instant.
  useEffect(() => {
    if (!catalog || !topic) return;
    const all = orderedTopics(catalog);
    const i = all.findIndex((t) => t.id === id);
    const t = setTimeout(() => {
      if (i >= 0 && i < all.length - 1) prefetchTopic(all[i + 1].id);
      if (i > 0) prefetchTopic(all[i - 1].id);
    }, 300);
    return () => clearTimeout(t);
  }, [catalog, topic, id]);

  function onNotes(v: string) {
    setProg((all) => ({ ...all, [id]: { ...EMPTY, ...(all[id] ?? {}), topic_id: id, notes: v } }));
    if (notesTimer.current) clearTimeout(notesTimer.current);
    notesTimer.current = setTimeout(() => save({ notes: v }), 1000);
  }

  if (!user) return null;
  const err = error || loadError;
  if (err) return (<><TopBar /><div className="wrap narrow"><p className="error">{err}</p><Link href="/dashboard">Back to my learning</Link></div></>);
  if (!topic || !catalog) return (<><TopBar /><div className="wrap narrow"><div className="skeleton hero-sk" /><div className="skeleton" /></div></>);

  const all = orderedTopics(catalog);
  const idx = all.findIndex((t) => t.id === id);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
  const summary = all[idx];
  const cat = summary ? categoryOf(catalog, summary) : undefined;
  const phaseNum = cat?.phase ?? 1;
  const phase = catalog.phases.find((x) => x.number === phaseNum);
  const pTopics = phaseTopics(catalog, phaseNum);
  const pPct = percentDone(pTopics, prog);
  const posInPhase = pTopics.findIndex((t) => t.id === id) + 1;
  const status = p.status;
  const prompt = promptFor(topic.title, topic.concepts, topic.interview);
  const kpDone = topic.concepts.filter((_, i) => p.key_points[i]).length;

  async function completeAndContinue() {
    if (status !== 3) await save({ status: 3 });
    if (next) router.push(`/topics/${next.id}`);
    else router.push(`/phases/${phaseNum}`);
  }

  function goTab(t: Tab) {
    setTab(t);
    window.scrollTo({ top: 0 });
  }

  return (
    <>
      <TopBar />
      <div className="readbar" aria-hidden="true"><span style={{ width: `${tab === "lesson" ? read : 0}%` }} /></div>
      <div className="player">
        <aside className={`player-side${drawer ? " open" : ""}`} aria-label="Course content">
          <div className="side-head">
            <Link href={`/phases/${phaseNum}`} className="side-course">
              <span className="eyebrow">Phase {phaseNum}</span>
              <span className="side-name">{phase?.name}</span>
            </Link>
            <div className="course-p">
              <Meter value={pPct} label="Course progress" />
              <span className="num small">{pPct}%</span>
            </div>
            <button className="btn ghost sm side-close" onClick={() => setDrawer(false)}>Close</button>
          </div>
          <Curriculum categories={phaseCategories(catalog, phaseNum)} topics={pTopics} prog={prog} currentId={id}
            compact onNavigate={() => setDrawer(false)} />
        </aside>
        {drawer && <button className="scrim" aria-label="Close course content" onClick={() => setDrawer(false)} />}

        <main className="player-main">
          <div className="player-top">
            <button className="btn ghost sm side-open" onClick={() => setDrawer(true)} aria-expanded={drawer}>☰ Course content</button>
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link href="/dashboard">My learning</Link> <span aria-hidden="true">›</span>{" "}
              <Link href={`/phases/${phaseNum}`}>Phase {phaseNum}: {phase?.name}</Link> <span aria-hidden="true">›</span>{" "}
              {cat?.name}
            </nav>
          </div>

          <header className="lesson-head">
            <p className="eyebrow">Topic {posInPhase} of {pTopics.length}</p>
            <h1>{topic.title}</h1>
            <div className="lesson-meta">
              {topic.lesson && <span>{readingMinutes(topic.lesson)} min read</span>}
              <span>{hoursLabel(topic.hours)} incl. practice</span>
              <span>{topic.depth}</span>
              {topic.priority === "P0" && <span className="tag core">Core</span>}
              {topic.kind === "Refresh" && <span className="tag">Refresher</span>}
              <span className={`status-chip s${status}`}>{STATUS[status]}</span>
            </div>
          </header>

          <div className="tabs" role="tablist" aria-label="Topic sections">
            {topic.lesson && (
              <button role="tab" aria-selected={tab === "lesson"} onClick={() => goTab("lesson")}>Lesson</button>
            )}
            <button role="tab" aria-selected={tab === "practice"} onClick={() => goTab("practice")}>
              Practice{topic.concepts.length > 0 && <span className="count num">{kpDone}/{topic.concepts.length}</span>}
            </button>
            <button role="tab" aria-selected={tab === "notes"} onClick={() => goTab("notes")}>Notes</button>
          </div>

          {tab === "lesson" && topic.lesson && (
            <article className="lesson-card">
              {topic.summary && <p className="lesson-intro">{topic.summary}</p>}
              <LessonView lesson={topic.lesson} resources={topic.resources} />
              <div className="next-step">
                <div>
                  <b>Finished reading?</b>
                  <p className="muted small">Lock it in with a short exercise, then mark the topic complete.</p>
                </div>
                <button className="btn primary" onClick={() => goTab("practice")}>Go to practice</button>
              </div>
            </article>
          )}

          {tab === "practice" && (
            <div className="practice">
              {topic.status === "outline" && (
                <div className="notice">The full lesson for this topic is still being written. You can already practise, track it and take notes.</div>
              )}
              {!topic.lesson && topic.summary && (
                <section className="pcard"><h2>What it is</h2><p>{topic.summary}</p></section>
              )}
              {topic.why && <section className="pcard"><h2>Why it matters to you as a TPM</h2><p>{topic.why}</p></section>}
              {topic.concepts.length > 0 && (
                <section className="pcard">
                  <h2>Can you explain these? <span className="muted small">Tick each one you could explain to a colleague.</span></h2>
                  <ul className="kp">
                    {topic.concepts.map((c, i) => (
                      <li key={i}>
                        <label>
                          <input type="checkbox" checked={!!p.key_points[i]} onChange={(e) => {
                            const kp = topic.concepts.map((_, j) => (j === i ? e.target.checked : !!p.key_points[j]));
                            save({ key_points: kp });
                          }} /> <span>{c}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                  <Meter value={topic.concepts.length ? (kpDone / topic.concepts.length) * 100 : 0} label="Key points ticked" />
                </section>
              )}
              <div className="pgrid">
                {topic.do_it && <section className="pcard task"><span className="task-k">Exercise</span><h2>Do it (no code needed)</h2><p>{topic.do_it}</p></section>}
                {topic.prove && <section className="pcard task"><span className="task-k">Portfolio</span><h2>Prove it</h2><p>{topic.prove}</p></section>}
              </div>
              {topic.interview && (
                <section className="pcard quote"><span className="task-k">Interview question</span><p>“{topic.interview}”</p></section>
              )}
              {topic.concepts.length > 0 && (
                <section className="pcard">
                  <h2>Practise with Claude</h2>
                  <p className="muted small">Copy this into a new chat. Claude will teach the topic, then quiz you one question at a time.</p>
                  <div className="prompt">{prompt}</div>
                  <button className="btn" style={{ marginTop: 10 }} onClick={async () => {
                    try { await navigator.clipboard.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard blocked */ }
                  }}>{copied ? "Copied" : "Copy prompt"}</button>
                </section>
              )}
              {topic.resources.length > 0 && (
                <section className="pcard">
                  <h2>Resources</h2>
                  <ul className="res">
                    {topic.resources.map((r) => (
                      <li key={r.key}><a href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a><span className="kind">{r.kind}</span></li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}

          {tab === "notes" && (
            <div className="practice">
              <section className="pcard">
                <h2>How confident are you?</h2>
                <div className="stars" role="group" aria-label="Confidence">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} className={p.confidence >= n ? "on" : ""} aria-label={`Confidence ${n} of 5`}
                      onClick={() => save({ confidence: p.confidence === n ? 0 : n })}>★</button>
                  ))}
                </div>
              </section>
              <section className="pcard">
                <h2><label htmlFor="notes">Your notes</label></h2>
                <textarea id="notes" className="notes" value={p.notes} onChange={(e) => onNotes(e.target.value)}
                  placeholder="What clicked, what’s still fuzzy, examples from your own projects…" />
                <span className="muted small" role="status">{saved}</span>
              </section>
              {topic.covers.length > 0 && (
                <section className="pcard">
                  <h2>Covers these rows from the original sheet</h2>
                  <div className="chips">{topic.covers.map((c) => <span className="tag" key={c}>{c}</span>)}</div>
                </section>
              )}
            </div>
          )}

          <nav className="player-nav" aria-label="Topic navigation">
            {prev ? <Link className="btn ghost" href={`/topics/${prev.id}`} title={prev.title}>‹ Previous</Link> : <span />}
            <div className="status-pick">
              <label htmlFor="status" className="small muted">Status</label>
              <select id="status" value={status} onChange={(e) => save({ status: Number(e.target.value) })}>
                {STATUS.map((s, i) => <option key={s} value={i}>{s}</option>)}
              </select>
            </div>
            <button className="btn primary" onClick={completeAndContinue}>
              {status === 3 ? (next ? "Next topic ›" : "Back to course") : next ? "Complete and continue ›" : "Complete course"}
            </button>
          </nav>
        </main>
      </div>
    </>
  );
}
