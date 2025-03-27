'use client';

import StatCard from './StatCard';

/**
 * StatsSection component
 * Displays the stats grid section on the dashboard
 */
export default function StatsSection({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
      {Object.entries(stats).map(([key, stat]) => (
        <StatCard 
          key={key}
          value={stat.value}
          label={stat.label}
          confidenceInterval={stat.confidenceInterval}
        />
      ))}
    </div>
  );
} 