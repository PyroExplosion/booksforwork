'use client'
import { motion, useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();

  // Handle navbar visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsNavVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        translateY: isNavVisible ? 0 : -100
      }}
      transition={{ duration: 0.3 }}
      className="fixed w-full p-6 backdrop-blur-sm bg-white/70 dark:bg-black/70 z-50"
    >
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">3D Workbench</h1>
        <div className="space-x-6">
          <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
          <a href="/trending" className="hover:text-blue-600 transition-colors">Trending</a>
          <a href="/recent" className="hover:text-blue-600 transition-colors">Recent</a>
        </div>
      </nav>
    </motion.header>
  );
}
