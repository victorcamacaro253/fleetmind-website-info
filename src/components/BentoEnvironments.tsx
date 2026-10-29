import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';
import { BarChart3, Play, Cpu, ArrowUpRight } from 'lucide-react';

const BentoEnvironments = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};

  const items = data.environments?.items || [];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">{data.environments?.title}</h2>
          <p className="text-xl text-slate-600 max-w-2xl">{data.environments?.subtitle}</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
          
          {/* Card 1: Análisis (Ocupa 2 columnas) */}
          <div className="md:col-span-2 group relative bg-slate-50 rounded-3xl p-8 border border-slate-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <BarChart3 className="w-32 h-32 text-orange-600" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full mb-4">{items[0]?.phase}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{items[0]?.title}</h3>
                <p className="text-slate-600 max-w-md">{items[0]?.desc}</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-3 transition-all">
                Explorar Motor What-If <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Card 2: Simulación (Ocupa 1 columna, 2 filas de alto) */}
          <div className="md:row-span-2 group relative bg-slate-900 rounded-3xl p-8 border border-slate-800 hover:border-orange-500/50 hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)] transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
            <div className="relative z-10 h-full flex flex-col">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-6">
                <Play className="w-6 h-6 text-orange-500" />
              </div>
              <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-bold rounded-full mb-4 w-fit">{items[1]?.phase}</span>
              <h3 className="text-2xl font-bold text-white mb-3">{items[1]?.title}</h3>
              <p className="text-slate-400 mb-8 flex-grow">{items[1]?.desc}</p>
              
              {/* Mini visual decorativa */}
              <div className="space-y-3">
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-orange-500 rounded-full animate-pulse"></div>
                </div>
                <div className="flex justify-between text-xs font-mono text-slate-500">
                  <span>MQTT Bridge</span>
                  <span className="text-emerald-500">● Connected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: WES Real (Ocupa 2 columnas) */}
          <div className="md:col-span-2 group relative bg-slate-50 rounded-3xl p-8 border border-slate-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="absolute bottom-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Cpu className="w-32 h-32 text-orange-600" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-full mb-4">{items[2]?.phase}</span>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{items[2]?.title}</h3>
                <p className="text-slate-600 max-w-md">{items[2]?.desc}</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-3 transition-all">
                Ver especificaciones VDA5050 <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BentoEnvironments;
