'use client';

import React, { useState, useEffect } from 'react';

// Define types for region data
interface RegionCoordinates {
  top: string;
  left: string;
}

interface RegionData {
  farms: number;
  avgYield: number;
  totalVolume: number;
  avgFat: number;
  avgProtein: number;
  avgLactose: number;
  avgUrea: number;
  coordinates: RegionCoordinates;
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
    coordinates: { top: '10%', left: '50%' }
  },
  'Republic of Ireland': {
    farms: 1850,
    avgYield: 26.8,
    totalVolume: 49580,
    avgFat: 4.1,
    avgProtein: 3.3,
    avgLactose: 4.7,
    avgUrea: 24.8,
    coordinates: { top: '60%', left: '40%' }
  },
  'Cavan': {
    farms: 420,
    avgYield: 27.3,
    totalVolume: 11466,
    avgFat: 4.3,
    avgProtein: 3.5,
    avgLactose: 4.9,
    avgUrea: 26.1,
    coordinates: { top: '35%', left: '53%' }
  },
  'Monaghan': {
    farms: 380,
    avgYield: 26.9,
    totalVolume: 10222,
    avgFat: 4.2,
    avgProtein: 3.4,
    avgLactose: 4.8,
    avgUrea: 25.7,
    coordinates: { top: '28%', left: '58%' }
  },
  'Louth': {
    farms: 210,
    avgYield: 25.8,
    totalVolume: 5418,
    avgFat: 4.0,
    avgProtein: 3.2,
    avgLactose: 4.6,
    avgUrea: 24.5,
    coordinates: { top: '32%', left: '65%' }
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
        {/* Map Visualization */}
        <div className="lg:col-span-2 border border-gray-200 rounded-lg p-4 bg-blue-50 relative h-[350px]">
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs text-gray-500">
            Interactive Map
          </div>
          
          {/* Ireland Map Background */}
          <div className="relative w-full h-full overflow-hidden">
            {/* SVG Map of Ireland */}
            <svg 
              viewBox="0 0 800 1000" 
              className="absolute inset-0 w-full h-full"
              style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.1))' }}
            >
              {/* Simplified outline of Ireland */}
              <path 
                d="M400,100 C500,120 600,200 650,300 C700,400 720,500 700,600 C680,700 600,800 500,850 C400,900 300,880 250,800 C200,720 180,650 150,550 C120,450 150,350 200,250 C250,150 300,80 400,100 Z" 
                fill="#e6f2ff" 
                stroke="#a3c9ff" 
                strokeWidth="5"
              />
              
              {/* Northern Ireland region */}
              <path 
                d="M400,100 C450,110 500,150 520,200 C540,250 530,300 500,320 C470,340 420,330 380,310 C340,290 320,250 330,200 C340,150 370,120 400,100 Z" 
                fill={selectedRegion === 'Northern Ireland' ? '#3b82f6' : '#d1e5ff'} 
                stroke="#a3c9ff" 
                strokeWidth="2"
                opacity={selectedRegion === 'Northern Ireland' ? 0.8 : 0.5}
                className="cursor-pointer hover:opacity-70 transition-opacity duration-200"
                onClick={() => handleRegionClick('Northern Ireland')}
              />
              
              {/* Cavan region */}
              <path 
                d="M380,310 C420,330 450,360 460,400 C470,440 460,480 430,500 C400,520 360,510 330,490 C300,470 290,430 300,390 C310,350 340,320 380,310 Z" 
                fill={selectedRegion === 'Cavan' ? '#3b82f6' : '#d1e5ff'} 
                stroke="#a3c9ff" 
                strokeWidth="2"
                opacity={selectedRegion === 'Cavan' ? 0.8 : 0.5}
                className="cursor-pointer hover:opacity-70 transition-opacity duration-200"
                onClick={() => handleRegionClick('Cavan')}
              />
              
              {/* Monaghan region */}
              <path 
                d="M430,260 C470,270 500,300 510,340 C520,380 510,420 480,440 C450,460 410,450 380,430 C350,410 340,370 350,330 C360,290 390,260 430,260 Z" 
                fill={selectedRegion === 'Monaghan' ? '#3b82f6' : '#d1e5ff'} 
                stroke="#a3c9ff" 
                strokeWidth="2"
                opacity={selectedRegion === 'Monaghan' ? 0.8 : 0.5}
                className="cursor-pointer hover:opacity-70 transition-opacity duration-200"
                onClick={() => handleRegionClick('Monaghan')}
              />
              
              {/* Louth region */}
              <path 
                d="M480,320 C520,330 550,360 560,400 C570,440 560,480 530,500 C500,520 460,510 430,490 C400,470 390,430 400,390 C410,350 440,320 480,320 Z" 
                fill={selectedRegion === 'Louth' ? '#3b82f6' : '#d1e5ff'} 
                stroke="#a3c9ff" 
                strokeWidth="2"
                opacity={selectedRegion === 'Louth' ? 0.8 : 0.5}
                className="cursor-pointer hover:opacity-70 transition-opacity duration-200"
                onClick={() => handleRegionClick('Louth')}
              />
              
              {/* Rest of Republic of Ireland */}
              <path 
                d="M300,390 C350,410 400,450 420,500 C440,550 430,650 400,700 C370,750 300,780 250,750 C200,720 180,650 150,550 C120,450 150,350 200,300 C250,250 270,370 300,390 Z" 
                fill={selectedRegion === 'Republic of Ireland' ? '#3b82f6' : '#d1e5ff'} 
                stroke="#a3c9ff" 
                strokeWidth="2"
                opacity={selectedRegion === 'Republic of Ireland' ? 0.8 : 0.5}
                className="cursor-pointer hover:opacity-70 transition-opacity duration-200"
                onClick={() => handleRegionClick('Republic of Ireland')}
              />
            </svg>
            
            {/* Region Labels */}
            {Object.entries(regionData).map(([region, data]) => (
              <div 
                key={region}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 ${
                  selectedRegion === region 
                    ? 'scale-110' 
                    : 'scale-100'
                } transition-all duration-200`}
                style={{ 
                  top: data.coordinates.top, 
                  left: data.coordinates.left 
                }}
              >
                <button
                  onClick={() => handleRegionClick(region)}
                  className={`px-2 py-1 rounded-full text-xs font-medium shadow-sm transition-all duration-200 ${
                    selectedRegion === region 
                      ? 'bg-blue-500 text-white ring-2 ring-white' 
                      : 'bg-white text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  {region}
                </button>
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
              <span className="font-medium">{regionData[selectedRegion as keyof typeof regionData].farms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Average Yield (L/cow/day):</span>
              <span className="font-medium">{regionData[selectedRegion as keyof typeof regionData].avgYield}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Total Volume (L/day):</span>
              <span className="font-medium">{regionData[selectedRegion as keyof typeof regionData].totalVolume.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Average Fat (%):</span>
              <span className="font-medium">{regionData[selectedRegion as keyof typeof regionData].avgFat}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Average Protein (%):</span>
              <span className="font-medium">{regionData[selectedRegion as keyof typeof regionData].avgProtein}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Average Lactose (%):</span>
              <span className="font-medium">{regionData[selectedRegion as keyof typeof regionData].avgLactose}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 text-sm">Average Urea (mg/dL):</span>
              <span className="font-medium">{regionData[selectedRegion as keyof typeof regionData].avgUrea}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 