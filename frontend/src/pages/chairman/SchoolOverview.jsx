import { useState, useMemo } from 'react';
import { Search, Filter, Download, Users } from 'lucide-react';
import { DUMMY_DEPARTMENTS, DEPT_FACULTY } from '../../data/chairmanDummyData';

// ── Flatten all faculty with dept info ──
const ALL_FACULTY = DUMMY_DEPARTMENTS.flatMap((dept) =>
  (DEPT_FACULTY[dept.id] || []).map((f) => ({
    ...f,
    dept:    dept.name,
    deptId:  dept.id,
  }))
);

const DESIGNATIONS = ['All', 'Professor', 'Associate Professor', 'Assistant Professor', 'Sr. Lecturer'];
const DEPT_NAMES   = ['All', ...DUMMY_DEPARTMENTS.map(d => d.name)];

export default function SchoolOverview() {
  const [search,    setSearch]    = useState('');
  const [deptF,     setDeptF]     = useState('All');
  const [desigF,    setDesigF]    = useState('All');
  const [sortBy,    setSortBy]    = useState('name'); // name | score | dept
  const [page,      setPage]      = useState(1);
  const PER_PAGE = 20;

  const filtered = useMemo(() => {
    let list = ALL_FACULTY;
    if (search)          list = list.filter(f => f.name.toLowerCase().includes(search.toLowerCase()) || f.dept.toLowerCase().includes(search.toLowerCase()));
    if (deptF  !== 'All') list = list.filter(f => f.dept === deptF);
    if (desigF !== 'All') list = list.filter(f => f.designation === desigF);
    if (sortBy === 'score') list = [...list].sort((a,b) => parseFloat(b.score) - parseFloat(a.score));
    if (sortBy === 'dept')  list = [...list].sort((a,b) => a.dept.localeCompare(b.dept));
    if (sortBy === 'name')  list = [...list].sort((a,b) => a.name.localeCompare(b.name));
    return list;
  }, [search, deptF, desigF, sortBy]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const exportCSV = () => {
    const headers = ['#', 'Name', 'Department', 'Designation', 'Publications', 'Patents', 'FDPs', 'Score', 'Status'];
    const rows    = filtered.map((f, i) => [i+1, f.name, f.dept, f.designation, f.publications, f.patents, f.fdp, f.score, f.status]);
    const csv     = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const a       = document.createElement('a');
    a.href        = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download    = 'All_Faculty_Overview.csv';
    a.click();
  };

  const DEPT_COLORS = { Engineering:'#6366f1','Business Management':'#0ea5e9','Computer Science':'#10b981','Arts & Humanities':'#f59e0b',Sciences:'#8b5cf6',Medicine:'#ef4444',Law:'#ec4899',Architecture:'#14b8a6',Education:'#f97316','Social Sciences':'#06b6d4' };
  const getDC = (d) => DEPT_COLORS[d] || '#64748b';

  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif", display:'flex', flexDirection:'column', gap:20 }}>

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12 }}>
        <div>
          <h1 style={{ fontSize:22, fontWeight:700, color:'#0f172a', margin:0 }}>School Overview</h1>
          <p style={{ color:'#94a3b8', margin:'4px 0 0', fontSize:13 }}>
            All faculty members across all departments
          </p>
        </div>
        <button onClick={exportCSV} style={{ display:'flex', alignItems:'center', gap:7, padding:'9px 18px', borderRadius:8, border:'none', background:'#1e293b', color:'#fff', fontSize:13, fontWeight:600, cursor:'pointer' }}>
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Stat strip */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
        {[
          { label:'Total Faculty',   value: ALL_FACULTY.length,                   color:'#6366f1' },
          { label:'Departments',     value: DUMMY_DEPARTMENTS.length,             color:'#0ea5e9' },
          { label:'Showing',         value: filtered.length,                      color:'#10b981' },
          { label:'Avg Score',       value: (ALL_FACULTY.reduce((s,f)=>s+parseFloat(f.score),0)/ALL_FACULTY.length).toFixed(1), color:'#f59e0b' },
        ].map(s => (
          <div key={s.label} style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:10, padding:'14px 18px', boxShadow:'0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize:11, color:'#94a3b8', fontWeight:500, marginBottom:4 }}>{s.label}</div>
            <div style={{ fontSize:22, fontWeight:800, color:s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center' }}>

        {/* Search */}
        <div style={{ position:'relative', flex:1, minWidth:200 }}>
          <Search size={14} color="#94a3b8" style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)' }} />
          <input
            placeholder="Search by name or department…"
            value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={{ width:'100%', padding:'9px 12px 9px 32px', borderRadius:8, border:'1px solid #e2e8f0', background:'#fff', color:'#0f172a', fontSize:13, outline:'none', boxSizing:'border-box' }}
          />
        </div>

        {/* Dept filter */}
        <select value={deptF} onChange={e => { setDeptF(e.target.value); setPage(1); }}
          style={{ padding:'9px 12px', borderRadius:8, border:'1px solid #e2e8f0', background:'#fff', color:'#0f172a', fontSize:13, outline:'none', cursor:'pointer', minWidth:160 }}>
          {DEPT_NAMES.map(d => <option key={d}>{d}</option>)}
        </select>

        {/* Designation filter */}
        <select value={desigF} onChange={e => { setDesigF(e.target.value); setPage(1); }}
          style={{ padding:'9px 12px', borderRadius:8, border:'1px solid #e2e8f0', background:'#fff', color:'#0f172a', fontSize:13, outline:'none', cursor:'pointer', minWidth:160 }}>
          {DESIGNATIONS.map(d => <option key={d}>{d}</option>)}
        </select>

        {/* Sort */}
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
          style={{ padding:'9px 12px', borderRadius:8, border:'1px solid #e2e8f0', background:'#fff', color:'#0f172a', fontSize:13, outline:'none', cursor:'pointer' }}>
          <option value="name">Sort: Name</option>
          <option value="score">Sort: Score ↓</option>
          <option value="dept">Sort: Department</option>
        </select>

        {/* Count badge */}
        <div style={{ padding:'0 14px', height:38, display:'flex', alignItems:'center', borderRadius:8, background:'#fff', border:'1px solid #e2e8f0', fontSize:13, color:'#64748b', fontWeight:500, gap:6 }}>
          <Users size={14} color="#94a3b8" />
          {filtered.length} results
        </div>
      </div>

      {/* ── Table ── */}
      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:14, overflow:'hidden', boxShadow:'0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
            <thead>
              <tr style={{ background:'#f8fafc' }}>
                {['#','Faculty Name','Department','Designation','Publications','Patents','FDPs','Score /300','Status'].map(h => (
                  <th key={h} style={{ padding:'12px 16px', textAlign:'left', fontSize:11, fontWeight:700, color:'#64748b', textTransform:'uppercase', letterSpacing:'0.5px', whiteSpace:'nowrap', borderBottom:'1px solid #e2e8f0' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((f, i) => (
                <tr key={`${f.deptId}-${f.id}`}
                  style={{ borderBottom: i < paginated.length-1 ? '1px solid #f1f5f9' : 'none', transition:'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background='#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}
                >
                  <td style={{ padding:'11px 16px', color:'#94a3b8', fontWeight:500 }}>
                    {(page-1)*PER_PAGE + i + 1}
                  </td>
                  <td style={{ padding:'11px 16px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:30, height:30, borderRadius:'50%', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#fff', flexShrink:0 }}>
                        {f.name.split(' ').map(w=>w[0]).slice(0,2).join('')}
                      </div>
                      <span style={{ fontWeight:600, color:'#0f172a', whiteSpace:'nowrap' }}>{f.name}</span>
                    </div>
                  </td>
                  <td style={{ padding:'11px 16px' }}>
                    <span style={{ fontSize:11, fontWeight:600, color:getDC(f.dept), background:`${getDC(f.dept)}15`, padding:'3px 9px', borderRadius:6, whiteSpace:'nowrap' }}>
                      {f.dept}
                    </span>
                  </td>
                  <td style={{ padding:'11px 16px', color:'#64748b', whiteSpace:'nowrap' }}>{f.designation}</td>
                  <td style={{ padding:'11px 16px', fontWeight:700, color:'#8b5cf6', textAlign:'center' }}>{f.publications}</td>
                  <td style={{ padding:'11px 16px', fontWeight:700, color:'#0ea5e9', textAlign:'center' }}>{f.patents}</td>
                  <td style={{ padding:'11px 16px', fontWeight:700, color:'#10b981', textAlign:'center' }}>{f.fdp}</td>
                  <td style={{ padding:'11px 16px' }}>
                    <span style={{ fontSize:15, fontWeight:800, color:'#0f172a' }}>{f.score}</span>
                  </td>
                  <td style={{ padding:'11px 16px' }}>
                    <span style={{ fontSize:11, fontWeight:600, padding:'3px 10px', borderRadius:20, background:'#d1fae5', color:'#065f46' }}>
                      {f.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div style={{ padding:32, textAlign:'center', color:'#94a3b8', fontSize:13 }}>No faculty found</div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div style={{ padding:'12px 20px', borderTop:'1px solid #f1f5f9', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <span style={{ fontSize:12, color:'#94a3b8' }}>
              Showing {(page-1)*PER_PAGE+1}–{Math.min(page*PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div style={{ display:'flex', gap:6 }}>
              <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1}
                style={{ padding:'5px 12px', borderRadius:7, border:'1px solid #e2e8f0', background: page===1?'#f8fafc':'#fff', color: page===1?'#cbd5e1':'#475569', fontSize:12, cursor: page===1?'not-allowed':'pointer', fontWeight:500 }}>
                ← Prev
              </button>
              {Array.from({length: Math.min(totalPages,5)}, (_,i) => {
                const p = page <= 3 ? i+1 : page + i - 2;
                if (p < 1 || p > totalPages) return null;
                return (
                  <button key={p} onClick={() => setPage(p)}
                    style={{ width:32, height:32, borderRadius:7, border:'1px solid #e2e8f0', background: p===page?'#6366f1':'#fff', color: p===page?'#fff':'#475569', fontSize:12, cursor:'pointer', fontWeight: p===page?700:400 }}>
                    {p}
                  </button>
                );
              })}
              <button onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page===totalPages}
                style={{ padding:'5px 12px', borderRadius:7, border:'1px solid #e2e8f0', background: page===totalPages?'#f8fafc':'#fff', color: page===totalPages?'#cbd5e1':'#475569', fontSize:12, cursor: page===totalPages?'not-allowed':'pointer', fontWeight:500 }}>
                Next →
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

