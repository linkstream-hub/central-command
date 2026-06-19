import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { employees } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const activeTechs = await db.select().from(employees).where(eq(employees.isActive, true));
    
    // Map the database format back to the expected TechStatus / MOCK_TECH_ROSTER format
    // so the frontend doesn't break
    const techs = activeTechs.map(t => ({
      techId: t.badge || String(t.id),
      badge: t.badge || String(t.id),
      techName: t.name,
      name: t.name,
      phone: t.phone,
      rank: t.rank,
      role: t.role,
      active: t.isActive,
      status: 'unassigned', // default field status
      skills: {
        Carpentry: t.skillCarpentry,
        Plumbing: t.skillPlumbing,
        Electrical: t.skillElectrical,
        'Finish Carpentry': t.skillFinishCarp,
        Structural: t.skillStructural,
        Landscaping: t.skillLandscaping,
        Janitorial: t.skillJanitorial,
      }
    }));

    return NextResponse.json({ success: true, techs });
  } catch (error: any) {
    console.error('[NEON] /api/techs GET failed:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
