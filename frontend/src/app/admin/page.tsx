"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import TopBar from "@/components/TopBar";
import { api } from "@/lib/api";
import { useRequireAuth } from "@/lib/auth";
import type { Catalog, Role, Team, User } from "@/lib/types";

type Tab = "users" | "teams" | "content";

export default function AdminPage() {
  const { user } = useRequireAuth(["admin"]);
  const [tab, setTab] = useState<Tab>("users");
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  async function load() {
    try {
      const [u, t, c] = await Promise.all([api.users(), api.teams(), api.catalog()]);
      setUsers(u); setTeams(t); setCatalog(c);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn't load admin data.");
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (user) load(); }, [user]);

  // new user form
  const [nu, setNu] = useState({ email: "", name: "", role: "learner" as Role, team_id: "", temporary_password: "" });
  async function addUser(e: FormEvent) {
    e.preventDefault(); setError(""); setMsg("");
    try {
      await api.createUser({ ...nu, team_id: nu.team_id ? Number(nu.team_id) : null });
      setMsg(`Created ${nu.email}. Share the temporary password with them; they'll be asked to change it.`);
      setNu({ email: "", name: "", role: "learner", team_id: "", temporary_password: "" });
      load();
    } catch (err) { setError(err instanceof Error ? err.message : "Couldn't create user."); }
  }
  async function patchUser(id: number, body: Parameters<typeof api.updateUser>[1]) {
    setError("");
    try { await api.updateUser(id, body); load(); } catch (err) { setError(err instanceof Error ? err.message : "Couldn't update user."); }
  }

  const [teamName, setTeamName] = useState("");
  async function addTeam(e: FormEvent) {
    e.preventDefault(); setError("");
    try { await api.createTeam(teamName); setTeamName(""); load(); } catch (err) { setError(err instanceof Error ? err.message : "Couldn't create team."); }
  }

  if (!user) return null;
  const teamName_ = (id: number | null) => teams.find((t) => t.id === id)?.name ?? "—";

  return (
    <>
      <TopBar />
      <main className="wrap">
        <h1 style={{ fontSize: 22 }}>Admin</h1>
        <div className="tabs" role="tablist">
          {(["users", "teams", "content"] as Tab[]).map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}>
              {t === "users" ? `Users (${users.length})` : t === "teams" ? `Teams (${teams.length})` : `Content (${catalog?.topics.length ?? 0})`}
            </button>
          ))}
        </div>
        {error && <p className="error" role="alert">{error}</p>}
        {msg && <p role="status" style={{ color: "var(--s3)" }}>{msg}</p>}

        {tab === "users" && (
          <>
            <form className="card" onSubmit={addUser} style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", alignItems: "end" }}>
              <div className="field"><label htmlFor="nu-name">Name</label><input id="nu-name" required value={nu.name} onChange={(e) => setNu({ ...nu, name: e.target.value })} /></div>
              <div className="field"><label htmlFor="nu-email">Email</label><input id="nu-email" type="email" required value={nu.email} onChange={(e) => setNu({ ...nu, email: e.target.value })} /></div>
              <div className="field"><label htmlFor="nu-role">Role</label>
                <select id="nu-role" value={nu.role} onChange={(e) => setNu({ ...nu, role: e.target.value as Role })}>
                  <option value="learner">Learner</option><option value="manager">Manager</option><option value="admin">Admin</option>
                </select></div>
              <div className="field"><label htmlFor="nu-team">Team</label>
                <select id="nu-team" value={nu.team_id} onChange={(e) => setNu({ ...nu, team_id: e.target.value })}>
                  <option value="">No team</option>{teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select></div>
              <div className="field"><label htmlFor="nu-pw">Temporary password</label><input id="nu-pw" minLength={8} required value={nu.temporary_password} onChange={(e) => setNu({ ...nu, temporary_password: e.target.value })} /></div>
              <button className="btn primary" type="submit">Add user</button>
            </form>
            <div className="card tblw">
              <table className="grid">
                <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Team</th><th>Status</th></tr></thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}{u.must_change_password && <span className="chip" style={{ marginLeft: 6 }}>temp password</span>}</td>
                      <td>{u.email}</td>
                      <td>
                        <select className="input" aria-label={`Role for ${u.name}`} value={u.role} onChange={(e) => patchUser(u.id, { role: e.target.value as Role })}>
                          <option value="learner">Learner</option><option value="manager">Manager</option><option value="admin">Admin</option>
                        </select>
                      </td>
                      <td>
                        <select className="input" aria-label={`Team for ${u.name}`} value={u.team_id ?? ""} onChange={(e) => patchUser(u.id, { team_id: e.target.value ? Number(e.target.value) : null })}>
                          <option value="">No team</option>{teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                      </td>
                      <td>
                        <button className="btn" onClick={() => patchUser(u.id, { is_active: !u.is_active })}>{u.is_active ? "Deactivate" : "Reactivate"}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "teams" && (
          <>
            <form className="card" onSubmit={addTeam} style={{ display: "flex", gap: 10, alignItems: "end", flexWrap: "wrap" }}>
              <div className="field" style={{ flex: "1 1 240px" }}><label htmlFor="tn">New team name</label><input id="tn" required value={teamName} onChange={(e) => setTeamName(e.target.value)} /></div>
              <button className="btn primary" type="submit">Add team</button>
            </form>
            <div className="card tblw">
              <table className="grid">
                <thead><tr><th>Team</th><th>Members</th></tr></thead>
                <tbody>
                  {teams.map((t) => (
                    <tr key={t.id}><td>{t.name}</td><td>{users.filter((u) => u.team_id === t.id).map((u) => u.name).join(", ") || "—"}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="muted" style={{ fontSize: 13 }}>Assign people to teams from the Users tab. Managers see progress for their own team only.</p>
          </>
        )}

        {tab === "content" && catalog && (
          <div className="card tblw">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
              <span className="muted">{catalog.topics.filter((t) => t.has_lesson).length} of {catalog.topics.length} topics have a lesson.</span>
              <Link className="btn primary" href="/admin/topics/new" style={{ textDecoration: "none" }}>New topic</Link>
            </div>
            <table className="grid">
              <thead><tr><th>Topic</th><th>Category</th><th>Status</th><th>Lesson</th><th></th></tr></thead>
              <tbody>
                {catalog.topics.map((t) => (
                  <tr key={t.id}>
                    <td><span className="num muted">{t.id}</span> {t.title}</td>
                    <td>{catalog.categories.find((c) => c.slug === t.category)?.name}</td>
                    <td>{t.status}</td>
                    <td>{t.has_lesson ? "Yes" : "—"}</td>
                    <td><Link href={`/admin/topics/${t.id}`}>Edit</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab === "users" && users.length > 0 && <p className="muted" style={{ fontSize: 13 }}>Users without a team: {users.filter((u) => !u.team_id).length}. Your team: {teamName_(user.team_id)}.</p>}
      </main>
    </>
  );
}
