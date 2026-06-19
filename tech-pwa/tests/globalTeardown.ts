import { FullConfig } from '@playwright/test';
import { teardownFixtures } from './fixtures/seed';
import * as dotenv from 'dotenv';
import path from 'path';

async function globalTeardown(config: FullConfig) {
  console.log('--- GLOBAL TEARDOWN START ---');
  
  // Ensure env is loaded for teardown process
  dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

  await teardownFixtures();
  console.log('--- GLOBAL TEARDOWN COMPLETE ---');
}

export default globalTeardown;
