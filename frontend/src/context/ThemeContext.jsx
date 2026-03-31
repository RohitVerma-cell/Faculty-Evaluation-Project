// ── context/ThemeContext.jsx ──

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('sap-theme') === 'dark';
  });

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem('sap-theme', next ? 'dark' : 'light');
      return next;
    });
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      // ── Sidebar jaise dark colors ──
      root.setAttribute('data-theme', 'dark');
      root.style.setProperty('--bg-main',     '#0f172a'); // sidebar background
      root.style.setProperty('--bg-card',     '#1e293b'); // sidebar card color
      root.style.setProperty('--bg-inner',    '#0f172a'); // nested cards
      root.style.setProperty('--bg-hover',    '#334155'); // hover state
      root.style.setProperty('--text-main',   '#e2e8f0'); // bright white text
      root.style.setProperty('--text-sub',    '#94a3b8'); // muted text
      root.style.setProperty('--text-muted',  '#475569'); // very muted
      root.style.setProperty('--border',      '#334155'); // border color
      root.style.setProperty('--input-bg',    '#0f172a'); // input background
      root.style.setProperty('--input-border','#334155'); // input border
    } else {
      root.setAttribute('data-theme', 'light');
      root.style.setProperty('--bg-main',     '#f8fafc');
      root.style.setProperty('--bg-card',     '#ffffff');
      root.style.setProperty('--bg-inner',    '#f8fafc');
      root.style.setProperty('--bg-hover',    '#f1f5f9');
      root.style.setProperty('--text-main',   '#0f172a');
      root.style.setProperty('--text-sub',    '#64748b');
      root.style.setProperty('--text-muted',  '#94a3b8');
      root.style.setProperty('--border',      '#e2e8f0');
      root.style.setProperty('--input-bg',    '#ffffff');
      root.style.setProperty('--input-border','#e2e8f0');
    }
  }, [isDark]);

  // ── Global CSS inject karo — inline styles jo override nahi ho sakti unhe fix karo ──
  useEffect(() => {
    const styleId = 'sap-dark-mode-style';
    let el = document.getElementById(styleId);
    if (!el) {
      el = document.createElement('style');
      el.id = styleId;
      document.head.appendChild(el);
    }

    if (isDark) {
      el.textContent = `
        /* ── Page background ── */
        body { background: #0f172a !important; }

        /* ── All inputs, selects, textareas ── */
        input, select, textarea {
          background: #0f172a !important;
          color: #e2e8f0 !important;
          border-color: #334155 !important;
        }
        input::placeholder, textarea::placeholder {
          color: #475569 !important;
        }
        option {
          background: #1e293b !important;
          color: #e2e8f0 !important;
        }

        /* ── Tables ── */
        table thead tr {
          background: #334155 !important;
        }
        table th {
          color: #94a3b8 !important;
          border-color: #334155 !important;
        }
        table td {
          border-color: #1e293b !important;
          color: #e2e8f0 !important;
        }
        table tr:hover {
          background: #334155 !important;
        }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
      `;
    } else {
      el.textContent = `
        body { background: #f8fafc; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
      `;
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);