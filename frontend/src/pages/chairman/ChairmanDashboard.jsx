import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Download } from 'lucide-react';
import { DUMMY_DEPARTMENTS, TOTALS } from '../../data/chairmanDummyData';

// ─── Recharts-free SVG Bar Chart ───────────────────────────────
function SVGBarChart({ data, barColor, label }) {
  const [tip, setTip] = useState(null);
  const PAD_L = 32, PAD_B = 52, PAD_T = 16, PAD_R = 8;
  const W = 460, H = 200;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;
  const maxVal = Math.max(...data.map(d => d.value), 1);
  const barW   = Math.floor(chartW / data.length * 0.55);
  const gap    = chartW / data.length;

  const yTicks = [0, 30, 60, 90, 120];

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        {/* Grid lines + y labels */}
        {yTicks.map(t => {
          const y = PAD_T + chartH - (t / maxVal) * chartH;
          return (
            <g key={t}>
              <line x1={PAD_L} y1={y} x2={W - PAD_R} y2={y}
                stroke="#f1f5f9" strokeWidth={1} />
              <text x={PAD_L - 4} y={y + 3.5} textAnchor="end"
                fontSize={9} fill="#94a3b8">{t}</text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, i) => {
          const bH  = Math.max((d.value / maxVal) * chartH, 2);
          const x   = PAD_L + i * gap + (gap - barW) / 2;
          const y   = PAD_T + chartH - bH;
          const lx  = PAD_L + i * gap + gap / 2;
          const ly  = H - PAD_B + 12;
          return (
            <g key={i}
              onMouseEnter={() => setTip({ x, y, val: d.value, name: d.name })}
              onMouseLeave={() => setTip(null)}
              style={{ cursor: 'pointer' }}>
              <rect x={x} y={y} width={barW} height={bH}
                rx={3} fill={barColor} opacity={tip?.name === d.name ? 1 : 0.8} />
              {/* x label — rotated */}
              <text x={lx} y={ly} textAnchor="end"
                fontSize={8.5} fill="#64748b"
                transform={`rotate(-40 ${lx} ${ly})`}>
                {d.name.length > 10 ? d.name.slice(0, 10) + '…' : d.name}
              </text>
            </g>
          );
        })}

        {/* Tooltip */}
        {tip && (
          <g>
            <rect x={tip.x - 2} y={tip.y - 32} width={68} height={26}
              rx={5} fill="white" stroke="#e2e8f0" strokeWidth={1}
              style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,.12))' }} />
            <text x={tip.x + 32} y={tip.y - 20} textAnchor="middle"
              fontSize={9.5} fontWeight="700" fill="#0f172a">{tip.name}</text>
            <text x={tip.x + 32} y={tip.y - 10} textAnchor="middle"
              fontSize={9} fill={barColor}>{label}: {tip.val}</text>
          </g>
        )}
      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: barColor }} />
          <span style={{ fontSize: 11, color: '#64748b' }}>{label}</span>
        </div>
      </div>
    </div>
  );
}

// Two-bar chart for Patents & Research
function DoubleBarChart({ data }) {
  const [tip, setTip] = useState(null);
  const PAD_L = 32, PAD_B = 52, PAD_T = 16, PAD_R = 8;
  const W = 460, H = 220;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;
  const maxVal = Math.max(...data.flatMap(d => [d.patents, d.research]), 1);
  const groupW = chartW / data.length;
  const bW     = Math.floor(groupW * 0.3);
  const yTicks = [0, 30, 60, 90, 120];

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        {yTicks.map(t => {
          const y = PAD_T + chartH - (t / maxVal) * chartH;
          return (
            <g key={t}>
              <line x1={PAD_L} y1={y} x2={W - PAD_R} y2={y} stroke="#f1f5f9" strokeWidth={1} />
              <text x={PAD_L - 4} y={y + 3.5} textAnchor="end" fontSize={9} fill="#94a3b8">{t}</text>
            </g>
          );
        })}

        {data.map((d, i) => {
          const gx  = PAD_L + i * groupW;
          const cx  = gx + groupW / 2;
          const ly  = H - PAD_B + 12;

          const pH  = Math.max((d.patents  / maxVal) * chartH, 2);
          const rH  = Math.max((d.research / maxVal) * chartH, 2);
          const px  = gx + groupW / 2 - bW - 2;
          const rx  = gx + groupW / 2 + 2;

          const hov = tip?.i === i;
          return (
            <g key={i}
              onMouseEnter={() => setTip({ i, d })}
              onMouseLeave={() => setTip(null)}
              style={{ cursor: 'pointer' }}>
              {/* Patents bar */}
              <rect x={px} y={PAD_T + chartH - pH} width={bW} height={pH}
                rx={3} fill="#6366f1" opacity={hov ? 1 : 0.8} />
              {/* Research bar */}
              <rect x={rx} y={PAD_T + chartH - rH} width={bW} height={rH}
                rx={3} fill="#8b5cf6" opacity={hov ? 1 : 0.8} />
              {/* x label */}
              <text x={cx} y={ly} textAnchor="end" fontSize={8.5} fill="#64748b"
                transform={`rotate(-40 ${cx} ${ly})`}>
                {d.name.length > 10 ? d.name.slice(0, 10) + '…' : d.name}
              </text>
            </g>
          );
        })}

        {/* Tooltip */}
        {tip && (
          <g>
            <rect
              x={PAD_L + tip.i * groupW + groupW/2 - 46}
              y={PAD_T + chartH - Math.max((tip.d.research/maxVal)*chartH, 2) - 52}
              width={92} height={46} rx={5}
              fill="white" stroke="#e2e8f0" strokeWidth={1}
              style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,.12))' }} />
            <text x={PAD_L + tip.i * groupW + groupW/2}
              y={PAD_T + chartH - Math.max((tip.d.research/maxVal)*chartH, 2) - 38}
              textAnchor="middle" fontSize={9.5} fontWeight="700" fill="#0f172a">{tip.d.name}</text>
            <text x={PAD_L + tip.i * groupW + groupW/2}
              y={PAD_T + chartH - Math.max((tip.d.research/maxVal)*chartH, 2) - 26}
              textAnchor="middle" fontSize={9} fill="#6366f1">Patents : {tip.d.patents}</text>
            <text x={PAD_L + tip.i * groupW + groupW/2}
              y={PAD_T + chartH - Math.max((tip.d.research/maxVal)*chartH, 2) - 14}
              textAnchor="middle" fontSize={9} fill="#8b5cf6">Research : {tip.d.research}</text>
          </g>
        )}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 4 }}>
        {[['#6366f1','Patents'],['#8b5cf6','Research']].map(([c,l]) => (
          <div key={l} style={{ display:'flex', alignItems:'center', gap:5 }}>
            <div style={{ width:12, height:12, borderRadius:3, background:c }} />
            <span style={{ fontSize:11, color:'#64748b' }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────
export default function ChairmanDashboard() {
  const { user }  = useAuth();
  const navigate  = useNavigate();

  const statCards = [
    { label: 'Total Faculty',      value: TOTALS.faculty,      emoji: '👥', color: '#6366f1', bg: '#eef2ff' },
    { label: 'Total Publications', value: TOTALS.publications, emoji: '📄', color: '#8b5cf6', bg: '#f5f3ff' },
    { label: 'Total Patents',      value: TOTALS.patents,      emoji: '🏅', color: '#0ea5e9', bg: '#e0f2fe' },
    { label: 'Total Consultancy',  value: TOTALS.consultancy,  emoji: '💼', color: '#f59e0b', bg: '#fef3c7' },
    { label: 'Total FDPs',         value: TOTALS.fdp,          emoji: '📈', color: '#ef4444', bg: '#fee2e2' },
  ];

  const chartData = DUMMY_DEPARTMENTS.map(d => ({
    name:     d.name,
    patents:  d.patents,
    research: d.publications,
    fdp:      d.fdp,
  }));

  const exportReport = () => {
    const rows = DUMMY_DEPARTMENTS.map((d,i) => `
      <tr style="border-bottom:1px solid #e2e8f0;${i%2===0?'background:#f8fafc':''}">
        <td style="padding:8px 12px">${i+1}</td>
        <td style="padding:8px 12px;font-weight:600">${d.name}</td>
        <td style="padding:8px 12px">${d.faculty}</td>
        <td style="padding:8px 12px">${d.publications}</td>
        <td style="padding:8px 12px">${d.patents}</td>
        <td style="padding:8px 12px;font-weight:700;color:#6366f1">${d.avgResult}</td>
      </tr>`).join('');
    const win = window.open('','_blank');
    win.document.write(`<!DOCTYPE html><html><head><title>Chairman Report</title>
      <style>body{font-family:sans-serif;padding:24px}h1{font-size:22px;margin:0 0 4px}p{color:#64748b;font-size:13px;margin:0 0 20px}table{width:100%;border-collapse:collapse;font-size:13px}th{background:#1e293b;color:#fff;padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase}</style>
      </head><body>
      <h1>SAP 2025 — Chairman Report</h1>
      <p>Generated ${new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'long',year:'numeric'})}</p>
      <table><thead><tr><th>#</th><th>Department</th><th>Faculty</th><th>Publications</th><th>Patents</th><th>Avg Result</th></tr></thead>
      <tbody>${rows}</tbody></table></body></html>`);
    win.document.close(); win.print();
  };

  return (
    <div style={{ fontFamily: "'Segoe UI',system-ui,sans-serif", display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#0f172a', margin: 0, letterSpacing: '-0.4px' }}>
            Chairman Dashboard
          </h1>
          <p style={{ color: '#94a3b8', margin: '4px 0 0', fontSize: 13 }}>
            High-level analytics and institutional overview
          </p>
        </div>
        <button onClick={exportReport} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 20px', borderRadius: 8, border: 'none',
          background: '#1e293b', color: '#fff',
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>
          <Download size={14} /> Export Report
        </button>
      </div>

      {/* ── 5 Stat Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14 }}>
        {statCards.map((c) => (
          <div key={c.label} style={{
            background: '#fff', border: '1px solid #e2e8f0',
            borderRadius: 12, padding: '18px 16px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 6, fontWeight: 500 }}>{c.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{c.value}</div>
            </div>
            <div style={{
              width: 46, height: 46, borderRadius: 12,
              background: c.bg, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 22,
            }}>
              {c.emoji}
            </div>
          </div>
        ))}
      </div>

      {/* ── School Performance Comparison ── */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 18px' }}>
          School Performance Comparison
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {DUMMY_DEPARTMENTS.map((dept) => (
            <div key={dept.id}
              onClick={() => navigate(`/chairman/department/${dept.id}`)}
              style={{
                border: '1px solid #e2e8f0', borderRadius: 10,
                padding: '14px 14px', cursor: 'pointer',
                transition: 'all 0.18s',
                background: '#fff',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#6366f1';
                e.currentTarget.style.boxShadow  = '0 4px 14px rgba(99,102,241,0.12)';
                e.currentTarget.style.transform  = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow  = 'none';
                e.currentTarget.style.transform  = 'none';
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>
                {dept.name}
              </div>
              {[
                { label: 'Faculty:',      val: dept.faculty      },
                { label: 'Publications:', val: dept.publications  },
                { label: 'Patents:',      val: dept.patents       },
                { label: 'Avg Result:',   val: dept.avgResult, accent: true },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>{row.label}</span>
                  <span style={{ fontSize: 12, fontWeight: row.accent ? 700 : 600, color: row.accent ? '#6366f1' : '#0f172a' }}>
                    {row.val}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Charts Row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* Patents & Research */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>
            Patents & Research Comparison
          </h2>
          <DoubleBarChart data={chartData} />
        </div>

        {/* FDP Activities */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>
            FDP Activities Comparison
          </h2>
          <SVGBarChart
            data={chartData.map(d => ({ name: d.name, value: d.fdp }))}
            barColor="#10b981"
            label="FDP Count"
          />
        </div>

      </div>

    </div>
  );
}