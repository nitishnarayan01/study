from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select

from app.deps import DB, AdminUser, CurrentUser
from app.models import Category, Lesson, Phase, Resource, Topic
from app.schemas import (
    CatalogOut,
    LessonIn,
    ResourceOut,
    TopicCreate,
    TopicDetail,
    TopicSummary,
    TopicWrite,
)

router = APIRouter(prefix="/api", tags=["catalog"])


def _summary(t: Topic, lesson_ids: set[str]) -> TopicSummary:
    return TopicSummary(
        id=t.id, category=t.category, title=t.title, depth=t.depth, priority=t.priority,
        kind=t.kind, hours=t.hours, order=t.order, status=t.status,
        has_lesson=t.id in lesson_ids, concept_count=len(t.concepts or []),
    )


def _detail(db, t: Topic) -> TopicDetail:
    keys = list(t.resources or [])
    found = {r.key: r for r in db.scalars(select(Resource).where(Resource.key.in_(keys)))} if keys else {}
    return TopicDetail(
        id=t.id, category=t.category, title=t.title, depth=t.depth, priority=t.priority, kind=t.kind,
        hours=t.hours, order=t.order, status=t.status, summary=t.summary, why=t.why,
        concepts=t.concepts or [], resources=[ResourceOut.model_validate(found[k]) for k in keys if k in found],
        do_it=t.do_it, prove=t.prove, interview=t.interview, covers=t.covers or [],
        lesson=t.lesson.content if t.lesson else None, updated_at=t.updated_at,
    )


@router.get("/catalog", response_model=CatalogOut)
def catalog(db: DB, user: CurrentUser):
    """Everything needed to draw the learning path: phases, categories and topic summaries."""
    lesson_ids = set(db.scalars(select(Lesson.topic_id)))
    return CatalogOut(
        phases=list(db.scalars(select(Phase).order_by(Phase.number))),
        categories=list(db.scalars(select(Category).order_by(Category.order))),
        topics=[_summary(t, lesson_ids) for t in db.scalars(select(Topic).order_by(Topic.order))],
    )


@router.get("/resources", response_model=list[ResourceOut])
def resources(db: DB, user: CurrentUser):
    return list(db.scalars(select(Resource).order_by(Resource.key)))


@router.get("/topics/{topic_id}", response_model=TopicDetail)
def get_topic(topic_id: str, db: DB, user: CurrentUser):
    t = db.get(Topic, topic_id)
    if not t:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Topic not found.")
    return _detail(db, t)


def _apply(db, t: Topic, body: TopicWrite):
    if not db.get(Category, body.category):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, f"Unknown category '{body.category}'.")
    data = body.model_dump()
    if data.get("order") is None:
        data.pop("order")
    for k, v in data.items():
        setattr(t, k, v)


@router.post("/topics", response_model=TopicDetail, status_code=201)
def create_topic(body: TopicCreate, db: DB, admin: AdminUser):
    if db.get(Topic, body.id):
        raise HTTPException(status.HTTP_409_CONFLICT, "A topic with this id already exists.")
    t = Topic(id=body.id, category=body.category, title=body.title, depth=body.depth,
              priority=body.priority, kind=body.kind, hours=body.hours)
    _apply(db, t, TopicWrite(**body.model_dump(exclude={"id"})))
    if body.order is None:
        last = db.scalar(select(Topic.order).order_by(Topic.order.desc()).limit(1))
        t.order = (last or 0) + 1
    db.add(t)
    db.commit()
    db.refresh(t)
    return _detail(db, t)


@router.put("/topics/{topic_id}", response_model=TopicDetail)
def update_topic(topic_id: str, body: TopicWrite, db: DB, admin: AdminUser):
    t = db.get(Topic, topic_id)
    if not t:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Topic not found.")
    _apply(db, t, body)
    db.commit()
    db.refresh(t)
    return _detail(db, t)


@router.delete("/topics/{topic_id}", status_code=204)
def delete_topic(topic_id: str, db: DB, admin: AdminUser):
    t = db.get(Topic, topic_id)
    if not t:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Topic not found.")
    db.delete(t)
    db.commit()


@router.put("/topics/{topic_id}/lesson", response_model=TopicDetail)
def put_lesson(topic_id: str, body: LessonIn, db: DB, admin: AdminUser):
    t = db.get(Topic, topic_id)
    if not t:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Topic not found.")
    if t.lesson:
        t.lesson.content = body.model_dump()
    else:
        t.lesson = Lesson(topic_id=t.id, content=body.model_dump())
    db.commit()
    db.refresh(t)
    return _detail(db, t)
