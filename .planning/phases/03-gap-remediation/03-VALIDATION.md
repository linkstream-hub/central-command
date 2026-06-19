---
phase: "03"
phase-slug: gap-remediation
date: 2026-05-30
---

# Phase 3: Gap Remediation — Validation Strategy

## Automation Constraints

**GAS (Code.js) — manual verification only.** GAS has no automated test framework. All Code.js changes must be verified by manual end-to-end test: send a real Lapham email → check the resulting WO fields in Neon via SQL. `clasp push` linting catches syntax errors; there is no unit test harness for GAS business logic in this project.

**Next.js (tech-pwa) — automated gate:** `npx tsc --noEmit` is the automated verification gate for all Next.js changes. Zero TypeScript errors required before commit. Browser verification performed by AG in dev server before merge.

**Data patches (Neon + Google Sheet) — SQL verification.** Brandon verifies each SQL change with an explicit SELECT after running it.

---

## Verification Architecture by Gap

| Gap | Verification Method | Tool | Gate |
|-----|--------------------|----|------|
| GAP-01 (serviceCategory) | Manual: send test Lapham email, check WO serviceCategory field in Neon | Neon SQL + dispatch UI | Post-deploy |
| GAP-02 (forwarded parsing) | Manual: send forwarded Apple Mail email, check description + tenantEmail in Neon | Neon SQL | Post-deploy |
| GAP-03 (comms re-test) | Manual: dispatcher sends reply from Comms tab, confirms in Gmail | Dispatch UI + Gmail | Post Wave 1 deploy |
| GAP-04 (data delete) | SQL: `SELECT COUNT(*) FROM jobs WHERE job_id = 'APT-SEED-0001'` → must return 0 | Neon console | Immediate |
| GAP-05 (tenant contact display) | Browser: open WO with tenantName set, verify right panel shows fields | Dev server | Pre-merge |
| GAP-06 (search WO#) | Browser: type WO# in search, verify exact match appears first | Dev server | Pre-merge |
| GAP-07 (sidebar labels) | Browser: confirm "Needs Review" and "Ready to Schedule" in sidebar | Dev server | Pre-merge |
| GAP-08 (comms contrast) | Browser: open Comms tab, confirm visual distinction of bubble styles | Dev server | Pre-merge |
| GAP-09 (Sam Cooney) | Sheet: confirm row with cooneysam@gmail.com present in Master Directory | Google Sheets | Immediate |

---

## Automated Gates Summary

| Check | Command | When |
|-------|---------|------|
| TypeScript compilation | `npx tsc --noEmit` (from tech-pwa/) | After each Next.js change, before commit |
| GAS ES5 syntax | `grep -n "const \|let \|=>" Code.js` → must return zero matches in new blocks | After Code.js changes, before clasp push |
| Plan-level artifact verify | `grep -n "fieldFromBody\|forwardedBody\|serviceCategory: serviceCategory" Code.js` | After Code.js changes |
| Neon data cleanup | `SELECT COUNT(*) FROM jobs WHERE job_id = 'APT-SEED-0001'` → 0 | After GAP-04 |
| APT-01331 fix | `SELECT tenant_email FROM jobs WHERE job_id = 'APT-01331'` → no mailto: suffix | After data cleanup |

---

## Nyquist Sampling Note

GAS business logic verification is intentionally manual-only. The project has no GAS unit test framework, and sending real emails to verify parsing behavior is the only reliable test method. The Next.js tsc gate covers the frontend changes. This is the verification ceiling for this project given the current tooling.

*Validation strategy defined: 2026-05-30 — Phase 3 Gap Remediation*
