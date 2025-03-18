'use client';

import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ErrorBar,
  ResponsiveContainer
} from 'recharts';

// Define metric type
type MetricType = 'milk' | 'fat' | 'protein' | 'lactose';

// Sample data for milk yield analytics - structured by time period with confidence levels
// Scaled to reflect an annual yield of approximately 2 billion liters
const milkYieldData = {
  weekly: {
    2025: [
      { period: 'Jul 15-21', thisYear: 42000000, comparisonYear: 38000000, confidenceLevel: 1260000 },
      { period: 'Jul 22-28', thisYear: 45000000, comparisonYear: 41000000, confidenceLevel: 1350000 },
      { period: 'Jul 29-Aug 4', thisYear: 43000000, comparisonYear: 39000000, confidenceLevel: 1290000 },
      { period: 'Aug 5-11', thisYear: 47000000, comparisonYear: 43000000, confidenceLevel: 1410000 },
      { period: 'Aug 12-18', thisYear: 46000000, comparisonYear: 42000000, confidenceLevel: 1380000 },
      { period: 'Aug 19-25', thisYear: 48000000, comparisonYear: 44000000, confidenceLevel: 1440000 },
      { period: 'Aug 26-Sep 1', thisYear: 50000000, comparisonYear: 46000000, confidenceLevel: 1500000 },
      { period: 'Sep 2-8', thisYear: 49000000, comparisonYear: 45000000, confidenceLevel: 1470000 },
    ],
    2024: [
      { period: 'Jul 15-21', thisYear: 38000000, comparisonYear: 36000000, confidenceLevel: 1140000 },
      { period: 'Jul 22-28', thisYear: 41000000, comparisonYear: 39000000, confidenceLevel: 1230000 },
      { period: 'Jul 29-Aug 4', thisYear: 39000000, comparisonYear: 37000000, confidenceLevel: 1170000 },
      { period: 'Aug 5-11', thisYear: 43000000, comparisonYear: 40000000, confidenceLevel: 1290000 },
      { period: 'Aug 12-18', thisYear: 42000000, comparisonYear: 39000000, confidenceLevel: 1260000 },
      { period: 'Aug 19-25', thisYear: 44000000, comparisonYear: 41000000, confidenceLevel: 1320000 },
      { period: 'Aug 26-Sep 1', thisYear: 46000000, comparisonYear: 43000000, confidenceLevel: 1380000 },
      { period: 'Sep 2-8', thisYear: 45000000, comparisonYear: 42000000, confidenceLevel: 1350000 },
    ],
    2023: [
      { period: 'Jul 15-21', thisYear: 36000000, comparisonYear: 34000000, confidenceLevel: 1080000 },
      { period: 'Jul 22-28', thisYear: 39000000, comparisonYear: 37000000, confidenceLevel: 1170000 },
      { period: 'Jul 29-Aug 4', thisYear: 37000000, comparisonYear: 35000000, confidenceLevel: 1110000 },
      { period: 'Aug 5-11', thisYear: 40000000, comparisonYear: 38000000, confidenceLevel: 1200000 },
      { period: 'Aug 12-18', thisYear: 39000000, comparisonYear: 37000000, confidenceLevel: 1170000 },
      { period: 'Aug 19-25', thisYear: 41000000, comparisonYear: 39000000, confidenceLevel: 1230000 },
      { period: 'Aug 26-Sep 1', thisYear: 43000000, comparisonYear: 41000000, confidenceLevel: 1290000 },
      { period: 'Sep 2-8', thisYear: 42000000, comparisonYear: 40000000, confidenceLevel: 1260000 },
    ],
  },
  monthly: {
    2025: [
      { period: 'Jan 2025', thisYear: 180000000, comparisonYear: 165000000, confidenceLevel: 5400000 },
      { period: 'Feb 2025', thisYear: 192000000, comparisonYear: 178000000, confidenceLevel: 5760000 },
      { period: 'Mar 2025', thisYear: 201000000, comparisonYear: 185000000, confidenceLevel: 6030000 },
      { period: 'Apr 2025', thisYear: 215000000, comparisonYear: 192000000, confidenceLevel: 6450000 },
      { period: 'May 2025', thisYear: 220000000, comparisonYear: 200000000, confidenceLevel: 6600000 },
      { period: 'Jun 2025', thisYear: 218000000, comparisonYear: 198000000, confidenceLevel: 6540000 },
      { period: 'Jul 2025', thisYear: 215000000, comparisonYear: 195000000, confidenceLevel: 6450000 },
      { period: 'Aug 2025', thisYear: 225000000, comparisonYear: 205000000, confidenceLevel: 6750000 },
    ],
    2024: [
      { period: 'Jan 2024', thisYear: 165000000, comparisonYear: 150000000, confidenceLevel: 4950000 },
      { period: 'Feb 2024', thisYear: 178000000, comparisonYear: 162000000, confidenceLevel: 5340000 },
      { period: 'Mar 2024', thisYear: 185000000, comparisonYear: 170000000, confidenceLevel: 5550000 },
      { period: 'Apr 2024', thisYear: 192000000, comparisonYear: 175000000, confidenceLevel: 5760000 },
      { period: 'May 2024', thisYear: 200000000, comparisonYear: 182000000, confidenceLevel: 6000000 },
      { period: 'Jun 2024', thisYear: 198000000, comparisonYear: 180000000, confidenceLevel: 5940000 },
      { period: 'Jul 2024', thisYear: 195000000, comparisonYear: 178000000, confidenceLevel: 5850000 },
      { period: 'Aug 2024', thisYear: 205000000, comparisonYear: 185000000, confidenceLevel: 6150000 },
    ],
    2023: [
      { period: 'Jan 2023', thisYear: 150000000, comparisonYear: 140000000, confidenceLevel: 4500000 },
      { period: 'Feb 2023', thisYear: 162000000, comparisonYear: 150000000, confidenceLevel: 4860000 },
      { period: 'Mar 2023', thisYear: 170000000, comparisonYear: 158000000, confidenceLevel: 5100000 },
      { period: 'Apr 2023', thisYear: 175000000, comparisonYear: 162000000, confidenceLevel: 5250000 },
      { period: 'May 2023', thisYear: 182000000, comparisonYear: 168000000, confidenceLevel: 5460000 },
      { period: 'Jun 2023', thisYear: 180000000, comparisonYear: 165000000, confidenceLevel: 5400000 },
      { period: 'Jul 2023', thisYear: 178000000, comparisonYear: 162000000, confidenceLevel: 5340000 },
      { period: 'Aug 2023', thisYear: 185000000, comparisonYear: 170000000, confidenceLevel: 5550000 },
    ],
  },
  yearly: {
    2025: [
      { period: '2025', thisYear: 2850000000, comparisonYear: 2700000000, confidenceLevel: 85500000 },
    ],
    2024: [
      { period: '2024', thisYear: 2700000000, comparisonYear: 2550000000, confidenceLevel: 81000000 },
    ],
    2023: [
      { period: '2023', thisYear: 2550000000, comparisonYear: 2400000000, confidenceLevel: 76500000 },
    ],
  },  
};

// Sample fat percentage data
const fatPercentageData = {
  monthly: {
    2025: [
      { period: 'Jan 2025', thisYear: 5.01, comparisonYear: 4.98, confidenceLevel: 0.15 },
      { period: 'Feb 2025', thisYear: 4.85, comparisonYear: 4.79, confidenceLevel: 0.15 },
      { period: 'Mar 2025', thisYear: 4.43, comparisonYear: 4.40, confidenceLevel: 0.13 },
      { period: 'Apr 2025', thisYear: 4.18, comparisonYear: 4.15, confidenceLevel: 0.13 },
      { period: 'May 2025', thisYear: 4.00, comparisonYear: 3.95, confidenceLevel: 0.12 },
      { period: 'Jun 2025', thisYear: 4.04, comparisonYear: 4.00, confidenceLevel: 0.12 },
      { period: 'Jul 2025', thisYear: 4.14, comparisonYear: 4.10, confidenceLevel: 0.12 },
      { period: 'Aug 2025', thisYear: 4.42, comparisonYear: 4.35, confidenceLevel: 0.13 },
      { period: 'Sep 2025', thisYear: 4.77, comparisonYear: 4.70, confidenceLevel: 0.14 },
      { period: 'Oct 2025', thisYear: 5.13, comparisonYear: 5.05, confidenceLevel: 0.15 },
      { period: 'Nov 2025', thisYear: 5.58, comparisonYear: 5.50, confidenceLevel: 0.17 },
      { period: 'Dec 2025', thisYear: 6.00, comparisonYear: 5.90, confidenceLevel: 0.18 },
    ],
    2024: [
      { period: 'Jan 2024', thisYear: 4.98, comparisonYear: 4.90, confidenceLevel: 0.15 },
      { period: 'Feb 2024', thisYear: 4.79, comparisonYear: 4.75, confidenceLevel: 0.14 },
      { period: 'Mar 2024', thisYear: 4.40, comparisonYear: 4.35, confidenceLevel: 0.13 },
      { period: 'Apr 2024', thisYear: 4.15, comparisonYear: 4.10, confidenceLevel: 0.12 },
      { period: 'May 2024', thisYear: 3.95, comparisonYear: 3.90, confidenceLevel: 0.12 },
      { period: 'Jun 2024', thisYear: 4.00, comparisonYear: 3.95, confidenceLevel: 0.12 },
      { period: 'Jul 2024', thisYear: 4.10, comparisonYear: 4.05, confidenceLevel: 0.12 },
      { period: 'Aug 2024', thisYear: 4.35, comparisonYear: 4.30, confidenceLevel: 0.13 },
      { period: 'Sep 2024', thisYear: 4.70, comparisonYear: 4.65, confidenceLevel: 0.14 },
      { period: 'Oct 2024', thisYear: 5.05, comparisonYear: 5.00, confidenceLevel: 0.15 },
      { period: 'Nov 2024', thisYear: 5.50, comparisonYear: 5.40, confidenceLevel: 0.17 },
      { period: 'Dec 2024', thisYear: 5.90, comparisonYear: 5.80, confidenceLevel: 0.18 },
    ],
    2023: [
      { period: 'Jan 2023', thisYear: 4.90, comparisonYear: 4.85, confidenceLevel: 0.15 },
      { period: 'Feb 2023', thisYear: 4.75, comparisonYear: 4.70, confidenceLevel: 0.14 },
      { period: 'Mar 2023', thisYear: 4.35, comparisonYear: 4.30, confidenceLevel: 0.13 },
      { period: 'Apr 2023', thisYear: 4.10, comparisonYear: 4.05, confidenceLevel: 0.12 },
      { period: 'May 2023', thisYear: 3.90, comparisonYear: 3.85, confidenceLevel: 0.12 },
      { period: 'Jun 2023', thisYear: 3.95, comparisonYear: 3.90, confidenceLevel: 0.12 },
      { period: 'Jul 2023', thisYear: 4.05, comparisonYear: 4.00, confidenceLevel: 0.12 },
      { period: 'Aug 2023', thisYear: 4.30, comparisonYear: 4.25, confidenceLevel: 0.13 },
      { period: 'Sep 2023', thisYear: 4.65, comparisonYear: 4.60, confidenceLevel: 0.14 },
      { period: 'Oct 2023', thisYear: 5.00, comparisonYear: 4.95, confidenceLevel: 0.15 },
      { period: 'Nov 2023', thisYear: 5.40, comparisonYear: 5.35, confidenceLevel: 0.16 },
      { period: 'Dec 2023', thisYear: 5.80, comparisonYear: 5.75, confidenceLevel: 0.17 },
    ],
  },
};

// Sample protein percentage data
const proteinPercentageData = {
  monthly: {
    2025: [
      { period: 'Jan 2025', thisYear: 3.81, comparisonYear: 3.75, confidenceLevel: 0.11 },
      { period: 'Feb 2025', thisYear: 3.71, comparisonYear: 3.65, confidenceLevel: 0.11 },
      { period: 'Mar 2025', thisYear: 3.32, comparisonYear: 3.25, confidenceLevel: 0.10 },
      { period: 'Apr 2025', thisYear: 3.36, comparisonYear: 3.30, confidenceLevel: 0.10 },
      { period: 'May 2025', thisYear: 3.47, comparisonYear: 3.40, confidenceLevel: 0.10 },
      { period: 'Jun 2025', thisYear: 3.55, comparisonYear: 3.50, confidenceLevel: 0.11 },
      { period: 'Jul 2025', thisYear: 3.68, comparisonYear: 3.60, confidenceLevel: 0.11 },
      { period: 'Aug 2025', thisYear: 3.78, comparisonYear: 3.70, confidenceLevel: 0.11 },
      { period: 'Sep 2025', thisYear: 4.00, comparisonYear: 3.90, confidenceLevel: 0.12 },
      { period: 'Oct 2025', thisYear: 4.21, comparisonYear: 4.10, confidenceLevel: 0.13 },
      { period: 'Nov 2025', thisYear: 4.19, comparisonYear: 4.10, confidenceLevel: 0.13 },
      { period: 'Dec 2025', thisYear: 4.49, comparisonYear: 4.40, confidenceLevel: 0.13 },
    ],
    2024: [
      { period: 'Jan 2024', thisYear: 3.75, comparisonYear: 3.70, confidenceLevel: 0.11 },
      { period: 'Feb 2024', thisYear: 3.65, comparisonYear: 3.60, confidenceLevel: 0.11 },
      { period: 'Mar 2024', thisYear: 3.25, comparisonYear: 3.20, confidenceLevel: 0.10 },
      { period: 'Apr 2024', thisYear: 3.30, comparisonYear: 3.25, confidenceLevel: 0.10 },
      { period: 'May 2024', thisYear: 3.40, comparisonYear: 3.35, confidenceLevel: 0.10 },
      { period: 'Jun 2024', thisYear: 3.50, comparisonYear: 3.45, confidenceLevel: 0.11 },
      { period: 'Jul 2024', thisYear: 3.60, comparisonYear: 3.55, confidenceLevel: 0.11 },
      { period: 'Aug 2024', thisYear: 3.70, comparisonYear: 3.65, confidenceLevel: 0.11 },
      { period: 'Sep 2024', thisYear: 3.90, comparisonYear: 3.85, confidenceLevel: 0.12 },
      { period: 'Oct 2024', thisYear: 4.10, comparisonYear: 4.00, confidenceLevel: 0.12 },
      { period: 'Nov 2024', thisYear: 4.10, comparisonYear: 4.00, confidenceLevel: 0.12 },
      { period: 'Dec 2024', thisYear: 4.40, comparisonYear: 4.30, confidenceLevel: 0.13 },
    ],
    2023: [
      { period: 'Jan 2023', thisYear: 3.70, comparisonYear: 3.65, confidenceLevel: 0.11 },
      { period: 'Feb 2023', thisYear: 3.60, comparisonYear: 3.55, confidenceLevel: 0.11 },
      { period: 'Mar 2023', thisYear: 3.20, comparisonYear: 3.15, confidenceLevel: 0.10 },
      { period: 'Apr 2023', thisYear: 3.25, comparisonYear: 3.20, confidenceLevel: 0.10 },
      { period: 'May 2023', thisYear: 3.35, comparisonYear: 3.30, confidenceLevel: 0.10 },
      { period: 'Jun 2023', thisYear: 3.45, comparisonYear: 3.40, confidenceLevel: 0.10 },
      { period: 'Jul 2023', thisYear: 3.55, comparisonYear: 3.50, confidenceLevel: 0.11 },
      { period: 'Aug 2023', thisYear: 3.65, comparisonYear: 3.60, confidenceLevel: 0.11 },
      { period: 'Sep 2023', thisYear: 3.85, comparisonYear: 3.80, confidenceLevel: 0.12 },
      { period: 'Oct 2023', thisYear: 4.00, comparisonYear: 3.95, confidenceLevel: 0.12 },
      { period: 'Nov 2023', thisYear: 4.00, comparisonYear: 3.95, confidenceLevel: 0.12 },
      { period: 'Dec 2023', thisYear: 4.30, comparisonYear: 4.25, confidenceLevel: 0.13 },
    ],
  },
};

// Sample lactose percentage data
const lactosePercentageData = {
  monthly: {
    2025: [
      { period: 'Jan 2025', thisYear: 4.6, comparisonYear: 4.55, confidenceLevel: 0.14 },
      { period: 'Feb 2025', thisYear: 4.6, comparisonYear: 4.55, confidenceLevel: 0.14 },
      { period: 'Mar 2025', thisYear: 4.8, comparisonYear: 4.75, confidenceLevel: 0.14 },
      { period: 'Apr 2025', thisYear: 4.9, comparisonYear: 4.85, confidenceLevel: 0.15 },
      { period: 'May 2025', thisYear: 4.9, comparisonYear: 4.85, confidenceLevel: 0.15 },
      { period: 'Jun 2025', thisYear: 4.8, comparisonYear: 4.75, confidenceLevel: 0.14 },
      { period: 'Jul 2025', thisYear: 4.7, comparisonYear: 4.65, confidenceLevel: 0.14 },
      { period: 'Aug 2025', thisYear: 4.6, comparisonYear: 4.55, confidenceLevel: 0.14 },
      { period: 'Sep 2025', thisYear: 4.5, comparisonYear: 4.45, confidenceLevel: 0.14 },
      { period: 'Oct 2025', thisYear: 4.5, comparisonYear: 4.45, confidenceLevel: 0.14 },
      { period: 'Nov 2025', thisYear: 4.5, comparisonYear: 4.45, confidenceLevel: 0.14 },
      { period: 'Dec 2025', thisYear: 4.4, comparisonYear: 4.35, confidenceLevel: 0.13 },
    ],
    2024: [
      { period: 'Jan 2024', thisYear: 4.55, comparisonYear: 4.50, confidenceLevel: 0.14 },
      { period: 'Feb 2024', thisYear: 4.55, comparisonYear: 4.50, confidenceLevel: 0.14 },
      { period: 'Mar 2024', thisYear: 4.75, comparisonYear: 4.70, confidenceLevel: 0.14 },
      { period: 'Apr 2024', thisYear: 4.85, comparisonYear: 4.80, confidenceLevel: 0.15 },
      { period: 'May 2024', thisYear: 4.85, comparisonYear: 4.80, confidenceLevel: 0.15 },
      { period: 'Jun 2024', thisYear: 4.75, comparisonYear: 4.70, confidenceLevel: 0.14 },
      { period: 'Jul 2024', thisYear: 4.65, comparisonYear: 4.60, confidenceLevel: 0.14 },
      { period: 'Aug 2024', thisYear: 4.55, comparisonYear: 4.50, confidenceLevel: 0.14 },
      { period: 'Sep 2024', thisYear: 4.45, comparisonYear: 4.40, confidenceLevel: 0.13 },
      { period: 'Oct 2024', thisYear: 4.45, comparisonYear: 4.40, confidenceLevel: 0.13 },
      { period: 'Nov 2024', thisYear: 4.45, comparisonYear: 4.40, confidenceLevel: 0.13 },
      { period: 'Dec 2024', thisYear: 4.35, comparisonYear: 4.30, confidenceLevel: 0.13 },
    ],
    2023: [
      { period: 'Jan 2023', thisYear: 4.50, comparisonYear: 4.45, confidenceLevel: 0.14 },
      { period: 'Feb 2023', thisYear: 4.50, comparisonYear: 4.45, confidenceLevel: 0.14 },
      { period: 'Mar 2023', thisYear: 4.70, comparisonYear: 4.65, confidenceLevel: 0.14 },
      { period: 'Apr 2023', thisYear: 4.80, comparisonYear: 4.75, confidenceLevel: 0.14 },
      { period: 'May 2023', thisYear: 4.80, comparisonYear: 4.75, confidenceLevel: 0.14 },
      { period: 'Jun 2023', thisYear: 4.70, comparisonYear: 4.65, confidenceLevel: 0.14 },
      { period: 'Jul 2023', thisYear: 4.60, comparisonYear: 4.55, confidenceLevel: 0.14 },
      { period: 'Aug 2023', thisYear: 4.50, comparisonYear: 4.45, confidenceLevel: 0.14 },
      { period: 'Sep 2023', thisYear: 4.40, comparisonYear: 4.35, confidenceLevel: 0.13 },
      { period: 'Oct 2023', thisYear: 4.40, comparisonYear: 4.35, confidenceLevel: 0.13 },
      { period: 'Nov 2023', thisYear: 4.40, comparisonYear: 4.35, confidenceLevel: 0.13 },
      { period: 'Dec 2023', thisYear: 4.30, comparisonYear: 4.25, confidenceLevel: 0.13 },
    ],
  },
};

// Define proper types for the tooltip propsm 
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    dataKey: string;
    payload?: {
      period: string;
      thisYear: number;
      comparisonYear: number;
      confidenceLevel?: number;
    };
  }>;
  label?: string;
}

// Custom tooltip that handles all metric types
const CustomTooltip = ({ active, payload, label, metricType }: TooltipProps & { metricType: MetricType }) => {
  if (active && payload && payload.length) {
    const confidenceLevel = payload[0]?.payload?.confidenceLevel;
    const confidencePercent = confidenceLevel ? ((confidenceLevel / payload[0].value) * 100).toFixed(1) : null;
    
    // Format large numbers with commas
    const formatNumber = (num: number) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Get the appropriate unit based on the metric type
    const getUnit = () => {
      switch (metricType) {
        case 'milk': return 'liters';
        case 'fat': 
        case 'protein':
        case 'lactose': return '%';
        default: return '';
      }
    };
    
    const unit = getUnit();
    
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-md shadow-sm">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-blue-500">
          This Year: {metricType === 'milk' ? formatNumber(payload[0].value) : payload[0].value.toFixed(2)} {unit}
          {confidencePercent && <span className="text-xs ml-1">(±{confidencePercent}%)</span>}
        </p>
        <p className="text-sm text-blue-700">
          Previous Year: {metricType === 'milk' ? formatNumber(payload[1].value) : payload[1].value.toFixed(2)} {unit}
        </p>
        {confidenceLevel && (
          <p className="text-xs text-gray-500 mt-1">
            Confidence Interval: ±{metricType === 'milk' ? formatNumber(confidenceLevel) : confidenceLevel.toFixed(2)} {unit}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function MilkYieldChart() {
  const [selectedYear, setSelectedYear] = useState<"2025" | "2024" | "2023">("2025");
  const [timePeriod, setTimePeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [metricType, setMetricType] = useState<MetricType>('milk');
  
  // Effect to ensure time period is 'monthly' when non-milk metrics are selected
  useEffect(() => {
    if (metricType !== 'milk') {
      setTimePeriod('monthly');
    }
  }, [metricType]);
  
  // Available years for selection
  const availableYears = ["2025", "2024", "2023"];
  
  // Format Y-axis ticks based on the metric type
  const formatYAxisTick = (value: number): string => {
    if (metricType === 'milk') {
      if (value >= 1000000000) {
        return `${(value / 1000000000).toFixed(1)}B`;
      } else if (value >= 1000000) {
        return `${(value / 1000000).toFixed(0)}M`;
      } else if (value >= 1000) {
        return `${(value / 1000).toFixed(0)}K`;
      }
      return value.toString();
    } else {
      // For percentage metrics, show the value with 1 decimal place
      return value.toFixed(1);
    }
  };

  // Get the correct data based on selected metric type
  const getDataForMetric = () => {
    switch (metricType) {
      case 'milk':
        return milkYieldData[timePeriod]?.[selectedYear] || [];
      case 'fat':
        // Only monthly data is available for fat percentages
        return fatPercentageData.monthly[selectedYear] || [];
      case 'protein':
        // Only monthly data is available for protein percentages
        return proteinPercentageData.monthly[selectedYear] || [];
      case 'lactose':
        // Only monthly data is available for lactose percentages
        return lactosePercentageData.monthly[selectedYear] || [];
      default:
        return [];
    }
  };

  // Get the appropriate y-axis label based on metric type
  const getYAxisLabel = () => {
    switch (metricType) {
      case 'milk': return 'Liters';
      case 'fat': return 'Fat %';
      case 'protein': return 'Protein %';
      case 'lactose': return 'Lactose %';
      default: return '';
    }
  };

  // Get the appropriate chart title based on metric type and time period
  const getChartTitle = () => {
    const period = timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1);
    
    switch (metricType) {
      case 'milk': return `${period} Milk Yield Comparison`;
      case 'fat': return `Monthly Fat Content Comparison`;
      case 'protein': return `Monthly Protein Content Comparison`;
      case 'lactose': return `Monthly Lactose Content Comparison`;
      default: return `${period} Comparison`;
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm h-full border border-gray-100">
      <div className="flex flex-col space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h2 className="text-xl font-medium text-gray-800 mb-3 sm:mb-0">
            {getChartTitle()}
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="flex items-center">
              <label htmlFor="yearSelect" className="text-xs sm:text-sm text-gray-600 mr-2">
                Compare:
              </label>
              <select
                id="yearSelect"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value as "2025" | "2024" | "2023")}
                className="border border-gray-200 rounded-md px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year} vs {parseInt(year) - 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Metric Type Selection */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setMetricType('milk')}
            className={`px-3 py-1 text-sm rounded-md ${
              metricType === 'milk'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Milk Volume
          </button>
          <button
            onClick={() => setMetricType('fat')}
            className={`px-3 py-1 text-sm rounded-md ${
              metricType === 'fat'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Fat %
          </button>
          <button
            onClick={() => setMetricType('protein')}
            className={`px-3 py-1 text-sm rounded-md ${
              metricType === 'protein'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Protein %
          </button>
          <button
            onClick={() => setMetricType('lactose')}
            className={`px-3 py-1 text-sm rounded-md ${
              metricType === 'lactose'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Lactose %
          </button>
        </div>
        
        {/* Time Period Selection - Only show if Milk Volume is selected */}
        {metricType === 'milk' && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setTimePeriod('weekly')}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md ${
                timePeriod === 'weekly'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimePeriod('monthly')}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md ${
                timePeriod === 'monthly'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setTimePeriod('yearly')}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md ${
                timePeriod === 'yearly'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Yearly
            </button>
          </div>
        )}
      </div>

      <div className="h-[300px] sm:h-[400px] mt-4 sm:mt-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={getDataForMetric()}
            margin={{
              top: 5,
              right: 20,
              left: 10,
              bottom: 40,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="period" 
              tick={{ fill: '#6b7280' }} 
              axisLine={{ stroke: '#d1d5db' }}
              height={60}
              interval={0}
              angle={-45}
              textAnchor="end"
              dy={10}
            />
            <YAxis 
              tick={{ fill: '#6b7280' }} 
              axisLine={{ stroke: '#d1d5db' }}
              tickFormatter={formatYAxisTick}
              label={{ 
                value: getYAxisLabel(), 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: '#6b7280' }
              }}
              domain={metricType !== 'milk' ? ['auto', 'auto'] : undefined}
            />
            <Tooltip content={<CustomTooltip metricType={metricType} />} />
            <Legend wrapperStyle={{ paddingTop: '25px' }} />
            <Bar
              dataKey="thisYear" 
              name={`${selectedYear} ${metricType === 'milk' ? 'Yield' : 'Value'}`} 
              fill="#60a5fa" 
              radius={[4, 4, 0, 0]} 
            >
              <ErrorBar dataKey="confidenceLevel" width={4} strokeWidth={2} stroke="#3b82f6" direction="y" />
            </Bar>
            <Bar
              dataKey="comparisonYear" 
              name={`${parseInt(selectedYear) - 1} ${metricType === 'milk' ? 'Yield' : 'Value'}`} 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-xs sm:text-sm text-gray-600">
        {metricType === 'milk' ? (
          <p>Data represents {timePeriod.slice(0, -2)} milk production in liters, comparing current year with previous year.</p>
        ) : (
          <p>Data represents monthly {metricType} percentages in milk, comparing current year with previous year.</p>
        )}
        <p className="mt-1">Last updated: 2025-09-02</p>
        <p className="mt-1 text-xs text-gray-500">Error bars indicate confidence intervals (±3% of predicted values)</p>
      </div>
    </div>
  );
} 