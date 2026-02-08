'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import content from '@/data/content.json';
import { trackContactSubmit } from '@/lib/tracking';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to send email (e.g. via Formspree or API route) would go here.
    // Simulating success for UX.
    trackContactSubmit();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Entre em Contato</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Disponível para palestras, aulas magnas, eventos acadêmicos e convites institucionais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Informações</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary-600 mr-4 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">E-mail</p>
                    <a href={`mailto:${content.social.email}`} className="text-gray-600 hover:text-primary-700">
                      {content.social.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary-600 mr-4 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">WhatsApp Profissional</p>
                    <p className="text-gray-600">{content.social.whatsapp_formated}</p>
                    <span className="text-xs text-gray-400 block mt-1">Apenas mensagens</span>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary-600 mr-4 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Localização</p>
                    <p className="text-gray-600">Bahia, Brasil</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t">
                <a 
                  href={`https://wa.me/${content.social.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center items-center rounded-md bg-[#25D366] px-4 py-3 text-white font-bold hover:bg-[#128C7E] transition-colors"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-sm">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Mensagem Enviada!</h3>
                <p className="text-gray-600 mt-2">Obrigado pelo contato. Retornaremos em breve.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-primary-600 font-medium hover:underline"
                >
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-3 border"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-3 border"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Assunto</label>
                  <select
                    id="subject"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-3 border bg-white"
                  >
                    <option>Convite para Palestra</option>
                    <option>Convite para Aulas</option>
                    <option>Eventos Acadêmicos</option>
                    <option>Imprensa/Entrevista</option>
                    <option>Outros</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensagem</label>
                  <textarea
                    id="message"
                    rows={6}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-3 border"
                    placeholder="Detalhes do seu convite ou mensagem..."
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent bg-primary-900 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    Enviar Mensagem
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}