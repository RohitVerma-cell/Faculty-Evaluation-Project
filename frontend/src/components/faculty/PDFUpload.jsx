
import { useRef, useState } from 'react';
// import { Upload, X, FileText, Eye, Loader } from 'lucide-react';

// const BASE_URL    = 'http://localhost:5000';
// const MAX_SIZE_MB = 10;

// export default function PDFUpload({ value, onChange, label = 'Proof (PDF)' }) {
//   const inputRef        = useRef();
//   const [uploading, setUploading] = useState(false);
//   const [error,     setError]     = useState('');

//   // ── Upload to backend ──
//   const handleFile = async (file) => {
//     setError('');
//     if (!file) return;

//     if (file.type !== 'application/pdf') {
//       setError('Only PDF files allowed');
//       return;
//     }
//     if (file.size > MAX_SIZE_MB * 1024 * 1024) {
//       setError(`Max size is ${MAX_SIZE_MB}MB`);
//       return;
//     }

//     setUploading(true);
//     try {
//       const formData = new FormData();
//       formData.append('pdf', file);

//       const res = await fetch(`${BASE_URL}/api/upload`, {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || 'Upload failed');

//       // Save to parent state — this gets sent to MongoDB on Save Draft
//       onChange({
//         fileId:     data.fileId, // /uploads/1710000_proof.pdf
//         filePath:     data.filePath,    
//         fileName:     data.fileName,     // 1710000_proof.pdf
//         originalName: data.originalName, // proof.pdf
//         size:         data.size,
//       });
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ── Delete from backend ──
//   const handleRemove = async (e) => {
//     e.stopPropagation();
//     if (!value?.fileId) { onChange(null); return; }

//     try {
//       await fetch(`${BASE_URL}/api/upload`, {
//         method:  'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ fileId: value.fileId }),
//       });
//     } catch (_) { /* ignore if already deleted */ }

//     onChange(null);
//     if (inputRef.current) inputRef.current.value = '';
//   };

//   // ── View PDF in new tab ──
//   const handleView = (e) => {
//     e.stopPropagation();
//     if (value?.filePath) {
//   window.open(value.filePath, '_blank');
// }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     handleFile(e.dataTransfer.files[0]);
//   };

//   const formatSize = (bytes) => {
//     if (!bytes) return '';
//     return bytes < 1024 * 1024
//       ? `${(bytes / 1024).toFixed(1)} KB`
//       : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
//   };

//   // ── Styles ──
//   const boxStyle = {
//     border:       value ? '1.5px solid #4f46e5' : '1.5px dashed #cbd5e1',
//     borderRadius: 8,
//     padding:      '10px 14px',
//     background:   value ? '#eef2ff' : '#f8fafc',
//     cursor:       uploading ? 'wait' : value ? 'default' : 'pointer',
//     transition:   'all 0.2s',
//     display:      'flex',
//     alignItems:   'center',
//     gap:          10,
//     minHeight:    44,
//   };

//   return (
//     <div>
//       {label && (
//         <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#64748b', marginBottom: 4 }}>
//           {label}
//         </label>
//       )}

//       <div
//         style={boxStyle}
//         onClick={() => !value && !uploading && inputRef.current?.click()}
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={handleDrop}
//       >
//         {uploading ? (
//           <>
//             <Loader size={16} color="#4f46e5" style={{ animation: 'spin 1s linear infinite' }} />
//             <span style={{ fontSize: 13, color: '#4f46e5' }}>Uploading…</span>
//           </>
//         ) : value ? (
//           <>
//             <FileText size={18} color="#4f46e5" style={{ flexShrink: 0 }} />
//             <div style={{ flex: 1, minWidth: 0 }}>
//               <div style={{ fontSize: 13, fontWeight: 500, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                 {value.originalName || value.fileName}
//               </div>
//               <div style={{ fontSize: 11, color: '#64748b' }}>{formatSize(value.size)}</div>
//             </div>

//             {/* View button */}
//             <button onClick={handleView} title="View PDF"
//               style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#4f46e5', display: 'flex', alignItems: 'center' }}>
//               <Eye size={15} />
//             </button>

//             {/* Remove button */}
//             <button onClick={handleRemove} title="Remove"
//               style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#ef4444', display: 'flex', alignItems: 'center' }}>
//               <X size={15} />
//             </button>
//           </>
//         ) : (
//           <>
//             <Upload size={16} color="#94a3b8" />
//             <span style={{ fontSize: 13, color: '#94a3b8' }}>
//               Click or drag PDF here (max {MAX_SIZE_MB}MB)
//             </span>
//           </>
//         )}
//       </div>

//       {error && (
//         <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>⚠ {error}</div>
//       )}

//       <input
//         ref={inputRef}
//         type="file"
//         accept="application/pdf"
//         style={{ display: 'none' }}
//         onChange={(e) => handleFile(e.target.files[0])}
//       />

//       {/* Spinner CSS */}
//       <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
//     </div>
//   );
// }

// ── components/PDFUpload.jsx ──
// PDF upload + modal viewer (same window mein khulta hai)

// import { useRef, useState } from 'react';
import { Upload, X, FileText, Eye, Loader } from 'lucide-react';
import PDFModal from '../common/PDFModal';

const BASE_URL    = 'http://localhost:5000';
const MAX_SIZE_MB = 10;

export default function PDFUpload({ value, onChange, label = 'Proof (PDF)' }) {
  const inputRef              = useRef();
  const [uploading, setUploading] = useState(false);
  const [error,     setError]     = useState('');
  const [showModal, setShowModal] = useState(false); // ← modal state

  const handleFile = async (file) => {
    setError('');
    if (!file) return;
    if (file.type !== 'application/pdf') { setError('Only PDF files allowed'); return; }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) { setError(`Max size is ${MAX_SIZE_MB}MB`); return; }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('pdf', file);
      const res  = await fetch(`${BASE_URL}/api/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');
      onChange({
        fileId:       data.fileId,
        filePath:     data.filePath,
        fileName:     data.fileName,
        originalName: data.originalName,
        size:         data.size,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (e) => {
    e.stopPropagation();
    if (!value?.fileId) { onChange(null); return; }
    try {
      await fetch(`${BASE_URL}/api/upload`, {
        method: 'DELETE', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileId: value.fileId }),
      });
    } catch (_) {}
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleDrop = (e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); };

  const formatSize = (bytes) => {
    if (!bytes) return '';
    return bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / (1024*1024)).toFixed(1)} MB`;
  };

  const boxStyle = {
    border:       value ? '1.5px solid #4f46e5' : '1.5px dashed #cbd5e1',
    borderRadius: 8, padding: '10px 14px',
    background:   value ? '#eef2ff' : '#f8fafc',
    cursor:       uploading ? 'wait' : value ? 'default' : 'pointer',
    transition:   'all 0.2s', display: 'flex', alignItems: 'center', gap: 10, minHeight: 44,
  };

  return (
    <div>
      {label && <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#64748b', marginBottom: 4 }}>{label}</label>}

      <div style={boxStyle}
        onClick={() => !value && !uploading && inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {uploading ? (
          <>
            <Loader size={16} color="#4f46e5" style={{ animation: 'spin 1s linear infinite' }} />
            <span style={{ fontSize: 13, color: '#4f46e5' }}>Uploading…</span>
          </>
        ) : value ? (
          <>
            <FileText size={18} color="#4f46e5" style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {value.originalName || value.fileName}
              </div>
              <div style={{ fontSize: 11, color: '#64748b' }}>{formatSize(value.size)}</div>
            </div>

            {/* View — modal mein khulega */}
            <button
              onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
              title="View PDF"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#4f46e5', display: 'flex', alignItems: 'center' }}>
              <Eye size={15} />
            </button>

            {/* Remove */}
            <button
              onClick={handleRemove}
              title="Remove"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#ef4444', display: 'flex', alignItems: 'center' }}>
              <X size={15} />
            </button>
          </>
        ) : (
          <>
            <Upload size={16} color="#94a3b8" />
            <span style={{ fontSize: 13, color: '#94a3b8' }}>Click or drag PDF here (max {MAX_SIZE_MB}MB)</span>
          </>
        )}
      </div>

      {error && <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>⚠ {error}</div>}

      <input ref={inputRef} type="file" accept="application/pdf"
        style={{ display: 'none' }}
        onChange={(e) => handleFile(e.target.files[0])} />

      {/* PDF Modal */}
      {showModal && (
        <PDFModal
          url={value?.filePath}
          fileName={value?.originalName || value?.fileName}
          onClose={() => setShowModal(false)}
        />
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}