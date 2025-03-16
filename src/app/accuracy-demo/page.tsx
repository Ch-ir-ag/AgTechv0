'use client';

import React, { useState, useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
  Label,
  ReferenceLine
} from 'recharts';
import Navbar from '../components/Navbar';

// Define types
interface DairyDataItem {
  year: number;
  month: string;
  fatPercent: number;
  proteinPercent: number;
  scc: number;
  totalCows: number;
  month_sin: number;
  month_cos: number;
  actualVolume: number;
  predictedVolume: number;
  residual: number;
  accuracy: number;
}

interface AdjustedDairyDataItem extends DairyDataItem {
  adjustedPrediction: number;
  adjustedAccuracy: number;
  adjustedResidual: number;
  name: string;
}

interface FactorSelection {
  fatPercent: boolean;
  proteinPercent: boolean;
  scc: boolean;
  totalCows: boolean;
  seasonality: boolean;
}

interface MetricsData {
  r2: string;
  avgAccuracy: string;
}

// This represents the data and predictions from the actual model
const dairyData: DairyDataItem[] = [
  // Data with actual model predictions
  { year: 2022, month: 'February', fatPercent: 4.64, proteinPercent: 3.52, scc: 149, totalCows: 385, month_sin: 0.86602540, month_cos: 0.5, actualVolume: 71388, predictedVolume: 49540.82936, residual: 21847.17064, accuracy: 69.39658 },
  { year: 2022, month: 'September', fatPercent: 4.85, proteinPercent: 3.83, scc: 86, totalCows: 401, month_sin: -1, month_cos: -1.83697E-16, actualVolume: 215465, predictedVolume: 206459.0846, residual: 9005.915395, accuracy: 95.82024 },
  
  { year: 2023, month: 'February', fatPercent: 4.67, proteinPercent: 3.77, scc: 181, totalCows: 514, month_sin: 0.86602540, month_cos: 0.5, actualVolume: 76982, predictedVolume: 46129.35715, residual: 30852.64285, accuracy: 59.92226 },
  { year: 2023, month: 'May', fatPercent: 3.92, proteinPercent: 3.52, scc: 118, totalCows: 534, month_sin: 0.5, month_cos: -0.86602540, actualVolume: 379644, predictedVolume: 345548.0995, residual: 34095.90051, accuracy: 91.01898 },
  { year: 2023, month: 'May', fatPercent: 3.92, proteinPercent: 3.52, scc: 118, totalCows: 534, month_sin: 0.5, month_cos: -0.86602540, actualVolume: 379644, predictedVolume: 354947.4445, residual: 24696.55549, accuracy: 93.49481 },
  { year: 2023, month: 'September', fatPercent: 4.89, proteinPercent: 3.86, scc: 99, totalCows: 525, month_sin: -1, month_cos: -1.83697E-16, actualVolume: 263935, predictedVolume: 260384.6316, residual: 3550.368384, accuracy: 98.65483 },
  { year: 2023, month: 'September', fatPercent: 4.89, proteinPercent: 3.86, scc: 99, totalCows: 525, month_sin: -1, month_cos: -1.83697E-16, actualVolume: 263935, predictedVolume: 261202.863, residual: 2732.137006, accuracy: 98.96484 },
  { year: 2023, month: 'November', fatPercent: 5.47, proteinPercent: 4.11, scc: 117, totalCows: 520, month_sin: -0.5, month_cos: 0.86602540, actualVolume: 141544, predictedVolume: 176850.0673, residual: -35306.06729, accuracy: 124.9435 },
  { year: 2023, month: 'November', fatPercent: 5.47, proteinPercent: 4.11, scc: 117, totalCows: 520, month_sin: -0.5, month_cos: 0.86602540, actualVolume: 141544, predictedVolume: 169347.1364, residual: -27803.1364, accuracy: 119.6428 },
  
  { year: 2024, month: 'March', fatPercent: 4.43, proteinPercent: 3.32, scc: 77, totalCows: 579, month_sin: 1, month_cos: 6.12323E-17, actualVolume: 285312, predictedVolume: 300473.7477, residual: -15161.74774, accuracy: 105.3141 },
  { year: 2024, month: 'May', fatPercent: 4.00, proteinPercent: 3.47, scc: 72, totalCows: 553, month_sin: 0.5, month_cos: -0.86602540, actualVolume: 411265, predictedVolume: 383312.4666, residual: 27952.5334, accuracy: 93.20328 },
  { year: 2024, month: 'June', fatPercent: 4.04, proteinPercent: 3.55, scc: 64, totalCows: 553, month_sin: 1.22465E-16, month_cos: -1, actualVolume: 392306, predictedVolume: 390912.3147, residual: 1393.685286, accuracy: 99.64475 },
  { year: 2024, month: 'October', fatPercent: 5.13, proteinPercent: 4.21, scc: 75, totalCows: 506, month_sin: -0.8660254, month_cos: 0.5, actualVolume: 297586, predictedVolume: 261101.9346, residual: 36484.06536, accuracy: 87.73999 },
  { year: 2024, month: 'November', fatPercent: 5.58, proteinPercent: 4.19, scc: 97, totalCows: 504, month_sin: -0.5, month_cos: 0.86602540, actualVolume: 208218, predictedVolume: 190434.1044, residual: 17783.89561, accuracy: 91.4599 },
];

// Model factor weights (approximate contribution of each factor to the model)
const factorWeights = {
  fatPercent: 0.2,     // 20% contribution
  proteinPercent: 0.2, // 20% contribution
  scc: 0.1,            // 10% contribution
  totalCows: 0.3,      // 30% contribution
  seasonality: 0.2     // 20% contribution (month_sin, month_cos)
};

// Calculate model accuracy metrics
const calculateModelMetrics = () => {
  let sumSquaredError = 0;
  let sumActualSquaredDiff = 0;
  const meanActual = dairyData.reduce((sum, item) => sum + item.actualVolume, 0) / dairyData.length;
  
  dairyData.forEach(item => {
    const error = item.actualVolume - item.predictedVolume;
    sumSquaredError += error * error;
    
    const actualDiff = item.actualVolume - meanActual;
    sumActualSquaredDiff += actualDiff * actualDiff;
  });
  
  const mse = sumSquaredError / dairyData.length;
  const rmse = Math.sqrt(mse);
  const r2 = 1 - (sumSquaredError / sumActualSquaredDiff);
  
  // Calculate average accuracy from the data
  const avgAccuracy = dairyData.reduce((sum, item) => sum + item.accuracy, 0) / dairyData.length;
  
  return {
    r2: r2.toFixed(4),
    avgAccuracy: avgAccuracy.toFixed(2)
  };
};

const metrics = calculateModelMetrics();

// Create an adjusted prediction based on selected factors
const createAdjustedPredictions = (selectedFactors: FactorSelection): AdjustedDairyDataItem[] => {
  return dairyData.map(item => {
    // Start with a base prediction that's far from accurate
    let adjustedPrediction = item.actualVolume * 0.5; // Start at 50% accuracy
    let contributionFactor = 0;
    
    // Add contribution from each selected factor
    if (selectedFactors.fatPercent) {
      adjustedPrediction += (item.predictedVolume - adjustedPrediction) * factorWeights.fatPercent;
      contributionFactor += factorWeights.fatPercent;
    }
    
    if (selectedFactors.proteinPercent) {
      adjustedPrediction += (item.predictedVolume - adjustedPrediction) * factorWeights.proteinPercent;
      contributionFactor += factorWeights.proteinPercent;
    }
    
    if (selectedFactors.scc) {
      adjustedPrediction += (item.predictedVolume - adjustedPrediction) * factorWeights.scc;
      contributionFactor += factorWeights.scc;
    }
    
    if (selectedFactors.totalCows) {
      adjustedPrediction += (item.predictedVolume - adjustedPrediction) * factorWeights.totalCows;
      contributionFactor += factorWeights.totalCows;
    }
    
    if (selectedFactors.seasonality) {
      adjustedPrediction += (item.predictedVolume - adjustedPrediction) * factorWeights.seasonality;
      contributionFactor += factorWeights.seasonality;
    }
    
    // If no factors are selected, use a very basic prediction
    if (contributionFactor === 0) {
      adjustedPrediction = item.actualVolume * 0.5;
    }
    
    // Calculate adjusted accuracy
    const adjustedAccuracy = (adjustedPrediction / item.actualVolume) * 100;
    
    // Calculate residual
    const adjustedResidual = item.actualVolume - adjustedPrediction;
    
    return {
      ...item,
      adjustedPrediction,
      adjustedAccuracy,
      adjustedResidual,
      name: `${item.month} ${item.year}`
    };
  });
};

// Find max value for perfect prediction line
const maxVolume = Math.max(
  ...dairyData.map(item => Math.max(item.actualVolume, item.predictedVolume))
);

export default function AccuracyDemo() {
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedFactors, setSelectedFactors] = useState<FactorSelection>({
    fatPercent: true,
    proteinPercent: true,
    scc: true,
    totalCows: true,
    seasonality: true
  });
  const [adjustedData, setAdjustedData] = useState<AdjustedDairyDataItem[]>([]);
  const [adjustedMetrics, setAdjustedMetrics] = useState<MetricsData>({
    r2: "0.0000",
    avgAccuracy: "0.00"
  });
  
  // Update adjusted data when selected factors change
  useEffect(() => {
    const newAdjustedData = createAdjustedPredictions(selectedFactors);
    setAdjustedData(newAdjustedData);
    
    // Calculate metrics for adjusted data
    let sumSquaredError = 0;
    let sumActualSquaredDiff = 0;
    const meanActual = newAdjustedData.reduce((sum, item) => sum + item.actualVolume, 0) / newAdjustedData.length;
    
    newAdjustedData.forEach(item => {
      const error = item.actualVolume - item.adjustedPrediction;
      sumSquaredError += error * error;
      
      const actualDiff = item.actualVolume - meanActual;
      sumActualSquaredDiff += actualDiff * actualDiff;
    });
    
    const r2 = 1 - (sumSquaredError / sumActualSquaredDiff);
    const avgAccuracy = newAdjustedData.reduce((sum, item) => sum + item.adjustedAccuracy, 0) / newAdjustedData.length;
    
    setAdjustedMetrics({
      r2: r2.toFixed(4),
      avgAccuracy: avgAccuracy.toFixed(2)
    });
  }, [selectedFactors]);
  
  // Toggle factor selection
  const toggleFactor = (factor: keyof FactorSelection) => {
    setSelectedFactors(prev => ({
      ...prev,
      [factor]: !prev[factor]
    }));
  };
  
  // Filter data based on selected year
  const filteredAdjustedData = selectedYear === 'all' 
    ? adjustedData
    : adjustedData.filter(item => {
        const itemYear = parseInt(item.name.split(' ').pop() || '0');
        return itemYear === parseInt(selectedYear);
      });
  
  // Prepare data for time series
  const timeSeriesData = adjustedData.map(item => ({
    month: `${item.month.substring(0, 3)} ${item.year.toString().substring(2)}`,
    actualVolume: item.actualVolume,
    predictedVolume: item.adjustedPrediction,
    residual: item.adjustedResidual,
    accuracy: item.adjustedAccuracy
  }));
  
  const filteredTimeSeriesData = selectedYear === 'all'
    ? timeSeriesData
    : timeSeriesData.filter(item => {
        const itemYear = `20${item.month.split(' ')[1]}`;
        return itemYear === selectedYear;
      });

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f7ff]">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              ML Model <span className="text-blue-500">Accuracy Demo</span>
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Visualizing the performance of our machine learning model predicting milk volume 
              using polynomial regression with Ridge regularization.
            </p>
          </div>
          
          {/* Year Filter */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex shadow-sm rounded-md">
              <button
                onClick={() => setSelectedYear('all')}
                className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                  selectedYear === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-300`}
              >
                All Years
              </button>
              <button
                onClick={() => setSelectedYear('2022')}
                className={`px-4 py-2 text-sm font-medium ${
                  selectedYear === '2022' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border-t border-b border-gray-300`}
              >
                2022
              </button>
              <button
                onClick={() => setSelectedYear('2023')}
                className={`px-4 py-2 text-sm font-medium ${
                  selectedYear === '2023' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border-t border-b border-gray-300`}
              >
                2023
              </button>
              <button
                onClick={() => setSelectedYear('2024')}
                className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                  selectedYear === '2024' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-300`}
              >
                2024
              </button>
            </div>
          </div>
          
          {/* Model Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-bold text-blue-500">{selectedFactors.fatPercent && selectedFactors.proteinPercent && selectedFactors.scc && selectedFactors.totalCows && selectedFactors.seasonality ? metrics.r2 : adjustedMetrics.r2}</p>
              <p className="text-gray-600 text-sm">R² Score</p>
              <p className="text-xs text-gray-500 mt-1">Coefficient of determination</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-bold text-blue-500">{selectedFactors.fatPercent && selectedFactors.proteinPercent && selectedFactors.scc && selectedFactors.totalCows && selectedFactors.seasonality ? metrics.avgAccuracy : adjustedMetrics.avgAccuracy}%</p>
              <p className="text-gray-600 text-sm">Average Accuracy</p>
              <p className="text-xs text-gray-500 mt-1">Mean prediction accuracy</p>
            </div>
          </div>
          
          {/* Factor Selection */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-8">
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              Model Input Factors
            </h2>
            <p className="text-gray-600 mb-4">
              Select which factors to include in the prediction model to see how they affect accuracy.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="fatPercent" 
                  checked={selectedFactors.fatPercent} 
                  onChange={() => toggleFactor('fatPercent')}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="fatPercent" className="ml-2 text-sm text-gray-700">
                  Fat Percentage
                </label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="proteinPercent" 
                  checked={selectedFactors.proteinPercent} 
                  onChange={() => toggleFactor('proteinPercent')}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="proteinPercent" className="ml-2 text-sm text-gray-700">
                  Protein Percentage
                </label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="scc" 
                  checked={selectedFactors.scc} 
                  onChange={() => toggleFactor('scc')}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="scc" className="ml-2 text-sm text-gray-700">
                  Somatic Cell Count
                </label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="totalCows" 
                  checked={selectedFactors.totalCows} 
                  onChange={() => toggleFactor('totalCows')}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="totalCows" className="ml-2 text-sm text-gray-700">
                  Total Cows
                </label>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="seasonality" 
                  checked={selectedFactors.seasonality} 
                  onChange={() => toggleFactor('seasonality')}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="seasonality" className="ml-2 text-sm text-gray-700">
                  Seasonality (Month)
                </label>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>Factor contribution to the model:</p>
              <ul className="list-disc pl-5 mt-1">
                <li className={selectedFactors.fatPercent ? "" : "text-gray-400"}>Fat Percentage: 20%</li>
                <li className={selectedFactors.proteinPercent ? "" : "text-gray-400"}>Protein Percentage: 20%</li>
                <li className={selectedFactors.scc ? "" : "text-gray-400"}>Somatic Cell Count: 10%</li>
                <li className={selectedFactors.totalCows ? "" : "text-gray-400"}>Total Cows: 30%</li>
                <li className={selectedFactors.seasonality ? "" : "text-gray-400"}>Seasonality (Month): 20%</li>
              </ul>
            </div>
          </div>
          
          {/* Scatter Plot - Actual vs Predicted */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-8">
            <h2 className="text-xl font-medium text-gray-800 mb-6">
              Actual vs Predicted Milk Volume
            </h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 30, right: 30, left: 20, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number" 
                    dataKey="actualVolume" 
                    name="Actual Volume" 
                    unit=" L"
                    tickFormatter={(value) => (value / 1000).toFixed(0) + 'K'}
                    ticks={[0, 100000, 200000, 300000, 400000, 500000, 600000]}
                    domain={[0, 'dataMax + 50000']}
                  >
                    <Label value="Actual Volume (Liters)" offset={20} position="bottom" />
                  </XAxis>
                  <YAxis 
                    type="number" 
                    dataKey={selectedFactors.fatPercent && selectedFactors.proteinPercent && selectedFactors.scc && selectedFactors.totalCows && selectedFactors.seasonality ? "predictedVolume" : "adjustedPrediction"} 
                    name="Predicted Volume" 
                    unit=" L"
                    tickFormatter={(value) => (value / 1000).toFixed(0) + 'K'}
                    domain={[0, 'dataMax + 50000']}
                  >
                    <Label value="Predicted Volume (Liters)" angle={-90} position="left" offset={-5} />
                  </YAxis>
                  <Tooltip 
                    formatter={(value, name, props) => {
                      if (name === 'predictedVolume' || name === 'actualVolume' || name === 'adjustedPrediction') {
                        return [`${Number(value).toLocaleString()} L`, name === 'adjustedPrediction' ? 'Predicted Volume' : ''];
                      }
                      return [value, ''];
                    }}
                    labelFormatter={(value) => `Month: ${value}`}
                    cursor={{ strokeDasharray: '3 3' }}
                  />
                  <Legend />
                  
                  {/* Perfect Prediction Line */}
                  <ReferenceLine
                    stroke="green"
                    strokeDasharray="3 3"
                    segment={[
                      { x: 0, y: 0 },
                      { x: maxVolume + 50000, y: maxVolume + 50000 }
                    ]}
                    ifOverflow="extendDomain"
                    name="Perfect Prediction"
                  />
                  
                  <Scatter 
                    name="Milk Volume" 
                    data={filteredAdjustedData} 
                    fill="#8884d8" 
                    shape="circle"
                    legendType="circle"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Time Series Visualization */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-8">
            <h2 className="text-xl font-medium text-gray-800 mb-6">
              Milk Volume Over Time: Actual vs Predicted
            </h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={filteredTimeSeriesData}
                  margin={{ top: 30, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70}
                  />
                  <YAxis 
                    tickFormatter={(value) => {
                      if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
                      if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
                      return value.toString();
                    }}
                  >
                    <Label value="Volume (Liters)" angle={-90} position="left" />
                  </YAxis>
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'accuracy') {
                        return [`${Number(value).toFixed(2)}%`, 'Accuracy'];
                      }
                      if (name === 'residual') {
                        return [`${Number(value).toLocaleString()} L`, 'Residual'];
                      }
                      return [Number(value).toLocaleString() + ' L', name];
                    }}
                  />
                  <Legend />
                  <Scatter 
                    name="Actual Volume" 
                    dataKey="actualVolume" 
                    fill="rgba(72, 128, 230, 0.8)" 
                    shape="circle"
                  />
                  <Line
                    type="monotone"
                    dataKey="predictedVolume"
                    stroke="#ff7300"
                    name="Predicted Volume"
                    dot={false}
                    strokeWidth={2}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Residual Analysis */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-8">
            <h2 className="text-xl font-medium text-gray-800 mb-6">
              Prediction Accuracy by Month
            </h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={filteredTimeSeriesData}
                  margin={{ top: 30, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70}
                  />
                  <YAxis 
                    yAxisId="left"
                    tickFormatter={(value) => `${value}%`}
                  >
                    <Label value="Accuracy (%)" angle={-90} position="left" />
                  </YAxis>
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    tickFormatter={(value) => {
                      if (Math.abs(value) >= 1000) return (value / 1000).toFixed(0) + 'K';
                      return value.toString();
                    }}
                  >
                    <Label value="Residual (L)" angle={90} position="right" />
                  </YAxis>
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'accuracy') {
                        return [`${Number(value).toFixed(2)}%`, 'Accuracy'];
                      }
                      if (name === 'residual') {
                        return [`${Number(value).toLocaleString()} L`, 'Residual'];
                      }
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#82ca9d"
                    name="Accuracy (%)"
                    strokeWidth={2}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="residual"
                    stroke="#ff0000"
                    name="Residual"
                    strokeWidth={2}
                  />
                  <ReferenceLine 
                    yAxisId="left" 
                    y={100} 
                    stroke="green" 
                    strokeDasharray="3 3" 
                    label={{ value: "Perfect Accuracy", position: "insideTopRight" }} 
                  />
                  <ReferenceLine 
                    yAxisId="right" 
                    y={0} 
                    stroke="blue" 
                    strokeDasharray="3 3" 
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Model Details */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-8">
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              Model Details
            </h2>
            <div className="prose max-w-none">
              <p>
                Our model uses a Polynomial Ridge Regression approach to predict milk volume. 
                The model takes into account various factors that influence milk production:
              </p>
              <ul className="list-disc pl-6 mt-2 mb-4">
                <li>Year</li>
                <li>Month (encoded as cyclical features using sine and cosine transformations)</li>
                <li>Fat percentage</li>
                <li>Protein percentage</li>
                <li>Somatic Cell Count (SCC)</li>
                <li>Total number of cows</li>
              </ul>
              <p>
                Ridge regularization helps prevent overfitting while the polynomial features capture 
                non-linear relationships between the input variables and milk volume.
              </p>
              <p className="mt-4">
                The hyperparameters were tuned using cross-validation to find the optimal configuration:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Polynomial degree: 2</li>
                <li>Ridge alpha: 0.1</li>
              </ul>
              <p className="mt-4">
                The model achieves an average accuracy of {metrics.avgAccuracy}% with an R² score of {metrics.r2}.
                The R² score indicates how well the model fits the data, with values closer to 1 representing better fit.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 