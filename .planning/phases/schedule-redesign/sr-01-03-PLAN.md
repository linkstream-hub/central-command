---
phase: sr-01
plan: 03
type: execute
wave: 2
depends_on: [sr-01-02]
files_modified:
  - tech-pwa/src/lib/schema.ts
  - tech-pwa/drizzle/ (generated migration file)
  - tech-pwa/src/app/api/schedule/lock-and-send/route.ts
  - tech-pwa/src/components/dashboard/LockSendButton.tsx
  - tech-pwa/src/components/dashboard/ConfirmationScreen.tsx
  - tech-pwa/src/app/schedule/page.tsx
autonomous: false
requirements: [SR-03]
user_setup:
  - service: n8n
    why: "Lock and Send webhook fires n8n which sends Twilio SMS per tech"
    env_vars:
      - name: N8N_LOCK_SEND_WEBHOOK_URL
        source: "n8n workflow webhook URL — Brandon creates n8n workflow then types URL into .env.local and Vercel Production + Preview environments"
    dashboard_config:
      - task: "Create n8n webhook workflow that receives techs[] payload and fires Twilio SMS per tech"
        location: "n8n dashboard (Railway) → New Workflow"
must_haves:
  truths:
    - "POST /api/schedule/lock-and-send requires auth() session OR x-api-key (dual auth) — returns 401 otherwise"
    - "Sending same date twice returns 409 Conflict (idempotency guard)"
    - "Tech phone numbers are fetched server-side only — never returned to client"
    - "N8N_LOCK_SEND_WEBHOOK_URL missing = warn + skip webhook + still mark dispatch_sent_at"
    - "Confirmation screen shows tech count and job count after successful send"
    - "dispatch_sent_at column exists on jobs table in Neon (nullable timestamp)"
  artifacts:
    - path: "tech-pwa/src/lib/schema.ts"
      provides: "dispatchSentAt column on jobs table"
      contains: "dispatch_sent_at"
    - path: "tech-pwa/src/app/api/schedule/lock-and-send/route.ts"
      provides: "POST route with dual auth, idempotency, fire-and-forget webhook"
      exports: ["POST"]
    - path: "tech-pwa/src/components/dashboard/ConfirmationScreen.tsx"
      provides: "Lock and Send confirmation overlay"
      exports: ["ConfirmationScreen"]
  key_links:
    - from: "LockSendButton"
      to: "/api/schedule/lock-and-send"
      via: "fetch POST with date"
      pattern: "fetch.*lock-and-send"
    - from: "route.ts"
      to: "employees table"
      via: "db.select phone server-side"
      pattern: "employees.*phone"
    - from: "route.ts"
      to: "N8N_LOCK_SEND_WEBHOOK_URL"
      via: "process.env (server-only)"
      pattern: "N8N_LOCK_SEND_WEBHOOK_URL"
---

<objective>
Add dispatch_sent_at to the jobs schema, implement POST /api/schedule/lock-and-send with dual auth + idempotency + fire-and-forget n8n webhook, wire the LockSendButton to call the API, and build the ConfirmationScreen component (Image c0ab2aab pattern).

This plan requires a Neon schema migration. FLAG-REVIEWED: Claude Code evaluated and APPROVED (nullable timestamp, non-destructive ALTER TABLE ADD COLUMN).

Purpose: The Lock and Send action is what kills the Google Sheet. The "S" column dies when this works.
Output: Schema migration, lock-and-send API route, wired LockSendButton, ConfirmationScreen.
</objective>

<execution_context>
@C:/Users/Aldrick/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/Aldrick/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-CONTEXT.md
@C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-RESEARCH.md
@C:/PTOW/1_APT_Central_Command/RULES.md
@C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-02-SUMMARY.md

<interfaces>
<!-- jobs table current definition (schema.ts lines 337-374) — no dispatchSentAt -->
export const jobs = pgTable('jobs', {
  id, orgId, employeeId, propertyId, jobId, timestamp, priority, emailType,
  category, address, unit, description, timing, accessInfo, rmName, rmEmail,
  tenantName, tenantPhone, tenantEmail, pte, estimate, tech, scheduledDate,
  scheduledTime, estHours, status, notes, gmailMsgId, calendarEventId,
  tenantPref, tenantPets, wcCode, trackingToken, tenantScheduled,
  disputeReason, createdAt
  // dispatchSentAt: MISSING — add here
});

<!-- employees table has phone field (schema.ts line 131) -->
export const employees = pgTable('employees', {
  ...
  phone: text('phone'),
  name: text('name').notNull(),
  badge: text('badge'),
  role: text('role').notNull(),
  isActive: boolean('is_active').default(true),
  ...
});

<!-- Auth pattern for new route (matches week/route.ts lines 27-31) -->
const session = await auth();
const apiKey = req.headers.get('x-api-key');
const isApiKeyAuth = !session && apiKey === process.env.DASHBOARD_API_KEY;
if (!session && !isApiKeyAuth) {
  return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
}

<!-- n8n webhook fire-and-forget pattern (from attestation/sign/route.ts lines 49-57) -->
const webhookUrl = process.env.N8N_LOCK_SEND_WEBHOOK_URL;
if (!webhookUrl) {
  console.warn('[lock-and-send] N8N_LOCK_SEND_WEBHOOK_URL undefined, skipping');
} else {
  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(err => console.error('[lock-and-send] webhook failed:', err));
}
// Do NOT await — return 200 quickly

<!-- n8n payload shape -->
{
  date: string,            // YYYY-MM-DD
  techs: [{
    techName: string,
    phone: string,         // from employees.phone — server-side only, NEVER returned to client
    jobs: [{ jobId, address, unit, serviceCategory, scheduledTime, estimatedHours, priority }]
  }],
  sentBy: string,          // session.user?.name or 'api-key-auth'
  sentAt: string,          // new Date().toISOString()
}

<!-- Idempotency check — jobs with dispatch_sent_at already set for the date -->
Query: SELECT COUNT(*) FROM jobs WHERE scheduled_date = :date AND dispatch_sent_at IS NOT NULL
If count > 0: return NextResponse.json({ success: false, message: 'Already dispatched for this date' }, { status: 409 })

<!-- Zod schema for request body -->
import { z } from 'zod';
const LockSendSchema = z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) });

<!-- N8N_LOCK_SEND_WEBHOOK_URL — server-only, NO NEXT_PUBLIC_ prefix -->
Must NOT appear in any client-side code. Only in route.ts server file.

<!-- RULES.md hard prohibition -->
- No `as any` anywhere
- Dual auth on every new /api/ route (auth() + x-api-key) — missing either = BLOCK
- No NEXT_PUBLIC_ prefix on server-only secrets
</interfaces>
</context>

<tasks>

<task type="auto" tdd="false">
  <name>Task 1: Add dispatchSentAt to jobs schema + run migration (FLAG-REVIEWED)</name>
  <read_first>
    C:/PTOW/1_APT_Central_Command/tech-pwa/src/lib/schema.ts
    C:/PTOW/1_APT_Central_Command/tech-pwa/package.json
  </read_first>
  <action>
    SCHEMA MIGRATION — FLAG-REVIEWED by Claude Code (nullable timestamp, non-destructive).

    Edit tech-pwa/src/lib/schema.ts:
    In the jobs table definition, add after the disputeReason field and before createdAt:
      dispatchSentAt: timestamp('dispatch_sent_at'),

    The full line is: dispatchSentAt: timestamp('dispatch_sent_at'),
    This is nullable by default (no .notNull()). No default value — null means not yet dispatched.

    Then run migration:
    cd C:/PTOW/1_APT_Central_Command/tech-pwa
    npm run db:generate
    — review the generated SQL in drizzle/ — must be: ALTER TABLE "jobs" ADD COLUMN "dispatch_sent_at" timestamp;
    — if SQL looks correct (non-destructive ADD COLUMN only), proceed:
    npm run db:migrate

    If db:migrate fails, STOP and report to Claude Code with the exact error.
    Do NOT run db:migrate if the generated SQL contains DROP, TRUNCATE, or anything destructive.
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit 2>&1 | tail -3</automated>
  </verify>
  <acceptance_criteria>
    - schema.ts jobs table contains: dispatchSentAt: timestamp('dispatch_sent_at')
    - drizzle/ directory contains a new migration file with ADD COLUMN dispatch_sent_at
    - Migration SQL contains only ADD COLUMN (no DROP, no TRUNCATE, no data modification)
    - npm run db:migrate exits 0
    - npx tsc --noEmit exits 0
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 2: Implement POST /api/schedule/lock-and-send/route.ts</name>
  <read_first>
    C:/PTOW/1_APT_Central_Command/tech-pwa/src/app/api/schedule/week/route.ts
    C:/PTOW/1_APT_Central_Command/tech-pwa/src/app/api/field/attestation/sign/route.ts
    C:/PTOW/1_APT_Central_Command/tech-pwa/src/lib/schema.ts
  </read_first>
  <action>
    Create tech-pwa/src/app/api/schedule/lock-and-send/route.ts

    The file must:

    1. Import: NextRequest, NextResponse from 'next/server'; auth from '@/auth'; db from '@/lib/db';
       jobs, employees from '@/lib/schema'; eq, and, isNull, ne from 'drizzle-orm'; z from 'zod'.
       Add: export const dynamic = 'force-dynamic';

    2. Define Zod schema: const LockSendSchema = z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) });

    3. Export async function POST(req: NextRequest):
       a. Dual auth check: auth() session OR x-api-key header === process.env.DASHBOARD_API_KEY.
          If neither: return 401 { success: false, message: 'Unauthorized' }.
       b. Parse body with LockSendSchema.safeParse. If invalid: return 400.
       c. Idempotency check: query jobs WHERE scheduledDate = date AND dispatchSentAt IS NOT NULL.
          If any rows found: return 409 { success: false, message: 'Already dispatched for this date' }.
       d. Fetch all jobs for date: WHERE scheduledDate = date AND status != 'Archived' AND tech IS NOT NULL.
       e. Collect unique tech names from job rows.
       f. Fetch employees: WHERE name IN (techNames) AND role = 'tech'.
          Build Map<techName, phone> from result.
       g. Build payload.techs array: for each unique techName, phone = phoneMap.get(techName) ?? ''.
          Include phone in webhook payload ONLY — do NOT include phone in the HTTP response.
       h. Fire-and-forget webhook (N8N_LOCK_SEND_WEBHOOK_URL):
          Warn if env var missing (console.warn), skip if missing, do NOT await.
          sentBy = session?.user?.name ?? 'api-key-auth'. sentAt = new Date().toISOString().
       i. UPDATE jobs SET dispatchSentAt = new Date() WHERE scheduledDate = date
          AND tech IS NOT NULL AND status != 'Archived'.
          Use db.update(jobs).set({ dispatchSentAt: new Date() }).where(and(...)).
       j. Return: { success: true, techCount: N, jobCount: N }
          — techCount = unique tech names count, jobCount = total jobs updated.
          DO NOT include phones or employee PII in the response.

    RULES:
    - No `as any` anywhere in this file
    - N8N_LOCK_SEND_WEBHOOK_URL must only appear as process.env.N8N_LOCK_SEND_WEBHOOK_URL — never hardcoded, never NEXT_PUBLIC_
    - Dual auth is mandatory (both checks present) per RULES.md
    - Phone numbers never returned to client (only in webhook payload, never in NextResponse)
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit 2>&1 | tail -5</automated>
  </verify>
  <acceptance_criteria>
    - File exists at src/app/api/schedule/lock-and-send/route.ts
    - File contains: auth() from '@/auth' (session check)
    - File contains: x-api-key header check against process.env.DASHBOARD_API_KEY
    - File contains: status: 409 block with 'Already dispatched' message
    - File contains: LockSendSchema with date regex
    - File does NOT contain: NEXT_PUBLIC_N8N or any NEXT_PUBLIC_ env var
    - File does NOT return phone numbers in NextResponse.json()
    - No `as any` in file (grep "as any" returns 0)
    - npx tsc --noEmit exits 0
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 3: Build ConfirmationScreen + wire LockSendButton to API</name>
  <read_first>
    C:/PTOW/1_APT_Central_Command/tech-pwa/src/components/dashboard/LockSendButton.tsx
    C:/PTOW/1_APT_Central_Command/tech-pwa/src/app/schedule/page.tsx
    C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-CONTEXT.md
  </read_first>
  <action>
    Create tech-pwa/src/components/dashboard/ConfirmationScreen.tsx:
    Props: { techCount: number; jobCount: number; date: string; onClose: () => void }
    Renders a centered overlay (fixed inset-0 bg-black/60 z-50 flex items-center justify-center).
    Card: bg-[var(--bg-surface)] rounded-xl p-8 max-w-md w-full shadow-2xl border border-[var(--border-subtle)].
    Content per Image c0ab2aab pattern:
    - Header: "Dispatched" in text-2xl font-700 text-white
    - Amber checkmark icon (CheckCircle from lucide-react, text-amber-500, w-12 h-12) centered
    - Stat line: "{techCount} techs · {jobCount} jobs" in text-lg text-slate-300 tabular-nums
    - Date line: formatted date (e.g. "Monday, June 3") in text-sm text-slate-500
    - "Done" button: bg-amber-500 hover:bg-amber-400 text-black font-600 px-6 py-2 rounded-lg
      onClick={onClose}, transition-all duration-200 active:scale-[0.98]

    Update LockSendButton.tsx:
    Change props to: { date: string; onSuccess?: (result: { techCount: number; jobCount: number }) => void; disabled?: boolean }
    onClick handler:
    - Set loading state (local useState<boolean>)
    - POST fetch('/api/schedule/lock-and-send') with body: JSON.stringify({ date })
      headers: { 'Content-Type': 'application/json' }, credentials: 'include'
    - On 409: show browser alert "Already dispatched for this date" (simple for Sprint 1)
    - On success: call props.onSuccess?.({ techCount, jobCount })
    - On error: console.error, set loading false
    - Loading state: show spinner text "Sending..." with cursor-not-allowed
    data-testid="lock-send-btn" must remain on the button element.

    Update schedule/page.tsx:
    - Import ConfirmationScreen from '@/components/dashboard/ConfirmationScreen'
    - Add state: confirmationData: { techCount: number; jobCount: number } | null — default null
    - LockSendButton onSuccess={(result) => setConfirmationData(result)}
    - Render: {confirmationData && <ConfirmationScreen techCount={confirmationData.techCount} jobCount={confirmationData.jobCount} date={selectedDate} onClose={() => setConfirmationData(null)} />}
    - Remove the placeholder "plan 03 will wire this" overlay from plan 02

    No `as any` in any of these files.
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit 2>&1 | tail -5</automated>
  </verify>
  <acceptance_criteria>
    - ConfirmationScreen.tsx exists with techCount and jobCount props
    - LockSendButton.tsx POSTs to '/api/schedule/lock-and-send'
    - LockSendButton.tsx does NOT import or use phone data
    - schedule/page.tsx renders ConfirmationScreen conditionally on confirmationData
    - data-testid="lock-send-btn" still present on LockSendButton button element
    - No `as any` in any modified file
    - npx tsc --noEmit exits 0
  </acceptance_criteria>
</task>

<task type="auto" tdd="false">
  <name>Task 4 (N-2): tsc + push + git diff artifact</name>
  <read_first>Nothing to read — terminal task</read_first>
  <action>
    1. cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit — must exit 0. Fix before continuing.
    2. git add tech-pwa/src/lib/schema.ts tech-pwa/drizzle/ tech-pwa/src/app/api/schedule/lock-and-send/ tech-pwa/src/components/dashboard/LockSendButton.tsx tech-pwa/src/components/dashboard/ConfirmationScreen.tsx tech-pwa/src/app/schedule/page.tsx
    3. git commit -m "feat(schedule): lock-and-send API + schema migration + confirmation screen"
    4. git push origin HEAD
    5. git diff main...HEAD > C:/PTOW/1_APT_Central_Command/artifacts/sr-01-03-diff.txt
    6. git add artifacts/sr-01-03-diff.txt && git commit -m "chore: sr-01-03 diff artifact" && git push origin HEAD
    Post diff path to Claude Code and stop. Wait for PASS.
  </action>
  <verify>
    <automated>cd C:/PTOW/1_APT_Central_Command/tech-pwa && npx tsc --noEmit</automated>
  </verify>
  <acceptance_criteria>
    - npx tsc --noEmit exits 0
    - artifacts/sr-01-03-diff.txt is non-empty and contains dispatch_sent_at
    - Branch is feat/schedule-redesign
  </acceptance_criteria>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 5 (N-1): Test sprint — Lock and Send end-to-end</name>
  <read_first>Nothing to read — browser verification task</read_first>
  <what-built>
    1. Add N8N_LOCK_SEND_WEBHOOK_URL to tech-pwa/.env.local (Brandon types value, or leave unset to test graceful degradation)
    2. cd C:/PTOW/1_APT_Central_Command/tech-pwa && npm run dev
    3. Log in as admin, visit http://localhost:3000/schedule
    4. Click "Lock and Send" button
    5. Verify: loading state appears on button ("Sending...")
    6. Verify: ConfirmationScreen appears with tech count + job count
    7. Click "Done" — verify confirmation screen closes
    8. Click "Lock and Send" again for same date — verify 409 alert "Already dispatched for this date"
    9. Run: cd tech-pwa && npx playwright test — must show 0 failed
    10. Kill dev server
    11. Write artifacts/sr-01-03-test-results.txt with:
        - Lock and Send click → loading state visible: ______
        - Confirmation screen appeared with counts: techCount=______ jobCount=______
        - Second click 409 alert appeared: ______
        - N8N_LOCK_SEND_WEBHOOK_URL set: ______ (yes/no — graceful degrade if no)
        - Playwright summary line: ______
  </what-built>
  <how-to-verify>
    - ConfirmationScreen must appear with numeric tech/job counts (not 0/0 unless no jobs scheduled)
    - Second click same date must return 409 behavior
    - Playwright: 0 failed
  </how-to-verify>
  <resume-signal>Post artifacts/sr-01-03-test-results.txt to Claude Code and stop. Wait for clear-to-merge.</resume-signal>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 6 (N): Merge after Claude Code clear-to-merge</name>
  <read_first>Nothing to read</read_first>
  <what-built>N/A — merge gate only</what-built>
  <how-to-verify>Merge only after Claude Code issues "Clear to merge." Not before.</how-to-verify>
  <resume-signal>Claude Code issues "Clear to merge" — then merge PR</resume-signal>
</task>

</tasks>

<threat_model>
## Trust Boundaries

| Boundary | Description |
|----------|-------------|
| client → POST /api/schedule/lock-and-send | Authenticated dispatcher action; dual auth required |
| route.ts → employees table | Phone numbers fetched server-side; never returned to client |
| route.ts → N8N_LOCK_SEND_WEBHOOK_URL | External webhook; fire-and-forget; server-only env var |

## STRIDE Threat Register

| Threat ID | Category | Component | Disposition | Mitigation Plan |
|-----------|----------|-----------|-------------|-----------------|
| T-sr03-01 | Elevation of Privilege | POST /api/schedule/lock-and-send | mitigate | Dual auth: auth() session + x-api-key; both required per RULES.md |
| T-sr03-02 | Denial of Service | Duplicate dispatch (Twilio cost) | mitigate | Idempotency: check dispatch_sent_at; return 409 if already set for date |
| T-sr03-03 | Information Disclosure | Tech phone numbers | mitigate | Phones fetched server-side only; never included in NextResponse body |
| T-sr03-04 | Information Disclosure | N8N webhook URL | mitigate | Server-only env var (no NEXT_PUBLIC_ prefix); never in client bundle |
| T-sr03-05 | Tampering | Unvalidated date param | mitigate | Zod regex validation: /^\d{4}-\d{2}-\d{2}$/ on request body |
| T-sr03-SC | Tampering | npm installs | accept | No new packages in this plan |
</threat_model>

<verification>
- npx tsc --noEmit exits 0
- POST /api/schedule/lock-and-send returns 401 without auth
- POST /api/schedule/lock-and-send returns 409 on duplicate date
- Phone numbers not present in any HTTP response body
- N8N_LOCK_SEND_WEBHOOK_URL not prefixed with NEXT_PUBLIC_
- Confirmation screen shows techCount + jobCount
- Playwright: 0 new failures
</verification>

<success_criteria>
- dispatch_sent_at column exists on Neon jobs table
- Lock and Send button calls API, shows loading, opens confirmation screen
- Idempotency guard prevents duplicate Twilio charges
- Phone numbers never leave the server
- Zero Playwright regressions
</success_criteria>

<output>
Create C:/PTOW/1_APT_Central_Command/.planning/phases/schedule-redesign/sr-01-03-SUMMARY.md when done
</output>
