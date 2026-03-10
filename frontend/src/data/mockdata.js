// ── data/mockData.js ──

const SUBMISSION = {
  status: 'submitted',
  totalScore: 82,
  teaching: [
    {
      id: 't1',
      subject: 'Data Structures',
      semester: 'Odd',
      hoursPerWeek: 4,
      attendancePercent: 92,
      resultPercent: 85,
    },
    {
      id: 't2',
      subject: 'Machine Learning',
      semester: 'Even',
      hoursPerWeek: 3,
      attendancePercent: 88,
      resultPercent: 78,
    },
  ],
  research: [
    {
      id: 'r1',
      title: 'Deep Learning for Medical Imaging',
      type: 'journal',
      publicationName: 'IEEE Trans. on Medical Imaging',
      indexing: 'SCI',
      year: 2024,
    },
    {
      id: 'r2',
      title: 'NLP Techniques for Regional Languages',
      type: 'conference',
      publicationName: 'ACL 2024',
      indexing: 'Scopus',
      year: 2024,
    },
  ],
  patents: [
    {
      id: 'p1',
      title: 'AI-based Crop Disease Detection System',
      status: 'published',
      type: 'national',
      year: 2024,
      marks: 10,
    },
  ],
  auditTrail: [
    {
      timestamp: '2025-01-15',
      action: 'Submitted for review',
      by: 'Dr. Ananya Sharma',
      role: 'faculty',
    },
    {
      timestamp: '2025-01-10',
      action: 'Created submission',
      by: 'Dr. Ananya Sharma',
      role: 'faculty',
    },
  ],
};

export default SUBMISSION;