import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/languageContext';
import { ArrowRight, Mail, FileText } from 'lucide-react';

const FinalCTA = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};

  return (
    <section className="py-24 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '30px 30px' }}></div>
      
      <div className="relative max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{data.cta?.title}</h2>
        <p className="text-xl text-amber-100 mb-10">{data.cta?.description}</p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center">
          <a
            href="https://github.com/victorcamacaro253/fleetmind"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-700 rounded-xl font-semibold hover:scale-105 transition-all shadow-xl"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            {data.cta?.btnGithub || 'View on GitHub'}
          </a>

          <Link
            to="/simulation"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-800/30 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-amber-800/50 transition-all"
          >
            {data.cta?.btnDocs || 'Live Demo'}
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="mailto:victorcamacaro253@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 hover:scale-105 transition-all"
          >
            <Mail className="w-5 h-5" />
            {data.cta?.btnContact || 'Contact Me'}
          </a>
        </div>

        <p className="mt-8 text-sm text-amber-200 max-w-2xl mx-auto">
          {data.cta?.trustText || '¿Tienes preguntas sobre la arquitectura o quieres una demo personalizada? Escríbeme directamente.'}
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;