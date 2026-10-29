import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/languageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRobot, faBrain, faProjectDiagram, faEye, 
  faArrowLeft, faCheckCircle, faRocket,
  faLightbulb, faChartLine, faCogs, faExpand,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';


const AIWorkPage = () => {
  const { language, texts } = useContext(LanguageContext);
  
  const data = texts?.aiProjects?.[language] || texts?.aiProjects?.es || {};
  const projects = data.projects || [];

  const projectIcons = [faProjectDiagram, faRobot, faBrain, faEye];

  // Estado para el modal de imagen ampliada
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background-1 dark:bg-dark-background-1 pt-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-accent/10 via-background-2 to-accent-dark/10 dark:from-accent-dark/20 dark:via-dark-background-2 dark:to-accent/20 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-9xl">🧠</div>
          <div className="absolute top-40 right-20 text-8xl">🤖</div>
          <div className="absolute bottom-20 left-1/3 text-7xl">⚡</div>
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-accent dark:text-accent-dark hover:underline mb-6 font-medium"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            {language === 'es' ? 'Volver al inicio' : 'Back to home'}
          </Link>

          <div className="inline-flex items-center gap-2 bg-accent/10 dark:bg-accent-dark/10 px-4 py-2 rounded-full mb-6">
            <FontAwesomeIcon icon={faBrain} className="text-accent dark:text-accent-dark" />
            <span className="text-sm font-semibold text-accent dark:text-accent-dark">
              {language === 'es' ? 'Especialización' : 'Specialization'}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-righteous mb-6 text-text-light dark:text-text-dark leading-tight">
            {data.pageHeroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl">
            {data.pageHeroSubtitle}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl leading-relaxed">
            {data.pageIntro}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              { value: '4', label: language === 'es' ? 'Proyectos IA' : 'AI Projects', icon: faRocket },
              { value: '15+', label: language === 'es' ? 'Tecnologías' : 'Technologies', icon: faCogs },
              { value: '6', label: language === 'es' ? 'Ramas de IA' : 'AI Branches', icon: faBrain },
              { value: '100%', label: language === 'es' ? 'Impacto Real' : 'Real Impact', icon: faChartLine },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-dark-background-2 rounded-xl p-5 shadow-lg border border-gray-200 dark:border-gray-700">
                <FontAwesomeIcon icon={stat.icon} className="text-2xl text-accent dark:text-accent-dark mb-2" />
                <div className="text-3xl font-bold text-text-light dark:text-text-dark">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Deep Dive */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        {projects.map((project: any, index: number) => (
          <div key={index} className="mb-24 last:mb-0">
            {/* Project Header */}
            <div className="flex items-start gap-4 mb-8">
              <div className="bg-gradient-to-br from-accent to-accent-dark p-4 rounded-2xl shadow-lg flex-shrink-0">
                <FontAwesomeIcon 
                  icon={projectIcons[index % projectIcons.length]} 
                  className="text-3xl text-white" 
                />
              </div>
              <div>
                <div className="text-sm text-accent dark:text-accent-dark font-semibold mb-1">
                  {language === 'es' ? `Proyecto 0${index + 1}` : `Project 0${index + 1}`}
                </div>
                <h2 className="text-3xl md:text-4xl font-righteous text-text-light dark:text-text-dark mb-2">
                  {project.title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {project.subtitle}
                </p>
              </div>
            </div>

            {/* 🖼️ NUEVA SECCIÓN: Imagen de Portada del Proyecto */}
            <div className="mb-8 group relative overflow-hidden rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-background-2 dark:to-dark-background-3">
              <div className="relative aspect-[21/9] md:aspect-[21/8] w-full overflow-hidden">
                {/* Imagen principal con fallback */}
                <img
                  src={project.image || `/images/ai-projects/project-${index + 1}.jpg`}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Si la imagen falla, oculta la img y muestra el fallback con icono
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                
                {/* Fallback elegante si no hay imagen (oculto por defecto) */}
                <div 
                  className="absolute inset-0 w-full h-full items-center justify-center bg-gradient-to-br from-accent/20 to-accent-dark/20 dark:from-accent-dark/30 dark:to-accent/30"
                  style={{ display: 'none' }}
                >
                  <FontAwesomeIcon 
                    icon={projectIcons[index % projectIcons.length]} 
                    className="text-8xl md:text-9xl text-accent/40 dark:text-accent-dark/40" 
                  />
                </div>

                {/* Overlay gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Botón de ampliar */}
                <button
                  onClick={() => setLightboxImage(project.image || `/images/ai-projects/project-${index + 1}.jpg`)}
                  className="absolute top-4 right-4 bg-white/90 dark:bg-dark-background-2/90 backdrop-blur-sm hover:bg-white dark:hover:bg-dark-background-2 text-accent dark:text-accent-dark p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                  aria-label="Ampliar imagen"
                >
                  <FontAwesomeIcon icon={faExpand} className="text-lg" />
                </button>

                {/* Badge de tecnologías sobre la imagen */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech: string, techIdx: number) => (
                    <span
                      key={techIdx}
                      className="px-3 py-1 bg-white/90 dark:bg-dark-background-2/90 backdrop-blur-sm text-accent dark:text-accent-dark text-xs font-bold rounded-full shadow-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-black/60 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Project Content Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Description - 2 columns */}
              <div className="md:col-span-2 bg-white dark:bg-dark-background-2 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-righteous mb-4 flex items-center gap-2 text-text-light dark:text-text-dark">
                  <FontAwesomeIcon icon={faLightbulb} className="text-accent" />
                  {language === 'es' ? 'Descripción' : 'Description'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Impact - 1 column */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 shadow-lg border border-green-200 dark:border-green-800">
                <h3 className="text-xl font-righteous mb-4 flex items-center gap-2 text-text-light dark:text-text-dark">
                  <FontAwesomeIcon icon={faChartLine} className="text-green-600 dark:text-green-400" />
                  {language === 'es' ? 'Impacto' : 'Impact'}
                </h3>
                <ul className="space-y-2">
                  {project.impact.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-white dark:bg-dark-background-2 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
              <h3 className="text-xl font-righteous mb-4 flex items-center gap-2 text-text-light dark:text-text-dark">
                <FontAwesomeIcon icon={faCogs} className="text-accent" />
                {language === 'es' ? 'Stack Tecnológico' : 'Tech Stack'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-accent/10 dark:bg-accent-dark/10 text-accent dark:text-accent-dark rounded-full font-medium text-sm border border-accent/20 dark:border-accent-dark/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 shadow-lg border border-blue-200 dark:border-blue-800 mb-6">
              <h3 className="text-xl font-righteous mb-4 flex items-center gap-2 text-text-light dark:text-text-dark">
                <FontAwesomeIcon icon={faRocket} className="text-blue-600 dark:text-blue-400" />
                {language === 'es' ? 'Características Destacadas' : 'Key Highlights'}
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {project.highlights.map((highlight: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3 bg-white dark:bg-dark-background-2 rounded-xl p-4 shadow-sm">
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 flex-shrink-0">
                      <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* GitHub Link */}
                <div className="flex justify-end">

                    <Link
                        to={`/ia/${project.id}`}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-accent dark:bg-accent-dark text-white rounded-xl hover:bg-opacity-90 transition-all hover:-translate-y-1 shadow-lg"
                    >
                        {language === 'es' ? 'Ver Case Study' : 'View Case Study'}
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Link>

                </div>

            {/* Divider */}
            {index < projects.length - 1 && (
              <div className="mt-24 border-t-2 border-dashed border-gray-300 dark:border-gray-700"></div>
            )}
          </div>
        ))}
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-accent to-accent-dark py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <FontAwesomeIcon icon={faBrain} className="text-5xl mb-6" />
          <h2 className="text-3xl md:text-4xl font-righteous mb-4">
            {language === 'es' 
              ? '¿Tienes un problema complejo que resolver?' 
              : 'Have a complex problem to solve?'}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {language === 'es'
              ? 'Convierto desafíos operativos en soluciones inteligentes basadas en datos.'
              : 'I turn operational challenges into smart, data-driven solutions.'}
          </p>
          <a
            href="mailto:victorcamacaro253@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-accent dark:text-accent-dark font-righteous text-lg rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            {language === 'es' ? 'Hablemos de tu proyecto' : "Let's talk about your project"}
            <FontAwesomeIcon icon={faArrowLeft} className="rotate-180" />
          </a>
        </div>
      </div>

      {/* 🖼️ LIGHTBOX MODAL - Para ver la imagen en grande */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white text-4xl md:text-5xl hover:text-accent transition-colors z-50 p-2"
            aria-label="Close lightbox"
          >
            &times;
          </button>
          <div 
            className="relative w-full max-w-6xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage}
              alt="Project preview"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AIWorkPage;