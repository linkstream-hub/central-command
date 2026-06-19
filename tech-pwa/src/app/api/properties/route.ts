import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { properties } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const apiKey = req.headers.get('DASHBOARD_API_KEY');
  if (apiKey !== process.env.DASHBOARD_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const rows = await db
    .select({
      id: properties.id,
      address: properties.address,
      addressKey: properties.addressKey,
      rmName: properties.rmName,
      rmEmail: properties.rmEmail,
      accessInfo: properties.accessInfo,
    })
    .from(properties)
    .where(eq(properties.isActive, true));

  return NextResponse.json({ properties: rows });
}
