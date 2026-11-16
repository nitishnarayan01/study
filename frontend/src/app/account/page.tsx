"use client";

import { useState, type FormEvent } from "react";
import TopBar from "@/components/TopBar";
import { api } from "@/lib/api";
import { useAuth, useRequireAuth } from "@/lib/auth";

export default function AccountPage() {
  const { user } = useRequireAuth();
  const { refresh } = useAuth();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  if (!user) return null;

  async function submit(e: FormEvent) {
    e.preventDefault();
    setMsg("");
    setError("");
    if (next !== confirm) return setError("The new passwords don't match.");
    if (next.length < 8) return setError("Use at least 8 characters.");
    try {
      await api.changePassword(current, next);
      setCurrent(""); setNext(""); setConfirm("");
      setMsg("Password changed.");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't change password.");
    }
  }

  return (
    <>
      <TopBar />
      <main className="wrap narrow">
        <h1 style={{ fontSize: 22 }}>Account</h1>
        {user.must_change_password && <div className="notice">You're using a temporary password. Please set your own below.</div>}
        <div className="card" style={{ display: "grid", gap: 6 }}>
          <div><b>{user.name}</b></div>
          <div className="muted">{user.email} · {user.role}</div>
        </div>
        <form className="card" onSubmit={submit} style={{ display: "grid", gap: 12, maxWidth: 420 }}>
          <h2 style={{ fontSize: 16 }}>Change password</h2>
          <div className="field"><label htmlFor="cur">Current password</label>
            <input id="cur" type="password" autoComplete="current-password" required value={current} onChange={(e) => setCurrent(e.target.value)} /></div>
          <div className="field"><label htmlFor="new">New password</label>
            <input id="new" type="password" autoComplete="new-password" required value={next} onChange={(e) => setNext(e.target.value)} /></div>
          <div className="field"><label htmlFor="conf">Confirm new password</label>
            <input id="conf" type="password" autoComplete="new-password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} /></div>
          {error && <p className="error" role="alert">{error}</p>}
          {msg && <p role="status" style={{ color: "var(--s3)" }}>{msg}</p>}
          <div><button className="btn primary" type="submit">Change password</button></div>
        </form>
      </main>
    </>
  );
}
