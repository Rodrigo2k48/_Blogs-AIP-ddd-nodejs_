import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['**/src/infrastructure/orm/**', '**/src/application/webService/**']
    },
  },
});