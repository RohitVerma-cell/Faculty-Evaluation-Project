// ── pages/DashboardPage.jsx ──

import { Award, FileText, BookOpen, Lightbulb } from 'lucide-react';
import StatCard        from '../components/StatCard';
import StatusBadge     from '../components/StatusBadge';
import WorkflowTracker from '../components/WorkflowTracker';
import SUBMISSION      from '../data/mockData';
import styles          from '../utils/styles';

/**
 * DashboardPage
 * Displays score summary, workflow status, and recent activity.
 */
export default function DashboardPage() {
  const submission = SUBMISSION;

  const totalHours  = submission.teaching.reduce((s, t) => s + t.hoursPerWeek, 0);
  const totalPMarks = submission.patents.reduce((s, p) => s + p.marks, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Page heading */}
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: 0 }}>
          Welcome back, Dr. Ananya
        </h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: 14 }}>
          Academic Year 2024-25 · Submission Overview
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <StatCard
          title="Total Score"
          value={submission.totalScore}
          subtitle="Out of 100"
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

      {/* Workflow status */}
      <div style={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, margin: 0 }}>Submission Status</h2>
          <StatusBadge status={submission.status} />
        </div>
        <WorkflowTracker status={submission.status} />
      </div>

      {/* Audit trail */}
      <div style={{ ...styles.card, padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Recent Activity</h2>
        </div>

        {submission.auditTrail.map((entry, i) => (
          <div
            key={i}
            style={{
              padding: '12px 20px',
              borderBottom: i < submission.auditTrail.length - 1 ? '1px solid #f1f5f9' : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <p style={{ fontSize: 14, fontWeight: 500, margin: 0, color: '#0f172a' }}>
                {entry.action}
              </p>
              <p style={{ fontSize: 12, color: '#94a3b8', margin: '2px 0 0' }}>
                by {entry.by}
              </p>
            </div>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>{entry.timestamp}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

// ?????