import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/languageContext';
import { ArrowRight, Zap, Activity, Shield, Play } from 'lucide-react';

const Hero = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      
      {/* ============ 1. IMAGEN O VIDEO DE FONDO ============ */}
      {/* Opción A: Imagen de fondo (Recomendada por rendimiento) */}
      <img
        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
        alt="Automated Warehouse"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105"
      />
      
      {/* Opción B: Video de fondo (Descomenta esto si tienes un video corto .mp4) */}
      {/* 
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover object-center scale-105"
      >
        <source src="/videos/warehouse-robot-loop.mp4" type="video/mp4" />
      </video> 
      */}

      {/* ============ 2. OVERLAY DEGRADADO (Para legibilidad) ============ */}
      {/* Degradado oscuro de izquierda a derecha: más oscuro donde está el texto, más transparente a la derecha para ver la imagen */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40"></div>
      
      {/* Efecto de brillo naranja sutil en la parte superior */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* ============ 3. CONTENIDO ============ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Columna Izquierda: Texto y CTAs */}
          <div className="text-center lg:text-left">
            {/* Badge técnico */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold mb-8 tracking-wide backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5" />
              {data.hero?.badge || 'VDA5050 v2.0.0 · HARDWARE AGNOSTIC'}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              {data.hero?.title || 'El Cerebro que'}
              <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                {data.hero?.highlight || 'Orquesta tu Flota'}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {data.hero?.subtitle || 'Warehouse Execution System y Gemelo Digital para Logística 4.0. Simula, valida y orquesta sin vendor lock-in.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link
                to="/simulation"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold transition-all hover:shadow-[0_0_40px_-10px_rgba(234,88,12,0.6)]"
              >
                {data.hero?.ctaPrimary || 'Ver Simulación en Vivo'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/architecture"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-semibold transition-all backdrop-blur-sm hover:border-orange-500/30"
              >
                <Play className="w-4 h-4 fill-white" />
                {data.hero?.ctaSecondary || 'Explorar Arquitectura'}
              </Link>
            </div>

            {/* Indicadores de confianza */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>99.9% SLA Compliance</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-orange-400" />
                <span>268 paq/h Throughput</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Mockup del Dashboard (Opcional, pero recomendado) */}
          <div className="relative hidden lg:block">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-20 animate-pulse"></div>
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
              {/* Barra superior del mockup */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/50 bg-slate-950/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs font-mono text-slate-500">fleetmind-dashboard.local</span>
                </div>
              </div>
              
              {/* Contenido simulado del dashboard */}
              <div className="p-6 grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-4 h-4 text-orange-400" />
                      <span className="text-xs font-mono text-slate-400">LIVE THROUGHPUT</span>
                    </div>
                    <div className="text-3xl font-bold text-white">268 <span className="text-sm text-slate-500 font-normal">paq/h</span></div>
                  </div>
                  <div className="h-10 w-24 bg-orange-500/10 rounded-lg flex items-end gap-1 p-1">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <div key={i} className="flex-1 bg-orange-500 rounded-sm" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono text-slate-400">SLA</span>
                  </div>
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-xs text-emerald-400 mt-1">On-time delivery</div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono text-slate-400">FLEET</span>
                  </div>
                  <div className="text-2xl font-bold text-white">15/15</div>
                  <div className="text-xs text-slate-400 mt-1">Robots active</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;