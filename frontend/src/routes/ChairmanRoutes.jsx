import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, FileText, BarChart2, LogOut } from 'lucide-react';
import TopBar from '../components/common/TopBar';
import ChairmanDashboard   from '../pages/chairman/ChairmanDashboard';
import ChairmanSubmissions from '../pages/chairman/ChairmanSubmissions';
import ChairmanAnalytics   from '../pages/chairman/ChairmanAnalytics';

const NAV = [
  { path: '/chairman/dashboard',   label: 'Dashboard',    icon: LayoutDashboard },
  { path: '/chairman/submissions', label: 'Submissions',  icon: FileText        },
  { path: '/chairman/analytics',   label: 'Analytics',    icon: BarChart2       },
];

function ChairmanSidebar() {
  const navigate         = useNavigate();
  const location         = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => { logout(); navigate('/login', { replace: true }); };
  const initials = (user?.name || 'CH').split(' ').map(w => w[0]).slice(0, 2).join('');

  return (
    <div style={{ width: 240, minWidth: 240, height: '100vh', background: 'linear-gradient(180deg,#0f172a,#111827)', display: 'flex', flexDirection: 'column', boxShadow: '4px 0 32px rgba(0,0,0,0.25)', zIndex: 40, fontFamily: "'Inter',sans-serif" }}>

      {/* Logo */}
      <div style={{ padding: '20px 18px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: '#fff', flexShrink: 0 }}>S</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9' }}>SAP 2025</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>Chairman Portal</div>
        </div>
      </div>

      {/* Read only badge */}
      <div style={{ margin: '10px 14px 0', padding: '6px 12px', background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b', flexShrink: 0 }} />
        <span style={{ fontSize: 11, color: '#fbbf24', fontWeight: 600 }}>Read Only Access</span>
      </div>

      {/* Nav */}
      <div style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '1.3px', textTransform: 'uppercase', padding: '6px 4px 8px' }}>Menu</div>
        {NAV.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path;
          return (
            <button key={path} onClick={() => navigate(path)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: active ? 'rgba(99,102,241,0.4)' : 'transparent', color: active ? '#a5b4fc' : 'rgba(255,255,255,0.7)', fontWeight: active ? 600 : 400, fontSize: 13.5, transition: 'all 0.15s', textAlign: 'left', marginBottom: 2 }}>
              <Icon size={16} /> {label}
            </button>
          );
        })}
      </div>

      {/* User + Logout */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ padding: '12px 14px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Chairman</div>
          </div>
        </div>
        <div style={{ padding: '0 10px 12px' }}>
          <button onClick={handleLogout}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: 'rgba(239,68,68,0.08)', color: '#fca5a5', fontSize: 13, fontWeight: 500, transition: 'all 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.18)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ChairmanRoutes() {
  const { user } = useAuth();
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: "'Inter',sans-serif" }}>
      <ChairmanSidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar role="chairman" userName={user?.name || ''} userDept={user?.dept || ''} />
        <div style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-main,#f8fafc)' }}>
          <div style={{ padding: 28, boxSizing: 'border-box' }}>
            <Routes>
              <Route index                element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard"     element={<ChairmanDashboard />} />
              <Route path="submissions"   element={<ChairmanSubmissions />} />
              <Route path="analytics"     element={<ChairmanAnalytics />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}