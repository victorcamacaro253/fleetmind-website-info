// src/components/OperationalFlow.tsx
import React from 'react';
import { Ship, Anchor, Truck, Warehouse, MapPin, ArrowRight, ArrowLeft } from 'lucide-react';

const OperationalFlow = () => {
  const importStages = [
    { icon: Ship, name: 'Barco', desc: 'Atraque y operaciones', color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { icon: Anchor, name: 'Quay', desc: 'Grúas STS (5.4 min)', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { icon: Truck, name: 'Tractor', desc: 'Transporte interno (1.8 min)', color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { icon: Warehouse, name: 'Yard', desc: 'Grúas RTG (3.8 min)', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { icon: MapPin, name: 'Gate', desc: 'Validación (3.2 min)', color: 'text-green-400', bg: 'bg-green-500/10' },
    { icon: Truck, name: 'Camión', desc: 'Ruta real (OSMnx)', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ];

  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Flujo Operativo Integrado
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Simulación completa de la cadena logística portuaria en tiempo real
          </p>
        </div>

        {/* Import Flow */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-cyan-400 mb-8 flex items-center gap-2">
            <ArrowRight className="w-5 h-5" /> Proceso de Importación
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {importStages.map((stage, index) => (
              <React.Fragment key={index}>
                <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group w-40 text-center">
                  <div className={`w-14 h-14 ${stage.bg} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <stage.icon className={`w-7 h-7 ${stage.color}`} />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-1">{stage.name}</h4>
                  <p className="text-slate-400 text-xs">{stage.desc}</p>
                </div>
                {index < importStages.length - 1 && (
                  <div className="hidden md:flex text-cyan-500/50">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Export Flow */}
        <div>
          <h3 className="text-xl font-semibold text-emerald-400 mb-8 flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" /> Proceso de Exportación
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[...importStages].reverse().map((stage, index) => (
              <React.Fragment key={index}>
                <div className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 group w-40 text-center">
                  <div className={`w-14 h-14 ${stage.bg} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <stage.icon className={`w-7 h-7 ${stage.color}`} />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-1">{stage.name}</h4>
                  <p className="text-slate-400 text-xs">{stage.desc}</p>
                </div>
                {index < importStages.length - 1 && (
                  <div className="hidden md:flex text-emerald-500/50">
                    <ArrowLeft className="w-6 h-6" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperationalFlow;