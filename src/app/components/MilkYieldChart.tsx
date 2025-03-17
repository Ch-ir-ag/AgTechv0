'use client';

import { useState } from 'react';
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

// Sample data for milk yield analytics - structured by time period with confidence levels
// Scaled to reflect an annual yield of approximately 2 billion liters
const milkYieldData = {
  weekly: {
    2025: [
      { period: 'Mar 1-7', thisYear: 42000000, comparisonYear: 38000000, confidenceLevel: 1260000 },
      { period: 'Mar 8-14', thisYear: 45000000, comparisonYear: 41000000, confidenceLevel: 1350000 },
      { period: 'Mar 15-21', thisYear: 43000000, comparisonYear: 39000000, confidenceLevel: 1290000 },
      { period: 'Mar 22-28', thisYear: 47000000, comparisonYear: 43000000, confidenceLevel: 1410000 },
      { period: 'Mar 29-Apr 4', thisYear: 46000000, comparisonYear: 42000000, confidenceLevel: 1380000 },
      { period: 'Apr 5-11', thisYear: 48000000, comparisonYear: 44000000, confidenceLevel: 1440000 },
      { period: 'Apr 12-18', thisYear: 50000000, comparisonYear: 46000000, confidenceLevel: 1500000 },
      { period: 'Apr 19-25', thisYear: 49000000, comparisonYear: 45000000, confidenceLevel: 1470000 },
    ],
    2024: [
      { period: 'Mar 1-7', thisYear: 38000000, comparisonYear: 36000000, confidenceLevel: 1140000 },
      { period: 'Mar 8-14', thisYear: 41000000, comparisonYear: 39000000, confidenceLevel: 1230000 },
      { period: 'Mar 15-21', thisYear: 39000000, comparisonYear: 37000000, confidenceLevel: 1170000 },
      { period: 'Mar 22-28', thisYear: 43000000, comparisonYear: 40000000, confidenceLevel: 1290000 },
      { period: 'Mar 29-Apr 4', thisYear: 42000000, comparisonYear: 39000000, confidenceLevel: 1260000 },
      { period: 'Apr 5-11', thisYear: 44000000, comparisonYear: 41000000, confidenceLevel: 1320000 },
      { period: 'Apr 12-18', thisYear: 46000000, comparisonYear: 43000000, confidenceLevel: 1380000 },
      { period: 'Apr 19-25', thisYear: 45000000, comparisonYear: 42000000, confidenceLevel: 1350000 },
    ],
    2023: [
      { period: 'Mar 1-7', thisYear: 36000000, comparisonYear: 34000000, confidenceLevel: 1080000 },
      { period: 'Mar 8-14', thisYear: 39000000, comparisonYear: 37000000, confidenceLevel: 1170000 },
      { period: 'Mar 15-21', thisYear: 37000000, comparisonYear: 35000000, confidenceLevel: 1110000 },
      { period: 'Mar 22-28', thisYear: 40000000, comparisonYear: 38000000, confidenceLevel: 1200000 },
      { period: 'Mar 29-Apr 4', thisYear: 39000000, comparisonYear: 37000000, confidenceLevel: 1170000 },
      { period: 'Apr 5-11', thisYear: 41000000, comparisonYear: 39000000, confidenceLevel: 1230000 },
      { period: 'Apr 12-18', thisYear: 43000000, comparisonYear: 41000000, confidenceLevel: 1290000 },
      { period: 'Apr 19-25', thisYear: 42000000, comparisonYear: 40000000, confidenceLevel: 1260000 },
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

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    const confidenceLevel = payload[0]?.payload?.confidenceLevel;
    const confidencePercent = confidenceLevel ? ((confidenceLevel / payload[0].value) * 100).toFixed(1) : null;
    
    // Format large numbers with commas
    const formatNumber = (num: number) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-md shadow-sm">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-blue-500">
          This Year: {formatNumber(payload[0].value)} liters
          {confidencePercent && <span className="text-xs ml-1">(±{confidencePercent}%)</span>}
        </p>
        <p className="text-sm text-blue-700">
          Previous Year: {formatNumber(payload[1].value)} liters
        </p>
        {confidenceLevel && (
          <p className="text-xs text-gray-500 mt-1">
            Confidence Interval: ±{formatNumber(confidenceLevel)} liters
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function MilkYieldChart() {
  const [selectedYear, setSelectedYear] = useState<"2025" | "2024" | "2023">("2025");
  const [timePeriod, setTimePeriod] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  
  // Available years for selection
  const availableYears = ["2025", "2024", "2023"];
  
  // Format Y-axis ticks for large numbers
  const formatYAxisTick = (value: number): string => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B`;
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(0)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }
    return value.toString();
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm h-full border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
        <h2 className="text-xl font-medium text-gray-800 mb-3 sm:mb-0">
          {timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)} Milk Yield Comparison
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
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

      <div className="h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={milkYieldData[timePeriod][selectedYear]}
            margin={{
              top: 5,
              right: 20,
              left: 10,
              bottom: 5,
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
            />
            <YAxis 
              tick={{ fill: '#6b7280' }} 
              axisLine={{ stroke: '#d1d5db' }}
              tickFormatter={formatYAxisTick}
              label={{ 
                value: 'Liters', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: '#6b7280' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Bar
              dataKey="thisYear" 
              name={`${selectedYear} Yield`} 
              fill="#60a5fa" 
              radius={[4, 4, 0, 0]} 
            >
              <ErrorBar dataKey="confidenceLevel" width={4} strokeWidth={2} stroke="#3b82f6" direction="y" />
            </Bar>
            <Bar
              dataKey="comparisonYear" 
              name={`${parseInt(selectedYear) - 1} Yield`} 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-xs sm:text-sm text-gray-600">
        <p>Data represents {timePeriod.slice(0, -2)} milk production in liters, comparing current year with previous year.</p>
        <p className="mt-1">Last updated: 2025-03-03</p>
        <p className="mt-1 text-xs text-gray-500">Error bars indicate confidence intervals (±3% of predicted values)</p>
      </div>
    </div>
  );
} 