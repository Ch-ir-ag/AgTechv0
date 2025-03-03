'use client';

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Dummy data for milk yield analytics - structured by year
const milkYieldDataByYear = {
  2025: [
    { week: 'Week 1', thisYear: 4200, comparisonYear: 3800 },
    { week: 'Week 2', thisYear: 4500, comparisonYear: 4100 },
    { week: 'Week 3', thisYear: 4300, comparisonYear: 3900 },
    { week: 'Week 4', thisYear: 4700, comparisonYear: 4300 },
    { week: 'Week 5', thisYear: 4600, comparisonYear: 4200 },
    { week: 'Week 6', thisYear: 4800, comparisonYear: 4400 },
    { week: 'Week 7', thisYear: 5000, comparisonYear: 4600 },
    { week: 'Week 8', thisYear: 4900, comparisonYear: 4500 },
  ],
  2024: [
    { week: 'Week 1', thisYear: 3800, comparisonYear: 3600 },
    { week: 'Week 2', thisYear: 4100, comparisonYear: 3900 },
    { week: 'Week 3', thisYear: 3900, comparisonYear: 3700 },
    { week: 'Week 4', thisYear: 4300, comparisonYear: 4000 },
    { week: 'Week 5', thisYear: 4200, comparisonYear: 3900 },
    { week: 'Week 6', thisYear: 4400, comparisonYear: 4100 },
    { week: 'Week 7', thisYear: 4600, comparisonYear: 4300 },
    { week: 'Week 8', thisYear: 4500, comparisonYear: 4200 },
  ],
  2023: [
    { week: 'Week 1', thisYear: 3600, comparisonYear: 3400 },
    { week: 'Week 2', thisYear: 3900, comparisonYear: 3700 },
    { week: 'Week 3', thisYear: 3700, comparisonYear: 3500 },
    { week: 'Week 4', thisYear: 4000, comparisonYear: 3800 },
    { week: 'Week 5', thisYear: 3900, comparisonYear: 3700 },
    { week: 'Week 6', thisYear: 4100, comparisonYear: 3900 },
    { week: 'Week 7', thisYear: 4300, comparisonYear: 4100 },
    { week: 'Week 8', thisYear: 4200, comparisonYear: 4000 },
  ],
};

// Define proper types for the tooltip props
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    dataKey: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-md shadow-sm">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-blue-500">
          This Year: {payload[0].value} liters
        </p>
        <p className="text-sm text-blue-700">
          Previous Year: {payload[1].value} liters
        </p>
      </div>
    );
  }

  return null;
};

export default function MilkYieldChart() {
  // State for selected comparison year
  const [selectedYear, setSelectedYear] = useState<"2025" | "2024" | "2023">("2025");
  const [comparisonYear, setComparisonYear] = useState<"2025" | "2024" | "2023">("2024");
  
  // Available years for selection
  const availableYears = Object.keys(milkYieldDataByYear).sort((a, b) => parseInt(b) - parseInt(a));
  
  // Handle year change
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = e.target.value as "2025" | "2024" | "2023";
    setSelectedYear(newYear);
    
    // Set comparison year to previous year
    const yearIndex = availableYears.indexOf(newYear);
    if (yearIndex < availableYears.length - 1) {
      const nextYear = availableYears[yearIndex + 1];
      // Make sure we only set valid years as comparison
      if (nextYear === "2025" || nextYear === "2024" || nextYear === "2023") {
        setComparisonYear(nextYear);
      }
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-gray-800">
          Weekly Milk Yield Comparison
        </h2>
        <div className="flex items-center space-x-2">
          <label htmlFor="yearSelect" className="text-sm text-gray-600">
            Compare:
          </label>
          <select
            id="yearSelect"
            value={selectedYear}
            onChange={handleYearChange}
            className="border border-gray-200 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year} vs {parseInt(year) - 1}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={milkYieldDataByYear[selectedYear as "2025" | "2024" | "2023"]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="week" 
              tick={{ fill: '#6b7280' }} 
              axisLine={{ stroke: '#d1d5db' }}
            />
            <YAxis 
              tick={{ fill: '#6b7280' }} 
              axisLine={{ stroke: '#d1d5db' }}
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
            />
            <Bar 
              dataKey="comparisonYear" 
              name={`${comparisonYear} Yield`} 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>Data represents weekly milk production in liters, comparing current year with previous year.</p>
        <p className="mt-1">Last updated: 2025-03-03</p>
      </div>
    </div>
  );
} 