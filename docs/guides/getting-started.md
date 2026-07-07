<!-- generated-by: gsd-doc-writer -->
# Getting Started

APT Central Command — internal operations platform for work order intake, dispatch, field tech coordination, and scheduling. This guide covers local dev setup for both office staff and field tech portals.

---

## Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| Node.js | >= 20 | Inferred from `@types/node ^20` in devDependencies |
| npm | >= 10 | Included with Node.js 20+ |
| Git | any | For cloning and branch management |
| Neon Postgres | — | Access to the project's Neon database (or a personal branch) |
| Google Cloud project | — | OAuth credentials for `@aptmaintenanceinc.com` staff login |

No `.nvmrc` is present. Use Node.js 20 LTS (`nvm use 20` or system-level install).

---

## Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/BGB-CRB-Holdings/central-command.git
cd central-command

# 2. Install dependencies (the Next.js app lives in tech-pwa/)
cd tech-pwa
npm install
```

The root `package.json` is not the application entry point. All commands below run from inside `tech-pwa/`.

---

## Environment Setup

Copy the minimum required environment variables into `tech-pwa/.env.local`. See [docs/guides/configuration.md](./configuration.md) for the full variable reference.

**Minimum for local dev with live data:**

```bash
# tech-pwa/.env.local

# Neon Postgres
DATABASE_URL=postgresql://<user>:<pass>@<host>/neondb?sslmode=require
DATABASE_URL_UNPOOLED=postgresql://<user>:<pass>@<ep>.neon.tech/neondb?sslmode=require

# Google OAuth (next-auth — office staff login)
GOOGLE_CLIENT_ID=<from GCP Console>
GOOGLE_CLIENT_SECRET=<from GCP Console>
AUTH_SECRET=<generate: npx auth secret>

# Dashboard / GAS Bridge
DASHBOARD_API_URL=https://script.google.com/macros/s/<ID>/exec
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

**Minimum for sandbox-only development (no Neon writes, no email):**

```bash
# tech-pwa/.env.local

AUTH_SECRET=<generate: npx auth secret>
GOOGLE_CLIENT_ID=<from GCP Console>
GOOGLE_CLIENT_SECRET=<from GCP Console>
NEXT_PUBLIC_SANDBOX_MODE=true
```

With `NEXT_PUBLIC_SANDBOX_MODE=true`, all data reads route through the local JSON sandbox store. No Neon connection or Gmail credentials are needed.

---

## First Run

```bash
# Inside tech-pwa/

# (Optional) Run database migrations if connecting to a real Neon instance
npm run db:migrate

# Start the development server
npm run dev
```

Open `http://localhost:3000`. The root route detects session state and redirects automatically.

---

## Accessing the Two Portals

APT Central Command serves two distinct user populations with separate auth flows. The login page (`/login`) adapts based on the subdomain, but both modes are available at `localhost:3000` in dev.

### Office Staff Portal

**Routes:** `/live`, `/schedule`, `/jobs-admin`, `/people`, `/intel`, `/compliance`

Sign in with a `@aptmaintenanceinc.com` Google account via the "Sign in with Google" button. On success, you are redirected to `/live` (the dispatch dashboard).

**Dev bypass:** A "Dev Login (Mock Data — Local Only)" button appears on the login page whenever `NODE_ENV !== 'production'` or `NEXT_PUBLIC_VERCEL_ENV === 'preview'` (i.e., local dev and Vercel preview deployments). No extra env var is required. Clicking it calls the `dev-bypass` provider and redirects to `/live`.

Use `useSession()` from `next-auth/react` in staff-facing components. Do not use the tech auth hook on these routes.

### Field Tech Portal

**Routes:** `/jobs`, `/job/[jobId]`, `/clock`

Authenticate with badge number + PIN. The session is stored in `localStorage` as a UUID token (not a cookie).

**Test credentials (non-production only):** badge `1`, PIN `1234`

To reach the tech login on localhost, either:
- Append `?tech=1` to the URL: `http://localhost:3000/login?tech=1`
- Navigate directly to `/jobs` — the app redirects to tech login if no staff session exists

Use `getSession()` from `@/lib/auth` in tech-facing components. Do not use `useSession()` (next-auth) on these routes — mixing them causes a redirect loop.

---

## Common Setup Issues

**`DATABASE_URL` connection errors on first run**
The app will log a Neon connection failure and may serve degraded UI. Confirm your Neon project is active and the connection string uses the pooled URL (`DATABASE_URL`). The unpooled URL (`DATABASE_URL_UNPOOLED`) is only needed for migrations.

If you do not need live data, set `NEXT_PUBLIC_SANDBOX_MODE=true` instead.

**Google sign-in shows "Access Denied"**
The callback rejects accounts not in the Staff Roster (checked against the GAS Dashboard API). This requires `DASHBOARD_API_URL` and `DASHBOARD_API_KEY` to be set correctly. In sandbox mode, use `DEV_BYPASS_AUTH=true` to skip the lookup.

**Tech login returns "Invalid badge number or PIN"**
The `/api/field/auth/login` route queries Neon. Ensure `DATABASE_URL` is set and the `employees` table is seeded. Run `npm run seed` to seed test data, or use `NEXT_PUBLIC_SANDBOX_MODE=true` and mock auth responses.

**`npm install` fails with peer dependency errors**
The project sets `legacy-peer-deps=true` in `tech-pwa/.npmrc`. Verify the file exists, or add the flag manually:

```bash
npm install --legacy-peer-deps
```

**`AUTH_SECRET` is missing**
Generate one with:

```bash
npx auth secret
```

Paste the output value into `.env.local` as `AUTH_SECRET`.

---

## Available Scripts

Run from inside `tech-pwa/`:

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js dev server on port 3000 |
| `npm run build` | Build for production |
| `npm run start` | Start the production server (requires a prior build) |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Drizzle migration files from schema changes |
| `npm run db:migrate` | Apply pending migrations to the database |
| `npm run db:repair-journal` | Repair the Drizzle migration journal |
| `npm run seed` | Seed the database with test data |
| `npm run test:unit` | Run Vitest unit tests |
| `npm run test:unit:watch` | Run unit tests in watch mode |
| `npm run test:unit:coverage` | Run unit tests with V8 coverage report |

---

## Next Steps

- [docs/guides/configuration.md](./configuration.md) — Full environment variable reference, development flags, and per-environment overrides
- [docs/ARCHITECTURE.md](../ARCHITECTURE.md) — System architecture, bounded contexts, and data flow
