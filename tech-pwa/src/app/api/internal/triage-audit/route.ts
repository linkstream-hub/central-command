import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobs } from '@/lib/schema';
import { sql, and, eq, gt, isNull, or } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key');
  if (apiKey !== process.env.DASHBOARD_API_KEY) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [
    statusDist,
    emailTypeDist,
    unknownSender,
    recentAll,
    addrDupes,
    gmailDupes,
  ] = await Promise.all([
    // Status distribution
    db.execute(sql`SELECT status, COUNT(*) as cnt FROM jobs WHERE org_id='APT-CA' GROUP BY status ORDER BY cnt DESC`),
    // Email type distribution
    db.execute(sql`SELECT email_type, COUNT(*) as cnt FROM jobs WHERE org_id='APT-CA' GROUP BY email_type ORDER BY cnt DESC`),
    // Unknown/missing sender
    db.execute(sql`
      SELECT job_id, address, unit, status, email_type, rm_email, gmail_msg_id, timestamp
      FROM jobs WHERE org_id='APT-CA'
      AND (rm_email IS NULL OR rm_email = '' OR rm_email = 'Unknown')
      ORDER BY timestamp DESC LIMIT 50
    `),
    // Recent 7 days — all jobs
    db.execute(sql`
      SELECT job_id, address, unit, status, email_type, rm_email, gmail_msg_id, timestamp
      FROM jobs WHERE org_id='APT-CA'
      AND timestamp > ${sevenDaysAgo}
      ORDER BY timestamp DESC
    `),
    // Address duplicates — same address+unit with multiple WOs
    db.execute(sql`
      SELECT address, unit, COUNT(*) as cnt,
             array_agg(job_id ORDER BY timestamp DESC) as job_ids,
             array_agg(status ORDER BY timestamp DESC) as statuses,
             array_agg(gmail_msg_id ORDER BY timestamp DESC) as gmail_ids,
             MAX(timestamp) as latest
      FROM jobs WHERE org_id='APT-CA'
      AND timestamp > ${sevenDaysAgo}
      GROUP BY address, unit
      HAVING COUNT(*) > 1
      ORDER BY cnt DESC, latest DESC
    `),
    // Gmail msg ID duplicates
    db.execute(sql`
      SELECT gmail_msg_id, COUNT(*) as cnt, array_agg(job_id) as job_ids
      FROM jobs WHERE org_id='APT-CA'
      AND gmail_msg_id IS NOT NULL AND gmail_msg_id != ''
      GROUP BY gmail_msg_id
      HAVING COUNT(*) > 1
    `),
  ]);

  return NextResponse.json({
    statusDist: statusDist.rows,
    emailTypeDist: emailTypeDist.rows,
    unknownSenderCount: unknownSender.rows.length,
    unknownSenderSample: unknownSender.rows.slice(0, 10),
    recentCount: recentAll.rows.length,
    recentJobs: recentAll.rows,
    addressDupes: addrDupes.rows,
    gmailDupes: gmailDupes.rows,
  });
}
