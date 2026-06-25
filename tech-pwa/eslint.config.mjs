import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "scratch/**",
    "scripts/**",
    // Root utility/migration scripts — not app code
    "check-dupes.js",
    "check-jobs.js",
    "check-statuses.js",
    "check-time-records.js",
    "get-all-gids.js",
    "get-gids.js",
    "smoke.ts",
    // Generated output directories
    "coverage/**",
    "graphify-out/**",
  ]),
  // ADR-014 Block 1: domain/ must not import infrastructure
  {
    files: ['src/domain/**/*.ts', 'src/domain/**/*.tsx'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          { group: ['next', 'next/*'], message: 'domain/ must not import Next.js — ADR-014' },
          { group: ['next-auth', 'next-auth/*'], message: 'domain/ must not import next-auth — ADR-014' },
          { group: ['@/lib/db', '@/lib/db/*'], message: 'domain/ must not import Drizzle instance — ADR-014' },
          { group: ['@/lib/schema', '@/lib/schema/*'], message: 'domain/ must not import Drizzle schema — ADR-014' },
          { group: ['react', 'react/*'], message: 'domain/ must not import React — ADR-014' },
        ],
      }],
    },
  },
  // ADR-014 Block 2: callers must use domain/job index, not internals
  {
    files: ['src/app/**/*.ts', 'src/app/**/*.tsx', 'src/lib/**/*.ts', 'src/components/**/*.ts', 'src/components/**/*.tsx'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          {
            group: ['@/domain/job/job-state', '**/domain/job/job-state'],
            message: 'Import from @/domain/job (index), not @/domain/job/job-state directly — ADR-014',
          },
        ],
      }],
    },
  },
  // Phase 20: Auth Lint Rule 1 - Tech routes must not import next-auth or @/auth
  {
    files: [
      'src/app/job/**/*.tsx', 'src/app/job/**/*.ts',
      'src/app/jobs/**/*.tsx', 'src/app/jobs/**/*.ts',
      'src/app/clock/**/*.tsx', 'src/app/clock/**/*.ts',
      'src/app/change-pin/**/*.tsx', 'src/app/change-pin/**/*.ts',
      'src/app/hours/**/*.tsx', 'src/app/hours/**/*.ts',
      'src/app/time-off/**/*.tsx', 'src/app/time-off/**/*.ts',
      'src/app/api/field/**/*.ts',
    ],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          { group: ['next-auth', 'next-auth/*'], message: 'Tech routes must use @/lib/auth (Badge+PIN), not next-auth — Phase 20' },
          { group: ['@/auth', '*/auth'], message: 'Tech routes must use @/lib/auth (Badge+PIN), not next-auth — Phase 20' },
        ],
      }],
    },
  },
  // Phase 20: Auth Lint Rule 2 - Office routes must not import @/lib/auth (which is tech session)
  {
    files: [
      'src/app/billing/**/*.tsx', 'src/app/billing/**/*.ts',
      'src/app/calendar/**/*.tsx', 'src/app/calendar/**/*.ts',
      'src/app/compliance/**/*.tsx', 'src/app/compliance/**/*.ts',
      'src/app/feedback/**/*.tsx', 'src/app/feedback/**/*.ts',
      'src/app/hr/**/*.tsx', 'src/app/hr/**/*.ts',
      'src/app/intake/**/*.tsx', 'src/app/intake/**/*.ts',
      'src/app/intel/**/*.tsx', 'src/app/intel/**/*.ts',
      'src/app/live/**/*.tsx', 'src/app/live/**/*.ts',
      'src/app/team/**/*.tsx', 'src/app/team/**/*.ts',
      'src/app/track/**/*.tsx', 'src/app/track/**/*.ts',
      'src/app/weekly-schedule/**/*.tsx', 'src/app/weekly-schedule/**/*.ts',
      'src/components/dashboard/**/*.tsx', 'src/components/dashboard/**/*.ts',
      'src/app/api/admin/**/*.ts', 'src/app/api/comms/**/*.ts',
      'src/app/api/dashboard/**/*.ts', 'src/app/api/intake/**/*.ts',
      'src/app/api/schedule/**/*.ts'
    ],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [
          { group: ['@/lib/auth', '*/lib/auth'], message: 'Office routes must use next-auth (Google SSO), not @/lib/auth — Phase 20' },
        ],
      }],
    },
  },
  // Suppress false positives: _-prefixed args/destructured params are intentionally unused
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      }],
    },
  },
]);

export default eslintConfig;
