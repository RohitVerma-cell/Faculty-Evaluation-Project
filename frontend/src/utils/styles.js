const styles = {
  wrapper:   { display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: "'Inter','Segoe UI',sans-serif" },

  // Sidebar — always dark
  sidebar:        { width: 260, background: 'linear-gradient(180deg,#1e293b 0%,#0f172a 100%)', color: '#e2e8f0', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease', position: 'relative', zIndex: 40 },
  sidebarCollapsed:{ transform: 'translateX(-260px)', position: 'absolute', height: '100%' },
  sidebarHeader:  { padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 12 },
  sidebarLogo:    { width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  userArea:       { padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.1)' },
  userAvatar:     { width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' },
  navItem:        { width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' },
  navActive:      { background: 'rgba(99,102,241,0.25)', color: '#fff' },
  navInactive:    { background: 'transparent', color: 'rgba(226,232,240,0.7)' },

  // Main content area
  main:    { flex: 1, height: '100vh', overflowY: 'auto', overflowX: 'hidden', background: 'var(--bg-main, #f8fafc)', transition: 'background 0.2s' },
  content: { padding: '24px', width: '100%', maxWidth: '100%', boxSizing: 'border-box' },

  // ── Card — outer level (#1e293b in dark) ──
  card: {
    background:   'var(--bg-card, #ffffff)',
    border:       '1px solid var(--border, #e2e8f0)',
    borderRadius: 10,
    padding:      20,
    boxShadow:    '0 1px 3px rgba(0,0,0,0.06)',
    transition:   'background 0.2s, border-color 0.2s',
  },

  // ── Inner card (nested) — (#0f172a in dark) ──
  cardInner: {
    background:   'var(--bg-inner, #f8fafc)',
    border:       '1px solid var(--border, #e2e8f0)',
    borderRadius: 8,
    padding:      16,
    transition:   'background 0.2s, border-color 0.2s',
  },

  statIcon: { width: 40, height: 40, borderRadius: 8, background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' },

  // ── Input ──
  input: {
    width:        '100%',
    padding:      '8px 12px',
    border:       '1px solid var(--input-border, #e2e8f0)',
    borderRadius: 6,
    fontSize:     14,
    outline:      'none',
    background:   'var(--input-bg, #ffffff)',
    color:        'var(--text-main, #0f172a)',
    boxSizing:    'border-box',
    transition:   'background 0.2s, border-color 0.2s, color 0.2s',
  },

  // ── Label ──
  label: {
    display:      'block',
    fontSize:     12,
    fontWeight:   500,
    color:        'var(--text-sub, #64748b)',
    marginBottom: 4,
    transition:   'color 0.2s',
  },

  uploadLabel: {
    display:      'flex',
    alignItems:   'center',
    gap:          8,
    padding:      '8px 12px',
    border:       '1px dashed var(--border, #e2e8f0)',
    borderRadius: 6,
    cursor:       'pointer',
    fontSize:     14,
    color:        'var(--text-sub, #94a3b8)',
    background:   'var(--bg-card, #ffffff)',
    transition:   'all 0.2s',
  },

  // ── Tab bar ──
  tabBar: {
    display: 'flex', gap: 4,
    background:   'var(--bg-hover, #f1f5f9)',
    padding:      4,
    borderRadius: 8,
    transition:   'background 0.2s',
  },
  tabActive: {
    flex: 1, padding: '8px 16px', borderRadius: 6, fontSize: 14, fontWeight: 500,
    border:     'none',
    cursor:     'pointer',
    background: 'var(--bg-card, #ffffff)',
    color:      'var(--text-main, #0f172a)',
    boxShadow:  '0 1px 2px rgba(0,0,0,0.06)',
    transition: 'all 0.2s',
  },
  tabInactive: {
    flex: 1, padding: '8px 16px', borderRadius: 6, fontSize: 14, fontWeight: 500,
    border:     'none',
    cursor:     'pointer',
    background: 'transparent',
    color:      'var(--text-sub, #64748b)',
    transition: 'all 0.2s',
  },

  // ── Sub tab bar ──
  subTabBar:     { display: 'flex', gap: 4, flexWrap: 'wrap', padding: '4px 0' },
  subTabActive:  { padding: '6px 14px', borderRadius: 6, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', background: '#4f46e5', color: '#fff' },
  subTabInactive: {
    padding:    '6px 14px',
    borderRadius: 6,
    fontSize:   13,
    fontWeight: 500,
    cursor:     'pointer',
    border:     '1px solid var(--border, #e2e8f0)',
    background: 'var(--bg-card, #ffffff)',
    color:      'var(--text-sub, #64748b)',
    transition: 'all 0.2s',
  },

  // ── Buttons ──
  btn:          { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'all 0.2s' },
  btnPrimary:   { background: '#4f46e5', color: '#fff' },
  btnSecondary: {
    background: 'var(--bg-hover, #f1f5f9)',
    color:      'var(--text-main, #334155)',
    transition: 'all 0.2s',
  },

  // ── Add row dashed button ──
  addBtn: {
    width:        '100%',
    padding:      12,
    border:       '2px dashed var(--border, #e2e8f0)',
    borderRadius: 8,
    fontSize:     14,
    fontWeight:   500,
    color:        'var(--text-muted, #94a3b8)',
    background:   'transparent',
    cursor:       'pointer',
    display:      'flex',
    alignItems:   'center',
    justifyContent: 'center',
    gap:          8,
    transition:   'all 0.2s',
  },

  menuBtn: { background: 'transparent', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8, display: 'flex', alignItems: 'center' },
  badge:   { display: 'inline-flex', alignItems: 'center', padding: '2px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 500 },

  // ── Section title ──
  sectionTitle: {
    fontSize:      15,
    fontWeight:    700,
    color:         'var(--text-main, #1e293b)',
    marginBottom:  16,
    paddingBottom: 8,
    borderBottom:  '2px solid var(--border, #e2e8f0)',
    transition:    'color 0.2s, border-color 0.2s',
  },

  grid:     { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 },
  gridFull: { gridColumn: '1 / -1' },

  marksBox: {
    padding:      '8px 12px',
    background:   'var(--bg-hover, #f1f5f9)',
    borderRadius: 6,
    fontSize:     14,
    fontWeight:   700,
    color:        'var(--text-main, #0f172a)',
    transition:   'all 0.2s',
  },
};

export default styles;