
import { useState, useEffect, useRef } from 'react';
import { MessageSquarePlus, X, Send, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const BASE_URL = 'http://localhost:5000/api/feedback';

const DEPARTMENTS = [
  'All Departments',
  'Engineering', 'Business Management', 'Computer Science',
  'Arts & Humanities', 'Sciences', 'Medicine',
  'Law', 'Architecture', 'Education', 'Social Sciences',
];

const PRIORITY_OPTIONS = [
  { value: 'low',    label: 'Low',    color: '#10b981', bg: '#d1fae5' },
  { value: 'medium', label: 'Medium', color: '#f59e0b', bg: '#fef3c7' },
  { value: 'high',   label: 'High',   color: '#ef4444', bg: '#fee2e2' },
];

export default function FeedbackWidget() {
  const { user } = useAuth();
  const [open,     setOpen]     = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [error,    setError]    = useState('');
  const [pulse,    setPulse]    = useState(true); // attention pulse on button

  const [form, setForm] = useState({
    toDepartment: 'All Departments',
    toHoD:        true,
    subject:      '',
    message:      '',
    priority:     'medium',
  });

  const f = (field, val) => setForm(prev => ({ ...prev, [field]: val }));

  // Stop pulse after 5s
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 5000);
    return () => clearTimeout(t);
  }, []);

  // ESC to close
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleSubmit = async () => {
    setError('');
    if (!form.subject.trim()) { setError('Please enter a subject'); return; }
    if (!form.message.trim()) { setError('Please enter your message'); return; }

    setLoading(true);
    try {
      const res = await fetch(BASE_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromName:     user?.name || 'Chairman',
          toDepartment: form.toDepartment === 'All Departments' ? 'All' : form.toDepartment,
          toHoD:        form.toHoD,
          subject:      form.subject.trim(),
          message:      form.message.trim(),
          priority:     form.priority,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setOpen(false);
        setForm({ toDepartment: 'All Departments', toHoD: true, subject: '', message: '', priority: 'medium' });
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to send feedback');
    } finally {
      setLoading(false);
    }
  };

  const charCount = form.message.length;
  const MAX_CHARS = 500;

  return (
    <>
      {/* ── Backdrop ── */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.35)', zIndex: 900, backdropFilter: 'blur(2px)' }}
        />
      )}

      {/* ── Floating Button ── */}
      <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 1000 }}>

        {/* Pulse ring */}
        {pulse && !open && (
          <div style={{
            position: 'absolute', inset: -6,
            borderRadius: '50%',
            border: '2px solid #6366f1',
            animation: 'pulseRing 1.5s ease-out infinite',
            opacity: 0,
          }} />
        )}

        <button
          onClick={() => { setOpen(o => !o); setError(''); }}
          title="Send Feedback"
          style={{
            width: 56, height: 56, borderRadius: '50%',
            background: open
              ? '#ef4444'
              : 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(99,102,241,0.45)',
            transition: 'all 0.25s',
            transform: open ? 'rotate(0deg)' : 'rotate(0deg)',
          }}>
          {open
            ? <X size={22} color="#fff" />
            : <MessageSquarePlus size={22} color="#fff" />
          }
        </button>

        {/* Tooltip */}
        {!open && (
          <div style={{
            position: 'absolute', bottom: '110%', right: 0,
            background: '#1e293b', color: '#fff',
            fontSize: 12, fontWeight: 500,
            padding: '5px 12px', borderRadius: 7,
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}>
            Send Feedback
            <div style={{ position: 'absolute', bottom: -4, right: 20, width: 8, height: 8, background: '#1e293b', transform: 'rotate(45deg)' }} />
          </div>
        )}
      </div>

      {/* ── Slide-up Modal ── */}
      <div style={{
        position: 'fixed', bottom: open ? 96 : -600,
        right: 28, zIndex: 1001,
        width: 'min(420px, calc(100vw - 56px))',
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 20px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
        transition: 'bottom 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        overflow: 'hidden',
        fontFamily: "'Segoe UI',system-ui,sans-serif",
      }}>

        {/* ── Header ── */}
        <div style={{ padding: '18px 20px 14px', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquarePlus size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Send Feedback</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 1 }}>
                As Chairman · {user?.name || 'Dr. R. Gupta'}
              </div>
            </div>
          </div>
        </div>

        {/* ── Success state ── */}
        {success ? (
          <div style={{ padding: '40px 24px', textAlign: 'center' }}>
            <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <CheckCircle size={30} color="#10b981" />
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Feedback Sent!</div>
            <div style={{ fontSize: 13, color: '#64748b' }}>
              Your feedback has been delivered to {form.toDepartment === 'All Departments' ? 'all departments' : form.toDepartment}
              {form.toHoD ? ' and HoD' : ''}.
            </div>
          </div>
        ) : (
          /* ── Form ── */
          <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: 14, maxHeight: '70vh', overflowY: 'auto' }}>

            {/* To — Department */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>
                To Department
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  value={form.toDepartment}
                  onChange={e => f('toDepartment', e.target.value)}
                  style={{ width: '100%', padding: '9px 32px 9px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', background: '#f8fafc', color: '#0f172a', fontSize: 13, outline: 'none', cursor: 'pointer', appearance: 'none', boxSizing: 'border-box' }}>
                  {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                </select>
                <ChevronDown size={14} color="#94a3b8" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              </div>
            </div>

            {/* To — HoD toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#f8fafc', borderRadius: 8, border: '1.5px solid #e2e8f0' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>Also notify HoD</div>
                <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>Send copy to Head of Department</div>
              </div>
              {/* Toggle switch */}
              <div
                onClick={() => f('toHoD', !form.toHoD)}
                style={{ width: 42, height: 24, borderRadius: 12, background: form.toHoD ? '#6366f1' : '#e2e8f0', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: form.toHoD ? 21 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.15)' }} />
              </div>
            </div>

            {/* Priority */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 7 }}>Priority</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {PRIORITY_OPTIONS.map(p => (
                  <button key={p.value} onClick={() => f('priority', p.value)}
                    style={{ flex: 1, padding: '7px 0', borderRadius: 8, border: form.priority === p.value ? 'none' : `1.5px solid #e2e8f0`, background: form.priority === p.value ? p.bg : '#fff', color: form.priority === p.value ? p.color : '#94a3b8', fontSize: 12, fontWeight: form.priority === p.value ? 700 : 500, cursor: 'pointer', transition: 'all 0.15s' }}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 5 }}>Subject</label>
              <input
                placeholder="e.g. Research Output Review Q1"
                value={form.subject}
                onChange={e => f('subject', e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', background: '#f8fafc', color: '#0f172a', fontSize: 13, outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e  => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            {/* Message */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>Message</label>
                <span style={{ fontSize: 11, color: charCount > MAX_CHARS * 0.9 ? '#ef4444' : '#94a3b8' }}>
                  {charCount}/{MAX_CHARS}
                </span>
              </div>
              <textarea
                placeholder="Write your feedback or observation here…"
                value={form.message}
                onChange={e => charCount < MAX_CHARS && f('message', e.target.value)}
                rows={4}
                style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid #e2e8f0', background: '#f8fafc', color: '#0f172a', fontSize: 13, outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'inherit', lineHeight: 1.5, transition: 'border-color 0.15s' }}
                onFocus={e => e.target.style.borderColor = '#6366f1'}
                onBlur={e  => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            {/* Error */}
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderRadius: 8, background: '#fef2f2', border: '1px solid #fecaca' }}>
                <AlertCircle size={14} color="#ef4444" />
                <span style={{ fontSize: 12, color: '#dc2626' }}>{error}</span>
              </div>
            )}

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 10, paddingTop: 2 }}>
              <button onClick={() => setOpen(false)}
                style={{ flex: 1, padding: '10px', borderRadius: 9, border: '1.5px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={handleSubmit} disabled={loading}
                style={{ flex: 2, padding: '10px', borderRadius: 9, border: 'none', background: loading ? '#94a3b8' : 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, boxShadow: loading ? 'none' : '0 2px 8px rgba(99,102,241,0.35)' }}>
                {loading
                  ? <><div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)', borderTop: '2px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Sending…</>
                  : <><Send size={14} /> Send Feedback</>
                }
              </button>
            </div>

          </div>
        )}
      </div>

      <style>{`
        @keyframes pulseRing {
          0%   { transform: scale(0.95); opacity: 0.7; }
          70%  { transform: scale(1.3);  opacity: 0;   }
          100% { transform: scale(1.3);  opacity: 0;   }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}