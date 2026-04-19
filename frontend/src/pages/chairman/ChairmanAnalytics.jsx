import { useState, useEffect } from 'react';
import { TrendingUp, Award, Users, BarChart2 } from 'lucide-react';

const BASE_URL = 'http://localhost:5000/api/chairman';
const DEPT_COLORS = { CSE:'#6366f1', ECE:'#0ea5e9', ME:'#10b981', CE:'#f59e0b', EE:'#ef4444', IT:'#8b5cf6' };
const getDeptColor = (d) => DEPT_COLORS[d] || '#64748b';

function HBar({ label, value, max, color, subtitle }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-main,#0f172a)' }}>{label}</span>
          {subtitle && <span style={{ fontSize: 11, color: 'var(--text-sub,#94a3b8)', marginLeft: 8 }}>{subtitle}</span>}
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>{value.toFixed(1)}<span style={{ fontSize: 10, color: 'var(--text-sub,#94a3b8)' }}>/{max}</span></span>
      </div>
      <div style={{ height: 10, background: 'var(--bg-hover,#f1f5f9)', borderRadius: 5, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg,${color},${color}bb)`, borderRadius: 5, transition: 'width 0.8s ease' }} />
      </div>
    </div>
  );
}

function VBars({ data }) {
  const maxVal = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 130, padding: '0 4px' }}>
      {data.map((d, i) => {
        const pct = (d.value / maxVal) * 100;
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: d.color }}>{d.value}</span>
            <div style={{ width: '100%', height: 100, display: 'flex', alignItems: 'flex-end' }}>
              <div style={{ width: '100%', height: `${Math.max(pct, 3)}%`, background: d.color, borderRadius: '4px 4px 0 0', opacity: 0.85 }} />
            </div>
            <span style={{ fontSize: 10, color: 'var(--text-sub,#64748b)', fontWeight: 600 }}>{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function ChairmanAnalytics() {
  const [submissions, setSubmissions] = useState([]);
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch(`${BASE_URL}/submissions`);
        const data = await res.json();
        if (res.ok) setSubmissions(data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    })();
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', height: '60vh', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 36, height: 36, border: '3px solid #e2e8f0', borderTop: '3px solid #6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  const total      = submissions.length;
  const overallAvg = total > 0 ? submissions.reduce((s, r) => s + (r.calculatedMarks?.grandTotal || 0), 0) / total : 0;
  const highest    = Math.max(...submissions.map(s => s.calculatedMarks?.grandTotal || 0), 0);

  // Dept map
  const deptMap = {};
  submissions.forEach((s) => {
    const dept = s.department || 'CSE';
    if (!deptMap[dept]) deptMap[dept] = { count:0, tl:0, r:0, sd:0, total:0 };
    deptMap[dept].count++;
    deptMap[dept].tl    += s.calculatedMarks?.tl       || 0;
    deptMap[dept].r     += s.calculatedMarks?.research || 0;
    deptMap[dept].sd    += s.calculatedMarks?.sd       || 0;
    deptMap[dept].total += s.calculatedMarks?.grandTotal || 0;
  });

  const deptList = Object.entries(deptMap).map(([dept, d]) => ({
    dept,
    avg:   d.count > 0 ? d.total / d.count : 0,
    avgTL: d.count > 0 ? d.tl / d.count : 0,
    avgR:  d.count > 0 ? d.r  / d.count : 0,
    avgSD: d.count > 0 ? d.sd / d.count : 0,
    count: d.count,
    color: getDeptColor(dept),
  })).sort((a, b) => b.avg - a.avg);

  // Marks distribution
  const ranges = [
    { label: '0-100',   count: 0, color: '#ef4444' },
    { label: '101-150', count: 0, color: '#f59e0b' },
    { label: '151-200', count: 0, color: '#0ea5e9' },
    { label: '201-250', count: 0, color: '#6366f1' },
    { label: '251-300', count: 0, color: '#10b981' },
  ];
  submissions.forEach((s) => {
    const m = s.calculatedMarks?.grandTotal || 0;
    if      (m <= 100) ranges[0].count++;
    else if (m <= 150) ranges[1].count++;
    else if (m <= 200) ranges[2].count++;
    else if (m <= 250) ranges[3].count++;
    else               ranges[4].count++;
  });

  // Section averages
  const avgTL = total > 0 ? submissions.reduce((s, r) => s + (r.calculatedMarks?.tl || 0), 0) / total : 0;
  const avgR  = total > 0 ? submissions.reduce((s, r) => s + (r.calculatedMarks?.research || 0), 0) / total : 0;
  const avgSD = total > 0 ? submissions.reduce((s, r) => s + (r.calculatedMarks?.sd || 0), 0) / total : 0;

  const summaryCards = [
    { label: 'Total Faculty',  value: total,                  icon: Users,      color: '#6366f1', bg: '#eef2ff', suffix: '' },
    { label: 'Institute Avg',  value: overallAvg.toFixed(1),  icon: TrendingUp, color: '#0ea5e9', bg: '#e0f2fe', suffix: '/300' },
    { label: 'Highest Score',  value: highest.toFixed(1),     icon: Award,      color: '#10b981', bg: '#d1fae5', suffix: '/300' },
    { label: 'Departments',    value: Object.keys(deptMap).length, icon: BarChart2, color: '#f59e0b', bg: '#fef3c7', suffix: '' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'Inter',sans-serif" }}>

      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-main,#0f172a)', margin: 0 }}>Analytics</h1>
        <p style={{ color: 'var(--text-sub,#64748b)', margin: '4px 0 0', fontSize: 14 }}>Institute wide performance — Academic Year 2024-25</p>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: 16 }}>
        {summaryCards.map((c) => (
          <div key={c.label} style={{ background: 'var(--bg-card,#fff)', border: '1px solid var(--border,#e2e8f0)', borderRadius: 14, padding: '16px 18px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <c.icon size={20} color={c.color} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: c.color, lineHeight: 1 }}>
                {c.value}<span style={{ fontSize: 11, fontWeight: 400, color: 'var(--text-sub,#94a3b8)' }}>{c.suffix}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-sub,#64748b)', marginTop: 3 }}>{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ background: 'var(--bg-card,#fff)', border: '1px solid var(--border,#e2e8f0)', borderRadius: 14, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main,#0f172a)', marginBottom: 4 }}>Marks Distribution</div>
          <div style={{ fontSize: 11, color: 'var(--text-sub,#94a3b8)', marginBottom: 18 }}>Faculty count per score range</div>
          <VBars data={ranges.map(r => ({ label: r.label, value: r.count, color: r.color }))} />
        </div>
        <div style={{ background: 'var(--bg-card,#fff)', border: '1px solid var(--border,#e2e8f0)', borderRadius: 14, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main,#0f172a)', marginBottom: 4 }}>Section Wise Average</div>
          <div style={{ fontSize: 11, color: 'var(--text-sub,#94a3b8)', marginBottom: 18 }}>Institute wide section averages</div>
          <HBar label="Teaching Learning" value={avgTL} max={110} color="#6366f1" subtitle="max 110" />
          <HBar label="Research"          value={avgR}  max={125} color="#0ea5e9" subtitle="max 125" />
          <HBar label="Self Development"  value={avgSD} max={65}  color="#10b981" subtitle="max 65"  />
        </div>
      </div>

      {/* Dept comparison table */}
      <div style={{ background: 'var(--bg-card,#fff)', border: '1px solid var(--border,#e2e8f0)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border,#e2e8f0)' }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main,#0f172a)' }}>Department Comparison</div>
          <div style={{ fontSize: 11, color: 'var(--text-sub,#94a3b8)', marginTop: 2 }}>Ranked by average total score</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr>
                {['Rank','Department','Faculty','Avg TL','Avg Research','Avg SD','Avg Total'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-sub,#64748b)', textTransform: 'uppercase', letterSpacing: '0.4px', borderBottom: '1px solid var(--border,#e2e8f0)', background: 'var(--bg-hover,#f8fafc)', whiteSpace: 'nowrap' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {deptList.map((d, i) => (
                <tr key={d.dept} style={{ borderBottom: i < deptList.length - 1 ? '1px solid var(--bg-hover,#f1f5f9)' : 'none' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: i===0?'#f59e0b':i===1?'#94a3b8':i===2?'#b45309':'var(--text-sub,#94a3b8)' }}>
                    {i===0?'🥇':i===1?'🥈':i===2?'🥉':`#${i+1}`}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: d.color, background: `${d.color}15`, padding: '3px 10px', borderRadius: 6 }}>{d.dept}</span>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-sub,#64748b)' }}>{d.count}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#6366f1' }}>{d.avgTL.toFixed(1)}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0ea5e9' }}>{d.avgR.toFixed(1)}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#10b981' }}>{d.avgSD.toFixed(1)}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 800, fontSize: 15, color: 'var(--text-main,#0f172a)' }}>{d.avg.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}