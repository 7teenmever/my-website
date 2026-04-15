import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    try {
      const saved = localStorage.getItem('theme');
      if (saved && ['dark', 'light'].includes(saved)) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'dark';
    }
  });

  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    try {
      const saved = localStorage.getItem('lang');
      if (saved && ['en', 'ru'].includes(saved)) return saved;
      const browserLang = navigator.language?.toLowerCase().startsWith('ru') ? 'ru' : 'en';
      return browserLang;
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.error('Failed to save theme:', e);
    }
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang);
    } catch (e) {
      console.error('Failed to save language:', e);
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleLanguage = () => setLang(prev => prev === 'en' ? 'ru' : 'en');

  return (
    <ThemeContext.Provider value={{ theme, lang, toggleTheme, toggleLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
