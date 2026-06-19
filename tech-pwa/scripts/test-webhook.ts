import { config } from 'dotenv';
config({ path: '.env.local' });

async function main() {
  const payload = {
    subject: 'Maintenance Request: 123 Test St',
    bodyText: 'Tenant at 123 Test St, Unit 4 reports a leaking faucet in the kitchen. Priority is standard.',
    gmailMsgId: 'mock-gmail-id-123'
  };

  try {
    const res = await fetch('http://localhost:4141/api/webhooks/n8n/gmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DASHBOARD_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log("Status:", res.status);
    console.log("Response:", data);
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

main();
