const express    = require('express');
const router     = express.Router();
const Submission = require('../models/Submission');

// ── GET /api/submission/:email ──
// Fetch a faculty's submission by email
router.get('/:email', async (req, res) => {
  try {
    const submission = await Submission.findOne({ facultyEmail: req.params.email });
    if (!submission) {
      return res.status(404).json({ message: 'No submission found for this faculty.' });
    }
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── POST /api/submission ──
// Create a new submission (first save / draft)
router.post('/', async (req, res) => {
  try {
    const { facultyName, facultyEmail, academicYear, teaching, research, patents, fdp, consultancy } = req.body;

    // Check if one already exists for this faculty + year
    const existing = await Submission.findOne({ facultyEmail, academicYear });
    if (existing) {
      return res.status(400).json({ message: 'Submission already exists. Use PUT to update.' });
    }

    const submission = new Submission({
      facultyName,
      facultyEmail,
      academicYear,
      teaching:    teaching    || [],
      research:    research    || [],
      patents:     patents     || [],
      fdp:         fdp         || [],
      consultancy: consultancy || [],
      auditTrail: [{
        action: 'Submission created (draft)',
        by:     facultyName,
        role:   'faculty',
      }],
    });

    const saved = await submission.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ── PUT /api/submission/:email ──
// Update (save draft) — replaces section data
router.put('/:email', async (req, res) => {
  try {
    const { teaching, research, patents, fdp, consultancy, facultyName } = req.body;

    const submission = await Submission.findOne({ facultyEmail: req.params.email });
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found.' });
    }

    // Only allow edits when in draft or rejected state
   // Pehle (sirf draft allow)
// if (!['draft', 'rejected'].includes(submission.status)) {

// Badal ke (draft + submitted dono allow)
if (!['draft', 'submitted', 'rejected'].includes(submission.status)) {
      return res.status(403).json({ message: 'Cannot edit a submission already under review.' });
    }

    if (teaching)    submission.teaching    = teaching;
    if (research)    submission.research    = research;
    if (patents)     submission.patents     = patents;
    if (fdp)         submission.fdp         = fdp;
    if (consultancy) submission.consultancy = consultancy;

    submission.auditTrail.push({
      action: 'Draft saved',
      by:     facultyName || 'Faculty',
      role:   'faculty',
    });

    const updated = await submission.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ── PATCH /api/submission/:email/submit ──
// Submit for HoD review
router.patch('/:email/submit', async (req, res) => {
  try {
    const { facultyName } = req.body;
    const submission = await Submission.findOne({ facultyEmail: req.params.email });

    if (!submission) return res.status(404).json({ message: 'Submission not found.' });
    if (submission.status !== 'draft') {
      return res.status(400).json({ message: 'Only drafts can be submitted.' });
    }

    submission.status = 'submitted';
    submission.auditTrail.push({
      action: 'Submitted for HoD review',
      by:     facultyName || 'Faculty',
      role:   'faculty',
    });

    const updated = await submission.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

