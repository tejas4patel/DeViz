import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/DeViz/' : '/',
  plugins: [react()],
  server: { port: 5173 },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
}))
