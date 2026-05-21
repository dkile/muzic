# 0002. TypeScript Business and Adapter Boundaries

## Status

Accepted

## Context

The project is a desktop-first Tauri app, but the TypeScript code should not be
treated as disposable React glue. The goal is to build a portable business
system that can move to another UI or runtime later if needed.

The MVP needs clear product behavior around hiring stages, deadlines, material
versions, companies, browser discovery, and notifications. It also needs to talk
to external systems such as Tauri, SQLite, the filesystem, OS notifications, and
an in-app browser surface.

## Decision

Organize TypeScript architecture around three systems:

```text
ui
business
adapter
```

`ui` owns React, interaction state, and views.

`business` owns internal business logic, DTOs, value objects, domain rules, and
portable workflows.

`adapter` owns external communication boundaries, interfaces, mappers, and
concrete external-system implementations.

Tauri is treated as an external system from the TypeScript perspective, so
Tauri-specific TypeScript code belongs under `adapter`, not inside business.

## Adapter Organization

Adapter internals should be organized by product capability, not by technology:

```text
adapter/
  jobs/
  companies/
  materials/
  alerts/
  browser/
  common/
```

Each capability folder may contain:

- Interface definitions.
- External record or payload types.
- Mappers between external payloads and business DTOs/value objects.
- Tauri-backed implementations.
- Memory or test implementations.

## Boundary Rules

- Business must not import React, Tauri APIs, filesystem APIs, SQLite APIs, WebView APIs, or OS notification APIs.
- UI may call business workflows and adapter-facing functions, but UI owns display state and view models.
- Adapter implementations may depend on business DTOs/value objects and adapter interfaces.
- Tauri-specific calls such as `invoke` belong in adapter implementations.
- Rust/Tauri code owns native capabilities and is called through adapter implementations.

## Move Logic Out Of Business When

- The logic is only display formatting or view state.
- The logic is specific to Tauri, SQLite, filesystem paths, WebView behavior, or OS notifications.
- The logic maps external records or payloads into business DTOs/value objects.
- The logic handles platform permissions or security-sensitive native operations.

## Consequences

- Business behavior remains portable beyond React and Tauri.
- UI code can stay focused on interaction state and rendering.
- Tauri integration stays replaceable because it is treated as one adapter implementation.
- Adapter folders remain easy to navigate because they are grouped by product capability.
