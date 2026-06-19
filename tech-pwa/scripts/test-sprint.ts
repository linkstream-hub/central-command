import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env.local' });
import { db } from '../src/lib/db';
import { employees } from '../src/lib/schema';
import { eq } from 'drizzle-orm';
const { request } = require('gaxios');
import fs from 'fs';
import crypto from 'crypto';

function hashPin(pin: string) {
  return crypto.createHash('sha256').update(pin).digest('hex');
}

async function main() {
  console.log("Starting Phase 17 Runtime Tests...");
  let results = "Phase 17 Runtime Tests\n\n";

  // Ensure DB is reset for the test
  try {
    await request({ url: 'http://localhost:3000/api/dev-reset-pin', method: 'GET' });
  } catch (err: any) {
    console.error("Failed to reset DB at start via API:", err.message);
  }

  // Ensure dev backdoor setup: employee 1
  let token = '';
  try {
    const loginRes = await request({ 
      url: 'http://localhost:3000/api/field/auth/login', 
      method: 'POST', 
      data: { badge: '1', pin: '1234' } 
    });
    token = loginRes.data.token;
  } catch (err: any) {
    console.error("Login failed, aborting tests", err.message);
    return;
  }

  const BASE_URL = 'http://localhost:3000/api';

  // 1. change-pin happy path
  try {
    const res = await request({
      url: `${BASE_URL}/field/auth/change-pin`,
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      data: { oldPin: '1234', newPin: '5678' }
    });
    results += `1. change-pin happy path\nCMD: POST /api/field/auth/change-pin with Bearer token & {oldPin:'1234', newPin:'5678'}\nStatus: ${res.status}\nBody: ${JSON.stringify(res.data)}\n\n`;
  } catch (err: any) {
    results += `1. change-pin happy path\nCMD: POST /api/field/auth/change-pin\nFailed: Status ${err.response?.status} - ${JSON.stringify(err.response?.data)}\n\n`;
  }

  // 2. change-pin bad old PIN
  try {
    const res = await request({
      url: `${BASE_URL}/field/auth/change-pin`,
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      data: { oldPin: 'wrong', newPin: '9999' }
    }).catch((e: any) => e.response);
    results += `2. change-pin bad old PIN\nCMD: POST /api/field/auth/change-pin with Bearer token & {oldPin:'wrong', newPin:'9999'}\nStatus: ${res.status}\nBody: ${JSON.stringify(res.data)}\n\n`;
  } catch (err: any) {
    results += `2. change-pin bad old PIN\nFailed: ${err.message}\n\n`;
  }

  // 3. change-pin no session
  try {
    const res = await request({
      url: `${BASE_URL}/field/auth/change-pin`,
      method: 'POST',
      data: { oldPin: '1234', newPin: '9999' }
    }).catch((e: any) => e.response);
    results += `3. change-pin no session\nCMD: POST /api/field/auth/change-pin with NO header & {oldPin:'1234', newPin:'9999'}\nStatus: ${res.status}\nBody: ${JSON.stringify(res.data)}\n\n`;
  } catch (err: any) {
    results += `3. change-pin no session\nFailed: ${err.message}\n\n`;
  }

  // 4. validate-token happy path
  try {
    process.env.GAS_INTERNAL_SECRET = 'test-secret';
    const res = await request({
      url: `${BASE_URL}/gas/validate-token`,
      method: 'POST',
      headers: { 'X-GAS-Internal-Key': 'test-secret' },
      data: { token: token }
    });
    results += `4. validate-token happy path\nCMD: POST /api/gas/validate-token with X-GAS-Internal-Key & {token: '<valid-token>'}\nStatus: ${res.status}\nBody: ${JSON.stringify(res.data)}\n\n`;
  } catch (err: any) {
    results += `4. validate-token happy path\nCMD: POST /api/gas/validate-token\nFailed: Status ${err.response?.status} - ${JSON.stringify(err.response?.data)}\n\n`;
  }

  console.log("Results written to artifacts/ag_test_results.txt");
  fs.writeFileSync('../artifacts/ag_test_results.txt', results);

  // Reset PIN to '1234' for future dev uses
  try {
    await request({ url: 'http://localhost:3000/api/dev-reset-pin', method: 'GET' });
  } catch (err: any) {
    console.error("Failed to reset PIN in DB via API:", err.message);
  }
}

main().catch(console.error);
