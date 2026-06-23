import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { employees } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import * as fs from 'fs';
import { parse } from 'csv-parse/sync';

function normalizeName(name: string): string {
  if (!name) return '';
  name = name.trim();
  name = name.split('#')[0].trim();
  if (name.includes(',')) {
    const parts = name.split(',');
    if (parts.length === 2) {
      name = `${parts[1].trim()} ${parts[0].trim()}`;
    }
  }
  return name;
}

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const CSV_URL = `https://docs.google.com/spreadsheets/d/1eCSHpj5381R7Hhloe718r1n8fEfesY2tjYOuOLxTSd4/gviz/tq?tqx=out:csv&sheet=Tech%20Roster&t=${Date.now()}`;
    const res = await fetch(CSV_URL, { cache: 'no-store' });
    const text = await res.text();
    
    const records = parse(text, {
      columns: true,
      skip_empty_lines: true,
    });

    await db.update(employees).set({ isActive: false, badge: null });

    let insertedCount = 0;
    
    for (const row of records as Record<string, string>[]) {
      const rawName = row['Name'];
      if (!rawName) continue;
      
      const cleanName = normalizeName(rawName);
      const badge = row['Badge #'] || null;
      const phone = row['Phone'] || null;
      
      const existing = await db.select().from(employees).where(eq(employees.name, cleanName));
      
      if (existing.length > 0) {
        await db.update(employees)
          .set({ 
            isActive: true, 
            badge: badge,
            phone: phone,
            role: 'tech' 
          })
          .where(eq(employees.id, existing[0].id));
      } else {
        await db.insert(employees).values({
          orgId: 'APT-CA',
          name: cleanName,
          badge: badge,
          phone: phone,
          role: 'tech',
          isActive: true,
        });
      }
      insertedCount++;
    }

    return NextResponse.json({ success: true, count: insertedCount });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
