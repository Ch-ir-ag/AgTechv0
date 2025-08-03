export const companyStats = {
  currentMonthlyYield: {
    value: '150M',
    label: 'Current Monthly Yield (L)',
    confidenceInterval: '±5%'
  },
  monthlyGrowthRate: {
    value: '+4%',
    label: 'Monthly Growth Rate',
    confidenceInterval: '±1%'
  },
  projectedAnnualYield: {
    value: '1.8B',
    label: 'Projected Annual Yield (L)',
    confidenceInterval: '±4%'
  },
  predictionAccuracy: {
    value: '96%',
    label: 'Prediction Accuracy',
    confidenceInterval: 'Based on historical demo data'
  }
};

export const companyInsights = [
  {
    title: 'Production Trends',
    description: 'Demo production is trending 4% higher than last month, with projected increases continuing. Confidence interval: ±1%.',
    icon: 'trend'
  },
  {
    title: 'Seasonal Forecast',
    description: 'Based on patterns, expect a 5% decrease in production during winter months. Confidence interval: ±1.5%.',
    icon: 'forecast'
  },
  {
    title: 'Feed Efficiency',
    description: 'Current feed efficiency ratio is 1.4 liters per kg, optimal for demo herd. Confidence interval: ±0.1 L/kg.',
    icon: 'efficiency'
  }
]; 