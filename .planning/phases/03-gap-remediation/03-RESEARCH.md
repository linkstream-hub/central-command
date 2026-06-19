# Phase 3: Gap Remediation — Research

**Researched:** 2026-05-30
**Domain:** GAS (Code.js parsing), Next.js (tech-pwa UX), Neon (data cleanup)
**Confidence:** HIGH — all findings verified directly against live source files

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **GAP-01:** detectLaphamForm() serviceCategory hardcoded 'Unknown' — add keyword inference from description field. Keywords: plumbing, leak, drain, electrical, outlet, breaker, HVAC, AC, heat, heating, cooling, carpentry, lock, appliance, pest, general.
- **GAP-01b:** WO card (JobDetailModal) does not render tenantName + tenantPhone even when populated in Neon — render both when non-null alongside tenant_email.
- **GAP-02 Fix 1:** Extend field() or add fieldForwarded() to scan inside forwarded/quoted email blocks (lines starting with `>`, or body after `---------- Forwarded message ---------`).
- **GAP-02 Fix 2:** Strip `<mailto:...>` suffix from all email fields — regex: replace `<mailto:[^>]+>` with empty string.
- **GAP-02 Fix 3:** If description still empty after forwarded-block parsing, fall back to extracting all text after the field block as the description.
- **GAP-03:** Re-test only. No code fix. Comms reply path re-tested on real Lapham WO after GAP-01/02 land.
- **GAP-04:** DELETE FROM jobs WHERE job_id = 'APT-SEED-0001' — Brandon runs in Neon console.
- **GAP-05:** Add tenant contact section to WO card — render tenantName, tenantPhone, tenantEmail when any is non-null.
- **GAP-06 Fix 1:** Search ranking: exact WO# match first, then prefix matches, then substring matches.
- **GAP-06 Fix 2:** Remove the redundant non-functional search bar.
- **GAP-07:** Update sidebar nav labels — 'Operations' → 'Needs Review', 'Schedule Queue' → 'Ready to Schedule'. (Work Schedule stays as-is — it already matches the workflow stage.)
- **GAP-08:** SMS-style contrast — Requester messages left-aligned with neutral/grey background; Dispatch messages right-aligned with accent color background.
- **GAP-09:** Add Sam Cooney (cooneysam@gmail.com, name: Sam Cooney) to contact lookup. Determine storage location and add entry.

### Claude's Discretion

- Test execution strategy — can run Playwright e2e on the UX fixes in parallel.
- Wave ordering — GAS fixes first (they unblock GAP-03 re-test and data quality).
- Whether GAP-09 requires a code fix (add to lookup during processing) vs a data patch.

### Deferred Ideas (OUT OF SCOPE)

- CC3.0 architecture migration (GAS → Next.js) — explicitly out of scope.
- New UX features beyond the 4 gap fixes — out of scope.
- CA Break Compliance / PAGA webhook — below milestone gate.
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| GAP-01 | Every failure or gap surfaced during verification phases is diagnosed and fixed before milestone closes | All 9 gaps mapped to exact file/line targets — see Gap Inventory below |
| GAP-02 | All v1.0 requirements pass on real production data after gap fixes applied | Re-test protocol documented in GAP-03 section; Neon cleanup documented for GAP-04 |
</phase_requirements>

---

## Summary

Phase 3 is a pure remediation sprint — no new features, no architecture changes. Every gap was diagnosed in Phase 2 with specific WO evidence. The work splits cleanly into three streams: (1) GAS Code.js parsing fixes for detectLaphamForm() and the field() extractor, (2) Next.js tech-pwa UX fixes across two components (JobDetailModal and AppSidebar), and (3) data/manual cleanup steps that Brandon executes directly (Neon DELETE, contact entry).

The research confirmed all target files and exact line ranges against live source code. No unknowns remain in the implementation scope. The only discretionary decision is GAP-09: the contact lookup lives in the GAS "Master Directory" Google Sheet — not a Neon table or a hardcoded JS object — so adding Sam Cooney is a direct Sheet row add, not a code change.

The two search bars (GAP-06) are structurally distinct: the functional one is in `live/page.tsx` → `JobQueueTable`, and the dead one is the `DashboardLayout` header button that fires `CommandPalette` via Ctrl+K. CommandPalette is a global overlay, not a duplicate of JobQueueTable search, so the "remove redundant bar" fix means removing the header Search button that triggers it — or determining which one is the intended dispatch-page search. This is the one ambiguity the planner should surface to the user before implementation.

**Primary recommendation:** Execute in three waves — Wave 1: GAS parsing fixes (GAP-01, GAP-02, GAP-09 Sheet entry); Wave 2: tech-pwa UX fixes (GAP-05, GAP-06, GAP-07, GAP-08); Wave 3: data cleanup (GAP-04 Neon DELETE, GAP-03 re-test). Waves 1 and 2 can be specced in parallel as they touch different codebases.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Email field extraction (GAP-01, GAP-02) | GAS / Code.js | — | detectLaphamForm() runs server-side in Apps Script at email ingestion time |
| serviceCategory inference (GAP-01) | GAS / Code.js | — | Classification happens at parse time, stored to Neon; UI just displays it |
| WO card tenant display (GAP-01b, GAP-05) | Frontend (Next.js) | — | Data already in Neon; fix is rendering, not data pipeline |
| Search ranking + deduplication (GAP-06) | Frontend (Next.js) | — | Both search bars are client-side; ranking is a JS sort change |
| Sidebar nav labels (GAP-07) | Frontend (Next.js) | — | Static string constants in AppSidebar.tsx NAV_ITEMS array |
| Comms message contrast (GAP-08) | Frontend (Next.js) | — | CSS class change on message bubble divs in JobDetailModal.tsx |
| Contact lookup (GAP-09) | Google Sheet | GAS runtime | Master Directory sheet is the source; GAS reads it at runtime |
| Neon test record cleanup (GAP-04) | Database (Neon) | — | Direct SQL DELETE; no code change |
| Comms reply re-test (GAP-03) | Manual / Ops | — | No code change; re-test after GAS fixes land |

---

## Gap Inventory — File Targets

### GAP-01: serviceCategory inference in detectLaphamForm()

**File:** `Code.js`
**Location:** Line 255 — `serviceCategory: 'Unknown'`
**Context:** `detectLaphamForm()` is defined at line 177. The `serviceCategory` field is set on line 255 unconditionally.

**Fix:**
- Read `description` variable (already extracted at line 213–215) and `subject` (passed as param to `detectLaphamForm(sender, subject, body)`)
- Build a keyword → category map and scan description + subject (lowercased)
- Return the matched category or fall back to 'Unknown'

**Keyword map to implement (from CONTEXT.md decision):**
```
plumbing → Plumbing
leak → Plumbing
drain → Plumbing
electrical → Electrical
outlet → Electrical
breaker → Electrical
hvac → HVAC
ac → HVAC
heat → HVAC
heating → HVAC
cooling → HVAC
carpentry → Carpentry
lock → Carpentry
appliance → Appliance
pest → General Repair
general → General Repair
```

**Valid serviceCategory values** (from GAS Gemini prompt, line 339): `Plumbing | Electrical | Carpentry | Painting | HVAC | Appliance | Junk Removal | Windows | General Repair | Multi-trade | Renovation | Unknown`

**Confidence:** HIGH — verified against live Code.js [VERIFIED: codebase grep]

---

### GAP-01b / GAP-05: WO card tenant contact display

**File:** `tech-pwa/src/components/dashboard/JobDetailModal.tsx`
**Current behavior:** tenantName and tenantPhone are used only in:
- Left panel Comms contact card (lines 702–714) — shows name and email/phone as secondary text
- Template strings for PTE email/SMS (lines 561, 568)
- handleSave() payload (lines 446–448)

**What is MISSING:** There is no dedicated display section in the right panel showing tenantName, tenantPhone, and tenantEmail as readable fields. The left panel contact card (lines 697–739) shows just the name and one contact line (email OR phone, not both). When commStakeholder === "TENANT", the card shows `activeJob.tenantEmail || activeJob.tenantPhone || "No Contact Info"` — only one value.

**Fix — right panel:** Add a "Tenant Contact" section to the right panel (after Job Details section, before or after Job Status), rendering tenantName, tenantPhone, tenantEmail when any is non-null. Follow the existing section pattern (`<section className="space-y-3">`).

**Fix — left panel contact card:** Expand the secondary text on lines 713–716 to show both tenantPhone and tenantEmail when both exist (currently shows one or the other).

**Confidence:** HIGH — verified by reading full JobDetailModal.tsx [VERIFIED: codebase read]

---

### GAP-02: Forwarded email field extraction + mailto: stripping

**File:** `Code.js`
**Function:** `field()` — defined at line 188, inner function of `detectLaphamForm()`
**Current regex patterns:**
```javascript
// Same-line: "Field: Value"
var re = new RegExp('(?:^|\\n)' + names[i] + '\\s*:?\\s*([^\\n]+)', 'i');
// Two-line: label on one line, value on next
var re2 = new RegExp('(?:^|\\n)' + names[i] + '[^\\n]*\\n\\s*([^\\n]+)', 'i');
```

**Problem:** Both patterns match against the raw `body` string. When Lapham emails are forwarded (Apple Mail → Gmail), the actual form content appears inside a quoted block, prefixed with `>` on each line, or appearing after a `---------- Forwarded message ---------` separator. The current regex does not strip those prefixes before matching, so all fields return empty.

**Fix 1 — fieldForwarded() approach:** Add a pre-processing step before field extraction:
1. Detect forwarded block: look for `---------- Forwarded message ---------` in body
2. If found, extract the body content after that separator as a separate string `forwardedBody`
3. Strip `> ` prefixes: replace `/^> ?/gm` to get clean `strippedForwardedBody`
4. Run field() against both original body AND strippedForwardedBody (try forwarded first since it's the authoritative content for Lapham webforms)

**Fix 2 — mailto: stripping:** After field extraction, apply to tenantEmail (and any email field):
```javascript
tenantEmail = tenantEmail.replace(/<mailto:[^>]+>/g, '').trim();
```
Apply to: `tenantEmail`, `rmEmail`, any field that could contain email addresses.

**Fix 3 — description fallback:** If description is empty after both body passes:
1. Find the last field label in the forwarded/stripped body
2. Extract all text after the last matched field as the fallback description
- OR - strip all known field label patterns from the forwarded body and use the remainder

**Confidence:** HIGH — verified regex patterns and body structure from live Code.js [VERIFIED: codebase read]

---

### GAP-03: COORD-03 re-test (no code fix)

**What:** Re-test comms reply path after GAP-01/02 land.
**Blocker:** Requires a real Lapham WO with clean tenant_email (no mailto: suffix) and a safe internal recipient.
**Deliverable:** Dispatcher confirms reply sent from Comms tab — specific WO# + message text observed in Gmail thread.
**Owner:** Brandon (dispatcher action, not a dev task).

---

### GAP-04: Neon test record cleanup

**SQL:** `DELETE FROM jobs WHERE job_id = 'APT-SEED-0001';`
**Verify:** `SELECT COUNT(*) FROM jobs WHERE job_id = 'APT-SEED-0001';` — must return 0.
**Owner:** Brandon (Neon console access required).
**Confirmation:** This is a Neon-only issue — `APT-SEED-0001` was a seeded record inserted directly into Neon; there is no corresponding Google Sheets row to worry about. [ASSUMED — not verified by querying Neon directly, but consistent with Phase 2 evidence which shows bootstrap inserted this record]

---

### GAP-06: Search — ranking + duplicate bar

**File:** `tech-pwa/src/components/dashboard/JobQueueTable.tsx`
**Current search logic (lines 230–238):**
```typescript
const q = searchQuery.toLowerCase();
list = list.filter(j => 
  String(j.address || '').toLowerCase().includes(q) ||
  String(j.description || '').toLowerCase().includes(q) ||
  String(j.rmName || '').toLowerCase().includes(q) ||
  String(j.assignedTech || '').toLowerCase().includes(q)
);
```

**Problems:**
1. `jobId` is NOT in the filter — searching "APT-01397" returns no results from JobQueueTable.
2. No ranking — filter is boolean (include/exclude), not ordered by match quality.
3. The filter returns results in whatever sort order `sortKey` dictates, not by match relevance.

**Fix 1 — WO# search + ranking:**
- Add `j.jobId` to the filter fields
- After filter, apply a secondary sort: exact jobId match → prefix match on jobId → everything else
- Implementation: add a `matchScore()` function, then sort filtered list by score (descending) before the primary sort key

**The two search bars:**

| Bar | Location | Component | Status |
|-----|----------|-----------|--------|
| Bar 1 | `live/page.tsx` lines 113–125 | Inline input, passes `searchQuery` to `JobQueueTable` | FUNCTIONAL — this is the dispatch-page search |
| Bar 2 | `DashboardLayout.tsx` lines 99–118 (header) | Button that fires `CommandPalette` via synthetic Ctrl+K event | GLOBAL overlay — not a duplicate of Bar 1 in function |

**AMBIGUITY FLAG for planner:** The two bars serve different purposes:
- Bar 1 (live/page.tsx) is the dispatch queue filter — functional, works on the current page jobs.
- Bar 2 (DashboardLayout header) is the global CommandPalette (⌘K) — a quick-jump overlay across all pages.

The CONTEXT.md says "remove the redundant (non-functional) search bar." Based on code inspection, neither bar is strictly non-functional — they serve different purposes. The CommandPalette search **does not filter the job queue** on the live page; it's a modal overlay. From the dispatcher's perspective, having two "Search" UI elements on the same page IS confusing. The likely intent is: remove the `DashboardLayout` header Search button from the `/live` page specifically, since `live/page.tsx` already has its own search bar. The CommandPalette (Ctrl+K) can remain as a keyboard shortcut without a visible header button on the live page.

**Recommendation:** Remove the DashboardLayout header Search button only on the `/live` route, or remove it globally and rely on the Ctrl+K keyboard shortcut for CommandPalette. Confirm with user before implementing. [ASSUMED — user should confirm which bar to remove]

**Confidence:** HIGH for code locations; MEDIUM for the correct removal target [VERIFIED: codebase read for file locations]

---

### GAP-07: Sidebar nav labels

**File:** `tech-pwa/src/components/dashboard/AppSidebar.tsx`
**Location:** Lines 31–42, `NAV_ITEMS` array constant

**Current values:**
```typescript
{ id: 'live',     label: 'Operations',    href: '/live',     module: 'dispatch' },
{ id: 'schedule', label: 'Schedule Queue', href: '/schedule', module: 'dispatch' },
```

**Target values per CONTEXT.md:**
```typescript
{ id: 'live',     label: 'Needs Review',       href: '/live',     module: 'dispatch' },
{ id: 'schedule', label: 'Ready to Schedule',  href: '/schedule', module: 'dispatch' },
```

Note: `{ id: 'weekly-schedule', label: 'Work Schedule', ... }` already matches the third stage name — no change needed.

**Confidence:** HIGH [VERIFIED: codebase read]

---

### GAP-08: Comms tab message contrast

**File:** `tech-pwa/src/components/dashboard/JobDetailModal.tsx`
**Location:** Lines 943–979 — the `.map((msg, idx) => ...)` rendering block

**Current contrast implementation (lines 946–947):**
```typescript
className={`p-5 rounded-2xl border ${msg.isOutbound ? "bg-[var(--accent)]/5 border-[var(--accent)]/10 ml-12" : "bg-white/[0.03] border-white/5 mr-12"}`}
```

**Problem:** Both inbound and outbound messages use near-black backgrounds with 5% opacity fills — insufficient contrast on the dark (#0A0A0A) background. The accent fill at 5% opacity is visually indistinguishable from the 3% white fill.

**Fix per CONTEXT.md:**
- Inbound (Requester/tenant): left-aligned, neutral/grey background — increase opacity significantly (e.g., `bg-white/[0.08]` or `bg-zinc-800/60`) and keep `mr-12` (right margin = left-aligned feel)
- Outbound (Dispatch): right-aligned with accent color — increase accent opacity (e.g., `bg-[var(--accent)]/20`) and keep `ml-12` (left margin = right-aligned feel)

**Implementation note:** The alignment is currently done via asymmetric margins (`ml-12` for outbound, `mr-12` for inbound). This creates the SMS-style left/right appearance without flexbox alignment changes. The fix is purely an opacity increase on both backgrounds — no layout changes needed.

**Confidence:** HIGH [VERIFIED: codebase read]

---

### GAP-09: Contact lookup — Sam Cooney

**Finding:** The contact lookup is NOT a Neon table and NOT a hardcoded JS object. It is the **"Master Directory" Google Sheet** tab, loaded at runtime by `loadLaphamDatabase()` (Code.js line 452–489).

**Schema (from Code.js column constants, lines 22–27):**
```
COL_PROP_ID     = 0  // A: Property ID
COL_CLIENT      = 1  // B: Client
COL_RM_NAME     = 2  // C: Manager Name
COL_ADDRESS     = 3  // D: Property Address
COL_RM_EMAIL    = 4  // E: Access Email (used for sender matching)
COL_ACCESS_INFO = 5  // F: Property Notes
```

**How sender matching works:** `loadLaphamDatabase()` loads all rows, matches incoming sender email against `rmEmail` field. `cooneysam@gmail.com` is listed in `KNOWN_SENDERS` constant (line 33) as `cooneysam@gmail.com → inspection` — but this is a comment in the prompt string, not a data entry. The actual lookup for property resolution and contact info uses the Master Directory sheet.

**Fix:** Add a row to the "Master Directory" Google Sheet with:
- RM Email (COL_RM_EMAIL): `cooneysam@gmail.com`
- RM Name (COL_RM_NAME): `Sam Cooney`
- Other fields as known (Property ID, Client, Address, Access Info)

**Owner:** Brandon adds the Sheet row (requires Google account access to the spreadsheet). This is a data patch, not a code change.

**Confidence:** HIGH [VERIFIED: codebase read of loadLaphamDatabase() and KNOWN_SENDERS]

---

## Standard Stack

No new libraries required. All fixes use existing stack:

| Component | Stack | Key APIs |
|-----------|-------|----------|
| GAS fixes | Google Apps Script (ES5 JS) | String.prototype.replace(), RegExp |
| Next.js UX fixes | React 18, Tailwind CSS, TypeScript | useState, useMemo, Tailwind classes |
| Neon cleanup | PostgreSQL | Raw SQL DELETE via Neon console |
| Sheet entry | Google Sheets UI | Manual row add |

**Deployment:**
- GAS: `clasp push --force` then `clasp deploy --deploymentId AKfycbySG8tbAaXyIRFXnq7x-Fp5Gvs7uG8RmAyBB_wSFcGmScbhI3SHSq2HoznowBcsi3mM9Q --description "v##"` (TechPWA deployment ID)
- Code.js deploy is MANUAL ONLY — never automate
- Next.js: Vercel auto-deploys on push to main

---

## Architecture Patterns

### Wave Structure (Claude's Discretion recommendation)

```
Wave 1 — GAS (Code.js)
├── GAP-01: serviceCategory keyword inference in detectLaphamForm()
├── GAP-02: field() forwarded-block parsing + mailto: stripping
└── GAP-09: Sheet row add for Sam Cooney (Brandon action, concurrent)

Wave 2 — Next.js (tech-pwa)
├── GAP-05/01b: JobDetailModal tenant contact section
├── GAP-06: JobQueueTable WO# search + ranking; search bar cleanup
├── GAP-07: AppSidebar NAV_ITEMS label update
└── GAP-08: JobDetailModal message bubble contrast

Wave 3 — Verification
├── GAP-04: Neon DELETE (Brandon)
└── GAP-03: Comms reply re-test (Brandon)
```

### Pattern: GAS keyword inference

Consistent with existing emailType keyword scanning pattern (lines 237–241 in Code.js):
```javascript
// Existing pattern — reuse for serviceCategory
var scanText = ((description || '') + ' ' + (subject || '')).toLowerCase();
if (scanText.indexOf('turnover') !== -1 ...) emailType = 'turnover';
```

Apply same pattern for serviceCategory — scan description + subject, first keyword match wins.

### Pattern: GAS forwarded block extraction

```javascript
// Detect and extract forwarded content
var forwardedBody = '';
var fwdIdx = body.indexOf('---------- Forwarded message ---------');
if (fwdIdx !== -1) {
  forwardedBody = body.substring(fwdIdx);
  // Strip > quote prefixes
  forwardedBody = forwardedBody.replace(/^> ?/gm, '');
}
// Run field() with forwardedBody as fallback body
```

### Pattern: JobDetailModal section structure

Existing pattern for right panel sections (replicate for tenant contact section):
```tsx
<section className="space-y-3">
  <h4 className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">
    Tenant Contact
  </h4>
  <div className="bg-[var(--bg-surface)] rounded-2xl border border-white/10 backdrop-blur-sm p-5 space-y-3">
    {/* render tenantName, tenantPhone, tenantEmail */}
  </div>
</section>
```

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead |
|---------|-------------|-------------|
| Email parsing | Custom MIME parser | Existing field() helper + forwarded block preprocessing |
| Search fuzzy matching | Levenshtein/fuzzy | Tiered exact/prefix/substring scoring with standard JS sort |
| Contact DB | New Neon table for contacts | Existing Master Directory sheet (already the authority) |
| Message styling | New CSS animation | Tailwind opacity + margin classes on existing bubble divs |

---

## Common Pitfalls

### Pitfall 1: GAS regex and the `>` quote prefix

**What goes wrong:** field() regex patterns use `(?:^|\\n)` to anchor field names. In a forwarded block, each line starts with `> ` — so `> Description:` does not match `(?:^|\\n)Description`. Even after splitting on forwarded separator, if `> ` prefixes are not stripped, field() returns empty.
**Prevention:** Strip `> ` prefixes before passing body to field() for forwarded-block content. Use `/^> ?/gm` (global + multiline).

### Pitfall 2: GAS ES5 — no arrow functions, no template literals, no `const`/`let`

**What goes wrong:** Apps Script runs in a Rhino JS engine (ES5 subset). Arrow functions, template literals, const/let, spread operator, Array.from() all fail silently or throw.
**Prevention:** Use `var`, `function(){}`, string concatenation. Check all new Code.js code for ES6+ syntax before pushing. [VERIFIED: live Code.js uses var throughout]

### Pitfall 3: detectLaphamForm() — body may contain BOTH the form content AND a quoted forwarded block

**What goes wrong:** Some Lapham emails are sent directly (form fields in body, no forward), others are forwarded by the PM (form fields inside a quoted/forwarded block). Code must handle both layouts — direct body first, forwarded block as fallback, not a hard switch.
**Prevention:** field() against original body first; if description is still empty, retry against stripped forwarded body.

### Pitfall 4: keyword inference — 'ac' substring matches in non-HVAC words

**What goes wrong:** The keyword 'ac' (for AC unit) will match words like 'access', 'place', 'contact', 'plaque'.
**Prevention:** Match 'ac' as a whole word only — use word boundary check: `\bac\b` pattern, or check for `' ac '` with surrounding spaces, or skip 'ac' and rely on 'hvac', 'cooling', 'heat' which are safer.

### Pitfall 5: JobDetailModal — tenant section renders when all three fields are null

**What goes wrong:** Rendering a "Tenant Contact" section with all empty fields adds visual noise.
**Prevention:** Wrap the entire tenant contact section in a conditional: only render if `activeJob.tenantName || activeJob.tenantPhone || activeJob.tenantEmail`.

### Pitfall 6: Search bar — CommandPalette fires a synthetic keyboard event

**What goes wrong:** The DashboardLayout header Search button dispatches a synthetic `KeyboardEvent` to open CommandPalette. Removing the button visually does not disable the Ctrl+K shortcut (the effect listener is in CommandPalette.tsx itself). The Ctrl+K listener will still work after removing the button.
**Prevention:** If removing the header button, note that Ctrl+K global search still works — this is a feature, not a regression. Do not remove the CommandPalette keyboard listener.

### Pitfall 7: Sidebar label change affects URL routing

**What goes wrong:** The sidebar labels and hrefs are independent. Changing labels does NOT change routes. Verify `href` values remain unchanged after label updates.
**Prevention:** Only change the `label` string in NAV_ITEMS, never the `href` or `id`.

---

## Runtime State Inventory

> Relevant because GAP-09 involves adding runtime-read data (Sheet row), and GAP-04 is a production DB record.

| Category | Items Found | Action Required |
|----------|-------------|-----------------|
| Stored data (Neon) | `APT-SEED-0001` test record in `jobs` table | DELETE via Neon console (Brandon) |
| Stored data (Neon) | APT-01331 tenant_email has `<mailto:...>` suffix stored | After GAP-02 fix deployed, new WOs will be clean; existing malformed record may need a one-off SQL UPDATE if re-testing requires clean data |
| Live service config (Google Sheet) | Master Directory sheet — Sam Cooney not present | Add row to sheet (Brandon) |
| OS-registered state | None — verified: no OS-level registrations involved | None |
| Secrets/env vars | None — no env var changes required | None |
| Build artifacts | None — no installed package renames | None |

**Existing malformed Neon record:** APT-01331 has `mwangcp@gmail.com<mailto:mwangcp@gmail.com>` stored in `tenant_email`. The GAP-02 fix prevents future occurrences. For the re-test (GAP-03), if the dispatcher needs a clean tenant_email on an existing WO, a direct Neon SQL UPDATE can be run: `UPDATE jobs SET tenant_email = 'mwangcp@gmail.com' WHERE job_id = 'APT-01331';` — Brandon runs this if needed for re-test setup.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| clasp CLI | GAS deployment | Not probed (Windows env) | — | Brandon runs clasp push manually |
| Node.js / npm | Next.js build + tsc | Assumed available | — | — |
| Neon console access | GAP-04 DELETE | Brandon only | — | No fallback — requires his login |
| Google Sheets (Master Directory) | GAP-09 contact entry | Brandon only | — | No fallback — requires his Google account |

**Step 2.6: Environment notes:**
- All GAS deployment steps are manual (per CLAUDE.md) — no automation needed
- All Brandon-owned steps (Neon, Sheet) require his logins and cannot be delegated to AG

---

## Validation Architecture

> `workflow.nyquist_validation` is not set in config.json — treated as enabled.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Playwright (e2e.yml) + TypeScript `npx tsc --noEmit` |
| Config file | `tech-pwa/playwright.config.ts` (assumed; verify before speccing) |
| Quick run command | `npx tsc --noEmit` (zero-error gate per CLAUDE.md) |
| Full suite command | `npx playwright test` (triggers e2e.yml) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | Notes |
|--------|----------|-----------|-------------------|-------|
| GAP-01 | detectLaphamForm() infers serviceCategory from keywords | Manual | Send test Lapham email; verify WO serviceCategory | No unit test harness for GAS; manual verification |
| GAP-01 | WO card renders tenantName + tenantPhone | Manual / e2e | Playwright: open WO with tenant data, assert fields visible | Wave 2 |
| GAP-02 | Forwarded Lapham email: description non-empty | Manual | Send forwarded test email; verify WO description | GAS only |
| GAP-02 | mailto: suffix stripped from tenantEmail | Manual | Verify Neon `tenant_email` column value after processing | GAS only |
| GAP-04 | APT-SEED-0001 absent from Neon | SQL | `SELECT COUNT(*) FROM jobs WHERE job_id = 'APT-SEED-0001'` = 0 | Brandon |
| GAP-05 | Tenant contact section renders in WO modal | Manual / e2e | Open WO with tenantName set; assert section visible | |
| GAP-06 | WO# search returns exact match first | Manual | Type 'APT-01397' in search bar; confirm that WO appears first | |
| GAP-07 | Sidebar shows 'Needs Review', 'Ready to Schedule' | Visual | Screenshot comparison or DOM text assertion | |
| GAP-08 | Message bubbles visually distinct | Visual | Open Comms tab; confirm contrast difference is obvious | |
| GAP-09 | cooneysam@gmail.com resolves to Sam Cooney | Manual | New email from cooneysam@gmail.com → WO name = Sam Cooney | After Sheet row added |

### Wave 0 Gaps

- GAS has no automated test framework — all Code.js verification is manual (send test emails, observe Neon output)
- Next.js fixes: existing Playwright e2e suite covers routing; GAP-05/06/08 UX fixes may need new test cases if the suite does not already assert these fields

---

## Security Domain

> `security_enforcement` not set in config.json — treated as enabled.

| ASVS Category | Applies | Control |
|---------------|---------|---------|
| V5 Input Validation | Yes — GAP-02 processes raw email body | The mailto: stripping regex is safe; no eval or innerHTML involved |
| V2 Authentication | No change | No auth changes in this phase |
| V4 Access Control | No change | No route or permission changes |

**Threat note:** GAP-02 adds regex processing of forwarded email content. The regex `/<mailto:[^>]+>/g` is anchored and non-backtracking — no ReDoS risk. The forwarded block extraction uses `indexOf` and `substring` — safe string operations. No new user input surfaces are added.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | APT-SEED-0001 is Neon-only (no Google Sheets row) | GAP-04 | Low — if a Sheets row exists, planner also needs a Sheets delete step; verify by searching Leads/Dispatch Queue tabs |
| A2 | The "redundant search bar" the user wants to remove is the DashboardLayout header Search button, not the CommandPalette Ctrl+K shortcut | GAP-06 | Medium — if user actually wants to remove CommandPalette entirely, the fix is larger (remove CommandPalette.tsx from DashboardLayout) |
| A3 | Existing malformed APT-01331 tenant_email record does not need a corrective UPDATE for the GAP-03 re-test | Runtime State | Low — if Brandon wants to re-test GAP-03 on APT-01331, a one-off SQL UPDATE is needed; not a blocker if re-test uses a fresh WO |

---

## Open Questions (RESOLVED 2026-05-30)

1. **Which search bar to remove (GAP-06)?** — **(RESOLVED)**
   - What we know: live/page.tsx has a functional inline search input; DashboardLayout has a header Search button that fires CommandPalette
   - What's unclear: CONTEXT.md says "remove non-functional search bar" — from user's POV, the CommandPalette may be the one they consider "not working" since it doesn't filter the current-page queue
   - **Resolution (Brandon confirmed 2026-05-30):** Remove the DashboardLayout header Search button (lines 99–118, the div that dispatches a synthetic Ctrl+K event). Keep CommandPalette itself — the global Ctrl+K keyboard shortcut still works. The inline search input on live/page.tsx is the functional queue filter and is NOT touched.

2. **Does APT-01331's existing malformed tenant_email need a corrective SQL UPDATE?** — **(RESOLVED)**
   - What we know: tenant_email stored as `mwangcp@gmail.com<mailto:mwangcp@gmail.com>` in Neon
   - What's unclear: GAP-03 re-test may use this specific WO, which would fail with the malformed address
   - **Resolution (Brandon confirmed 2026-05-30):** Yes — include the UPDATE as a required step in Plan 03-03 Task 1. `UPDATE jobs SET tenant_email = 'mwangcp@gmail.com' WHERE job_id = 'APT-01331'` — Brandon runs in Neon console along with the APT-SEED-0001 DELETE.

---

## Sources

### Primary (HIGH confidence)
- `Code.js` — detectLaphamForm() line 177–280, field() line 188–201, loadLaphamDatabase() line 452–489, serviceCategory Gemini prompt line 339, KNOWN_SENDERS constant line 29–35 [VERIFIED: codebase read]
- `tech-pwa/src/components/dashboard/JobDetailModal.tsx` — full file read; tenant display lines 697–739, message bubble lines 943–979, editingSection structure lines 179–186 [VERIFIED: codebase read]
- `tech-pwa/src/components/dashboard/AppSidebar.tsx` — NAV_ITEMS lines 31–42 [VERIFIED: codebase read]
- `tech-pwa/src/components/dashboard/JobQueueTable.tsx` — search filter lines 230–238, filteredAndSortedJobs lines 157–259 [VERIFIED: codebase read]
- `tech-pwa/src/app/live/page.tsx` — search input lines 113–125, CommandPalette trigger in DashboardLayout.tsx lines 99–118 [VERIFIED: codebase read]
- `artifacts/phase2-verification-results.md` — 9-gap inventory with WO evidence [VERIFIED: codebase read]
- `.planning/phases/03-gap-remediation/03-CONTEXT.md` — locked decisions [VERIFIED: codebase read]

### Secondary (MEDIUM confidence)
- Training knowledge on GAS ES5 constraints — consistent with live code patterns observed

---

## Metadata

**Confidence breakdown:**
- Code targets (file/line locations): HIGH — all verified by direct file read
- GAS fix design: HIGH — regex patterns and field() structure fully understood
- Next.js fix design: HIGH — component structure fully understood
- GAP-09 contact lookup location: HIGH — loadLaphamDatabase() definitively shows Sheet as source
- "Which search bar to remove": MEDIUM — two bars confirmed, correct removal target needs user confirmation

**Research date:** 2026-05-30
**Valid until:** 2026-06-20 (stable codebase, changes only via sprint PRs)
