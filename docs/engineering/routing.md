# Routing

## Purpose

This document defines the UI routing policy for the Tauri webview app.

The accepted decision record is
`docs/decisions/0003-tanstack-router-hash-history.md`.

## Router

Use TanStack Router for UI routing.

Use code-based route definitions instead of file-based route generation. The
current app is a desktop app with a small set of product sections, so an explicit
route tree is easier to reason about than generated route conventions.

## Location

Keep route setup in `src/ui/app/router.ts`.

That file owns:

- The TanStack route tree.
- The history implementation.
- Route-level placeholder wiring before pages exist.
- Future routing policy changes such as browser history or deep-link handling.

Do not create history instances from page or feature code.

## History

Use hash history for the Tauri app.

The packaged app loads frontend assets through the webview, closer to static
asset loading than a server with path rewrites. Hash routes keep production
startup and reload behavior stable because the fragment is not part of the asset
request path.

Example app routes:

- `#/`
- `#/discovery`
- `#/processes`
- `#/materials`
- `#/alerts`

The URL is less visually clean than browser history, but the desktop app has no
user-facing address bar.

## Usage Rules

Route-aware UI should use TanStack Router APIs such as route definitions, links,
and navigation helpers.

Avoid reading or writing `window.location` directly for app navigation state.
Keeping route access behind the router makes it easier to switch from hash
history to browser history later.

## Current Routes

The primary MVP page routes are:

- `/`
- `/discovery`
- `/processes`
- `/materials`
- `/alerts`

Pages are route-level entry points. They should stay thin and avoid owning the
global app skeleton, navigation policy, domain rules, or persistence concerns.
