
import React from 'react';
import { VideoMetadata, DownloadOption } from '../types';

interface ResultCardProps {
  metadata: VideoMetadata & { summary?: string[], category?: string };
  onDownload: (option: DownloadOption) => void;
  isDownloading: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ metadata, onDownload, isDownloading }) => {
  const videoOptions: DownloadOption[] = [
    { quality: '1080p Full HD', format: 'mp4', size: '124 MB', type: 'video' },
    { quality: '720p HD', format: 'mp4', size: '78 MB', type: 'video' },
  ];

  const audioOptions: DownloadOption[] = [
    { quality: '320kbps High', format: 'mp3', size: '12 MB', type: 'audio' },
    { quality: 'Lossless WAV', format: 'wav', size: '45 MB', type: 'audio' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="glass-morphism rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col lg:flex-row">
        {/* Thumbnail Section */}
        <div className="lg:w-1/3 relative group">
          <img src={metadata.thumbnail} alt={metadata.title} className="w-full h-full object-cover min-h-[250px] lg:min-h-full transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
          <div className="absolute bottom-4 right-4 bg-blue-600/90 backdrop-blur-md text-[10px] uppercase font-bold px-3 py-1 rounded-full text-white">
            {metadata.category || 'فيديو'}
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:w-2/3 p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold mb-1 line-clamp-2">{metadata.title}</h3>
              <p className="text-slate-400 text-sm">بواسطة: <span className="text-blue-400">{metadata.author}</span> • المدة: {metadata.duration}</p>
            </div>
          </div>

          {/* AI Summary Section */}
          {metadata.summary && (
            <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-4 mb-8">
              <div className="flex items-center gap-2 mb-2 text-blue-400 font-bold text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                ملخص الذكاء الاصطناعي للمحتوى:
              </div>
              <ul className="space-y-1">
                {metadata.summary.map((point, idx) => (
                  <li key={idx} className="text-slate-300 text-xs flex gap-2">
                    <span className="text-blue-500">•</span> {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Download Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Video Box */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-400 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="m9 8 6 4-6 4Z"/></svg>
                تحميل الفيديو
              </h4>
              <div className="space-y-2">
                {videoOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => onDownload(opt)}
                    disabled={isDownloading}
                    className="w-full flex items-center justify-between p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all group"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-semibold">{opt.quality}</span>
                      <span className="text-[10px] text-slate-500">{opt.size} • .{opt.format}</span>
                    </div>
                    <div className="bg-slate-700 group-hover:bg-blue-600 p-2 rounded-lg transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Audio Box */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-400 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                فصل الصوت فقط
              </h4>
              <div className="space-y-2">
                {audioOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => onDownload(opt)}
                    disabled={isDownloading}
                    className="w-full flex items-center justify-between p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all group"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-semibold">{opt.quality}</span>
                      <span className="text-[10px] text-slate-500">{opt.size} • .{opt.format}</span>
                    </div>
                    <div className="bg-slate-700 group-hover:bg-emerald-600 p-2 rounded-lg transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
