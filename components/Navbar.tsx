
import React from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPath }) => {
  const navItems = [
    { label: 'Trang chủ', path: 'home' },
    { label: 'Bài viết', path: 'blog' },
    { label: 'Dự án', path: 'projects' },
    { label: 'Giới thiệu', path: 'about' },
    { label: 'Trợ lý AI', path: 'ai-assistant' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-2xl font-black cursor-pointer flex items-center gap-3 group"
          onClick={() => onNavigate('home')}
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
          
          <button className="md:hidden p-3 bg-slate-100 rounded-xl text-slate-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
