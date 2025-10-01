import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.cjs",
  },
  server: {
    fs: {
      allow: ["."],
    },
    headers: {
      "Content-Security-Policy":
        process.env.NODE_ENV === "production"
          ? "script-src 'self';"
          : "script-src 'self' 'unsafe-eval' 'unsafe-inline';",
    },
    proxy: {
      "/api/optimizer": {
        target: "http://localhost:5173",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/optimizer/, ""),
      },
      "/api/v1": {
        target: "http://localhost:8081",
        changeOrigin: true,
      },
    },
  },
});