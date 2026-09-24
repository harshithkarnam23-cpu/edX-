import React from 'react';

interface SegmentOption<T extends string> {
  id: T;
  label: string;
  badge?: number | string;
  icon?: React.ReactNode;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (val: T) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className = '',
  size = 'md'
}: SegmentedControlProps<T>) {
  const sizeStyles = {
    sm: 'padding: 2px; font-size: 12px;',
    md: 'padding: 3px; font-size: 13px;',
    lg: 'padding: 4px; font-size: 14px;'
  };

  return (
    <div 
      className={`fluent-segmented-container ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--surface-tertiary)',
        borderRadius: 'var(--radius-md)',
        padding: size === 'sm' ? '2px' : '3px',
        position: 'relative'
      }}
      role="tablist"
    >
      {options.map((opt) => {
        const isActive = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`fluent-segmented-item ${isActive ? 'active' : ''}`}
            onClick={() => onChange(opt.id)}
            style={{
              padding: size === 'sm' ? '4px 8px' : '6px 14px',
              fontSize: size === 'sm' ? '12px' : '13px'
            }}
          >
            {opt.icon && <span style={{ display: 'inline-flex' }}>{opt.icon}</span>}
            <span>{opt.label}</span>
            {opt.badge !== undefined && (
              <span
                style={{
                  fontSize: '11px',
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: isActive ? 'var(--brand-tint)' : 'var(--surface-hover)',
                  color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
                  fontWeight: 600
                }}
              >
                {opt.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
