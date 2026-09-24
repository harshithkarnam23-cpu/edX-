import React, { useState, useEffect } from 'react';
import { fetchAnnouncements } from '../../services/api';
import { Announcement } from '../../types';
import {
  Megaphone20Regular,
  DocumentArrowDown20Regular,
  Calendar20Regular,
  ArrowClockwise20Regular
} from '@fluentui/react-icons';

export const AnnouncementsView: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchAnnouncements();
      setAnnouncements(data || []);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ padding: '24px 20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
            Campus Announcements
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Official notices, exam schedules, and circulars
          </p>
        </div>
        <button
          type="button"
          onClick={loadData}
          disabled={loading}
          className="fluent-btn-subtle"
          style={{ fontSize: '13px' }}
        >
          <ArrowClockwise20Regular /> Refresh
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-secondary)' }}>
          Fetching university bulletins...
        </div>
      ) : announcements.length === 0 ? (
        <div
          className="fluent-card"
          style={{
            padding: '48px 20px',
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}
        >
          <Megaphone20Regular style={{ fontSize: '32px', marginBottom: '8px' }} />
          <div style={{ fontSize: '16px', fontWeight: 600 }}>No announcements at this time</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {announcements.map((ann, idx) => (
            <div key={ann.id || idx} className="fluent-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--brand-tint)',
                    color: 'var(--brand-primary)'
                  }}
                >
                  <Megaphone20Regular />
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar20Regular style={{ fontSize: '13px' }} />
                  {ann.created_at ? new Date(ann.created_at).toLocaleString() : 'Recent Circular'}
                </span>
              </div>

              <div style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {ann.text}
              </div>

              {ann.image_url && (
                <div style={{ marginTop: '14px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <img
                    src={ann.image_url}
                    alt="Notice attachment"
                    style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
                  />
                </div>
              )}

              {ann.files && ann.files.length > 0 && (
                <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--stroke-subtle)', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {ann.files.map((file, fileIdx) => (
                    <a
                      key={fileIdx}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fluent-btn-secondary"
                      style={{ fontSize: '12px', padding: '6px 12px', textDecoration: 'none' }}
                    >
                      <DocumentArrowDown20Regular /> {file.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
