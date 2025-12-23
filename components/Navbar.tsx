
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPath }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { label: 'Trang chủ', path: 'home' },
    { label: 'Bài viết', path: 'blog' },
    { label: 'Dự án', path: 'projects' },
    { label: 'Giới thiệu', path: 'about' },
    { label: 'Trợ lý AI', path: 'ai-assistant' },
  ];

  const handleNavigate = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-2xl font-black cursor-pointer flex items-center gap-3 group"
          onClick={() => handleNavigate('home')}
        >
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white text-xl font-bold transition-all group-hover:bg-indigo-600 group-hover:rotate-6">
            N
          </div>
          <span className="tracking-tighter uppercase">
            NOVA<span className="text-indigo-600">.</span>
          </span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1.5 rounded-2xl">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`relative px-6 py-2.5 text-sm font-bold transition-all rounded-xl ${
                currentPath === item.path 
                  ? 'text-indigo-600' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              {currentPath === item.path && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-white shadow-sm rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:block bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-slate-200 transition-all"
          >
            Liên hệ
          </motion.button>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 bg-slate-100 rounded-xl text-slate-900 active:bg-slate-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={`w-full text-left px-6 py-3 rounded-xl font-bold transition-all ${
                    currentPath === item.path 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button className="w-full text-left px-6 py-3 rounded-xl font-bold bg-slate-900 text-white">
                Liên hệ
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
