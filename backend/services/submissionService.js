// ── services/submissionService.js ──
// Drop this file into your frontend src/ folder.
// Import these functions in your pages to talk to the backend.

const BASE_URL = 'http://localhost:5000/api/submission';

// ── Fetch a faculty's submission ──────────────────────
export async function getSubmission(email) {
  const res = await fetch(`${BASE_URL}/${email}`);
  if (!res.ok) throw new Error('Submission not found');
  return res.json();
}

// ── Save Draft ────────────────────────────────────────
// Call this when the faculty clicks "Save Draft"
export async function saveDraft(email, data) {
  const res = await fetch(`${BASE_URL}/${email}`, {
    method:  'PUT',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to save draft');
  return res.json();
}

// ── Create new submission (first time) ───────────────
export async function createSubmission(data) {
  const res = await fetch(BASE_URL, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create submission');
  return res.json();
}

// ── Submit for HoD review ────────────────────────────
// Call this when the faculty clicks "Submit"
export async function submitForReview(email, facultyName) {
  const res = await fetch(`${BASE_URL}/${email}/submit`, {
    method:  'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ facultyName }),
  });
  if (!res.ok) throw new Error('Failed to submit');
  return res.json();
}