'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import VideoCard from '@/components/VideoCard';
import VideoModal from '@/components/VideoModal';
import { Video } from '@/types';

interface LatestVideosProps {
    initialVideos: Video[];
}

const LatestVideos: React.FC<LatestVideosProps> = ({ initialVideos }) => {
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

    return (
        <>
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl lg:text-6xl font-sans font-bold text-primary-900 tracking-tight leading-tight">
                            Conteúdo em <br />
                            <span className="text-accent-600 font-serif italic font-normal">Vídeo & Aulas</span>
                        </h2>
                        <p className="mt-6 text-xl text-primary-400 font-light leading-relaxed">
                            Explore síncronos e assíncronos que abordam gestão, ética política e inovações no campo da educação brasileira.
                        </p>
                    </div>
                    <Link
                        href="/videos"
                        className="group flex items-center gap-3 text-primary-900 font-bold text-lg hover:text-accent-600 transition-all"
                    >
                        Ver todos os vídeos
                        <div className="w-12 h-12 rounded-full border border-primary-100 flex items-center justify-center group-hover:border-accent-400 group-hover:bg-accent-50 transition-all">
                            <ArrowRight className="h-5 w-5" />
                        </div>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {initialVideos.map((video, idx) => (
                        <div key={video.id} className="animate-fade-in-up" style={{ animationDelay: `${(idx + 1) * 150}ms` }}>
                            <VideoCard
                                video={video}
                                onPlay={(v) => setSelectedVideo(v)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {selectedVideo && (
                <VideoModal
                    video={selectedVideo}
                    isOpen={!!selectedVideo}
                    onClose={() => setSelectedVideo(null)}
                />
            )}
        </>
    );
};

export default LatestVideos;
