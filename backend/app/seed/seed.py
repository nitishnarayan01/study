"""Load learning content and the first admin account into the database.

Safe to run repeatedly: content is upserted by id, and progress is never touched.
If the content file hasn't changed since the last load, loading is skipped, so restarts stay fast.
Usage:  python -m app.seed.seed            (content + admin)
        python -m app.seed.seed --force    (reload content even if unchanged)
        python -m app.seed.seed --file path/to/content.json
"""

import argparse
import hashlib
import json
from pathlib import Path

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.config import get_settings
from app.db import SessionLocal
from app.models import AppMeta, Category, Lesson, Phase, Resource, Team, Topic, User
from app.security import hash_password

DEFAULT_FILE = Path(__file__).with_name("content.json")

TOPIC_FIELDS = (
    "category", "title", "depth", "priority", "kind", "hours", "order", "status",
    "summary", "why", "concepts", "resources", "do_it", "prove", "interview", "covers",
)


CONTENT_HASH_KEY = "content_sha256"


def _existing(db: Session, model) -> dict:
    """All rows of a table keyed by primary key, fetched in one query instead of one per item."""
    pk = model.__mapper__.primary_key[0].name
    return {getattr(o, pk): o for o in db.scalars(select(model))}


def _upsert(db: Session, model, key_value, cache: dict, **fields):
    obj = cache.get(key_value)
    if obj is None:
        obj = model(**fields)
        db.add(obj)
    else:
        for k, v in fields.items():
            setattr(obj, k, v)
    return obj


def load_content(db: Session, data: dict) -> dict:
    phases, cats, res = _existing(db, Phase), _existing(db, Category), _existing(db, Resource)
    topics, lessons = _existing(db, Topic), _existing(db, Lesson)
    for p in data["phases"]:
        _upsert(db, Phase, p["number"], phases, number=p["number"], name=p["name"])
    db.flush()
    for c in data["categories"]:
        _upsert(db, Category, c["slug"], cats, slug=c["slug"], name=c["name"], phase=c["phase"], order=c["order"])
    for r in data["resources"]:
        _upsert(db, Resource, r["key"], res, key=r["key"], title=r["title"], url=r["url"], kind=r["kind"])
    db.flush()
    for t in data["topics"]:
        _upsert(db, Topic, t["id"], topics, id=t["id"], **{f: t[f] for f in TOPIC_FIELDS})
    db.flush()
    for topic_id, content in data.get("lessons", {}).items():
        _upsert(db, Lesson, topic_id, lessons, topic_id=topic_id, content=content)
    db.commit()
    return {
        "phases": len(data["phases"]), "categories": len(data["categories"]),
        "resources": len(data["resources"]), "topics": len(data["topics"]),
        "lessons": len(data.get("lessons", {})),
    }


def content_hash(raw: bytes) -> str:
    return hashlib.sha256(raw).hexdigest()


def sync_content(db: Session, raw: bytes, force: bool = False) -> dict | None:
    """Load content only if the file differs from what was last loaded. Returns counts, or None if skipped."""
    digest = content_hash(raw)
    meta = db.get(AppMeta, CONTENT_HASH_KEY)
    if meta is not None and meta.value == digest and not force:
        return None
    counts = load_content(db, json.loads(raw.decode("utf-8")))
    if meta is None:
        db.add(AppMeta(key=CONTENT_HASH_KEY, value=digest))
    else:
        meta.value = digest
    db.commit()
    return counts


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
    parser.add_argument("--force", action="store_true", help="reload content even if unchanged")
    args = parser.parse_args()
    raw = args.file.read_bytes()
    with SessionLocal() as db:
        counts = sync_content(db, raw, force=args.force)
        admin = ensure_admin(db)
    if counts is None:
        print(f"Content unchanged, skipped loading. Admin account: {admin.email}")
    else:
        print(f"Seeded {counts}. Admin account: {admin.email}")


if __name__ == "__main__":
    main()
