
export interface VideoMetadata {
  title: string;
  duration: string;
  thumbnail: string;
  author: string;
  description?: string;
}

export interface DownloadOption {
  quality: string;
  format: 'mp4' | 'mp3' | 'wav';
  size: string;
  type: 'video' | 'audio';
}

export interface HistoryItem {
  id: string;
  title: string;
  date: string;
  type: 'video' | 'audio';
  status: 'completed' | 'failed' | 'processing';
}

export enum AppStatus {
  IDLE = 'idle',
  FETCHING = 'fetching',
  READY = 'ready',
  DOWNLOADING = 'downloading'
}
