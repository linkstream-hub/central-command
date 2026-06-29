# PRODUCTION_FINGERPRINT.md — APT Central Command
# Snapshot of production system state. Refresh after any deploy, migration, or env change.
# Last updated: 2026-06-29 by CC (Phase 0 Gate 10)

---

## Deployed Commit

```yaml
sha: d2c7328df1627ede8bbe0bec9626c80c62821da9
message: "chore(phase0): close rollback + auth gates; update evidence register"
committed: 2026-06-28 20:58:37 -0600
branch: main
vercel_deployment: dpl_2ioo2CRH9UQA5eE993NDzpDXhLw3
promoted_to_production: 2026-06-29 (manually — Instant Rollback was active, blocked auto-promote)
```

---

## Runtime

```yaml
next_js: "16.2.6"
source: package.json + node_modules/next/package.json (both confirm 16.2.6)
status: PHANTOM — version 16.2.6 does not exist on npm; package ecosystem unverified (P0-004)
fix_phase: Phase 2 (pin to stable 15.x)
bundler: Turbopack (confirmed in all recent Vercel deployment metadata)
runtime: nodejs (confirmed Vercel deployment metadata)
```

---

## Environment Variables

Names only. No values. Source: docs/ENVIRONMENT_MAP.md.

### Confirmed present (Vercel production):
| Variable | Scope | Note |
|---|---|---|
| `DATABASE_URL` | Server | Neon Postgres (purple-dust-72858226) |
| `AUTH_SECRET` | Server | NextAuth JWT |
| `GOOGLE_CLIENT_ID` | Server | Google OAuth |
| `GOOGLE_CLIENT_SECRET` | Server | Google OAuth |
| `RESEND_API_KEY` | Server | Confirmed present by Brandon 2026-06-29 |
| `N8N_API_KEY` | Server | Rotated ~2026-06-24, expires ~2026-07-10 |
| `NEXT_PUBLIC_DASHBOARD_API_URL` | Client | P0 VIOLATION — server-only, wrong prefix; fix Phase 1 |
| `NEXT_PUBLIC_APP_URL` | Client | Genuinely public |
| `UPLOADTHING_SECRET` | Server | UploadThing server validation |
| `NEXT_PUBLIC_UPLOADTHING_APP_ID` | Client | UploadThing client init |
| `VERCEL_ENV` | Server | Vercel-injected |
| `NODE_ENV` | Server | Node-injected |

### Status unknown / not confirmed:
| Variable | Required By | Risk |
|---|---|---|
| `EMAIL_INBOUND_TOKEN` | `/api/intake/email` Cloudflare webhook validation | REQUIRED for inbound email — unconfirmed in Vercel prod |
| `GEMINI_API_KEY` / `GOOGLE_AI_API_KEY` | `/api/webhooks/n8n/gmail` | P2-005 OPEN — 4 occurrences "Missing Google AI API Key" (2026-06-24) |
| `DASHBOARD_API_KEY` | `/api/gas` dual-auth, `/api/list-employees` | Required for n8n → API calls; unconfirmed |
| `DATABASE_URL_TEST` | CI only | Not expected in production |
| `DEV_BYPASS_AUTH` | Dev/preview only | Must NOT be set in production |

### Phase 0 vars not yet added (Clerk/Deputy not implemented):
| Variable | Phase |
|---|---|
| `CLERK_SECRET_KEY` | Phase 1 |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Phase 1 |
| `TIMEKEEPING_API_KEY` | Phase 1 |

---

## Database Migration State

**Project:** purple-dust-72858226 (Neon, post-infra-migration 2026-06-23)
**Migration tool:** Drizzle Kit

| Migration | Name | Drizzle-Tracked | Applied to Prod | Schema Effect | Confirmed By |
|---|---|---|---|---|---|
| 0000 | conscious_microchip | YES (DB id=1) | YES | Base schema | drizzle.__drizzle_migrations |
| 0001 | nervous_black_queen | YES (DB id=2) | YES | — | drizzle.__drizzle_migrations |
| 0002 | noisy_shinko_yamashiro | YES (DB id=3) | YES | — | drizzle.__drizzle_migrations |
| 0003 | mysterious_darkhawk | YES (DB id=4) | YES | — | drizzle.__drizzle_migrations |
| 0004 | normalize_job_status_names | YES (DB id=5) | YES | — | drizzle.__drizzle_migrations |
| 0005 | cloudy_nitro | YES (DB id=6) | YES | — | drizzle.__drizzle_migrations |
| 0006 | glossy_puck | YES (DB id=7) | YES | — | drizzle.__drizzle_migrations |
| 0007 | curly_kree (workflow_events CREATE) | NO | **NO** | `workflow_events` ABSENT in prod | Neon query 2026-06-29; `apply-0007-prod.sql` targeted OLD project `ep-jolly-morning` only — never re-run after infra migration |
| 0008 | fixed_kingpin (dispatch_sent_at DROP) | NO | YES (manual) | `dispatch_sent_at` absent from `jobs` | Neon column query 2026-06-29 |
| 0009 | curly_rumiko_fujikawa (job_photos CREATE) | NO | **NO** | `job_photos` ABSENT in prod → **UploadThing BROKEN** | Neon table query 2026-06-29 |
| 0010 | uploadthing (job_photos ALTER) | NO | **NO** | Depends on 0009; cannot run | N/A |

### Schema gaps requiring action before Phase 2:
```
CRITICAL: job_photos table missing → UploadThing photo uploads fail at DB insert (P1-009)
HIGH:     workflow_events table missing → any code writing events to workflow_events fails (P2-008)
          apply-0007-prod.sql must be re-run against purple-dust-72858226
```

---

## package-lock State

```yaml
next_pinned_version: "16.2.6"  # package.json line: "next": "16.2.6"
node_modules_version: "16.2.6"  # confirmed node -e require('./tech-pwa/node_modules/next/package.json').version
lock_file: tech-pwa/package-lock.json (exists, committed)
risk: Phantom version — no verified npm provenance. Phase 2 gate must pin to stable 15.x.
```

---

## Invalidation Triggers

This doc is stale if any of the following occur:
- New commit merged to main
- Any migration applied to production DB
- Any Vercel environment variable added, removed, or rotated
- Vercel project config changes (team, deployment hooks, ignore rules)

Refresh: run `git log -1`, query `drizzle.__drizzle_migrations`, check ENVIRONMENT_MAP.md.
