'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';

export default function MapEditor() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [markers, setMarkers] = useState<Array<{id: string, x: number, y: number, width: number, height: number}>>([]);
  const [currentRegion, setCurrentRegion] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);
  const [output, setOutput] = useState('');
  
  // Update map size when the component mounts
  useEffect(() => {
    if (mapRef.current) {
      const width = mapRef.current.clientWidth;
      const height = mapRef.current.clientHeight;
    }
    
    const handleResize = () => {
      if (mapRef.current) {
        const width = mapRef.current.clientWidth;
        const height = mapRef.current.clientHeight;
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle map click to add a new region
  const handleMapClick = (e: React.MouseEvent) => {
    if (!currentRegion || selectedMarker !== null) return;
    
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setMarkers([...markers, {
        id: currentRegion,
        x,
        y,
        width: 10, // Default width in percentage
        height: 10 // Default height in percentage
      }]);
      
      setCurrentRegion('');
    }
  };
  
  // Handle mousedown on a marker for dragging
  const handleMarkerMouseDown = (e: React.MouseEvent, index: number, isCorner = false) => {
    e.stopPropagation();
    setSelectedMarker(index);
    
    if (isCorner) {
      setIsResizing(true);
    } else {
      setIsDragging(true);
    }
    
    setStartPoint({
      x: e.clientX,
      y: e.clientY
    });
  };
  
  // Handle mouse move for dragging or resizing
  const handleMouseMove = (e: React.MouseEvent) => {
    if (selectedMarker === null || (!isDragging && !isResizing)) return;
    
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      
      // Calculate movement as percentage of map size
      const deltaX = ((e.clientX - startPoint.x) / rect.width) * 100;
      const deltaY = ((e.clientY - startPoint.y) / rect.height) * 100;
      
      if (isDragging) {
        // Update marker position
        const updatedMarkers = [...markers];
        updatedMarkers[selectedMarker] = {
          ...updatedMarkers[selectedMarker],
          x: markers[selectedMarker].x + deltaX,
          y: markers[selectedMarker].y + deltaY
        };
        setMarkers(updatedMarkers);
      } else if (isResizing) {
        // Update marker size
        const updatedMarkers = [...markers];
        updatedMarkers[selectedMarker] = {
          ...updatedMarkers[selectedMarker],
          width: Math.max(5, markers[selectedMarker].width + deltaX),
          height: Math.max(5, markers[selectedMarker].height + deltaY)
        };
        setMarkers(updatedMarkers);
      }
      
      setStartPoint({
        x: e.clientX,
        y: e.clientY
      });
    }
  };
  
  // Handle mouse up to end dragging or resizing
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setSelectedMarker(null);
  };
  
  // Delete the selected marker
  const handleDeleteMarker = (index: number) => {
    const updatedMarkers = markers.filter((_, i) => i !== index);
    setMarkers(updatedMarkers);
    setSelectedMarker(null);
  };
  
  // Generate the code for the clickable areas
  const generateCode = () => {
    const code = markers.map(marker => {
      // Convert percentage values to absolute pixels (assuming a base 500x500 map for the code)
      const x1 = Math.round((marker.x / 100) * 500);
      const y1 = Math.round((marker.y / 100) * 500);
      const x2 = Math.round(((marker.x + marker.width) / 100) * 500);
      const y2 = Math.round(((marker.y + marker.height) / 100) * 500);
      
      return `{
  id: '${marker.id.toLowerCase()}',
  shape: 'rect',
  coords: [${x1}, ${y1}, ${x2}, ${y2}],
  name: '${marker.id}'
}`;
    }).join(',\n');
    
    const fullCode = `// Clickable areas for map
const clickableAreas = [
${code}
];`;
    
    setOutput(fullCode);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-[#f0f7ff]">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Map Region Editor
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Use this tool to place clickable regions on your map image.
              Add counties by entering the county name and clicking on the map.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Map Container */}
            <div 
              ref={mapRef}
              className="lg:col-span-2 border border-gray-200 rounded-lg p-4 bg-blue-50 relative h-[600px] cursor-crosshair"
              onClick={handleMapClick}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Map Image */}
              <div className="relative w-full h-full">
                <Image
                  src="/images/ireland_map.jpg"
                  alt="Ireland Map"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                  onLoad={() => setMapLoaded(true)}
                />
                
                {/* Markers */}
                {markers.map((marker, index) => (
                  <div
                    key={index}
                    className={`absolute border-2 ${selectedMarker === index ? 'border-red-500' : 'border-blue-500'} bg-blue-200 bg-opacity-40 cursor-move`}
                    style={{
                      left: `${marker.x}%`,
                      top: `${marker.y}%`,
                      width: `${marker.width}%`,
                      height: `${marker.height}%`,
                      zIndex: selectedMarker === index ? 50 : 40
                    }}
                    onMouseDown={(e) => handleMarkerMouseDown(e, index)}
                  >
                    <div className="flex items-center justify-center h-full">
                      <span className="text-xs font-bold bg-white bg-opacity-70 px-2 py-1 rounded">
                        {marker.id}
                      </span>
                    </div>
                    
                    {/* Resize handle */}
                    <div
                      className="absolute w-4 h-4 bg-red-500 rounded-full right-0 bottom-0 cursor-se-resize"
                      onMouseDown={(e) => handleMarkerMouseDown(e, index, true)}
                    />
                    
                    {/* Delete button */}
                    <button
                      className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                      onClick={() => handleDeleteMarker(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Controls */}
            <div className="border border-gray-200 rounded-lg p-4 bg-white space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Add New Region</h3>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    value={currentRegion} 
                    onChange={(e) => setCurrentRegion(e.target.value)}
                    placeholder="County name" 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition-colors"
                    onClick={() => setCurrentRegion('')}
                  >
                    Clear
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Enter a county name and click on the map to place it
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Regions ({markers.length})</h3>
                <div className="max-h-[200px] overflow-y-auto">
                  {markers.map((marker, index) => (
                    <div 
                      key={index} 
                      className={`px-3 py-2 border rounded-md mb-2 flex justify-between items-center ${selectedMarker === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                      onClick={() => setSelectedMarker(index)}
                    >
                      <span>{marker.id}</span>
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteMarker(index)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  {markers.length === 0 && (
                    <p className="text-gray-500 text-sm">No regions added yet</p>
                  )}
                </div>
              </div>
              
              <div>
                <button 
                  className="w-full bg-green-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-600 transition-colors"
                  onClick={generateCode}
                >
                  Generate Code
                </button>
              </div>
              
              {output && (
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Code Output</h3>
                  <pre className="bg-gray-800 text-green-300 p-4 rounded-md overflow-auto text-xs h-[180px]">
                    {output}
                  </pre>
                  <button 
                    className="w-full mt-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(output);
                      alert('Code copied to clipboard!');
                    }}
                  >
                    Copy to Clipboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 