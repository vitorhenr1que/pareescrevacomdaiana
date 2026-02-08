import React from 'react';
import Link from 'next/link';
import { Download, Eye, ExternalLink } from 'lucide-react';
import { PrismicRichText } from '@prismicio/react';
import * as prismic from '@prismicio/client';
import { Book } from '../types';

interface BookCardProps {
  book?: Book; // Legacy support
  prismicBook?: any; // Prismic support
}

const BookCard: React.FC<BookCardProps> = ({ book, prismicBook }) => {
  // If we have a Prismic book, map its data
  const data = prismicBook ? {
    title: prismicBook.data.title || 'Sem título',
    description: prismicBook.data.description,
    coverUrl: prismicBook.data.cover?.url || '/images/book-placeholder.png',
    pdfUrl: prismic.isFilled.link(prismicBook.data.pdf_link) ? (prismicBook.data.pdf_link as any).url : '#',
    topics: prismicBook.data.topics ? prismicBook.data.topics.split(',').map((t: string) => t.trim()) : [],
    slug: prismicBook.uid,
    isPrismic: true
  } : book ? {
    title: book.title,
    description: book.description,
    coverUrl: book.coverUrl,
    pdfUrl: book.pdfUrl,
    topics: book.topics,
    slug: book.slug,
    isPrismic: false
  } : null;

  if (!data) return null;

  return (
    <div className="group flex flex-col h-full rounded-[2rem] bg-white border border-primary-50 shadow-sm hover:shadow-2xl hover:shadow-primary-100/50 transition-all duration-700 overflow-hidden isolate">
      {/* Cover Image Wrapper */}
      <div className="aspect-[3/4] w-full relative overflow-hidden bg-primary-50 isolate">
        <img
          src={data.coverUrl}
          alt={`Capa do livro ${data.title}`}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Floating Action Hint */}
        <div className="absolute top-4 right-4 translate-x-12 group-hover:translate-x-0 transition-transform duration-500 delay-100">
          <div className="p-3 glass rounded-2xl shadow-xl">
            <ExternalLink className="h-5 w-5 text-primary-900" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-8 bg-white relative">
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap gap-2">
            {data.topics.slice(0, 2).map((topic: string) => (
              <span key={topic} className="inline-flex items-center rounded-lg bg-primary-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-600 border border-primary-100/50">
                {topic}
              </span>
            ))}
          </div>

          <Link href={`/livros/${data.slug}`} className="block group/title">
            <h3 className="text-xl font-bold text-primary-900 group-hover/title:text-accent-700 transition-colors leading-tight line-clamp-2">
              {data.title}
            </h3>
            <div className="mt-3 text-sm text-primary-400 font-light line-clamp-3 leading-relaxed">
              {data.isPrismic ? (
                <PrismicRichText field={data.description} />
              ) : (
                <p>{data.description as string}</p>
              )}
            </div>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <a
            href={data.pdfUrl}
            download
            className="flex items-center justify-center gap-3 rounded-2xl bg-primary-900 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-primary-900/10 hover:bg-primary-800 hover:shadow-primary-900/20 active:scale-95 transition-all"
          >
            <Download className="h-4 w-4 text-accent-400" />
            BAIXAR
          </a>
          <a
            href={data.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-2xl bg-white px-4 py-3 text-xs font-bold text-primary-900 border border-primary-100 hover:bg-primary-50 active:scale-95 transition-all"
          >
            <Eye className="h-4 w-4 text-primary-400" />
            LER ONLINE
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookCard;