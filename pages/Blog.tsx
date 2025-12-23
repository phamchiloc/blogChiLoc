
import React, { useState } from 'react';
import { BLOG_POSTS } from '../constants';
import PostCard from '../components/PostCard';

interface BlogProps {
  onPostClick: (id: string) => void;
}

const Blog: React.FC<BlogProps> = ({ onPostClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const categories = ['Tất cả', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))];

  const filteredPosts = selectedCategory === 'Tất cả' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <header className="mb-16">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">Bài viết & Tiểu luận</h1>
        <p className="text-xl text-slate-600 max-w-2xl">
          Những phân tích sâu sắc về các khái niệm kỹ thuật, triết lý thiết kế và các thử nghiệm với công nghệ mới nổi.
        </p>
      </header>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} onClick={onPostClick} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
          <p className="text-slate-500">Không tìm thấy bài viết nào trong danh mục này.</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
