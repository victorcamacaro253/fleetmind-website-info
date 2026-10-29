import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/languageContext';
import {
  Play, BarChart3, Cpu, FileOutput, Zap, ArrowRight,
  CheckCircle2, AlertTriangle, TrendingUp, DollarSign,
  Target, Layers, Sparkles
} from 'lucide-react';

const SimulationPage = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};
  const isEs = language === 'es';
  const sim = data.simulationPage || {};

  const iconMap: Record<string, any> = { Play, BarChart3, Cpu, FileOutput, Zap };

  // Escenarios What-If concretos (contenido inline bilingüe)
  const scenarios = [
    {
      icon: 'TrendingUp',
      title: isEs ? 'Pico de Demanda (Black Friday)' : 'Demand Spike (Black Friday)',
      question: isEs ? '¿Qué pasa si la demanda sube 3x?' : 'What if demand increases 3x?',
      answer: isEs ? 'El sistema simula 15+ variaciones y recomienda: "Agrega 5 robots + 5 muelles, no 10 robots". Ahorro: $200K+.' : 'The system simulates 15+ variations and recommends: "Add 5 robots + 5 docks, not 10 robots". Savings: $200K+.',
    },
    {
      icon: 'DollarSign',
      title: isEs ? 'Reducción de CapEx' : 'CapEx Reduction',
      question: isEs ? '¿Cuántos robots necesito realmente?' : 'How many robots do I really need?',
      answer: isEs ? 'Evita comprar flota en exceso. El Motor What-If encuentra el punto exacto donde el ROI se maximiza.' : 'Avoid overbuying fleet. The What-If Engine finds the exact point where ROI is maximized.',
    },
    {
      icon: 'AlertTriangle',
      title: isEs ? 'Detección de Cuellos de Botella' : 'Bottleneck Detection',
      question: isEs ? '¿Dónde está el límite real de mi almacén?' : 'Where is my warehouse\'s real limit?',
      answer: isEs ? 'Identifica si el cuello de botella son los robots, los muelles o los cargadores antes de invertir.' : 'Identifies if the bottleneck is robots, docks, or chargers before you invest.',
    },
    {
      icon: 'Target',
      title: isEs ? 'Planificación de Turnos' : 'Shift Planning',
      question: isEs ? '¿Debo agregar un tercer turno?' : 'Should I add a third shift?',
      answer: isEs ? 'Simula el impacto de ampliar jornada vs. agregar robots. Decisiones basadas en datos, no en intuición.' : 'Simulates the impact of extending hours vs. adding robots. Data-driven decisions, not guesswork.',
    }
  ];

  // Métricas de la simulación
  const metrics = [
    { value: '15+', label: isEs ? 'Escenarios What-If' : 'What-If Scenarios' },
    { value: '99.9%', label: isEs ? 'Precisión del Gemelo' : 'Twin Accuracy' },
    { value: '60', label: 'FPS', sub: isEs ? 'Visualización' : 'Visualization' },
    { value: '268', label: isEs ? 'Paq/hora throughput' : 'Pkg/hour throughput' }
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* ============ HERO ============ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-zinc-950 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold mb-6">
            <Cpu className="w-3 h-3" />
            {isEs ? 'GEMELO DIGITAL · DIGITAL TWIN' : 'DIGITAL TWIN · GEMELO DIGITAL'}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            {sim.heroTitle || 'Simula el Futuro de tu Almacén'}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-10">
            {sim.heroSubtitle || 'Antes de mover un solo paquete físico o gastar un dólar en hardware, valida tu operación en nuestro Gemelo Digital con precisión del 99.9%.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/simulation" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold transition-all hover:shadow-[0_0_30px_-5px_rgba(234,88,12,0.5)]">
              <Play className="w-5 h-5" />
              {isEs ? 'Probar Simulador en Vivo' : 'Try Live Simulator'}
            </Link>
            <Link to="/architecture" className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 rounded-xl font-semibold transition-all">
              {isEs ? 'Ver Arquitectura' : 'View Architecture'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ MÉTRICAS RÁPIDAS ============ */}
      <section className="py-12 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((m, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-1">{m.value}</div>
                <div className="text-sm text-zinc-400 font-medium">{m.label}</div>
                {m.sub && <div className="text-xs text-zinc-600 mt-1">{m.sub}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-mono font-semibold mb-6">
              <Sparkles className="w-3 h-3" />
              {isEs ? 'CAPACIDADES CLAVE' : 'KEY CAPABILITIES'}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
              {isEs ? 'Todo lo que necesitas para decidir con confianza' : 'Everything you need to decide with confidence'}
            </h2>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
              {isEs ? 'Herramientas enterprise para validar, optimizar y presentar tu caso de negocio.' : 'Enterprise tools to validate, optimize, and present your business case.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {sim.features?.map((feature: any, idx: number) => {
              const Icon = iconMap[feature.icon] || Cpu;
              return (
                <div key={idx} className="group bg-white rounded-2xl p-8 border border-zinc-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 bg-orange-50 rounded-xl border border-orange-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">{feature.title}</h3>
                  <p className="text-zinc-600 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ ESCENARIOS WHAT-IF ============ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-mono font-semibold mb-6">
              <Layers className="w-3 h-3" />
              {isEs ? 'ESCENARIOS WHAT-IF' : 'WHAT-IF SCENARIOS'}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
              {isEs ? 'Preguntas que tu almacén necesita responder' : 'Questions your warehouse needs to answer'}
            </h2>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
              {isEs ? 'El Motor What-If ejecuta múltiples variaciones de cada escenario para darte respuestas con desviación estándar, no suposiciones.' : 'The What-If Engine runs multiple variations of each scenario to give you answers with standard deviation, not guesses.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {scenarios.map((s, idx) => (
              <div key={idx} className="group relative bg-zinc-50 rounded-2xl p-8 border border-zinc-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                <div className="absolute top-4 right-4 text-5xl font-bold text-zinc-200 group-hover:text-orange-200 transition-colors">
                  0{idx + 1}
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-zinc-900 mb-4">{s.title}</h3>
                  <div className="mb-4">
                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">
                      {isEs ? 'La pregunta:' : 'The question:'}
                    </div>
                    <p className="text-zinc-700 font-medium italic">"{s.question}"</p>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {isEs ? 'La respuesta FleetMind:' : 'FleetMind\'s answer:'}
                    </div>
                    <p className="text-zinc-700 leading-relaxed">{s.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STEPS ============ */}
      <section className="py-24 bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{sim.stepsTitle || 'Cómo Funciona la Simulación'}</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              {isEs ? 'De la configuración a la optimización en 4 pasos simples.' : 'From configuration to optimization in 4 simple steps.'}
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {sim.steps?.map((step: any, idx: number) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-bold text-orange-500/20 mb-4">{step.number}</div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
                {idx < 3 && <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-orange-500/50 to-transparent -translate-x-4"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
            {isEs ? '¿Listo para validar tu operación?' : 'Ready to validate your operation?'}
          </h2>
          <p className="text-xl text-zinc-600 mb-10 max-w-2xl mx-auto">
            {isEs ? 'No inviertas en hardware sin antes probarlo en nuestro Gemelo Digital. Agenda una demo personalizada o prueba el simulador en vivo.' : 'Don\'t invest in hardware without testing it in our Digital Twin first. Schedule a custom demo or try the live simulator.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/simulation" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold transition-all hover:shadow-[0_0_30px_-5px_rgba(234,88,12,0.5)]">
              <Zap className="w-5 h-5" />
              {isEs ? 'Ir al Simulador en Vivo' : 'Go to Live Simulator'}
            </Link>
            <a href="mailto:victorcamacaro253@gmail.com" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-xl font-semibold transition-all">
              {isEs ? 'Agendar Demo' : 'Schedule Demo'}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SimulationPage;