import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/codespaces-react/',
  plugins: [react()],
  server: { port: 3000 },
});