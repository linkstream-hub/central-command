import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

const CA_REST_WARNING  = 240;
const CA_MEAL_WARNING  = 300;
const CA_SECOND_MEAL   = 570;

export async function GET(req: Request) {
  const apiKey = req.headers.get('x-api-key');
  if (apiKey !== process.env.DASHBOARD_API_KEY) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    // Reuse field/live route logic by fetching internally
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.startsWith('localhost') ? 'http' : 'https';
    const liveRes = await fetch(`${protocol}://${host}/api/field/live`, {
      headers: { 'x-api-key': process.env.DASHBOARD_API_KEY || '' },
    });
    const liveData = await liveRes.json();
    if (!liveData.success) return NextResponse.json(liveData, { status: 502 });

    const records = liveData.techs.map((t: {
      techId: string; techName: string; minutesWorked?: number; status?: string;
    }) => {
      const elapsed = t.minutesWorked || 0;
      const onBreak = t.status === 'on-break';
      const violations: string[] = [];
      if (elapsed >= CA_SECOND_MEAL) violations.push('SECOND_MEAL_OVERDUE');
      else if (elapsed >= CA_MEAL_WARNING) violations.push('MEAL_BREAK_OVERDUE');
      else if (elapsed >= CA_REST_WARNING) violations.push('REST_BREAK_DUE');

      const complianceStatus =
        violations.includes('SECOND_MEAL_OVERDUE') ? 'CRITICAL' :
        violations.includes('MEAL_BREAK_OVERDUE')  ? 'MEAL_DUE'  :
        violations.includes('REST_BREAK_DUE')       ? 'REST_DUE'  : 'OK';

      return {
        techId: t.techId,
        techName: t.techName,
        elapsedMin: elapsed,
        onBreak,
        status: complianceStatus,
        violations,
        thresholds: { restAt: CA_REST_WARNING, mealAt: CA_MEAL_WARNING, secondMealAt: CA_SECOND_MEAL },
      };
    });

    return NextResponse.json({ success: true, source: 'neon', records });
  } catch (error) {
    console.error('[GET /api/field/compliance] Error:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
