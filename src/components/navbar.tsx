import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Cpu,
  Menu,
  X,
  Zap,
  Radio,
  Settings,
  Building,
  Boxes
} from 'lucide-react';
import { LanguageContext } from '../context/languageContext';

const Navbar = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};
  
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: data.footer?.navHome || 'Inicio', icon: LayoutDashboard },
    { path: '/industries', label: language === 'es' ? 'Industrias' : 'Industries', icon: Building },
    { path: '/wes', label: 'WES', icon: Cpu },
    { path: '/digital-twin', label: language === 'es' ? 'Gemelo Digital' : 'Digital Twin', icon: Boxes  },
    { path: '/architecture', label: data.footer?.navArchitecture || 'Arquitectura', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-zinc-200/80' : 'bg-white/50 backdrop-blur-sm border-b border-zinc-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* ============ LOGO (Solo imagen, texto ya incluido en ella) ============ */}
            <Link to="/" className="flex items-center group">
              <div className="relative flex-shrink-0">
                {/* Efecto de brillo sutil detrás del logo */}
                <div className="absolute inset-0 bg-orange-500 rounded-lg blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                
                {/* 
                  IMPORTANTE: Asegúrate de que la ruta src apunte a tu nueva imagen.
                  Usamos h-10 md:h-12 y w-auto para que la imagen mantenga sus proporciones originales.
                */}
                <img 
                  src="/images/fleetmind-logo-completo.png" 
                  alt="FleetMind Logo" 
                  className="relative h-12 md:h-14 w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300" 
                />
              </div>
            </Link>

            {/* ============ DESKTOP MENU ============ */}
            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      active ? 'text-orange-700 bg-orange-50' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-colors ${active ? 'text-orange-600' : 'text-zinc-400 group-hover:text-zinc-600'}`} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* ============ CTA BUTTON ============ */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link to="/simulation" className="group relative overflow-hidden px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-[0_0_20px_-5px_rgba(234,88,12,0.4)] transition-all duration-300 flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>{language === 'es' ? 'Ver Simulación' : 'Live Demo'}</span>
              </Link>
            </div>

            {/* ============ MOBILE MENU BUTTON ============ */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden relative p-2 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-700 hover:bg-zinc-200 transition-colors" aria-label="Toggle menu">
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ============ MOBILE MENU ============ */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white border-t border-zinc-200 px-4 py-6 space-y-3 shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 mb-4 bg-orange-50 rounded-xl border border-orange-100">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
                </span>
                <span className="text-xs font-mono font-semibold text-orange-800">VDA5050 READY</span>
              </div>
              <Radio className="w-4 h-4 text-orange-600" />
            </div>
            
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link key={link.path} to={link.path} className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  active ? 'bg-orange-50 border border-orange-200 text-orange-700' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 border border-transparent'
                }`}>
                  <Icon className={`w-5 h-5 ${active ? 'text-orange-600' : 'text-zinc-400'}`} />
                  <span className="font-medium">{link.label}</span>
                  {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-600"></span>}
                </Link>
              );
            })}
            
            <Link to="/simulation" className="flex items-center justify-center space-x-2 mt-6 px-5 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl shadow-md transition-all active:scale-95">
              <Zap className="w-4 h-4" />
              <span>{language === 'es' ? 'Ver Simulación en Vivo' : 'View Live Simulation'}</span>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Spacer para compensar el navbar fijo */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;