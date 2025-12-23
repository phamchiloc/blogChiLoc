
import React from 'react';
import { motion } from 'framer-motion';
import { BLOG_POSTS, PROJECTS } from '../constants';
import PostCard from '../components/PostCard';

interface HomeProps {
  onNavigate: (path: string) => void;
  onPostClick: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onPostClick }) => {
  const featuredPosts = BLOG_POSTS.slice(0, 3);

  // Fix: Cast variants to any to resolve TypeScript errors where transition properties like 'ease' are inferred as generic strings
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  // Fix: Cast variants to any to resolve "Type 'string' is not assignable to type 'Easing | Easing[]'" for the ease property in motion variants
  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl"
          >
            <motion.h1 variants={itemVariants} className="text-6xl md:text-9xl font-bold text-slate-900 mb-8 leading-[0.95] tracking-tight">
              Kiến tạo <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 italic serif font-normal">
                Thông minh.
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-2xl font-light">
              Kỹ sư cao cấp xây dựng thế hệ công cụ web tiếp theo. Kết nối khoảng cách giữa 
              <span className="text-slate-900 font-medium"> hệ thống phức tạp</span> và <span className="text-slate-900 font-medium">thiết kế tinh tế</span>.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('blog')}
                className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all flex items-center gap-2"
              >
                Khám phá Blog
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: '#f8fafc' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('projects')}
                className="bg-white text-slate-900 border border-slate-200 px-10 py-5 rounded-2xl font-bold hover:border-slate-300 transition-all"
              >
                Xem Dự án
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, -30, 0], rotate: [0, 5, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-[120px] -z-10"
        ></motion.div>
        <motion.div 
          animate={{ y: [0, 40, 0], rotate: [0, -5, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[120px] -z-10"
        ></motion.div>
      </section>

      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-4"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-indigo-600 font-bold text-sm uppercase tracking-widest mb-4 block"
            >
              Bài viết mới nhất
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Suy ngẫm gần đây.</h2>
          </div>
          <motion.button 
            whileHover={{ x: 5 }}
            onClick={() => onNavigate('blog')}
            className="text-indigo-600 font-bold flex items-center gap-2 group"
          >
            Xem tất cả bài viết
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <PostCard post={post} onClick={onPostClick} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section className="bg-white py-24 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Năm kinh nghiệm', val: '8+' },
            { label: 'Dự án hoàn thành', val: '40+' },
            { label: 'Bài viết Blog', val: '120+' },
            { label: 'Tách cà phê', val: '∞' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-4xl md:text-6xl font-bold text-slate-900 mb-2 serif italic">{stat.val}</div>
              <div className="text-slate-500 text-sm font-medium uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="bg-slate-900 rounded-[40px] p-10 md:p-24 text-center text-white relative overflow-hidden group"
        >
          <div className="max-w-2xl mx-auto relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-8"
            >
              Hãy cùng tạo nên <br /><span className="text-indigo-400 italic font-normal serif">điều phi thường</span>.
            </motion.h2>
            <p className="text-slate-400 mb-12 text-xl leading-relaxed">
              Tôi luôn sẵn sàng thảo luận về các dự án mới, ý tưởng sáng tạo hoặc cơ hội trở thành một phần trong tầm nhìn của bạn.
            </p>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white text-slate-900 px-12 py-5 rounded-2xl font-black text-lg hover:bg-slate-100 transition-all shadow-2xl"
            >
              Liên hệ ngay
            </motion.button>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
