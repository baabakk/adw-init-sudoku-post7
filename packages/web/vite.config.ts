import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration for the web-client package.
export default defineConfig({
  root: '.',
  plugins: [react()],
  server: {
    // Assuming the backend services are proxied under /api during development.
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Adjust to actual backend URL.
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
    },
  },
});
