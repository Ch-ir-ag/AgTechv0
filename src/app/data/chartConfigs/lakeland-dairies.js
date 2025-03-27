/**
 * Lakeland Dairies chart configuration
 * Contains all chart-specific configurations and data for Lakeland Dairies
 */

// This file is a placeholder for future company-specific chart configurations
// It demonstrates how you can add company-specific chart settings as the app grows

export const milkYieldChartConfig = {
  // In the future, this could customize colors, ranges, or other chart properties
  colors: {
    primary: '#3b82f6', // blue-500
    secondary: '#93c5fd', // blue-300
    tertiary: '#dbeafe', // blue-100
  },
  // These values would be used to override defaults in the chart components
  showConfidenceIntervals: true,
  defaultTimeframe: 'monthly',
};

export const supplyChainMapConfig = {
  // In the future, this could add company-specific map features, regions, etc.
  defaultRegion: 'Northern Ireland',
  showAllRegions: true,
  // This config would be used to customize map behavior for this specific company
};

export const yearlyYieldChartConfig = {
  // Future customizations for yearly yield chart
};

export const productAllocationChartConfig = {
  // Future customizations for product allocation chart
};

// This structure allows you to add/scale company-specific chart configurations
// without modifying the chart components themselves 