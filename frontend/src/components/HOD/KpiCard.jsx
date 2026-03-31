const COLOR_MAP = {
  blue:   { bar: 'from-blue-500 to-violet-500',   icon: 'bg-blue-100   text-blue-600   dark:bg-blue-900/40   dark:text-blue-400'   },
  green:  { bar: 'from-emerald-400 to-teal-500',  icon: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' },
  orange: { bar: 'from-amber-400 to-orange-500',  icon: 'bg-amber-100  text-amber-600  dark:bg-amber-900/40  dark:text-amber-400'  },
  red:    { bar: 'from-red-400   to-rose-500',     icon: 'bg-red-100    text-red-600    dark:bg-red-900/40    dark:text-red-400'    },
}

export default function KpiCard({ label, value, icon: Icon, color = 'blue', change, changeDir = 'up' }) {
  const { bar, icon } = COLOR_MAP[color]
  return (
    <div className="relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
      {/* top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-linear-to-r ${bar}`} />

      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${icon}`}>
        <Icon size={18} />
      </div>

      <div className="text-3xl font-bold text-slate-900 dark:text-white leading-none mb-1">
        {value}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</div>

      {change && (
        <div className={`text-[11px] font-semibold mt-2 ${changeDir === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
          {changeDir === 'up' ? '↑' : '↓'} {change}
        </div>
      )}
    </div>
  )
}
