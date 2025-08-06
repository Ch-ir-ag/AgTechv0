'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import './styles.css';
import MakePlanSection from './components/MakePlan';
import SupplySection from './components/Supply';
import StandardizationSection from './components/Standardization';
import ProductAllocationSection from './components/ProductAllocation';
import OperationsSection from './components/Operations';
import DemandSection from './components/Demand';
import { demoData } from './data';

// Navigation sections
const navigationSections = [
  { id: 'supply', label: 'Supply', clickable: true },
  { id: 'standardization', label: 'Standardisation', clickable: true },
  { id: 'make-plan', label: 'Make-Plan', clickable: true },
  { id: 'separation', label: 'Separation', clickable: false },
  { id: 'fine-standardization', label: 'Fine Standardisation', clickable: false },
  { id: 'batch-size-sequencing', label: 'Batch Size & Sequencing', clickable: false },
  { id: 'line-assignment', label: 'Line Assignment', clickable: false },
  { id: 'changeover-timing', label: 'Changeover Timing', clickable: false },
  { id: 'yield-recovery', label: 'Yield Recovery Trade Off', clickable: false },
  { id: 'rework-downgrade', label: 'Rework vs Downgrade', clickable: false },
  { id: 'separator', label: '', clickable: false }, // Visual separator
  { id: 'demand', label: 'Demand', clickable: true }
];

// Main Product Demo Component
export default function ProductDemo() {
  const [activeSection, setActiveSection] = useState('supply');

  const renderSection = () => {
    switch (activeSection) {
      case 'make-plan':
        return <MakePlanSection weeklyPlan={demoData.weeklyMakePlan} />;
      case 'supply':
        return <SupplySection />;
      case 'standardization':
        return <StandardizationSection />;
      case 'product-allocation':
        return <ProductAllocationSection />;
      case 'operations':
        return <OperationsSection machines={demoData.machines} />;
      case 'demand':
        return <DemandSection />;
      default:
        return <SupplySection />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen product-demo" style={{ backgroundColor: '#F7F5F0' }}>
      <Navbar />
      
      <main className="flex-1 pt-16 pb-12">
        <div className="flex h-full">
          {/* Left Navigation */}
          <div className="w-64 bg-white shadow-sm border-r border-gray-200" style={{ minHeight: 'calc(100vh - 80px)' }}>
            <div className="p-6">
              <h1 className="text-xl font-bold mb-2" style={{ color: '#1E4B3A' }}>Daisy AI Demo</h1>
              <p className="text-sm mb-6" style={{ color: '#1E4B3A', opacity: 0.7 }}>Food Processing Intelligence</p>
              
              <nav className="space-y-2">
                {navigationSections.map((section) => {
                  // Handle visual separator
                  if (section.id === 'separator') {
                    return (
                      <div key={section.id} className="my-4 border-t border-gray-200"></div>
                    );
                  }

                  // Non-clickable sections
                  if (!section.clickable) {
                    return (
                      <div
                        key={section.id}
                        className="w-full text-left px-4 py-3 rounded-lg relative overflow-hidden cursor-default hover:bg-gray-50"
                        style={{ color: '#1E4B3A' }}
                      >
                        <span className="font-medium tracking-wide">{section.label}</span>
                      </div>
                    );
                  }

                  // Clickable sections
                  return (
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
                  );
                })}
              </nav>
            </div>
          </div>
          
          {/* Right Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
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