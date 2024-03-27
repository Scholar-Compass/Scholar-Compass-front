import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'out',
    // https://vitejs.dev/guide/backend-integration.html
    manifest: true,
    rollupOptions: {
      input: '/src/main.tsx',
    },
  },
});
