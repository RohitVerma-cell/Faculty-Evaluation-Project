const mongoose = require('mongoose');

// ── Reusable Proof Schema (stored for every upload) ──
const ProofSchema = new mongoose.Schema({
  fileId:       { type: String, default: '' }, // ← NEW (ImageKit fileId)
  filePath:     { type: String, default: '' }, // ab ImageKit URL hoga
  fileName:     { type: String, default: '' }, // saved filename on disk
  originalName: { type: String, default: '' }, // original uploaded name
  size:         { type: Number, default: 0  }, // bytes
}, { _id: false });

// ─────────────────────────────────────────────
// TEACHING LEARNING
// ─────────────────────────────────────────────

const StudentPaperSchema = new mongoose.Schema({
  title:    { type: String, default: '' },
  students: { type: String, default: '' },
  journal:  { type: String, default: '' },
  indexing: { type: String, default: 'UGC' },
  date:     { type: String, default: '' },
  proof:    { type: ProofSchema, default: () => ({}) },
}, { _id: false });

const InternshipSchema = new mongoose.Schema({
  studentName: { type: String, default: '' },
  company:     { type: String, default: '' },
  startDate:   { type: String, default: '' },
  endDate:     { type: String, default: '' },
  proof:       { type: ProofSchema, default: () => ({}) },
}, { _id: false });

const StudentPatentSchema = new mongoose.Schema({
  title:             { type: String, default: '' },
  dateOfPublication: { type: String, default: '' },
  patentNo:          { type: String, default: '' },
  status:            { type: String, default: 'Filed' },
  studentCount:      { type: String, default: '' },
  proof:             { type: ProofSchema, default: () => ({}) },
}, { _id: false });

const TL1Schema = new mongoose.Schema({
  // TL.1.1
  liveProjectCount:      { type: String, default: '' },
  liveProjectTitles:     { type: String, default: '' },
  liveProjectPrizeCount: { type: String, default: '' },
  liveProjectEvent:      { type: String, default: '' },
  liveProjectProof:      { type: ProofSchema, default: () => ({}) },
  // TL.1.2
  caseStudyTitle:       { type: String, default: '' },
  caseStudyPublication: { type: String, default: '' },
  caseStudyStudents:    { type: String, default: '' },
  caseStudyProof:       { type: ProofSchema, default: () => ({}) },
  // TL.1.3
  articleTitle:       { type: String, default: '' },
  articlePublication: { type: String, default: '' },
  articleStudents:    { type: String, default: '' },
  articleProof:       { type: ProofSchema, default: () => ({}) },
  // TL.1.4
  studentPapers: { type: [StudentPaperSchema], default: [] },
  // TL.1.5
  internships: { type: [InternshipSchema], default: [] },
  // TL.1.6
  studentPatents: { type: [StudentPatentSchema], default: [] },
  // TL.1.7
  certStudentCount:  { type: String, default: '' },
  certProgramTitle:  { type: String, default: '' },
  certAgency:        { type: String, default: '' },
  certReceivedCount: { type: String, default: '' },
  certProof:         { type: ProofSchema, default: () => ({}) },
}, { _id: false });

const ResultRowSchema = new mongoose.Schema({
  courseName:      { type: String, default: '' },
  session:         { type: String, default: '' },
  exam:            { type: String, default: 'Odd' },
  totalStudents:   { type: String, default: '' },
  studentsCleared: { type: String, default: '' },
  percentage:      { type: String, default: '' },
}, { _id: false });

const AttendanceRowSchema = new mongoose.Schema({
  id:  { type: String, default: '' },
  avg: { type: String, default: '' },
}, { _id: false });

const TL4Schema = new mongoose.Schema({
  universityResult: { type: [ResultRowSchema],    default: [] },
  mstResult:        { type: [ResultRowSchema],    default: [] },
  attendance:       { type: [AttendanceRowSchema],default: [] },
}, { _id: false });

// ─────────────────────────────────────────────
// RESEARCH
// ─────────────────────────────────────────────

const JournalPaperSchema = new mongoose.Schema({
  title:              { type: String, default: '' },
  journalName:        { type: String, default: '' },
  issnNumber:         { type: String, default: '' },
  yearOfPublication:  { type: String, default: '' },
  indexing:           { type: String, default: 'Scopus' },
  authorshipPosition: { type: String, default: '1st' },
  volumeIssue:        { type: String, default: '' },
  proof:              { type: ProofSchema, default: () => ({}) },
}, { _id: false });

const BookSchema = new mongoose.Schema({
  title:              { type: String, default: '' },
  isbnNumber:         { type: String, default: '' },
  yearOfPublication:  { type: String, default: '' },
  indexing:           { type: String, default: 'Scopus' },
  authorshipPosition: { type: String, default: '1st' },
  publisher:          { type: String, default: 'International' },
  proof:              { type: ProofSchema, default: () => ({}) },
}, { _id: false });

const BookChapterSchema = new mongoose.Schema({
  chapterTitle:       { type: String, default: '' },
  bookTitle:          { type: String, default: '' },
  isbnNumber:         { type: String, default: '' },
  authorshipPosition: { type: String, default: '1st' },
  publisherName:      { type: String, default: '' },
  proof:              { type: ProofSchema, default: () => ({}) },
}, { _id: false });

const EditorBookSchema = new mongoose.Schema({
  title:              { type: String, default: '' },
  isbnNumber:         { type: String, default: '' },
  yearOfPublication:  { type: String, default: '' },
  authorshipPosition: { type: String, default: '1st' },
  publisher:          { type: String, default: 'International' },
  proof:              { type: ProofSchema, default: () => ({}) },
}, { _id: false });

const R2Schema = new mongoose.Schema({
  books:        { type: [BookSchema],        default: [] },
  bookChapters: { type: [BookChapterSchema], default: [] },
  editorBooks:  { type: [EditorBookSchema],  default: [] },
}, { _id: false });

const ConferencePaperSchema = new mongoose.Schema({
  paperTitle:         { type: String, default: '' },
  conferenceTitle:    { type: String, default: '' },
  isbnNumberDate:     { type: String, default: '' },
  indexing:           { type: String, default: 'Scopus' },
  authorshipPosition: { type: String, default: '1st' },
  publisher:          { type: String, default: 'International' },
  proof:              { type: ProofSchema, default: () => ({}) },
}, { _id: false });

const ExternalProjectSchema = new mongoose.Schema({
  projectTitle: { type: String, default: '' },
  agency:       { type: String, default: '' },
  amount:       { type: String, default: '' },
  status:       { type: String, default: 'Ongoing' },
  role:         { type: String, default: 'PI' },
  sanctionNo:   { type: String, default: '' },
  proof:        { type: ProofSchema, default: () => ({}) },
}, { _id: false });

const IndustryProjectSchema = new mongoose.Schema({
  projectTitle:   { type: String, default: '' },
  industry:       { type: String, default: '' },
  amount:         { type: String, default: '' },
  sanctionNumber: { type: String, default: '' },
  role:           { type: String, default: 'PI' },
  coPIs:          { type: String, default: '' },
  proof:          { type: ProofSchema, default: () => ({}) },
}, { _id: false });

const R4Schema = new mongoose.Schema({
  externalProjects: { type: [ExternalProjectSchema], default: [] },
  industryProjects: { type: [IndustryProjectSchema], default: [] },
}, { _id: false });

const R5Schema = new mongoose.Schema({
  consultancyTitle:    { type: String, default: '' },
  consultancyAgency:   { type: String, default: '' },
  consultancyAmount:   { type: String, default: '' },
  consultancyProof:    { type: ProofSchema, default: () => ({}) },
  startupName:         { type: String, default: '' },
  mentoringDate:       { type: String, default: '' },
  startupProof:        { type: ProofSchema, default: () => ({}) },
  internalProjectName: { type: String, default: '' },
  internalDepartment:  { type: String, default: '' },
  internalProof:       { type: ProofSchema, default: () => ({}) },
}, { _id: false });

const PatentSchema = new mongoose.Schema({
  patentTitle:        { type: String, default: '' },
  dateOfPublication:  { type: String, default: '' },
  patentNo:           { type: String, default: '' },
  status:             { type: String, default: 'Filed' },
  authorshipPosition: { type: String, default: '1st' },
  patentOffice:       { type: String, default: 'India' },
  proof:              { type: ProofSchema, default: () => ({}) },
}, { _id: false });

const R6Schema = new mongoose.Schema({
  patents:      { type: [PatentSchema], default: [] },
  startupTitle: { type: String, default: '' },
  dpiitNumber:  { type: String, default: '' },
  startupProof: { type: ProofSchema, default: () => ({}) },
}, { _id: false });

// ─────────────────────────────────────────────
// SELF DEVELOPMENT
// ─────────────────────────────────────────────

const FDPSchema = new mongoose.Schema({
  title:               { type: String, default: '' },
  organizingInstitute: { type: String, default: '' },
  numberOfDays:        { type: String, default: '' },
  dates:               { type: String, default: '' },
  proof:               { type: ProofSchema, default: () => ({}) },
}, { _id: false });

const WorkshopSchema = new mongoose.Schema({
  title:               { type: String, default: '' },
  organizingInstitute: { type: String, default: '' },
  numberOfWeeks:       { type: String, default: '' },
  dates:               { type: String, default: '' },
  proof:               { type: ProofSchema, default: () => ({}) },
}, { _id: false });

const RefresherSchema = new mongoose.Schema({
  title:               { type: String, default: '' },
  organizingInstitute: { type: String, default: '' },
  numberOfWeeks:       { type: String, default: '' },
  dates:               { type: String, default: '' },
  proof:               { type: ProofSchema, default: () => ({}) },
}, { _id: false });

const MOOCSchema = new mongoose.Schema({
  title:          { type: String, default: '' },
  provider:       { type: String, default: '' },
  duration:       { type: String, default: '' },
  startDate:      { type: String, default: '' },
  completionDate: { type: String, default: '' },
  proof:          { type: ProofSchema, default: () => ({}) },
}, { _id: false });

const PhDCandidateSchema = new mongoose.Schema({
  candidateName: { type: String, default: '' },
  isBFGI:        { type: String, default: 'No' },
  university:    { type: String, default: '' },
  enrollmentNo:  { type: String, default: '' },
  status:        { type: String, default: 'Thesis Submitted' },
}, { _id: false });

const PhDRegistrationSchema = new mongoose.Schema({
  university:     { type: String, default: '' },
  enrollmentNo:   { type: String, default: '' },
  status:         { type: String, default: 'Synopsis Submitted' },
  supervisorBFGI: { type: String, default: 'No' },
}, { _id: false });

const SD5Schema = new mongoose.Schema({
  phdCandidates:   { type: [PhDCandidateSchema],    default: [] },
  phdRegistration: { type: [PhDRegistrationSchema], default: [] },
}, { _id: false });

const AwardSchema = new mongoose.Schema({
  awardTitle:       { type: String, default: '' },
  organizationName: { type: String, default: '' },
  scope:            { type: String, default: 'National' },
  dateOfAward:      { type: String, default: '' },
  proof:            { type: ProofSchema, default: () => ({}) },
}, { _id: false });

const CalculatedMarksSchema = new mongoose.Schema({
  tl:         { type: Number, default: 0 },
  research:   { type: Number, default: 0 },
  sd:         { type: Number, default: 0 },
  grandTotal: { type: Number, default: 0 },
  hodMarks:   { type: Number, default: 0 },
  finalTotal: { type: Number, default: 0 },
}, { _id: false });



// ─────────────────────────────────────────────
// HOD EVALUATION (new)
// ─────────────────────────────────────────────

const TL2BreakdownSchema = new mongoose.Schema({
  teaching:      { type: Number, default: 0 },
  subject:       { type: Number, default: 0 },
  communication: { type: Number, default: 0 },
  engagement:    { type: Number, default: 0 },
}, { _id: false });

const HodEvaluationSchema = new mongoose.Schema({
  tl2Total:      { type: Number, default: 0 },
  tl2Breakdown:  { type: TL2BreakdownSchema, default: () => ({}) },
  tl3Score:      { type: Number, default: 0 },   // raw 0-10 slider value
  tl3Remarks:    { type: String, default: '' },
  tl4Score:      { type: Number, default: 0 },   // 0-100 final
  totalScore:    { type: Number, default: 0 },   // avg of TL1+TL2+TL3+TL4
  evaluatedAt:   { type: String, default: '' },
}, { _id: false });




// ─────────────────────────────────────────────
// MAIN SUBMISSION SCHEMA
// ─────────────────────────────────────────────

const SubmissionSchema = new mongoose.Schema({
  facultyName:  { type: String, required: true },
  facultyEmail: { type: String, required: true },
  academicYear: { type: String, required: true },
  status:       { type: String, default: 'draft' },

  // ── NEW ──────────────────────────────────────
  department:    { type: String, default: 'CS' },   // e.g. 'CS', 'ECE', 'ME'
  tl1Score:      { type: Number, default: 0   },   // auto-calculated, written by your TL1 scoring logic
  hodEvaluation: { type: HodEvaluationSchema, default: () => ({}) },
  // ─────────────────────────────────────────────

  // Teaching Learning
  tl1: { type: TL1Schema, default: () => ({}) },
  tl4: { type: TL4Schema, default: () => ({}) },

  // Research
  r1JournalPapers:    { type: [JournalPaperSchema],    default: [] },
  r2Books:            { type: R2Schema,                default: () => ({}) },
  r3ConferencePapers: { type: [ConferencePaperSchema], default: [] },
  r4Projects:         { type: R4Schema,                default: () => ({}) },
  r5Consultancy:      { type: R5Schema,                default: () => ({}) },
  r6Patents:          { type: R6Schema,                default: () => ({}) },

  // Self Development
  sd1FDP:       { type: [FDPSchema],      default: [] },
  sd2Workshop:  { type: [WorkshopSchema], default: [] },
  sd3Refresher: { type: [RefresherSchema],default: [] },
  sd4MOOCs:     { type: [MOOCSchema],     default: [] },
  sd5PhD:       { type: SD5Schema,        default: () => ({}) },
  sd6Awards:    { type: [AwardSchema],    default: [] },

  calculatedMarks: { type: CalculatedMarksSchema, default: () => ({}) },

}, { timestamps: true });

module.exports = mongoose.model('Submission', SubmissionSchema);