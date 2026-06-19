# Central Command 2.0 — Dispatcher Guide
**For the Dispatch Role | Plain English | Last updated: April 2026**

---

## What Is Central Command 2.0?

Central Command 2.0 (CC2.0) is the one place where all maintenance work lives — from the moment a job comes in by email, all the way through to the tech completing it in the field.

Before this system, jobs were tracked in spreadsheets, Buildertrend, sticky notes, and memory. That meant things fell through the cracks. Now everything is in one place, and the system does a lot of the heavy lifting automatically.

As the dispatcher, you are the center of the whole operation. You are the one who takes jobs from "just came in" to "tech is on the way." The system is built around making your job faster and easier.

---

## How to Get In

Go to: **https://central-command-pi.vercel.app**

Enter your passcode and choose **Dispatch** as your role.

You will land on the main **Live** page. This is your home base.

---

## The Job Queue — Your Main Screen

The job queue is a live list of every active maintenance job. Think of it like your inbox, but smarter.

At the top, you will see quick-count boxes:
- **Urgent** — jobs marked high priority. These need attention first.
- **Needs Action** — new jobs that haven't been triaged yet.
- **PTE Pending** — jobs that are waiting on tenant permission to enter the unit.

Below that is the full job list. You can filter it by status using the tabs:

| Tab | What it shows |
|-----|--------------|
| **NEW** | Jobs that just came in. You need to review these and decide what to do next. |
| **READY TO SCHEDULE** | Jobs that are cleared — no blockers. These are your main action list. |
| **PTE REQUIRED** | Jobs waiting on tenant permission. You need to reach out to the tenant. |
| **SCHEDULED** | Jobs that have a tech and a date. Just monitor these. |
| **COMPLETE** | Done jobs. For your records. |

**Your default view should be READY TO SCHEDULE.** That is where the action is most days.

---

## The Job Cards — What You're Looking At

Each row in the queue is one job. Here is what the key information means:

- **Priority** — 1 is most urgent (like a leak or no heat). 4 is standard work.
- **Type badge** — tells you if it came in as a work order, a turnover, or an inspection.
- **Age badge** — if a job has been sitting in NEW status for more than 24 hours, it gets an orange timer badge. Over 48 hours, it turns red and says STALE. This is your early warning system.
- **Address + Unit** — where the job is.
- **Status** — where the job is in the process.

Click anywhere on a row to open the full job details.

---

## Inside a Job — The Detail Panel

When you click a job, a panel opens on the right side of the screen. This is where you do most of your work.

The panel has four phases, shown as tabs at the top:

### 1. COORDINATION
This is the job overview. You will see:
- The full description of what needs to be done
- Tenant name, phone, and email
- Property manager name and email
- Property access information (lockbox codes, gate codes, etc.)

If you see something wrong here — a wrong address, wrong tenant name — you can correct it using **Edit Mode**. Just click the Edit button at the top right of the panel.

If a job needs tenant permission before the tech can enter (PTE), there is a **Contact Tenant** button right here. One click sends a professional email asking for permission. No copy-pasting.

### 2. DISPATCH
This is where you assign a tech and schedule the job.

You will see:
- A dropdown to choose which tech to assign
- A date and time picker to set when the job happens
- Estimated hours for the job
- A **Suggest Techs** button — this is a big deal (more on this below)

**Trainee warning:** If you pick a tech who is a Trainee, the system will show a yellow warning reminding you that trainees cannot work alone. They need to go out with a Captain or Lieutenant. This is the law, and the system will catch it for you.

Once you set the tech and the date, click **Save**. The job status automatically moves to **Scheduled**. The tech will see it in their mobile app immediately.

### 3. EXECUTION
This phase is active when the tech is on-site doing the work.

You can see:
- Job status in real time
- An **Expand Scope** button — if the tech calls you from the site and says "there is more going on here than we thought," you can use this to:
  - Write notes about the additional work
  - Add more hours to the job (hit +1h, +2h, +4h, or +8h)
  - Reassign to a different tech if needed

Everything you enter here is saved with a timestamp in the job notes. No separate email chain needed.

### 4. POST-JOB
After the job is done, this phase shows completion notes and a link to the Gmail thread related to the job.

---

## Suggest Techs — The Smart Matching Tool

When you are in the DISPATCH phase, hit the **Suggest Techs** button. The system will look at all your active techs and rank them based on:

1. **Skills** — does this tech have the right trade skills for this type of job?
2. **Availability** — how many jobs do they already have this week?
3. **History** — have they worked at this property before? Familiar techs get a bump because they know the access codes and layout.

This does not make the decision for you. You still choose. But it gives you a strong starting point and saves you from having to think through everyone's schedule in your head.

---

## The Live Tech Panel — Where Are My Techs Right Now?

On the Live page, look for the **Tech Availability** panel. It shows you every active tech and their current status:

| Status | What it means |
|--------|--------------|
| **Available** | Just finished a job. Ready for the next one. |
| **Active** | Clocked in and working. |
| **On Break** | On a scheduled break. |
| **Unassigned** | Not clocked in. No active job. |

This panel refreshes automatically every 60 seconds. You can also hit the refresh button to get an instant update.

---

## The Scheduling Grid

Go to the **Schedule** page to see a full week view of what every tech has going on.

- You can drag and drop jobs from the **Ready to Schedule** sidebar onto a tech's day.
- You can drag a job that is already on the grid to a different tech or day.
- You can jump forward up to 12 months to plan ahead.
- Use the month buttons across the top to jump ahead quickly without clicking the forward arrow over and over.
- Each tech shows how many hours they have scheduled that week so you do not overload anyone.

When you drop a job onto the grid, a small window pops up asking how long the job will take and what time it starts. The system will not let you save a job with 0 hours. It defaults to 4 hours when in doubt.

---

## The Tech Mobile App — How It Connects to Your Work

The field techs use a mobile app on their phones. Here is how it connects to what you do:

**What you do → what the tech sees:**
- You assign a tech and save a job → they see the job appear in their app right away.
- You set a scheduled date and time → they see that in the job detail.
- You enter access notes (lockbox code, gate code) → they see that in the app when they get there.

**What the tech does → what you see:**
- Tech clocks in at the job → the job status updates in CC2.0.
- Tech marks the job complete → it moves to Complete in your queue automatically.
- Tech flags an issue → a note is added to the job in your queue.
- Tech uploads before/after photos → those are attached to the job record.

**Why this matters:** Every time a tech completes a job, the system records how long it actually took vs. how long we estimated. Over time, this makes the estimated hours in the system more accurate. Eventually, when a similar job comes in, the system already knows roughly how long it should take. You do not have to guess.

---

## Testing the Tech App — We Need Your Help

The tech app is built and ready. Before we roll it out to all 28 techs, we need to test it with a few jobs to make sure everything is working perfectly end-to-end.

Here is what that means for you:
- Assign a job through CC2.0 like normal.
- The test tech uses the app to clock in, do the work, and mark it complete.
- You check that the job updated correctly in your queue.

If something does not look right — the status did not update, the hours look wrong, anything — that is exactly the kind of feedback we need. We will fix it before the full rollout.

The goal is: every tech off Buildertrend and onto the app. That happens once we know the system is solid. Your observations during testing are critical.

---

## Why This System Gets Smarter Over Time

Every action you take in CC2.0 teaches the system something:

| Action | What it teaches |
|--------|----------------|
| Assign a specific tech to a job type | System learns which techs are best for which trades |
| A tech completes a job faster than estimated | System adjusts future estimates for that job type |
| You flag a staleness issue (job sat too long) | System surfaces those jobs automatically next time |
| You note access info when correcting a property | That info is saved to the Master Directory for all future jobs at that address |
| You use Expand Scope to add hours | System records actual job complexity for future reference |

The more you use CC2.0 instead of a spreadsheet or Buildertrend, the better the data gets. Spreadsheets do not learn. This system does.

**Buildertrend:** The company is in the process of moving completely off Buildertrend. The tech app replaces it for field use. CC2.0 replaces it for dispatch. You do not need to enter anything there anymore.

**The old scheduling spreadsheet:** Also being retired. CC2.0 is now the only place where schedules are set and tracked. If you have been using that spreadsheet, you can stop. Everything you need is here.

---

## Common Workflows — Step by Step

### A new job comes in
1. It will appear automatically in your **NEW** tab. (The system reads incoming emails and creates the job card.)
2. Open the job, review the details.
3. If it needs tenant permission first → click **Contact Tenant** in the COORDINATION tab.
4. If it is ready to go → click **Mark Ready** (button right on the row, no need to open the modal).
5. It moves to **READY TO SCHEDULE**.

### Scheduling a job
1. Go to the **READY TO SCHEDULE** tab.
2. Click the job to open it.
3. Go to the **DISPATCH** tab.
4. Hit **Suggest Techs** to get a ranked recommendation.
5. Pick a tech, set the date and time, set estimated hours.
6. Click **Save**. Done. The tech sees it in their app.

### A job gets bigger on-site
1. Tech calls you. There is a leak behind the wall, they found more work.
2. Open the job in CC2.0.
3. Go to the **EXECUTION** tab.
4. Click **Expand Scope**.
5. Write what was found, add hours if needed.
6. Click **Save Expansion**. The job record is updated with a timestamp.

### Archiving a job
1. Open the job.
2. Scroll to the bottom of the panel.
3. Click **Archive Job**.
4. A second button appears to confirm. Click it.
5. Job is archived and removed from the active queue.

---

## Quick Tips

- **One system, one truth.** If it is not in CC2.0, it does not exist for the rest of the team.
- **The age badge is your friend.** If you see a red STALE badge, that job needs attention today.
- **You can search and filter.** Use the search bar at the top to find a job by address, tenant name, or anything else.
- **The system sends tenant emails automatically** once you schedule a job (when that feature is turned on). You will not need to send a separate notification email.
- **Nothing gets deleted.** Archived jobs are still there if you need to find them. Use the Complete tab or look for an archive toggle.

---

## Your Feedback Matters — Use the Feedback Panel

Inside CC2.0, there is a **Feedback** section in the sidebar. This is a direct line to the team that builds and improves the system.

Use it to:
- Report something that is not working right
- Suggest a feature that would make your job easier
- Leave a note about a workflow that feels awkward
- Ask a question about how something is supposed to work

**Your feedback is not just collected — it is reviewed before every system improvement.** The developers look at dispatcher feedback before deciding what to build next. The more specific you are, the more useful it is.

You do not need to send an email or text anyone. Just type it in and submit.

---

*Central Command 2.0 — APT Maintenance Inc.*
*Questions about the system? Use the Feedback panel inside CC2.0.*
