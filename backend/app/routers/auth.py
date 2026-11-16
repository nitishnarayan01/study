from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import func, select

from app.deps import DB, CurrentUser
from app.models import User
from app.schemas import ChangePasswordIn, LoginIn, MeUpdate, TokenOut, UserOut
from app.security import create_access_token, hash_password, verify_password

router = APIRouter(prefix="/api/auth", tags=["auth"])


def _authenticate(db, email: str, password: str) -> User:
    user = db.scalar(select(User).where(func.lower(User.email) == email.lower()))
    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Email or password is incorrect.")
    if not user.is_active:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "This account has been deactivated. Contact your admin.")
    return user


@router.post("/login", response_model=TokenOut)
def login(body: LoginIn, db: DB):
    """Log in with email and password (JSON). Returns a bearer token."""
    user = _authenticate(db, body.email, body.password)
    return TokenOut(access_token=create_access_token(user.id, user.role))


@router.post("/token", response_model=TokenOut, include_in_schema=False)
def token(form: Annotated[OAuth2PasswordRequestForm, Depends()], db: DB):
    """Form-based login used by the 'Authorize' button in the /docs page."""
    user = _authenticate(db, form.username, form.password)
    return TokenOut(access_token=create_access_token(user.id, user.role))


@router.get("/me", response_model=UserOut)
def me(user: CurrentUser):
    return user


@router.patch("/me", response_model=UserOut)
def update_me(body: MeUpdate, user: CurrentUser, db: DB):
    if body.name is not None:
        user.name = body.name
    if body.hours_per_week is not None:
        user.hours_per_week = body.hours_per_week
    db.commit()
    return user


@router.post("/change-password", status_code=204)
def change_password(body: ChangePasswordIn, user: CurrentUser, db: DB):
    if not verify_password(body.current_password, user.password_hash):
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Current password is incorrect.")
    user.password_hash = hash_password(body.new_password)
    user.must_change_password = False
    db.commit()
