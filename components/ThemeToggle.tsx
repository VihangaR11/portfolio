import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('system');
  const [isDark, setIsDark] = useState(true);

  const applyTheme = (nextTheme: 'dark' | 'light' | 'system') => {
    if (nextTheme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('light-theme', !prefersDark);
      setIsDark(prefersDark);
    } else {
      document.documentElement.classList.toggle('light-theme', nextTheme === 'light');
      setIsDark(nextTheme === 'dark');
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const initial = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'system';
    setTheme(initial);
    applyTheme(initial);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    applyTheme(nextTheme);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-24 right-8 z-50 p-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 transition-all duration-300 group"
      whileHover={theme === 'system' ? {} : { scale: 1.05 }}
      whileTap={theme === 'system' ? {} : { scale: 0.95 }}
      aria-label="Toggle theme"
      aria-live="polite"
      aria-pressed={theme === 'dark'}
      role="switch"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <SunIcon className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300" />
        ) : (
          <MoonIcon className="w-5 h-5 text-amber-400 group-hover:text-amber-300" />
        )}
      </motion.div>
      <span className="sr-only">Current theme: {theme}</span>
    </motion.button>
  );
}
