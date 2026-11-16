from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select

from app.deps import DB, CurrentUser
from app.models import Progress, Topic
from app.schemas import ProgressIn, ProgressOut

router = APIRouter(prefix="/api/progress", tags=["progress"])


@router.get("/me", response_model=list[ProgressOut])
def my_progress(db: DB, user: CurrentUser):
    return list(db.scalars(select(Progress).where(Progress.user_id == user.id)))


@router.put("/me/{topic_id}", response_model=ProgressOut)
def save_progress(topic_id: str, body: ProgressIn, db: DB, user: CurrentUser):
    """Create or update the current user's progress on one topic. Only the fields sent are changed."""
    if not db.get(Topic, topic_id):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Topic not found.")
    p = db.scalar(select(Progress).where(Progress.user_id == user.id, Progress.topic_id == topic_id))
    if not p:
        p = Progress(user_id=user.id, topic_id=topic_id, status=0, confidence=0, key_points=[], notes="")
        db.add(p)
    for field, value in body.model_dump(exclude_none=True).items():
        setattr(p, field, value)
    db.commit()
    db.refresh(p)
    return p
