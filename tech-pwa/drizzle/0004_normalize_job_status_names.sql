-- Normalize legacy GAS status names to canonical values used by the frontend.
-- Code.js previously wrote "PTE-Pending" and "Approval Needed".
-- Frontend filters, tab counts, and transitions all use "PTE Required" / "Awaiting Approval".
UPDATE "jobs" SET "status" = 'PTE Required'      WHERE "status" = 'PTE-Pending';
UPDATE "jobs" SET "status" = 'Awaiting Approval' WHERE "status" = 'Approval Needed';
