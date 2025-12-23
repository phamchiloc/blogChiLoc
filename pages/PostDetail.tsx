
import React, { useEffect } from 'react';
import { Post } from '../types';
import { motion, useScroll, useSpring } from 'framer-motion';

interface PostDetailProps {
  post: Post;
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative bg-white min-h-screen">
      {/* Reading Progress Bar */}
      <motion.div 
        className="fixed top-20 left-0 right-0 h-1.5 bg-indigo-600 origin-left z-50"
        style={{ scaleX }}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-10 transition-colors group font-bold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Quay lại danh sách bài viết
        </button>

        <article>
          <header className="mb-16 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest mb-6"
            >
              {post.category}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-bold text-slate-900 mb-10 leading-[1.1] tracking-tight"
            >
              {post.title}
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-4 py-8 border-y border-slate-100"
            >
              <img src={post.author.avatar} alt={post.author.name} className="w-16 h-16 rounded-full border-4 border-white shadow-lg" />
              <div className="text-left">
                <p className="text-lg font-black text-slate-900">{post.author.name}</p>
                <p className="text-sm text-slate-500 font-medium">Đã đăng vào {post.date} • {Math.max(8, Math.ceil(post.content.length / 500))} phút đọc chuyên sâu</p>
              </div>
            </motion.div>
          </header>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-[40px] overflow-hidden mb-20 shadow-2xl shadow-slate-200 aspect-[21/9]"
          >
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {/* Main Content Area */}
            <div className="prose prose-slate prose-lg md:prose-xl max-w-none">
              {post.content.split('\n').map((line, idx) => {
                if (line.startsWith('###')) {
                  return (
                    <h3 key={idx} className="text-3xl font-black text-slate-900 mt-16 mb-8 pt-8 border-t border-slate-50 first:border-0 first:pt-0">
                      {line.replace('###', '')}
                    </h3>
                  );
                }
                if (line.startsWith('####')) {
                  return (
                    <h4 key={idx} className="text-xl font-bold text-indigo-600 mt-8 mb-4">
                      {line.replace('####', '')}
                    </h4>
                  );
                }
                if (line.trim() === '') return <div key={idx} className="h-4" />;
                
                // Hiển thị code blocks cơ bản
                if (line.startsWith('```')) return null; // Bỏ qua dòng đánh dấu code block

                return (
                  <p key={idx} className="mb-6 leading-[2] font-normal text-slate-700 text-lg md:text-xl">
                    {line}
                  </p>
                );
              })}
            </div>

            {/* Engagement Footer */}
            <div className="mt-32 pt-20 border-t border-slate-100">
              <div className="bg-slate-900 rounded-[50px] p-12 md:p-20 text-center relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-indigo-400 font-black uppercase tracking-widest text-sm mb-6 block">Lời cảm ơn từ tác giả</span>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Bạn thấy bài chia sẻ này hữu ích chứ?</h2>
                  <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
                    Kiến thức chỉ thực sự có giá trị khi được lan tỏa. Hãy chia sẻ bài viết này đến những người bạn nghĩ rằng họ cần nó.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-900/20">
                      Chia sẻ ngay
                    </button>
                    <button className="bg-white/10 text-white backdrop-blur-md px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition-all">
                      Để lại bình luận
                    </button>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PostDetail;
