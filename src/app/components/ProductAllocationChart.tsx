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
  LabelList,
} from 'recharts';

// Define types for our data structures
interface AllocationItem {
  product: string;
  percentage: number;
  litres: number;
  limit: number;
}

interface PlantDataItem {
  forecastVolume: number;
  allocations: AllocationItem[];
}

type PlantDataType = {
  [key: string]: PlantDataItem;
};

// Plant locations with their allocation data
const plantData: PlantDataType = {
  'Ballyduff': {
    forecastVolume: 1650000,
    allocations: [
      { 
        product: 'Butter', 
        percentage: 32, 
        litres: 528000, 
        limit: 85, // Capacity utilization percentage
      },
      { 
        product: 'Powder', 
        percentage: 28, 
        litres: 462000, 
        limit: 75,
      },
      { 
        product: 'Cream', 
        percentage: 25, 
        litres: 412500, 
        limit: 92, // Approaching capacity limit
      },
      { 
        product: 'Fresh Milk', 
        percentage: 15, 
        litres: 247500, 
        limit: 65,
      },
    ]
  },
  'Killeshandra': {
    forecastVolume: 1420000,
    allocations: [
      { 
        product: 'Butter', 
        percentage: 30, 
        litres: 426000, 
        limit: 78, 
      },
      { 
        product: 'Powder', 
        percentage: 35, 
        litres: 497000, 
        limit: 82, // High utilization
      },
      { 
        product: 'Cream', 
        percentage: 20, 
        litres: 284000, 
        limit: 65, 
      },
      { 
        product: 'Fresh Milk', 
        percentage: 15, 
        litres: 213000, 
        limit: 55,
      },
    ]
  },
  'Monaghan': {
    forecastVolume: 1850000,
    allocations: [
      { 
        product: 'Butter', 
        percentage: 25, 
        litres: 462500, 
        limit: 70, 
      },
      { 
        product: 'Powder', 
        percentage: 30, 
        litres: 555000, 
        limit: 90, // Near capacity
      },
      { 
        product: 'Cream', 
        percentage: 30, 
        litres: 555000, 
        limit: 85, // High utilization
      },
      { 
        product: 'Fresh Milk', 
        percentage: 15, 
        litres: 277500, 
        limit: 60,
      },
    ]
  }
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

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length > 0) {
    const percentage = payload[0]?.value;
    const product = label;
    
    // Since we're now using dynamic data based on plant selection, we need to get this from props
    // For now, we'll fallback to a generic message
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-md shadow-sm">
        <p className="font-medium text-gray-900">{product}</p>
        <p className="text-sm text-blue-600">
          Allocation: {percentage}%
        </p>
      </div>
    );
  }

  return null;
};

// Get status text for bullet point
const getStatusText = (limit: number): string => {
  if (limit >= 90) return ' – Near Capacity';
  if (limit >= 80) return ' – High Utilisation';
  return '';
};

export default function ProductAllocationChart() {
  const [selectedPlant, setSelectedPlant] = useState<string>('Ballyduff');
  
  // Forecast time period (this would typically come from your data source or props)
  const forecastPeriod = "18–24 March 2025";
  
  // Get allocation data for the selected plant
  const getCurrentPlantData = (): PlantDataItem => {
    return plantData[selectedPlant] || plantData['Ballyduff'];
  };

  const handleExport = () => {
    // In a real application, this would generate and download a CSV/PDF
    // For now, we'll just show an alert
    alert(`Exporting allocation plan for ${selectedPlant} plant for the period ${forecastPeriod}`);
    
    // In a real implementation, you'd use a library like jspdf or file-saver to create and download the file
    // Example with file-saver (pseudo-code):
    // const csv = generateCSV(getCurrentPlantData().allocations, forecastPeriod, selectedPlant);
    // saveAs(new Blob([csv], {type: "text/csv;charset=utf-8"}), `allocation-plan-${selectedPlant}-${forecastPeriod}.csv`);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex flex-col space-y-2 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-800">Product Allocation Recommendations</h2>
          <div className="flex items-center">
            <label htmlFor="plantSelect" className="text-xs sm:text-sm text-gray-600 mr-2">
              Plant:
            </label>
            <select
              id="plantSelect"
              value={selectedPlant}
              onChange={(e) => setSelectedPlant(e.target.value)}
              className="border border-gray-200 rounded-md px-2 py-1 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.keys(plantData).map((plant) => (
                <option key={plant} value={plant}>
                  {plant}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="text-sm text-gray-600">Forecast Period: {forecastPeriod}</p>
      </div>
      
      <div className="h-[260px] mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={getCurrentPlantData().allocations}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={30}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
            <YAxis type="category" dataKey="product" width={80} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="percentage" 
              name="Allocation %" 
              fill="#60a5fa"
              radius={[0, 4, 4, 0]}
            >
              <LabelList 
                dataKey="percentage" 
                position="right" 
                formatter={(value: number) => `${value}%`}
                style={{ fill: '#4b5563', fontWeight: 500 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 bg-blue-50 p-4 rounded-md">
        <p className="text-sm text-gray-800 mb-2">
          Based on forecasted supply of {(getCurrentPlantData().forecastVolume / 1000000).toFixed(2)}M litres for {selectedPlant} from {forecastPeriod}, we recommend allocating:
        </p>
        <ul className="list-disc pl-6 text-sm text-gray-800 space-y-1">
          {getCurrentPlantData().allocations.map((item: AllocationItem) => (
            <li key={item.product}>
              {item.litres.toLocaleString()}L ({item.percentage}%) to {item.product}{getStatusText(item.limit)}
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button 
          onClick={handleExport}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export Allocation Plan
        </button>
      </div>
      
      <div className="border-t border-gray-100 pt-3 mt-4">
        <p className="text-xs text-gray-500 text-right">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
} 