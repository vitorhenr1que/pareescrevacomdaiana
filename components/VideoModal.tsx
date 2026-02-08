'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Video } from '@/types';

interface VideoModalProps {
    video: Video;
    isOpen: boolean;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // Extract YouTube video ID from link
    const getEmbedUrl = (url: string) => {
        try {
            let videoId = '';
            if (url.includes('v=')) {
                videoId = url.split('v=')[1]?.split('&')[0];
            } else if (url.includes('youtu.be/')) {
                videoId = url.split('youtu.be/')[1]?.split('?')[0];
            } else if (url.includes('embed/')) {
                videoId = url.split('embed/')[1]?.split('?')[0];
            }
            return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : '';
        } catch (e) {
            return '';
        }
    };

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-primary-950/90 backdrop-blur-xl p-4 lg:p-12 transition-all duration-500"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-6xl aspect-video bg-black rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-reveal border border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-20 p-3 rounded-2xl glass-dark text-white hover:bg-accent-500 hover:text-primary-900 transition-all active:scale-95"
                    aria-label="Fechar vídeo"
                >
                    <X className="h-6 w-6" />
                </button>

                <div className="absolute inset-0 flex items-center justify-center -z-10">
                    <div className="w-12 h-12 border-4 border-accent-500 border-t-transparent rounded-full animate-spin"></div>
                </div>

                <iframe
                    src={getEmbedUrl(video.link)}
                    title={video.title}
                    className="h-full w-full border-none relative z-10"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default VideoModal;
