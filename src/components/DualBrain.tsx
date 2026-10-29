import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';
import { 
  Box, 
  Cpu, 
  CheckCircle2, 
  ArrowRightLeft, 
  Zap, 
  Network 
} from 'lucide-react';

const DualBrain = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-mono font-semibold mb-6">
            <ArrowRightLeft className="w-3 h-3" />
            {language === 'es' ? 'ARQUITECTURA DUAL' : 'DUAL ARCHITECTURE'}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {data.dualBrain?.title || 'El Doble Cerebro de FleetMind'}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {data.dualBrain?.subtitle || 'Dos motores potentes trabajando en perfecta sincronía.'}
          </p>
        </div>

        {/* Grid de las dos tarjetas */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* TARJETA 1: DIGITAL TWIN */}
          <div className="group relative bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-200 hover:border-orange-300 hover:shadow-2xl transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-500/20 transition-all duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Box className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
                  {data.dualBrain?.digitalTwin.label}
                </span>
              </div>

              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                {data.dualBrain?.digitalTwin.title}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                {data.dualBrain?.digitalTwin.desc}
              </p>

              <ul className="space-y-4">
                {data.dualBrain?.digitalTwin.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* TARJETA 2: WES */}
          <div className="group relative bg-slate-900 rounded-3xl p-8 md:p-10 border border-slate-800 hover:border-orange-500/50 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.2)] transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6 text-orange-500" />
                </div>
                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                  {data.dualBrain?.wes.label}
                </span>
              </div>

              <h3 className="text-3xl font-bold text-white mb-4">
                {data.dualBrain?.wes.title}
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                {data.dualBrain?.wes.desc}
              </p>

              <ul className="space-y-4">
                {data.dualBrain?.wes.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                    </div>
                    <span className="text-slate-200 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DualBrain;