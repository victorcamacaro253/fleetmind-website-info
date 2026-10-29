import { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../context/languageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, faCheckCircle, faRocket,
  faLightbulb, faChartLine, faExclamationTriangle,
  faLayerGroup, faImages, faCogs, faStar
} from '@fortawesome/free-solid-svg-icons';
import { faGithub as faGithubBrand } from '@fortawesome/free-brands-svg-icons';

const ProjectDetailPage = () => {
  const { language, texts } = useContext(LanguageContext);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const data = texts?.aiProjects?.[language] || texts?.aiProjects?.es || {};
  const projects = data.projects || [];
  
  // Buscar el proyecto por su ID
  const project = projects.find((p: any) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-1 dark:bg-dark-background-1">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-text-light dark:text-text-dark">
            {language === 'es' ? 'Proyecto no encontrado' : 'Project not found'}
          </h2>
          <button onClick={() => navigate('/ai-work')} className="text-accent hover:underline">
            ← {language === 'es' ? 'Volver a proyectos de IA' : 'Back to AI projects'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-1 dark:bg-dark-background-1 pt-20 pb-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-accent/10 via-background-2 to-accent-dark/10 dark:from-accent-dark/20 dark:via-dark-background-2 dark:to-accent/20 py-20 px-4">
        <div className="max-w-5xl mx-auto relative">
          <button
            onClick={() => navigate('/ai-work')}
            className="inline-flex items-center gap-2 text-accent dark:text-accent-dark hover:underline mb-8 font-medium"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            {language === 'es' ? 'Volver a proyectos' : 'Back to projects'}
          </button>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-accent/10 dark:bg-accent-dark/10 px-4 py-2 rounded-full mb-6">
                <FontAwesomeIcon icon={faRocket} className="text-accent dark:text-accent-dark" />
                <span className="text-sm font-semibold text-accent dark:text-accent-dark">
                  {project.role || (language === 'es' ? 'Ingeniero Principal' : 'Lead Engineer')}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-righteous mb-4 text-text-light dark:text-text-dark leading-tight">
                {project.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {project.subtitle}
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="bg-white dark:bg-dark-background-2 px-4 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <span className="text-xs text-gray-500 uppercase">{language === 'es' ? 'Duración' : 'Duration'}</span>
                  <p className="font-bold text-text-light dark:text-text-dark">{project.duration || 'N/A'}</p>
                </div>
                <div className="bg-white dark:bg-dark-background-2 px-4 py-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <span className="text-xs text-gray-500 uppercase">{language === 'es' ? 'Stack Principal' : 'Main Stack'}</span>
                  <p className="font-bold text-text-light dark:text-text-dark">{project.technologies?.slice(0, 3).join(', ')}</p>
                </div>
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 transition-all hover:-translate-y-1 shadow-lg"
              >
                <FontAwesomeIcon icon={faGithubBrand} className="text-xl" />
                {language === 'es' ? 'Ver código en GitHub' : 'View on GitHub'}
              </a>
            </div>
            
            {/* Hero Image */}
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 aspect-video">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">
        
        {/* 1. Descripción y Tecnologías */}
        <section className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-righteous mb-6 text-text-light dark:text-text-dark flex items-center gap-3">
              <FontAwesomeIcon icon={faLightbulb} className="text-accent" />
              {language === 'es' ? 'Descripción del Proyecto' : 'Project Description'}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {project.fullDescription || project.shortDescription}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-righteous mb-4 text-text-light dark:text-text-dark flex items-center gap-2">
              <FontAwesomeIcon icon={faCogs} className="text-accent" />
              {language === 'es' ? 'Tecnologías' : 'Technologies'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-accent/10 dark:bg-accent-dark/10 text-accent dark:text-accent-dark text-sm font-medium rounded-full border border-accent/20 dark:border-accent-dark/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Valor para el Negocio y Beneficios Clave */}
        {(project.businessValue || project.keyBenefits) && (
          <section className="space-y-10">
            {/* Business Value */}
            {project.businessValue && (
              <div>
                <h2 className="text-3xl font-righteous mb-6 text-text-light dark:text-text-dark flex items-center gap-3">
                  <FontAwesomeIcon icon={faLightbulb} className="text-accent" />
                  {language === 'es' ? 'Valor para el Negocio' : 'Business Value'}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.businessValue.map((value: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 bg-gradient-to-r from-accent/5 to-accent-dark/5 dark:from-accent-dark/10 dark:to-accent/10 p-5 rounded-xl border border-accent/20 dark:border-accent-dark/20">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-accent dark:text-accent-dark mt-1 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Benefits */}
            {project.keyBenefits && (
              <div>
                <h2 className="text-3xl font-righteous mb-6 text-text-light dark:text-text-dark flex items-center gap-3">
                  <FontAwesomeIcon icon={faStar} className="text-accent" />
                  {language === 'es' ? 'Beneficios Clave' : 'Key Benefits'}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.keyBenefits.map((benefit: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 bg-white dark:bg-dark-background-2 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-accent dark:hover:border-accent-dark transition-colors">
                      <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2 flex-shrink-0 mt-1">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* 3. Contexto: Problema y Solución */}
        {project.context && (
          <section>
            <h2 className="text-3xl font-righteous mb-8 text-text-light dark:text-text-dark flex items-center gap-3">
              <FontAwesomeIcon icon={faLightbulb} className="text-accent" />
              {language === 'es' ? 'Contexto del Proyecto' : 'Project Context'}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 p-6 rounded-r-xl">
                <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-3">
                  {language === 'es' ? 'El Problema' : 'The Problem'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.context.problem}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 p-6 rounded-r-xl">
                <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-3">
                  {language === 'es' ? 'La Solución' : 'The Solution'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{project.context.solution}</p>
              </div>
            </div>
          </section>
        )}

        {/* 4. Características Destacadas */}
        {project.highlights && project.highlights.length > 0 && (
          <section>
            <h2 className="text-3xl font-righteous mb-8 text-text-light dark:text-text-dark flex items-center gap-3">
              <FontAwesomeIcon icon={faStar} className="text-accent" />
              {language === 'es' ? 'Características Destacadas' : 'Key Highlights'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {project.highlights.map((highlight: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3 bg-white dark:bg-dark-background-2 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:border-accent dark:hover:border-accent-dark transition-colors">
                  <div className="bg-accent/10 dark:bg-accent-dark/10 rounded-full p-2 flex-shrink-0 mt-1">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-accent dark:text-accent-dark" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{highlight}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Arquitectura Técnica */}
        {project.architecture && (
          <section>
            <h2 className="text-3xl font-righteous mb-8 text-text-light dark:text-text-dark flex items-center gap-3">
              <FontAwesomeIcon icon={faLayerGroup} className="text-accent" />
              {language === 'es' ? 'Arquitectura Técnica' : 'Technical Architecture'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.architecture.map((arch: any, idx: number) => (
                <div key={idx} className="bg-white dark:bg-dark-background-2 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:border-accent dark:hover:border-accent-dark transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-text-light dark:text-text-dark">{arch.layer}</h3>
                    <span className="px-3 py-1 bg-accent/10 dark:bg-accent-dark/10 text-accent dark:text-accent-dark text-xs font-bold rounded-full">
                      {arch.tech}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{arch.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. Desafíos Superados */}
        {project.challenges && (
          <section>
            <h2 className="text-3xl font-righteous mb-8 text-text-light dark:text-text-dark flex items-center gap-3">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-accent" />
              {language === 'es' ? 'Desafíos Superados' : 'Challenges Overcome'}
            </h2>
            <div className="space-y-6">
              {project.challenges.map((challenge: any, idx: number) => (
                <div key={idx} className="bg-white dark:bg-dark-background-2 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-text-light dark:text-text-dark mb-2 flex items-center gap-2">
                    <span className="text-accent">⚠️</span> {challenge.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-green-600 dark:text-green-400">{language === 'es' ? 'Solución: ' : 'Solution: '}</span>
                    {challenge.solution}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. Impacto y Métricas */}
        {project.impact && (
          <section>
            <h2 className="text-3xl font-righteous mb-8 text-text-light dark:text-text-dark flex items-center gap-3">
              <FontAwesomeIcon icon={faChartLine} className="text-accent" />
              {language === 'es' ? 'Impacto Medible' : 'Measurable Impact'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.impact.map((item: string, idx: number) => (
                <div key={idx} className="bg-gradient-to-br from-accent/5 to-accent-dark/5 dark:from-accent-dark/10 dark:to-accent/10 p-6 rounded-2xl border border-accent/20 dark:border-accent-dark/20 text-center flex flex-col items-center justify-center min-h-[120px]">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-2xl text-accent dark:text-accent-dark mb-3" />
                  <p className="text-sm font-medium text-text-light dark:text-text-dark">{item}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. Galería (Opcional) */}
        {project.gallery && project.gallery.length > 0 && (
          <section>
            <h2 className="text-3xl font-righteous mb-8 text-text-light dark:text-text-dark flex items-center gap-3">
              <FontAwesomeIcon icon={faImages} className="text-accent" />
              {language === 'es' ? 'Galería del Proyecto' : 'Project Gallery'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.gallery.map((img: string, idx: number) => (
                <div key={idx} className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 aspect-video bg-gray-100 dark:bg-gray-800 group">
                  <img 
                    src={img} 
                    alt={`Gallery ${idx + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-accent to-accent-dark py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-righteous mb-4">
            {language === 'es' ? '¿Te gustaría ver el código?' : 'Want to see the code?'}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {language === 'es'
              ? 'Todo el código fuente, documentación y scripts de simulación están disponibles en GitHub.'
              : 'All source code, documentation, and simulation scripts are available on GitHub.'}
          </p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-accent dark:text-accent-dark font-righteous text-lg rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faGithubBrand} />
            {language === 'es' ? 'Ir al Repositorio' : 'Go to Repository'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;