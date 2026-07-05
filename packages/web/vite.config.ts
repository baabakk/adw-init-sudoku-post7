import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Ensure the contracts package resolves correctly.
      '@init-sudoku-post7/contracts': path.resolve(__dirname, '../contracts/src'),
    },
  },
  server: {
    // Proxy API calls to the backend services during development.
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Adjust as needed for the actual service host.
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
