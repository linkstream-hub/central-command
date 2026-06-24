import { describe, expect, it } from "vitest";

import { KANBAN_COLUMNS } from "../KanbanBoard";

describe("KanbanBoard Phase 22 scope", () => {
  it("only shows triage statuses", () => {
    const statuses = KANBAN_COLUMNS.map((column) => column.id);

    expect(statuses).toEqual([
      "Needs Review",
      "PTE Required",
      "Ready to Schedule",
    ]);
    expect(statuses).not.toContain("Scheduled");
    expect(statuses).not.toContain("Complete");
  });
});
