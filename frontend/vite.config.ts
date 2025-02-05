import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const basePath = process.env.NODE_ENV === "production"
  ? "/"
  : "http://localhost:5173"

export default defineConfig({
  plugins: [react()],
  envDir: path.resolve(__dirname, "../"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: basePath,
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "terser",
    chunkSizeWarningLimit: 2000,
  },
  server: {
    port: 5173,
    cors: {
      origin: basePath,
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
  },
})
