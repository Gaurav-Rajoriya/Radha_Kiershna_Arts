
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (
            id.includes('@react-three') ||
            id.includes('/three/')
          ) {
            return 'three-vendor'
          }

          if (id.includes('gsap')) {
            return 'animation-vendor'
          }

          if (id.includes('lucide-react')) {
            return 'icons-vendor'
          }

          if (
            id.includes('react-dom') ||
            id.includes('react-router') ||
            id.includes('/react/')
          ) {
            return 'react-vendor'
          }
        },
      },
    },
  },
})
