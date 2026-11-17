from datetime import datetime, timezone

from sqlalchemy import (
    JSON,
    Boolean,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db import Base


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


# Roles: admin edits content and manages users; manager sees their team's progress;
# learner studies and tracks their own progress.
ROLES = ("admin", "manager", "learner")


class Team(Base):
    __tablename__ = "teams"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)

    members: Mapped[list["User"]] = relationship(back_populates="team")


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(120))
    password_hash: Mapped[str] = mapped_column(String(255))
    role: Mapped[str] = mapped_column(String(20), default="learner")
    team_id: Mapped[int | None] = mapped_column(ForeignKey("teams.id"), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    must_change_password: Mapped[bool] = mapped_column(Boolean, default=False)
    hours_per_week: Mapped[float] = mapped_column(Float, default=8)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow)

    team: Mapped[Team | None] = relationship(back_populates="members")


class Phase(Base):
    __tablename__ = "phases"
    number: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(120))


class Category(Base):
    __tablename__ = "categories"
    slug: Mapped[str] = mapped_column(String(80), primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    phase: Mapped[int] = mapped_column(ForeignKey("phases.number"))
    order: Mapped[int] = mapped_column(Integer, default=0)


class Resource(Base):
    """A learning link (article, video, docs, tool) referenced by topics and lessons."""

    __tablename__ = "resources"
    key: Mapped[str] = mapped_column(String(60), primary_key=True)
    title: Mapped[str] = mapped_column(String(255))
    url: Mapped[str] = mapped_column(String(1000))
    kind: Mapped[str] = mapped_column(String(30), default="Read")


class Topic(Base):
    __tablename__ = "topics"
    id: Mapped[str] = mapped_column(String(40), primary_key=True)
    category: Mapped[str] = mapped_column(ForeignKey("categories.slug"), index=True)
    title: Mapped[str] = mapped_column(String(255))
    depth: Mapped[str] = mapped_column(String(20))  # Understand / Use / Build
    priority: Mapped[str] = mapped_column(String(5))  # P0 / P1 / P2
    kind: Mapped[str] = mapped_column(String(10))  # New / Refresh
    hours: Mapped[float] = mapped_column(Float, default=1)
    order: Mapped[int] = mapped_column(Integer, default=0)
    status: Mapped[str] = mapped_column(String(10), default="outline")  # outline / full
    summary: Mapped[str] = mapped_column(Text, default="")
    why: Mapped[str] = mapped_column(Text, default="")
    concepts: Mapped[list] = mapped_column(JSON, default=list)
    resources: Mapped[list] = mapped_column(JSON, default=list)  # resource keys
    do_it: Mapped[str] = mapped_column(Text, default="")
    prove: Mapped[str] = mapped_column(Text, default="")
    interview: Mapped[str] = mapped_column(Text, default="")
    covers: Mapped[list] = mapped_column(JSON, default=list)  # rows from the original sheet
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    lesson: Mapped["Lesson | None"] = relationship(back_populates="topic", uselist=False, cascade="all, delete-orphan")


class Lesson(Base):
    """Full study material for a topic. `content` holds sections, quiz and deeper links."""

    __tablename__ = "lessons"
    topic_id: Mapped[str] = mapped_column(ForeignKey("topics.id", ondelete="CASCADE"), primary_key=True)
    content: Mapped[dict] = mapped_column(JSON)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)

    topic: Mapped[Topic] = relationship(back_populates="lesson")


class Progress(Base):
    __tablename__ = "progress"
    __table_args__ = (UniqueConstraint("user_id", "topic_id", name="uq_progress_user_topic"),)
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), index=True)
    topic_id: Mapped[str] = mapped_column(ForeignKey("topics.id", ondelete="CASCADE"), index=True)
    status: Mapped[int] = mapped_column(Integer, default=0)  # 0 not started, 1 learning, 2 practising, 3 done
    confidence: Mapped[int] = mapped_column(Integer, default=0)  # 0-5
    key_points: Mapped[list] = mapped_column(JSON, default=list)  # booleans per concept
    notes: Mapped[str] = mapped_column(Text, default="")
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)


class AppMeta(Base):
    """Small key/value store for app housekeeping, e.g. the fingerprint of the last loaded content."""

    __tablename__ = "app_meta"
    key: Mapped[str] = mapped_column(String(64), primary_key=True)
    value: Mapped[str] = mapped_column(Text, default="")
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)
