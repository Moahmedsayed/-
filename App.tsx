
import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Downloader from './components/Downloader';
import ResultCard from './components/ResultCard';
import { AppStatus, VideoMetadata, DownloadOption, HistoryItem } from './types';
import { analyzeVideoContent } from './services/gemini';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [metadata, setMetadata] = useState<(VideoMetadata & { summary?: string[], category?: string }) | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleAnalyze = async (url: string) => {
    setStatus(AppStatus.FETCHING);
    setMetadata(null);

    // Simulated fetch of raw metadata combined with Gemini AI analysis
    const aiData = await analyzeVideoContent(url);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (aiData) {
      setMetadata({
        title: aiData.title,
        author: "قناة المحتوى",
        duration: "12:45",
        thumbnail: `https://picsum.photos/seed/${Math.random()}/800/450`,
        summary: aiData.summary,
        category: aiData.category,
        description: aiData.description
      });
      setStatus(AppStatus.READY);
    } else {
      // Fallback mockup if API fails
      setMetadata({
        title: "فيديو مذهل من الويب",
        author: "CreatorX",
        duration: "05:20",
        thumbnail: "https://picsum.photos/800/450",
        summary: ["نظرة عامة على التقنية", "مستقبل الذكاء الاصطناعي", "خلاصة التجارب"],
        category: "تكنولوجيا"
      });
      setStatus(AppStatus.READY);
    }
  };

  const handleDownload = (option: DownloadOption) => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    // Simulating download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloading(false);
            setDownloadProgress(0);
            alert(`تم تحميل الملف بنجاح بصيغة ${option.format}`);
            
            // Add to history
            const newItem: HistoryItem = {
              id: Date.now().toString(),
              title: metadata?.title || "تحميل جديد",
              date: new Date().toLocaleDateString('ar-EG'),
              type: option.type,
              status: 'completed'
            };
            setHistory(prevHist => [newItem, ...prevHist]);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col font-cairo overflow-x-hidden">
      <Navbar />

      <main className="flex-grow container mx-auto px-4">
        {/* Hero & Form */}
        <Downloader onAnalyze={handleAnalyze} status={status} />

        {/* Results */}
        {status === AppStatus.READY && metadata && (
          <ResultCard 
            metadata={metadata} 
            onDownload={handleDownload}
            isDownloading={isDownloading}
          />
        )}

        {/* History Section (Optional View) */}
        {history.length > 0 && status !== AppStatus.FETCHING && (
          <div className="max-w-4xl mx-auto py-12 px-4 border-t border-slate-800">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
              سجل التحميلات الأخيرة
            </h3>
            <div className="grid gap-3">
              {history.map((item) => (
                <div key={item.id} className="glass-morphism rounded-xl p-4 flex items-center justify-between hover:bg-slate-800 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${item.type === 'video' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {item.type === 'video' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="m9 8 6 4-6 4Z"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-sm line-clamp-1">{item.title}</p>
                      <p className="text-[10px] text-slate-500">{item.date}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-md border border-emerald-500/20 font-bold uppercase">كتمل</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Persistent Progress Indicator */}
      {isDownloading && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-xl border-t border-slate-800 p-4 z-50 animate-in slide-in-from-bottom-full duration-300">
          <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 w-full">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-bold">جاري تحميل الملف...</span>
                <span className="text-sm text-blue-400 font-mono">{downloadProgress}%</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-300 ease-out"
                  style={{ width: `${downloadProgress}%` }}
                ></div>
              </div>
            </div>
            <button 
              onClick={() => setIsDownloading(false)}
              className="px-4 py-2 text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
            >
              إلغاء التحميل
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 opacity-50">
             <div className="bg-blue-600 p-1.5 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
             </div>
             <span className="text-sm font-bold">مُحمّل الذكاء الاصطناعي 2024</span>
          </div>
          <p className="text-slate-500 text-xs text-center md:text-right">
            هذا التطبيق مخصص للاستخدام الشخصي فقط. يرجى احترام حقوق الملكية الفكرية للمحتوى.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
