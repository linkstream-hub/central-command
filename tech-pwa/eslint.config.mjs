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
]);

export default eslintConfig;
