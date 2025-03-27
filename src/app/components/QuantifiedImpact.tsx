'use client';

import React from 'react';

interface QuantifiedImpactProps {
  companyName: string;
}

export default function QuantifiedImpact({ companyName }: QuantifiedImpactProps) {
  // Pre-set impact metrics
  const impactMetrics = [
    {
      title: 'Cost Savings',
      value: '€2.8M',
      description: 'Estimated annual savings through optimized feed management and reduced waste',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Accuracy Improvement',
      value: '+6%',
      description: 'Improvement in prediction accuracy through enhanced AI algorithms',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Carbon Footprint',
      value: '-4.5%',
      description: 'Reduction in carbon emissions per liter of milk produced',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-medium text-gray-800 mb-4">
        Quantified Business Impact
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-blue-800">Accuracy Gain</h3>
            <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded">+28.7%</span>
          </div>
          <p className="text-sm text-gray-600">
            Improved prediction accuracy over traditional forecasting methods, validated against historical data.
          </p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-green-800">Operational Savings</h3>
            <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">€2.8M/year</span>
          </div>
          <p className="text-sm text-gray-600">
            Annual reduction in operating costs through optimized production planning and resource allocation.
          </p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-purple-800">Revenue Impact</h3>
            <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">+€4.2M/year</span>
          </div>
          <p className="text-sm text-gray-600">
            Estimated additional revenue through improved product mix allocation based on market demand.
          </p>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-gray-700 mb-2">ROI Analysis</h3>
        <p className="text-sm text-gray-600 mb-4">
          Based on current projections, {companyName} can expect a full return on investment within 8 months of implementation, with a 5-year projected savings of €14.2M across all operations.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  Implementation Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  75%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div style={{ width: "75%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 