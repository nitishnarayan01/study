"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import TopBar from "@/components/TopBar";
import { api } from "@/lib/api";
import { useAuth, useRequireAuth } from "@/lib/auth";
import { counts, hoursDone } from "@/lib/progress";
import { STATUS, type Catalog, type Progress, type TopicSummary } from "@/lib/types";

export default function Dashboard() {
  const { user } = useRequireAuth();
  const { refresh } = useAuth();
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [prog, setProg] = useState<Record<string, Progress>>({});
  const [error, setError] = useState("");
  const [cat, setCat] = useState("");
  const [q, setQ] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [fPrio, setFPrio] = useState("");
  const [fDepth, setFDepth] = useState("");
  const [fKind, setFKind] = useState("");
  const [hideDone, setHideDone] = useState(false);

  useEffect(() => {
    if (!user) return;
    Promise.all([api.catalog(), api.myProgress()])
      .then(([c, p]) => {
        setCatalog(c);
        setProg(Object.fromEntries(p.map((x) => [x.topic_id, x])));
      })
      .catch((e) => setError(e.message));
  }, [user]);

  const phaseOf = useMemo(
    () => Object.fromEntries((catalog?.categories ?? []).map((c) => [c.slug, c.phase])),
    [catalog],
  );

  if (!user) return null;
  if (error) return (<><TopBar /><div className="wrap"><p className="error">{error}</p></div></>);
  if (!catalog) return (<><TopBar /><div className="wrap muted">Loading your learning path…</div></>);

  const topics = catalog.topics;
  const st = (id: string) => prog[id]?.status ?? 0;
  const c = counts(topics, prog);
  const totalH = topics.reduce((s, t) => s + t.hours, 0);
  const done = hoursDone(topics, prog);
  const hpw = Math.max(1, user.hours_per_week || 8);
  const weeks = Math.ceil((totalH - done) / hpw);
  const finish = new Date(Date.now() + weeks * 7 * 864e5);
  const p1 = topics.filter((t) => phaseOf[t.category] === 1);

  async function cycle(t: TopicSummary) {
    const next = (st(t.id) + 1) % 4;
    setProg((p) => ({ ...p, [t.id]: { ...(p[t.id] ?? { topic_id: t.id, confidence: 0, key_points: [], notes: "" }), status: next } }));
    try {
      const saved = await api.saveProgress(t.id, { status: next });
      setProg((p) => ({ ...p, [t.id]: saved }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't save.");
    }
  }

  async function setHpw(v: number) {
    await api.updateMe({ hours_per_week: Math.min(60, Math.max(1, v || 8)) });
    await refresh();
  }

  const matches = (t: TopicSummary) => {
    if (cat && t.category !== cat) return false;
    if (fStatus !== "" && st(t.id) !== Number(fStatus)) return false;
    if (fPrio && t.priority !== fPrio) return false;
    if (fDepth && t.depth !== fDepth) return false;
    if (fKind && t.kind !== fKind) return false;
    if (hideDone && st(t.id) === 3) return false;
    if (q && !t.title.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  };

  const upNext = [...topics.filter((t) => [1, 2].includes(st(t.id))), ...topics.filter((t) => st(t.id) === 0)].slice(0, 5);

  return (
    <>
      <TopBar />
      <div className="wrap">
        {user.must_change_password && (
          <div className="notice">You’re using a temporary password. <Link href="/account">Set your own password</Link>.</div>
        )}
        <div className="strip">
          <div className="card tile">
            <div className="k">Overall progress</div>
            <div className="v">{c[3]}<small> / {topics.length} done</small></div>
            <ProgressBar c={c} />
            <div className="muted" style={{ fontSize: 13 }}>{c[1]} learning · {c[2]} practising</div>
          </div>
          <div className="card tile">
            <div className="k">Phase 1: Foundations</div>
            <div className="v">{counts(p1, prog)[3]}<small> / {p1.length}</small></div>
            <ProgressBar c={counts(p1, prog)} />
            <div className="muted" style={{ fontSize: 13 }}>{Math.round(hoursDone(p1, prog))} of {p1.reduce((s, t) => s + t.hours, 0)} hrs</div>
          </div>
          <div className="card tile">
            <div className="k">Study hours</div>
            <div className="v">{Math.round(done)}<small> / {Math.round(totalH)} hrs</small></div>
            <div className="muted" style={{ fontSize: 13 }}>Estimates, including hands-on work</div>
          </div>
          <div className="card tile">
            <div className="k">Estimated finish</div>
            <div className="v" style={{ fontSize: 20 }}>{finish.toLocaleDateString(undefined, { month: "short", year: "numeric" })}</div>
            <label className="hpw" htmlFor="hpw">
              At <input id="hpw" className="num" type="number" min={1} max={60} defaultValue={hpw}
                onBlur={(e) => setHpw(Number(e.target.value))} /> hrs / week · {weeks} weeks left
            </label>
          </div>
        </div>

        <div className="main">
          <nav className="card side" aria-label="Phases and categories">
            <button className="navbtn" aria-pressed={!cat} onClick={() => setCat("")}>
              <span>Everything</span><span className="ct">{c[3]}/{topics.length}</span><ProgressBar c={c} height={4} />
            </button>
            {catalog.phases.map((ph) => {
              const pl = topics.filter((t) => phaseOf[t.category] === ph.number);
              return (
                <div key={ph.number} style={{ display: "contents" }}>
                  <div className="ph"><span>Phase {ph.number} · {ph.name}</span><span className="num">{counts(pl, prog)[3]}/{pl.length}</span></div>
                  {catalog.categories.filter((x) => x.phase === ph.number).map((x) => {
                    const cl = topics.filter((t) => t.category === x.slug);
                    const cc = counts(cl, prog);
                    return (
                      <button key={x.slug} className="navbtn" aria-pressed={cat === x.slug} onClick={() => setCat(x.slug)}>
                        <span>{x.name}</span><span className="ct">{cc[3]}/{cl.length}</span><ProgressBar c={cc} height={4} />
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </nav>

          <section style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
            <div className="card filters">
              <input type="search" placeholder="Search topics…" aria-label="Search" value={q} onChange={(e) => setQ(e.target.value)} />
              <select aria-label="Status" value={fStatus} onChange={(e) => setFStatus(e.target.value)}>
                <option value="">Any status</option>
                {STATUS.map((s, i) => <option key={s} value={i}>{s}</option>)}
              </select>
              <select aria-label="Priority" value={fPrio} onChange={(e) => setFPrio(e.target.value)}>
                <option value="">Any priority</option><option>P0</option><option>P1</option><option>P2</option>
              </select>
              <select aria-label="Depth" value={fDepth} onChange={(e) => setFDepth(e.target.value)}>
                <option value="">Any depth</option><option>Understand</option><option>Use</option><option>Build</option>
              </select>
              <select aria-label="New or refresh" value={fKind} onChange={(e) => setFKind(e.target.value)}>
                <option value="">New + Refresh</option><option>New</option><option>Refresh</option>
              </select>
              <label className="muted" style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13.5 }}>
                <input type="checkbox" checked={hideDone} onChange={(e) => setHideDone(e.target.checked)} /> Hide done
              </label>
            </div>

            <div className="card">
              <h2 style={{ fontSize: 15, marginBottom: 8 }}>Up next</h2>
              <ol style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 4 }}>
                {upNext.map((t) => (
                  <li key={t.id}><Link href={`/topics/${t.id}`}>{t.title}</Link> <span className="chip">{STATUS[st(t.id)]}</span></li>
                ))}
              </ol>
            </div>

            {catalog.categories.map((x) => {
              const list = topics.filter((t) => t.category === x.slug && matches(t));
              if (!list.length) return null;
              const all = topics.filter((t) => t.category === x.slug);
              return (
                <div className="card group" key={x.slug}>
                  <h3>
                    <span>{x.name}</span>
                    <small>Phase {x.phase} · {counts(all, prog)[3]} of {all.length} done · {all.reduce((s, t) => s + t.hours, 0)} hrs</small>
                  </h3>
                  {list.map((t) => {
                    const p = prog[t.id];
                    const kpd = (p?.key_points ?? []).filter(Boolean).length;
                    return (
                      <div className="row" key={t.id}>
                        <button className={`pill st${st(t.id)}`} onClick={() => cycle(t)} title="Change status">{STATUS[st(t.id)]}</button>
                        <div>
                          <Link className="t" href={`/topics/${t.id}`}>{t.title}</Link>
                          <div className="meta">
                            <span className={`chip ${t.priority === "P0" ? "p0" : ""}`}>{t.priority}</span>
                            <span className="chip">{t.depth}</span>
                            {t.kind === "Refresh" && <span className="chip ref">Refresh</span>}
                            {t.has_lesson && <span className="chip les">Lesson</span>}
                            {t.status === "outline" && <span className="chip out">Outline</span>}
                          </div>
                        </div>
                        <div className="right">
                          <span className="num">{t.hours} h</span>
                          {t.concept_count > 0 && <span className="num">{kpd}/{t.concept_count} pts</span>}
                          {!!p?.confidence && <span>{"★".repeat(p.confidence)}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </section>
        </div>
      </div>
    </>
  );
}
