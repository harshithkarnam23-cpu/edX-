import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthSession, NavigationTab, ThemeMode } from '../types';
import { 
  loginStudentPortal, 
  loginAcademia, 
  refreshPortalSession, 
  refreshAcademiaSession,
  getDemoSession 
} from '../services/api';

interface AuthContextType {
  session: AuthSession | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  activeTab: NavigationTab;
  themeMode: ThemeMode;
  setActiveTab: (tab: NavigationTab) => void;
  setThemeMode: (theme: ThemeMode) => void;
  loginWithPortal: (username: string, password?: string, captcha?: string, cdigest?: string) => Promise<void>;
  loginWithAcademia: (username: string, password: string, captcha?: string, cdigest?: string) => Promise<void>;
  loginDemo: () => void;
  refreshData: () => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'edx_fluent2_session';
const THEME_KEY = 'edx_fluent2_theme';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AuthSession | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY) as ThemeMode;
      return savedTheme || 'light';
    } catch {
      return 'light';
    }
  });

  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Sync session to localStorage
  useEffect(() => {
    try {
      if (session) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Failed to store session:', e);
    }
  }, [session]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    try {
      localStorage.setItem(THEME_KEY, mode);
    } catch {
      // ignore
    }
  };

  const loginWithPortal = async (
    username: string,
    password?: string,
    captcha?: string,
    cdigest?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const newSession = await loginStudentPortal(username, password, captcha, cdigest);
      setSession(newSession);
      setActiveTab('dashboard');
    } catch (err: any) {
      const msg = err.message || 'Login failed. Please verify credentials or captcha.';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithAcademia = async (
    username: string,
    password: string,
    captcha?: string,
    cdigest?: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const newSession = await loginAcademia(username, password, captcha, cdigest);
      setSession(newSession);
      setActiveTab('dashboard');
    } catch (err: any) {
      const msg = err.message || 'Academia login failed.';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loginDemo = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      const demo = getDemoSession();
      setSession(demo);
      setActiveTab('dashboard');
      setIsLoading(false);
    }, 300);
  };

  const refreshData = async () => {
    if (!session) return;
    setIsRefreshing(true);
    setError(null);
    try {
      if (session.isDemo) {
        await new Promise((res) => setTimeout(res, 600));
        setSession({
          ...session,
          lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      } else if (session.isPortal) {
        const updated = await refreshPortalSession(session.username, undefined, session.cookies);
        setSession((prev) => (prev ? { ...prev, ...updated } : null));
      } else {
        const updated = await refreshAcademiaSession(session.username, undefined, session.cookies);
        setSession((prev) => (prev ? { ...prev, ...updated } : null));
      }
    } catch (err: any) {
      setError(err.message || 'Could not refresh academic data.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const logout = () => {
    setSession(null);
    setActiveTab('dashboard');
    setError(null);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        isRefreshing,
        error,
        activeTab,
        themeMode,
        setActiveTab,
        setThemeMode,
        loginWithPortal,
        loginWithAcademia,
        loginDemo,
        refreshData,
        logout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
