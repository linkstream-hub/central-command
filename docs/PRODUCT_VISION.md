# APT FSM — PRODUCT VISION
# The authoritative north star for all build decisions.
# Any feature, sprint, or architectural choice that doesn't advance this vision = don't build it.
# Last Updated: S168 (2026-06-25)

---

## WHAT WE ARE BUILDING

An AI-native Field Service Management platform for small-to-mid property maintenance operators.

**The market gap we exploit:**
ServiceTitan and Jobber assume structured intake — a form, a portal, a scheduled request. Property maintenance reality is unstructured: work orders arrive as emails from property managers, tenants, and owner forwards. Nobody turns that chaos into structure automatically. We do.

**The wedge:** A single email address becomes a fully automated intake-to-dispatch pipeline. No form fills. No manual data entry. No missed jobs buried in Gmail.

**The price point:** Under $300/month for a full operator. ServiceTitan starts at $500+/month and requires 3-month onboarding. Jobber is simpler but still form-based. We are the first AI-native FSM at a price a 3-technician operation can afford on day one.

---

## THE PROBLEM WE SOLVE

A property maintenance operator today:
1. Receives 20-50 emails/day with work order requests — each in a different format
2. Manually reads each email, copies address/unit/issue into a spreadsheet
3. Calls or texts techs to assign jobs
4. Manually follows up with tenants for access coordination (PTE)
5. Never knows in real time which jobs are stuck, which techs are overloaded, which invoices are late
6. Loses jobs in their inbox every week

**Result:** Operators spend 3-4 hours/day on coordination that generates zero revenue.

**We eliminate all of it.**

---

## THE SOLUTION

```
Email arrives at one gate address
→ AI reads it, extracts 25+ structured fields in seconds
→ Job created in database with correct status and urgency
→ Tenant automatically contacted for access if needed
→ Dispatcher sees clean job queue — no email digging
→ One click assigns jobs and sends SMS to each tech
→ Tech sees job on mobile app, executes, marks complete
→ Invoice generated from completed job
→ PM company sees status without calling
```

Zero manual data entry. Zero missed coordination. Dispatcher becomes a decision-maker, not a copy-paste operator.

---

## MARKET POSITION

| Capability | ServiceTitan | Jobber | **APT FSM** |
|------------|-------------|--------|-------------|
| AI email intake | ❌ | ❌ | ✅ |
| Unstructured → structured | ❌ | ❌ | ✅ |
| Dispatch console | ✅ | ✅ | ✅ |
| Tech mobile app | ✅ | ✅ | ✅ |
| Automated tenant coordination | ❌ manual | ❌ manual | ✅ target |
| SMS dispatch | ✅ | ✅ | ✅ target |
| Follow-up automation | ❌ | ❌ | ✅ target (n8n) |
| Client portal | ✅ | ✅ | Phase 3 |
| Invoicing / billing | ✅ | ✅ | Phase 4 |
| Analytics / reporting | ✅ | ✅ | Phase 4 |
| Multi-tenancy / SaaS | N/A | N/A | Phase 5 |
| AI-native from day 1 | ❌ | ❌ | ✅ |
| Price point | $500+/mo | $49–349/mo | <$300/mo |

**Where we win:** The intake-to-dispatch loop is automated end-to-end in a way no competitor offers. An operator who receives complex PM-company email chains doesn't configure anything — the AI handles it.

---

## THE 10 CAPABILITIES OF A COMPLETE FSM

Every feature we ship maps to one of these. Nothing gets built that doesn't advance a numbered capability.

### 1. Intake Engine ✅ SHIPPED
- AI parses unstructured email → 25+ structured fields
- 6 email types: turnover, adhoc WO, inspection, new inquiry, internal forward, unknown
- Urgency scoring, duplicate detection, auto-status assignment
- Special handling for known partners (Lapham)

### 2. Dispatch Console ✅ SHIPPED
- Triage Kanban (default view) — jobs scoped to active states, sorted by priority tier
- Date navigation — dispatcher selects day, timeline board updates
- Real-time job counts (urgent, needs action, PTE pending, today scheduled, done this week)
- Lock and Send removed (PR #15 — deprecated per S160 grilling)

### 3. Tech Mobile App ✅ SHIPPED
- Badge + PIN login (no Google account required for techs)
- Job list with urgency-coded cards (amber URGENT, teal STANDARD)
- Clock-in / shift start
- Bottom navigation

### 3a. UI Hardening ✅ SHIPPED (Phase 22, PR #12)
- Dead artifacts removed (LockSendButton, ConfirmationScreen)
- JobDetailModal label/status/duplicate-section fixes
- Kanban scoped to triage states only

### 4. Coordination Loop ❌ GAP — HIGHEST PRIORITY
- Automated tenant contact when PTE not granted (`sendTenantContact` commented out in Code.js)
- Follow-up reminders for non-responding tenants
- Status notifications to property managers

### 5. SMS Dispatch ❌ GAP — BLOCKS OPERATIONAL USE
- n8n webhook receives Lock and Send trigger
- Sends formatted SMS to each assigned tech
- Requires: Brandon creates n8n workflow + `N8N_LOCK_SEND_WEBHOOK_URL` set

### 6. Automation Engine ❌ NOT BUILT
- 24h stagnant lead escalation
- 48h PTE non-response escalation
- Stuck-job alerts to dispatcher
- CA Break Compliance monitoring (PAGA exposure)

### 7. Client Portal ❌ NOT BUILT (Phase 3)
- PM company login to see their jobs
- Status updates without calling dispatcher
- Access request confirmation flow

### 8. Job Execution ❌ PARTIAL
- Job status lifecycle (9 states) ✅
- Status transition audit trail ❌
- Photo uploads, notes, completion sign-off ❌

### 9. Billing & Invoicing ❌ NOT BUILT (Phase 4)
- Invoice generated from completed job
- `crater` (open-source invoicing, forked) available as foundation
- Stripe payment collection

### 10. Operations Intelligence ❌ NOT BUILT (Phase 4)
- Job completion rate, average response time, tech utilization
- Revenue per property, per PM company
- Daily/weekly ops digest to owner

---

## SUCCESS METRICS

### Phase 1 Gate (Operational Pilot):
- 10 real jobs dispatched via CC with zero manual spreadsheet fallback
- Dispatcher time on coordination: <30 min/day (down from 3-4 hrs)

### Phase 2 Gate (Operational Reliability):
- Dispatchers use CC as PRIMARY tool — spreadsheet dead
- Follow-up automation handles 100% of PTE escalations without dispatcher action

### Phase 3 Gate (Client Visibility):
- At least 1 PM company logging into client portal weekly
- Zero "what's the status?" calls from PM companies per week

### Phase 4 Gate (Revenue Operations):
- Invoices generated from CC for 50%+ of completed jobs
- Time from job completion → invoice sent: <24 hours

### Phase 5 Gate (SaaS Validation):
- 3 paying customers on the same codebase
- Onboarding time: <1 business day

---

## DESIGN PRINCIPLES

1. **Email-first.** The intake gate is always a single email address. No portals, forms, or logins required from requestors.
2. **AI handles structure.** Humans never manually parse or re-type information the AI can extract.
3. **Automation is the default.** If a coordination step can be automated, it is. Manual actions are exceptions, not the rule.
4. **Dispatcher is a decision-maker.** CC handles all information retrieval, routing, and communication. The dispatcher approves, overrides, or escalates — they do not copy-paste.
5. **Mobile-first for techs.** Every interaction a tech has must work on a phone with one hand, in a parking lot.
6. **One action = one outcome.** Lock and Send assigns all techs in one click. Nothing requires opening multiple tabs.
7. **Ship the loop before the portal.** The dispatch loop is the core. If the loop doesn't work, nothing else matters.
