import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';
import { Briefcase, DollarSign, Monitor, Wrench, CheckCircle2, ArrowUpRight } from 'lucide-react';

const ValueSection = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};

  const iconMap: Record<string, any> = {
    Briefcase,
    DollarSign,
    Monitor,
    Wrench
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-mono font-semibold mb-6">
            <Briefcase className="w-3 h-3" />
            {language === 'es' ? 'VALOR POR ROL' : 'VALUE BY ROLE'}
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            {data.value?.title || 'Impacto Real en tu Operación'}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {data.value?.subtitle || 'FleetMind no es solo software; es una ventaja competitiva para cada área de tu empresa.'}
          </p>
        </div>

        {/* Grid 2x2 */}
        <div className="grid md:grid-cols-2 gap-8">
          {data.value?.items?.map((item: any, idx: number) => {
            const Icon = iconMap[item.icon] || Briefcase;
            
            return (
              <div 
                key={idx} 
                className="group relative bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300"
              >
                {/* Número decorativo */}
                <div className="absolute top-6 right-6 text-5xl font-bold text-slate-200 group-hover:text-orange-200 transition-colors">
                  0{idx + 1}
                </div>

                {/* Header de la tarjeta */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-orange-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      {item.role}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Lista de beneficios */}
                <ul className="space-y-3">
                  {item.benefits.map((benefit: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 text-sm font-medium leading-relaxed">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Línea decorativa inferior */}
                <div className="mt-6 flex items-center gap-2 text-orange-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm">
                    {language === 'es' ? 'Descubre más' : 'Learn more'}
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueSection;