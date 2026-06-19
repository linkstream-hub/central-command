/**
 * Pure helpers for access-info code extraction and merge logic.
 * No framework imports — these are DB-free, testable utilities.
 *
 * Semantics (ported from GAS enrichFromLaphamDb):
 *   - The DB record is authoritative for existing codes
 *   - Inbound WO may ADD new codes but never removes or replaces stored ones
 *   - Only codes not already in the DB trigger an UPDATE
 */

/** Extracts unique 3–6 digit numeric codes from a free-text access-info string. */
export function extractCodes(text: string): string[] {
  if (!text) return [];
  const matches = text.match(/\b\d{3,6}\b/g);
  if (!matches) return [];
  return [...new Set(matches)];
}

export interface AccessMergeResult {
  updated: boolean;
  merged: string | null;
  newCodes: string[];
  reason?: string;
}

/**
 * Computes a merge between existing stored access info and inbound WO access info.
 *
 * @param existing - Current value in properties.accessInfo (may be null)
 * @param inbound  - Access info string extracted from the inbound WO
 * @returns { updated, merged, newCodes, reason? }
 *
 * Rules:
 *   - If inbound has no codes → no update (reason: 'no_new_codes')
 *   - If all inbound codes are already in existing → no update (reason: 'no_new_codes')
 *   - If existing is null → merged = inbound
 *   - Otherwise → merged = existing + ' | ' + inbound (append, never replace)
 */
export function computeAccessMerge(
  existing: string | null,
  inbound: string
): AccessMergeResult {
  const inboundCodes = extractCodes(inbound);

  if (inboundCodes.length === 0) {
    return { updated: false, merged: existing, newCodes: [], reason: 'no_new_codes' };
  }

  const existingCodes = new Set(extractCodes(existing ?? ''));
  const newCodes = inboundCodes.filter((code) => !existingCodes.has(code));

  if (newCodes.length === 0) {
    return { updated: false, merged: existing, newCodes: [], reason: 'no_new_codes' };
  }

  const merged = existing ? `${existing} | ${inbound}` : inbound;
  return { updated: true, merged, newCodes };
}
