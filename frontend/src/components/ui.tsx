import { STATUS } from "@/lib/types";

/** Empty circle, half circle or tick, like a course curriculum. */
export function StatusIcon({ status, size = 18 }: { status: number; size?: number }) {
  const label = STATUS[status] ?? STATUS[0];
  if (status === 3) {
    return (
      <svg className="sicon done" width={size} height={size} viewBox="0 0 20 20" role="img" aria-label={label}>
        <circle cx="10" cy="10" r="9" />
        <path d="M6 10.5l2.6 2.6L14.2 7.4" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status > 0) {
    return (
      <svg className="sicon partial" width={size} height={size} viewBox="0 0 20 20" role="img" aria-label={label}>
        <circle cx="10" cy="10" r="8.5" fill="none" strokeWidth="1.8" />
        <path d={status === 1 ? "M10 3.5a6.5 6.5 0 0 1 0 13z" : "M10 3.5a6.5 6.5 0 1 1-6.5 6.5H10z"} />
      </svg>
    );
  }
  return (
    <svg className="sicon todo" width={size} height={size} viewBox="0 0 20 20" role="img" aria-label={label}>
      <circle cx="10" cy="10" r="8.5" fill="none" strokeWidth="1.8" />
    </svg>
  );
}

/** Circular percentage meter. */
export function Ring({ value, size = 56, label }: { value: number; size?: number; label?: string }) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="ring" style={{ width: size, height: size, ["--v" as string]: `${v}%` }}
      role="img" aria-label={label ?? `${v}% complete`}>
      <span>{v}%</span>
    </div>
  );
}

/** Thin single-colour completion bar. */
export function Meter({ value, label }: { value: number; label?: string }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="meter" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(v)}
      aria-label={label ?? "Progress"}>
      <span style={{ width: `${v}%` }} />
    </div>
  );
}
