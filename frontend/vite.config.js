import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcss from './postcss.config.js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.API_URL || 'http://3.26.63.216:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Keeps the /api prefix in the request path
      },
    },
  },
  define: {
    'process.env': JSON.stringify(process.env),
  },
  css: {
    postcss,
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },
  build: {
    sourcemap: true, // Enable source maps for better debugging
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
  },
});
