import React, { useState } from 'react';
import { AttendanceCourse } from '../../types';
import { StatusBadge } from './StatusBadge';
import confetti from 'canvas-confetti';

interface BunkCalculatorModalProps {
  course: AttendanceCourse | null;
  onClose: () => void;
}

export const BunkCalculatorModal: React.FC<BunkCalculatorModalProps> = ({ course, onClose }) => {
  if (!course) return null;

  const [targetPercent, setTargetPercent] = useState<number>(75);
  const [simulatedClasses, setSimulatedClasses] = useState<number>(0);
  const [simulationType, setSimulationType] = useState<'miss' | 'attend'>('miss');

  const conducted = course.conducted || 0;
  const absent = course.absent || 0;
  const present = course.present !== undefined ? course.present : Math.max(0, conducted - absent);
  const currentPercent = course.percent || (conducted > 0 ? (present / conducted) * 100 : 100);

  // Calculation for target
  const targetFraction = targetPercent / 100;

  // If current >= target, how many can be missed?
  // (present) / (conducted + B) >= targetFraction
  // conducted + B <= present / targetFraction
  // B = Math.floor(present / targetFraction - conducted)
  let maxBunks = 0;
  if (present / (conducted || 1) >= targetFraction) {
    maxBunks = Math.max(0, Math.floor(present / targetFraction - conducted));
  }

  // If current < target, how many consecutive needed?
  // (present + A) / (conducted + A) >= targetFraction
  // present + A >= targetFraction * conducted + targetFraction * A
  // A * (1 - targetFraction) >= targetFraction * conducted - present
  // A = Math.ceil((targetFraction * conducted - present) / (1 - targetFraction))
  let neededClasses = 0;
  if (present / (conducted || 1) < targetFraction) {
    neededClasses = Math.max(
      0,
      Math.ceil((targetFraction * conducted - present) / (1 - targetFraction))
    );
  }

  // Simulated projection
  let simConducted = conducted + simulatedClasses;
  let simPresent = simulationType === 'attend' ? present + simulatedClasses : present;
  let projectedPercent = simConducted > 0 ? (simPresent / simConducted) * 100 : currentPercent;

  const handleCelebrate = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fluent-modal-overlay" onClick={onClose}>
      <div className="fluent-modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Attendance Margin Calculator
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: 700, marginTop: '2px', color: 'var(--text-primary)' }}>
              {course.title}
            </h2>
            <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Code: <strong>{course.code}</strong> {course.slot && `• Slot ${course.slot}`}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: 'var(--text-tertiary)',
              padding: '4px'
            }}
          >
            ✕
          </button>
        </div>

        {/* Current status stats */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
            backgroundColor: 'var(--surface-secondary)',
            padding: '14px',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '20px',
            textAlign: 'center'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600 }}>CONDUCTED</div>
            <div style={{ fontSize: '18px', fontWeight: 700 }}>{conducted}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600 }}>ATTENDED</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--status-success-text)' }}>{present}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600 }}>ABSENT</div>
            <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--status-danger-text)' }}>{absent}</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600 }}>CURRENT %</div>
            <div style={{ fontSize: '18px', fontWeight: 700 }}>
              <StatusBadge percent={currentPercent} size="sm" />
            </div>
          </div>
        </div>

        {/* Target percentage switcher */}
        <div style={{ marginBottom: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Target Threshold</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--brand-primary)' }}>{targetPercent}%</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[75, 80, 85, 90].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTargetPercent(t)}
                className={`fluent-btn-${targetPercent === t ? 'primary' : 'secondary'}`}
                style={{ flex: 1, padding: '6px 0', fontSize: '13px', borderRadius: 'var(--radius-md)' }}
              >
                {t}% {t === 75 ? '(SRM Min)' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Result Highlight Box */}
        <div
          style={{
            padding: '16px',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '20px',
            backgroundColor: currentPercent >= targetPercent ? 'var(--status-success-bg)' : 'var(--status-danger-bg)',
            border: `1px solid ${currentPercent >= targetPercent ? 'var(--status-success-border)' : 'var(--status-danger-border)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <div style={{ fontSize: '28px' }}>
            {currentPercent >= targetPercent ? '🛡️' : '⚠️'}
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: currentPercent >= targetPercent ? 'var(--status-success-text)' : 'var(--status-danger-text)' }}>
              {currentPercent >= targetPercent 
                ? `You can safely bunk ${maxBunks} ${maxBunks === 1 ? 'class' : 'classes'}!`
                : `Must attend ${neededClasses} consecutive ${neededClasses === 1 ? 'class' : 'classes'} to reach ${targetPercent}%`
              }
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              {currentPercent >= targetPercent
                ? `Bunking ${maxBunks} classes will leave your attendance at approx ${((present / (conducted + maxBunks)) * 100).toFixed(1)}%.`
                : `Missing classes now will decrease your attendance further below university threshold.`
              }
            </div>
          </div>
        </div>

        {/* What-If Simulator */}
        <div style={{ borderTop: '1px solid var(--stroke-subtle)', paddingTop: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '10px', color: 'var(--text-primary)' }}>
            ⚡ What-If Simulator
          </div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <button
              type="button"
              onClick={() => setSimulationType('miss')}
              className={`fluent-btn-${simulationType === 'miss' ? 'primary' : 'secondary'}`}
              style={{
                flex: 1,
                fontSize: '12px',
                padding: '6px',
                backgroundColor: simulationType === 'miss' ? 'var(--status-danger-text)' : undefined,
                color: simulationType === 'miss' ? '#FFF' : undefined
              }}
            >
              What if I miss classes?
            </button>
            <button
              type="button"
              onClick={() => setSimulationType('attend')}
              className={`fluent-btn-${simulationType === 'attend' ? 'primary' : 'secondary'}`}
              style={{ flex: 1, fontSize: '12px', padding: '6px' }}
            >
              What if I attend classes?
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', minWidth: '80px' }}>
              Count: <strong>+{simulatedClasses}</strong>
            </span>
            <input
              type="range"
              min="0"
              max="20"
              value={simulatedClasses}
              onChange={(e) => setSimulatedClasses(Number(e.target.value))}
              style={{ flex: 1, accentColor: 'var(--brand-primary)', cursor: 'pointer' }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'var(--surface-secondary)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px'
            }}
          >
            <span>
              If you {simulationType === 'miss' ? 'bunk' : 'attend'} <strong>{simulatedClasses}</strong> more classes:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: projectedPercent >= 75 ? 'var(--status-success-text)' : 'var(--status-danger-text)' }}>
                {projectedPercent.toFixed(1)}%
              </span>
              <StatusBadge percent={projectedPercent} size="sm" />
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
          {currentPercent >= 75 && (
            <button
              type="button"
              onClick={handleCelebrate}
              className="fluent-btn-subtle"
              style={{ fontSize: '13px' }}
            >
              🎉 Celebrate Safe Status
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="fluent-btn-primary"
            style={{ fontSize: '13px' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
