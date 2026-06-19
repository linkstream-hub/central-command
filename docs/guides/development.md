<!-- generated-by: gsd-doc-writer -->
# Development Guide

APT Central Command internal ops SaaS. This guide covers local setup, project structure, adding routes and components, DAL patterns, schema migrations, TypeScript/lint workflow, and the sprint protocol.

---

## Local Setup

All application code lives in `tech-pwa/`. Work there for any UI, API, or database change.

```bash
# 1. Clone and enter the monorepo root
git clone <repo-url>
cd 1_APT_Central_Command

# 2. Install dependencies
cd tech-pwa
npm install

# 3. Obtain environment file
# No .env.example is checked in. Get .env.local from a team member or the project secrets store.
# See docs/guides/configuration.md for the required variables.

# 4. Start the dev server
npm run dev
# → http://localhost:3000
```

> `legacy-peer-deps=true` is set in `.npmrc`. Do not remove it — it resolves peer conflicts with the current dependency tree.

---

## Build Commands

All commands run from `tech-pwa/`.

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js dev server on `localhost:3000` |
| `npm run build` | Production build |
| `npm run start` | Start production server (after build) |
| `npm run lint` | Run ESLint (`eslint-config-next/core-web-vitals` + TypeScript rules) |
| `npm run seed` | Seed the database via `scripts/seed.ts` |
| `npm run db:generate` | Generate a new Drizzle migration from schema changes |
| `npm run db:migrate` | Apply pending migrations via `scripts/migrate.ts` |
| `npm run db:repair-journal` | Repair the Drizzle migration journal if it gets out of sync |
| `npm run test:unit` | Run Vitest unit tests once |
| `npm run test:unit:watch` | Run Vitest in watch mode |
| `npm run test:unit:coverage` | Run Vitest with coverage report |

---

## Project Structure

```
tech-pwa/
├── src/
│   ├── app/                  # Next.js App Router pages and API routes
│   │   ├── api/              # API route handlers
│   │   │   ├── jobs/         # Job CRUD and sync
│   │   │   ├── schedule/     # Scheduling actions
│   │   │   ├── intake/       # Email intake webhook
│   │   │   ├── comms/        # Communication threads
│   │   │   ├── properties/   # Property/client lookups
│   │   │   ├── auth/         # next-auth endpoints
│   │   │   └── ...           # Other domains
│   │   ├── jobs/             # Tech PWA: job list
│   │   ├── job/[jobId]/      # Tech PWA: single job view
│   │   ├── live/             # Dispatch board (staff)
│   │   ├── team/             # Team management (staff)
│   │   ├── intel/            # Intel dashboard (staff)
│   │   └── layout.tsx        # Root layout
│   ├── components/           # Shared React components
│   │   ├── dashboard/        # Dispatch board components
│   │   ├── BottomNav.tsx     # Tech PWA navigation
│   │   ├── Skeleton.tsx      # Loading states
│   │   └── ...
│   ├── lib/
│   │   ├── dal/              # Data Access Layer (repository pattern)
│   │   │   ├── jobs.ts       # jobsRepository
│   │   │   ├── techs.ts      # techsRepository
│   │   │   ├── time-records.ts
│   │   │   └── mappers.ts    # DB row → domain type transforms
│   │   ├── schema.ts         # Drizzle ORM table definitions (single source of truth)
│   │   ├── db.ts             # Neon + Drizzle client singleton
│   │   ├── auth.ts           # Tech PWA session helpers
│   │   ├── types.ts          # Shared domain types
│   │   ├── permissions.ts    # Role permission checks
│   │   └── ...
│   ├── auth.ts               # next-auth v5 config (office staff)
│   └── types/                # Global TypeScript declarations
├── drizzle/                  # Generated migration SQL files
├── drizzle.config.ts         # drizzle-kit config (reads DATABASE_URL_UNPOOLED)
├── tests/
│   └── e2e/                  # Playwright E2E specs
├── playwright.config.ts
├── vitest.config.ts
├── tsconfig.json
└── eslint.config.mjs
```

---

## Auth Architecture

**Two separate auth systems. Never mix them. Wrong hook causes a redirect loop in production.**

| Page zone | Auth hook | Session store |
|-----------|-----------|---------------|
| Office staff (`/live`, `/schedule`, `/team`, `/intel`, `/admin`, etc.) | `useSession()` from `next-auth/react` | next-auth JWT cookie |
| Tech PWA (`/jobs`, `/job/[jobId]`, `/clock`) | `getSession()` from `@/lib/auth` | `localStorage` (`apt_tech_session`) |

If you are unsure which zone a new page belongs to, flag it before writing the component. See `src/lib/CLAUDE.md` and `RULES.md` for the gate details.

---

## Adding an API Route

1. Create `src/app/api/<domain>/route.ts`.
2. Every route requires dual auth — both checks, no exceptions:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
  // Office staff route: session check only
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // ... handler logic
}
```

For routes that also accept internal service calls (e.g., n8n webhooks), use dual auth:

```typescript
const session = await auth();
const apiKey = request.headers.get('x-api-key');
if (!session && apiKey !== process.env.DASHBOARD_API_KEY) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

**RULES.md hard requirements:**
- No `as any` casts anywhere in the route.
- No `NEXT_PUBLIC_` prefix on server-only secrets.
- Routes touching auth, schema, column indexes, or cross-system writes must be flagged to the merge gate before committing.

---

## DAL Pattern

All database reads and writes go through `src/lib/dal/`. No raw SQL, no direct `db` calls in route handlers.

**Rule: every query must scope by `org_id`.** Unscoped reads are a multi-tenancy violation.

```typescript
// src/lib/dal/jobs.ts — repository pattern
import { db } from '../db';
import { jobs as jobsTable } from '../schema';
import { eq } from 'drizzle-orm';

export const jobsRepository = {
  async getJobById(jobId: string) {
    const [job] = await db
      .select()
      .from(jobsTable)
      .where(eq(jobsTable.jobId, jobId));
    return job ?? null;
  },
};
```

**Key DAL files:**

| File | Repository exported |
|------|---------------------|
| `dal/jobs.ts` | `jobsRepository` — job CRUD |
| `dal/techs.ts` | `techsRepository` — employee/tech roster |
| `dal/time-records.ts` | time record queries |
| `dal/mappers.ts` | DB row → domain `Job` type transforms |

Do not add new Sheets (`sheetsRequest`) calls to the DAL. Neon is the sole write path.

---

## Schema Migrations

Schema is defined in `src/lib/schema.ts` using Drizzle ORM. The `drizzle/` directory contains generated SQL migration files.

**Workflow for schema changes:**

```bash
# 1. Edit src/lib/schema.ts — add or modify table definitions

# 2. Generate the migration SQL
npm run db:generate
# → creates drizzle/NNNN_<slug>.sql and updates meta/_journal.json

# 3. Apply to your dev database
npm run db:migrate

# 4. Commit both schema.ts and the new drizzle/ files
```

drizzle-kit reads `DATABASE_URL_UNPOOLED` from `.env.local` (direct connection, not the pooled URL).

**Gate:** Schema changes must be flagged to the merge gate (Claude Code) before the implement sprint begins. Irreversible without a new migration.

---

## Code Style

**TypeScript:**
- `strict: true` is enabled in `tsconfig.json`. Respect all strict checks.
- Zero `as any` casts. Use `unknown` for untrusted input and narrow safely.
- Export explicit return types on all public functions.
- Infer obvious local variable types — only annotate where inference fails.

**Immutability:**
- Return new objects, never mutate existing ones.
- Use spread for updates: `return { ...job, status: 'Complete' }`.

**No console.log in committed code.** Use Sentry for production error tracking (`@sentry/nextjs` is configured).

**Validation:**
- Use Zod for all external input validation at API route boundaries.
- Infer TypeScript types from Zod schemas (`z.infer<typeof schema>`).

---

## TypeScript and Lint Workflow

Run both before writing the diff artifact:

```bash
# Type check — must be zero errors before sprint is complete
npx tsc --noEmit

# Lint
npm run lint
```

ESLint config (`eslint.config.mjs`) extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`. The `scratch/` and `scripts/` directories are excluded from linting.

---

## Sprint Protocol

Every feature follows this exact sequence. Implement and test are always separate sprints.

```
Branch gate (Task 1 — every sprint):
  git branch --show-current          # must match feat/<name-in-spec>
  git ls-remote --heads origin feat/<name>   # must be non-empty
  git log main..HEAD --oneline       # if empty on pre-existing branch → rebase first

Implement sprint:
  - Commit all changes to feat/<name>
  - npx tsc --noEmit → zero errors required
  - git diff main...HEAD > artifacts/ag_diff.txt   (full branch diff, not HEAD~1)
  - git push
  - Post diff to merge gate → STOP

Diff review (merge gate):
  - Merge gate reads diff + any flagged files
  - PASS → "Clear for test sprint"
  - BLOCK → fix named item only, rewrite diff, re-review

Test sprint (separate session):
  - npm run dev
  - Browser verify each feature item
  - Write artifacts/ag_test_results.txt:
      [PASS] navigated to X, clicked Y, saw Z
      [FAIL] expected X, saw Y
  - Post results to merge gate → STOP

Merge:
  - Merge gate reads test results
  - Any FAIL → fix sprint → retest
  - All PASS → "Clear to merge"
  - Brandon merges PR. Vercel auto-deploys.
  - No commits after merge. Follow-on work = new branch + new plan.
```

**Items that require merge gate approval before implementing:**
- Auth token patterns or session storage keys
- Neon schema changes (new columns, type changes, renames)
- Google Sheets column indexes
- Cross-system writes (Next.js + GAS + Neon in the same action)
- New `/api/` routes replacing existing GAS action strings

---

## Branch Conventions

```
feat/<feature-name>    # all implementation work
```

Never commit to `main` directly. Brandon runs the merge after the merge gate clears the test results.

---

## PR Process

1. Implement sprint complete: `tsc --noEmit` zero, diff in `artifacts/ag_diff.txt`, pushed.
2. Post diff to merge gate for review.
3. Receive "Clear for test sprint" before opening the test sprint.
4. Test sprint complete: results in `artifacts/ag_test_results.txt`, posted to merge gate.
5. Receive "Clear to merge" before asking Brandon to merge.
6. Brandon merges the PR. Sprint is done — no additional commits on that branch.

See `WORKFLOW.md` for the full peer-pair protocol, including which items require the merge gate vs. which AG executes directly.
