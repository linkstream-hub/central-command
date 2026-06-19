import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

const API_URL = process.env.NEXT_PUBLIC_DASHBOARD_API_URL;
const API_KEY = process.env.DASHBOARD_API_KEY;

export async function POST(request: NextRequest) {
  const session = await auth();
  const apiKey = request.headers.get('x-api-key');
  if (!session && apiKey !== process.env.DASHBOARD_API_KEY) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!API_URL || !API_KEY) {
    return NextResponse.json({ success: false, error: 'API not configured' }, { status: 500 });
  }

  try {
    const payload = await request.json();
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ ...payload, apiKey: API_KEY }),
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[/api/gas] proxy error:', error);
    return NextResponse.json({ success: false, error: 'GAS proxy error' }, { status: 502 });
  }
}
