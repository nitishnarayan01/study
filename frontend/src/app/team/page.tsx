"use client";

import { useEffect, useState } from "react";
import TopBar from "@/components/TopBar";
import { api } from "@/lib/api";
import { useRequireAuth } from "@/lib/auth";
import type { Phase, Team, TeamProgress } from "@/lib/types";

export default function TeamPage() {
  const { user } = useRequireAuth(["admin", "manager"]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [teamId, setTeamId] = useState<number | null>(null);
  const [data, setData] = useState<TeamProgress | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    Promise.all([api.teams(), api.catalog()])
      .then(([t, c]) => {
        setTeams(t);
        setPhases(c.phases);
        setTeamId(user.team_id && t.some((x) => x.id === user.team_id) ? user.team_id : t[0]?.id ?? null);
      })
      .catch((e) => setError(e.message));
  }, [user]);

  useEffect(() => {
    if (teamId == null) return;
    setData(null);
    api.teamProgress(teamId).then(setData).catch((e) => setError(e.message));
  }, [teamId]);

  if (!user) return null;
  return (
    <>
      <TopBar />
      <main className="wrap">
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
          <h1 style={{ fontSize: 22 }}>Team progress</h1>
          {teams.length > 1 && (
            <select className="input" aria-label="Team" value={teamId ?? ""} onChange={(e) => setTeamId(Number(e.target.value))}>
              {teams.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          )}
        </div>
        {error && <p className="error">{error}</p>}
        {!teams.length && !error && <p className="muted">No team assigned yet. Ask an admin to add you to a team.</p>}
        {data && (
          <div className="card tblw">
            {data.members.length === 0 ? <p className="muted">No active members in {data.team.name}.</p> : (
              <table className="grid">
                <thead>
                  <tr>
                    <th>Member</th><th>Done</th><th>In progress</th><th>Hours</th>
                    {phases.map((p) => <th key={p.number} title={p.name}>Phase {p.number}</th>)}
                    <th>Last active</th>
                  </tr>
                </thead>
                <tbody>
                  {data.members.map((m) => (
                    <tr key={m.user_id}>
                      <td><b>{m.name}</b><div className="muted" style={{ fontSize: 12.5 }}>{m.email}</div></td>
                      <td className="num">{m.done}/{m.total}</td>
                      <td className="num">{m.in_progress}</td>
                      <td className="num">{m.hours_done}</td>
                      {phases.map((p) => {
                        const b = m.by_phase[String(p.number)];
                        return <td key={p.number} className="num">{b ? `${b.done} done${b.in_progress ? ` · ${b.in_progress} active` : ""}` : "–"}</td>;
                      })}
                      <td className="muted">{m.last_activity ? new Date(m.last_activity).toLocaleDateString() : "Not started"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </>
  );
}
