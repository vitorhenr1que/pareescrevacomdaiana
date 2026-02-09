import React from 'react';
import Link from 'next/link';
import { Youtube, Linkedin, Mail, ArrowUpRight, GraduationCap, Instagram } from 'lucide-react';
import content from '../data/content.json';

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-4 items-start">
          <div className="md:col-span-2 space-y-8">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-accent-500 rounded-lg shadow-lg">
                <GraduationCap className="h-6 w-6 text-primary-900" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-sans">
                Profª <span className="text-accent-500">Daiana Paixão</span>
              </span>
            </Link>
            <p className="text-lg text-primary-200 font-light max-w-sm leading-relaxed">
              {content.author.tagline}
            </p>
            <div className="flex space-x-5">
              <a href={content.social.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary-300 hover:text-pink-500 hover:bg-white/10 transition-all">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href={content.youtube.channelUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary-300 hover:text-red-500 hover:bg-white/10 transition-all">
                <span className="sr-only">YouTube</span>
                <Youtube className="h-6 w-6" />
              </a>
              <a href={content.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary-300 hover:text-blue-400 hover:bg-white/10 transition-all">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
              <a href={`mailto:${content.social.email}`} className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary-300 hover:text-accent-400 hover:bg-white/10 transition-all">
                <span className="sr-only">Email</span>
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-bold text-accent-500 tracking-[0.2em] uppercase">Links Úteis</h3>
            <ul className="space-y-4">
              <li><Link href="/livros" className="text-primary-200 hover:text-white transition-colors flex items-center gap-2 group">Biblioteca <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/videos" className="text-primary-200 hover:text-white transition-colors flex items-center gap-2 group">Vídeo-Aulas <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/sobre" className="text-primary-200 hover:text-white transition-colors flex items-center gap-2 group">Trajetória <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
              <li><Link href="/contato" className="text-primary-200 hover:text-white transition-colors flex items-center gap-2 group">Agendamentos <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" /></Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xs font-bold text-accent-500 tracking-[0.2em] uppercase">Plataformas</h3>
            <ul className="space-y-4">
              <li>
                <a href={content.profiles.lattesUrl} target="_blank" rel="noopener noreferrer" className="text-primary-200 hover:text-white transition-colors flex items-center justify-between group">
                  Currículo Lattes
                  <ArrowUpRight className="h-4 w-4 opacity-30 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href={content.profiles.orcidUrl} target="_blank" rel="noopener noreferrer" className="text-primary-200 hover:text-white transition-colors flex items-center justify-between group">
                  ORCID
                  <ArrowUpRight className="h-4 w-4 opacity-30 group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-primary-400 text-sm italic">
            &copy; {new Date().getFullYear()} {content.author.name}. Educando para a cidadania.
          </p>
          <div className="text-primary-400 text-sm flex items-center gap-2">
            Desenvolvido com <span className="text-accent-600">♥</span> para a educação brasileira.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;