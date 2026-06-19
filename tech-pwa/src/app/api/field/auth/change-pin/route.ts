import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { employees } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import * as crypto from 'crypto';
import { verifyFieldSession } from '@/lib/fieldAuth';
import { ChangePinSchema } from '@/lib/fieldSchemas';

export const dynamic = 'force-dynamic';

function hashPin(pin: string): string {
  return crypto.createHash('sha256').update(pin).digest('hex');
}

export async function POST(req: NextRequest) {
  try {
    // 1. Verify session
    const session = await verifyFieldSession(req);
    if (!session) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse body
    const body = await req.json().catch(() => ({}));
    const parsed = ChangePinSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid request', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { oldPin, newPin } = parsed.data;

    // 3. Fetch tech from DB to verify old PIN
    const techList = await db.select().from(employees).where(eq(employees.id, session.employeeId));
    if (techList.length === 0) {
      return NextResponse.json({ success: false, message: 'Employee not found' }, { status: 404 });
    }
    const tech = techList[0];

    // 4. Validate old PIN
    let isOldPinValid = false;
    if (!tech.pinHash) {
      // Dev backdoor
      if (process.env.NODE_ENV !== 'production' && oldPin === '1234') {
        isOldPinValid = true;
      }
    } else {
      isOldPinValid = tech.pinHash === hashPin(oldPin);
    }

    if (!isOldPinValid) {
      return NextResponse.json({ success: false, message: 'Invalid current PIN' }, { status: 401 });
    }

    // 5. Update to new PIN
    await db.update(employees)
      .set({ pinHash: hashPin(newPin) })
      .where(eq(employees.id, tech.id));

    return NextResponse.json({ success: true, message: 'PIN updated successfully' });

  } catch (error) {
    console.error('Change PIN error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
