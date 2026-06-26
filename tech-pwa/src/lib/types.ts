export type JobStatus =
  | 'Needs Info'          // canonical current state (FSM entry)
  | 'Needs Review'        // legacy alias — maps to 'Needs Info' via normalizeLegacyStatus
  | 'Ready to Schedule'
  | 'PTE Required'        // legacy alias — maps to 'Needs Info'
  | 'Awaiting Approval'   // legacy alias — maps to 'Needs Info'
  | 'Awaiting Tenant'
  | 'Scheduled'
  | 'In Progress'
  | 'Complete'
  | 'Archived';

export interface Job {
  jobId: string;
  rowIndex?: number;
  priority: '1-URGENT' | '2-TURNOVER' | '3-PTE-PENDING' | '4-STANDARD';
  serviceCategory: string;
  address: string;
  unit: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  estimatedHours: number;
  status: JobStatus;
  rmName: string;
  rmEmail: string;
  accessInfo: string;
  tenantName: string;
  tenantPhone: string;
  tenantEmail: string;
  assignedTech: string;
  notes: string;
  gmailMsgId: string;
  emailType?: string;
  preferredTiming?: string;
  estimateNeeded?: string;
  pteGranted?: 'Yes' | 'No' | 'N/A' | 'Not Required';
  tenantPrefContact?: string;
  tenantHasPets?: string;
  timestamp: string;
  clockedInAt: string | null;
  activeRecordId: string | null;
  trackingToken?  : string;
  tenantScheduled?: boolean;
}

export interface TimeRecord {
  recordId: string;
  jobId: string;
  techId: string;
  clockInTime: string;
  clockOutTime: string | null;
  breakStart: string | null;
  breakEnd: string | null;
  breakDurationMinutes: number;
  actualHoursWorked: number | null;
  status: 'active' | 'on-break' | 'complete';
}

export type UserRole = 'tech' | 'dispatch' | 'management' | 'compliance' | 'hr' | 'admin';

export interface TechSession {
  token: string;
  techId: string;
  employeeId?: string;
  techName: string;
  role: UserRole;
  expiresAt: string;
}


export interface SyncEvent {
  id: string; // uuid
  action: string;
  payload: Record<string, unknown>;
  timestamp: string;
}

export interface TimeOffRequest {
  'Request ID': string;
  'Leave Type': 'Vacation' | 'Sick';
  'Request Type': string;
  'Start Date': string;
  'End Date': string;
  'Hours': number | string;
  'Reason': string;
  'Status': 'Pending' | 'Approved' | 'Denied' | 'Cancelled';
  'Legal Alert': string;
  'Manager Notes': string;
  'Employee ID': string;
  _rowIndex?: number;
  _employee?: { name: string; email: string };
  _employeeId?: string;
}

export interface TimeOffBalance {
  tenureYears: number;
  appliedRule: string;
  sick: { accrued: number; used: number; available: number };
  vacation: { accrued: number; used: number; available: number };
}

export interface TimecardRecord {
  recordId:         string;
  jobId:            string;
  techId:           string;
  techName:         string;
  category:         string;
  address:          string;
  date:             string;       // 'YYYY-MM-DD'
  clockIn:          string;       // ISO timestamp
  clockOut:         string;       // ISO timestamp
  breakMinutes:     number;
  actualHours:      number;
  mealWarning:      boolean;
  attestation:      'Pending' | 'Signed';
  attestedAt:       string;
  supervisorStatus: 'Pending' | 'Approved' | 'Disputed';
  supervisorId:     string;
  supervisorName:   string;
  supervisorAt:     string;
  disputeReason:    string;
}

export interface TimecardApprovalQueueResponse {
  success:      boolean;
  records:      TimecardRecord[];
  weekStart:    string;
  weekEnd:      string;
  pendingCount: number;
}

export interface ThreadAttachment {
  name:     string;
  mimeType: string;
  size:     number;
  url:      string | null; // Google Drive shareable URL
}

export interface ThreadMessage {
  from:        string;
  fromEmail:   string;
  toEmail:     string;
  text:        string;
  timestamp:   string;
  isOutbound:  boolean;
  attachments: ThreadAttachment[];
  stakeholder?: 'TENANT' | 'REQUESTER' | 'TECH';
  direction?: 'INBOUND' | 'OUTBOUND';
}

export interface TechRosterEntry {
  name: string;
  techName: string;
  badge: string;
  techId: string;
  rank: string;
  phone: string;
  role: string;
  active: boolean;
  skills: Record<string, number>;
}

export interface FieldStatusEntry {
  techName: string;
  status: 'active' | 'on-break' | 'complete' | 'unassigned';
  address?: string;
  elapsedMin?: number;
  clockIn?: string;
  hasActiveBreak?: boolean;
  mealDue?: boolean;
  secondMealDue?: boolean;
}

export interface DashboardStats {
  urgentCount: number;
  needsActionCount: number;
  ptePendingCount: number;
  todayScheduledCount: number;
  doneThisWeekCount: number;
}

export interface DispatchDataResponse {
  success: boolean;
  source: string;
  jobs: Job[];
  stats: DashboardStats;
}
