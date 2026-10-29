import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';
import { TrendingUp, Clock, Users, CheckCircle2 } from 'lucide-react';

const CaseStudy = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};

  const iconMap: Record<string, any> = { TrendingUp, Clock, Users, CheckCircle2 };

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-mono font-semibold mb-6">
            <CheckCircle2 className="w-3 h-3" />
            {language === 'es' ? 'RESULTADOS COMPROBADOS' : 'PROVEN RESULTS'}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {data.caseStudy?.title || 'Impacto Real en Operaciones'}
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            {data.caseStudy?.subtitle || 'Métricas extraídas de simulaciones reales con flotas de 15+ robots AMR.'}
          </p>
        </div>

        {/* Métricas grandes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {data.caseStudy?.metrics?.map((metric: any, idx: number) => {
            const Icon = iconMap[metric.icon] || TrendingUp;
            return (
              <div key={idx} className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-orange-500/50 transition-all duration-300 text-center">
                <Icon className="w-10 h-10 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                  {metric.value}
                </div>
                <div className="text-slate-300 font-semibold mb-1">{metric.label}</div>
                <div className="text-sm text-slate-500">{metric.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Caso de éxito destacado */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 border border-slate-700">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full mb-4">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                  {data.caseStudy?.featured?.label || 'CASO DE ÉXITO'}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {data.caseStudy?.featured?.title || 'Simulación Enterprise con 15 AMRs'}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {data.caseStudy?.featured?.desc || 'Prueba de concepto con flota heterogénea (Rivian EDV + Ford Transit) en almacén de 50x50 celdas con 374 estanterías.'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {data.caseStudy?.featured?.results?.map((result: any, idx: number) => (
                <div key={idx} className="bg-slate-900/50 rounded-xl p-6 border border-slate-700">
                  <div className="text-3xl font-bold text-orange-500 mb-2">{result.value}</div>
                  <div className="text-sm text-slate-300 font-medium">{result.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;