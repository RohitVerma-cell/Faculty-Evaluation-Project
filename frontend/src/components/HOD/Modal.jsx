import Button from './Button'

export default function ConfirmModal({ open, title, body, confirmLabel, variant = 'primary', onConfirm, onCancel }) {
  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-200 flex items-center justify-center p-6 animate-fade-in"
      onClick={onCancel}
    >
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl p-7 max-w-[440px] w-full shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[17px] font-bold text-slate-900 dark:text-white mb-2">{title}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{body}</p>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button variant={variant} onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  )
}
