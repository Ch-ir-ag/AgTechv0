'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Machine } from '../types';
import { getStatusColor } from '../utils/colorScheme';

interface OperationsSectionProps {
  machines: Machine[];
}

// Generate historical data for time-series charts
const generateHistoricalData = (machine: Machine) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const baseFlow = machine.metrics.flowRate.value;
  const baseVibration = machine.metrics.vibration.value;
  const baseTemp = machine.metrics.temperature.value;
  
  return hours.map(hour => {
    const flowVariation = Math.random() * 20 - 10; // ±10 variation
    const vibrationVariation = Math.random() * 2 - 1; // ±1 variation
    const tempVariation = Math.random() * 10 - 5; // ±5 variation
    
    const flowRate = Math.max(0, baseFlow + flowVariation);
    const vibration = Math.max(0, baseVibration + vibrationVariation);
    const temperature = Math.max(0, baseTemp + tempVariation);
    
    return {
      hour: `${hour}:00`,
      flowRate: Number(flowRate.toFixed(1)),
      vibration: Number(vibration.toFixed(1)),
      temperature: Number(temperature.toFixed(1))
    };
  });
};

// Group machines by location
const groupMachinesByLocation = (machines: Machine[]) => {
  const groups: { [key: string]: Machine[] } = {};
  
  machines.forEach(machine => {
    const location = machine.location.split(',')[0]; // Get the plant part
    if (!groups[location]) {
      groups[location] = [];
    }
    groups[location].push(machine);
  });
  
  return groups;
};

const OperationsSection = ({ machines }: OperationsSectionProps) => {
  const [expandedLocationId, setExpandedLocationId] = useState<string | null>(null);
  const [expandedMachineId, setExpandedMachineId] = useState<string | null>(null);
  const [liveMetrics, setLiveMetrics] = useState<{ [key: string]: { flowRate: number; vibration: number; temperature: number } }>({});
  
  const machineGroups = groupMachinesByLocation(machines);

  // Initialize live metrics
  useEffect(() => {
    const initialMetrics: { [key: string]: { flowRate: number; vibration: number; temperature: number } } = {};
    machines.forEach(machine => {
      initialMetrics[machine.id] = {
        flowRate: machine.metrics.flowRate.value,
        vibration: machine.metrics.vibration.value,
        temperature: machine.metrics.temperature.value
      };
    });
    setLiveMetrics(initialMetrics);
  }, [machines]);

  // Update live metrics every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(machineId => {
          const machine = machines.find(m => m.id === machineId);
          if (machine && machine.status === 'running') {
            // Add small random variations to make metrics live
            const flowVariation = (Math.random() - 0.5) * 2; // ±1 variation
            const vibrationVariation = (Math.random() - 0.5) * 0.4; // ±0.2 variation
            const tempVariation = (Math.random() - 0.5) * 0.3; // ±0.15 variation for temperature
            
            updated[machineId] = {
              flowRate: Math.max(0, machine.metrics.flowRate.value + flowVariation),
              vibration: Math.max(0, machine.metrics.vibration.value + vibrationVariation),
              temperature: machine.metrics.temperature.value + tempVariation // Temperature can vary more
            };
          }
        });
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [machines]);

  const toggleLocationExpansion = (locationId: string) => {
    setExpandedLocationId(expandedLocationId === locationId ? null : locationId);
    // Reset machine expansion when changing locations
    if (expandedLocationId !== locationId) {
      setExpandedMachineId(null);
    }
  };

  const toggleMachineExpansion = (machineId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedMachineId(expandedMachineId === machineId ? null : machineId);
  };

  const getMachineStatusColor = (status: string) => {
    const statusColor = getStatusColor(status);
    return statusColor.dot;
  };

  const getMetricStatusColor = (status: string) => {
    // Map 'normal' to 'active' for consistency
    const mappedStatus = status === 'normal' ? 'active' : status;
    const statusColor = getStatusColor(mappedStatus);
    return statusColor.text;
  };

  const getLocationStatus = (machines: Machine[]) => {
    const runningCount = machines.filter(m => m.status === 'running').length;
    const totalCount = machines.length;
    return `${runningCount}/${totalCount} Running`;
  };

  const getLocationOee = (machines: Machine[]) => {
    const totalOee = machines.reduce((sum, machine) => sum + machine.oee, 0);
    return Math.round(totalOee / machines.length);
  };

  const hasAnomalies = (machine: Machine) => {
    return machine.metrics.vibration.status === 'warning' || 
           machine.metrics.vibration.status === 'critical' ||
           machine.metrics.temperature.status === 'warning' ||
           machine.metrics.temperature.status === 'critical';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#1E4B3A' }}>Operations Monitoring</h2>
      
      {/* Location Groups with Expandable Machine Details */}
      <div className="space-y-4">
        {Object.entries(machineGroups).map(([location, locationMachines]) => (
          <div key={location} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Main Location Card */}
            <motion.div 
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleLocationExpansion(location)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold text-gray-900">{location}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600">{getLocationStatus(locationMachines)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Average OEE</div>
                    <div className="text-lg font-semibold" style={{ color: '#1E4B3A' }}>{getLocationOee(locationMachines)}%</div>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedLocationId === location ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-400"
                  >
                    ↓
                  </motion.div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  {expandedLocationId === location ? 'Click to collapse machine details' : 'Click to view machines and real-time metrics'}
                </p>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{locationMachines.length}</span> machines
                </div>
              </div>
            </motion.div>

            {/* Expandable Machines Section */}
            <AnimatePresence>
              {expandedLocationId === location && (
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
                        <div className="text-xl font-bold" style={{ color: '#1E4B3A' }}>{locationMachines.length}</div>
                        <div className="text-xs text-gray-600">Total Machines</div>
                      </motion.div>
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="text-center p-3 bg-white rounded-lg shadow-sm"
                      >
                        <div className="text-xl font-bold" style={{ color: '#1E4B3A' }}>
                          {locationMachines.filter(m => m.status === 'running').length}
                        </div>
                        <div className="text-xs text-gray-600">Running</div>
                      </motion.div>
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center p-3 bg-white rounded-lg shadow-sm"
                      >
                        <div className="text-xl font-bold" style={{ color: '#1E4B3A' }}>{getLocationOee(locationMachines)}%</div>
                        <div className="text-xs text-gray-600">Average OEE</div>
                      </motion.div>
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        className="text-center p-3 bg-white rounded-lg shadow-sm"
                      >
                        <div className="text-xl font-bold" style={{ color: '#1E4B3A' }}>
                          {locationMachines.filter(m => hasAnomalies(m)).length}
                        </div>
                        <div className="text-xs text-gray-600">Anomalies</div>
                      </motion.div>
                    </div>

                    {/* Machines Section */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.35 }}
                    >
                      <h4 className="font-semibold mb-3" style={{ color: '#1E4B3A' }}>Machine Status</h4>
                      <div className="space-y-3">
                        {locationMachines.map((machine, index) => (
                          <motion.div 
                            key={machine.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 + (index * 0.1) }}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                          >
                            {/* Machine Main Card */}
                            <motion.div
                              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={(e) => toggleMachineExpansion(machine.id, e)}
                              whileHover={{ scale: 1.005 }}
                              whileTap={{ scale: 0.995 }}
                            >
                              <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                  <span className="font-medium text-gray-900">{machine.name}</span>
                                  <div className="flex items-center space-x-2">
                                    <div className={`w-2 h-2 rounded-full ${getMachineStatusColor(machine.status)}`}></div>
                                    <span className="text-sm text-gray-600 capitalize">{machine.status}</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="text-sm text-gray-600">
                                    OEE: <span className="font-medium" style={{ color: '#1E4B3A' }}>{machine.oee}%</span>
                                  </div>
                                  <motion.div
                                    animate={{ rotate: expandedMachineId === machine.id ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-gray-400 text-sm"
                                  >
                                    ↓
                                  </motion.div>
                                </div>
                              </div>
                              <div className="mt-2">
                                <p className="text-xs text-gray-500">
                                  {expandedMachineId === machine.id ? 'Click to hide detailed metrics and charts' : 'Click to view real-time metrics, historical trends, and anomaly detection'}
                                </p>
                              </div>
                            </motion.div>

                            {/* Machine Detailed Information */}
                            <AnimatePresence>
                              {expandedMachineId === machine.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                                  className="border-t border-gray-200"
                                >
                                  <div className="p-4 bg-gray-50">
                                    {(() => {
                                      const historicalData = generateHistoricalData(machine);
                                      const currentMetrics = liveMetrics[machine.id] || {
                                        flowRate: machine.metrics.flowRate.value,
                                        vibration: machine.metrics.vibration.value,
                                        temperature: machine.metrics.temperature.value
                                      };
                                      
                                      return (
                                        <div className="space-y-6">
                                          {/* Machine Details */}
                                          <motion.div
                                            initial={{ y: 15, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                          >
                                            <h5 className="font-semibold mb-3 text-sm" style={{ color: '#1E4B3A' }}>Machine Information</h5>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                              <div className="bg-white rounded-lg p-4 border">
                                                <h6 className="font-semibold mb-2 text-sm" style={{ color: '#1E4B3A' }}>Function</h6>
                                                <p className="text-sm text-gray-700">{machine.function}</p>
                                              </div>
                                              <div className="bg-white rounded-lg p-4 border">
                                                <h6 className="font-semibold mb-2 text-sm" style={{ color: '#1E4B3A' }}>Location</h6>
                                                <p className="text-sm text-gray-700">{machine.location}</p>
                                              </div>
                                              <div className="bg-white rounded-lg p-4 border">
                                                <h6 className="font-semibold mb-2 text-sm" style={{ color: '#1E4B3A' }}>Energy Usage</h6>
                                                <p className="text-sm text-gray-700">{machine.energyUsage} kWh</p>
                                              </div>
                                              <div className="bg-white rounded-lg p-4 border">
                                                <h6 className="font-semibold mb-2 text-sm" style={{ color: '#1E4B3A' }}>Historical Downtime Cost</h6>
                                                <p className="text-sm text-gray-700">€{machine.downtimeCost.toLocaleString()}</p>
                                              </div>
                                            </div>
                                          </motion.div>

                                          {/* Real-time Metrics */}
                                          <motion.div
                                            initial={{ y: 15, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                          >
                                            <h5 className="font-semibold mb-3 text-sm" style={{ color: '#1E4B3A' }}>Real-time Metrics</h5>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                              <div className="text-center p-3 bg-white rounded-lg border">
                                                <div className="text-lg font-bold" style={{ color: '#1E4B3A' }}>
                                                  {currentMetrics.flowRate.toFixed(1)} {machine.metrics.flowRate.unit}
                                                </div>
                                                <div className="text-xs text-gray-600">Flow Rate</div>
                                                <div className={`text-xs mt-1 ${getMetricStatusColor(machine.metrics.flowRate.status)}`}>
                                                  {machine.metrics.flowRate.status}
                                                </div>
                                              </div>
                                              <div className="text-center p-3 bg-white rounded-lg border">
                                                <div className="text-lg font-bold" style={{ color: '#1E4B3A' }}>
                                                  {currentMetrics.vibration.toFixed(2)} {machine.metrics.vibration.unit}
                                                </div>
                                                <div className="text-xs text-gray-600">Vibration</div>
                                                <div className={`text-xs mt-1 ${getMetricStatusColor(machine.metrics.vibration.status)}`}>
                                                  {machine.metrics.vibration.status}
                                                </div>
                                              </div>
                                              <div className="text-center p-3 bg-white rounded-lg border">
                                                <div className="text-lg font-bold" style={{ color: '#1E4B3A' }}>
                                                  {currentMetrics.temperature.toFixed(1)} {machine.metrics.temperature.unit}
                                                </div>
                                                <div className="text-xs text-gray-600">Temperature</div>
                                                <div className={`text-xs mt-1 ${getMetricStatusColor(machine.metrics.temperature.status)}`}>
                                                  {machine.metrics.temperature.status}
                                                </div>
                                              </div>
                                            </div>
                                          </motion.div>

                                          {/* Historical Charts */}
                                          <motion.div
                                            initial={{ y: 15, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                          >
                                            <h5 className="font-semibold mb-3 text-sm" style={{ color: '#1E4B3A' }}>24-Hour Historical Trends</h5>
                                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                              
                                              {/* Flow Rate Chart */}
                                              <div className="bg-white p-4 rounded-lg border">
                                                <h6 className="text-xs font-medium text-gray-700 mb-2">Flow Rate ({machine.metrics.flowRate.unit})</h6>
                                                <ResponsiveContainer width="100%" height={120}>
                                                  <LineChart data={historicalData}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                    <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                                                    <YAxis tick={{ fontSize: 10 }} />
                                                    <Tooltip />
                                                    <Line 
                                                      type="monotone" 
                                                      dataKey="flowRate" 
                                                      stroke="#1E4B3A" 
                                                      strokeWidth={2}
                                                      dot={false}
                                                    />
                                                  </LineChart>
                                                </ResponsiveContainer>
                                              </div>

                                              {/* Vibration Chart */}
                                              <div className="bg-white p-4 rounded-lg border">
                                                <h6 className="text-xs font-medium text-gray-700 mb-2">Vibration ({machine.metrics.vibration.unit})</h6>
                                                <ResponsiveContainer width="100%" height={120}>
                                                  <LineChart data={historicalData}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                    <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                                                    <YAxis tick={{ fontSize: 10 }} />
                                                    <Tooltip />
                                                    <ReferenceLine y={10} stroke="red" strokeDasharray="5 5" label={{ value: "Alert", position: "insideTopRight", fontSize: 8 }} />
                                                    <Line 
                                                      type="monotone" 
                                                      dataKey="vibration" 
                                                      stroke={machine.metrics.vibration.status === 'warning' ? '#F59E0B' : '#1E4B3A'} 
                                                      strokeWidth={2}
                                                      dot={false}
                                                    />
                                                  </LineChart>
                                                </ResponsiveContainer>
                                              </div>
                                              
                                              {/* Temperature Chart */}
                                              <div className="bg-white p-4 rounded-lg border">
                                                <h6 className="text-xs font-medium text-gray-700 mb-2">Temperature ({machine.metrics.temperature.unit})</h6>
                                                <ResponsiveContainer width="100%" height={120}>
                                                  <LineChart data={historicalData}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                    <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                                                    <YAxis tick={{ fontSize: 10 }} />
                                                    <Tooltip />
                                                    <Line 
                                                      type="monotone" 
                                                      dataKey="temperature" 
                                                      stroke="#1E4B3A" 
                                                      strokeWidth={2}
                                                      dot={false}
                                                    />
                                                  </LineChart>
                                                </ResponsiveContainer>
                                              </div>
                                            </div>
                                          </motion.div>

                                          {/* Machine Information & OEE */}
                                          <motion.div
                                            initial={{ y: 15, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                          >
                                            <div className="bg-white rounded-lg p-4 border">
                                              <h6 className="font-semibold mb-3 text-sm" style={{ color: '#1E4B3A' }}>Machine Performance</h6>
                                              <div className="space-y-3">
                                                <div className="text-center p-3 bg-green-50 rounded-lg">
                                                  <div className="text-2xl font-bold" style={{ color: '#1E4B3A' }}>{machine.oee}%</div>
                                                  <div className="text-xs text-gray-600">Overall Equipment Effectiveness (OEE)</div>
                                                </div>
                                                <div className="text-sm space-y-1">
                                                  <div className="flex justify-between">
                                                    <span className="text-gray-600">Status:</span>
                                                    <span className={`font-medium ${machine.status === 'running' ? 'text-green-600' : machine.status === 'warning' ? 'text-yellow-600' : machine.status === 'maintenance' ? 'text-orange-600' : 'text-red-600'}`}>
                                                      {machine.status}
                                                    </span>
                                                  </div>
                                                  <div className="flex justify-between">
                                                    <span className="text-gray-600">Location:</span>
                                                    <span className="font-medium">{machine.location}</span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>

                                            <div className="bg-white rounded-lg p-4 border">
                                              <h6 className="font-semibold mb-3 text-sm" style={{ color: '#1E4B3A' }}>Maintenance Schedule</h6>
                                              <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                  <span className="text-gray-600">Last Service:</span>
                                                  <span className="font-medium">{machine.lastMaintenance}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                  <span className="text-gray-600">Next Service:</span>
                                                  <span className="font-medium">{machine.nextMaintenance}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                  <span className="text-gray-600">Health Score:</span>
                                                  <span className={`font-medium ${machine.status === 'warning' ? 'text-yellow-600' : machine.oee > 80 ? 'text-green-600' : machine.oee > 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                    {machine.status === 'warning' ? 'Monitoring' : machine.oee > 80 ? 'Excellent' : machine.oee > 60 ? 'Good' : 'Needs Attention'}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </motion.div>

                                          {/* Anomaly Detection */}
                                          <motion.div
                                            initial={{ y: 15, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                          >
                                            <h5 className="font-semibold mb-3 text-sm" style={{ color: '#1E4B3A' }}>Anomaly Detection</h5>
                                            <div className={`p-4 rounded-lg border-l-4 ${hasAnomalies(machine) ? 'bg-red-50 border-red-500' : 'bg-green-50 border-green-500'}`}>
                                              <div className="flex items-start space-x-2">
                                                <div>
                                                  <h6 className={`font-medium mb-1 ${hasAnomalies(machine) ? 'text-red-900' : 'text-green-900'}`}>
                                                    {hasAnomalies(machine) ? 'Anomalies Detected' : 'All Systems Normal'}
                                                  </h6>
                                                  <div className={`text-sm ${hasAnomalies(machine) ? 'text-red-800' : 'text-green-800'}`}>
                                                    {hasAnomalies(machine) ? (
                                                      <div className="space-y-1">
                                                        {machine.metrics.vibration.status === 'warning' && (
                                                          <div>• Vibration levels elevated above normal range (Current: {currentMetrics.vibration.toFixed(2)} Hz, Threshold: 10 Hz)</div>
                                                        )}
                                                        {machine.metrics.temperature.status === 'warning' && (
                                                          <div>• Temperature variance detected</div>
                                                        )}
                                                        <div className="mt-2 font-medium">Action: Monitor closely and schedule inspection if levels persist.</div>
                                                      </div>
                                                    ) : (
                                                      "All monitored parameters are operating within normal ranges. No anomalies detected in the last 24 hours."
                                                    )}
                                                  </div>
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

export default OperationsSection;