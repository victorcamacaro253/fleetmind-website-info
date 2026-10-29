import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/languageContext';
import {
  Leaf,
  Mail,
  Globe,
  ArrowUpRight
} from 'lucide-react';

const Footer = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};
  const footer = data.footer || {};

  const currentYear = new Date().getFullYear();
  const isEs = language === 'es';

  // Enlaces actualizados para coincidir con el Navbar y las nuevas páginas
  const navLinks = [
    { name: footer.navHome || 'Inicio', path: '/' },
    { name: isEs ? 'Industrias' : 'Industries', path: '/industries' },
    { name: 'WES', path: '/wes' },
    { name: isEs ? 'Info Simulación' : 'Simulation Info', path: '/simulation-info' },
    { name: footer.navArchitecture || 'Arquitectura', path: '/architecture' },
  ];

  const resourceLinks = [
    { name: footer.resourceDocs || 'Documentación Técnica', path: '/docs' },
    { name: isEs ? 'Desglose de IA' : 'AI Breakdown', path: '/docs/ai' },
  ];

  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Columna 1: Marca y Misión */}
          <div className="space-y-6">
            <div className="flex items-center group">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-orange-500 rounded-lg blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                {/* Logo actualizado: solo imagen, w-auto para mantener proporciones */}
                <img
                  src="/images/fleetmind-logo-completo.png"
                  alt="FleetMind Logo"
                  className="relative h-10 md:h-12 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            
            <p className="text-sm text-zinc-400 leading-relaxed">
              {footer.mission || 'Sistema Ciberfísico de Orquestación Logística compatible con VDA5050. Agnóstico, escalable y predictivo.'}
            </p>

            {/* Badge de Valor */}
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <Leaf className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-medium text-orange-400">{footer.sustainabilityBadge || 'Cero Vendor Lock-in'}</span>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h4 className="text-white font-semibold mb-6">{footer.navTitle || 'Explorar'}</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-zinc-400 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-orange-400 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Recursos */}
          <div>
            <h4 className="text-white font-semibold mb-6">{footer.resourcesTitle || 'Recursos'}</h4>
            <ul className="space-y-4">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-zinc-400 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Contacto y Redes */}
          <div>
            <h4 className="text-white font-semibold mb-6">{footer.connectTitle || 'Conecta'}</h4>
            <div className="space-y-4">

              {/* Correo Electrónico */}
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a href="mailto:victorcamacaro253@gmail.com" className="hover:text-orange-400 transition-colors break-all">
                  victorcamacaro253@gmail.com
                </a>
              </div>

              {/* Sitio Web Personal */}
              <div className="flex items-center gap-3 text-sm text-zinc-400">
                <Globe className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a
                  href="https://victorcamacaro.pages.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors"
                >
                  victorcamacaro.pages.dev
                </a>
              </div>

              {/* Redes Sociales */}
              <div className="flex gap-3 pt-4">
                {/* GitHub */}
                <a
                  href="https://github.com/victorcamacaro253"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-orange-600 hover:text-white transition-all duration-300"
                  aria-label="GitHub"
                >
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/victorcamacaro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-orange-600 hover:text-white transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/victorcamacaro1999/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:bg-orange-600 hover:text-white transition-all duration-300"
                  aria-label="Instagram"
                >
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.373c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria y Copyright */}
        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-500">
            {(footer.copyright || '© {year} Victor Camacaro. Todos los derechos reservados.').replace('{year}', currentYear.toString())}
          </p>
          <p className="text-xs text-zinc-600 flex items-center gap-1">
            {footer.devNotePrefix || 'Construido con'} <span className="text-red-500">♥</span> {footer.devNoteSuffix || 'Python, MQTT, Streamlit y VDA5050'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;