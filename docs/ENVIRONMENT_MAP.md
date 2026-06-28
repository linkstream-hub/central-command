# ENVIRONMENT_MAP.md — APT Central Command
# All environment variables, API keys, and secrets inventory.
# Last updated: 2026-06-26

---

## CRITICAL VIOLATION (fix in Phase 1)

`NEXT_PUBLIC_DASHBOARD_API_URL` is server-only but exposed client-side via NEXT_PUBLIC_ prefix.
Read locations: `src/auth.ts`, `src/app/api/gas/route.ts`, `src/app/api/comms/[jobId]/route.ts`
Fix: Rename to `DASHBOARD_API_URL` (no NEXT_PUBLIC_ prefix) in Vercel + code.

---

## VARIABLE REGISTRY

| Variable | Scope | Purpose | Environment | Status |
|---|---|---|---|---|
| `NEXT_PUBLIC_DASHBOARD_API_URL` | **WRONG — server only** | GAS DashboardAPI endpoint | All | P0 VIOLATION — rename Phase 1 |
| `DATABASE_URL` | Server | Neon Postgres connection | All | OK |
| `DATABASE_URL_TEST` | Server | Neon test DB for CI | Test | OK |
| `AUTH_SECRET` | Server | NextAuth JWT secret | All | OK |
| `GOOGLE_CLIENT_ID` | Server | Google OAuth | All | OK |
| `GOOGLE_CLIENT_SECRET` | Server | Google OAuth | All | OK |
| `N8N_API_KEY` | Server | n8n API access | All | Rotated ~2026-06-24, expires ~2026-07-10 |
| `RESEND_API_KEY` | Server | Email delivery | All | OK |
| `NEXT_PUBLIC_APP_URL` | Client | App base URL (genuinely public) | All | OK |
| `NEXT_PUBLIC_DEV_ALLOW_WRITES` | Client | Dev write guard override | Dev only | OK — never set in prod |
| `DEV_BYPASS_AUTH` | Server | Dev auth bypass | Dev/Preview | SINGLE GUARD — harden Phase 1 |
| `VERCEL_ENV` | Server | Vercel environment | Vercel | OK |
| `NODE_ENV` | Server | Node environment | All | OK |
| `EMAIL_INBOUND_TOKEN` | Server | Validate Cloudflare inbound webhook (`POST /api/intake/email`) | All | REQUIRED — add to Vercel prod+preview | <!-- fix/s171-field-fixes -->
| `UPLOADTHING_SECRET` | Server | Server UploadThing validation | All | OK | <!-- S171-UT-AG -->
| `NEXT_PUBLIC_UPLOADTHING_APP_ID` | Client | Client UploadThing init | All | OK | <!-- S171-UT-AG -->

---

## PHASE 0 — NEW VARIABLES REQUIRED

When Shift-Left integrations complete, add:

| Variable | Purpose | Provider |
|---|---|---|
| `CLERK_SECRET_KEY` | Server-side Clerk auth | Clerk |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Client Clerk init | Clerk |
| `EMAIL_INBOUND_TOKEN` | Validate Cloudflare webhooks | Cloudflare | <!-- DEPLOYED fix/s171-field-fixes — add to Vercel env before cutover --> |
| `TIMEKEEPING_API_KEY` | Vendor timekeeping API | Deputy/Gusto/QBO |

---

## API KEY REGISTRY

| Key | Owner | Allowed Routes | Rotation Schedule | Revocation |
|---|---|---|---|---|
| N8N_API_KEY | n8n | /api/n8n/**, webhook endpoints | Rotate on expiry (~monthly) | Railway n8n settings → regenerate |
| RESEND_API_KEY | Resend | Server-only email sends | Annual or on breach | Resend dashboard → revoke |
| GAS DashboardAPI key | GAS script | /api/gas (transitional) | Phase 1 removal | GAS deploy settings |

Rules:
- Invalid key → `401`
- Valid key on wrong route → `403`
- Keys never logged

---

## DEPLOYMENT ENVIRONMENTS

| Environment | Vercel | DB | Auto-deploy |
|---|---|---|---|
| Production | `main` branch | Neon main branch | Yes (merge to main → ~90s) |
| Preview | PR branches | Neon main branch (UNSAFE — fix Phase 2) | Yes (PR open/push) |
| Development | Local | `.env.local` DATABASE_URL | N/A |

**Phase 2 fix:** Preview builds must use isolated Neon branch, not prod DB.

---

## DEV SAFETY RULES

```yaml
vercel_env_pull: NEVER answer YES — wipes .env.local with prod values
vpn: MUST be OFF for CLI sessions (Paris IP caused GitHub flag + Vercel block)
github_token: Run `unset GITHUB_TOKEN` before any gh command
dev_allow_writes: NEXT_PUBLIC_DEV_ALLOW_WRITES=true to override local GAS write guard
```
