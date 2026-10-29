import { 
  MapPin, 
  Anchor, 
  Ship, 
  Warehouse, 
  Activity, 
  TrendingUp 
} from 'lucide-react';

// Datos extraídos directamente de tu documentación de ingeniería
const terminalsData = [
  {
    id: 'pasir-panjang',
    name: 'Pasir Panjang',
    description: 'Terminal moderno de alta capacidad, diseñado para manejar grandes volúmenes de contenedores con eficiencia operativa y tecnología de punta.',
    coordinates: '1.2728°N, 103.7905°E',
    cranes: 6,
    bays: 36,
    maxJobs: 120,
    specialization: 'Contenedores Generales',
    simulation: {
      jobs: 240,
      ships: 6,
      waitTime: '0.0 min',
      quayUtil: '12.6%',
      yardUtil: '13.2%',
      gateUtil: '19.5%',
      efficiency: '13.9%'
    }
  },
  {
    id: 'keppel',
    name: 'Keppel',
    description: 'El terminal más grande de la red, optimizado específicamente para Ultra Large Container Vessels (ULCV) con máxima capacidad de atraque y estiba.',
    coordinates: '1.2699°N, 103.8295°E',
    cranes: 7,
    bays: 42,
    maxJobs: 140,
    specialization: 'Ultra Large (ULCV)',
    simulation: {
      jobs: 280,
      ships: 7,
      waitTime: '0.0 min',
      quayUtil: '10.0%',
      yardUtil: '6.6%',
      gateUtil: '13.2%',
      efficiency: '10.0%'
    }
  },
  {
    id: 'brani',
    name: 'Brani',
    description: 'Terminal especializado con protocolos de seguridad avanzados y infraestructura dedicada para contenedores refrigerados (Reefer) y materiales peligrosos (IMO).',
    coordinates: '1.2601°N, 103.8365°E',
    cranes: 5,
    bays: 30,
    maxJobs: 80,
    specialization: 'Reefer y Peligrosos (IMO)',
    simulation: {
      jobs: 160,
      ships: 4,
      waitTime: '0.0 min',
      quayUtil: '9.8%',
      yardUtil: '7.4%',
      gateUtil: '15.1%',
      efficiency: '9.8%'
    }
  },
  {
    id: 'tanjong-pagar',
    name: 'Tanjong Pagar',
    description: 'Terminal histórico y versátil, adaptado para el manejo eficiente de contenedores generales con alta rotación y conectividad terrestre.',
    coordinates: '1.2644°N, 103.8220°E',
    cranes: 7,
    bays: 38,
    maxJobs: 100,
    specialization: 'Contenedores Generales',
    simulation: {
      jobs: 200,
      ships: 5,
      waitTime: '0.1 min',
      quayUtil: '15.3%',
      yardUtil: '11.2%',
      gateUtil: '21.2%',
      efficiency: '15.3%'
    }
  }
];

const Terminals = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-slate-100 pb-20">
      
      {/* Page Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            Infraestructura Real de PSA Singapore
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Terminales Portuarias
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Modelado geoespacial preciso de 4 terminales reales, cada uno con configuraciones de recursos, 
            especializaciones operativas y límites de capacidad únicos.
          </p>
        </div>
      </section>

      {/* Terminals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {terminalsData.map((terminal) => (
            <div 
              key={terminal.id}
              className="group relative bg-slate-900/40 backdrop-blur-sm rounded-3xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden"
            >
              {/* Efecto de brillo (glow) en hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur"></div>
              
              <div className="relative p-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {terminal.name}
                      </h2>
                      <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold rounded-full uppercase tracking-wider whitespace-nowrap">
                        {terminal.specialization}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      <span>{terminal.coordinates}</span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 leading-relaxed mb-8">
                  {terminal.description}
                </p>

                {/* Infrastructure Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 text-center">
                    <Anchor className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{terminal.cranes}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Grúas STS</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 text-center">
                    <Warehouse className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{terminal.bays}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Bays</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 text-center">
                    <Ship className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{terminal.maxJobs}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Cap. Máx.</div>
                  </div>
                </div>

                {/* Simulation Performance Divider */}
                <div className="border-t border-slate-700/50 pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">Rendimiento en Simulación (24h)</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="space-y-1">
                      <div className="text-xs text-slate-400">Jobs Procesados</div>
                      <div className="text-xl font-bold text-white">{terminal.simulation.jobs}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-slate-400">Barcos Zarparon</div>
                      <div className="text-xl font-bold text-emerald-400">{terminal.simulation.ships}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-slate-400">Espera Promedio</div>
                      <div className="text-xl font-bold text-cyan-400">{terminal.simulation.waitTime}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-slate-400">Eficiencia</div>
                      <div className="text-xl font-bold text-purple-400">{terminal.simulation.efficiency}</div>
                    </div>
                  </div>

                  {/* Utilization Bars */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-400">Utilización Quay</span>
                        <span className="text-white font-medium">{terminal.simulation.quayUtil}</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500 rounded-full transition-all duration-1000" style={{ width: terminal.simulation.quayUtil }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-400">Utilización Yard</span>
                        <span className="text-white font-medium">{terminal.simulation.yardUtil}</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full transition-all duration-1000" style={{ width: terminal.simulation.yardUtil }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-400">Utilización Gate</span>
                        <span className="text-white font-medium">{terminal.simulation.gateUtil}</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: terminal.simulation.gateUtil }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <p className="text-slate-400 mb-6 text-lg">
            ¿Quieres ver cómo se distribuyeron los 880 jobs entre estas 4 terminales?
          </p>
          <a
            href="/results"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-cyan-500/20 border border-white/10"
          >
            <TrendingUp className="w-5 h-5" />
            Ver Resultados Globales de la Simulación
          </a>
        </div>
      </section>
    </div>
  );
};

export default Terminals;