
export const STATUS_LABELS = {
  draft:               'Draft',
  submitted:           'Submitted',
  hod_approved:        'HoD Approved',
  principal_approved:  'Principal Approved',
  director_approved:   'Director Approved',
  chairman_approved:   'Chairman Approved',
  rejected:            'Rejected',
};

export const STATUS_ORDER = [
  'draft', 'submitted', 'hod_approved',
  'principal_approved', 'director_approved', 'chairman_approved',
];

export const WORKFLOW_STEPS = [
  { key: 'submitted',          label: 'Submitted' },
  { key: 'hod_approved',       label: 'HoD Review' },
  { key: 'principal_approved', label: 'Principal Review' },
  { key: 'director_approved',  label: 'Director Review' },
  { key: 'chairman_approved',  label: 'Chairman Approval' },
];

export const NAV_ITEMS = [
  { key: '/dashboard', label: 'Dashboard' },
  { key: '/entry',     label: 'Data Entry' },
];

// ── Main 3 tabs ──
export const MAIN_TABS = [
  { key: 'teaching',        label: 'Teaching Learning' },
  { key: 'research',        label: 'Research' },
  { key: 'selfdevelopment', label: 'Self Development' },
];

// ── Sub-tabs for each main tab ──
export const TEACHING_SUBTABS = [
  { key: 'tl1', label: 'TL.1 Student Involvement' },
  { key: 'tl4', label: 'TL.4 Outcome' },
];

export const RESEARCH_SUBTABS = [
  { key: 'r1', label: 'R.1 Journal Papers' },
  { key: 'r2', label: 'R.2 Books' },
  { key: 'r3', label: 'R.3 Conference' },
  { key: 'r4', label: 'R.4 Sponsored Projects' },
  { key: 'r5', label: 'R.5 Consultancy' },
  { key: 'r6', label: 'R.6 Patents & Startup' },
];

export const SD_SUBTABS = [
  { key: 'sd1', label: 'SD.1 FDP' },
  { key: 'sd2', label: 'SD.2 Workshop' },
  { key: 'sd3', label: 'SD.3 Refresher' },
  { key: 'sd4', label: 'SD.4 MOOCs' },
  { key: 'sd5', label: 'SD.5 PhD' },
  { key: 'sd6', label: 'SD.6 Awards' },
];