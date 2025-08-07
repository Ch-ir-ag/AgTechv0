'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Define the region data structure for Wisconsin
interface RegionData {
  id: string;
  name: string;
  farms: number;
  avgYield: number;
  totalVolume: number;
  avgFat: number;
  avgProtein: number;
  forecastChange: number; // Percentage change for next 
}

// Single clickable area for Wisconsin (coordinates to be chosen by user)
const clickableAreas = [
  {
    id: 'wisconsin-region',
    shape: 'rect' as const,
    coords: [200, 150, 300, 200], // These coordinates will be adjusted by the user
    name: 'Region A'
  }
];

// Wisconsin region data
const regionData: { [key: string]: RegionData } = {
  'wisconsin-region': {
    id: 'wisconsin-region',
    name: 'Wisconsin Dairy Region',
    farms: 1250,
    avgYield: 28.5,
    totalVolume: 850000,
    avgFat: 3.8,
    avgProtein: 3.2,
    forecastChange: 4.2
  }
};

export default function SupplyChainMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showForecast, setShowForecast] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Handle map load and resize
  useEffect(() => {
    const updateMapSize = () => {
      setMapLoaded(true);
    };
    
    updateMapSize();
    setMapLoaded(true); 
    
    window.addEventListener('resize', updateMapSize);
    return () => window.removeEventListener('resize', updateMapSize);
  }, []);
  
  // Handle region click
  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId);
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
        const [x1, y1, x2, y2] = area.coords;
        const left = (x1 / 500) * 100;
        const top = (y1 / 500) * 100;
        
        return (
          <div
            key={area.id}
            onClick={() => handleRegionClick(area.id)}
            className={`absolute cursor-pointer transition-all duration-300 group ${
              selectedRegion === area.id 
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
                selectedRegion === area.id 
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
  
  // Generate forecast data for the selected region
  const generateForecastData = (region: RegionData) => {
    const currentMonth = new Date().getMonth();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const getMonthName = (offset: number) => {
      return months[(currentMonth + offset) % 12];
    };
    
    const getMonthNextName = () => getMonthName(1);
    const getMonthAfterNextName = () => getMonthName(2);
    
    const baseVolume = region.totalVolume;
    const forecastMultiplier = 1 + (region.forecastChange / 100);
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
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map Container */}
        <div 
          ref={mapRef}
          className="border border-gray-200 rounded-lg relative h-[400px] flex items-center justify-center flex-shrink-0"
        >

          
          {/* Map Image */}
          <div className="relative h-full aspect-[4/3]">
            {mapLoaded && (
              <Image
                src="/images/wisconsin.jpg"
                alt="Wisconsin supply chain collection areas"
                fill
                style={{ objectFit: 'cover' }}
                priority
                onLoad={() => setMapLoaded(true)}
              />
            )}
            
            {/* Clickable Area Overlays */}
            {mapLoaded && renderOverlays()}
          </div>
          


          {/* Forecast Popup */}
          {selectedRegion && showForecast && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-4 z-20 border-2 border-blue-500 min-w-[350px]">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-800">
                  {regionData[selectedRegion].name} Forecast
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
                  <BarChart data={generateForecastData(regionData[selectedRegion])}>
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
                <span className="font-medium text-green-600">+{regionData[selectedRegion].forecastChange.toFixed(1)}%</span>
              </div>
              
              <p className="text-xs text-gray-500">
                Based on seasonal patterns, weather forecasts, and historical data. The chart shows daily volumes.
              </p>
            </div>
          )}
        </div>
        
        {/* Region Details Panel */}
        <div className="border border-gray-200 rounded-lg p-4 flex-1 min-w-[300px]">
          {selectedRegion ? (
            <>
              <h3 className="font-medium text-gray-800 mb-3">
                {regionData[selectedRegion].name} Details
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
                  <span className="text-gray-600 text-sm">Daily Volume (L):</span>
                  <span className="font-medium">{regionData[selectedRegion].totalVolume.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Annual Volume (M liters):</span>
                  <span className="font-medium">{((regionData[selectedRegion].totalVolume * 365) / 1000000).toFixed(1)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Average Fat (%):</span>
                  <span className="font-medium">{regionData[selectedRegion].avgFat}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Average Protein (%):</span>
                  <span className="font-medium">{regionData[selectedRegion].avgProtein}</span>
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
                  <span className="font-medium">1,250</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Daily Production:</span>
                  <span className="font-medium">850K liters</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Annual Production:</span>
                  <span className="font-medium">310M liters</span>
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