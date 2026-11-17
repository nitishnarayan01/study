import json

from sqlalchemy import select

from app.db import SessionLocal
from app.models import Lesson, Progress, User
from app.seed.seed import DEFAULT_FILE, sync_content


def test_sync_skips_when_content_unchanged_and_reloads_when_changed():
    raw = DEFAULT_FILE.read_bytes()
    with SessionLocal() as db:
        assert sync_content(db, raw) is not None  # first sync records the fingerprint
        assert sync_content(db, raw) is None  # unchanged: skipped
        assert sync_content(db, raw, force=True) is not None  # forced reload

        data = json.loads(raw)
        first_id = data["topics"][0]["id"]
        data["lessons"][first_id]["quiz"].append(["New question?", "New answer."])
        assert sync_content(db, json.dumps(data).encode("utf-8")) is not None
        lesson = db.get(Lesson, first_id)
        assert lesson.content["quiz"][-1] == ["New question?", "New answer."]


def test_sync_never_touches_progress():
    with SessionLocal() as db:
        user = db.scalar(select(User).where(User.email == "learner@acme.com"))
        topic_id = json.loads(DEFAULT_FILE.read_text(encoding="utf-8"))["topics"][0]["id"]
        db.add(Progress(user_id=user.id, topic_id=topic_id, status=3, confidence=4, key_points=[True], notes="mine"))
        db.commit()
        sync_content(db, DEFAULT_FILE.read_bytes(), force=True)
        p = db.scalar(select(Progress).where(Progress.user_id == user.id, Progress.topic_id == topic_id))
        assert (p.status, p.confidence, p.notes) == (3, 4, "mine")
