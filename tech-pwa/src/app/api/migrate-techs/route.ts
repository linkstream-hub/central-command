import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { employees } from '@/lib/schema';

// We fetch the legacy tech list from the mock in dashboard-api.ts or the actual GAS endpoint via /api/gas.
// To keep it simple, we use the known MOCK_TECH_ROSTER that is exported inside dashboard-api if we expose it,
// or we just define the techs we know need migrating.
const INITIAL_TECHS = [
  { name: 'Salvador Cabrera', badge: '101', phone: '510-555-1001', rank: 'C',  role: 'tech', skills: { Carpentry: 1, Plumbing: 1, Electrical: 2, 'Finish Carpentry': 2, Structural: 3, Landscaping: 3, Janitorial: 3 } },
  { name: 'Eduardo Pena',     badge: '102', phone: '415-555-1002', rank: 'L1', role: 'tech', skills: { Carpentry: 2, Plumbing: 2, Electrical: 3, 'Finish Carpentry': 3, Structural: 3, Landscaping: 2, Janitorial: 1 } },
  { name: 'Boyette Johnson',  badge: '103', phone: '415-555-1003', rank: 'L',  role: 'tech', skills: { Carpentry: 3, Plumbing: 3, Electrical: 1, 'Finish Carpentry': 3, Structural: 2, Landscaping: 3, Janitorial: 3 } },
  { name: 'Federico Santos',  badge: '104', phone: '510-555-1004', rank: 'T',  role: 'tech', skills: { Carpentry: 3, Plumbing: 3, Electrical: 3, 'Finish Carpentry': 3, Structural: 3, Landscaping: 3, Janitorial: 2 } },
];

export async function GET() {
  try {
    const inserted = [];
    for (const t of INITIAL_TECHS) {
      const [emp] = await db.insert(employees).values({
        orgId: 'APT-CA',
        name: t.name,
        badge: t.badge,
        phone: t.phone,
        rank: t.rank,
        role: t.role,
        isActive: true,
        skillCarpentry: t.skills.Carpentry,
        skillPlumbing: t.skills.Plumbing,
        skillElectrical: t.skills.Electrical,
        skillFinishCarp: t.skills['Finish Carpentry'],
        skillStructural: t.skills.Structural,
        skillLandscaping: t.skills.Landscaping,
        skillJanitorial: t.skills.Janitorial,
      }).onConflictDoNothing().returning();
      if (emp) inserted.push(emp);
    }
    return NextResponse.json({ success: true, migrated: inserted.length, techs: inserted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
