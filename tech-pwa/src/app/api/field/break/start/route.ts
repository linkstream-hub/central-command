import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { shifts, breaks } from '@/lib/schema';
import { verifyFieldSession } from '@/lib/fieldAuth';
import { eq, and } from 'drizzle-orm';
import { BreakStartSchema } from '@/lib/fieldSchemas';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await verifyFieldSession(req);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const parsed = BreakStartSchema.safeParse(body);
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

    const now = new Date();

    await db.update(shifts)
      .set({ status: 'on-break' })
      .where(eq(shifts.shiftId, shiftId));

    await db.insert(breaks).values({
      timeRecordId: shiftId,
      breakNumber: 1,
      breakStart: now,
      breakType: 'meal',
      orgId: 'APT-CA'
    });

    return NextResponse.json({ success: true, breakStart: now.toISOString() });
  } catch (error) {
    console.error('break start error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
