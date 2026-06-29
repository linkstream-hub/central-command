# DEPLOYMENT.md — APT Central Command
# Deploy, migration, and rollback procedures. Read before any deploy or schema change.
# Last updated: 2026-06-26

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

1. All CI gates pass (unit + integration + E2E)
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

### GAS (transitional only)

Vercel rollback handles CC2.0. GAS scripts independent — see old RUNBOOK.md for GAS-specific rollback if needed.

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
