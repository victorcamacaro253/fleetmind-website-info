import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';
import {
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Package,
  Zap,
  Eye,
  Battery,
  Clock,
  Shield,
  ArrowRight
} from 'lucide-react';

const StickyChallenges = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};
  const isEs = language === 'es';

  const challengeIcons = [Package, Zap, Eye, Battery, Clock, Shield];

  return (
    <section className="py-24 bg-slate-50 relative ">
      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Layout sticky: título fijo + tarjetas con scroll */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16">
          
          {/* Columna izquierda: STICKY */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-mono font-semibold mb-6">
              <AlertTriangle className="w-3 h-3" />
              {isEs ? 'DESAFÍOS REALES' : 'REAL CHALLENGES'}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {data.challenge?.title || 'El Desafío de la Logística Moderna'}
            </h2>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {data.challenge?.subtitle || 'Las empresas invierten millones en automatización, pero les falta el cerebro que orquesta todo.'}
            </p>

            <div className="hidden lg:block p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">6</div>
                  <div className="text-xs text-slate-500 font-medium">
                    {isEs ? 'Problemas resueltos' : 'Problems solved'}
                  </div>
                </div>
              </div>
              <div className="h-px bg-slate-200 my-3"></div>
              <p className="text-sm text-slate-600">
                {isEs 
                  ? 'Cada desafío representa un dolor real de operaciones logísticas a escala enterprise.'
                  : 'Each challenge represents a real pain point in enterprise-scale logistics operations.'}
              </p>
            </div>
          </div>

          {/* Columna derecha: Tarjetas con scroll */}
          <div className="space-y-6">
            {data.challenge?.items?.map((item: any, idx: number) => {
              const Icon = challengeIcons[idx] || AlertTriangle;
              
              return (
                <div 
                  key={idx} 
                  className="group relative bg-white rounded-2xl p-8 border border-slate-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300"
                >
                  {/* Número decorativo */}
                  <div className="absolute top-6 right-6 text-6xl font-bold text-slate-100 group-hover:text-orange-100 transition-colors">
                    0{idx + 1}
                  </div>

                  <div className="relative z-10">
                    {/* Icono + Problema */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-7 h-7 text-orange-700" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                            {isEs ? 'El Problema' : 'The Problem'}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 leading-snug">
                          {item.problem}
                        </h3>
                      </div>
                    </div>

                    {/* Flecha de transición */}
                    <div className="flex justify-center mb-6">
                      <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-orange-500 group-hover:translate-x-2 transition-all duration-300" />
                    </div>

                    {/* Solución */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                          {isEs ? 'La Solución FleetMind' : 'FleetMind Solution'}
                        </span>
                      </div>
                      <p className="text-slate-700 font-medium leading-relaxed">
                        {item.solution}
                      </p>
                    </div>

                    {/* Impacto */}
                    <div className="pt-6 border-t border-slate-200">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                            {isEs ? 'Impacto Medible' : 'Measurable Impact'}
                          </span>
                          <p className="text-base font-bold text-orange-800 leading-snug">
                            {item.impact}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StickyChallenges;