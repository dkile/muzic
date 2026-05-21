# Architecture

## Target Shape

The TypeScript-side app is organized as three portable systems:

```text
src/
  ui/        # React, app shell, pages, feature UI, interaction state, views
  business/  # Internal business logic, DTOs, value objects, rules, workflows
  adapter/   # External communication boundaries, interfaces, mappers, implementations
```

The goal is to keep business logic independent from React and Tauri so it can
move to another runtime later if needed.

## Source Shape

```text
src/
  ui/
    app/
    pages/
    features/
      jobs/
        model/
      companies/
        model/
      materials/
        model/
      alerts/
        model/
      browser/
    shared/
  business/
  adapter/
    jobs/
    companies/
    materials/
    alerts/
    browser/
    common/
```

Use plain folder names unless there is a real nested hierarchy that needs a
local naming convention. Nested folders use plain names because they are
ordinary subdivisions inside a system.

## Domains

- `jobs`: job postings and active hiring processes.
- `companies`: target companies and careers page URLs.
- `browser`: in-app job discovery surface and save-current-page actions.
- `materials`: resumes, cover letters, portfolios, certificates, links, and submission files.
- `alerts`: in-app and desktop notification concepts.

## Pages

- `discovery`: job discovery and target company management.
- `processes`: active hiring process management.
- `materials`: application material and version management.
- `alerts`: notification management.

Pages are route-level entry points. They should stay thin and avoid owning the
global app skeleton, navigation, domain rules, or persistence concerns.

## Routing

The UI uses TanStack Router with code-based route definitions.

Routing setup belongs in `src/ui/app/router.ts` so the route tree and webview
URL policy stay localized. The Tauri app uses hash history because packaged
webview assets behave more like static files than a server with path rewrites.

Routes map to the primary page sections:

- `/`
- `/discovery`
- `/processes`
- `/materials`
- `/alerts`

## System Responsibilities

### UI

`ui/` owns:

- React components.
- App shell and navigation.
- Pages and feature UI.
- User interaction state.
- View models and display formatting.
- Event handlers that call business or adapter-facing functions.

Inside UI:

- `app/` owns the app shell, navigation, layout, and global UI skeleton.
- `pages/` owns thin route-level page entries.
- `features/` owns feature UI. Each feature may define its own `model/` folder for view models.
- `shared/` owns UI-shared components, labels, and presentation helpers.

`ui/` must not own portable business rules.

### Business

`business/` owns:

- Internal business logic.
- DTOs and value objects.
- Domain rules.
- Portable workflows that should survive a move away from React or Tauri.
- Product vocabulary such as job, company, material, material version, alert, and hiring stage.

`business/` must not depend on React, Tauri, filesystem APIs, SQLite, WebView,
or OS notification APIs.

### Adapter

`adapter/` owns:

- External communication interfaces.
- Mappers between external payloads and business DTOs/value objects.
- Concrete external-system implementations.
- Tauri integration from the TypeScript side.
- Test or memory implementations where useful.

Adapters should be organized by product capability rather than by technology:

```text
adapter/
  jobs/
  companies/
  materials/
  alerts/
  browser/
  common/
```

For example, `jobs/` can contain job repository interfaces, job records, job
mappers, Tauri-backed implementations, and memory-backed implementations.

## Boundary Rules

- UI components should not call `@tauri-apps/api` directly.
- UI calls business logic and adapter interfaces through explicit boundaries.
- Business code must not import UI or concrete adapter implementations.
- Adapter code may depend on business DTOs/value objects and adapter interfaces.
- Concrete Tauri calls belong inside adapter implementations.
- Rust/Tauri code owns native capabilities such as filesystem access, managed file copies, SQLite access, and desktop notifications.

## Logic Placement

Business owns portable product behavior:

- Hiring stage rules.
- Active and closed process calculations.
- Deadline and reminder candidate calculations.
- Material version rules.
- Job-to-material relationship rules.
- Portable job, material, company, browser, and alert workflows.

UI owns presentation behavior:

- View models and display formatting.
- Form state and validation messages.
- Modal, selection, loading, and error UI state.
- Event handlers that start business workflows.

Adapter owns external system behavior:

- Repository, storage, notification, and browser interfaces.
- External records and payload shapes.
- Mapping external data to business DTOs/value objects.
- Tauri-backed implementations.

See `docs/decisions/0002-typescript-business-adapter-boundaries.md`.

## Current Implementation Phase

The app currently has a minimal TanStack Router shell and placeholder route
entries for the primary sections.

The next architecture step is to add the first real page surfaces and then
replace mock or in-memory state with a local persistence boundary, likely backed
by SQLite through Tauri commands.
