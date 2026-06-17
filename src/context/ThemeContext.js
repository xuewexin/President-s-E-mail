import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ThemeContext = createContext(null);

const THEMES = ['light', 'dark', 'glass'];

function getStoredTheme() {
  const stored = localStorage.getItem('mailbox_theme');
  if (stored && THEMES.includes(stored)) return stored;
  return 'light';
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(getStoredTheme);

  useEffect(() => {
    localStorage.setItem('mailbox_theme', mode);
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode((prev) => {
      const idx = THEMES.indexOf(prev);
      return THEMES[(idx + 1) % THEMES.length];
    });
  }, []);

  const labelMap = { light: '☀ 亮色', dark: '🌙 暗黑', glass: '💎 玻璃' };
  const nextLabelMap = {
    light: '暗黑',
    dark: '玻璃',
    glass: '亮色',
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleTheme, labelMap, nextLabelMap }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}