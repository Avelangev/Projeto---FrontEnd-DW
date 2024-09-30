import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        main: './public/index.html',
        login: './public/login.html',
        register: './public/register.html',
      }
    }
  }
});
