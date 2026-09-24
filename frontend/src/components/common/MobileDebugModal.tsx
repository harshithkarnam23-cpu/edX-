import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import eruda from 'eruda';
import {
  Phone20Regular,
  QrCode20Regular,
  Dismiss20Regular,
  Checkmark20Regular,
  Copy20Regular,
  Wrench20Regular,
  DeveloperBoard20Regular
} from '@fluentui/react-icons';

interface MobileDebugModalProps {
  onClose: () => void;
}

export const MobileDebugModal: React.FC<MobileDebugModalProps> = ({ onClose }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [erudaActive, setErudaActive] = useState<boolean>(false);

  // Preferred network URL for local wifi mobile testing
  const mobileUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://10.3.28.250:3000'
    : window.location.origin;

  useEffect(() => {
    QRCode.toDataURL(mobileUrl, {
      width: 200,
      margin: 2,
      color: {
        dark: '#0078D4',
        light: '#FFFFFF'
      }
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('Failed to generate QR code', err));

    // Check if eruda is already in DOM
    const existing = document.getElementById('eruda');
    if (existing) {
      setErudaActive(true);
    }
  }, [mobileUrl]);

  const copyUrl = () => {
    navigator.clipboard.writeText(mobileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleEruda = () => {
    if (!erudaActive) {
      const el = document.createElement('div');
      el.id = 'eruda-container';
      document.body.appendChild(el);
      eruda.init({
        container: el,
        tool: ['console', 'elements', 'network', 'resources', 'info', 'snippets']
      });
      eruda.show();
      setErudaActive(true);
    } else {
      eruda.destroy();
      const el = document.getElementById('eruda-container');
      if (el) el.remove();
      setErudaActive(false);
    }
  };

  return (
    <div className="fluent-modal-overlay" onClick={onClose}>
      <div
        className="fluent-modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '520px', padding: '24px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--brand-primary)', display: 'flex' }}>
              <Phone20Regular style={{ fontSize: '22px' }} />
            </span>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Mobile Debugging & Cross-Platform
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="fluent-btn-subtle"
            style={{ padding: '4px' }}
          >
            <Dismiss20Regular />
          </button>
        </div>

        {/* Tab 1: QR Code & Direct Mobile Wi-Fi URL */}
        <div
          style={{
            backgroundColor: 'var(--surface-secondary)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            border: '1px solid var(--stroke-subtle)',
            marginBottom: '16px',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            📲 1. Scan with Phone Camera (Instant Wi-Fi Mode)
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Ensure your phone and this computer are connected to the same Wi-Fi network.
          </p>

          {qrDataUrl && (
            <div
              style={{
                display: 'inline-block',
                padding: '8px',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-4)'
              }}
            >
              <img src={qrDataUrl} alt="Mobile QR Code" style={{ width: '160px', height: '160px', display: 'block' }} />
            </div>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '12px'
            }}
          >
            <code
              style={{
                fontSize: '13px',
                fontWeight: 600,
                backgroundColor: 'var(--surface-primary)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--stroke-default)',
                color: 'var(--brand-primary)'
              }}
            >
              {mobileUrl}
            </code>
            <button
              type="button"
              onClick={copyUrl}
              className="fluent-btn-secondary"
              style={{ padding: '6px 10px', fontSize: '12px' }}
            >
              {copied ? <Checkmark20Regular style={{ color: 'var(--status-success-text)' }} /> : <Copy20Regular />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Tab 2: In-App Mobile Console (Eruda DevTools) */}
        <div
          style={{
            backgroundColor: 'var(--surface-secondary)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            border: '1px solid var(--stroke-subtle)',
            marginBottom: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                🛠️ On-Screen Mobile DevTools (Eruda)
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Floating console button on your phone screen to inspect network, DOM & logs.
              </div>
            </div>
            <button
              type="button"
              onClick={toggleEruda}
              className={`fluent-btn-${erudaActive ? 'secondary' : 'primary'}`}
              style={{ fontSize: '12px', padding: '6px 12px' }}
            >
              {erudaActive ? 'Disable DevTools' : 'Enable DevTools'}
            </button>
          </div>
        </div>

        {/* Tab 3: Remote USB Debugging Guide */}
        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
            ⚡ Remote Desktop Inspector:
          </div>
          <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <li>
              <strong>Android (Chrome):</strong> Plug in phone via USB, enable USB Debugging, open <code>chrome://inspect/#devices</code> on your computer to view the live mobile console.
            </li>
            <li>
              <strong>iOS (Safari):</strong> Plug in iPhone, open Settings &gt; Safari &gt; Advanced &gt; Web Inspector, then open Safari on desktop &gt; Develop &gt; [iPhone] to inspect.
            </li>
            <li>
              <strong>Capacitor Native Mobile App:</strong> Run <code>npx cap add android</code> or <code>npx cap add ios</code> to bundle into a native APK/IPA.
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button type="button" onClick={onClose} className="fluent-btn-primary" style={{ fontSize: '13px' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
