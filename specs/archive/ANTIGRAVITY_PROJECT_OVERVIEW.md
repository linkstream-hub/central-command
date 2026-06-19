# APT Central Command: Capabilities & Roadmap

APT Central Command has been transformed from a manual dispatch dashboard into an **Autonomous "Autopilot" Control Center**. The goal is to move from "Managing Data" to "Managing Exceptions."

---

## 1. Current Capabilities (The Foundation)

### 🛰️ Autopilot Intake (Zero-Effort)
*   **Gemini-Powered Parsing**: Incoming work orders (Email/SMS) are automatically parsed into structured data. No manual data entry is required.
*   **Smart Categorization**: The system automatically identifies Job Types (Turnovers, Repairs, Inspections) and Urgency without human input.

### 🎯 Data-Driven Dispatch (Triage-Free)
*   **Objective Queueing**: The dashboard filters jobs based on **Ready State** (PTE Granted or Turnover) rather than when a person "looks" at it.
*   **Ready to Schedule**: All actionable jobs are surfaced instantly for technician assignment.
*   **Coordination Needed**: Specifically isolates jobs that are blocked (Missing PTE) so dispatch only focuses on unblocking work.

### 🛡️ Compliance Sentinel (PAGA Mitigation)
*   **Real-time PWA Sync**: Receives live data from the field technician's mobile device regarding clock-ins, breaks, and meals.
*   **Violation Detection**: Automatically flags CA labor law risks (e.g., missed 5th-hour meals) for management review.
*   **Unified Roster**: A live view of who is on a job, on a break, or clocked out across the entire team.

### 🔍 Master Work Order Archive
*   **High-Density History**: A searchable repository of every work order ever processed.
*   **Multi-Pivot Search**: Lookup jobs by Address, Technician, Lead ID, or Requester (Resident Manager).

---

## 2. Technical Roadmap (The Future)

### 📍 Phase 1: Location & Geofencing
*   **Proximity Validation**: Ensuring technicians are physically at the property before they can "Clock In."
*   **Distance Tracking**: Calculating "ETA to Next Job" based on live GPS trajectories of technicians.

### ✉️ Phase 2: Autonomous Compliance Alerts
*   **Pre-emptive SMS**: The system will automatically text technicians (via OpenPhone/SMS) reminders to take their rest breaks *before* the 5th hour is reached.
*   **Smart Conflict Resolution**: Notifying dispatch if a tech's current job location suggests they won't make their next appointment on time.

### 📄 Phase 3: AE_DocGen Integration (Power Core)
*   **Automated Quoting**: One-click generation of professional PDF estimates and work order approvals using the centralized "Brain" templates.
*   **Tenant Live Tracker**: A "Domino's Style" tracking link for tenants to see their technician's progress and ETA.

### 🤖 Phase 4: Full-Cycle Automation
*   **Auto-Assign**: AI assignment of non-urgent jobs to the most qualified/nearest technician without dispatcher intervention.
*   **Photo QA Analysis**: AI scanning of "Before/After" photos to automatically verify repair quality and mark jobs as complete.

---
> [!NOTE]
> **Philosophy**: Central Command is being built to be "Invisible." It should handle 90% of operations automatically, surfacing only the conflicts and compliance risks that require a human decision.
