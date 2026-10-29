import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';
import { Workflow, Boxes, Clock, Zap, CheckCircle2 } from 'lucide-react';

const PlatformCapabilities = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};

  const iconMap: Record<string, any> = { Workflow, Boxes, Clock, Zap };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {data.capabilities?.title || 'Una Plataforma, Cuatro Capacidades Clave'}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {data.capabilities?.subtitle || 'FleetMind orquesta cada aspecto de tu operación logística con inteligencia y precisión.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {data.capabilities?.items?.map((item: any, idx: number) => {
            const Icon = iconMap[item.icon] || Workflow;
            return (
              <div key={idx} className="group relative bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 md:p-10 border border-slate-200 hover:border-orange-300 hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-500/10 transition-all"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-orange-600" />
                    </div>
                    <div className="text-6xl font-bold text-slate-100 group-hover:text-orange-100 transition-colors">
                      0{idx + 1}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  <ul className="space-y-3">
                    {item.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformCapabilities;