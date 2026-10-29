import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/languageContext';
import {
  ShoppingCart,
  Pill,
  Package,
  Factory,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Shield,
  Zap,
  Clock,
  Building
} from 'lucide-react';

const Industries = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};
  const isEs = language === 'es';

  const industriesData = [
    {
      id: 'ecommerce',
      icon: ShoppingCart,
      color: 'orange',
      title: isEs ? 'E-commerce y Retail' : 'E-commerce & Retail',
      challenge: isEs 
        ? 'Picos de demanda impredecibles (Black Friday), miles de SKUs y expectativas de entrega same-day o next-day.'
        : 'Unpredictable demand spikes (Black Friday), massive SKUs, and same-day or next-day delivery expectations.',
      solution: [
        isEs ? 'Motor What-If para dimensionar la flota y muelles antes de picos estacionales.' : 'What-If Engine to size fleet and docks before seasonal peaks.',
        isEs ? 'SLA Tiers configurables para priorizar clientes premium (PRIME_NOW).' : 'Configurable SLA Tiers to prioritize premium customers (PRIME_NOW).',
        isEs ? 'Escalado elástico de flota: agrega o retira robots según la demanda en tiempo real.' : 'Elastic fleet scaling: add or remove robots based on real-time demand.'
      ],
      metric: { value: '2x', label: isEs ? 'Mejora en UPH durante picos' : 'UPH improvement during peaks' }
    },
    {
      id: 'pharma',
      icon: Pill,
      color: 'emerald',
      title: isEs ? 'Farmacéutica y Salud' : 'Pharmaceutical & Healthcare',
      challenge: isEs 
        ? 'Cumplimiento normativo estricto (FDA), trazabilidad obligatoria y manejo de productos sensibles a temperatura.'
        : 'Strict regulatory compliance (FDA), mandatory traceability, and handling of temperature-sensitive products.',
      solution: [
        isEs ? 'PackageTracker con historial inmutable de eventos para auditorías regulatorias.' : 'PackageTracker with immutable event history for regulatory audits.',
        isEs ? 'Priorización automática y enrutamiento preferencial para productos refrigerados.' : 'Automatic prioritization and preferential routing for refrigerated products.',
        isEs ? 'Trazabilidad 100% de cada paquete desde el inbound hasta el outbound.' : '100% traceability of every package from inbound to outbound.'
      ],
      metric: { value: '100%', label: isEs ? 'Trazabilidad auditable' : 'Auditable traceability' }
    },
    {
      id: '3pl',
      icon: Package,
      color: 'blue',
      title: isEs ? '3PL (Logística Tercerizada)' : '3PL (Third-Party Logistics)',
      challenge: isEs 
        ? 'Múltiples clientes con SLAs diferentes, flotas mixtas de robots y necesidad de flexibilidad operativa total.'
        : 'Multiple clients with different SLAs, mixed robot fleets, and the need for total operational flexibility.',
      solution: [
        isEs ? 'Agnosticismo total: orquesta robots de diferentes fabricantes para cada cliente.' : 'Total agnosticism: orchestrates robots from different manufacturers for each client.',
        isEs ? 'Configuración de SLA Tiers y reglas de negocio independientes por cliente.' : 'Independent SLA Tiers and business rules configuration per client.',
        isEs ? 'Motor What-If para proponer capacidad y ROI a nuevos clientes potenciales.' : 'What-If Engine to propose capacity and ROI to new potential clients.'
      ],
      metric: { value: '0', label: isEs ? 'Vendor Lock-in' : 'Vendor Lock-in' }
    },
    {
      id: 'manufacturing',
      icon: Factory,
      color: 'zinc',
      title: isEs ? 'Manufactura' : 'Manufacturing',
      challenge: isEs 
        ? 'Movimiento de materiales entre líneas de producción, sincronización just-in-time y cero tolerancia a paradas.'
        : 'Material movement between production lines, just-in-time synchronization, and zero tolerance for downtime.',
      solution: [
        isEs ? 'Transporte punto a punto flexible sin rutas fijas predefinidas.' : 'Flexible point-to-point transport without predefined fixed routes.',
        isEs ? 'Integración nativa con sistemas MES/ERP existentes para sincronización de producción.' : 'Native integration with existing MES/ERP systems for production sync.',
        isEs ? 'Priorización dinámica de materiales críticos para evitar paradas en líneas de producción.' : 'Dynamic prioritization of critical materials to prevent production line stoppages.'
      ],
      metric: { value: '0', label: isEs ? 'Tiempos muertos por falta de material' : 'Downtime due to material shortage' }
    }
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      
      {/* ============ HERO DE LA PÁGINA ============ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-zinc-950 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-mono font-semibold mb-6">
            <Building className="w-3 h-3" />
            {isEs ? 'SECTORES OBJETIVO' : 'TARGET INDUSTRIES'}
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            {isEs ? 'Diseñado para tu Industria' : 'Built for Your Industry'}
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-10">
            {isEs 
              ? 'Soluciones adaptadas a los desafíos regulatorios, operativos y de escalabilidad de cada sector. FleetMind no es una talla única; es una plataforma que se moldea a tu realidad.'
              : 'Solutions tailored to the regulatory, operational, and scalability challenges of every sector. FleetMind is not one-size-fits-all; it is a platform that molds to your reality.'}
          </p>
        </div>
      </section>

      {/* ============ SECCIONES DE INDUSTRIAS ============ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {industriesData.map((industry, idx) => {
          const Icon = industry.icon;
          const isEven = idx % 2 === 0;
          
          // Colores dinámicos basados en la industria
          const colorClasses = {
            orange: 'bg-orange-50 text-orange-600 border-orange-200',
            emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
            blue: 'bg-blue-50 text-blue-600 border-blue-200',
            zinc: 'bg-zinc-100 text-zinc-700 border-zinc-300'
          };
          const theme = colorClasses[industry.color as keyof typeof colorClasses] || colorClasses.orange;

          return (
            <div key={industry.id} className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
              
              {/* Columna de Contenido */}
              <div className={isEven ? 'order-2 lg:order-1' : 'order-2'}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 text-xs font-bold uppercase tracking-wider mb-4">
                  <Icon className="w-3 h-3" />
                  {industry.title}
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6 leading-tight">
                  {isEs ? 'El Desafío' : 'The Challenge'}
                </h2>
                <p className="text-lg text-zinc-600 leading-relaxed mb-8">
                  {industry.challenge}
                </p>

                <h3 className="text-xl font-bold text-zinc-900 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-500" />
                  {isEs ? 'La Solución FleetMind' : 'The FleetMind Solution'}
                </h3>
                <ul className="space-y-4 mb-8">
                  {industry.solution.map((sol, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-700 leading-relaxed">{sol}</span>
                    </li>
                  ))}
                </ul>

                <div className={`inline-flex items-center gap-4 p-4 rounded-xl border ${theme}`}>
                  <div className="text-3xl font-bold">{industry.metric.value}</div>
                  <div className="text-sm font-medium leading-tight">{industry.metric.label}</div>
                </div>
              </div>

              {/* Columna Visual / Decorativa */}
              <div className={isEven ? 'order-1 lg:order-2' : 'order-1'}>
                <div className="relative bg-zinc-50 rounded-3xl p-8 md:p-12 border border-zinc-200 overflow-hidden group hover:border-orange-300 transition-all duration-500">
                  <div className={`absolute top-0 right-0 w-64 h-64 ${industry.color === 'orange' ? 'bg-orange-500/10' : industry.color === 'emerald' ? 'bg-emerald-500/10' : industry.color === 'blue' ? 'bg-blue-500/10' : 'bg-zinc-500/10'} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700`}></div>
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className={`w-24 h-24 rounded-3xl border-2 ${theme.split(' ')[2]} flex items-center justify-center mb-6 bg-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-12 h-12 ${theme.split(' ')[1]}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 mb-3">{industry.title}</h3>
                    <p className="text-zinc-500 max-w-sm">
                      {isEs 
                        ? 'Arquitectura flexible que se adapta a tus flujos de trabajo específicos sin requerir cambios en el código base.'
                        : 'Flexible architecture that adapts to your specific workflows without requiring changes to the codebase.'}
                    </p>
                    
                    {/* Decoración de "código" o datos */}
                    <div className="mt-8 w-full bg-zinc-900 rounded-xl p-4 text-left font-mono text-xs text-zinc-400 shadow-inner">
                      <div className="flex gap-1.5 mb-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                      </div>
                      <p><span className="text-orange-400">const</span> <span className="text-blue-400">industryConfig</span> = {'{'}</p>
                      <p className="pl-4">sector: <span className="text-emerald-400">"{industry.id}"</span>,</p>
                      <p className="pl-4">slaCompliance: <span className="text-orange-400">0.999</span>,</p>
                      <p className="pl-4">hardwareAgnostic: <span className="text-orange-400">true</span>,</p>
                      <p className="pl-4">whatIfEnabled: <span className="text-orange-400">true</span></p>
                      <p>{'};'}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* ============ CTA FINAL DE LA PÁGINA ============ */}
      <section className="py-24 bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {isEs ? '¿Listo para transformar tu operación?' : 'Ready to transform your operation?'}
          </h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            {isEs 
              ? 'Descubre cómo FleetMind puede adaptarse a los desafíos específicos de tu industria. Agenda una demo personalizada.'
              : 'Discover how FleetMind can adapt to the specific challenges of your industry. Schedule a custom demo.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/simulation"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold transition-all hover:shadow-[0_0_30px_-5px_rgba(234,88,12,0.5)]"
            >
              <Zap className="w-5 h-5" />
              {isEs ? 'Ver Simulación en Vivo' : 'View Live Simulation'}
            </Link>
            <a
              href="mailto:victorcamacaro253@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 rounded-xl font-semibold transition-all"
            >
              {isEs ? 'Contactar Ventas' : 'Contact Sales'}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Industries;