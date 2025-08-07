/**
 * Kerry Dairy specific data
 * Contains all data and configurations specific to Kerry Dairy
 */

// Company stats displayed on the dashboard - Kerry Group scale
export const companyStats = {
  currentMonthlyYield: {
    value: '108M',
    label: 'Current Monthly Yield (L)',
    confidenceInterval: '±2.1%'
  },
  monthlyGrowthRate: {
    value: '+3.8%',
    label: 'Monthly Growth Rate',
    confidenceInterval: '±0.5%'
  },
  projectedAnnualYield: {
    value: '1.34B',
    label: 'Projected Annual Yield (L)',
    confidenceInterval: '±2.2%'
  },
  predictionAccuracy: {
    value: '97.8%',
    label: 'Prediction Accuracy',
    confidenceInterval: 'Based on 124 global facilities'
  }
};

// Company insights displayed on the dashboard
export const companyInsights = [
  {
    title: 'Production Trends',
    description: 'Milk production is trending 4.8% higher than last month, with projected increases continuing through October. Confidence interval: ±0.7%.',
    icon: 'trend' 
  },
  {
    title: 'Seasonal Forecast',
    description: 'Based on historical patterns, expect a 3-5% decrease in production during the winter months (November-December). Confidence interval: ±1.1%.',
    icon: 'forecast'
  },
  {
    title: 'Feed Efficiency',
    description: 'Current feed efficiency ratio is 1.6 liters per kg, which is above the optimal range for your herd size and composition. Confidence interval: ±0.1 L/kg.',
    icon: 'efficiency'
  }
]; 