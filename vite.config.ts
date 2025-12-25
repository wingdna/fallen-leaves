
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // CRITICAL: Ensures assets work on GitHub Pages / IPFS subdirectories
  define: {
    // Inject API Key safely for client-side usage
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
    'global': 'window',
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'es2020', // Lower target slightly for better compatibility
  },
  server: {
    port: 3000
  }
});
