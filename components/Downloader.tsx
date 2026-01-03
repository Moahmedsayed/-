
import React, { useState } from 'react';
import { AppStatus, DownloadOption } from '../types';

interface DownloaderProps {
  onAnalyze: (url: string) => void;
  status: AppStatus;
}

const Downloader: React.FC<DownloaderProps> = ({ onAnalyze, status }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-black mb-4 leading-tight">حمّل أي فيديو أو صوت <br/><span className="text-blue-400">بنقرة واحدة</span></h2>
        <p className="text-slate-400 max-w-lg mx-auto">
          أدخل رابط الفيديو من يوتيوب، فيسبوك، تيك توك أو أي منصة أخرى للحصول على أفضل جودة تحميل للفيديو أو فصل الصوت تلقائياً.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="أدخل رابط الفيديو هنا (مثلاً: https://www.youtube.com/watch?...)"
            className="flex-1 bg-slate-900 border-2 border-slate-800 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-blue-500 transition-all text-right"
          />
          <button
            type="submit"
            disabled={status === AppStatus.FETCHING || !url}
            className={`px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {status === AppStatus.FETCHING ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            )}
            تحليل الرابط
          </button>
        </div>
      </form>

      <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-500">
        <span className="bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
          يدعم MP4 بدقة 4K
        </span>
        <span className="bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
          تحويل MP3 (320kbps)
        </span>
        <span className="bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
          بدون إعلانات مزعجة
        </span>
      </div>
    </div>
  );
};

export default Downloader;
