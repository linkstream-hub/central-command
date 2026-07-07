# ACTIVE_WORKFLOWS — APT Central Command
<!-- Last updated: 2026-06-27 -->
<!-- CI_CHECK: If you modify this file, your PR diff must include your Task ID or Branch Name in the added lines. -->
<!-- CI_CHECK: The CI greps for webhook routes (src/app/api/webhooks/). If you add a route, you MUST list it in the Webhooks table. Expected format: | `/api/webhooks/route_name` | ... -->
<!-- Vendor markers: 🔵 Postmark  🟢 Clerk  🟡 UploadThing -->

## Rules
- Live workflows only. One owner per workflow.
- Explicit Neon table + Drizzle schema paths required.
- No hidden retries.
- Phase 0 incoming integrations marked PENDING — not yet live.

---

## Workflow Inventory

| ID | Name | Trigger | Tables Mutated | Owner | Status |
|---|---|---|---|---|---|
| WF-001 | Email Intake (n8n/GAS) | GAS poll → n8n POST | `jobs` | n8n | ACTIVE → replace 🔵 Postmark (Phase 0) |
| WF-002 | Job Dispatch Push Notify | POST `/api/jobs` on assign | `jobs`, `employees`, `push_subscriptions` | AG | ACTIVE |
| WF-003 | Staff Auth + GAS Permissions | NextAuth Google OAuth login | reads `employees` | AG | ACTIVE → replace 🟢 Clerk (Phase 1) |
| WF-004 | Tech Sync (GAS → Neon) | GAS TechPWA.gs POST | `employees` | AG | ACTIVE — mostly migrated |
| WF-005 | Field Tech Auth (localStorage) | Badge + PIN submit | reads `employees` | AG | ACTIVE → replace 🟢 Clerk (Phase 0) |

---

## Workflow Details

### WF-001 — Email Intake (n8n/GAS)
- **Entry point**: `src/app/api/webhooks/n8n/gmail/route.ts` (Next.js 16 App Router POST)
- **Input**: `{ subject, bodyText, gmailMsgId, sender }` from n8n
- **Output**: WO row inserted in Neon `jobs`
- **Neon Tables Mutated**: `jobs`
- **Drizzle Code Path**: `tech-pwa/src/lib/schema.ts` → `jobs`
- **Lapham bypass**: `tech-pwa/src/lib/detectLaphamForm.ts:52` — skips Gemini for `website@laphamcompany.com`
- **Retry behavior**: None at route level; n8n retries externally
- **Failure alert path**: 500 if Gemini key missing (`GOOGLE_GENERATIVE_AI_API_KEY` / `GOOGLE_API_KEY` / `GEMINI_API_KEY`); falls back to raw email stub WO
- **Manual fallback**: None — if GAS poll stops, no intake

### WF-006 — Cloudflare Inbound Email Intake <!-- fix/s171-field-fixes -->
- **Entry point**: `src/app/api/intake/email/route.ts` (Next.js App Router POST)
- **Input**: Cloudflare Worker payload `{ subject, bodyText, sender, messageId }`
- **Output**: WO row inserted in Neon `jobs`
- **Webhook URL**: `https://dispatch.aptmaintenanceinc.com/api/intake/email`
- **Auth**: `x-email-token` header validated against `EMAIL_INBOUND_TOKEN` env var
- **Neon Tables Mutated**: `jobs` (upsert on `jobId`); `properties` (access code merge on match)
- **Drizzle Code Path**: `tech-pwa/src/lib/intake/parseEmailToWO.ts` → `jobs`, `properties`
- **Shared logic**: `parseEmailToWO()` — also called by WF-001 (gmail route)
- **Lapham bypass**: `tech-pwa/src/lib/detectLaphamForm.ts:52` — skips Gemini for Lapham senders
- **Retry behavior**: None at route level; Cloudflare Worker best-effort
- **Failure alert path**: 401 on bad token; 500 on missing env/Gemini key; fallback stub WO on parse error
- **Manual fallback**: n8n Gmail workflow (WF-001) remains active until Cloudflare confirmed in prod

### WF-002 — Job Dispatch Push Notify
- **Entry point**: `src/app/api/jobs/route.ts` → `sendJobAssignedPush()` (POST side-effect)
- **Input**: `ManualJobPayload` with `assignedTech` + `scheduledDate`
- **Output**: WebPush notification to tech's registered device(s)
- **Neon Tables Mutated**: `jobs` (write), reads `employees`, `push_subscriptions`
- **Drizzle Code Path**: `tech-pwa/src/lib/schema.ts` → `jobs`, `employees`, `pushSubscriptions`
- **Retry behavior**: `Promise.allSettled` — best-effort; never blocks job creation
- **Failure alert path**: `console.error` only — silent degradation
- **Manual fallback**: Dispatcher contacts tech directly

### WF-003 — Staff Auth + GAS Permissions
- **Entry point**: `src/auth.ts` → `fetchStaffPermissions()` on every NextAuth login
- **Input**: Google OAuth email
- **Output**: Session with permissions from GAS DashboardAPI (`DASHBOARD_API_URL`)
- **Neon Tables Mutated**: None (reads `employees` via NextAuth adapter)
- **Drizzle Code Path**: `tech-pwa/src/lib/schema.ts` → `employees`
- **GAS dependency**: `DASHBOARD_API_URL` → `DashboardAPI.gs` (P0-003 — GAS remains a single point of failure on every login; the separate NEXT_PUBLIC_ exposure issue, P0-001, was fixed TC-PH1-001/PR #29)
- **Retry behavior**: None
- **Failure alert path**: Login fails silently if GAS times out; no alert
- **Manual fallback**: None — all staff locked out if GAS down

### WF-004 — Tech Sync (GAS → Neon)
- **Entry point**: `src/app/api/techs/sync/route.ts` (Next.js 16 App Router POST)
- **Input**: Employee data from `TechPWA.gs`; auth: `DASHBOARD_API_KEY` header
- **Output**: Upsert into `employees` (badge as natural key; partial unique index on `orgId + badge`)
- **Neon Tables Mutated**: `employees`
- **Drizzle Code Path**: `tech-pwa/src/lib/schema.ts` → `employees`
- **Retry behavior**: None; GAS retries on next scheduled run
- **Failure alert path**: 500 logged to Vercel; no alert channel
- **Manual fallback**: Manual tech data entry via admin

### WF-005 — Field Tech Auth (localStorage)
- **Entry point**: `src/lib/auth.ts:3` → `localStorage['apt_tech_session']` (client-side)
- **Input**: Badge number (3 digits) + 4-digit PIN
- **Output**: `TechSession` token stored in localStorage — XSS-exploitable (P0-002)
- **Neon Tables Mutated**: None (reads `employees.sessionToken` for validation)
- **Drizzle Code Path**: `tech-pwa/src/lib/schema.ts` → `employees`
- **Retry behavior**: N/A
- **Failure alert path**: None
- **Manual fallback**: None

---

## External Webhooks

| Provider | Route | Auth | Writes Neon |
|---|---|---|---|
| n8n (Railway) | `POST /api/webhooks/n8n/gmail` | `DASHBOARD_API_KEY` header | Yes → `jobs` |
| GAS (TechPWA.gs) | `POST /api/techs/sync` | `DASHBOARD_API_KEY` header | Yes → `employees` |
| 🔵 Cloudflare Email Routing | `POST /api/intake/email` | `x-email-token` header vs `EMAIL_INBOUND_TOKEN` | Yes → `jobs` | <!-- fix/s171-field-fixes -->

---

## Disabled / Legacy Workflows

| Name | Replacement | Status | Sunset Target |
|---|---|---|---|
| Sheets-version Phase 19 polling | Current n8n Gmail workflow | DELETED | Done |
| GAS `Code.js` Gmail polling | 🔵 Postmark Inbound Parse | TRANSITIONAL | Phase 0 |
| GAS `DashboardAPI.gs` permissions | Neon `staff_permissions` table | TRANSITIONAL | Phase 1 |
| Custom S3 photo upload wrapper | 🟡 UploadThing | BROKEN (throws on upload) | Phase 0 |
| GAS `TechPWA.gs` tech data API | Neon `employees` table | MOSTLY MIGRATED | Phase 4 |

---

## Failure Handling

### WF-001 / Gemini key missing
- **Symptom**: `POST /api/webhooks/n8n/gmail` returns 500; email not parsed
- **Check**: Verify `GOOGLE_GENERATIVE_AI_API_KEY` set in Vercel env (prod + preview)
- **Fallback**: Route inserts raw email as stub WO (fields empty, status `Needs Info`)
- **Alert**: Vercel runtime error log (4 occurrences observed 2026-06-24, deployment `dpl_7M6sAPwsY2t5XWjni1HSrXqNXw5s`)

### WF-003 / GAS DashboardAPI timeout
- **Symptom**: Staff login hangs; Vercel `/api/gas` timeout at 300s
- **Check**: GAS execution log; Vercel timeout error in runtime logs
- **Fallback**: None — all staff locked out
- **Alert**: Vercel timeout log (1 occurrence observed 2026-06-25); confirms Phase 0 Postmark + Phase 1 Clerk urgency
