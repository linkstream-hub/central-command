<!-- generated-by: gsd-doc-writer -->
# Configuration

APT Central Command environment variable reference for the `tech-pwa` Next.js application.

All secrets are managed via environment variables. Set them in `tech-pwa/.env.local` for local dev and in Vercel project settings for deployed environments. The application reads `.env.local` directly; Drizzle migrations read it via `dotenv` (`drizzle.config.ts`).

---

## Environment Variables

### Database

| Variable | Required | Default | Description |
|---|---|---|---|
| `DATABASE_URL` | Required | `postgresql://placeholder:placeholder@localhost/placeholder` (dev fallback only) | Neon Postgres pooled connection string used by Drizzle at runtime via `@neondatabase/serverless`. |
| `DATABASE_URL_UNPOOLED` | Required for migrations | — | Neon Postgres direct (unpooled) connection string. Used exclusively by `drizzle-kit` for schema migrations. |

**Source:** `tech-pwa/src/lib/db.ts`, `tech-pwa/drizzle.config.ts`

### Google OAuth — Office Staff Auth (next-auth v5)

| Variable | Required | Default | Description |
|---|---|---|---|
| `GOOGLE_CLIENT_ID` | Required | — | OAuth 2.0 client ID from Google Cloud Console. Restricts sign-in to `@aptmaintenanceinc.com` accounts. |
| `GOOGLE_CLIENT_SECRET` | Required | — | OAuth 2.0 client secret paired with `GOOGLE_CLIENT_ID`. |
| `AUTH_SECRET` | Required | — | next-auth JWT signing secret. Generate with `npx auth secret`. Alias `NEXTAUTH_SECRET` also accepted. |
| `NEXTAUTH_SECRET` | Optional | — | Alias for `AUTH_SECRET`. Prefer `AUTH_SECRET` in new setups. |
| `AUTH_URL` | Optional | Auto-detected by Vercel | Explicit next-auth base URL. Required in test environments (overridden in `src/auth.ts` for `NODE_ENV=test`). |
| `NEXTAUTH_URL` | Optional | Auto-detected | Legacy alias for `AUTH_URL`. Also overridden automatically when `NODE_ENV=test`. |

**Source:** `tech-pwa/src/auth.ts`

> **Auth split:** Staff pages use `useSession()` from `next-auth/react`. Tech PWA pages (`/jobs`, `/job/[jobId]`, `/clock`) use `getSession()` from `@/lib/auth` (localStorage-based). Never mix them — wrong hook causes a redirect loop. See `tech-pwa/src/lib/CLAUDE.md`.

### Internal API Auth — Dashboard Bridge

| Variable | Required | Default | Description |
|---|---|---|---|
| `DASHBOARD_API_KEY` | Required | — | Shared secret used by GAS, n8n, and internal server-to-server calls. Passed as the `x-api-key` header or `DASHBOARD_API_KEY` header depending on the route. Also used as a `Bearer` token on the n8n Gmail webhook. |
| `NEXT_PUBLIC_DASHBOARD_API_URL` | Required | — | Base URL of the Google Apps Script Dashboard API deployment. Used in `src/auth.ts` for permission lookups and in `src/lib/dashboard-api.ts` for GAS bridging. `NEXT_PUBLIC_` — visible in client bundle, contains no secrets. |
| `GAS_INTERNAL_SECRET` | Required | — | Additional secret for the `/api/gas/validate-token` route. Separate from `DASHBOARD_API_KEY`. |

**Source:** `tech-pwa/src/auth.ts`, `tech-pwa/src/app/api/gas/route.ts`, `tech-pwa/src/app/api/gas/validate-token/route.ts`

### Gmail Integration

| Variable | Required | Default | Description |
|---|---|---|---|
| `GMAIL_CLIENT_ID` | Required | — | Google OAuth 2.0 client ID for Gmail API access (separate from staff OAuth — scoped to the `workorder@` account). |
| `GMAIL_CLIENT_SECRET` | Required | — | Client secret paired with `GMAIL_CLIENT_ID`. |
| `GMAIL_REFRESH_TOKEN` | Required | — | Long-lived OAuth refresh token for the `workorder@` inbox. Application throws at startup if any of the three Gmail credentials are missing. |
| `GMAIL_WATCH_EMAIL` | Required | — | The Gmail address to poll for new messages in the cron job (`/api/cron/sync-gmail-history`). |

**Source:** `tech-pwa/src/lib/gmail-client.ts`, `tech-pwa/src/app/api/cron/sync-gmail-history/route.ts`

### Google Gemini AI — Email Parsing

| Variable | Required | Default | Description |
|---|---|---|---|
| `GOOGLE_GENERATIVE_AI_API_KEY` | Required | — | Primary key for Google Gemini via `@ai-sdk/google`. Used by the n8n Gmail webhook route to parse raw email into structured work orders. |
| `GOOGLE_API_KEY` | Optional | — | Fallback key name checked if `GOOGLE_GENERATIVE_AI_API_KEY` is absent. |
| `GEMINI_API_KEY` | Optional | — | Second fallback key name. Also used by `src/app/api/parse/route.ts` via `@google/generative-ai`. |

The webhook returns HTTP 500 if none of the three keys are set.

**Source:** `tech-pwa/src/app/api/webhooks/n8n/gmail/route.ts`, `tech-pwa/src/app/api/parse/route.ts`

### Upstash Redis — Rate Limiting

| Variable | Required | Default | Description |
|---|---|---|---|
| `KV_REST_API_URL` | Optional | — | Upstash Redis REST URL. Provided automatically by Vercel's Upstash KV marketplace integration. If absent, rate limiting is disabled and the app fails open (no auth blocking). |
| `KV_REST_API_TOKEN` | Optional | — | Upstash Redis REST token paired with `KV_REST_API_URL`. |

Rate limit config: 5 login attempts per 15-minute sliding window per badge. See `tech-pwa/src/lib/rateLimit.ts`.

**Source:** `tech-pwa/src/lib/rateLimit.ts`

### Web Push Notifications (VAPID)

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | Optional | — | VAPID public key for push subscription. `NEXT_PUBLIC_` — exposed to client. Push notifications are silently disabled if any VAPID key is absent. |
| `VAPID_PRIVATE_KEY` | Optional | — | VAPID private key — server-side only. |
| `VAPID_EMAIL` | Optional | — | Contact email embedded in VAPID header (format: `mailto:user@domain.com`). |

**Source:** `tech-pwa/src/app/api/jobs/route.ts`, `tech-pwa/src/app/api/push/send/route.ts`

### Email — Resend

| Variable | Required | Default | Description |
|---|---|---|---|
| `RESEND_API_KEY` | Optional | `re_placeholder` (dev only) | Resend API key for outbound email (work order comms). Falls back to a placeholder string in dev/sandbox — email sends are suppressed in those modes. |

**Source:** `tech-pwa/src/lib/email.ts`

### n8n Webhooks

| Variable | Required | Default | Description |
|---|---|---|---|
| `N8N_COMPLIANCE_WEBHOOK_URL` | Optional | — | n8n webhook triggered on attestation sign. Skipped with a `console.warn` if unset. |
| `N8N_LOCK_SEND_WEBHOOK_URL` | Optional | — | n8n webhook triggered when a schedule is locked and sent. Skipped if unset. |

**Source:** `tech-pwa/src/app/api/field/attestation/sign/route.ts`, `tech-pwa/src/app/api/schedule/lock-and-send/route.ts`

### Sentry Error Monitoring

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_SENTRY_DSN` | Optional | — | Sentry DSN. `NEXT_PUBLIC_` — embedded in client bundle. Error reporting is silently disabled if absent. |
| `SENTRY_ORG` | Optional | — | Sentry organization slug. Used by `withSentryConfig` in `next.config.ts` for source map uploads. <!-- VERIFY: org slug value in Sentry project settings --> |
| `SENTRY_PROJECT` | Optional | — | Sentry project slug. Used alongside `SENTRY_ORG`. <!-- VERIFY: project slug value in Sentry project settings --> |

**Source:** `tech-pwa/sentry.server.config.ts`, `tech-pwa/next.config.ts`

### Cron Jobs

| Variable | Required | Default | Description |
|---|---|---|---|
| `CRON_SECRET` | Required | — | Bearer secret for Vercel cron job invocations. The `/api/cron/sync-gmail-history` route rejects requests without it. Set in Vercel project settings to match the `vercel.json` cron configuration. <!-- VERIFY: cron secret rotation policy --> |

**Source:** `tech-pwa/src/app/api/cron/sync-gmail-history/route.ts`

---

## Development Flags

These variables alter application behavior in local dev and preview environments. Do not set them in production.

| Variable | Type | Description |
|---|---|---|
| `NODE_ENV` | `development` \| `production` \| `test` | Standard Node.js env. Controls PWA disable, dev bypass auth, mock data, dev write guard, and Sentry environment label. |
| `NEXT_PUBLIC_SANDBOX_MODE` | `true` \| unset | Routes all data reads through the local JSON sandbox store (`/api/sandbox`). Suppresses all email sends and Neon writes. Use for UI development without live data. |
| `NEXT_PUBLIC_DEV_ALLOW_WRITES` | `true` \| unset | Overrides the dev write guard that blocks mutating GAS actions in `development` mode. Set in `.env.local` only when intentionally testing a write path. Real incident: unintended emails sent to Lapham client. Use with caution. |
| `DEV_BYPASS_AUTH` | `true` \| unset | Enables the `dev-bypass` credentials provider in next-auth. Active only when `NODE_ENV !== 'production'` or `VERCEL_ENV === 'preview'`. Injects full admin permissions as `sandbox@aptmaintenanceinc.com`. |
| `VERCEL_ENV` | `preview` \| `production` \| unset | Set automatically by Vercel. Used to enable dev bypass auth and test mode badge panel on preview deployments. |
| `NEXT_PUBLIC_VERCEL_ENV` | `preview` \| `production` \| unset | Client-side equivalent of `VERCEL_ENV`. Used to conditionally render the test badge panel on the login page. |
| `ALLOW_MOCK` | `true` \| unset | Allows the `/api/mock/exec` route in production. Default off — mock routes are blocked in production unless explicitly enabled. |

---

## Per-Environment Overrides

```yaml
local development:
  file: tech-pwa/.env.local
  notes: >
    Set DATABASE_URL, GOOGLE_CLIENT_ID/SECRET, AUTH_SECRET, DASHBOARD_API_KEY,
    NEXT_PUBLIC_DASHBOARD_API_URL, and GMAIL_* credentials at minimum.
    NEXT_PUBLIC_SANDBOX_MODE=true is the safe default if Neon access is not needed.
    NEXT_PUBLIC_DEV_ALLOW_WRITES must remain unset unless testing write paths.

preview (Vercel):
  source: Vercel project environment variables (Preview environment)
  notes: >
    VERCEL_ENV=preview is injected automatically.
    DEV_BYPASS_AUTH=true enables sandbox login on preview branches.
    All production secrets (DB, auth, VAPID, Resend) must also be set here
    unless the preview is intentionally sandbox-only.

production (Vercel):
  source: Vercel project environment variables (Production environment)
  notes: >
    DEV_BYPASS_AUTH must be absent or false.
    NEXT_PUBLIC_SANDBOX_MODE must be absent or false.
    KV_REST_API_URL and KV_REST_API_TOKEN must be set (rate limiting enforced).
    CRON_SECRET must match the value configured in vercel.json cron config.
```

---

## Required Variables for First Run

Minimum set needed for `npm run dev` to serve real data:

```bash
# tech-pwa/.env.local

# Neon Postgres
DATABASE_URL=postgresql://<user>:<pass>@<host>/neondb?sslmode=require
DATABASE_URL_UNPOOLED=postgresql://<user>:<pass>@<ep>.neon.tech/neondb?sslmode=require

# Google OAuth (next-auth)
GOOGLE_CLIENT_ID=<from GCP Console>
GOOGLE_CLIENT_SECRET=<from GCP Console>
AUTH_SECRET=<generate: npx auth secret>

# Dashboard / GAS Bridge
NEXT_PUBLIC_DASHBOARD_API_URL=https://script.google.com/macros/s/<ID>/exec
DASHBOARD_API_KEY=<shared secret>
GAS_INTERNAL_SECRET=<separate shared secret>

# Gmail intake
GMAIL_CLIENT_ID=<OAuth client for workorder@ inbox>
GMAIL_CLIENT_SECRET=<paired secret>
GMAIL_REFRESH_TOKEN=<long-lived refresh token>
GMAIL_WATCH_EMAIL=workorder@aptmaintenanceinc.com

# Gemini AI (email parsing)
GOOGLE_GENERATIVE_AI_API_KEY=<Google AI Studio key>

# Cron auth
CRON_SECRET=<random secret matching vercel.json>
```

For sandbox-only development (no live data), set `NEXT_PUBLIC_SANDBOX_MODE=true` and only `AUTH_SECRET` + `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` are strictly required.
