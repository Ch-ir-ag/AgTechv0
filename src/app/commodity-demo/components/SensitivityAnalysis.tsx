'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

interface SensitivityResult {
  category: string;
  baseValue: number;
  impactValue: number;
  percentChange: number;
  riskLevel: 'Low' | 'Medium' | 'High';
}

const SensitivityAnalysis = () => {
  const [priceChange, setPriceChange] = useState(-100); // €/tonne change
  const [timeHorizon, setTimeHorizon] = useState('quarterly');
  
  // Base scenario data
  const baseScenario = {
    butterPrice: 5200, // €/tonne
    weeklyVolume: 1500, // tonnes/week
    marginPerTonne: 400, // €/tonne
    farmgatePricePerKg: 0.42, // €/kg milk (FPCM proxy)
    farmgatePassThrough: 0.20, // 20% pass-through
    riskExposure: 2.1, // million €
  };

  const sensitivityResults: SensitivityResult[] = useMemo(() => {
    const priceChangePercent = (priceChange / baseScenario.butterPrice) * 100;
    const multiplier = timeHorizon === 'quarterly' ? 13 : timeHorizon === 'halfyear' ? 26 : 52;
    
    // Calculate impacts
    const marginImpact = ((baseScenario.marginPerTonne - Math.abs(priceChange)) / baseScenario.marginPerTonne - 1) * 100;
    const farmerPaymentImpact = priceChangePercent * baseScenario.farmgatePassThrough; // 20% pass-through
    const riskExposureImpact = Math.abs(priceChangePercent) * 0.5; // Risk increases with volatility
    
    const newMarginValue = baseScenario.marginPerTonne * (1 + marginImpact/100);
    const newFarmerPayment = baseScenario.farmgatePricePerKg * (1 + farmerPaymentImpact/100);
    const newRiskExposure = baseScenario.riskExposure * (1 + riskExposureImpact/100);
    
    return [
      {
        category: 'Profit Margins',
        baseValue: baseScenario.marginPerTonne * baseScenario.weeklyVolume * multiplier / 1000, // k€
        impactValue: newMarginValue * baseScenario.weeklyVolume * multiplier / 1000,
        percentChange: marginImpact,
        riskLevel: Math.abs(marginImpact) > 15 ? 'High' : Math.abs(marginImpact) > 8 ? 'Medium' : 'Low',
      },
      {
        category: 'Farmer Payments',
        baseValue: baseScenario.farmgatePricePerKg,
        impactValue: newFarmerPayment,
        percentChange: farmerPaymentImpact,
        riskLevel: Math.abs(farmerPaymentImpact) > 10 ? 'High' : Math.abs(farmerPaymentImpact) > 5 ? 'Medium' : 'Low',
      },
      {
        category: 'Risk Exposure',
        baseValue: baseScenario.riskExposure,
        impactValue: newRiskExposure,
        percentChange: riskExposureImpact,
        riskLevel: riskExposureImpact > 25 ? 'High' : riskExposureImpact > 15 ? 'Medium' : 'Low',
      }
    ];
  }, [priceChange, timeHorizon, baseScenario.butterPrice, baseScenario.farmgatePassThrough, baseScenario.farmgatePricePerKg, baseScenario.marginPerTonne, baseScenario.riskExposure, baseScenario.weeklyVolume]);

  // Generate scenario analysis data
  const scenarioData = useMemo(() => {
    const scenarios = [];
    for (let change = -200; change <= 200; change += 50) {
      const priceChangePercent = (change / baseScenario.butterPrice) * 100;
      const marginImpact = ((baseScenario.marginPerTonne - Math.abs(change)) / baseScenario.marginPerTonne - 1) * 100;
      const farmerImpact = priceChangePercent * baseScenario.farmgatePassThrough;
      
      scenarios.push({
        priceChange: change,
        marginImpact: marginImpact,
        farmerImpact: farmerImpact,
        netImpact: (marginImpact + farmerImpact) / 2,
      });
    }
    return scenarios;
  }, [baseScenario.butterPrice, baseScenario.farmgatePassThrough, baseScenario.marginPerTonne]);

  const formatCurrency = (value: number, type: string) => {
    if (type === 'Farmer Payments') return `€${value.toFixed(3)}/kg`;
    if (type === 'Risk Exposure') return `€${value.toFixed(1)}M`;
    return `€${Math.round(value)}k`;
  };

  const formatChange = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#1E4B3A' }}>
          Sensitivity Analysis
        </h2>
        <p className="text-gray-600 mb-2">
          Analysis: If butter price shifts by €{priceChange}/tonne, what&apos;s the impact on margins, farmer payments, and risk exposure?
        </p>
        <p className="text-xs text-gray-500 mb-6"></p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Butter Price Change (€/tonne)
            </label>
            <input
              type="range"
              min="-300"
              max="300"
              step="25"
              value={priceChange}
              onChange={(e) => setPriceChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>-€300</span>
              <span className={`font-medium ${priceChange < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {priceChange >= 0 ? '+' : ''}€{priceChange}
              </span>
              <span>+€300</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Horizon
            </label>
            <select
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="quarterly">Quarterly (13 weeks)</option>
              <option value="halfyear">Half Year (26 weeks)</option>
              <option value="annual">Annual (52 weeks)</option>
            </select>
          </div>
        </div>

        {/* Impact Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {sensitivityResults.map((result, index) => (
            <motion.div
              key={result.category}
              className={`rounded-lg p-4 ${
                result.riskLevel === 'High' ? 'bg-red-50 border-red-200' :
                result.riskLevel === 'Medium' ? 'bg-orange-50 border-orange-200' :
                'bg-green-50 border-green-200'
              } border`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className={`text-sm font-medium mb-2 ${
                result.riskLevel === 'High' ? 'text-red-800' :
                result.riskLevel === 'Medium' ? 'text-orange-800' :
                ''
              }`}
                style={result.riskLevel === 'Low' ? { color: '#1E4B3A' } : {}}
              >
                {result.category}
              </h3>
              <div className="space-y-1">
                <p className="text-xs text-gray-600">
                  Base: {formatCurrency(result.baseValue, result.category)}
                </p>
                <p className={`text-lg font-bold ${
                  result.riskLevel === 'High' ? 'text-red-900' :
                  result.riskLevel === 'Medium' ? 'text-orange-900' :
                  ''
                }`}
                  style={result.riskLevel === 'Low' ? { color: '#1E4B3A' } : {}}
                >
                  {formatCurrency(result.impactValue, result.category)}
                </p>
                <p className={`text-sm ${
                  result.percentChange >= 0 ? '' : 'text-red-600'
                }`}
                  style={result.percentChange >= 0 ? { color: '#1E4B3A' } : {}}
                >
                  {formatChange(result.percentChange)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Impact Breakdown Chart */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#1E4B3A' }}>
            Impact Breakdown by Category
          </h3>
          <p className="text-xs text-gray-500 mb-4">Percentage impact relative to baseline values across key metrics.</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sensitivityResults} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="category" 
                  tick={{ fill: '#6b7280' }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tick={{ fill: '#6b7280' }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value) => [`${Number(value).toFixed(1)}%`, 'Impact']}
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar 
                  dataKey="percentChange" 
                  fill="#1E4B3A"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scenario Analysis */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#1E4B3A' }}>
            Scenario Analysis: Price Change Impact
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scenarioData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="priceChange" 
                  tick={{ fill: '#6b7280' }}
                  tickFormatter={(value) => `€${value}`}
                />
                <YAxis 
                  tick={{ fill: '#6b7280' }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value, _name) => [
                    `${Number(value).toFixed(1)}%`, 
                    _name === 'marginImpact' ? 'Margin Impact' : 
                    _name === 'farmerImpact' ? 'Farmer Payment Impact' : 'Net Impact'
                  ]}
                  labelFormatter={(value) => `Price Change: €${value}/tonne`}
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="marginImpact" 
                  stroke="#1E4B3A" 
                  strokeWidth={2}
                  name="Margin Impact"
                />
                <Line 
                  type="monotone" 
                  dataKey="farmerImpact" 
                  stroke="#94a3b8" 
                  strokeWidth={2}
                  name="Farmer Payment Impact"
                />
                <Line 
                  type="monotone" 
                  dataKey="netImpact" 
                  stroke="#6b7280" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Net Impact"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Impact Table */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#1E4B3A' }}>
            Detailed Impact Analysis
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Base Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    New Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Level
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sensitivityResults.map((result) => (
                  <tr key={result.category} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {result.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(result.baseValue, result.category)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(result.impactValue, result.category)}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      result.percentChange >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatChange(result.percentChange)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        result.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                        result.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {result.riskLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Strategic Recommendations */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2" style={{ color: '#1E4B3A' }}>Strategic Recommendations</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            {Math.abs(priceChange) > 150 && (
              <li>• ⚠️ Large price movement detected - implement hedging strategies</li>
            )}
            <li>• Monitor farmer payment sustainability - current pass-through rate is 70%</li>
            <li>• Consider forward contracts to mitigate price volatility risk</li>
            <li>• Assess supply chain elasticity for volume adjustments</li>
            {sensitivityResults.some(r => r.riskLevel === 'High') && (
              <li>• 🔴 High-risk impacts identified - review risk management policies</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SensitivityAnalysis;
