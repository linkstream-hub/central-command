/**
 * Produces a deterministic dedup key from a property address + optional unit.
 * Verbatim TypeScript port of `normalizeAddressKey()` from Code.js (GAS).
 *
 * Algorithm (7 steps — must match GAS source exactly for Neon addressKey parity):
 *  1. Normalize `##` → `#`
 *  2. Extract embedded unit (`#\w+`) into `unit` when no unit param supplied
 *  3. Strip `#\w+` from address string
 *  4. Split on first comma — drop city/state suffix
 *  5. Normalize street-type tokens: lowercase + strip trailing period
 *  6. Lowercase, strip non-alphanumeric, collapse spaces
 *  7. Return `addr + "||" + unit`
 *
 * @param address - Raw property address string (may contain embedded unit)
 * @param unit    - Optional explicit unit override; if absent, embedded unit extracted
 * @returns Normalized dedup key in the form `"<addr>||<unit>"`
 */
export function normalizeAddressKey(address: string, unit?: string): string {
  // Step 1: normalize ## → #
  let addr = String(address || '').replace(/##/g, '#');

  // Step 2: extract embedded unit (#word) when unit param absent
  const embeddedUnit = addr.match(/#(\w+)/);
  if (embeddedUnit && !unit) {
    unit = embeddedUnit[1];
  }

  // Step 3: strip #\w+ from address
  addr = addr.replace(/#\w+/g, '').trim();

  // Step 4: strip city/state suffix — everything from first comma onward
  addr = addr.split(',')[0].trim();

  // Step 5: normalize street-type abbreviations — lowercase + strip trailing period
  addr = addr.replace(
    /\b(avenue|ave|street|st|boulevard|blvd|drive|dr|road|rd|lane|ln|way|place|pl|court|ct|terrace|terr)\b\.?/gi,
    (m) => m.replace(/\.$/, '').toLowerCase()
  );

  // Step 6: lowercase, strip non-alphanumeric, collapse spaces
  addr = addr.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
  const unitNorm = String(unit || '').toLowerCase().replace(/[^a-z0-9]/g, '').trim();

  // Step 7: return composite key
  return addr + '||' + unitNorm;
}
