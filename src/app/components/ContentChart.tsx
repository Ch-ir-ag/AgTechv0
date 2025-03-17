'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import ContentDataInput from './ContentDataInput';

// Initial data structure
const defaultContentData = {
  weekly: {
    2025: [],
    2024: []
  },
  monthly: {
    2025: [],
    2024: []
  },
  yearly: {
    2025: [],
    2024: []
  }
};

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    name: string;
  }>;
  label?: string;
}

interface ContentData {
  period: string;
  actualFat?: number;
  predictedFat?: number;
  actualProtein?: number;
  predictedProtein?: number;
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    const isProtein = payload[0].dataKey.includes('Protein');
    return (
      <div className="bg-white p-2 border border-gray-200 rounded shadow">
        <p className="text-sm">{`${label}`}</p>
        <p className="text-sm font-semibold text-blue-600">
          {`${payload[0].value.toLocaleString()}${isProtein ? '%' : ' L'}`}
        </p>
      </div>
    );
  }
  return null;
};

export default function ContentChart() {
  const [selectedYear, setSelectedYear] = useState<"2025" | "2024">("2025");
  const [timePeriod, setTimePeriod] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const [contentType, setContentType] = useState<'fat' | 'protein'>('fat');
  const [contentData, setContentData] = useState(defaultContentData);
  const [showInputForm, setShowInputForm] = useState(false);

  const handleDataSubmit = (newData: ContentData) => {
    setContentData(prevData => ({
      ...prevData,
      [timePeriod]: {
        ...prevData[timePeriod],
        [selectedYear]: [...(prevData[timePeriod][selectedYear] || []), newData]
      }
    }));
  };

  const data = contentData[timePeriod][selectedYear];

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm h-full border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
          <h2 className="text-xl font-medium text-gray-800 mb-3 sm:mb-0">
            {timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)} {contentType.charAt(0).toUpperCase() + contentType.slice(1)} Content Prediction
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setContentType('fat')}
                className={`px-3 py-1 text-sm rounded-md ${
                  contentType === 'fat'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Fat Content
              </button>
              <button
                onClick={() => setContentType('protein')}
                className={`px-3 py-1 text-sm rounded-md ${
                  contentType === 'protein'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Protein Content
              </button>
            </div>
            <div className="flex items-center">
              <label htmlFor="yearSelect" className="text-sm text-gray-600 mr-2">
                Year:
              </label>
              <select
                id="yearSelect"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value as "2025" | "2024")}
                className="border border-gray-200 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button
            onClick={() => setTimePeriod('weekly')}
            className={`px-3 py-1 text-xs sm:text-sm rounded-md ${
              timePeriod === 'weekly'
                ? 'bg-gray-700 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimePeriod('monthly')}
            className={`px-3 py-1 text-xs sm:text-sm rounded-md ${
              timePeriod === 'monthly'
                ? 'bg-gray-700 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimePeriod('yearly')}
            className={`px-3 py-1 text-xs sm:text-sm rounded-md ${
              timePeriod === 'yearly'
                ? 'bg-gray-700 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Yearly
          </button>
          <button
            onClick={() => setShowInputForm(!showInputForm)}
            className="ml-auto px-3 py-1 text-xs sm:text-sm rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
          >
            {showInputForm ? 'Hide Input Form' : 'Add New Data'}
          </button>
        </div>

        {data.length === 0 ? (
          <div className="h-[300px] sm:h-[400px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
            <div className="text-center">
              <p className="text-gray-500 mb-2">No data available for this period</p>
              <button
                onClick={() => setShowInputForm(true)}
                className="text-blue-500 hover:text-blue-600"
              >
                Add your first data point
              </button>
            </div>
          </div>
        ) : (
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 30,
                  bottom: 65
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
                  domain={[2.5, 5.5]}
                  tick={{ fill: '#6b7280' }} 
                  axisLine={{ stroke: '#d1d5db' }}
                  tickCount={7}
                  label={{ 
                    value: 'Content (%)', 
                    angle: -90, 
                    position: 'insideLeft',
                    offset: -10,
                    style: { fill: '#6b7280' }
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ paddingTop: '10px' }}
                  iconType="circle"
                  verticalAlign="top"
                  align="right"
                />
                
                {contentType === 'fat' ? (
                  <>
                    <Line 
                      type="monotone" 
                      dataKey="actualFat" 
                      name="Actual Fat Content" 
                      stroke="#3b82f6" 
                      strokeWidth={2} 
                      dot={{ r: 4, fill: "#3b82f6" }} 
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predictedFat" 
                      name="Predicted Fat Content" 
                      stroke="#60a5fa" 
                      strokeWidth={2} 
                      strokeDasharray="3 3"
                      dot={{ r: 4, fill: "#60a5fa" }} 
                      activeDot={{ r: 6 }}
                    />
                  </>
                ) : (
                  <>
                    <Line 
                      type="monotone" 
                      dataKey="actualProtein" 
                      name="Actual Protein Content" 
                      stroke="#22c55e" 
                      strokeWidth={2} 
                      dot={{ r: 4, fill: "#22c55e" }} 
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predictedProtein" 
                      name="Predicted Protein Content" 
                      stroke="#86efac" 
                      strokeWidth={2} 
                      strokeDasharray="3 3"
                      dot={{ r: 4, fill: "#86efac" }} 
                      activeDot={{ r: 6 }}
                    />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="mt-4 text-xs sm:text-sm text-gray-600">
          <p>Data represents {timePeriod.slice(0, -2)} {contentType} content percentages.</p>
          <p className="mt-1">Last updated: {new Date().toLocaleDateString()}</p>
          <p className="mt-1 text-xs text-gray-500">Predictions have an average accuracy of 95.6%</p>
        </div>
      </div>

      {showInputForm && (
        <ContentDataInput
          onDataSubmit={handleDataSubmit}
          timePeriod={timePeriod}
        />
      )}
    </div>
  );
} 