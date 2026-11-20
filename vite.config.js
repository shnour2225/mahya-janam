import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  appType: 'mpa',
  build: {
    target: 'es2022',
    rollupOptions: {
      input: {
        index: resolve(process.cwd(), 'index.html'),
        'mahya-janam': resolve(process.cwd(), 'mahya-janam.html'),
      },
    },
  },
});
