import { CheckCircle, XCircle, Info } from 'lucide-react'
import { useStore } from '../../context/HOD/useStore'

const CFG = {
  success: { Icon: CheckCircle, cls: 'border-l-emerald-500 text-emerald-600' },
  error:   { Icon: XCircle,     cls: 'border-l-red-500    text-red-600'     },
  info:    { Icon: Info,        cls: 'border-l-blue-500   text-blue-600'    },
}

export default function ToastContainer() {
  const toasts = useStore((s) => s.toasts)

  return (
    <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-2.5">
      {toasts.map((t) => {
        const { Icon, cls } = CFG[t.type] || CFG.info
        return (
          <div
            key={t.id}
            className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 border-l-4 ${cls} rounded-lg px-4 py-3 flex items-center gap-3 shadow-xl animate-toast-in min-w-[240px] max-w-[320px]`}
          >
            <Icon size={16} />
            <span className="text-[13px] font-medium text-slate-700 dark:text-slate-200">{t.msg}</span>
          </div>
        )
      })}
    </div>
  )
}
