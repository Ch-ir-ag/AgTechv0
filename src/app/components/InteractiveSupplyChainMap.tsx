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
    name: 'Antrim'
  },
  {
    id: 'down',
    shape: 'rect' as const,
    coords: [322, 191, 365, 244],
    name: 'Down'
  },
  {
    id: 'armagh',
    shape: 'rect' as const,
    coords: [276, 203, 310, 243],
    name: 'Armagh'
  },
  {
    id: 'tyrone',
    shape: 'rect' as const,
    coords: [218, 136, 268, 186],
    name: 'Tyrone'
  },
  {
    id: 'derry',
    shape: 'rect' as const,
    coords: [242, 58, 292, 108],
    name: 'Derry'
  },
  {
    id: 'fermanagh',
    shape: 'rect' as const,
    coords: [187, 198, 236, 239],
    name: 'Fermanagh'
  },
  {
    id: 'monaghan',
    shape: 'rect' as const,
    coords: [252, 228, 278, 263],
    name: 'Monaghan'
  },
  {
    id: 'cavan',
    shape: 'rect' as const,
    coords: [222, 274, 257, 316],
    name: 'Cavan'
  },
  {
    id: 'louth',
    shape: 'rect' as const,
    coords: [299, 288, 328, 327],
    name: 'Louth'
  },
  {
    id: 'meath',
    shape: 'rect' as const,
    coords: [269, 342, 308, 384],
    name: 'Meath'
  },
  {
    id: 'dublin',
    shape: 'rect' as const,
    coords: [320, 374, 357, 418],
    name: 'Dublin'
  },
  {
    id: 'kildare',
    shape: 'rect' as const,
    coords: [262, 422, 302, 458],
    name: 'Kildare'
  },
  {
    id: 'offaly',
    shape: 'rect' as const,
    coords: [200, 424, 239, 456],
    name: 'Offaly '
  },
  {
    id: 'westmeath',
    shape: 'rect' as const,
    coords: [206, 364, 258, 397],
    name: 'Westmeath'
  },
  {
    id: 'longford',
    shape: 'rect' as const,
    coords: [182, 324, 228, 354],
    name: 'Longford '
  },
  {
    id: 'leitrim',
    shape: 'rect' as const,
    coords: [172, 272, 209, 302],
    name: 'Leitrim'
  },
  {
    id: 'donegal',
    shape: 'rect' as const,
    coords: [158, 86, 206, 122],
    name: 'Donegal'
  }
];

export default function InteractiveSupplyChainMap() {
  // State for the selected county
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showForecast, setShowForecast] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Sample county data - replace with your actual data
  const countyData: Record<string, CountyData> = {
    antrim: {
      id: 'antrim',
      name: 'Antrim',
      farms: 304,
      avgYield: 28.5,
      totalVolume: 356000,
      avgFat: 4.2,
      avgProtein: 3.5,
      forecastChange: 2.8
    },
    down: {
      id: 'down',
      name: 'Down',
      farms: 336,
      avgYield: 27.8,
      totalVolume: 384000,
      avgFat: 4.1,
      avgProtein: 3.4,
      forecastChange: 3.1
    },
    armagh: {
      id: 'armagh',
      name: 'Armagh',
      farms: 272,
      avgYield: 27.2,
      totalVolume: 304000,
      avgFat: 4.0,
      avgProtein: 3.3,
      forecastChange: 2.5
    },
    tyrone: {
      id: 'tyrone',
      name: 'Tyrone',
      farms: 360,
      avgYield: 28.0,
      totalVolume: 414000,
      avgFat: 4.3,
      avgProtein: 3.5,
      forecastChange: 3.4
    },
    derry: {
      id: 'derry',
      name: 'Derry',
      farms: 312,
      avgYield: 27.6,
      totalVolume: 354000,
      avgFat: 4.2,
      avgProtein: 3.4,
      forecastChange: 2.9
    },
    fermanagh: {
      id: 'fermanagh',
      name: 'Fermanagh',
      farms: 256,
      avgYield: 26.8,
      totalVolume: 282000,
      avgFat: 4.1,
      avgProtein: 3.3,
      forecastChange: 2.2
    },
    monaghan: {
      id: 'monaghan',
      name: 'Monaghan',
      farms: 304,
      avgYield: 26.9,
      totalVolume: 336000,
      avgFat: 4.2,
      avgProtein: 3.4,
      forecastChange: 3.0
    },
    cavan: {
      id: 'cavan',
      name: 'Cavan',
      farms: 336,
      avgYield: 27.3,
      totalVolume: 377000,
      avgFat: 4.3,
      avgProtein: 3.5,
      forecastChange: 3.2
    },
    louth: {
      id: 'louth',
      name: 'Louth',
      farms: 168,
      avgYield: 25.8,
      totalVolume: 178000,
      avgFat: 4.0,
      avgProtein: 3.2,
      forecastChange: 1.8
    },
    meath: {
      id: 'meath',
      name: 'Meath',
      farms: 252,
      avgYield: 26.3,
      totalVolume: 272000,
      avgFat: 4.1,
      avgProtein: 3.3,
      forecastChange: 2.6
    },
    dublin: {
      id: 'dublin',
      name: 'Dublin',
      farms: 100,
      avgYield: 24.9,
      totalVolume: 102000,
      avgFat: 3.9,
      avgProtein: 3.1,
      forecastChange: 1.2
    },
    kildare: {
      id: 'kildare',
      name: 'Kildare',
      farms: 152,
      avgYield: 25.5,
      totalVolume: 159000,
      avgFat: 4.0,
      avgProtein: 3.2,
      forecastChange: 1.6
    },
    offaly: {
      id: 'offaly',
      name: 'Offaly',
      farms: 188,
      avgYield: 26.0,
      totalVolume: 201000,
      avgFat: 4.1,
      avgProtein: 3.3,
      forecastChange: 2.0
    },
    westmeath: {
      id: 'westmeath',
      name: 'Westmeath',
      farms: 224,
      avgYield: 26.4,
      totalVolume: 243000,
      avgFat: 4.1,
      avgProtein: 3.3,
      forecastChange: 2.3
    },
    longford: {
      id: 'longford',
      name: 'Longford',
      farms: 156,
      avgYield: 25.7,
      totalVolume: 165000,
      avgFat: 4.0,
      avgProtein: 3.2,
      forecastChange: 1.7
    },
    leitrim: {
      id: 'leitrim',
      name: 'Leitrim',
      farms: 140,
      avgYield: 25.2,
      totalVolume: 145000,
      avgFat: 3.9,
      avgProtein: 3.1,
      forecastChange: 1.5
    },
    donegal: {
      id: 'donegal',
      name: 'Donegal',
      farms: 248,
      avgYield: 26.5,
      totalVolume: 270000,
      avgFat: 4.1,
      avgProtein: 3.3,
      forecastChange: 2.7
    }
  };
  
  // Update the map size when the component mounts or window resizes
  useEffect(() => {
    const updateMapSize = () => {
      if (mapRef.current) {
        // width and height removed
        // No need to set values we don't use
      }
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
      
      // Add support for other shapes as needed (circle, poly)
      return null;
    });
  };
  
  // Get current month name
  const getCurrentMonthName = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMonth = new Date().getMonth();
    return months[currentMonth];
  };

  // Get next month name
  const getNextMonthName = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const nextMonth = (new Date().getMonth() + 1) % 12;
    return months[nextMonth];
  };

  // Get the month after next
  const getMonthAfterNextName = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthAfterNext = (new Date().getMonth() + 2) % 12;
    return months[monthAfterNext];
  };

  // Get forecast data for the selected county
  const getForecastData = (countyId: string) => {
    const county = countyData[countyId];
    const currentVolume = county.totalVolume;
    const nextMonthVolume = Math.round(currentVolume * (1 + county.forecastChange / 100));
    
    // Assuming a slight increase for the month after next
    const followingMonthChange = county.forecastChange * 1.1; // 10% higher than next month
    const followingMonthVolume = Math.round(currentVolume * (1 + followingMonthChange / 100));
    
    return [
      {
        month: getCurrentMonthName(),
        volume: currentVolume,
      },
      {
        month: getNextMonthName(),
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
        Lakeland Dairies Supply Chain Map
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div 
          ref={mapRef}
          className="lg:col-span-2 border border-gray-200 rounded-lg p-4 bg-blue-50 relative h-[400px]"
        >
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs text-gray-500 z-10">
            Click on a county for details
          </div>
          
          {/* Map Image */}
          <div className="relative w-full h-full">
            {mapLoaded && (
              <Image
                src="/images/ireland_map.jpg" // You'll need to add this image to your public/images folder
                alt="Ireland Map"
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
            Lakeland Dairies collection areas
          </div>

          {/* Forecast Popup */}
          {selectedCounty && showForecast && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 z-20 border-2 border-blue-500 min-w-[350px]">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-800">
                  {countyData[selectedCounty].name} County Forecast
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
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700">3-Month Milk Yield Forecast</span>
                </div>
                
                <div className="h-[200px] w-full bg-blue-50 p-2 rounded-md">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getForecastData(selectedCounty)}
                      margin={{ top: 20, right: 10, left: 10, bottom: 30 }}
                    >
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
                        formatter={(value: any) => [`${Number(value).toLocaleString()} L`, 'Volume']}
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
            </div>
          )}
        </div>
        
        {/* County Details Panel */}
        <div className="border border-gray-200 rounded-lg p-4">
          {selectedCounty ? (
            <>
              <h3 className="font-medium text-gray-800 mb-3">
                {countyData[selectedCounty].name} County Details
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
                Lakeland Dairies Summary
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
                <p className="text-gray-500 text-sm mt-3">Select a county on the map to view detailed information about milk production and farms in that area.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 