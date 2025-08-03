'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PreventiveMaintenanceSection = () => {
  const [filterType, setFilterType] = useState<'machine' | 'technician' | 'priority'>('machine');


  const maintenanceData = [
    {
      id: 'm1',
      machineName: 'Pasteurizer Unit A',
      location: 'Plant A, Line 1',
      maintenanceType: 'Preventive',
      dueDate: 'August 15, 2025',
      progress: 75,
      assignedTechnician: 'John Smith',
      priority: 'High',
      estimatedDuration: '4 hours',
      status: 'in_progress',
      healthScore: 85,
      lastMaintenance: 'July 15, 2025'
    },
    {
      id: 'm2',
      machineName: 'Mixer B',
      location: 'Plant A, Line 2',
      maintenanceType: 'Predictive',
      dueDate: 'August 18, 2025',
      progress: 0,
      assignedTechnician: 'Sarah Johnson',
      priority: 'Medium',
      estimatedDuration: '6 hours',
      status: 'scheduled',
      healthScore: 92,
      lastMaintenance: 'June 18, 2025'
    },
    {
      id: 'm3',
      machineName: 'Packaging Robot C',
      location: 'Plant B, Packaging Line A',
      maintenanceType: 'Emergency',
      dueDate: 'August 12, 2025',
      progress: 100,
      assignedTechnician: 'Mike Wilson',
      priority: 'High',
      estimatedDuration: '8 hours',
      status: 'completed',
      healthScore: 78,
      lastMaintenance: 'August 12, 2025'
    },
    {
      id: 'm4',
      machineName: 'Conveyor Belt D',
      location: 'Plant A, Line 3',
      maintenanceType: 'Routine',
      dueDate: 'August 20, 2025',
      progress: 25,
      assignedTechnician: 'John Smith',
      priority: 'Low',
      estimatedDuration: '2 hours',
      status: 'in_progress',
      healthScore: 95,
      lastMaintenance: 'July 20, 2025'
    }
  ];

  const aiPredictions = [
    {
      id: 'p1',
      machineName: 'Centrifuge Unit 2',
      location: 'Plant B, Line 2',
      predictedFailure: '2 weeks',
      probability: 85,
      recommendedAction: 'Replace bearing assembly',
      costImpact: '$5,200',
      severity: 'High'
    },
    {
      id: 'p2',
      machineName: 'Heat Exchanger A',
      location: 'Plant A, Line 1',
      predictedFailure: '1 month',
      probability: 72,
      recommendedAction: 'Clean heat transfer surfaces',
      costImpact: '$2,800',
      severity: 'Medium'
    },
    {
      id: 'p3',
      machineName: 'Pump Station 3',
      location: 'Plant A, Line 3',
      predictedFailure: '6 weeks',
      probability: 65,
      recommendedAction: 'Inspect seals and gaskets',
      costImpact: '$1,500',
      severity: 'Low'
    }
  ];

  const technicanData = [
    {
      id: 't1',
      name: 'John Smith',
      tasksCompleted: 50,
      qualityScore: 92,
      valueSaved: '$15,000',
      specialization: 'Mechanical Systems',
      currentTasks: 3,
      availability: 'Available'
    },
    {
      id: 't2',
      name: 'Sarah Johnson',
      tasksCompleted: 42,
      qualityScore: 88,
      valueSaved: '$12,500',
      specialization: 'Electrical Systems',
      currentTasks: 2,
      availability: 'Busy'
    },
    {
      id: 't3',
      name: 'Mike Wilson',
      tasksCompleted: 38,
      qualityScore: 95,
      valueSaved: '$18,200',
      specialization: 'Automation & Robotics',
      currentTasks: 1,
      availability: 'Available'
    }
  ];



  const performanceMetrics = [
    {
      metric: 'Downtime (Hours)',
      before: 120,
      after: 84,
      improvement: '30% Reduction',
      color: '#EF4444'
    },
    {
      metric: 'Costs ($)',
      before: 45000,
      after: 35000,
      improvement: '$10,000 Saved',
      color: '#F59E0B'
    },
    {
      metric: 'Production (Units)',
      before: 85000,
      after: 97750,
      improvement: '15% Increase',
      color: '#10B981'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in_progress': return 'text-blue-600';
      case 'scheduled': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#1E4B3A' }}>Preventive Maintenance</h2>
      
      {/* Filter Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setFilterType('machine')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'machine' 
                ? 'text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={filterType === 'machine' ? { backgroundColor: '#1E4B3A' } : {}}
          >
            By Machine
          </button>
          <button
            onClick={() => setFilterType('technician')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'technician' 
                ? 'text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={filterType === 'technician' ? { backgroundColor: '#1E4B3A' } : {}}
          >
            By Technician
          </button>
          <button
            onClick={() => setFilterType('priority')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterType === 'priority' 
                ? 'text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={filterType === 'priority' ? { backgroundColor: '#1E4B3A' } : {}}
          >
            By Priority
          </button>
        </div>

        {/* Machine View */}
        {filterType === 'machine' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold" style={{ color: '#1E4B3A' }}>Maintenance Schedules</h3>
              <div className="text-sm text-gray-600">
                {maintenanceData.length} machines • {maintenanceData.filter(m => m.status === 'in_progress').length} in progress
              </div>
            </div>
            
            {maintenanceData.map((maintenance) => (
              <div key={maintenance.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{maintenance.machineName}</h4>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className={`text-xs font-medium ${getPriorityColor(maintenance.priority)}`}>
                        {maintenance.priority} Priority
                      </span>
                      <span className="text-gray-500 text-sm">{maintenance.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold" style={{ color: '#1E4B3A' }}>Health: {maintenance.healthScore}%</span>
                    <div className="text-xs text-gray-600 mt-1">{maintenance.estimatedDuration}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                  <div>
                    <span className="text-gray-600 text-sm">Maintenance Type:</span>
                    <div className="mt-1 text-sm font-medium text-gray-900">{maintenance.maintenanceType}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Status:</span>
                    <div className={`mt-1 text-sm font-medium ${getStatusColor(maintenance.status)}`}>
                      {maintenance.status.replace('_', ' ').charAt(0).toUpperCase() + maintenance.status.replace('_', ' ').slice(1)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Due Date:</span>
                    <div className="mt-1 font-medium text-gray-900">{maintenance.dueDate}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Assigned Technician:</span>
                    <div className="mt-1 font-medium text-gray-900">{maintenance.assignedTechnician}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Maintenance Progress</span>
                    <span className="font-medium">{maintenance.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${maintenance.progress}%`,
                        backgroundColor: maintenance.progress === 100 ? '#10B981' : 
                                       maintenance.progress > 50 ? '#3B82F6' : '#F59E0B'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Technician View */}
        {filterType === 'technician' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold" style={{ color: '#1E4B3A' }}>Personnel Analytics</h3>
              <div className="text-sm text-gray-600">
                {technicanData.length} technicians • {technicanData.filter(t => t.availability === 'Available').length} available
              </div>
            </div>
            
            {technicanData.map((technician) => (
              <div key={technician.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{technician.name}</h4>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className={`text-xs font-medium ${
                        technician.availability === 'Available' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {technician.availability}
                      </span>
                      <span className="text-gray-500 text-sm">{technician.specialization}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold" style={{ color: '#1E4B3A' }}>{technician.valueSaved}</span>
                    <div className="text-xs text-gray-600 mt-1">Value Created</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <span className="text-gray-600 text-sm">Tasks Completed:</span>
                    <div className="mt-1 text-xl font-bold text-gray-900">{technician.tasksCompleted}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Quality Score:</span>
                    <div className="mt-1 text-xl font-bold text-blue-600">{technician.qualityScore}%</div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Current Tasks:</span>
                    <div className="mt-1 text-xl font-bold text-gray-900">{technician.currentTasks}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Priority View - AI Predictions */}
        {filterType === 'priority' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold" style={{ color: '#1E4B3A' }}>AI-Predicted Maintenance Needs</h3>
              <div className="text-sm text-gray-600">
                {aiPredictions.length} predictions • {aiPredictions.filter(p => p.severity === 'High').length} high priority
              </div>
            </div>
            
            {aiPredictions.map((prediction) => (
              <div key={prediction.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{prediction.machineName}</h4>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className={`text-xs font-medium ${getSeverityColor(prediction.severity)}`}>
                        {prediction.severity} Severity
                      </span>
                      <span className="text-gray-500 text-sm">{prediction.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-red-600">{prediction.probability}%</span>
                    <div className="text-xs text-gray-600 mt-1">Failure Probability</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <span className="text-gray-600 text-sm">Predicted Failure:</span>
                    <div className="mt-1 font-medium text-gray-900">{prediction.predictedFailure}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Recommended Action:</span>
                    <div className="mt-1 font-medium text-gray-900">{prediction.recommendedAction}</div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Cost Impact:</span>
                    <div className="mt-1 font-medium text-red-600">{prediction.costImpact}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Performance Comparison Charts */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold" style={{ color: '#1E4B3A' }}>AI Implementation Impact</h3>
          <p className="text-sm text-gray-600 mt-1">Performance comparison before and after implementing AI-driven maintenance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Performance Metrics Comparison</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="metric" 
                    tick={{ fontSize: 12 }}
                    stroke="#6B7280"
                    interval={0}
                    height={50}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#6B7280"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value: number, name: string, props: { payload?: { metric?: string } }) => {
                      const metric = props.payload?.metric || '';
                      const formatValue = metric.includes('Costs') ? `$${value.toLocaleString()}` : value.toLocaleString();
                      return [formatValue, name];
                    }}
                    labelStyle={{ color: '#374151', fontWeight: 'medium' }}
                  />
                  <Legend />
                  <Bar dataKey="before" fill="#EF4444" name="Before AI" />
                  <Bar dataKey="after" fill="#10B981" name="After AI" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Impact Summary */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Impact Summary</h4>
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{metric.metric}</span>
                  <span className="text-sm font-bold text-green-600">{metric.improvement}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Before: {metric.metric.includes('Costs') ? `$${metric.before.toLocaleString()}` : metric.before.toLocaleString()}</span>
                  <span>After: {metric.metric.includes('Costs') ? `$${metric.after.toLocaleString()}` : metric.after.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreventiveMaintenanceSection;