'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import './styles.css';
import TippingPointDetection from './components/TippingPointDetection';
import SensitivityAnalysis from './components/SensitivityAnalysis';
import ScenarioPlanning from './components/ScenarioPlanning';

// Navigation sections following product-demo structure
const navigationSections = [
  { id: 'tipping-point', label: 'Tipping Point Detection', clickable: true },
  { id: 'sensitivity', label: 'Sensitivity Analysis', clickable: true },
  { id: 'scenario-planning', label: 'Scenario Planning', clickable: true },
];

// Main Component
export default function CommodityDemo() {
  const [activeSection, setActiveSection] = useState('tipping-point');

  const renderSection = () => {
    switch (activeSection) {
      case 'tipping-point':
        return <TippingPointDetection />;
      case 'sensitivity':
        return <SensitivityAnalysis />;
      case 'scenario-planning':
        return <ScenarioPlanning />;
      default:
        return <TippingPointDetection />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen commodity-demo" style={{ backgroundColor: '#F7F5F0' }}>
      <Navbar />
      
      <main className="flex-1 pt-16 pb-12">
        <div className="flex h-full">
          {/* Left Navigation */}
          <div className="w-64 bg-white shadow-sm border-r border-gray-200" style={{ minHeight: 'calc(100vh - 80px)' }}>
            <div className="p-6">
              <h1 className="text-xl font-bold mb-2" style={{ color: '#1E4B3A' }}>Commodity Decision Support</h1>
              <p className="text-sm mb-6" style={{ color: '#1E4B3A', opacity: 0.7 }}>Scenario • Tipping • Sensitivity</p>
              
              <nav className="space-y-2">
                {navigationSections.map((section) => (
                  <motion.button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg relative overflow-hidden ${
                      activeSection === section.id
                        ? 'text-white border-l-4'
                        : 'hover:bg-gray-50'
                    }`}
                    style={activeSection === section.id ? {
                      backgroundColor: '#1E4B3A',
                      borderLeftColor: '#2d6b50'
                    } : {
                      color: '#1E4B3A'
                    }}
                    whileHover={{ 
                      scale: activeSection === section.id ? 1 : 1.02,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    animate={activeSection === section.id ? {
                      x: [0, 4, 0],
                      transition: { duration: 0.3, ease: "easeInOut" }
                    } : {}}
                    layout
                  >
                    {/* Background highlight animation */}
                    {activeSection === section.id && (
                      <motion.div
                        layoutId="activeBackground"
                        className="absolute inset-0 rounded-lg"
                        style={{ backgroundColor: '#1E4B3A' }}
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30
                        }}
                      />
                    )}
                    <span className="relative z-10 font-medium tracking-wide">{section.label}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Right Content Area */}
          <div className="flex-1 p-8 lg:p-10 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut"
                }}
              >
                {renderSection()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
