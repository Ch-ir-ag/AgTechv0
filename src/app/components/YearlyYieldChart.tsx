'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

// Dummy data for yearly milk yield and predictions
const yearlyYieldData = [
  { month: 'Jan', actual: 145000, predicted: 142000 },
  { month: 'Feb', actual: 138000, predicted: 140000 },
  { month: 'Mar', actual: 152000, predicted: 150000 },
  { month: 'Apr', actual: 160000, predicted: 155000 },
  { month: 'May', actual: 165000, predicted: 162000 },
  { month: 'Jun', actual: 172000, predicted: 170000 },
  { month: 'Jul', actual: 168000, predicted: 175000 },
  { month: 'Aug', actual: 175000, predicted: 178000 },
  // Future months (only predictions)
  { month: 'Sep', actual: null, predicted: 180000 },
  { month: 'Oct', actual: null, predicted: 176000 },
  { month: 'Nov', actual: null, predicted: 170000 },
  { month: 'Dec', actual: null, predicted: 165000 },
];

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
  if (active && payload && payload.length > 0) {
    const actualValue = payload[0]?.value !== undefined ? payload[0].value : 'N/A';
    const predictedValue = payload[1]?.value !== undefined ? payload[1].value : 'N/A';
    
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-md shadow-sm">
        <p className="font-medium text-gray-900">{label || 'Unknown'}</p>
        <p className="text-sm text-[#1E4B3A]">
          Actual: {actualValue} liters
        </p>
        <p className="text-sm text-green-600">
          Predicted: {predictedValue} liters
        </p>
      </div>
    );
  }

  return null;
};

export default function YearlyYieldChart() {
  // Use a static month for the reference line to avoid hydration mismatches
  const currentMonth = 3; // April (0-indexed)
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-800">Yearly Milk Yield vs Prediction</h2>
      </div>
      <div className="h-[300px] mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={yearlyYieldData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <ReferenceLine x={yearlyYieldData[currentMonth].month} stroke="#f97316" label="Current" />
            <Line type="monotone" dataKey="actual" stroke="#556B2F" activeDot={{ r: 8, fill: "#556B2F" }} name="Actual Yield" />
            <Line type="monotone" dataKey="predicted" stroke="#1E4B3A" name="Predicted Yield" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="border-t border-gray-100 pt-3 mt-2">
        <p className="text-xs text-gray-500 text-right">Last updated: March 2025</p>
      </div>
    </div>
  );
} 