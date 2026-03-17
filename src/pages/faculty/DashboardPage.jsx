import { Award, FileText, BookOpen, Lightbulb } from 'lucide-react';
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

export default function DashboardPage({
  tl1Data, tl4Data,
  r1Entries, r2Data, r3Entries, r4Data, r5Data, r6Data,
  sd1Entries, sd2Entries, sd3Entries, sd4Entries, sd5Data, sd6Entries,
}) {
  const submission = SUBMISSION;

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

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
      <div style={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Submission Status</h2>
          <StatusBadge status={submission.status} />
        </div>
        <WorkflowTracker status={submission.status} />
      </div>

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
      </div>

    </div>
  );
}