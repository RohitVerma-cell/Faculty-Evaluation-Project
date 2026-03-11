// ── components/StatCard.jsx ──

import styles from '../utils/styles';


export default function StatCard({ title, value, subtitle, icon: Icon, trend }) {
  return (
    <div style={styles.card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

        <div>
          <p style={{ fontSize: 14, color: '#64748b', fontWeight: 500, margin: 0 }}>
            {title}
          </p>

          <p style={{ fontSize: 24, fontWeight: 700, margin: '4px 0 0', color: '#0f172a' }}>
            {value}
          </p>

          {subtitle && (
            <p style={{ fontSize: 12, color: '#94a3b8', margin: '4px 0 0' }}>
              {subtitle}
            </p>
          )}

          {trend && (
            <p style={{
              fontSize: 12,
              fontWeight: 500,
              margin: '4px 0 0',
              color: trend.positive ? '#16a34a' : '#dc2626',
            }}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}% from last year
            </p>
          )}
        </div>

        <div style={styles.statIcon}>
          <Icon style={{ width: 20, height: 20, color: '#6366f1' }} />
        </div>

      </div>
    </div>
  );
}