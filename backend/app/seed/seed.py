"""Load learning content and the first admin account into the database.

Safe to run repeatedly: content is upserted by id, and progress is never touched.
Usage:  python -m app.seed.seed            (content + admin)
        python -m app.seed.seed --file path/to/content.json
"""

import argparse
import json
from pathlib import Path

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.config import get_settings
from app.db import SessionLocal
from app.models import Category, Lesson, Phase, Resource, Team, Topic, User
from app.security import hash_password

DEFAULT_FILE = Path(__file__).with_name("content.json")

TOPIC_FIELDS = (
    "category", "title", "depth", "priority", "kind", "hours", "order", "status",
    "summary", "why", "concepts", "resources", "do_it", "prove", "interview", "covers",
)


def _upsert(db: Session, model, key_value, **fields):
    obj = db.get(model, key_value)
    if obj is None:
        obj = model(**fields)
        db.add(obj)
    else:
        for k, v in fields.items():
            setattr(obj, k, v)
    return obj


def load_content(db: Session, data: dict) -> dict:
    for p in data["phases"]:
        _upsert(db, Phase, p["number"], number=p["number"], name=p["name"])
    db.flush()
    for c in data["categories"]:
        _upsert(db, Category, c["slug"], slug=c["slug"], name=c["name"], phase=c["phase"], order=c["order"])
    for r in data["resources"]:
        _upsert(db, Resource, r["key"], key=r["key"], title=r["title"], url=r["url"], kind=r["kind"])
    db.flush()
    for t in data["topics"]:
        _upsert(db, Topic, t["id"], id=t["id"], **{f: t[f] for f in TOPIC_FIELDS})
    db.flush()
    for topic_id, content in data.get("lessons", {}).items():
        _upsert(db, Lesson, topic_id, topic_id=topic_id, content=content)
    db.commit()
    return {
        "phases": len(data["phases"]), "categories": len(data["categories"]),
        "resources": len(data["resources"]), "topics": len(data["topics"]),
        "lessons": len(data.get("lessons", {})),
    }


def ensure_admin(db: Session) -> User:
    s = get_settings()
    user = db.scalar(select(User).where(func.lower(User.email) == s.admin_email.lower()))
    if user:
        return user
    team = db.scalar(select(Team).where(Team.name == "Default team"))
    if not team:
        team = Team(name="Default team")
        db.add(team)
        db.flush()
    user = User(
        email=s.admin_email.lower(), name=s.admin_name, role="admin", team_id=team.id,
        password_hash=hash_password(s.admin_password), must_change_password=True,
    )
    db.add(user)
    db.commit()
    return user


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--file", type=Path, default=DEFAULT_FILE)
    args = parser.parse_args()
    data = json.loads(args.file.read_text(encoding="utf-8"))
    with SessionLocal() as db:
        counts = load_content(db, data)
        admin = ensure_admin(db)
    print(f"Seeded {counts}. Admin account: {admin.email}")


if __name__ == "__main__":
    main()
