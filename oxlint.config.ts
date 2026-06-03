import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["typescript"],
  ignorePatterns: ["src-tauri/*"],
  rules: {},
  options: {
    typeAware: true,
    typeCheck: true,
  },
});
