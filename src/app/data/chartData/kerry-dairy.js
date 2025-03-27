/**
 * Kerry Dairy specific chart data
 * Contains milk yield data for Kerry Dairy with different metrics
 */

// Kerry Dairy milk yield analytics data
// Structured by time period with confidence levels
// Values scaled to reflect Kerry Dairy's specific production volumes
export const milkYieldData = {
  weekly: {
    2025: [
      { period: 'Mar 15-21', thisYear: 35500000, comparisonYear: 32000000, confidenceLevel: 1065000 },
      { period: 'Mar 22-28', thisYear: 37800000, comparisonYear: 33600000, confidenceLevel: 1134000 },
      { period: 'Mar 29-Apr 4', thisYear: 36200000, comparisonYear: 32500000, confidenceLevel: 1086000 },
      { period: 'Apr 5-11', thisYear: 38500000, comparisonYear: 34800000, confidenceLevel: 1155000 },
      { period: 'Apr 12-18', thisYear: 39200000, comparisonYear: 35400000, confidenceLevel: 1176000 },
      { period: 'Apr 19-25', thisYear: 40800000, comparisonYear: 36700000, confidenceLevel: 1224000 },
      { period: 'Apr 26-May 2', thisYear: 42000000, comparisonYear: 37500000, confidenceLevel: 1260000 },
      { period: 'May 3-9', thisYear: 41500000, comparisonYear: 37000000, confidenceLevel: 1245000 },
    ],
    2024: [
      { period: 'Mar 15-21', thisYear: 32000000, comparisonYear: 29800000, confidenceLevel: 960000 },
      { period: 'Mar 22-28', thisYear: 33600000, comparisonYear: 31000000, confidenceLevel: 1008000 },
      { period: 'Mar 29-Apr 4', thisYear: 32500000, comparisonYear: 30200000, confidenceLevel: 975000 },
      { period: 'Apr 5-11', thisYear: 34800000, comparisonYear: 31500000, confidenceLevel: 1044000 },
      { period: 'Apr 12-18', thisYear: 35400000, comparisonYear: 32400000, confidenceLevel: 1062000 },
      { period: 'Apr 19-25', thisYear: 36700000, comparisonYear: 33500000, confidenceLevel: 1101000 },
      { period: 'Apr 26-May 2', thisYear: 37500000, comparisonYear: 34200000, confidenceLevel: 1125000 },
      { period: 'May 3-9', thisYear: 37000000, comparisonYear: 33800000, confidenceLevel: 1110000 },
    ],
    2023: [
      { period: 'Mar 15-21', thisYear: 29800000, comparisonYear: 28000000, confidenceLevel: 894000 },
      { period: 'Mar 22-28', thisYear: 31000000, comparisonYear: 28900000, confidenceLevel: 930000 },
      { period: 'Mar 29-Apr 4', thisYear: 30200000, comparisonYear: 28500000, confidenceLevel: 906000 },
      { period: 'Apr 5-11', thisYear: 31500000, comparisonYear: 29600000, confidenceLevel: 945000 },
      { period: 'Apr 12-18', thisYear: 32400000, comparisonYear: 30100000, confidenceLevel: 972000 },
      { period: 'Apr 19-25', thisYear: 33500000, comparisonYear: 31200000, confidenceLevel: 1005000 },
      { period: 'Apr 26-May 2', thisYear: 34200000, comparisonYear: 31800000, confidenceLevel: 1026000 },
      { period: 'May 3-9', thisYear: 33800000, comparisonYear: 31500000, confidenceLevel: 1014000 },
    ],
  },
  monthly: {
    2025: [
      { period: 'Jan 2025', thisYear: 142000000, comparisonYear: 130000000, confidenceLevel: 4260000 },
      { period: 'Feb 2025', thisYear: 148000000, comparisonYear: 134000000, confidenceLevel: 4440000 },
      { period: 'Mar 2025', thisYear: 154000000, comparisonYear: 140000000, confidenceLevel: 4620000 },
      { period: 'Apr 2025', thisYear: 160000000, comparisonYear: 145000000, confidenceLevel: 4800000 },
      { period: 'May 2025', thisYear: 168000000, comparisonYear: 151000000, confidenceLevel: 5040000 },
      { period: 'Jun 2025', thisYear: 166000000, comparisonYear: 149000000, confidenceLevel: 4980000 },
      { period: 'Jul 2025', thisYear: 165000000, comparisonYear: 148000000, confidenceLevel: 4950000 },
      { period: 'Aug 2025', thisYear: 170000000, comparisonYear: 152000000, confidenceLevel: 5100000 },
    ],
    2024: [
      { period: 'Jan 2024', thisYear: 130000000, comparisonYear: 122000000, confidenceLevel: 3900000 },
      { period: 'Feb 2024', thisYear: 134000000, comparisonYear: 124000000, confidenceLevel: 4020000 },
      { period: 'Mar 2024', thisYear: 140000000, comparisonYear: 130000000, confidenceLevel: 4200000 },
      { period: 'Apr 2024', thisYear: 145000000, comparisonYear: 134000000, confidenceLevel: 4350000 },
      { period: 'May 2024', thisYear: 151000000, comparisonYear: 138000000, confidenceLevel: 4530000 },
      { period: 'Jun 2024', thisYear: 149000000, comparisonYear: 136000000, confidenceLevel: 4470000 },
      { period: 'Jul 2024', thisYear: 148000000, comparisonYear: 135000000, confidenceLevel: 4440000 },
      { period: 'Aug 2024', thisYear: 152000000, comparisonYear: 139000000, confidenceLevel: 4560000 },
    ],
    2023: [
      { period: 'Jan 2023', thisYear: 122000000, comparisonYear: 115000000, confidenceLevel: 3660000 },
      { period: 'Feb 2023', thisYear: 124000000, comparisonYear: 118000000, confidenceLevel: 3720000 },
      { period: 'Mar 2023', thisYear: 130000000, comparisonYear: 124000000, confidenceLevel: 3900000 },
      { period: 'Apr 2023', thisYear: 134000000, comparisonYear: 127000000, confidenceLevel: 4020000 },
      { period: 'May 2023', thisYear: 138000000, comparisonYear: 131000000, confidenceLevel: 4140000 },
      { period: 'Jun 2023', thisYear: 136000000, comparisonYear: 129000000, confidenceLevel: 4080000 },
      { period: 'Jul 2023', thisYear: 135000000, comparisonYear: 128000000, confidenceLevel: 4050000 },
      { period: 'Aug 2023', thisYear: 139000000, comparisonYear: 132000000, confidenceLevel: 4170000 },
    ],
  },
  yearly: {
    2025: [
      { period: '2025', thisYear: 1.8e9, comparisonYear: 1.72e9, confidenceLevel: 5.4e7 },
    ],
    2024: [
      { period: '2024', thisYear: 1.72e9, comparisonYear: 1.65e9, confidenceLevel: 5.16e7 },
    ],
    2023: [
      { period: '2023', thisYear: 1.65e9, comparisonYear: 1.58e9, confidenceLevel: 4.95e7 },
    ],
  },  
};

// Sample fat percentage data for Kerry Dairy
export const fatPercentageData = {
  monthly: {
    2025: [
      { period: 'Jan 2025', thisYear: 5.15, comparisonYear: 4.80, confidenceLevel: 0.15 },
      { period: 'Feb 2025', thisYear: 4.95, comparisonYear: 4.70, confidenceLevel: 0.14 },
      { period: 'Mar 2025', thisYear: 4.60, comparisonYear: 4.35, confidenceLevel: 0.13 },
      { period: 'Apr 2025', thisYear: 4.35, comparisonYear: 4.10, confidenceLevel: 0.12 },
      { period: 'May 2025', thisYear: 4.20, comparisonYear: 3.90, confidenceLevel: 0.12 },
      { period: 'Jun 2025', thisYear: 4.25, comparisonYear: 3.95, confidenceLevel: 0.12 },
      { period: 'Jul 2025', thisYear: 4.30, comparisonYear: 4.05, confidenceLevel: 0.12 },
      { period: 'Aug 2025', thisYear: 4.55, comparisonYear: 4.30, confidenceLevel: 0.13 },
    ],
    2024: [
      { period: 'Jan 2024', thisYear: 4.80, comparisonYear: 4.75, confidenceLevel: 0.14 },
      { period: 'Feb 2024', thisYear: 4.70, comparisonYear: 4.65, confidenceLevel: 0.14 },
      { period: 'Mar 2024', thisYear: 4.35, comparisonYear: 4.30, confidenceLevel: 0.12 },
      { period: 'Apr 2024', thisYear: 4.10, comparisonYear: 4.05, confidenceLevel: 0.12 },
      { period: 'May 2024', thisYear: 3.90, comparisonYear: 3.85, confidenceLevel: 0.11 },
      { period: 'Jun 2024', thisYear: 3.95, comparisonYear: 3.90, confidenceLevel: 0.11 },
      { period: 'Jul 2024', thisYear: 4.05, comparisonYear: 4.00, confidenceLevel: 0.12 },
      { period: 'Aug 2024', thisYear: 4.30, comparisonYear: 4.25, confidenceLevel: 0.12 },
    ],
  },
};

// Sample protein percentage data for Kerry Dairy
export const proteinPercentageData = {
  monthly: {
    2025: [
      { period: 'Jan 2025', thisYear: 3.85, comparisonYear: 3.70, confidenceLevel: 0.11 },
      { period: 'Feb 2025', thisYear: 3.80, comparisonYear: 3.65, confidenceLevel: 0.11 },
      { period: 'Mar 2025', thisYear: 3.40, comparisonYear: 3.25, confidenceLevel: 0.10 },
      { period: 'Apr 2025', thisYear: 3.45, comparisonYear: 3.30, confidenceLevel: 0.10 },
      { period: 'May 2025', thisYear: 3.55, comparisonYear: 3.40, confidenceLevel: 0.10 },
      { period: 'Jun 2025', thisYear: 3.65, comparisonYear: 3.50, confidenceLevel: 0.11 },
      { period: 'Jul 2025', thisYear: 3.75, comparisonYear: 3.60, confidenceLevel: 0.11 },
      { period: 'Aug 2025', thisYear: 3.85, comparisonYear: 3.70, confidenceLevel: 0.11 },
    ],
    2024: [
      { period: 'Jan 2024', thisYear: 3.70, comparisonYear: 3.65, confidenceLevel: 0.11 },
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

// Sample lactose percentage data for Kerry Dairy
export const lactosePercentageData = {
  monthly: {
    2025: [
      { period: 'Jan 2025', thisYear: 4.6, comparisonYear: 4.50, confidenceLevel: 0.14 },
      { period: 'Feb 2025', thisYear: 4.6, comparisonYear: 4.50, confidenceLevel: 0.14 },
      { period: 'Mar 2025', thisYear: 4.8, comparisonYear: 4.70, confidenceLevel: 0.14 },
      { period: 'Apr 2025', thisYear: 4.9, comparisonYear: 4.80, confidenceLevel: 0.15 },
      { period: 'May 2025', thisYear: 4.9, comparisonYear: 4.80, confidenceLevel: 0.15 },
      { period: 'Jun 2025', thisYear: 4.8, comparisonYear: 4.70, confidenceLevel: 0.14 },
      { period: 'Jul 2025', thisYear: 4.7, comparisonYear: 4.60, confidenceLevel: 0.14 },
      { period: 'Aug 2025', thisYear: 4.6, comparisonYear: 4.50, confidenceLevel: 0.14 },
    ],
    2024: [
      { period: 'Jan 2024', thisYear: 4.50, comparisonYear: 4.45, confidenceLevel: 0.13 },
      { period: 'Feb 2024', thisYear: 4.50, comparisonYear: 4.45, confidenceLevel: 0.13 },
      { period: 'Mar 2024', thisYear: 4.70, comparisonYear: 4.65, confidenceLevel: 0.14 },
      { period: 'Apr 2024', thisYear: 4.80, comparisonYear: 4.75, confidenceLevel: 0.14 },
      { period: 'May 2024', thisYear: 4.80, comparisonYear: 4.75, confidenceLevel: 0.14 },
      { period: 'Jun 2024', thisYear: 4.70, comparisonYear: 4.65, confidenceLevel: 0.14 },
      { period: 'Jul 2024', thisYear: 4.60, comparisonYear: 4.55, confidenceLevel: 0.14 },
      { period: 'Aug 2024', thisYear: 4.50, comparisonYear: 4.45, confidenceLevel: 0.13 },
    ],
  },
}; 