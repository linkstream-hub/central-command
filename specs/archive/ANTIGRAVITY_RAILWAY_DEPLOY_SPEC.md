# RAILWAY INFRASTRUCTURE DEPLOYMENT SPEC
**Sprint**: Infrastructure Migration — n8n, Flowise, GitHub Actions CI/CD
**Author**: Claude Code
**Antigravity scope**: Parts 2 and 3 below. Part 1 requires Brandon's Railway account.

---

## WHY THIS SPRINT EXISTS

n8n and Flowise are currently running on `localhost` — a single machine dependency on Brandon's workstation. When Claude Code or Antigravity run a deployment session, Apps Script reauthorization prompts interrupt Brandon because the OAuth tokens used by `clasp` expire. This sprint fixes both problems:

1. **n8n + Flowise → Railway**: Off localhost, always-on, monitored, version-controlled. Same pattern as Tax Search backend (already proven).
2. **GitHub Actions clasp CI/CD**: Antigravity and Claude Code push code to git → GitHub automatically deploys to Apps Script → Brandon never has to `clasp login` again.

---

## PART 1 — BRANDON DOES FIRST (Before Antigravity Starts)

### 1A. Export n8n Workflows
1. Open `http://localhost:5678` in browser
2. Settings (bottom left) → "Export all workflows" → save JSON file
3. Place the file at: `A:\PTOW\1_APT_Central_Command\n8n-workflows\workflows_export.json`

### 1B. Export Flowise Flows
1. Open `http://localhost:3000` in browser
2. Settings → Export → save JSON
3. Place at: `A:\PTOW\1_APT_Central_Command\flowise-flows\flows_export.json`

### 1C. Get the clasp Refresh Token
1. On Brandon's machine, run: `cat ~/.clasprc.json`
2. Copy the entire JSON output — you'll add this to GitHub Secrets in Part 4.

### 1D. Create Railway Account / Project
1. Log in at `railway.app`
2. Create a new project called `apt-infrastructure`
3. Leave it empty — Antigravity will add services via config

---

## PART 2 — ANTIGRAVITY IMPLEMENTATION

### 2A. Directory Structure to Create
```
A:\PTOW\1_APT_Central_Command\
├── n8n-workflows/
│   └── workflows_export.json        ← Brandon places this (Part 1A)
├── flowise-flows/
│   └── flows_export.json            ← Brandon places this (Part 1B)
├── railway/
│   ├── n8n/
│   │   └── railway.toml
│   └── flowise/
│       └── railway.toml
└── .github/
    └── workflows/
        └── deploy-apps-script.yml
```

### 2B. Create `railway/n8n/railway.toml`
```toml
[build]
builder = "DOCKERFILE"
dockerfilePath = "railway/n8n/Dockerfile"

[deploy]
startCommand = "n8n start"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 3
```

### 2C. Create `railway/n8n/Dockerfile`
```dockerfile
FROM docker.n8n.io/n8nio/n8n:latest
USER root
RUN apk add --no-cache curl
USER node
EXPOSE 5678
```

### 2D. Create `railway/flowise/railway.toml`
```toml
[build]
builder = "DOCKERFILE"
dockerfilePath = "railway/flowise/Dockerfile"

[deploy]
startCommand = "flowise start"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 3
```

### 2E. Create `railway/flowise/Dockerfile`
```dockerfile
FROM flowiseai/flowise:latest
EXPOSE 3000
```

### 2F. Create `.github/workflows/deploy-apps-script.yml`

This eliminates all manual `clasp` runs and the associated OAuth reauth prompts.

```yaml
name: Deploy to Apps Script

on:
  push:
    branches: [main]
    paths:
      - '**.gs'
      - '**.html'
      - '!scratch/**'

jobs:
  deploy-dashboard-api:
    name: Deploy DashboardAPI.gs
    runs-on: ubuntu-latest
    if: contains(join(github.event.commits.*.modified, ','), 'dashboard-api/')
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install clasp
        run: npm install -g @google/clasp
      - name: Authenticate clasp
        run: echo '${{ secrets.CLASPRC_JSON }}' > ~/.clasprc.json
      - name: Push and deploy DashboardAPI
        run: |
          cd dashboard-api
          clasp push --force
          clasp deploy \
            --deploymentId AKfycbyum_KLprgPh51GxFiwhsoNHScc4TqIBrzZS0GPfHsnhrc9hAtp03AciyiydhfyJyxCCQ \
            --description "Auto-deploy $(git log -1 --pretty=%s)"

  deploy-techpwa:
    name: Deploy TechPWA.gs
    runs-on: ubuntu-latest
    if: contains(join(github.event.commits.*.modified, ','), 'TechPWA.gs')
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install clasp
        run: npm install -g @google/clasp
      - name: Authenticate clasp
        run: echo '${{ secrets.CLASPRC_JSON }}' > ~/.clasprc.json
      - name: Push and deploy TechPWA
        run: |
          clasp push --force
          # TechPWA is part of root project — no separate deploy needed,
          # clasp push covers it under the root .clasp.json deployment
```

**Important:** `Code.js` is intentionally excluded from auto-deploy. It runs live email polling every 15 minutes and touches production data. Claude Code manually deploys it with explicit intent. The GitHub Action only triggers for `dashboard-api/` and `TechPWA.gs` changes.

### 2G. Create `.github/workflows/deploy-vercel.yml`
Vercel already auto-deploys on push. This file is a no-op placeholder to document that Vercel handles Next.js deployments — do not add Vercel deploy steps to the Apps Script workflow.

```yaml
# Vercel deployment is handled automatically via Vercel GitHub integration.
# Do not add Vercel CLI steps here.
name: Vercel (managed externally)
on: [push]
jobs:
  note:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Vercel auto-deploys from main branch via GitHub integration."
```

### 2H. Update `.gitignore`
Ensure these are NOT committed:
```
# Add to .gitignore if not already present
n8n-workflows/
flowise-flows/
railway/n8n/.env
railway/flowise/.env
scratch/
```

Wait — n8n-workflows and flowise-flows SHOULD be committed (they are version-controlled config). Remove those two lines. Correct `.gitignore` additions:
```
railway/n8n/.env
railway/flowise/.env
scratch/
```

### 2I. Commit everything
```bash
git add railway/ .github/ n8n-workflows/ flowise-flows/ .gitignore
git commit -m "infra: Railway deployment configs + GitHub Actions clasp CI/CD"
git push origin main
```

---

## PART 3 — BRANDON COMPLETES IN RAILWAY DASHBOARD

After Antigravity commits, Brandon does the following in `railway.app`:

### 3A. Deploy n8n Service
1. In the `apt-infrastructure` Railway project → "New Service" → "GitHub Repo"
2. Select the `central-command` repo, set root directory to `railway/n8n/`
3. Add a **PostgreSQL** plugin to the project (Railway free tier includes it)
4. Set these environment variables on the n8n service:

| Variable | Value |
|---|---|
| `N8N_BASIC_AUTH_ACTIVE` | `true` |
| `N8N_BASIC_AUTH_USER` | (choose a username) |
| `N8N_BASIC_AUTH_PASSWORD` | (strong password — store in Vercel/Railway) |
| `N8N_HOST` | (Railway will provide — the `.up.railway.app` domain) |
| `WEBHOOK_URL` | `https://[railway-n8n-domain]/` |
| `DB_TYPE` | `postgresdb` |
| `DB_POSTGRESDB_HOST` | (from Railway PostgreSQL plugin — `${{Postgres.PGHOST}}`) |
| `DB_POSTGRESDB_PORT` | `${{Postgres.PGPORT}}` |
| `DB_POSTGRESDB_DATABASE` | `${{Postgres.PGDATABASE}}` |
| `DB_POSTGRESDB_USER` | `${{Postgres.PGUSER}}` |
| `DB_POSTGRESDB_PASSWORD` | `${{Postgres.PGPASSWORD}}` |
| `N8N_ENCRYPTION_KEY` | (generate a random 32-char string) |
| `NODE_ENV` | `production` |

5. Deploy → wait for health check → open Railway domain in browser → log in → import `n8n-workflows/workflows_export.json`

### 3B. Deploy Flowise Service
1. New Service → GitHub Repo → `central-command`, root dir: `railway/flowise/`
2. Add another PostgreSQL plugin (or share the same one with a different DB name)
3. Environment variables:

| Variable | Value |
|---|---|
| `FLOWISE_USERNAME` | (choose a username) |
| `FLOWISE_PASSWORD` | (strong password) |
| `PORT` | `3000` |
| `DATABASE_TYPE` | `postgres` |
| `DATABASE_HOST` | `${{Postgres.PGHOST}}` |
| `DATABASE_PORT` | `${{Postgres.PGPORT}}` |
| `DATABASE_NAME` | `${{Postgres.PGDATABASE}}` |
| `DATABASE_USER` | `${{Postgres.PGUSER}}` |
| `DATABASE_PASSWORD` | `${{Postgres.PGPASSWORD}}` |
| `SECRETKEY_PATH` | `/root/.flowise` |

4. Deploy → import `flowise-flows/flows_export.json` after deploy

### 3C. Add GitHub Secret for clasp CI/CD
1. Go to `github.com/White-Jesus/central-command` → Settings → Secrets and variables → Actions
2. New repository secret → Name: `CLASPRC_JSON` → Value: paste the full contents of `~/.clasprc.json` from Part 1C
3. From this point on, every `git push` to main automatically deploys changed `.gs` files — no manual `clasp` commands needed

### 3D. Update CLAUDE.md with new hosted URLs
After Railway assigns domains, Claude Code updates `CLAUDE.md` with:
- n8n hosted URL (replaces `localhost:5678`)
- Flowise hosted URL (replaces `localhost:3000`)

---

## VERIFICATION (Claude Code Checks After Deploy)

```bash
# n8n health
curl https://[n8n-railway-domain]/healthz

# Flowise health
curl https://[flowise-railway-domain]/api/v1/ping

# GitHub Action fired correctly
# Go to github.com/White-Jesus/central-command/actions → confirm green runs
```

---

## POST-DEPLOY: REMOVE WINDOWS STARTUP SCRIPTS

Once Railway services are confirmed healthy, Brandon removes the localhost startup scripts:
- Delete `run_server_hidden.vbs` from Windows Startup folder
- Delete `run_tunnel_hidden.vbs` from Windows Startup folder
- The `run_server.bat` and `run_tunnel.bat` can be kept locally as fallback but are no longer needed

---

*Next spec after this sprint: DashboardAPI.gs → Node.js/Railway migration (eliminates Apps Script reauth permanently for the dashboard API).*
