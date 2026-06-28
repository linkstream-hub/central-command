# SYSTEM_OF_RECORD.md — APT Central Command
# Authoritative data owner per domain. When source conflicts, this wins.
# Last updated: 2026-06-26

---

## DATA OWNERSHIP

| Domain | Source of Truth | Fallback | Notes |
|---|---|---|---|
| Work Orders | Neon Postgres (`work_orders` table) | None | GAS was legacy; fully replaced |
| Job Status FSM | Neon Postgres | None | n8n reads, never writes FSM state |
| Staff Permissions | **GAS** (transitional) | None | TARGET: Neon `staff_permissions` (Phase 1 after auth) |
| Tech (field) Sessions | localStorage (transitional) | None | TARGET: Clerk sessions (Phase 0) |
| Tech Roster | Neon Postgres (`employees` table, `pin_hash` column) | None | 32 techs backfilled, 3 non-numeric badges |
| Email Intake | **Cloudflare Email Routing** (transitional — pending live test) | None | TARGET: live after Gmail auto-forward to apt-main.com + MX confirmed (Phase 0) | <!-- fix/s171-field-fixes -->
| Push Subscriptions | **GAS** (transitional) | None | TARGET: Neon (Phase 3) |
| File/Photo Uploads | **Broken** (S3 wrapper throws) | None | TARGET: UploadThing (Phase 0) |
| Dispatch Queue | Neon Postgres | None | Dispatcher reads from Neon |
| Scheduling | Google Sheets + Buildertrend ICS | None | CC is NOT scheduling source of truth; dispatcher uses Sheets |
| Domain Events | n8n memory (transitional) | None | TARGET: Neon `domain_events` outbox (Phase 4) |
| Properties/RM Data | Neon (`properties` table) | None | Never read from Sheets |

---

## TIMEKEEPING SOURCE OF TRUTH

**DECISION: Vendor owns timekeeping. CC records operational events only.**

Decided 2026-06-26 by Brandon: "Don't reinvent the wheel."

```yaml
decision: Option B — Vendor is legal timekeeping source of truth
vendor_options: [Deputy, Gusto, QuickBooks Time]
cc_role: Record clock-in/out events for job tracking only
vendor_role: All legal compliance, PAGA liability, payroll integration
custom_compliance_code: DELETE — do not build, do not maintain
vendor_selection: Deputy
decided: 2026-06-26
```

AG builds clock-event integration against Deputy REST API. CC issues Task Card after Phase 0 gates clear.

---

## AUTH SYSTEM OWNERSHIP

Two independent auth systems — never mix hooks:

```yaml
staff_auth:
  mechanism: Google OAuth (NextAuth v5)
  session: NextAuth JWT (server-managed)
  permissions: GAS → TARGET Neon staff_permissions table
  routes: /dashboard/**, /api/** (staff)

tech_auth:
  mechanism: Badge + PIN
  session: localStorage['apt_tech_session'] → TARGET HttpOnly cookie
  routes: /field/**, /api/** (tech)
```

See `docs/AUTH_MODEL.md` for canonical auth architecture.

---

## GAS SURFACE (shrinking)

Current legitimate GAS usage (Phase 4 removes all):

| GAS Script | Purpose | Replacement |
|---|---|---|
| Code.js | Email polling trigger, forward to n8n webhook | Cloudflare Email Routing (Phase 0) |
| DashboardAPI.gs | Staff permissions API | Neon staff_permissions table (Phase 1) |
| TechPWA.gs | Legacy tech data (minimal) | Already migrated to Neon |

No new GAS code. No new GAS features. Ever.

---

## ENVIRONMENT SOURCE OF TRUTH

See `docs/ENVIRONMENT_MAP.md` for complete variable inventory.

Rule: Server-only secrets use `VARIABLE_NAME` (no `NEXT_PUBLIC_` prefix). Client-safe flags use `NEXT_PUBLIC_` only for genuinely public, non-secret values.

---

## DATA MIGRATION STATE

```yaml
migrations_applied: 7 (0001–0007)
migration_0008: NOT in prod (dispatch_sent_at removed, column dropped PR #22)
pending_migrations: none
migration_process: MANUAL — must be fixed in Phase 2 (atomic build-time migration)
```
