/**
 * Dairygold Chart Configurations
 * Contains chart-specific configurations and settings for Dairygold
 */

export const chartTitles = {
  milkYieldChart: 'Milk Yield Analytics',
  yearlyYieldChart: 'Annual Production Forecast',
  fatPercentageChart: 'Fat Content Analysis - Processing Facilities',
  proteinPercentageChart: 'Protein Content Tracking - Cork Region',
  lactosePercentageChart: 'Lactose Content Monitoring',
  facilityPerformanceChart: 'Facility Processing Performance'
};

export const colorScheme = {
  primary: '#1E40AF', // Deep blue
  secondary: '#3B82F6', // Blue
  accent: '#10B981', // Green for growth
  warning: '#F59E0B', // Amber
  error: '#EF4444', // Red
  background: '#F0F7FF', // Light blue background
  text: '#1F2937' // Dark gray
};

export const facilityMetrics = {
  mitchelstown: {
    name: 'Mitchelstown Processing Facility',
    capacity: 1800000000, // 1.8B liters annually
    efficiency: 96.8,
    mainProducts: ['Milk Powder', 'Cheese', 'Butter'],
    currentUtilization: 92
  },
  mallow: {
    name: 'Mallow Processing Plant',
    capacity: 500000000, // 500M liters annually
    efficiency: 94.2,
    mainProducts: ['Nutritional Products', 'Ingredients'],
    currentUtilization: 88
  },
  charleville: {
    name: 'Charleville Collection Center',
    capacity: 300000000, // 300M liters annually
    efficiency: 97.5,
    mainProducts: ['Collection', 'Initial Processing'],
    currentUtilization: 85
  },
  kanturk: {
    name: 'Kanturk Collection Center',
    capacity: 200000000, // 200M liters annually
    efficiency: 96.1,
    mainProducts: ['Collection', 'Cooling'],
    currentUtilization: 78
  }
};

export const regionalBreakdown = {
  cork: {
    percentage: 60,
    color: '#1E40AF',
    facilities: 4,
    avgYield: 30.5
  },
  kerry: {
    percentage: 15,
    color: '#3B82F6',
    facilities: 1,
    avgYield: 29.2
  },
  limerick: {
    percentage: 12,
    color: '#60A5FA',
    facilities: 2,
    avgYield: 28.8
  },
  tipperary: {
    percentage: 8,
    color: '#93C5FD',
    facilities: 1,
    avgYield: 28.2
  },
  waterford: {
    percentage: 5,
    color: '#DBEAFE',
    facilities: 1,
    avgYield: 27.8
  }
};

export const productAllocationConfig = {
  milkPowder: {
    percentage: 35,
    color: '#1E40AF',
    label: 'Milk Powder',
    description: 'Primary export product'
  },
  cheese: {
    percentage: 25,
    color: '#3B82F6',
    label: 'Cheese Products',
    description: 'Various cheese types'
  },
  butterAndSpreads: {
    percentage: 20,
    color: '#10B981',
    label: 'Butter & Spreads',
    description: 'Premium dairy spreads'
  },
  liquidMilk: {
    percentage: 15,
    color: '#F59E0B',
    label: 'Liquid Milk',
    description: 'Fresh milk products'
  },
  otherProducts: {
    percentage: 5,
    color: '#8B5CF6',
    label: 'Other Products',
    description: 'Nutritional & ingredients'
  }
};

export const supplyChainMapConfig = {
  defaultRegion: 'Cork',
  showAllRegions: false, // Focus on Cork region
  primaryFacilities: ['Mitchelstown', 'Mallow', 'Charleville', 'Kanturk'],
  mapCenter: [52.2, -8.5], // Cork coordinates
  zoomLevel: 8
}; 