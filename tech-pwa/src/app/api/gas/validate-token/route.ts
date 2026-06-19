import { NextRequest, NextResponse } from 'next/server';
import { verifyFieldSession } from '@/lib/fieldAuth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // 1. Verify GAS internal secret
    const internalKey = req.headers.get('x-gas-internal-key');
    const expectedKey = process.env.GAS_INTERNAL_SECRET;

    if (!internalKey || !expectedKey || internalKey !== expectedKey) {
      return NextResponse.json({ success: false, message: 'Unauthorized internal call' }, { status: 401 });
    }

    // 2. Parse token from body
    const body = await req.json().catch(() => ({}));
    const { token } = body;

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ success: false, message: 'Missing token in body' }, { status: 400 });
    }

    // 3. Verify token using existing logic
    const mockReq = new Request('http://localhost', {
      headers: { authorization: `Bearer ${token}` }
    });
    const session = await verifyFieldSession(mockReq);

    if (!session) {
      return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 401 });
    }

    // 4. Return tech object in the format GAS expects
    return NextResponse.json({
      success: true,
      tech: {
        badge: session.badge,
        name: session.name,
        role: session.role,
        hourlyRate: session.hourlyRate,
        employeeId: session.employeeId
      }
    });

  } catch (error) {
    console.error('Validate token error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
