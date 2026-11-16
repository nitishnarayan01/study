"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LessonView, { readingMinutes } from "@/components/LessonView";
import TopBar from "@/components/TopBar";
import { api } from "@/lib/api";
import { useRequireAuth } from "@/lib/auth";
import { EMPTY, promptFor } from "@/lib/progress";
import { STATUS, type Progress, type TopicDetail } from "@/lib/types";

export default function TopicPage() {
  const { user } = useRequireAuth();
  const { id } = useParams<{ id: string }>();
  const [topic, setTopic] = useState<TopicDetail | null>(null);
  const [prog, setProg] = useState<Omit<Progress, "topic_id">>(EMPTY);
  const [tab, setTab] = useState<"lesson" | "track">("lesson");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");
  const [copied, setCopied] = useState(false);
  const notesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!user || !id) return;
    Promise.all([api.topic(id), api.myProgress()])
      .then(([t, all]) => {
        setTopic(t);
        if (!t.lesson) setTab("track");
        const p = all.find((x) => x.topic_id === id);
        if (p) setProg(p);
      })
      .catch((e) => setError(e.message));
  }, [user, id]);

  async function save(patch: Partial<Omit<Progress, "topic_id">>) {
    setProg((p) => ({ ...p, ...patch }));
    setSaved("Saving…");
    try {
      await api.saveProgress(id, patch);
      setSaved("Saved");
    } catch (e) {
      setSaved(e instanceof Error ? e.message : "Couldn't save");
    }
  }

  function onNotes(v: string) {
    setProg((p) => ({ ...p, notes: v }));
    if (notesTimer.current) clearTimeout(notesTimer.current);
    notesTimer.current = setTimeout(() => save({ notes: v }), 1000);
  }

  if (!user) return null;
  if (error) return (<><TopBar /><div className="wrap narrow"><p className="error">{error}</p><Link href="/dashboard">Back to learning path</Link></div></>);
  if (!topic) return (<><TopBar /><div className="wrap narrow muted">Loading…</div></>);

  const prompt = promptFor(topic.title, topic.concepts, topic.interview);

  return (
    <>
      <TopBar />
      <main className="wrap narrow">
        <div>
          <div className="crumbs"><Link href="/dashboard">Learning path</Link> · {topic.priority} · {topic.depth} · {topic.hours} hrs{topic.kind === "Refresh" ? " · Refresh" : ""}</div>
          <h1 style={{ fontSize: 24, marginTop: 4 }}>{topic.title}</h1>
        </div>

        {topic.lesson && (
          <div className="tabs" role="tablist">
            <button role="tab" aria-selected={tab === "lesson"} onClick={() => setTab("lesson")}>Lesson · {readingMinutes(topic.lesson)} min read</button>
            <button role="tab" aria-selected={tab === "track"} onClick={() => { setTab("track"); if (prog.status === 0) save({ status: 1 }); }}>Practice &amp; track</button>
          </div>
        )}

        <div className="card">
          {tab === "lesson" && topic.lesson ? (
            <div className="stack">
              <LessonView lesson={topic.lesson} resources={topic.resources} />
              <div><button className="btn primary" onClick={() => { setTab("track"); if (prog.status === 0) save({ status: 1 }); window.scrollTo(0, 0); }}>Done reading: go to practice &amp; track</button></div>
            </div>
          ) : (
            <div className="stack">
              <div className="ctrl">
                <div className="seg" role="group" aria-label="Status">
                  {STATUS.map((s, i) => (
                    <button key={s} className={`st${i}`} aria-pressed={prog.status === i} onClick={() => save({ status: i })}>{s}</button>
                  ))}
                </div>
                <div className="stars" role="group" aria-label="Confidence">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} className={prog.confidence >= n ? "on" : ""} aria-label={`Confidence ${n} of 5`}
                      onClick={() => save({ confidence: prog.confidence === n ? 0 : n })}>★</button>
                  ))}
                </div>
                <span className="muted" role="status" style={{ fontSize: 13 }}>{saved}</span>
              </div>

              {topic.status === "outline" && (
                <div className="notice">This topic is part of the outline. Its lesson and exercises are coming; you can already track it and take notes.</div>
              )}
              {topic.summary && <div><h4>What it is</h4><p>{topic.summary}</p></div>}
              {topic.why && <div><h4>Why it matters to you as a TPM</h4><p>{topic.why}</p></div>}
              {topic.concepts.length > 0 && (
                <div>
                  <h4>Key points to learn · tick when you can explain each one</h4>
                  <ul className="kp">
                    {topic.concepts.map((c, i) => (
                      <li key={i}>
                        <label>
                          <input type="checkbox" checked={!!prog.key_points[i]} onChange={(e) => {
                            const kp = topic.concepts.map((_, j) => (j === i ? e.target.checked : !!prog.key_points[j]));
                            save({ key_points: kp, ...(e.target.checked && prog.status === 0 ? { status: 1 } : {}) });
                          }} /> <span>{c}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {topic.resources.length > 0 && (
                <div>
                  <h4>Learn</h4>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {topic.resources.map((r) => (
                      <li key={r.key}><a href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a><span className="kind">{r.kind}</span></li>
                    ))}
                  </ul>
                </div>
              )}
              {topic.do_it && <div><h4>Do it (no code needed)</h4><div className="box">{topic.do_it}</div></div>}
              {topic.prove && <div><h4>Prove it</h4><div className="box">{topic.prove}</div></div>}
              {topic.interview && <div><h4>Interview angle</h4><p>“{topic.interview}”</p></div>}
              {topic.concepts.length > 0 && (
                <div>
                  <h4>Ask Claude · copy and paste into a new chat</h4>
                  <div className="box">
                    <div className="prompt">{prompt}</div>
                    <button className="btn" style={{ marginTop: 8 }} onClick={async () => {
                      try { await navigator.clipboard.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard blocked */ }
                    }}>{copied ? "Copied" : "Copy prompt"}</button>
                  </div>
                </div>
              )}
              {topic.covers.length > 0 && (
                <div><h4>Covers these rows from the original sheet</h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{topic.covers.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
                </div>
              )}
              <div>
                <h4><label htmlFor="notes">Your notes</label></h4>
                <textarea id="notes" className="notes" value={prog.notes} onChange={(e) => onNotes(e.target.value)}
                  placeholder="What clicked, what's still fuzzy, examples from your own projects…" />
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
