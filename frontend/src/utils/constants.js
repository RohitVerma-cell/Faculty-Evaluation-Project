// ── utils/constants.js ──

export const STATUS_LABELS = {
  draft: 'Draft',
  submitted: 'Submitted',
  hod_approved: 'HoD Approved',
  principal_approved: 'Principal Approved',
  director_approved: 'Director Approved',
  chairman_approved: 'Chairman Approved',
  rejected: 'Rejected',
};

export const STATUS_ORDER = [
  'draft',
  'submitted',
  'hod_approved',
  'principal_approved',
  'director_approved',
  'chairman_approved',
];

export const WORKFLOW_STEPS = [
  { key: 'submitted',         label: 'Submitted' },
  { key: 'hod_approved',      label: 'HoD Review' },
  { key: 'principal_approved',label: 'Principal Review' },
  { key: 'director_approved', label: 'Director Review' },
  { key: 'chairman_approved', label: 'Chairman Approval' },
];

export const NAV_ITEMS = [
  { key: '/dashboard', label: 'Dashboard' },
  { key: '/entry',     label: 'Data Entry' },
];

export const ENTRY_TABS = [
  { key: 'teaching',    label: 'Teaching' },
  { key: 'research',    label: 'Research' },
  { key: 'patents',     label: 'Patents' },
  { key: 'fdp',         label: 'FDP/Workshops' },
  { key: 'consultancy', label: 'Consultancy' },
];