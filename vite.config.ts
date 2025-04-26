import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  publicDir: 'gfiles/html5',
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
