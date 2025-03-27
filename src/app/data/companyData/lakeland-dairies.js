/**
 * Lakeland Dairies specific data
 * Contains all data and configurations specific to Lakeland Dairies
 */

// Company stats displayed on the dashboard
export const companyStats = {
  currentMonthlyYield: {
    value: '165M',
    label: 'Current Monthly Yield (L)',
    confidenceInterval: '±4%'
  },
  monthlyGrowthRate: {
    value: '+5.2%',
    label: 'Monthly Growth Rate',
    confidenceInterval: '±0.8%'
  },
  projectedAnnualYield: {
    value: '2.1B',
    label: 'Projected Annual Yield (L)',
    confidenceInterval: '±3.2%'
  },
  predictionAccuracy: {
    value: '95.8%',
    label: 'Prediction Accuracy',
    confidenceInterval: 'Based on historical validation'
  }
};

// Company insights displayed on the dashboard
export const companyInsights = [
  {
    title: 'Production Trends',
    description: 'Milk production is trending 5.2% higher than last month, with projected increases continuing through September. Confidence interval: ±0.8%.',
    icon: 'trend' // This can be used to reference an icon component
  },
  {
    title: 'Seasonal Forecast',
    description: 'Based on historical patterns, expect a 4-6% decrease in production during the winter months (November-December). Confidence interval: ±1.2%.',
    icon: 'forecast'
  },
  {
    title: 'Feed Efficiency',
    description: 'Current feed efficiency ratio is 1.5 liters per kg, which is within the optimal range for your herd size and composition. Confidence interval: ±0.1 L/kg.',
    icon: 'efficiency'
  }
];

// You can add more company-specific configurations here as needed
// This structure allows for easy expansion when new features are added 