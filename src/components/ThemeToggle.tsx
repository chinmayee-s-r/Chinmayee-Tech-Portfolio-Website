import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    
    // Save theme preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-12 h-6 bg-gray-800 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-green-400"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-4 h-4 bg-green-400 rounded-full"
        animate={{ x: isDark ? 0 : 24 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      
      {/* Icons */}
      <motion.div
        className="absolute top-1/2 left-1 transform -translate-y-1/2 text-xs"
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        🌙
      </motion.div>
      
      <motion.div
        className="absolute top-1/2 right-1 transform -translate-y-1/2 text-xs"
        animate={{ opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        ☀️
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
