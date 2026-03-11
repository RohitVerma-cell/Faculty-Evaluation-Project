import { Check, Clock, X } from 'lucide-react';
import { WORKFLOW_STEPS, STATUS_ORDER } from '../utils/constants';

export default function WorkflowTracker({ status }) {
  const currentIndex = STATUS_ORDER.indexOf(status);
  const isRejected   = status === 'rejected';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, width: '100%' }}>
      {WORKFLOW_STEPS.map((step, i) => {
        const stepIndex = STATUS_ORDER.indexOf(step.key);
        const isComplete = !isRejected && currentIndex >= stepIndex;
        const isCurrent  = !isRejected && currentIndex === stepIndex;

        const bg = isRejected    ? '#fee2e2'
                 : isComplete    ? '#16a34a'
                 : isCurrent     ? '#3b82f6'
                 :                 '#f1f5f9';

        const fg = isRejected            ? '#dc2626'
                 : (isComplete||isCurrent)? '#fff'
                 :                          '#94a3b8';

        return (
          <div key={step.key} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: bg, color: fg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 500,
              }}>
                {isRejected  ? <X     size={14} />
               : isComplete  ? <Check size={14} />
               :                <Clock size={14} />}
              </div>

              <span style={{ fontSize: 10, marginTop: 4, color: '#94a3b8', textAlign: 'center' }}>
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < WORKFLOW_STEPS.length - 1 && (
              <div style={{
                height: 2,
                width: '100%',
                minWidth: 16,
                marginTop: -14,
                background: (isComplete && currentIndex > stepIndex) ? '#16a34a' : '#e2e8f0',
              }} />
            )}

          </div>
        );
      })}
    </div>
  );
}