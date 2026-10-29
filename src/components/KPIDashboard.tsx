interface KPIDashboardProps {
  terminalName: string;
  kpis: {
    maritime: {
      totalWork: number;
      serviceTime: number;
      movementTime: number;
      stayTime: number;
      parallelism: number;
      totalDistance: number;
      avgWait: number;
      utilization: number;
      avgMovement: number;
    };
    terrestrial: {
      totalWindow: number;
      trucksServed: number;
      avgTurnaround: number;
      gateWait: number;
      gateUtilization: number;
      yardWait: number;
      yardUtilization: number;
      tractorWait: number;
      tractorUtilization: number;
      tractorTrips: number;
    };
    safety: {
      priorityTrucks: number;
      priorityWait: number;
      normalTrucks: number;
      normalWait: number;
    };
    executive: {
      totalTime: number;
      avgWait: number;
      ratio: number;
    };
  };
}

const KPIDashboard = ({ terminalName, kpis }: KPIDashboardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        KPIs - {terminalName}
      </h3>

      {/* Maritime KPIs */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4 flex items-center">
          <span className="text-2xl mr-2">🚢</span>
          KPIs Marítimos
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {kpis.maritime.totalWork} min
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Trabajo Total de Grúas</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {kpis.maritime.parallelism}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Eficiencia Paralelismo</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {kpis.maritime.utilization}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Utilización Quay</div>
          </div>
        </div>
      </div>

      {/* Terrestrial KPIs */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center">
          <span className="text-2xl mr-2">🚛</span>
          KPIs Terrestres
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {kpis.terrestrial.trucksServed}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Camiones Atendidos</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {kpis.terrestrial.avgTurnaround} min
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Turnaround Promedio</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {kpis.terrestrial.gateUtilization}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Utilización Gate</div>
          </div>
        </div>
      </div>

      {/* Safety KPIs */}
      <div>
        <h4 className="text-lg font-semibold text-yellow-600 dark:text-yellow-400 mb-4 flex items-center">
          <span className="text-2xl mr-2">⚡</span>
          KPIs Seguridad IMO
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {kpis.safety.priorityTrucks}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Camiones Prioritarios</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Espera: {kpis.safety.priorityWait} min
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {kpis.safety.normalTrucks}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Camiones Normales</div>
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Espera: {kpis.safety.normalWait} min
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPIDashboard;