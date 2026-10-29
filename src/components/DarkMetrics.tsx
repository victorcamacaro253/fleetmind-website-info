import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';
import { TrendingUp, CheckCircle2, Battery, Activity } from 'lucide-react';

const DarkMetrics = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};

  const icons = [TrendingUp, CheckCircle2, Activity, Battery];

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Efectos de luz de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{data.metrics?.title}</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">{data.metrics?.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.metrics?.items?.map((metric: any, idx: number) => {
            const Icon = icons[idx] || TrendingUp;
            return (
              <div key={idx} className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-orange-500/50 transition-all duration-300">
                <Icon className="w-8 h-8 text-orange-500 mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">{metric.value}</div>
                <div className="text-slate-200 font-semibold mb-1">{metric.label}</div>
                <div className="text-sm text-slate-500 font-mono">{metric.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DarkMetrics;