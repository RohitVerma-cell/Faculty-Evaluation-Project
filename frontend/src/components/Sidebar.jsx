import { useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, PenLine, ChevronLeft } from 'lucide-react';
import styles from '../utils/styles';
import { NAV_ITEMS } from '../utils/constants';

// Map route keys → icons
const ICON_MAP = {
  '/dashboard': LayoutDashboard,
  '/entry':     PenLine,
};


export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate  = useNavigate();
  const location  = useLocation();

  return (
    <aside style={{ ...styles.sidebar, ...(sidebarOpen ? {} : styles.sidebarCollapsed) }}>

      {/* Header */}
      <div style={styles.sidebarHeader}>
        <div style={styles.sidebarLogo}>
          <GraduationCap size={24} color="#fff" />
        </div>

        <div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>SAP-2025</div>
          <div style={{ fontSize: 12, opacity: 0.6 }}>Performance System</div>
        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          style={{ ...styles.menuBtn, marginLeft: 'auto', color: 'rgba(255,255,255,0.5)' }}
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {NAV_ITEMS.map((item) => {
          const Icon     = ICON_MAP[item.key];
          const isActive = location.pathname === item.key
                        || (item.key === '/dashboard' && location.pathname === '/');

          return (
            <button
              key={item.key}
              onClick={() => navigate(item.key)}
              style={{ ...styles.navItem, ...(isActive ? styles.navActive : styles.navInactive) }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent';
              }}
            >
              {Icon && <Icon size={18} />}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User area */}
      <div style={styles.userArea}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={styles.userAvatar}>AS</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Dr. Ananya Sharma</div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>Faculty</div>
          </div>
        </div>
      </div>

    </aside>
  );
}