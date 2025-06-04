/**
 * Dairygold specific chart data
 * Contains milk yield data for Dairygold with different metrics
 */

// Dairygold milk yield analytics data
// Structured by time period with confidence levels
// Values scaled to reflect Dairygold's specific production volumes
export const milkYieldData = {
  weekly: {
    2025: [
      { period: 'Mar 15-21', thisYear: 42500000, comparisonYear: 38800000, confidenceLevel: 1615000 },
      { period: 'Mar 22-28', thisYear: 45200000, comparisonYear: 41000000, confidenceLevel: 1716000 },
      { period: 'Mar 29-Apr 4', thisYear: 43800000, comparisonYear: 39500000, confidenceLevel: 1664000 },
      { period: 'Apr 5-11', thisYear: 46500000, comparisonYear: 42200000, confidenceLevel: 1767000 },
      { period: 'Apr 12-18', thisYear: 47200000, comparisonYear: 43000000, confidenceLevel: 1793000 },
      { period: 'Apr 19-25', thisYear: 49100000, comparisonYear: 44600000, confidenceLevel: 1865000 },
      { period: 'Apr 26-May 2', thisYear: 50800000, comparisonYear: 46000000, confidenceLevel: 1930000 },
      { period: 'May 3-9', thisYear: 50200000, comparisonYear: 45500000, confidenceLevel: 1908000 },
    ],
    2024: [
      { period: 'Mar 15-21', thisYear: 38800000, comparisonYear: 36200000, confidenceLevel: 1474000 },
      { period: 'Mar 22-28', thisYear: 41000000, comparisonYear: 37800000, confidenceLevel: 1558000 },
      { period: 'Mar 29-Apr 4', thisYear: 39500000, comparisonYear: 36800000, confidenceLevel: 1501000 },
      { period: 'Apr 5-11', thisYear: 42200000, comparisonYear: 38500000, confidenceLevel: 1604000 },
      { period: 'Apr 12-18', thisYear: 43000000, comparisonYear: 39200000, confidenceLevel: 1634000 },
      { period: 'Apr 19-25', thisYear: 44600000, comparisonYear: 40800000, confidenceLevel: 1695000 },
      { period: 'Apr 26-May 2', thisYear: 46000000, comparisonYear: 42000000, confidenceLevel: 1748000 },
      { period: 'May 3-9', thisYear: 45500000, comparisonYear: 41500000, confidenceLevel: 1729000 },
    ],
    2023: [
      { period: 'Mar 15-21', thisYear: 36200000, comparisonYear: 34000000, confidenceLevel: 1375000 },
      { period: 'Mar 22-28', thisYear: 37800000, comparisonYear: 35200000, confidenceLevel: 1436000 },
      { period: 'Mar 29-Apr 4', thisYear: 36800000, comparisonYear: 34600000, confidenceLevel: 1398000 },
      { period: 'Apr 5-11', thisYear: 38500000, comparisonYear: 35800000, confidenceLevel: 1463000 },
      { period: 'Apr 12-18', thisYear: 39200000, comparisonYear: 36500000, confidenceLevel: 1489000 },
      { period: 'Apr 19-25', thisYear: 40800000, comparisonYear: 37800000, confidenceLevel: 1550000 },
      { period: 'Apr 26-May 2', thisYear: 42000000, comparisonYear: 38600000, confidenceLevel: 1596000 },
      { period: 'May 3-9', thisYear: 41500000, comparisonYear: 38200000, confidenceLevel: 1577000 },
    ],
  },
  monthly: {
    2025: [
      { period: 'Jan 2025', thisYear: 175000000, comparisonYear: 162000000, confidenceLevel: 6650000 },
      { period: 'Feb 2025', thisYear: 182000000, comparisonYear: 168000000, confidenceLevel: 6916000 },
      { period: 'Mar 2025', thisYear: 190000000, comparisonYear: 175000000, confidenceLevel: 7220000 },
      { period: 'Apr 2025', thisYear: 198000000, comparisonYear: 182000000, confidenceLevel: 7524000 },
      { period: 'May 2025', thisYear: 206000000, comparisonYear: 188000000, confidenceLevel: 7828000 },
      { period: 'Jun 2025', thisYear: 204000000, comparisonYear: 186000000, confidenceLevel: 7752000 },
      { period: 'Jul 2025', thisYear: 202000000, comparisonYear: 184000000, confidenceLevel: 7676000 },
      { period: 'Aug 2025', thisYear: 208000000, comparisonYear: 190000000, confidenceLevel: 7904000 },
    ],
    2024: [
      { period: 'Jan 2024', thisYear: 162000000, comparisonYear: 152000000, confidenceLevel: 6156000 },
      { period: 'Feb 2024', thisYear: 168000000, comparisonYear: 156000000, confidenceLevel: 6384000 },
      { period: 'Mar 2024', thisYear: 175000000, comparisonYear: 162000000, confidenceLevel: 6650000 },
      { period: 'Apr 2024', thisYear: 182000000, comparisonYear: 168000000, confidenceLevel: 6916000 },
      { period: 'May 2024', thisYear: 188000000, comparisonYear: 172000000, confidenceLevel: 7144000 },
      { period: 'Jun 2024', thisYear: 186000000, comparisonYear: 170000000, confidenceLevel: 7068000 },
      { period: 'Jul 2024', thisYear: 184000000, comparisonYear: 168000000, confidenceLevel: 6992000 },
      { period: 'Aug 2024', thisYear: 190000000, comparisonYear: 174000000, confidenceLevel: 7220000 },
    ],
    2023: [
      { period: 'Jan 2023', thisYear: 152000000, comparisonYear: 142000000, confidenceLevel: 5776000 },
      { period: 'Feb 2023', thisYear: 156000000, comparisonYear: 145000000, confidenceLevel: 5928000 },
      { period: 'Mar 2023', thisYear: 162000000, comparisonYear: 152000000, confidenceLevel: 6156000 },
      { period: 'Apr 2023', thisYear: 168000000, comparisonYear: 156000000, confidenceLevel: 6384000 },
      { period: 'May 2023', thisYear: 172000000, comparisonYear: 160000000, confidenceLevel: 6536000 },
      { period: 'Jun 2023', thisYear: 170000000, comparisonYear: 158000000, confidenceLevel: 6460000 },
      { period: 'Jul 2023', thisYear: 168000000, comparisonYear: 156000000, confidenceLevel: 6384000 },
      { period: 'Aug 2023', thisYear: 174000000, comparisonYear: 162000000, confidenceLevel: 6612000 },
    ],
  },
  yearly: {
    2025: [
      { period: '2025', thisYear: 1.3e9, comparisonYear: 1.23e9, confidenceInterval: 4.55e7 },
    ],
    2024: [
      { period: '2024', thisYear: 1.23e9, comparisonYear: 1.16e9, confidenceInterval: 4.31e7 },
    ],
    2023: [
      { period: '2023', thisYear: 1.16e9, comparisonYear: 1.08e9, confidenceInterval: 4.06e7 },
    ],
  },  
};

// Sample fat percentage data for Dairygold
export const fatPercentageData = {
  weekly: {
    2025: [
      { period: 'Mar 15-21', thisYear: 4.52, comparisonYear: 4.28, confidenceLevel: 0.14 },
      { period: 'Mar 22-28', thisYear: 4.45, comparisonYear: 4.22, confidenceLevel: 0.13 },
      { period: 'Mar 29-Apr 4', thisYear: 4.38, comparisonYear: 4.16, confidenceLevel: 0.13 },
      { period: 'Apr 5-11', thisYear: 4.32, comparisonYear: 4.10, confidenceLevel: 0.13 },
      { period: 'Apr 12-18', thisYear: 4.26, comparisonYear: 4.05, confidenceLevel: 0.13 },
      { period: 'Apr 19-25', thisYear: 4.22, comparisonYear: 4.00, confidenceLevel: 0.13 },
      { period: 'Apr 26-May 2', thisYear: 4.18, comparisonYear: 3.95, confidenceLevel: 0.13 },
      { period: 'May 3-9', thisYear: 4.15, comparisonYear: 3.88, confidenceLevel: 0.12 },
    ],
    2024: [
      { period: 'Mar 15-21', thisYear: 4.28, comparisonYear: 4.25, confidenceLevel: 0.13 },
      { period: 'Mar 22-28', thisYear: 4.22, comparisonYear: 4.20, confidenceLevel: 0.13 },
      { period: 'Mar 29-Apr 4', thisYear: 4.16, comparisonYear: 4.14, confidenceLevel: 0.12 },
      { period: 'Apr 5-11', thisYear: 4.10, comparisonYear: 4.08, confidenceLevel: 0.12 },
      { period: 'Apr 12-18', thisYear: 4.05, comparisonYear: 4.03, confidenceLevel: 0.12 },
      { period: 'Apr 19-25', thisYear: 4.00, comparisonYear: 3.98, confidenceLevel: 0.12 },
      { period: 'Apr 26-May 2', thisYear: 3.95, comparisonYear: 3.93, confidenceLevel: 0.12 },
      { period: 'May 3-9', thisYear: 3.88, comparisonYear: 3.86, confidenceLevel: 0.12 },
    ],
  },
  monthly: {
    2025: [
      { period: 'Jan 2025', thisYear: 5.05, comparisonYear: 4.75, confidenceLevel: 0.15 },
      { period: 'Feb 2025', thisYear: 4.85, comparisonYear: 4.60, confidenceLevel: 0.15 },
      { period: 'Mar 2025', thisYear: 4.48, comparisonYear: 4.25, confidenceLevel: 0.13 },
      { period: 'Apr 2025', thisYear: 4.25, comparisonYear: 4.05, confidenceLevel: 0.13 },
      { period: 'May 2025', thisYear: 4.12, comparisonYear: 3.85, confidenceLevel: 0.12 },
      { period: 'Jun 2025', thisYear: 4.18, comparisonYear: 3.90, confidenceLevel: 0.13 },
      { period: 'Jul 2025', thisYear: 4.25, comparisonYear: 4.00, confidenceLevel: 0.13 },
      { period: 'Aug 2025', thisYear: 4.48, comparisonYear: 4.22, confidenceLevel: 0.13 },
    ],
    2024: [
      { period: 'Jan 2024', thisYear: 4.75, comparisonYear: 4.70, confidenceLevel: 0.14 },
      { period: 'Feb 2024', thisYear: 4.60, comparisonYear: 4.55, confidenceLevel: 0.14 },
      { period: 'Mar 2024', thisYear: 4.25, comparisonYear: 4.20, confidenceLevel: 0.13 },
      { period: 'Apr 2024', thisYear: 4.05, comparisonYear: 4.00, confidenceLevel: 0.12 },
      { period: 'May 2024', thisYear: 3.85, comparisonYear: 3.80, confidenceLevel: 0.12 },
      { period: 'Jun 2024', thisYear: 3.90, comparisonYear: 3.85, confidenceLevel: 0.12 },
      { period: 'Jul 2024', thisYear: 4.00, comparisonYear: 3.95, confidenceLevel: 0.12 },
      { period: 'Aug 2024', thisYear: 4.22, comparisonYear: 4.18, confidenceLevel: 0.13 },
    ],
  },
  yearly: {
    2025: [
      { period: '2025', thisYear: 4.46, comparisonYear: 4.20, confidenceLevel: 0.13 },
    ],
    2024: [
      { period: '2024', thisYear: 4.20, comparisonYear: 4.15, confidenceLevel: 0.13 },
    ],
    2023: [
      { period: '2023', thisYear: 4.15, comparisonYear: 4.10, confidenceLevel: 0.12 },
    ],
  },
};

// Sample protein percentage data for Dairygold
export const proteinPercentageData = {
  weekly: {
    2025: [
      { period: 'Mar 15-21', thisYear: 3.42, comparisonYear: 3.26, confidenceLevel: 0.10 },
      { period: 'Mar 22-28', thisYear: 3.40, comparisonYear: 3.24, confidenceLevel: 0.10 },
      { period: 'Mar 29-Apr 4', thisYear: 3.38, comparisonYear: 3.22, confidenceLevel: 0.10 },
      { period: 'Apr 5-11', thisYear: 3.40, comparisonYear: 3.25, confidenceLevel: 0.10 },
      { period: 'Apr 12-18', thisYear: 3.42, comparisonYear: 3.28, confidenceLevel: 0.10 },
      { period: 'Apr 19-25', thisYear: 3.45, comparisonYear: 3.30, confidenceLevel: 0.10 },
      { period: 'Apr 26-May 2', thisYear: 3.48, comparisonYear: 3.33, confidenceLevel: 0.10 },
      { period: 'May 3-9', thisYear: 3.50, comparisonYear: 3.36, confidenceLevel: 0.11 },
    ],
    2024: [
      { period: 'Mar 15-21', thisYear: 3.26, comparisonYear: 3.20, confidenceLevel: 0.10 },
      { period: 'Mar 22-28', thisYear: 3.24, comparisonYear: 3.18, confidenceLevel: 0.10 },
      { period: 'Mar 29-Apr 4', thisYear: 3.22, comparisonYear: 3.16, confidenceLevel: 0.10 },
      { period: 'Apr 5-11', thisYear: 3.25, comparisonYear: 3.20, confidenceLevel: 0.10 },
      { period: 'Apr 12-18', thisYear: 3.28, comparisonYear: 3.22, confidenceLevel: 0.10 },
      { period: 'Apr 19-25', thisYear: 3.30, comparisonYear: 3.25, confidenceLevel: 0.10 },
      { period: 'Apr 26-May 2', thisYear: 3.33, comparisonYear: 3.28, confidenceLevel: 0.10 },
      { period: 'May 3-9', thisYear: 3.36, comparisonYear: 3.30, confidenceLevel: 0.10 },
    ],
  },
  monthly: {
    2025: [
      { period: 'Jan 2025', thisYear: 3.82, comparisonYear: 3.68, confidenceLevel: 0.11 },
      { period: 'Feb 2025', thisYear: 3.78, comparisonYear: 3.64, confidenceLevel: 0.11 },
      { period: 'Mar 2025', thisYear: 3.38, comparisonYear: 3.24, confidenceLevel: 0.10 },
      { period: 'Apr 2025', thisYear: 3.42, comparisonYear: 3.28, confidenceLevel: 0.10 },
      { period: 'May 2025', thisYear: 3.52, comparisonYear: 3.38, confidenceLevel: 0.11 },
      { period: 'Jun 2025', thisYear: 3.62, comparisonYear: 3.48, confidenceLevel: 0.11 },
      { period: 'Jul 2025', thisYear: 3.72, comparisonYear: 3.58, confidenceLevel: 0.11 },
      { period: 'Aug 2025', thisYear: 3.82, comparisonYear: 3.68, confidenceLevel: 0.11 },
    ],
    2024: [
      { period: 'Jan 2024', thisYear: 3.68, comparisonYear: 3.62, confidenceLevel: 0.11 },
      { period: 'Feb 2024', thisYear: 3.64, comparisonYear: 3.58, confidenceLevel: 0.11 },
      { period: 'Mar 2024', thisYear: 3.24, comparisonYear: 3.18, confidenceLevel: 0.10 },
      { period: 'Apr 2024', thisYear: 3.28, comparisonYear: 3.22, confidenceLevel: 0.10 },
      { period: 'May 2024', thisYear: 3.38, comparisonYear: 3.32, confidenceLevel: 0.10 },
      { period: 'Jun 2024', thisYear: 3.48, comparisonYear: 3.42, confidenceLevel: 0.10 },
      { period: 'Jul 2024', thisYear: 3.58, comparisonYear: 3.52, confidenceLevel: 0.11 },
      { period: 'Aug 2024', thisYear: 3.68, comparisonYear: 3.62, confidenceLevel: 0.11 },
    ],
  },
  yearly: {
    2025: [
      { period: '2025', thisYear: 3.64, comparisonYear: 3.50, confidenceLevel: 0.11 },
    ],
    2024: [
      { period: '2024', thisYear: 3.50, comparisonYear: 3.45, confidenceLevel: 0.11 },
    ],
    2023: [
      { period: '2023', thisYear: 3.45, comparisonYear: 3.40, confidenceLevel: 0.10 },
    ],
  },
};

// Sample lactose percentage data for Dairygold
export const lactosePercentageData = {
  weekly: {
    2025: [
      { period: 'Mar 15-21', thisYear: 4.78, comparisonYear: 4.68, confidenceLevel: 0.14 },
      { period: 'Mar 22-28', thisYear: 4.75, comparisonYear: 4.65, confidenceLevel: 0.14 },
      { period: 'Mar 29-Apr 4', thisYear: 4.72, comparisonYear: 4.62, confidenceLevel: 0.14 },
      { period: 'Apr 5-11', thisYear: 4.70, comparisonYear: 4.60, confidenceLevel: 0.14 },
      { period: 'Apr 12-18', thisYear: 4.68, comparisonYear: 4.58, confidenceLevel: 0.14 },
      { period: 'Apr 19-25', thisYear: 4.65, comparisonYear: 4.55, confidenceLevel: 0.14 },
      { period: 'Apr 26-May 2', thisYear: 4.62, comparisonYear: 4.52, confidenceLevel: 0.14 },
      { period: 'May 3-9', thisYear: 4.60, comparisonYear: 4.50, confidenceLevel: 0.14 },
    ],
    2024: [
      { period: 'Mar 15-21', thisYear: 4.68, comparisonYear: 4.58, confidenceLevel: 0.14 },
      { period: 'Mar 22-28', thisYear: 4.65, comparisonYear: 4.55, confidenceLevel: 0.14 },
      { period: 'Mar 29-Apr 4', thisYear: 4.62, comparisonYear: 4.52, confidenceLevel: 0.14 },
      { period: 'Apr 5-11', thisYear: 4.60, comparisonYear: 4.50, confidenceLevel: 0.14 },
      { period: 'Apr 12-18', thisYear: 4.58, comparisonYear: 4.48, confidenceLevel: 0.14 },
      { period: 'Apr 19-25', thisYear: 4.55, comparisonYear: 4.45, confidenceLevel: 0.14 },
      { period: 'Apr 26-May 2', thisYear: 4.52, comparisonYear: 4.42, confidenceLevel: 0.14 },
      { period: 'May 3-9', thisYear: 4.50, comparisonYear: 4.40, confidenceLevel: 0.13 },
    ],
  },
  monthly: {
    2025: [
      { period: 'Jan 2025', thisYear: 4.95, comparisonYear: 4.85, confidenceLevel: 0.15 },
      { period: 'Feb 2025', thisYear: 4.88, comparisonYear: 4.78, confidenceLevel: 0.15 },
      { period: 'Mar 2025', thisYear: 4.75, comparisonYear: 4.65, confidenceLevel: 0.14 },
      { period: 'Apr 2025', thisYear: 4.68, comparisonYear: 4.58, confidenceLevel: 0.14 },
      { period: 'May 2025', thisYear: 4.62, comparisonYear: 4.52, confidenceLevel: 0.14 },
      { period: 'Jun 2025', thisYear: 4.65, comparisonYear: 4.55, confidenceLevel: 0.14 },
      { period: 'Jul 2025', thisYear: 4.70, comparisonYear: 4.60, confidenceLevel: 0.14 },
      { period: 'Aug 2025', thisYear: 4.82, comparisonYear: 4.72, confidenceLevel: 0.14 },
    ],
    2024: [
      { period: 'Jan 2024', thisYear: 4.85, comparisonYear: 4.80, confidenceLevel: 0.15 },
      { period: 'Feb 2024', thisYear: 4.78, comparisonYear: 4.73, confidenceLevel: 0.14 },
      { period: 'Mar 2024', thisYear: 4.65, comparisonYear: 4.60, confidenceLevel: 0.14 },
      { period: 'Apr 2024', thisYear: 4.58, comparisonYear: 4.53, confidenceLevel: 0.14 },
      { period: 'May 2024', thisYear: 4.52, comparisonYear: 4.47, confidenceLevel: 0.14 },
      { period: 'Jun 2024', thisYear: 4.55, comparisonYear: 4.50, confidenceLevel: 0.14 },
      { period: 'Jul 2024', thisYear: 4.60, comparisonYear: 4.55, confidenceLevel: 0.14 },
      { period: 'Aug 2024', thisYear: 4.72, comparisonYear: 4.67, confidenceLevel: 0.14 },
    ],
  },
  yearly: {
    2025: [
      { period: '2025', thisYear: 4.76, comparisonYear: 4.66, confidenceLevel: 0.14 },
    ],
    2024: [
      { period: '2024', thisYear: 4.66, comparisonYear: 4.61, confidenceLevel: 0.14 },
    ],
    2023: [
      { period: '2023', thisYear: 4.61, comparisonYear: 4.56, confidenceLevel: 0.14 },
    ],
  },
}; 