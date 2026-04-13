'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeMode = 'light' | 'dark' | 'system';

type DarkModeContextType = {
  isDarkMode: boolean;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleDarkMode: () => void;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

const THEME_MODE_KEY = 'themeMode';
const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';

function resolveIsDarkMode(mode: ThemeMode): boolean {
  if (mode === 'dark') return true;
  if (mode === 'light') return false;
  if (typeof window === 'undefined') return false;
  return window.matchMedia(DARK_MEDIA_QUERY).matches;
}

function applyDarkClass(isDarkMode: boolean): void {
  document.documentElement.classList.toggle('dark', isDarkMode);
}

export default function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem(THEME_MODE_KEY);
    if (storedMode === 'light' || storedMode === 'dark' || storedMode === 'system') {
      setThemeMode(storedMode);
      return;
    }

    // 旧実装（boolean保存）からの移行
    const legacyDarkMode = localStorage.getItem('darkMode');
    if (legacyDarkMode === 'true' || legacyDarkMode === 'false') {
      setThemeMode(legacyDarkMode === 'true' ? 'dark' : 'light');
      return;
    }

    setThemeMode('system');
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DARK_MEDIA_QUERY);

    const sync = () => {
      const nextIsDarkMode = resolveIsDarkMode(themeMode);
      setIsDarkMode(nextIsDarkMode);
      applyDarkClass(nextIsDarkMode);
    };

    sync();
    localStorage.setItem(THEME_MODE_KEY, themeMode);

    const onSystemThemeChange = () => {
      if (themeMode === 'system') {
        sync();
      }
    };

    mediaQuery.addEventListener('change', onSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener('change', onSystemThemeChange);
    };
  }, [themeMode]);

  const toggleDarkMode = () => {
    setThemeMode(prev => (resolveIsDarkMode(prev) ? 'light' : 'dark'));
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, themeMode, setThemeMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
}
