<<<<<<< HEAD
import { Award, FileText, BookOpen, Lightbulb } from 'lucide-react';
=======
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
import StatCard        from '../../components/common/statcard';
import StatusBadge     from '../../components/common/statusBadge';
import WorkflowTracker from '../../components/common/WorkflowTracker';
import SUBMISSION      from '../../data/mockData';
import styles          from '../../utils/styles';

import {
  calcTLTotal,
  calcResearchTotal,
  calcSDTotal,
  calcGrandTotal,
} from '../../utils/marksCalculator';

<<<<<<< HEAD
=======
import { Award, FileText, Lightbulb, BookOpen, ExternalLink, FileText as FileIcon } from 'lucide-react';

function extractAllProofs({ tl1Data, r1Entries, r2Data, r3Entries, r4Data, r5Data, r6Data, sd1Entries, sd2Entries, sd3Entries, sd4Entries, sd6Entries }) {
  const proofs = [];
  const add = (proof, label) => {
    if (proof?.filePath && proof?.originalName) proofs.push({ ...proof, label });
  };

  // TL
  add(tl1Data?.liveProjectProof, 'TL.1.1 Live Project');
  add(tl1Data?.caseStudyProof,   'TL.1.2 Case Study');
  add(tl1Data?.articleProof,     'TL.1.3 Article');
  add(tl1Data?.certProof,        'TL.1.7 Certificate');
  (tl1Data?.studentPapers  || []).forEach((p, i) => add(p.proof, `TL.1.4 Student Paper #${i+1}`));
  (tl1Data?.internships    || []).forEach((p, i) => add(p.proof, `TL.1.5 Internship #${i+1}`));
  (tl1Data?.studentPatents || []).forEach((p, i) => add(p.proof, `TL.1.6 Student Patent #${i+1}`));

  // Research
  (r1Entries             || []).forEach((p, i) => add(p.proof, `R.1 Journal Paper #${i+1}`));
  (r2Data?.books         || []).forEach((p, i) => add(p.proof, `R.2 Book #${i+1}`));
  (r2Data?.bookChapters  || []).forEach((p, i) => add(p.proof, `R.2 Book Chapter #${i+1}`));
  (r2Data?.editorBooks   || []).forEach((p, i) => add(p.proof, `R.2 Editor Book #${i+1}`));
  (r3Entries             || []).forEach((p, i) => add(p.proof, `R.3 Conference Paper #${i+1}`));
  (r4Data?.externalProjects || []).forEach((p, i) => add(p.proof, `R.4 External Project #${i+1}`));
  (r4Data?.industryProjects || []).forEach((p, i) => add(p.proof, `R.4 Industry Project #${i+1}`));
  add(r5Data?.consultancyProof, 'R.5 Consultancy');
  add(r5Data?.startupProof,     'R.5 Startup');
  add(r5Data?.internalProof,    'R.5 Internal Project');
  (r6Data?.patents || []).forEach((p, i) => add(p.proof, `R.6 Patent #${i+1}`));
  add(r6Data?.startupProof, 'R.6 Startup');

  // Self Development
  (sd1Entries || []).forEach((p, i) => add(p.proof, `SD.1 FDP #${i+1}`));
  (sd2Entries || []).forEach((p, i) => add(p.proof, `SD.2 Workshop #${i+1}`));
  (sd3Entries || []).forEach((p, i) => add(p.proof, `SD.3 Refresher #${i+1}`));
  (sd4Entries || []).forEach((p, i) => add(p.proof, `SD.4 MOOC #${i+1}`));
  (sd6Entries || []).forEach((p, i) => add(p.proof, `SD.6 Award #${i+1}`));

  return [...proofs].reverse(); // latest pehle
}

const getLabelColor = (label) => {
  if (label.startsWith('TL')) return { color: '#6366f1', bg: '#eef2ff' };
  if (label.startsWith('R'))  return { color: '#0ea5e9', bg: '#e0f2fe' };
  if (label.startsWith('SD')) return { color: '#10b981', bg: '#d1fae5' };
  return { color: '#64748b', bg: '#f1f5f9' };
};

const formatSize = (bytes) => {
  if (!bytes) return '';
  return bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / (1024*1024)).toFixed(1)} MB`;
};

>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
export default function DashboardPage({
  tl1Data, tl4Data,
  r1Entries, r2Data, r3Entries, r4Data, r5Data, r6Data,
  sd1Entries, sd2Entries, sd3Entries, sd4Entries, sd5Data, sd6Entries,
}) {
  const submission = SUBMISSION;

<<<<<<< HEAD
  // ── Real marks ──
  const tl       = calcTLTotal(tl1Data || {}, tl4Data || {});
  const research = calcResearchTotal(
    r1Entries || [], r2Data || {}, r3Entries || [],
    r4Data || {}, r5Data || {}, r6Data || {}
  );
  const sd    = calcSDTotal(
    sd1Entries || [], sd2Entries || [], sd3Entries || [],
    sd4Entries || [], sd5Data || {}, sd6Entries || []
  );
  const grand = calcGrandTotal(tl.total, research.total, sd.total);

  const totalHours  = submission.teaching.reduce((s, t) => s + t.hoursPerWeek, 0);
  const totalPMarks = submission.patents.reduce((s, p) => s + p.marks, 0);
=======
  const tl       = calcTLTotal(tl1Data || {}, tl4Data || {});
  const research = calcResearchTotal(r1Entries || [], r2Data || {}, r3Entries || [], r4Data || {}, r5Data || {}, r6Data || {});
  const sd       = calcSDTotal(sd1Entries || [], sd2Entries || [], sd3Entries || [], sd4Entries || [], sd5Data || {}, sd6Entries || []);
  const grand    = calcGrandTotal(tl.total, research.total, sd.total);

  const journalPaperCount = (r1Entries || []).filter(e => e.title).length;
  const patentCount       = (r6Data?.patents || []).filter(p => p.patentTitle).length;
  const fdpCount          = (sd1Entries || []).filter(e => e.title).length;
  const workshopCount     = (sd2Entries || []).filter(e => e.title).length;

  const recentProofs = extractAllProofs({ tl1Data, r1Entries, r2Data, r3Entries, r4Data, r5Data, r6Data, sd1Entries, sd2Entries, sd3Entries, sd4Entries, sd6Entries });

  const handleView = (filePath) => {
    const url = filePath.startsWith('http') ? filePath : `http://localhost:5000${filePath}`;
    window.open(url, '_blank');
  };
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

<<<<<<< HEAD
      {/* Page heading */}
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: 0 }}>
          Welcome back, Er. Rishamjot kaur
        </h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 14 }}>
          Academic Year 2024-25 · Submission Overview
        </p>
      </div>

      {/* ── Stat cards — UI bilkul same, sirf Total Score real hai ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <StatCard
          title="Total Score"
          value={`${grand.total.toFixed(1)} / 300`}
          subtitle={`${Math.round((grand.total / 300) * 100)}% completed`}
          icon={Award}
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Research Papers"
          value={submission.research.length}
          subtitle="Published this year"
          icon={FileText}
        />
        <StatCard
          title="Teaching Hours"
          value={`${totalHours}/week`}
          icon={BookOpen}
        />
        <StatCard
          title="Patents"
          value={submission.patents.length}
          subtitle={`${totalPMarks} marks`}
          icon={Lightbulb}
        />
      </div>

      {/* ── Workflow status ── */}
=======
      {/* Heading */}
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: 0 }}>Welcome back, Er. Rishamjot kaur</h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 14 }}>Academic Year 2024-25 · Submission Overview</p>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <StatCard title="Total Score"     value={`${grand.total.toFixed(1)} / 300`} subtitle={`${Math.round((grand.total/300)*100)}% completed`} icon={Award} trend={{ value: 8, positive: true }} />
        <StatCard title="Research Papers" value={journalPaperCount} subtitle={journalPaperCount === 1 ? 'Journal paper' : 'Journal papers'} icon={FileText} />
        <StatCard title="Patents"         value={patentCount}       subtitle={patentCount === 1 ? 'Patent filed' : 'Patents filed'} icon={Lightbulb} />
        <StatCard title="FDPs / Workshops" value={fdpCount + workshopCount} subtitle={`${fdpCount} FDP · ${workshopCount} Workshop`} icon={BookOpen} />
      </div>

      {/* Workflow */}
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
      <div style={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Submission Status</h2>
          <StatusBadge status={submission.status} />
        </div>
        <WorkflowTracker status={submission.status} />
      </div>

<<<<<<< HEAD
      {/* ── Audit trail ── */}
      <div style={{ ...styles.card, padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Recent Activity</h2>
        </div>
        {submission.auditTrail.map((entry, i) => (
          <div key={i} style={{
            padding: '12px 20px',
            borderBottom: i < submission.auditTrail.length - 1 ? '1px solid #f1f5f9' : 'none',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 500, margin: 0, color: '#0f172a' }}>{entry.action}</p>
              <p style={{ fontSize: 12, color: '#94a3b8', margin: '2px 0 0' }}>by {entry.by}</p>
            </div>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>{entry.timestamp}</span>
          </div>
        ))}
=======
      {/* Recent Activity — PDF uploads */}
      <div style={{ ...styles.card, padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Recent Activity</h2>
          <span style={{ fontSize: 12, color: '#94a3b8', background: '#f1f5f9', padding: '2px 10px', borderRadius: 20, fontWeight: 500 }}>
            {recentProofs.length} uploads
          </span>
        </div>

        {recentProofs.length === 0 ? (
          // Empty state
          <div style={{ padding: '28px 20px', textAlign: 'center' }}>
            <FileIcon size={28} color="#cbd5e1" style={{ marginBottom: 8 }} />
            <p style={{ fontSize: 14, color: '#94a3b8', margin: 0 }}>No PDFs uploaded yet</p>
            <p style={{ fontSize: 12, color: '#cbd5e1', margin: '4px 0 0' }}>Upload proof PDFs in Data Entry sections</p>
          </div>
        ) : (
          recentProofs.slice(0, 6).map((proof, i) => {
            const { color, bg } = getLabelColor(proof.label);
            return (
              <div key={i} style={{
                padding: '12px 20px',
                borderBottom: i < Math.min(recentProofs.length, 6) - 1 ? '1px solid #f8fafc' : 'none',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                {/* Icon */}
                <div style={{ width: 34, height: 34, borderRadius: 8, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FileIcon size={16} color={color} />
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, margin: 0, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {proof.originalName || proof.fileName}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color, background: bg, padding: '1px 7px', borderRadius: 10 }}>
                      {proof.label}
                    </span>
                    {proof.size && <span style={{ fontSize: 11, color: '#94a3b8' }}>{formatSize(proof.size)}</span>}
                  </div>
                </div>

                {/* View button */}
                <button
                  onClick={() => handleView(proof.filePath)}
                  style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 7, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, fontWeight: 500, color: '#475569', cursor: 'pointer', flexShrink: 0 }}>
                  <ExternalLink size={12} /> View
                </button>
              </div>
            );
          })
        )}

        {/* Footer */}
        {recentProofs.length > 6 && (
          <div style={{ padding: '10px 20px', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>+{recentProofs.length - 6} more uploads in Data Entry</span>
          </div>
        )}
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
      </div>

    </div>
  );
<<<<<<< HEAD
}

// ?????
=======
}
>>>>>>> 028cc01874988f9546e34c00a35016ffbdb6fac9
