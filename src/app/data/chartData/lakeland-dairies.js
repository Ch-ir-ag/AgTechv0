/**
 * Lakeland Dairies specific chart data
 * Contains milk yield data for Lakeland Dairies with different metrics
 */

// Lakeland Dairies milk yield analytics data
// Structured by time period with confidence levels
// Scaled to reflect an annual yield of approximately 2 billion liters
export const milkYieldData = {
  weekly: {
    2025: [
      { period: 'Mar 15-21', thisYear: 42000000, comparisonYear: 38000000, confidenceLevel: 1260000 },
      { period: 'Mar 22-28', thisYear: 45000000, comparisonYear: 41000000, confidenceLevel: 1350000 },
      { period: 'Mar 29-Apr 4', thisYear: 43000000, comparisonYear: 39000000, confidenceLevel: 1290000 },
      { period: 'Apr 5-11', thisYear: 47000000, comparisonYear: 43000000, confidenceLevel: 1410000 },
      { period: 'Apr 12-18', thisYear: 46000000, comparisonYear: 42000000, confidenceLevel: 1380000 },
      { period: 'Apr 19-25', thisYear: 48000000, comparisonYear: 44000000, confidenceLevel: 1440000 },
      { period: 'Apr 26-May 2', thisYear: 50000000, comparisonYear: 46000000, confidenceLevel: 1500000 },
      { period: 'May 3-9', thisYear: 49000000, comparisonYear: 45000000, confidenceLevel: 1470000 },
    ],
    2024: [
      { period: 'Mar 15-21', thisYear: 38000000, comparisonYear: 36000000, confidenceLevel: 1140000 },
      { period: 'Mar 22-28', thisYear: 41000000, comparisonYear: 39000000, confidenceLevel: 1230000 },
      { period: 'Mar 29-Apr 4', thisYear: 39000000, comparisonYear: 37000000, confidenceLevel: 1170000 },
      { period: 'Apr 5-11', thisYear: 43000000, comparisonYear: 40000000, confidenceLevel: 1290000 },
      { period: 'Apr 12-18', thisYear: 42000000, comparisonYear: 39000000, confidenceLevel: 1260000 },
      { period: 'Apr 19-25', thisYear: 44000000, comparisonYear: 41000000, confidenceLevel: 1320000 },
      { period: 'Apr 26-May 2', thisYear: 46000000, comparisonYear: 43000000, confidenceLevel: 1380000 },
      { period: 'May 3-9', thisYear: 45000000, comparisonYear: 42000000, confidenceLevel: 1350000 },
    ],
    2023: [
      { period: 'Mar 15-21', thisYear: 36000000, comparisonYear: 34000000, confidenceLevel: 1080000 },
      { period: 'Mar 22-28', thisYear: 39000000, comparisonYear: 37000000, confidenceLevel: 1170000 },
      { period: 'Mar 29-Apr 4', thisYear: 37000000, comparisonYear: 35000000, confidenceLevel: 1110000 },
      { period: 'Apr 5-11', thisYear: 40000000, comparisonYear: 38000000, confidenceLevel: 1200000 },
      { period: 'Apr 12-18', thisYear: 39000000, comparisonYear: 37000000, confidenceLevel: 1170000 },
      { period: 'Apr 19-25', thisYear: 41000000, comparisonYear: 39000000, confidenceLevel: 1230000 },
      { period: 'Apr 26-May 2', thisYear: 43000000, comparisonYear: 41000000, confidenceLevel: 1290000 },
      { period: 'May 3-9', thisYear: 42000000, comparisonYear: 40000000, confidenceLevel: 1260000 },
    ],
  },
  monthly: {
    2025: [
      { period: 'Jan 2025', thisYear: 180000000, comparisonYear: 165000000, confidenceLevel: 5400000 },
      { period: 'Feb 2025', thisYear: 192000000, comparisonYear: 178000000, confidenceLevel: 5760000 },
      { period: 'Mar 2025', thisYear: 201000000, comparisonYear: 185000000, confidenceLevel: 6030000 },
      { period: 'Apr 2025', thisYear: 215000000, comparisonYear: 192000000, confidenceLevel: 6450000 },
      { period: 'May 2025', thisYear: 220000000, comparisonYear: 200000000, confidenceLevel: 6600000 },
      { period: 'Jun 2025', thisYear: 218000000, comparisonYear: 198000000, confidenceLevel: 6540000 },
      { period: 'Jul 2025', thisYear: 215000000, comparisonYear: 195000000, confidenceLevel: 6450000 },
      { period: 'Aug 2025', thisYear: 225000000, comparisonYear: 205000000, confidenceLevel: 6750000 },
    ],
    2024: [
      { period: 'Jan 2024', thisYear: 165000000, comparisonYear: 150000000, confidenceLevel: 4950000 },
      { period: 'Feb 2024', thisYear: 178000000, comparisonYear: 162000000, confidenceLevel: 5340000 },
      { period: 'Mar 2024', thisYear: 185000000, comparisonYear: 170000000, confidenceLevel: 5550000 },
      { period: 'Apr 2024', thisYear: 192000000, comparisonYear: 175000000, confidenceLevel: 5760000 },
      { period: 'May 2024', thisYear: 200000000, comparisonYear: 182000000, confidenceLevel: 6000000 },
      { period: 'Jun 2024', thisYear: 198000000, comparisonYear: 180000000, confidenceLevel: 5940000 },
      { period: 'Jul 2024', thisYear: 195000000, comparisonYear: 178000000, confidenceLevel: 5850000 },
      { period: 'Aug 2024', thisYear: 205000000, comparisonYear: 185000000, confidenceLevel: 6150000 },
    ],
    2023: [
      { period: 'Jan 2023', thisYear: 150000000, comparisonYear: 140000000, confidenceLevel: 4500000 },
      { period: 'Feb 2023', thisYear: 162000000, comparisonYear: 150000000, confidenceLevel: 4860000 },
      { period: 'Mar 2023', thisYear: 170000000, comparisonYear: 158000000, confidenceLevel: 5100000 },
      { period: 'Apr 2023', thisYear: 175000000, comparisonYear: 162000000, confidenceLevel: 5250000 },
      { period: 'May 2023', thisYear: 182000000, comparisonYear: 168000000, confidenceLevel: 5460000 },
      { period: 'Jun 2023', thisYear: 180000000, comparisonYear: 165000000, confidenceLevel: 5400000 },
      { period: 'Jul 2023', thisYear: 178000000, comparisonYear: 162000000, confidenceLevel: 5340000 },
      { period: 'Aug 2023', thisYear: 185000000, comparisonYear: 170000000, confidenceLevel: 5550000 },
    ],
  },
  yearly: {
    2025: [
      { period: '2025', thisYear: 2.85e9, comparisonYear: 2.7e9, confidenceLevel: 8.55e7 },
    ],
    2024: [
      { period: '2024', thisYear: 2.7e9, comparisonYear: 2.55e9, confidenceLevel: 8.1e7 },
    ],
    2023: [
      { period: '2023', thisYear: 2.55e9, comparisonYear: 2.4e9, confidenceLevel: 7.65e7 },
    ],
  },  
};

// Sample fat percentage data for Lakeland Dairies
export const fatPercentageData = {
  monthly: {
    2025: [
      { period: 'Jan 2025', thisYear: 5.35, comparisonYear: 4.98, confidenceLevel: 0.15 },
      { period: 'Feb 2025', thisYear: 5.10, comparisonYear: 4.79, confidenceLevel: 0.15 },
      { period: 'Mar 2025', thisYear: 4.70, comparisonYear: 4.40, confidenceLevel: 0.13 },
      { period: 'Apr 2025', thisYear: 4.45, comparisonYear: 4.15, confidenceLevel: 0.13 },
      { period: 'May 2025', thisYear: 4.25, comparisonYear: 3.95, confidenceLevel: 0.12 },
      { period: 'Jun 2025', thisYear: 4.30, comparisonYear: 4.00, confidenceLevel: 0.12 },
      { period: 'Jul 2025', thisYear: 4.40, comparisonYear: 4.10, confidenceLevel: 0.12 },
      { period: 'Aug 2025', thisYear: 4.65, comparisonYear: 4.35, confidenceLevel: 0.13 },
    ],
    2024: [
      { period: 'Jan 2024', thisYear: 4.98, comparisonYear: 4.90, confidenceLevel: 0.15 },
      { period: 'Feb 2024', thisYear: 4.79, comparisonYear: 4.75, confidenceLevel: 0.14 },
      { period: 'Mar 2024', thisYear: 4.40, comparisonYear: 4.35, confidenceLevel: 0.13 },
      { period: 'Apr 2024', thisYear: 4.15, comparisonYear: 4.10, confidenceLevel: 0.12 },
      { period: 'May 2024', thisYear: 3.95, comparisonYear: 3.90, confidenceLevel: 0.12 },
      { period: 'Jun 2024', thisYear: 4.00, comparisonYear: 3.95, confidenceLevel: 0.12 },
      { period: 'Jul 2024', thisYear: 4.10, comparisonYear: 4.05, confidenceLevel: 0.12 },
      { period: 'Aug 2024', thisYear: 4.35, comparisonYear: 4.30, confidenceLevel: 0.13 },
    ],
  },
};

// Sample protein percentage data for Lakeland Dairies
export const proteinPercentageData = {
  monthly: {
    2025: [
      { period: 'Jan 2025', thisYear: 3.95, comparisonYear: 3.75, confidenceLevel: 0.11 },
      { period: 'Feb 2025', thisYear: 3.85, comparisonYear: 3.65, confidenceLevel: 0.11 },
      { period: 'Mar 2025', thisYear: 3.45, comparisonYear: 3.25, confidenceLevel: 0.10 },
      { period: 'Apr 2025', thisYear: 3.50, comparisonYear: 3.30, confidenceLevel: 0.10 },
      { period: 'May 2025', thisYear: 3.60, comparisonYear: 3.40, confidenceLevel: 0.10 },
      { period: 'Jun 2025', thisYear: 3.70, comparisonYear: 3.50, confidenceLevel: 0.11 },
      { period: 'Jul 2025', thisYear: 3.80, comparisonYear: 3.60, confidenceLevel: 0.11 },
      { period: 'Aug 2025', thisYear: 3.90, comparisonYear: 3.70, confidenceLevel: 0.11 },
    ],
    2024: [
      { period: 'Jan 2024', thisYear: 3.75, comparisonYear: 3.70, confidenceLevel: 0.11 },
      { period: 'Feb 2024', thisYear: 3.65, comparisonYear: 3.60, confidenceLevel: 0.11 },
      { period: 'Mar 2024', thisYear: 3.25, comparisonYear: 3.20, confidenceLevel: 0.10 },
      { period: 'Apr 2024', thisYear: 3.30, comparisonYear: 3.25, confidenceLevel: 0.10 },
      { period: 'May 2024', thisYear: 3.40, comparisonYear: 3.35, confidenceLevel: 0.10 },
      { period: 'Jun 2024', thisYear: 3.50, comparisonYear: 3.45, confidenceLevel: 0.10 },
      { period: 'Jul 2024', thisYear: 3.60, comparisonYear: 3.55, confidenceLevel: 0.11 },
      { period: 'Aug 2024', thisYear: 3.70, comparisonYear: 3.65, confidenceLevel: 0.11 },
    ],
  },
};

// Sample lactose percentage data for Lakeland Dairies
export const lactosePercentageData = {
  monthly: {
    2025: [
      { period: 'Jan 2025', thisYear: 4.7, comparisonYear: 4.55, confidenceLevel: 0.14 },
      { period: 'Feb 2025', thisYear: 4.7, comparisonYear: 4.55, confidenceLevel: 0.14 },
      { period: 'Mar 2025', thisYear: 4.9, comparisonYear: 4.75, confidenceLevel: 0.14 },
      { period: 'Apr 2025', thisYear: 5.0, comparisonYear: 4.85, confidenceLevel: 0.15 },
      { period: 'May 2025', thisYear: 5.0, comparisonYear: 4.85, confidenceLevel: 0.15 },
      { period: 'Jun 2025', thisYear: 4.9, comparisonYear: 4.75, confidenceLevel: 0.14 },
      { period: 'Jul 2025', thisYear: 4.8, comparisonYear: 4.65, confidenceLevel: 0.14 },
      { period: 'Aug 2025', thisYear: 4.7, comparisonYear: 4.55, confidenceLevel: 0.14 },
    ],
    2024: [
      { period: 'Jan 2024', thisYear: 4.55, comparisonYear: 4.50, confidenceLevel: 0.14 },
      { period: 'Feb 2024', thisYear: 4.55, comparisonYear: 4.50, confidenceLevel: 0.14 },
      { period: 'Mar 2024', thisYear: 4.75, comparisonYear: 4.70, confidenceLevel: 0.14 },
      { period: 'Apr 2024', thisYear: 4.85, comparisonYear: 4.80, confidenceLevel: 0.15 },
      { period: 'May 2024', thisYear: 4.85, comparisonYear: 4.80, confidenceLevel: 0.15 },
      { period: 'Jun 2024', thisYear: 4.75, comparisonYear: 4.70, confidenceLevel: 0.14 },
      { period: 'Jul 2024', thisYear: 4.65, comparisonYear: 4.60, confidenceLevel: 0.14 },
      { period: 'Aug 2024', thisYear: 4.55, comparisonYear: 4.50, confidenceLevel: 0.14 },
    ],
  },
}; 