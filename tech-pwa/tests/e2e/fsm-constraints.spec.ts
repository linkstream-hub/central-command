import { test, expect } from '@playwright/test';

test.describe('FSM Digital Straitjacket Constraints', () => {
  
  test('Prevents dispatchers from manually transitioning a job to Scheduled without required fields', async ({ request }) => {
    // 1. Create a dummy job through the native parse route to get a valid jobId
    const initPayload = {
      sender: "website@laphamcompany.com",
      subject: "Maintenance Request: 375 Staten Ave",
      textBody: `Submitted values are:
Property Address: 375 Staten Ave
Unit: 1
Name: Jane Doe
Phone: 510-555-0199
Email: jane@example.com
Permission to Enter: Yes
Description: Broken door`,
    };
    
    const createRes = await request.post('/api/parse', { data: initPayload });
    expect(createRes.ok()).toBeTruthy();
    const createJson = await createRes.json();
    const jobId = createJson.jobId;

    // 2. Attempt to bypass constraints by forcing status to Scheduled via API
    // (We hit the general update job API route, assuming it exists at /api/jobs/[jobId] or similar)
    // Wait, the Next.js API route that handles dispatch updates is likely /api/jobs/[id]. Let's try.
    const updateRes = await request.patch(`/api/jobs/${jobId}`, {
      data: {
        status: 'Scheduled',
        tech: null,
        scheduledDate: null
      }
    });

    // 3. The API MUST block this with a 400 series or 500 series FSM error
    expect(updateRes.ok()).toBeFalsy();
    
    const errorJson = await updateRes.json();
    expect(errorJson.message).toContain('FSM Constraint Violation');
    expect(errorJson.message).toContain('without assigning a Technician');
  });
});
