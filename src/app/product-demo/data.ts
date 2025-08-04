import { OverviewData, ProductionLine, Machine, SupplyData, WeeklyMakePlan } from './types';

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
    // Plant A - Primary Processing
    {
      id: 'machine1',
      name: 'Pasteurisation Unit A',
      status: 'running',
      location: 'Plant A, Line 1',
      function: 'Heats milk to 72°C for 15 seconds to eliminate harmful bacteria',
      energyUsage: 45.2,
      downtimeCost: 1250,
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
      name: 'Homogenisation Unit A',
      status: 'running',
      location: 'Plant A, Line 1',
      function: 'Breaks down fat globules to prevent cream separation',
      energyUsage: 38.7,
      downtimeCost: 980,
      metrics: {
        flowRate: { value: 145, unit: 'L/min', status: 'normal' },
        vibration: { value: 3.8, unit: 'Hz', status: 'normal' },
        temperature: { value: 65, unit: '°C', status: 'normal' }
      },
      oee: 92.1,
      lastMaintenance: '2025-07-10',
      nextMaintenance: '2025-08-10'
    },
    {
      id: 'machine3',
      name: 'Separation Centrifuge A',
      status: 'running',
      location: 'Plant A, Line 1',
      function: 'Separates cream from skim milk using centrifugal force',
      energyUsage: 52.3,
      downtimeCost: 2100,
      metrics: {
        flowRate: { value: 160, unit: 'L/min', status: 'normal' },
        vibration: { value: 5.1, unit: 'Hz', status: 'normal' },
        temperature: { value: 45, unit: '°C', status: 'normal' }
      },
      oee: 88.7,
      lastMaintenance: '2025-07-18',
      nextMaintenance: '2025-08-18'
    },
    {
      id: 'machine4',
      name: 'Cooling Unit A',
      status: 'running',
      location: 'Plant A, Line 1',
      function: 'Rapidly cools processed milk to 4°C for storage',
      energyUsage: 41.5,
      downtimeCost: 850,
      metrics: {
        flowRate: { value: 155, unit: 'L/min', status: 'normal' },
        vibration: { value: 2.9, unit: 'Hz', status: 'normal' },
        temperature: { value: 4, unit: '°C', status: 'normal' }
      },
      oee: 94.2,
      lastMaintenance: '2025-07-12',
      nextMaintenance: '2025-08-12'
    },
    {
      id: 'machine5',
      name: 'Filling Machine A',
      status: 'running',
      location: 'Plant A, Line 1',
      function: 'Automatically fills and seals milk containers',
      energyUsage: 28.9,
      downtimeCost: 650,
      metrics: {
        flowRate: { value: 200, unit: 'units/min', status: 'normal' },
        vibration: { value: 3.2, unit: 'Hz', status: 'normal' },
        temperature: { value: 22, unit: '°C', status: 'normal' }
      },
      oee: 91.8,
      lastMaintenance: '2025-07-20',
      nextMaintenance: '2025-08-20'
    },

    // Plant B - Secondary Processing
    {
      id: 'machine6',
      name: 'Yoghurt Fermentation Tank B',
      status: 'running',
      location: 'Plant B, Line 2',
      function: 'Maintains optimal temperature for yoghurt culture fermentation',
      energyUsage: 33.4,
      downtimeCost: 1800,
      metrics: {
        flowRate: { value: 80, unit: 'L/min', status: 'normal' },
        vibration: { value: 1.5, unit: 'Hz', status: 'normal' },
        temperature: { value: 42, unit: '°C', status: 'normal' }
      },
      oee: 87.3,
      lastMaintenance: '2025-07-14',
      nextMaintenance: '2025-08-14'
    },
    {
      id: 'machine7',
      name: 'Cheese Curd Cutter B',
      status: 'running',
      location: 'Plant B, Line 2',
      function: 'Cuts coagulated milk into curds for cheese production',
      energyUsage: 25.6,
      downtimeCost: 1200,
      metrics: {
        flowRate: { value: 60, unit: 'L/min', status: 'normal' },
        vibration: { value: 4.8, unit: 'Hz', status: 'normal' },
        temperature: { value: 35, unit: '°C', status: 'normal' }
      },
      oee: 89.1,
      lastMaintenance: '2025-07-16',
      nextMaintenance: '2025-08-16'
    },
    {
      id: 'machine8',
      name: 'Whey Separation Unit B',
      status: 'running',
      location: 'Plant B, Line 2',
      function: 'Separates whey from cheese curds using filtration',
      energyUsage: 29.8,
      downtimeCost: 950,
      metrics: {
        flowRate: { value: 70, unit: 'L/min', status: 'normal' },
        vibration: { value: 3.6, unit: 'Hz', status: 'normal' },
        temperature: { value: 38, unit: '°C', status: 'normal' }
      },
      oee: 90.4,
      lastMaintenance: '2025-07-11',
      nextMaintenance: '2025-08-11'
    },
    {
      id: 'machine9',
      name: 'Cheese Press B',
      status: 'running',
      location: 'Plant B, Line 2',
      function: 'Applies pressure to cheese curds to remove excess moisture',
      energyUsage: 31.2,
      downtimeCost: 1400,
      metrics: {
        flowRate: { value: 50, unit: 'units/min', status: 'normal' },
        vibration: { value: 2.4, unit: 'Hz', status: 'normal' },
        temperature: { value: 25, unit: '°C', status: 'normal' }
      },
      oee: 88.9,
      lastMaintenance: '2025-07-19',
      nextMaintenance: '2025-08-19'
    },
    {
      id: 'machine10',
      name: 'Cheese Ageing Chamber B',
      status: 'running',
      location: 'Plant B, Line 2',
      function: 'Maintains controlled environment for cheese maturation',
      energyUsage: 18.7,
      downtimeCost: 2200,
      metrics: {
        flowRate: { value: 0, unit: 'L/min', status: 'offline' },
        vibration: { value: 0.5, unit: 'Hz', status: 'normal' },
        temperature: { value: 12, unit: '°C', status: 'normal' }
      },
      oee: 95.6,
      lastMaintenance: '2025-07-08',
      nextMaintenance: '2025-08-08'
    },

    // Plant C - Cream Processing
    {
      id: 'machine11',
      name: 'Cream Separator C',
      status: 'running',
      location: 'Plant C, Line 3',
      function: 'Extracts cream from whole milk using centrifugal separation',
      energyUsage: 47.8,
      downtimeCost: 1600,
      metrics: {
        flowRate: { value: 120, unit: 'L/min', status: 'normal' },
        vibration: { value: 4.5, unit: 'Hz', status: 'normal' },
        temperature: { value: 50, unit: '°C', status: 'normal' }
      },
      oee: 91.2,
      lastMaintenance: '2025-07-13',
      nextMaintenance: '2025-08-13'
    },
    {
      id: 'machine12',
      name: 'Butter Churn C',
      status: 'running',
      location: 'Plant C, Line 3',
      function: 'Agitates cream to separate butterfat from buttermilk',
      energyUsage: 35.9,
      downtimeCost: 1100,
      metrics: {
        flowRate: { value: 90, unit: 'L/min', status: 'normal' },
        vibration: { value: 6.2, unit: 'Hz', status: 'normal' },
        temperature: { value: 15, unit: '°C', status: 'normal' }
      },
      oee: 86.7,
      lastMaintenance: '2025-07-17',
      nextMaintenance: '2025-08-17'
    },
    {
      id: 'machine13',
      name: 'Butter Washing Unit C',
      status: 'running',
      location: 'Plant C, Line 3',
      function: 'Rinses butter to remove remaining buttermilk',
      energyUsage: 22.4,
      downtimeCost: 750,
      metrics: {
        flowRate: { value: 75, unit: 'L/min', status: 'normal' },
        vibration: { value: 3.1, unit: 'Hz', status: 'normal' },
        temperature: { value: 12, unit: '°C', status: 'normal' }
      },
      oee: 93.4,
      lastMaintenance: '2025-07-09',
      nextMaintenance: '2025-08-09'
    },
    {
      id: 'machine14',
      name: 'Butter Packaging Machine C',
      status: 'running',
      location: 'Plant C, Line 3',
      function: 'Wraps and packages butter into retail units',
      energyUsage: 19.6,
      downtimeCost: 580,
      metrics: {
        flowRate: { value: 150, unit: 'units/min', status: 'normal' },
        vibration: { value: 2.8, unit: 'Hz', status: 'normal' },
        temperature: { value: 18, unit: '°C', status: 'normal' }
      },
      oee: 94.8,
      lastMaintenance: '2025-07-21',
      nextMaintenance: '2025-08-21'
    },
    {
      id: 'machine15',
      name: 'Cream Pasteurisation Unit C',
      status: 'running',
      location: 'Plant C, Line 3',
      function: 'Heats cream to eliminate bacteria while preserving quality',
      energyUsage: 42.1,
      downtimeCost: 1350,
      metrics: {
        flowRate: { value: 100, unit: 'L/min', status: 'normal' },
        vibration: { value: 3.9, unit: 'Hz', status: 'normal' },
        temperature: { value: 75, unit: '°C', status: 'normal' }
      },
      oee: 90.3,
      lastMaintenance: '2025-07-15',
      nextMaintenance: '2025-08-15'
    },

    // Plant D - Ice Cream Production
    {
      id: 'machine16',
      name: 'Ice Cream Mixer D',
      status: 'running',
      location: 'Plant D, Line 4',
      function: 'Blends milk, cream, sugar and flavourings for ice cream base',
      energyUsage: 38.5,
      downtimeCost: 980,
      metrics: {
        flowRate: { value: 85, unit: 'L/min', status: 'normal' },
        vibration: { value: 4.7, unit: 'Hz', status: 'normal' },
        temperature: { value: 8, unit: '°C', status: 'normal' }
      },
      oee: 88.6,
      lastMaintenance: '2025-07-12',
      nextMaintenance: '2025-08-12'
    },
    {
      id: 'machine17',
      name: 'Ice Cream Freezer D',
      status: 'running',
      location: 'Plant D, Line 4',
      function: 'Freezes ice cream mix while incorporating air for texture',
      energyUsage: 55.3,
      downtimeCost: 1900,
      metrics: {
        flowRate: { value: 70, unit: 'L/min', status: 'normal' },
        vibration: { value: 5.8, unit: 'Hz', status: 'normal' },
        temperature: { value: -8, unit: '°C', status: 'normal' }
      },
      oee: 87.9,
      lastMaintenance: '2025-07-18',
      nextMaintenance: '2025-08-18'
    },
    {
      id: 'machine18',
      name: 'Flavour Injection Unit D',
      status: 'running',
      location: 'Plant D, Line 4',
      function: 'Adds flavourings and mix-ins to ice cream during freezing',
      energyUsage: 26.8,
      downtimeCost: 720,
      metrics: {
        flowRate: { value: 60, unit: 'L/min', status: 'normal' },
        vibration: { value: 3.4, unit: 'Hz', status: 'normal' },
        temperature: { value: -5, unit: '°C', status: 'normal' }
      },
      oee: 92.1,
      lastMaintenance: '2025-07-14',
      nextMaintenance: '2025-08-14'
    },
    {
      id: 'machine19',
      name: 'Ice Cream Packaging Line D',
      status: 'running',
      location: 'Plant D, Line 4',
      function: 'Fills and packages ice cream into containers and cones',
      energyUsage: 24.2,
      downtimeCost: 650,
      metrics: {
        flowRate: { value: 180, unit: 'units/min', status: 'normal' },
        vibration: { value: 2.6, unit: 'Hz', status: 'normal' },
        temperature: { value: -12, unit: '°C', status: 'normal' }
      },
      oee: 93.7,
      lastMaintenance: '2025-07-20',
      nextMaintenance: '2025-08-20'
    },
    {
      id: 'machine20',
      name: 'Hardening Tunnel D',
      status: 'running',
      location: 'Plant D, Line 4',
      function: 'Rapidly freezes packaged ice cream to -18°C for storage',
      energyUsage: 48.7,
      downtimeCost: 1500,
      metrics: {
        flowRate: { value: 0, unit: 'L/min', status: 'offline' },
        vibration: { value: 1.2, unit: 'Hz', status: 'normal' },
        temperature: { value: -18, unit: '°C', status: 'normal' }
      },
      oee: 95.2,
      lastMaintenance: '2025-07-16',
      nextMaintenance: '2025-08-16'
    },

    // Plant E - Powder Production
    {
      id: 'machine21',
      name: 'Evaporator Unit E',
      status: 'running',
      location: 'Plant E, Line 5',
      function: 'Removes water from milk to concentrate solids for powder production',
      energyUsage: 67.4,
      downtimeCost: 2800,
      metrics: {
        flowRate: { value: 200, unit: 'L/min', status: 'normal' },
        vibration: { value: 4.1, unit: 'Hz', status: 'normal' },
        temperature: { value: 85, unit: '°C', status: 'normal' }
      },
      oee: 89.8,
      lastMaintenance: '2025-07-11',
      nextMaintenance: '2025-08-11'
    },
    {
      id: 'machine22',
      name: 'Spray Dryer E',
      status: 'running',
      location: 'Plant E, Line 5',
      function: 'Converts concentrated milk into powder using hot air drying',
      energyUsage: 89.2,
      downtimeCost: 3200,
      metrics: {
        flowRate: { value: 150, unit: 'L/min', status: 'normal' },
        vibration: { value: 6.5, unit: 'Hz', status: 'normal' },
        temperature: { value: 180, unit: '°C', status: 'normal' }
      },
      oee: 86.3,
      lastMaintenance: '2025-07-15',
      nextMaintenance: '2025-08-15'
    },
    {
      id: 'machine23',
      name: 'Powder Collection Unit E',
      status: 'running',
      location: 'Plant E, Line 5',
      function: 'Collects and packages dried milk powder',
      energyUsage: 15.8,
      downtimeCost: 450,
      metrics: {
        flowRate: { value: 120, unit: 'kg/min', status: 'normal' },
        vibration: { value: 2.9, unit: 'Hz', status: 'normal' },
        temperature: { value: 25, unit: '°C', status: 'normal' }
      },
      oee: 94.1,
      lastMaintenance: '2025-07-19',
      nextMaintenance: '2025-08-19'
    },
    {
      id: 'machine24',
      name: 'Powder Packaging Machine E',
      status: 'running',
      location: 'Plant E, Line 5',
      function: 'Fills milk powder into bags and containers for distribution',
      energyUsage: 18.3,
      downtimeCost: 520,
      metrics: {
        flowRate: { value: 100, unit: 'units/min', status: 'normal' },
        vibration: { value: 3.7, unit: 'Hz', status: 'normal' },
        temperature: { value: 22, unit: '°C', status: 'normal' }
      },
      oee: 91.5,
      lastMaintenance: '2025-07-13',
      nextMaintenance: '2025-08-13'
    },
    {
      id: 'machine25',
      name: 'Powder Quality Control E',
      status: 'running',
      location: 'Plant E, Line 5',
      function: 'Tests powder moisture, protein and fat content',
      energyUsage: 12.6,
      downtimeCost: 380,
      metrics: {
        flowRate: { value: 0, unit: 'L/min', status: 'offline' },
        vibration: { value: 0.8, unit: 'Hz', status: 'normal' },
        temperature: { value: 20, unit: '°C', status: 'normal' }
      },
      oee: 96.8,
      lastMaintenance: '2025-07-17',
      nextMaintenance: '2025-08-17'
    },

    // Plant F - Whey Processing
    {
      id: 'machine26',
      name: 'Whey Filtration Unit F',
      status: 'running',
      location: 'Plant F, Line 6',
      function: 'Filters whey to remove casein particles and impurities',
      energyUsage: 34.7,
      downtimeCost: 1100,
      metrics: {
        flowRate: { value: 180, unit: 'L/min', status: 'normal' },
        vibration: { value: 3.8, unit: 'Hz', status: 'normal' },
        temperature: { value: 35, unit: '°C', status: 'normal' }
      },
      oee: 90.2,
      lastMaintenance: '2025-07-14',
      nextMaintenance: '2025-08-14'
    },
    {
      id: 'machine27',
      name: 'Whey Protein Concentrator F',
      status: 'running',
      location: 'Plant F, Line 6',
      function: 'Concentrates whey protein using ultrafiltration technology',
      energyUsage: 52.9,
      downtimeCost: 1800,
      metrics: {
        flowRate: { value: 140, unit: 'L/min', status: 'normal' },
        vibration: { value: 4.6, unit: 'Hz', status: 'normal' },
        temperature: { value: 45, unit: '°C', status: 'normal' }
      },
      oee: 88.7,
      lastMaintenance: '2025-07-12',
      nextMaintenance: '2025-08-12'
    },
    {
      id: 'machine28',
      name: 'Whey Drying Unit F',
      status: 'running',
      location: 'Plant F, Line 6',
      function: 'Spray dries whey concentrate into protein powder',
      energyUsage: 76.3,
      downtimeCost: 2400,
      metrics: {
        flowRate: { value: 110, unit: 'L/min', status: 'normal' },
        vibration: { value: 5.9, unit: 'Hz', status: 'normal' },
        temperature: { value: 160, unit: '°C', status: 'normal' }
      },
      oee: 87.4,
      lastMaintenance: '2025-07-18',
      nextMaintenance: '2025-08-18'
    },
    {
      id: 'machine29',
      name: 'Protein Powder Packaging F',
      status: 'running',
      location: 'Plant F, Line 6',
      function: 'Packages whey protein powder for sports nutrition market',
      energyUsage: 21.4,
      downtimeCost: 680,
      metrics: {
        flowRate: { value: 80, unit: 'units/min', status: 'normal' },
        vibration: { value: 2.3, unit: 'Hz', status: 'normal' },
        temperature: { value: 24, unit: '°C', status: 'normal' }
      },
      oee: 93.9,
      lastMaintenance: '2025-07-20',
      nextMaintenance: '2025-08-20'
    },
    {
      id: 'machine30',
      name: 'Whey Lactose Crystalliser F',
      status: 'running',
      location: 'Plant F, Line 6',
      function: 'Crystallises lactose from whey for pharmaceutical use',
      energyUsage: 28.1,
      downtimeCost: 920,
      metrics: {
        flowRate: { value: 95, unit: 'L/min', status: 'normal' },
        vibration: { value: 3.2, unit: 'Hz', status: 'normal' },
        temperature: { value: 30, unit: '°C', status: 'normal' }
      },
      oee: 89.6,
      lastMaintenance: '2025-07-16',
      nextMaintenance: '2025-08-16'
    },

    // Plant G - Quality Control
    {
      id: 'machine31',
      name: 'Milk Analyser G',
      status: 'running',
      location: 'Plant G, Line 7',
      function: 'Analyses milk composition for fat, protein and lactose content',
      energyUsage: 8.9,
      downtimeCost: 320,
      metrics: {
        flowRate: { value: 20, unit: 'L/min', status: 'normal' },
        vibration: { value: 1.1, unit: 'Hz', status: 'normal' },
        temperature: { value: 22, unit: '°C', status: 'normal' }
      },
      oee: 97.2,
      lastMaintenance: '2025-07-10',
      nextMaintenance: '2025-08-10'
    },
    {
      id: 'machine32',
      name: 'Bacteria Counter G',
      status: 'running',
      location: 'Plant G, Line 7',
      function: 'Counts bacterial colonies to ensure milk safety standards',
      energyUsage: 6.4,
      downtimeCost: 280,
      metrics: {
        flowRate: { value: 15, unit: 'L/min', status: 'normal' },
        vibration: { value: 0.9, unit: 'Hz', status: 'normal' },
        temperature: { value: 25, unit: '°C', status: 'normal' }
      },
      oee: 98.1,
      lastMaintenance: '2025-07-12',
      nextMaintenance: '2025-08-12'
    },
    {
      id: 'machine33',
      name: 'Antibiotic Test Unit G',
      status: 'running',
      location: 'Plant G, Line 7',
      function: 'Detects antibiotic residues in milk samples',
      energyUsage: 7.2,
      downtimeCost: 350,
      metrics: {
        flowRate: { value: 12, unit: 'L/min', status: 'normal' },
        vibration: { value: 0.7, unit: 'Hz', status: 'normal' },
        temperature: { value: 23, unit: '°C', status: 'normal' }
      },
      oee: 96.8,
      lastMaintenance: '2025-07-15',
      nextMaintenance: '2025-08-15'
    },
    {
      id: 'machine34',
      name: 'Sensory Analysis Station G',
      status: 'running',
      location: 'Plant G, Line 7',
      function: 'Conducts taste and texture analysis of dairy products',
      energyUsage: 4.8,
      downtimeCost: 180,
      metrics: {
        flowRate: { value: 0, unit: 'L/min', status: 'offline' },
        vibration: { value: 0.3, unit: 'Hz', status: 'normal' },
        temperature: { value: 20, unit: '°C', status: 'normal' }
      },
      oee: 99.1,
      lastMaintenance: '2025-07-18',
      nextMaintenance: '2025-08-18'
    },
    {
      id: 'machine35',
      name: 'Microbiological Incubator G',
      status: 'running',
      location: 'Plant G, Line 7',
      function: 'Incubates samples for bacterial growth analysis',
      energyUsage: 5.6,
      downtimeCost: 220,
      metrics: {
        flowRate: { value: 0, unit: 'L/min', status: 'offline' },
        vibration: { value: 0.4, unit: 'Hz', status: 'normal' },
        temperature: { value: 37, unit: '°C', status: 'normal' }
      },
      oee: 98.7,
      lastMaintenance: '2025-07-13',
      nextMaintenance: '2025-08-13'
    },

    // Plant H - Packaging & Distribution
    {
      id: 'machine36',
      name: 'Bottle Filling Line H',
      status: 'running',
      location: 'Plant H, Line 8',
      function: 'Fills milk bottles with precise volume control',
      energyUsage: 32.7,
      downtimeCost: 890,
      metrics: {
        flowRate: { value: 300, unit: 'units/min', status: 'normal' },
        vibration: { value: 4.3, unit: 'Hz', status: 'normal' },
        temperature: { value: 18, unit: '°C', status: 'normal' }
      },
      oee: 92.4,
      lastMaintenance: '2025-07-16',
      nextMaintenance: '2025-08-16'
    },
    {
      id: 'machine37',
      name: 'Carton Sealing Machine H',
      status: 'running',
      location: 'Plant H, Line 8',
      function: 'Seals milk cartons with tamper-evident closures',
      energyUsage: 26.1,
      downtimeCost: 720,
      metrics: {
        flowRate: { value: 250, unit: 'units/min', status: 'normal' },
        vibration: { value: 3.5, unit: 'Hz', status: 'normal' },
        temperature: { value: 20, unit: '°C', status: 'normal' }
      },
      oee: 94.8,
      lastMaintenance: '2025-07-14',
      nextMaintenance: '2025-08-14'
    },
    {
      id: 'machine38',
      name: 'Labelling Unit H',
      status: 'running',
      location: 'Plant H, Line 8',
      function: 'Applies product labels with batch codes and expiry dates',
      energyUsage: 19.8,
      downtimeCost: 540,
      metrics: {
        flowRate: { value: 280, unit: 'units/min', status: 'normal' },
        vibration: { value: 2.8, unit: 'Hz', status: 'normal' },
        temperature: { value: 22, unit: '°C', status: 'normal' }
      },
      oee: 95.3,
      lastMaintenance: '2025-07-20',
      nextMaintenance: '2025-08-20'
    },
    {
      id: 'machine39',
      name: 'Palletising Robot H',
      status: 'running',
      location: 'Plant H, Line 8',
      function: 'Automatically stacks packaged products onto pallets',
      energyUsage: 23.4,
      downtimeCost: 680,
      metrics: {
        flowRate: { value: 120, unit: 'units/min', status: 'normal' },
        vibration: { value: 4.1, unit: 'Hz', status: 'normal' },
        temperature: { value: 21, unit: '°C', status: 'normal' }
      },
      oee: 91.7,
      lastMaintenance: '2025-07-17',
      nextMaintenance: '2025-08-17'
    },
    {
      id: 'machine40',
      name: 'Cold Storage Unit H',
      status: 'running',
      location: 'Plant H, Line 8',
      function: 'Maintains products at optimal temperature before distribution',
      energyUsage: 37.2,
      downtimeCost: 1100,
      metrics: {
        flowRate: { value: 0, unit: 'L/min', status: 'offline' },
        vibration: { value: 1.6, unit: 'Hz', status: 'normal' },
        temperature: { value: 4, unit: '°C', status: 'normal' }
      },
      oee: 96.9,
      lastMaintenance: '2025-07-19',
      nextMaintenance: '2025-08-19'
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
  } as SupplyData,
  
  // Weekly Make Plan Data
  weeklyMakePlan: {
    weekNumber: 32,
    year: 2025,
    schedules: [
      {
        line: 'Line 1',
        lineId: 'line1',
        runs: [
          {
            id: 'run1-mon-1',
            day: 'Monday',
            startTime: '06:00',
            endTime: '14:00',
            product: 'Skim Milk',
            volume: 25000,
            fat: 0.1,
            protein: 3.2,
            silos: [3, 4, 5],
            status: 'Planned',
            reasoning: 'High demand from retail customers',
            notes: 'Quality check at 10:00'
          },
          {
            id: 'run1-mon-2',
            day: 'Monday',
            startTime: '14:00',
            endTime: '22:00',
            product: 'Whole Milk',
            volume: 20000,
            fat: 3.6,
            protein: 3.4,
            silos: [1, 2],
            status: 'Confirmed',
            reasoning: 'Scheduled bulk order for Whole Foods'
          },
          {
            id: 'run1-tue-1',
            day: 'Tuesday',
            startTime: '06:00',
            endTime: '12:00',
            product: 'CIP Cleaning',
            volume: 0,
            fat: 0,
            protein: 0,
            silos: [],
            status: 'Planned'
          },
          {
            id: 'run1-tue-2',
            day: 'Tuesday',
            startTime: '14:00',
            endTime: '22:00',
            product: 'Cream',
            volume: 15000,
            fat: 35.0,
            protein: 2.1,
            silos: [1, 6],
            status: 'Planned',
            reasoning: 'Premium product with higher margins'
          },
          {
            id: 'run1-wed-1',
            day: 'Wednesday',
            startTime: '06:00',
            endTime: '16:00',
            product: 'Skim Milk',
            volume: 30000,
            fat: 0.1,
            protein: 3.2,
            silos: [3, 4, 5, 7],
            status: 'In Progress',
            reasoning: 'Peak demand day'
          },
          {
            id: 'run1-thu-1',
            day: 'Thursday',
            startTime: '06:00',
            endTime: '14:00',
            product: 'Whole Milk',
            volume: 22000,
            fat: 3.6,
            protein: 3.4,
            silos: [1, 2],
            status: 'Planned'
          },
          {
            id: 'run1-fri-1',
            day: 'Friday',
            startTime: '06:00',
            endTime: '18:00',
            product: 'Skim Milk',
            volume: 35000,
            fat: 0.1,
            protein: 3.2,
            silos: [3, 4, 5, 7, 8],
            status: 'Planned',
            reasoning: 'End of week high volume production'
          }
        ]
      },
      {
        line: 'Line 2',
        lineId: 'line2',
        runs: [
          {
            id: 'run2-mon-1',
            day: 'Monday',
            startTime: '07:00',
            endTime: '15:00',
            product: 'Greek Yogurt Base',
            volume: 18000,
            fat: 2.0,
            protein: 8.5,
            silos: [2, 5],
            status: 'Completed',
            reasoning: 'High protein demand from fitness market'
          },
          {
            id: 'run2-tue-1',
            day: 'Tuesday',
            startTime: '06:00',
            endTime: '18:00',
            product: 'Buttermilk',
            volume: 24000,
            fat: 0.5,
            protein: 3.1,
            silos: [3, 4],
            status: 'Confirmed',
            reasoning: 'Bulk order from bakery customers'
          },
          {
            id: 'run2-wed-1',
            day: 'Wednesday',
            startTime: '08:00',
            endTime: '12:00',
            product: 'CIP Cleaning',
            volume: 0,
            fat: 0,
            protein: 0,
            silos: [],
            status: 'Planned'
          },
          {
            id: 'run2-wed-2',
            day: 'Wednesday',
            startTime: '14:00',
            endTime: '22:00',
            product: 'Cream',
            volume: 16000,
            fat: 35.0,
            protein: 2.1,
            silos: [1, 6],
            status: 'Planned'
          },
          {
            id: 'run2-thu-1',
            day: 'Thursday',
            startTime: '06:00',
            endTime: '16:00',
            product: 'Greek Yogurt Base',
            volume: 20000,
            fat: 2.0,
            protein: 8.5,
            silos: [2, 5, 7],
            status: 'Planned',
            reasoning: 'Increased weekend demand preparation'
          },
          {
            id: 'run2-fri-1',
            day: 'Friday',
            startTime: '06:00',
            endTime: '14:00',
            product: 'Buttermilk',
            volume: 22000,
            fat: 0.5,
            protein: 3.1,
            silos: [3, 4],
            status: 'Planned'
          }
        ]
      },
      {
        line: 'Line 3',
        lineId: 'line3',
        runs: [
          {
            id: 'run3-tue-1',
            day: 'Tuesday',
            startTime: '08:00',
            endTime: '16:00',
            product: 'Milk Powder',
            volume: 12000,
            fat: 1.5,
            protein: 26.0,
            silos: [5, 6],
            status: 'Planned',
            reasoning: 'Export order preparation',
            notes: 'Line maintenance completed Monday'
          },
          {
            id: 'run3-wed-1',
            day: 'Wednesday',
            startTime: '06:00',
            endTime: '18:00',
            product: 'Cheese Base',
            volume: 28000,
            fat: 4.2,
            protein: 3.8,
            silos: [1, 2, 3],
            status: 'Planned',
            reasoning: 'Artisan cheese production for premium market'
          },
          {
            id: 'run3-thu-1',
            day: 'Thursday',
            startTime: '06:00',
            endTime: '10:00',
            product: 'CIP Cleaning',
            volume: 0,
            fat: 0,
            protein: 0,
            silos: [],
            status: 'Planned'
          },
          {
            id: 'run3-thu-2',
            day: 'Thursday',
            startTime: '12:00',
            endTime: '20:00',
            product: 'Milk Powder',
            volume: 14000,
            fat: 1.5,
            protein: 26.0,
            silos: [5, 6, 7],
            status: 'Planned'
          },
          {
            id: 'run3-fri-1',
            day: 'Friday',
            startTime: '06:00',
            endTime: '16:00',
            product: 'Cheese Base',
            volume: 26000,
            fat: 4.2,
            protein: 3.8,
            silos: [1, 2, 3],
            status: 'Planned',
            reasoning: 'Weekend processing preparation'
          },
          {
            id: 'run3-sat-1',
            day: 'Saturday',
            startTime: '08:00',
            endTime: '16:00',
            product: 'Milk Powder',
            volume: 10000,
            fat: 1.5,
            protein: 26.0,
            silos: [5, 6],
            status: 'Planned',
            reasoning: 'Weekend shift for export deadlines'
          }
        ]
      },
      {
        line: 'Packaging Line A',
        lineId: 'line4',
        runs: [
          {
            id: 'run4-mon-1',
            day: 'Monday',
            startTime: '06:00',
            endTime: '14:00',
            product: 'Bottled Milk Packaging',
            volume: 45000,
            fat: 0,
            protein: 0,
            silos: [],
            status: 'Completed',
            reasoning: 'Morning retail delivery preparation'
          },
          {
            id: 'run4-mon-2',
            day: 'Monday',
            startTime: '14:00',
            endTime: '22:00',
            product: 'Yogurt Cup Packaging',
            volume: 35000,
            fat: 0,
            protein: 0,
            silos: [],
            status: 'Completed'
          },
          {
            id: 'run4-tue-1',
            day: 'Tuesday',
            startTime: '06:00',
            endTime: '18:00',
            product: 'Bottled Milk Packaging',
            volume: 50000,
            fat: 0,
            protein: 0,
            silos: [],
            status: 'Confirmed',
            reasoning: 'Peak retail demand day'
          },
          {
            id: 'run4-wed-1',
            day: 'Wednesday',
            startTime: '06:00',
            endTime: '16:00',
            product: 'Cream Packaging',
            volume: 25000,
            fat: 0,
            protein: 0,
            silos: [],
            status: 'Planned'
          },
          {
            id: 'run4-thu-1',
            day: 'Thursday',
            startTime: '06:00',
            endTime: '18:00',
            product: 'Bottled Milk Packaging',
            volume: 48000,
            fat: 0,
            protein: 0,
            silos: [],
            status: 'Planned'
          },
          {
            id: 'run4-fri-1',
            day: 'Friday',
            startTime: '06:00',
            endTime: '20:00',
            product: 'Mixed Packaging',
            volume: 60000,
            fat: 0,
            protein: 0,
            silos: [],
            status: 'Planned',
            reasoning: 'End of week packaging rush for weekend demand'
          }
        ]
      },
      {
        line: 'Line 5',
        lineId: 'line5',
        runs: [
          {
            id: 'run5-mon-1',
            day: 'Monday',
            startTime: '08:00',
            endTime: '16:00',
            product: 'Ice Cream Base',
            volume: 18000,
            fat: 12.0,
            protein: 3.8,
            silos: [2, 4],
            status: 'Planned',
            reasoning: 'Premium ice cream production for summer demand'
          },
          {
            id: 'run5-tue-1',
            day: 'Tuesday',
            startTime: '06:00',
            endTime: '14:00',
            product: 'CIP Cleaning',
            volume: 0,
            fat: 0,
            protein: 0,
            silos: [],
            status: 'Planned'
          },
          {
            id: 'run5-wed-1',
            day: 'Wednesday',
            startTime: '08:00',
            endTime: '18:00',
            product: 'Ice Cream Base',
            volume: 22000,
            fat: 12.0,
            protein: 3.8,
            silos: [2, 4, 6],
            status: 'Planned',
            reasoning: 'Increased production for weekend sales'
          },
          {
            id: 'run5-thu-1',
            day: 'Thursday',
            startTime: '06:00',
            endTime: '16:00',
            product: 'Frozen Yogurt Base',
            volume: 16000,
            fat: 2.5,
            protein: 4.2,
            silos: [3, 5],
            status: 'Planned',
            reasoning: 'Health-conscious market demand'
          },
          {
            id: 'run5-fri-1',
            day: 'Friday',
            startTime: '08:00',
            endTime: '16:00',
            product: 'Ice Cream Base',
            volume: 20000,
            fat: 12.0,
            protein: 3.8,
            silos: [2, 4],
            status: 'Planned'
          }
        ]
      },
      {
        line: 'Line 6',
        lineId: 'line6',
        runs: [
          {
            id: 'run6-mon-1',
            day: 'Monday',
            startTime: '06:00',
            endTime: '14:00',
            product: 'Whey Protein Concentrate',
            volume: 12000,
            fat: 1.0,
            protein: 80.0,
            silos: [1, 3],
            status: 'Planned',
            reasoning: 'Sports nutrition market demand'
          },
          {
            id: 'run6-tue-1',
            day: 'Tuesday',
            startTime: '08:00',
            endTime: '16:00',
            product: 'Lactose Powder',
            volume: 8000,
            fat: 0.1,
            protein: 0.5,
            silos: [2, 4],
            status: 'Planned',
            reasoning: 'Pharmaceutical industry supply'
          },
          {
            id: 'run6-wed-1',
            day: 'Wednesday',
            startTime: '06:00',
            endTime: '12:00',
            product: 'CIP Cleaning',
            volume: 0,
            fat: 0,
            protein: 0,
            silos: [],
            status: 'Planned'
          },
          {
            id: 'run6-wed-2',
            day: 'Wednesday',
            startTime: '14:00',
            endTime: '22:00',
            product: 'Whey Protein Concentrate',
            volume: 14000,
            fat: 1.0,
            protein: 80.0,
            silos: [1, 3, 5],
            status: 'Planned'
          },
          {
            id: 'run6-thu-1',
            day: 'Thursday',
            startTime: '06:00',
            endTime: '16:00',
            product: 'Lactose Powder',
            volume: 10000,
            fat: 0.1,
            protein: 0.5,
            silos: [2, 4],
            status: 'Planned'
          },
          {
            id: 'run6-fri-1',
            day: 'Friday',
            startTime: '08:00',
            endTime: '16:00',
            product: 'Whey Protein Concentrate',
            volume: 13000,
            fat: 1.0,
            protein: 80.0,
            silos: [1, 3],
            status: 'Planned',
            reasoning: 'Weekend production for export orders'
          }
        ]
      },
      {
        line: 'Line 7',
        lineId: 'line7',
        runs: [
          {
            id: 'run7-mon-1',
            day: 'Monday',
            startTime: '06:00',
            endTime: '14:00',
            product: 'Cultured Buttermilk',
            volume: 15000,
            fat: 0.5,
            protein: 3.1,
            silos: [3, 4],
            status: 'Planned',
            reasoning: 'Traditional buttermilk for baking industry'
          },
          {
            id: 'run7-tue-1',
            day: 'Tuesday',
            startTime: '08:00',
            endTime: '16:00',
            product: 'Kefir Base',
            volume: 12000,
            fat: 2.0,
            protein: 3.5,
            silos: [2, 5],
            status: 'Planned',
            reasoning: 'Probiotic beverage market growth'
          },
          {
            id: 'run7-wed-1',
            day: 'Wednesday',
            startTime: '06:00',
            endTime: '18:00',
            product: 'Cultured Buttermilk',
            volume: 20000,
            fat: 0.5,
            protein: 3.1,
            silos: [3, 4, 6],
            status: 'Planned',
            reasoning: 'Peak demand from commercial bakeries'
          },
          {
            id: 'run7-thu-1',
            day: 'Thursday',
            startTime: '08:00',
            endTime: '12:00',
            product: 'CIP Cleaning',
            volume: 0,
            fat: 0,
            protein: 0,
            silos: [],
            status: 'Planned'
          },
          {
            id: 'run7-thu-2',
            day: 'Thursday',
            startTime: '14:00',
            endTime: '22:00',
            product: 'Kefir Base',
            volume: 14000,
            fat: 2.0,
            protein: 3.5,
            silos: [2, 5],
            status: 'Planned'
          },
          {
            id: 'run7-fri-1',
            day: 'Friday',
            startTime: '06:00',
            endTime: '16:00',
            product: 'Cultured Buttermilk',
            volume: 18000,
            fat: 0.5,
            protein: 3.1,
            silos: [3, 4],
            status: 'Planned',
            reasoning: 'Weekend preparation for retail demand'
          }
        ]
      }
    ]
  } as WeeklyMakePlan
};