import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: 'src/client/ui',
  plugins: [react()],
  build: {
    outDir: '../../../client/ui/dist',
    emptyOutDir: true,
    rollupOptions: { input: 'index.html' }
  },
  server: {
    port: 5173,
    open: true
  }
});