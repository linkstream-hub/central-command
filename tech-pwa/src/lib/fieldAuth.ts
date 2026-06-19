import { db } from '@/lib/db';
import { employees } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import * as crypto from 'crypto';

export interface FieldSession {
  employeeId: number;
  badge: string;
  name: string;
  role: string;
  hourlyRate: number | null;
}

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function verifyFieldSession(req: Request): Promise<FieldSession | null> {
  const auth = req.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : null;
  if (!token) return null;

  // P-2: Hash the presented token before comparing to the stored hash
  const hashedToken = hashToken(token);

  const result = await db.select().from(employees)
    .where(eq(employees.sessionToken, hashedToken))
    .limit(1);

  const emp = result[0];
  if (!emp) return null;
  if (!emp.tokenExpiry || emp.tokenExpiry < new Date()) return null;
  if (!emp.isActive) return null;

  return {
    employeeId: emp.id,
    badge: emp.badge || '',
    name: emp.name,
    role: emp.role,
    hourlyRate: emp.hourlyRate ?? null,
  };
}
