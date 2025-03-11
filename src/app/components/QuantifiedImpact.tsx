'use client';

import React from 'react';

export default function QuantifiedImpact() {
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
      title: 'Efficiency Improvement',
      value: '+8.5%',
      description: 'Increase in milk production efficiency with the same herd size',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: 'Quality Enhancement',
      value: '+12%',
      description: 'Improvement in milk quality scores through data-driven insights',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Carbon Footprint',
      value: '-15%',
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
      <h2 className="text-xl font-medium text-gray-800 mb-6">
        Quantified Impact
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactMetrics.map((metric, index) => (
          <div 
            key={index} 
            className="bg-gray-50 rounded-lg p-5 border border-gray-200 transition-all hover:shadow-md"
          >
            <div className="flex items-center mb-3">
              <div className="bg-white p-2 rounded-full mr-3">
                {metric.icon}
              </div>
              <h3 className="font-medium text-gray-800">
                {metric.title}
              </h3>
            </div>
            
            <div className="mb-2">
              <span className="text-3xl font-bold text-gray-900">
                {metric.value}
              </span>
            </div>
            
            <p className="text-sm text-gray-600">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start">
          <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-800 mb-1">
              ROI Analysis
            </h4>
            <p className="text-sm text-gray-600">
              Based on current projections, Lakeland Dairies can expect a full return on investment within 8 months of implementation, with a 5-year projected savings of €14.2M across all operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 