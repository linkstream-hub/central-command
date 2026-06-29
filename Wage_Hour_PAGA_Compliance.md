Here is the expert-grade software specification designed specifically for the development agents building APT Maintenance’s timekeeping application. This spec operationalizes California’s strict wage, hour, and PAGA compliance mandates into concrete UI/UX and backend requirements to make APT’s records legally bulletproof.

### **Product Specification: APT Maintenance CA-Compliant Timekeeping App**

**Objective:** To build a closed-loop timekeeping system for hourly/non-exempt workers that guarantees minute-by-minute accuracy, actively rebuts the judicial presumption of employer fault for missed/short breaks, and prevents systemic PAGA (Private Attorneys General Act) penalty stacking.

---

#### **1. Core Time Capture Architecture (The "No Rounding" Mandate)**
The California Supreme Court (*Donohue v. AMN Services, LLC*) has explicitly banned the practice of rounding time punches, particularly for meal periods.
*   **Rule 1.1: Exact Minute Tracking:** The system must record all punches to the exact, to-the-minute start and stop times. Any auto-rounding logic (e.g., rounding 12:03 to 12:00) must be permanently disabled.
*   **Rule 1.2: Mandatory Punch Events:** The UI must require four distinct daily punches for a standard shift: (1) Shift Start, (2) Meal Period Start, (3) Meal Period End, and (4) Shift End.
*   **Rule 1.3: Location Services (Geofencing):** The app should capture the specific location at the exact moment of clock-in and clock-out to verify the employee is physically present at the assigned job site, but it must **not** utilize continuous real-time GPS monitoring during the shift, aligning with APT's Location Tracking Policy.

---

#### **2. Meal Period Logic & Defensive Attestation**
California law requires an uninterrupted, duty-free 30-minute meal period before the end of the employee's 5th hour of work. If a timecard shows a meal period that is missed, short (<30 mins), or late (starts after the 5th hour), the court automatically presumes the employer violated the law.
*   **Rule 2.1: The 5th Hour Warning:** The app must generate a push notification/alert to the employee and their supervisor at the 4.5-hour mark if the employee has not yet clocked out for lunch. 
*   **Rule 2.2: The "Short Break" Lockout:** If an employee attempts to clock back in from a meal period before exactly 30 minutes have elapsed, the system must display a warning: *"You have not completed your full 30-minute meal period. Are you sure you want to return to work early?"*.
*   **Rule 2.3: End-of-Day Attestation (CRITICAL):** Upon clocking out for the day, the system must present a mandatory electronic attestation prompt.
    *   **Prompt:** *"Were you provided the opportunity to take your full, uninterrupted 30-minute meal break today?"*
    *   **If YES:** Save record.
    *   **If NO or if the system detects a short/late/missed break:** The app must force the employee to select a reason code.
        *   *Option A (Employee Initiated):* "I voluntarily chose to skip, shorten, or delay my meal period, and was not required to do so by APT." (This documents the legal defense to rebut the penalty).
        *   *Option B (Employer Initiated):* "I was too busy, management interrupted me, or I was unable to take my break." (This flags the system that a premium must be paid).

---

#### **3. Rest & Recovery Period Compliance**
Rest and recovery periods are paid time, meaning employees do not punch out for them. However, employers still face immense PAGA liability if they cannot prove the breaks were authorized and permitted.
*   **Rule 3.1: Rest Break Entitlement UI:** The dashboard should display the employee's earned rest breaks for the day based on hours worked (10 net minutes per 4 hours or major fraction). 
*   **Rule 3.2: Recovery Break Button:** Because APT Maintenance employees may perform physical or outdoor labor, the app must include a specific **"Take Recovery Break"** button. This tracks 5+ minute cool-down periods required by Cal/OSHA heat illness standards. Failure to provide a requested recovery break triggers the same wage penalty as a missed lunch.
*   **Rule 3.3: Rest & Recovery Attestation:** Included in the end-of-day clock-out flow, the app must ask: *"Were you authorized and permitted to take all of your 10-minute rest periods and any necessary cool-down recovery periods today?"*. If the employee selects "No," they must explain why, flagging the supervisor for intervention.

---

#### **4. Premium Pay Triggers & Backend Payload**
To avoid stacking penalties under Labor Code § 226 (Wage Statements) and § 203 (Waiting Time), the app must feed exact penalty data to payroll.
*   **Rule 4.1: The LC § 226.7 Premium Trigger:** If the daily attestation yields an "Employer Initiated" violation for a meal period, OR a rest/recovery period, the app must automatically append a **"Premium Pay Flag"** to the day's record.
*   **Rule 4.2: Maximum Daily Premiums:** The logic must cap automated break premiums at two (2) hours per workday: a maximum of one hour for a meal period violation, and a maximum of one hour for any combined rest/recovery period violations.
*   **Rule 4.3: RROP Identification:** The system must tag these premiums to be paid at the employee's "Regular Rate of Pay" (RROP), which includes all non-discretionary bonuses and differentials, not just their base hourly rate (per the *Ferra* decision).

---

#### **5. Exception Handling: Missed Punches & Manual Adjustments**
Employees occasionally forget to clock in or out. How these errors are corrected is highly scrutinized in litigation.
*   **Rule 5.1: No Unilateral Supervisor Edits:** Supervisors must not be able to alter an employee's time punch without a digital paper trail.
*   **Rule 5.2: Dual-Approval Workflow:** If an employee misses a punch and requests a manual adjustment, the workflow must require **digital sign-off from both the employee and the HR Administrator/Supervisor**. 
*   **Rule 5.3: Attestation on Correction:** When an employee approves a manually corrected timecard, they must be prompted to sign an electronic statement: *"I certify that this adjusted time record accurately reflects all hours I worked and that I performed no off-the-clock work."*.

By strictly adhering to this spec, the development team will deliver an application that not only tracks time but acts as a dynamic shield against California's strictest wage/hour vulnerabilities.