import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/coco_bongo_calculator/",
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
