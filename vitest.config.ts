import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const dir = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  test: { include: ["tests/unit/**/*.test.ts"] },
  resolve: {
    alias: [
      { find: /^@\//, replacement: dir("./src/") },
      { find: /^@content\//, replacement: dir("./content/") },
    ],
  },
});
