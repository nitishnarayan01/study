# TPM Learning Hub

A learning platform for AI-enabled Technical Program Managers: a structured learning path (6 phases, 14 categories, 203 topics), full lessons, hands-on exercises, and progress tracking for individuals and teams.

- **Frontend:** Next.js (React + TypeScript) — `frontend/`
- **Backend:** FastAPI (Python) — `backend/`
- **Database:** PostgreSQL
- **Runs locally** with Docker; deploys later to any cloud.

See [docs/architecture.md](docs/architecture.md) for how the pieces fit together.

## Roles

| Role | Can do |
|---|---|
| Learner | Study topics, track status, confidence, key points and notes |
| Manager | Everything a learner can, plus see their own team's progress |
| Admin | Everything, plus manage users and teams and edit topics and lessons |

## Run it on Windows (first time)

1. **Install** [Git for Windows](https://git-scm.com/download/win) and [Docker Desktop](https://www.docker.com/products/docker-desktop/). Start Docker Desktop and wait until it says it's running.
2. **Get the code.** Open PowerShell and run:
   ```powershell
   cd $HOME
   git clone https://github.com/nitishnarayan01/study.git
   cd study
   ```
3. **Create your settings file:**
   ```powershell
   copy .env.example .env
   notepad .env
   ```
   Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` to your own, and replace `JWT_SECRET` with any long random text. Save and close.
4. **Start everything:**
   ```powershell
   docker compose up --build
   ```
   The first build takes a few minutes. It's ready when the log shows `Seeded {...}` and `Application startup complete`.
5. **Open the app:** http://localhost:3000 — log in with your admin email and password. You'll be asked to set a new password.
6. **See the API docs:** http://localhost:8000/docs

To stop: press `Ctrl+C` in PowerShell (or run `docker compose down`). Your data is kept in a Docker volume. To wipe everything and start fresh: `docker compose down -v`.

## Day-to-day

| Task | Command |
|---|---|
| Start | `docker compose up` |
| Start after code changes | `docker compose up --build` |
| Stop | `docker compose down` |
| Reload content from `backend/app/seed/content.json` | `docker compose exec backend python -m app.seed.seed` |
| Run backend tests | `docker compose exec backend pytest -q` |

## Adding people

Log in as admin → **Admin** → **Teams** to create teams → **Users** to add people with a temporary password. Share the password with them; they must change it at first login. Make someone a **Manager** to let them see their team's progress.

## Adding or editing content

- **In the app:** Admin → Content → Edit. Lessons are edited as JSON with a live preview.
- **In bulk:** edit `backend/app/seed/content.json` and reload content (command above). The seed is safe to re-run: it updates topics and lessons but never touches anyone's progress.

## Project structure

```
backend/
  app/
    main.py          FastAPI app and routes registration
    models.py        Database tables (SQLAlchemy)
    schemas.py       Request/response shapes (Pydantic)
    routers/         auth, catalog (topics/lessons), progress, admin (users/teams)
    seed/            content.json + seed script
  alembic/           Database migrations
  tests/             API tests (pytest)
frontend/
  src/app/           Pages: login, dashboard, topics/[id], team, admin, account
  src/components/    Shared UI (top bar, lesson renderer, progress bar)
  src/lib/           API client, auth, types
docs/                Architecture notes
.github/workflows/   CI: tests, lint, build on every push
```

## Roadmap

- Write lessons for Phases 2–6
- Deploy online (Vercel + Render + Neon)
- Google / company SSO login
- AI tutor inside each topic (Claude API)
- AI search across all lessons (pgvector)
