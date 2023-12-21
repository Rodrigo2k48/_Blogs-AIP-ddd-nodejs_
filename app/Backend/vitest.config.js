import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['**/src/application/webService/app.ts', '**/src/infrastructure/middleware/HttpErrorMiddleware.ts', '**/node_modules/**', '**/dist/**'],
    },
  },
});
