const MAP = {
  pending:  { cls: 'bg-amber-100  text-amber-700  dark:bg-amber-900/40  dark:text-amber-400',  label: 'Pending'  },
  approved: { cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400', label: 'Approved' },
  rejected: { cls: 'bg-red-100    text-red-700    dark:bg-red-900/40    dark:text-red-400',    label: 'Rejected' },
  forwarded:{ cls: 'bg-cyan-100   text-cyan-700   dark:bg-cyan-900/40   dark:text-cyan-400',   label: 'Forwarded'},
  draft:    { cls: 'bg-blue-100   text-blue-700   dark:bg-blue-900/40   dark:text-blue-400',   label: 'Draft'    },
  complete: { cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400', label: 'Complete' },
}

export default function StatusBadge({ status }) {
  const { cls, label } = MAP[status] || MAP.draft
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${cls}`}>
      {label}
    </span>
  )
}
