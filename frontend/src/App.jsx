import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Menu }         from 'lucide-react';
import Sidebar          from './components/Sidebar';
import Toast            from './components/Toast';
import DashboardPage    from './pages/DashboardPage';
import DataEntryPage    from './pages/DataEntryPge';
import styles           from './utils/styles';



function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toastMsg,    setToastMsg]    = useState(null);

  useEffect(() => {
    if (!toastMsg) return;
    const t = setTimeout(() => setToastMsg(null), 3000);
    return () => clearTimeout(t);
  }, [toastMsg]);

  return (
    <div style={styles.wrapper}>

      {/* Global toast */}
      <Toast message={toastMsg} />

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content area */}
      <div style={styles.main}>

        {/* Hamburger when sidebar is closed */}
        {!sidebarOpen && (
          <div style={{ padding: '8px 16px', borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
            <button onClick={() => setSidebarOpen(true)} style={styles.menuBtn}>
              <Menu size={20} color="#334155" />
            </button>
          </div>
        )}

        <div style={styles.content}>
          <Routes>
            {/* Default: redirect / → /dashboard */}
            <Route path="/"          element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/entry"     element={<DataEntryPage setToastMsg={setToastMsg} />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}