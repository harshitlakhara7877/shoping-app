import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/ - Forcing restart for UI sync
export default defineConfig({
  base: '/shoping-app/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
