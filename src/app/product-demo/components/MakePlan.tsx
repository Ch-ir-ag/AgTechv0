'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeeklyMakePlan, ProductionRun } from '../types';
import { demoData } from '../data';

interface MakePlanSectionProps {
  weeklyPlan?: WeeklyMakePlan;
}

// Default data for the component
const defaultWeeklyPlan: WeeklyMakePlan = demoData.weeklyMakePlan;

const MakePlanSection = ({ weeklyPlan = defaultWeeklyPlan }: MakePlanSectionProps) => {
  const [selectedWeek, setSelectedWeek] = useState(weeklyPlan.weekNumber);
  const [filterBy, setFilterBy] = useState<'all' | 'product' | 'underutilised' | 'margin'>('all');
  const [draggedRun, setDraggedRun] = useState<ProductionRun | null>(null);
  const [expandedLines, setExpandedLines] = useState<Set<string>>(new Set()); // Track which lines are expanded

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Ultra-muted, professional palette - almost monochromatic
  const getProductColor = (product: string): { bg: string, text: string, accent: string } => {
    const productColors: { [key: string]: { bg: string, text: string, accent: string } } = {
      'Skim Milk': { bg: 'bg-white', text: 'text-gray-700', accent: 'border-gray-200' },
      'Whole Milk': { bg: 'bg-gray-25', text: 'text-gray-700', accent: 'border-gray-200' },
      'Cream': { bg: 'bg-white', text: 'text-gray-700', accent: 'border-gray-200' },
      'Greek Yogurt Base': { bg: 'bg-gray-25', text: 'text-gray-700', accent: 'border-gray-200' },
      'Buttermilk': { bg: 'bg-white', text: 'text-gray-700', accent: 'border-gray-200' },
      'Milk Powder': { bg: 'bg-gray-25', text: 'text-gray-700', accent: 'border-gray-200' },
      'Cheese Base': { bg: 'bg-white', text: 'text-gray-700', accent: 'border-gray-200' },
      'Bottled Milk Packaging': { bg: 'bg-gray-25', text: 'text-gray-600', accent: 'border-gray-200' },
      'Yogurt Cup Packaging': { bg: 'bg-white', text: 'text-gray-600', accent: 'border-gray-200' },
      'Cream Packaging': { bg: 'bg-gray-25', text: 'text-gray-600', accent: 'border-gray-200' },
      'Mixed Packaging': { bg: 'bg-white', text: 'text-gray-600', accent: 'border-gray-200' },
      'CIP Cleaning': { bg: 'bg-gray-100', text: 'text-gray-500', accent: 'border-gray-300' }
    };
    return productColors[product] || { bg: 'bg-white', text: 'text-gray-700', accent: 'border-gray-200' };
  };

  // Status indicator for elegant design
  const getStatusIndicator = (status: string): { dot: string, bg: string } => {
    switch (status) {
      case 'Planned': return { dot: 'bg-blue-400', bg: 'bg-blue-25' };
      case 'Confirmed': return { dot: 'bg-green-400', bg: 'bg-green-25' };
      case 'In Progress': return { dot: 'bg-yellow-400', bg: 'bg-yellow-25' };
      case 'Completed': return { dot: 'bg-gray-400', bg: 'bg-gray-25' };
      default: return { dot: 'bg-gray-400', bg: 'bg-white' };
    }
  };





  // Handle drag start
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, run: ProductionRun) => {
    setDraggedRun(run);
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
    }
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetDay: string, targetLine: string) => {
    e.preventDefault();
    if (draggedRun) {
      // In a real implementation, this would update the backend
      console.log(`Moving run ${draggedRun.id} to ${targetDay} on ${targetLine}`);
      setDraggedRun(null);
    }
  };

  // Filter runs based on selected filter
  const getFilteredSchedules = () => {
    if (filterBy === 'all') return weeklyPlan.schedules;
    
    return weeklyPlan.schedules.map(schedule => ({
      ...schedule,
      runs: schedule.runs.filter(run => {
        switch (filterBy) {
          case 'product':
            return !run.product.includes('CIP') && !run.product.includes('Packaging');
          case 'underutilised':
            return schedule.runs.length < 4; // Lines with fewer runs
          case 'margin':
            return run.product.includes('Cream') || run.product.includes('Greek');
          default:
            return true;
        }
      })
    }));
  };

  const filteredSchedules = getFilteredSchedules();

  // Toggle line expansion
  const toggleLineExpansion = (lineId: string) => {
    const newExpanded = new Set(expandedLines);
    if (newExpanded.has(lineId)) {
      newExpanded.delete(lineId);
    } else {
      newExpanded.add(lineId);
    }
    setExpandedLines(newExpanded);
  };

  // Expand/collapse all lines
  const toggleAllLines = () => {
    if (expandedLines.size === filteredSchedules.length) {
      setExpandedLines(new Set()); // Collapse all
    } else {
      setExpandedLines(new Set(filteredSchedules.map(s => s.lineId))); // Expand all
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold" style={{ color: '#1E4B3A' }}>
          Weekly Make Plan
        </h2>
        
        {/* Week Selector and Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Week:</label>
            <select 
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[30, 31, 32, 33, 34].map(week => (
                <option key={week} value={week}>Week {week}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Filter:</label>
            <select 
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as 'all' | 'product' | 'underutilised' | 'margin')}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Lines</option>
              <option value="product">Product Only</option>
              <option value="underutilised">Underutilised Lines</option>
              <option value="margin">High Margin Products</option>
            </select>
          </div>
          
          <button
            onClick={toggleAllLines}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            {expandedLines.size === filteredSchedules.length ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      {/* Production Lines List */}
      <div className="space-y-3">
        {filteredSchedules.map((schedule, lineIndex) => (
          <motion.div 
            key={schedule.lineId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: lineIndex * 0.05 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            {/* Clickable Line Header */}
            <motion.div
              onClick={() => toggleLineExpansion(schedule.lineId)}
              whileHover={{ backgroundColor: '#f9fafb' }}
              className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <div className="font-semibold text-gray-900">{schedule.line}</div>
                  <div className="text-sm text-gray-500">
                    {schedule.runs.length} runs scheduled
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {schedule.runs.slice(0, 4).map((run, idx) => {
                    const statusIndicator = getStatusIndicator(run.status);
                    return (
                      <div key={idx} className={`w-2 h-2 rounded-full ${statusIndicator.dot}`}></div>
                    );
                  })}
                  {schedule.runs.length > 4 && (
                    <div className="text-xs text-gray-400 ml-1">+{schedule.runs.length - 4}</div>
                  )}
                </div>
              </div>
              <motion.div
                animate={{ rotate: expandedLines.has(schedule.lineId) ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-400"
              >
                ↓
              </motion.div>
            </motion.div>

            {/* Expandable Calendar for This Line */}
            <AnimatePresence>
              {expandedLines.has(schedule.lineId) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="border-t border-gray-200"
                >
                  <div className="p-4 bg-gray-50">
                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-3 mb-4">
                      {days.map((day, index) => (
                        <motion.div 
                          key={day}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="text-sm font-medium text-gray-700 text-center p-2 bg-white rounded-md"
                        >
                          {day.substring(0, 3)}
                        </motion.div>
                      ))}
                    </div>

                    {/* Weekly Schedule for This Line */}
                    <div className="grid grid-cols-7 gap-3">
                      {days.map((day, dayIndex) => {
                        const dayRuns = schedule.runs.filter(run => run.day === day);
                        
                        return (
                          <motion.div 
                            key={`${schedule.lineId}-${day}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + (dayIndex * 0.05) }}
                            className="min-h-[120px] bg-white rounded-md border border-gray-200 p-2"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, day, schedule.line)}
                          >
                            <div className="space-y-2">
                              {dayRuns.map((run, runIndex) => {
                                const colors = getProductColor(run.product);
                                const statusIndicator = getStatusIndicator(run.status);
                                
                                return (
                                  <motion.div
                                    key={run.id}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ 
                                      delay: runIndex * 0.1,
                                      type: "spring",
                                      stiffness: 300,
                                      damping: 25
                                    }}
                                    whileHover={{ 
                                      scale: 1.02,
                                      transition: { duration: 0.2 }
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    draggable
                                    onDragStart={(e: unknown) => handleDragStart(e as React.DragEvent<HTMLDivElement>, run)}
                                    className={`
                                      relative rounded-md border p-2 transition-all duration-200
                                      ${colors.bg} ${colors.accent}
                                    `}
                                  >
                                    {/* Status Dot */}
                                    <div className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${statusIndicator.dot}`}></div>
                                    
                                    {/* Product Name */}
                                    <div className={`text-xs font-medium truncate pr-3 ${colors.text}`}>
                                      {run.product}
                                    </div>
                                    
                                    {/* Time Range */}
                                    <div className="text-xs text-gray-500 mt-1">
                                      {run.startTime}–{run.endTime}
                                    </div>
                                    
                                    {/* Volume (if not cleaning) */}
                                    {run.volume > 0 && (
                                      <div className="text-xs text-gray-400 mt-0.5">
                                        {(run.volume / 1000).toFixed(0)}k L
                                      </div>
                                    )}


                                  </motion.div>
                                );
                              })}
                              
                              {/* Empty day indicator */}
                              {dayRuns.length === 0 && (
                                <div className="text-xs text-gray-400 italic text-center py-4">
                                  No runs scheduled
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>



      {/* Summary Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { 
            label: 'Total Runs', 
            value: weeklyPlan.schedules.reduce((sum, s) => sum + s.runs.length, 0)
          },
          { 
            label: 'Active Lines', 
            value: weeklyPlan.schedules.length
          },
          { 
            label: 'Planned Volume', 
            value: `${Math.round(weeklyPlan.schedules.reduce((sum, s) => sum + s.runs.reduce((runSum, r) => runSum + r.volume, 0), 0) / 1000)}k L`
          },
          { 
            label: 'Utilisation', 
            value: '87%'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center hover:shadow-md transition-shadow duration-200"
          >
            <div className="text-2xl font-bold text-gray-700 mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-gray-500">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MakePlanSection;