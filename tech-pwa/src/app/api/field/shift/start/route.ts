import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { shifts } from '@/lib/schema';
import { verifyFieldSession } from '@/lib/fieldAuth';
import { eq } from 'drizzle-orm';
import { ShiftStartSchema } from '@/lib/fieldSchemas';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await verifyFieldSession(req);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const parsed = ShiftStartSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid request', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const shiftDateInput = parsed.data.shiftDate;
    
    const shiftDate = shiftDateInput ?? new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Los_Angeles',
      year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(new Date());

    const shiftId = `SHIFT-${session.badge}-${shiftDate}`;
    const now = new Date();

    const existing = await db.select().from(shifts).where(eq(shifts.shiftId, shiftId));
    if (existing.length > 0) {
      return NextResponse.json({
        success: true,
        shiftId,
        startTime: existing[0].shiftStart.toISOString(),
        alreadyActive: true
      });
    }

    await db.insert(shifts).values({
      shiftId,
      employeeId: session.employeeId,
      shiftDate,
      shiftStart: now,
      status: 'Active',
      orgId: 'APT-CA'
    }).onConflictDoNothing({ target: shifts.shiftId });

    return NextResponse.json({
      success: true,
      shiftId,
      startTime: now.toISOString(),
      alreadyActive: false
    });
  } catch (error) {
    console.error('shift start error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
