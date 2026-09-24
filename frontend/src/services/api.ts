import { DEMO_SESSION, DEMO_ANNOUNCEMENTS, DEMO_PYQS } from './mockData';
import { AuthSession, Announcement } from '../types';

const API_BASE = (import.meta.env.VITE_API_URL as string) || ''; // Supports custom Vercel backend URL or relative proxy

export interface CaptchaResponse {
  session: string;
  cdigest: string;
  image: string;
  captcha_image?: string;
  text?: string;
}

export async function fetchPortalCaptcha(): Promise<CaptchaResponse> {
  try {
    const res = await fetch(`${API_BASE}/portal/captcha`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`Captcha fetch failed: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.warn('Backend portal/captcha error, fallback to offline demo mock if needed:', err);
    throw err;
  }
}

export async function loginStudentPortal(
  username: string,
  password?: string,
  captcha?: string,
  cdigest?: string
): Promise<AuthSession> {
  const payload = {
    username,
    password,
    captcha: captcha || undefined,
    cdigest: cdigest || undefined,
  };

  const res = await fetch(`${API_BASE}/portal/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.detail?.message || data?.detail || 'Portal login failed');
  }

  return {
    username,
    isPortal: true,
    cookies: data.cookies,
    profile: data.profile || {
      name: username,
      regNo: username,
      batch: 'N/A',
      semester: 'N/A',
      dept: 'N/A',
      section: 'N/A',
      mobile: 'N/A',
      program: 'N/A'
    },
    attendance: data.attendance || [],
    monthly: data.monthly || [],
    marks: data.marks || [],
    schedule: data.schedule || {},
    courses: data.courses || {},
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isDemo: false
  };
}

export async function loginAcademia(
  username: string,
  password: string,
  captcha?: string,
  cdigest?: string
): Promise<AuthSession> {
  const payload = {
    username,
    password,
    captcha: captcha || undefined,
    cdigest: cdigest || undefined,
  };

  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.detail?.message || data?.detail || 'Academia login failed');
  }

  return {
    username,
    isPortal: false,
    cookies: data.cookies,
    profile: data.profile || {
      name: username,
      regNo: username,
      batch: 'N/A',
      semester: 'N/A',
      dept: 'N/A',
      section: 'N/A',
      mobile: 'N/A',
      program: 'N/A'
    },
    attendance: data.attendance || [],
    marks: data.marks || [],
    schedule: data.schedule || {},
    courses: data.courses || {},
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isDemo: false
  };
}

export async function refreshPortalSession(
  username: string,
  password?: string,
  cookies?: Record<string, string>
): Promise<Partial<AuthSession>> {
  const res = await fetch(`${API_BASE}/portal/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, cookies }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.detail?.message || data?.detail || 'Session refresh failed');
  }

  return {
    attendance: data.attendance,
    monthly: data.monthly,
    marks: data.marks,
    cookies: data.cookies,
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}

export async function refreshAcademiaSession(
  username: string,
  password?: string,
  cookies?: Record<string, string>
): Promise<Partial<AuthSession>> {
  const res = await fetch(`${API_BASE}/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, cookies }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.detail?.message || data?.detail || 'Session refresh failed');
  }

  return {
    attendance: data.attendance,
    marks: data.marks,
    cookies: data.cookies,
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}

export async function fetchAnnouncements(): Promise<Announcement[]> {
  try {
    const res = await fetch(`${API_BASE}/api/announcements`);
    if (res.ok) {
      const data = await res.json();
      if (data?.history && Array.isArray(data.history) && data.history.length > 0) {
        return data.history;
      }
      if (data?.latest && data.latest.text) {
        return [data.latest];
      }
    }
  } catch (e) {
    console.log('Could not fetch remote announcements, falling back:', e);
  }
  return DEMO_ANNOUNCEMENTS;
}

export async function fetchPYQPapers(courseCode?: string, query?: string): Promise<any[]> {
  try {
    const params = new URLSearchParams();
    if (courseCode) {
      params.append('path', `/v1/courses/${courseCode}/papers`);
    } else if (query) {
      params.append('path', `/v1/search`);
      params.append('q', query);
    } else {
      params.append('path', `/v1/papers`);
    }
    const res = await fetch(`${API_BASE}/pyq-proxy?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
      if (data?.papers) return data.papers;
    }
  } catch (e) {
    console.log('PYQ proxy error, using demo set:', e);
  }
  
  if (courseCode) {
    return DEMO_PYQS.filter(p => p.courseCode.toLowerCase() === courseCode.toLowerCase());
  }
  if (query) {
    const q = query.toLowerCase();
    return DEMO_PYQS.filter(p => 
      p.courseCode.toLowerCase().includes(q) || 
      p.courseName.toLowerCase().includes(q) ||
      p.examType.toLowerCase().includes(q)
    );
  }
  return DEMO_PYQS;
}

export function getDemoSession(): AuthSession {
  return JSON.parse(JSON.stringify(DEMO_SESSION));
}
