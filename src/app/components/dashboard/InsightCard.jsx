'use client';

/**
 * InsightCard component
 * Displays a single insight on the dashboard
 */

export default function InsightCard({ title, description, icon }) {
  // Icons mapping
  const iconComponents = {
    trend: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1E4B3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    forecast: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1E4B3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    efficiency: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#1E4B3A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start">
      <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3 sm:mb-0 sm:mr-4 flex-shrink-0 mx-auto sm:mx-0">
        {iconComponents[icon] || iconComponents.trend}
      </div>
      <div className="text-center sm:text-left">
        <h3 className="text-lg font-medium text-gray-800 mb-1">
          {title}
        </h3>
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    </div>
  );
} 