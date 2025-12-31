import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: "./index.js", // <-- your main entry point
      name: "DraftifyReact",
      fileName: (format) => `draftify-react.${format}.js`,
    },
    rollupOptions: {
      // externalize dependencies that shouldn’t be bundled
      external: ["react", "react-dom", "draftify"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          draftify: "Draftify",
        },
      },
    },
  },
});
