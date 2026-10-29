import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/languageContext';
import {
  Layers, Monitor, Server, Radio, Cpu, Database,
  ArrowRight, CheckCircle2, Zap, Shield, Network,
  GitBranch, FileCode, Workflow, Boxes, Activity
} from 'lucide-react';

const Architecture = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};
  const isEs = language === 'es';

  const [activeLayer, setActiveLayer] = useState(0);

  // Capas de la arquitectura
  const layers = [
    {
      icon: 'Monitor',
      title: isEs ? 'Capa de Presentación' : 'Presentation Layer',
      color: 'orange',
      components: isEs 
        ? ['Streamlit Dashboard', 'WebSocket Animation Server (60 FPS)', 'Cliente Canvas HTML5']
        : ['Streamlit Dashboard', 'WebSocket Animation Server (60 FPS)', 'HTML5 Canvas Client'],
      desc: isEs 
        ? 'Interfaz de usuario y visualización en tiempo real. Desacoplada del ciclo de rerun de Streamlit para mantener la animación fluida.'
        : 'User interface and real-time visualization. Decoupled from Streamlit rerun cycle to maintain smooth animation.',
      tech: ['React', 'WebSocket', 'Canvas API']
    },
    {
      icon: 'Cpu',
      title: isEs ? 'Capa de Orquestación' : 'Orchestration Layer',
      color: 'amber',
      components: isEs
        ? ['FleetManager (descubrimiento Plug & Play)', 'OrderManager (asignación multi-criterio)', 'PackageTracker (trazabilidad)', 'WhatIf Engine (15+ escenarios)']
        : ['FleetManager (Plug & Play discovery)', 'OrderManager (multi-criteria assignment)', 'PackageTracker (traceability)', 'WhatIf Engine (15+ scenarios)'],
      desc: isEs
        ? 'El cerebro del sistema. Toma decisiones en milisegundos basadas en distancia, batería, prioridad SLA y congestión.'
        : 'The brain of the system. Makes decisions in milliseconds based on distance, battery, SLA priority, and congestion.',
      tech: ['Python', 'A* Pathfinding', 'TSP Optimization']
    },
    {
      icon: 'Radio',
      title: isEs ? 'Capa de Comunicación' : 'Communication Layer',
      color: 'emerald',
      components: isEs
        ? ['MQTT Broker (VDA5050 topics)', 'Colas Thread-Safe + RLock', 'Animation Server (HTTP 8766 / WS 8765)']
        : ['MQTT Broker (VDA5050 topics)', 'Thread-Safe Queues + RLock', 'Animation Server (HTTP 8766 / WS 8765)'],
      desc: isEs
        ? 'Puente entre el software y los robots físicos. Implementa el estándar VDA5050 v2.0.0 nativo con QoS 1.'
        : 'Bridge between software and physical robots. Implements native VDA5050 v2.0.0 standard with QoS 1.',
      tech: ['MQTT', 'VDA5050 v2.0.0', 'WebSocket']
    },
    {
      icon: 'Server',
      title: isEs ? 'Capa de Ejecución' : 'Execution Layer',
      color: 'blue',
      components: isEs
        ? ['Robots AMR (mock o físicos)', 'Sensores + Actuadores', 'Navegación local (BFS)']
        : ['AMR Robots (mock or physical)', 'Sensors + Actuators', 'Local navigation (BFS)'],
      desc: isEs
        ? 'Agentes físicos o simulados que ejecutan las órdenes VDA5050 y reportan su estado cada 500ms.'
        : 'Physical or simulated agents that execute VDA5050 orders and report their status every 500ms.',
      tech: ['Python', 'BFS Navigation', 'Battery Model']
    }
  ];

  const layerIcons: Record<string, any> = { Monitor, Cpu, Radio, Server };

  // Flujo de datos
  const dataFlow = [
    { step: '01', icon: 'Database', title: isEs ? 'WMS / ERP' : 'WMS / ERP', desc: isEs ? 'Envía nueva orden de picking' : 'Sends new picking order' },
    { step: '02', icon: 'Cpu', title: 'FleetMind WES', desc: isEs ? 'Evalúa, asigna robot óptimo y genera ruta VDA5050' : 'Evaluates, assigns optimal robot, generates VDA5050 route' },
    { step: '03', icon: 'Radio', title: isEs ? 'Broker MQTT' : 'MQTT Broker', desc: isEs ? 'Transmite la orden de forma segura y en tiempo real' : 'Transmits order securely and in real-time' },
    { step: '04', icon: 'Network', title: isEs ? 'Robot AMR' : 'AMR Robot', desc: isEs ? 'Ejecuta, reporta estado y completa la tarea' : 'Executes, reports status, completes task' }
  ];

  const flowIcons: Record<string, any> = { Database, Cpu, Radio, Network };

  // Entornos
  const environments = [
    {
      icon: 'Layers',
      title: isEs ? 'Modo Análisis' : 'Analysis Mode',
      phase: isEs ? 'Antes de invertir' : 'Before investing',
      file: 'app.py',
      desc: isEs 
        ? 'Simula el almacén en modo puro (sin MQTT, sin robots externos) para responder preguntas estratégicas de negocio.'
        : 'Simulates warehouse in pure mode (no MQTT, no external robots) to answer strategic business questions.',
      features: isEs
        ? ['Motor What-If con 15+ escenarios', 'Cálculo de ROI y Capacity Planning', 'Detección de cuellos de botella', 'Modelado de degradación de baterías (SoH)']
        : ['What-If Engine with 15+ scenarios', 'ROI and Capacity Planning calculation', 'Bottleneck detection', 'Battery degradation modeling (SoH)']
    },
    {
      icon: 'Activity',
      title: isEs ? 'Modo Simulación Vivo' : 'Live Simulation Mode',
      phase: isEs ? 'Durante el desarrollo' : 'During development',
      file: 'app_unified.py',
      desc: isEs
        ? 'Conecta el Digital Twin con robots mock vía MQTT y muestra todo en tiempo real con animación a 60 FPS.'
        : 'Connects Digital Twin with mock robots via MQTT and shows everything in real-time with 60 FPS animation.',
      features: isEs
        ? ['Validación 100% del pipeline MQTT', 'Dashboard Streamlit con KPIs en vivo', 'Animación WebSocket a 60 FPS', 'Logs de ingeniería en tiempo real']
        : ['100% MQTT pipeline validation', 'Streamlit Dashboard with live KPIs', 'WebSocket animation at 60 FPS', 'Real-time engineering logs']
    },
    {
      icon: 'Zap',
      title: isEs ? 'Modo WES Real' : 'Real WES Mode',
      phase: isEs ? 'Producción' : 'Production',
      file: 'real/app_unified.py',
      desc: isEs
        ? 'Orquesta flotas de robots reales (o mocks VDA5050) usando el estándar industrial, sin depender de WarehouseSim.'
        : 'Orchestrates real robot fleets (or VDA5050 mocks) using industrial standard, without depending on WarehouseSim.',
      features: isEs
        ? ['VDA5050 v2.0.0 nativo', 'Descubrimiento Plug & Play de robots', 'Asignación multi-criterio en tiempo real', 'Trazabilidad de 6 etapas por paquete']
        : ['Native VDA5050 v2.0.0', 'Plug & Play robot discovery', 'Real-time multi-criteria assignment', '6-stage traceability per package']
    }
  ];

  const envIcons: Record<string, any> = { Layers, Activity, Zap };

  // Decisiones técnicas
  const techDecisions = [
    {
      icon: 'Shield',
      title: isEs ? 'RLock para Concurrencia' : 'RLock for Concurrency',
      desc: isEs 
        ? 'Usamos threading.RLock() en lugar de Lock() para evitar deadlocks por adquisición anidada de bloqueos en callbacks MQTT.'
        : 'We use threading.RLock() instead of Lock() to prevent deadlocks from nested lock acquisition in MQTT callbacks.',
      impact: isEs ? '0 deadlocks en producción' : '0 deadlocks in production'
    },
    {
      icon: 'GitBranch',
      title: isEs ? 'Colas Thread-Safe' : 'Thread-Safe Queues',
      desc: isEs
        ? 'Separación estricta entre producción (MQTT callbacks) y consumo (Streamlit) mediante queue.Queue() para evitar condiciones de carrera.'
        : 'Strict separation between production (MQTT callbacks) and consumption (Streamlit) via queue.Queue() to avoid race conditions.',
      impact: isEs ? 'UI 100% determinista' : '100% deterministic UI'
    },
    {
      icon: 'FileCode',
      title: isEs ? 'Servidor de Animación Desacoplado' : 'Decoupled Animation Server',
      desc: isEs
        ? 'HTTP (8766) + WebSocket (8765) independiente del ciclo de rerun de Streamlit. La animación nunca se reinicia.'
        : 'HTTP (8766) + WebSocket (8765) independent of Streamlit rerun cycle. Animation never restarts.',
      impact: isEs ? '60 FPS estables' : 'Stable 60 FPS'
    },
    {
      icon: 'Workflow',
      title: isEs ? 'VDA5050 Nativo' : 'Native VDA5050',
      desc: isEs
        ? 'Implementación completa del estándar industrial alemán con modelos tipados, QoS 1 y acciones instantáneas.'
        : 'Full implementation of German industrial standard with typed models, QoS 1, and instant actions.',
      impact: isEs ? 'Cero vendor lock-in' : 'Zero vendor lock-in'
    }
  ];

  const techIcons: Record<string, any> = { Shield, GitBranch, FileCode, Workflow };

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      
      {/* ============ HERO ============ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/95 to-zinc-950"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold mb-6">
            <Layers className="w-3 h-3" />
            {isEs ? 'ARQUITECTURA DEL SISTEMA' : 'SYSTEM ARCHITECTURE'}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            {isEs ? 'Ingeniería de Nivel Enterprise' : 'Enterprise-Grade Engineering'}
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            {isEs 
              ? 'Arquitectura de microservicios desacoplada en 4 capas, diseñada para escalar de 50 robots simulados a 10,000+ robots físicos.'
              : 'Decoupled microservices architecture in 4 layers, designed to scale from 50 simulated robots to 10,000+ physical robots.'}
          </p>
        </div>
      </section>

      {/* ============ ARQUITECTURA POR CAPAS ============ */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
              {isEs ? 'Arquitectura en 4 Capas' : '4-Layer Architecture'}
            </h2>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
              {isEs 
                ? 'Cada capa tiene responsabilidades claras y se comunica mediante contratos explícitos.'
                : 'Each layer has clear responsibilities and communicates through explicit contracts.'}
            </p>
          </div>

          {/* Selector de capas */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            {layers.map((layer, idx) => {
              const Icon = layerIcons[layer.icon];
              const isActive = activeLayer === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveLayer(idx)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    isActive 
                      ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-600/20' 
                      : 'bg-white border-zinc-200 text-zinc-900 hover:border-orange-300'
                  }`}
                >
                  <Icon className={`w-8 h-8 mb-3 ${isActive ? 'text-white' : 'text-orange-600'}`} />
                  <div className="text-xs font-mono font-bold opacity-70 mb-1">0{idx + 1}</div>
                  <div className="font-bold text-sm">{layer.title}</div>
                </button>
              );
            })}
          </div>

          {/* Detalle de capa activa */}
          <div className="bg-white rounded-3xl border border-zinc-200 p-8 md:p-12 shadow-sm">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <div className="text-xs font-mono text-orange-600 font-bold uppercase tracking-wider mb-2">
                  {isEs ? 'Capa Activa' : 'Active Layer'}
                </div>
                <h3 className="text-3xl font-bold text-zinc-900 mb-4">
                  {layers[activeLayer].title}
                </h3>
                <p className="text-lg text-zinc-600 leading-relaxed mb-6">
                  {layers[activeLayer].desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {layers[activeLayer].tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-zinc-100 border border-zinc-200 rounded-full text-xs font-mono font-semibold text-zinc-700">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200">
                <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">
                  {isEs ? 'Componentes Clave' : 'Key Components'}
                </div>
                <ul className="space-y-3">
                  {layers[activeLayer].components.map((comp, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-700 font-medium">{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FLUJO DE DATOS ============ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-mono font-semibold mb-6">
              <Workflow className="w-3 h-3" />
              {isEs ? 'FLUJO EN TIEMPO REAL' : 'REAL-TIME FLOW'}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
              {isEs ? 'Cierre del Bucle Ciberfísico' : 'Cyber-Physical Loop Closure'}
            </h2>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
              {isEs 
                ? 'Percepción → Comunicación → Decisión → Actuación → Retroalimentación'
                : 'Perception → Communication → Decision → Actuation → Feedback'}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {dataFlow.map((flow, idx) => {
              const Icon = flowIcons[flow.icon];
              return (
                <div key={idx} className="relative">
                  <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
                    <div className="text-5xl font-bold text-zinc-200 mb-4">{flow.step}</div>
                    <Icon className="w-8 h-8 text-orange-600 mb-3" />
                    <h3 className="text-lg font-bold text-zinc-900 mb-2">{flow.title}</h3>
                    <p className="text-sm text-zinc-600 leading-relaxed">{flow.desc}</p>
                  </div>
                  {idx < 3 && (
                    <ArrowRight className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-orange-500 -translate-y-1/2 z-10" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ LOS 3 ENTORNOS ============ */}
      <section className="py-24 bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              {isEs ? '3 Entornos de Ejecución' : '3 Execution Environments'}
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              {isEs 
                ? 'Cada entorno corresponde a una fase del ciclo de vida del proyecto.'
                : 'Each environment corresponds to a phase of the project lifecycle.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {environments.map((env, idx) => {
              const Icon = envIcons[env.icon];
              return (
                <div key={idx} className="group bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-8 border border-zinc-700 hover:border-orange-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-orange-400" />
                    </div>
                    <span className="text-xs font-mono text-zinc-500">{env.file}</span>
                  </div>
                  
                  <div className="inline-block px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full text-xs font-bold text-orange-400 mb-4">
                    {env.phase}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{env.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">{env.desc}</p>
                  
                  <ul className="space-y-2">
                    {env.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-zinc-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ DECISIONES TÉCNICAS ============ */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200 border border-zinc-300 text-zinc-700 text-xs font-mono font-semibold mb-6">
              <FileCode className="w-3 h-3" />
              {isEs ? 'DECISIONES DE INGENIERÍA' : 'ENGINEERING DECISIONS'}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
              {isEs ? 'Retos Técnicos Superados' : 'Technical Challenges Overcome'}
            </h2>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
              {isEs 
                ? 'Problemas reales de ingeniería concurrente resueltos durante el desarrollo.'
                : 'Real concurrent engineering problems solved during development.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {techDecisions.map((decision, idx) => {
              const Icon = techIcons[decision.icon];
              return (
                <div key={idx} className="group bg-white rounded-2xl p-8 border border-zinc-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl border border-orange-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900 mb-1">{decision.title}</h3>
                      <div className="inline-block px-2 py-0.5 bg-emerald-100 border border-emerald-200 rounded text-xs font-bold text-emerald-700">
                        {decision.impact}
                      </div>
                    </div>
                  </div>
                  <p className="text-zinc-600 leading-relaxed text-sm">{decision.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ MODELO DE DATOS ============ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
              {isEs ? 'Modelo de Datos' : 'Data Model'}
            </h2>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
              {isEs 
                ? 'Entidades independientes de la UI, serializables y testeables.'
                : 'UI-independent entities, serializable and testable.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'RobotState', fields: isEs ? ['id', 'pos', 'battery', 'SoH', 'charging', 'driving', 'carrying'] : ['id', 'pos', 'battery', 'SoH', 'charging', 'driving', 'carrying'], module: 'fleet_manager' },
              { name: 'Order', fields: isEs ? ['order_id', 'package_id', 'priority', 'sla_deadline', 'status', 'robot_id'] : ['order_id', 'package_id', 'priority', 'sla_deadline', 'status', 'robot_id'], module: 'order_manager' },
              { name: 'Package', fields: isEs ? ['package_id', 'status', 'location', 'robot_id', 'history[]'] : ['package_id', 'status', 'location', 'robot_id', 'history[]'], module: 'package_tracker' },
              { name: 'WarehouseMap', fields: isEs ? ['rows', 'cols', 'grid', 'packing_stations', 'charging_stations'] : ['rows', 'cols', 'grid', 'packing_stations', 'charging_stations'], module: 'fleet_manager' },
              { name: 'VDA5050Header', fields: isEs ? ['headerId', 'timestamp', 'version', 'manufacturer', 'serialNumber'] : ['headerId', 'timestamp', 'version', 'manufacturer', 'serialNumber'], module: 'vda5050_client' },
              { name: 'Node / Edge', fields: isEs ? ['nodeId', 'sequenceId', 'x', 'y', 'theta', 'actions[]'] : ['nodeId', 'sequenceId', 'x', 'y', 'theta', 'actions[]'], module: 'vda5050_client' }
            ].map((entity, idx) => (
              <div key={idx} className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200 hover:border-orange-300 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-zinc-900 font-mono">{entity.name}</h3>
                  <span className="text-xs font-mono text-zinc-500 bg-zinc-200 px-2 py-1 rounded">{entity.module}</span>
                </div>
                <div className="space-y-1.5">
                  {entity.fields.map((field, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                      <span className="text-zinc-700 font-mono text-xs">{field}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="py-24 bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {isEs ? '¿Quieres ver el código?' : 'Want to see the code?'}
          </h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            {isEs 
              ? 'Explora la arquitectura completa en GitHub o agenda una demo técnica personalizada.'
              : 'Explore the complete architecture on GitHub or schedule a custom technical demo.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://github.com/victorcamacaro253/fleetmind" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold transition-all hover:shadow-[0_0_30px_-5px_rgba(234,88,12,0.5)]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              {isEs ? 'Ver en GitHub' : 'View on GitHub'}
            </a>
            <Link 
              to="/simulation" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 rounded-xl font-semibold transition-all"
            >
              <Zap className="w-4 h-4" />
              {isEs ? 'Ver Simulación en Vivo' : 'View Live Simulation'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Architecture;