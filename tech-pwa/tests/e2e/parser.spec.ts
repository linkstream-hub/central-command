import { test, expect } from '@playwright/test';

test.describe('Native FSM Parser', () => {
  test('successfully parses structured Lapham email natively without Google Apps Script', async ({ request }) => {
    
    // Simulate an incoming webhook payload from the Lapham website
    const payload = {
      sender: "website@laphamcompany.com",
      subject: "Maintenance Request: 375 Staten Ave",
      textBody: `Submitted values are:
Property Address: 375 Staten Ave
Unit: 1
Name: Jane Doe
Phone: 510-555-0199
Email: jane@example.com
Permission to Enter: Yes
Description: Shower has low water pressure`,
      threadContext: ""
    };

    const response = await request.post('/api/parse', {
      data: payload
    });

    expect(response.ok()).toBeTruthy();
    const json = await response.json();
    
    // Verify the FSM API successfully processed the request
    expect(json.success).toBe(true);
    expect(json.jobId).toBeDefined();

    // Verify the data was extracted perfectly using the native Next.js logic
    expect(json.data.propertyAddress).toBe('375 Staten Ave');
    expect(json.data.description).toBe('Shower has low water pressure');
    expect(json.data.tenantName).toBe('Jane Doe');
    expect(json.data.pte).toBe('Yes');
    expect(json.data.confidenceNotes).toContain('Gemini bypassed');
  });
});
