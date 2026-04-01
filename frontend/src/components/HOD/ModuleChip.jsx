const MAP = {
  Teaching: 'bg-blue-100   text-blue-800   dark:bg-blue-900/40   dark:text-blue-300',
  Research: 'bg-pink-100   text-pink-800   dark:bg-pink-900/40   dark:text-pink-300',
  'Self Dev': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
}

export default function ModuleChip({ module }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${MAP[module] || ''}`}>
      {module}
    </span>
  )
}
