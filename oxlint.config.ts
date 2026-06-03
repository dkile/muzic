import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript"],
  rules: {},
  ignorePatterns: ["src-tauri/*"],
});
