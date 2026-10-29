import { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLngExpression } from 'leaflet';
import { MapPin } from 'lucide-react';
import { LanguageContext } from '../context/languageContext';

// El array se mantiene exactamente como lo tenías
const depots = [
  { code: 'DPS6', lat: 34.2697, lon: -118.7184, zone: 'Simi Valley', color: '#EF4444', orders: 10 },
  { code: 'DUR1', lat: 34.200364, lon: -118.3511211, zone: 'San Fernando Valley', color: '#10B981', orders: 10 },
  { code: 'DLX9', lat: 33.9844, lon: -118.3983, zone: 'West LA', color: '#3B82F6', orders: 8 },
  { code: 'DCX7', lat: 33.8484696, lon: -118.2925636, zone: 'Long Beach', color: '#8B5CF6', orders: 10 },
  { code: 'VAX3', lat: 33.8830291, lon: -118.2800617, zone: 'Gardena', color: '#F59E0B', orders: 8, special: 'Sub-Same Day' },
  { code: 'DLX5', lat: 34.1389886, lon: -118.2711079, zone: 'Central LA', color: '#EC4899', orders: 12 },
  { code: 'DFX3', lat: 33.9479688, lon: -118.3822891, zone: 'LAX', color: '#14B8A6', orders: 14 },
  { code: 'DLX7', lat: 33.8000, lon: -118.0233, zone: 'Cypress', color: '#6366F1', orders: 10 },
  { code: 'DPS1', lat: 34.0853512, lon: -118.0609786, zone: 'Rosemead', color: '#F97316', orders: 9 },
  { code: 'DLA3', lat: 34.0081095, lon: -118.1442805, zone: 'Commerce', color: '#84CC16', orders: 11 }
];

const createCustomIcon = (color: string) => {
  const svgPin = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="32px" height="32px"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
  const encodedSvg = `data:image/svg+xml;utf8,${encodeURIComponent(svgPin)}`;

  return new Icon({
    iconUrl: encodedSvg,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

const DepotsMap = () => {
  const { language } = useContext(LanguageContext);
  const center: LatLngExpression = [34.0522, -118.2437];

  // Traducciones solo para los textos de la interfaz (UI)
  const uiText = {
    es: {
      badge: "Modelado Geográfico Real",
      title: "Red de Depósitos en Los Ángeles",
      subtitle: " 10 estaciones de entrega de Amazon cubriendo el área metropolitana desde Simi Valley hasta Orange County, con flota heterogénea y zonas de cobertura H3.",
      orders: "Órdenes",
      special: "Sub-Same Day"
    },
    en: {
      badge: "Real Geographic Modeling",
      title: "Network of Depots in Los Angeles",
      subtitle: "10 Amazon delivery stations covering the metropolitan area from Simi Valley to Orange County, with a mixed fleet and H3 coverage zones.",
      orders: "Orders",
      special: "Sub-Same Day"
    }
  };

  const t = uiText[language as keyof typeof uiText] || uiText.es;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-semibold mb-4">
            <MapPin className="w-4 h-4" /> {t.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Mapa */}
        <div className="h-96 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg z-0 relative mb-12">
          <MapContainer 
            center={center} 
            zoom={9} 
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              subdomains="abcd"
              maxZoom={20}
            />
            
            {depots.map((depot) => (
              <Marker
                key={depot.code}
                position={[depot.lat, depot.lon] as LatLngExpression}
                icon={createCustomIcon(depot.color)}
              >
                <Popup>
                  <div className="p-1 min-w-[150px]">
                    <h3 className="font-bold text-gray-900 text-base mb-1">{depot.code}</h3>
                    <p className="text-sm text-gray-600 mb-2">{depot.zone}</p>
                    {depot.special && (
                      <span className="inline-block mb-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded">
                        {t.special}
                      </span>
                    )}
                    <div className="flex items-center gap-2 text-sm border-t border-gray-200 pt-2">
                      <span className="font-semibold text-gray-700">{t.orders}:</span>
                      <span className="font-bold text-blue-600">{depot.orders}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Grid de depósitos (debajo del mapa) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {depots.map((depot) => (
            <div key={depot.code} className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-blue-700">{depot.code}</span>
                {depot.special && (
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded">
                    {t.special}
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-600 mb-3 leading-tight">{depot.zone}</div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <span className="text-xs text-gray-500">{t.orders}</span>
                <span className="text-sm font-bold text-gray-900">{depot.orders}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepotsMap;