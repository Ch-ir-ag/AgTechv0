'use client';

import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

// Define type for prediction period
type PredictionPeriod = 'week' | 'month' | 'quarter' | 'year';

export default function PredictionSettings() {
  // Toggle between prediction mode and manual adjustment mode
  const [isManualMode, setIsManualMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionPeriod, setPredictionPeriod] = useState<PredictionPeriod>('month');
  const [isClient, setIsClient] = useState(false);
  
  // Use useEffect to set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Predicted values (simulated AI predictions)  
  const [predictedValues, setPredictedValues] = useState({
    milkVolume: 40000000, // Approximately weekly milk volume (2.1B / 52 weeks)
    fatContent: 4.2,
    proteinContent: 3.5,
    lactoseLevel: 4.8,
    ureaConcentration: 28,
    confidenceIntervals: {
      milkVolume: { low: 38400000, high: 41600000 }, // ±4% confidence interval
      fatContent: { low: 4.0, high: 4.4 },
      proteinContent: { low: 3.4, high: 3.6 },
      lactoseLevel: { low: 4.7, high: 4.9 },
      ureaConcentration: { low: 26, high: 30 }
    }
  });
  
  // Manual adjustment values (only used in manual mode)
  const [manualValues, setManualValues] = useState({
    milkVolume: 40000000, // Match the predicted value
    fatContent: 4.2,
    proteinContent: 3.5,
    lactoseLevel: 4.8,
    ureaConcentration: 28
  });
  
  // Calculated prediction results (simulated)
  const [predictionResults, setPredictionResults] = useState({
    expectedYield: 40000000, // Weekly yield (2.1B / 52)
    confidenceLow: 38400000, // -4%
    confidenceHigh: 41600000, // +4%
    qualityScore: 86,
    profitMargin: 16.3,
    optimizationScore: 81
  });
  
  // Function to update predictions based on selected time period - wrapped in useCallback
  const updatePredictionsForPeriod = useCallback((period: PredictionPeriod) => {
    if (!isClient) return; // Skip if not client-side
    
    setIsLoading(true);
    
    // Simulate different predictions based on time period
    setTimeout(() => {
      const multipliers = {
        'week': 1/52,  // Weekly portion of annual yield
        'month': 1/12, // Monthly portion of annual yield
        'quarter': 1/4, // Quarterly portion of annual yield
        'year': 1      // Full annual yield
      };
      
      const annualYield = 2000000000; // 2 billion liters annually
      const growthFactor = 1.05; // 5% growth from previous year
      const adjustedAnnualYield = annualYield * growthFactor;
      
      const multiplier = multipliers[period];
      const adjustedYield = Math.round(adjustedAnnualYield * multiplier);
      
      setPredictedValues(prev => ({
        ...prev,
        milkVolume: adjustedYield,
        confidenceIntervals: {
          ...prev.confidenceIntervals,
          milkVolume: { 
            low: Math.round(adjustedYield * 0.96), 
            high: Math.round(adjustedYield * 1.04) 
          }
        }
      }));
      
      setPredictionResults(prev => ({
        ...prev,
        expectedYield: adjustedYield,
        confidenceLow: Math.round(adjustedYield * 0.96),
        confidenceHigh: Math.round(adjustedYield * 1.04)
      }));
      
      setIsLoading(false);
    }, 800);
  }, [isClient, setPredictedValues, setPredictionResults, setIsLoading]);
  
  // Update predictions when period changes - only on client side
  useEffect(() => {
    if (isClient && !isManualMode) {
      updatePredictionsForPeriod(predictionPeriod);
    }
  }, [predictionPeriod, isManualMode, isClient, updatePredictionsForPeriod]);
  
  // Update prediction results based on active values (either predicted or manual)
  useEffect(() => {
    // Get the active values based on mode
    const activeValues = isManualMode ? manualValues : predictedValues;
    
    // This is a frontend-only simulation with no backend logic
    // Simple formula to simulate prediction changes based on inputs
    const baseYield = 2000000000; // Annual yield of 2 billion liters
    const maxYield = 2500000000; // Maximum annual yield of 2.5 billion liters
    
    const periodMultiplier = predictionPeriod === 'week' ? (1/52) : 
                            predictionPeriod === 'month' ? (1/12) : 
                            predictionPeriod === 'quarter' ? (1/4) : 1;
    
    // Calculate impact factors based on milk parameters
    const fatImpact = (activeValues.fatContent - 4.0) / 4.0 * 0.1 + 1; // ±10% impact
    const proteinImpact = (activeValues.proteinContent - 3.3) / 3.3 * 0.15 + 1; // ±15% impact
    const lactoseImpact = (activeValues.lactoseLevel - 4.7) / 4.7 * 0.05 + 1; // ±5% impact
    const ureaImpact = 1 - Math.abs(activeValues.ureaConcentration - 24) / 24 * 0.1; // ±10% impact
    
    // Calculate yield with quality factors applied
    let adjustedYield = baseYield * fatImpact * proteinImpact * lactoseImpact * ureaImpact;
    
    // Ensure the yield stays within reasonable bounds
    adjustedYield = Math.max(baseYield * 0.9, Math.min(maxYield, adjustedYield));
    
    // Apply period multiplier
    const calculatedYield = Math.round(adjustedYield * periodMultiplier);
    
    // Calculate confidence interval (±3%)
    const confidenceLow = Math.round(calculatedYield * 0.97);
    const confidenceHigh = Math.round(calculatedYield * 1.03);
    
    // Calculate other metrics
    const qualityScore = Math.round(
      85 + (fatImpact - 1) * 100 + (proteinImpact - 1) * 100 - Math.abs(ureaImpact - 1) * 50
    );
    
    const profitMargin = (
      16 + (fatImpact - 1) * 50 + (proteinImpact - 1) * 40 - Math.abs(ureaImpact - 1) * 25
    ).toFixed(1);
    
    const optimizationScore = Math.min(100, Math.max(60, Math.round(
      80 + (fatImpact - 1) * 75 + (proteinImpact - 1) * 100 - Math.abs(ureaImpact - 1) * 50
    )));
    
    setPredictionResults({
      expectedYield: calculatedYield,
      confidenceLow,
      confidenceHigh,
      qualityScore: Math.min(100, Math.max(60, qualityScore)),
      profitMargin: parseFloat(profitMargin),
      optimizationScore
    });
  }, [isManualMode, manualValues, predictedValues, predictionPeriod]);
  
  // Simulate fetching new predictions (in a real app, this would call an API)
  const refreshPredictions = () => {
    if (!isClient) return; // Skip if not client-side
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      updatePredictionsForPeriod(predictionPeriod);
      toast.success(`Latest data incorporated into ${getPeriodLabel(predictionPeriod)} predictions.`, {
        duration: 3000,
      });
      setIsLoading(false);
    }, 1200);
  };
  
  // Helper function to get period label
  const getPeriodLabel = (period: PredictionPeriod) => {
    switch(period) {
      case 'week': return 'Weekly';
      case 'month': return 'Monthly';
      case 'quarter': return 'Quarterly';
      case 'year': return 'Annual';
      default: return 'Monthly';
    }
  };
  
  // Format large numbers with appropriate suffix (K, M, B)
  const formatLargeNumber = (num: number): string => {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)}B`;
    } else if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };
  
  // Handle manual value changes
  const handleManualValueChange = (name: string, value: number) => {
    setManualValues(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // If not client-side yet, render a simplified version to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-800">
            AI Predicted Milk Parameters
          </h2>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-32 bg-gray-100 rounded-md"></div>
            <div className="flex items-center">
              <div className="h-8 w-24 bg-gray-100 rounded-l-md"></div>
              <div className="h-8 w-16 bg-gray-100 rounded-r-md"></div>
            </div>
          </div>
        </div>
        <div className="animate-pulse">
          <div className="h-8 w-full bg-gray-100 rounded-md mb-4"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 w-full bg-gray-100 rounded-md"></div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 h-64"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-gray-800">
          {isManualMode ? 'Customizable Prediction Settings' : 'AI Predicted Milk Parameters'}
        </h2>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Mode:</span>
            <button
              onClick={() => setIsManualMode(false)}
              className={`px-3 py-1 text-sm rounded-l-md ${!isManualMode 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              AI Prediction
            </button>
            <button
              onClick={() => setIsManualMode(true)}
              className={`px-3 py-1 text-sm rounded-r-md ${isManualMode 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Manual
            </button>
          </div>
        </div>
      </div>
      
      {/* Loading toast notification */}
      <div id="loading-toast" className="fixed top-4 right-4 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded shadow-md hidden transition-opacity duration-300 flex items-center">
        <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Updating predictions...
      </div>
      
      {!isManualMode && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-medium text-gray-700">Prediction Period</h4>
            <button
              onClick={refreshPredictions}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              disabled={isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh Predictions
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-2 mb-4">
            {['week', 'month', 'quarter', 'year'].map((period) => (
              <button
                key={period}
                onClick={() => setPredictionPeriod(period as PredictionPeriod)}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  predictionPeriod === period
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Parameter Display/Controls */}
        <div className="space-y-6">
          {/* Milk Volume */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">
                Milk Volume (L/day)
              </label>
              <div className="flex items-center">
                <span className="text-sm text-blue-600 font-medium">
                  {formatLargeNumber(isManualMode ? manualValues.milkVolume : predictedValues.milkVolume)}
                </span>
                {!isManualMode && (
                  <span className="text-xs text-gray-500 ml-1">
                    (±{Math.round((predictedValues.confidenceIntervals.milkVolume.high - predictedValues.milkVolume) / predictedValues.milkVolume * 100)}%)
                  </span>
                )}
              </div>
            </div>
            
            {isManualMode ? (
              <>
                <input
                  type="range"
                  min="20000000"
                  max="60000000"
                  step="1000000"
                  value={manualValues.milkVolume}
                  onChange={(e) => handleManualValueChange('milkVolume', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>20M</span>
                  <span>60M</span>
                </div>
              </>
            ) : (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ 
                      width: `${Math.min(100, ((predictedValues.milkVolume - 20000000) / (60000000 - 20000000)) * 100)}%` 
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>20M</span>
                  <span className="text-xs text-gray-500">
                    CI: {formatLargeNumber(predictedValues.confidenceIntervals.milkVolume.low)}-{formatLargeNumber(predictedValues.confidenceIntervals.milkVolume.high)}
                  </span>
                  <span>60M</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Fat Content */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">
                Fat Content (%)
              </label>
              <div className="flex items-center">
                <span className="text-sm text-blue-600 font-medium">
                  {isManualMode ? manualValues.fatContent.toFixed(1) : predictedValues.fatContent.toFixed(1)}
                </span>
                {!isManualMode && (
                  <span className="text-xs text-gray-500 ml-1">
                    (±{((predictedValues.confidenceIntervals.fatContent.high - predictedValues.fatContent) / predictedValues.fatContent * 100).toFixed(1)}%)
                  </span>
                )}
              </div>
            </div>
            
            {isManualMode ? (
              <>
                <input
                  type="range"
                  min="3.0"
                  max="5.0"
                  step="0.1"
                  value={manualValues.fatContent}
                  onChange={(e) => handleManualValueChange('fatContent', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>3.0%</span>
                  <span>5.0%</span>
                </div>
              </>
            ) : (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ 
                      width: `${Math.min(100, ((predictedValues.fatContent - 3.0) / (5.0 - 3.0)) * 100)}%` 
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>3.0%</span>
                  <span className="text-xs text-gray-500">
                    CI: {predictedValues.confidenceIntervals.fatContent.low.toFixed(1)}-{predictedValues.confidenceIntervals.fatContent.high.toFixed(1)}%
                  </span>
                  <span>5.0%</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Protein Content */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">
                Protein Content (%)
              </label>
              <div className="flex items-center">
                <span className="text-sm text-blue-600 font-medium">
                  {isManualMode ? manualValues.proteinContent.toFixed(1) : predictedValues.proteinContent.toFixed(1)}
                </span>
                {!isManualMode && (
                  <span className="text-xs text-gray-500 ml-1">
                    (±{((predictedValues.confidenceIntervals.proteinContent.high - predictedValues.proteinContent) / predictedValues.proteinContent * 100).toFixed(1)}%)
                  </span>
                )}
              </div>
            </div>
            
            {isManualMode ? (
              <>
                <input
                  type="range"
                  min="2.8"
                  max="4.0"
                  step="0.1"
                  value={manualValues.proteinContent}
                  onChange={(e) => handleManualValueChange('proteinContent', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2.8%</span>
                  <span>4.0%</span>
                </div>
              </>
            ) : (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ 
                      width: `${Math.min(100, ((predictedValues.proteinContent - 2.8) / (4.0 - 2.8)) * 100)}%` 
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2.8%</span>
                  <span className="text-xs text-gray-500">
                    CI: {predictedValues.confidenceIntervals.proteinContent.low.toFixed(1)}-{predictedValues.confidenceIntervals.proteinContent.high.toFixed(1)}%
                  </span>
                  <span>4.0%</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Lactose Level */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">
                Lactose Level (%)
              </label>
              <div className="flex items-center">
                <span className="text-sm text-blue-600 font-medium">
                  {isManualMode ? manualValues.lactoseLevel.toFixed(1) : predictedValues.lactoseLevel.toFixed(1)}
                </span>
                {!isManualMode && (
                  <span className="text-xs text-gray-500 ml-1">
                    (±{((predictedValues.confidenceIntervals.lactoseLevel.high - predictedValues.lactoseLevel) / predictedValues.lactoseLevel * 100).toFixed(1)}%)
                  </span>
                )}
              </div>
            </div>
            
            {isManualMode ? (
              <>
                <input
                  type="range"
                  min="4.0"
                  max="5.5"
                  step="0.1"
                  value={manualValues.lactoseLevel}
                  onChange={(e) => handleManualValueChange('lactoseLevel', parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>4.0%</span>
                  <span>5.5%</span>
                </div>
              </>
            ) : (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ 
                      width: `${Math.min(100, ((predictedValues.lactoseLevel - 4.0) / (5.5 - 4.0)) * 100)}%` 
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>4.0%</span>
                  <span className="text-xs text-gray-500">
                    CI: {predictedValues.confidenceIntervals.lactoseLevel.low.toFixed(1)}-{predictedValues.confidenceIntervals.lactoseLevel.high.toFixed(1)}%
                  </span>
                  <span>5.5%</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Urea Concentration */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">
                Urea Concentration (mg/dL)
              </label>
              <div className="flex items-center">
                <span className="text-sm text-blue-600 font-medium">
                  {isManualMode ? manualValues.ureaConcentration : predictedValues.ureaConcentration}
                </span>
                {!isManualMode && (
                  <span className="text-xs text-gray-500 ml-1">
                    (±{Math.round((predictedValues.confidenceIntervals.ureaConcentration.high - predictedValues.ureaConcentration) / predictedValues.ureaConcentration * 100)}%)
                  </span>
                )}
              </div>
            </div>
            
            {isManualMode ? (
              <>
                <input
                  type="range"
                  min="15"
                  max="35"
                  step="1"
                  value={manualValues.ureaConcentration}
                  onChange={(e) => handleManualValueChange('ureaConcentration', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>15</span>
                  <span>35</span>
                </div>
              </>
            ) : (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ 
                      width: `${Math.min(100, ((predictedValues.ureaConcentration - 15) / (35 - 15)) * 100)}%` 
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>15</span>
                  <span className="text-xs text-gray-500">
                    CI: {predictedValues.confidenceIntervals.ureaConcentration.low}-{predictedValues.confidenceIntervals.ureaConcentration.high}
                  </span>
                  <span>35</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Prediction Results */}
        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Prediction Results
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Expected Yield ({getPeriodLabel(predictionPeriod)})
              </h4>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">
                  {formatLargeNumber(predictionResults.expectedYield)} L
                </span>
                <span className="ml-2 text-xs text-gray-500">
                  (95% CI: {formatLargeNumber(predictionResults.confidenceLow)} - {formatLargeNumber(predictionResults.confidenceHigh)} L)
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Predicted milk yield for the next {predictionPeriod === 'week' ? 'week' : 
                  predictionPeriod === 'month' ? 'month' : 
                  predictionPeriod === 'quarter' ? '3 months' : 'year'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Quality Score</h4>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${Math.min(100, predictionResults.qualityScore)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{predictionResults.qualityScore}</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Profit Margin</h4>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-green-600">
                    {predictionResults.profitMargin}%
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Optimization Score</h4>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 overflow-hidden">
                  <div 
                    className={`h-2.5 rounded-full ${
                      predictionResults.optimizationScore > 85 
                        ? 'bg-green-500' 
                        : predictionResults.optimizationScore > 70 
                          ? 'bg-yellow-500' 
                          : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(100, predictionResults.optimizationScore)}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{predictionResults.optimizationScore}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {isManualMode ? (
                  predictionResults.optimizationScore > 85 
                    ? 'Excellent - Your settings are optimized for maximum yield and quality'
                    : predictionResults.optimizationScore > 70 
                      ? 'Good - Minor adjustments could improve results'
                      : 'Needs Improvement - Consider adjusting parameters for better results'
                ) : (
                  predictionResults.optimizationScore > 85 
                    ? 'Excellent - Current predicted values are optimal for maximum yield and quality'
                    : predictionResults.optimizationScore > 70 
                      ? 'Good - Predicted values show positive performance indicators'
                      : 'Attention Needed - Predicted values indicate potential issues to address'
                )}
              </p>
            </div>
            
            {!isManualMode && (
              <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-100">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-blue-700">
                    These {getPeriodLabel(predictionPeriod).toLowerCase()} predictions are based on historical data, current farm conditions, and seasonal patterns. Switch to manual mode to explore different scenarios.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 