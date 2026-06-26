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
        'src/lib/normalizeAddressKey.ts',
        'src/lib/detectLaphamForm.ts',
        'src/lib/access-codes.ts',
        'src/lib/comms-utils.ts',
        'src/domain/**/*.ts',
        'src/lib/services/**/*.ts',
        'src/lib/side-effects/**/*.ts',
        'src/lib/dal/**/*.ts',
      ],
      exclude: [
        // GAS-dependent DAL — migration targets, deleted in GAS exit (P2 items 9-10)
        'src/lib/dal/jobs.ts',
        'src/lib/dal/sheets-client.ts',
        'src/lib/dal/techs.ts',
        'src/lib/dal/time-records.ts',
        // Phase 21 stubs — TechAssigned not yet shipped (P1 item 4)
        'src/lib/side-effects/event-bus-executor.ts',
        'src/lib/side-effects/notifications-executor.ts',
        'src/lib/side-effects/index.ts',
        // Re-exports only
        'src/domain/job/index.ts',
        // Needs tests — tracked in ROADMAP, restore when written
        'src/lib/comms-utils.ts',
      ],
      // Thresholds reflect in-scope files after GAS/stub exclusions.
      // Raise to 90/90/80 once job-state.ts + mappers.ts reach full coverage (P1 debt).
      thresholds: { lines: 70, functions: 60, branches: 75 },
    },
    setupFiles: ['./vitest.setup.ts'],
  },
});
