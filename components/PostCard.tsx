
import React from 'react';
import { motion } from 'framer-motion';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onClick: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <motion.article 
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group cursor-pointer bg-white rounded-[24px] overflow-hidden border border-slate-200 hover:border-indigo-100 hover:shadow-[0_20px_50px_rgba(79,70,229,0.1)] transition-colors duration-300 h-full flex flex-col"
      onClick={() => onClick(post.id)}
    >
      <div className="relative h-56 overflow-hidden">
        <motion.img 
          src={post.image} 
          alt={post.title} 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-5 left-5">
          <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md text-indigo-600 text-[10px] font-black rounded-full uppercase tracking-[0.1em] shadow-sm">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold mb-4">
          <span>{post.date}</span>
          <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
          <span>5 phút đọc</span>
        </div>
        
        <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">
          {post.title}
        </h3>
        
        <p className="text-slate-600 text-sm leading-relaxed mb-8 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={post.author.avatar} alt={post.author.name} className="w-9 h-9 rounded-full ring-2 ring-slate-100" />
            <span className="text-sm font-bold text-slate-700">{post.author.name}</span>
          </div>
          <motion.div 
            whileHover={{ x: 4 }}
            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};

export default PostCard;
