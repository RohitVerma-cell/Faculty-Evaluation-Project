import clsx from 'clsx'

const VARIANTS = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md',
  success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm',
  danger:  'bg-red-600   hover:bg-red-700   text-white shadow-sm',
  outline: 'border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-400 hover:text-blue-600',
  ghost:   'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700',
}

const SIZES = {
  sm: 'text-[12px] px-3 py-1.5 gap-1.5',
  md: 'text-[13px] px-4 py-2   gap-2',
  lg: 'text-[14px] px-5 py-2.5 gap-2',
}

export default function Button({ children, variant = 'primary', size = 'md', className = '', disabled, ...props }) {
  return (
    <button
      className={clsx(
        'inline-flex items-center font-semibold rounded-lg transition-all duration-150 cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
