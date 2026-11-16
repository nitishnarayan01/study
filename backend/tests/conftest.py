import os

# Tests use a throwaway SQLite database so they run anywhere (including CI) without Postgres.
os.environ["DATABASE_URL"] = "sqlite:///./test.db"
os.environ["JWT_SECRET"] = "test-secret"
os.environ["ADMIN_EMAIL"] = "admin@acme.com"
os.environ["ADMIN_PASSWORD"] = "AdminPass123"

import json  # noqa: E402

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

from app.db import Base, SessionLocal, engine  # noqa: E402
from app.main import app  # noqa: E402
from app.models import Team, User  # noqa: E402
from app.security import hash_password  # noqa: E402
from app.seed.seed import DEFAULT_FILE, ensure_admin, load_content  # noqa: E402


@pytest.fixture(autouse=True)
def fresh_db():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)
    with SessionLocal() as db:
        load_content(db, json.loads(DEFAULT_FILE.read_text(encoding="utf-8")))
        ensure_admin(db)
        team_a = Team(name="Team A")
        team_b = Team(name="Team B")
        db.add_all([team_a, team_b])
        db.flush()
        db.add_all([
            User(email="manager@acme.com", name="Mona Manager", role="manager", team_id=team_a.id,
                 password_hash=hash_password("ManagerPass1")),
            User(email="learner@acme.com", name="Lee Learner", role="learner", team_id=team_a.id,
                 password_hash=hash_password("LearnerPass1")),
            User(email="other@acme.com", name="Otto Other", role="learner", team_id=team_b.id,
                 password_hash=hash_password("OtherPass1")),
        ])
        db.commit()
    yield


@pytest.fixture
def client():
    return TestClient(app)


def auth(client, email, password):
    r = client.post("/api/auth/login", json={"email": email, "password": password})
    assert r.status_code == 200, r.text
    return {"Authorization": f"Bearer {r.json()['access_token']}"}


@pytest.fixture
def admin_h(client):
    return auth(client, "admin@acme.com", "AdminPass123")


@pytest.fixture
def manager_h(client):
    return auth(client, "manager@acme.com", "ManagerPass1")


@pytest.fixture
def learner_h(client):
    return auth(client, "learner@acme.com", "LearnerPass1")
