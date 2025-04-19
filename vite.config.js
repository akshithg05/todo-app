import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Output directory for the production build (default is 'dist')
    assetsDir: "assets", // Directory to store static assets like images, etc.
    sourcemap: true, // Optional: For debugging if needed
  },
});
