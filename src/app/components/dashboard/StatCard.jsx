'use client';

/**
 * StatCard component
 * Displays a single stat metric card on the dashboard
 */

export default function StatCard({ value, label, confidenceInterval }) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 text-center">
      <p className="text-2xl sm:text-3xl font-bold text-[#1E4B3A]">{value}</p>
      <p className="text-gray-600 text-xs sm:text-sm">{label}</p>
      <p className="text-xs text-gray-500 mt-1">{confidenceInterval}</p>
    </div>
  );
} 