import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';
import {
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Package,
  Zap,
  Eye,
  ArrowRight,
  Battery,
  Clock,
  Shield
} from 'lucide-react';

const ChallengeSection = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};

  // Iconos mapeados para cada desafío
  const challengeIcons = [Package, Zap, Eye, Battery, Clock, Shield];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decoración de fondo sutil */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado de la sección */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {data.challenge?.title || 'El Desafío de la Logística Moderna'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {data.challenge?.subtitle || 'Las empresas invierten millones en automatización, pero les falta el cerebro que orquesta todo.'}
          </p>
        </div>

        {/* Grid de Desafíos vs Soluciones - 6 tarjetas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.challenge?.items?.map((item: any, idx: number) => {
            const Icon = challengeIcons[idx] || AlertTriangle;
            
            return (
              <div 
                key={idx} 
                className="group relative bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Icono principal */}
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-amber-700" />
                </div>

                {/* El Problema */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                      {language === 'es' ? 'El Problema' : 'The Problem'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 leading-snug">
                    {item.problem}
                  </h3>
                </div>

                {/* Flecha de transición */}
                <div className="flex justify-center mb-6">
                  <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all duration-300" />
                </div>

                {/* La Solución */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      {language === 'es' ? 'La Solución FleetMind' : 'FleetMind Solution'}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed">
                    {item.solution}
                  </p>
                </div>

                {/* El Impacto (Footer de la tarjeta) */}
                <div className="mt-auto pt-6 border-t border-gray-200">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                        {language === 'es' ? 'Impacto Medible' : 'Measurable Impact'}
                      </span>
                      <p className="text-sm font-bold text-amber-800 leading-snug">
                        {item.impact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA sutil al final de la sección */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            {language === 'es' 
              ? 'No dejes que la ineficiencia devore tu margen de ganancia. FleetMind está diseñado para resolver estos problemas desde el día uno.'
              : 'Don\'t let inefficiency eat into your profit margins. FleetMind is designed to solve these problems from day one.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;