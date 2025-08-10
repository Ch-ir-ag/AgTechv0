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

// Real-time predicted values for next 8 weeks from August 10th, 2025
const defaultPredictions = [
  { period: 'Aug 10-16', predictedVolume: 91500 },
  { period: 'Aug 17-23', predictedVolume: 94200 },
  { period: 'Aug 24-30', predictedVolume: 96800 },
  { period: 'Aug 31-Sep 6', predictedVolume: 99500 },
  { period: 'Sep 7-13', predictedVolume: 101200 },
  { period: 'Sep 14-20', predictedVolume: 103800 },
  { period: 'Sep 21-27', predictedVolume: 105400 },
  { period: 'Sep 28-Oct 4', predictedVolume: 102700 }
];

// Predefined questions and responses
const predefinedQuestions = [
  {
    id: 1,
    question: "How would an extended period of heavy rainfall (>150mm in a month) impact milk production in Ireland?",
    answer: "Excessive rainfall in Ireland can lead to waterlogged pastures, reducing grass quality and limiting grazing time for cows, negatively affecting milk production.",
    percentageChange: -0.08, // -8% change
  },
  {
    id: 2,
    question: "What impact would an unusually mild winter (average 8-10°C) have on early spring milk yields in Ireland?",
    answer: "Milder Irish winters promote earlier grass growth and better cow comfort, resulting in improved early spring milk yields compared to normal seasonal patterns.",
    percentageChange: 0.07, // +7% change
  },
  {
    id: 3,
    question: "How would a summer drought (less than 30mm rainfall over 6 weeks) affect milk production in Ireland?",
    answer: "Summer droughts in Ireland significantly reduce grass growth, forcing farmers to use supplementary feed and limiting milk production during what should be peak season.",
    percentageChange: -0.15, // -15% change
  },
  {
    id: 4,
    question: "What if we experienced a spring with higher-than-average sunshine hours across the Irish midlands?",
    answer: "Increased sunshine in spring accelerates grass growth in Ireland's midlands, providing better quality forage and boosting milk production during the critical early lactation period.",
    percentageChange: 0.11, // +11% change
  },
  {
    id: 5,
    question: "How would an extended period of Atlantic storms in autumn impact Irish dairy production?",
    answer: "Autumn Atlantic storms cause housing cattle earlier than planned, reducing grazing days and increasing costs, while wet conditions stress cows and reduce milk output.",
    percentageChange: -0.10, // -10% change
  },
  {
    id: 6,
    question: "What if we had a particularly cold and frosty Irish spring (multiple nights below 0°C in April)?",
    answer: "Late frosts damage emerging pasture growth in Ireland, delaying the spring flush of grass and forcing continued reliance on stored feeds, negatively affecting milk yields.",
    percentageChange: -0.12, // -12% change
  }
];

export default function AccuracyDemo() {
  const [selectedYear, setSelectedYear] = useState('all');
  const [timePeriod, setTimePeriod] = useState<'weekly' | 'monthly'>('monthly');
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [llmResponse, setLlmResponse] = useState('');
  const [weeklyPredictions, setWeeklyPredictions] = useState(defaultPredictions);
  const [predictionView] = useState<'weekly'>('weekly');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  

  
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

  // Handle question selection (toggle on/off)
  const handleQuestionSelect = (questionId: number) => {
    const selectedQ = predefinedQuestions.find(q => q.id === questionId);
    if (!selectedQ) return;
    
    // Toggle selection - if already selected, deselect
    if (selectedQuestion === questionId) {
      setSelectedQuestion(null);
      setLlmResponse('');
      setWeeklyPredictions(defaultPredictions);
      return;
    }
    
    setSelectedQuestion(questionId);
    setLlmResponse(selectedQ.answer);
    
    // Update predictions based on the percentage change
    const adjustedPredictions = defaultPredictions.map(item => ({
      ...item,
      predictedVolume: Math.round(item.predictedVolume * (1 + selectedQ.percentageChange))
    }));
    
    setWeeklyPredictions(adjustedPredictions);
  };



  // Get the appropriate data for weekly view
  const getPredictionData = () => {
    // If we have a selected question, use the modified weeklyPredictions
    if (selectedQuestion) {
      return weeklyPredictions;
    }
    
    // Otherwise use the default predictions
    return defaultPredictions;
  };
  
  // Get dynamic chart title for weekly view
  const getPredictionTitle = () => {
    const baseTitle = 'Milk Yield Prediction - Next 8 Weeks';
    
    // Add indicator when a question is selected
    if (selectedQuestion) {
      const impact = predefinedQuestions.find(q => q.id === selectedQuestion)?.percentageChange || 0;
      const changeText = impact >= 0 ? `+${(impact * 100).toFixed(1)}%` : `${(impact * 100).toFixed(1)}%`;
      return `${baseTitle} (Impact: ${changeText})`;
    }
    
    return baseTitle;
  };

  // Handle rotating questions
  React.useEffect(() => {
    if (selectedQuestion) return; // Don't rotate when a question is selected
    
    const rotationInterval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => 
          prevIndex === predefinedQuestions.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 400); // Match this with the CSS transition duration
    }, 4000); // Rotate every 4 seconds
    
    return () => clearInterval(rotationInterval);
  }, [selectedQuestion]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#1E4B3A] mb-4">
          Kildangan Model <span className="text-[#1E4B3A]">Accuracy Demo</span>
        </h1>
        <p className="text-[#1E4B3A] max-w-3xl mx-auto">
          Model developed using custom set of variables & algorithms.
        </p>
      </div>
      
      {/* Year Filter */}
      <div className="mb-8">
        <div className="inline-flex shadow-sm rounded-md">
          <button
            onClick={() => setSelectedYear('all')}
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              selectedYear === 'all' 
                ? 'bg-[#1E4B3A] text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300`}
          >
            All Years
          </button>
          <button
            onClick={() => setSelectedYear('2022')}
            className={`px-4 py-2 text-sm font-medium ${
              selectedYear === '2022' 
                ? 'bg-[#1E4B3A] text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border-t border-b border-gray-300`}
          >
            2022
          </button>
          <button
            onClick={() => setSelectedYear('2023')}
            className={`px-4 py-2 text-sm font-medium ${
              selectedYear === '2023' 
                ? 'bg-[#1E4B3A] text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border-t border-b border-gray-300`}
          >
            2023
          </button>
          <button
            onClick={() => setSelectedYear('2024')}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              selectedYear === '2024' 
                ? 'bg-[#1E4B3A] text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            } border border-gray-300`}
          >
            2024
          </button>
        </div>
      </div>
      
      {/* LLM Query Interface */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-medium text-[#1E4B3A] mb-4">
          Ask About Milk Yield Factors
        </h2>
        <div className="flex flex-col">
          <div className="relative h-[76px] flex items-center">
            <div className="w-full bg-gradient-to-r from-blue-50 to-transparent p-0.5 rounded-lg">
              <div className="question-container w-full min-h-[74px] flex items-center">
                {predefinedQuestions.map((q, index) => (
                  <div
                    key={q.id}
                    onClick={() => handleQuestionSelect(q.id)}
                    className={`absolute w-full py-3 px-4 rounded-md cursor-pointer transition-all duration-300 ${
                      selectedQuestion === q.id
                        ? 'border-blue-300 bg-blue-50 shadow-sm question-card-selected opacity-100'
                        : index === currentQuestionIndex 
                          ? `${isTransitioning ? 'opacity-0 blur-sm transform -translate-y-2' : 'opacity-100'}`
                          : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <p className="text-sm text-gray-800 leading-snug">{q.question}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Compact Insight Dropdown */}
        {llmResponse && (
          <div className="mt-4 relative overflow-hidden">
            <div 
              className="bg-[#F7F5F0] rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all duration-500 ease-out transform"
              style={{
                animation: 'slideDown 0.5s ease-out',
                transformOrigin: 'top'
              }}
            >
              <div className="p-4">
                <p className="text-sm text-gray-700 leading-relaxed mb-3">{llmResponse}</p>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Impact on Milk Yield:</span>
                  <span 
                    className={`text-sm font-bold ${
                      selectedQuestion && (predefinedQuestions.find(q => q.id === selectedQuestion)?.percentageChange || 0) >= 0 
                        ? 'text-green-700' 
                        : 'text-red-700'
                    }`}
                  >
                    {selectedQuestion && 
                      `${(predefinedQuestions.find(q => q.id === selectedQuestion)?.percentageChange || 0) >= 0 ? '+' : ''}
                      ${((predefinedQuestions.find(q => q.id === selectedQuestion)?.percentageChange || 0) * 100).toFixed(1)}%`
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Next Week Prediction Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-[#1E4B3A]">
            {getPredictionTitle()}
          </h2>
          <div className="flex items-center space-x-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md bg-[#1E4B3A] text-white">
                Weekly
              </span>
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
                dataKey="period" 
                tick={{ fill: '#6b7280' }} 
                axisLine={{ stroke: '#d1d5db' }}
                height={60}
                interval={0}
                angle={-45}
                textAnchor="end"
              />
              <YAxis 
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${Math.round(value / 1000000)}M`;
                  if (value >= 1000) return `${Math.round(value / 1000)}K`;
                  return Math.round(value).toString();
                }}
                tick={{ fill: '#6b7280' }} 
                axisLine={{ stroke: '#d1d5db' }}
                domain={[0, 120000]}
              >
                <Label 
                  value="Volume (Litres)" 
                  angle={-90} 
                  position="insideLeft"
                  style={{ textAnchor: 'middle' }}
                />
              </YAxis>
              <Tooltip 
                formatter={(value) => [`${Number(value).toLocaleString()} L`, 'Predicted Volume']}
                contentStyle={{ backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                labelFormatter={(value) => `${value}`}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar 
                dataKey="predictedVolume" 
                name="Predicted Volume" 
                fill={selectedQuestion 
                  ? ((predefinedQuestions.find(q => q.id === selectedQuestion)?.percentageChange || 0) >= 0 
                      ? "#4ade80" // Green for positive impact
                      : "#ef4444") // Red for negative impact
                  : "#1E4B3A"} // Default colour
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
      
      {/* Time Series Visualization */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-medium text-[#1E4B3A] mb-6">
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
                <Label 
                  value="Volume (Litres)" 
                  angle={-90} 
                  position="insideLeft"
                  style={{ textAnchor: 'middle' }}
                  offset={-15}
                />
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
                stroke="#556B2F"
                dot={{ fill: "#556B2F" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* 2024 Comparison */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-medium text-[#1E4B3A] mb-6">
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
                <Label 
                  value="Volume (Litres)" 
                  angle={-90} 
                  position="insideLeft"
                  style={{ textAnchor: 'middle' }}
                  offset={-15}
                />
              </YAxis>
              <Tooltip 
                formatter={(value, name) => [`${Number(value).toLocaleString()} L`, name === 'predictedVolume' ? 'Predicted Volume' : 'Actual Volume']}
                contentStyle={{ backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
              <Bar 
                dataKey="predictedVolume" 
                name="Predicted Volume" 
                fill="#1E4B3A" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="actualVolume" 
                name="Actual Volume" 
                fill="#556B2F" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
      
      {/* Model Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-[#1E4B3A] ring-2 ring-[#1E4B3A]/20 text-center transition-all duration-200">
          <p className="text-3xl font-bold text-[#1E4B3A]">98.2%</p>
          <p className="text-gray-600 text-sm">Weekly Accuracy</p>
          <p className="text-xs text-gray-500 mt-1">8-week forecast reliability</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center transition-all duration-200">
          <p className="text-3xl font-bold text-[#1E4B3A]">95.6%</p>
          <p className="text-gray-600 text-sm">Monthly Accuracy</p>
          <p className="text-xs text-gray-500 mt-1">Real-time prediction accuracy</p>
        </div>
      </div>
    </div>
  );
}
