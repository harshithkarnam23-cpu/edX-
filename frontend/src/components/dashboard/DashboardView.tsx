import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatusBadge } from '../common/StatusBadge';
import { BunkCalculatorModal } from '../common/BunkCalculatorModal';
import { AttendanceCourse } from '../../types';
import {
  CalendarLtr20Regular,
  CheckmarkCircle20Regular,
  Warning20Regular,
  DismissCircle20Regular,
  ChevronRight20Regular,
  BookOpen20Regular,
  Calculator20Regular,
  Clock20Regular,
  Location20Regular,
  Person20Regular
} from '@fluentui/react-icons';

export const DashboardView: React.FC = () => {
  const { session, setActiveTab } = useAuth();
  const [selectedCourseForBunk, setSelectedCourseForBunk] = useState<AttendanceCourse | null>(null);

  if (!session) return null;

  const attendanceList = session.attendance || [];
  const totalConducted = attendanceList.reduce((acc, c) => acc + (c.conducted || 0), 0);
  const totalAbsent = attendanceList.reduce((acc, c) => acc + (c.absent || 0), 0);
  const totalAttended = totalConducted - totalAbsent;
  const overallPercent = totalConducted > 0 ? (totalAttended / totalConducted) * 100 : 0;

  const lowAttendanceCourses = attendanceList.filter((c) => c.percent < 75);
  const cautionAttendanceCourses = attendanceList.filter((c) => c.percent >= 75 && c.percent < 80);

  // Today schedule preview (default Day 1)
  const todayDayName = 'Day 1';
  const todaySchedule = session.schedule?.[todayDayName] || {};
  const todaySlots = Object.entries(todaySchedule);

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Student Welcome Hero Card */}
      <div
        className="fluent-card"
        style={{
          padding: '24px',
          marginBottom: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          background: 'linear-gradient(135deg, var(--surface-primary) 0%, var(--surface-secondary) 100%)'
        }}
      >
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            ACADEMIC DASHBOARD
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px', letterSpacing: '-0.3px' }}>
            Hello, {session.profile?.name || session.username}
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {session.profile?.program || 'B.Tech Program'}
            </span>
            <span style={{ color: 'var(--text-tertiary)' }}>•</span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
              {session.profile?.section || 'Section'}
            </span>
            <span style={{ color: 'var(--text-tertiary)' }}>•</span>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {session.profile?.batch || 'Batch'}
            </span>
          </div>
        </div>

        {/* Overall Attendance Summary Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            backgroundColor: 'var(--surface-primary)',
            padding: '12px 20px',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--stroke-subtle)',
            boxShadow: 'var(--shadow-4)'
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>
              OVERALL ATTENDANCE
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
              <span style={{ fontSize: '28px', fontWeight: 800, color: overallPercent >= 75 ? 'var(--status-success-text)' : 'var(--status-danger-text)' }}>
                {overallPercent.toFixed(1)}%
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>/ 75% req.</span>
            </div>
          </div>
          <StatusBadge percent={overallPercent} size="md" showDot />
        </div>
      </div>

      {/* KPI Metric Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}
      >
        {/* Metric 1: Total Conducted */}
        <div className="fluent-card fluent-card-hover" style={{ padding: '18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Total Classes</span>
            <span style={{ color: 'var(--brand-primary)' }}><CheckmarkCircle20Regular /></span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, marginTop: '8px', color: 'var(--text-primary)' }}>
            {totalAttended} <span style={{ fontSize: '14px', color: 'var(--text-tertiary)', fontWeight: 400 }}>/ {totalConducted}</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
            {totalAbsent} absences recorded
          </div>
        </div>

        {/* Metric 2: Low Attendance Alert */}
        <div 
          className="fluent-card fluent-card-hover" 
          style={{ 
            padding: '18px',
            borderColor: lowAttendanceCourses.length > 0 ? 'var(--status-danger-border)' : undefined,
            backgroundColor: lowAttendanceCourses.length > 0 ? 'var(--status-danger-bg)' : undefined
          }}
          onClick={() => setActiveTab('attendance')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: lowAttendanceCourses.length > 0 ? 'var(--status-danger-text)' : 'var(--text-secondary)' }}>
              Critical Courses
            </span>
            <span style={{ color: lowAttendanceCourses.length > 0 ? 'var(--status-danger-text)' : 'var(--status-success-text)' }}>
              {lowAttendanceCourses.length > 0 ? <DismissCircle20Regular /> : <CheckmarkCircle20Regular />}
            </span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, marginTop: '8px', color: lowAttendanceCourses.length > 0 ? 'var(--status-danger-text)' : 'var(--status-success-text)' }}>
            {lowAttendanceCourses.length === 0 ? 'All Safe' : `${lowAttendanceCourses.length} Below 75%`}
          </div>
          <div style={{ fontSize: '12px', color: lowAttendanceCourses.length > 0 ? 'var(--status-danger-text)' : 'var(--text-tertiary)', marginTop: '4px' }}>
            {lowAttendanceCourses.length > 0 ? 'Immediate attendance required' : 'Eligible for all exams'}
          </div>
        </div>

        {/* Metric 3: Caution Courses */}
        <div className="fluent-card fluent-card-hover" style={{ padding: '18px' }} onClick={() => setActiveTab('attendance')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Caution Zone</span>
            <span style={{ color: 'var(--status-warning-text)' }}><Warning20Regular /></span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, marginTop: '8px', color: 'var(--text-primary)' }}>
            {cautionAttendanceCourses.length} <span style={{ fontSize: '14px', color: 'var(--text-tertiary)', fontWeight: 400 }}>courses (75-80%)</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
            Close to minimum threshold
          </div>
        </div>

        {/* Metric 4: Enrolled Courses */}
        <div className="fluent-card fluent-card-hover" style={{ padding: '18px' }} onClick={() => setActiveTab('timetable')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Enrolled Subjects</span>
            <span style={{ color: 'var(--brand-primary)' }}><CalendarLtr20Regular /></span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, marginTop: '8px', color: 'var(--text-primary)' }}>
            {attendanceList.length} <span style={{ fontSize: '14px', color: 'var(--text-tertiary)', fontWeight: 400 }}>active courses</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--brand-primary)', marginTop: '4px', fontWeight: 600, cursor: 'pointer' }}>
            View unified timetable →
          </div>
        </div>
      </div>

      {/* Two Column Layout: Schedule & Attendance Action List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        
        {/* Column 1: Today's Classes */}
        <div className="fluent-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Today's Schedule ({todayDayName})
              </h2>
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                {todaySlots.length} classes scheduled for today
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('timetable')}
              className="fluent-btn-subtle"
              style={{ fontSize: '12px', padding: '4px 8px' }}
            >
              Full Week <ChevronRight20Regular />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {todaySlots.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-tertiary)', fontSize: '13px' }}>
                No classes scheduled for today.
              </div>
            ) : (
              todaySlots.map(([time, slot]) => (
                <div
                  key={time}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--surface-secondary)',
                    border: '1px solid var(--stroke-subtle)',
                    transition: 'all var(--duration-fast) var(--ease-fluent)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        padding: '6px 8px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--brand-tint)',
                        color: 'var(--brand-primary)',
                        fontSize: '11px',
                        fontWeight: 700,
                        textAlign: 'center',
                        minWidth: '55px'
                      }}
                    >
                      {time.split('-')[0].trim()}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {slot.course || slot.name || slot.code}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Location20Regular style={{ fontSize: '14px' }} /> {slot.room || 'TBA'}
                        </span>
                        {slot.faculty && slot.faculty !== 'TBA' && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Person20Regular style={{ fontSize: '14px' }} /> {slot.faculty}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: slot.type === 'Practical' ? 'var(--status-info-bg)' : 'var(--surface-primary)',
                      color: slot.type === 'Practical' ? 'var(--status-info-text)' : 'var(--text-secondary)',
                      fontWeight: 600,
                      border: '1px solid var(--stroke-subtle)'
                    }}
                  >
                    {slot.type || 'Theory'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: Attendance Action List & Quick Bunk Calculator */}
        <div className="fluent-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Course Attendance Tracker
              </h2>
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                Click any course to simulate bunks & safety margins
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('attendance')}
              className="fluent-btn-subtle"
              style={{ fontSize: '12px', padding: '4px 8px' }}
            >
              All Subjects <ChevronRight20Regular />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {attendanceList.slice(0, 5).map((course) => (
              <div
                key={course.code}
                onClick={() => setSelectedCourseForBunk(course)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--surface-secondary)',
                  border: '1px solid var(--stroke-subtle)',
                  cursor: 'pointer',
                  transition: 'all var(--duration-fast) var(--ease-fluent)'
                }}
                className="fluent-card-hover"
              >
                <div style={{ flex: 1, paddingRight: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-tertiary)' }}>
                      {course.code}
                    </span>
                    {course.slot && (
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                        • Slot {course.slot}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '1px' }}>
                    {course.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {course.conducted - course.absent} attended of {course.conducted} classes ({course.absent} missed)
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <StatusBadge percent={course.percent} size="sm" />
                  <span style={{ color: 'var(--text-tertiary)', display: 'flex' }}>
                    <Calculator20Regular />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => setActiveTab('attendance')}
              className="fluent-btn-secondary"
              style={{ width: '100%', fontSize: '13px', padding: '8px' }}
            >
              Open Full Attendance & Bunk Margin Calculator
            </button>
          </div>
        </div>

      </div>

      {/* Bunk Calculator Modal */}
      {selectedCourseForBunk && (
        <BunkCalculatorModal
          course={selectedCourseForBunk}
          onClose={() => setSelectedCourseForBunk(null)}
        />
      )}
    </div>
  );
};
