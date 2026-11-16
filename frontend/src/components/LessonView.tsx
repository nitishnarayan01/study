import type { Lesson, Resource } from "@/lib/types";

export function readingMinutes(lesson: Lesson): number {
  const words = JSON.stringify(lesson).split(/\s+/).length;
  return Math.max(5, Math.round(words / 180));
}

export default function LessonView({ lesson, resources }: { lesson: Lesson; resources: Resource[] }) {
  const byKey = Object.fromEntries(resources.map((r) => [r.key, r]));
  const n = lesson.sections.length;
  return (
    <div className="lesson">
      {lesson.sections.map((s, i) => (
        <section key={i}>
          <h3><span className="hn num">{i + 1}</span>{s.h.replace(/^\d+\.\s*/, "")}</h3>
          {s.p?.map((t, j) => <p key={j}>{t}</p>)}
          {s.flow && (
            <div className="flow" role="img" aria-label={s.flowLabel || "Diagram"}>
              {s.flow.map(([lane, boxes], li) => (
                <div key={li} style={{ display: "contents" }}>
                  <div className="lane">{lane}</div>
                  {boxes.map(([title, sub], bi) => (
                    <div className="b" key={bi}>{title}<small>{sub}</small></div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {s.steps && (
            <ol className="steps">
              {s.steps.map((step, j) => (
                <li key={j}>{typeof step === "string" ? step : <><b>{step[0].replace(/\.$/, "")}.</b> {step[1]}</>}</li>
              ))}
            </ol>
          )}
          {s.table && (
            <div className="tblw">
              <table className="lt">
                <thead><tr>{s.table[0].map((c, j) => <th key={j}>{c}</th>)}</tr></thead>
                <tbody>
                  {s.table.slice(1).map((r, j) => (
                    <tr key={j}>{r.map((c, k) => <td key={k}>{c}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {s.bullets && <ul>{s.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>}
          {s.mis && (
            <ul>
              {s.mis.map(([myth, reality], j) => (
                <li key={j}><b>Myth:</b> {myth} <b>Reality:</b> {reality}</li>
              ))}
            </ul>
          )}
          {s.gloss && (
            <dl className="gl">
              {s.gloss.map(([term, def], j) => (
                <div key={j} style={{ display: "contents" }}><dt>{term}</dt><dd>{def}</dd></div>
              ))}
            </dl>
          )}
        </section>
      ))}
      {lesson.quiz.length > 0 && (
        <section>
          <h3><span className="hn num">{n + 1}</span>Self-check</h3>
          <p className="muted small">Answer in your head first, then open each question to check.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {lesson.quiz.map(([q, a], j) => (
              <details className="q" key={j}><summary>{j + 1}. {q}</summary><p>{a}</p></details>
            ))}
          </div>
        </section>
      )}
      {lesson.deeper.length > 0 && (
        <section>
          <h3><span className="hn num">{n + 2}</span>Go deeper</h3>
          <ul>
            {lesson.deeper.filter((k) => byKey[k]).map((k) => (
              <li key={k}><a href={byKey[k].url} target="_blank" rel="noopener noreferrer">{byKey[k].title}</a></li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
