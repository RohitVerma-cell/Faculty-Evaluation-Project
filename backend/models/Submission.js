const mongoose = require('mongoose');

// ── Sub-schemas ──

const TeachingSchema = new mongoose.Schema({
  subject:          { type: String, required: true },
  semester:         { type: String, enum: ['Odd', 'Even'], required: true },
  hoursPerWeek:     { type: Number, required: true, min: 0 },
  attendancePercent:{ type: Number, required: true, min: 0, max: 100 },
  resultPercent:    { type: Number, required: true, min: 0, max: 100 },
  proofUrl:         { type: String },          // optional file upload URL
});

const ResearchSchema = new mongoose.Schema({
  title:           { type: String, required: true },
  type:            { type: String, enum: ['journal', 'conference', 'book_chapter'], required: true },
  publicationName: { type: String, required: true },
  indexing:        { type: String, enum: ['SCI', 'Scopus', 'UGC', 'Other'], required: true },
  year:            { type: Number, required: true },
  proofUrl:        { type: String },
});

const PatentSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  status:  { type: String, enum: ['filed', 'published', 'granted'], required: true },
  type:    { type: String, enum: ['national', 'international'], required: true },
  year:    { type: Number, required: true },
  marks:   { type: Number },                   // auto-calculated
  proofUrl:{ type: String },
});

const FDPSchema = new mongoose.Schema({
  title:     { type: String, required: true },
  organizer: { type: String, required: true },
  duration:  { type: String, required: true },
  type:      { type: String, enum: ['attended', 'organized'], required: true },
  year:      { type: Number, required: true },
  proofUrl:  { type: String },
});

const ConsultancySchema = new mongoose.Schema({
  title:        { type: String, required: true },
  organization: { type: String, required: true },
  amount:       { type: Number, required: true, min: 0 },
  year:         { type: Number, required: true },
  proofUrl:     { type: String },
});

const AuditTrailSchema = new mongoose.Schema({
  action:    { type: String, required: true },
  by:        { type: String, required: true },
  role:      { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// ── Main Submission Schema ──

const SubmissionSchema = new mongoose.Schema(
  {
    facultyName:  { type: String, required: true },
    facultyEmail: { type: String, required: true },
    academicYear: { type: String, required: true, default: '2024-25' },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'hod_approved', 'principal_approved', 'director_approved', 'chairman_approved', 'rejected'],
      default: 'draft',
    },
    totalScore:   { type: Number, default: 0 },
    teaching:     [TeachingSchema],
    research:     [ResearchSchema],
    patents:      [PatentSchema],
    fdp:          [FDPSchema],
    consultancy:  [ConsultancySchema],
    auditTrail:   [AuditTrailSchema],
  },
  { timestamps: true }   // adds createdAt, updatedAt automatically
);

module.exports = mongoose.model('Submission', SubmissionSchema);