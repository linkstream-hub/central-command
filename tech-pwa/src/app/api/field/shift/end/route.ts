import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { shifts } from '@/lib/schema';
import { verifyFieldSession } from '@/lib/fieldAuth';
import { eq, and } from 'drizzle-orm';
import { ShiftEndSchema } from '@/lib/fieldSchemas';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await verifyFieldSession(req);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const parsed = ShiftEndSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid request', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { shiftId } = parsed.data;

    const existingList = await db.select().from(shifts).where(and(eq(shifts.shiftId, shiftId), eq(shifts.employeeId, session.employeeId)));
    if (existingList.length === 0) {
      return NextResponse.json({ success: false, message: 'Shift not found' }, { status: 404 });
    }

    const shift = existingList[0];
    if (shift.status === 'Complete') {
      return NextResponse.json({ success: false, message: 'Shift already ended' }, { status: 404 });
    }

    const now = new Date();
    const totalBreakMinutes = shift.totalBreakMinutes || 0;
    const actualHours = (now.getTime() - shift.shiftStart.getTime()) / 3600000 - totalBreakMinutes / 60;

    await db.update(shifts)
      .set({
        shiftEnd: now,
        actualHours,
        status: 'Complete'
      })
      .where(eq(shifts.shiftId, shiftId));

    return NextResponse.json({
      success: true,
      shiftId,
      endTime: now.toISOString(),
      actualHours
    });
  } catch (error) {
    console.error('shift end error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
