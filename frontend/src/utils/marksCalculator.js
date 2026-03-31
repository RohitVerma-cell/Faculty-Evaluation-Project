const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
const toNum = (val) => parseFloat(val) || 0;


// TL.1.1: 1 project = 5 marks, max 10
function calcTL1_1(liveProjectCount) {
  return clamp(toNum(liveProjectCount) * 5, 0, 10);
}

// TL.1.2 to TL.1.7: 15 * (studentsEngaged / totalMentees), max 10
function calcMentorFormula(studentsEngaged, totalMentees) {
  const mentees = toNum(totalMentees);
  if (mentees === 0) return 0;
  return clamp(15 * (toNum(studentsEngaged) / mentees), 0, 10);
}

// TL.1 Total — Max 15
export function calcTL1(tl1Data) {
  const mentees = toNum(tl1Data.totalMentees) || 1;

  const tl1_1 = calcTL1_1(tl1Data.liveProjectCount);
  const tl1_2 = calcMentorFormula(tl1Data.caseStudyStudentsCount, mentees);
  const tl1_3 = calcMentorFormula(tl1Data.articleStudentsCount,   mentees);

  const paperStudents = (tl1Data.studentPapers || []).reduce(
    (sum, p) => sum + toNum(p.studentsCount), 0
  );
  const tl1_4 = calcMentorFormula(paperStudents, mentees);
  const tl1_5 = calcMentorFormula((tl1Data.internships || []).length, mentees);

  const patentStudents = (tl1Data.studentPatents || []).reduce(
    (sum, p) => sum + toNum(p.studentCount), 0
  );
  const tl1_6 = calcMentorFormula(patentStudents, mentees);
  const tl1_7 = calcMentorFormula(tl1Data.certStudentCount, mentees);

  const total = clamp(tl1_1 + tl1_2 + tl1_3 + tl1_4 + tl1_5 + tl1_6 + tl1_7, 0, 15);
  return { tl1_1, tl1_2, tl1_3, tl1_4, tl1_5, tl1_6, tl1_7, total };
}

// TL.4.1 — University Result — Max 55
export function calcTL4_1(rows) {
  const valid = (rows || []).filter(r => toNum(r.totalStudents) > 0);
  if (!valid.length) return 0;
  const avg = valid.reduce((s, r) => s + toNum(r.percentage), 0) / valid.length;
  return clamp(((avg - 80) / 20) * 55, 0, 55);
}

// TL.4.2 — MST Result — Max 10
export function calcTL4_2(rows) {
  const valid = (rows || []).filter(r => toNum(r.totalStudents) > 0);
  if (!valid.length) return 0;
  const avg = valid.reduce((s, r) => s + toNum(r.percentage), 0) / valid.length;
  return clamp(((avg - 80) / 20) * 10, 0, 10);
}

// TL.4.3 — Attendance — Max 10
export function calcTL4_3(rows) {
  const valid = (rows || []).filter(r => toNum(r.avg) > 0);
  if (!valid.length) return 0;
  const avg = valid.reduce((s, r) => s + toNum(r.avg), 0) / valid.length;
  return clamp(((avg - 80) / 20) * 10, 0, 10);
}

// TL.4 Total — Max 75
export function calcTL4(tl4Data) {
  const tl4_1 = calcTL4_1(tl4Data.universityResult);
  const tl4_2 = calcTL4_2(tl4Data.mstResult);
  const tl4_3 = calcTL4_3(tl4Data.attendance);
  return { tl4_1, tl4_2, tl4_3, total: clamp(tl4_1 + tl4_2 + tl4_3, 0, 75) };
}

// TL Grand Total
export function calcTLTotal(tl1Data, tl4Data) {
  const tl1 = calcTL1(tl1Data || {});
  const tl4 = calcTL4(tl4Data || {});
  return {
    tl1: tl1.total, tl4: tl4.total,
    tl2: 0, tl3: 0,
    total: tl1.total + tl4.total,
    maxByFaculty: 90, maxTotal: 110,
  };
}


// R.1 — Journal Papers — Max 25
export function calcR1(papers) {
  let total = 0;
  (papers || []).forEach((p) => {
    const is1st = p.authorshipPosition === '1st';
    switch (p.indexing) {
      case 'SCI':         total += is1st ? 12 : 6;  break;
      case 'NAAS Rating': total += is1st ? 10 : 5;  break;
      case 'Scopus':      total += is1st ? 10 : 5;  break;
      default:            total += is1st ? 8  : 4;  break;
    }
  });
  return clamp(total, 0, 25);
}

// R.2 — Books — Max 20
export function calcR2(r2Data) {
  let total = 0;
  const indexed = ['Scopus', 'IEEE', 'Wiley', 'Springer'];

  (r2Data.books || []).forEach((b) => {
    const is1st = b.authorshipPosition === '1st';
    if (indexed.includes(b.indexing))        total += is1st ? 10 : 6;
    else if (b.publisher === 'International') total += is1st ? 8  : 5;
    else                                      total += is1st ? 5  : 3;
  });

  (r2Data.bookChapters || []).forEach((c) => {
    total += c.authorshipPosition === '1st' ? 5 : 3;
  });

  (r2Data.editorBooks || []).forEach((e) => {
    const is1st = e.authorshipPosition === '1st';
    total += e.publisher === 'International' ? (is1st ? 7 : 5) : (is1st ? 5 : 3);
  });

  return clamp(total, 0, 20);
}

// R.3 — Conference Papers — Max 15
export function calcR3(papers) {
  let total = 0;
  const indexed = ['Scopus', 'IEEE', 'Wiley', 'Springer'];

  (papers || []).forEach((p) => {
    const is1st = p.authorshipPosition === '1st';
    if (indexed.includes(p.indexing))         total += is1st ? 7   : 3.5;
    else if (p.publisher === 'International') total += is1st ? 4   : 2;
    else                                      total += is1st ? 3   : 1.5;
  });

  return clamp(total, 0, 15);
}

// R.4 — Sponsored Projects — Max 25
export function calcR4(r4Data) {
  let total = 0;

  (r4Data.externalProjects || []).forEach((p) => {
    const amt = toNum(p.amount);
    if ((p.agency || '').toLowerCase().includes('bfgi')) total += 5;
    else if (amt === 0)        total += 5;
    else if (amt <= 500000)    total += 15;
    else                       total += 25;
  });

  (r4Data.industryProjects || []).forEach((p) => {
    const amt = toNum(p.amount);
    if      (amt >= 50000 && amt < 100000) total += 10;
    else if (amt >= 100000)                total += 15;
  });

  return clamp(total, 0, 25);
}

// R.5 — Consultancy — Max 15
export function calcR5(r5Data) {
  let total = 0;
  const fees = toNum(r5Data.consultancyAmount);
  if (fees >= 10000) {
    total += 5;
    total += Math.floor((fees - 10000) / 10000) * 3;
  }
  if (r5Data.startupName)         total += 10;
  if (r5Data.internalProjectName) total += 3;
  return clamp(total, 0, 15);
}

// R.6 — Patents & Startup — Max 25
export function calcR6(r6Data) {
  let total = 0;
  (r6Data.patents || []).forEach((p) => {
    const is1st = p.authorshipPosition === '1st';
    total += p.status === 'Granted'
      ? (is1st ? 25 : 12.5)
      : (is1st ? 10 : 6);
  });
  if (r6Data.startupTitle) total += 25;
  return clamp(total, 0, 25);
}

// Research Grand Total — Max 125
export function calcResearchTotal(r1, r2Data, r3, r4Data, r5Data, r6Data) {
  const r1t = calcR1(r1);
  const r2t = calcR2(r2Data || {});
  const r3t = calcR3(r3);
  const r4t = calcR4(r4Data || {});
  const r5t = calcR5(r5Data || {});
  const r6t = calcR6(r6Data || {});
  return {
    r1: r1t, r2: r2t, r3: r3t,
    r4: r4t, r5: r5t, r6: r6t,
    total: clamp(r1t + r2t + r3t + r4t + r5t + r6t, 0, 125),
  };
}

// SD.1 — FDP — Max 10
export function calcSD1(entries) {
  let total = 0;
  (entries || []).forEach((e) => {
    const d = toNum(e.numberOfDays);
    if      (d >= 5) total += 10;
    else if (d >= 4) total += 7;
    else if (d >= 3) total += 5;
  });
  return clamp(total, 0, 10);
}

// SD.2 — Workshop — Max 10
export function calcSD2(entries) {
  let total = 0;
  (entries || []).forEach((e) => { if (toNum(e.numberOfWeeks) >= 2) total += 6; });
  return clamp(total, 0, 10);
}

// SD.3 — Refresher — Max 10
export function calcSD3(entries) {
  let total = 0;
  (entries || []).forEach((e) => {
    const w = toNum(e.numberOfWeeks);
    if      (w >= 4) total += 10;
    else if (w >= 3) total += 7;
  });
  return clamp(total, 0, 10);
}

// SD.4 — MOOCs — Max 10
export function calcSD4(entries) {
  return (entries || []).filter(e => e.title && e.completionDate).length > 0 ? 10 : 0;
}

// SD.5 — PhD — Max 10
export function calcSD5(sd5Data) {
  let total = 0;
  (sd5Data.phdCandidates || []).forEach((c) => {
    const bfgi = c.isBFGI === 'Yes';
    if      (c.status === 'Synopsis Submitted') total += bfgi ? 6 : 4;
    else if (c.status === 'Thesis Submitted')   total += 8;
    else if (c.status === 'Degree Awarded')     total += 10;
  });
  (sd5Data.phdRegistration || []).forEach((r) => {
    const bfgi = r.supervisorBFGI === 'Yes';
    if      (r.status === 'Synopsis Submitted') total += bfgi ? 6 : 4;
    else if (r.status === 'Thesis Submitted')   total += 8;
    else if (r.status === 'Degree Awarded')     total += 10;
  });
  return clamp(total, 0, 10);
}

// SD.6 — Awards — Max 15
export function calcSD6(entries) {
  let total = 0;
  (entries || []).forEach((e) => { total += e.scope === 'International' ? 15 : 5; });
  return clamp(total, 0, 15);
}

// Self Development Grand Total — Max 65
export function calcSDTotal(sd1, sd2, sd3, sd4, sd5Data, sd6) {
  const s1 = calcSD1(sd1); const s2 = calcSD2(sd2);
  const s3 = calcSD3(sd3); const s4 = calcSD4(sd4);
  const s5 = calcSD5(sd5Data || {}); const s6 = calcSD6(sd6);
  return {
    sd1: s1, sd2: s2, sd3: s3, sd4: s4, sd5: s5, sd6: s6,
    total: clamp(s1 + s2 + s3 + s4 + s5 + s6, 0, 65),
  };
}


export function calcGrandTotal(tlTotal, researchTotal, sdTotal) {
  return {
    tl: tlTotal, research: researchTotal, sd: sdTotal,
    total: tlTotal + researchTotal + sdTotal,
    maxByFaculty: 280,
    maxTotal: 300,
  };
}