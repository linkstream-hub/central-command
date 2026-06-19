import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/__tests__/**/*.test.ts'],
    coverage: {
      include: ['src/lib/compliance.ts', 'src/lib/job-transitions.ts', 'src/lib/normalizeAddressKey.ts', 'src/lib/detectLaphamForm.ts', 'src/lib/access-codes.ts'],
      thresholds: { lines: 100, functions: 100, branches: 90 },
    },
  },
});
