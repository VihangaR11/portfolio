import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from 'lucide-react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
      document.documentElement.classList.toggle('light-theme', savedTheme === 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('light-theme', !newTheme);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-24 right-8 z-50 p-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300 group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <SunIcon className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300" />
        ) : (
          <MoonIcon className="w-5 h-5 text-violet-400 group-hover:text-violet-300" />
        )}
      </motion.div>
    </motion.button>
  );
}
