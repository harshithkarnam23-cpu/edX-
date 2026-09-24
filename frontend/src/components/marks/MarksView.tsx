import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  DocumentBulletList20Regular,
  ChevronDown20Regular,
  ChevronUp20Regular,
  Trophy20Regular,
  Calendar20Regular,
  CheckmarkCircle20Regular
} from '@fluentui/react-icons';

export const MarksView: React.FC = () => {
  const { session } = useAuth();
  const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({});

  if (!session) return null;

  const marksList = session.marks || [];

  const toggleExpand = (courseCode: string) => {
    setExpandedCourses((prev) => ({
      ...prev,
      [courseCode]: !prev[courseCode]
    }));
  };

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
          Internal Marks & Assessments
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Cycle test scores, continuous assessments, and model examination performances
        </p>
      </div>

      {marksList.length === 0 ? (
        <div
          className="fluent-card"
          style={{
            padding: '48px 20px',
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}
        >
          <DocumentBulletList20Regular style={{ fontSize: '32px', marginBottom: '8px' }} />
          <div style={{ fontSize: '16px', fontWeight: 600 }}>No marks entries published yet</div>
          <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
            Internal marks will appear as soon as faculty members upload test evaluations.
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {marksList.map((item) => {
            const isExpanded = expandedCourses[item.courseCode] ?? true;
            const scorePct =
              item.totalMarkGot !== null && item.totalMaxMarks
                ? (item.totalMarkGot / item.totalMaxMarks) * 100
                : null;

            return (
              <div
                key={item.courseCode}
                className="fluent-card"
                style={{
                  padding: '20px',
                  borderRadius: 'var(--radius-lg)',
                  transition: 'box-shadow var(--duration-fast) var(--ease-fluent)'
                }}
              >
                {/* Course Header Bar */}
                <div
                  onClick={() => toggleExpand(item.courseCode)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--surface-secondary)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {item.courseCode}
                      </span>
                      {item.type && (
                        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                          • {item.type}
                        </span>
                      )}
                    </div>
                    <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                      {item.title}
                    </h2>
                  </div>

                  {/* Right Score Pill */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--brand-primary)' }}>
                        {item.totalMarkGot !== null && item.totalMaxMarks
                          ? `${item.totalMarkGot} / ${item.totalMaxMarks}`
                          : item.performance || 'Recorded'}
                      </div>
                      {scorePct !== null && (
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                          {scorePct.toFixed(1)}% scored
                        </div>
                      )}
                    </div>
                    <span style={{ color: 'var(--text-tertiary)', display: 'flex' }}>
                      {isExpanded ? <ChevronUp20Regular /> : <ChevronDown20Regular />}
                    </span>
                  </div>
                </div>

                {/* Score Progress Bar */}
                {scorePct !== null && (
                  <div
                    style={{
                      height: '6px',
                      backgroundColor: 'var(--surface-tertiary)',
                      borderRadius: 'var(--radius-pill)',
                      overflow: 'hidden',
                      margin: '14px 0 6px 0'
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.min(100, Math.max(0, scorePct))}%`,
                        height: '100%',
                        backgroundColor: scorePct >= 75 ? 'var(--status-success-text)' : 'var(--brand-primary)',
                        borderRadius: 'var(--radius-pill)'
                      }}
                    />
                  </div>
                )}

                {/* Detailed Assessments Table */}
                {isExpanded && item.assessments && item.assessments.length > 0 && (
                  <div
                    style={{
                      marginTop: '16px',
                      paddingTop: '14px',
                      borderTop: '1px solid var(--stroke-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Evaluation Components
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                      {item.assessments.map((ass, i) => {
                        const got = parseFloat(ass.marks) || 0;
                        const max = parseFloat(ass.total) || 1;
                        const pct = (got / max) * 100;

                        return (
                          <div
                            key={i}
                            style={{
                              backgroundColor: 'var(--surface-secondary)',
                              padding: '10px 14px',
                              borderRadius: 'var(--radius-md)',
                              border: '1px solid var(--stroke-subtle)',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <div>
                              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                                {ass.title}
                              </div>
                              {ass.date && (
                                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Calendar20Regular style={{ fontSize: '12px' }} /> {ass.date}
                                </div>
                              )}
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '14px', fontWeight: 700, color: pct >= 80 ? 'var(--status-success-text)' : 'var(--text-primary)' }}>
                                {ass.marks} <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 400 }}>/ {ass.total}</span>
                              </div>
                              <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>
                                {pct.toFixed(0)}%
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
