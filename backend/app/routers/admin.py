from collections import defaultdict

from fastapi import APIRouter, HTTPException, status
from sqlalchemy import func, select

from app.deps import DB, AdminUser, ManagerOrAdmin
from app.models import Category, Progress, Team, Topic, User
from app.schemas import (
    MemberProgress,
    TeamIn,
    TeamOut,
    TeamProgressOut,
    UserCreate,
    UserOut,
    UserUpdate,
)
from app.security import hash_password

router = APIRouter(prefix="/api", tags=["users & teams"])

# Share of a topic's hours counted when it is in progress, for the "hours done" estimate
STATUS_WEIGHT = {0: 0.0, 1: 0.3, 2: 0.6, 3: 1.0}


# ---------- users (admin only) ----------
@router.get("/users", response_model=list[UserOut])
def list_users(db: DB, admin: AdminUser):
    return list(db.scalars(select(User).order_by(User.name)))


@router.post("/users", response_model=UserOut, status_code=201)
def create_user(body: UserCreate, db: DB, admin: AdminUser):
    if db.scalar(select(User).where(func.lower(User.email) == body.email.lower())):
        raise HTTPException(status.HTTP_409_CONFLICT, "A user with this email already exists.")
    if body.team_id is not None and not db.get(Team, body.team_id):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Team not found.")
    user = User(
        email=body.email.lower(), name=body.name, role=body.role, team_id=body.team_id,
        password_hash=hash_password(body.temporary_password), must_change_password=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.patch("/users/{user_id}", response_model=UserOut)
def update_user(user_id: int, body: UserUpdate, db: DB, admin: AdminUser):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "User not found.")
    changes = body.model_dump(exclude_unset=True)
    if user.id == admin.id and (changes.get("role", "admin") != "admin" or changes.get("is_active") is False):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "You can't remove your own admin access.")
    if changes.get("team_id") is not None and not db.get(Team, changes["team_id"]):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Team not found.")
    for k, v in changes.items():
        setattr(user, k, v)
    db.commit()
    db.refresh(user)
    return user


# ---------- teams ----------
@router.get("/teams", response_model=list[TeamOut])
def list_teams(db: DB, user: ManagerOrAdmin):
    q = select(Team).order_by(Team.name)
    if user.role == "manager":
        q = q.where(Team.id == user.team_id)
    return list(db.scalars(q))


@router.post("/teams", response_model=TeamOut, status_code=201)
def create_team(body: TeamIn, db: DB, admin: AdminUser):
    if db.scalar(select(Team).where(Team.name == body.name)):
        raise HTTPException(status.HTTP_409_CONFLICT, "A team with this name already exists.")
    team = Team(name=body.name)
    db.add(team)
    db.commit()
    db.refresh(team)
    return team


@router.get("/teams/{team_id}/progress", response_model=TeamProgressOut)
def team_progress(team_id: int, db: DB, user: ManagerOrAdmin):
    """Progress summary for every member of a team. Managers can only see their own team."""
    team = db.get(Team, team_id)
    if not team:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Team not found.")
    if user.role == "manager" and user.team_id != team_id:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Managers can only view their own team.")

    phase_of = dict(db.execute(select(Topic.id, Category.phase).join(Category, Topic.category == Category.slug)).all())
    hours_of = dict(db.execute(select(Topic.id, Topic.hours)).all())
    total = len(phase_of)
    members = list(db.scalars(select(User).where(User.team_id == team_id, User.is_active).order_by(User.name)))
    rows = db.scalars(select(Progress).where(Progress.user_id.in_([m.id for m in members]))) if members else []
    per_user: dict[int, list[Progress]] = defaultdict(list)
    for p in rows:
        per_user[p.user_id].append(p)

    out = []
    for m in members:
        ps = per_user[m.id]
        by_phase: dict[int, dict[str, int]] = defaultdict(lambda: {"done": 0, "in_progress": 0})
        for p in ps:
            ph = phase_of.get(p.topic_id)
            if ph is None:
                continue
            if p.status == 3:
                by_phase[ph]["done"] += 1
            elif p.status in (1, 2):
                by_phase[ph]["in_progress"] += 1
        out.append(MemberProgress(
            user_id=m.id, name=m.name, email=m.email,
            done=sum(1 for p in ps if p.status == 3),
            in_progress=sum(1 for p in ps if p.status in (1, 2)),
            total=total,
            hours_done=round(sum(hours_of.get(p.topic_id, 0) * STATUS_WEIGHT.get(p.status, 0) for p in ps), 1),
            by_phase=dict(by_phase),
            last_activity=max((p.updated_at for p in ps if p.updated_at), default=None),
        ))
    return TeamProgressOut(team=TeamOut.model_validate(team), members=out)
