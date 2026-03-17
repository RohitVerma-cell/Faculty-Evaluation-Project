const styles = {
  wrapper: { display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: "'Inter','Segoe UI',sans-serif" },
  sidebar: { width: 260, background: 'linear-gradient(180deg,#1e293b 0%,#0f172a 100%)', color: '#e2e8f0', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease', position: 'relative', zIndex: 40 },
  sidebarCollapsed: { transform: 'translateX(-260px)', position: 'absolute', height: '100%' },
  sidebarHeader: { padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 12 },
  sidebarLogo: { width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  userArea: { padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.1)' },
  userAvatar: { width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' },
  navItem: { width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' },
  navActive: { background: 'rgba(99,102,241,0.25)', color: '#fff' },
  navInactive: { background: 'transparent', color: 'rgba(226,232,240,0.7)' },
  main: { flex: 1, height: '100vh', overflowY: 'auto', overflowX: 'hidden', background: '#f8fafc' },
  content: { padding: '24px', width: '100%', maxWidth: '100%', boxSizing: 'border-box' },
  card: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
  statIcon: { width: 40, height: 40, borderRadius: 8, background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  input: { width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 14, outline: 'none', background: '#fff', boxSizing: 'border-box' },
  label: { display: 'block', fontSize: 12, fontWeight: 500, color: '#64748b', marginBottom: 4 },
  uploadLabel: { display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', border: '1px dashed #e2e8f0', borderRadius: 6, cursor: 'pointer', fontSize: 14, color: '#94a3b8' },

  // Main tab bar
  tabBar: { display: 'flex', gap: 4, background: '#f1f5f9', padding: 4, borderRadius: 8 },
  tabActive: { flex: 1, padding: '8px 16px', borderRadius: 6, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', background: '#fff', color: '#0f172a', boxShadow: '0 1px 2px rgba(0,0,0,0.06)' },
  tabInactive: { flex: 1, padding: '8px 16px', borderRadius: 6, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', background: 'transparent', color: '#64748b' },

  // Sub-tab bar (smaller)
  subTabBar: { display: 'flex', gap: 4, flexWrap: 'wrap', padding: '4px 0' },
  subTabActive: { padding: '6px 14px', borderRadius: 6, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', background: '#4f46e5', color: '#fff' },
  subTabInactive: { padding: '6px 14px', borderRadius: 6, fontSize: 13, fontWeight: 500, border: '1px solid #e2e8f0', cursor: 'pointer', background: '#fff', color: '#64748b' },

  btn: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'all 0.2s' },
  btnPrimary: { background: '#4f46e5', color: '#fff' },
  btnSecondary: { background: '#f1f5f9', color: '#334155' },
  addBtn: { width: '100%', padding: 12, border: '2px dashed #e2e8f0', borderRadius: 8, fontSize: 14, fontWeight: 500, color: '#94a3b8', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
  menuBtn: { background: 'transparent', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8, display: 'flex', alignItems: 'center' },
  badge: { display: 'inline-flex', alignItems: 'center', padding: '2px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 500 },

  sectionTitle: { fontSize: 15, fontWeight: 700, color: '#1e293b', marginBottom: 16, paddingBottom: 8, borderBottom: '2px solid #e2e8f0' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 },
  gridFull: { gridColumn: '1 / -1' },
  marksBox: { padding: '8px 12px', background: '#f1f5f9', borderRadius: 6, fontSize: 14, fontWeight: 700, color: '#0f172a' },
};

export default styles;