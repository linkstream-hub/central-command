/**
 * Sheets API Client — TOMBSTONED
 *
 * [NEON-CUTOVER] Phase 12: All data access routes through Neon Postgres.
 * This function is preserved to fail loudly if any code path still references it.
 * Remove callers, do not restore functionality.
 */

export async function sheetsRequest(action: string, _payload: Record<string, unknown> = {}): Promise<never> {
  throw new Error(
    `[NEON-CUTOVER] sheetsRequest('${action}') called after cutover. ` +
    `All reads and writes must go through Neon Postgres. ` +
    `Remove the sheetsRequest call from the caller.`
  );
}
