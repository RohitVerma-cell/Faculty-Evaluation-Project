// ─── MOCK DATA ────────────────────────────────────────────────────────────────

export const MOCK_FACULTY = [
  { id: 1, name: 'Dr. Ratan Kumar',    dept: 'CS', avatar: 'RK', tl1: 82, tl2: null, tl3: null, tl4: null, evalStatus: 'pending',  submissions: 12, approved: 9,  rejected: 1 },
  { id: 2, name: 'Prof. Simran Kaur',  dept: 'CS', avatar: 'SK', tl1: 78, tl2: null, tl3: null, tl4: null, evalStatus: 'pending',  submissions: 10, approved: 8,  rejected: 1 },
  { id: 3, name: 'Dr. Arjun Mehta',    dept: 'CS', avatar: 'AM', tl1: 91, tl2: 88,   tl3: 9,    tl4: 87,   evalStatus: 'complete', submissions: 15, approved: 13, rejected: 0 },
  { id: 4, name: 'Ms. Priya Sharma',   dept: 'CS', avatar: 'PS', tl1: 74, tl2: null, tl3: null, tl4: null, evalStatus: 'draft',    submissions: 8,  approved: 6,  rejected: 2 },
  { id: 5, name: 'Dr. Vikram Singh',   dept: 'CS', avatar: 'VS', tl1: 86, tl2: 82,   tl3: 8,    tl4: 80,   evalStatus: 'complete', submissions: 11, approved: 10, rejected: 0 },
  { id: 6, name: 'Prof. Neha Joshi',   dept: 'CS', avatar: 'NJ', tl1: 69, tl2: null, tl3: null, tl4: null, evalStatus: 'pending',  submissions: 6,  approved: 4,  rejected: 2 },
]

export const MOCK_SUBMISSIONS = [
  { id: 101, facultyId: 1, faculty: 'Dr. Ratan Kumar',   module: 'Research',  subType: 'Journal Paper',    title: 'ML-Based Traffic Optimization',          marks: 18, date: '2024-03-10', status: 'pending',  description: 'Published in IEEE Transactions on Intelligent Transportation. Proposes a novel ML-based approach for optimizing urban traffic flow using reinforcement learning.', students: ['Amit K.', 'Prerna S.'],                   company: 'IEEE',              file: 'paper_101.pdf' },
  { id: 102, facultyId: 2, faculty: 'Prof. Simran Kaur', module: 'Teaching',  subType: 'Live Project',     title: 'E-Commerce Platform Development',         marks: 15, date: '2024-03-12', status: 'pending',  description: 'Led a live industry project with 6th semester students building a full-stack e-commerce platform for a local business client.', students: ['Rohit V.', 'Manisha T.', 'Suresh K.'],   company: 'TechMart Pvt Ltd',  file: 'project_102.pdf' },
  { id: 103, facultyId: 1, faculty: 'Dr. Ratan Kumar',   module: 'Self Dev',  subType: 'FDP',              title: 'Advanced NLP Workshop – IIT Bombay',      marks: 10, date: '2024-03-05', status: 'approved', description: 'Attended a 5-day Faculty Development Program on Natural Language Processing at IIT Bombay.',                                                                       students: [],                                         company: 'IIT Bombay',        file: 'fdp_103.pdf' },
  { id: 104, facultyId: 4, faculty: 'Ms. Priya Sharma',  module: 'Research',  subType: 'Patent',           title: 'Smart Water Monitoring IoT System',        marks: 20, date: '2024-03-14', status: 'pending',  description: 'Filed a patent with the Indian Patent Office for an IoT-based smart water monitoring system using sensors to detect leakage and quality issues.',               students: ['Karan M.'],                               company: 'IPO India',         file: 'patent_104.pdf' },
  { id: 105, facultyId: 6, faculty: 'Prof. Neha Joshi',  module: 'Teaching',  subType: 'MOOC',             title: 'Python for Data Science – Coursera',      marks: 8,  date: '2024-03-08', status: 'rejected', description: 'Completed Coursera MOOC certification in Python for Data Science.',                                                                                          students: [],                                         company: 'Coursera',          file: 'mooc_105.pdf' },
  { id: 106, facultyId: 2, faculty: 'Prof. Simran Kaur', module: 'Research',  subType: 'Conference Paper', title: 'Blockchain in Healthcare',                marks: 16, date: '2024-03-15', status: 'pending',  description: 'Presented at International Conference on Blockchain Technology in Healthcare addressing privacy challenges in EMR sharing.',                                   students: ['Anjali D.'],                              company: 'ICBH 2024',         file: 'conf_106.pdf' },
  { id: 107, facultyId: 4, faculty: 'Ms. Priya Sharma',  module: 'Self Dev',  subType: 'Certification',    title: 'AWS Solutions Architect – Professional',  marks: 12, date: '2024-03-11', status: 'pending',  description: 'Cleared AWS Solutions Architect Professional certification exam.',                                                                                           students: [],                                         company: 'Amazon Web Services', file: 'cert_107.pdf' },
  { id: 108, facultyId: 6, faculty: 'Prof. Neha Joshi',  module: 'Teaching',  subType: 'Live Project',     title: 'Hospital Management System',              marks: 14, date: '2024-03-16', status: 'pending',  description: 'Guided 4 final year students in building a comprehensive Hospital Management System as capstone project.',                                                    students: ['Deepak P.', 'Sunita R.', 'Rahul K.', 'Megha V.'], company: 'City Hospital', file: 'project_108.pdf' },
]

export const MOCK_TREND = [
  { month: 'Oct', submissions: 8,  approved: 5,  rejected: 1 },
  { month: 'Nov', submissions: 11, approved: 8,  rejected: 2 },
  { month: 'Dec', submissions: 7,  approved: 5,  rejected: 1 },
  { month: 'Jan', submissions: 14, approved: 10, rejected: 2 },
  { month: 'Feb', submissions: 16, approved: 12, rejected: 3 },
  { month: 'Mar', submissions: 19, approved: 13, rejected: 2 },
]

export const MOCK_MODULE_DATA = [
  { name: 'Teaching',  value: 38 },
  { name: 'Research',  value: 42 },
  { name: 'Self Dev',  value: 20 },
]

export const MOCK_SCHOOL_DATA = [
  { name: 'CS',  score: 81 },
  { name: 'ECE', score: 76 },
  { name: 'ME',  score: 68 },
  { name: 'CE',  score: 72 },
  { name: 'EE',  score: 74 },
]

export const MOCK_COURSES = [
  { course: 'Data Structures',  students: 60, passed: 54, result: 90.0 },
  { course: 'DBMS',             students: 58, passed: 48, result: 82.7 },
  { course: 'Operating Systems',students: 62, passed: 55, result: 88.7 },
  { course: 'ML Fundamentals',  students: 45, passed: 41, result: 91.1 },
]

export const MOCK_ACTIVITIES = [
  { id: 1, text: 'Dr. Ratan Kumar submitted "ML-Based Traffic Optimization"',   time: '2 hours ago',  color: '#2563eb' },
  { id: 2, text: 'Prof. Simran Kaur added Internship entry for 3 students',     time: '4 hours ago',  color: '#7c3aed' },
  { id: 3, text: 'Ms. Priya Sharma filed a Patent application',                 time: 'Yesterday',    color: '#d97706' },
  { id: 4, text: 'Prof. Neha Joshi submitted Live Project report',              time: 'Yesterday',    color: '#16a34a' },
  { id: 5, text: 'Dr. Arjun Mehta Evaluation marked as Complete',               time: '2 days ago',   color: '#16a34a' },
]
