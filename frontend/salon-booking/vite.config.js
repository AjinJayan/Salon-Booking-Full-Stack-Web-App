import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    nodePolyfills({
      // To add specific polyfills, include them in the list
      include: ["crypto"],
      globals: {
        Buffer: true,
      },
    }),
  ],
  define: {
    "process.env": {},
  },
  resolve: {
    alias: {
      crypto: "crypto-browserify",
      stream: "stream-browserify",
      util: "util/",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
    },
  },
});
