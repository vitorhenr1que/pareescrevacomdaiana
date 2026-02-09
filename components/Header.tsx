'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, BookOpen } from 'lucide-react';
import content from '../data/content.json';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Início', href: '/' },
    { label: 'Biblioteca', href: '/livros' },
    { label: 'Vídeos', href: '/videos' },
    { label: 'Trajetória', href: '/sobre' },
    { label: 'Contato', href: '/contato' },
  ];

  return (
    <header className="sticky top-0 z-[100] w-full glass">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-[1.02]">
            <div className="p-2 bg-primary-900 rounded-lg shadow-lg rotate-3 group-hover:rotate-0 transition-all duration-500">
              <BookOpen className="h-6 w-6 text-accent-400" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary-900 md:text-2xl font-sans">
              Profª Daiana Paixão
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors py-2 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link
              href="/contato"
              className="ml-4 px-5 py-2.5 bg-primary-900 text-white text-sm font-bold rounded-lg hover:bg-primary-800 transition-all hover:shadow-lg hover:shadow-primary-900/20 active:scale-95"
            >
              Falar com a Professora
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-primary-900 hover:bg-primary-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-white border-b shadow-2xl transition-all duration-500 transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
      >
        <nav className="flex flex-col space-y-2 p-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-4 text-lg font-semibold text-primary-900 hover:bg-primary-50 hover:text-accent-600 rounded-xl transition-all"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contato"
            className="mt-4 w-full text-center px-6 py-4 bg-primary-900 text-white font-bold rounded-xl active:scale-95"
            onClick={() => setIsOpen(false)}
          >
            Falar com a Professora
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;