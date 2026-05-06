import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { LayoutDashboard, Building2, User, LogOut, Sun, Moon } from 'lucide-react';
import logo from '../components/media/logo2.png';
import FeedbackWidget from '../components/chairman/FeedbackWidget';


import ChairmanDashboard from '../pages/chairman/ChairmanDashboard';
import DepartmentDetail from '../pages/chairman/DepartmentDetails';
import SchoolOverview from '../pages/chairman/SchoolOverview';
import ChairmanProfile from '../pages/chairman/CharmanProfile';

const NAV = [
  { path: '/chairman/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/chairman/schools', label: 'School Overview', icon: Building2 },
  { path: '/chairman/profile', label: 'Profile', icon: User },
];

// ── TopBar ──
function TopBar() {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  return (
    <div style={{ height: 54, background: '#fff', borderBottom: '1px solid #e8ecf0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      <div style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>
        SAP 2025 &nbsp;·&nbsp; <span style={{ color: '#0f172a', fontWeight: 600 }}>Chairman Portal</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={toggleTheme} title={isDark ? 'Light mode' : 'Dark mode'}
          style={{ width: 34, height: 34, borderRadius: 8, border: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
          {isDark ? <Sun size={15} color="#f59e0b" /> : <Moon size={15} />}
        </button>
        <div style={{ width: 1, height: 24, background: '#e2e8f0' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 10px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff' }}>
            {(user?.name || 'C').split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('')}
          </div>
          <div style={{ lineHeight: 1.3 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#0f172a' }}>{user?.name || 'Chairman'}</div>
            <div style={{ fontSize: 10, color: '#94a3b8' }}>Chairman</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sidebar ──
function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const handleLogout = () => { logout(); navigate('/login', { replace: true }); };
  const initial = (user?.name || 'C').split(' ').filter(Boolean)[0]?.[0] || 'C';

  return (
    <div style={{ width: 210, minWidth: 210, height: '100vh', background: '#ffffff', borderRight: '1px solid #e8ecf0', display: 'flex', flexDirection: 'column', fontFamily: "'Segoe UI',system-ui,sans-serif", boxShadow: '1px 0 8px rgba(0,0,0,0.04)' }}>

      {/* Brand */}
     
      <div className="flex items-center justify-center h-20 border-b border-slate-200 dark:border-slate-800">
        <img
          src={logo}
          alt="FacultyDesk Logo"
          className="h-20 w-auto object-contain"
        />
      </div>

      {/* User card */}
      {/* <div style={{ padding: '14px 18px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#475569', border: '2px solid #e2e8f0', flexShrink: 0 }}>
          {initial}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'Chairman'}</div>
          <div style={{ fontSize: 11, color: '#94a3b8' }}>Chairman</div>
        </div>
      </div> */}

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 10px' }}>
        {NAV.map(({ path, label, icon: Icon }) => {
          const active = location.pathname.startsWith(path);
          return (
            <button key={path} onClick={() => navigate(path)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: active ? '#f1f5f9' : 'transparent', color: active ? '#0f172a' : '#64748b', fontWeight: active ? 600 : 400, fontSize: 13, transition: 'all 0.12s', textAlign: 'left', marginBottom: 2, borderLeft: active ? '3px solid #6366f1' : '3px solid transparent' }}>
              <Icon size={15} color={active ? '#6366f1' : '#94a3b8'} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: '10px 10px 16px', borderTop: '1px solid #f1f5f9' }}>
        <button onClick={handleLogout}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: 'transparent', color: '#ef4444', fontSize: 13, fontWeight: 500, transition: 'background 0.12s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#fef2f2'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <LogOut size={15} color="#ef4444" /> Logout
        </button>
      </div>
    </div>
  );
}

// ── Main ──
export default function ChairmanRoutes() {
  return (
    // <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#f8fafc' }}>
    //   <Sidebar />
    //   <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
    //     <TopBar />
    //     <div style={{ flex: 1, overflowY: 'auto' }}>
    //       <div style={{ padding: 28, boxSizing: 'border-box', minHeight: '100%' }}>
    //         <Routes>
    //           <Route index element={<Navigate to="dashboard" replace />} />
    //           <Route path="dashboard" element={<ChairmanDashboard />} />
    //           <Route path="schools" element={<SchoolOverview />} />
    //           <Route path="department/:deptId" element={<DepartmentDetail />} />
    //           <Route path="profile" element={<ChairmanProfile />} />
    //         </Routes>
    //       </div>
    //     </div>
    //   </div>
    // </div>
     <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:'#f8fafc' }}>
      <Sidebar />
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <TopBar />
        <div style={{ flex:1, overflowY:'auto' }}>
          <div style={{ padding:28, boxSizing:'border-box', minHeight:'100%' }}>
            <Routes>
              <Route index                     element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard"          element={<ChairmanDashboard />} />
              <Route path="schools"            element={<SchoolOverview />} />
              <Route path="department/:deptId" element={<DepartmentDetail />} />
              <Route path="profile"            element={<ChairmanProfile />} />
            </Routes>
          </div>
        </div>
      </div>
 
      {/* ── Feedback Widget — har page par dikhega ── */}
      <FeedbackWidget />
 
    </div>
  );
}