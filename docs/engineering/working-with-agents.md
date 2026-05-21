# Working With Agents

## Purpose

This document keeps agent collaboration predictable across context loss, resumes,
and future sessions. It is a working agreement for how agents should read,
change, verify, and document this project.

## Start Of Work

Read in this order:

1. `AGENTS.md`
2. `docs/README.md`
3. `docs/CURRENT.md`
4. This document
5. Relevant product, design, engineering, or active plan docs

Prefer current docs over chat history when they conflict. If docs look stale,
update them as part of the work instead of relying on memory.

## Documentation Loop

- Keep `docs/CURRENT.md` short and current.
- Keep product details in `docs/product/`.
- Write product spec and business spec documents in Korean.
- Keep architecture and implementation boundaries in `docs/engineering/`.
- Keep important decisions in `docs/decisions/`.
- Create `docs/plans/active/` plans for non-trivial work and move completed plans
  to `docs/plans/completed/` with a short result summary.
- Do not let long product or architecture decisions accumulate in `AGENTS.md`.

## Architecture Guardrails

The top-level TypeScript systems are:

```text
src/
  ui/
  business/
  adapter/
```

- `ui` owns React, pages, feature UI, user interaction state, and views.
- `business` owns internal business logic, DTOs, value objects, domain rules, and
  portable workflows.
- `adapter` owns external communication boundaries, interfaces, mappers, and
  concrete external-system implementations.

Do not place React, Tauri, filesystem, SQLite, WebView, or OS notification
details in `business`.

Adapter internals should be organized by product capability, not technology:

```text
adapter/
  jobs/
  companies/
  materials/
  alerts/
  browser/
```

Inside `ui`, use plain folders such as `app`, `pages`, `features`, and `shared`.
Inside `ui/features`, a feature may define a local `model/` folder for view models.

## Implementation Loop

- Add features one at a time.
- Before implementing a feature, identify the business concepts it needs.
- Keep UI event handlers focused on user interaction state and calling business or
  adapter-facing functions.
- Keep portable rules in `business`.
- Keep external payload mapping and Tauri calls in `adapter`.
- Prefer concrete file/function boundaries over abstract architecture labels.

## Review And Verification

- Run `pnpm build` after structural changes.
- When real UI is added, verify the rendered app, not just TypeScript.
- Report failed verification honestly with the current blocker.
- If changing architecture, update docs in the same turn.

## Communication

- Treat user architecture feedback as a design signal, not just a rename request.
- Admit and correct misunderstandings quickly.
- Avoid hiding unclear ideas behind generic terms like "use case" unless the code
  boundary is explicit.
- Explain abstract boundaries with actual file, function, and dependency examples.
