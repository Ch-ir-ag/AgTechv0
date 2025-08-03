import { OverviewData, ProductionLine, Machine, SupplyData } from './types';

// Demo data for all sections
export const demoData = {
  overview: {
    plantPerformance: {
      totalProductionRate: '2,450 units/hour',
      uptimePercentage: '94.2%',
      efficiency: '89.5%',
      status: 'optimal'
    },
    criticalAlerts: [
      { id: 1, type: 'machine', message: 'Line 3 vibration elevated', severity: 'warning', timestamp: '2 min ago' },
      { id: 2, type: 'maintenance', message: 'Mixer B maintenance overdue', severity: 'critical', timestamp: '15 min ago' },
      { id: 3, type: 'quality', message: 'Temperature variance in Freezer Unit 2', severity: 'warning', timestamp: '8 min ago' }
    ],
    upcomingMaintenance: [
      { id: 1, equipment: 'Conveyor Belt A', scheduled: 'Aug 15, 2025', type: 'preventive' },
      { id: 2, equipment: 'Packaging Line 2', scheduled: 'Aug 18, 2025', type: 'routine' },
      { id: 3, equipment: 'Pasteurizer Unit', scheduled: 'Aug 22, 2025', type: 'predictive' }
    ],
    demandHighlights: {
      topOrders: [
        { customer: 'Whole Foods Market', product: 'Organic Yogurt', quantity: '5,000 units', value: '$25,000' },
        { customer: 'Target Corp', product: 'Greek Yogurt Cups', quantity: '12,000 units', value: '$48,000' },
        { customer: 'Costco Wholesale', product: 'Bulk Cheese Blocks', quantity: '2,500 units', value: '$75,000' }
      ],
      forecastTrend: '+12.5% next quarter'
    }
  } as OverviewData,
  productionLines: [
    {
      id: 'line1',
      name: 'Production Line 1',
      status: 'running',
      cleaningStatus: 'clean',
      capacity: 500,
      currentRate: 420,
      utilizationPercentage: 84,
      oee: 87.2,
      subLines: [
        { id: 'line1a', name: 'Line 1A', status: 'running', rate: 210 },
        { id: 'line1b', name: 'Line 1B', status: 'running', rate: 210 }
      ]
    },
    {
      id: 'line2',
      name: 'Production Line 2',
      status: 'running',
      cleaningStatus: 'needs_cleaning',
      capacity: 450,
      currentRate: 234,
      utilizationPercentage: 52,
      oee: 75.3,
      subLines: [
        { id: 'line2a', name: 'Line 2A', status: 'running', rate: 117 },
        { id: 'line2b', name: 'Line 2B', status: 'running', rate: 117 }
      ]
    },
    {
      id: 'line3',
      name: 'Production Line 3',
      status: 'down',
      cleaningStatus: 'clean',
      capacity: 600,
      currentRate: 0,
      utilizationPercentage: 0,
      oee: 0,
      subLines: [
        { id: 'line3a', name: 'Line 3A', status: 'maintenance', rate: 0 },
        { id: 'line3b', name: 'Line 3B', status: 'down', rate: 0 }
      ]
    },
    {
      id: 'line4',
      name: 'Packaging Line A',
      status: 'running',
      cleaningStatus: 'clean',
      capacity: 800,
      currentRate: 720,
      utilizationPercentage: 90,
      oee: 92.1,
      subLines: []
    }
  ] as ProductionLine[],
  machines: [
    {
      id: 'machine1',
      name: 'Pasteurizer Unit A',
      status: 'running',
      location: 'Plant A, Line 1',
      metrics: {
        flowRate: { value: 150, unit: 'L/min', status: 'normal' },
        vibration: { value: 4.2, unit: 'Hz', status: 'normal' },
        temperature: { value: 78, unit: '°C', status: 'normal' }
      },
      oee: 89.5,
      lastMaintenance: '2025-07-15',
      nextMaintenance: '2025-08-15'
    },
    {
      id: 'machine2',
      name: 'Mixer B',
      status: 'maintenance',
      location: 'Plant A, Line 2',
      metrics: {
        flowRate: { value: 0, unit: 'L/min', status: 'offline' },
        vibration: { value: 0, unit: 'Hz', status: 'offline' },
        temperature: { value: 22, unit: '°C', status: 'normal' }
      },
      oee: 0,
      lastMaintenance: '2025-06-10',
      nextMaintenance: '2025-08-12'
    },
    {
      id: 'machine3',
      name: 'Packaging Robot C',
      status: 'warning',
      location: 'Plant B, Packaging Line A',
      metrics: {
        flowRate: { value: 200, unit: 'units/min', status: 'normal' },
        vibration: { value: 8.7, unit: 'Hz', status: 'warning' },
        temperature: { value: 45, unit: '°C', status: 'normal' }
      },
      oee: 72.5,
      lastMaintenance: '2025-07-22',
      nextMaintenance: '2025-08-22'
    }
  ] as Machine[],
  supply: {
    facilities: [
      {
        id: 'plant-a',
        name: 'Processing Plant A',
        location: 'Wisconsin',
        type: 'Primary Processing',
        capacity: '50,000 L/day',
        currentProduction: '42,500 L/day',
        utilization: 85,
        status: 'operational'
      },
      {
        id: 'plant-b',
        name: 'Processing Plant B',
        location: 'California',
        type: 'Secondary Processing',
        capacity: '35,000 L/day',
        currentProduction: '31,200 L/day',
        utilization: 89,
        status: 'operational'
      },
      {
        id: 'warehouse-1',
        name: 'Distribution Center 1',
        location: 'Illinois',
        type: 'Storage & Distribution',
        capacity: '100,000 units',
        currentStock: '78,500 units',
        utilization: 78.5,
        status: 'operational'
      }
    ],
    suppliers: [
      {
        id: 'supplier-1',
        name: 'Midwest Dairy Co-op',
        product: 'Raw Milk',
        volume: '25,000 L/day',
        quality: '98.5%',
        reliability: '99.2%',
        status: 'active'
      },
      {
        id: 'supplier-2',
        name: 'Organic Valley Farms',
        product: 'Organic Raw Milk',
        volume: '15,000 L/day',
        quality: '99.1%',
        reliability: '97.8%',
        status: 'active'
      }
    ]
  } as SupplyData
};