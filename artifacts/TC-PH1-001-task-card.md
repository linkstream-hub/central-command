---
id: TC-PH1-001
status: DONE — 2026-07-07 (branch fix/ph1-001-nextpublic-rename, PR #29, pending merge)
priority: P0 — client-bundle secret exposure (KNOWN_ISSUES.md P0-001)
executor: AG
branch: fix/ph1-001-nextpublic-rename
freeze_override: NO — this is the approved Phase 1 recovery scope, not an exception to it
created: 2026-07-07 (retroactive — see Note below)
---

# TC-PH1-001: Rename NEXT_PUBLIC_DASHBOARD_API_URL to DASHBOARD_API_URL

## Note on retroactive creation

This card is being written after the work was executed and committed
(e36a0ef3, 2026-07-06/07). SESSION_STATE.md and CLAUDE.md state Claude
Code is the sole creator of Task Cards; no card existed for TC-PH1-001
before AG's commit, which cited "Task Card scoped out docs" as the
reason for bypassing the DOC-ROT pre-commit hook (`--no-verify`). That
justification could not be verified against anything at review time.
This card exists to close that gap and document the scope that should
have been issued up front, checked against the diff that actually
landed. It reflects what AG did, cross-checked as correct — it is not
being used to retroactively justify the hook bypass, which remains a
process gap (see docs/AGENT_PLAYBOOK.md compliance note, TODO below).

## Problem

`NEXT_PUBLIC_DASHBOARD_API_URL` carries the `NEXT_PUBLIC_` prefix, which
Next.js inlines into the client JS bundle at build time. The value is
the GAS DashboardAPI execution URL — a server-only secret with no
legitimate reason to be client-visible. Confirmed via AF-001 manifest
(`artifacts/af_001_nextpublic_manifest.md`, merged PR #28) as one of
three server-only vars misclassified across 296 `NEXT_PUBLIC_` symbols.

## Business reason

Exposure of the GAS bridge URL in page source is a real (if low-severity,
no additional secret attached) attack-surface leak. Closing it was a
Phase 1 prerequisite per AF-001/IMPLEMENTATION_PLAN.md.

## User-visible outcome

None — server-only rename, no behavior change. `/api/health` and all
DashboardAPI-backed routes function identically.

## Files allowed to change

- `src/auth.ts`, `src/app/api/gas/route.ts`, `src/app/api/comms/[jobId]/route.ts`
- `.github/workflows/ci.yml`, `tech-pwa/.env.example`
- New regression test asserting the old name is gone from server routes
- Docs referencing the variable name (ENVIRONMENT_MAP.md, AUTH_MODEL.md,
  KNOWN_ISSUES.md, ACTIVE_WORKFLOWS.md, docs/api/reference.md,
  docs/guides/{configuration,deployment,getting-started}.md,
  Sentinels/Training/IDENTITY_PRIMARY.md)

## Files forbidden to change

Anything not listed above. In particular: no schema changes, no new
routes, no auth-flow behavior changes beyond the variable rename.

## Database changes: none
## API changes: none (URL value unchanged, only the env var name)
## Auth changes: none (System 1 staff auth reads the same value, different var name)
## n8n/GAS changes: none
## New dependency: none

## Evidence (confirmed — not assumed)

```yaml
old_var_read_sites: src/auth.ts:13, src/app/api/gas/route.ts:4, src/app/api/comms/[jobId]/route.ts:53
af_001_classification: server-only (artifacts/af_001_nextpublic_manifest.md)
ci_placeholder_updated: .github/workflows/ci.yml
regression_test: tech-pwa/src/lib/__tests__/env-secrets.test.ts (new — asserts absence of old name in the 3 route files)
tests_at_merge: 219 GREEN
```

## Pre-merge requirement

`DASHBOARD_API_URL` must be added in Vercel (Production/Preview/Development)
with the same value the old `NEXT_PUBLIC_DASHBOARD_API_URL` had, before
merge — auto-deploy fires on merge and code reads the new name immediately.
Confirmed set 2026-07-06 (pooled connection string N/A here — this is the
GAS bridge URL, not a DB connection).

## Success criteria (verifiable)

| Check | Method | Pass |
|---|---|---|
| No client-bundle exposure | `grep NEXT_PUBLIC_DASHBOARD_API_URL` in built `.next/` output | zero matches |
| Server routes read new name | grep the 3 route files | `process.env.DASHBOARD_API_URL` present, old name absent |
| Regression test passes | `npm run test:unit` | env-secrets.test.ts green |
| CI green on PR | `gh pr checks 29` | TypeScript+Lint+Build, Vercel, Vercel Preview Comments all pass |
| Post-merge health | `/api/health` | clean response on new deployment |

## Rollback

Revert e36a0ef3 (+ the two doc-rot follow-up commits, which are
additive/no-op on rollback) and re-set `NEXT_PUBLIC_DASHBOARD_API_URL`
in Vercel if it was already removed.

## Post-merge follow-up (not part of this card's scope, tracked separately)

- Remove ghost Vercel env vars: `NEXT_PUBLIC_DASHBOARD_API_KEY`,
  `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SUPABASE_*`
- Update `docs/PRODUCTION_FINGERPRINT.md` after deploy is confirmed
- TODO: AGENT_PLAYBOOK.md compliance gap — define what "Task Card
  scoped out docs" is allowed to mean for hook bypass, and require the
  card to exist (and be linked in the commit) before `--no-verify` is
  used to justify it in future.
