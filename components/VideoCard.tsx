import React from 'react';
import { Play, Calendar, MonitorPlay } from 'lucide-react';
import { Video } from '@/types';

interface VideoCardProps {
  video: Video;
  onPlay?: (video: Video) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onPlay }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onPlay) {
      e.preventDefault();
      onPlay(video);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date);
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-[2.5rem] border border-primary-50 shadow-sm hover:shadow-2xl hover:shadow-primary-100/50 transition-all duration-700 overflow-hidden isolate">
      {/* Thumbnail Wrapper */}
      <div className="aspect-video w-full relative overflow-hidden bg-primary-100 isolate">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Play Button Overlay */}
        <button
          onClick={handleClick}
          className="absolute inset-0 flex items-center justify-center group/play"
          aria-label="Play video"
        >
          <div className="w-16 h-16 rounded-full bg-accent-500/90 flex items-center justify-center text-white shadow-2xl scale-90 group-hover/play:scale-100 transition-all duration-500 group-hover/play:bg-accent-500">
            <Play className="h-7 w-7 fill-current translate-x-0.5" />
          </div>
        </button>

        {/* Floating Tag */}
        <div className="absolute top-6 left-6">
          <div className="px-3 py-1.5 glass rounded-xl flex items-center gap-2 backdrop-blur-md">
            <MonitorPlay className="h-3 w-3 text-primary-900" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary-900">Educação Digital</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-8 lg:p-10">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2 text-primary-300">
            <Calendar className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-widest">{formatDate(video.pubDate)}</span>
          </div>

          <h3 className="text-xl lg:text-2xl font-bold text-primary-900 group-hover:text-accent-600 transition-colors leading-tight line-clamp-2">
            {video.title}
          </h3>
        </div>

        <div className="mt-8">
          <button
            onClick={handleClick}
            className="w-full flex items-center justify-center gap-3 rounded-2xl bg-primary-50 px-6 py-4 text-xs font-bold text-primary-900 hover:bg-primary-900 hover:text-white transition-all duration-500 group-hover:shadow-lg group-hover:shadow-primary-900/10"
          >
            ASSISTIR AGORA
            <Play className="h-3 w-3 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;