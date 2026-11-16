"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import LessonView from "@/components/LessonView";
import TopBar from "@/components/TopBar";
import { api } from "@/lib/api";
import { useRequireAuth } from "@/lib/auth";
import type { Category, Lesson, Resource } from "@/lib/types";

const LESSON_TEMPLATE: Lesson = {
  sections: [
    { h: "The problem it solves", p: ["…"] },
    { h: "How it works", steps: [["Step one", "…"]] },
    { h: "Worked example", p: ["…"] },
    { h: "What a TPM should do with this", bullets: ["…"] },
    { h: "Glossary", gloss: [["Term", "Definition"]] },
  ],
  quiz: [["Question?", "Answer."]],
  deeper: [],
};

interface Form {
  id: string; category: string; title: string; depth: string; priority: string; kind: string;
  hours: number; status: string; summary: string; why: string; concepts: string; resources: string;
  do_it: string; prove: string; interview: string; covers: string;
}

const lines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);

export default function EditTopic() {
  const { user } = useRequireAuth(["admin"]);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = id === "new";
  const [cats, setCats] = useState<Category[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [f, setF] = useState<Form | null>(null);
  const [lessonText, setLessonText] = useState("");
  const [preview, setPreview] = useState<Lesson | null>(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const [c, r] = await Promise.all([api.catalog(), api.resources()]);
        setCats(c.categories); setResources(r);
        if (isNew) {
          setF({ id: "", category: c.categories[0]?.slug ?? "", title: "", depth: "Understand", priority: "P1", kind: "New", hours: 2, status: "outline",
            summary: "", why: "", concepts: "", resources: "", do_it: "", prove: "", interview: "", covers: "" });
          setLessonText(JSON.stringify(LESSON_TEMPLATE, null, 2));
        } else {
          const t = await api.topic(id);
          setF({ id: t.id, category: t.category, title: t.title, depth: t.depth, priority: t.priority, kind: t.kind, hours: t.hours, status: t.status,
            summary: t.summary, why: t.why, concepts: t.concepts.join("\n"), resources: t.resources.map((x) => x.key).join("\n"),
            do_it: t.do_it, prove: t.prove, interview: t.interview, covers: t.covers.join("\n") });
          setLessonText(JSON.stringify(t.lesson ?? LESSON_TEMPLATE, null, 2));
        }
      } catch (e) { setError(e instanceof Error ? e.message : "Couldn't load."); }
    })();
  }, [user, id, isNew]);

  if (!user) return null;
  if (!f) return (<><TopBar /><div className="wrap narrow muted">{error || "Loading…"}</div></>);

  const set = (k: keyof Form) => (e: { target: { value: string } }) => setF({ ...f, [k]: k === "hours" ? Number(e.target.value) : e.target.value });

  async function saveTopic(e: FormEvent) {
    e.preventDefault(); setError(""); setMsg("");
    if (!f) return;
    const body = {
      category: f.category, title: f.title, depth: f.depth, priority: f.priority, kind: f.kind, hours: f.hours, status: f.status,
      summary: f.summary, why: f.why, concepts: lines(f.concepts), resources: lines(f.resources),
      do_it: f.do_it, prove: f.prove, interview: f.interview, covers: lines(f.covers),
    };
    try {
      if (isNew) { await api.createTopic({ id: f.id, ...body }); router.replace(`/admin/topics/${f.id}`); }
      else { await api.updateTopic(id, body); }
      setMsg("Topic saved.");
    } catch (err) { setError(err instanceof Error ? err.message : "Couldn't save topic."); }
  }

  function parseLesson(): Lesson | null {
    try {
      const l = JSON.parse(lessonText) as Lesson;
      if (!Array.isArray(l.sections)) throw new Error("Lesson needs a 'sections' list.");
      l.quiz = l.quiz ?? []; l.deeper = l.deeper ?? [];
      return l;
    } catch (err) {
      setError(`Lesson JSON problem: ${err instanceof Error ? err.message : "invalid JSON"}`);
      return null;
    }
  }

  async function saveLesson() {
    setError(""); setMsg("");
    if (isNew) return setError("Save the topic first, then its lesson.");
    const l = parseLesson();
    if (!l) return;
    try { await api.saveLesson(id, l); setMsg("Lesson saved."); } catch (err) { setError(err instanceof Error ? err.message : "Couldn't save lesson."); }
  }

  return (
    <>
      <TopBar />
      <main className="wrap narrow">
        <div className="crumbs"><Link href="/admin">Admin</Link> · Content</div>
        <h1 style={{ fontSize: 22 }}>{isNew ? "New topic" : `Edit: ${f.title}`}</h1>
        {error && <p className="error" role="alert">{error}</p>}
        {msg && <p role="status" style={{ color: "var(--s3)" }}>{msg}</p>}

        <form className="card" onSubmit={saveTopic} style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
            <div className="field"><label htmlFor="t-id">ID</label><input id="t-id" required disabled={!isNew} value={f.id} onChange={set("id")} placeholder="e.g. abt20" /></div>
            <div className="field"><label htmlFor="t-cat">Category</label>
              <select id="t-cat" value={f.category} onChange={set("category")}>{cats.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></div>
            <div className="field"><label htmlFor="t-depth">Depth</label>
              <select id="t-depth" value={f.depth} onChange={set("depth")}><option>Understand</option><option>Use</option><option>Build</option></select></div>
            <div className="field"><label htmlFor="t-prio">Priority</label>
              <select id="t-prio" value={f.priority} onChange={set("priority")}><option>P0</option><option>P1</option><option>P2</option></select></div>
            <div className="field"><label htmlFor="t-kind">Type</label>
              <select id="t-kind" value={f.kind} onChange={set("kind")}><option>New</option><option>Refresh</option></select></div>
            <div className="field"><label htmlFor="t-hours">Hours</label><input id="t-hours" type="number" step="0.5" min="0.5" value={f.hours} onChange={set("hours")} /></div>
            <div className="field"><label htmlFor="t-status">Status</label>
              <select id="t-status" value={f.status} onChange={set("status")}><option value="outline">Outline</option><option value="full">Full</option></select></div>
          </div>
          <div className="field"><label htmlFor="t-title">Title</label><input id="t-title" required value={f.title} onChange={set("title")} /></div>
          <div className="field"><label htmlFor="t-sum">What it is</label><textarea id="t-sum" rows={3} value={f.summary} onChange={set("summary")} /></div>
          <div className="field"><label htmlFor="t-why">Why it matters to a TPM</label><textarea id="t-why" rows={3} value={f.why} onChange={set("why")} /></div>
          <div className="field"><label htmlFor="t-con">Key points (one per line)</label><textarea id="t-con" rows={5} value={f.concepts} onChange={set("concepts")} /></div>
          <div className="field"><label htmlFor="t-res">Resource keys (one per line)</label><textarea id="t-res" rows={3} value={f.resources} onChange={set("resources")} />
            <span className="muted" style={{ fontSize: 12.5 }}>Available: {resources.map((r) => r.key).join(", ")}</span></div>
          <div className="field"><label htmlFor="t-do">Do it</label><textarea id="t-do" rows={3} value={f.do_it} onChange={set("do_it")} /></div>
          <div className="field"><label htmlFor="t-prove">Prove it</label><textarea id="t-prove" rows={2} value={f.prove} onChange={set("prove")} /></div>
          <div className="field"><label htmlFor="t-int">Interview question</label><input id="t-int" value={f.interview} onChange={set("interview")} /></div>
          <div className="field"><label htmlFor="t-cov">Sheet rows covered (one per line)</label><textarea id="t-cov" rows={3} value={f.covers} onChange={set("covers")} /></div>
          <div><button className="btn primary" type="submit">Save topic</button></div>
        </form>

        <div className="card" style={{ display: "grid", gap: 10 }}>
          <h2 style={{ fontSize: 16 }}>Lesson</h2>
          <p className="muted" style={{ margin: 0, fontSize: 13.5 }}>
            Edit as JSON. Section fields: h (heading), p (paragraphs), steps, table, bullets, gloss, mis, flow. Quiz is a list of [question, answer]; deeper is a list of resource keys.
          </p>
          <textarea className="notes" style={{ minHeight: 360, fontFamily: "var(--mono)", fontSize: 13 }} aria-label="Lesson JSON"
            value={lessonText} onChange={(e) => setLessonText(e.target.value)} />
          <div className="ctrl">
            <button className="btn" type="button" onClick={() => { setError(""); setPreview(parseLesson()); }}>Preview</button>
            <button className="btn primary" type="button" onClick={saveLesson}>Save lesson</button>
          </div>
          {preview && <div className="box"><LessonView lesson={preview} resources={resources} /></div>}
        </div>
      </main>
    </>
  );
}
