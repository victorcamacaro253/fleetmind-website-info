import { createContext, useEffect, useState, useMemo } from 'react';
import texts from '../data/texts.json';

interface LanguageContextType {
  language: string;
  texts: any; // Ajusta este tipo si tu interfaz Texts lo requiere
  setLanguage: (lang: string) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  language: 'es',
  texts: texts as any,
  setLanguage: () => {},
});

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState('es');

  useEffect(() => {
    const getUserLanguage = async () => {
      try {
        // RECOMENDACIÓN: Usamos ipwho.is en lugar de ipapi.co. 
        // Es gratuita, no requiere API key, devuelve el mismo formato y no tiene 
        // los bloqueos CORS o límites de tasa estrictos que afectan a Cloudflare Pages.
        const response = await fetch('https://ipwho.is/');
        const data = await response.json();

        if (!data.success) {
          throw new Error('No se pudo obtener la ubicación');
        }

        // Lista de códigos ISO de países de Latinoamérica y España.
        // (Agregué 'BR' por si quieres mostrarlo en español, puedes quitarlo si manejas portugués).
        const latamAndSpain = [
          'AR', 'BO', 'BR', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'SV', 
          'GQ', 'GT', 'HN', 'MX', 'NI', 'PA', 'PY', 'PE', 'ES', 'UY', 'VE'
        ];

        // Si el código del país está en la lista, usamos 'es', de lo contrario 'en'
        const userLang = latamAndSpain.includes(data.country_code) ? 'es' : 'en';
        
        setLanguage(userLang);
      } catch (error) {
        console.error("Error fetching the location data:", error);
        
        // FALLBACK ELEGANTE: Si la API falla (ej. bloqueador de anuncios), 
        // usamos el idioma configurado en el navegador del usuario.
        const browserLang = navigator.language.toLowerCase();
        const fallbackLang = browserLang.startsWith('es') ? 'es' : 'en';
        setLanguage(fallbackLang);
      }
    };

    getUserLanguage();
  }, []);

  // ⚠️ CORRECCIÓN CRÍTICA: En tu código original, siempre pasabas el objeto 'texts' completo.
  // Aquí filtramos el JSON para devolver solo el idioma activo. 
  // (Asumiendo que tu texts.json tiene la estructura: { "es": {...}, "en": {...} })
  const currentTexts = (texts as any)[language] || (texts as any).es || texts;

  const value = useMemo(() => ({
    language,
    texts: currentTexts, // <-- Ahora sí cambia dinámicamente
    setLanguage,
  }), [language, currentTexts]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;