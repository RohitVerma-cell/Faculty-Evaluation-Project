
import styles from '../../utils/styles';
import { STATUS_LABELS } from '../../utils/constants';

const COLOR_MAP = {
  draft:              { bg: '#f1f5f9', color: '#64748b' },
  submitted:          { bg: '#dbeafe', color: '#1d4ed8' },
  hod_approved:       { bg: '#bfdbfe', color: '#1e40af' },
  principal_approved: { bg: '#e0e7ff', color: '#4338ca' },
  director_approved:  { bg: '#dcfce7', color: '#15803d' },
  chairman_approved:  { bg: '#16a34a', color: '#fff'    },
  rejected:           { bg: '#fee2e2', color: '#dc2626' },
};

export default function StatusBadge({ status }) {
  const c = COLOR_MAP[status] ?? COLOR_MAP.draft;
  return (
    <span style={{ ...styles.badge, background: c.bg, color: c.color }}>
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}