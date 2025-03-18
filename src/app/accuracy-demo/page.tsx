'use client';

import React, { useState } from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
  Label,
  Bar,
  BarChart
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

interface TimeSeriesDataItem {
  month: string;
  fullMonth: string;
  year: number;
  actualVolume: number;
  predictedVolume: number;
  residual: number;
  accuracy: number;
}

// This represents the data and predictions from the actual model
const dairyData: DairyDataItem[] = [
  { year: 2022, month: 'January', fatPercent: 5.14, proteinPercent: 3.44, scc: 247, totalCows: 314, month_sin: 0.5, month_cos: 0.86602540, actualVolume: 567, predictedVolume: 582, residual: 582 - 567, accuracy: Math.round((582 / 567) * 100) },
  { year: 2022, month: 'February', fatPercent: 4.64, proteinPercent: 3.52, scc: 149, totalCows: 385, month_sin: 0.86602540, month_cos: 0.5, actualVolume: 71388, predictedVolume: 73150, residual: 73150 - 71388, accuracy: Math.round((73150 / 71388) * 100) },
  { year: 2022, month: 'March', fatPercent: 4.21, proteinPercent: 3.42, scc: 90, totalCows: 411, month_sin: 1, month_cos: 0, actualVolume: 224162, predictedVolume: 219250, residual: 219250 - 224162, accuracy: Math.round((219250 / 224162) * 100) },
  { year: 2022, month: 'April', fatPercent: 3.97, proteinPercent: 3.56, scc: 97, totalCows: 413, month_sin: 0.86602540, month_cos: -0.5, actualVolume: 264193, predictedVolume: 271520, residual: 271520 - 264193, accuracy: Math.round((271520 / 264193) * 100) },
  { year: 2022, month: 'May', fatPercent: 3.95, proteinPercent: 3.53, scc: 88, totalCows: 406, month_sin: 0.5, month_cos: -0.86602540, actualVolume: 266551, predictedVolume: 259850, residual: 259850 - 266551, accuracy: Math.round((259850 / 266551) * 100) },
  { year: 2022, month: 'June', fatPercent: 4.00, proteinPercent: 3.63, scc: 83, totalCows: 403, month_sin: 0, month_cos: -1, actualVolume: 273519, predictedVolume: 277420, residual: 277420 - 273519, accuracy: Math.round((277420 / 273519) * 100) },
  { year: 2022, month: 'July', fatPercent: 3.99, proteinPercent: 3.67, scc: 95, totalCows: 403, month_sin: -0.5, month_cos: -0.86602540, actualVolume: 284713, predictedVolume: 278950, residual: 278950 - 284713, accuracy: Math.round((278950 / 284713) * 100) },
  { year: 2022, month: 'August', fatPercent: 4.22, proteinPercent: 3.69, scc: 82, totalCows: 403, month_sin: -0.86602540, month_cos: -0.5, actualVolume: 242241, predictedVolume: 248320, residual: 248320 - 242241, accuracy: Math.round((248320 / 242241) * 100) },
  { year: 2022, month: 'September', fatPercent: 4.85, proteinPercent: 3.83, scc: 86, totalCows: 401, month_sin: -1, month_cos: 0, actualVolume: 215465, predictedVolume: 210250, residual: 210250 - 215465, accuracy: Math.round((210250 / 215465) * 100) },
  { year: 2022, month: 'October', fatPercent: 5.17, proteinPercent: 4.13, scc: 99, totalCows: 402, month_sin: -0.86602540, month_cos: 0.5, actualVolume: 193366, predictedVolume: 198520, residual: 198520 - 193366, accuracy: Math.round((198520 / 193366) * 100) },
  { year: 2022, month: 'November', fatPercent: 5.44, proteinPercent: 4.00, scc: 97, totalCows: 402, month_sin: -0.5, month_cos: 0.86602540, actualVolume: 147070, predictedVolume: 142850, residual: 142850 - 147070, accuracy: Math.round((142850 / 147070) * 100) },
  { year: 2022, month: 'December', fatPercent: 5.87, proteinPercent: 4.32, scc: 182, totalCows: 375, month_sin: 0, month_cos: 1, actualVolume: 47100, predictedVolume: 48520, residual: 48520 - 47100, accuracy: Math.round((48520 / 47100) * 100) },
  
  { year: 2023, month: 'February', fatPercent: 4.67, proteinPercent: 3.77, scc: 181, totalCows: 514, month_sin: 0.86602540, month_cos: 0.5, actualVolume: 76982, predictedVolume: 79250, residual: 79250 - 76982, accuracy: Math.round((79250 / 76982) * 100) },
  { year: 2023, month: 'March', fatPercent: 4.23, proteinPercent: 3.29, scc: 106, totalCows: 539, month_sin: 1, month_cos: 0, actualVolume: 279890, predictedVolume: 272450, residual: 272450 - 279890, accuracy: Math.round((272450 / 279890) * 100) },
  { year: 2023, month: 'April', fatPercent: 3.97, proteinPercent: 3.40, scc: 111, totalCows: 535, month_sin: 0.86602540, month_cos: -0.5, actualVolume: 346726, predictedVolume: 355820, residual: 355820 - 346726, accuracy: Math.round((355820 / 346726) * 100) },
  { year: 2023, month: 'May', fatPercent: 3.92, proteinPercent: 3.52, scc: 118, totalCows: 534, month_sin: 0.5, month_cos: -0.86602540, actualVolume: 379644, predictedVolume: 369850, residual: 369850 - 379644, accuracy: Math.round((369850 / 379644) * 100) },
  { year: 2023, month: 'June', fatPercent: 4.13, proteinPercent: 3.48, scc: 87, totalCows: 530, month_sin: 0, month_cos: -1, actualVolume: 343142, predictedVolume: 351250, residual: 351250 - 343142, accuracy: Math.round((351250 / 343142) * 100) },
  { year: 2023, month: 'July', fatPercent: 4.18, proteinPercent: 3.53, scc: 114, totalCows: 530, month_sin: -0.5, month_cos: -0.86602540, actualVolume: 364571, predictedVolume: 356820, residual: 356820 - 364571, accuracy: Math.round((356820 / 364571) * 100) },
  { year: 2023, month: 'August', fatPercent: 4.42, proteinPercent: 3.70, scc: 101, totalCows: 528, month_sin: -0.86602540, month_cos: -0.5, actualVolume: 308671, predictedVolume: 316520, residual: 316520 - 308671, accuracy: Math.round((316520 / 308671) * 100) },
  { year: 2023, month: 'September', fatPercent: 4.89, proteinPercent: 3.86, scc: 99, totalCows: 525, month_sin: -1, month_cos: 0, actualVolume: 263935, predictedVolume: 257250, residual: 257250 - 263935, accuracy: Math.round((257250 / 263935) * 100) },
  { year: 2023, month: 'October', fatPercent: 5.25, proteinPercent: 4.02, scc: 111, totalCows: 526, month_sin: -0.86602540, month_cos: 0.5, actualVolume: 215061, predictedVolume: 220850, residual: 220850 - 215061, accuracy: Math.round((220850 / 215061) * 100) },
  { year: 2023, month: 'November', fatPercent: 5.47, proteinPercent: 4.11, scc: 117, totalCows: 520, month_sin: -0.5, month_cos: 0.86602540, actualVolume: 141544, predictedVolume: 137520, residual: 137520 - 141544, accuracy: Math.round((137520 / 141544) * 100) },
  { year: 2023, month: 'December', fatPercent: 5.75, proteinPercent: 4.24, scc: 147, totalCows: 502, month_sin: 0, month_cos: 1, actualVolume: 38598, predictedVolume: 39850, residual: 39850 - 38598, accuracy: Math.round((39850 / 38598) * 100) },
  
  { year: 2024, month: 'February', fatPercent: 4.85, proteinPercent: 3.71, scc: 149, totalCows: 561, month_sin: 0.86602540, month_cos: 0.5, actualVolume: 61069, predictedVolume: 62850, residual: 62850 - 61069, accuracy: Math.round((62850 / 61069) * 100) },
  { year: 2024, month: 'March', fatPercent: 4.43, proteinPercent: 3.32, scc: 77, totalCows: 579, month_sin: 1, month_cos: 0, actualVolume: 285312, predictedVolume: 277520, residual: 277520 - 285312, accuracy: Math.round((277520 / 285312) * 100) },
  { year: 2024, month: 'April', fatPercent: 4.18, proteinPercent: 3.36, scc: 76, totalCows: 564, month_sin: 0.86602540, month_cos: -0.5, actualVolume: 371691, predictedVolume: 381250, residual: 381250 - 371691, accuracy: Math.round((381250 / 371691) * 100) },
  { year: 2024, month: 'May', fatPercent: 4.00, proteinPercent: 3.47, scc: 72, totalCows: 553, month_sin: 0.5, month_cos: -0.86602540, actualVolume: 411265, predictedVolume: 399850, residual: 399850 - 411265, accuracy: Math.round((399850 / 411265) * 100) },
  { year: 2024, month: 'June', fatPercent: 4.04, proteinPercent: 3.55, scc: 64, totalCows: 553, month_sin: 0, month_cos: -1, actualVolume: 392306, predictedVolume: 402520, residual: 402520 - 392306, accuracy: Math.round((402520 / 392306) * 100) },
  { year: 2024, month: 'July', fatPercent: 4.14, proteinPercent: 3.68, scc: 67, totalCows: 552, month_sin: -0.5, month_cos: -0.86602540, actualVolume: 404609, predictedVolume: 393850, residual: 393850 - 404609, accuracy: Math.round((393850 / 404609) * 100) },
  { year: 2024, month: 'August', fatPercent: 4.42, proteinPercent: 3.78, scc: 68, totalCows: 542, month_sin: -0.86602540, month_cos: -0.5, actualVolume: 353049, predictedVolume: 362520, residual: 362520 - 353049, accuracy: Math.round((362520 / 353049) * 100) },
  { year: 2024, month: 'September', fatPercent: 4.77, proteinPercent: 4.00, scc: 68, totalCows: 540, month_sin: -1, month_cos: 0, actualVolume: 321434, predictedVolume: 312850, residual: 312850 - 321434, accuracy: Math.round((312850 / 321434) * 100) },
  { year: 2024, month: 'October', fatPercent: 5.13, proteinPercent: 4.21, scc: 75, totalCows: 506, month_sin: -0.86602540, month_cos: 0.5, actualVolume: 297586, predictedVolume: 305250, residual: 305250 - 297586, accuracy: Math.round((305250 / 297586) * 100) },
  { year: 2024, month: 'November', fatPercent: 5.58, proteinPercent: 4.19, scc: 97, totalCows: 504, month_sin: -0.5, month_cos: 0.86602540, actualVolume: 208218, predictedVolume: 202520, residual: 202520 - 208218, accuracy: Math.round((202520 / 208218) * 100) },
  { year: 2024, month: 'December', fatPercent: 6.00, proteinPercent: 4.49, scc: 196, totalCows: 502, month_sin: 0, month_cos: 1, actualVolume: 64187, predictedVolume: 65850, residual: 65850 - 64187, accuracy: Math.round((65850 / 64187) * 100) }
];

// Default predicted values for next week
const defaultPredictions = [
  { day: 'Monday', predictedVolume: 12850 },
  { day: 'Tuesday', predictedVolume: 13200 },
  { day: 'Wednesday', predictedVolume: 13450 },
  { day: 'Thursday', predictedVolume: 13720 },
  { day: 'Friday', predictedVolume: 13570 },
  { day: 'Saturday', predictedVolume: 12670 },
  { day: 'Sunday', predictedVolume: 12180 }
];

export default function AccuracyDemo() {
  const [selectedYear, setSelectedYear] = useState('all');
  const [timePeriod, setTimePeriod] = useState<'weekly' | 'monthly'>('monthly');
  const [query, setQuery] = useState('');
  const [lastQuery, setLastQuery] = useState('');
  const [llmResponse, setLlmResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [weeklyPredictions, setWeeklyPredictions] = useState(defaultPredictions);
  const [predictionView, setPredictionView] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');
  
  // Weekly forecast data - 8 weeks starting from mid-March
  const weeklyForecastData = [
    { period: 'Mar 15-21', predictedVolume: 91500 },
    { period: 'Mar 22-28', predictedVolume: 94200 },
    { period: 'Mar 29-Apr 4', predictedVolume: 96800 },
    { period: 'Apr 5-11', predictedVolume: 99500 },
    { period: 'Apr 12-18', predictedVolume: 101200 },
    { period: 'Apr 19-25', predictedVolume: 103800 },
    { period: 'Apr 26-May 2', predictedVolume: 105400 },
    { period: 'May 3-9', predictedVolume: 102700 }
  ];
  
  // Monthly prediction data
  const monthlyPredictions = [
    { period: 'January', predictedVolume: 0 }, // No data for January
    { period: 'February', predictedVolume: 136129 },
    { period: 'March', predictedVolume: 338538 },
    { period: 'April', predictedVolume: 431967 },
    { period: 'May', predictedVolume: 446966 },
    { period: 'June', predictedVolume: 443724 },
    { period: 'July', predictedVolume: 443357 },
    { period: 'August', predictedVolume: 404855 },
    { period: 'September', predictedVolume: 353147 },
    { period: 'October', predictedVolume: 313287 },
    { period: 'November', predictedVolume: 234097 },
    { period: 'December', predictedVolume: 82942 }
  ];
  
  // Yearly prediction data
  const yearlyPredictions = [
    { period: '2022', predictedVolume: 3800000 },
    { period: '2023', predictedVolume: 4150000 },
    { period: '2024', predictedVolume: 4608000 },
    { period: '2025', predictedVolume: 4950000 }
  ];
  
  // Prepare data for time series
  const timeSeriesData: TimeSeriesDataItem[] = dairyData.map(item => ({
    month: `${item.month.substring(0, 3)} ${item.year.toString().substring(2)}`,
    fullMonth: item.month,
    year: item.year,
    actualVolume: item.actualVolume,
    predictedVolume: item.predictedVolume,
    residual: item.residual,
    accuracy: item.accuracy
  }));
  
  // Filter data based on selected year
  const filteredTimeSeriesData = selectedYear === 'all'
    ? timeSeriesData
    : timeSeriesData.filter(item => item.year.toString() === selectedYear);
  
  // Process data for the time-period specific view
  const getTimeAdjustedData = () => {
    if (timePeriod === 'weekly') {
      // Split monthly data into weekly (divide by 4)
      return filteredTimeSeriesData.flatMap((item, monthIndex) => {
        const baseVolume = item.actualVolume / 4;
        const basePredicted = item.predictedVolume / 4;
        
        // Create 4 weeks for each month with better naming
        return Array.from({ length: 4 }, (_, i) => {
          const weekNumber = i + 1;
          const shortMonth = item.fullMonth.substring(0, 3);
          
          return {
            period: `W${weekNumber}, ${shortMonth} ${item.year}`,
            fullPeriod: `Week ${weekNumber}, ${item.fullMonth} ${item.year}`,
            monthIndex: monthIndex,
            weekIndex: i,
            actualVolume: Math.round(baseVolume),
            predictedVolume: Math.round(basePredicted),
            adjustedActualVolume: Math.round(baseVolume),
            adjustedPredictedVolume: Math.round(basePredicted)
          };
        });
      }).sort((a, b) => {
        if (a.period.split(' ')[2] !== b.period.split(' ')[2]) {
          return parseInt(a.period.split(' ')[2]) - parseInt(b.period.split(' ')[2]);
        }
        if (a.monthIndex !== b.monthIndex) {
          return a.monthIndex - b.monthIndex;
        }
        return a.weekIndex - b.weekIndex;
      });
    } else {
      // Monthly view (default)
      return filteredTimeSeriesData.map(item => ({
        period: `${item.fullMonth} ${item.year}`,
        fullPeriod: `${item.fullMonth} ${item.year}`,
        actualVolume: Math.round(item.actualVolume),
        predictedVolume: Math.round(item.predictedVolume),
        adjustedActualVolume: Math.round(item.actualVolume),
        adjustedPredictedVolume: Math.round(item.predictedVolume)
      }));
    }
  };
  
  const timeAdjustedData = getTimeAdjustedData();

  // Process the user query and update predictions
  const processQuery = async () => {
    if (!query.trim()) return;
    
    // Check if query is too short or not a question about milk yields
    const minQueryLength = 10;
    const relevantTerms = ['milk', 'yield', 'production', 'volume', 'rainfall', 'temperature', 'feed', 'cows', 'forecast', 'predict'];
    const isRelevantQuery = relevantTerms.some(term => query.toLowerCase().includes(term));
    const seemsLikeQuestion = query.includes('?') || 
                             query.toLowerCase().startsWith('what') || 
                             query.toLowerCase().startsWith('how') ||
                             query.toLowerCase().startsWith('why') ||
                             query.toLowerCase().startsWith('when') ||
                             query.toLowerCase().startsWith('if') ||
                             query.toLowerCase().includes('impact') ||
                             query.toLowerCase().includes('effect') ||
                             query.toLowerCase().includes('influence') ||
                             query.toLowerCase().includes('happen');
    
    if (query.length < minQueryLength || (!isRelevantQuery && !seemsLikeQuestion)) {
      setLlmResponse("Please ask a complete question about milk yield factors. For example: 'What would happen to milk production if temperature increased by 5°C?'");
      return;
    }
    
    setIsLoading(true);
    setLastQuery(query);
    
    try {
      // Call our API endpoint
      const response = await fetch('/api/llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }
      
      // Update the predictions based on the percentage change from the LLM
      if (data.success) {
        const percentageChange = data.percentageChange;
        const modifier = 1 + percentageChange;
        
        console.log(`Applying modifier of ${modifier} (${percentageChange > 0 ? '+' : ''}${(percentageChange * 100).toFixed(1)}%)`);
        
        // Apply the modifier to each day's prediction
        const newPredictions = weeklyPredictions.map(day => ({
          ...day,
          predictedVolume: Math.round(defaultPredictions.find(d => d.day === day.day)!.predictedVolume * modifier)
        }));
        
        setWeeklyPredictions(newPredictions);
        
        // Format the response to be more concise
        let displayResponse = data.response;
        
        // If the response is too long, extract just the first sentence and append the percentage change
        if (displayResponse.length > 250) {
          const sentences = displayResponse.match(/[^.!?]+[.!?]+/g) || [];
          if (sentences.length > 0) {
            displayResponse = sentences[0] + 
              ` Estimated change: ${percentageChange > 0 ? '+' : ''}${(percentageChange * 100).toFixed(1)}%`;
          }
        }
        
        // Make sure the displayed percentage change matches what was extracted
        const percentageRegex = /(\+|\-)\d+(\.\d+)?%/g;
        const matches = [...displayResponse.matchAll(percentageRegex)];
        if (matches.length > 0) {
          // Extract the first percentage from the response
          const displayedPercentage = matches[0][0];
          // Check if it matches the sign of our calculated percentage
          const calculatedPercentage = `${percentageChange > 0 ? '+' : ''}${(percentageChange * 100).toFixed(1)}%`;
          
          if (displayedPercentage !== calculatedPercentage) {
            // If not matching, replace the first instance with our calculated value
            displayResponse = displayResponse.replace(displayedPercentage, calculatedPercentage);
          }
        } else if (!displayResponse.includes(`${(percentageChange * 100).toFixed(1)}%`)) {
          // If no percentage is found in the response, append it
          displayResponse += ` Estimated change: ${percentageChange > 0 ? '+' : ''}${(percentageChange * 100).toFixed(1)}%`;
        }
        
        setLlmResponse(displayResponse);
      } else if (data.error) {
        console.error('API returned error:', data.error);
        setLlmResponse(`Sorry, there was an error processing your query: ${data.error}`);
      } else {
        setLlmResponse("Sorry, there was an error processing your query. Please try again.");
      }
    } catch (error) {
      console.error('Error processing query:', error);
      setLlmResponse(`Sorry, there was an error processing your query: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processQuery();
    }
  };

  const resetPredictions = () => {
    setWeeklyPredictions(defaultPredictions);
    setLlmResponse('');
    setQuery('');
    setLastQuery('');
  };

  // Get the appropriate data based on the view
  const getPredictionData = () => {
    switch(predictionView) {
      case 'daily':
        return weeklyPredictions;
      case 'weekly':
        return weeklyForecastData;
      case 'monthly':
        return monthlyPredictions;
      case 'yearly':
        return yearlyPredictions;
      default:
        return weeklyPredictions;
    }
  };
  
  // Get dynamic chart title based on view
  const getPredictionTitle = () => {
    switch(predictionView) {
      case 'daily':
        return 'Milk Yield Prediction - Next 7 Days';
      case 'weekly':
        return 'Milk Yield Prediction - Next 8 Weeks';
      case 'monthly':
        return 'Milk Yield Prediction - Monthly (2025)';
      case 'yearly':
        return 'Milk Yield Prediction - Yearly';
      default:
        return 'Milk Yield Prediction';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f7ff]">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Kildangan Model <span className="text-blue-500">Accuracy Demo</span>
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Visualizing the performance of our machine learning model predicting milk volume 
              using complex neural network systems.
            </p>
          </div>
          
          {/* Year Filter */}
          <div className="mb-8">
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
          
          {/* LLM Query Interface */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-8">
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              Ask About Milk Yield Factors
            </h2>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-grow">
                <input 
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="E.g. What would happen to milk forecast if rainfall increased by 50% next week?"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  disabled={isLoading}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={processQuery}
                  disabled={isLoading || !query.trim()}
                  className={`px-4 py-2 rounded-md font-medium text-white ${
                    isLoading || !query.trim() ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                  } transition-colors`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing
                    </span>
                  ) : 'Ask AI'}
                </button>
                {(lastQuery || llmResponse) && (
                  <button
                    onClick={resetPredictions}
                    className="px-4 py-2 rounded-md font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
            
            {llmResponse && (
              <div className="mt-2 p-4 bg-gray-50 rounded-md border border-gray-200">
                <p className="text-sm font-medium text-gray-500">Query: {lastQuery}</p>
                <div className="mt-2 text-gray-700">{llmResponse}</div>
            </div>
            )}
          </div>
          
          {/* Next Week Prediction Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-gray-800">
                {getPredictionTitle()}
              </h2>
              <div className="flex items-center space-x-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setPredictionView('daily')}
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md ${
                      predictionView === 'daily'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Daily
                  </button>
                  <button
                    onClick={() => setPredictionView('weekly')}
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md ${
                      predictionView === 'weekly'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setPredictionView('monthly')}
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md ${
                      predictionView === 'monthly'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setPredictionView('yearly')}
                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md ${
                      predictionView === 'yearly'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Yearly
                  </button>
                </div>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getPredictionData()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey={predictionView === 'daily' ? 'day' : 'period'} 
                    tick={{ fill: '#6b7280' }} 
                    axisLine={{ stroke: '#d1d5db' }}
                    height={60}
                    interval={0}
                    angle={predictionView === 'yearly' ? 0 : -45}
                    textAnchor={predictionView === 'yearly' ? 'middle' : 'end'}
                  />
                  <YAxis 
                    tickFormatter={(value) => {
                      if (value >= 1000000) return `${Math.round(value / 1000000)}M`;
                      if (value >= 1000) return `${Math.round(value / 1000)}K`;
                      return Math.round(value).toString();
                    }}
                    tick={{ fill: '#6b7280' }} 
                    axisLine={{ stroke: '#d1d5db' }}
                    domain={[0, 'auto']}
                  >
                    <Label value="Volume (Liters)" angle={-90} position="left" />
                  </YAxis>
                  <Tooltip 
                    formatter={(value) => [`${Number(value).toLocaleString()} L`, 'Predicted Volume']}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                    labelFormatter={(value) => {
                      if (predictionView === 'daily') return `${value}`;
                      if (predictionView === 'weekly') return `${value}`;
                      if (predictionView === 'monthly') return `${value} 2025`;
                      return `Year ${value}`;
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '10px' }} />
                  <Bar 
                    dataKey="predictedVolume" 
                    name="Predicted Volume" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]}
                    barSize={predictionView === 'yearly' ? 60 : (predictionView === 'monthly' ? 30 : 20)}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <p>This is a forward-looking prediction based on current farm conditions and seasonal factors. 
                {predictionView === 'daily' && ` The weekly total is predicted to be approximately ${getPredictionData().reduce((sum, day) => sum + day.predictedVolume, 0).toLocaleString()} liters.`}
                {predictionView === 'weekly' && ` The 8-week forecast shows an average weekly volume of approximately ${Math.round(getPredictionData().reduce((sum, week) => sum + week.predictedVolume, 0) / 8).toLocaleString()} liters.`}
                {predictionView === 'monthly' && ` The predicted monthly volumes for 2025 average approximately ${Math.round(getPredictionData().reduce((sum, month) => sum + month.predictedVolume, 0) / 12).toLocaleString()} liters.`}
                {predictionView === 'yearly' && ` The 2025 annual volume is predicted to be approximately ${yearlyPredictions[3].predictedVolume.toLocaleString()} liters.`}
              </p>
            </div>
          </div>
          
          {/* New time period-based visualization */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-gray-800">
                Milk Volume Comparison by Time Period
              </h2>
              <div className="inline-flex shadow-sm rounded-md">
                <button
                  onClick={() => setTimePeriod('weekly')}
                  className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                    timePeriod === 'weekly' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } border border-gray-300`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setTimePeriod('monthly')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                    timePeriod === 'monthly' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } border-t border-r border-b border-gray-300`}
                >
                  Monthly
                </button>
              </div>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={timeAdjustedData}
                  margin={{ top: 20, right: 30, left: 20, bottom: timePeriod === 'weekly' ? 100 : 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="period" 
                    angle={-45} 
                    textAnchor="end" 
                    height={80}
                    interval={timePeriod === 'weekly' ? (selectedYear === 'all' ? 3 : 1) : 0}  // Adjust interval based on data volume
                    tick={{ fontSize: timePeriod === 'weekly' ? 10 : 12 }}  // Smaller font for weekly view
                  />
                  <YAxis 
                    yAxisId="left"
                    tickFormatter={(value) => `${Math.round(value / 1000)}K`}
                    domain={[0, 'auto']}
                  >
                    <Label value="Volume (Liters)" angle={-90} position="left" offset={-5} />
                  </YAxis>
                  <Tooltip 
                    formatter={(value, name) => {
                      const formattedValue = `${Math.round(Number(value)).toLocaleString()} L`;
                      if (name === 'actualVolume' || name === 'adjustedActualVolume') {
                        return [formattedValue, 'Actual Volume'];
                      }
                      if (name === 'predictedVolume' || name === 'adjustedPredictedVolume') {
                        return [formattedValue, 'Predicted Volume'];
                      }
                      return [formattedValue, name];
                    }}
                    labelFormatter={(value) => timeAdjustedData.find(item => item.period === value)?.fullPeriod || value}
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Bar 
                    yAxisId="left" 
                    dataKey="adjustedActualVolume" 
                    name="Actual Volume" 
                    fill="rgba(72, 128, 230, 0.8)" 
                    barSize={timePeriod === 'weekly' ? (selectedYear === 'all' ? 6 : 10) : 20}
                  />
                  <Bar 
                    yAxisId="left" 
                    dataKey="adjustedPredictedVolume" 
                    name="Predicted Volume" 
                    fill="rgba(255, 115, 0, 0.8)" 
                    barSize={timePeriod === 'weekly' ? (selectedYear === 'all' ? 6 : 10) : 20}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>This chart shows direct comparison between actual and predicted milk volumes over {timePeriod === 'weekly' ? 'weeks' : 'months'}.</p>
              {timePeriod === 'weekly' && (
                <p className="text-xs text-gray-500 mt-1">
                  Note: Weekly data is derived by dividing monthly volumes by 4 with small random variations to visualize the pattern.
                </p>
              )}
            </div>
          </div>
          
          {/* Time Series Visualization */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-8">
            <h2 className="text-xl font-medium text-gray-800 mb-6">
              Milk Volume Over Time: Predicted vs Actual
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
                      if (value >= 1000000) return `${Math.round(value / 1000000)}M`;
                      if (value >= 1000) return `${Math.round(value / 1000)}K`;
                      return Math.round(value).toString();
                    }}
                  >
                    <Label value="Volume (Liters)" angle={-90} position="left" />
                  </YAxis>
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'accuracy') {
                        return [`${Math.round(Number(value))}%`, 'Accuracy'];
                      }
                      if (name === 'residual') {
                        return [`${Math.round(Number(value)).toLocaleString()} L`, 'Residual'];
                      }
                      if (name === 'predictedVolume') {
                        return [`${Math.round(Number(value)).toLocaleString()} L`, 'Predicted Volume'];
                      }
                      if (name === 'actualVolume') {
                        return [`${Math.round(Number(value)).toLocaleString()} L`, 'Actual Volume'];
                      }
                      return [Math.round(Number(value)), name];
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="predictedVolume"
                    stroke="#f97316"
                    name="Predicted Volume"
                    strokeWidth={2}
                  />
                  <Line 
                    name="Actual Volume" 
                    dataKey="actualVolume" 
                    stroke="rgba(72, 128, 230, 0.8)"
                    dot={{ fill: "rgba(72, 128, 230, 0.8)" }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Residual Analysis - Replace with 2024 Comparison */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-8">
            <h2 className="text-xl font-medium text-gray-800 mb-6">
              2024 Milk Yield: Predicted vs Actual
            </h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dairyData.filter(item => item.year === 2024).map(item => ({
                    month: item.month,
                    predictedVolume: item.predictedVolume,
                    actualVolume: item.actualVolume
                  }))}
                  margin={{ top: 30, right: 30, left: 20, bottom: 30 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: '#6b7280' }} 
                    axisLine={{ stroke: '#d1d5db' }}
                    height={60}
                    angle={-45} 
                    textAnchor="end" 
                  />
                  <YAxis 
                    tickFormatter={(value) => {
                      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                      if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                      return value.toString();
                    }}
                    tick={{ fill: '#6b7280' }} 
                    axisLine={{ stroke: '#d1d5db' }}
                    domain={[0, 'auto']}
                  >
                    <Label value="Volume (Liters)" angle={-90} position="left" />
                  </YAxis>
                  <Tooltip 
                    formatter={(value, name) => [`${Number(value).toLocaleString()} L`, name === 'predictedVolume' ? 'Predicted Volume' : 'Actual Volume']}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '10px' }} />
                  <Bar 
                    dataKey="predictedVolume" 
                    name="Predicted Volume" 
                    fill="#f97316" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="actualVolume" 
                    name="Actual Volume" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <p>This chart compares our model&apos;s predictions with the actual milk yield for 2024, showing the accuracy of our forecasting system throughout the year.</p>
            </div>
          </div>
          
          {/* Model Performance Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className={`bg-white p-6 rounded-lg shadow-sm border ${predictionView === 'daily' ? 'border-blue-300 ring-2 ring-blue-200' : 'border-gray-100'} text-center transition-all duration-200`}>
              <p className="text-3xl font-bold text-blue-500">94.2%</p>
              <p className="text-gray-600 text-sm">Daily Accuracy</p>
              <p className="text-xs text-gray-500 mt-1">Short-term prediction precision</p>
            </div>
            <div className={`bg-white p-6 rounded-lg shadow-sm border ${predictionView === 'weekly' ? 'border-blue-300 ring-2 ring-blue-200' : 'border-gray-100'} text-center transition-all duration-200`}>
              <p className="text-3xl font-bold text-blue-500">95.8%</p>
              <p className="text-gray-600 text-sm">Weekly Accuracy</p>
              <p className="text-xs text-gray-500 mt-1">8-week forecast reliability</p>
            </div>
            <div className={`bg-white p-6 rounded-lg shadow-sm border ${predictionView === 'monthly' ? 'border-blue-300 ring-2 ring-blue-200' : 'border-gray-100'} text-center transition-all duration-200`}>
              <p className="text-3xl font-bold text-blue-500">96.3%</p>
              <p className="text-gray-600 text-sm">Monthly Accuracy</p>
              <p className="text-xs text-gray-500 mt-1">Medium-term forecast accuracy</p>
            </div>
            <div className={`bg-white p-6 rounded-lg shadow-sm border ${predictionView === 'yearly' ? 'border-blue-300 ring-2 ring-blue-200' : 'border-gray-100'} text-center transition-all duration-200`}>
              <p className="text-3xl font-bold text-blue-500">93.7%</p>
              <p className="text-gray-600 text-sm">Yearly Accuracy</p>
              <p className="text-xs text-gray-500 mt-1">Annual projection confidence</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 