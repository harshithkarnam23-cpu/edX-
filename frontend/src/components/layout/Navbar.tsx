import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MobileDebugModal } from '../common/MobileDebugModal';
import { 
  ArrowClockwise20Regular, 
  WeatherSunny20Regular, 
  WeatherMoon20Regular, 
  SignOut20Regular,
  Phone20Regular
} from '@fluentui/react-icons';

export const Navbar: React.FC = () => {
  const { session, refreshData, isRefreshing, themeMode, setThemeMode, logout } = useAuth();
  const [showMobileDebug, setShowMobileDebug] = useState<boolean>(false);

  const toggleTheme = () => {
    const next = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <header
      style={{
        height: '60px',
        backgroundColor: 'var(--surface-primary)',
        borderBottom: '1px solid var(--stroke-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: 'var(--shadow-2)'
      }}
    >
      {/* Brand & Context */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div 
          style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '8px', 
            backgroundColor: 'var(--brand-primary)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '16px',
            letterSpacing: '-0.5px'
          }}
        >
          eX
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '-0.3px', color: 'var(--text-primary)' }}>
              edX Portal
            </span>
            {session?.isDemo && (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'var(--brand-tint)',
                  color: 'var(--brand-primary)',
                  border: '1px solid var(--stroke-default)'
                }}
              >
                Demo Student
              </span>
            )}
            {session?.isPortal && !session?.isDemo && (
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: 'var(--status-success-bg)',
                  color: 'var(--status-success-text)'
                }}
              >
                Student Portal
              </span>
            )}
          </div>
          {session?.lastUpdated && (
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
              Updated at {session.lastUpdated}
            </div>
          )}
        </div>
      </div>

      {/* Right Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Mobile Debug Button */}
        <button
          type="button"
          onClick={() => setShowMobileDebug(true)}
          className="fluent-btn-secondary"
          title="Open Mobile Debugging QR & DevTools"
          style={{ padding: '6px 12px', fontSize: '13px' }}
        >
          <Phone20Regular />
          <span className="hidden-mobile">Mobile Debug</span>
        </button>

        {/* Refresh button */}
        <button
          type="button"
          onClick={refreshData}
          disabled={isRefreshing}
          className="fluent-btn-subtle"
          title="Refresh academic data from backend"
          style={{ padding: '6px 10px', fontSize: '13px' }}
        >
          <span style={{ display: 'inline-flex', transform: isRefreshing ? 'rotate(360deg)' : undefined, transition: isRefreshing ? 'transform 1s linear infinite' : undefined }}>
            <ArrowClockwise20Regular />
          </span>
          <span className="hidden-mobile" style={{ marginLeft: '4px' }}>
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </span>
        </button>

        {/* Theme mode toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="fluent-btn-subtle"
          title={`Switch to ${themeMode === 'light' ? 'Dark' : 'Light'} theme`}
          style={{ padding: '6px 10px' }}
        >
          {themeMode === 'light' ? <WeatherMoon20Regular /> : <WeatherSunny20Regular />}
        </button>

        {/* Student Avatar / Info */}
        {session && (
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '4px 10px', 
              borderRadius: 'var(--radius-md)', 
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--stroke-subtle)'
            }}
          >
            <div 
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                backgroundColor: 'var(--brand-tint)',
                color: 'var(--brand-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700
              }}
            >
              {session.profile?.name ? session.profile.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
              <div style={{ fontSize: '12px', fontWeight: 600, maxWidth: '120px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {session.profile?.name || session.username}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>
                {session.profile?.regNo || session.username}
              </div>
            </div>
          </div>
        )}

        {/* Logout */}
        {session && (
          <button
            type="button"
            onClick={logout}
            className="fluent-btn-subtle"
            title="Sign out of edX"
            style={{ color: 'var(--status-danger-text)', padding: '6px 8px' }}
          >
            <SignOut20Regular />
          </button>
        )}
      </div>

      {/* Mobile Debug Modal */}
      {showMobileDebug && (
        <MobileDebugModal onClose={() => setShowMobileDebug(false)} />
      )}
    </header>
  );
};
