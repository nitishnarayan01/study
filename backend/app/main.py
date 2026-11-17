from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware

from app.config import get_settings
from app.routers import admin, auth, catalog, progress

app = FastAPI(
    title="TPM Learning Hub API",
    version="0.1.0",
    description="Learning path, lessons and progress tracking for AI-enabled TPMs.",
)

# Compress larger responses (the catalog and lessons) so they download faster.
app.add_middleware(GZipMiddleware, minimum_size=1000)

app.add_middleware(
    CORSMiddleware,
    allow_origins=get_settings().cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(catalog.router)
app.include_router(progress.router)
app.include_router(admin.router)


@app.get("/api/health", tags=["health"])
def health():
    return {"status": "ok"}
