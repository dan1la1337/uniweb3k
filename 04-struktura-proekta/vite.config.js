import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(import.meta.dirname, 'src/components'),
      pages: path.resolve(import.meta.dirname, 'src/pages'),
      utils: path.resolve(import.meta.dirname, 'src/utils'),
    },
  },
})
