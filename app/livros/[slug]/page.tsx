import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Download, Eye, ChevronLeft, Calendar, BookOpen } from 'lucide-react';
import { PrismicRichText } from '@prismicio/react';
import * as prismic from '@prismicio/client';
import content from '@/data/content.json';
import { createClient } from '@/prismicio';

export async function generateStaticParams() {
  const client = createClient();
  let prismicBooks: any[] = [];

  try {
    prismicBooks = await client.getAllByType('book');
  } catch (e) { }

  const prismicParams = prismicBooks.map((book) => ({
    slug: book.uid,
  }));

  const localParams = content.books.map((book) => ({
    slug: book.slug,
  }));

  return [...prismicParams, ...localParams];
}

export default async function BookDetailPage({ params }: { params: { slug: string } }) {
  const client = createClient();
  let prismicBook: any = null;

  try {
    prismicBook = await client.getByUID('book', params.slug);
  } catch (e) { }

  const localBook = content.books.find((b) => b.slug === params.slug);

  if (!prismicBook && !localBook) {
    notFound();
  }

  // Map data to a common structure
  const book = prismicBook ? {
    title: prismicBook.data.title || 'Sem título',
    description: prismicBook.data.description,
    coverUrl: prismicBook.data.cover?.url || '/images/book-placeholder.png',
    pdfUrl: prismic.isFilled.link(prismicBook.data.pdf_link) ? (prismicBook.data.pdf_link as any).url : '#',
    topics: prismicBook.data.topics ? prismicBook.data.topics.split(',').map((t: string) => t.trim()) : [],
    year: null, // Prismic might not have this yet
    publisher: null,
    isPrismic: true
  } : {
    title: localBook!.title,
    description: localBook!.description,
    coverUrl: localBook!.coverUrl,
    pdfUrl: localBook!.pdfUrl,
    topics: localBook!.topics,
    year: localBook!.year,
    publisher: localBook!.publisher,
    isPrismic: false
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <Link href="/livros" className="inline-flex items-center text-gray-500 hover:text-primary-700 mb-8">
          <ChevronLeft className="h-4 w-4 mr-1" /> Voltar para Livros
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cover Image */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="rounded-lg shadow-xl overflow-hidden bg-gray-100">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-auto object-cover aspect-[2/3]"
              />
            </div>

            <div className="mt-6 space-y-3">
              <a
                href={book.pdfUrl}
                download
                className="w-full flex justify-center items-center rounded-md bg-primary-700 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary-600"
              >
                <Download className="mr-2 h-5 w-5" />
                Baixar PDF
              </a>
              <a
                href={book.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center rounded-md bg-white border border-gray-300 px-4 py-3 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <Eye className="mr-2 h-5 w-5" />
                Ler Online
              </a>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-8 xl:col-span-9">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{book.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-8">
              {book.year && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Ano: {book.year}</span>
                </div>
              )}
              {book.publisher && (
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>Editora: {book.publisher}</span>
                </div>
              )}
            </div>

            <div className="prose prose-lg max-w-none text-gray-600">
              <h3 className="text-gray-900 font-semibold">Sobre a obra</h3>
              {book.isPrismic ? (
                <PrismicRichText field={book.description as any} />
              ) : (
                <p>{book.description as string}</p>
              )}

              <h3 className="text-gray-900 font-semibold mt-8">Tópicos Abordados</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                {book.topics.map((topic: string) => (
                  <li key={topic} className="flex items-center text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-500 mr-2"></span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}