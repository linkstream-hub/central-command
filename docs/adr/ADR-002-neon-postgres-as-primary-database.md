# ADR-002: Neon Postgres as Primary Database

**Status:** Accepted  
**Date:** 2026-06-06  
**Deciders:** Brandon Bittner  

---

## Context

The original system used Google Sheets as its entire data layer — a single spreadsheet with 15+ tabs serving as the database for every domain. This created:

- No bounded context separation — every feature touched every sheet
- No referential integrity — lookups were string matching on raw cell values
- No transaction safety — concurrent writes caused silent data corruption
- No query capability — reporting required manual exports or Apps Script loops
- Hard multi-tenancy ceiling — Sheets cannot be org_id scoped without building an entire access control layer on top of cell ranges

Alternatives evaluated at decision time:
- **Supabase** — managed Postgres with built-in auth and realtime. Rejected: adds a parallel auth system (Supabase Auth) that conflicts with next-auth + badge/PIN architecture; realtime features not needed in Phase 3.
- **PlanetScale** — serverless MySQL. Rejected: MySQL dialect, no branching model compatible with preview deploy workflow, schema changes more painful.
- **Firebase Firestore** — document store with realtime. Rejected: wrong data model for relational WO lifecycle; would require full rewrite when PM SaaS hits scale. Noted as Phase 5+ migration target if multi-tenant SaaS exceeds 50 clients.
- **Railway Postgres** — self-managed Postgres on Railway. Rejected: no branching, no serverless scaling, operational overhead.

---

## Decision

Use **Neon Postgres** (serverless Postgres) as the primary database, accessed via **Drizzle ORM**.

**Why Neon specifically:**
- Database branching — each PR gets an isolated Neon branch (preview environment). Migrations are tested against real data shapes before merging to production.
- Serverless scaling — no idle compute cost; scales to zero between requests.
- Compatible with Vercel's deploy model — connection pooling via pgBouncer endpoint for Next.js edge/serverless functions.
- Standard Postgres — no proprietary dialect. Can migrate to any Postgres host (RDS, Railway, self-hosted) without code changes.

**Why Drizzle ORM:**
- TypeScript-native — schema defined in code, types inferred at compile time
- Lightweight — no N+1 footgun from lazy loading (unlike Prisma relations)
- Migration files are plain SQL — readable, reviewable, and reversible
- Schema location: `tech-pwa/src/lib/schema.ts`

**Multi-tenancy design:** `org_id` column on every table from day one. APT CA = `APT-CA`. This is non-negotiable — adding `org_id` after the fact to a production table with millions of rows is a painful migration. It costs nothing to add it now.

---

## Migration Strategy

Phase 3 cut-over completed 2026-06-01:
- Neon is the sole write path for all dispatch data
- Google Sheets Dispatch Queue is locked as read-only archive
- `WRITE_PATH_NEON_ONLY=true` set in GAS Script Properties

**Note on DAL:** As of the cut-over, `dal/jobs.ts:updateJob` still contains Sheets shadow-write logic that predates the cut-over. This code should be cleaned up to write directly to Neon. The Sheets path is now effectively dead but not yet removed.

---

## Consequences

**Positive:**
- Full SQL expressiveness for complex reporting and aggregation
- Referential integrity enforced at the DB level
- Schema migrations tracked in version control (`drizzle-kit`)
- Preview environments get isolated databases automatically

**Negative / Constraints:**
- Neon project has a 10-branch limit — do not create branches without deleting stale ones
- Connection pooling is required for serverless functions (use POOLED endpoint in `.env.local`, UNPOOLED only for migrations)
- All schema changes require a migration file — never use `push` mode in production
