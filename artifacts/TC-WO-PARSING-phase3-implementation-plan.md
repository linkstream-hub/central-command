# TC-WO-PARSING — Phase 3 Implementation Plan
# Source: Antigravity brain (132d40c8-908c-4709-9b9d-6822e9162e7e/implementation_plan.md)
# Locked: 2026-06-29 — CC (Claude Code)
# Status: FROZEN — Do not execute until Phase 3 gates open
# Phase: 3 — Core Dispatch Loop Proof
# Doc-rot: This file is the canonical Phase 3 WO parsing Task Card source.
#           IMPLEMENTATION_PLAN.md Phase 3 references this file.
#           Do not delete or archive without updating IMPLEMENTATION_PLAN.md.

---

## Scope

Fixes three real bugs in the intake pipeline and one display bug in JobDetailModal.
These are bug fixes, NOT new features. Frozen during Phase 0–2.

- commsMessages not written on intake → Comms tab blank (P1 pipeline bug)
- Sender regex fails on bare email addresses → wrong requester name/email displayed
- jobId (EMAIL-<GUID>) rendered in JobDetailModal instead of human-readable ID (display bug)
- Schema addition: workOrderNumber column (schema change → frozen until Phase 3)

**Migration number**: Plan originally specified 0010 — CONFLICT. Migration 0010 is taken
(UploadThing — live in prod). Use 0011 or next available slot. Verify before writing.

---

# Frontend Diagnostics & Repair Plan: JobDetailModal

## Diagnostic Analysis (Root Causes)

Based on a thorough review of the Phase 0 ingestion pipeline and the frontend UI, here is the exact breakdown of why the Work Order cards are rendering incorrectly:

### 1. The Ugly Yellow ID (`EMAIL-<DM6PR14...>`)
*   **Root Cause:** `parseEmailToWO.ts` generates the primary database `jobId` by concatenating `'EMAIL-'` with the raw email headers' `messageId`.
*   **UI Impact:** `JobDetailModal.tsx` blindly renders `{activeJob.jobId}`.
*   **Diagnosis:** Database primary keys should not be bound to external system IDs for display purposes. The industry standard is a human-readable, sequential Work Order Number.

### 2. Missing Email Thread & Messy Metadata in "Comms"
*   **Root Cause:** The Cloudflare webhook payload is processed into the `jobs` table, but **never inserted into the `commsMessages` table.** Furthermore, webhooks often include massive blocks of MIME headers and routing metadata. If we blindly insert the entire payload, the UI will be flooded with unreadable technical garbage.

### 3. "MAINTENANCE / No email" under Requester
*   **Root Cause:** In `parseEmailToWO.ts`, if the address lookup fails, it falls back to a brittle regex (`/^"?(.+?)"?\s*<.+>$/`) on the `sender` string. This fails on bare email addresses (e.g. `maintenance@laphamcompany.com`), resulting in truncated extraction and missing email values.

### 4. Narrative/Wasteful LLM Parsing Prompt
*   **Root Cause:** The current Gemini extraction prompt in `parseEmailToWO.ts` uses conversational, narrative instructions ("You are an expert maintenance dispatcher..."). This wastes tokens, increases latency, and introduces non-deterministic extraction behavior.

---

## Technical Spec & Execution Plan

Following Karpathy/Pocock principles: strict minimal code, root cause elimination, atomic execution.

### 1. Database Schema & Migration (Safe Rollout)

#### [NEW] `db/migrations/0011_add_work_order_number.ts`  ← RENUMBERED from 0010 (conflict)
*   **Up Migration:**
    *   `ALTER TABLE jobs ADD COLUMN workOrderNumber INT GENERATED ALWAYS AS IDENTITY (START WITH 1000);`
    *   Create a `UNIQUE` constraint and B-tree index.
    *   **Backfill & Sequence Integrity:** Explicitly query and advance the underlying Postgres sequence using `setval(pg_get_serial_sequence('jobs', 'workOrderNumber'), max(workOrderNumber) + 1)` after backfilling.
*   **Down Migration (Rollback Procedure):** Must include `ALTER TABLE jobs DROP COLUMN workOrderNumber;`.

#### [MODIFY] `lib/schema.ts`
*   Add `workOrderNumber: integer('workOrderNumber').generatedAlwaysAsIdentity().unique()` to `jobs`.
*   Run `npx drizzle-kit generate` to commit the Drizzle metadata state.

### 2. Intake Layer (Idempotency, Transactions & Metadata Stripping)

#### [NEW] `lib/types/cloudflare.ts`
*   **API Contract:** Define the exact `CloudflareEmailPayload` type so the entry point is strictly typed.

#### [MODIFY] `lib/intake/parseEmailToWO.ts`
*   **Transaction Isolation & Partial Recovery:** Wrap database operations in a strict `db.transaction()`.
    *   Insert into `jobs` `ON CONFLICT (jobId) DO NOTHING`.
    *   Unconditionally attempt to insert the initial email into `commsMessages` using `ON CONFLICT (messageId) DO NOTHING`.
*   **Metadata Stripping:** Before inserting into `commsMessages.fullBody`, explicitly strip all MIME headers, signatures, and routing paths. The database must only store the clean, human-readable body text so the Comms tab remains pristine.
*   **Sender Parsing:** Replace ad-hoc regex with `email-addresses` (or equivalent standards-compliant parser).

### 3. API Contract & Frontend Layer (XSS & Propagation)

#### [MODIFY] API Queries & Serializers
*   Update all Drizzle `select()` statements fetching jobs to ensure `workOrderNumber` is explicitly retrieved.

#### [MODIFY] `components/dashboard/JobDetailModal.tsx`
*   **Defensive ID Rendering:** Use fallback chain: `` `WO-${activeJob.workOrderNumber ?? activeJob.jobId.substring(0, 8).toUpperCase()}` ``
*   **Comms UI Fallback:** Implement an empty-state message explicitly acknowledging processing ("Email content is being processed...").
*   **XSS Mitigation:** Treat `bodyText` from `commsMessages` as untrusted. Render strictly as escaped plain text.

---

## Verification Plan

### Automated Tests (RED/GREEN)
1. **Metadata Stripping Test:** Verify that `parseEmailToWO` correctly isolates plain text from a raw webhook fixture containing MIME headers.
2. **Partial Recovery Test:** Inject a mock Cloudflare webhook for a job that *already exists*. Assert that the `jobs` row is not duplicated, but the `commsMessages` row *is* created successfully.

### Manual Verification
1. Review the `0011` migration and execute the Down rollback locally to ensure safety.
2. Verify the frontend safely escapes `<script>alert(1)</script>` if passed into the email body.

---

## Multi-AI Audit Notes

- Source: Antigravity brain (ChatGPT 5.5, Claude latest, DeepSeek V4 Pro, Grok 4.2 review rounds)
- Review docs: `C:\PTOW\1.1_APT_Central_Command_Review\WO_parsing_card_audit_implementation_plan\`
- Antigravity plan selected as reference over WO parsing card (more complete: TDD-ready, migration rollback, XSS mitigation)
- WO parsing card (simpler `shortId` approach) is the alternative if workOrderNumber schema change is deferred further

## CC Notes (2026-06-29)
- commsMessages insertion bug = P1 pipeline bug (not a feature) — can be Phase 3 early Task Card
- Sender regex fix = P1 pipeline bug — same
- workOrderNumber schema + JobDetailModal display = schema change, FROZEN until Phase 3 schema gate opens
- Migration 0010 conflict resolved: use 0011 (verify next available at Phase 3 task card creation time)
- XSS note (bodyText untrusted) must be in Task Card — not optional
