/**
 * CA Workers' Comp classification codes by trade category and hourly wage tier.
 * Ported from DashboardAPI.gs (DA_WC_CODES + resolveWCCode) — Phase 12 NEON-03 follow-through.
 * GAS returned the full tier object; every consumer only needs the code string.
 */

interface WCTier {
  code: string;
  desc: string;
  minWage: number;
}

const WC_CODES: Record<string, WCTier[]> = {
  'Electrical': [
    { code: '5140-1', desc: 'Electrical Wiring >= $36/hr', minWage: 36 },
    { code: '5190-1', desc: 'Electrical Wiring < $36/hr', minWage: 0 },
  ],
  'Plumbing': [
    { code: '5187-1', desc: 'Plumbing Operations >= $32/hr', minWage: 32 },
    { code: '5183-1', desc: 'Plumbing Operations < $32/hr', minWage: 0 },
  ],
  'Carpentry': [
    { code: '5432-1', desc: 'Carpentry >= $41/hr', minWage: 41 },
    { code: '5403-1', desc: 'Carpentry < $41/hr', minWage: 0 },
  ],
  'General Repair': [
    { code: '5432-1', desc: 'Carpentry >= $41/hr', minWage: 41 },
    { code: '5403-1', desc: 'Carpentry < $41/hr', minWage: 0 },
  ],
  'Finish Carpentry': [
    { code: '5146-1', desc: 'Cabinet/Fixture/Trim Install', minWage: 0 },
  ],
  'Painting': [
    { code: '5482-1', desc: 'Painting/Wallpaper >= $32/hr', minWage: 32 },
    { code: '5474-1', desc: 'Painting/Wallpaper < $32/hr', minWage: 0 },
  ],
  'Painting/Drywall': [
    { code: '5482-1', desc: 'Painting/Wallpaper >= $32/hr', minWage: 32 },
    { code: '5474-1', desc: 'Painting/Wallpaper < $32/hr', minWage: 0 },
  ],
  'Janitorial': [
    { code: '9015-1', desc: 'Building Operations - Other', minWage: 0 },
  ],
  'Turnover': [
    { code: '9015-1', desc: 'Building Operations - Other', minWage: 0 },
  ],
  'Multi-trade': [
    { code: '9015-1', desc: 'Building Operations - Other', minWage: 0 },
  ],
};

/** Resolves the WC code for a trade category at a given hourly wage. Unknown categories fall back to General Repair; wage 0/unknown resolves to the lowest tier. */
export function resolveWCCode(category: string, hourlyWage: number | null | undefined): string {
  const wage = Number(hourlyWage) || 0;
  const tiers = WC_CODES[category] || WC_CODES['General Repair'];
  const sorted = [...tiers].sort((a, b) => b.minWage - a.minWage);
  for (const tier of sorted) {
    if (wage >= tier.minWage) return tier.code;
  }
  return sorted[sorted.length - 1].code;
}
