import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';
import { Database, Server, ShoppingCart, Truck, ArrowRight } from 'lucide-react';

const Integrations = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};

  const iconMap: Record<string, any> = { Database, Server, ShoppingCart, Truck };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-mono font-semibold mb-6">
            <Server className="w-3 h-3" />
            {language === 'es' ? 'INTEGRACIONES NATIVAS' : 'NATIVE INTEGRATIONS'}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {data.integrations?.title || 'Se Conecta con Tu Ecosistema Existente'}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {data.integrations?.subtitle || 'FleetMind se integra nativamente con los sistemas que ya usas. Sin reemplazos, sin fricción.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.integrations?.items?.map((item: any, idx: number) => {
            const Icon = iconMap[item.icon] || Server;
            return (
              <div key={idx} className="group bg-white rounded-2xl p-8 border border-slate-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center mb-6 group-hover:bg-orange-50 group-hover:border-orange-200 group-hover:scale-110 transition-all">
                  <Icon className="w-7 h-7 text-slate-700 group-hover:text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{item.desc}</p>
                <div className="flex items-center gap-2 text-orange-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {language === 'es' ? 'Saber más' : 'Learn more'} <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Logos de tecnologías compatibles */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">
            {language === 'es' ? 'Compatible con' : 'Compatible with'}
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            {['SAP', 'Oracle WMS', 'Manhattan', 'Blue Yonder', 'Körber', 'Infor'].map((tech, idx) => (
              <span key={idx} className="text-2xl font-bold text-slate-400 hover:text-orange-500 transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;