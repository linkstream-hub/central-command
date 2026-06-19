# Phase 15: Tenant Contact — pteGranted=No Coordination - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-07
**Phase:** 15-Tenant Contact — pteGranted=No Coordination
**Areas discussed:** Email body content, Internal notification, Enable guard

---

## Email Body Content

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal — access needed | Hi [tenant name], APT received a service request for [address]. We need to schedule access. Reply to coordinate. ReplyTo: workorder@. No job description. | ✓ |
| With job description | Include parsed job description in body. Tenant knows what's coming, but exposes internal notes. | |
| APT decides | User crafts exact template verbatim. | |

**User's choice:** Minimal — access needed (Recommended)
**Notes:** Keep job description out of tenant-facing email. Clean, professional, no internal notes leaked.

---

## Internal Notification

| Option | Description | Selected |
|--------|-------------|----------|
| Log only | Logger.log records it. Job already queued as 3-PTE-PENDING on dispatch board. No email noise. | ✓ |
| CC keith@ on tenant email | Keith gets a copy of every tenant contact. | |
| Separate ops alert to keith@ | Second email to keith@ with lead ID + tenant name. | |

**User's choice:** Log only — with important scope expansion noted.
**Notes:** User confirmed Logger.log for now. Stated the professional standard is a visual queue/notification in the dispatch UI showing the email was sent. This feature will NOT be live until explicitly directed. Complete GAS migration must finish first. Neon DB stability must be confirmed. This UI indicator is captured as a deferred idea in CONTEXT.md.

---

## Enable Guard

| Option | Description | Selected |
|--------|-------------|----------|
| Script Property toggle | TENANT_CONTACT_ENABLED=true in GAS Script Properties. Default false. Zero code change to enable. | ✓ |
| Always-on when tenantEmail set | Fires on every pteGranted=No + tenantEmail pair. No toggle. | |
| Reuse AUTO_REPLY_ENABLED | Couples tenant contact to auto-reply. Not a clean separation. | |

**User's choice:** Script Property toggle (Recommended)
**Notes:** Aligns with stated go-live gate — flip the property when migration is complete.

---

## Claude's Discretion

- Function placement: near `sendInspectionSummary()` / `sendAutoReply()` — email-send section of Code.js
- Call site: inside `addToDispatchQueue()` after shadow-sync block, not in LOOKUP_BY_SENDER path
- Tombstone comment removal: replace `// function draftTenantContact(parsed, leadId) { ... }` with real implementation
- Try/catch pattern: wrap GmailApp.sendEmail, log error, never abort main flow
- Logger.log format: consistent with existing `"[TenantContact] action | leadId"` style

## Deferred Ideas

- **Dispatch UI tenant contact indicator** — visual indicator on PTE-PENDING job card that tenant was emailed. Gate: GAS migration complete + Neon stable. Requires `tenant_contacts` table or `comms_messages` entry in Neon. Own phase.
- **OpenPhone SMS path** — for tenants with phone but no email. Gate: OpenPhone integration (currently stubbed).
- **Automated follow-up** — resend if no reply within N days. Gate: scheduler/cron component needed.
