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
type AllocationStatus = 'Under negotiation' | 'Contract assigned' | 'Contract in progress' | 'Contract met';

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
  marginPercent: number;
  isHighest: boolean;
}

interface CustomerContract {
  customer: string;
  product: string;
  volume: number;
  marginPercent: number;
  status: AllocationStatus;
  statusColor: string;
}

interface PlantCapacity {
  factory: string;
  totalCapacity: number;
  usedCapacity: number;
  products: Array<{
    product: string;
    volume: number;
  }>;
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
    { id: 1, product: 'Whole Milk Powder', factory: 'Charleville', allocatedLitres: 25500000, percentOfTotal: 30, marginPerLitre: 0.08, marginPercent: 3.2, customerIDs: [1], productionStatus: 'In production' },
    { id: 2, product: 'Butter', factory: 'Listowel', allocatedLitres: 24650000, percentOfTotal: 29, marginPerLitre: 0.12, marginPercent: 4.8, customerIDs: [2], productionStatus: 'In production' },
    { id: 3, product: 'Skim Milk Powder', factory: 'Charleville', allocatedLitres: 12750000, percentOfTotal: 15, marginPerLitre: 0.05, marginPercent: 1.9, customerIDs: [3], productionStatus: 'In production' },
    { id: 4, product: 'Cheese', factory: 'Newmarket', allocatedLitres: 22100000, percentOfTotal: 26, marginPerLitre: 0.14, marginPercent: 5.6, customerIDs: [3], productionStatus: 'High demand' },
  ],
  factoryUtilization: [
    { factory: 'Charleville', utilizationPercent: 87, color: '#60a5fa' },
    { factory: 'Listowel', utilizationPercent: 83, color: '#34d399' },
    { factory: 'Newmarket', utilizationPercent: 78, color: '#a78bfa' },
  ],
  plantCapacity: [
    { 
      factory: 'Charleville', 
      totalCapacity: 44000000, 
      usedCapacity: 38250000,
      products: [
        { product: 'Whole Milk Powder', volume: 25500000 },
        { product: 'Skim Milk Powder', volume: 12750000 }
      ]
    },
    { 
      factory: 'Listowel', 
      totalCapacity: 29500000, 
      usedCapacity: 24650000,
      products: [
        { product: 'Butter', volume: 24650000 }
      ]
    },
    { 
      factory: 'Newmarket', 
      totalCapacity: 28000000, 
      usedCapacity: 22100000,
      products: [
        { product: 'Cheese', volume: 22100000 }
      ]
    }
  ],
  customerContracts: [
    { id: 1, customer: 'Mars', product: 'Whole Milk Powder', volume: 15000000, marginPercent: 3.4, status: 'Contract met', statusColor: 'bg-green-100 text-green-800' },
    { id: 2, customer: 'Cadbury', product: 'Butter, Whole Milk Powder', volume: 18000000, marginPercent: 5.1, status: 'Contract in progress', statusColor: 'bg-blue-100 text-blue-800' },
    { id: 3, customer: 'Nestle', product: 'Cheese, Skim Milk Powder', volume: 20000000, marginPercent: 5.8, status: 'Under negotiation', statusColor: 'bg-yellow-100 text-yellow-800' },
  ],
  contractFulfillment: [
    { customer: 'Mars', fulfillmentPercent: 94, color: '#60a5fa' },
    { customer: 'Cadbury', fulfillmentPercent: 102, color: '#34d399' },
    { customer: 'Nestle', fulfillmentPercent: 87, color: '#f59e0b' },
  ],
  demandProducts: [
    { product: 'Butter', changePercent: 8, trend: 'up' },
    { product: 'Cheese', changePercent: 5, trend: 'up' },
    { product: 'SMP', changePercent: 2, trend: 'down' },
  ],
  marginLeaders: [
    { product: 'Cheese', marginPercent: 5.6, isHighest: true },
    { product: 'Butter', marginPercent: 4.8, isHighest: false },
    { product: 'WMP', marginPercent: 3.2, isHighest: false },
  ],
  aiRecommendations: [
    { 
      id: 1, 
      title: 'Increase Cheese Production',
      description: 'Divert additional 3% of milk to Cheese due to rising EU market demand (+5% week-on-week)',
      icon: 'trending-up'
    },
    { 
      id: 2, 
      title: 'Optimize Charleville Output',
      description: 'Plant operating at 87% capacity - monitor closely for potential bottlenecks',
      icon: 'alert-triangle'
    },
    { 
      id: 3, 
      title: 'Maintain WMP Focus',
      description: 'Current margins favor continuing moderate WMP production rate at Charleville',
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
    timeframe: 'Next 30 days'
  },
  allocations: [
    { id: 1, product: 'Cheese', factory: 'Bailieborough', allocatedLitres: 19800000, percentOfTotal: 22, marginPerLitre: 0.13, marginPercent: 5.2, customerIDs: [2], productionStatus: 'In production' },
    { id: 2, product: 'Butter', factory: 'Killeshandra', allocatedLitres: 18000000, percentOfTotal: 20, marginPerLitre: 0.11, marginPercent: 4.4, customerIDs: [1], productionStatus: 'In production' },
    { id: 3, product: 'WMP (Whole Milk Powder)', factory: 'Bailieborough', allocatedLitres: 15300000, percentOfTotal: 17, marginPerLitre: 0.09, marginPercent: 3.6, customerIDs: [3], productionStatus: 'High demand' },
    { id: 4, product: 'SMP (Skim Milk Powder)', factory: 'Killeshandra', allocatedLitres: 13500000, percentOfTotal: 15, marginPerLitre: 0.06, marginPercent: 2.4, customerIDs: [1], productionStatus: 'In production' },
    { id: 5, product: 'Cream', factory: 'Bailieborough', allocatedLitres: 9900000, percentOfTotal: 11, marginPerLitre: 0.12, marginPercent: 4.8, customerIDs: [2], productionStatus: 'In production' },
    { id: 6, product: 'UHT Milk', factory: 'Ballyraghane', allocatedLitres: 6300000, percentOfTotal: 7, marginPerLitre: 0.07, marginPercent: 2.8, customerIDs: [4], productionStatus: 'Low demand' },
    { id: 7, product: 'Casein', factory: 'Artigarvan', allocatedLitres: 3600000, percentOfTotal: 4, marginPerLitre: 0.15, marginPercent: 6.0, customerIDs: [5], productionStatus: 'High demand' },
    { id: 8, product: 'Bulk Butter', factory: 'Ballyraghane', allocatedLitres: 5400000, percentOfTotal: 6, marginPerLitre: 0.08, marginPercent: 3.2, customerIDs: [3], productionStatus: 'In production' },
    { id: 9, product: 'Fresh Milk', factory: 'Ballyraghane', allocatedLitres: 4500000, percentOfTotal: 5, marginPerLitre: 0.05, marginPercent: 2.0, customerIDs: [3], productionStatus: 'Low demand' },
    { id: 10, product: 'Packet Butter', factory: 'Ballyraghane', allocatedLitres: 3600000, percentOfTotal: 4, marginPerLitre: 0.07, marginPercent: 2.8, customerIDs: [4], productionStatus: 'In production' },
    { id: 11, product: 'WMP (Whole Milk Powder)', factory: 'Artigarvan', allocatedLitres: 5400000, percentOfTotal: 6, marginPerLitre: 0.08, marginPercent: 3.2, customerIDs: [1], productionStatus: 'In production' },
    { id: 12, product: 'Cream', factory: 'Newtownards', allocatedLitres: 4500000, percentOfTotal: 5, marginPerLitre: 0.09, marginPercent: 3.6, customerIDs: [3], productionStatus: 'In production' },
    { id: 13, product: 'UHT Milk', factory: 'Newtownards', allocatedLitres: 4050000, percentOfTotal: 4.5, marginPerLitre: 0.07, marginPercent: 2.8, customerIDs: [5], productionStatus: 'In production' },
    { id: 14, product: 'WPC', factory: 'Newtownards', allocatedLitres: 3150000, percentOfTotal: 3.5, marginPerLitre: 0.10, marginPercent: 4.0, customerIDs: [5], productionStatus: 'High demand' },
  ],
  factoryUtilization: [
    { factory: 'Bailieborough', utilizationPercent: 84, color: '#60a5fa' },
    { factory: 'Killeshandra', utilizationPercent: 82, color: '#34d399' },
    { factory: 'Ballyraghane', utilizationPercent: 76, color: '#a78bfa' },
    { factory: 'Artigarvan', utilizationPercent: 71, color: '#f97316' },
    { factory: 'Newtownards', utilizationPercent: 64, color: '#ec4899' },
  ],
  plantCapacity: [
    { 
      factory: 'Bailieborough', 
      totalCapacity: 35000000, 
      usedCapacity: 29400000,
      products: [
        { product: 'Cheese', volume: 19800000 },
        { product: 'WMP (Whole Milk Powder)', volume: 15300000 },
        { product: 'Cream', volume: 9900000 }
      ]
    },
    { 
      factory: 'Killeshandra', 
      totalCapacity: 38000000, 
      usedCapacity: 31500000,
      products: [
        { product: 'Butter', volume: 18000000 },
        { product: 'SMP (Skim Milk Powder)', volume: 13500000 }
      ]
    },
    { 
      factory: 'Ballyraghane', 
      totalCapacity: 25000000, 
      usedCapacity: 19800000,
      products: [
        { product: 'UHT Milk', volume: 6300000 },
        { product: 'Bulk Butter', volume: 5400000 },
        { product: 'Fresh Milk', volume: 4500000 },
        { product: 'Packet Butter', volume: 3600000 }
      ]
    },
    { 
      factory: 'Artigarvan', 
      totalCapacity: 12500000, 
      usedCapacity: 9000000,
      products: [
        { product: 'Casein', volume: 3600000 },
        { product: 'WMP (Whole Milk Powder)', volume: 5400000 }
      ]
    },
    { 
      factory: 'Newtownards', 
      totalCapacity: 14000000, 
      usedCapacity: 11700000,
      products: [
        { product: 'Cream', volume: 4500000 },
        { product: 'UHT Milk', volume: 4050000 },
        { product: 'WPC', volume: 3150000 }
      ]
    }
  ],
  customerContracts: [
    { customer: 'Tesco Ireland', product: 'Butter', volume: 18000000, marginPercent: 4.4, status: 'Contract assigned', statusColor: 'bg-blue-100 text-blue-800' },
    { customer: 'Dunnes Stores', product: 'Cheese', volume: 19800000, marginPercent: 5.2, status: 'Contract in progress', statusColor: 'bg-green-100 text-green-800' },
    { customer: 'SuperValu', product: 'WMP (Whole Milk Powder)', volume: 15300000, marginPercent: 3.6, status: 'Contract met', statusColor: 'bg-gray-100 text-gray-800' },
    { customer: 'Aldi Ireland', product: 'Fresh Milk', volume: 4500000, marginPercent: 2.0, status: 'Under negotiation', statusColor: 'bg-yellow-100 text-yellow-800' },
  ],
  contractFulfillment: [
    { customer: 'Nestle', fulfillmentPercent: 97, color: '#60a5fa' },
    { customer: 'Danone', fulfillmentPercent: 104, color: '#34d399' },
    { customer: 'Arla', fulfillmentPercent: 91, color: '#f59e0b' },
  ],
  demandProducts: [
    { product: 'Cheese', changePercent: 5, trend: 'up' },
    { product: 'UHT Milk', changePercent: 3, trend: 'up' },
    { product: 'WMP', changePercent: 1, trend: 'down' },
  ],
  marginLeaders: [
    { product: 'Cheese', marginPercent: 5.2, isHighest: true },
    { product: 'Butter', marginPercent: 4.4, isHighest: false },
    { product: 'Yogurt', marginPercent: 3.6, isHighest: false },
  ],
  aiRecommendations: [
    { 
      id: 1, 
      title: 'Increase Cheese Production',
      description: 'Allocate additional 2% to Cheese production at Killeshandra due to rising EU demand',
      icon: 'trending-up'
    },
    { 
      id: 2, 
      title: 'Optimize Bailieborough Output',
      description: 'Plant operating near capacity (84%), monitor closely to avoid bottlenecks',
      icon: 'alert-triangle'
    },
    { 
      id: 3, 
      title: 'Leverage Northern Ireland Facilities',
      description: 'Artigarvan and Newtownards operating at 71% and 64% - opportunity to increase production',
      icon: 'pie-chart'
    },
  ],
  scenarioToggles: [
    { id: 'demand-spike-cheese', label: 'Demand Spike (Cheese)', active: false },
    { id: 'plant-offline', label: 'Bailieborough Plant Offline', active: false },
    { id: 'margin-increase-wmp', label: 'Margin Increase (WMP)', active: false },
  ]
};

// Define Dairygold-specific data (Cork-focused with their actual facilities)
const dairygoldData = {
  forecast: {
    volume: 185000000, // 185M litres (matching our companyStats)
    timeframe: 'Next 30 days'
  },
  allocations: [
    { id: 1, product: 'Milk Powder', factory: 'Mitchelstown', allocatedLitres: 64750000, percentOfTotal: 35, marginPerLitre: 0.15, marginPercent: 6.0, customerIDs: [1], productionStatus: 'High demand' },
    { id: 2, product: 'Cheese Products', factory: 'Mitchelstown', allocatedLitres: 46250000, percentOfTotal: 25, marginPerLitre: 0.18, marginPercent: 7.2, customerIDs: [2], productionStatus: 'In production' },
    { id: 3, product: 'Butter & Spreads', factory: 'Mitchelstown', allocatedLitres: 37000000, percentOfTotal: 20, marginPerLitre: 0.14, marginPercent: 5.6, customerIDs: [3], productionStatus: 'In production' },
    { id: 4, product: 'Liquid Milk', factory: 'Charleville', allocatedLitres: 27750000, percentOfTotal: 15, marginPerLitre: 0.08, marginPercent: 3.2, customerIDs: [4], productionStatus: 'In production' },
    { id: 5, product: 'Nutritional Products', factory: 'Mallow', allocatedLitres: 6475000, percentOfTotal: 3.5, marginPerLitre: 0.22, marginPercent: 8.8, customerIDs: [5], productionStatus: 'High demand' },
    { id: 6, product: 'Ingredients', factory: 'Mallow', allocatedLitres: 2775000, percentOfTotal: 1.5, marginPerLitre: 0.20, marginPercent: 8.0, customerIDs: [6], productionStatus: 'High demand' },
    { id: 7, product: 'Quality Testing', factory: 'Kanturk', allocatedLitres: 8500000, percentOfTotal: 4.6, marginPerLitre: 0.06, marginPercent: 2.4, customerIDs: [7], productionStatus: 'In production' },
    { id: 8, product: 'Research Products', factory: 'Moorepark', allocatedLitres: 3200000, percentOfTotal: 1.7, marginPerLitre: 0.25, marginPercent: 10.0, customerIDs: [8], productionStatus: 'High demand' },
  ],
  factoryUtilization: [
    { factory: 'Mitchelstown', utilizationPercent: 92, color: '#10b981' },
    { factory: 'Mallow', utilizationPercent: 88, color: '#3b82f6' },
    { factory: 'Charleville', utilizationPercent: 85, color: '#8b5cf6' },
    { factory: 'Kanturk', utilizationPercent: 78, color: '#f59e0b' },
    { factory: 'Moorepark', utilizationPercent: 65, color: '#6b7280' },
  ],
  plantCapacity: [
    { 
      factory: 'Mitchelstown', 
      totalCapacity: 150000000, 
      usedCapacity: 148000000,
      products: [
        { product: 'Milk Powder', volume: 64750000 },
        { product: 'Cheese Products', volume: 46250000 },
        { product: 'Butter & Spreads', volume: 37000000 }
      ]
    },
    { 
      factory: 'Mallow', 
      totalCapacity: 25000000, 
      usedCapacity: 22000000,
      products: [
        { product: 'Nutritional Products', volume: 6475000 },
        { product: 'Ingredients', volume: 2775000 }
      ]
    },
    { 
      factory: 'Charleville', 
      totalCapacity: 35000000, 
      usedCapacity: 29750000,
      products: [
        { product: 'Liquid Milk', volume: 27750000 }
      ]
    },
    { 
      factory: 'Kanturk', 
      totalCapacity: 12000000, 
      usedCapacity: 9400000,
      products: [
        { product: 'Quality Testing', volume: 8500000 }
      ]
    },
    { 
      factory: 'Moorepark', 
      totalCapacity: 5000000, 
      usedCapacity: 3250000,
      products: [
        { product: 'Research Products', volume: 3200000 }
      ]
    }
  ],
  customerContracts: [
    { customer: 'Kerrygold (Ornua)', product: 'Milk Powder', volume: 45000000, marginPercent: 6.0, status: 'Contract assigned', statusColor: 'bg-blue-100 text-blue-800' },
    { customer: 'Carbery Group', product: 'Nutritional Products', volume: 6475000, marginPercent: 8.8, status: 'Contract in progress', statusColor: 'bg-green-100 text-green-800' },
    { customer: 'Danone', product: 'Ingredients', volume: 2775000, marginPercent: 8.0, status: 'Contract met', statusColor: 'bg-gray-100 text-gray-800' },
    { customer: 'Muller', product: 'Cheese Products', volume: 25000000, marginPercent: 7.2, status: 'Under negotiation', statusColor: 'bg-yellow-100 text-yellow-800' },
    { customer: 'Irish Research Council', product: 'Research Products', volume: 3200000, marginPercent: 10.0, status: 'Contract met', statusColor: 'bg-gray-100 text-gray-800' },
  ]
};

// Main component
export default function ProductAllocationRecommendations() {
  const { company } = useParams();
  const companySlug = typeof company === 'string' ? company : 'kerry-dairy';
  
  // Select company data based on company slug
  const companyData = companySlug === 'lakeland-dairies' ? lakelandDairiesData : 
                      companySlug === 'dairygold' ? dairygoldData :
                      kerryDairyData;
  
  // Get list of all factories for the selector
  const factoryList = Array.from(new Set(companyData.allocations.map(item => item.factory)));
  
  // State for timeframe and volume - keeping these values but not showing dropdowns
  const forecastVolume = companyData.forecast.volume;
  const timeframe = companyData.forecast.timeframe;
  
  // Set default factory to "All Factories"
  const [selectedFactory, setSelectedFactory] = useState('All Factories');
  const [isFactoryDropdownOpen, setIsFactoryDropdownOpen] = useState(false);
  
  // Filter data for selected factory
  const filteredAllocations = companyData.allocations.filter(item => 
    selectedFactory === 'All Factories' ? true : item.factory === selectedFactory
  );
  
  // Get plant data for the selected factory
  const selectedPlantData = companyData.plantCapacity.find(plant => plant.factory === selectedFactory);
  
  // Convert allocations to chart-friendly format
  const pieChartData = filteredAllocations.map(item => ({
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
  
  const marginChartData = filteredAllocations.map(item => ({
    name: item.product,
    margin: item.marginPercent,
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
  
  // COLORS for charts - expanded range to prevent repetition
  const COLORS = [
    '#60a5fa', // blue
    '#34d399', // green
    '#f59e0b', // amber
    '#a78bfa', // purple
    '#f97316', // orange
    '#f43f5e', // pink
    '#06b6d4', // cyan
    '#84cc16', // lime
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#14b8a6', // teal
    '#eab308', // yellow
    '#3b82f6', // blue
    '#22c55e', // green
    '#ef4444', // red
    '#d946ef', // fuchsia
    '#0ea5e9', // sky blue
    '#64748b', // slate
    '#6366f1', // indigo
    '#a855f7'  // purple
  ];
  
  // State for expanded plant details
  const [expandedPlant, setExpandedPlant] = useState<string | null>(null);
  
  // Toggle plant details
  const togglePlantDetails = (factory: string) => {
    if (expandedPlant === factory) {
      setExpandedPlant(null);
    } else {
      setExpandedPlant(factory);
    }
  };
  
  // Calculate total allocated volume for the selected factory
  const totalAllocatedVolume = filteredAllocations.reduce((sum, item) => sum + item.allocatedLitres, 0);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* 1. Header Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="text-xl font-medium text-gray-800">Product Allocation</h2>
          
          <div className="relative mt-4 md:mt-0">
            <div 
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg shadow-sm bg-white cursor-pointer hover:bg-gray-50 w-64"
              onClick={() => setIsFactoryDropdownOpen(!isFactoryDropdownOpen)}
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{selectedFactory}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            
            {isFactoryDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-1 max-h-60 overflow-auto">
                <div
                  className="px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer"
                  onClick={() => {
                    setSelectedFactory('All Factories');
                    setIsFactoryDropdownOpen(false);
                  }}
                >
                  All Factories
                </div>
                {factoryList.map(factory => (
                  <div
                    key={factory}
                    className="px-4 py-2 text-sm hover:bg-blue-100 cursor-pointer"
                    onClick={() => {
                      setSelectedFactory(factory);
                      setIsFactoryDropdownOpen(false);
                    }}
                  >
                    {factory}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-gray-800">
            <span className="font-medium">Allocation Summary:</span> Based on a forecast of {formatNumber(forecastVolume)} litres for {timeframe}, 
            {selectedFactory === 'All Factories' 
              ? ` distribute milk supply across ${barChartData.length} plants and ${pieChartData.length} product types to optimize for contract fulfillment and margin optimization.`
              : ` allocate ${formatNumber(totalAllocatedVolume)} litres to ${selectedFactory} plant across ${filteredAllocations.length} product types.`
            }
          </p>
        </div>
      </div>
      
      {selectedFactory !== 'All Factories' && selectedPlantData && (
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-gray-800">Factory Efficiency</h3>
            <div className={`text-lg font-bold rounded-full px-3 py-1 ${
              selectedPlantData.usedCapacity / selectedPlantData.totalCapacity > 0.80 
              ? "bg-green-100 text-green-700"
              : selectedPlantData.usedCapacity / selectedPlantData.totalCapacity > 0.55
              ? "bg-yellow-100 text-yellow-700" 
              : "bg-red-100 text-red-700"
            }`}>
              {Math.round(selectedPlantData.usedCapacity / selectedPlantData.totalCapacity * 100)}% Efficient
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm mb-2">
              <span className="font-medium">Total Capacity:</span> {formatNumber(selectedPlantData.totalCapacity)} litres
            </div>
            <div className="text-sm">
              <span className="font-medium">Current Allocation:</span> {formatNumber(selectedPlantData.usedCapacity)} litres
            </div>
          </div>
        </div>
      )}
      
      {/* 2. Allocation Table */}
      <div className="p-6 border-b border-gray-100 overflow-x-auto">
        <h3 className="text-base font-medium text-gray-800 mb-4">
          {selectedFactory === 'All Factories' ? 'Allocation Plan - Production Status by Product' : `Allocation Plan for ${selectedFactory} - Production Status by Product`}
        </h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              {selectedFactory === 'All Factories' && (
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Factory</th>
              )}
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allocated Litres</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% of Total</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin (%)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Production Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAllocations.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.product}</td>
                {selectedFactory === 'All Factories' && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.factory}</td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatNumber(item.allocatedLitres)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.percentOfTotal}%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.marginPercent}%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.productionStatus === 'High demand' 
                      ? 'bg-green-100 text-green-800'
                      : item.productionStatus === 'In production'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.productionStatus}
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
          <h3 className="text-base font-medium text-gray-800 mb-2">
            {selectedFactory === 'All Factories' ? 'Allocation by Product' : `Product Mix at ${selectedFactory}`}
          </h3>
          <div className="h-[350px] flex flex-col">
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={false}
                    outerRadius={85}
                    innerRadius={55}
                    fill="#8884d8"
                    dataKey="value"
                    paddingAngle={1}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number, name: string) => [formatNumber(value), name]} 
                    contentStyle={{ backgroundColor: 'white', borderRadius: '4px', border: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-x-1 gap-y-2 mb-12">
              {pieChartData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-1 flex-shrink-0" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                  />
                  <span className="text-xs font-medium truncate">
                    {(() => {
                      // Use shorter abbreviations for milk powders
                      const name = entry.name;
                      if (name.includes('Whole Milk Powder')) return 'WMP';
                      if (name.includes('WMP')) return 'WMP';
                      if (name.includes('Skim Milk Powder')) return 'SMP';
                      if (name.includes('SMP')) return 'SMP';
                      // For other products, keep the original simplification
                      return name.includes('(') ? name.split('(')[0].trim() : name;
                    })()}
                    {' '}
                    {((entry.value / totalAllocatedVolume) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bar Chart - Allocation by Factory */}
        {selectedFactory === 'All Factories' && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-base font-medium text-gray-800 mb-2">Allocation by Factory</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false}
                    interval={0}
                    height={30}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      // Create abbreviations for factory names
                      if (value === 'Bailieborough') return 'Bailie';
                      if (value === 'Ballyraghane') return 'Bally';
                      if (value === 'Newtownards') return 'Newtn';
                      if (value === 'Killeshandra') return 'Kille';
                      if (value === 'Artigarvan') return 'Artig';
                      return value;
                    }}
                  />
                  <YAxis tickFormatter={(value: number) => formatNumber(value)} axisLine={false} tickLine={false} />
                  <Tooltip 
                    formatter={(value: number) => formatNumber(value)} 
                    contentStyle={{ backgroundColor: 'white', borderRadius: '4px', border: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} 
                  />
                  <Bar dataKey="litres" fill="#60a5fa" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="litres" position="top" formatter={(value: number) => formatNumber(value)} style={{ fontSize: '11px', fill: '#4b5563' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        
        {/* Bar Chart - Margin per Product */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-base font-medium text-gray-800 mb-2">
            {selectedFactory === 'All Factories' ? 'Margin per Product (%)' : `Margin per Product at ${selectedFactory} (%)`}
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marginChartData} layout="vertical" margin={{ top: 10, right: 50, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="0" horizontal={true} vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  type="number" 
                  domain={[0, 6]} 
                  ticks={[0, 1, 2, 3, 4, 5, 6]} 
                  tickFormatter={(value) => `${value}%`}
                  axisLine={false} 
                  tickLine={false} 
                />
                <YAxis type="category" dataKey="name" width={100} axisLine={false} tickLine={false} />
                <Tooltip 
                  formatter={(value: number) => `${value}%`} 
                  contentStyle={{ backgroundColor: 'white', borderRadius: '4px', border: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} 
                />
                <Bar dataKey="margin" fill="#34d399" barSize={20} radius={[0, 4, 4, 0]}>
                  <LabelList dataKey="margin" position="right" formatter={(value: number) => `${value}%`} style={{ fontSize: '11px', fill: '#4b5563' }} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Additional chart for selected factory if needed */}
        {selectedFactory !== 'All Factories' && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-base font-medium text-gray-800 mb-2">Volume by Product at {selectedFactory}</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredAllocations} layout="vertical" margin={{ top: 10, right: 60, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="0" horizontal={true} vertical={false} stroke="#f0f0f0" />
                  <XAxis type="number" tickFormatter={(value: number) => formatNumber(value)} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="product" width={110} axisLine={false} tickLine={false} />
                  <Tooltip 
                    formatter={(value: number) => formatNumber(value)} 
                    contentStyle={{ backgroundColor: 'white', borderRadius: '4px', border: 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} 
                  />
                  <Bar dataKey="allocatedLitres" fill="#60a5fa" barSize={20} radius={[0, 4, 4, 0]}>
                    <LabelList dataKey="allocatedLitres" position="right" formatter={(value: number) => formatNumber(value)} style={{ fontSize: '11px', fill: '#4b5563' }} dx={5} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
      
      {/* 4. Plant Efficiency Section (only show for 'All Factories' view) */}
      {selectedFactory === 'All Factories' && (
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-base font-medium text-gray-800 mb-4">Plant Efficiency Across All Factories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {companyData.plantCapacity.map((plant, index) => (
              <div key={index} 
                  className={`bg-gray-50 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all duration-150 ${expandedPlant === plant.factory ? 'shadow-md' : ''}`}
                  onClick={() => togglePlantDetails(plant.factory)}>
                <div className="flex items-center mb-3">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-800">{plant.factory}</h4>
                  </div>
                  <div className={`text-lg font-bold rounded-full px-3 py-1 ${
                    plant.usedCapacity / plant.totalCapacity > 0.80 
                    ? "bg-green-100 text-green-700"
                    : plant.usedCapacity / plant.totalCapacity > 0.55
                    ? "bg-yellow-100 text-yellow-700" 
                    : "bg-red-100 text-red-700"
                  }`}>
                    {Math.round(plant.usedCapacity / plant.totalCapacity * 100)}%
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Plant Efficiency Rating</span>
                  <span>
                    {expandedPlant === plant.factory ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </span>
                </div>
                
                {expandedPlant === plant.factory && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="text-xs font-medium text-gray-600 mb-2">Products in this plant:</div>
                    <ul className="space-y-2">
                      {plant.products.map((product, pIndex) => (
                        <li key={pIndex} className="text-sm bg-white p-2 rounded border border-gray-100">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-gray-700">{product.product}</span>
                            <span className="text-gray-600">{formatNumber(product.volume)} litres</span>
                          </div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1"></div>
                            {(product.volume / plant.totalCapacity * 100).toFixed(1)}% of plant capacity
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="text-xs text-gray-500 mt-3 pt-2 border-t border-gray-200">
                      Total Capacity: {formatNumber(plant.totalCapacity)} litres
                    </div>
                  </div>
                )}
                
                {expandedPlant !== plant.factory && (
                  <div className="mt-2 text-xs text-blue-500 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    Click for product details
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* 5. Customer Contracts Section */}
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-base font-medium text-gray-800 mb-4">Customer Contracts</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin (%)</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companyData.customerContracts.map((contract, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contract.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contract.product}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatNumber(contract.volume)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contract.marginPercent}%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${contract.statusColor}`}>
                    {contract.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 