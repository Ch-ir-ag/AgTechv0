'use client';

import React from 'react';

interface QuantifiedImpactProps {
  companyName: string;
}

export default function QuantifiedImpact({ companyName }: QuantifiedImpactProps) {
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