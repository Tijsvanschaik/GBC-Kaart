import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  // Relative base keeps the build usable on unknown subpaths.
  base: "./",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
});
