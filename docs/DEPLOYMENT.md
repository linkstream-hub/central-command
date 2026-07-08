# DEPLOYMENT.md — APT Central Command
# Deploy, migration, and rollback procedures. Read before any deploy or schema change.
# Last updated: 2026-07-07

---

## DEPLOYMENT OVERVIEW

```yaml
platform: Vercel (linkstream-hub/central-command)
db: Neon Postgres (main branch = production)
auto_deploy: merge to main → READY ~90s
cli_deploy: vercel deploy --prod (from repo root C:\PTOW\1_APT_Central_Command)
repo_root: C:\PTOW\1_APT_Central_Command (always run CLI from here, not tech-pwa/)
```

---

## NORMAL DEPLOY (merge to main)

1. All CI gates pass (unit + integration) — E2E is NOT a PR gate (CI-001, removed for flakiness); runs on `workflow_dispatch` or the weekly `e2e-nightly.yml` schedule only
2. PR approved by Claude Code ("Clear to merge")
3. Merge to `main`
4. Vercel auto-deploys → production ready in ~90s
5. **Run migrations manually** (until Phase 2 fixes this):
   ```bash
   cd C:/PTOW/1_APT_Central_Command
   rtk npm run db:migrate
   ```
6. Verify health: Vercel dashboard → Functions → check for errors

---

## NEON PREVIEW BRANCH CLEANUP (cleanup-neon-preview.yml) — DISABLED

```yaml
status: DISABLED 2026-07-08 (workflow_dispatch only, no longer auto-runs on PR close)
reason: confirmed via live test PR that no per-PR Neon branch is ever created — Preview
  deployments share the single "dev" branch with production (see MIGRATION SAFETY below).
  The workflow was trying to delete a branch (preview/<ref>) that never existed, on every
  PR close, since it was added. Nothing was ever leaking. See P2-009 in KNOWN_ISSUES.md.
re-enable_when: Phase 2 "preview builds isolated" gate ships real per-PR branch creation
  (IMPLEMENTATION_PLAN.md) — re-verify the branch naming convention against whatever that
  implementation actually uses before re-enabling; don't assume preview/<head_ref>.
project_id: purple-dust-72858226  # corrected 2026-07-07, still correct for when re-enabled
```

---

## E2E ARTIFACT POLICY (e2e.yml, e2e-nightly.yml)

```yaml
upload_condition: if: failure()  # only uploads test-results/ when a test actually fails
retention_days: 5 (e2e.yml) / 3 (e2e-nightly.yml)
reason: GitHub Actions storage quota is 0.5GB total. Each Playwright bundle
  (HTML report + retry traces/videos) runs 150-200MB; `if: always()` hit
  90% of quota within days. Changed 2026-07-07.
```

---

## FORCED CLI DEPLOY (when auto-deploy fails)

```bash
# From repo root only
unset GITHUB_TOKEN
vercel deploy --prod
```

**VPN must be OFF.** Paris IP blocks Vercel.

---

## ROLLBACK PROCEDURE

### CC2.0 (Next.js / Vercel) — < 5 minutes

1. Vercel dashboard → `central-command` project → **Deployments**
2. Find last successful production deployment (green checkmark)
3. Click three-dot menu → **Instant Rollback**
4. Production URL reverts in ~30 seconds

**Document evidence in SESSION_STATE.md when rollback procedure is tested.**

### Database (Neon) — migration rollback

Migrations are additive (expand/contract pattern required):
- Never drop columns in same migration that adds replacement
- Always run expand (add new) before contract (remove old)
- If migration must be reversed: write a new DOWN migration

```bash
# Roll back one migration (if drizzle supports it)
rtk npm run db:migrate:rollback
```

If no rollback command: manually write SQL to undo, apply via Neon console.

### GAS (transitional only — CI workflow REMOVED)

Vercel rollback handles CC2.0. GAS CI deploy workflow (`deploy-apps-script.yml`) removed 2026-06-29 — `dashboard-api/` deleted in TC-PURGE-001, no `.gs` files remain, Phase 1 plans full GAS exit. Live GAS app at Google unaffected (CI deploy ≠ running deployment). No manual GAS deploys under "no GAS new code" rule.

---

## MIGRATION SAFETY (current — fix Phase 2)

**WARNING:** Production and preview share same Neon DB. Preview builds can mutate production.

Current process:
- Migrations run manually after deploy
- No env gating

Target (Phase 2):
- Production deploy → run migrations against production Neon only
- Preview builds → isolated Neon branch (or skip migrations)
- Failed migration blocks deploy

---

## ENVIRONMENT VARIABLES

Managed in Vercel dashboard: `central-command` project → Settings → Environment Variables.

**NEVER run `vercel env pull`** — overwrites `.env.local` with production values.

For local development: copy `.env.local.example` → `.env.local`, fill in values manually.

---

## PRE-DEPLOY CHECKLIST

```yaml
before_every_deploy:
  - [ ] All CI gates pass locally (rtk vitest run, rtk tsc)
  - [ ] VPN is OFF
  - [ ] No hardcoded secrets in diff
  - [ ] Migration files reviewed (if schema change)
  - [ ] Rollback plan documented in Task Card
  - [ ] "Clear to merge" from Claude Code
```

---

## POST-DEPLOY VERIFICATION

```yaml
verify_after_deploy:
  - [ ] Vercel deployment shows READY (not error/building)
  - [ ] /api/health returns 200 (when implemented Phase 3)
  - [ ] Core dispatch flow accessible (login → dashboard visible)
  - [ ] Sentry: no new ERROR-level events in first 5 min
  - [ ] UptimeRobot: monitor stays green (when configured Phase 3)
```

---

## NEON PROJECT MIGRATION (moving to a new Neon project)

**WARNING:** Sequence drift is a known risk when migrating Neon data to a new project.
Confirmed incident: 2026-06-29 — `drizzle.__drizzle_migrations_id_seq` had last_value=2, max_id=7 after migration to purple-dust-72858226. Root cause unknown. Public schema sequences were unaffected. See C-009 in KNOWN_ISSUES.md.

**Required after every Neon project migration — before any INSERT:**

```sql
-- Step 1: Audit all sequences in affected schemas
SELECT s.schemaname, s.sequencename, s.last_value, t.relname AS owned_by_table
FROM pg_sequences s
JOIN pg_class c ON c.relname = s.sequencename
  AND c.relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = s.schemaname)
LEFT JOIN pg_depend d ON d.objid = c.oid AND d.deptype = 'a'
LEFT JOIN pg_class t ON t.oid = d.refobjid
WHERE s.schemaname IN ('public', 'drizzle')
ORDER BY s.schemaname, s.sequencename;
```

```sql
-- Step 2: For each table with non-null last_value, verify sequence >= MAX(id)
-- If last_value < MAX(id): sequence is drifted — fix with:
SELECT setval('<schema>.<sequence_name>', (SELECT MAX(id) FROM <table>));
```

Fix must run before the first INSERT to any serial column in the new project.

---

## ROLLBACK DRILL EVIDENCE (Phase 0 gate)

Must test and prove rollback < 5 minutes before any risky security/auth/schema work.

```
Date tested: 2026-06-29
Change deployed: 30f36863 (docs(phase0): auth decision, DB snapshot, PROJECT_STATUS)
Rollback method: Vercel Instant Rollback (three-dot menu → Instant Rollback)
Time from click to READY: < 5 seconds (sub-second promotion — no rebuild required)
Evidence: Vercel dashboard — previous deployment promoted to Production instantly
Tested by: Brandon Bittner
Note: "Redeploy" != "Instant Rollback" — Redeploy rebuilds from scratch. Always use Instant Rollback.
```
