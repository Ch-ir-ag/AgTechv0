'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// Define the county data structure
interface CountyData {
  id: string;
  name: string;
  farms: number;
  avgYield: number;
  totalVolume: number;
  avgFat: number;
  avgProtein: number;
}

// Define the clickable area coordinates
interface ClickableArea {
  id: string;
  shape: 'rect' | 'circle' | 'poly';
  coords: number[];
  name: string;
}

export default function InteractiveSupplyChainMap() {
  // State for the selected county
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Sample county data - replace with your actual data
  const countyData: Record<string, CountyData> = {
    antrim: {
      id: 'antrim',
      name: 'Antrim',
      farms: 380,
      avgYield: 28.5,
      totalVolume: 10830,
      avgFat: 4.2,
      avgProtein: 3.5
    },
    down: {
      id: 'down',
      name: 'Down',
      farms: 420,
      avgYield: 27.8,
      totalVolume: 11676,
      avgFat: 4.1,
      avgProtein: 3.4
    },
    armagh: {
      id: 'armagh',
      name: 'Armagh',
      farms: 340,
      avgYield: 27.2,
      totalVolume: 9248,
      avgFat: 4.0,
      avgProtein: 3.3
    },
    tyrone: {
      id: 'tyrone',
      name: 'Tyrone',
      farms: 450,
      avgYield: 28.0,
      totalVolume: 12600,
      avgFat: 4.3,
      avgProtein: 3.5
    },
    derry: {
      id: 'derry',
      name: 'Derry',
      farms: 390,
      avgYield: 27.6,
      totalVolume: 10764,
      avgFat: 4.2,
      avgProtein: 3.4
    },
    fermanagh: {
      id: 'fermanagh',
      name: 'Fermanagh',
      farms: 320,
      avgYield: 26.8,
      totalVolume: 8576,
      avgFat: 4.1,
      avgProtein: 3.3
    },
    monaghan: {
      id: 'monaghan',
      name: 'Monaghan',
      farms: 380,
      avgYield: 26.9,
      totalVolume: 10222,
      avgFat: 4.2,
      avgProtein: 3.4
    },
    cavan: {
      id: 'cavan',
      name: 'Cavan',
      farms: 420,
      avgYield: 27.3,
      totalVolume: 11466,
      avgFat: 4.3,
      avgProtein: 3.5
    },
    louth: {
      id: 'louth',
      name: 'Louth',
      farms: 210,
      avgYield: 25.8,
      totalVolume: 5418,
      avgFat: 4.0,
      avgProtein: 3.2
    },
    meath: {
      id: 'meath',
      name: 'Meath',
      farms: 315,
      avgYield: 26.3,
      totalVolume: 8284,
      avgFat: 4.1,
      avgProtein: 3.3
    },
    dublin: {
      id: 'dublin',
      name: 'Dublin',
      farms: 125,
      avgYield: 24.9,
      totalVolume: 3112,
      avgFat: 3.9,
      avgProtein: 3.1
    },
    kildare: {
      id: 'kildare',
      name: 'Kildare',
      farms: 190,
      avgYield: 25.5,
      totalVolume: 4845,
      avgFat: 4.0,
      avgProtein: 3.2
    },
    offaly: {
      id: 'offaly',
      name: 'Offaly',
      farms: 235,
      avgYield: 26.0,
      totalVolume: 6110,
      avgFat: 4.1,
      avgProtein: 3.3
    },
    westmeath: {
      id: 'westmeath',
      name: 'Westmeath',
      farms: 280,
      avgYield: 26.4,
      totalVolume: 7392,
      avgFat: 4.1,
      avgProtein: 3.3
    },
    longford: {
      id: 'longford',
      name: 'Longford',
      farms: 195,
      avgYield: 25.7,
      totalVolume: 5011,
      avgFat: 4.0,
      avgProtein: 3.2
    },
    leitrim: {
      id: 'leitrim',
      name: 'Leitrim',
      farms: 175,
      avgYield: 25.2,
      totalVolume: 4410,
      avgFat: 3.9,
      avgProtein: 3.1
    },
    donegal: {
      id: 'donegal',
      name: 'Donegal',
      farms: 310,
      avgYield: 26.5,
      totalVolume: 8215,
      avgFat: 4.1,
      avgProtein: 3.3
    }
  };
  
  // Define clickable areas - these coordinates need to be adjusted for your specific map
  // Format: [x1, y1, x2, y2] for rect, [x, y, radius] for circle, [x1, y1, x2, y2, ...] for poly
  // const clickableAreas: ClickableArea[] = [
  //   {
  //     id: 'cavan',
  //     shape: 'rect',
  //     coords: [100, 150, 200, 250],
  //     name: 'Cavan'
  //   },
  //   {
  //     id: 'monaghan',
  //     shape: 'rect',
  //     coords: [200, 100, 300, 200],
  //     name: 'Monaghan'
  //   },
  //   {
  //     id: 'louth',
  //     shape: 'rect',
  //     coords: [300, 150, 400, 250],
  //     name: 'Louth'
  //   },
  //   {
  //     id: 'meath',
  //     shape: 'rect',
  //     coords: [250, 250, 350, 350],
  //     name: 'Meath'
  //   },
  //   {
  //     id: 'dublin',
  //     shape: 'rect',
  //     coords: [350, 250, 450, 350],
  //     name: 'Dublin'
  //   }
  // ];
  // Clickable areas for map
const clickableAreas = [
  {
    id: 'antrim',
    shape: 'rect',
    coords: [311, 68, 351, 128],
    name: 'Antrim'
  },
  {
    id: 'down',
    shape: 'rect',
    coords: [322, 191, 365, 244],
    name: 'Down'
  },
  {
    id: 'armagh',
    shape: 'rect',
    coords: [276, 203, 310, 243],
    name: 'Armagh'
  },
  {
    id: 'tyrone',
    shape: 'rect',
    coords: [218, 136, 268, 186],
    name: 'Tyrone'
  },
  {
    id: 'derry',
    shape: 'rect',
    coords: [242, 58, 292, 108],
    name: 'Derry'
  },
  {
    id: 'fermanagh',
    shape: 'rect',
    coords: [187, 198, 236, 239],
    name: 'Fermanagh'
  },
  {
    id: 'monaghan',
    shape: 'rect',
    coords: [252, 228, 278, 263],
    name: 'Monaghan'
  },
  {
    id: 'cavan',
    shape: 'rect',
    coords: [222, 274, 257, 316],
    name: 'Cavan'
  },
  {
    id: 'louth',
    shape: 'rect',
    coords: [299, 288, 328, 327],
    name: 'Louth'
  },
  {
    id: 'meath',
    shape: 'rect',
    coords: [269, 342, 308, 384],
    name: 'Meath'
  },
  {
    id: 'dublin',
    shape: 'rect',
    coords: [320, 374, 357, 418],
    name: 'Dublin'
  },
  {
    id: 'kildare',
    shape: 'rect',
    coords: [262, 422, 302, 458],
    name: 'Kildare'
  },
  {
    id: 'offaly',
    shape: 'rect',
    coords: [200, 424, 239, 456],
    name: 'Offaly '
  },
  {
    id: 'westmeath',
    shape: 'rect',
    coords: [206, 364, 258, 397],
    name: 'Westmeath'
  },
  {
    id: 'longford ',
    shape: 'rect',
    coords: [182, 324, 228, 354],
    name: 'Longford '
  },
  {
    id: 'leitrim',
    shape: 'rect',
    coords: [172, 272, 209, 302],
    name: 'Leitrim'
  },
  {
    id: 'donegal',
    shape: 'rect',
    coords: [158, 86, 206, 122],
    name: 'Donegal'
  }
  ];
  
  // Update the map size when the component mounts or window resizes
  useEffect(() => {
    const updateMapSize = () => {
      if (mapRef.current) {
        const width = mapRef.current.clientWidth;
        const height = mapRef.current.clientHeight;
        setMapSize({ width, height });
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
  };
  
  // Create overlay elements for the clickable areas
  const renderOverlays = () => {
    return clickableAreas.map((area) => {
      if (area.shape === 'rect') {
        // For rectangular areas
        const [x1, y1, x2, y2] = area.coords;
        const left = (x1 / 500) * 100;
        const top = (y1 / 500) * 100;
        const width = ((x2 - x1) / 500) * 100;
        const height = ((y2 - y1) / 500) * 100;
        
        return (
          <div
            key={area.id}
            onClick={() => handleCountyClick(area.id)}
            className={`absolute cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:bg-opacity-40 ${
              selectedCounty === area.id ? 'bg-blue-500 bg-opacity-60' : 'bg-transparent hover:border-blue-500'
            }`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${width}%`,
              height: `${height}%`,
              border: `2px solid ${selectedCounty === area.id ? 'rgb(59, 130, 246)' : 'transparent'}`,
              borderRadius: '4px',
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                selectedCounty === area.id ? 'bg-white text-blue-500' : 'bg-white bg-opacity-0 text-transparent'
              } transition-all duration-300 hover:bg-white hover:bg-opacity-80 hover:text-blue-500`}>
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
                  <span className="text-gray-600 text-sm">Total Volume (L/day):</span>
                  <span className="font-medium">{countyData[selectedCounty].totalVolume.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Average Fat (%):</span>
                  <span className="font-medium">{countyData[selectedCounty].avgFat}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Average Protein (%):</span>
                  <span className="font-medium">{countyData[selectedCounty].avgProtein}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-gray-500">Select a county on the map to view detailed information about milk production and farms in that area.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 