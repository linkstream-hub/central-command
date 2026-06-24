import { describe, expect, it } from "vitest";

import {
  COMM_STAKEHOLDER_TABS,
  DISPATCH_NOTES_LABEL,
  STATUS_OPTIONS,
  TECH_CONTACT_SUMMARY,
  WORK_ORDER_CONTEXT_ENABLED,
} from "../JobDetailModal";

describe("JobDetailModal Phase 22 labels", () => {
  it("uses field/internal stakeholder labels", () => {
    expect(COMM_STAKEHOLDER_TABS.map((tab) => tab.label)).toEqual([
      "REQUESTER",
      "TENANT",
      "FIELD",
      "INTERNAL",
    ]);
  });

  it("uses the field assignment summary", () => {
    expect(TECH_CONTACT_SUMMARY).toBe("Field assignment + status");
  });

  it("limits status overrides to triage statuses", () => {
    expect(STATUS_OPTIONS).toEqual([
      "Needs Review",
      "Ready to Schedule",
      "PTE Required",
      "Awaiting Approval",
      "Scheduled",
    ]);
    expect(STATUS_OPTIONS).not.toContain("In Progress");
    expect(STATUS_OPTIONS).not.toContain("Complete");
    expect(STATUS_OPTIONS).not.toContain("Archived");
  });

  it("uses tech instructions instead of dispatch notes", () => {
    expect(DISPATCH_NOTES_LABEL).toBe("Tech Instructions");
  });

  it("does not render the static work order context block", () => {
    expect(WORK_ORDER_CONTEXT_ENABLED).toBe(false);
  });
});
