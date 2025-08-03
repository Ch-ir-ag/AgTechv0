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
import { useParams } from 'next/navigation';
import { loadChartData } from '../utils/chartDataLoader';

// Define metric type
type MetricType = 'milk' | 'fat' | 'protein' | 'lactose';

// Define the data type for chart data points
interface DataPoint {
  period: string;
  thisYear: number;
  comparisonYear: number;
  confidenceLevel: number;
}

// Define proper types for the tooltip props
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

const CustomTooltip = ({ active, payload, label, metricType }: TooltipProps & { metricType: MetricType }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    const formatNumber = (num: number) => {
      if (metricType === 'milk') {
        if (num >= 1000000000) {
          return `${(num / 1000000000).toFixed(2)}B`;
        }
        if (num >= 1000000) {
          return `${(num / 1000000).toFixed(1)}M`;
        }
        return num.toLocaleString();
      } else {
        return num.toFixed(2);
      }
    };
    
    const getUnit = () => {
      switch (metricType) {
        case 'milk':
          return 'liters';
        case 'fat': 
        case 'protein':
        case 'lactose':
          return '%';
        default:
          return '';
      }
    };
    
    // Calculate percent change
    const percentChange = ((data?.thisYear || 0) - (data?.comparisonYear || 0)) / (data?.comparisonYear || 1) * 100;
    const absChange = (data?.thisYear || 0) - (data?.comparisonYear || 0);
    const formattedAbsChange = metricType === 'milk' && absChange >= 1000000000 
      ? `${(absChange / 1000000000).toFixed(2)}B` 
      : formatNumber(absChange);
    
    return (
      <div className="custom-tooltip bg-white p-4 shadow-lg border border-gray-200 rounded-md">
        <p className="mb-2 font-medium text-gray-900 border-b pb-1">{label}</p>
        
        <div className="text-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[#1E4B3A]">{metricType === 'milk' ? "2025 Yield:" : "2025:"}</span>
            <span className="font-medium">{formatNumber(data?.thisYear || 0)} {getUnit()}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500">{metricType === 'milk' ? "2024 Yield:" : "2024:"}</span>
            <span className="font-medium text-gray-500">{formatNumber(data?.comparisonYear || 0)} {getUnit()}</span>
          </div>
          
          <div className="flex justify-between items-center mt-1 pt-1 border-t border-gray-100">
            <span className="text-xs text-gray-600">Change:</span>
            <span className={`font-medium text-sm ${percentChange >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
              {percentChange >= 0 ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
              {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(1)}% ({formattedAbsChange} {getUnit()})
            </span>
          </div>
          
          {data?.confidenceLevel && (
            <div className="mt-1 text-xs text-gray-500 pt-1">
              Confidence interval: ±{formatNumber(data.confidenceLevel)}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  return null;
};

export default function MilkYieldChart() {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [metricType, setMetricType] = useState<MetricType>('milk');
  const [compareYears, setCompareYears] = useState({
    thisYear: 2025,
    comparisonYear: 2024
  });
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  
  // Get company from URL params
  const params = useParams();
  const company = typeof params?.company === 'string' ? params.company : 'lakeland-dairies';
  
  // Define interface for chart data
  interface ChartData {
    milkYieldData: {
      [key: string]: {
        [key: number]: Array<{
          period: string;
          thisYear: number;
          comparisonYear: number;
          confidenceLevel: number;
        }>;
      };
    };
    fatPercentageData: {
      [key: string]: {
        [key: number]: Array<{
          period: string;
          thisYear: number;
          comparisonYear: number;
          confidenceLevel: number;
        }>;
      };
    };
    proteinPercentageData: {
      [key: string]: {
        [key: number]: Array<{
          period: string;
          thisYear: number;
          comparisonYear: number;
          confidenceLevel: number;
        }>;
      };
    };
    lactosePercentageData: {
      [key: string]: {
        [key: number]: Array<{
          period: string;
          thisYear: number;
          comparisonYear: number;
          confidenceLevel: number;
        }>;
      };
    };
  }
  
  // Load company-specific chart data
  const companyChartData = loadChartData(company) as ChartData;
  
  useEffect(() => {
    // Use the company-specific data based on the metric type
    let data: DataPoint[] = [];
    switch (metricType) {
      case 'milk':
        data = companyChartData.milkYieldData[timeframe][compareYears.thisYear] || [];
        break;
      case 'fat':
        data = companyChartData.fatPercentageData[timeframe]?.[compareYears.thisYear] || [];
        break;
      case 'protein':
        data = companyChartData.proteinPercentageData[timeframe]?.[compareYears.thisYear] || [];
        break;
      case 'lactose':
        data = companyChartData.lactosePercentageData[timeframe]?.[compareYears.thisYear] || [];
        break;
      default:
        data = [];
    }
    
    setChartData(data);
  }, [timeframe, metricType, compareYears, companyChartData]);
  
  const formatYAxisTick = (value: number): string => {
    if (metricType === 'milk') {
      if (value >= 1000000000) {
        return `${(value / 1000000000).toFixed(1)}B`;
      }
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
      }
      if (value >= 1000) {
        return `${(value / 1000).toFixed(0)}K`;
      }
      return value.toString();
    } else {
      // For fat, protein, and lactose percentage values, use appropriate precision
      return value.toFixed(1);
    }
  };

  const getYAxisLabel = () => {
    switch (metricType) {
      case 'milk':
        return 'Liters';
      case 'fat':
        return 'Fat %';
      case 'protein':
        return 'Protein %';
      case 'lactose':
        return 'Lactose %';
    }
  };
  
  const getChartTitle = () => {
    const metricName = metricType.charAt(0).toUpperCase() + metricType.slice(1);
    switch (timeframe) {
      case 'weekly':
        return `Weekly ${metricName} Comparison`;
      case 'monthly':
        return `Monthly ${metricName} Comparison`;
      case 'yearly':
        return `Yearly ${metricName} Comparison`;
    }
  };

  // Get Y-axis domain based on metric type
  const getYAxisDomain = (): [number, number | 'auto'] => {
    switch (metricType) {
      case 'milk':
        return [0, 'auto' as const];
      case 'fat':
        return [0, 6.0];
      case 'protein':
        return [0, 4.2];
      case 'lactose':
        return [0, 5.5];
      default:
        return [0, 'auto' as const];
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-gray-800 mb-2 sm:mb-0">
            {getChartTitle()}
          </h2>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Compare:</span>
              <select
            value={`${compareYears.thisYear} vs ${compareYears.comparisonYear}`}
            onChange={(e) => {
              const [thisYear, comparisonYear] = e.target.value.split(' vs ').map(Number);
              setCompareYears({ thisYear, comparisonYear });
            }}
            className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none"
            suppressHydrationWarning
          >
            <option value="2025 vs 2024">2025 vs 2024</option>
            <option value="2024 vs 2023">2024 vs 2023</option>
              </select>
          </div>
        </div>
        
      <div className="grid grid-cols-1 gap-5">
        {/* Metric toggle buttons */}
        <div className="flex flex-wrap gap-2 bg-gray-50 p-3 rounded-md">
          <button
            onClick={() => setMetricType('milk')}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
              metricType === 'milk'
                ? 'bg-green-100 text-[#1E4B3A] shadow-sm' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            suppressHydrationWarning
          >
            Milk Volume
          </button>
          <button
            onClick={() => setMetricType('fat')}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
              metricType === 'fat'
                ? 'bg-green-100 text-[#1E4B3A] shadow-sm' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            suppressHydrationWarning
          >
            Fat %
          </button>
          <button
            onClick={() => setMetricType('protein')}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
              metricType === 'protein'
                ? 'bg-green-100 text-[#1E4B3A] shadow-sm' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            suppressHydrationWarning
          >
            Protein %
          </button>
          <button
            onClick={() => setMetricType('lactose')}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
              metricType === 'lactose'
                ? 'bg-green-100 text-[#1E4B3A] shadow-sm' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            suppressHydrationWarning
          >
            Lactose %
          </button>
        </div>
        
        {/* Time period toggle buttons */}
        <div className="flex flex-wrap gap-2 bg-gray-50 p-3 rounded-md">
            <button
            onClick={() => setTimeframe('weekly')}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
              timeframe === 'weekly' 
                ? 'bg-green-100 text-[#1E4B3A] shadow-sm' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            suppressHydrationWarning
            >
              Weekly
            </button>
            <button
            onClick={() => setTimeframe('monthly')}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
              timeframe === 'monthly' 
                ? 'bg-green-100 text-[#1E4B3A] shadow-sm' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            suppressHydrationWarning
            >
              Monthly
            </button>
            <button
            onClick={() => setTimeframe('yearly')}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
              timeframe === 'yearly' 
                ? 'bg-green-100 text-[#1E4B3A] shadow-sm' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            suppressHydrationWarning
            >
              Yearly
            </button>
      </div>

        {/* Chart */}
        <div className="h-80 sm:h-96 mt-2 border border-gray-100 rounded-lg p-2 bg-gray-50">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
              data={chartData}
            margin={{
                top: 20,
                right: 30,
                left: metricType === 'milk' ? 70 : 40,
              bottom: 40,
            }}
          >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="period" 
                tick={{ fontSize: 12, fill: '#4b5563' }} 
                tickMargin={12}
                height={50}
                stroke="#d1d5db"
            />
            <YAxis
              label={{ 
                value: getYAxisLabel(), 
                angle: -90, 
                position: 'insideLeft', 
                style: { textAnchor: 'middle', fontSize: '80%', fill: '#4b5563', fontWeight: 500 }
              }}
              tickFormatter={formatYAxisTick}
              domain={getYAxisDomain()}
              tick={{ fontSize: 12, fill: '#4b5563' }} 
              tickMargin={10}
              stroke="#d1d5db"
            />
            <Tooltip content={<CustomTooltip metricType={metricType} />} />
              <Legend 
                verticalAlign="top" 
                height={40}
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(value) => <span style={{ color: '#4b5563', fontSize: '13px' }}>{value}</span>}
              />
              <defs>
                <linearGradient id="colorThisYear" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E4B3A" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2d6b4f" stopOpacity={0.8}/>
                </linearGradient>
                <linearGradient id="colorCompYear" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#556B2F" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6b8e3d" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
              <Bar
                name={`${compareYears.thisYear} ${metricType}`} 
              dataKey="thisYear" 
                fill="url(#colorThisYear)" 
                barSize={timeframe === 'yearly' ? 60 : 24}
                radius={[2, 2, 0, 0]}
                animationDuration={750}
                animationEasing="ease-out"
              >
                <ErrorBar dataKey="confidenceLevel" width={4} strokeWidth={2} stroke="#6b8e3d" />
            </Bar>
            <Bar
                name={`${compareYears.comparisonYear} ${metricType}`} 
              dataKey="comparisonYear" 
                fill="url(#colorCompYear)"
                barSize={timeframe === 'yearly' ? 60 : 24}
                radius={[2, 2, 0, 0]}
                animationDuration={750}
                animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

        <div className="text-xs text-gray-500 mt-2 bg-gray-50 p-3 rounded-md border border-gray-100">
          {timeframe === 'yearly' && metricType === 'milk' && chartData.length > 0 && (
            <p className="text-gray-700 font-medium">
              {compareYears.thisYear} Yield: {
                chartData[0].thisYear >= 1000000000 
                  ? `${(chartData[0].thisYear / 1000000000).toFixed(2)}B` 
                  : `${(chartData[0].thisYear / 1000000).toFixed(1)}M`
              } liters (+{((chartData[0].thisYear - chartData[0].comparisonYear) / chartData[0].comparisonYear * 100).toFixed(1)}%)
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 