import { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/languageContext';
import {
  Play, Pause, RotateCcw, Package, Battery, Activity, 
  Clock, DollarSign, CheckCircle2, Terminal, Zap, BarChart3, Layers
} from 'lucide-react';

// ==========================================
// COMPONENTES AUXILIARES
// ==========================================
const CapacityCard = ({ label, value, unit }: { label: string; value: string; unit: string }) => (
  <div className="bg-zinc-950/50 rounded-xl border border-zinc-800 p-4 text-center">
    <div className="text-sm text-zinc-400 mb-1">{label}</div>
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-xs text-zinc-500 font-mono">{unit}</div>
  </div>
);

const CategoryBar = ({ label, value, total, color }: { label: string; value: number; total: number; color: string }) => {
  const percentage = Math.round((value / total) * 100);
  return (
    <div>
      <div className="flex justify-between text-xs text-zinc-400 mb-1">
        <span>{label}</span>
        <span>{value} ({percentage}%)</span>
      </div>
      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

// ==========================================
// COMPONENTE DE CANVAS
// ==========================================
const WarehouseCanvas = ({ step }: { step: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gridData, setGridData] = useState<any[][] | null>(null);
  const [latestFrame, setLatestFrame] = useState<any>(null);

    // 1. Generar el Grid Mock con estructura REAL de almacén (6 columnas verticales)
      // 1. Generar el Grid Mock IDÉNTICO al sistema real
  useEffect(() => {
    const grid = [];
    for (let r = 0; r < 50; r++) {
      const row = [];
      for (let c = 0; c < 50; c++) {
        let cell: any = { is_shelf: false, is_packing: false, is_charging: false, is_dynamic_obstacle: false, has_item: false };
        
        // 1. ESTANTERÍAS - Patrón de grid con pasillos
        // Cada 6 columnas: 4 de estantería, 2 de pasillo
        // Cada 6 filas: 4 de estantería, 2 de pasillo
        const rowMod = r % 6;
        const colMod = c % 6;
        
        if (rowMod < 4 && colMod < 4 && r >= 2 && r <= 47 && c >= 2 && c <= 47) {
          cell.is_shelf = true;
          // Distribuir items aleatoriamente
          if (Math.random() > 0.7) {
            cell.has_item = true;
          }
        }
        // 2. MUELLES DE EMPAQUE - Dispersos en bordes y esquinas
        else if (
          // Esquina superior derecha
          (r >= 2 && r <= 4 && c >= 46 && c <= 48) ||
          // Lado derecho medio
          (r >= 20 && r <= 22 && c >= 46 && c <= 48) ||
          // Lado izquierdo
          (r >= 35 && r <= 37 && c >= 2 && c <= 4) ||
          // Abajo
          (r >= 46 && r <= 48 && c >= 15 && c <= 17) ||
          (r >= 46 && r <= 48 && c >= 30 && c <= 32)
        ) {
          cell.is_packing = true;
        }
        // 3. ESTACIONES DE CARGA - Dispersas estratégicamente
        else if (
          // Arriba
          (r >= 2 && r <= 4 && c >= 8 && c <= 10) ||
          (r >= 2 && r <= 4 && c >= 40 && c <= 42) ||
          // Medio
          (r >= 24 && r <= 26 && c >= 20 && c <= 22) ||
          // Abajo derecha
          (r >= 44 && r <= 46 && c >= 42 && c <= 48)
        ) {
          cell.is_charging = true;
        }
        
        row.push(cell);
      }
      grid.push(row);
    }
    setGridData(grid);
  }, []);

  // 2. Movimiento de robots entre ESTANTERÍAS y MUELLES
  useEffect(() => {
    if (!gridData) return;

    const getRobotState = (id: number, currentStep: number) => {
      // Posiciones iniciales en diferentes estanterías
      const shelfPositions = [
        [15, 15], [27, 27], [39, 9], [9, 33], [33, 39]
      ];
      const [startRow, startCol] = shelfPositions[id];
      
      // Muelle destino (diferente para cada robot)
      const packingPositions = [
        [3, 47], [21, 47], [36, 3], [47, 16], [47, 31]
      ];
      const [packRow, packCol] = packingPositions[id];

      // Fases del viaje
      const phases = [
        // Fase 1: Picking en estantería
        { start: 0, end: 15, pos: [startRow, startCol], action: 'picking', carrying: false },
        
        // Fase 2: Ir al muelle (horizontal + vertical)
        { start: 15, end: 30, from: [startRow, startCol], to: [startRow, packCol], action: 'driving', carrying: true },
        { start: 30, end: 45, from: [startRow, packCol], to: [packRow, packCol], action: 'driving', carrying: true },
        
        // Fase 3: Dropping en muelle
        { start: 45, end: 60, pos: [packRow, packCol], action: 'dropping', carrying: true },
        
        // Fase 4: Regresar a estantería
        { start: 60, end: 75, from: [packRow, packCol], to: [startRow, packCol], action: 'driving', carrying: false },
        { start: 75, end: 90, from: [startRow, packCol], to: [startRow, startCol], action: 'driving', carrying: false },
        
        // Fase 5: Idle
        { start: 90, end: 182, pos: [startRow, startCol], action: 'idle', carrying: false },
      ];
      
      let currentPhase = phases.find(p => currentStep >= p.start && currentStep < p.end) || phases[phases.length - 1];
      const progress = Math.min(1, (currentStep - currentPhase.start) / Math.max(1, (currentPhase.end - currentPhase.start)));
      
      let r, c;
      if (currentPhase.pos) {
        r = currentPhase.pos[0];
        c = currentPhase.pos[1];
      } else if (currentPhase.from && currentPhase.to) {
        r = currentPhase.from[0] + (currentPhase.to[0] - currentPhase.from[0]) * progress;
        c = currentPhase.from[1] + (currentPhase.to[1] - currentPhase.from[1]) * progress;
      } else {
        r = startRow;
        c = startCol;
      }
      
      const battery = Math.max(79, 100 - (currentStep / 182) * 21 - (id * 1.5));

      return {
        id: `robot_00${id + 1}`,
        pos: [Math.round(r), Math.round(c)],
        driving: currentPhase.action === 'driving',
        is_picking: currentPhase.action === 'picking',
        is_dropping: currentPhase.action === 'dropping',
        is_charging: currentStep > 170,
        is_carrying: currentPhase.carrying,
        battery: Math.round(battery),
        route: currentPhase.action === 'driving' && currentPhase.from && currentPhase.to 
          ? [currentPhase.from, currentPhase.to] 
          : []
      };
    };

    const robots = [0, 1, 2, 3, 4].map(i => getRobotState(i, step));
    const packages = robots.filter(r => !r.is_carrying && r.pos[0] > 5 && r.pos[0] < 45).map(r => [r.pos[0], r.pos[1]]);

    setLatestFrame({ step, robots, packages });
  }, [step, gridData]);

  // 2. Movimiento de robots por los PASILLOS
   // 2. Movimiento de robots SIGUIENDO LOS PASILLOS
  useEffect(() => {
    if (!gridData) return;

    const getRobotState = (id: number, currentStep: number) => {
      // POSICIONES INICIALES EN PASILLOS (no en estanterías)
      // Los pasillos están en las columnas 4, 10, 16, 22, 28, 34, 40, 46
      // y filas 4, 10, 16, 22, 28, 34, 40, 46
      const aislePositions = [
        [4, 4], [10, 16], [22, 28], [28, 10], [40, 34]
      ];
      const [startRow, startCol] = aislePositions[id];
      
      // Muelle destino
      const packingPositions = [
        [3, 47], [21, 47], [36, 3], [47, 16], [47, 31]
      ];
      const [packRow, packCol] = packingPositions[id];

      // Fases del viaje SIGUIENDO PASILLOS
      const phases = [
        // Fase 1: Idle en pasillo
        { start: 0, end: 10, pos: [startRow, startCol], action: 'idle', carrying: false },
        
        // Fase 2: Moverse horizontalmente por el pasillo
        { start: 10, end: 25, from: [startRow, startCol], to: [startRow, packCol], action: 'driving', carrying: false },
        
        // Fase 3: Moverse verticalmente hacia el muelle
        { start: 25, end: 40, from: [startRow, packCol], to: [packRow, packCol], action: 'driving', carrying: false },
        
        // Fase 4: Picking (simulado en el muelle)
        { start: 40, end: 50, pos: [packRow, packCol], action: 'picking', carrying: false },
        
        // Fase 5: Regresar horizontalmente
        { start: 50, end: 65, from: [packRow, packCol], to: [packRow, startCol], action: 'driving', carrying: true },
        
        // Fase 6: Regresar verticalmente
        { start: 65, end: 80, from: [packRow, startCol], to: [startRow, startCol], action: 'driving', carrying: true },
        
        // Fase 7: Dropping
        { start: 80, end: 90, pos: [startRow, startCol], action: 'dropping', carrying: true },
        
        // Fase 8: Idle final
        { start: 90, end: 182, pos: [startRow, startCol], action: 'idle', carrying: false },
      ];
      
      let currentPhase = phases.find(p => currentStep >= p.start && currentStep < p.end) || phases[phases.length - 1];
      const progress = Math.min(1, (currentStep - currentPhase.start) / Math.max(1, (currentPhase.end - currentPhase.start)));
      
      let r, c;
      if (currentPhase.pos) {
        r = currentPhase.pos[0];
        c = currentPhase.pos[1];
      } else if (currentPhase.from && currentPhase.to) {
        r = currentPhase.from[0] + (currentPhase.to[0] - currentPhase.from[0]) * progress;
        c = currentPhase.from[1] + (currentPhase.to[1] - currentPhase.from[1]) * progress;
      } else {
        r = startRow;
        c = startCol;
      }
      
      const battery = Math.max(79, 100 - (currentStep / 182) * 21 - (id * 1.5));

      return {
        id: `robot_00${id + 1}`,
        pos: [Math.round(r), Math.round(c)],
        driving: currentPhase.action === 'driving',
        is_picking: currentPhase.action === 'picking',
        is_dropping: currentPhase.action === 'dropping',
        is_charging: currentStep > 170,
        is_carrying: currentPhase.carrying,
        battery: Math.round(battery),
        route: currentPhase.action === 'driving' && currentPhase.from && currentPhase.to 
          ? [currentPhase.from, currentPhase.to] 
          : []
      };
    };

    const robots = [0, 1, 2, 3, 4].map(i => getRobotState(i, step));
    
    // Los paquetes están en las ESTANTERÍAS que tienen items, no en los robots
    const packages = [];
    for (let r = 0; r < 50; r++) {
      for (let c = 0; c < 50; c++) {
        const cell = gridData[r] && gridData[r][c];
        if (cell && cell.is_shelf && cell.has_item) {
          // Verificar que no haya un robot justo aquí recogiendo
          const robotHere = robots.some(robot => 
            robot.pos[0] === r && robot.pos[1] === c && robot.is_picking
          );
          if (!robotHere) {
            packages.push([r, c]);
          }
        }
      }
    }

    setLatestFrame({ step, robots, packages });
  }, [step, gridData]);

    // 2. Simular el movimiento de los robots siguiendo los PASILLOS REALES
  useEffect(() => {
    if (!gridData) return;

    const getRobotState = (id: number, currentStep: number) => {
      // Rutas que SIGUEN LOS PASILLOS (no diagonales)
      // Cada robot va a una columna de estantería diferente
      const shelfColumns = [4, 12, 20, 28, 36]; // Columnas centrales de cada bloque
      const targetCol = shelfColumns[id];
      
      // Fases del viaje siguiendo pasillos:
      const phases = [
        // Fase 1: Idle en zona de carga
        { start: 0, end: 15, pos: [45, 46], action: 'idle', carrying: false },
        
        // Fase 2: Ir hacia el pasillo horizontal (fila 45)
        { start: 15, end: 25, from: [45, 46], to: [45, targetCol], action: 'driving', carrying: false },
        
        // Fase 3: Subir por el pasillo vertical hasta la estantería
        { start: 25, end: 40, from: [45, targetCol], to: [15, targetCol], action: 'driving', carrying: false },
        
        // Fase 4: Picking (recoger)
        { start: 40, end: 50, pos: [15, targetCol], action: 'picking', carrying: false },
        
        // Fase 5: Bajar por el pasillo hacia muelles
        { start: 50, end: 70, from: [15, targetCol], to: [45, targetCol], action: 'driving', carrying: true },
        
        // Fase 6: Ir hacia los muelles (fila 45, columna 46)
        { start: 70, end: 85, from: [45, targetCol], to: [10, 46], action: 'driving', carrying: true },
        
        // Fase 7: Dropping (entregar)
        { start: 85, end: 95, pos: [10, 46], action: 'dropping', carrying: true },
        
        // Fase 8: Regresar a zona de carga
        { start: 95, end: 115, from: [10, 46], to: [45, 46], action: 'driving', carrying: false },
        
        // Fase 9: Idle final
        { start: 115, end: 182, pos: [45, 46], action: 'idle', carrying: false },
      ];
      
      let currentPhase = phases.find(p => currentStep >= p.start && currentStep < p.end) || phases[phases.length - 1];
      const progress = Math.min(1, (currentStep - currentPhase.start) / Math.max(1, (currentPhase.end - currentPhase.start)));
      
      const r = currentPhase.from ? currentPhase.from[0] + (currentPhase.to[0] - currentPhase.from[0]) * progress : currentPhase.pos[0];
      const c = currentPhase.from ? currentPhase.from[1] + (currentPhase.to[1] - currentPhase.from[1]) * progress : currentPhase.pos[1];
      
      const battery = Math.max(79, 100 - (currentStep / 182) * 21 - (id * 1.5));

      return {
        id: `robot_00${id + 1}`,
        pos: [Math.round(r), Math.round(c)],
        driving: currentPhase.action === 'driving',
        is_picking: currentPhase.action === 'picking',
        is_dropping: currentPhase.action === 'dropping',
        is_charging: currentStep > 170,
        is_carrying: currentPhase.carrying,
        battery: Math.round(battery),
        route: currentPhase.action === 'driving' && currentPhase.from && currentPhase.to 
          ? [currentPhase.from, currentPhase.to] 
          : []
      };
    };

    const robots = [0, 1, 2, 3, 4].map(i => getRobotState(i, step));
    const packages = robots.filter(r => !r.is_carrying && r.pos[0] > 10 && r.pos[0] < 45).map(r => [r.pos[0], r.pos[1]]);

    setLatestFrame({ step, robots, packages });
  }, [step, gridData]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gridData || !latestFrame) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CELL_SIZE = 14;
    const ROWS = 50;
    const COLS = 50;

    const lightenColor = (color: string, percent: number) => {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.min(255, (num >> 16) + amt);
        const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
        const B = Math.min(255, (num & 0x0000FF) + amt);
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    };

    ctx.fillStyle = '#e8e8e8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(0,0,0,0.03)'; ctx.lineWidth = 0.5;
    for (let r = 0; r <= ROWS; r++) { ctx.beginPath(); ctx.moveTo(0, r * CELL_SIZE); ctx.lineTo(COLS * CELL_SIZE, r * CELL_SIZE); ctx.stroke(); }
    for (let c = 0; c <= COLS; c++) { ctx.beginPath(); ctx.moveTo(c * CELL_SIZE, 0); ctx.lineTo(c * CELL_SIZE, ROWS * CELL_SIZE); ctx.stroke(); }

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = gridData[r] && gridData[r][c];
        if (!cell) continue;
        const x = c * CELL_SIZE; const y = r * CELL_SIZE;

        if (cell.is_shelf) {
          ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.fillRect(x + 2, y + 2, CELL_SIZE - 2, CELL_SIZE - 2);
          const gradient = ctx.createLinearGradient(x, y, x + CELL_SIZE, y + CELL_SIZE);
          gradient.addColorStop(0, '#a0826d'); gradient.addColorStop(0.5, '#8b7355'); gradient.addColorStop(1, '#6b5340');
          ctx.fillStyle = gradient; ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
          ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 0.5;
          ctx.beginPath(); ctx.moveTo(x + 2, y + CELL_SIZE * 0.35); ctx.lineTo(x + CELL_SIZE - 2, y + CELL_SIZE * 0.35); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(x + 2, y + CELL_SIZE * 0.65); ctx.lineTo(x + CELL_SIZE - 2, y + CELL_SIZE * 0.65); ctx.stroke();
          if (cell.has_item) { ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.arc(x + CELL_SIZE / 2, y + CELL_SIZE / 2, 1.5, 0, Math.PI * 2); ctx.fill(); }
        } else if (cell.is_packing) {
          const gradient = ctx.createRadialGradient(x + CELL_SIZE/2, y + CELL_SIZE/2, 0, x + CELL_SIZE/2, y + CELL_SIZE/2, CELL_SIZE);
          gradient.addColorStop(0, '#fbbf24'); gradient.addColorStop(1, '#f59e0b');
          ctx.fillStyle = gradient; ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
          ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1.5; ctx.strokeRect(x + 0.5, y + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);
          ctx.fillStyle = 'rgba(255,255,255,0.95)'; ctx.font = 'bold 8px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('📦', x + CELL_SIZE / 2, y + CELL_SIZE / 2 + 1);
        } else if (cell.is_charging) {
          const gradient = ctx.createRadialGradient(x + CELL_SIZE/2, y + CELL_SIZE/2, 0, x + CELL_SIZE/2, y + CELL_SIZE/2, CELL_SIZE);
          gradient.addColorStop(0, '#34d399'); gradient.addColorStop(1, '#10b981');
          ctx.fillStyle = gradient; ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
          ctx.strokeStyle = '#065f46'; ctx.lineWidth = 1.5; ctx.strokeRect(x + 0.5, y + 0.5, CELL_SIZE - 1, CELL_SIZE - 1);
          ctx.fillStyle = 'rgba(255,255,255,0.95)'; ctx.font = 'bold 9px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.fillText('⚡', x + CELL_SIZE / 2, y + CELL_SIZE / 2 + 1);
        } else {
          ctx.fillStyle = '#f0f0f0'; ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        }
        ctx.strokeStyle = 'rgba(0,0,0,0.05)'; ctx.lineWidth = 0.3; ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
      }
    }

    latestFrame.robots.forEach((robot: any) => {
      if (robot.route && robot.route.length > 1) {
        ctx.strokeStyle = 'rgba(255, 153, 0, 0.4)'; ctx.lineWidth = 2; ctx.setLineDash([3, 3]); ctx.beginPath();
        robot.route.forEach((pos: number[], i: number) => {
          const px = pos[1] * CELL_SIZE + CELL_SIZE / 2; const py = pos[0] * CELL_SIZE + CELL_SIZE / 2;
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke(); ctx.setLineDash([]);
      }
    });

    const robotsCarrying = new Set();
    latestFrame.robots.forEach((robot: any) => { if (robot.is_carrying) robotsCarrying.add(`${robot.pos[0]},${robot.pos[1]}`); });
    latestFrame.packages.forEach((pkg: number[]) => {
      if (robotsCarrying.has(`${pkg[0]},${pkg[1]}`)) return;
      const px = pkg[1] * CELL_SIZE + CELL_SIZE / 2; const py = pkg[0] * CELL_SIZE + CELL_SIZE / 2;
      ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fillRect(px - 4, py - 4, 8, 8);
      ctx.fillStyle = '#fbbf24'; ctx.fillRect(px - 5, py - 5, 10, 10);
      ctx.strokeStyle = '#92400e'; ctx.lineWidth = 1; ctx.strokeRect(px - 5, py - 5, 10, 10);
    });

    const colors = ['#FF9900', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6'];
    latestFrame.robots.forEach((robot: any, idx: number) => {
      const px = robot.pos[1] * CELL_SIZE + CELL_SIZE / 2;
      const py = robot.pos[0] * CELL_SIZE + CELL_SIZE / 2;
      const radius = CELL_SIZE * 0.45;
      const robotNum = parseInt(robot.id.split('_').pop() || '0');
      let color = colors[robotNum % colors.length];
      if (robot.is_charging) color = '#10b981';
      else if (robot.is_picking) color = '#fbbf24';
      else if (robot.is_dropping) color = '#a855f7';
      else if (robot.battery < 20) color = '#ef4444';
      else if (robot.battery < 40) color = '#f59e0b';

      ctx.beginPath(); ctx.arc(px + 1.5, py + 1.5, radius, 0, Math.PI * 2); ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fill();
      const gradient = ctx.createRadialGradient(px - radius/3, py - radius/3, 0, px, py, radius);
      gradient.addColorStop(0, lightenColor(color, 30)); gradient.addColorStop(1, color);
      ctx.beginPath(); ctx.arc(px, py, radius, 0, Math.PI * 2); ctx.fillStyle = gradient; ctx.fill();
      ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 1.5; ctx.stroke();

      if (robot.driving) {
        ctx.beginPath(); ctx.arc(px, py, radius + 2, 0, Math.PI * 2); ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)'; ctx.lineWidth = 1; ctx.stroke();
      }

      ctx.fillStyle = 'white'; ctx.font = 'bold 7px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(robot.id.toString(), px, py - 1);

      let icon = '';
      if (robot.is_charging) icon = '⚡'; else if (robot.is_picking) icon = '📥'; else if (robot.is_dropping) icon = '📤'; else if (robot.is_carrying) icon = '📦';
      if (icon) { ctx.font = '6px Arial'; ctx.fillText(icon, px, py + 4); }

      const barWidth = CELL_SIZE * 0.7; const barHeight = 2; const barX = px - barWidth / 2; const barY = py + radius + 1;
      ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(barX, barY, barWidth, barHeight);
      ctx.fillStyle = robot.battery > 60 ? '#10b981' : (robot.battery > 30 ? '#f59e0b' : '#ef4444');
      ctx.fillRect(barX, barY, barWidth * (robot.battery / 100), barHeight);
    });
  }, [gridData, latestFrame]);

  return (
    <div className="relative w-full flex justify-center items-center bg-[#0a0e17] p-4 rounded-xl border border-zinc-800">
      <div className="absolute top-4 left-4 z-10 px-3 py-2 bg-slate-900/90 rounded-lg border border-slate-700 text-xs text-slate-300 font-semibold">
        🏭 ALMACÉN LOGÍSTICO - Vista Superior
      </div>
      <div className="absolute bottom-4 left-4 z-10 p-3 bg-slate-900/90 rounded-lg border border-slate-700 text-[10px] text-slate-300 space-y-1.5">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-gradient-to-br from-[#a0826d] to-[#6b5340] border border-slate-600"></div> Estantería</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] border border-slate-600"></div> Muelle Empaque</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-gradient-to-br from-[#34d399] to-[#10b981] border border-slate-600"></div> Estación Carga</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-[#fbbf24] border border-slate-600"></div> Paquete</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#FF9900] border border-slate-600"></div> Robot</div>
      </div>
      <canvas ref={canvasRef} width={700} height={700} className="max-w-full h-auto rounded-lg shadow-2xl" style={{ imageRendering: 'pixelated' }} />
    </div>
  );
};

// ==========================================
// PÁGINA PRINCIPAL DE SIMULACIÓN
// ==========================================
const Simulation = () => {
  const { language } = useContext(LanguageContext);
  const isEs = language === 'es';

  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [delivered, setDelivered] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const logsContainerRef = useRef<HTMLDivElement>(null);

  const MAX_STEPS = 182;
  const TOTAL_PACKAGES = 25;

  const mockLogs = [
    { step: 0, msg: isEs ? "🚀 Iniciando sistema..." : "🚀 Starting system..." },
    { step: 5, msg: isEs ? "✅ Mapa del almacén cargado (50x50, 374 estanterías)" : "✅ Warehouse map loaded (50x50, 374 shelves)" },
    { step: 10, msg: isEs ? "📋 Orden generada: 25 paquetes → 5 robots activados" : "📋 Order generated: 25 packages → 5 robots activated" },
    { step: 15, msg: isEs ? "🤖 Asignación: 5 paquetes por robot (TSP calculado)" : "🤖 Assignment: 5 packages per robot (TSP calculated)" },
    { step: 20, msg: isEs ? "📤 MQTT: Enviando rutas a R0, R1, R2, R3, R4..." : "📤 MQTT: Sending routes to R0, R1, R2, R3, R4..." },
    { step: 35, msg: isEs ? "📥 R0 y R3 recogiendo paquetes en Estanterías S46, S54..." : "📥 R0 and R3 picking packages at Shelves S46, S54..." },
    { step: 50, msg: isEs ? "🔋 Batería: R0:91%, R1:91%, R2:90%, R3:92%, R4:90%" : "🔋 Battery: R0:91%, R1:91%, R2:90%, R3:92%, R4:90%" },
    { step: 75, msg: isEs ? "📦 R0 completó 5 paquetes. Dirigiéndose a Muelle (2, 2)" : "📦 R0 completed 5 packages. Heading to Dock (2, 2)" },
    { step: 100, msg: isEs ? "🏭 R0 entregó 5 paquetes reales en Muelle. Batería: 79%" : "🏭 R0 delivered 5 real packages to Dock. Battery: 79%" },
    { step: 125, msg: isEs ? "📦 R1, R2, R3 completando entregas en muelles asignados..." : "📦 R1, R2, R3 completing deliveries at assigned docks..." },
    { step: 150, msg: isEs ? "✅ R3 entregó 5 paquetes. Último robot en ruta." : "✅ R3 delivered 5 packages. Last robot en route." },
    { step: 182, msg: isEs ? "🎉 SIMULACIÓN COMPLETADA. Generando reporte ejecutivo..." : "🎉 SIMULATION COMPLETED. Generating executive report..." }
  ];

  // Datos de inventario para el reporte final
  const mockShelves = [
    { id: 'S01', coords: '(2, 4)', occupied: 8, total: 40 }, { id: 'S02', coords: '(2, 6)', occupied: 2, total: 40 },
    { id: 'S03', coords: '(2, 8)', occupied: 3, total: 40 }, { id: 'S04', coords: '(2, 10)', occupied: 8, total: 40 },
    { id: 'S05', coords: '(2, 14)', occupied: 8, total: 40 }, { id: 'S06', coords: '(2, 16)', occupied: 2, total: 40 },
    { id: 'S07', coords: '(2, 18)', occupied: 8, total: 40 }, { id: 'S08', coords: '(2, 20)', occupied: 4, total: 40 },
    { id: 'S10', coords: '(2, 26)', occupied: 2, total: 40 }, { id: 'S100', coords: '(14, 18)', occupied: 4, total: 40 },
  ];

  const mockProducts = [
    { sku: 'SKU-3002', nameEs: 'Juego de Copas', nameEn: 'Glass Set', shelf: 'S57' },
    { sku: 'SKU-1005', nameEs: 'Botella de Agua', nameEn: 'Water Bottle', shelf: 'S42' },
    { sku: 'SKU-3004', nameEs: 'Lámpara de Mesa', nameEn: 'Table Lamp', shelf: 'S206' },
    { sku: 'SKU-2001', nameEs: 'Monitor 27"', nameEn: '27" Monitor', shelf: 'S321' },
    { sku: 'SKU-1006', nameEs: 'Auriculares BT', nameEn: 'BT Headphones', shelf: 'S188' },
    { sku: 'SKU-1008', nameEs: 'Cargador USB', nameEn: 'USB Charger', shelf: 'S186' },
    { sku: 'SKU-3001', nameEs: 'Vino Premium', nameEn: 'Premium Wine', shelf: 'S369' },
    { sku: 'SKU-2006', nameEs: 'Torre de PC', nameEn: 'PC Tower', shelf: 'S166' },
    { sku: 'SKU-2004', nameEs: 'Caja Herram.', nameEn: 'Toolbox', shelf: 'S276' },
    { sku: 'SKU-2002', nameEs: 'Impresora', nameEn: 'Printer', shelf: 'S48' },
  ];

  useEffect(() => {
    const container = logsContainerRef.current;
    if (!container) return;
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 50;
    if (isNearBottom) container.scrollTop = container.scrollHeight;
  }, [logs]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && step < MAX_STEPS) {
      interval = setInterval(() => {
        setStep(prev => {
          const nextStep = prev + 1;
          if (nextStep % 35 === 0 && delivered < TOTAL_PACKAGES) {
            setDelivered(d => Math.min(d + 5, TOTAL_PACKAGES));
          }
          const logEvent = mockLogs.find(l => l.step === nextStep);
          if (logEvent) setLogs(prevLogs => [...prevLogs, `[Paso ${nextStep}] ${logEvent.msg}`]);
          if (nextStep >= MAX_STEPS) {
            setIsRunning(false);
            setLogs(prevLogs => [...prevLogs, isEs ? "✅ REPORTE EJECUTIVO GENERADO" : "✅ EXECUTIVE REPORT GENERATED"]);
          }
          return nextStep;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isRunning, step, delivered, isEs]);

  const handleStart = () => {
    if (step >= MAX_STEPS) { setStep(0); setDelivered(0); setLogs([]); }
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false); setStep(0); setDelivered(0); setLogs([]);
  };

  const progress = Math.round((step / MAX_STEPS) * 100);
  const currentBattery = Math.max(79, 100 - Math.floor((step / MAX_STEPS) * 21));
  const currentProfit = (11.87 * (step / MAX_STEPS)).toFixed(2);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white">FleetMind <span className="text-zinc-500 font-normal">| Live Simulation</span></h1>
          </div>
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-2 ${isRunning ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'}`}>
              <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-500'}`}></span>
              {isRunning ? (isEs ? 'EJECUTANDO' : 'RUNNING') : (isEs ? 'EN ESPERA' : 'IDLE')}
            </div>
            <button onClick={isRunning ? () => setIsRunning(false) : handleStart} className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 transition-colors">
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 text-emerald-400" />}
            </button>
            <button onClick={handleReset} className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 transition-colors">
              <RotateCcw className="w-5 h-5 text-zinc-400" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <WarehouseCanvas step={step} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <KPICard icon={Clock} label={isEs ? "Tiempo Ciclo" : "Cycle Time"} value={`${(step * 0.05).toFixed(1)}s`} target="3.03s" progress={progress} color="blue" />
              <KPICard icon={Package} label={isEs ? "Entregados" : "Delivered"} value={`${delivered}/${TOTAL_PACKAGES}`} target="25/25" progress={(delivered/TOTAL_PACKAGES)*100} color="orange" />
              <KPICard icon={Battery} label={isEs ? "Batería Prom." : "Avg Battery"} value={`${currentBattery}%`} target="79%" progress={currentBattery} color="emerald" />
              <KPICard icon={DollarSign} label={isEs ? "Ganancia Proyectada" : "Proj. Profit"} value={`$${currentProfit}`} target="$11.87" progress={progress} color="purple" />
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl border border-zinc-800 flex flex-col h-[600px] lg:h-auto">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between flex-shrink-0">
              <h3 className="font-semibold text-zinc-300 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-zinc-500" />
                {isEs ? 'Logs del Sistema' : 'System Logs'}
              </h3>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
              </div>
            </div>
            
            {/* CONTENEDOR DE LOGS CORREGIDO (Sin duplicados) */}
            <div 
              ref={logsContainerRef}
              className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent max-h-[500px]"
            >
              {logs.length === 0 && (
                <div className="text-zinc-600 italic text-center mt-20">
                  {isEs ? 'Presiona ▶ para iniciar la simulación...' : 'Press ▶ to start simulation...'}
                </div>
              )}
              {logs.map((log, idx) => (
                <div key={idx} className="animate-in fade-in slide-in-from-left-2 duration-300">
                  <span className="text-zinc-500">[{new Date().toLocaleTimeString()}]</span>{' '}
                  <span className={log.includes('✅') || log.includes('🎉') ? 'text-emerald-400' : log.includes('📤') || log.includes('📦') ? 'text-blue-400' : 'text-zinc-300'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-zinc-800 bg-zinc-950/50 rounded-b-xl flex-shrink-0">
              <div className="flex justify-between text-xs text-zinc-500 mb-2">
                <span>{isEs ? 'Progreso de la Orden' : 'Order Progress'}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            REPORTE EJECUTIVO EXPANDIDO
        ========================================== */}
        {step >= MAX_STEPS && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-6">
            <div className="bg-gradient-to-br from-emerald-900/20 to-zinc-900 rounded-2xl border border-emerald-500/30 p-8">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white">{isEs ? 'Reporte Ejecutivo: Orden Completada' : 'Executive Report: Order Completed'}</h2>
              </div>
              
              {/* Métricas Principales */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <ReportMetric label={isEs ? "Throughput Final" : "Final Throughput"} value="6.59 paq/min" />
                <ReportMetric label={isEs ? "Utilización de Flota" : "Fleet Utilization"} value="74.2%" />
                <ReportMetric label="SLA Compliance" value="100%" highlight />
                <ReportMetric label={isEs ? "Ganancia Neta" : "Net Profit"} value="$11.87" highlight />
              </div>

              {/* Proyecciones de Capacidad */}
              <div className="border-t border-zinc-700 pt-6 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-orange-400" />
                  {isEs ? 'Proyecciones de Capacidad' : 'Capacity Projections'}
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <CapacityCard label={isEs ? "Capacidad Diaria" : "Daily Capacity"} value="3,936" unit={isEs ? "paq/día" : "pkg/day"} />
                  <CapacityCard label={isEs ? "Capacidad Semanal" : "Weekly Capacity"} value="27,552" unit={isEs ? "paq/semana" : "pkg/week"} />
                  <CapacityCard label={isEs ? "Capacidad Mensual" : "Monthly Capacity"} value="118,080" unit={isEs ? "paq/mes" : "pkg/month"} />
                </div>
              </div>

              {/* Historial e Inventario */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Historial de Movimientos */}
                <div className="bg-zinc-950/50 rounded-xl border border-zinc-800 p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-400" />
                    {isEs ? 'Historial de Movimientos' : 'Movement History'}
                  </h3>
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-white mb-1">492</div>
                    <div className="text-sm text-zinc-400">{isEs ? "Total de Paquetes Entregados" : "Total Packages Delivered"}</div>
                  </div>
                  <div className="space-y-4">
                    <CategoryBar label="Normal" value={194} total={492} color="bg-blue-500" />
                    <CategoryBar label="Heavy" value={139} total={492} color="bg-orange-500" />
                    <CategoryBar label="Fragile" value={15} total={492} color="bg-red-500" />
                  </div>
                </div>

                {/* Detalle de Inventario */}
                <div className="bg-zinc-950/50 rounded-xl border border-zinc-800 p-6 flex flex-col">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-emerald-400" />
                    {isEs ? 'Inventario en Tiempo Real' : 'Real-time Inventory'}
                  </h3>
                  <div className="flex-1 grid grid-cols-2 gap-4 text-xs">
                    {/* Estanterías */}
                    <div className="overflow-hidden flex flex-col">
                      <div className="font-semibold text-zinc-300 mb-2">{isEs ? "Estanterías con Productos" : "Shelves with Products"}</div>
                      <div className="bg-zinc-900 rounded-lg p-2 flex-1 overflow-y-auto font-mono space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-700">
                        {mockShelves.map((s, i) => (
                          <div key={i} className="flex justify-between text-zinc-400 border-b border-zinc-800 pb-1">
                            <span className="text-emerald-400">{s.id}</span>
                            <span className="text-zinc-500">{s.coords}</span>
                            <span>{s.occupied}/{s.total}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Productos */}
                    <div className="overflow-hidden flex flex-col">
                      <div className="font-semibold text-zinc-300 mb-2">{isEs ? "Productos Restantes" : "Remaining Products"}</div>
                      <div className="bg-zinc-900 rounded-lg p-2 flex-1 overflow-y-auto font-mono space-y-1.5 scrollbar-thin scrollbar-thumb-zinc-700">
                        {mockProducts.map((p, i) => (
                          <div key={i} className="flex justify-between text-zinc-400 border-b border-zinc-800 pb-1">
                            <span className="text-blue-400">{p.sku}</span>
                            <span className="truncate max-w-[70px]">{isEs ? p.nameEs : p.nameEn}</span>
                            <span className="text-zinc-500">{p.shelf}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Link to="/contact" className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-colors flex items-center gap-2">
                  {isEs ? 'Solicitar Demo con mis Datos' : 'Request Demo with My Data'}
                  <Zap className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// ==========================================
// COMPONENTES DE TARJETAS
// ==========================================
const KPICard = ({ icon: Icon, label, value, target, progress, color }: any) => {
  const colorClasses: any = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  };
  return (
    <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 relative overflow-hidden group hover:border-zinc-700 transition-colors">
      <div className={`absolute top-0 right-0 w-16 h-16 ${colorClasses[color].split(' ')[1]} rounded-bl-full opacity-50`}></div>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${colorClasses[color].split(' ')[0]}`} />
        <span className="text-xs font-medium text-zinc-500">{label}</span>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-[10px] text-zinc-600 font-mono">Target: {target}</div>
      <div className="mt-3 w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
        <div className={`h-full ${colorClasses[color].split(' ')[0].replace('text-', 'bg-')} transition-all duration-300`} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

const ReportMetric = ({ label, value, highlight }: any) => (
  <div className="text-center p-4 bg-zinc-950/50 rounded-xl border border-zinc-800">
    <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">{label}</div>
    <div className={`text-3xl font-bold ${highlight ? 'text-emerald-400' : 'text-white'}`}>{value}</div>
  </div>
);

export default Simulation;