"""Initial schema: teams, users, catalog, lessons, progress

Revision ID: 0001
Revises:
Create Date: 2026-11-16
"""
import sqlalchemy as sa
from alembic import op

revision = "0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "teams",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("name", sa.String(120), nullable=False, unique=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_table(
        "users",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("email", sa.String(255), nullable=False, unique=True),
        sa.Column("name", sa.String(120), nullable=False),
        sa.Column("password_hash", sa.String(255), nullable=False),
        sa.Column("role", sa.String(20), nullable=False),
        sa.Column("team_id", sa.Integer, sa.ForeignKey("teams.id"), nullable=True),
        sa.Column("is_active", sa.Boolean, nullable=False),
        sa.Column("must_change_password", sa.Boolean, nullable=False),
        sa.Column("hours_per_week", sa.Float, nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index("ix_users_email", "users", ["email"])
    op.create_table(
        "phases",
        sa.Column("number", sa.Integer, primary_key=True, autoincrement=False),
        sa.Column("name", sa.String(120), nullable=False),
    )
    op.create_table(
        "categories",
        sa.Column("slug", sa.String(80), primary_key=True),
        sa.Column("name", sa.String(120), nullable=False),
        sa.Column("phase", sa.Integer, sa.ForeignKey("phases.number"), nullable=False),
        sa.Column("order", sa.Integer, nullable=False),
    )
    op.create_table(
        "resources",
        sa.Column("key", sa.String(60), primary_key=True),
        sa.Column("title", sa.String(255), nullable=False),
        sa.Column("url", sa.String(1000), nullable=False),
        sa.Column("kind", sa.String(30), nullable=False),
    )
    op.create_table(
        "topics",
        sa.Column("id", sa.String(40), primary_key=True),
        sa.Column("category", sa.String(80), sa.ForeignKey("categories.slug"), nullable=False),
        sa.Column("title", sa.String(255), nullable=False),
        sa.Column("depth", sa.String(20), nullable=False),
        sa.Column("priority", sa.String(5), nullable=False),
        sa.Column("kind", sa.String(10), nullable=False),
        sa.Column("hours", sa.Float, nullable=False),
        sa.Column("order", sa.Integer, nullable=False),
        sa.Column("status", sa.String(10), nullable=False),
        sa.Column("summary", sa.Text, nullable=False),
        sa.Column("why", sa.Text, nullable=False),
        sa.Column("concepts", sa.JSON, nullable=False),
        sa.Column("resources", sa.JSON, nullable=False),
        sa.Column("do_it", sa.Text, nullable=False),
        sa.Column("prove", sa.Text, nullable=False),
        sa.Column("interview", sa.Text, nullable=False),
        sa.Column("covers", sa.JSON, nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index("ix_topics_category", "topics", ["category"])
    op.create_table(
        "lessons",
        sa.Column("topic_id", sa.String(40), sa.ForeignKey("topics.id", ondelete="CASCADE"), primary_key=True),
        sa.Column("content", sa.JSON, nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_table(
        "progress",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("user_id", sa.Integer, sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("topic_id", sa.String(40), sa.ForeignKey("topics.id", ondelete="CASCADE"), nullable=False),
        sa.Column("status", sa.Integer, nullable=False),
        sa.Column("confidence", sa.Integer, nullable=False),
        sa.Column("key_points", sa.JSON, nullable=False),
        sa.Column("notes", sa.Text, nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.UniqueConstraint("user_id", "topic_id", name="uq_progress_user_topic"),
    )
    op.create_index("ix_progress_user_id", "progress", ["user_id"])
    op.create_index("ix_progress_topic_id", "progress", ["topic_id"])


def downgrade() -> None:
    for t in ("progress", "lessons", "topics", "resources", "categories", "phases", "users", "teams"):
        op.drop_table(t)
