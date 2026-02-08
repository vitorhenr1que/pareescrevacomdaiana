import React from 'react';
import Link from 'next/link';
import { ArrowRight, Book, MonitorPlay, Users, BookOpen } from 'lucide-react';
import content from '@/data/content.json';
import BookCard from '@/components/BookCard';
import LatestVideos from '@/components/LatestVideos';
import { createClient } from '@/prismicio';
import { Video } from '@/types';

// Helper to fetch videos serverside to pre-render homepage
async function getLatestVideos(): Promise<Video[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/youtube/rss`, {
      next: { revalidate: 3600 }
    } as any);
    if (!res.ok) return [];
    const videos = await res.json();
    return videos.slice(0, 6);
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function Home() {
  const latestVideos = await getLatestVideos();
  const client = createClient();
  let prismicBooks: any[] = [];

  try {
    prismicBooks = await client.getAllByType('book', {
      limit: 3,
      orderings: [
        { field: 'document.first_publication_date', direction: 'desc' }
      ]
    });
  } catch (error) {
    console.error('Erro ao buscar livros na Home:', error);
  }

  // Combine or prioritize Prismic books
  const booksToShow = prismicBooks.length > 0
    ? prismicBooks.slice(0, 3)
    : content.books.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[100vh] lg:min-h-[90vh] flex items-center pt-24 pb-16 lg:pt-32 lg:pb-32 overflow-hidden bg-white">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-900 skew-x-[-12deg] translate-x-1/2 opacity-[0.02]"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-500 rounded-full blur-[120px] opacity-[0.05]"></div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="lg:w-3/5 space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-bold tracking-widest uppercase mb-4">
                <span className="relative flex h-2 w-2 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
                </span>
                EDUCAÇÃO • GESTÃO PÚBLICA • COMPLIANCE
              </div>

              <h1 className="text-5xl lg:text-8xl font-sans font-bold tracking-tight text-primary-900 leading-[0.9]">
                {content.author.name.split(' ').slice(0, 1)} <br />
                <span className="text-accent-600 font-serif italic font-normal">{content.author.name.split(' ').slice(1).join(' ')}</span>
              </h1>

              <div className="space-y-6">
                <p className="text-2xl lg:text-3xl font-light text-primary-600 max-w-xl leading-relaxed">
                  {content.author.tagline}
                </p>
                <div className="w-20 h-1 bg-accent-500 rounded-full"></div>
                <p className="text-lg text-primary-400 max-w-2xl leading-relaxed">
                  {content.author.bioShort}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 pt-8">
                <Link
                  href="/livros"
                  className="btn-premium bg-primary-900 text-white flex items-center justify-center min-w-[220px]"
                >
                  <Book className="mr-3 h-5 w-5 text-accent-400" />
                  Biblioteca Digital
                </Link>
                <Link
                  href="/videos"
                  className="btn-premium glass text-primary-900 flex items-center justify-center min-w-[220px]"
                >
                  <MonitorPlay className="mr-3 h-5 w-5 text-primary-600" />
                  Vídeos & Aulas
                </Link>
              </div>
            </div>

            <div className="lg:w-2/5 relative animate-reveal animate-delay-200">
              <div className="relative z-10 group translate-y-0 hover:-translate-y-4 transition-transform duration-700 ease-out">
                <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-[16px] border-white ring-1 ring-primary-100 isolate bg-gray-100">
                  <img
                    src="/daiana_photo.png"
                    alt={content.author.name}
                    className="h-full w-full object-cover grayscale-[0.1] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>
              </div>
              {/* Background Geometric Shapes */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent-50 rounded-full -z-10 transition-all duration-1000"></div>
              <div className="absolute -bottom-20 -left-20 w-32 h-32 border-2 border-primary-100 rounded-[2rem] rotate-12 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas of Expertise */}
      <section className="py-24 bg-primary-50/20 border-y border-primary-50">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <h2 className="text-xs font-bold text-primary-400 uppercase tracking-[0.4em] [writing-mode:vertical-lr] rotate-180 hidden lg:block">Domínios de Atuação</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {content.expertise.map((area, idx) => (
                <div key={area} className={`group p-10 rounded-[2.5rem] border border-primary-100 bg-white hover:border-accent-400 hover:shadow-2xl hover:shadow-primary-900/10 transition-all duration-700 ${idx % 2 !== 0 ? 'lg:translate-y-8' : ''}`}>
                  <div className="w-14 h-14 rounded-2xl bg-primary-900 flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform shadow-lg shadow-primary-900/20">
                    <span className="text-accent-400 font-bold text-xl">{idx + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary-900 mb-2 leading-tight">{area}</h3>
                  <div className="w-8 h-1 bg-accent-500 rounded-full mt-4 group-hover:w-full transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-24 bg-primary-50/20">
        <LatestVideos initialVideos={latestVideos} />
      </section>

      {/* Books Highlight Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl opacity-30 -mr-32 -mt-32"></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
            <div className="flex justify-center mb-4">
              <span className="p-3 bg-accent-100/50 rounded-2xl">
                <BookOpen className="h-6 w-6 text-accent-700" />
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-sans font-bold text-primary-900 mb-6 tracking-tight">Publicações & Acervo</h2>
            <p className="text-xl text-primary-400 font-light leading-relaxed">
              Material acadêmico e literário disponível <span className="text-accent-600 font-semibold underline decoration-accent-200 underline-offset-4">gratuitamente</span> para a comunidade.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {booksToShow.map((book: any, idx: number) => (
              <div key={book.id || book.uid} className={`animate-fade-in-up`} style={{ animationDelay: `${(idx + 1) * 200}ms` }}>
                <BookCard
                  book={!book.uid ? book : undefined}
                  prismicBook={book.uid ? book : undefined}
                />
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link
              href="/livros"
              className="inline-flex items-center gap-3 text-primary-900 font-bold text-lg hover:gap-6 hover:text-accent-700 transition-all group"
            >
              Explorar biblioteca completa
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Professional Connections banner */}
      <section className="py-32 bg-primary-900 relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-800 to-primary-900 -z-10"></div>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] -z-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="container mx-auto px-6 lg:px-12 text-center">
          <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-4xl lg:text-6xl font-sans font-bold text-white tracking-tight">
              Pesquisa, Ética & <span className="text-accent-400 italic">Conhecimento Digital</span>
            </h2>
            <p className="text-primary-200 text-xl max-w-2xl mx-auto">
              Acesse as trajetórias acadêmicas e as redes de cooperação científica através das plataformas oficiais.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-6">
              <a
                href={content.profiles.lattesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium bg-white text-primary-900 hover:bg-gray-100 min-w-[240px] shadow-2xl"
              >
                Currículo Lattes
              </a>
              <a
                href={content.profiles.orcidUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium border-2 border-white/20 text-white hover:bg-white/10 min-w-[240px]"
              >
                ORCID Profile
              </a>
              <Link
                href="/contato"
                className="btn-premium bg-accent-500 text-white hover:bg-accent-600 min-w-[240px] shadow-accent-500/20"
              >
                Agendar Reunião
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}