import { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LanguageContext } from '../context/languageContext';

const ProjectDetail = () => {
  const { language, texts } = useContext(LanguageContext);
  const { id } = useParams<{ id: string }>();
  
  const projectData = texts?.projects?.[0] || {};
  const projects = projectData[language] || projectData['es'] || {};
  const project = projects.cards?.find((proj: any) => proj.index === id);

  if (!project) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-background-2 dark:bg-dark-background-2 text-text-light dark:text-text-dark">
        <h2 className="text-3xl font-righteous mb-4">Project not found</h2>
        <Link to="/projects" className="text-accent hover:underline">
          ← Back to projects
        </Link>
      </div>
    );
  }

  const mainImage = project.image || (project.gallery && project.gallery[0]) || '/images/default-project.jpg';
  const galleryImages: string[] = project.gallery || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  
  // ✅ NUEVO: Estado para guardar la orientación de cada imagen (portrait o landscape)
  const [orientations, setOrientations] = useState<Record<number, 'portrait' | 'landscape'>>({});

  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  const nextImage = () => {
    setModalIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setModalIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // ✅ NUEVO: Función para detectar la orientación real de la imagen al cargar
  const handleImageLoad = (index: number, e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const isPortrait = img.naturalHeight > img.naturalWidth;
    setOrientations(prev => ({
      ...prev,
      [index]: isPortrait ? 'portrait' : 'landscape'
    }));
  };

  return (
    <section className="w-full bg-background-2 dark:bg-dark-background-2 py-16 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link to="/projects" className="inline-flex items-center text-accent dark:text-accent-dark hover:underline font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            {language === 'es' ? 'Volver a proyectos' : 'Back to projects'}
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-righteous mb-8 text-text-light dark:text-text-dark">
          {project.title}
        </h1>

        {/* Sección Principal: Imagen + Descripción */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
            <img
              src={mainImage}
              alt={project.title}
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
             
            />
          </div>

          <div className="flex flex-col justify-between">
            <div className="bg-background-1 dark:bg-dark-background-1 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-righteous mb-4 text-text-light dark:text-text-dark border-b border-accent dark:border-accent-dark pb-2">
                {language === 'es' ? 'Descripción Detallada' : 'Detailed Description'}
              </h2>
              <div className="prose prose-sm dark:prose-invert max-w-none text-justify text-text-light dark:text-text-dark">
                {project.detailedDescription.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4 last:mb-0 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-accent dark:bg-accent-dark text-white font-righteous rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              {language === 'es' ? 'Ver código en GitHub' : 'View code on GitHub'}
            </a>
          </div>
        </div>

        {/* Grid de Detalles: Tecnologías, Características, Desafíos */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-background-1 dark:bg-dark-background-1 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-righteous mb-4 text-text-light dark:text-text-dark flex items-center gap-2">
              <span className="text-accent">⚡</span> {language === 'es' ? 'Tecnologías' : 'Technologies'}
            </h3>
            <ul className="space-y-2">
              {project.technologies?.map((tech: string, index: number) => (
                <li key={index} className="text-sm text-text-light dark:text-text-dark flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-background-1 dark:bg-dark-background-1 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-righteous mb-4 text-text-light dark:text-text-dark flex items-center gap-2">
              <span className="text-accent">✨</span> {language === 'es' ? 'Características' : 'Features'}
            </h3>
            <ul className="space-y-2">
              {project.features?.map((feature: string, index: number) => (
                <li key={index} className="text-sm text-text-light dark:text-text-dark flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-background-1 dark:bg-dark-background-1 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-righteous mb-4 text-text-light dark:text-text-dark flex items-center gap-2">
              <span className="text-accent">🚧</span> {language === 'es' ? 'Desafíos' : 'Challenges'}
            </h3>
            <ul className="space-y-2">
              {project.challenges?.map((challenge: string, index: number) => (
                <li key={index} className="text-sm text-text-light dark:text-text-dark flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                  </svg>
                  {challenge}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ✅ GALERÍA DE IMÁGENES CON DETECCIÓN DE ORIENTACIÓN */}
        {galleryImages.length > 1 && (
          <div className="mt-12">
            <div className="flex justify-center mb-8">
              <h2 className="text-3xl md:text-4xl font-righteous text-text-light dark:text-text-dark border-b-2 border-accent dark:border-accent-dark pb-2">
                {project.imageTitle || (language === 'es' ? 'Galería del Proyecto' : 'Project Gallery')}
              </h2>
            </div>
            
            {/* Grid adaptable */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((img, imgIndex) => {
                // Determina la clase de aspecto basada en la orientación detectada
                const isPortrait = orientations[imgIndex] === 'portrait';
                const aspectClass = isPortrait ? 'aspect-[3/4]' : 'aspect-video'; // 3:4 para vertical, 16:9 para horizontal

                return (
                  <button
                    key={imgIndex}
                    className={`group relative overflow-hidden rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 ${aspectClass}`}
                    onClick={() => openModal(imgIndex)}
                  >
                    <img
                      src={img}
                      alt={`${project.title} screenshot ${imgIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      // ✅ Detecta la orientación cuando la imagen termina de cargar
                      onLoad={(e) => handleImageLoad(imgIndex, e)}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modal de Imagen (Lightbox) */}
      {isModalOpen && galleryImages.length > 0 && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white text-4xl md:text-5xl hover:text-accent transition-colors z-50 p-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(false);
            }}
            aria-label="Close modal"
          >
            &times;
          </button>

          <div 
            className="relative w-full max-w-6xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-center mb-4">
              <img
                src={galleryImages[modalIndex]}
                alt={`${project.title} screenshot ${modalIndex + 1}`}
                // ✅ El modal también se adapta: si es vertical, limita el ancho para que no se vea gigante
                className={`object-contain rounded-lg shadow-2xl transition-all duration-300 ${
                  orientations[modalIndex] === 'portrait' 
                    ? 'max-h-[85vh] max-w-[40vh]' // Restricción para screenshots verticales
                    : 'max-h-[85vh] max-w-full'   // Sin restricción de ancho para horizontales
                }`}
                onLoad={(e) => handleImageLoad(modalIndex, e)}
              />
            </div>

            {galleryImages.length > 1 && (
              <div className="w-full flex justify-between items-center px-2 md:px-8">
                <button
                  onClick={prevImage}
                  className="p-3 md:p-4 bg-accent/80 dark:bg-accent-dark/80 text-white rounded-full hover:bg-accent dark:hover:bg-accent-dark transition-all shadow-lg"
                  aria-label="Previous image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <span className="text-white text-sm md:text-base font-medium bg-black/50 px-4 py-2 rounded-full">
                  {modalIndex + 1} / {galleryImages.length}
                </span>

                <button
                  onClick={nextImage}
                  className="p-3 md:p-4 bg-accent/80 dark:bg-accent-dark/80 text-white rounded-full hover:bg-accent dark:hover:bg-accent-dark transition-all shadow-lg"
                  aria-label="Next image"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectDetail;