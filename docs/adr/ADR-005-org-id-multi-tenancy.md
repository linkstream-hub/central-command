# ADR-005: org_id Multi-Tenancy on Every Table

**Status:** Accepted — Non-negotiable.  
**Date:** 2026-06-06  
**Deciders:** Brandon Bittner  

---

## Context

The platform is being built as APT CA's internal tool first (Entity 1), but the business model requires it to become a licensed SaaS sold to property management companies (Entity 3) and eventually support additional entities (APT Idaho, Real Estate Acquisition). 

The cost of adding multi-tenancy after the fact — retrofitting `org_id` onto tables with existing production data, rewriting every query to filter by org, adding row-level security — is 10–50x the cost of adding it from day one. Companies that skip this step either rewrite or fork the codebase per customer.

Google Sheets (the original data layer) had no concept of multi-tenancy at all — every "org" would have needed a separate spreadsheet with separate GAS projects. Neon Postgres with `org_id` solves this with a single schema.

---

## Decision

Every table in the Neon schema has an `org_id` column. No exceptions, including internal-only tables.

**Org hierarchy:**
```
HOLDING (central core — portfolio oversight)
    ├── APT-CA     (maintenance, California — current proving ground)
    ├── APT-ID     (maintenance, Idaho — future)
    ├── LAPHAM     (PM client — Stage 1 portal)
    ├── PM-CO-N    (future PM clients)
    └── RE-ACQ     (real estate acquisition)
```

**Implementation:**
- `organizations` table is the root: `id`, `slug`, `name`, `parent_id` (self-referencing FK), `entity_type`
- Every operational table: `org_id TEXT NOT NULL REFERENCES organizations(slug)`
- APT CA rows: `org_id = 'APT-CA'`
- All queries filter by `org_id` — never return cross-entity data except at the Portfolio Admin level

**What this enables:**
- PM SaaS: a new PM company = a new org row + `org_id` on their data. Zero schema changes.
- Idaho entity: same platform, different `org_id`, different compliance ruleset applied at query time
- Per-entity P&L: financial queries group by `org_id` — foundation for employee profit sharing in Idaho model
- Property Registry shared kernel: `properties` table with `org_id` scoping keeps entities isolated while the central core can query across all

---

## Consequences

**Positive:**
- Multi-tenant SaaS architecture is free — first PM client costs zero additional schema work
- Row-level access control (when Firebase migration happens at scale) is a single policy: `org_id = auth.org_id`
- Entity isolation is schema-enforced, not application-enforced

**Negative / Constraints:**
- Every INSERT must supply `org_id` — missing it causes a NOT NULL constraint violation
- Every SELECT must filter by `org_id` unless the caller is explicitly Portfolio Admin level
- Cross-entity queries (portfolio reports) must be explicitly marked and gated — they are not the default
- Migration scripts for existing GAS/Sheets data must assign `org_id = 'APT-CA'` to all backfilled rows
