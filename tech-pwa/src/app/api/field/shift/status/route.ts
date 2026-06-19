import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { shifts } from '@/lib/schema';
import { verifyFieldSession } from '@/lib/fieldAuth';
import { eq, and } from 'drizzle-orm';
import { ShiftStatusSchema } from '@/lib/fieldSchemas';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const session = await verifyFieldSession(req);
    if (!session) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const parsed = ShiftStatusSchema.safeParse(body);
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

    const existingList = await db.select().from(shifts).where(
      and(eq(shifts.employeeId, session.employeeId), eq(shifts.shiftDate, shiftDate))
    );

    if (existingList.length === 0) {
      return NextResponse.json({ success: true, shift: null });
    }

    const shift = existingList[0];
    return NextResponse.json({
      success: true,
      shift: {
        shiftId: shift.shiftId,
        status: shift.status,
        startTime: shift.shiftStart.toISOString(),
        endTime: shift.shiftEnd?.toISOString()
      }
    });
  } catch (error) {
    console.error('shift status error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
