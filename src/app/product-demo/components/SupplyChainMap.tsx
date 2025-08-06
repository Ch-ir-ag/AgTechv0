'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Define the county data structure
interface CountyData {
  id: string;
  name: string;
  farms: number;
  avgYield: number;
  totalVolume: number;
  avgFat: number;
  avgProtein: number;
  forecastChange: number; // Percentage change for next month
}

// Define the clickable area coordinates types directly in the array
const clickableAreas = [
  {
    id: 'antrim',
    shape: 'rect' as const,
    coords: [321, 68, 351, 128],
    name: 'Region A'
  },
  {
    id: 'down',
    shape: 'rect' as const,
    coords: [322, 191, 365, 244],
    name: 'Region B'
  },
  {
    id: 'armagh',
    shape: 'rect' as const,
    coords: [276, 203, 310, 243],
    name: 'Region C'
  },
  {
    id: 'tyrone',
    shape: 'rect' as const,
    coords: [218, 136, 268, 186],
    name: 'Region D'
  },
  {
    id: 'derry',
    shape: 'rect' as const,
    coords: [242, 58, 292, 108],
    name: 'Region E'
  },
  {
    id: 'fermanagh',
    shape: 'rect' as const,
    coords: [187, 198, 236, 239],
    name: 'Region F'
  },
  {
    id: 'monaghan',
    shape: 'rect' as const,
    coords: [252, 228, 278, 263],
    name: 'Region G'
  },
  {
    id: 'cavan',
    shape: 'rect' as const,
    coords: [222, 274, 257, 316],
    name: 'Region H'
  },
  {
    id: 'louth',
    shape: 'rect' as const,
    coords: [299, 288, 328, 327],
    name: 'Region I'
  },
  {
    id: 'meath',
    shape: 'rect' as const,
    coords: [269, 342, 308, 384],
    name: 'Region J'
  },
  {
    id: 'dublin',
    shape: 'rect' as const,
    coords: [320, 374, 357, 418],
    name: 'Region K'
  },
  {
    id: 'kildare',
    shape: 'rect' as const,
    coords: [262, 422, 302, 458],
    name: 'Region L'
  },
  {
    id: 'offaly',
    shape: 'rect' as const,
    coords: [200, 424, 239, 456],
    name: 'Region M'
  },
  {
    id: 'westmeath',
    shape: 'rect' as const,
    coords: [206, 364, 258, 397],
    name: 'Region N'
  },
  {
    id: 'longford',
    shape: 'rect' as const,
    coords: [182, 324, 228, 354],
    name: 'Region O'
  },
  {
    id: 'leitrim',
    shape: 'rect' as const,
    coords: [172, 272, 209, 302],
    name: 'Region P'
  },
  {
    id: 'donegal',
    shape: 'rect' as const,
    coords: [158, 86, 206, 122],
    name: 'Region Q'
  }
];

// Sample county data with anonymized regions
const countyData: Record<string, CountyData> = {
  antrim: {
    id: 'antrim',
    name: 'Region A',
    farms: 304,
    avgYield: 28.5,
    totalVolume: 356000,
    avgFat: 4.2,
    avgProtein: 3.5,
    forecastChange: 2.8
  },
  down: {
    id: 'down',
    name: 'Region B',
    farms: 336,
    avgYield: 27.8,
    totalVolume: 384000,
    avgFat: 4.1,
    avgProtein: 3.4,
    forecastChange: 3.1
  },
  armagh: {
    id: 'armagh',
    name: 'Region C',
    farms: 272,
    avgYield: 27.2,
    totalVolume: 304000,
    avgFat: 4.0,
    avgProtein: 3.3,
    forecastChange: 2.5
  },
  tyrone: {
    id: 'tyrone',
    name: 'Region D',
    farms: 360,
    avgYield: 28.0,
    totalVolume: 414000,
    avgFat: 4.3,
    avgProtein: 3.5,
    forecastChange: 3.4
  },
  derry: {
    id: 'derry',
    name: 'Region E',
    farms: 312,
    avgYield: 27.6,
    totalVolume: 354000,
    avgFat: 4.2,
    avgProtein: 3.4,
    forecastChange: 2.9
  },
  fermanagh: {
    id: 'fermanagh',
    name: 'Region F',
    farms: 256,
    avgYield: 26.8,
    totalVolume: 282000,
    avgFat: 4.1,
    avgProtein: 3.3,
    forecastChange: 2.2
  },
  monaghan: {
    id: 'monaghan',
    name: 'Region G',
    farms: 304,
    avgYield: 27.4,
    totalVolume: 342000,
    avgFat: 4.0,
    avgProtein: 3.4,
    forecastChange: 2.7
  },
  cavan: {
    id: 'cavan',
    name: 'Region H',
    farms: 288,
    avgYield: 26.9,
    totalVolume: 318000,
    avgFat: 3.9,
    avgProtein: 3.3,
    forecastChange: 2.4
  },
  louth: {
    id: 'louth',
    name: 'Region I',
    farms: 176,
    avgYield: 27.1,
    totalVolume: 196000,
    avgFat: 4.1,
    avgProtein: 3.4,
    forecastChange: 2.6
  },
  meath: {
    id: 'meath',
    name: 'Region J',
    farms: 264,
    avgYield: 28.2,
    totalVolume: 306000,
    avgFat: 4.2,
    avgProtein: 3.5,
    forecastChange: 3.0
  },
  dublin: {
    id: 'dublin',
    name: 'Region K',
    farms: 48,
    avgYield: 26.5,
    totalVolume: 52000,
    avgFat: 3.8,
    avgProtein: 3.2,
    forecastChange: 1.8
  },
  kildare: {
    id: 'kildare',
    name: 'Region L',
    farms: 192,
    avgYield: 27.8,
    totalVolume: 220000,
    avgFat: 4.0,
    avgProtein: 3.4,
    forecastChange: 2.8
  },
  offaly: {
    id: 'offaly',
    name: 'Region M',
    farms: 224,
    avgYield: 27.5,
    totalVolume: 254000,
    avgFat: 4.1,
    avgProtein: 3.4,
    forecastChange: 2.9
  },
  westmeath: {
    id: 'westmeath',
    name: 'Region N',
    farms: 208,
    avgYield: 27.3,
    totalVolume: 234000,
    avgFat: 4.0,
    avgProtein: 3.3,
    forecastChange: 2.7
  },
  longford: {
    id: 'longford',
    name: 'Region O',
    farms: 168,
    avgYield: 26.7,
    totalVolume: 184000,
    avgFat: 3.9,
    avgProtein: 3.3,
    forecastChange: 2.3
  },
  leitrim: {
    id: 'leitrim',
    name: 'Region P',
    farms: 144,
    avgYield: 26.2,
    totalVolume: 155000,
    avgFat: 3.8,
    avgProtein: 3.2,
    forecastChange: 2.1
  },
  donegal: {
    id: 'donegal',
    name: 'Region Q',
    farms: 280,
    avgYield: 26.9,
    totalVolume: 310000,
    avgFat: 3.9,
    avgProtein: 3.3,
    forecastChange: 2.5
  }
};

export default function SupplyChainMap() {
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showForecast, setShowForecast] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Handle map load and resize
  useEffect(() => {
    const updateMapSize = () => {
      // Force re-render to update overlay positions
      setMapLoaded(true);
    };
    
    updateMapSize();
    setMapLoaded(true); 
    
    window.addEventListener('resize', updateMapSize);
    return () => window.removeEventListener('resize', updateMapSize);
  }, []);
  
  // Handle county click
  const handleCountyClick = (countyId: string) => {
    setSelectedCounty(countyId);
    setShowForecast(true);
  };
  
  // Toggle forecast visibility
  const toggleForecast = () => {
    setShowForecast(!showForecast);
  };
  
  // Create overlay elements for the clickable areas
  const renderOverlays = () => {
    return clickableAreas.map((area) => {
      if (area.shape === 'rect') {
        // For rectangular areas
        const [x1, y1, x2, y2] = area.coords;
        const left = (x1 / 500) * 100;
        const top = (y1 / 500) * 100;
        
        return (
          <div
            key={area.id}
            onClick={() => handleCountyClick(area.id)}
            className={`absolute cursor-pointer transition-all duration-300 group ${
              selectedCounty === area.id 
                ? 'bg-blue-500 bg-opacity-30 border-2 border-blue-500' 
                : 'bg-transparent border-0 hover:border-0'
            }`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${((x2 - x1) / 500) * 100}%`,
              height: `${((y2 - y1) / 500) * 100}%`,
              borderRadius: '4px',
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <span className={`text-xs font-medium px-2 py-1 rounded transition-all duration-200 shadow-sm ${
                selectedCounty === area.id 
                  ? 'bg-white text-blue-500 opacity-100' 
                  : 'bg-white bg-opacity-70 text-blue-500 opacity-0 group-hover:opacity-100'
              }`}>
                {area.name}
              </span>
            </div>
          </div>
        );
      }
      
      return null;
    });
  };
  
  // Generate forecast data for the selected county
  const generateForecastData = (county: CountyData) => {
    const currentMonth = new Date().getMonth();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const getMonthName = (offset: number) => {
      return months[(currentMonth + offset) % 12];
    };
    
    const getMonthNextName = () => getMonthName(1);
    const getMonthAfterNextName = () => getMonthName(2);
    
    const baseVolume = county.totalVolume;
    const forecastMultiplier = 1 + (county.forecastChange / 100);
    const nextMonthVolume = Math.round(baseVolume * forecastMultiplier);
    const followingMonthVolume = Math.round(baseVolume * forecastMultiplier * 1.02);
    
    return [
      {
        month: getMonthNextName(),
        volume: nextMonthVolume,
      },
      {
        month: getMonthAfterNextName(),
        volume: followingMonthVolume,
      }
    ];
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-medium text-gray-800 mb-4">
        Supply Chain Regional Map
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div 
          ref={mapRef}
          className="lg:col-span-2 border border-gray-200 rounded-lg p-4 bg-blue-50 relative h-[400px]"
        >
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs text-gray-500 z-10">
            Click on a region for details
          </div>
          
          {/* Map Image */}
          <div className="relative w-full h-full">
            {mapLoaded && (
              <Image
                src="/images/ireland_map.jpg"
                alt="Supply chain collection areas"
                fill
                style={{ objectFit: 'contain' }}
                priority
                onLoad={() => setMapLoaded(true)}
              />
            )}
            
            {/* Clickable Area Overlays */}
            {mapLoaded && renderOverlays()}
          </div>
          
          <div className="absolute bottom-2 left-2 text-xs text-gray-500 z-10">
            Regional collection areas
          </div>

          {/* Forecast Popup */}
          {selectedCounty && showForecast && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 z-20 border-2 border-blue-500 min-w-[350px]">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-800">
                  {countyData[selectedCounty].name} Forecast
                </h4>
                <button 
                  onClick={() => setShowForecast(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="h-32 mb-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={generateForecastData(countyData[selectedCounty])}>
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => {
                        if (value >= 1000000) return `${Math.round(value / 1000000)}M`;
                        if (value >= 1000) return `${Math.round(value / 1000)}K`;
                        return Math.round(value).toString();
                      }}
                    />
                    <Tooltip 
                      formatter={(value: number) => [`${Number(value).toLocaleString()} L`, 'Volume']}
                      labelFormatter={(label) => `${label}`}
                    />
                    <Bar 
                      dataKey="volume" 
                      fill="#4880E6" 
                      radius={[4, 4, 0, 0]}
                      name="Volume (L/day)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex justify-between mt-2">
                <span className="text-gray-600 text-sm">Projected Change (Next Month):</span>
                <span className="font-medium text-green-600">+{countyData[selectedCounty].forecastChange.toFixed(1)}%</span>
              </div>
              
              <p className="text-xs text-gray-500">
                Based on seasonal patterns, weather forecasts, and historical data. The chart shows daily volumes.
              </p>
            </div>
          )}
        </div>
        
        {/* Region Details Panel */}
        <div className="border border-gray-200 rounded-lg p-4">
          {selectedCounty ? (
            <>
              <h3 className="font-medium text-gray-800 mb-3">
                {countyData[selectedCounty].name} Details
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Number of Farms:</span>
                  <span className="font-medium">{countyData[selectedCounty].farms}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Average Yield (L/cow/day):</span>
                  <span className="font-medium">{countyData[selectedCounty].avgYield}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Daily Volume (L):</span>
                  <span className="font-medium">{countyData[selectedCounty].totalVolume.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Annual Volume (M liters):</span>
                  <span className="font-medium">{((countyData[selectedCounty].totalVolume * 365) / 1000000).toFixed(1)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Average Fat (%):</span>
                  <span className="font-medium">{countyData[selectedCounty].avgFat}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Average Protein (%):</span>
                  <span className="font-medium">{countyData[selectedCounty].avgProtein}</span>
                </div>

                <button
                  onClick={toggleForecast}
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm transition-colors duration-200"
                >
                  {showForecast ? 'Hide Forecast' : 'View Next Month Forecast'}
                </button>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <h3 className="font-medium text-gray-800 mb-3">
                Supply Chain Overview
              </h3>
              <div className="space-y-3 w-full">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Total Farms:</span>
                  <span className="font-medium">3,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Daily Production:</span>
                  <span className="font-medium">5.48M liters</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Annual Production:</span>
                  <span className="font-medium">2B liters</span>
                </div>
                <p className="text-gray-500 text-sm mt-3">Select a region on the map to view detailed information about milk production and farms in that area.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}