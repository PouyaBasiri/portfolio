import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// VITE_BASE is only needed for GitHub Pages project sites (e.g. "/my-repo/").
// On Vercel / Netlify / a custom domain it stays "/".
export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  plugins: [react(), tailwindcss()],
});
