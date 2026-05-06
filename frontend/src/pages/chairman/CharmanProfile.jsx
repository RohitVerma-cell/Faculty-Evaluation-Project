import { useAuth } from '../../context/AuthContext';
import { Mail, Building2, Shield, Calendar, Award, Users, FileText } from 'lucide-react';
import { TOTALS, DUMMY_DEPARTMENTS } from '../../data/chairmanDummyData';

export default function ChairmanProfile() {
  const { user } = useAuth();

  const initials = (user?.name || 'C').split(' ').filter(Boolean).map(w=>w[0]).slice(0,2).join('');

  const stats = [
    { label:'Total Departments', value: DUMMY_DEPARTMENTS.length, icon: Building2, color:'#6366f1', bg:'#eef2ff' },
    { label:'Total Faculty',     value: TOTALS.faculty,           icon: Users,     color:'#0ea5e9', bg:'#e0f2fe' },
    { label:'Total Publications',value: TOTALS.publications,      icon: FileText,  color:'#8b5cf6', bg:'#f5f3ff' },
    { label:'Total Patents',     value: TOTALS.patents,           icon: Award,     color:'#f59e0b', bg:'#fef3c7' },
  ];

  const details = [
    { label:'Full Name',     value: user?.name  || 'Dr. R. Gupta',       icon: '👤' },
    { label:'Email',         value: user?.email || 'chairman@university.edu', icon: '📧' },
    { label:'Role',          value: 'Chairman',                           icon: '🏛️' },
    { label:'Department',    value: user?.dept  || 'Administration',      icon: '🏢' },
    { label:'Academic Year', value: '2024-25',                            icon: '📅' },
    { label:'Access Level',  value: 'Read Only',                          icon: '🔒' },
  ];

  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif", display:'flex', flexDirection:'column', gap:24, maxWidth:860 }}>

      {/* Header */}
      <div>
        <h1 style={{ fontSize:22, fontWeight:700, color:'#0f172a', margin:0 }}>My Profile</h1>
        <p style={{ color:'#94a3b8', margin:'4px 0 0', fontSize:13 }}>Your account information and institutional overview</p>
      </div>

      {/* Profile card */}
      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:14, overflow:'hidden', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>

        {/* Banner */}
        <div style={{ height:90, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', position:'relative' }} />

        {/* Avatar + name */}
        <div style={{ padding:'0 28px 24px', position:'relative' }}>
          <div style={{ width:72, height:72, borderRadius:'50%', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26, fontWeight:800, color:'#fff', border:'4px solid #fff', marginTop:-36, marginBottom:12, boxShadow:'0 4px 12px rgba(99,102,241,0.3)' }}>
            {initials}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:10 }}>
            <div>
              <h2 style={{ fontSize:20, fontWeight:700, color:'#0f172a', margin:0 }}>{user?.name || 'Dr. R. Gupta'}</h2>
              <p style={{ fontSize:13, color:'#64748b', margin:'4px 0 0' }}>Chairman · {user?.dept || 'Administration'}</p>
            </div>
            {/* Read only badge */}
            <span style={{ fontSize:11, fontWeight:700, padding:'5px 14px', borderRadius:20, background:'#fef3c7', color:'#92400e', border:'1px solid #fde68a' }}>
              🔒 Read Only Access
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:'16px 18px', boxShadow:'0 1px 3px rgba(0,0,0,0.04)', display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:40, height:40, borderRadius:10, background:s.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <s.icon size={18} color={s.color} />
            </div>
            <div>
              <div style={{ fontSize:20, fontWeight:800, color:s.color, lineHeight:1 }}>{s.value}</div>
              <div style={{ fontSize:11, color:'#94a3b8', marginTop:3 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Details grid */}
      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:14, padding:'20px 24px', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:'#0f172a', margin:'0 0 18px' }}>Account Details</h3>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          {details.map((d) => (
            <div key={d.label} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', background:'#f8fafc', borderRadius:10, border:'1px solid #f1f5f9' }}>
              <span style={{ fontSize:18, flexShrink:0 }}>{d.icon}</span>
              <div>
                <div style={{ fontSize:11, color:'#94a3b8', fontWeight:500, marginBottom:2 }}>{d.label}</div>
                <div style={{ fontSize:13, fontWeight:600, color:'#0f172a' }}>{d.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Departments overview */}
      <div style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:14, padding:'20px 24px', boxShadow:'0 1px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:'#0f172a', margin:'0 0 16px' }}>Departments Under Purview</h3>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {DUMMY_DEPARTMENTS.map(d => {
            const COLORS = { Engineering:'#6366f1','Business Management':'#0ea5e9','Computer Science':'#10b981','Arts & Humanities':'#f59e0b',Sciences:'#8b5cf6',Medicine:'#ef4444',Law:'#ec4899',Architecture:'#14b8a6',Education:'#f97316','Social Sciences':'#06b6d4' };
            const c = COLORS[d.name] || '#64748b';
            return (
              <span key={d.id} style={{ fontSize:12, fontWeight:600, padding:'5px 12px', borderRadius:20, color:c, background:`${c}15`, border:`1px solid ${c}30` }}>
                {d.name} · {d.faculty}
              </span>
            );
          })}
        </div>
      </div>

    </div>
  );
}