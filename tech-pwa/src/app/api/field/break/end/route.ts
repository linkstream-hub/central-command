import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { shifts, breaks } from '@/lib/schema';
import { verifyFieldSession } from '@/lib/fieldAuth';
import { eq, and, isNull } from 'drizzle-orm';
import { BreakEndSchema } from '@/lib/fieldSchemas';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await verifyFieldSession(req);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const parsed = BreakEndSchema.safeParse(body);
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

    const openBreaks = await db.select().from(breaks).where(and(eq(breaks.timeRecordId, shiftId), isNull(breaks.breakEnd)));
    if (openBreaks.length === 0) {
      return NextResponse.json({ success: false, message: 'No open break found' }, { status: 404 });
    }

    const openBreak = openBreaks[0];
    const now = new Date();
    const breakMinutes = Math.round((now.getTime() - openBreak.breakStart.getTime()) / 60000);

    await db.update(breaks)
      .set({ breakEnd: now, breakMinutes })
      .where(eq(breaks.id, openBreak.id));

    const currentTotal = existingList[0].totalBreakMinutes ?? 0;
    const newTotal = currentTotal + breakMinutes;

    await db.update(shifts)
      .set({ totalBreakMinutes: newTotal, status: 'Active' })
      .where(eq(shifts.shiftId, shiftId));

    return NextResponse.json({ success: true, breakEnd: now.toISOString(), breakDurationMinutes: newTotal });
  } catch (error) {
    console.error('break end error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
