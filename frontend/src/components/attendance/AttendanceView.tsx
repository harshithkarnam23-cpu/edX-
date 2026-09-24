import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../common/StatusBadge';
import { BunkCalculatorModal } from '../common/BunkCalculatorModal';
import { SegmentedControl } from '../common/SegmentedControl';
import { AttendanceCourse } from '../../types';
import {
  Search20Regular,
  Calculator20Regular,
  Filter20Regular,
  Info20Regular,
  CheckmarkCircle20Regular,
  Warning20Regular,
  DismissCircle20Regular
} from '@fluentui/react-icons';

type FilterType = 'all' | 'critical' | 'caution' | 'safe' | 'labs';

export const AttendanceView: React.FC = () => {
  const { session } = useAuth();
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<AttendanceCourse | null>(null);

  if (!session) return null;

  const courses = session.attendance || [];
  const monthly = session.monthly || [];

  // Filter courses
  const filteredCourses = courses.filter((c) => {
    // Search
    const matchesSearch =
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.slot.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Filter type
    if (filter === 'critical') return c.percent < 75;
    if (filter === 'caution') return c.percent >= 75 && c.percent < 80;
    if (filter === 'safe') return c.percent >= 80;
    if (filter === 'labs') return c.category.toLowerCase().includes('practical') || c.code.endsWith('P') || c.code.endsWith('L');
    return true;
  });

  const criticalCount = courses.filter((c) => c.percent < 75).length;
  const cautionCount = courses.filter((c) => c.percent >= 75 && c.percent < 80).length;
  const safeCount = courses.filter((c) => c.percent >= 80).length;

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Title & Stats */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
          Course Attendance
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Real-time tracking of classes conducted, attendance percentages, and safety margins
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        <div style={{ position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-tertiary)',
              display: 'flex'
            }}
          >
            <Search20Regular />
          </span>
          <input
            type="text"
            placeholder="Search course code, subject name, or slot..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="fluent-input"
            style={{ paddingLeft: '40px' }}
          />
        </div>

        <SegmentedControl
          options={[
            { id: 'all', label: 'All Courses', badge: courses.length },
            { id: 'critical', label: 'Critical (<75%)', badge: criticalCount > 0 ? criticalCount : undefined },
            { id: 'caution', label: 'Caution (75-80%)', badge: cautionCount > 0 ? cautionCount : undefined },
            { id: 'safe', label: 'Safe (≥80%)', badge: safeCount },
            { id: 'labs', label: 'Practicals & Labs' }
          ]}
          value={filter}
          onChange={(val) => setFilter(val as FilterType)}
        />
      </div>

      {/* Course List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
        {filteredCourses.length === 0 ? (
          <div
            className="fluent-card"
            style={{
              gridColumn: '1 / -1',
              padding: '40px 20px',
              textAlign: 'center',
              color: 'var(--text-secondary)'
            }}
          >
            No courses match the current filter or search criteria.
          </div>
        ) : (
          filteredCourses.map((course) => {
            const conducted = course.conducted || 0;
            const absent = course.absent || 0;
            const present = course.present !== undefined ? course.present : Math.max(0, conducted - absent);
            const percent = course.percent || 0;

            // Safe bunk or required calculation
            let bunkAdvice = '';
            if (percent >= 75) {
              const maxBunk = Math.max(0, Math.floor(present / 0.75 - conducted));
              bunkAdvice = maxBunk > 0 ? `${maxBunk} bunks available` : 'On the border';
            } else {
              const need = Math.max(0, Math.ceil((0.75 * conducted - present) / 0.25));
              bunkAdvice = `Must attend ${need} classes`;
            }

            return (
              <div
                key={course.code}
                className="fluent-card fluent-card-hover"
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderLeft: `4px solid ${percent >= 75 ? 'var(--status-success-text)' : 'var(--status-danger-text)'}`
                }}
              >
                <div>
                  {/* Header: Code & Status */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                    <div>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--surface-secondary)',
                          color: 'var(--text-secondary)',
                          letterSpacing: '0.4px'
                        }}
                      >
                        {course.code}
                      </span>
                      {course.slot && (
                        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginLeft: '6px' }}>
                          Slot: {course.slot}
                        </span>
                      )}
                    </div>
                    <StatusBadge percent={percent} size="sm" showDot />
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '12px' }}>
                    {course.title}
                  </h3>

                  {/* Progress Bar with 75% tick marker */}
                  <div style={{ position: 'relative', margin: '14px 0 8px 0' }}>
                    <div
                      style={{
                        height: '8px',
                        backgroundColor: 'var(--surface-tertiary)',
                        borderRadius: 'var(--radius-pill)',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        style={{
                          width: `${Math.min(100, Math.max(0, percent))}%`,
                          height: '100%',
                          backgroundColor: percent >= 75 ? 'var(--status-success-text)' : 'var(--status-danger-text)',
                          borderRadius: 'var(--radius-pill)',
                          transition: 'width var(--duration-normal) var(--ease-fluent)'
                        }}
                      />
                    </div>
                    {/* 75% milestone mark */}
                    <div
                      title="75% Minimum Requirement"
                      style={{
                        position: 'absolute',
                        left: '75%',
                        top: '-3px',
                        bottom: '-3px',
                        width: '2px',
                        backgroundColor: 'var(--text-tertiary)',
                        zIndex: 2
                      }}
                    />
                  </div>

                  {/* Stats Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '8px',
                      backgroundColor: 'var(--surface-secondary)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'center',
                      marginTop: '8px'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600 }}>CONDUCTED</div>
                      <div style={{ fontSize: '14px', fontWeight: 700 }}>{conducted}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600 }}>ATTENDED</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--status-success-text)' }}>{present}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontWeight: 600 }}>ABSENT</div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--status-danger-text)' }}>{absent}</div>
                    </div>
                  </div>
                </div>

                {/* Footer advice & modal trigger */}
                <div
                  style={{
                    marginTop: '16px',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--stroke-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: percent >= 75 ? 'var(--status-success-text)' : 'var(--status-danger-text)'
                    }}
                  >
                    {bunkAdvice}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedCourse(course)}
                    className="fluent-btn-secondary"
                    style={{ padding: '4px 10px', fontSize: '12px' }}
                  >
                    <Calculator20Regular /> Margin Calculator
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Monthly Attendance breakdown if available */}
      {monthly.length > 0 && (
        <div className="fluent-card" style={{ marginTop: '32px', padding: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Monthly Attendance Trend
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
            {monthly.map((m) => {
              const total = m.present + m.absent;
              const pct = total > 0 ? (m.present / total) * 100 : 0;
              return (
                <div
                  key={m.month}
                  style={{
                    backgroundColor: 'var(--surface-secondary)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                    border: '1px solid var(--stroke-subtle)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                    {m.month}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '4px', color: pct >= 75 ? 'var(--status-success-text)' : 'var(--status-danger-text)' }}>
                    {pct.toFixed(1)}%
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                    {m.present} attended / {m.absent} missed
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Calculator Modal */}
      {selectedCourse && (
        <BunkCalculatorModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};
