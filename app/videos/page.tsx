'use client';

import React, { useEffect, useState } from 'react';
import { Search, Youtube, Loader2, MonitorPlay } from 'lucide-react';
import VideoCard from '@/components/VideoCard';
import VideoModal from '@/components/VideoModal';
import content from '@/data/content.json';
import { Video } from '@/types';

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/youtube/rss');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setVideos(data);
        setFilteredVideos(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const results = videos.filter(video =>
      video.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredVideos(results);
  }, [search, videos]);

  return (
    <div className="min-h-screen bg-[#FCFDFF] py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mb-20 animate-fade-in-up">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary-900 rounded-2xl shadow-xl">
                <MonitorPlay className="h-6 w-6 text-accent-400" />
              </div>
              <span className="text-sm font-bold text-accent-600 uppercase tracking-widest">Aulas & Vídeos</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-sans font-bold text-primary-900 tracking-tight leading-tight">
              Conteúdo <span className="text-secondary-600 font-serif italic font-normal">Digital</span>
            </h1>
            <p className="mt-6 text-xl text-primary-400 font-light leading-relaxed">
              Assista a palestras, entrevistas e materiais didáticos organizados para aprofundar seu conhecimento em gestão e educação.
            </p>
          </div>

          <a
            href={content.youtube.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium group flex items-center justify-center min-w-[280px] bg-gradient-to-r from-red-600 to-red-700 text-white shadow-2xl shadow-red-500/30 hover:shadow-red-500/50 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <svg
              viewBox="0 0 24 24"
              className="mr-3 h-7 w-7 fill-white transition-transform duration-300 group-hover:scale-110"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span className="tracking-wide font-bold">INSCREVA-SE NO CANAL</span>
          </a>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mb-20 group animate-fade-in-up animate-delay-200">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none transition-colors group-focus-within:text-accent-600">
            <Search className="h-6 w-6 text-primary-400 group-focus-within:text-accent-600 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-16 pr-8 py-5 bg-primary-50/50 border border-primary-200 rounded-[2rem] shadow-sm focus:outline-none focus:ring-4 focus:ring-accent-500/10 focus:border-accent-500 transition-all text-primary-900 placeholder:text-primary-400 text-lg lg:text-xl"
            placeholder="Pesquisar por tema ou título..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 glass rounded-[3rem]">
            <Loader2 className="h-16 w-16 text-accent-500 animate-spin" />
            <p className="mt-6 text-primary-400 font-medium">Sincronizando com o YouTube...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-32 glass rounded-[3rem] border border-red-50">
            <p className="text-xl text-red-500 mb-6 font-medium">Não foi possível carregar os vídeos.</p>
            <a href={content.youtube.channelUrl} className="btn-premium glass text-primary-900 mx-auto max-w-xs">
              Ver direto no YouTube
            </a>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredVideos.map((video, idx) => (
              <div key={video.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <VideoCard
                  video={video}
                  onPlay={(v) => setSelectedVideo(v)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty Search State */}
        {!loading && !error && filteredVideos.length === 0 && (
          <div className="text-center py-32 glass rounded-[3rem]">
            <Search className="h-16 w-16 text-primary-50 mx-auto mb-6" />
            <p className="text-xl text-primary-300 font-medium italic">Nenhum resultado encontrado para "{search}".</p>
          </div>
        )}
      </div>

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}