import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await db.execute(sql`SELECT 1`);
    return NextResponse.json({
      status: 'ok',
      db: 'ok',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[health] DB check failed:', error);
    return NextResponse.json(
      { status: 'error', db: 'error', timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
