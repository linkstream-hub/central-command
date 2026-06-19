import { db } from '../db';
import { timeRecords } from '../schema';
import { eq } from 'drizzle-orm';
import { evaluateCACompliance, ShiftDetails } from '../compliance';

export const timeRecordsRepository = {
  /**
   * Fetches the current active time record for a tech.
   */
  async getActiveRecord(techId: string) {
    const records = await db.select()
      .from(timeRecords)
      .where(eq(timeRecords.techId, techId))
      .orderBy(timeRecords.clockIn); // In practice, order by descending and take 1

    // Assuming the last record is active if clockOut is null
    const latest = records[records.length - 1];
    if (latest && !latest.clockOut) {
      return latest;
    }
    return null;
  },

  /**
   * Check CA Compliance for a given record
   */
  async checkCompliance(recordId: string) {
    const records = await db.select().from(timeRecords).where(eq(timeRecords.recordId, recordId));
    if (!records.length) return null;

    const record = records[0];
    if (!record.clockIn) return null;

    const shiftDetails: ShiftDetails = {
      clockIn: record.clockIn,
      clockOut: record.clockOut,
      breakStart: record.breakStart,
      breakEnd: record.breakEnd,
      breakMinutes: record.breakMinutes || 0,
    };

    return evaluateCACompliance(shiftDetails);
  }
};
