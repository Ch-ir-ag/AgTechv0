'use client';

import InsightCard from './InsightCard';

/**
 * InsightsSection component
 * Displays the management insights section on the dashboard
 */
export default function InsightsSection({ companyName, insights }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100 mb-8">
      <h2 className="text-xl font-medium text-gray-800 mb-4 sm:mb-6">
        {companyName} Management Insights
      </h2>
      <div className="space-y-4 sm:space-y-6">
        {insights.map((insight, index) => (
          <InsightCard
            key={index}
            title={insight.title}
            description={insight.description}
            icon={insight.icon}
          />
        ))}
      </div>
    </div>
  );
} 