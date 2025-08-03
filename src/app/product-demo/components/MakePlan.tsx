'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductionLine } from '../types';

interface MakePlanSectionProps {
  lines: ProductionLine[];
}

const MakePlanSection = ({ lines }: MakePlanSectionProps) => {
  const [expandedLineId, setExpandedLineId] = useState<string | null>(null);
  const [expandedSubLineId, setExpandedSubLineId] = useState<string | null>(null);

  const toggleExpansion = (lineId: string) => {
    setExpandedLineId(expandedLineId === lineId ? null : lineId);
    // Reset subline expansion when changing production lines
    if (expandedLineId !== lineId) {
      setExpandedSubLineId(null);
    }
  };

  const toggleSubLineExpansion = (subLineId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent expansion
    setExpandedSubLineId(expandedSubLineId === subLineId ? null : subLineId);
  };

  const getSubLineDetails = (subLineId: string, parentLine: ProductionLine) => {
    // Generate detailed metrics for each subline
    const baseTemp = subLineId.includes('1A') ? 72 : subLineId.includes('1B') ? 74 : 
                    subLineId.includes('2A') ? 0 : subLineId.includes('2B') ? 0 :
                    subLineId.includes('3A') ? 0 : 68;
    const basePressure = subLineId.includes('1A') ? 2.8 : subLineId.includes('1B') ? 2.9 : 
                        subLineId.includes('2A') ? 0 : subLineId.includes('2B') ? 0 :
                        subLineId.includes('3A') ? 0 : 2.7;
    const baseFlow = subLineId.includes('1A') ? 145 : subLineId.includes('1B') ? 155 : 
                    subLineId.includes('2A') ? 0 : subLineId.includes('2B') ? 0 :
                    subLineId.includes('3A') ? 0 : 140;

    return {
      temperature: { value: baseTemp, unit: '°C', status: baseTemp > 0 ? 'normal' : 'offline' },
      pressure: { value: basePressure, unit: 'bar', status: basePressure > 0 ? 'normal' : 'offline' },
      flowRate: { value: baseFlow, unit: 'L/min', status: baseFlow > 0 ? 'normal' : 'offline' },
      vibration: { value: baseTemp > 0 ? 3.2 + Math.random() * 0.8 : 0, unit: 'Hz', status: baseTemp > 0 ? 'normal' : 'offline' },
      lastMaintenance: baseTemp > 0 ? '2025-01-10' : 'N/A',
      nextMaintenance: baseTemp > 0 ? '2025-02-10' : 'Scheduled after restart',
      operator: baseTemp > 0 ? 'Tech A' : 'Unassigned',
      efficiency: baseTemp > 0 ? 88 + Math.floor(Math.random() * 8) : 0
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'down': return 'bg-red-500';
      case 'maintenance': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getCleaningStatusColor = (status: string) => {
    switch (status) {
      case 'clean': return 'text-green-600';
      case 'needs_cleaning': return 'text-yellow-600';
      case 'cleaning': return 'text-green-700';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#1E4B3A' }}>Production Planning</h2>
      
      {/* Production Lines with Expandable Details */}
      <div className="space-y-4">
        {lines.map((line) => (
          <div key={line.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Main Production Line Card */}
            <motion.div 
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleExpansion(line.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {line.name} - {line.name.includes('Line 1') ? 'Yogurt' : 
                                  line.name.includes('Line 2') ? 'Cheese' : 
                                  line.name.includes('Line 3') ? 'Milk Powder' : 
                                  line.name.includes('Packaging') ? 'Packaging' : 'Production'}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(line.status)}`}></div>
                    <span className="text-sm font-medium text-gray-600 capitalize">{line.status}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Utilization</div>
                    <div className="text-lg font-semibold" style={{ color: '#1E4B3A' }}>{line.utilizationPercentage}%</div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedLineId === line.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-400"
                  >
                    ↓
                  </motion.div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {expandedLineId === line.id ? 'Click to collapse details' : 'Click to view sublines and metrics'}
                </p>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{line.currentRate}</span>/{line.capacity} units/hr
                </div>
              </div>
            </motion.div>

            {/* Expandable Details Section */}
            <AnimatePresence>
              {expandedLineId === line.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="border-t border-gray-200"
                >
                  <div className="p-6 bg-gray-50">
                    {/* Quick Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-center p-3 bg-white rounded-lg shadow-sm"
                      >
                        <div className="text-xl font-bold" style={{ color: '#1E4B3A' }}>{line.capacity}</div>
                        <div className="text-xs text-gray-600">Capacity</div>
                      </motion.div>
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="text-center p-3 bg-white rounded-lg shadow-sm"
                      >
                        <div className="text-xl font-bold" style={{ color: '#1E4B3A' }}>{line.currentRate}</div>
                        <div className="text-xs text-gray-600">Current Rate</div>
                      </motion.div>
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center p-3 bg-white rounded-lg shadow-sm"
                      >
                        <div className="text-xl font-bold" style={{ color: '#1E4B3A' }}>{line.utilizationPercentage}%</div>
                        <div className="text-xs text-gray-600">Utilization</div>
                      </motion.div>
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        className="text-center p-3 bg-white rounded-lg shadow-sm"
                      >
                        <div className="text-xl font-bold" style={{ color: '#1E4B3A' }}>{line.oee}%</div>
                        <div className="text-xs text-gray-600">OEE</div>
                      </motion.div>
                    </div>

                    {/* Utilization Progress Bar */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mb-6"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">Utilization Progress</span>
                        <span className="text-sm text-gray-600">{line.utilizationPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${line.utilizationPercentage}%` }}
                          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
                          className={`h-2 rounded-full ${line.utilizationPercentage > 80 ? 'bg-green-500' : line.utilizationPercentage > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        ></motion.div>
                      </div>
                    </motion.div>

                    {/* Sub-lines Section */}
                    {line.subLines.length > 0 && (
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.35 }}
                      >
                        <h4 className="font-semibold mb-3" style={{ color: '#1E4B3A' }}>Sub-line Status</h4>
                        <div className="space-y-3">
                          {line.subLines.map((subLine, index) => (
                            <motion.div 
                              key={subLine.id}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.4 + (index * 0.1) }}
                              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                            >
                              {/* Subline Main Card */}
                              <motion.div
                                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={(e) => toggleSubLineExpansion(subLine.id, e)}
                                whileHover={{ scale: 1.005 }}
                                whileTap={{ scale: 0.995 }}
                              >
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center space-x-3">
                                    <span className="font-medium text-gray-900">{subLine.name}</span>
                                    <div className="flex items-center space-x-2">
                                      <div className={`w-2 h-2 rounded-full ${getStatusColor(subLine.status)}`}></div>
                                      <span className="text-sm text-gray-600 capitalize">{subLine.status}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <div className="text-sm text-gray-600">
                                      Rate: <span className="font-medium" style={{ color: '#1E4B3A' }}>{subLine.rate} units/hour</span>
                                    </div>
                                    <motion.div
                                      animate={{ rotate: expandedSubLineId === subLine.id ? 180 : 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="text-gray-400 text-sm"
                                    >
                                      ↓
                                    </motion.div>
                                  </div>
                                </div>
                                <div className="mt-2">
                                  <p className="text-xs text-gray-500">
                                    {expandedSubLineId === subLine.id ? 'Click to hide machine details' : 'Click to view machine details and metrics'}
                                  </p>
                                </div>
                              </motion.div>

                              {/* Subline Detailed Information */}
                              <AnimatePresence>
                                {expandedSubLineId === subLine.id && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="border-t border-gray-200"
                                  >
                                    <div className="p-4 bg-gray-50">
                                      {(() => {
                                        const details = getSubLineDetails(subLine.id, line);
                                        return (
                                          <div className="space-y-4">
                                            {/* Machine Metrics */}
                                            <motion.div
                                              initial={{ y: 15, opacity: 0 }}
                                              animate={{ y: 0, opacity: 1 }}
                                              transition={{ delay: 0.1 }}
                                            >
                                              <h5 className="font-semibold mb-3 text-sm" style={{ color: '#1E4B3A' }}>Real-time Metrics</h5>
                                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                <div className="text-center p-3 bg-white rounded-lg border">
                                                  <div className="text-lg font-bold" style={{ color: '#1E4B3A' }}>
                                                    {details.temperature.value}{details.temperature.unit}
                                                  </div>
                                                  <div className="text-xs text-gray-600">Temperature</div>
                                                  <div className={`text-xs mt-1 ${details.temperature.status === 'normal' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {details.temperature.status}
                                                  </div>
                                                </div>
                                                <div className="text-center p-3 bg-white rounded-lg border">
                                                  <div className="text-lg font-bold" style={{ color: '#1E4B3A' }}>
                                                    {details.pressure.value}{details.pressure.unit}
                                                  </div>
                                                  <div className="text-xs text-gray-600">Pressure</div>
                                                  <div className={`text-xs mt-1 ${details.pressure.status === 'normal' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {details.pressure.status}
                                                  </div>
                                                </div>
                                                <div className="text-center p-3 bg-white rounded-lg border">
                                                  <div className="text-lg font-bold" style={{ color: '#1E4B3A' }}>
                                                    {details.flowRate.value}{details.flowRate.unit}
                                                  </div>
                                                  <div className="text-xs text-gray-600">Flow Rate</div>
                                                  <div className={`text-xs mt-1 ${details.flowRate.status === 'normal' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {details.flowRate.status}
                                                  </div>
                                                </div>
                                                <div className="text-center p-3 bg-white rounded-lg border">
                                                  <div className="text-lg font-bold" style={{ color: '#1E4B3A' }}>
                                                    {details.vibration.value.toFixed(1)}{details.vibration.unit}
                                                  </div>
                                                  <div className="text-xs text-gray-600">Vibration</div>
                                                  <div className={`text-xs mt-1 ${details.vibration.status === 'normal' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {details.vibration.status}
                                                  </div>
                                                </div>
                                              </div>
                                            </motion.div>

                                            {/* Machine Information */}
                                            <motion.div
                                              initial={{ y: 15, opacity: 0 }}
                                              animate={{ y: 0, opacity: 1 }}
                                              transition={{ delay: 0.2 }}
                                              className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                            >
                                              <div className="bg-white rounded-lg p-3 border">
                                                <h6 className="font-semibold mb-2 text-sm" style={{ color: '#1E4B3A' }}>Machine Status</h6>
                                                <div className="space-y-1 text-sm">
                                                  <div className="flex justify-between">
                                                    <span className="text-gray-600">Efficiency:</span>
                                                    <span className="font-medium">{details.efficiency}%</span>
                                                  </div>
                                                  <div className="flex justify-between">
                                                    <span className="text-gray-600">Operator:</span>
                                                    <span className="font-medium">{details.operator}</span>
                                                  </div>
                                                  <div className="flex justify-between">
                                                    <span className="text-gray-600">Status:</span>
                                                    <span className={`font-medium ${subLine.status === 'running' ? 'text-green-600' : subLine.status === 'idle' ? 'text-yellow-600' : 'text-red-600'}`}>
                                                      {subLine.status}
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                              
                                              <div className="bg-white rounded-lg p-3 border">
                                                <h6 className="font-semibold mb-2 text-sm" style={{ color: '#1E4B3A' }}>Maintenance Schedule</h6>
                                                <div className="space-y-1 text-sm">
                                                  <div className="flex justify-between">
                                                    <span className="text-gray-600">Last Service:</span>
                                                    <span className="font-medium">{details.lastMaintenance}</span>
                                                  </div>
                                                  <div className="flex justify-between">
                                                    <span className="text-gray-600">Next Service:</span>
                                                    <span className="font-medium">{details.nextMaintenance}</span>
                                                  </div>
                                                  <div className="flex justify-between">
                                                    <span className="text-gray-600">Health Score:</span>
                                                    <span className="font-medium text-green-600">
                                                      {details.efficiency > 0 ? 'Good' : 'Offline'}
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </motion.div>
                                          </div>
                                        );
                                      })()}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Additional Details */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.45 }}
                      className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-semibold mb-3" style={{ color: '#1E4B3A' }}>Performance Details</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className={`font-medium ${line.status === 'running' ? 'text-green-600' : line.status === 'idle' ? 'text-yellow-600' : 'text-red-600'}`}>
                              {line.status}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Cleaning Status:</span>
                            <span className={`font-medium ${getCleaningStatusColor(line.cleaningStatus)}`}>
                              {line.cleaningStatus.replace('_', ' ')}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Shift:</span>
                            <span className="font-medium text-gray-900">Day Shift (6AM - 2PM)</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-semibold mb-3" style={{ color: '#1E4B3A' }}>Product Information</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Product Type:</span>
                            <span className="font-medium text-gray-900">
                              {line.name.includes('Line 1') ? 'Yogurt' : 
                               line.name.includes('Line 2') ? 'Cheese' : 
                               line.name.includes('Line 3') ? 'Milk Powder' : 
                               line.name.includes('Packaging') ? 'Packaging' : 'Mixed Production'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Operator:</span>
                            <span className="font-medium text-gray-900">Team Lead A</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Compliance:</span>
                            <span className="font-medium text-green-600">✓ Certified</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MakePlanSection;