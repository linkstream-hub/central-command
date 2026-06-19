import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { token, subscription } = await req.json();
    
    // Forward to DashboardAPI to store subscription in Tech Roster
    const apiUrl = process.env.NEXT_PUBLIC_DASHBOARD_API_URL;
    if (!apiUrl) {
      console.warn('Push subscription: no API URL — returning mock success');
      return NextResponse.json({ success: true, message: 'Mock push subscription saved' });
    }

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'savePushSubscription', token, subscription, apiKey: process.env.DASHBOARD_API_KEY }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error('Push subscription error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
