import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { SegmentedControl } from '../common/SegmentedControl';
import { fetchPortalCaptcha, type CaptchaResponse } from '../../services/api';
import { MobileDebugModal } from '../common/MobileDebugModal';
import {
  Eye20Regular,
  EyeOff20Regular,
  ArrowClockwise20Regular,
  Sparkle20Regular,
  ShieldCheckmark20Regular,
  Info20Regular,
  Warning20Regular,
  Phone20Regular
} from '@fluentui/react-icons';

type LoginMode = 'portal' | 'academia' | 'demo';

export const LoginView: React.FC = () => {
  const { loginWithPortal, loginWithAcademia, loginDemo, isLoading, error, clearError } = useAuth();

  const [mode, setMode] = useState<LoginMode>('portal');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [captcha, setCaptcha] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [captchaInfo, setCaptchaInfo] = useState<CaptchaResponse | null>(null);
  const [captchaLoading, setCaptchaLoading] = useState<boolean>(false);
  const [showMobileDebug, setShowMobileDebug] = useState<boolean>(false);

  const loadCaptcha = async () => {
    setCaptchaLoading(true);
    try {
      const data = await fetchPortalCaptcha();
      setCaptchaInfo(data);
    } catch {
      // ignore
    } finally {
      setCaptchaLoading(false);
    }
  };

  useEffect(() => {
    if (mode === 'portal') {
      loadCaptcha();
    }
    clearError();
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'demo') {
      loginDemo();
      return;
    }

    if (!username.trim()) return;

    if (mode === 'portal') {
      await loginWithPortal(username.trim(), password || undefined, captcha.trim() || undefined, captchaInfo?.cdigest);
    } else {
      if (!password) return;
      await loginWithAcademia(username.trim(), password, captcha.trim() || undefined, captchaInfo?.cdigest);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        backgroundColor: 'var(--surface-canvas)'
      }}
    >
      {/* Container Card */}
      <div
        className="fluent-card"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '32px 28px',
          boxShadow: 'var(--shadow-16)'
        }}
      >
        {/* Header with edX / Microsoft Brand */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: 'var(--brand-primary)',
              color: '#FFFFFF',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '22px',
              marginBottom: '12px',
              boxShadow: 'var(--shadow-4)'
            }}
          >
            eX
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
            edX Academic Portal
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            High-performance, secure client for SRM student data
          </p>
          <div style={{ marginTop: '10px' }}>
            <button
              type="button"
              onClick={() => setShowMobileDebug(true)}
              className="fluent-btn-subtle"
              style={{ fontSize: '12px', padding: '4px 10px', borderRadius: 'var(--radius-pill)', border: '1px solid var(--stroke-default)' }}
            >
              <Phone20Regular style={{ color: 'var(--brand-primary)' }} />
              <span>Debug on Mobile / Scan QR</span>
            </button>
          </div>
        </div>

        {/* Mode Segmented Switcher */}
        <div style={{ marginBottom: '20px' }}>
          <SegmentedControl
            options={[
              { id: 'portal', label: 'Student Portal' },
              { id: 'academia', label: 'Academia' },
              { id: 'demo', label: 'Demo Student' }
            ]}
            value={mode}
            onChange={(val) => setMode(val as LoginMode)}
          />
        </div>

        {/* Error message banner */}
        {error && (
          <div
            style={{
              backgroundColor: 'var(--status-danger-bg)',
              color: 'var(--status-danger-text)',
              border: '1px solid var(--status-danger-border)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
              fontSize: '13px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px'
            }}
          >
            <span style={{ display: 'flex', marginTop: '1px' }}>
              <Warning20Regular />
            </span>
            <div style={{ flex: 1, lineHeight: 1.4 }}>{error}</div>
          </div>
        )}

        {/* Demo Mode Notice */}
        {mode === 'demo' ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div
              style={{
                backgroundColor: 'var(--brand-tint)',
                border: '1px solid var(--stroke-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px 16px',
                marginBottom: '20px',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--brand-primary)', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>
                <Sparkle20Regular /> Instant Demo Access
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Test drive the Microsoft Fluent 2 interface with a pre-configured student profile (B.Tech CSE Year 3, 8 enrolled courses, live attendance calculations, internal marks, 5-day timetable, and announcements).
              </p>
              <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-tertiary)' }}>
                • No SRM login credentials required<br />
                • Full offline & instant responsiveness<br />
                • Interactive bunk margin simulator
              </div>
            </div>

            <button
              type="button"
              onClick={loginDemo}
              disabled={isLoading}
              className="fluent-btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '15px' }}
            >
              {isLoading ? 'Loading Student Data...' : 'Launch Demo Workspace'}
            </button>
          </div>
        ) : (
          /* Real Form */
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Username / NetID */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
                {mode === 'portal' ? 'NetID or Register Number' : 'Academia Username / Reg No'}
              </label>
              <input
                type="text"
                placeholder={mode === 'portal' ? 'e.g. hs1234 or RA2111003010123' : 'e.g. RA2111003010123'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="fluent-input"
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {mode === 'portal' ? 'Student Portal Password' : 'Password'}
                </label>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="fluent-input"
                  style={{ paddingRight: '40px' }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-tertiary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPassword ? <EyeOff20Regular /> : <Eye20Regular />}
                </button>
              </div>
            </div>

            {/* Captcha section (if loaded) */}
            {captchaInfo?.image && mode === 'portal' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Security Captcha
                  </label>
                  <button
                    type="button"
                    onClick={loadCaptcha}
                    disabled={captchaLoading}
                    className="fluent-btn-subtle"
                    style={{ fontSize: '12px', padding: '2px 6px' }}
                  >
                    <ArrowClockwise20Regular /> Refresh
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div
                    style={{
                      height: '42px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--stroke-default)',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px 8px'
                    }}
                  >
                    <img
                      src={captchaInfo.image.startsWith('data:') ? captchaInfo.image : `data:image/png;base64,${captchaInfo.image}`}
                      alt="Captcha"
                      style={{ maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter characters (or leave empty for auto-OCR)"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    className="fluent-input"
                    style={{ flex: 1 }}
                  />
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Info20Regular /> Backend TinyOCR will automatically solve if left blank.
                </div>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading || !username.trim()}
              className="fluent-btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '15px', marginTop: '6px' }}
            >
              {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid #FFF', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  Authenticating...
                </span>
              ) : (
                'Sign In to edX'
              )}
            </button>
          </form>
        )}

        {/* Security / Privacy notice */}
        <div
          style={{
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid var(--stroke-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            fontSize: '12px',
            color: 'var(--text-tertiary)'
          }}
        >
          <ShieldCheckmark20Regular />
          <span>Local Session Storage • No server-side persistence</span>
        </div>
      </div>

      {showMobileDebug && (
        <MobileDebugModal onClose={() => setShowMobileDebug(false)} />
      )}
    </div>
  );
};
