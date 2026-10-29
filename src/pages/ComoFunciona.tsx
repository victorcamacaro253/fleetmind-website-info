import { useContext, useState } from 'react';
import { LanguageContext } from '../context/languageContext';
import { Link } from 'react-router-dom';
import {
  Package,
  Hexagon,
  Brain,
  Calculator,
  Truck,
  BatteryWarning,
  Zap,
  AlertTriangle,
  Layers,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Leaf
} from 'lucide-react';

const ComoFunciona = () => {
  const { language } = useContext(LanguageContext);
  // Puedes agregar estas claves a tu texts.json más tarde, por ahora usamos fallbacks en español
  const isEs = language === 'es';

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const steps = [
    {
      icon: Package,
      title: isEs ? '1. Llega el Pedido' : '1. Order Arrives',
      desc: isEs 
        ? 'Un cliente realiza una compra. El sistema recibe la ubicación, el peso del paquete y la ventana de tiempo de entrega (ej. Prime Now: 2 horas).' 
        : 'A customer places an order. The system receives the location, package weight, and delivery time window (e.g., Prime Now: 2 hours).',
      color: 'blue'
    },
    {
      icon: Hexagon,
      title: isEs ? '2. Asignación Geoespacial' : '2. Geospatial Assignment',
      desc: isEs
        ? 'El algoritmo H3 de Uber divide la ciudad en hexágonos perfectos. El pedido se asigna instantáneamente al depósito más cercano, sin huecos ni superposiciones.'
        : 'Uber\'s H3 algorithm divides the city into perfect hexagons. The order is instantly assigned to the nearest depot, with no gaps or overlaps.',
      color: 'cyan'
    },
    {
      icon: Brain,
      title: isEs ? '3. Predicción de Tráfico' : '3. Traffic Prediction',
      desc: isEs
        ? 'Un modelo de Machine Learning (Random Forest) analiza la hora del día, el clima y eventos locales para predecir el tiempo real de viaje entre cada punto.'
        : 'A Machine Learning model (Random Forest) analyzes time of day, weather, and local events to predict real travel time between each point.',
      color: 'purple'
    },
    {
      icon: Calculator,
      title: isEs ? '4. Optimización de Ruta' : '4. Route Optimization',
      desc: isEs
        ? 'OR-Tools calcula la secuencia matemática perfecta de entregas, agrupando pedidos cercanos (Batch Picking) y respetando estrictamente la batería de los vehículos eléctricos.'
        : 'OR-Tools calculates the perfect mathematical sequence of deliveries, grouping nearby orders (Batch Picking) and strictly respecting EV battery limits.',
      color: 'orange'
    },
    {
      icon: Truck,
      title: isEs ? '5. Entrega Exitosa' : '5. Successful Delivery',
      desc: isEs
        ? 'El conductor sigue una ruta clara y optimizada. Si surge un imprevisto, el sistema recalcula en segundos. El paquete llega a tiempo y con cero emisiones.'
        : 'The driver follows a clear, optimized route. If an issue arises, the system recalculates in seconds. The package arrives on time with zero emissions.',
      color: 'green'
    }
  ];

  const faqs = [
    {
      question: isEs ? '¿Qué pasa si un vehículo eléctrico se queda sin batería?' : 'What happens if an EV runs out of battery?',
      answer: isEs 
        ? 'Nuestro sistema de OR-Tools incluye restricciones estrictas de autonomía. Nunca asigna una ruta que supere el límite de la batería (ej. 240 km para Rivian EDV). Si la carga es alta, asigna automáticamente la ruta a un vehículo de combustión de respaldo.'
        : 'Our OR-Tools system includes strict autonomy constraints. It never assigns a route exceeding the battery limit (e.g., 240 km for Rivian EDV). If the load is high, it automatically assigns the route to a backup combustion vehicle.',
      icon: BatteryWarning
    },
    {
      question: isEs ? '¿Cómo se manejan los pedidos urgentes (Prime Now)?' : 'How are urgent orders (Prime Now) handled?',
      answer: isEs
        ? 'Utilizamos un agente de Refuerzo (Q-Learning) que actúa como un despachador inteligente en tiempo real. Evalúa en milisegundos si es más eficiente insertar el pedido en una ruta existente, asignar un vehículo nuevo o esperar a que pase un conductor cercano.'
        : 'We use a Reinforcement agent (Q-Learning) that acts as a smart real-time dispatcher. It evaluates in milliseconds whether it is more efficient to insert the order into an existing route, assign a new vehicle, or wait for a nearby driver to pass.',
      icon: Zap
    },
    {
      question: isEs ? '¿Qué pasa si una calle se cierra por un accidente?' : 'What happens if a street is closed due to an accident?',
      answer: isEs
        ? 'El sistema detecta el incidente y filtra automáticamente qué vehículos y pedidos se ven afectados. En menos de un minuto, recalcula la ruta óptima desde la posición actual del conductor, evitando la zona bloqueada sin perder la ventana de entrega.'
        : 'The system detects the incident and automatically filters which vehicles and orders are affected. In under a minute, it recalculates the optimal route from the driver\'s current position, avoiding the blocked zone without missing the delivery window.',
      icon: AlertTriangle
    },
    {
      question: isEs ? '¿Cómo se agrupan los pedidos para reducir viajes?' : 'How are orders grouped to reduce trips?',
      answer: isEs
        ? 'Mediante una técnica llamada "Batch Picking". El algoritmo identifica pedidos con ventanas de tiempo compatibles y ubicaciones cercanas (mismo hexágono H3), consolidando 3 o 4 entregas en un solo viaje, reduciendo los viajes duplicados en un 47%.'
        : 'Through a technique called "Batch Picking". The algorithm identifies orders with compatible time windows and nearby locations (same H3 hexagon), consolidating 3 or 4 deliveries into a single trip, reducing duplicate trips by 47%.',
      icon: Layers
    },
    {
    question: isEs ? '¿Cómo se mide el impacto ambiental de las entregas?' : 'How is the environmental impact of deliveries measured?',
    answer: isEs
      ? 'El sistema calcula en tiempo real el CO₂ evitado al usar vehículos eléctricos (Rivian EDV) en lugar de combustión (Ford Transit). Cada simulación evita ~100 kg de CO₂ y genera reportes auditables para cumplir con el Climate Pledge de Amazon.'
      : 'The system calculates in real-time the CO₂ avoided by using electric vehicles (Rivian EDV) instead of combustion (Ford Transit). Each simulation avoids ~100 kg of CO₂ and generates auditable reports to comply with Amazon\'s Climate Pledge.',
    icon: Leaf
  },
  
  {
    question: isEs ? '¿Cómo sabe el sistema a qué depósito debe ir cada pedido?' : 'How does the system know which depot each order should go to?',
    answer: isEs
      ? 'Usamos H3, el sistema de indexación hexagonal de Uber. Divide Los Ángeles en 190 hexágonos perfectos (19 por cada uno de los 10 depósitos). Cuando llega un pedido, se asigna al hexágono correspondiente en milisegundos, sin huecos ni superposiciones.'
      : 'We use H3, Uber\'s hexagonal indexing system. It divides Los Angeles into 190 perfect hexagons (19 per each of the 10 depots). When an order arrives, it\'s assigned to the corresponding hexagon in milliseconds, with no gaps or overlaps.',
    icon: Hexagon
  }
  ];

  const timelineEvents = [
    { time: '08:00 AM', title: isEs ? 'Pedido Recibido' : 'Order Received', desc: isEs ? 'Cliente solicita entrega Prime Now en West LA.' : 'Customer requests Prime Now delivery in West LA.', icon: Package },
    { time: '08:02 AM', title: isEs ? 'Asignación Inteligente' : 'Smart Assignment', desc: isEs ? 'El sistema asigna el pedido al depósito DLX9 y lo agrupa con 2 pedidos vecinos.' : 'System assigns order to depot DLX9 and groups it with 2 nearby orders.', icon: Hexagon },
    { time: '08:05 AM', title: isEs ? 'Ruta Optimizada' : 'Route Optimized', desc: isEs ? 'OR-Tools genera la secuencia perfecta evitando el tráfico de la I-10.' : 'OR-Tools generates the perfect sequence, avoiding I-10 traffic.', icon: Calculator },
    { time: '09:30 AM', title: isEs ? 'Entrega Exitosa' : 'Successful Delivery', desc: isEs ? 'El conductor entrega los 3 paquetes en una sola parada, 30 min antes de lo prometido.' : 'Driver delivers all 3 packages in one stop, 30 mins ahead of schedule.', icon: Truck },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      
      {/* ============ HERO ============ */}
      <section className="relative py-24 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-semibold mb-6">
            <Brain className="w-4 h-4" />
            {isEs ? 'Tecnología Explicada Simple' : 'Technology Explained Simply'}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {isEs ? 'De tu clic a tu puerta,' : 'From your click to your door,'}
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
              {isEs ? 'en 5 pasos inteligentes.' : 'in 5 smart steps.'}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {isEs 
              ? 'Sin tecnicismos complejos. Así es como nuestra IA transforma el caos de la última milla en una operación predecible, rápida y sostenible.' 
              : 'No complex jargon. This is how our AI transforms last-mile chaos into a predictable, fast, and sustainable operation.'}
          </p>
        </div>
      </section>

      {/* ============ 5 PASOS VISUALES ============ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {/* Línea conectora (Desktop) */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-cyan-200 via-purple-200 via-orange-200 to-green-200 z-0"></div>

            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className={`w-20 h-20 bg-white border-4 border-${step.color}-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:border-${step.color}-400 transition-all duration-300`}>
                  <step.icon className={`w-8 h-8 text-${step.color}-600`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ UN DÍA EN LA VIDA DE UN PAQUETE ============ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isEs ? 'Un Día en la Vida de un Paquete' : 'A Day in the Life of a Package'}
            </h2>
            <p className="text-xl text-gray-600">
              {isEs ? 'Sigue el viaje desde que se realiza el pedido hasta que llega a tus manos.' : 'Follow the journey from order placement to your doorstep.'}
            </p>
          </div>

          <div className="relative">
            {/* Línea vertical del timeline */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2"></div>

            <div className="space-y-12">
              {timelineEvents.map((event, idx) => (
                <div key={idx} className={`relative flex flex-col md:flex-row gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Punto en la línea */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-md -translate-x-1/2 mt-6 z-10"></div>
                  
                  {/* Contenido */}
                  <div className="flex-1 md:text-right md:pr-12 pl-20 md:pl-0">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-2 md:justify-end">
                        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{event.time}</span>
                        <event.icon className="w-5 h-5 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600">{event.desc}</p>
                    </div>
                  </div>
                  
                  {/* Espaciador para el otro lado */}
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {isEs ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-xl text-gray-600">
              {isEs ? 'Resolvemos las dudas más comunes sobre la operación en tiempo real.' : 'Answering the most common questions about real-time operations.'}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden hover:border-blue-300 transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <faq.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  </div>
                  {openFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-2">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '30px 30px' }}></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {isEs ? '¿Quieres verlo en acción?' : 'Want to see it in action?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {isEs ? 'Prueba el simulador interactivo y observa cómo la IA toma decisiones en tiempo real.' : 'Try the interactive simulator and watch how AI makes real-time decisions.'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/simulation"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold hover:scale-105 transition-all shadow-xl"
            >
              {isEs ? 'Abrir Simulador' : 'Open Simulator'}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/ai-engine"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-800/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-blue-800/30 transition-all"
            >
              {isEs ? 'Ver Detalles Técnicos' : 'View Technical Details'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComoFunciona;