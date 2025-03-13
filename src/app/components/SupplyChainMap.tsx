'use client';

import React, { useState, useEffect } from 'react';

// Define types for region data
interface RegionData {
  farms: number;
  avgYield: number;
  totalVolume: number;
  avgFat: number;
  avgProtein: number;
  avgLactose: number;
  avgUrea: number;
  color: string;
  size: string;
}

type RegionDataMap = {
  [key: string]: RegionData;
};

// Sample data for different regions
const regionData: RegionDataMap = {
  'Northern Ireland': {
    farms: 1250,
    avgYield: 28.5,
    totalVolume: 35625,
    avgFat: 4.2,
    avgProtein: 3.4,
    avgLactose: 4.8,
    avgUrea: 25.3,
    color: 'bg-blue-500',
    size: 'lg:col-span-2 lg:row-span-2'
  },
  'Republic of Ireland': {
    farms: 1850,
    avgYield: 26.8,
    totalVolume: 49580,
    avgFat: 4.1,
    avgProtein: 3.3,
    avgLactose: 4.7,
    avgUrea: 24.8,
    color: 'bg-blue-400',
    size: 'lg:col-span-2 lg:row-span-2'
  },
  'Cavan': {
    farms: 420,
    avgYield: 27.3,
    totalVolume: 11466,
    avgFat: 4.3,
    avgProtein: 3.5,
    avgLactose: 4.9,
    avgUrea: 26.1,
    color: 'bg-blue-300',
    size: 'lg:col-span-1 lg:row-span-1'
  },
  'Monaghan': {
    farms: 380,
    avgYield: 26.9,
    totalVolume: 10222,
    avgFat: 4.2,
    avgProtein: 3.4,
    avgLactose: 4.8,
    avgUrea: 25.7,
    color: 'bg-blue-300',
    size: 'lg:col-span-1 lg:row-span-1'
  },
  'Louth': {
    farms: 210,
    avgYield: 25.8,
    totalVolume: 5418,
    avgFat: 4.0,
    avgProtein: 3.2,
    avgLactose: 4.6,
    avgUrea: 24.5,
    color: 'bg-blue-200',
    size: 'lg:col-span-1 lg:row-span-1'
  }
};

export default function SupplyChainMap() {
  const [selectedRegion, setSelectedRegion] = useState('Northern Ireland');
  const [isClient, setIsClient] = useState(false);
  
  // Use useEffect to set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleRegionClick = (region: string) => {
    setSelectedRegion(region);
  };
  
  // If not client-side yet, render a simplified version to avoid hydration mismatch
  if (!isClient) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-medium text-gray-800 mb-4">
          Lakeland Dairies Supply Chain Map
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 border border-gray-200 rounded-lg p-4 bg-blue-50 relative h-[350px] animate-pulse">
            <div className="absolute inset-0 bg-blue-100 opacity-50 rounded-lg"></div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-medium text-gray-800 mb-4">
        Lakeland Dairies Supply Chain Map
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Modern Box-based Visualization */}
        <div className="lg:col-span-2 border border-gray-200 rounded-lg p-4 bg-blue-50 relative h-[350px]">
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs text-gray-500">
            Interactive Regions
          </div>
          
          {/* Box-based Region Visualization */}
          <div className="grid grid-cols-4 grid-rows-4 gap-2 h-full w-full p-4">
            {Object.entries(regionData).map(([region, data]) => (
              <div 
                key={region}
                className={`${data.size} rounded-lg flex items-center justify-center p-2 cursor-pointer transition-all duration-300 transform ${
                  selectedRegion === region 
                    ? `${data.color} text-white scale-105 shadow-lg` 
                    : `${data.color} bg-opacity-30 hover:bg-opacity-50 text-gray-700`
                }`}
                onClick={() => handleRegionClick(region)}
              >
                <div className="text-center">
                  <div className="font-medium text-sm md:text-base">{region}</div>
                  <div className="text-xs md:text-sm mt-1">{data.farms} Farms</div>
                  <div className="text-xs mt-1">{data.totalVolume.toLocaleString()} L</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute bottom-2 left-2 text-xs text-gray-500">
            Click on a region to view detailed metrics
          </div>
        </div>
        
        {/* Region Details */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-800 mb-3">
            {selectedRegion} Region Details
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Number of Farms:</span>
              <span className="font-medium">{regionData[selectedRegion].farms}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Average Yield (L/cow/day):</span>
              <span className="font-medium">{regionData[selectedRegion].avgYield}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Total Volume (L/day):</span>
              <span className="font-medium">{regionData[selectedRegion].totalVolume.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Average Fat (%):</span>
              <span className="font-medium">{regionData[selectedRegion].avgFat}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Average Protein (%):</span>
              <span className="font-medium">{regionData[selectedRegion].avgProtein}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Average Lactose (%):</span>
              <span className="font-medium">{regionData[selectedRegion].avgLactose}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Average Urea (mg/dL):</span>
              <span className="font-medium">{regionData[selectedRegion].avgUrea}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 