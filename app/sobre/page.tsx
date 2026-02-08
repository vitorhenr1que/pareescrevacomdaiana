import type { Metadata } from 'next';
import { GraduationCap, Award, ScrollText, CheckCircle2 } from 'lucide-react';
import content from '@/data/content.json';

export const metadata: Metadata = {
  title: 'Sobre a Professora Daiana Paixão',
  description: content.author.bioShort,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Bio */}
      <div className="bg-primary-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Quem é Daiana Paixão</h1>
            <div className="prose prose-lg text-gray-700">
               <p className="leading-relaxed whitespace-pre-line">{content.author.bioLong}</p>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <a 
                href={content.profiles.lattesUrl}
                target="_blank"
                rel="noopener noreferrer" 
                className="inline-flex items-center text-primary-700 font-semibold hover:underline"
              >
                <ScrollText className="mr-2 h-5 w-5" />
                Ver Currículo Lattes Completo
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Education Timeline */}
          <div>
            <div className="flex items-center mb-8">
              <GraduationCap className="h-8 w-8 text-accent-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Formação Acadêmica</h2>
            </div>
            <div className="space-y-8 border-l-2 border-primary-100 pl-8 ml-3 relative">
              {content.education.map((edu, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full bg-primary-500 border-4 border-white"></span>
                  <span className="block text-sm text-gray-500 font-semibold mb-1">{edu.period}</span>
                  <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Areas of Expertise */}
          <div>
             <div className="flex items-center mb-8">
              <Award className="h-8 w-8 text-accent-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Áreas de Atuação</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {content.expertise.map((area) => (
                <div key={area} className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <CheckCircle2 className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0" />
                  <span className="text-lg text-gray-800 font-medium">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}