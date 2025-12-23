
import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { motion } from 'framer-motion';
import { Project } from '../types';

interface ProjectsProps {
  onViewRoadmap: (project: Project) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onViewRoadmap }) => {
  const [filter, setFilter] = useState<'All' | 'Course' | 'Project'>('All');

  const filteredProjects = PROJECTS.filter(p => {
    if (filter === 'All') return true;
    if (filter === 'Course') return p.id.startsWith('course-');
    if (filter === 'Project') return !p.id.startsWith('course-');
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <header className="mb-16">
        <h1 className="text-5xl font-bold text-slate-900 mb-6 tracking-tight">Tác phẩm & Khóa học</h1>
        <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
          Nơi trưng bày các lộ trình học tập chuyên sâu (Java & JavaScript) cùng các dự án thực tế tôi đã triển khai.
        </p>
      </header>

      {/* Filter Tabs */}
      <div className="flex gap-4 mb-12 border-b border-slate-200 pb-1">
        {[
          { id: 'All', label: 'Tất cả' },
          { id: 'Course', label: 'Khóa học chuyên sâu' },
          { id: 'Project', label: 'Dự án thực tế' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-6 py-3 text-sm font-bold transition-all relative ${
              filter === tab.id ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
            {filter === tab.id && (
              <motion.div 
                layoutId="project-tab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full"
              />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {filteredProjects.map((project) => (
          <motion.div 
            layout
            key={project.id} 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group flex flex-col"
          >
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden mb-6 border border-slate-200 shadow-xl group-hover:shadow-2xl transition-all duration-500">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-10">
                <button 
                  onClick={() => onViewRoadmap(project)}
                  className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all shadow-xl"
                >
                  {project.id.startsWith('course-') ? 'Xem lộ trình học' : 'Xem dự án'}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
              </div>
              {project.id.startsWith('course-') && (
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg">
                  Chuyên đề đào tạo
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map(t => (
                <span key={t} className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-lg">
                  {t}
                </span>
              ))}
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-tight">
              {project.title}
            </h3>
            
            <p className="text-slate-600 leading-relaxed mb-6 font-medium">
              {project.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
