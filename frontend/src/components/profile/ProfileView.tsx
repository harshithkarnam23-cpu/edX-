import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Person24Regular,
  SignOut20Regular,
  Building20Regular,
  Call20Regular,
  Calendar20Regular,
  HatGraduation20Regular,
  CheckmarkCircle20Regular,
  ShieldCheckmark20Regular
} from '@fluentui/react-icons';

export const ProfileView: React.FC = () => {
  const { session, logout } = useAuth();
  const [showConfirmLogout, setShowConfirmLogout] = useState<boolean>(false);

  if (!session) return null;

  const prof = session.profile;

  const infoRows = [
    { label: 'Register Number', value: prof.regNo, icon: <HatGraduation20Regular /> },
    { label: 'Degree & Program', value: prof.program, icon: <HatGraduation20Regular /> },
    { label: 'Department', value: prof.dept, icon: <Building20Regular /> },
    { label: 'Semester & Section', value: `${prof.semester} • ${prof.section}`, icon: <Calendar20Regular /> },
    { label: 'Academic Batch', value: prof.batch, icon: <Calendar20Regular /> },
    { label: 'Mobile Number', value: prof.mobile, icon: <Call20Regular /> },
    { label: 'Institution', value: prof.institution || 'SRM Institute of Science and Technology', icon: <Building20Regular /> }
  ];

  return (
    <div style={{ padding: '24px 20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header Profile Card */}
      <div
        className="fluent-card"
        style={{
          padding: '28px 24px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}
      >
        <div
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            backgroundColor: 'var(--brand-tint)',
            color: 'var(--brand-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '26px',
            fontWeight: 800,
            border: '2px solid var(--brand-primary)',
            boxShadow: 'var(--shadow-4)'
          }}
        >
          {prof.name ? prof.name.charAt(0).toUpperCase() : 'S'}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.3px' }}>
              {prof.name || session.username}
            </h1>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--status-success-bg)',
                color: 'var(--status-success-text)'
              }}
            >
              Active Student
            </span>
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            {prof.regNo}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
            {prof.program}
          </div>
        </div>
      </div>

      {/* Profile Details List */}
      <div className="fluent-card" style={{ padding: '20px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px' }}>
          Academic Profile Records
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {infoRows.map((row, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                paddingBottom: idx !== infoRows.length - 1 ? '12px' : 0,
                borderBottom: idx !== infoRows.length - 1 ? '1px solid var(--stroke-subtle)' : 'none',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--brand-primary)', display: 'flex' }}>{row.icon}</span>
                <span style={{ fontSize: '13px', fontWeight: 500 }}>{row.label}</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', textAlign: 'right' }}>
                {row.value || 'N/A'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System & Architecture Info */}
      <div className="fluent-card" style={{ padding: '20px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
          edX Client Engine Information
        </h2>
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <strong>Session Mode:</strong> {session.isDemo ? 'Offline Demonstration Sandbox' : session.isPortal ? 'SRM Student Portal Engine' : 'SRM Academia Engine'}<br />
          <strong>Parser Core:</strong> Selectolax C-Extension Fast HTML Parser<br />
          <strong>Auto-OCR:</strong> TinyOCR ONNX Engine Support<br />
          <strong>Data Security:</strong> Encrypted local persistence; zero server-side state retention.
        </div>
      </div>

      {/* Sign Out Button */}
      <div style={{ textAlign: 'center' }}>
        <button
          type="button"
          onClick={() => setShowConfirmLogout(true)}
          className="fluent-btn-secondary"
          style={{
            color: 'var(--status-danger-text)',
            borderColor: 'var(--status-danger-border)',
            padding: '10px 24px',
            fontSize: '14px'
          }}
        >
          <SignOut20Regular /> Sign Out of Account
        </button>
      </div>

      {/* Logout confirmation modal */}
      {showConfirmLogout && (
        <div className="fluent-modal-overlay" onClick={() => setShowConfirmLogout(false)}>
          <div className="fluent-modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '24px', maxWidth: '400px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Sign out of edX?
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.5 }}>
              Your local encrypted session and cached timetable will be cleared from this browser.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button
                type="button"
                onClick={() => setShowConfirmLogout(false)}
                className="fluent-btn-secondary"
                style={{ fontSize: '13px' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmLogout(false);
                  logout();
                }}
                className="fluent-btn-primary"
                style={{ backgroundColor: 'var(--status-danger-text)', fontSize: '13px' }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
