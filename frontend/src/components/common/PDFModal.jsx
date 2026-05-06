import { X, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';

export default function PDFModal({ url, fileName, onClose }) {
  if (!url) return null;

  // ESC key se close ho
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Full URL banao
  const fullUrl = url.startsWith('http') ? url : `http://localhost:5000${url}`;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(15,23,42,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
        }}
      />

      

      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(90vw, 900px)',
        height: 'min(90vh, 750px)',
        background: '#fff',
        borderRadius: 14,
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 20px',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 14 }}>📄</span>
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', maxWidth: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {fileName || 'Document'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Open in new tab button */}
            <a
              href={fullUrl} target="_blank" rel="noreferrer"
              title="Open in new tab"
              style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 7, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, fontWeight: 500, color: '#475569', textDecoration: 'none', cursor: 'pointer' }}>
              <ExternalLink size={13} /> New Tab
            </a>

            {/* Close button */}
            <button
              onClick={onClose}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', color: '#64748b' }}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* PDF iframe */}
        <iframe
          src={fullUrl}
          title={fileName || 'PDF Viewer'}
          style={{ flex: 1, border: 'none', width: '100%' }}
        />
      </div>
    </>
  );
}