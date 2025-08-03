// Type definitions for product demo components

export interface PlantPerformance {
  totalProductionRate: string;
  uptimePercentage: string;
  efficiency: string;
  status: string;
}

export interface Alert {
  id: number;
  type: string;
  message: string;
  severity: string;
  timestamp: string;
}

export interface Maintenance {
  id: number;
  equipment: string;
  scheduled: string;
  type: string;
}

export interface Order {
  customer: string;
  product: string;
  quantity: string;
  value: string;
}

export interface DemandHighlights {
  topOrders: Order[];
  forecastTrend: string;
}

export interface OverviewData {
  plantPerformance: PlantPerformance;
  criticalAlerts: Alert[];
  upcomingMaintenance: Maintenance[];
  demandHighlights: DemandHighlights;
}

export interface SubLine {
  id: string;
  name: string;
  status: string;
  rate: number;
}

export interface ProductionLine {
  id: string;
  name: string;
  status: string;
  cleaningStatus: string;
  capacity: number;
  currentRate: number;
  utilizationPercentage: number;
  oee: number;
  subLines: SubLine[];
}

export interface Metric {
  value: number;
  unit: string;
  status: string;
}

export interface Machine {
  id: string;
  name: string;
  status: string;
  location: string;
  metrics: {
    flowRate: Metric;
    vibration: Metric;
    temperature: Metric;
  };
  oee: number;
  lastMaintenance: string;
  nextMaintenance: string;
}

export interface Facility {
  id: string;
  name: string;
  location: string;
  type: string;
  capacity: string;
  currentProduction?: string;
  currentStock?: string;
  utilization: number;
  status: string;
}

export interface Supplier {
  id: string;
  name: string;
  product: string;
  volume: string;
  quality: string;
  reliability: string;
  status: string;
}

export interface SupplyData {
  facilities: Facility[];
  suppliers: Supplier[];
}