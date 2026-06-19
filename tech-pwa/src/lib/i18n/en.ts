export const en = {
  // App
  loading: "Establishing Secure Link...",

  // Greetings
  good_morning: "Good morning",
  good_afternoon: "Good afternoon",
  good_evening: "Good evening",

  // Jobs page
  jobs_today_one: "Job Today",
  jobs_today_other: "Jobs Today",
  no_jobs_today: "No jobs assigned today",
  no_jobs_contact: "Pull to refresh or contact dispatch if you expected work.",
  offline: "Offline",
  events_pending_sync: "events pending sync",

  // Priority labels
  priority_urgent: "URGENT",
  priority_turnover: "TURNOVER",
  priority_pte: "PTE",
  priority_standard: "STANDARD",

  // Job detail — status
  shift_not_started: "Shift Not Started",
  shift_active: "Shift Active",
  rest_period: "Start Break",
  session_ended: "Session Ended",
  service_pending: "Service Pending",
  clock_in_label: "In:",
  break_label: "Break:",

  // Compliance warnings
  rest_break_reminder: "Reminder: You're due for a 10-minute rest break.",
  meal_break_required: "Meal break required: CA law requires a 30-min unpaid meal break for shifts over 5 hours.",
  second_meal_break: "Second meal break required for shifts over 10 hours.",

  // Location
  locking_position: "Locking Position...",
  location_unavailable: "Location Detached (GPS Unavailable)",

  // Toasts
  toast_clocked_in: "Clocked In",
  toast_break_started: "Break Started",
  toast_break_ended: "Break Ended",
  toast_clocked_out: "Clocked Out",
  toast_shift_required: "Shift activation required to view job details",
  toast_flag_success: "Issue flagged — dispatch notified",
  toast_time_off_success: "Time off request submitted",
  toast_time_off_error: "Submission failed — try again",
  toast_error_start_shift: "Failed to start shift — try again",

  // Navigation
  nav_hours: "Hours",

  // Error states
  fetch_error: "Could not reach server",
  btn_retry: "Try again",

  // Job detail — sections
  section_contact: "Point of Contact",
  section_scope: "Scope of Work",
  section_docs: "Documentation",

  // Job detail — tenant
  tenant_not_listed: "Tenant Not Listed",
  no_access_info: "No access info provided by dispatch.",

  // Action buttons
  btn_start_shift: "Start Shift",
  btn_clock_in: "Initialize Clock In",
  btn_clock_in_loading: "Initializing...",
  btn_rest: "Start Break",
  btn_end_shift: "End Shift",
  btn_mark_complete: "Mark as Complete",
  btn_resume: "Resume Work",
  btn_verified_complete: "Verified Complete",

  // Flag issue
  flag_title: "Flag an Issue",
  flag_subtitle: "Notify Robert immediately",
  flag_placeholder: "Locked out, tenant denial, part needed...",
  btn_flag_submit: "Submit Flag",
  btn_flag_loading: "Sending Alert...",

  // Job completion
  job_complete: "Job Complete",
  excellent_work: "Excellent work.",

  // Attestation
  attestation_title: "Confirm Your Time",
  attestation_subtitle: "Legal Attestation Required",
  attestation_text: "I confirm that my clock-in, breaks, and clock-out for today are accurate and complete.",
  btn_attestation_confirm: "I Confirm",
  btn_attestation_loading: "Saving attestation...",
  attestation_footer: "Required by APT Maintenance policy",

  // Camera upload
  camera_before: "Before Documentation",
  camera_after: "After Documentation",
  camera_receipt: "Receipt Documentation",
  camera_ready: "Ready to Transmit",
  btn_camera_upload: "Push to Dispatch",
  camera_uploading: "Transmitting...",
  camera_success: "Authenticated & Saved",
  camera_error: "Upload Failed — Check Connection",
  btn_camera_retry: "Recalibrate & Retry",

  // Calendar
  calendar_title: "Calendar",
  calendar_subtitle: "Team time-off and availability",
  btn_today: "Today",
  day_mon: "Mon",
  day_tue: "Tue",
  day_wed: "Wed",
  day_thu: "Thu",
  day_fri: "Fri",
  day_sat: "Sat",
  day_sun: "Sun",
  no_timeoff_today: "No approved time off this day.",
  leave_sick: "Sick",
  leave_vacation: "Vacation",
  label_out: "OUT",
  calendar_more: "more",
  calendar_close: "Close ✕",

  // Time off
  timeoff_title: "Time Off",
  timeoff_subtitle: "Request & Balance",
  balance_sick: "Sick Leave",
  balance_vacation: "Vacation",
  accrued: "accrued",
  used: "used",
  sick_auto_approve: "Sick leave requests are auto-approved per California law. No manager approval required.",
  form_new_request: "New Request",
  leave_personal: "Personal",
  label_start_date: "Start Date",
  label_end_date: "End Date",
  label_notes: "Notes (Optional)",
  notes_placeholder: "Any context for Ana or Keith...",
  btn_submit_request: "Submit Request",
  btn_submitting: "Submitting...",
  request_submitted: "Request Submitted",
  request_submitted_note: "Ana will review and respond.",
  error_submission: "Submission failed — try again",
  past_requests: "Past Requests",
  status_pending: "Pending",
  status_approved: "Approved",
  status_denied: "Denied",
} as const;

export type Messages = Record<keyof typeof en, string>;
