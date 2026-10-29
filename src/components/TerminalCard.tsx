import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faAnchor, 
  faShip, 
  faWarehouse, 
  faTruck, 
  faBoxOpen 
} from '@fortawesome/free-solid-svg-icons';

interface TerminalCardProps {
  name: string;
  description: string;
  num_cranes: number;
  num_bays: number;
  yard_capacity?: number;
  gate_capacity?: number;
  max_jobs: number;
  specialization: string;
  image?: string;
}

const TerminalCard: React.FC<TerminalCardProps> = ({
  name,
  description,
  num_cranes,
  num_bays,
  yard_capacity,
  gate_capacity,
  max_jobs,
  specialization,
  image
}) => {
  const formatSpecialization = (spec: string) => {
    switch (spec) {
      case 'general': return 'Contenedores Generales';
      case 'ultra_large': return 'Ultra Large (ULCV)';
      case 'reefer_dangerous': return 'Reefer y Peligrosos (IMO)';
      default: return spec.charAt(0).toUpperCase() + spec.slice(1).replace('_', ' ');
    }
  };

  const getSpecializationColor = (spec: string) => {
    switch (spec) {
      case 'general': return 'from-blue-500 to-cyan-600';
      case 'ultra_large': return 'from-purple-500 to-indigo-600';
      case 'reefer_dangerous': return 'from-red-500 to-orange-500';
      default: return 'from-slate-500 to-gray-600';
    }
  };

  return (
    <div className="group bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 h-full flex flex-col overflow-hidden">
      
      {/* Header con Imagen o Gradiente */}
      <div className="relative h-48 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${getSpecializationColor(specialization)} flex items-center justify-center`}>
            <FontAwesomeIcon icon={faShip} className="text-6xl text-white/20" />
          </div>
        )}
        
        {/* Overlay gradiente para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        {/* Badge de Especialización */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold border border-white/10 shadow-lg">
          {formatSpecialization(specialization)}
        </div>

        {/* Título sobre la imagen */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white drop-shadow-md">{name}</h3>
        </div>
      </div>
      
      {/* Contenido */}
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
          {description}
        </p>

        {/* Grid de Estadísticas */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50 flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <FontAwesomeIcon icon={faAnchor} className="text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Grúas STS</p>
              <p className="text-lg font-bold text-white">{num_cranes}</p>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50 flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <FontAwesomeIcon icon={faBoxOpen} className="text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Bays</p>
              <p className="text-lg font-bold text-white">{num_bays}</p>
            </div>
          </div>

          {yard_capacity !== undefined && (
            <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50 flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <FontAwesomeIcon icon={faWarehouse} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Yard Cap.</p>
                <p className="text-lg font-bold text-white">{yard_capacity}</p>
              </div>
            </div>
          )}

          {gate_capacity !== undefined && (
            <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50 flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <FontAwesomeIcon icon={faTruck} className="text-orange-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Gate Cap.</p>
                <p className="text-lg font-bold text-white">{gate_capacity}</p>
              </div>
            </div>
          )}
        </div>

        {/* Max Jobs al final */}
        <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center">
          <span className="text-sm text-slate-400">Capacidad Máxima</span>
          <span className="text-xl font-bold text-cyan-400">{max_jobs} <span className="text-sm text-slate-500 font-normal">jobs</span></span>
        </div>
      </div>
    </div>
  );
};

export default TerminalCard;