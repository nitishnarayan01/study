from functools import lru_cache

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """All configuration comes from environment variables (see .env.example)."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "postgresql+psycopg://study:study@localhost:5432/study"
    jwt_secret: str = "change-me-in-production"
    jwt_algorithm: str = "HS256"
    access_token_minutes: int = 60 * 12

    # Comma-separated list of frontend origins allowed to call the API (CORS)
    cors_origins: str = "http://localhost:3000"

    # First admin account, created by the seed script if it doesn't exist
    admin_email: str = "admin@learninghub.dev"
    admin_password: str = "ChangeMe123!"
    admin_name: str = "Admin"

    @field_validator("database_url")
    @classmethod
    def use_psycopg_driver(cls, url: str) -> str:
        """Hosted databases (e.g. Neon) hand out 'postgresql://...' or 'postgres://...' URLs.
        Rewrite them to the driver this app ships with so they can be pasted in unchanged."""
        for prefix in ("postgresql://", "postgres://"):
            if url.startswith(prefix):
                return "postgresql+psycopg://" + url[len(prefix):]
        return url

    @property
    def cors_origin_list(self) -> list[str]:
        # Browsers send the origin without a trailing slash or quotes, so tidy pasted values to match.
        cleaned = (o.strip().strip("'\"").rstrip("/") for o in self.cors_origins.split(","))
        return [o for o in cleaned if o]


@lru_cache
def get_settings() -> Settings:
    return Settings()
