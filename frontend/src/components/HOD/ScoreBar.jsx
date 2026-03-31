export default function ScoreBar({ value, max = 100, color = null, width = 64 }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="flex items-center gap-2">
      <div className="score-bar" style={{ width }}>
        <div
          className="score-fill"
          style={{ width: `${pct}%`, background: color ?? undefined }}
        />
      </div>
      <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{value}</span>
    </div>
  )
}
