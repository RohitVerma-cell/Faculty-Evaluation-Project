import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, FlaskConical, GraduationCap,
  ChevronDown, ChevronRight, LogOut,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ACADEMIC_YEAR = '2025-26';

const MODULES = [
  {
    key: 'teaching', label: 'Teaching Learning', icon: BookOpen,
    color: '#6366f1', lightBg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.35)',
    items: [
      { key: 'tl1', label: 'TL.1 Student Involvement' },
      { key: 'tl4', label: 'TL.4 Outcome' },
    ],
  },
  {
    key: 'research', label: 'Research', icon: FlaskConical,
    color: '#6366f1', lightBg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.35)',
    items: [
      { key: 'r1', label: 'R.1 Journal Papers' },
      { key: 'r2', label: 'R.2 Books' },
      { key: 'r3', label: 'R.3 Conference' },
      { key: 'r4', label: 'R.4 Sponsored Projects' },
      { key: 'r5', label: 'R.5 Consultancy' },
      { key: 'r6', label: 'R.6 Patents & Startup' },
    ],
  },
  {
    key: 'selfdevelopment', label: 'Self Development', icon: GraduationCap,
    color: '#6366f1', lightBg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.35)',
    items: [
      { key: 'sd1', label: 'SD.1 FDP' },
      { key: 'sd2', label: 'SD.2 Workshop' },
      { key: 'sd3', label: 'SD.3 Refresher' },
      { key: 'sd4', label: 'SD.4 MOOCs' },
      { key: 'sd5', label: 'SD.5 PhD' },
      { key: 'sd6', label: 'SD.6 Awards' },
    ],
  },
];

export default function Sidebar({ activeModule, activeItem, onModuleItemSelect }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, logout } = useAuth();

  const isEntry     = location.pathname === '/faculty/entry';
  const isDashboard = location.pathname === '/faculty/dashboard';

  const [openModules, setOpenModules] = useState({
    teaching: true, research: false, selfdevelopment: false,
  });

  const toggleModule = (key) =>
    setOpenModules((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleItemClick = (moduleKey, itemKey) => {
    if (!openModules[moduleKey])
      setOpenModules((p) => ({ ...p, [moduleKey]: true }));
    onModuleItemSelect?.(moduleKey, itemKey);
    if (!isEntry) navigate('/faculty/entry');
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const initials = (user?.name || 'FA').split(' ').map((w) => w[0]).slice(0, 2).join('');

  const s = {
    sidebar: {
      width: 264, minWidth: 264, height: '100vh',
      background: 'linear-gradient(180deg, #0f172a 0%, #111827 100%)',
      display: 'flex', flexDirection: 'column',
      boxShadow: '4px 0 32px rgba(0,0,0,0.25)',
      position: 'relative', zIndex: 40,
      fontFamily: "'Inter', sans-serif",
    },
    navBtn: (active) => ({
      width: '100%', display: 'flex', alignItems: 'center', gap: 10,
      padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
      background: active ? 'rgba(99,102,241,0.4)' : 'transparent',
      color:      active ? '#a5b4fc' : 'rgba(255,255,255,0.7)',
      fontWeight: active ? 600 : 400,
      fontSize: 13.5, transition: 'all 0.15s', textAlign: 'left', marginBottom: 2,
    }),
    moduleHeader: (mod, isAnyActive) => ({
      width: '100%', display: 'flex', alignItems: 'center', gap: 10,
      padding: '9px 10px', borderRadius: 9, border: 'none', cursor: 'pointer',
      background: isAnyActive ? mod.lightBg : 'transparent',
      transition: 'all 0.15s', textAlign: 'left', marginBottom: 1,
    }),
    moduleIcon: (mod, isAnyActive) => ({
      width: 30, height: 30, borderRadius: 8,
      background: isAnyActive ? mod.color : 'rgba(255,255,255,0.07)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, transition: 'all 0.2s',
      boxShadow: isAnyActive ? `0 2px 8px ${mod.color}55` : 'none',
    }),
    subItem: (mod, isActive) => ({
      width: '100%', display: 'flex', alignItems: 'center', gap: 9,
      padding: '7px 10px', borderRadius: 7, border: 'none', cursor: 'pointer',
      background: isActive ? `${mod.color}20` : 'transparent',
      transition: 'all 0.12s', textAlign: 'left', marginBottom: 1,
    }),
  };

  return (
    <div style={s.sidebar}>

      {/* Logo */}
      <div style={{ padding: '20px 18px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 800, color: '#fff', flexShrink: 0, boxShadow: '0 4px 12px rgba(99,102,241,0.4)' }}>S</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.3px' }}>SAP 2025</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>Academic Year {ACADEMIC_YEAR}</div>
        </div>
      </div>

      {/* Dashboard nav */}
      <div style={{ padding: '12px 10px 6px' }}>
        <button style={s.navBtn(isDashboard)} onClick={() => navigate('/faculty/dashboard')}>
          <LayoutDashboard size={16} /> Dashboard
        </button>
      </div>

      <div style={{ margin: '4px 14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 4 }} />
      <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '1.3px', textTransform: 'uppercase', padding: '10px 14px 5px' }}>
        Data Entry Modules
      </div>

      {/* Modules */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 10px 10px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
        {MODULES.map((mod) => {
          const isOpen      = openModules[mod.key];
          const isAnyActive = activeModule === mod.key && isEntry;
          return (
            <div key={mod.key}>
              <button style={s.moduleHeader(mod, isAnyActive)} onClick={() => { toggleModule(mod.key); if (!isEntry) navigate('/faculty/entry'); }}>
                <div style={s.moduleIcon(mod, isAnyActive)}>
                  <mod.icon size={15} color={isAnyActive ? '#fff' : 'rgba(255,255,255,0.35)'} />
                </div>
                <span style={{ flex: 1, fontSize: 13, fontWeight: isAnyActive ? 700 : 500, color: isAnyActive ? '#f1f5f9' : 'rgba(255,255,255,0.8)', letterSpacing: '-0.1px' }}>
                  {mod.label}
                </span>
                {isOpen ? <ChevronDown size={14} color="rgba(255,255,255,0.25)" /> : <ChevronRight size={14} color="rgba(255,255,255,0.2)" />}
              </button>
              {isOpen && (
                <div style={{ marginLeft: 15, paddingLeft: 14, borderLeft: `2px solid ${mod.border}`, marginTop: 2, marginBottom: 6 }}>
                  {mod.items.map((item) => {
                    const isActive = isEntry && activeModule === mod.key && activeItem === item.key;
                    return (
                      <button key={item.key} style={s.subItem(mod, isActive)} onClick={() => handleItemClick(mod.key, item.key)}>
                        <span style={{ width: isActive ? 7 : 5, height: isActive ? 7 : 5, borderRadius: '50%', background: isActive ? mod.color : 'rgba(255,255,255,0.18)', flexShrink: 0, transition: 'all 0.15s', boxShadow: isActive ? `0 0 6px ${mod.color}` : 'none' }} />
                        <span style={{ fontSize: 12.5, color: isActive ? '#f1f5f9' : 'rgba(255,255,255,0.6)', fontWeight: isActive ? 600 : 400, flex: 1 }}>{item.label}</span>
                        {isActive && <span style={{ width: 3, height: 14, borderRadius: 2, background: mod.color, flexShrink: 0 }} />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* User area + Logout */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>

        {/* User info */}
        <div style={{ padding: '12px 14px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || ''}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 1 }}>{user?.dept || ''}</div>
          </div>
        </div>

        {/* Logout button */}
        <div style={{ padding: '0 10px 12px' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: 'rgba(239,68,68,0.08)',
              color: '#fca5a5',
              fontSize: 13, fontWeight: 500, transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.18)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </div>

    </div>
  );
}