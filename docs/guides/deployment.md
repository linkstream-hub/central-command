<!-- generated-by: gsd-doc-writer -->
# Deployment

APT Central Command deployment reference. Three independent targets — deploy each separately; they share no joint pipeline.

---

## Deployment Targets

| Target | Config | Trigger |
|---|---|---|
| Tech PWA (Next.js) | `tech-pwa/vercel.json` | `git push` to `main` → Vercel native integration |
| GAS Root (Lead Parsing) | `.clasp.json` — scriptId `1eWTfdgxUJxNhkrtTxMu1vUsowQN5SwCjoXSAoflib6a4UCNegF7Ijtw3` | **Manual only** |
| GAS Dashboard API | `dashboard-api/.clasp.json` — scriptId `1N4stBEX12ukiBt60QW4Uj3fDQJsjRfEvR5z9HOuvbnDPVlWDqAS5zgiR` | Manual or CI on `.gs` push to `main` |
| n8n | Railway (self-hosted) | Manual via n8n UI or Railway redeploy |

---

## Tech PWA — Vercel

### Normal Deploy

The Vercel native GitHub integration auto-deploys on every push to `main`. No workflow file triggers the deploy — `vercel-deploy.yml` is `workflow_dispatch` (manual fallback) only.

```
git push origin main   # auto-deploys to https://dispatch.aptmaintenanceinc.com
```

### GitHub-Blocked Fallback (ACTIVE CONSTRAINT)

The GitHub account is currently restricted. **All GitHub-triggered Vercel deploys are blocked.** When auto-deploy fails, use the Vercel CLI directly:

```powershell
# From repo root — NOT tech-pwa/
vercel deploy --prod
```

**Critical:** When the Vercel CLI prompts to pull environment variables, **always answer NO**. Answering yes overwrites `.env.local` with production values (this has happened twice and caused incidents).

### Build Config

Source: `tech-pwa/vercel.json`

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "ignoreCommand": "[ \"$VERCEL_ENV\" = \"preview\" ] && [ -z \"$VERCEL_GIT_PULL_REQUEST_ID\" ] && exit 1; exit 0"
}
```

The `ignoreCommand` skips builds on preview branches that are not pull requests (branch-push-only previews are suppressed to conserve build minutes).

### Cron Jobs

Vercel runs `/api/cron/sync-gmail-history` every minute in production. The route requires `CRON_SECRET` set in Vercel project settings.

```json
{
  "crons": [{ "path": "/api/cron/sync-gmail-history", "schedule": "* * * * *" }]
}
```

### npm Config

`tech-pwa/.npmrc` sets `legacy-peer-deps=true`. This must be present for `npm ci` to resolve. Do not remove it.

### Preview Branches

Each PR gets a Vercel preview deployment scoped to that PR. Preview branches have `VERCEL_ENV=preview` injected automatically, which activates `DEV_BYPASS_AUTH` for sandbox login. When a PR is closed, the corresponding Neon preview branch is deleted by `.github/workflows/cleanup-neon-preview.yml` (Neon project `lively-cell-80446221`).

### Rollback

Redeploy the previous Vercel deployment via the Vercel dashboard → Deployments → select the previous build → Redeploy. Alternatively, revert the git commit and push to `main` (or use `vercel deploy --prod` if GitHub is blocked).

---

## GAS — Root Project (Lead Parsing)

**Rule: Manual only. Never automate clasp deploy for this project.**

Run from the repo root (`C:/PTOW/1_APT_Central_Command`).

```powershell
# 1. Push source
clasp push --force

# 2. Deploy (increment v## — check last deployed version first)
clasp deploy --deploymentId AKfycbyFgHHDrZm1NZBG2iQ3czdeRxSGuvjkqyLkx7OCjdkA5vRBCm3IQ1RAEyrbgVp-Y4xs1g --description "v##"
```

This project is the GAS Lead Parsing + TechPWA.gs integration. It is actively migrating out — no new features. Migration status: `docs/GAS_MIGRATION_SCOPE.md`.

### Rollback

Deploy the previous version from the GAS script editor: Extensions → Apps Script → Deployments → select the target version → Edit → revert.

---

## GAS — Dashboard API

**Rule: Manual only for production changes. CI deploys automatically only when `.gs` files change on push to `main`.**

Run from `dashboard-api/`:

```powershell
# 1. Push source
cd dashboard-api
clasp push --force

# 2. Deploy (increment v##)
clasp deploy --deploymentId AKfycbyum_KLprgPh51GxFiwhsoNHScc4TqIBrzZS0GPfHsnhrc9hAtp03AciyiydhfyJyxCCQ --description "v##"
```

### CI Pipeline

`.github/workflows/deploy-apps-script.yml` runs on push to `main` when `.gs` or `appsscript.json` files change. It uses the `CLASPRC_JSON` GitHub Actions secret for clasp auth. If the deploy step fails, it opens a `quality-gate` issue in GitHub Issues automatically.

**If CI fails:** Check if `CLASPRC_JSON` is expired (clasp OAuth tokens expire). Reauth locally (`clasp login`) and update the secret.

### Rollback

Same as GAS Root — use the GAS script editor to redeploy a prior version.

---

## n8n — Railway

<!-- VERIFY: n8n Railway service URL and project name in Railway dashboard -->

n8n runs as a self-hosted instance on Railway. Workflow changes are made via the n8n UI directly — Railway restarts the service container for code/config changes.

### Workflow Deploy Process

1. Edit workflow in n8n UI.
2. Activate the workflow (toggle in the top-right of the workflow editor).
3. No build step — workflows are stored in n8n's internal database.

### Credential Names

The n8n Gmail credential is named exactly `"Google account"` — no quotes in the n8n UI. When referencing credentials in workflow JSON or specs, use `"name": "Google account"` and omit the `"id"` field (n8n assigns IDs internally).

### Rollback

Deactivate the affected workflow in n8n UI. Restore from the last exported workflow JSON in `tools/n8n/` if available.

<!-- VERIFY: n8n webhook base URL (N8N_COMPLIANCE_WEBHOOK_URL, N8N_LOCK_SEND_WEBHOOK_URL env var values) -->

---

## CI / Pre-Deploy Checks

Source: `.github/workflows/ci.yml`

Runs on every pull request targeting `main` that touches `tech-pwa/**`:

| Step | Command |
|---|---|
| Install | `npm ci` |
| Audit | `npm audit --audit-level=critical` |
| Type check | `npx tsc --noEmit` |
| Lint | `npm run lint` |
| Build | `npm run build` |

CI uses placeholder values for `DATABASE_URL`, `AUTH_SECRET`, `NEXTAUTH_URL`, and `DASHBOARD_API_URL` to complete the build without live secrets. Do not merge a PR with failing CI.

---

## Environment Setup

Full environment variable reference: `docs/guides/configuration.md`.

**Production-critical variables that must be set in Vercel project settings:**

| Variable | Notes |
|---|---|
| `DATABASE_URL` | Neon pooled connection string |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | OAuth — `@aptmaintenanceinc.com` accounts only |
| `AUTH_SECRET` | next-auth JWT signing secret |
| `DASHBOARD_API_KEY` | Shared secret for GAS bridge + n8n |
| `DASHBOARD_API_URL` | GAS Dashboard API deployment URL |
| `GAS_INTERNAL_SECRET` | `/api/gas/validate-token` route |
| `GMAIL_CLIENT_ID` / `GMAIL_CLIENT_SECRET` / `GMAIL_REFRESH_TOKEN` | Gmail intake for `workorder@` |
| `GMAIL_WATCH_EMAIL` | `workorder@aptmaintenanceinc.com` |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini email parsing |
| `CRON_SECRET` | Vercel cron auth for `/api/cron/sync-gmail-history` |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | Upstash Redis rate limiting (must be set in prod) |

**Must be absent or `false` in production:**
- `DEV_BYPASS_AUTH`
- `NEXT_PUBLIC_SANDBOX_MODE`
- `NEXT_PUBLIC_DEV_ALLOW_WRITES`

---

## Monitoring

Sentry is configured via `NEXT_PUBLIC_SENTRY_DSN` (client-side error reporting) and source map uploads use `SENTRY_ORG` / `SENTRY_PROJECT`. Error reporting is silently disabled if the DSN is absent.

<!-- VERIFY: Sentry dashboard URL and org/project slug values -->

---

## Never Run

The following GAS functions are permanently forbidden — do not invoke them from any deploy or migration step:

```
catchUpMissedEmails()
resetBackfill()
setupBackfillTrigger()
archiveOldJobsConfirmed()
mineScheduleSheet()
```
