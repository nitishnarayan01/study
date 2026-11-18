# Notes for Claude

This repo is the TPM Learning Hub. The owner is a project manager who builds with AI rather than writing code by hand, so explain changes in plain English and keep the project easy to run.

## Stack
- `backend/`: FastAPI, SQLAlchemy 2.0, Alembic, PostgreSQL, PyJWT, bcrypt. Python 3.12.
- `frontend/`: Next.js 14 App Router, React 18, TypeScript (strict). Plain CSS in `src/app/globals.css` using design tokens; no CSS framework.
- `docker-compose.yml` runs db, backend, frontend.

## Rules
- Every schema change needs a new Alembic migration in `backend/alembic/versions/` that matches `app/models.py`.
- Permissions are enforced in the backend (`app/deps.py`: `CurrentUser`, `AdminUser`, `ManagerOrAdmin`). Never rely on the frontend to hide data.
- Add or update tests in `backend/tests/` for every API change; run `pytest -q` in `backend/`.
- Lesson content is written in `content-source/src/` and exported to `backend/app/seed/content.json` with `node content-source/scripts/export.js`. Never edit content.json by hand. The seed script must stay idempotent and must never modify `progress`.
- Lesson JSON format: `{sections: [{h, p?, steps?, table?, bullets?, gloss?, mis?, flow?, flowLabel?}], quiz: [[q, a]], deeper: [resourceKey]}`. Headings have no numbers; the UI numbers them.
- Resource URLs must be real and checked; never invent links.
- Frontend calls go through `src/lib/api.ts`; types live in `src/lib/types.ts`.
- Keep UI text plain and specific. Use the existing CSS tokens for colours.
- Never commit `.env` or secrets.

## Common commands
- Start: `docker compose up --build`
- Backend tests: `cd backend && pytest -q`
- Frontend checks: `cd frontend && npm run lint && npm run build`
- Reload content: `docker compose exec backend python -m app.seed.seed`
