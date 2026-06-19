import { config } from 'dotenv';
config({ path: '.env.local' });
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

async function main() {
  try {
    console.log("Testing gemini-1.5-pro...");
    const result = await generateText({
      model: google('gemini-1.5-pro'),
      prompt: 'Say hello',
    });
    console.log("Pro success:", result.text);
  } catch (err: any) {
    console.log("Pro error:", err.message);
  }

  try {
    console.log("Testing gemini-1.5-flash...");
    const result2 = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: 'Say hello',
    });
    console.log("Flash success:", result2.text);
  } catch (err: any) {
    console.log("Flash error:", err.message);
  }
}

main().catch(console.error);
