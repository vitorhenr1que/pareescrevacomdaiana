import type { Metadata } from 'next';
import content from '@/data/content.json';
import BookCard from '@/components/BookCard';
import { createClient } from '@/prismicio';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Biblioteca Digital',
  description: 'Acesso gratuito ao acervo acadêmico e literário da Professora Daiana Paixão.',
};

export default async function BooksPage() {
  const client = createClient();
  let prismicBooks: any[] = [];

  try {
    prismicBooks = await client.getAllByType('book', {
      orderings: [
        { field: 'document.first_publication_date', direction: 'desc' }
      ]
    });
  } catch (error) {
    console.error('Erro ao buscar livros do Prismic:', error);
  }

  const hasBooks = prismicBooks.length > 0 || content.books.length > 0;

  return (
    <div className="bg-[#FCFDFF] min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center mb-24 animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary-900 rounded-[2rem] shadow-2xl rotate-3">
              <BookOpen className="h-10 w-10 text-accent-400" />
            </div>
          </div>
          <h1 className="text-5xl lg:text-7xl font-sans font-bold text-primary-900 mb-8 tracking-tight leading-tight">
            Biblioteca <span className="text-secondary-600 font-serif italic font-normal">Digital</span>
          </h1>
          <p className="text-xl lg:text-2xl text-primary-400 font-light max-w-2xl mx-auto leading-relaxed">
            Acervo de livre acesso contendo registros acadêmicos, produções literárias e discussões sobre o cenário educacional brasileiro.
          </p>
          <div className="mt-10 flex justify-center">
            <div className="h-1.5 w-24 bg-accent-500 rounded-full"></div>
          </div>
        </div>

        {hasBooks ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {/* Prismic Books */}
            {prismicBooks.map((book, idx) => (
              <div key={book.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <BookCard prismicBook={book} />
              </div>
            ))}

            {/* Legacy JSON Books (if no Prismic books match yet, or show all) */}
            {prismicBooks.length === 0 && content.books.map((book, idx) => (
              <div key={book.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <BookCard book={book} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 glass rounded-[3rem] border-2 border-dashed border-primary-100">
            <BookOpen className="h-16 w-16 text-primary-100 mx-auto mb-6" />
            <p className="text-xl text-primary-300 font-medium">O acervo está sendo atualizado. <br /> Volte em breve.</p>
          </div>
        )}
      </div>
    </div>
  );
}