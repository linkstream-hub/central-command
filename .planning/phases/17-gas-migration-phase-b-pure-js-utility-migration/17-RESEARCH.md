# Phase 17: TechPWA Cutover (validateToken & Clock Events) - Research

## Context and Findings

The goal of this sprint is to cut over the remaining read and write paths currently performed by Google Apps Script (`TechPWA.gs`) against Google Sheets, moving them natively to the Neon database via the Next.js API.

### 1. Change PIN Route & Stub
- **Current state**: `TechPWA.gs` has `handleChangePin` which writes a hashed PIN to the Tech Roster sheet.
- **Neon target**: The Next.js API needs a POST route at `/api/field/auth/change-pin`. It will update the `pinHash` on the `employees` table.
- **GAS action**: `handleChangePin` in `TechPWA.gs` will be stubbed to return a `DEPRECATED` message.

### 2. validateToken to Neon
- **Current state**: `validateToken` in `TechPWA.gs` reads the entire `Tech Roster` sheet on every authenticated request, which is a major performance bottleneck.
- **Neon target**: Next.js needs an internal endpoint, e.g., `/api/gas/validate-token`, that accepts a token, validates it against Neon (using `verifyFieldSession`), and returns the tech object.
- **GAS action**: `TechPWA.gs` will use `UrlFetchApp` to query this Next.js endpoint and return the parsed JSON result, removing the Sheets read.

### 3. Clock Events Cutover
- **Current state**: `TechPWA.gs` receives clock events, appends a row to `Time Records` sheet, and then calls `syncTimeRecordToNeon` (shadow-sync).
- **Cutover**: The Sheets write (`tmSheet.appendRow()` and `setValue()`) will be removed entirely, making Neon the primary and only write path. 
- **Blocker / Edge Case**: `handleClockOut`, `handleStartBreak`, etc., rely on `findAndLockRecord()` to find the active time record from the `Time Records` sheet. If we stop writing to Sheets, this function will fail. 
- **Resolution**: Since the Next.js frontend is already using native `/api/field/` routes for clock events (which natively write to Neon), the `handleClock*` methods in GAS should likely be completely deprecated (like `handleLogin` and `handleChangePin`), avoiding the need to rewrite `findAndLockRecord()` to query Neon.

### 4. Job Status
- **Current state**: `updateJobStatus` in GAS updates the `Dispatch Queue` sheet and then calls `patchJobStatusNeon`.
- **Cutover**: Remove the Sheets write and rely exclusively on the Next.js API.

## Canonical References
- `SESSION_STATE.md` (Scope definition)
- `tech-pwa/src/lib/syncQueue.ts` (Next.js frontend clock event routing)
- `TechPWA.gs` (Current implementation)
- `tech-pwa/src/lib/fieldAuth.ts` (Neon auth logic)
