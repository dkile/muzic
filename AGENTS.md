# Agent Instructions

## Working Style

- Treat `docs/` as the durable project memory.
- Keep `docs/CURRENT.md` short, current, and useful as the first recovery point after context loss.
- Update product, design, and engineering docs when decisions or architecture change.
- Use `docs/engineering/working-with-agents.md` for detailed collaboration and feedback-loop guidance.
- Create an active plan in `docs/plans/active/` for non-trivial implementation work.
- Move completed plans to `docs/plans/completed/` with a short result summary.
- Do not let long product decisions accumulate in this file.

## Read Order

When starting work, read:

1. `docs/README.md`
2. `docs/CURRENT.md`
3. `docs/engineering/working-with-agents.md`
4. Relevant docs under `docs/product/`, `docs/design/`, or `docs/engineering/`
5. Relevant active plan under `docs/plans/active/`, if one exists

## Project Direction

- Build a desktop-first Tauri app.
- The MVP is local-only.
- The MVP excludes AI, cloud sync, Kanban board views, daily planning, and weekly planning.
- The four MVP areas are job discovery and target company management, active hiring process management, application material version management, and notifications.

## Code Organization

- Target architecture is split into `src/ui/`, `src/business/`, and `src/adapter/`.
- `src/ui/` owns React, app composition, pages, feature UI, user interaction state, and views.
- `src/business/` owns internal business logic, DTOs, value objects, domain rules, and portable business workflows.
- `src/adapter/` owns external communication boundaries, interfaces, mappers, and concrete external-system implementations such as Tauri.
- Keep adapter internals organized by product capability, for example `jobs`, `companies`, `materials`, `alerts`, and `browser`.
- Do not place React, Tauri, filesystem, SQLite, or OS notification details in `business`.

Use plain folder names unless there is a real nested hierarchy that needs a local naming convention. Inside `ui`, use `app`, `pages`, `features`, and `shared`. Inside `ui/features`, use a feature-local `model/` folder for view models.
