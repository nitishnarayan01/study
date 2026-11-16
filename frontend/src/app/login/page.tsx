"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) router.replace(user.must_change_password ? "/account" : "/dashboard");
  }, [user, router]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const me = await login(email, password);
      router.replace(me.must_change_password ? "/account" : "/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="center">
      <form className="card authcard" onSubmit={submit}>
        <div>
          <h1 style={{ fontSize: 22 }}>TPM Learning Hub</h1>
          <p className="muted" style={{ margin: "4px 0 0" }}>Log in to continue your learning path.</p>
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="btn primary" type="submit" disabled={busy}>{busy ? "Logging in…" : "Log in"}</button>
        <p className="muted" style={{ fontSize: 13, margin: 0 }}>No account? Ask your admin to create one for you.</p>
      </form>
    </main>
  );
}
