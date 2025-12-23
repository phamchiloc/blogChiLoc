
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-xl font-bold text-slate-900 mb-4">Lộc.</div>
            <p className="text-slate-500 text-sm max-w-xs">
              Blog cá nhân của Phạm Chí Lộc. Nơi chia sẻ đam mê lập trình và các kiến thức công nghệ hữu ích.
            </p>
          </div>
          
          <div className="flex gap-10">
            <div>
              <h4 className="font-bold text-slate-900 mb-4 text-sm">Điều hướng</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-600">Trang chủ</a></li>
                <li><a href="#" className="hover:text-indigo-600">Bài viết</a></li>
                <li><a href="#" className="hover:text-indigo-600">Giới thiệu</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Phạm Chí Lộc. Tất cả quyền được bảo lưu.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-600">Chính sách bảo mật</a>
            <a href="#" className="hover:text-slate-600">Điều khoản</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
