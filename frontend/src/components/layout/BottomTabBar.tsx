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
  Person24Regular,
  Person24Filled
} from '@fluentui/react-icons';

export const BottomTabBar: React.FC = () => {
  const { activeTab, setActiveTab } = useAuth();

  const tabs = [
    { id: 'dashboard' as NavigationTab, label: 'Overview', icon: <Home24Regular />, activeIcon: <Home24Filled /> },
    { id: 'attendance' as NavigationTab, label: 'Attendance', icon: <CheckmarkCircle24Regular />, activeIcon: <CheckmarkCircle24Filled /> },
    { id: 'timetable' as NavigationTab, label: 'Schedule', icon: <CalendarLtr24Regular />, activeIcon: <CalendarLtr24Filled /> },
    { id: 'marks' as NavigationTab, label: 'Marks', icon: <DocumentBulletList24Regular />, activeIcon: <DocumentBulletList24Filled /> },
    { id: 'profile' as NavigationTab, label: 'Profile', icon: <Person24Regular />, activeIcon: <Person24Filled /> }
  ];

  return (
    <nav
      className="mobile-bottom-nav"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: 'var(--surface-primary)',
        borderTop: '1px solid var(--stroke-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 50,
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.04)'
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              border: 'none',
              background: 'transparent',
              color: isActive ? 'var(--brand-primary)' : 'var(--text-tertiary)',
              cursor: 'pointer',
              padding: '6px 0',
              transition: 'color var(--duration-fast) var(--ease-fluent)'
            }}
          >
            <span style={{ display: 'flex', transform: isActive ? 'scale(1.06)' : 'scale(1)', transition: 'transform var(--duration-fast) var(--ease-fluent)' }}>
              {isActive ? tab.activeIcon : tab.icon}
            </span>
            <span style={{ fontSize: '11px', fontWeight: isActive ? 600 : 500 }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
