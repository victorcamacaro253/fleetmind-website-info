import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';
import { ShoppingCart, Pill, Package, Factory, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const Industries = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};

  const iconMap: Record<string, any> = { 
    ShoppingCart, 
    Pill, 
    Package, 
    Factory 
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decoración de fondo sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado de la sección */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-mono font-semibold mb-6">
            <Package className="w-3 h-3" />
            {language === 'es' ? 'SECTORES OBJETIVO' : 'TARGET INDUSTRIES'}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {data.industries?.title || 'Diseñado para tu Industria'}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {data.industries?.subtitle || 'Soluciones adaptadas a los desafíos regulatorios y operativos de cada sector.'}
          </p>
        </div>

        {/* Bento Grid 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.industries?.items?.map((industry: any, idx: number) => {
            const Icon = iconMap[industry.icon] || Package;
            
            return (
              <div 
                key={idx} 
                className="group relative bg-white rounded-3xl p-8 md:p-10 border border-slate-200 hover:border-orange-300 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.15)] transition-all duration-500 overflow-hidden"
              >
                {/* Efecto de brillo interior en hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/[0.03] group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  {/* Header de la tarjeta */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center group-hover:bg-orange-50 group-hover:border-orange-200 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-7 h-7 text-slate-700 group-hover:text-orange-600 transition-colors" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-orange-500" />
                    </div>
                  </div>

                  {/* Contenido */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-700 transition-colors">
                    {industry.name}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
                    {industry.desc}
                  </p>

                  {/* Footer: Beneficio destacado */}
                  <div className="pt-6 border-t border-slate-100 group-hover:border-orange-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                          {language === 'es' ? 'Ventaja Clave' : 'Key Advantage'}
                        </span>
                        <span className="text-sm font-bold text-slate-900">
                          {industry.benefit}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Industries;