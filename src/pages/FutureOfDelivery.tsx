import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/languageContext';
import {
  Route, Battery, Zap, Hexagon, Package, AlertTriangle, Leaf,
  Building, Truck, CheckCircle2, ArrowRight, Sparkles,
  Target, TrendingDown, Clock, DollarSign, Gauge
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Route, Battery, Zap, Hexagon, Package, AlertTriangle, Leaf,
  Building, Truck, CheckCircle2, ArrowRight, Sparkles,
  Target, TrendingDown, Clock, DollarSign, Gauge
};

const FutureOfDelivery = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.deliveryOptimizer?.[language] || texts?.deliveryOptimizer?.es || {};

  const getIcon = (name: string) => iconMap[name] || Package;

  const getColorBg = (color: string) => {
  const map: Record<string, { bg: string; text: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    red: { bg: 'bg-red-100', text: 'text-red-600' }
  };
  return map[color] || map.blue;
};

  const getBorderHover = (color: string) => {
    const map: Record<string, string> = {
      blue: 'hover:border-blue-400',
      cyan: 'hover:border-cyan-400',
      orange: 'hover:border-orange-400',
      green: 'hover:border-green-400',
      emerald: 'hover:border-emerald-400',
      purple: 'hover:border-purple-400',
      red: 'hover:border-red-400'
    };
    return map[color] || map.blue;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      
      {/* ============ HERO NARRATIVO ============ */}
<section className="relative py-32 overflow-hidden">
  
  {/* ============ IMAGEN DE FONDO ============ */}
  <img 
    src="images/delivery-1.webp"
    alt="Logística de última milla"
    loading="eager"
    fetchPriority="high"
    className="absolute inset-0 w-full h-full object-cover object-center"
  />

  {/* ============ DEGRADADO SUPERPUESTO (OVERLAY) ============ */}
  {/* Degrada de blanco sólido (centro/izquierda) a blanco semitransparente (derecha) */}
  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 to-white/60"></div>
  
  {/* Blur sutil para que la imagen no compita con el texto */}
  <div className="absolute inset-0 backdrop-blur-[1px]"></div>

  {/* ============ DECORACIONES DE COLOR ============ */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
  <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
  
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-semibold mb-6">
      <Sparkles className="w-4 h-4" />
      {data.futureTitle}
    </div>
    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
      {data.futureTitle}
      <br />
      <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
        {data.futureSubtitle}
      </span>
    </h1>
    <p className="text-xl font-medium text-gray-800 max-w-3xl mx-auto mb-8">
      {data.futureIntro}
    </p>
  </div>
</section>

      {/* ============ PREGUNTAS CLAVE ============ */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {(data.futureIntroQuestions || []).map((item: { question: string; answer: string }, idx: number) => {
              const Icon = getIcon('AlertTriangle');
              return (
                <div key={idx} className="flex items-start gap-4 bg-gray-50 p-5 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                  <div className="flex-shrink-0 mt-1">
                    <Icon className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1.5">{item.question}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.answer.split(/(Machine Learning|E-VRP|OR-Tools|Q-Learning)/i).map((part: string, i: number) => 
                        /Machine Learning|E-VRP|OR-Tools|Q-Learning/i.test(part) ? (
                          <span key={i} className="font-semibold text-blue-700">{part}</span>
                        ) : (
                          part
                        )
                      )}
                    </p>
                  </div>
                </div>
                
              );
            })}
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 max-w-3xl mx-auto text-center">
            <p className="text-lg text-blue-900 font-medium">
              {data.futureIntroConclusion}
            </p>
          </div>
        </div>
      </section>
      {/* ============ 7 PROBLEMAS DETALLADOS ============ */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4">{data.futureProblemsTitle}</h2>
          </div>

          <div className="space-y-6 md:space-y-8">
            {(data.futureProblems || []).map((problem: any, idx: number) => {
              const Icon = getIcon(problem.icon);
              return (
                <div key={idx} className={`group bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-10 border border-gray-200 ${getBorderHover(problem.color)} transition-all duration-300 hover:shadow-xl`}>
                  <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                    {/* Icono - se reduce en móvil */}
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center flex-shrink-0 ${getColorBg(problem.color)} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {/* Título más pequeño en móvil */}
                      <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">{problem.title}</h3>
                      
                      <div className="space-y-4 md:space-y-6">
                        {/* Situación Actual */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                          <div className="flex-shrink-0 text-xs font-bold text-red-600 uppercase tracking-wider">
                            {data.problemSituation || 'Situación Actual'}
                          </div>
                          <p className="text-sm md:text-base text-gray-700 leading-relaxed flex-1">{problem.situation}</p>
                        </div>

                        {/* Nuestra Solución */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                          <div className="flex-shrink-0 text-xs font-bold text-blue-600 uppercase tracking-wider">
                            {data.problemSolution || 'Nuestra Solución'}
                          </div>
                          <p className="text-sm md:text-base text-gray-700 leading-relaxed flex-1">{problem.solution}</p>
                        </div>

                        {/* Beneficio */}
                        <div className={`mt-4 md:mt-6 p-4 md:p-5 rounded-xl border ${getColorBg(problem.color).bg.replace('100', '50')} border-${problem.color}-100`}>
                          <div className="flex items-start gap-2 md:gap-3">
                            <CheckCircle2 className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5 ${getColorBg(problem.color).text}`} />
                            <div className="flex-1 min-w-0">
                              <span className={`text-xs font-bold uppercase tracking-wider ${getColorBg(problem.color).text}`}>
                                {data.problemBenefit || 'Beneficio'}:
                              </span>
                              <p className={`text-sm font-semibold mt-1 leading-relaxed ${getColorBg(problem.color).text}`}>
                                {problem.benefit}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ IMPACTO EN NÚMEROS ============ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{data.futureImpactTitle}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data.futureImpactMetrics || []).map((metric: any, idx: number) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-400 transition-all duration-300 group shadow-sm hover:shadow-lg">
                <div className="text-4xl font-bold text-blue-600 mb-3 group-hover:scale-110 transition-transform inline-block">
                  {metric.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{metric.label}</div>
                <div className="text-sm text-gray-600">{metric.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ¿POR QUÉ IMPORTA? ============ */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{data.futureWhyTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{data.futureWhySubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(data.futureWhySections || []).map((section: any, idx: number) => {
              const Icon = getIcon(section.icon);
              return (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${getColorBg(section.color)}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                  <ul className="space-y-3 text-gray-600 text-sm">
                    {section.items.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ VISIÓN DEL FUTURO ============ */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '30px 30px' }}></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              {data.futureVisionTitle}
            </div>
            <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              {data.futureVisionText}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6">{data.futureVisionImagining}</h3>
            <ul className="space-y-4 mb-8">
              {(data.futureVisionPoints || []).map((point: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-white">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg">{point}</span>
                </li>
              ))}
            </ul>
            <p className="text-xl text-white font-semibold text-center pt-6 border-t border-white/20">
              {data.futureVisionConclusion}
            </p>
          </div>
        </div>
      </section>

      {/* ============ ¿CÓMO EMPEZAR? ============ */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{data.futureCtaTitle}</h2>
            <p className="text-xl text-gray-600">{data.futureCtaSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {(data.futureCtaSteps || []).map((step: string, idx: number) => (
              <div key={idx} className="flex items-start gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-200 hover:border-blue-400 transition-all">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0">
                  {idx + 1}
                </div>
                <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center mb-12">
            <p className="text-lg text-blue-900 font-medium">
              {data.futureCtaNote}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/simulation"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-600/30"
            >
              {data.futureCtaButton1}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/architecture"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-900 rounded-xl font-semibold transition-all"
            >
              {data.futureCtaButton2}
            </Link>
          </div>
        </div>
      </section>

      {/* ============ TAGLINE FINAL ============ */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {data.futureTagline}
          </p>
          <p className="text-lg text-gray-600 italic">
            {data.futureTaglineSub} 🌱🚚
          </p>
        </div>
      </section>
    </div>
  );
};

export default FutureOfDelivery;