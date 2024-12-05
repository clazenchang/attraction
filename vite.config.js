import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default defineConfig({
  plugins: [
    vue(),
  ],
  base:"./",
  server: {      // change port
    port: 3001,
    proxy: {
      '/api': {
        // target: 'http://localhost:5000',
        target: 'https://basic-backend.fly.dev',  // cancel slash
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
  },
  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
