import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // The project/ directory holds independent repository clones with their own HTML files.
  optimizeDeps: { entries: ['index.html'] },
})
