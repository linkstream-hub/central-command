import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    fileParallelism: false,
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    server: {
      deps: {
        inline: ['next-auth', '@auth/core'],
      },
    },
    include: ['src/**/__tests__/**/*.test.ts'],
    coverage: {
      include: [
        'src/lib/compliance.ts',
        // job-transitions.ts deleted in PR #18 — removed from coverage include
        'src/lib/normalizeAddressKey.ts',
        'src/lib/detectLaphamForm.ts',
        'src/lib/access-codes.ts',
        'src/lib/comms-utils.ts',
        'src/domain/**/*.ts',
        'src/lib/services/**/*.ts',
        'src/lib/side-effects/**/*.ts',
        'src/lib/dal/**/*.ts',
      ],
      thresholds: { lines: 90, functions: 90, branches: 80 },
    },
    setupFiles: ['./vitest.setup.ts'],
  },
});
