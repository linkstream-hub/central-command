import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { auth } from '@/auth';

/**
 * Dashboard proxy for /api/field/live.
 * Office staff auth (Google OAuth) — browser-facing.
 * Internally calls field/live with x-api-key (server-side — key never exposed to browser).
 */
export async function GET(req: Request) {
  const session = await auth();
  const apiKey = req.headers.get('x-api-key');
  const isApiKeyAuth = apiKey === process.env.DASHBOARD_API_KEY;
  if (!session && !isApiKeyAuth) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.startsWith('localhost') ? 'http' : 'https';
    const res = await fetch(`${protocol}://${host}/api/field/live`, {
      headers: { 'x-api-key': process.env.DASHBOARD_API_KEY || '' },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('[GET /api/dashboard/live-status] Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
