import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { shifts, attestations } from '@/lib/schema';
import { verifyFieldSession } from '@/lib/fieldAuth';
import { eq, and } from 'drizzle-orm';
import { AttestationSignSchema } from '@/lib/fieldSchemas';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await verifyFieldSession(req);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const parsed = AttestationSignSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid request', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { shiftId, attestationText, mealCompliant, restCompliant } = parsed.data;

    const shiftList = await db.select().from(shifts).where(and(eq(shifts.shiftId, shiftId), eq(shifts.employeeId, session.employeeId)));
    if (shiftList.length === 0) {
      return NextResponse.json({ success: false, message: 'Shift not found' }, { status: 404 });
    }
    const shift = shiftList[0];
    const now = new Date();
    
    const actualHours = shift.actualHours || 0;
    const overtimeHours = actualHours > 8 ? actualHours - 8 : 0;

    const [inserted] = await db.insert(attestations).values({
      shiftId: shift.id,
      employeeId: session.employeeId,
      shiftDate: shift.shiftDate,
      attestationText,
      signedAt: now,
      mealCompliant,
      restCompliant,
      overtimeHours,
      ipAddress: req.headers.get('x-forwarded-for'),
      userAgent: req.headers.get('user-agent'),
      orgId: 'APT-CA'
    }).onConflictDoNothing({ target: attestations.shiftId }).returning();

    const webhookUrl = process.env.N8N_COMPLIANCE_WEBHOOK_URL;
    if (!webhookUrl) {
      console.warn('[attestation/sign] N8N_COMPLIANCE_WEBHOOK_URL is undefined, skipping webhook call');
    } else {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          techId: session.badge,
          techName: session.name,
          shiftDate: shift.shiftDate,
          mealCompliant,
          restCompliant,
          overtimeHours,
          hourlyRate: session.hourlyRate,
          signedAt: now.toISOString(),
        }),
      }).catch(err => console.error('[attestation/sign] webhook failed:', err));
    }

    return NextResponse.json({ success: true, attestationId: inserted?.id || null });
  } catch (error) {
    console.error('attestation sign error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
