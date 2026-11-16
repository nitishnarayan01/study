from functools import lru_cache

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

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
