'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './styles.css';
import MakePlanSection from './components/MakePlan';
import SupplySection from './components/Supply';
import OperationsSection from './components/Operations';
import DemandSection from './components/Demand';
import MaintenanceSection from './components/PreventiveMaintenance';
import { demoData } from './data';

// Navigation sections
const navigationSections = [
  { id: 'make-plan', label: 'Make Plan' },
  { id: 'supply', label: 'Supply' },
  { id: 'operations', label: 'Operations' },
  { id: 'demand', label: 'Demand' },
  { id: 'maintenance', label: 'Preventive Maintenance' }
];

// Main Product Demo Component
export default function ProductDemo() {
  const [activeSection, setActiveSection] = useState('make-plan');

  const renderSection = () => {
    switch (activeSection) {
      case 'make-plan':
        return <MakePlanSection lines={demoData.productionLines} />;
      case 'supply':
        return <SupplySection data={demoData.supply} />;
      case 'operations':
        return <OperationsSection machines={demoData.machines} />;
      case 'demand':
        return <DemandSection />;
      case 'maintenance':
        return <MaintenanceSection />;
      default:
        return <MakePlanSection lines={demoData.productionLines} />;
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
                {navigationSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
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
                  >
                    <span className="font-medium tracking-wide">{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Right Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            {renderSection()}
          </div>
        </div>
      </main>
    </div>
  );
}