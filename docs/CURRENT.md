# Current Project State

## Product

The app is a desktop-first job search and application management tool for first-time job seekers and junior career switchers.

The MVP is local-only, has no AI features, and focuses on four core areas:

1. Job discovery and target company management.
2. Active hiring process management.
3. Resume, cover letter, portfolio, certificate, link, and submission file management with version tracking.
4. App and desktop notifications.

## Current Decisions

- Build desktop-first.
- Keep MVP data local-only.
- Exclude AI from the MVP.
- Exclude Kanban board views from the MVP.
- Exclude daily and weekly planning features from the MVP.
- Use docs as the project memory instead of growing `AGENTS.md`.
- Target the TypeScript-side architecture as UI, business, and adapter systems.
- Keep portable business logic in TypeScript `business`; use adapters for external systems including Tauri/Rust.
- Use TanStack Router with code-based routes and hash history for the Tauri webview.
- Remove unused web template assets from `public/`; keep `src-tauri/icons/` as native app bundle icon assets until a real app icon replaces them.

## Next Documents

- Expand `product/mvp-requirements.md`.
- Continue from `design/information-architecture.md` for screen-level decisions.
- Continue from `engineering/architecture.md` for frontend/Tauri boundary decisions.
- Continue from `engineering/routing.md` for route definitions and webview URL policy.
- Use `engineering/working-with-agents.md` for collaboration and agent feedback-loop guidance.
- See `decisions/0002-typescript-business-adapter-boundaries.md` for business and adapter boundaries.
- See `decisions/0003-tanstack-router-hash-history.md` for routing policy.
- See `decisions/0004-template-assets-and-tauri-icons.md` for asset cleanup policy.

## Current Code Shape

- `src/ui/` owns React UI, pages, feature UI, user interaction state, and views.
- `src/business/` owns internal business logic, DTOs, value objects, domain rules, and portable workflows.
- `src/adapter/` owns external communication boundaries, interfaces, mappers, and concrete implementations such as Tauri.
- Inside `ui`, use plain folders such as `app`, `pages`, `features`, and `shared`.
- Inside `ui/features`, each feature may define `model/` for view models.
- Adapter internals should be organized by product capability rather than by technology.
- Current implementation code has been reset. Only the top-level source structure, README markers, Vite/Tauri entry files, and a minimal TanStack Router app shell remain.
