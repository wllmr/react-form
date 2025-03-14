import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: 'dist',
      include: ['src/**/*.ts', 'src/**/*.tsx'],
    }),
  ],

  root: path.resolve(__dirname, 'example'),

  server: {
    port: 3000,
    open: true,
  },

  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'ReactForm',
      formats: ['es', 'umd'],
      fileName: (format) => `react-form.${format}.js`,
    },
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@js-temporal/polyfill': 'Temporal',
        },
      },
    },
  },

  resolve: {
    alias: {
      '@js-temporal/polyfill': path.resolve(
        __dirname,
        'node_modules/@js-temporal/polyfill'
      ),
    },
  },
});
