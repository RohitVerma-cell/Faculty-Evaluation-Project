export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 20,
      right: 20,
      zIndex: 100,
      background: '#0f172a',
      color: '#fff',
      padding: '12px 20px',
      borderRadius: 8,
      fontSize: 14,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    }}>
      {message}
    </div>
  );
}