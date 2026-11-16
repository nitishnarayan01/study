"use client";

import Link from "next/link";
import { useState } from "react";
import TopBar from "@/components/TopBar";
import { StatusIcon } from "@/components/ui";
import { useRequireAuth } from "@/lib/auth";
import { hoursLabel, orderedTopics, statusOf } from "@/lib/curriculum";
import { STATUS, type TopicSummary } from "@/lib/types";
import { useLearning } from "@/lib/useLearning";

export default function Browse() {
  const { user } = useRequireAuth();
  const { catalog, prog, error, setStatus } = useLearning(user);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [fPrio, setFPrio] = useState("");
  const [fDepth, setFDepth] = useState("");
  const [hideDone, setHideDone] = useState(false);

  if (!user) return null;
  if (error) return (<><TopBar /><div className="wrap"><p className="error">{error}</p></div></>);
  if (!catalog) return (<><TopBar /><div className="wrap"><div className="skeleton" /></div></>);

  const all = orderedTopics(catalog);
  const matches = (t: TopicSummary) => {
    const st = statusOf(prog, t.id);
    if (cat && t.category !== cat) return false;
    if (fStatus !== "" && st !== Number(fStatus)) return false;
    if (fPrio && t.priority !== fPrio) return false;
    if (fDepth && t.depth !== fDepth) return false;
    if (hideDone && st === 3) return false;
    if (q && !t.title.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  };
  const shown = all.filter(matches);
  const filtered = !!(q || cat || fStatus || fPrio || fDepth || hideDone);

  return (
    <>
      <TopBar />
      <main className="wrap">
        <div className="page-head">
          <h1>All topics</h1>
          <p className="muted">Search and filter all {all.length} topics across every course.</p>
        </div>

        <div className="card filters">
          <input type="search" placeholder="Search topics, e.g. RAG, Docker, PRD…" aria-label="Search topics" value={q}
            onChange={(e) => setQ(e.target.value)} />
          <select aria-label="Section" value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="">All sections</option>
            {catalog.phases.map((ph) => (
              <optgroup key={ph.number} label={`Phase ${ph.number}: ${ph.name}`}>
                {catalog.categories.filter((c) => c.phase === ph.number).map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
          <select aria-label="Status" value={fStatus} onChange={(e) => setFStatus(e.target.value)}>
            <option value="">Any status</option>
            {STATUS.map((s, i) => <option key={s} value={i}>{s}</option>)}
          </select>
          <select aria-label="Priority" value={fPrio} onChange={(e) => setFPrio(e.target.value)}>
            <option value="">Core and optional</option><option value="P0">Core (P0)</option><option value="P1">P1</option><option value="P2">P2</option>
          </select>
          <select aria-label="Depth" value={fDepth} onChange={(e) => setFDepth(e.target.value)}>
            <option value="">Any depth</option><option>Understand</option><option>Use</option><option>Build</option>
          </select>
          <label className="muted check">
            <input type="checkbox" checked={hideDone} onChange={(e) => setHideDone(e.target.checked)} /> Hide done
          </label>
        </div>

        <p className="muted small" role="status">{filtered ? `${shown.length} of ${all.length} topics` : `${all.length} topics`}</p>

        <div className="card list">
          {shown.map((t) => {
            const st = statusOf(prog, t.id);
            const c = catalog.categories.find((x) => x.slug === t.category);
            return (
              <div className="row" key={t.id}>
                <button className="icon-btn" onClick={() => setStatus(t.id, st === 3 ? 0 : 3)}
                  title={st === 3 ? "Mark as not started" : "Mark as done"} aria-label={`${t.title}: ${STATUS[st]}. Toggle done`}>
                  <StatusIcon status={st} size={20} />
                </button>
                <div>
                  <Link className="t" href={`/topics/${t.id}`}>{t.title}</Link>
                  <div className="meta">
                    <span>Phase {c?.phase} · {c?.name}</span>
                    {t.priority === "P0" && <span className="tag core">Core</span>}
                    <span className="tag">{t.depth}</span>
                    {t.kind === "Refresh" && <span className="tag">Refresher</span>}
                  </div>
                </div>
                <span className="num muted small">{hoursLabel(t.hours)}</span>
              </div>
            );
          })}
          {!shown.length && <p className="muted" style={{ padding: 16 }}>No topics match these filters.</p>}
        </div>
      </main>
    </>
  );
}
