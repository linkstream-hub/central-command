import { describe, expect, it } from "vitest";

import { buildScheduledJobUpdate } from "../DispatchTimelineBoard";
import type { Job } from "@/lib/types";

const baseJob: Job = {
  jobId: "WO-1",
  priority: "4-STANDARD",
  serviceCategory: "Plumbing",
  address: "123 Main",
  unit: "",
  description: "Leak",
  scheduledDate: "",
  scheduledTime: "",
  estimatedHours: 2,
  status: "Ready to Schedule",
  rmName: "",
  rmEmail: "",
  accessInfo: "",
  tenantName: "",
  tenantPhone: "",
  tenantEmail: "",
  assignedTech: "",
  notes: "",
  gmailMsgId: "",
  timestamp: "",
  clockedInAt: null,
  activeRecordId: null,
};

describe("DispatchTimelineBoard Phase 22 date scheduling", () => {
  it("writes the selected dispatch date into scheduled job updates", () => {
    const updatedJob = buildScheduledJobUpdate({
      job: baseJob,
      assignedTechs: ["Sam Tech"],
      startTime: "10:00",
      estimatedHours: 3,
      date: "2026-06-25",
    });

    expect(updatedJob.status).toBe("Scheduled");
    expect(updatedJob.assignedTech).toBe("Sam Tech");
    expect(updatedJob.scheduledTime).toBe("10:00");
    expect(updatedJob.estimatedHours).toBe(3);
    expect(updatedJob.scheduledDate).toBe("2026-06-25");
  });
});
