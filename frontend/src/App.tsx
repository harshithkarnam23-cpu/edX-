import React, { useEffect } from 'react';
import { FluentProvider, webLightTheme, webDarkTheme } from '@fluentui/react-components';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { BottomTabBar } from './components/layout/BottomTabBar';
import { LoginView } from './components/auth/LoginView';
import { DashboardView } from './components/dashboard/DashboardView';
import { AttendanceView } from './components/attendance/AttendanceView';
import { TimetableView } from './components/timetable/TimetableView';
import { MarksView } from './components/marks/MarksView';
import { PYQPapersView } from './components/pyq/PYQPapersView';
import { AnnouncementsView } from './components/announcements/AnnouncementsView';
import { ProfileView } from './components/profile/ProfileView';

const AppContent: React.FC = () => {
  const { session, activeTab, themeMode } = useAuth();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  if (!session) {
    return <LoginView />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'attendance':
        return <AttendanceView />;
      case 'timetable':
        return <TimetableView />;
      case 'marks':
        return <MarksView />;
      case 'pyq':
        return <PYQPapersView />;
      case 'announcements':
        return <AnnouncementsView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="app-container">
      {/* Desktop Microsoft Fluent 2 Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-content">
        <Navbar />
        <main style={{ flex: 1 }}>
          {renderActiveTab()}
        </main>
      </div>

      {/* Mobile iOS Fluent 2 Bottom Tab Bar */}
      <BottomTabBar />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppWithTheme />
    </AuthProvider>
  );
};

const AppWithTheme: React.FC = () => {
  const { themeMode } = useAuth();
  const theme = themeMode === 'dark' ? webDarkTheme : webLightTheme;

  return (
    <FluentProvider theme={theme} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppContent />
    </FluentProvider>
  );
};

export default App;
