from tests.conftest import auth


def test_health(client):
    assert client.get("/api/health").json() == {"status": "ok"}


# ---------- auth ----------
def test_login_wrong_password(client):
    r = client.post("/api/auth/login", json={"email": "learner@acme.com", "password": "nope"})
    assert r.status_code == 401


def test_requires_token(client):
    assert client.get("/api/catalog").status_code == 401


def test_me_and_update(client, learner_h):
    me = client.get("/api/auth/me", headers=learner_h).json()
    assert me["role"] == "learner"
    r = client.patch("/api/auth/me", json={"hours_per_week": 10}, headers=learner_h)
    assert r.json()["hours_per_week"] == 10


def test_change_password(client, learner_h):
    r = client.post("/api/auth/change-password",
                    json={"current_password": "LearnerPass1", "new_password": "NewPass1234"}, headers=learner_h)
    assert r.status_code == 204
    auth(client, "learner@acme.com", "NewPass1234")


def test_seeded_admin_must_change_password(client, admin_h):
    assert client.get("/api/auth/me", headers=admin_h).json()["must_change_password"] is True


# ---------- catalog ----------
def test_catalog_has_all_content(client, learner_h):
    c = client.get("/api/catalog", headers=learner_h).json()
    assert len(c["phases"]) == 6
    assert len(c["categories"]) == 14
    assert len(c["topics"]) == 203
    assert sum(t["has_lesson"] for t in c["topics"]) == 63


def test_topic_detail_with_lesson_and_resources(client, learner_h):
    t = client.get("/api/topics/aif13", headers=learner_h).json()
    assert t["title"].startswith("RAG")
    assert t["lesson"]["quiz"]
    assert all(r["url"].startswith("https://") for r in t["resources"])


def test_unknown_topic_404(client, learner_h):
    assert client.get("/api/topics/nope", headers=learner_h).status_code == 404


def test_learner_cannot_edit_content(client, learner_h):
    r = client.put("/api/topics/aif13/lesson", json={"sections": []}, headers=learner_h)
    assert r.status_code == 403


def test_admin_creates_and_edits_topic(client, admin_h):
    body = {"id": "abt99", "category": "ai-builder-toolkit", "title": "Test topic", "hours": 2}
    assert client.post("/api/topics", json=body, headers=admin_h).status_code == 201
    upd = dict(body)
    upd.pop("id")
    upd["title"] = "Renamed"
    assert client.put("/api/topics/abt99", json=upd, headers=admin_h).json()["title"] == "Renamed"
    r = client.put("/api/topics/abt99/lesson", json={"sections": [{"h": "Intro", "p": ["Hello"]}]}, headers=admin_h)
    assert r.json()["lesson"]["sections"][0]["h"] == "Intro"
    assert client.delete("/api/topics/abt99", headers=admin_h).status_code == 204


def test_create_topic_bad_category(client, admin_h):
    r = client.post("/api/topics", json={"id": "x1", "category": "missing", "title": "X"}, headers=admin_h)
    assert r.status_code == 400


# ---------- progress ----------
def test_progress_upsert_is_partial_and_per_user(client, learner_h):
    r = client.put("/api/progress/me/hsw01", json={"status": 1, "key_points": [True, False]}, headers=learner_h)
    assert r.status_code == 200
    r = client.put("/api/progress/me/hsw01", json={"notes": "DNS first"}, headers=learner_h)
    p = r.json()
    assert p["status"] == 1 and p["notes"] == "DNS first" and p["key_points"] == [True, False]
    other = auth(client, "other@acme.com", "OtherPass1")
    assert client.get("/api/progress/me", headers=other).json() == []


def test_progress_validation(client, learner_h):
    assert client.put("/api/progress/me/hsw01", json={"status": 9}, headers=learner_h).status_code == 422


# ---------- users & teams ----------
def test_admin_creates_user_who_can_log_in(client, admin_h):
    teams = client.get("/api/teams", headers=admin_h).json()
    r = client.post("/api/users", json={"email": "New@Acme.com", "name": "New Person", "role": "learner",
                                        "team_id": teams[0]["id"], "temporary_password": "TempPass123"},
                    headers=admin_h)
    assert r.status_code == 201 and r.json()["must_change_password"] is True
    auth(client, "new@acme.com", "TempPass123")


def test_duplicate_user_rejected(client, admin_h):
    r = client.post("/api/users", json={"email": "learner@acme.com", "name": "Dup",
                                        "temporary_password": "TempPass123"}, headers=admin_h)
    assert r.status_code == 409


def test_admin_cannot_demote_self(client, admin_h):
    me = client.get("/api/auth/me", headers=admin_h).json()
    assert client.patch(f"/api/users/{me['id']}", json={"role": "learner"}, headers=admin_h).status_code == 400


def test_learner_cannot_list_users(client, learner_h):
    assert client.get("/api/users", headers=learner_h).status_code == 403


def test_manager_sees_only_own_team(client, manager_h, learner_h):
    client.put("/api/progress/me/hsw01", json={"status": 3}, headers=learner_h)
    teams = client.get("/api/teams", headers=manager_h).json()
    assert [t["name"] for t in teams] == ["Team A"]
    r = client.get(f"/api/teams/{teams[0]['id']}/progress", headers=manager_h).json()
    lee = next(m for m in r["members"] if m["email"] == "learner@acme.com")
    assert lee["done"] == 1 and lee["total"] == 203 and lee["by_phase"]["1"]["done"] == 1


def test_manager_blocked_from_other_team(client, manager_h, admin_h):
    team_b = next(t for t in client.get("/api/teams", headers=admin_h).json() if t["name"] == "Team B")
    assert client.get(f"/api/teams/{team_b['id']}/progress", headers=manager_h).status_code == 403


def test_deactivated_user_cannot_use_token(client, admin_h, learner_h):
    users = client.get("/api/users", headers=admin_h).json()
    lee = next(u for u in users if u["email"] == "learner@acme.com")
    client.patch(f"/api/users/{lee['id']}", json={"is_active": False}, headers=admin_h)
    assert client.get("/api/catalog", headers=learner_h).status_code == 401
