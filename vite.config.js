import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/image-editor",
  server: {
    port: 3003,
  },
  optimizeDeps: {
    include: ["fabric"],
  },
});
