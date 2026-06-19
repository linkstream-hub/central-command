# SPEC: P1-3 — Session Token Hash Verification & Close
# One-sprint audit. No code changes expected. Close the PROFESSIONAL_BASELINE gap.
# Owner: AG | Reviewer: Claude Code | Branch: feat/p1-3-token-hash-verify

---

## CONTEXT

PROFESSIONAL_BASELINE.md flagged "Tech session tokens stored plain in Tech Roster col M — should store SHA-256 hash." The flag was marked OPEN/UNVERIFIED.

Code review in session 84 confirmed the code IS correct:
- `handleLogin` (TechPWA.gs:256) generates a plain UUID, immediately hashes it with `hashToken()`, and stores only the hash in col M.
- `validateToken` (TechPWA.gs:311) hashes the incoming token before comparing to stored hash.
- `hashToken` (TechPWA.gs:972) uses SHA-256 via `Utilities.computeDigest`.

This sprint verifies the SHEET STATE matches the code logic (no legacy plain tokens remain), updates the docs, and closes the P1 item.

---

## TASKS

### Task 1 — Verify sheet state: no plain UUIDs in col M

Open Google Sheets → APT Lead Intake Master → **Tech Roster** tab → Column M (SESSION_TOKEN, 0-based index 12, which is the 13th column).

Inspect every non-empty cell in col M. A SHA-256 hex string is exactly 64 lowercase hex characters (e.g., `a3f1...`). A plain UUID is 36 characters with dashes (e.g., `550e8400-e29b-41d4-a716-446655440000`).

Expected: all non-empty cells are 64-character hex strings (hashes). If any cell is 36-char UUID format: clear that cell (forces re-login for that tech — acceptable, not a security regression since the plain token would fail validation anyway).

Document in `ag_test_results.txt`:
```
Task 1: Col M token hash audit
Rows inspected: ______
Plain UUID tokens found (36-char, dashes): ______  (expected: 0)
SHA-256 hashes found (64-char hex): ______
Action taken: ______
```

### Task 2 — Verify hashToken algorithm matches SHA-256

In GAS console → Lead Parsing project → Run this test function once (do not deploy it):

```javascript
function verifyHashToken() {
  var testInput = 'test-input-string';
  var result = hashToken(testInput);
  Logger.log('Length: ' + result.length);           // must be 64
  Logger.log('Hex only: ' + /^[0-9a-f]+$/.test(result)); // must be true
  Logger.log('Hash: ' + result);
}
```

Document in `ag_test_results.txt`:
```
Task 2: hashToken verification
Output length: ______  (expected: 64)
Is hex: ______  (expected: true)
```

### Task 3 — Update PROFESSIONAL_BASELINE.md

In `docs/PROFESSIONAL_BASELINE.md`, find the P1-3 row in the Dimension 5 table and the consolidated P1 roadmap table. Update both to:

```
| ~~P1-3~~ | ~~Tech session tokens stored plain — schedule hash migration~~ | ~~Claude Code~~ | ✅ DONE — code correct since v83, sheet verified session 84 |
```

Also update the Dimension 5 gap row:
```
| Tech session tokens stored plain in Sheets | ~~**P1**~~ ✅ DONE | SHA-256 hashing confirmed in TechPWA.gs:972. Sheet audited session 84. |
```

### Task 4 — Update ARCHITECTURE.md open security gaps

In `docs/ARCHITECTURE.md` under `OPEN SECURITY GAPS`, remove or strike through:
```
2. Session token hashing — tokens stored plain in Tech Roster col M (OPEN / UNVERIFIED)
```
Replace with:
```
2. Session token hashing — ✅ RESOLVED. hashToken() SHA-256 in TechPWA.gs:972. Verified session 84.
```

### Task 5 — tsc + diff

```
cd tech-pwa && npx tsc --noEmit
```

Zero errors expected (no code changed). Then:

```
git diff main...HEAD > artifacts/ag_diff.txt
```

Post to Claude Code. Wait for PASS.

Expected output: `______` (0 errors)

### Task 6 (separate session) — Test sprint

This sprint has no browser-testable changes. Post `ag_test_results.txt` with Tasks 1–2 filled in. Wait for clear-to-merge.

### Task 7 — Merge after Claude Code issues "Clear to merge"

Not before.

---

## MERGE GATE

Claude Code checks:
- [ ] Col M audit result shows 0 plain UUID tokens
- [ ] hashToken output is 64-char hex
- [ ] PROFESSIONAL_BASELINE.md and ARCHITECTURE.md updated
- [ ] No code changes in diff (docs only)
