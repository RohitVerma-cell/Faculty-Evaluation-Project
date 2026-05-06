import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Search } from 'lucide-react';
import { useState } from 'react';
import { DUMMY_DEPARTMENTS, DEPT_FACULTY } from '../../data/chairmanDummyData';

export default function DepartmentDetail() {
  const { deptId }    = useParams();
  const navigate      = useNavigate();
  const [search, setSearch] = useState('');

  const dept    = DUMMY_DEPARTMENTS.find(d => d.id === deptId);
  const faculty = DEPT_FACULTY[deptId] || [];

  if (!dept) return (
    <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>
      Department not found.
      <button onClick={() => navigate('/chairman/dashboard')} style={{ display: 'block', margin: '12px auto', color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}>
        ← Back to Dashboard
      </button>
    </div>
  );

  const filtered = faculty.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.designation.toLowerCase().includes(search.toLowerCase())
  );

  // Export CSV
  const exportCSV = () => {
    const headers = ['#','Name','Designation','Publications','Patents','FDPs','Score','Status'];
    const rows    = filtered.map((f, i) => [
      i+1, f.name, f.designation, f.publications, f.patents, f.fdp, f.score, f.status
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const a   = document.createElement('a');
    a.href    = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = `${dept.name}_Faculty_Report.csv`;
    a.click();
  };

  return (
    <div style={{ fontFamily: "'Segoe UI',system-ui,sans-serif", display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={() => navigate('/chairman/dashboard')} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 14px', borderRadius: 8,
            border: '1px solid #e2e8f0', background: '#fff',
            color: '#475569', fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}>
            <ArrowLeft size={14} /> Back
          </button>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>
              {dept.name}
            </h1>
            <p style={{ color: '#94a3b8', margin: '3px 0 0', fontSize: 13 }}>
              Faculty list · {dept.faculty} members
            </p>
          </div>
        </div>
        <button onClick={exportCSV} style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '9px 18px', borderRadius: 8, border: 'none',
          background: '#1e293b', color: '#fff',
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>
          <Download size={14} /> Export
        </button>
      </div>

      {/* ── Dept stat strip ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {[
          { label: 'Total Faculty',  val: dept.faculty      },
          { label: 'Publications',   val: dept.publications  },
          { label: 'Patents',        val: dept.patents       },
          { label: 'Avg Result',     val: dept.avgResult     },
        ].map((s) => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '14px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500, marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>{s.val}</div>
          </div>
        ))}
      </div>

      {/* ── Search ── */}
      <div style={{ position: 'relative', maxWidth: 320 }}>
        <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
        <input
          placeholder="Search faculty…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '9px 12px 9px 32px',
            borderRadius: 8, border: '1px solid #e2e8f0',
            background: '#fff', color: '#0f172a',
            fontSize: 13, outline: 'none', boxSizing: 'border-box',
          }}
        />
      </div>

      {/* ── Faculty Table ── */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['#','Faculty Name','Designation','Publications','Patents','FDPs','Score /300','Status'].map(h => (
                  <th key={h} style={{
                    padding: '12px 16px', textAlign: 'left',
                    fontSize: 11, fontWeight: 700,
                    color: '#64748b', textTransform: 'uppercase',
                    letterSpacing: '0.5px', whiteSpace: 'nowrap',
                    borderBottom: '1px solid #e2e8f0',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((f, i) => (
                <tr key={f.id} style={{
                  borderBottom: i < filtered.length - 1 ? '1px solid #f1f5f9' : 'none',
                  transition: 'background 0.1s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '12px 16px', color: '#94a3b8', fontWeight: 500 }}>{i + 1}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0,
                      }}>
                        {f.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                      </div>
                      <span style={{ fontWeight: 600, color: '#0f172a' }}>{f.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#64748b' }}>{f.designation}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#8b5cf6', textAlign: 'center' }}>{f.publications}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#0ea5e9', textAlign: 'center' }}>{f.patents}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#10b981', textAlign: 'center' }}>{f.fdp}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 15, fontWeight: 800, color: '#0f172a' }}>{f.score}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      fontSize: 11, fontWeight: 600,
                      padding: '3px 10px', borderRadius: 20,
                      background: '#d1fae5', color: '#065f46',
                    }}>
                      {f.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: '32px', textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
            No faculty found
          </div>
        )}
      </div>

    </div>
  );
}