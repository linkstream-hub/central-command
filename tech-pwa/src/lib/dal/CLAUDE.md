# Gate: DAL / Database

1. **No raw SQL.** Use Drizzle ORM. All queries go through `lib/dal/` repository functions.
2. **Schema changes require a migration.** Run `drizzle-kit generate` before touching table structure.
3. **Every query scopes by `org_id`.** No unscoped table reads — multi-tenancy is non-negotiable.
4. **No cross-domain JOINs in application code.** Each domain owns its tables.
5. **Neon is the sole write path** (cutover: 2026-06-01). `sheetsRequest` writes in this layer are dead code — do not add new ones.

The real update path for jobs is `/api/jobs/[jobId]` PATCH, not `jobsRepository.updateJob`.

> Ref: ADR-002, ADR-005, ADR-006
