import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { NavigationTab } from '../../types';
import {
  Home24Regular,
  Home24Filled,
  CheckmarkCircle24Regular,
  CheckmarkCircle24Filled,
  CalendarLtr24Regular,
  CalendarLtr24Filled,
  DocumentBulletList24Regular,
  DocumentBulletList24Filled,
  BookOpen24Regular,
  BookOpen24Filled,
  Megaphone24Regular,
  Megaphone24Filled,
  Person24Regular,
  Person24Filled
} from '@fluentui/react-icons';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  badge?: string | number;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, session } = useAuth();

  const criticalAttendanceCount = session?.attendance.filter((c) => c.percent < 75).length || 0;

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Overview',
      icon: <Home24Regular />,
      activeIcon: <Home24Filled />
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: <CheckmarkCircle24Regular />,
      activeIcon: <CheckmarkCircle24Filled />,
      badge: criticalAttendanceCount > 0 ? `${criticalAttendanceCount} low` : undefined
    },
    {
      id: 'timetable',
      label: 'Timetable',
      icon: <CalendarLtr24Regular />,
      activeIcon: <CalendarLtr24Filled />
    },
    {
      id: 'marks',
      label: 'Marks & Internal',
      icon: <DocumentBulletList24Regular />,
      activeIcon: <DocumentBulletList24Filled />
    },
    {
      id: 'pyq',
      label: 'PYQ Papers',
      icon: <BookOpen24Regular />,
      activeIcon: <BookOpen24Filled />
    },
    {
      id: 'announcements',
      label: 'Announcements',
      icon: <Megaphone24Regular />,
      activeIcon: <Megaphone24Filled />
    },
    {
      id: 'profile',
      label: 'Student Profile',
      icon: <Person24Regular />,
      activeIcon: <Person24Filled />
    }
  ];

  return (
    <aside
      className="hidden-mobile-sidebar"
      style={{
        width: '240px',
        backgroundColor: 'var(--surface-primary)',
        borderRight: '1px solid var(--stroke-subtle)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px 12px',
        flexShrink: 0
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ padding: '8px 12px', fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
          ACADEMICS
        </div>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive ? 'var(--brand-tint)' : 'transparent',
                color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all var(--duration-fast) var(--ease-fluent)'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ display: 'flex', color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)' }}>
                  {isActive ? item.activeIcon : item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'var(--status-danger-bg)',
                    color: 'var(--status-danger-text)',
                    border: '1px solid var(--status-danger-border)'
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* SRM Info Box */}
      <div
        style={{
          padding: '12px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--surface-secondary)',
          border: '1px solid var(--stroke-subtle)',
          fontSize: '12px'
        }}
      >
        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>SRM Academia Engine</div>
        <div style={{ color: 'var(--text-tertiary)', marginTop: '2px', lineHeight: 1.4 }}>
          FastAPI + Selectolax + TinyOCR auto-solver client.
        </div>
      </div>
    </aside>
  );
};
