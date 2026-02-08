import React from 'react';
import type { Metadata } from "next";
import { Inter, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import content from "@/data/content.json";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: {
    template: `%s | ${content.author.name}`,
    default: `${content.author.name} - Site Oficial`,
  },
  description: content.author.tagline,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://profdaianapaixao.com.br',
    siteName: content.author.name,
    images: [
      {
        url: content.author.photoUrl,
        width: 800,
        height: 600,
        alt: content.author.name,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} ${playfair.variable} font-sans flex min-h-screen flex-col bg-[#FCFDFF] text-primary-900`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}