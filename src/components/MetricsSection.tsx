import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';
import { TrendingUp, CheckCircle2, Battery, Activity } from 'lucide-react';

const MetricsSection = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};

  const iconMap: Record<string, any> = { TrendingUp, CheckCircle2, Battery, Activity };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{data.metrics?.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.metrics?.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.metrics?.items?.map((metric: any, idx: number) => {
            const icons = [TrendingUp, CheckCircle2, Activity, Battery];
            const Icon = icons[idx] || TrendingUp;
            const colors = ['text-amber-600', 'text-emerald-600', 'text-orange-600', 'text-slate-600'];
            
            return (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <Icon className={`w-10 h-10 mx-auto mb-4 ${colors[idx]}`} />
                <div className={`text-4xl font-bold ${colors[idx]} mb-2`}>{metric.value}</div>
                <div className="text-gray-900 font-semibold mb-1">{metric.label}</div>
                <div className="text-sm text-gray-500">{metric.sub}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MetricsSection;