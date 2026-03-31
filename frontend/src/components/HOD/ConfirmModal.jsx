export default function ConfirmModal({
  open, title, body,
  confirmLabel = 'Confirm', confirmClass = 'btn-primary',
  onConfirm, onCancel,
}) {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-[fadeIn_.2s_ease]"
      onClick={onCancel}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl p-7 max-w-md w-full shadow-2xl animate-[slideUp_.25s_cubic-bezier(.34,1.56,.64,1)]"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{body}</p>
        <div className="flex gap-3 justify-end">
          <button className="btn btn-outline" onClick={onCancel}>Cancel</button>
          <button className={`btn ${confirmClass}`} onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  )
}
