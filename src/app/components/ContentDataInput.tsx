'use client';

import { useState } from 'react';

interface ContentDataPoint {
  period: string;
  actualFat: number;
  predictedFat: number;
  actualProtein: number;
  predictedProtein: number;
}

interface ContentDataInputProps {
  onDataSubmit: (data: ContentDataPoint) => void;
  timePeriod: 'weekly' | 'monthly' | 'yearly';
}

export default function ContentDataInput({ onDataSubmit, timePeriod }: ContentDataInputProps) {
  const [formData, setFormData] = useState<ContentDataPoint>({
    period: '',
    actualFat: 0,
    predictedFat: 0,
    actualProtein: 0,
    predictedProtein: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDataSubmit(formData);
    // Reset form
    setFormData({
      period: '',
      actualFat: 0,
      predictedFat: 0,
      actualProtein: 0,
      predictedProtein: 0,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'period') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      // Convert string to number and limit to 1 decimal place
      const numValue = parseFloat(parseFloat(value).toFixed(1));
      setFormData(prev => ({ ...prev, [name]: numValue }));
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Add New Content Data</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-1">
              Period
            </label>
            <input
              type="text"
              id="period"
              name="period"
              placeholder={timePeriod === 'weekly' ? 'Mar 1-7' : timePeriod === 'monthly' ? 'Jan 2025' : '2025'}
              value={formData.period}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="actualFat" className="block text-sm font-medium text-gray-700 mb-1">
              Actual Fat %
            </label>
            <input
              type="number"
              id="actualFat"
              name="actualFat"
              step="0.1"
              min="2.5"
              max="5.5"
              value={formData.actualFat}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="predictedFat" className="block text-sm font-medium text-gray-700 mb-1">
              Predicted Fat %
            </label>
            <input
              type="number"
              id="predictedFat"
              name="predictedFat"
              step="0.1"
              min="2.5"
              max="5.5"
              value={formData.predictedFat}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="actualProtein" className="block text-sm font-medium text-gray-700 mb-1">
              Actual Protein %
            </label>
            <input
              type="number"
              id="actualProtein"
              name="actualProtein"
              step="0.1"
              min="2.5"
              max="5.5"
              value={formData.actualProtein}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="predictedProtein" className="block text-sm font-medium text-gray-700 mb-1">
              Predicted Protein %
            </label>
            <input
              type="number"
              id="predictedProtein"
              name="predictedProtein"
              step="0.1"
              min="2.5"
              max="5.5"
              value={formData.predictedProtein}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Data Point
          </button>
        </div>
      </form>
    </div>
  );
} 