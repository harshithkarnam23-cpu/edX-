import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SegmentedControl } from '../common/SegmentedControl';
import {
  Clock20Regular,
  Location20Regular,
  Person20Regular,
  Tag20Regular,
  CalendarLtr20Regular
} from '@fluentui/react-icons';

export const TimetableView: React.FC = () => {
  const { session } = useAuth();
  const [selectedDay, setSelectedDay] = useState<string>('Day 1');

  if (!session) return null;

  const schedule = session.schedule || {};
  const dayOptions = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'].map((d) => ({
    id: d,
    label: d,
    badge: schedule[d] ? Object.keys(schedule[d]).length : undefined
  }));

  const activeDaySchedule = schedule[selectedDay] || {};
  const slots = Object.entries(activeDaySchedule).sort((a, b) => {
    // sort by starting time
    return a[0].localeCompare(b[0]);
  });

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
          Weekly Schedule
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Unified Day-order timetable with classroom allocations and assigned faculty
        </p>
      </div>

      {/* Day Order Segmented Switch */}
      <div style={{ marginBottom: '24px' }}>
        <SegmentedControl
          options={dayOptions}
          value={selectedDay}
          onChange={(val) => setSelectedDay(val)}
        />
      </div>

      {/* Slots Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {slots.length === 0 ? (
          <div
            className="fluent-card"
            style={{
              padding: '48px 20px',
              textAlign: 'center',
              color: 'var(--text-tertiary)'
            }}
          >
            <CalendarLtr20Regular style={{ fontSize: '32px', marginBottom: '8px' }} />
            <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              No classes registered for {selectedDay}
            </div>
            <div style={{ fontSize: '13px', marginTop: '4px' }}>
              Check other day orders or refresh your schedule from Academia.
            </div>
          </div>
        ) : (
          slots.map(([timeRange, slot], idx) => {
            const isPractical = slot.type === 'Practical' || slot.raw_type === 'Practical';

            return (
              <div
                key={`${selectedDay}-${timeRange}-${idx}`}
                className="fluent-card fluent-card-hover"
                style={{
                  padding: '18px 20px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  borderLeft: `4px solid ${isPractical ? 'var(--status-info-text)' : 'var(--brand-primary)'}`
                }}
              >
                {/* Time & Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 300px' }}>
                  {/* Time Badge */}
                  <div
                    style={{
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--surface-secondary)',
                      border: '1px solid var(--stroke-subtle)',
                      textAlign: 'center',
                      minWidth: '100px'
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {timeRange}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
                      PERIOD {idx + 1}
                    </div>
                  </div>

                  {/* Course Details */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--surface-tertiary)',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {slot.code || slot.courseCode}
                      </span>
                      {slot.slot && (
                        <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                          Slot {slot.slot}
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                      {slot.course || slot.name || slot.courseTitle}
                    </h3>
                  </div>
                </div>

                {/* Location & Faculty Metadata */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
                  {/* Room */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <Location20Regular style={{ color: 'var(--brand-primary)' }} />
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{slot.room || 'TBA'}</div>
                      {slot.building && (
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{slot.building}</div>
                      )}
                    </div>
                  </div>

                  {/* Faculty */}
                  {slot.faculty && slot.faculty !== 'TBA' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      <Person20Regular style={{ color: 'var(--text-tertiary)' }} />
                      <div style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {slot.faculty}
                      </div>
                    </div>
                  )}

                  {/* Type Badge */}
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: isPractical ? 'var(--status-info-bg)' : 'var(--brand-tint)',
                      color: isPractical ? 'var(--status-info-text)' : 'var(--brand-primary)',
                      border: '1px solid var(--stroke-subtle)'
                    }}
                  >
                    {isPractical ? 'Practical / Lab' : 'Theory'}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
