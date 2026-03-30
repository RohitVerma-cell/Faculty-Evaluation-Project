// ── components/common/TopBar.jsx ──
// Common TopBar for ALL roles
// - Dark/Light toggle — sab ke liye
// - Notification Bell — SIRF faculty role ko dikhega
//   (HoD ke notes/comments show honge — abhi placeholder, baad mein real data)

import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Bell, X, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

// ── Dummy notifications — baad mein MongoDB se aayengi ──
const DUMMY_NOTIFICATIONS = [
  {
    id: 1,
    type: 'hod_comment',
    message: 'approved',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'hod_comment',
    message: 'Your Research section has been reviewed by HoD',
    time: '1 day ago',
    read: false,
  },
  {
    id: 3,
    type: 'status_change',
    message: 'Your submission status changed to "Submitted"',
    time: '2 days ago',
    read: true,
  },
];

export default function TopBar({ role = 'faculty', userName = 'Er.Rishamjot Kaur', userDept = 'CSE Department' }) {
  const { isDark, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications]         = useState(DUMMY_NOTIFICATIONS);
  const notifRef = useRef();

  // Unread count
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Click bahar → close dropdown
  useEffect(() => {
    const handleClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Sab notifications read mark karo
  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  // Single notification read
  const markRead = (id) => {
    setNotifications(notifications.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  // ── Styles ──
  const s = {
    bar: {
      height: 56,
      background: isDark ? '#1e293b' : '#ffffff',
      borderBottom: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      flexShrink: 0,
      transition: 'all 0.2s',
    },
    left: {
      fontSize: 14,
      fontWeight: 600,
      color: isDark ? '#f1f5f9' : '#0f172a',
    },
    rightArea: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    iconBtn: {
      width: 36, height: 36,
      borderRadius: 9,
      border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
      background: isDark ? '#0f172a' : '#f8fafc',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer',
      color: isDark ? '#94a3b8' : '#64748b',
      position: 'relative',
      transition: 'all 0.15s',
    },
    badge: {
      position: 'absolute',
      top: -4, right: -4,
      width: 18, height: 18,
      borderRadius: '50%',
      background: '#ef4444',
      color: '#fff',
      fontSize: 10,
      fontWeight: 700,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: `2px solid ${isDark ? '#1e293b' : '#fff'}`,
    },
    // Notification dropdown
    dropdown: {
      position: 'absolute',
      top: 46, right: 0,
      width: 340,
      background: isDark ? '#1e293b' : '#fff',
      border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
      borderRadius: 12,
      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      zIndex: 100,
      overflow: 'hidden',
    },
    dropdownHeader: {
      padding: '12px 16px',
      borderBottom: `1px solid ${isDark ? '#334155' : '#f1f5f9'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    },
    notifItem: (read) => ({
      padding: '12px 16px',
      borderBottom: `1px solid ${isDark ? '#334155' : '#f8fafc'}`,
      background: read
        ? 'transparent'
        : isDark ? 'rgba(99,102,241,0.1)' : '#eef2ff',
      cursor: 'pointer',
      display: 'flex', alignItems: 'flex-start', gap: 10,
      transition: 'background 0.15s',
    }),
    userArea: {
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '6px 12px',
      borderRadius: 9,
      border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
      background: isDark ? '#0f172a' : '#f8fafc',
      cursor: 'pointer',
    },
    avatar: {
      width: 28, height: 28,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, fontWeight: 700, color: '#fff',
    },
  };

  const initials = userName.split(' ').map((w) => w[0]).slice(0, 2).join('');

  // Role label
  const roleLabel = {
    faculty:   'Faculty',
    hod:       'Head of Department',
    principal: 'Principal',
    director:  'Director',
    chairman:  'Chairman',
  }[role] || 'Faculty';

  return (
    <div style={s.bar}>

      {/* Left — Page context */}
      <div style={s.left}>
        {/* SAP 2025 &nbsp; */}
        <span style={{ fontWeight: 400, color: isDark ? '#64748b' : '#94a3b8', fontSize: 13 }}>
          {roleLabel} Portal
        </span>
      </div>

      {/* Right — Actions */}
      <div style={s.rightArea}>

        {/* 🔔 Notification Bell — SIRF faculty role ko dikhega */}
        {role === 'faculty' && (
          <div style={{ position: 'relative' }} ref={notifRef}>
            <button
              style={s.iconBtn}
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notifications"
            >
              <Bell size={16} />
              {unreadCount > 0 && (
                <span style={s.badge}>{unreadCount}</span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div style={s.dropdown}>

                {/* Header */}
                <div style={s.dropdownHeader}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: isDark ? '#f1f5f9' : '#0f172a' }}>
                    Notifications
                    {unreadCount > 0 && (
                      <span style={{ marginLeft: 8, fontSize: 11, background: '#ef4444', color: '#fff', padding: '1px 7px', borderRadius: 10, fontWeight: 600 }}>
                        {unreadCount} new
                      </span>
                    )}
                  </span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      style={{ fontSize: 11, color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                      Mark all read
                    </button>
                  )}
                </div>

                {/* List */}
                {notifications.length === 0 ? (
                  <div style={{ padding: '24px 16px', textAlign: 'center', color: isDark ? '#64748b' : '#94a3b8', fontSize: 13 }}>
                    No notifications yet
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} style={s.notifItem(n.read)} onClick={() => markRead(n.id)}>
                      {/* Dot */}
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: n.read ? '#cbd5e1' : '#6366f1', marginTop: 4, flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 13, margin: 0, color: isDark ? '#e2e8f0' : '#1e293b', fontWeight: n.read ? 400 : 500, lineHeight: 1.4 }}>
                          {n.message}
                        </p>
                        <span style={{ fontSize: 11, color: isDark ? '#64748b' : '#94a3b8', marginTop: 3, display: 'block' }}>
                          {n.time}
                        </span>
                      </div>
                    </div>
                  ))
                )}

                {/* Footer */}
                <div style={{ padding: '10px 16px', borderTop: `1px solid ${isDark ? '#334155' : '#f1f5f9'}`, textAlign: 'center' }}>
                  <span style={{ fontSize: 12, color: '#6366f1', cursor: 'pointer', fontWeight: 500 }}>
                    View all notifications
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 🌙 Dark / Light Toggle */}
        <button
          style={s.iconBtn}
          onClick={toggleTheme}
          title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
        >
          {isDark ? <Sun size={16} color="#fbbf24" /> : <Moon size={16} />}
        </button>

        {/* 👤 User info */}
        <div style={s.userArea}>
          <div style={s.avatar}>{initials}</div>
          <div style={{ lineHeight: 1.2 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: isDark ? '#e2e8f0' : '#0f172a' }}>{userName}</div>
            <div style={{ fontSize: 10, color: isDark ? '#64748b' : '#94a3b8' }}>{roleLabel}</div>
          </div>
        </div>

      </div>
    </div>
  );
}