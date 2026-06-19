# APT WAGE, HOUR & PAGA COMPLIANCE BLUEPRINT
**Status**: ARCHITECTURAL BACKBONE (Non-Negotiable Guardrails)
**Application**: All Timekeeping, Payroll, and HR Modules

This document defines the strict liability standards and automated workflows required to ensure APT Maintenance, Inc. meets and exceeds California’s legal obligations.

---

## PART 1: WAGE, HOUR & PAGA AUTOMATED GUARDRAILS

### 1. Timekeeping & Break Automation
*   **Zero Rounding Policy**: The system MUST record clock-ins and clock-outs to the exact minute. Rounding (e.g., 12:03 to 12:00) is strictly prohibited (Donohue v. AMN Services).
*   **Automated Net-Time Triggers**:
    *   **Rest Periods**: net 10-minute paid rest period for every 4 hours worked.
    *   **First Meal Period**: Flag if 30-min duty-free meal period does not begin BEFORE the end of the 5th hour.
    *   **Second Meal Period**: Flag if second 30-min meal period does not begin BEFORE the end of the 10th hour.
*   **Daily Attestation Checkpoint**: Mandatory electronic prompt at clock-out: *"Were you provided the opportunity to take your full, uninterrupted 30-minute meal break and all required rest/recovery breaks today?"*
    *   **IF NO**: Prompt for reason. If "Manager interrupted/Too busy," automatically trigger a **1-hour wage premium request**.

### 2. The Regular Rate of Pay (RROP) Engine
*   **Ferra Doctrine Calculation**: Missed break premiums must be paid at the **Regular Rate of Pay** (weighted average including bonuses/commissions), not the base hourly rate.
*   **Weighted Average Logic**: Payroll engine must factor in all non-discretionary compensation (bonuses, differentials) for that specific workweek.
*   **Retroactive True-Ups**: Quarterly/Annual bonuses must trigger an automated retroactive recalculation of all overtime and premiums paid during that period.

### 3. Itemized Wage Statement (Paystub) Generator (LC § 226)
Statements must strictly itemize:
1. Gross wages earned.
2. Total hours worked.
3. All deductions.
4. Net wages earned.
5. Inclusive dates of pay period.
6. Employee name + Last 4 SSN/Employee ID.
7. Employer Name: **APT Maintenance Inc.** (Full Legal Address).
8. All applicable hourly rates (Base, OT, Double-Time) and corresponding hours for each.

### 4. PAGA Defense & 15% Penalty Cap (AB 2288)
*   **Compliance Audit Log**: Build a system-level log that routinely scans timecards for missed breaks and RROP accuracy.
*   **Evidence Generation**: The log serves as the required proof of "reasonable steps to comply" to activate the 15% penalty exposure cap.

---

## PART 2: SYSTEMATIC HR WORKFLOWS

### 1. FEHA Disability/Medical Accommodation Workflow
*   **Trigger**: Initiated by accommodation request, doctor’s note, or statutory leave exhaustion.
*   **Interactive Process Module**:
    1. **Initial Contact**: Auto-acknowledge and schedule meeting.
    2. **Physician Clarification**: Auto-generate "Physician Clarification Questionnaire" for restrictions/functional impacts (NOT diagnosis).
    3. **Meeting Log**: Require documentation of restrictions, alternatives considered, and rejection/acceptance rationale.
    4. **Check-ins**: Calendar triggers for HR at 15, 30, and 60-day intervals to verify accommodation effectiveness.

### 2. Harassment/Discrimination Investigation Tracker
*   **"INVEST" File Requirement**:
    *   Document allegations, interview dates (Complainant, Witness, Accused), and document reviews.
    *   **Findings Memo**: Formal Conclusion categorized as Substantiated, Unsubstantiated, or Inconclusive.
    *   **Closeout**: Formalized letter + scheduled 30/60-day follow-up to ensure no retaliation.

### 3. Leave Stacking Logic
*   **PDL vs. CFRA**: System must separate Pregnancy Disability Leave (up to 4 months) from California Family Rights Act (12 weeks bonding). 
*   **Sequential Allocation**: CFRA Bonding leave "unlocks" ONLY after PDL expires.
*   **Paid Sick Leave (PSL)**: Track up to 40h/5d per year; Accrual cap no less than 80h/10d.

---

## PART 3: SEPARATION AND FINAL PAY

### 1. Termination Timing Logic (LC § 203)
*   **Involuntary (Discharge)**: Final pay delivered **immediately** at time of discharge.
*   **Resignation (>72h notice)**: Final pay generated for their last day.
*   **Resignation (<72h notice)**: Final pay generated within exactly 72 hours.
*   **Payout Requirement**: Must include ALL unused, accrued PTO/Vacation.
*   **Alert**: Warn management of "Waiting Time Penalties" (daily wage for up to 30 days) for missed deadlines.
