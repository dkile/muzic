# 0004. Template Assets and Tauri Icons

## Status

Accepted

## Context

The project started from a Tauri, Vite, React template. Template projects include
web assets such as `public/vite.svg` and `public/tauri.svg`, plus native app icon
files under `src-tauri/icons/`.

These asset groups serve different purposes:

- `public/` files are frontend web assets served to the webview.
- `src-tauri/icons/` files are native bundle icons used by Tauri packaging and
  platform-specific app metadata.

## Decision

Remove unused template web assets from `public/`.

Do not delete `src-tauri/icons/` as part of ordinary frontend asset cleanup.

Replace `src-tauri/icons/` only when the project has a real app icon and the
Tauri icon set can be regenerated or the Tauri bundle config can be updated
intentionally.

## Consequences

- The web asset surface stays free of unused Vite and Tauri template files.
- Tauri build and platform packaging keep the icon files they expect.
- App branding can be handled later as one intentional icon replacement step
  instead of a piecemeal cleanup.
