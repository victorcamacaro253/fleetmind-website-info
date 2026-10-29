import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/languageContext';
import {
  Network, Brain, Shield, Layers, ArrowRight, CheckCircle2,
  Server, Cpu, Radio, GitBranch, FileSearch, Zap, AlertTriangle
} from 'lucide-react';

const WESPage = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};
  const isEs = language === 'es';
  const wes = data.wesPage || {};

  const iconMap: Record<string, any> = { Network, Brain, Shield, Layers };

  // Estados del PackageTracker (contenido inline bilingüe)
  const packageStates = [
    { state: 'PENDING', desc: isEs ? 'Orden recibida del WMS' : 'Order received from WMS', color: 'zinc' },
    { state: 'ASSIGNED', desc: isEs ? 'Robot óptimo seleccionado' : 'Optimal robot selected', color: 'blue' },
    { state: 'IN_PROGRESS', desc: isEs ? 'Robot en ruta al pickup' : 'Robot en route to pickup', color: 'orange' },
    { state: 'PICKED', desc: isEs ? 'Paquete recogido' : 'Package picked up', color: 'amber' },
    { state: 'DELIVERED', desc: isEs ? 'Entregado en muelle' : 'Delivered to dock', color: 'emerald' }
  ];

  // Ventajas técnicas
  const techAdvantages = [
    {
      icon: 'Radio',
      title: isEs ? 'Descubrimiento Plug & Play' : 'Plug & Play Discovery',
      desc: isEs ? 'Suscribe a vda5050/+/+/state y descubre robots automáticamente. Cero configuración manual.' : 'Subscribes to vda5050/+/+/state and discovers robots automatically. Zero manual configuration.'
    },
    {
      icon: 'GitBranch',
      title: isEs ? 'Asignación Multi-Criterio' : 'Multi-Criteria Assignment',
      desc: isEs ? 'Evalúa 4 variables en milisegundos: distancia, batería, estado y prioridad del pedido.' : 'Evaluates 4 variables in milliseconds: distance, battery, status, and order priority.'
    },
    {
      icon: 'AlertTriangle',
      title: isEs ? 'Stale Detection' : 'Stale Detection',
      desc: isEs ? 'Marca robots como desconectados si no reportan en 30s. Alertas tempranas antes de afectar la operación.' : 'Marks robots as disconnected if they don\'t report within 30s. Early alerts before affecting operations.'
    },
    {
      icon: 'FileSearch',
      title: isEs ? 'Trazabilidad Auditable' : 'Auditable Traceability',
      desc: isEs ? 'Cada transición genera un PackageEvent con timestamp. Ideal para auditorías FDA y normativas.' : 'Every transition generates a PackageEvent with timestamp. Ideal for FDA and regulatory audits.'
    }
  ];

  const techIconMap: Record<string, any> = { Radio, GitBranch, AlertTriangle, FileSearch };

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* ============ HERO ============ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-zinc-950 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold mb-6">
            <Network className="w-3 h-3" />
            {isEs ? 'WAREHOUSE EXECUTION SYSTEM' : 'WAREHOUSE EXECUTION SYSTEM'}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            {wes.heroTitle || 'El Cerebro Operativo Agnóstico'}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            {wes.heroSubtitle || 'FleetMind WES cierra la brecha entre tu WMS de alto nivel y los controladores de robots, orquestando todo en tiempo real bajo VDA5050.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link to="/simulation" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold transition-all hover:shadow-[0_0_30px_-5px_rgba(234,88,12,0.5)]">
              <Zap className="w-5 h-5" />
              {isEs ? 'Ver WES en Acción' : 'See WES in Action'}
            </Link>
            <a href="https://github.com/victorcamacaro253/fleetmind" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 rounded-xl font-semibold transition-all">
              {isEs ? 'Explorar Código' : 'Explore Code'}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ============ THE GAP ============ */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-mono font-semibold mb-6">
            <AlertTriangle className="w-3 h-3" />
            {isEs ? 'EL PROBLEMA' : 'THE PROBLEM'}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">{wes.theGapTitle || 'El Problema que Resuelve el WES'}</h2>
          <p className="text-xl text-zinc-600 leading-relaxed mb-12">
            {wes.theGapDesc || 'El WMS sabe QUÉ mover, pero no CÓMO ni QUIÉN. El robot sabe CÓMO moverse, pero no tiene visión global. FleetMind WES es el eslabón inteligente que toma decisiones en milisegundos.'}
          </p>
          
          {/* Visual Flow */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm w-full md:w-48 text-center">
              <Server className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
              <div className="font-bold text-zinc-900 text-sm">WMS / ERP</div>
              <div className="text-xs text-zinc-500 mt-1">{isEs ? 'Alto Nivel' : 'High Level'}</div>
            </div>
            <ArrowRight className="w-6 h-6 text-orange-500 hidden md:block" />
            <ArrowRight className="w-6 h-6 text-orange-500 md:hidden rotate-90" />
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-6 rounded-xl border border-orange-500 shadow-lg shadow-orange-500/20 w-full md:w-56 text-center transform md:scale-110">
              <Cpu className="w-8 h-8 text-white mx-auto mb-2" />
              <div className="font-bold text-white text-sm">FleetMind WES</div>
              <div className="text-xs text-orange-100 mt-1">{isEs ? 'Orquestación Real' : 'Real-time Orchestration'}</div>
            </div>
            <ArrowRight className="w-6 h-6 text-orange-500 hidden md:block" />
            <ArrowRight className="w-6 h-6 text-orange-500 md:hidden rotate-90" />
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm w-full md:w-48 text-center">
              <Network className="w-8 h-8 text-zinc-500 mx-auto mb-2" />
              <div className="font-bold text-zinc-900 text-sm">Robots AMR</div>
              <div className="text-xs text-zinc-500 mt-1">VDA5050 {isEs ? 'Nativo' : 'Native'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CAPABILITIES ============ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-mono font-semibold mb-6">
              <Brain className="w-3 h-3" />
              {isEs ? 'CAPACIDADES CORE' : 'CORE CAPABILITIES'}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
              {isEs ? 'Inteligencia operativa en cada decisión' : 'Operational intelligence in every decision'}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {wes.capabilities?.map((cap: any, idx: number) => {
              const Icon = iconMap[cap.icon] || Network;
              return (
                <div key={idx} className="group relative bg-zinc-50 rounded-2xl p-8 border border-zinc-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-4 right-4 text-5xl font-bold text-zinc-200 group-hover:text-orange-200 transition-colors">
                    0{idx + 1}
                  </div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-white rounded-xl border border-zinc-200 flex items-center justify-center mb-6 group-hover:border-orange-200 group-hover:scale-110 transition-all">
                      <Icon className="w-7 h-7 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 mb-3">{cap.title}</h3>
                    <p className="text-zinc-600 leading-relaxed">{cap.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PACKAGE STATES ============ */}
      <section className="py-24 bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold mb-6">
              <Layers className="w-3 h-3" />
              {isEs ? 'MÁQUINA DE ESTADOS' : 'STATE MACHINE'}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              {isEs ? 'Trazabilidad de 5 Etapas' : '5-Stage Traceability'}
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              {isEs ? 'Cada paquete es rastreado de forma inmutable desde que entra al almacén hasta que sale. Ideal para auditorías regulatorias.' : 'Every package is immutably tracked from warehouse entry to exit. Ideal for regulatory audits.'}
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {packageStates.map((s, idx) => (
              <div key={idx} className="relative">
                <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700 hover:border-orange-500/50 transition-all duration-300 text-center">
                  <div className="text-xs font-mono text-orange-400 font-bold mb-2">{s.state}</div>
                  <div className="text-sm text-zinc-300">{s.desc}</div>
                </div>
                {idx < 4 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 text-orange-500 -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TECH ADVANTAGES ============ */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200 border border-zinc-300 text-zinc-700 text-xs font-mono font-semibold mb-6">
              <Cpu className="w-3 h-3" />
              {isEs ? 'VENTAJAS TÉCNICAS' : 'TECHNICAL ADVANTAGES'}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
              {isEs ? 'Ingeniería de nivel enterprise' : 'Enterprise-grade engineering'}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {techAdvantages.map((adv, idx) => {
              const Icon = techIconMap[adv.icon] || Cpu;
              return (
                <div key={idx} className="group bg-white rounded-2xl p-8 border border-zinc-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl border border-orange-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900 mb-2">{adv.title}</h3>
                      <p className="text-zinc-600 leading-relaxed text-sm">{adv.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
            {isEs ? 'Orquesta tu flota sin límites' : 'Orchestrate your fleet without limits'}
          </h2>
          <p className="text-xl text-zinc-600 mb-10 max-w-2xl mx-auto">
            {isEs ? 'Conecta robots de cualquier fabricante bajo una misma lógica unificada. Sin vendor lock-in, sin costos de integración millonarios.' : 'Connect robots from any manufacturer under a single unified logic. No vendor lock-in, no million-dollar integration costs.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/simulation" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold transition-all hover:shadow-[0_0_30px_-5px_rgba(234,88,12,0.5)]">
              <CheckCircle2 className="w-5 h-5" />
              {isEs ? 'Ver WES en Acción' : 'See WES in Action'}
            </Link>
            <a href="https://github.com/victorcamacaro253/fleetmind" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-xl font-semibold transition-all">
              {isEs ? 'Explorar Código en GitHub' : 'Explore Code on GitHub'}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WESPage;