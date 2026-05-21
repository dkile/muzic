# 0003. TanStack Router With Hash History

## Status

Accepted

## Context

The app is a desktop-first Tauri application. The frontend runs inside a
webview and is packaged as static assets in production. During development,
Vite can serve fallback paths, but production webview asset loading should not
depend on browser-history path rewrites.

The webview includes browser-like rendering, DOM, JavaScript, and common Web
APIs, but it is still an application surface rather than a full browser product
with an address bar, tabs, or server-backed routing. Native capabilities remain
behind Tauri boundaries.

The app still benefits from route-level page structure for the primary MVP
sections: discovery, processes, materials, and alerts.

## Decision

Use TanStack Router for UI routing.

Use code-based route definitions instead of file-based route generation.

Use hash history as the default history implementation for the Tauri app.

Keep the route tree and history policy localized in `src/ui/app/router.ts`.

Use TanStack Router navigation APIs instead of reading or writing
`window.location` directly in UI code.

## Consequences

- Packaged Tauri routing stays stable because `#/path` fragments do not require
  a production asset fallback for every app route.
- Route policy can be changed later by replacing the history setup in one place.
- Code-based routes keep the route tree explicit and avoid adding route
  generation conventions before the app needs them.
- The URL is less visually clean, but the desktop app has no user-facing address
  bar, so this is a low-cost tradeoff for the MVP.
- Future browser-history or deep-link work should be localized around the router
  setup instead of spread across page components.
