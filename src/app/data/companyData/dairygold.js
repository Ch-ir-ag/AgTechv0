/**
 * Dairygold specific data
 * Contains all data and configurations specific to Dairygold
 */

// Company stats displayed on the dashboard
export const companyStats = {
  currentMonthlyYield: {
    value: '185M',
    label: 'Current Monthly Yield (L)',
    confidenceInterval: '±3.8%'
  },
  monthlyGrowthRate: {
    value: '+6.1%',
    label: 'Monthly Growth Rate',
    confidenceInterval: '±0.9%'
  },
  projectedAnnualYield: {
    value: '1.3B',
    label: 'Projected Annual Yield (L)',
    confidenceInterval: '±3.5%'
  },
  predictionAccuracy: {
    value: '96.8%',
    label: 'Prediction Accuracy',
    confidenceInterval: 'Based on historical validation'
  }
};

// Company insights displayed on the dashboard
export const companyInsights = [
  {
    title: 'Production Trends',
    description: 'Milk production is trending 6.1% higher than last month, with projected increases continuing through October. Confidence interval: ±0.9%.',
    icon: 'trend' 
  },
  {
    title: 'Seasonal Forecast',
    description: 'Based on historical patterns, expect a 5-7% decrease in production during the winter months (December-January). Confidence interval: ±1.3%.',
    icon: 'forecast'
  },
  {
    title: 'Feed Efficiency',
    description: 'Current feed efficiency ratio is 1.4 liters per kg, which is within the optimal range for your herd size and composition. Confidence interval: ±0.1 L/kg.',
    icon: 'efficiency'
  }
];

// Facility and operational data
export const facilitiesData = {
  totalFacilities: 5,
  processingCapacity: '1.3B liters annually',
  employeeCount: 880,
  primaryRegions: ['Cork', 'Kerry', 'Limerick', 'Tipperary', 'Waterford'],
  mainProducts: ['Milk Powder', 'Cheese', 'Butter', 'Nutritional Products', 'Ingredients'],
  established: 1919,
  cooperativeMembers: 3500,
  exportMarkets: ['UK', 'EU', 'Middle East', 'Asia', 'Africa']
};

// Product allocation data
export const productAllocation = {
  milkPowder: {
    percentage: 35,
    description: 'Primary export product for international markets',
    facilities: ['Mitchelstown', 'Mallow']
  },
  cheese: {
    percentage: 25,
    description: 'Various cheese types for domestic and export markets',
    facilities: ['Mitchelstown']
  },
  butterAndSpreads: {
    percentage: 20,
    description: 'Premium butter and dairy spreads',
    facilities: ['Mitchelstown']
  },
  liquidMilk: {
    percentage: 15,
    description: 'Fresh milk for domestic market',
    facilities: ['Mitchelstown', 'Charleville']
  },
  otherProducts: {
    percentage: 5,
    description: 'Nutritional products and specialized ingredients',
    facilities: ['Mallow', 'Moorepark']
  }
}; 