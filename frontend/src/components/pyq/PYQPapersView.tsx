import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchPYQPapers } from '../../services/api';
import {
  Search20Regular,
  DocumentPdf20Regular,
  ArrowDownload20Regular,
  Filter20Regular,
  BookOpen20Regular,
  Open20Regular
} from '@fluentui/react-icons';

export const PYQPapersView: React.FC = () => {
  const { session } = useAuth();
  const [papers, setPapers] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(false);

  const enrolledCourses = session?.attendance || [];

  const loadPapers = async () => {
    setLoading(true);
    try {
      const course = selectedCourseFilter !== 'all' ? selectedCourseFilter : undefined;
      const data = await fetchPYQPapers(course, search || undefined);
      setPapers(data || []);
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPapers();
  }, [selectedCourseFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadPapers();
  };

  return (
    <div style={{ padding: '24px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
          Previous Year Questions (PYQs)
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Official SRM examination archives, question paper banks, and cycle test papers
        </p>
      </div>

      {/* Search & Course Quick Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <span
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-tertiary)',
                display: 'flex'
              }}
            >
              <Search20Regular />
            </span>
            <input
              type="text"
              placeholder="Search by subject code, title, or exam type (e.g. 21CSE201J, CT1)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="fluent-input"
              style={{ paddingLeft: '40px' }}
            />
          </div>
          <button type="submit" className="fluent-btn-primary" style={{ padding: '0 20px' }}>
            Search
          </button>
        </form>

        {/* Quick chip filters for enrolled courses */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)' }}>
            Quick Filter:
          </span>
          <button
            type="button"
            onClick={() => setSelectedCourseFilter('all')}
            className={`fluent-btn-${selectedCourseFilter === 'all' ? 'primary' : 'secondary'}`}
            style={{ padding: '4px 10px', fontSize: '12px', borderRadius: 'var(--radius-pill)' }}
          >
            All Papers
          </button>
          {enrolledCourses.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => setSelectedCourseFilter(c.code)}
              className={`fluent-btn-${selectedCourseFilter === c.code ? 'primary' : 'secondary'}`}
              style={{ padding: '4px 10px', fontSize: '12px', borderRadius: 'var(--radius-pill)' }}
            >
              {c.code}
            </button>
          ))}
        </div>
      </div>

      {/* Papers Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '48px', color: 'var(--text-secondary)' }}>
          Loading question papers...
        </div>
      ) : papers.length === 0 ? (
        <div
          className="fluent-card"
          style={{
            padding: '48px 20px',
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}
        >
          <BookOpen20Regular style={{ fontSize: '32px', marginBottom: '8px' }} />
          <div style={{ fontSize: '16px', fontWeight: 600 }}>No question papers found</div>
          <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
            Try searching with a broader keyword or select a different subject filter.
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {papers.map((p, idx) => (
            <div
              key={idx}
              className="fluent-card fluent-card-hover"
              style={{
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--brand-tint)',
                      color: 'var(--brand-primary)'
                    }}
                  >
                    {p.courseCode || p.code || 'COURSE'}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-pill)',
                      backgroundColor: 'var(--surface-secondary)',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {p.year || '2023-24'}
                  </span>
                </div>

                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '10px' }}>
                  {p.courseName || p.title || p.courseCode}
                </h3>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {p.examType || 'Examination Paper'} {p.slot && `• Slot ${p.slot}`}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <a
                  href={p.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fluent-btn-primary"
                  style={{ flex: 1, textDecoration: 'none', fontSize: '13px', padding: '6px 12px' }}
                >
                  <Open20Regular /> View Paper
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
