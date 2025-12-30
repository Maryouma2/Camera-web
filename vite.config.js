import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  },
  // Ensure client-side routing works in production
  server: {
    historyApiFallback: true,
  },
  preview: {
    port: 4173,
    host: true,
  }
})