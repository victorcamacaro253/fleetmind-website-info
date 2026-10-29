// src/data/simulationLogs.ts
export interface LogEvent {
  id: number;
  time: number; // en minutos de la simulación
  terminal: string;
  stage: 'BARCO' | 'QUAY' | 'YARD' | 'GATE' | 'TRUCK';
  description: string;
  priority: 'NORMAL' | 'ALTA' | 'MÁXIMA';
  duration: number; // minutos
}

export const simulationLogs: LogEvent[] = [
  { id: 1, time: 0, terminal: 'Pasir Panjang', stage: 'BARCO', description: 'Barco "PSA-Voyager" atracado en Berth 1', priority: 'NORMAL', duration: 0 },
  { id: 2, time: 5, terminal: 'Pasir Panjang', stage: 'QUAY', description: 'Grúa STS-01 inicia descarga de contenedor IMO 5.1', priority: 'MÁXIMA', duration: 5.4 },
  { id: 3, time: 10, terminal: 'Pasir Panjang', stage: 'YARD', description: 'Tractor T-12 transporta contenedor al Yard A', priority: 'MÁXIMA', duration: 1.8 },
  { id: 4, time: 12, terminal: 'Pasir Panjang', stage: 'YARD', description: 'Grúa RTG-03 apila contenedor refrigerado', priority: 'ALTA', duration: 3.8 },
  { id: 5, time: 15, terminal: 'Keppel', stage: 'BARCO', description: 'Barco "Ultra-Max" inicia operaciones en Berth 2', priority: 'NORMAL', duration: 0 },
  { id: 6, time: 18, terminal: 'Pasir Panjang', stage: 'GATE', description: 'Camión C-45 recoge contenedor en Gate 2', priority: 'NORMAL', duration: 3.2 },
  { id: 7, time: 22, terminal: 'Keppel', stage: 'QUAY', description: 'Grúa STS-04 descarga contenedor estándar', priority: 'NORMAL', duration: 5.0 },
  { id: 8, time: 25, terminal: 'Brani', stage: 'YARD', description: 'Contenedor peligroso segregado en zona segura', priority: 'MÁXIMA', duration: 2.5 },
  { id: 9, time: 30, terminal: 'Tanjong Pagar', stage: 'TRUCK', description: 'Camión C-12 inicia ruta hacia Almacén Changi (24km)', priority: 'NORMAL', duration: 45 },
  { id: 10, time: 35, terminal: 'Pasir Panjang', stage: 'QUAY', description: 'Grúa STS-02 completa ciclo, movimiento a Bay 12', priority: 'NORMAL', duration: 0.4 },
  // ... Puedes agregar más eventos aquí siguiendo este patrón
];

export const operationalMetrics = {
  totalOperations: 880,
  quayOperations: 340,
  yardOperations: 310,
  gateOperations: 230,
  avgWaitTime: 0.8,
  co2Saved: 1250, // kg
};