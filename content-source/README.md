# Lesson source files

All course content is written here, then exported to `backend/app/seed/content.json`, which the backend loads into the database on start-up.

**Edit lessons here, not in content.json.** The export overwrites content.json, so hand edits there would be lost.

## Folders

| Path | What it holds |
|---|---|
| `src/` | The lesson files, one or more per course section (see table below) |
| `app.html` | The single-page dashboard template (the Claude artifact version) |
| `scripts/build.js` | Combines `src/` files in a fixed order |
| `scripts/check.js` | Checks for mistakes: missing fields, unknown links, duplicate ids |
| `scripts/export.js` | Writes `backend/app/seed/content.json` |
| `dist/` | Build output (dashboard.html); not stored in Git |

## Which file holds which course

| Course (phase) | Files in `src/` |
|---|---|
| 1 Foundations | Topic cards in `data_p1.js`; lessons in `lessons_hsw_*.js`, `lessons_aif.js`; tips in `ext_hsw.js`, `ext_aif.js` |
| 2 Build with AI | Topic cards in `data_p2.js`, `data_p2b.js`; lessons in `lessons_abt_*.js`, `lessons_mam_*.js`; tips in `ext_abt.js`, `ext_mam.js` |
| 3 Agents | `phase3a.js`, `phase3b.js` |
| 4 Ship safely | `phase4_*.js` |
| 5 PM practice | `phase5.js`, `deep_pmc_*.js`, `deep_com.js` |
| 6 Prove it | `phase6.js`, `deep_cap_car.js` |
| 7 Code to Live | `phase7_*.js` |
| Links (resources) | the `R` table in `data_p1.js`, plus `Object.assign(R, …)` blocks in later files |
| Helpers and the original outline | `lessons.js`, `deepen_core.js` (shared functions), `data_rest.js` (original topic list) |

The course list and section names are set in `scripts/export.js` (the `PH` list) and in `app.html` (`PHASES`).

## Changing a lesson

1. Edit the file in `src/` and save.
2. In a terminal at the project root, run:
   ```
   node content-source/scripts/check.js
   node content-source/scripts/export.js
   ```
3. Commit both the source file and `backend/app/seed/content.json`, then push.

The backend notices the content changed and reloads it on its next start. Your progress is never touched.
GitHub checks fail if content.json doesn't match the source files, so you can't forget step 2.

## Lesson format

Each topic is one `addTopic(topic, lesson, extras)` call:

- `topic`: `id`, `cat` (section name), `t` (title), `d` (depth), `p` (priority), `n` (kind), `h` (hours), `what`, `why`, `concepts`, `learn` (resource keys), `doIt`, `prove`, `interview`, `covers`
- `lesson`: `sections` (each with `h` heading plus any of `p`, `steps`, `table`, `bullets`, `gloss`, `flow`, `flowLabel`), `quiz` (`[question, answer]` pairs), `deeper` (resource keys)
- `extras`: `prac` (real-project tips), `mis` (`[myth, reality]` pairs)

Headings have no numbers; the app numbers them. Links must be real and checked.
