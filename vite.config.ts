import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    proxy: {
      "/wine-api": {
        target: "http://localhost:9000",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/wine-api/, "")
      }
    }
  },
  build: {
    outDir: "build"
  }
});
