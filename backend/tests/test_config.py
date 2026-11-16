from app.config import Settings


def test_hosted_postgres_urls_use_psycopg_driver():
    neon = "postgresql://user:pw@ep-x.neon.tech/neondb?sslmode=require"
    assert Settings(database_url=neon).database_url == (
        "postgresql+psycopg://user:pw@ep-x.neon.tech/neondb?sslmode=require"
    )
    assert Settings(database_url="postgres://u:p@h/db").database_url == "postgresql+psycopg://u:p@h/db"


def test_other_urls_unchanged():
    for url in ("postgresql+psycopg://u:p@h/db", "sqlite:///./test.db"):
        assert Settings(database_url=url).database_url == url


def test_cors_origins_split():
    s = Settings(cors_origins="https://a.vercel.app, http://localhost:3000")
    assert s.cors_origin_list == ["https://a.vercel.app", "http://localhost:3000"]


def test_cors_origins_tolerate_trailing_slash_and_quotes():
    s = Settings(cors_origins=' "https://a.vercel.app/" , http://localhost:3000/ ')
    assert s.cors_origin_list == ["https://a.vercel.app", "http://localhost:3000"]
