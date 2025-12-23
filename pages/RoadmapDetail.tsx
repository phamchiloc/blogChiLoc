
import React, { useEffect, useState } from 'react';
import { Project, CurriculumItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface RoadmapDetailProps {
  course: Project;
  onBack: () => void;
}

const RoadmapDetail: React.FC<RoadmapDetailProps> = ({ course, onBack }) => {
  const [activeLessonId, setActiveLessonId] = useState<number | null>(1); // Mặc định mở bài 1

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleLesson = (id: number) => {
    setActiveLessonId(activeLessonId === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-10 transition-colors group font-bold"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Quay lại danh sách
      </button>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Info */}
        <div className="lg:w-1/3">
          <div className="lg:sticky lg:top-32 space-y-8">
            <div className="rounded-[40px] overflow-hidden shadow-2xl aspect-square border-4 border-white">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 mb-4 leading-tight">{course.title}</h1>
              <p className="text-slate-600 mb-6 leading-relaxed font-medium">{course.description}</p>
              <div className="flex flex-wrap gap-2">
                {course.tech.map(t => (
                  <span key={t} className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="p-8 bg-slate-900 rounded-[32px] text-white">
              <h4 className="text-sm font-black uppercase tracking-widest text-indigo-400 mb-4">Thông số lộ trình</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Số lượng bài học</span>
                  <span className="font-bold">40 Bài giảng</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Cấp độ</span>
                  <span className="font-bold">{course.id.includes('basic') ? 'Cơ bản' : 'Nâng cao'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Thời lượng ước tính</span>
                  <span className="font-bold">~60 giờ học</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons List with Content */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-4">
            <span className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl italic shadow-lg shadow-indigo-100">40</span>
            Giáo trình chi tiết
          </h2>

          <div className="space-y-4">
            {course.curriculum?.map((item, idx) => (
              <div 
                key={item.id}
                className={`rounded-3xl border transition-all duration-300 ${
                  activeLessonId === item.id 
                    ? 'border-indigo-200 bg-white shadow-xl shadow-indigo-50' 
                    : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'
                }`}
              >
                <button 
                  onClick={() => toggleLesson(item.id)}
                  className="w-full p-6 text-left flex gap-6 items-center group"
                >
                  <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center font-black transition-colors ${
                    activeLessonId === item.id 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                  }`}>
                    {item.id}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold transition-colors ${
                      activeLessonId === item.id ? 'text-indigo-600 text-lg' : 'text-slate-700'
                    }`}>
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 line-clamp-1">{item.description}</p>
                  </div>
                  <div className={`transition-transform duration-300 ${activeLessonId === item.id ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <AnimatePresence>
                  {activeLessonId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-8 pt-2 border-t border-slate-50">
                        <div className="bg-slate-50 rounded-2xl p-8">
                          <div className="flex items-center gap-2 mb-6">
                            <span className="w-6 h-1 bg-indigo-600 rounded-full"></span>
                            <h4 className="font-black text-xs uppercase tracking-widest text-indigo-600">Nội dung bài giảng</h4>
                          </div>
                          <div className="prose prose-sm prose-indigo max-w-none text-slate-600 leading-relaxed space-y-4">
                            {item.content.split('\n\n').map((para, i) => (
                              <p key={i} className="whitespace-pre-line">
                                {para.startsWith('###') ? (
                                  <span className="text-lg font-bold text-slate-900 block mt-4">{para.replace('###', '')}</span>
                                ) : para.startsWith('**') ? (
                                  <span className="font-bold text-slate-800 block mt-2 underline decoration-indigo-200 decoration-4">{para.replace(/\*\*/g, '')}</span>
                                ) : (
                                  para
                                )}
                              </p>
                            ))}
                          </div>
                          
                          <div className="mt-8 flex gap-4">
                            <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-all flex items-center gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Xem Video (Lộc hướng dẫn)
                            </button>
                            <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:border-indigo-600 hover:text-indigo-600 transition-all">
                              Tải tài liệu (PDF)
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapDetail;
