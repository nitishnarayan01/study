"use client";

import { useCallback, useEffect, useState } from "react";
import { THEME_KEY as KEY } from "./themeBoot";

export type ThemeChoice = "light" | "dark" | "system";

function readChoice(): ThemeChoice {
  try {
    const t = localStorage.getItem(KEY);
    return t === "light" || t === "dark" ? t : "system";
  } catch {
    return "system";
  }
}

function systemIsDark() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function apply(choice: ThemeChoice) {
  const el = document.documentElement;
  if (choice === "system") delete el.dataset.theme;
  else el.dataset.theme = choice;
  try {
    if (choice === "system") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, choice);
  } catch {
    /* storage unavailable: the choice lasts until the page is closed */
  }
  window.dispatchEvent(new Event("tpm-theme"));
}

/** The saved choice (light, dark or follow the device) and the theme actually showing. */
export function useTheme() {
  const [choice, setChoice] = useState<ThemeChoice>("system");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sync = () => {
      const c = readChoice();
      setChoice(c);
      setDark(c === "dark" || (c === "system" && systemIsDark()));
    };
    sync();
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", sync);
    window.addEventListener("tpm-theme", sync);
    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("tpm-theme", sync);
    };
  }, []);

  const choose = useCallback((c: ThemeChoice) => apply(c), []);
  const toggle = useCallback(() => apply(dark ? "light" : "dark"), [dark]);
  return { choice, dark, choose, toggle };
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { dark, toggle } = useTheme();
  const label = dark ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button type="button" className={`theme-btn ${className}`} onClick={toggle} aria-label={label} title={label}>
      {dark ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />
        </svg>
      )}
    </button>
  );
}

export function ThemePicker() {
  const { choice, choose } = useTheme();
  const opts: [ThemeChoice, string][] = [["light", "Light"], ["dark", "Dark"], ["system", "Match my device"]];
  return (
    <div className="seg" role="group" aria-label="Appearance">
      {opts.map(([v, label]) => (
        <button key={v} type="button" aria-pressed={choice === v} onClick={() => choose(v)}>{label}</button>
      ))}
    </div>
  );
}
