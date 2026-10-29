import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';
import {
  TrendingUp,
  Brain,
  Shield,
  Battery,
  Network,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const UseCasesSection = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};

  const iconMap: Record<string, any> = {
    TrendingUp,
    Brain,
    Shield,
    Battery,
    Network
  };

  const featured = data.useCases?.featured;
  const items = data.useCases?.items || [];
  const FeaturedIcon = iconMap[featured?.icon] || TrendingUp;

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
      <div className="absolute -top-40 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-mono font-semibold mb-6">
            <Sparkles className="w-3 h-3" />
            {language === 'es' ? 'CASOS DE USO REALES' : 'REAL USE CASES'}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {data.useCases?.title || 'Casos de Uso Reales'}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {data.useCases?.subtitle || 'Cómo FleetMind transforma operaciones logísticas complejas en resultados medibles.'}
          </p>
        </div>

        {/* CASO FEATURED: Ocupa todo el ancho */}
        {featured && (
          <div className="mb-8 group">
            <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 rounded-3xl p-8 md:p-12 overflow-hidden border border-slate-700 hover:border-orange-500/50 transition-all duration-500">
              {/* Efectos decorativos */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="relative z-10 grid lg:grid-cols-[auto_1fr] gap-8 items-start">
                {/* Número grande */}
                <div className="hidden lg:flex flex-col items-center">
                  <span className="text-8xl font-bold text-orange-500/20 leading-none">{featured.number}</span>
                  <div className="w-16 h-16 bg-orange-500/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-orange-500/30 -mt-4">
                    <FeaturedIcon className="w-8 h-8 text-orange-400" />
                  </div>
                </div>

                {/* Contenido */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="lg:hidden text-5xl font-bold text-orange-500/30">{featured.number}</span>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full">
                      <span className="text-xs font-bold text-orange-300 uppercase tracking-wider">
                        {language === 'es' ? 'Caso Destacado' : 'Featured Case'}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
                    {featured.title}
                  </h3>

                  {/* Problema */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="text-xs font-bold text-red-300 uppercase tracking-wider">
                        {language === 'es' ? 'El Desafío' : 'The Challenge'}
                      </span>
                    </div>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      {featured.problem}
                    </p>
                  </div>

                  {/* Solución */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                        {language === 'es' ? 'La Solución FleetMind' : 'FleetMind Solution'}
                      </span>
                    </div>
                    <p className="text-slate-200 leading-relaxed">
                      {featured.solution}
                    </p>
                  </div>

                  {/* Valor destacado */}
                  <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-xl backdrop-blur-sm">
                    <Sparkles className="w-5 h-5 text-orange-400" />
                    <span className="text-sm font-bold text-white">
                      {language === 'es' ? 'Valor:' : 'Value:'}{' '}
                      <span className="text-orange-300">{featured.value}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid 2x2 para los otros 4 casos */}
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((useCase: any, idx: number) => {
            const Icon = iconMap[useCase.icon] || Brain;
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl p-8 border border-slate-200 hover:border-orange-300 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.15)] transition-all duration-500 overflow-hidden"
              >
                {/* Número decorativo */}
                <div className="absolute top-4 right-4 text-6xl font-bold text-slate-100 group-hover:text-orange-100 transition-colors">
                  {useCase.number}
                </div>

                <div className="relative z-10">
                  {/* Icono */}
                  <div className="w-12 h-12 bg-orange-50 rounded-xl border border-orange-100 flex items-center justify-center mb-5 group-hover:bg-orange-100 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>

                  {/* Título */}
                  <h3 className="text-xl font-bold text-slate-900 mb-5 pr-12">
                    {useCase.title}
                  </h3>

                  {/* Problema */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                        {language === 'es' ? 'Problema' : 'Problem'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {useCase.problem}
                    </p>
                  </div>

                  {/* Solución */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                        {language === 'es' ? 'Solución' : 'Solution'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {useCase.solution}
                    </p>
                  </div>

                  {/* Valor */}
                  <div className="pt-4 border-t border-slate-100 group-hover:border-orange-100 transition-colors">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {language === 'es' ? 'Impacto:' : 'Impact:'}
                      </span>
                      <span className="text-sm font-bold text-orange-700">
                        {useCase.value}
                      </span>
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

export default UseCasesSection;