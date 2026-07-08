<!-- generated-by: gsd-doc-writer -->
# APT Central Command

Internal operations platform for APT Maintenance Inc. — handles work order intake, dispatch, field tech coordination, scheduling, and property management for a property maintenance company.

## Installation

```bash
cd tech-pwa
npm install
```

Requires Node.js >= 20 (inferred from `@types/node ^20` in devDependencies).

Configure environment variables before starting:

```bash
cp tech-pwa/.env.example tech-pwa/.env.local
# Fill in DATABASE_URL, AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
```

Required env vars — see `tech-pwa/.env.example` for the full list.

## Quick Start

1. Install dependencies:
   ```bash
   cd tech-pwa && npm install
   ```
2. Configure `tech-pwa/.env.local` with database and auth credentials
3. Run database migrations:
   ```bash
   cd tech-pwa && npm run db:migrate
   ```
4. Start the development server:
   ```bash
   cd tech-pwa && npm run dev
   ```
5. Open `http://localhost:3000`

**Test credentials (non-production only):**
- Office staff: use "Dev Login (Admin)" button on the login page
- Field tech: badge `1`, PIN `1234`

## Usage

The platform serves two distinct user populations with separate authentication flows.

**Office staff** (`/live`, `/schedule`, `/jobs-admin`, `/people`, `/intel`, `/compliance`)
Sign in with a `@aptmaintenanceinc.com` Google account. Redirected to the dispatch dashboard on login.

**Field technicians** (`/jobs`, `/job/[jobId]`, `/clock`)
Authenticate with badge number + PIN. Session stored in `localStorage`. Redirected to the jobs queue on login.

The root `/` route detects the active session type and redirects automatically.

## Project Structure

```
tech-pwa/               Next.js 16 application (frontend + API routes)
  src/
    app/                App Router pages and API routes
      api/              REST API (jobs, schedule, field, techs, notifications, etc.)
    components/         React components
    lib/
      dal/              Neon Postgres data access layer (Drizzle ORM)
      auth.ts           Tech PWA session utilities (badge/PIN)
      schema.ts         Drizzle schema — all database tables
    auth.ts             next-auth v5 config (Google OAuth for staff)
dashboard-api/          Google Apps Script — DashboardAPI (being migrated out)
tools/n8n/              n8n workflow exports and management scripts
docs/                   Architecture, ADRs, domain docs, sprint standards
specs/                  Full API specifications
```

## Key API Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/jobs` | Dispatch queue |
| GET / PATCH | `/api/jobs/[jobId]` | Job detail and status update |
| GET | `/api/schedule/today` | Today's schedule |
| GET | `/api/schedule/week` | Weekly schedule |
| GET | `/api/field/live` | Live field status |
| GET | `/api/field/compliance` | CA break compliance status |
| GET | `/api/techs` | Tech roster |
| GET | `/api/notifications` | Notification feed |

All routes accept either a next-auth session cookie (office staff) or an API key header.

## Build Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server on `localhost:3000` |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run db:generate` | Generate Drizzle migration files |
| `npm run db:migrate` | Run pending migrations against Neon |
| `npm run seed` | Seed database with test data |
| `npm run test:unit` | Run Vitest unit tests |
| `npm run test:unit:coverage` | Run tests with V8 coverage report |

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion |
| Auth (staff) | next-auth v5, Google OAuth (`@aptmaintenanceinc.com` domain only) |
| Auth (techs) | Badge + SHA-256 PIN → UUID session token in `localStorage` |
| Database | Neon Postgres + Drizzle ORM |
| Cache / Rate-limit | Upstash Redis |
| Email | Resend |
| Monitoring | Sentry (`@sentry/nextjs`) |
| Workflow automation | n8n on Railway |
| Deployment | Vercel (auto-deploy from `main`) |

## Deployment

Production: `https://dispatch.aptmaintenanceinc.com`

Merging to `main` triggers a Vercel auto-deploy (~90s). No manual step needed.

If you need to force a manual deploy:
```bash
vercel deploy --prod --archive=tgz
```
Run from `C:\PTOW\1_APT_Central_Command` (repo root). Do not answer `yes` to the env pull prompt — it overwrites `.env.local` with production values.

Preview deployments trigger automatically for all PR branches.

See `docs/ARCHITECTURE.md` for full environment, database branch, and GAS migration documentation.

## Contributing

All feature work goes on `feat/[name]` branches — never commit directly to `main`. See `docs/SPRINT_STANDARDS.md` for sprint gates, diff review requirements, and merge process.
<!-- neon cleanup verification test 2, safe to delete -->
