import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    hmr: {
      timeout: 120000,
      overlay: true,
    },
  },
  base: '/careerlift/',
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-ui': ['lucide-react', 'react-hot-toast'],
          'vendor-motion': ['framer-motion'],
          'vendor-forms': ['react-hook-form', 'zod'],
          'vendor-state': ['zustand'],
        },
      },
    },
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1500,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lucide-react',
      'react-hot-toast',
      'framer-motion',
      'react-hook-form',
      'zod',
      'zustand'
    ],
    exclude: [],
  },
  preview: {
    port: 3000,
    strictPort: true,
    host: true,
  },
});