import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';
import { Shield, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';

const WhyFleetMind = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};

  const iconMap: Record<string, any> = { Shield, Zap, TrendingUp, CheckCircle2 };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Columna izquierda: Filosofía */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-mono font-semibold mb-6">
              <Shield className="w-3 h-3" />
              {language === 'es' ? 'NUESTRA FILOSOFÍA' : 'OUR PHILOSOPHY'}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
              {data.whyFleetMind?.title || 'Agnostic-First Automation'}
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              {data.whyFleetMind?.subtitle || 'Creemos que la flexibilidad no es opcional. La demanda cambia, la disponibilidad de mano de obra fluctúa y los requisitos operativos evolucionan.'}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              {data.whyFleetMind?.desc || 'En lugar de bloquear a las empresas en infraestructura rígida, FleetMind permite escalar, optimizar y expandir la automatización según las necesidades cambiantes, entregando valor duradero hoy mientras proporciona la agilidad para adaptarse mañana.'}
            </p>
          </div>

          {/* Columna derecha: 4 dimensiones */}
          <div className="space-y-6">
            {data.whyFleetMind?.dimensions?.map((dim: any, idx: number) => {
              const Icon = iconMap[dim.icon] || Shield;
              return (
                <div key={idx} className="group flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{dim.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{dim.desc}</p>
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

export default WhyFleetMind;