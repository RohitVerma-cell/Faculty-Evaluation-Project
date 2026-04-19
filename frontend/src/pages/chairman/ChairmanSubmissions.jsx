import { useState, useEffect } from 'react';
import { Search, Filter, Download, FileSpreadsheet } from 'lucide-react';

const BASE_URL = 'http://localhost:5000/api/chairman';

const DEPT_COLORS = {
  CSE: '#6366f1', ECE: '#0ea5e9', ME: '#10b981',
  CE:  '#f59e0b', EE:  '#ef4444', IT: '#8b5cf6',
};
const getDeptColor = (d) => DEPT_COLORS[d] || '#64748b';

// ── Export CSV ──
const exportCSV = (submissions) => {
  const headers = ['#', 'Faculty Name', 'Email', 'Department', 'TL', 'Research', 'SD', 'Total /300'];
  const rows = submissions.map((s, i) => [
    i + 1,
    s.facultyName || '',
    s.facultyEmail || '',
    s.department || 'CSE',
    s.calculatedMarks?.tl?.toFixed(2) || '0',
    s.calculatedMarks?.research?.toFixed(2) || '0',
    s.calculatedMarks?.sd?.toFixed(2) || '0',
    s.calculatedMarks?.grandTotal?.toFixed(2) || '0',
  ]);
  const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  const a   = document.createElement('a');
  a.href    = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = `Chairman_Report_${new Date().toLocaleDateString('en-IN').replace(/\//g,'-')}.csv`;
  a.click();
};

// ── Export PDF (print) ──
const exportPDF = (submissions) => {
  const rows = submissions.map((s, i) => `
    <tr style="border-bottom:1px solid #e2e8f0;${i%2===0 ? 'background:#f8fafc' : ''}">
      <td style="padding:8px 12px">${i+1}</td>
      <td style="padding:8px 12px;font-weight:600">${s.facultyName||''}</td>
      <td style="padding:8px 12px;color:#64748b">${s.department||'CSE'}</td>
      <td style="padding:8px 12px;color:#6366f1;font-weight:700">${s.calculatedMarks?.tl?.toFixed(1)||'0'}</td>
      <td style="padding:8px 12px;color:#0ea5e9;font-weight:700">${s.calculatedMarks?.research?.toFixed(1)||'0'}</td>
      <td style="padding:8px 12px;color:#10b981;font-weight:700">${s.calculatedMarks?.sd?.toFixed(1)||'0'}</td>
      <td style="padding:8px 12px;font-weight:800;font-size:15px">${s.calculatedMarks?.grandTotal?.toFixed(1)||'0'}</td>
    </tr>`).join('');

  const win = window.open('', '_blank');
  win.document.write(`<!DOCTYPE html><html><head>
    <title>Chairman Report — SAP 2025</title>
    <style>body{font-family:'Segoe UI',sans-serif;padding:24px}h1{font-size:20px;margin:0 0 4px}p{font-size:13px;color:#64748b;margin:0 0 20px}table{width:100%;border-collapse:collapse;font-size:13px}th{background:#1e293b;color:#fff;padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.5px}</style>
    </head><body>
    <h1>SAP 2025 — Chairman Report</h1>
    <p>Generated ${new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'long',year:'numeric'})} · Principal Approved Submissions</p>
    <table><thead><tr><th>#</th><th>Faculty</th><th>Dept</th><th>TL</th><th>Research</th><th>SD</th><th>Total</th></tr></thead>
    <tbody>${rows}</tbody></table></body></html>`);
  win.document.close();
  win.print();
};

export default function ChairmanSubmissions() {
  const [submissions,  setSubmissions]  = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [searchQuery,  setSearchQuery]  = useState('');
  const [deptFilter,   setDeptFilter]   = useState('All');
  const [sortBy,       setSortBy]       = useState('dept'); // 'dept' | 'marks'

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

  const departments = ['All', ...new Set(submissions.map(s => s.department || 'CSE'))];

  const filtered = submissions.filter((s) => {
    const matchSearch = s.facultyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        s.facultyEmail?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDept   = deptFilter === 'All' || (s.department || 'CSE') === deptFilter;
    return matchSearch && matchDept;
  });

  // ── Sort ──
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'marks') return (b.calculatedMarks?.grandTotal || 0) - (a.calculatedMarks?.grandTotal || 0);
    const da = a.department || 'CSE', db = b.department || 'CSE';
    if (da !== db) return da.localeCompare(db);
    return (b.calculatedMarks?.grandTotal || 0) - (a.calculatedMarks?.grandTotal || 0);
  });

  // ── Group by dept ──
  const grouped = {};
  sorted.forEach((s) => {
    const dept = s.department || 'CSE';
    if (!grouped[dept]) grouped[dept] = [];
    grouped[dept].push(s);
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontFamily: "'Inter',sans-serif" }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-main,#0f172a)', margin: 0 }}>All Submissions</h1>
          <p style={{ color: 'var(--text-sub,#64748b)', margin: '4px 0 0', fontSize: 14 }}>
            Principal approved — read only view · Sorted by department
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => exportCSV(filtered)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 9, border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, fontWeight: 500, color: '#059669', cursor: 'pointer' }}>
            <FileSpreadsheet size={15} /> Export Excel
          </button>
          <button onClick={() => exportPDF(filtered)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 9, border: 'none', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer', boxShadow: '0 2px 8px rgba(99,102,241,0.3)' }}>
            <Download size={15} /> Export PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
          <input placeholder="Search faculty…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '9px 12px 9px 32px', borderRadius: 8, border: '1px solid var(--border,#e2e8f0)', background: 'var(--bg-card,#fff)', color: 'var(--text-main,#0f172a)', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}
          style={{ padding: '9px 12px', borderRadius: 8, border: '1px solid var(--border,#e2e8f0)', background: 'var(--bg-card,#fff)', color: 'var(--text-main,#0f172a)', fontSize: 13, outline: 'none', cursor: 'pointer' }}>
          {departments.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: '9px 12px', borderRadius: 8, border: '1px solid var(--border,#e2e8f0)', background: 'var(--bg-card,#fff)', color: 'var(--text-main,#0f172a)', fontSize: 13, outline: 'none', cursor: 'pointer' }}>
          <option value="dept">Sort: Department</option>
          <option value="marks">Sort: Marks (High → Low)</option>
        </select>
        <div style={{ padding: '0 14px', height: 38, display: 'flex', alignItems: 'center', borderRadius: 8, background: 'var(--bg-card,#fff)', border: '1px solid var(--border,#e2e8f0)', fontSize: 13, color: 'var(--text-sub,#64748b)', fontWeight: 500 }}>
          {filtered.length} results
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-sub,#94a3b8)', fontSize: 13 }}>Loading…</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-sub,#94a3b8)', fontSize: 13 }}>No submissions found</div>
      ) : sortBy === 'dept' ? (
        // ── Department grouped view ──
        Object.entries(grouped).map(([dept, items]) => (
          <div key={dept} style={{ background: 'var(--bg-card,#fff)', border: '1px solid var(--border,#e2e8f0)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            {/* Dept header */}
            <div style={{ padding: '12px 20px', background: 'var(--bg-hover,#f8fafc)', borderBottom: '1px solid var(--border,#e2e8f0)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: getDeptColor(dept) }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: getDeptColor(dept) }}>{dept}</span>
              <span style={{ fontSize: 11, color: 'var(--text-sub,#94a3b8)' }}>{items.length} faculty</span>
              <span style={{ marginLeft: 'auto', fontSize: 12, fontWeight: 600, color: 'var(--text-sub,#64748b)' }}>
                Dept Avg: <strong style={{ color: getDeptColor(dept) }}>
                  {(items.reduce((s, i) => s + (i.calculatedMarks?.grandTotal || 0), 0) / items.length).toFixed(1)}
                </strong>
              </span>
            </div>
            <TableBody items={items} />
          </div>
        ))
      ) : (
        // ── Flat sorted view ──
        <div style={{ background: 'var(--bg-card,#fff)', border: '1px solid var(--border,#e2e8f0)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <TableBody items={sorted} showDept />
        </div>
      )}
    </div>
  );
}

function TableBody({ items, showDept = false }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            {['#', 'Faculty Name', showDept && 'Department', 'Email', 'TL /110', 'Research /125', 'SD /65', 'Total /300'].filter(Boolean).map(h => (
              <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-sub,#64748b)', textTransform: 'uppercase', letterSpacing: '0.4px', whiteSpace: 'nowrap', borderBottom: '1px solid var(--border,#e2e8f0)', background: 'var(--bg-hover,#f8fafc)' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((s, i) => {
            const marks = s.calculatedMarks || {};
            const dept  = s.department || 'CSE';
            return (
              <tr key={s._id} style={{ borderBottom: i < items.length - 1 ? '1px solid var(--bg-hover,#f1f5f9)' : 'none' }}>
                <td style={{ padding: '12px 14px', color: 'var(--text-sub,#94a3b8)', fontWeight: 500 }}>{i+1}</td>
                <td style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                      {s.facultyName?.split(' ').map(w => w[0]).slice(0,2).join('')}
                    </div>
                    <span style={{ fontWeight: 600, color: 'var(--text-main,#0f172a)', whiteSpace: 'nowrap' }}>{s.facultyName}</span>
                  </div>
                </td>
                {showDept && (
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: getDeptColor(dept), background: `${getDeptColor(dept)}15`, padding: '3px 9px', borderRadius: 6 }}>{dept}</span>
                  </td>
                )}
                <td style={{ padding: '12px 14px', color: 'var(--text-sub,#64748b)', fontSize: 12 }}>{s.facultyEmail}</td>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#6366f1' }}>{marks.tl?.toFixed(1) || '—'}</td>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0ea5e9' }}>{marks.research?.toFixed(1) || '—'}</td>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#10b981' }}>{marks.sd?.toFixed(1) || '—'}</td>
                <td style={{ padding: '12px 14px' }}>
                  <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-main,#0f172a)' }}>{marks.grandTotal?.toFixed(1) || '—'}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}