import React from 'react';

export type StatusType = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface StatusBadgeProps {
  type?: StatusType;
  percent?: number;
  label?: string;
  size?: 'sm' | 'md';
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  type,
  percent,
  label,
  size = 'md',
  showDot = false,
}) => {
  // Derive status from attendance percentage if provided
  let resolvedType: StatusType = type || 'neutral';
  if (percent !== undefined) {
    if (percent >= 75) {
      resolvedType = 'success';
    } else if (percent >= 65) {
      resolvedType = 'warning';
    } else {
      resolvedType = 'danger';
    }
  }

  const dotColors: Record<StatusType, string> = {
    success: '#107C41',
    warning: '#D83B01',
    danger: '#D13438',
    info: '#0078D4',
    neutral: '#707070'
  };

  const badgeClass = `badge-${resolvedType}`;

  return (
    <span
      className={badgeClass}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: size === 'sm' ? '2px 8px' : '4px 10px',
        borderRadius: 'var(--radius-pill)',
        fontSize: size === 'sm' ? '12px' : '13px',
        fontWeight: 600,
        letterSpacing: '-0.2px',
        userSelect: 'none'
      }}
    >
      {showDot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: dotColors[resolvedType]
          }}
        />
      )}
      {label !== undefined ? label : percent !== undefined ? `${percent.toFixed(1)}%` : ''}
    </span>
  );
};
