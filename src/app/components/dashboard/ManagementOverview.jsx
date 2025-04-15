'use client';

/**
 * ManagementOverview component
 * Displays a management overview box on the dashboard
 */
export default function ManagementOverview({ companyName }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100 mb-8">
      <h2 className="text-xl font-medium text-gray-800 mb-4 sm:mb-6">
        {companyName} Management Overview
      </h2>
      <div className="prose max-w-none">
        <p>
          Welcome to the {companyName} management dashboard. This dashboard provides 
          real-time insights into your dairy production metrics and AI-powered predictions 
          to help optimize your operations.
        </p>
        <ul className="mt-3">
          <li>View current and projected milk yield data</li>
          <li>Monitor seasonal variations and trends</li>
          <li>Optimize production planning with AI-assisted forecasting</li>
          <li>Track key performance indicators across your supply chain</li>
        </ul>
      </div>
    </div>
  );
} 