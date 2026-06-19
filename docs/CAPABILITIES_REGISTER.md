# CC CAPABILITIES REGISTER
# Ground truth — what the system actually does today.
# Updated: S136 (2026-06-04). Update after every sprint that changes behavior.
# READ THIS BEFORE EVERY SESSION THAT TOUCHES FUNCTIONALITY. DO NOT RE-DERIVE FROM CODE.

---

## WHAT THIS SYSTEM IS

APT Central Command is a Field Service Management tool for APT Maintenance Inc.
It replaces a Google Sheet-based dispatch workflow.
Single email address is the ONE intake gate for all inbound WOs.
System has NEVER been used operationally — no real dispatch has run through it.

---

## THE TARGET LOOP (not yet proven end-to-end)

```
Email arrives at gate address
→ GAS parses email → job created in Neon + Sheets
→ Auto-reply sent to requester
→ If non-PTE: tenant contacted for access coordination  ← GAP (commented out)
→ Dispatcher sees job in CC schedule grid
→ Dispatcher assigns tech
→ Lock and Send → SMS to tech (n8n not yet wired)
→ Tech sees job on mobile app → executes
→ Job closes
```

---

## WHAT ACTUALLY WORKS TODAY

### Email Intake (GAS — Code.js) ✅
- `getNewMessages()` polls Gmail API via history ID
- `extractBody()` parses full MIME, strips HTML
- `parseEmail()` extracts 25+ structured fields:
  - emailType: turnover | adhoc_workorder | inspection | new_inquiry | internal_forward | unknown
  - serviceCategory, urgency (1-URGENT → 4-STANDARD)
  - propertyAddress, unitNumber, tenantName, tenantPhone, tenantEmail
  - tenantPreferredContact, tenantHasPets, pteGranted (Yes/No/N/A)
  - estimateNeeded, accessInfo, preferredTiming, rmName, rmEmail
  - confidence score + notes
- `isDuplicateJob()` — prevents duplicate open jobs at same address/unit
- `logToSheet()` — appends to Intake sheet (36 columns)
- `addToDispatchQueue()` — creates job with auto-assigned status:
  - `Needs Review` ← low confidence or unmatched address
  - `PTE Required` ← pteGranted=No
  - `Awaiting Approval` ← estimateNeeded=Yes
  - `Ready to Schedule` ← default (PTE granted, no estimate needed)
- `syncJobToNeon()` — shadow-syncs every job to Neon DB

### Auto-Reply (GAS — Code.js) ✅ (partial)
- `sendAutoReply()` — controlled by AUTO_REPLY_ENABLED flag
- Templates by emailType:
  - Turnover: confirms vacancy, offers direct scheduling
  - Adhoc/Internal: if pteGranted=No, *promises* tenant contact (but doesn't send it)
  - Inspection: sends summary to OPS_EMAIL if multipleItems=true

### Lapham Special Handling ✅
- `detectLaphamForm()` — identifies Lapham Company submissions (website@laphamcompany.com)
- Bypasses Gemini AI parsing; uses direct extraction

### Schedule Grid (Next.js — /schedule) ✅
- ScheduleGrid + TechRow + JobChip + LockSendButton + ConfirmationScreen
- `GET /api/jobs` — job list with counts (urgent, needsAction, ptePending, todayScheduled, doneThisWeek)
- `PATCH /api/jobs/[jobId]` — inline status update
- Lock and Send: `POST /api/schedule/lock-and-send` — dual auth, Zod validation, fires n8n webhook ✅ LIVE

### Tech Mobile (Next.js — /jobs, /login) ✅
- `/login` — TechLoginView badge/PIN keypad (clock. subdomain + ?tech=1 bypass)
- `/jobs` — amber URGENT cards, teal STANDARD/Scheduled, BottomNav (4 tabs)
- `GET /api/getJobs` — tech-facing job loader
- `POST /api/startShift` — clock-in, returns shiftId

### Job Status Lifecycle (9 states)
```
Needs Review → Ready to Schedule
PTE Required → (coordination needed before Ready to Schedule)
Awaiting Approval → (estimate needed before Ready to Schedule)
Ready to Schedule → Scheduled → In Progress → Complete → Archived
```
Status set at creation. Transitions not logged (no audit trail).

---

## GAPS — IN PRIORITY ORDER

### GAP 1 — Tenant Coordination [CRITICAL — BLOCKS OPERATIONAL USE]
- `sendTenantContact()` EXISTS IN CODE but is COMMENTED OUT
- Auto-reply promises tenant contact for non-PTE jobs but never sends it
- Jobs sit in PTE Required with no outreach happening
- Fix: uncomment, complete, and trigger from addToDispatchQueue() when pteGranted=No

### GAP 2 — Lock and Send SMS [HIGH — BLOCKS TECH RECEIVING ASSIGNMENTS]
- N8N_LOCK_SEND_WEBHOOK_URL not set in env or Vercel
- Brandon must create the n8n SMS workflow first (requires his account credentials)
- Without this, techs never receive their daily job assignments

### GAP 3 — Follow-up Logic [HIGH]
- No 24-hour stagnant lead reminders
- No escalation for jobs stuck in Needs Review or PTE Required
- Previously planned in APT FSM Supabase system (abandoned — see below)

### GAP 4 — Status Transition Audit Trail [MEDIUM]
- No log of who changed status and when
- Needed for accountability and ops review

### GAP 5 — Operational Pilot [MUST DO BEFORE MORE FEATURE WORK]
- System has never run a real workday
- No dispatcher has used CC to coordinate a real job
- Test with Brandon manually first; then real dispatcher

---

## KEY ARCHITECTURAL FACTS (do not re-derive)

- ONE email gate: single inbound address → GAS → Neon + Sheets
- Neon is sole write path (cut-over 2026-06-01); Sheets = read-only archive
- Auth: Google OAuth (next-auth v5) for office staff; badge+PIN localStorage for techs
- NEVER mix auth hooks between office and tech pages
- GAS: Code.js v96 (root), TechPWA.gs v90, DashboardAPI.gs v43
- Vercel: auto-deploys on push to main

---

## ABANDONED SYSTEM — APT FSM (Supabase lzzdefdohazlpdbgwptt)
- GitHub: BGB-CRB-Holdings/apt-maintenance-portal
- Had 7 Edge Functions: gmail-webhook-receiver, auto-followup, send-auto-reply,
  sync-pica-leads, send-clarification, send-tenant-email, reprocess-leads
- Infrastructure deployed but sync-pica-leads logic was never finalized
- Abandoned — reason not documented in memory. Investigate before rebuilding any of these.

---

## STRATEGIC CONTEXT
APT CC is proof-of-concept for a broader FSM SaaS opportunity.
Market gap: FSM tools (ServiceTitan, Jobber) assume structured/form-based intake.
Reality: small/mid property maintenance companies receive WOs via email.
An AI-native FSM that parses unstructured email and automates the coordination loop
has no real competitor at a price point small operators can afford (<$300/month).
APT is the dogfood customer. Proving the loop here proves the product.
