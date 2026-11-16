export default function ProgressBar({ c, height }: { c: number[]; height?: number }) {
  const n = c.reduce((a, b) => a + b, 0) || 1;
  return (
    <div className="bar" aria-hidden="true" style={height ? { height } : undefined}>
      <span style={{ width: `${(c[3] / n) * 100}%`, background: "var(--s3)" }} />
      <span style={{ width: `${(c[2] / n) * 100}%`, background: "var(--s2)" }} />
      <span style={{ width: `${(c[1] / n) * 100}%`, background: "var(--s1)" }} />
    </div>
  );
}
