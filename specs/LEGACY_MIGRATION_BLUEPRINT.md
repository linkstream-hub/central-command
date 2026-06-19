# Master Legacy Migration Blueprint

## 1. Executive Summary
The goal of this migration is to systematically transition the legacy **APT Maintenance** system—currently operating on Google Apps Script (GAS) and Google Sheets—to a modern, scalable, professional-grade infrastructure built with **Next.js** and **Neon PostgreSQL**.

This blueprint serves as the single source of truth for mapping legacy business logic, data models, and operational workflows into the new architecture, allowing a phase-based migration without disrupting core business operations.

## 2. Source of Truth: Legacy Architecture
The current system relies on a collection of Google Apps Script files and Google Sheets acting as a pseudo-database.

### 2.1 Core Scripts
*   **`TechPWA.gs`:** 
    *   *Purpose:* Backend for the mobile PWA used by technicians.
    *   *Functions:* Token-based authentication, clocking in/out/breaks, job completion status, and receipt uploads.
    *   *Data Interaction:* Reads/writes to `Tech Roster`, `Dispatch Queue`, and `Time Records` sheets. Webhook triggers for compliance events.
*   **`DashboardAPI.gs`:** 
    *   *Purpose:* Backend for the "Central Command" Next.js dashboard.
    *   *Functions:* API gateway with API key authentication. Handles dispatch management, scheduling, compliance reporting, and job history.
*   **`Code.js`:** 
    *   *Purpose:* The main automation brain (intake & routing).
    *   *Functions:* Live polling loop for incoming emails (Leads). Uses the Gemini API to parse work orders into structured data. Identifies properties, checks for duplicates, and routes work orders to the `Dispatch Queue`.

### 2.2 Data Layer (Google Sheets)
*   `Leads`: Raw intake data.
*   `Dispatch Queue`: Active jobs, schedules, and technician assignments.
*   `Time Records`: Clock punches, break logging, and compliance tracking.
*   `Master Directory`: Property information, tech roster, and configuration.

### 2.3 External Integrations
*   **Gmail API:** Lead ingestion.
*   **Gemini API:** AI parsing of work order emails.
*   **N8N:** Webhook execution for external compliance/reporting.

## 3. Target Architecture
*   **Framework:** Next.js (App Router, Server Actions, API Routes).
*   **Database:** Neon serverless PostgreSQL.
*   **ORM:** Drizzle ORM (assumed based on standard PTOW modern stack).
*   **Authentication:** 
    *   Techs: PIN hashing (migrate to secure bcrypt/session tokens).
    *   System: API Keys / JWT.

## 4. Schema Mapping (Sheets to Postgres)
*This is a preliminary mapping to drive the initial Drizzle schema creation.*

### 4.1 `Techs` (from Master Directory / Tech Roster)
*   `id` (UUID, PK)
*   `name` (String)
*   `pin_hash` (String) - *For authentication*
*   `phone` (String)
*   `status` (Enum: ACTIVE, INACTIVE)
*   `created_at` / `updated_at` (Timestamps)

### 4.2 `Properties` (from Master Directory)
*   `id` (UUID, PK)
*   `name` (String)
*   `address` (String)
*   `client_id` (UUID, FK - optional if clients are separated)
*   `notes` (Text)

### 4.3 `Jobs` (from Leads / Dispatch Queue)
*   `id` (UUID, PK)
*   `property_id` (UUID, FK -> Properties)
*   `assigned_tech_id` (UUID, FK -> Techs, nullable)
*   `status` (Enum: PENDING, ASSIGNED, EN_ROUTE, IN_PROGRESS, COMPLETED, CANCELLED)
*   `description` (Text)
*   `scheduled_time` (Timestamp)
*   `created_at` / `updated_at` (Timestamps)

### 4.4 `TimeRecords` (from Time Records)
*   `id` (UUID, PK)
*   `tech_id` (UUID, FK -> Techs)
*   `job_id` (UUID, FK -> Jobs, nullable)
*   `event_type` (Enum: CLOCK_IN, CLOCK_OUT, BREAK_START, BREAK_END)
*   `timestamp` (Timestamp)
*   `location` (String/JSON - Lat/Long if tracked)

## 5. Compliance Rules Engine
The system enforces strict California labor compliance thresholds. The new backend must replicate and monitor these:
*   **Rest Break:** Required at 4 hours of continuous work.
*   **Meal Break:** Required at 5 hours of continuous work.
*   **2nd Meal Break:** Required at 9.5 hours of continuous work.
*   *Implementation:* Background job or trigger checking `TimeRecords` to flag violations or notify technicians.

## 6. Migration Priorities & Phased Execution

### Phase 1: Foundation & Tech Authentication (Proof of Concept)
*   **Goal:** Stand up the Neon DB, Drizzle schema, and migrate the Tech authentication flow (`TechPWA.gs` login).
*   **Tasks:** 
    1. Define Drizzle `schema.ts`.
    2. Run migrations (`drizzle-kit push`).
    3. Export current Techs from Sheets and seed the Postgres DB.
    4. Build Next.js API route for Tech Login.

### Phase 2: Time Clocking & Compliance
*   **Goal:** Migrate `TimeRecords` logic from `TechPWA.gs`.
*   **Tasks:**
    1. Build API endpoints for clock-in/out and breaks.
    2. Implement CA compliance rule checks on the server.
    3. Update Tech PWA frontend to hit the new Next.js APIs instead of GAS.

### Phase 3: Dispatch & Scheduling (Dashboard)
*   **Goal:** Migrate `DashboardAPI.gs` to Next.js API routes.
*   **Tasks:**
    1. Seed `Jobs` and `Properties` from Sheets.
    2. Build CRUD endpoints for the dashboard.
    3. Update the Central Command dashboard to fetch from Neon.

### Phase 4: Intake & AI Parsing (The Brain)
*   **Goal:** Migrate `Code.js` automation.
*   **Tasks:**
    1. Set up a Next.js cron job or webhook listener for Gmail intake.
    2. Port the Gemini API parsing logic into a Next.js serverless function.
    3. Directly insert parsed leads into the Neon `Jobs` table.

---
**Status:** DRAFT
**Next Immediate Action:** Finalize `schema.ts` based on Phase 1 goals and initialize the database.
