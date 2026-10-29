import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';
import { Check, X, Minus } from 'lucide-react';

const Comparison = () => {
  const { language, texts } = useContext(LanguageContext);
  const data = texts?.fleetMind?.[language] || texts?.fleetMind?.es || {};

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {data.comparison?.title || 'FleetMind vs. Soluciones Tradicionales'}
          </h2>
          <p className="text-slate-600">
            {data.comparison?.subtitle || 'Por qué los líderes del mercado están cambiando a una arquitectura abierta.'}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="py-4 px-6 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  {language === 'es' ? 'Característica' : 'Feature'}
                </th>
                <th className="py-4 px-6 text-center">
                  <span className="text-slate-500 font-medium">GreyMatter / Locus</span>
                </th>
                <th className="py-4 px-6 text-center bg-orange-50 rounded-t-xl border-t border-x border-orange-200">
                  <span className="text-orange-700 font-bold">FleetMind</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.comparison?.items?.map((row: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-100/50 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-slate-900">{row.feature}</td>
                  <td className="py-4 px-6 text-center text-slate-400">
                    {row.competitor === 'yes' ? <Check className="w-5 h-5 mx-auto text-slate-400" /> : 
                     row.competitor === 'partial' ? <Minus className="w-5 h-5 mx-auto text-slate-400" /> : 
                     <X className="w-5 h-5 mx-auto text-red-400" />}
                  </td>
                  <td className="py-4 px-6 text-center bg-orange-50/50 border-x border-orange-100">
                    {row.fleetmind === 'yes' ? <Check className="w-5 h-5 mx-auto text-orange-600" /> : 
                     row.fleetmind === 'partial' ? <Minus className="w-5 h-5 mx-auto text-orange-600" /> : 
                     <X className="w-5 h-5 mx-auto text-red-400" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Comparison;