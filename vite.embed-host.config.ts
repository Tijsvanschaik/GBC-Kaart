import { defineConfig } from "vite";
import { resolve } from "node:path";

/** Separate origin for cross-origin iframe resize testing (port 5174). */
export default defineConfig({
  root: resolve(__dirname, "embed-host"),
  server: {
    port: 5174,
    strictPort: true,
  },
  preview: {
    port: 4174,
    strictPort: true,
  },
});
