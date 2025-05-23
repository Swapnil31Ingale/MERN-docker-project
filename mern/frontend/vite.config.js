import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/record': {
        target: 'http://backend:5050',
        changeOrigin: true,
      },
    },
  },
})

