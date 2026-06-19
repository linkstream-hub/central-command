# Context: Neon Migration

## Core Goal
Migrate the primary database from Google Sheets to Neon Postgres with zero downtime, using a strict shadow-write and dual-read validation strategy. Production must not break during cutover.

## Explicit Decisions & Requirements
1. **No Blind Cutover:** Google Sheets remains the source of truth until Neon is proven 100% reliable via data diffs.
2. **Phase Matrix Strategy:** We migrate tables one by one, from lowest risk to highest risk:
   - `job_comments` (Low risk)
   - `time_records` (Medium risk)
   - `techs` (Medium risk)
   - `jobs` (Highest risk - Dispatch queue)
3. **Shadow-Write Pattern:** For each table, the API must write to Google Sheets (Primary) AND Neon Postgres (Shadow).
4. **Resiliency:** If a Neon write fails, the system must log the error but *succeed the API call*. A shadow-write failure must never crash the primary Sheets dispatch loop.
5. **Nyquist Audit:** Before any table cuts over, we must run a dual-read diff script after 3 days of shadow writing. If row counts and shapes match 100%, we advance to cutover.
6. **Cutover Protocol:** Change Read Path to Neon Postgres, and set Sheets to Read-Only.

## Next Step for Planner
Update ROADMAP.md and REQUIREMENTS.md with these goals. Generate a rigorous PLAN.md that enforces these 6 explicit decisions.
