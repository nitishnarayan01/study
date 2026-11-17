"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import { ThemeToggle } from "@/lib/theme";

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
    <main className="auth">
      <ThemeToggle className="auth-theme" />
      <section className="auth-art" aria-hidden="true">
        <div className="auth-brand"><span className="logo">TL</span> TPM Learning Hub</div>
        <div>
          <p className="auth-big">Become an AI-enabled technical program manager.</p>
          <ul className="auth-points">
            <li>7 courses, 229 topics, from how software works to shipping apps and websites live</li>
            <li>Short lessons, hands-on exercises and interview practice</li>
            <li>Your progress saved, so you can pick up on any device</li>
          </ul>
        </div>
        <div className="auth-phases">
          {[1, 2, 3, 4, 5, 6, 7].map((n) => <span key={n} className={`ph${n}`}>{n}</span>)}
        </div>
      </section>
      <section className="auth-form">
        <form className="authcard" onSubmit={submit}>
          <div>
            <h1>Log in</h1>
            <p className="muted" style={{ margin: "4px 0 0" }}>Continue your learning path.</p>
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
          <button className="btn primary lg" type="submit" disabled={busy}>{busy ? "Logging in…" : "Log in"}</button>
          <p className="muted small" style={{ margin: 0 }}>
            No account? Ask your admin to create one for you. If the first login takes up to a minute, the server is waking up.
          </p>
        </form>
      </section>
    </main>
  );
}
