'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

interface TippingPointData {
  tonnes: number;
  price: number;
  week: number;
  isTippingPoint: boolean;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
}

const TippingPointDetection = () => {
  const [additionalVolume, setAdditionalVolume] = useState(300);
  const [targetMarket, setTargetMarket] = useState('Germany');

  // Realistic volumes for FrieslandCampina DYC scenario
  const baseData = useMemo(() => {
    const currentMarketVolume = 1200; // t/week baseline (Germany, DYC demo)
    const marketCapacity = 1800; // t/week (illustrative market depth)
    const currentPrice = 4000; // €/tonne
    
    // Generate scenario data
    const scenarios: TippingPointData[] = [];
    
    for (let week = 1; week <= 12; week++) {
      const appliedExtra = additionalVolume * Math.min(1, week / 4); // Phased ramp
      const currentVolume = currentMarketVolume + appliedExtra;
      const utilisation = currentVolume / marketCapacity;
      
      // Exponential price pressure once utilisation > 0.85
      let pressure = 0;
      if (utilisation > 0.85) {
        pressure = Math.pow((utilisation - 0.85) / 0.15, 2) * 0.35;
      }
      
      const adjustedPrice = currentPrice * (1 - pressure);
      
      // Determine risk level and tipping point
      let riskLevel: 'Low' | 'Medium' | 'High' | 'Critical' = 'Low';
      let isTippingPoint = false;
      
      if (utilisation > 0.85) {
        riskLevel = 'Critical';
        isTippingPoint = true;
      } else if (utilisation > 0.75) {
        riskLevel = 'High';
      } else if (utilisation > 0.65) {
        riskLevel = 'Medium';
      }
      
      scenarios.push({
        tonnes: currentVolume,
        price: adjustedPrice,
        week,
        isTippingPoint,
        riskLevel,
      });
    }
    
    return scenarios;
  }, [additionalVolume]);

  const currentMarketVolume = 1200;
  const marketCapacity = 1800;
  const tippingThreshold = 0.85 * marketCapacity;
  const plannedWeeklyVolume = currentMarketVolume + additionalVolume;
  const bufferToTipping = Math.max(0, tippingThreshold - plannedWeeklyVolume);
  const bufferPercentage = (bufferToTipping / plannedWeeklyVolume) * 100;
  
  // Find max projected price change across horizon
  const maxPriceChange = useMemo(() => {
    const changes = baseData.map(d => Math.abs((d.price - 4000) / 4000 * 100));
    const maxChange = Math.max(...changes);
    const maxChangeWeek = baseData.find(d => Math.abs((d.price - 4000) / 4000 * 100) === maxChange)?.week;
    return { percent: maxChange, week: maxChangeWeek };
  }, [baseData]);

  const applyPreset = (preset: 'GENTLE' | 'PUSH' | 'AGGR') => {
    switch (preset) {
      case 'GENTLE': setAdditionalVolume(300); break;
      case 'PUSH': setAdditionalVolume(600); break;
      case 'AGGR': setAdditionalVolume(1000); break;
    }
  };

  // Determine risk level for current plan
  const currentRiskLevel = useMemo(() => {
    const utilisation = plannedWeeklyVolume / marketCapacity;
    if (utilisation > 0.85) return 'Critical';
    if (utilisation > 0.75) return 'High';
    if (utilisation > 0.65) return 'Medium';
    return 'Low';
  }, [plannedWeeklyVolume, marketCapacity]);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#1E4B3A' }}>
          Tipping Point Detection
        </h2>
        <p className="text-gray-600 mb-2">
          Analysis: If FrieslandCampina pushes another {additionalVolume.toLocaleString()} tonnes of yellow cheese into {targetMarket}, when will the price crash?
        </p>
        <p className="text-xs text-gray-500 mb-6"></p>

        {/* Streamlined Info */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span>Current: {currentMarketVolume.toLocaleString()} t/w</span>
            <span>•</span>
            <span>Planned: {plannedWeeklyVolume.toLocaleString()} t/w</span>
            <span>•</span>
            <span>Buffer: {Math.round(bufferToTipping)} t ({bufferPercentage.toFixed(0)}%)</span>
            <span>•</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              currentRiskLevel === 'Critical' ? 'bg-red-100 text-red-700' :
              currentRiskLevel === 'High' ? 'bg-orange-100 text-orange-700' :
              currentRiskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
              'text-white'
            }`}
              style={currentRiskLevel === 'Low' ? { backgroundColor: '#1E4B3A' } : {}}
            >
              Risk: {currentRiskLevel}
            </span>
          </div>
        </div>

        {/* Quick Scenarios */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Quick Scenarios</label>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'GENTLE' as const, label: 'Gentle (+300 t/w)', volume: 300 },
              { key: 'PUSH' as const, label: 'Butter Push (+600 t/w)', volume: 600 },
              { key: 'AGGR' as const, label: 'Aggressive (+1000 t/w)', volume: 1000 },
            ].map(preset => (
              <button
                key={preset.key}
                onClick={() => applyPreset(preset.key)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  additionalVolume === preset.volume
                    ? 'text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                style={additionalVolume === preset.volume ? { backgroundColor: '#1E4B3A' } : {}}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <details className="mb-8">
          <summary className="text-sm font-medium text-gray-700 cursor-pointer mb-4">Advanced Controls</summary>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Volume (tonnes/week)
            </label>
            <input
              type="range"
              min="-500"
              max="1500"
              step="100"
              value={additionalVolume}
              onChange={(e) => setAdditionalVolume(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>-500</span>
              <span className="font-medium">{additionalVolume >= 0 ? '+' : ''}{additionalVolume}</span>
              <span>+1500</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Market
            </label>
            <select
              value={targetMarket}
              onChange={(e) => setTargetMarket(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Germany">Germany</option>
              <option value="Netherlands">Netherlands</option>
              <option value="France">France</option>
              <option value="Belgium">Belgium</option>
            </select>
          </div>
          </div>
        </details>

        {/* Price Impact (only if significant) */}
        {maxPriceChange.percent > 0.2 && (
          <div className="mb-6 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800">
              <span className="font-medium">Max projected drop over 12w:</span> −{maxPriceChange.percent.toFixed(1)}% 
              {maxPriceChange.week && (
                <span className="text-xs text-orange-600 ml-1">(Week {maxPriceChange.week})</span>
              )}
            </p>
          </div>
        )}

        {/* Price Evolution Chart */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#1E4B3A' }}>
            Price Evolution Under Volume Pressure
            <span className="ml-2 text-xs text-gray-500 cursor-help" title="Tipping zone = ≥85% utilisation of market capacity">ⓘ</span>
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={baseData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E4B3A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1E4B3A" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="week" 
                  tick={{ fill: '#6b7280' }}
                  tickFormatter={(value) => `Week ${value}`}
                />
                <YAxis 
                  tick={{ fill: '#6b7280' }}
                  tickFormatter={(value) => `€${value.toLocaleString()}`}
                />
                <Tooltip 
                  formatter={(value, name) => [`€${Number(value).toLocaleString()}`, 'Price per tonne']}
                  labelFormatter={(value) => `Week ${value}`}
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#1E4B3A" 
                  fill="url(#priceGradient)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Saturation Timeline - Key Transitions Only */}
        <div>
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#1E4B3A' }}>
            Key Market Transitions
          </h3>
          <div className="space-y-3">
            {(() => {
              const keyWeeks = [];
              let prevRisk = 'Low';
              
              // Find weeks where risk level changes or we cross 85% utilisation
              baseData.slice(0, 8).forEach((week, index) => {
                const utilisation = week.tonnes / marketCapacity;
                const isFirstWeek = index === 0;
                const riskChanged = week.riskLevel !== prevRisk;
                const crossesTipping = utilisation >= 0.85 && (index === 0 || baseData[index - 1].tonnes / marketCapacity < 0.85);
                
                if (isFirstWeek || riskChanged || crossesTipping) {
                  keyWeeks.push(week);
                }
                prevRisk = week.riskLevel;
              });
              
              // If no key transitions, show at least the first and current plan week
              if (keyWeeks.length === 1) {
                keyWeeks.push(baseData[3]); // Week 4 (full ramp)
              }
              
              return keyWeeks.map((week) => (
                <motion.div
                  key={week.week}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    week.riskLevel === 'Critical' ? 'bg-red-50 border-red-200' :
                    week.riskLevel === 'High' ? 'bg-orange-50 border-orange-200' :
                    week.riskLevel === 'Medium' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-green-50 border-green-200'
                  } border`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: week.week * 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      week.riskLevel === 'Critical' ? 'bg-red-400' :
                      week.riskLevel === 'High' ? 'bg-orange-400' :
                      week.riskLevel === 'Medium' ? 'bg-yellow-400' :
                      ''
                    }`} 
                      style={week.riskLevel === 'Low' ? { backgroundColor: '#1E4B3A' } : {}}
                    />
                    <span className="font-medium">Week {week.week}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">€{Math.round(week.price).toLocaleString()}/t</div>
                    <div className="text-sm text-gray-600">
                      {(week.tonnes / 1000).toFixed(1)}k tonnes
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    week.riskLevel === 'Critical' ? 'bg-red-100 text-red-700' :
                    week.riskLevel === 'High' ? 'bg-orange-100 text-orange-700' :
                    week.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'text-white'
                  }`}
                    style={week.riskLevel === 'Low' ? { backgroundColor: '#1E4B3A' } : {}}
                  >
                    {week.riskLevel}
                  </div>
                </motion.div>
              ));
            })()}
          </div>
          
          {/* Show full timeline toggle */}
          <details className="mt-4">
            <summary className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
              Show full timeline (weeks 1-8)
            </summary>
            <div className="mt-3 space-y-2">
              {baseData.slice(0, 8).map((week) => (
                <div key={week.week} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                  <span>Week {week.week}</span>
                  <span>€{Math.round(week.price).toLocaleString()}/t</span>
                  <span className="text-xs text-gray-600">{(week.tonnes / 1000).toFixed(1)}k t</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    week.riskLevel === 'Critical' ? 'bg-red-100 text-red-700' :
                    week.riskLevel === 'High' ? 'bg-orange-100 text-orange-700' :
                    week.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'text-white'
                  }`}
                    style={week.riskLevel === 'Low' ? { backgroundColor: '#1E4B3A' } : {}}
                  >
                    {week.riskLevel}
                  </span>
                </div>
              ))}
            </div>
          </details>
        </div>

        {/* Strategic Recommendations - Data-Driven */}
        {(bufferPercentage < 10 || currentRiskLevel === 'High' || currentRiskLevel === 'Critical' || additionalVolume > 800) && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2" style={{ color: '#1E4B3A' }}>Strategic Recommendations</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              {bufferPercentage < 5 && (
                <li>• 🔴 Buffer critical (&lt;5%) - redirect +{Math.min(300, Math.round(bufferToTipping * 0.5))} t/w to FR/NL markets</li>
              )}
              {currentRiskLevel === 'High' && bufferPercentage >= 5 && (
                <li>• ⚠️ High risk detected - consider phased rollout over {Math.ceil(additionalVolume / 200)} weeks</li>
              )}
              {additionalVolume > 800 && (
                <li>• 📊 Large volume increase planned - secure distribution agreements in secondary markets</li>
              )}
              {currentRiskLevel === 'Critical' && (
                <li>• 🚨 Market saturation imminent - halt additional volume or diversify immediately</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default TippingPointDetection;
