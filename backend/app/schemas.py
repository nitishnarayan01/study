from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field

Role = Literal["admin", "manager", "learner"]


class ORM(BaseModel):
    model_config = ConfigDict(from_attributes=True)


# ---------- auth ----------
class LoginIn(BaseModel):
    email: EmailStr
    password: str


class TokenOut(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ChangePasswordIn(BaseModel):
    current_password: str
    new_password: str = Field(min_length=8)


# ---------- users & teams ----------
class TeamOut(ORM):
    id: int
    name: str


class TeamIn(BaseModel):
    name: str = Field(min_length=1, max_length=120)


class UserOut(ORM):
    id: int
    email: str
    name: str
    role: Role
    team_id: int | None
    is_active: bool
    must_change_password: bool
    hours_per_week: float


class UserCreate(BaseModel):
    email: EmailStr
    name: str = Field(min_length=1, max_length=120)
    role: Role = "learner"
    team_id: int | None = None
    temporary_password: str = Field(min_length=8)


class UserUpdate(BaseModel):
    name: str | None = None
    role: Role | None = None
    team_id: int | None = None
    is_active: bool | None = None


class MeUpdate(BaseModel):
    name: str | None = None
    hours_per_week: float | None = Field(default=None, ge=1, le=60)


# ---------- catalog ----------
class PhaseOut(ORM):
    number: int
    name: str


class CategoryOut(ORM):
    slug: str
    name: str
    phase: int
    order: int


class ResourceOut(ORM):
    key: str
    title: str
    url: str
    kind: str


class TopicSummary(ORM):
    id: str
    category: str
    title: str
    depth: str
    priority: str
    kind: str
    hours: float
    order: int
    status: str
    has_lesson: bool = False
    concept_count: int = 0


class CatalogOut(BaseModel):
    phases: list[PhaseOut]
    categories: list[CategoryOut]
    topics: list[TopicSummary]


class TopicDetail(ORM):
    id: str
    category: str
    title: str
    depth: str
    priority: str
    kind: str
    hours: float
    order: int
    status: str
    summary: str
    why: str
    concepts: list[str]
    resources: list[ResourceOut]
    do_it: str
    prove: str
    interview: str
    covers: list[str]
    lesson: dict | None = None
    updated_at: datetime | None = None


class TopicWrite(BaseModel):
    """Fields an admin can set when creating or editing a topic."""

    category: str
    title: str = Field(min_length=1, max_length=255)
    depth: Literal["Understand", "Use", "Build"] = "Understand"
    priority: Literal["P0", "P1", "P2"] = "P1"
    kind: Literal["New", "Refresh"] = "New"
    hours: float = Field(default=1, gt=0, le=200)
    order: int | None = None
    status: Literal["outline", "full"] = "outline"
    summary: str = ""
    why: str = ""
    concepts: list[str] = []
    resources: list[str] = []
    do_it: str = ""
    prove: str = ""
    interview: str = ""
    covers: list[str] = []


class TopicCreate(TopicWrite):
    id: str = Field(pattern=r"^[a-z0-9_-]{2,40}$")


class LessonIn(BaseModel):
    """Lesson content: sections (h, p, steps, table, bullets, gloss, mis, flow), quiz and deeper links."""

    sections: list[dict]
    quiz: list[list[str]] = []
    deeper: list[str] = []


# ---------- progress ----------
class ProgressIn(BaseModel):
    status: int | None = Field(default=None, ge=0, le=3)
    confidence: int | None = Field(default=None, ge=0, le=5)
    key_points: list[bool] | None = None
    notes: str | None = Field(default=None, max_length=20000)


class ProgressOut(ORM):
    topic_id: str
    status: int
    confidence: int
    key_points: list[bool]
    notes: str
    updated_at: datetime | None = None


class MemberProgress(BaseModel):
    user_id: int
    name: str
    email: str
    done: int
    in_progress: int
    total: int
    hours_done: float
    by_phase: dict[int, dict[str, int]]
    last_activity: datetime | None


class TeamProgressOut(BaseModel):
    team: TeamOut
    members: list[MemberProgress]
