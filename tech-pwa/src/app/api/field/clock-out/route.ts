import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { timeRecords } from '@/lib/schema';
import { verifyFieldSession } from '@/lib/fieldAuth';
import { eq, and } from 'drizzle-orm';
import { ClockOutSchema } from '@/lib/fieldSchemas';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await verifyFieldSession(req);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const parsed = ClockOutSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid request', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { recordId, lat, lng } = parsed.data;
    
    const existingList = await db.select().from(timeRecords).where(and(eq(timeRecords.recordId, recordId), eq(timeRecords.techId, session.badge)));
    if (existingList.length === 0) {
      return NextResponse.json({ success: false, message: 'Time record not found' }, { status: 404 });
    }

    const tr = existingList[0];
    if (tr.status === 'complete' || tr.clockOut) {
      return NextResponse.json({ success: false, message: 'Already clocked out' }, { status: 404 });
    }

    const now = new Date();
    const breakMinutes = tr.breakMinutes || 0;
    const clockInTime = tr.clockIn || now;
    
    const actualHours = (now.getTime() - clockInTime.getTime()) / 3600000 - (breakMinutes / 60);
    const mealWarning = (now.getTime() - clockInTime.getTime()) / 3600000 > 5 && breakMinutes === 0;

    await db.update(timeRecords)
      .set({
        clockOut: now,
        actualHours,
        status: 'complete',
        latOut: lat ?? null,
        lngOut: lng ?? null,
        mealWarning
      })
      .where(eq(timeRecords.recordId, recordId));

    return NextResponse.json({
      success: true,
      recordId,
      clockOutTime: now.toISOString(),
      actualHoursWorked: actualHours,
      mealBreakWarning: mealWarning
    });
  } catch (error) {
    console.error('clock-out error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
