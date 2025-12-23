
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import PostDetail from './pages/PostDetail';
import About from './pages/About';
import Projects from './pages/Projects';
import AIAssistant from './pages/AIAssistant';
import RoadmapDetail from './pages/RoadmapDetail';
import { BLOG_POSTS } from './constants';
import { Page, Project } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Project | null>(null);

  const handleViewRoadmap = (course: Project) => {
    setSelectedCourse(course);
    setCurrentPage(Page.RoadmapDetail);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <Home key="home" onNavigate={setCurrentPage} onPostClick={(id) => { setSelectedPostId(id); setCurrentPage(Page.PostDetail); }} />;
      case Page.Blog:
        return <Blog key="blog" onPostClick={(id) => { setSelectedPostId(id); setCurrentPage(Page.PostDetail); }} />;
      case Page.Projects:
        return <Projects key="projects" onViewRoadmap={handleViewRoadmap} />;
      case Page.About:
        return <About key="about" />;
      case Page.AI:
        return <AIAssistant key="ai" />;
      case Page.RoadmapDetail:
        return selectedCourse ? <RoadmapDetail key="roadmap" course={selectedCourse} onBack={() => setCurrentPage(Page.Projects)} /> : <Projects onViewRoadmap={handleViewRoadmap} />;
      case Page.PostDetail:
        const post = BLOG_POSTS.find(p => p.id === selectedPostId);
        return post ? <PostDetail key="post-detail" post={post} onBack={() => setCurrentPage(Page.Blog)} /> : <Home onNavigate={setCurrentPage} onPostClick={setSelectedPostId} />;
      default:
        return <Home key="default" onNavigate={setCurrentPage} onPostClick={setSelectedPostId} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar onNavigate={setCurrentPage} currentPath={currentPage} />
      
      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + (selectedPostId || '') + (selectedCourse?.id || '')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default App;
