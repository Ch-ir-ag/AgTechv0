'use client';

import React, { useState } from 'react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LabelList 
} from 'recharts';
import { useParams } from 'next/navigation';

// Define the data types
// Note: Type definitions used in the mock data objects but flagged by ESLint are commented out
// to satisfy the linter while keeping for documentation purposes.

/*
interface AllocationItem {
  id: number;
  product: string;
  factory: string;
  allocatedLitres: number;
  percentOfTotal: number;
  marginPerLitre: number;
  status: AllocationStatus;
  statusColor: string;
}
*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type AllocationStatus = 'Contract Met' | 'Contract Pending' | 'Exceeded Target' | 'Below Target';

// Types for chart data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type PieChartDataItem = {
  name: string;
  value: number;
};

type BarChartDataItem = {
  name: string;
  litres: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type MarginChartDataItem = {
  name: string;
  margin: number;
};

// Note: The following interfaces are defined and used in the mock data objects,
// but are flagged as unused by ESLint. We're keeping them commented for documentation
// but removing them to satisfy the linter.
/*
interface FactoryUtilization {
  factory: string;
  utilizationPercent: number;
  color: string;
}

interface ContractFulfillment {
  customer: string;
  fulfillmentPercent: number;
  color: string;
}

interface DemandProduct {
  product: string;
  changePercent: number;
  trend: 'up' | 'down';
}

interface MarginLeader {
  product: string;
  marginPerLitre: number;
  isHighest: boolean;
}

interface AIRecommendation {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface ScenarioToggle {
  id: string;
  label: string;
  active: boolean;
}
*/

// Mock data for Kerry Dairy
const kerryDairyData = {
  forecast: {
    volume: 85000000,
    region: 'Ireland',
    timeframe: 'April 2025'
  },
  allocations: [
    { id: 1, product: 'Whole Milk Powder', factory: 'Charleville', allocatedLitres: 25500000, percentOfTotal: 30, marginPerLitre: 0.22, status: 'Contract Met', statusColor: 'bg-green-100 text-green-800' },
    { id: 2, product: 'Butter', factory: 'Listowel', allocatedLitres: 24650000, percentOfTotal: 29, marginPerLitre: 0.18, status: 'Exceeded Target', statusColor: 'bg-blue-100 text-blue-800' },
    { id: 3, product: 'Skim Milk Powder', factory: 'Charleville', allocatedLitres: 12750000, percentOfTotal: 15, marginPerLitre: 0.16, status: 'Contract Met', statusColor: 'bg-green-100 text-green-800' },
    { id: 4, product: 'Cheese', factory: 'Newmarket', allocatedLitres: 22100000, percentOfTotal: 26, marginPerLitre: 0.19, status: 'Contract Pending', statusColor: 'bg-yellow-100 text-yellow-800' },
  ],
  factoryUtilization: [
    { factory: 'Charleville', utilizationPercent: 95, color: '#60a5fa' },
    { factory: 'Listowel', utilizationPercent: 93, color: '#34d399' },
    { factory: 'Newmarket', utilizationPercent: 88, color: '#a78bfa' },
  ],
  contractFulfillment: [
    { customer: 'Friesland', fulfillmentPercent: 94, color: '#60a5fa' },
    { customer: 'Danone', fulfillmentPercent: 102, color: '#34d399' },
    { customer: 'Arla', fulfillmentPercent: 87, color: '#f59e0b' },
  ],
  demandProducts: [
    { product: 'Butter', changePercent: 18, trend: 'up' },
    { product: 'Cheese', changePercent: 15, trend: 'up' },
    { product: 'SMP', changePercent: 5, trend: 'down' },
  ],
  marginLeaders: [
    { product: 'WMP', marginPerLitre: 0.22, isHighest: true },
    { product: 'Cheese', marginPerLitre: 0.19, isHighest: false },
    { product: 'Butter', marginPerLitre: 0.18, isHighest: false },
  ],
  aiRecommendations: [
    { 
      id: 1, 
      title: 'Increase Cheese Production',
      description: 'Divert additional 5% of milk to Cheese due to rising EU market demand (+15% week-on-week)',
      icon: 'trending-up'
    },
    { 
      id: 2, 
      title: 'Optimize Charleville Output',
      description: 'Plant operating at 95% capacity - monitor closely for potential bottlenecks',
      icon: 'alert-triangle'
    },
    { 
      id: 3, 
      title: 'Maintain WMP Focus',
      description: 'Current margins favor continuing high WMP production rate at Charleville',
      icon: 'pie-chart'
    },
  ],
  scenarioToggles: [
    { id: 'demand-spike-butter', label: 'Demand Spike (Butter)', active: false },
    { id: 'plant-offline', label: 'Charleville Plant Offline', active: false },
    { id: 'margin-increase-cheese', label: 'Margin Increase (Cheese)', active: false },
  ]
};

// Mock data for Lakeland Dairies
const lakelandDairiesData = {
  forecast: {
    volume: 90000000,
    region: 'Ireland',
    timeframe: 'April 2025'
  },
  allocations: [
    { id: 1, product: 'Whole Milk Powder', factory: 'Bailieborough', allocatedLitres: 27000000, percentOfTotal: 30, marginPerLitre: 0.21, status: 'Contract Met', statusColor: 'bg-green-100 text-green-800' },
    { id: 2, product: 'Butter', factory: 'Killeshandra', allocatedLitres: 18000000, percentOfTotal: 20, marginPerLitre: 0.19, status: 'Exceeded Target', statusColor: 'bg-blue-100 text-blue-800' },
    { id: 3, product: 'Skim Milk Powder', factory: 'Bailieborough', allocatedLitres: 9000000, percentOfTotal: 10, marginPerLitre: 0.17, status: 'Contract Met', statusColor: 'bg-green-100 text-green-800' },
    { id: 4, product: 'Cheese', factory: 'Killeshandra', allocatedLitres: 12600000, percentOfTotal: 14, marginPerLitre: 0.20, status: 'Contract Pending', statusColor: 'bg-yellow-100 text-yellow-800' },
    { id: 5, product: 'UHT Milk', factory: 'Ballyraghane', allocatedLitres: 9900000, percentOfTotal: 11, marginPerLitre: 0.15, status: 'Below Target', statusColor: 'bg-red-100 text-red-800' },
    { id: 6, product: 'Butter', factory: 'Artigarvan', allocatedLitres: 7200000, percentOfTotal: 8, marginPerLitre: 0.18, status: 'Contract Met', statusColor: 'bg-green-100 text-green-800' },
    { id: 7, product: 'Yogurt', factory: 'Newtownards', allocatedLitres: 6300000, percentOfTotal: 7, marginPerLitre: 0.16, status: 'Contract Pending', statusColor: 'bg-yellow-100 text-yellow-800' },
  ],
  factoryUtilization: [
    { factory: 'Bailieborough', utilizationPercent: 92, color: '#60a5fa' },
    { factory: 'Killeshandra', utilizationPercent: 88, color: '#34d399' },
    { factory: 'Ballyraghane', utilizationPercent: 76, color: '#a78bfa' },
    { factory: 'Artigarvan', utilizationPercent: 81, color: '#f97316' },
    { factory: 'Newtownards', utilizationPercent: 71, color: '#ec4899' },
  ],
  contractFulfillment: [
    { customer: 'Nestle', fulfillmentPercent: 97, color: '#60a5fa' },
    { customer: 'Danone', fulfillmentPercent: 104, color: '#34d399' },
    { customer: 'Arla', fulfillmentPercent: 91, color: '#f59e0b' },
  ],
  demandProducts: [
    { product: 'Cheese', changePercent: 15, trend: 'up' },
    { product: 'UHT Milk', changePercent: 10, trend: 'up' },
    { product: 'WMP', changePercent: 3, trend: 'down' },
  ],
  marginLeaders: [
    { product: 'WMP', marginPerLitre: 0.21, isHighest: true },
    { product: 'Cheese', marginPerLitre: 0.20, isHighest: false },
    { product: 'Butter', marginPerLitre: 0.19, isHighest: false },
  ],
  aiRecommendations: [
    { 
      id: 1, 
      title: 'Increase Cheese Production',
      description: 'Allocate additional 7% to Cheese production at Killeshandra due to rising EU demand',
      icon: 'trending-up'
    },
    { 
      id: 2, 
      title: 'Optimize Bailieborough Output',
      description: 'Plant operating near capacity (92%), monitor closely to avoid bottlenecks',
      icon: 'alert-triangle'
    },
    { 
      id: 3, 
      title: 'Leverage Northern Ireland Facilities',
      description: 'Artigarvan and Newtownards operating at 81% and 71% - opportunity to increase production',
      icon: 'pie-chart'
    },
  ],
  scenarioToggles: [
    { id: 'demand-spike-cheese', label: 'Demand Spike (Cheese)', active: false },
    { id: 'plant-offline', label: 'Bailieborough Plant Offline', active: false },
    { id: 'margin-increase-wmp', label: 'Margin Increase (WMP)', active: false },
  ]
};

// Main component
export default function ProductAllocationRecommendations() {
  const { company } = useParams();
  const companySlug = typeof company === 'string' ? company : 'kerry-dairy';
  
  // Select company data based on company slug
  const companyData = companySlug === 'lakeland-dairies' ? lakelandDairiesData : kerryDairyData;
  
  // State for timeframe and volume
  const [forecastVolume, setForecastVolume] = useState(companyData.forecast.volume);
  const [timeframe, setTimeframe] = useState(companyData.forecast.timeframe);
  
  // Convert allocations to chart-friendly format
  const pieChartData = companyData.allocations.map(item => ({
    name: item.product,
    value: item.allocatedLitres,
  }));
  
  const barChartData = companyData.allocations.reduce((acc: BarChartDataItem[], item) => {
    const existingFactory = acc.find(f => f.name === item.factory);
    if (existingFactory) {
      existingFactory.litres += item.allocatedLitres;
    } else {
      acc.push({ name: item.factory, litres: item.allocatedLitres });
    }
    return acc;
  }, []);
  
  const marginChartData = companyData.allocations.map(item => ({
    name: item.product,
    margin: item.marginPerLitre,
  }));
  
  // Format numbers for display
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };
  
  // COLORS for charts
  const COLORS = ['#60a5fa', '#34d399', '#f59e0b', '#a78bfa', '#f97316', '#f43f5e'];
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* 1. Header Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="text-xl font-medium text-gray-800">Product Allocation Recommendations</h2>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div>
              <label htmlFor="timeframe" className="text-sm text-gray-600 block mb-1">Timeframe</label>
              <select 
                id="timeframe"
                className="border border-gray-200 rounded text-sm p-2"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                suppressHydrationWarning
              >
                <option value="April 2025">April 2025</option>
                <option value="May 2025">May 2025</option>
                <option value="Q2 2025">Q2 2025</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="forecastVolume" className="text-sm text-gray-600 block mb-1">Forecast Volume</label>
              <div className="relative">
                <select
                  id="forecastVolume"
                  className="border border-gray-200 rounded text-sm p-2 pr-8 bg-white"
                  value={forecastVolume}
                  onChange={(e) => setForecastVolume(Number(e.target.value))}
                  suppressHydrationWarning
                >
                  <option value={75000000}>75M Litres</option>
                  <option value={85000000}>85M Litres</option>
                  <option value={90000000}>90M Litres</option>
                  <option value={95000000}>95M Litres</option>
                  <option value={100000000}>100M Litres</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-gray-800">
            <span className="font-medium">Daisy Recommends:</span> Based on a forecast of {formatNumber(forecastVolume)} litres for {timeframe}, 
            distribute milk supply across {barChartData.length} plants and {pieChartData.length} product types to optimize for 
            contract fulfillment and margin optimization.
          </p>
        </div>
      </div>
      
      {/* 2. Allocation Table */}
      <div className="p-6 border-b border-gray-100 overflow-x-auto">
        <h3 className="text-base font-medium text-gray-800 mb-4">Allocation Plan</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Factory</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allocated Litres</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% of Total</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin (€/L)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companyData.allocations.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.product}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.factory}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatNumber(item.allocatedLitres)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.percentOfTotal}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€{item.marginPerLitre.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${item.statusColor}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* 3. Visual Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 border-b border-gray-100">
        {/* Pie Chart - Allocation by Product */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-base font-medium text-gray-800 mb-2">Allocation by Product</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }: { name: string, percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatNumber(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Bar Chart - Allocation by Factory */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-base font-medium text-gray-800 mb-2">Allocation by Factory</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value: number) => formatNumber(value)} />
                <Tooltip formatter={(value: number) => formatNumber(value)} />
                <Bar dataKey="litres" fill="#60a5fa">
                  <LabelList dataKey="litres" position="top" formatter={(value: number) => formatNumber(value)} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Bar Chart - Margin per Product */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-base font-medium text-gray-800 mb-2">Margin per Product (€/L)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marginChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, Math.max(...marginChartData.map(d => d.margin)) * 1.2]} />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip formatter={(value: number) => `€${value.toFixed(2)}`} />
                <Bar dataKey="margin" fill="#34d399" barSize={20} radius={[0, 4, 4, 0]}>
                  <LabelList dataKey="margin" position="right" formatter={(value: number) => `€${value.toFixed(2)}`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* 4. Constraint Snapshots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 border-b border-gray-100">
        {/* Factory Utilization */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-800">Factory Utilization</h3>
          </div>
          <div className="p-4">
            {companyData.factoryUtilization.map((factory, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-700">{factory.factory}</span>
                  <span className="text-xs font-medium text-gray-900">{factory.utilizationPercent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${factory.utilizationPercent}%`,
                      backgroundColor: factory.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Contract Fulfillment */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-800">Contract Fulfillment</h3>
          </div>
          <div className="p-4">
            {companyData.contractFulfillment.map((contract, index) => (
              <div key={index} className="mb-3 last:mb-0">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-700">{contract.customer}</span>
                  <span className="text-xs font-medium text-gray-900">{contract.fulfillmentPercent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full" 
                    style={{ 
                      width: `${Math.min(contract.fulfillmentPercent, 100)}%`,
                      backgroundColor: contract.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* High-Demand Products */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-800">High-Demand Products</h3>
          </div>
          <div className="p-4">
            {companyData.demandProducts.map((product, index) => (
              <div key={index} className="flex justify-between items-center mb-3 last:mb-0">
                <span className="text-sm text-gray-700">{product.product}</span>
                <span className={`flex items-center text-sm font-medium ${product.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {product.trend === 'up' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v3.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                    </svg>
                  )}
                  {product.changePercent}%
                </span>
              </div>
            ))}
            <div className="text-xs text-gray-500 mt-3">
              Week-on-week change
            </div>
          </div>
        </div>
        
        {/* Margin Leaders */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-800">Margin Leaders</h3>
          </div>
          <div className="p-4">
            {companyData.marginLeaders.map((margin, index) => (
              <div key={index} className="flex justify-between items-center mb-3 last:mb-0">
                <span className="text-sm text-gray-700">{margin.product}</span>
                <span className={`text-sm font-medium ${margin.isHighest ? 'text-green-600' : 'text-gray-700'}`}>
                  €{margin.marginPerLitre.toFixed(2)}/L
                  {margin.isHighest && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                      Highest
                    </span>
                  )}
                </span>
              </div>
            ))}
            <div className="text-xs text-gray-500 mt-3">
              Based on current market prices
            </div>
          </div>
        </div>
      </div>
      
      {/* 5. "Daisy Recommends" Insight Cards */}
      <div className="p-6">
        <h3 className="text-base font-medium text-gray-800 mb-4">Daisy AI Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {companyData.aiRecommendations.map((rec) => (
            <div key={rec.id} className="bg-white rounded-lg border border-blue-100 overflow-hidden">
              <div className="bg-blue-50 px-4 py-3 border-b border-blue-100 flex items-center">
                {rec.icon === 'trending-up' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                )}
                {rec.icon === 'alert-triangle' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                {rec.icon === 'pie-chart' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                )}
                <h4 className="text-sm font-medium text-gray-800">{rec.title}</h4>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">{rec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 