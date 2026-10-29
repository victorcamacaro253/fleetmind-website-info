import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';
import { Brain, Activity, TrendingUp, FileSearch, ArrowRight } from 'lucide-react';

const DataIntelligence = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};

  const iconMap: Record<string, any> = { Brain, Activity, TrendingUp, FileSearch };

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold rounded-full mb-4">
            DATA INTELLIGENCE
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {data.intelligence?.title || 'Más que Automatización: Inteligencia Pura'}
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            {data.intelligence?.subtitle || 'Transformamos datos brutos del almacén en ventaja competitiva tangible.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {data.intelligence?.items?.map((item: any, idx: number) => {
            const Icon = iconMap[item.icon] || Brain;
            return (
              <div key={idx} className="group p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 hover:border-orange-500/50 transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-slate-400 leading-relaxed mb-4">{item.desc}</p>
                <div className="flex items-center gap-2 text-orange-400 text-sm font-semibold group-hover:gap-3 transition-all">
                  <span>{language === 'es' ? 'Saber más' : 'Learn more'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DataIntelligence;