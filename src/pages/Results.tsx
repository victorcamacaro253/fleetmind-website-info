import { 
  BarChart3, 
  TrendingUp, 
  Leaf, 
  Ship, 
  Anchor, 
  Clock, 
  Factory,
  CheckCircle2,
  PieChart,
   
} from 'lucide-react';
import { operationalMetrics } from '../data/simulationLogs';


const Results = () => {
  const globalKpis = [
    { icon: Factory, label: 'Contenedores Procesados', value: '880', sub: 'TEUs en un ciclo dinámico', color: 'text-cyan-400' },
    { icon: Ship, label: 'Barcos Gestionados', value: '22', sub: 'De 24 totales (2 en fondeadero)', color: 'text-blue-400' },
    { icon: Clock, label: 'Tiempo de Espera', value: '0.0-1.2', sub: 'Minutos promedio (24-48h)', color: 'text-emerald-400' },
    { icon: Leaf, label: 'Emisiones CO2', value: '85.71', sub: 'kg CO2 por TEU movido', color: 'text-green-400' },
  ];

  const terminalResults = [
    { name: 'Pasir Panjang', jobs: 240, ships: 6, quay: 12.6, yard: 13.2, gate: 19.5 },
    { name: 'Keppel', jobs: 280, ships: 7, quay: 10.0, yard: 6.6, gate: 13.2 },
    { name: 'Brani', jobs: 160, ships: 4, quay: 9.8, yard: 7.4, gate: 15.1 },
    { name: 'Tanjong Pagar', jobs: 200, ships: 5, quay: 15.3, yard: 11.2, gate: 21.2 },
  ];

  const emissionsData = [
    { source: 'Barcos en puerto (HFO)', value: 6352.6, percentage: 63 },
    { source: 'Camiones externos (Diésel)', value: 2418.3, percentage: 24 },
    { source: 'Grúas STS (Eléctricas)', value: 615.8, percentage: 6 },
    { source: 'Grúas RTG (Eléctricas)', value: 247.7, percentage: 3 },
    { source: 'Tractores internos', value: 187.2, percentage: 2 },
    { source: 'Gate (Eléctrico)', value: 193.6, percentage: 2 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-slate-100 pb-20">
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            Métricas de Simulación en Tiempo Real
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Resultados de la Simulación
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Validación operativa de 960 jobs procesados en 4 terminales reales de PSA Singapore, 
            demostrando eficiencia, sostenibilidad y cumplimiento de ETD.
          </p>
        </div>
      </section>

      {/* Global KPIs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {globalKpis.map((kpi, index) => (
            <div key={index} className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 group">
              <div className={`w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <div className={`text-4xl font-bold mb-2 ${kpi.color}`}>{kpi.value}</div>
              <div className="text-white font-semibold mb-1">{kpi.label}</div>
              <div className="text-slate-400 text-sm">{kpi.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
  <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
    <div className="flex items-center gap-3 mb-8">
      <PieChart className="w-8 h-8 text-purple-400" />
      <h2 className="text-2xl font-bold text-white">Distribución de Operaciones (880 Jobs)</h2>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Quay */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-300 font-medium">Operaciones en Quay (Muelle)</span>
          <span className="text-cyan-400 font-bold">{operationalMetrics.quayOperations}</span>
        </div>
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-500 rounded-full" style={{ width: '38%' }}></div>
        </div>
        <p className="text-xs text-slate-500">38% del total · Grúas STS</p>
      </div>

      {/* Yard */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-300 font-medium">Operaciones en Yard (Patio)</span>
          <span className="text-purple-400 font-bold">{operationalMetrics.yardOperations}</span>
        </div>
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-purple-500 rounded-full" style={{ width: '35%' }}></div>
        </div>
        <p className="text-xs text-slate-500">35% del total · Grúas RTG</p>
      </div>

      {/* Gate */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-300 font-medium">Operaciones en Gate (Puerta)</span>
          <span className="text-emerald-400 font-bold">{operationalMetrics.gateOperations}</span>
        </div>
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: '27%' }}></div>
        </div>
        <p className="text-xs text-slate-500">27% del total · Validación</p>
      </div>
    </div>
  </div>
</section>

      {/* Terminal Performance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex items-center gap-3 mb-8">
          <Anchor className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold text-white">Rendimiento por Terminal</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {terminalResults.map((terminal, index) => (
            <div key={index} className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">{terminal.name}</h3>
                <div className="flex gap-4 text-sm">
                  <span className="text-slate-400"><span className="text-cyan-400 font-bold">{terminal.jobs}</span> Jobs</span>
                  <span className="text-slate-400"><span className="text-emerald-400 font-bold">{terminal.ships}</span> Barcos</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400">Utilización Quay (Muelle)</span>
                    <span className="text-white font-medium">{terminal.quay}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full transition-all duration-1000" style={{ width: `${terminal.quay}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400">Utilización Yard (Patio)</span>
                    <span className="text-white font-medium">{terminal.yard}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full transition-all duration-1000" style={{ width: `${terminal.yard}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400">Utilización Gate (Puerta)</span>
                    <span className="text-white font-medium">{terminal.gate}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${terminal.gate}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Environmental Impact & What-If */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* CO2 Emissions */}
          <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-8 h-8 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Huella de Carbono (120 Jobs Base)</h2>
            </div>
            <div className="space-y-4">
              {emissionsData.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-32 text-sm text-slate-400 text-right hidden sm:block">{item.source}</div>
                  <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-600 to-emerald-400 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-20 text-sm font-bold text-white">{item.value} kg</div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <p className="text-green-400 text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Total: 10.02 toneladas CO2 | Intensidad: 83.46 kg CO2/TEU (Cumple MPA Green Port)
              </p>
            </div>
          </div>

          {/* What-If Analysis */}
                  {/* What-If Analysis */}
          <div className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-8 h-8 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Optimización de Recursos con IA</h2>
            </div>
            <p className="text-slate-300 mb-6">
              En lugar de adivinar, nuestro motor de IA evaluó automáticamente <span className="text-purple-400 font-bold">8 configuraciones distintas</span> de recursos (Gate, Yard, Quay, Tractores) para encontrar el punto óptimo entre costo y tiempo de espera.
            </p>
            <div className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 rounded-xl p-6 border border-purple-500/30 relative overflow-hidden">
              {/* Efecto de brillo */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">🏆</span> Configuración Óptima Encontrada por la IA
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700">
                  <div className="text-2xl font-bold text-purple-400">4</div>
                  <div className="text-xs text-slate-400">Ventanillas Gate</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700">
                  <div className="text-2xl font-bold text-purple-400">3</div>
                  <div className="text-xs text-slate-400">Grúas RTG</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700">
                  <div className="text-2xl font-bold text-purple-400">3</div>
                  <div className="text-xs text-slate-400">Grúas STS</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700">
                  <div className="text-2xl font-bold text-purple-400">9</div>
                  <div className="text-xs text-slate-400">Tractores</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-white/10 gap-4">
                <div className="text-left">
                  <div className="text-sm text-slate-400">Espera promedio lograda</div>
                  <div className="text-xl font-bold text-emerald-400">0.0 min</div>
                </div>
                <div className="text-left">
                  <div className="text-sm text-slate-400">Ahorro proyectado vs Baseline</div>
                  <div className="text-2xl font-bold text-white">$693,500 <span className="text-sm text-slate-400 font-normal">/ año</span></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Results;