import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: "dist",
      include: ["src/**/*.ts", "src/**/*.tsx"],
    }),
  ],
  build: {
    lib: {
      entry: "src/index.tsx",
      name: "ReactForm",
      formats: ["es", "umd"],
      fileName: (format) => `react-form.${format}.js`,
    },
    outDir: "dist",
    sourcemap: true, // Optional: Generates source maps
    rollupOptions: {
      external: ["react", "react-dom", "@js-temporal/polyfill"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@js-temporal/polyfill": "Temporal",
        },
      },
    },
  },
});
