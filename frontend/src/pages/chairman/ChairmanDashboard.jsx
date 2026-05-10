import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Users, TrendingUp, Award, BarChart2, ArrowRight, Eye,
} from 'lucide-react';

const BASE_URL = 'http://localhost:5000/api/chairman';

const DEPT_COLORS = {
  CSE: '#6366f1', ECE: '#0ea5e9', ME: '#10b981',
  CE: '#f59e0b', EE: '#ef4444', IT: '#8b5cf6',
};
const getDeptColor = (d) => DEPT_COLORS[d] || '#64748b';

// ── Simple vertical bar chart ──
function BarChart({ data }) {
  if (!data?.length) return <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13, padding: '20px 0' }}>No data</p>;
  const maxVal = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 150, padding: '0 4px' }}>
      {data.map((d, i) => {
        const pct = (d.value / maxVal) * 100;
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: d.color }}>{d.value}</span>
            <div style={{ width: '100%', height: 110, display: 'flex', alignItems: 'flex-end' }}>
              <div style={{ width: '100%', height: `${Math.max(pct, 4)}%`, background: `linear-gradient(180deg,${d.color},${d.color}88)`, borderRadius: '5px 5px 0 0', transition: 'height 0.6s ease' }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-sub,#64748b)' }}>{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function ChairmanDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({ total: 0, avgMarks: 0, departments: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [subRes, statRes] = await Promise.all([
          fetch(`${BASE_URL}/submissions`),
          fetch(`${BASE_URL}/stats`),
        ]);
        const submissions = await subRes.json();
        const statsData = await statRes.json();
        if (subRes.ok) setData(submissions);
        if (statRes.ok) setStats(statsData);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    })();
  }, []);

  // ── Top 5 ──
  const top5 = [...data]
    .sort((a, b) => (b.calculatedMarks?.grandTotal || 0) - (a.calculatedMarks?.grandTotal || 0))
    .slice(0, 5);

  // ── Bar chart data — dept count ──
  const chartData = stats.departments.map(d => ({
    label: d.dept, value: d.count, color: getDeptColor(d.dept),
  }));

  // ── Dept grouped (top 3 per dept) ──
  const deptGroups = {};
  data.forEach((s) => {
    const dept = s.department || 'CSE';
    if (!deptGroups[dept]) deptGroups[dept] = [];
    deptGroups[dept].push(s);
  });

  const summaryCards = [
    { label: 'Total Approved', value: stats.total, icon: Users, color: '#6366f1', bg: '#eef2ff' },
    { label: 'Institute Avg', value: `${stats.avgMarks}/300`, icon: TrendingUp, color: '#0ea5e9', bg: '#e0f2fe' },
    { label: 'Departments', value: stats.departments.length, icon: BarChart2, color: '#10b981', bg: '#d1fae5' },
    { label: 'Top Score', value: top5[0]?.calculatedMarks?.grandTotal?.toFixed(1) || '—', icon: Award, color: '#f59e0b', bg: '#fef3c7' },
  ];

  if (loading) return (
    <div style={{ display: 'flex', height: '60vh', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 36, height: 36, border: '3px solid #e2e8f0', borderTop: '3px solid #6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 10px' }} />
        <p style={{ color: '#64748b', fontSize: 13, margin: 0 }}>Loading…</p>
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: "'Inter',sans-serif" }}>

      {/* Heading */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-main,#0f172a)', margin: 0 }}>
            Welcome, {user?.name || 'Chairman'} 👋
          </h1>
          <p style={{ color: 'var(--text-sub,#64748b)', margin: '4px 0 0', fontSize: 14 }}>
            Academic Year 2024-25 · Read Only View
          </p>
        </div>
        {/* Institute avg badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: 12, boxShadow: '0 4px 14px rgba(99,102,241,0.3)' }}>
          <TrendingUp size={18} color="#fff" />
          <div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Institute Average</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>
              {stats.avgMarks} <span style={{ fontSize: 11, fontWeight: 400 }}>/ 300</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 16 }}>
        {summaryCards.map((c) => (
          <div key={c.label} style={{ background: 'var(--bg-card,#fff)', border: '1px solid var(--border,#e2e8f0)', borderRadius: 14, padding: '18px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 14, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -10, top: -10, width: 65, height: 65, borderRadius: '50%', background: c.bg, opacity: 0.5 }} />
            <div style={{ width: 44, height: 44, borderRadius: 11, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <c.icon size={20} color={c.color} />
            </div>
            <div>
              <div style={{ fontSize: 26, fontWeight: 800, color: c.color, lineHeight: 1 }}>{c.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-sub,#64748b)', marginTop: 3 }}>{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* Bar chart — dept faculty count */}
        <div style={{ background: 'var(--bg-card,#fff)', border: '1px solid var(--border,#e2e8f0)', borderRadius: 14, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart2 size={16} color="#6366f1" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main,#0f172a)' }}>Faculty per Department</div>
              <div style={{ fontSize: 11, color: 'var(--text-sub,#94a3b8)' }}>Approved submissions count</div>
            </div>
          </div>
          <BarChart data={chartData} />
        </div>

        {/* Top 5 */}
        <div style={{ background: 'var(--bg-card,#fff)', border: '1px solid var(--border,#e2e8f0)', borderRadius: 14, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={16} color="#f59e0b" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main,#0f172a)' }}>Top 5 Faculty</div>
              <div style={{ fontSize: 11, color: 'var(--text-sub,#94a3b8)' }}>Highest scorers institute wide</div>
            </div>
          </div>
          {top5.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13, padding: '20px 0' }}>No data yet</p>
          ) : (
            top5.map((s, i) => {
              const marks = s.calculatedMarks?.grandTotal || 0;
              const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
              const dept = s.department || 'CSE';
              return (
                <div key={s._id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{medals[i]}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
                      <div style={{ minWidth: 0 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-main,#0f172a)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block', maxWidth: 120 }}>{s.facultyName}</span>
                        <span style={{ fontSize: 10, fontWeight: 600, color: getDeptColor(dept), background: `${getDeptColor(dept)}15`, padding: '1px 6px', borderRadius: 4 }}>{dept}</span>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 800, color: '#6366f1', flexShrink: 0 }}>{marks.toFixed(1)}</span>
                    </div>
                    <div style={{ height: 4, background: 'var(--bg-hover,#f1f5f9)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${(marks / 300) * 100}%`, background: i === 0 ? '#f59e0b' : i === 1 ? '#94a3b8' : i === 2 ? '#b45309' : '#6366f1', borderRadius: 2 }} />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Department wise progress */}
      <div style={{ background: 'var(--bg-card,#fff)', border: '1px solid var(--border,#e2e8f0)', borderRadius: 14, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main,#0f172a)' }}>Department Overview</div>
            <div style={{ fontSize: 11, color: 'var(--text-sub,#94a3b8)', marginTop: 2 }}>Average marks per department</div>
          </div>
          <button onClick={() => navigate('/chairman/submissions')} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
            View All <ArrowRight size={13} />
          </button>
        </div>
        {stats.departments.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13, padding: '16px 0' }}>No data yet</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
            {[...stats.departments].sort((a, b) => b.avg - a.avg).map((d) => {
              const color = getDeptColor(d.dept);
              const pct = Math.round((d.avg / 300) * 100);
              return (
                <div key={d.dept} style={{ padding: '14px 16px', background: 'var(--bg-hover,#f8fafc)', borderRadius: 10, border: '1px solid var(--border,#e2e8f0)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-main,#0f172a)' }}>{d.dept}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-sub,#94a3b8)' }}>{d.count} faculty</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color }}>{d.avg}</span>
                  </div>
                  <div style={{ height: 7, background: 'var(--border,#e2e8f0)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 4, transition: 'width 0.6s ease' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                    <span style={{ fontSize: 10, color: 'var(--text-sub,#94a3b8)' }}>Avg score</span>
                    <span style={{ fontSize: 10, color: 'var(--text-sub,#94a3b8)' }}>{pct}% of max</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}