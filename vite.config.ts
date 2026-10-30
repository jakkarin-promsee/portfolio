import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isPreview }) => ({
  plugins: [
    react(),
    {
      name: 'preview-trailing-slash-routes',
      configurePreviewServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = new URL(req.url ?? '/', 'http://localhost')
          if (/^\/(?:journey|repositories(?:\/[^/]+)?)$/.test(url.pathname)) {
            res.statusCode = 308
            res.setHeader('Location', `${url.pathname}/${url.search}`)
            res.end()
            return
          }
          next()
        })
      },
    },
  ],
  // Production preview should serve each generated HTML file, without SPA fallback.
  appType: isPreview ? 'mpa' : 'spa',
  // The project/ directory holds independent repository clones with their own HTML files.
  optimizeDeps: { entries: ['index.html'] },
}))
