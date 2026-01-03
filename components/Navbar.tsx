
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-50 glass-morphism border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold tracking-tight">
            <span className="gradient-text">مُحمّل</span> الذكاء الاصطناعي
          </h1>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-blue-400 transition-colors">الرئيسية</a>
          <a href="#" className="hover:text-blue-400 transition-colors">كيف يعمل؟</a>
          <a href="#" className="hover:text-blue-400 transition-colors">حول الإضافة</a>
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-all border border-slate-700">
            تثبيت كإضافة لكروم
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
