import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate  = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please enter email and password'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const result = login(email, password);
    setLoading(false);
    if (!result.success) { setError(result.message); return; }
    navigate(result.redirect, { replace: true });
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: '#f8fafc', fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{ width: '100%', maxWidth: 380, padding: 20 }}>

        {/* Logo + Title */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px',
            fontSize: 20, fontWeight: 800, color: '#fff',
            boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
          }}>S</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>SAP 2025</h1>
          <p style={{ fontSize: 13, color: '#94a3b8', margin: 0 }}>Self Assessment Portal — BFGI</p>
        </div>

        {/* Card */}
        <div style={{
          background: '#fff', borderRadius: 14,
          border: '1px solid #e2e8f0',
          padding: '28px 28px 24px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', margin: '0 0 20px' }}>Sign in</h2>

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#64748b', marginBottom: 5 }}>
                Email Address
              </label>
              <input
                type="email" placeholder="Enter your email"
                value={email} onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%', padding: '9px 12px', borderRadius: 8,
                  border: '1px solid #e2e8f0', fontSize: 13,
                  outline: 'none', boxSizing: 'border-box', color: '#0f172a',
                }}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#64748b', marginBottom: 5 }}>
                Password
              </label>
              <input
                type="password" placeholder="Enter your password"
                value={password} onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%', padding: '9px 12px', borderRadius: 8,
                  border: '1px solid #e2e8f0', fontSize: 13,
                  outline: 'none', boxSizing: 'border-box', color: '#0f172a',
                }}
              />
            </div>

            {/* Error */}
            {error && (
              <div style={{
                padding: '8px 12px', borderRadius: 8, marginBottom: 14,
                background: '#fef2f2', border: '1px solid #fecaca',
                fontSize: 12, color: '#dc2626',
              }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '10px',
              borderRadius: 9, border: 'none',
              background: loading ? '#94a3b8' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff', fontSize: 13, fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 2px 8px rgba(99,102,241,0.3)',
            }}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>

          </form>
        </div>

        {/* Demo credentials */}
        <div style={{
          marginTop: 16, padding: '14px 16px',
          background: '#fff', borderRadius: 10,
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#94a3b8', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Demo Credentials
          </p>
          {[
            { role: 'Faculty', email: 'rishamjot@university.edu', password: '1234' },
            { role: 'Faculty', email: 'ananya@university.edu',    password: '1234' },
            { role: 'HoD',     email: 'hod@university.edu',       password: '1234' },
<<<<<<< Updated upstream
=======
            { role: 'principal',     email: 'principal@university.edu',       password: '1234' },
>>>>>>> Stashed changes
          ].map((u) => (
            <button key={u.email} onClick={() => { setEmail(u.email); setPassword(u.password); }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '6px 8px', borderRadius: 6, border: 'none',
                background: 'transparent', cursor: 'pointer',
                marginBottom: 2,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: 11, fontWeight: 600, color: '#6366f1', background: '#eef2ff', padding: '2px 8px', borderRadius: 20 }}>
                {u.role}
              </span>
              <span style={{ fontSize: 11, color: '#64748b', fontFamily: 'monospace' }}>{u.email}</span>
              <span style={{ fontSize: 11, color: '#94a3b8' }}>pw: {u.password}</span>
            </button>
          ))}
          <p style={{ fontSize: 11, color: '#94a3b8', margin: '6px 0 0', textAlign: 'center' }}>
            Click any row to auto-fill
          </p>
        </div>

      </div>
    </div>
  );
}