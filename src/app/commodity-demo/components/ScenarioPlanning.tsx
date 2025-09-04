'use client';

import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface MarketData {
  region: string;
  week: number;
  basePrice: number;
  scenarioPrice: number;
  volumeFlow: number;
  riskLevel: 'Low' | 'Medium' | 'High';
}

interface MilkFlowRecommendation {
  region: string;
  currentAllocation: number;
  recommendedAllocation: number;
  rationale: string;
  expectedReturn: number;
}

const ScenarioPlanning = () => {
  const [reductionPercentage, setReductionPercentage] = useState(30);
  const [timeframe, setTimeframe] = useState('immediate');
  const [responseStrategy, setResponseStrategy] = useState('diversification');
  const [respectMinContracts, setRespectMinContracts] = useState(false);

  const applyPreset = (preset: 'BASE' | 'CN30' | 'CN20G' | 'EUSOFT') => {
    switch (preset) {
      case 'BASE':
        setReductionPercentage(0);
        setTimeframe('immediate');
        setResponseStrategy('diversification');
        break;
      case 'CN30':
        setReductionPercentage(30);
        setTimeframe('immediate');
        setResponseStrategy('diversification');
        break;
      case 'CN20G':
        setReductionPercentage(20);
        setTimeframe('gradual');
        setResponseStrategy('diversification');
        break;
      case 'EUSOFT':
        setReductionPercentage(15);
        setTimeframe('gradual');
        setResponseStrategy('premiumisation');
        break;
    }
  };

  // Generate scenario data
  const marketData: MarketData[] = useMemo(() => {
    const regions = ['Europe', 'USA', 'Southeast Asia', 'Middle East', 'Latin America'];
    const data: MarketData[] = [];
    
    for (let week = 1; week <= 12; week++) {
      regions.forEach(region => {
        const basePrice = 2450; // Base SMP price €/tonne
        let priceDelta = 0;
        let volumeFlow = 0;
        
        // Calculate impact based on China reduction and time
        const impactFactor = timeframe === 'immediate' ? 1 : timeframe === 'gradual' ? week / 12 : 0.5;
        const reductionImpact = (reductionPercentage / 100) * impactFactor;
        
        switch (region) {
          case 'Europe':
            priceDelta = -reductionImpact * 150; // €150/tonne potential drop
            volumeFlow = reductionImpact * 800; // Additional 800t/week potential
            break;
          case 'USA':
            priceDelta = -reductionImpact * 120;
            volumeFlow = reductionImpact * 600;
            break;
          case 'Southeast Asia':
            priceDelta = -reductionImpact * 200; // Higher impact due to proximity
            volumeFlow = reductionImpact * 1200;
            break;
          case 'Middle East':
            priceDelta = -reductionImpact * 80;
            volumeFlow = reductionImpact * 400;
            break;
          case 'Latin America':
            priceDelta = -reductionImpact * 60;
            volumeFlow = reductionImpact * 300;
            break;
        }
        
        const scenarioPrice = basePrice + priceDelta;
        const riskLevel: 'Low' | 'Medium' | 'High' = 
          Math.abs(priceDelta) > 100 ? 'High' : 
          Math.abs(priceDelta) > 50 ? 'Medium' : 'Low';
        
        data.push({
          region,
          week,
          basePrice,
          scenarioPrice,
          volumeFlow,
          riskLevel,
        });
      });
    }
    
    return data;
  }, [reductionPercentage, timeframe]);

  // Calculate milk flow recommendations
  const milkFlowRecommendations: MilkFlowRecommendation[] = useMemo(() => {
    const currentAllocations = {
      'China/Asia': 45,
      'Europe': 25,
      'USA': 15,
      'Middle East': 10,
      'Latin America': 5,
    };
    
    const chinaReductionVolume = (reductionPercentage / 100) * currentAllocations['China/Asia'];
    
    // Apply minimum contract constraint
    const minChinaAllocation = respectMinContracts ? currentAllocations['China/Asia'] * 0.6 : 0;
    const effectiveReduction = Math.max(chinaReductionVolume, currentAllocations['China/Asia'] - minChinaAllocation);
    const actualReductionVolume = Math.min(chinaReductionVolume, effectiveReduction);
    
    return [
      {
        region: 'China/Asia',
        currentAllocation: currentAllocations['China/Asia'],
        recommendedAllocation: Math.max(minChinaAllocation, currentAllocations['China/Asia'] - actualReductionVolume),
        rationale: `Reduce allocation due to ${reductionPercentage}% import reduction${respectMinContracts ? ' (respecting contract minimums)' : ''}`,
        expectedReturn: -actualReductionVolume * 2450 * 0.15 / 1000, // Lost margin in k€/week
      },
      {
        region: 'Southeast Asia',
        currentAllocation: currentAllocations['China/Asia'] - currentAllocations['China/Asia'],
        recommendedAllocation: actualReductionVolume * 0.4,
        rationale: 'Absorb 40% of redirected volume - similar market characteristics',
        expectedReturn: actualReductionVolume * 0.4 * 2250 * 0.12 / 1000, // New margin in k€/week
      },
      {
        region: 'Europe',
        currentAllocation: currentAllocations['Europe'],
        recommendedAllocation: currentAllocations['Europe'] + actualReductionVolume * 0.3,
        rationale: 'Increase European allocation - stable demand',
        expectedReturn: actualReductionVolume * 0.3 * 2300 * 0.18 / 1000,
      },
      {
        region: 'USA',
        currentAllocation: currentAllocations['USA'],
        recommendedAllocation: currentAllocations['USA'] + actualReductionVolume * 0.2,
        rationale: 'Moderate increase - premium market positioning',
        expectedReturn: actualReductionVolume * 0.2 * 2600 * 0.22 / 1000,
      },
      {
        region: 'Middle East',
        currentAllocation: currentAllocations['Middle East'],
        recommendedAllocation: currentAllocations['Middle East'] + actualReductionVolume * 0.1,
        rationale: 'Small increase - test market capacity',
        expectedReturn: actualReductionVolume * 0.1 * 2700 * 0.25 / 1000,
      },
    ];
  }, [reductionPercentage, respectMinContracts]);

  const totalExpectedReturn = milkFlowRecommendations.reduce((sum, rec) => sum + rec.expectedReturn, 0);

  // Prepare chart data
  const priceImpactData = useMemo(() => {
    const avgByRegion = marketData.reduce((acc, item) => {
      if (!acc[item.region]) {
        acc[item.region] = { region: item.region, basePrice: 0, scenarioPrice: 0, count: 0 };
      }
      acc[item.region].basePrice += item.basePrice;
      acc[item.region].scenarioPrice += item.scenarioPrice;
      acc[item.region].count++;
      return acc;
    }, {} as Record<string, { region: string; basePrice: number; scenarioPrice: number; count: number }>);
    
    return Object.values(avgByRegion).map((item) => ({
      region: item.region,
      basePrice: item.basePrice / item.count,
      scenarioPrice: item.scenarioPrice / item.count,
      delta: (item.scenarioPrice / item.count) - (item.basePrice / item.count),
    }));
  }, [marketData]);

  // Calculate redistribution tonnage
  const baseTonnagePerWeek = 2400; // Base weekly SMP volume
  const redistributedTonnage = (reductionPercentage / 100) * (45 / 100) * baseTonnagePerWeek;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#1E4B3A' }}>
          Scenario Planning
        </h2>
        {/* Active drivers chips */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              {timeframe === 'immediate' ? 'Immediate' : timeframe === 'gradual' ? 'Gradual' : 'Planned'}
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              {responseStrategy === 'diversification' ? 'Diversification' : 
               responseStrategy === 'premiumisation' ? 'Premiumisation' : 
               responseStrategy.charAt(0).toUpperCase() + responseStrategy.slice(1)}
            </span>
            {respectMinContracts && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                Respecting contract minimums
              </span>
            )}
          </div>
        </div>
        <p className="text-gray-600 mb-2">
          Analysis: If China suddenly reduces SMP imports by {reductionPercentage}%, what happens to global prices and where should milk flow?
        </p>
        <p className="text-xs text-gray-500 mb-6"></p>

        {/* Preset Scenarios */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Preset Scenarios</label>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'BASE' as const, label: 'Base Case' },
              { key: 'CN30' as const, label: 'China SMP −30% (Immediate)' },
              { key: 'CN20G' as const, label: 'China SMP −20% (Gradual)' },
              { key: 'EUSOFT' as const, label: 'EU Retail Softness' },
            ].map(preset => (
              <button
                key={preset.key}
                onClick={() => applyPreset(preset.key)}
                className="px-3 py-1 text-xs rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6">
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={respectMinContracts}
              onChange={(e) => setRespectMinContracts(e.target.checked)}
              className="mr-2 rounded"
            />
            <span className="text-gray-700">Respect minimum contracts</span>
            <span className="ml-2 text-xs text-gray-500">(60% floor for China/Asia)</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              China Import Reduction (%)
            </label>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={reductionPercentage}
              onChange={(e) => setReductionPercentage(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>10%</span>
              <span className="font-medium text-red-600">{reductionPercentage}%</span>
              <span>60%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Implementation Timeframe
            </label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="immediate">Immediate (1-2 weeks)</option>
              <option value="gradual">Gradual (3-4 months)</option>
              <option value="planned">Planned (6+ months)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Response Strategy
            </label>
            <select
              value={responseStrategy}
              onChange={(e) => setResponseStrategy(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="diversification">Market Diversification</option>
              <option value="premiumisation">Premium Positioning</option>
              <option value="volume_reduction">Volume Reduction</option>
              <option value="storage">Strategic Storage</option>
            </select>
          </div>
        </div>

        {/* Impact Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-red-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-red-800 mb-2">Global Price Impact</h3>
            <p className="text-2xl font-bold text-red-900">
              {(priceImpactData.reduce((sum, item) => sum + item.delta, 0) / priceImpactData.length).toFixed(0)}€/t
            </p>
            <p className="text-sm text-red-700 mt-1">Average decline</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Redistributed Share (from China SMP)</h3>
            <p className="text-2xl font-bold text-blue-900">
              {(reductionPercentage * 45 / 100).toFixed(0)}% pts
            </p>
            <p className="text-sm text-blue-700 mt-1">{redistributedTonnage.toFixed(0)} t/w to reallocate</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-green-800 mb-2">Net Margin Impact</h3>
            <p className="text-2xl font-bold text-green-900">
              {totalExpectedReturn >= 0 ? '+' : ''}€{totalExpectedReturn.toFixed(0)}k/week
            </p>
            <p className="text-sm text-green-700 mt-1">Expected change</p>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-yellow-800 mb-2">Time to Stabilise</h3>
            <p className="text-2xl font-bold text-yellow-900">
              {timeframe === 'immediate' ? '8-12' : timeframe === 'gradual' ? '4-6' : '2-3'} weeks
            </p>
            <p className="text-sm text-yellow-700 mt-1">Market equilibrium</p>
          </div>
        </div>

        {/* Price Impact by Region */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#1E4B3A' }}>
            Regional Price Impact Analysis
          </h3>
          <p className="text-xs text-gray-500 mb-4">Comparison of base vs scenario pricing across key markets.</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceImpactData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="region" 
                  tick={{ fill: '#6b7280' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tick={{ fill: '#6b7280' }}
                  tickFormatter={(value) => `€${value}`}
                />
                <Tooltip 
                  formatter={(value, name, props) => {
                    if (name === 'basePrice') return [`€${Number(value).toFixed(0)}/t`, 'Base Price'];
                    if (name === 'scenarioPrice') return [`€${Number(value).toFixed(0)}/t`, 'Scenario Price'];
                    return [`Δ ${Number(props.payload.delta).toFixed(0)}€/t`, 'Price Delta'];
                  }}
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="basePrice" fill="#94a3b8" name="Base Price" />
                <Bar dataKey="scenarioPrice" fill="#1E4B3A" name="Scenario Price" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Milk Flow Recommendations */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#1E4B3A' }}>
            Recommended Milk Flow Redistribution
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Region
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Allocation (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recommended Allocation (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expected Return (€k/week)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rationale
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {milkFlowRecommendations.map((rec) => (
                  <tr key={rec.region} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {rec.region}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {rec.currentAllocation.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`font-medium ${
                        rec.recommendedAllocation > rec.currentAllocation ? 'text-green-600' : 
                        rec.recommendedAllocation < rec.currentAllocation ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {rec.recommendedAllocation.toFixed(1)}%
                        {rec.recommendedAllocation !== rec.currentAllocation && (
                          <div className="text-xs text-gray-500 mt-1">
                            {rec.recommendedAllocation > rec.currentAllocation ? '+' : ''}{(rec.recommendedAllocation - rec.currentAllocation).toFixed(1)} pts, 
                            {rec.recommendedAllocation > rec.currentAllocation ? '+' : ''}{((rec.recommendedAllocation - rec.currentAllocation) / 100 * baseTonnagePerWeek).toFixed(0)} t/w
                          </div>
                        )}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      rec.expectedReturn >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {rec.expectedReturn >= 0 ? '+' : ''}€{rec.expectedReturn.toFixed(0)}k
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                      {rec.rationale}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Timeline Projection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#1E4B3A' }}>
            12-Week Price Recovery Timeline
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={marketData.filter(d => d.region === 'Europe').map(d => ({
                  week: d.week,
                  basePrice: d.basePrice,
                  scenarioPrice: d.scenarioPrice,
                  recovery: d.basePrice - (d.basePrice - d.scenarioPrice) * Math.exp(-d.week / 8), // Recovery curve
                }))}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
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
                  formatter={(value, name) => [
                    `€${Number(value).toLocaleString()}`, 
                    name === 'basePrice' ? 'Base Price' : 
                    name === 'scenarioPrice' ? 'Initial Impact' : 'Expected Recovery'
                  ]}
                  labelFormatter={(value) => `Week ${value}`}
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="basePrice" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Base Price"
                />
                <Line 
                  type="monotone" 
                  dataKey="scenarioPrice" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Initial Impact"
                />
                <Line 
                  type="monotone" 
                  dataKey="recovery" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Expected Recovery"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Strategic Action Plan */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-3" style={{ color: '#1E4B3A' }}>Strategic Action Plan</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-800 mb-2">Immediate Actions (Week 1-2)</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Activate existing contracts in Southeast Asia and Europe</li>
                <li>• Contact premium buyers in USA and Middle East markets</li>
                <li>• Secure temporary storage capacity for surplus inventory</li>
                <li>• Implement dynamic pricing strategy for quick market adjustment</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-800 mb-2">Medium-term Strategy (Week 3-12)</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Develop stronger relationships with Southeast Asian distributors</li>
                <li>• Invest in premium product lines for European markets</li>
                <li>• Monitor Chinese policy changes for re-entry opportunities</li>
                <li>• Diversify supply chain to reduce single-market dependency</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioPlanning;
