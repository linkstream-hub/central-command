import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useSearchParams: () => null,
}));

vi.mock("@/components/dashboard/DashboardLayout", () => ({
  default: ({ children }: { children: unknown }) => children,
}));

vi.mock("@/components/dashboard/DispatchTimelineBoard", () => ({
  default: () => null,
}));

vi.mock("@/components/dashboard/KanbanBoard", () => ({
  default: () => null,
}));

vi.mock("@/components/dashboard/JobQueueTable", () => ({
  default: () => null,
}));

vi.mock("@/components/dashboard/ActivityFeed", () => ({
  default: () => null,
}));

vi.mock("@/components/dashboard/JobDetailModal", () => ({
  default: () => null,
}));

import {
  DEFAULT_WORKSPACE_VIEW,
  getAdjacentIsoDate,
  getTodayIsoDate,
} from "../page";

describe("LivePage Phase 22 behavior", () => {
  const source = readFileSync(new URL("../page.tsx", import.meta.url), "utf8");

  it("does not wire lock/send or confirmation artifacts", () => {
    expect(source).not.toContain("LockSendButton");
    expect(source).not.toContain("ConfirmationScreen");
    expect(source).not.toContain("confirmationData");
  });

  it("opens on the triage workspace", () => {
    expect(DEFAULT_WORKSPACE_VIEW).toBe("triage");
    expect(source).toContain('useState<WorkspaceView>(DEFAULT_WORKSPACE_VIEW)');
  });

  it("uses ISO dates for dispatch navigation", () => {
    expect(getTodayIsoDate()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(getAdjacentIsoDate("2026-06-24", 1)).toBe("2026-06-25");
    expect(getAdjacentIsoDate("2026-06-24", -1)).toBe("2026-06-23");
    expect(source).toContain("selectedDate");
    expect(source).toContain("date={selectedDate}");
  });
});
