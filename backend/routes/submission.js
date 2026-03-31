
const express    = require('express');
const router     = express.Router();
const Submission = require('../models/Submission');

const LOCKED_STATUSES = ['hod_approved', 'principal_approved', 'director_approved', 'chairman_approved'];

// ── GET /:email ── Fetch submission by faculty email
router.get('/:email', async (req, res) => {
  try {
    const submission = await Submission.findOne({ facultyEmail: req.params.email });
    if (!submission) return res.status(404).json({ message: 'No submission found' });
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── POST / ── Smart upsert: create if not exists, update if exists (and not locked)
router.post('/', async (req, res) => {
  try {
    const { facultyEmail, academicYear } = req.body;
    if (!facultyEmail || !academicYear) {
      return res.status(400).json({ message: 'facultyEmail and academicYear are required' });
    }

    const existing = await Submission.findOne({ facultyEmail, academicYear });

    if (!existing) {
      // Create new
      const submission = new Submission(req.body);
      await submission.save();
      return res.status(201).json({ message: 'Created', submission });
    }

    // Check if locked
    if (LOCKED_STATUSES.includes(existing.status)) {
      return res.status(403).json({ message: `Cannot edit — currently in '${existing.status}' status` });
    }

    // Update existing
    const updateFields = { ...req.body };
    delete updateFields._id;
    delete updateFields.__v;

    await Submission.updateOne({ facultyEmail, academicYear }, { $set: updateFields });
    const updated = await Submission.findOne({ facultyEmail, academicYear });
    return res.json({ message: 'Updated', submission: updated });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── PATCH /:email/submit ── Change status to 'submitted'
router.patch('/:email/submit', async (req, res) => {
  try {
    const submission = await Submission.findOne({ facultyEmail: req.params.email });
    if (!submission) return res.status(404).json({ message: 'Submission not found' });

    if (LOCKED_STATUSES.includes(submission.status)) {
      return res.status(403).json({ message: `Already in '${submission.status}' — cannot resubmit` });
    }

    submission.status = 'submitted';
    await submission.save();
    res.json({ message: 'Submitted for HoD review', submission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── PATCH /:email/status ── HoD / Principal / Director / Chairman approval 
router.patch('/:email/status', async (req, res) => {
  try {
    const { newStatus, reviewerRole } = req.body;
    const validTransitions = {
      submitted:           'hod_approved',
      hod_approved:        'principal_approved',
      principal_approved:  'director_approved',
      director_approved:   'chairman_approved',
    };

    const submission = await Submission.findOne({ facultyEmail: req.params.email });
    if (!submission) return res.status(404).json({ message: 'Submission not found' });

    if (newStatus === 'rejected') {
      submission.status = 'rejected';
      await submission.save();
      return res.json({ message: 'Submission rejected', submission });
    }

    const expectedNext = validTransitions[submission.status];
    if (newStatus !== expectedNext) {
      return res.status(400).json({ message: `Invalid status transition from '${submission.status}' to '${newStatus}'` });
    }

    submission.status = newStatus;
    await submission.save();
    res.json({ message: `Status updated to '${newStatus}'`, submission });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;