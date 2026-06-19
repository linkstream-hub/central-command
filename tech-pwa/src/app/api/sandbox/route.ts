import { NextRequest, NextResponse } from 'next/server';
import { sandboxAction } from '@/lib/sandbox-store';

export async function POST(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_SANDBOX_MODE !== 'true') {
    return NextResponse.json({ success: false, error: 'Sandbox not active' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { action, ...payload } = body;
    const result = sandboxAction(action, payload);
    return NextResponse.json(result);
  } catch (error) {
    console.error('[SANDBOX] Route error:', error);
    return NextResponse.json({ success: false, error: 'Sandbox error' }, { status: 500 });
  }
}
