/**
 * Chart Data Loader
 * Utility functions to dynamically load company-specific chart data
 */

import { isValidCompany } from '../data/companies';
import * as lakelandDairiesChartData from '../data/chartData/lakeland-dairies';
import * as kerryDairyChartData from '../data/chartData/kerry-dairy';
import * as dairygoldChartData from '../data/chartData/dairygold';

/**
 * Load company-specific chart data dynamically
 * This function will scale as more companies are added
 * @param {string} companySlug - The company slug
 * @returns {object} - The company's chart data
 */
export function loadChartData(companySlug) {
  // Validate the company exists
  if (!isValidCompany(companySlug)) {
    // Return default data if company not found
    return getDefaultChartData();
  }

  // Extract and return data for specific companies
  switch (companySlug) {
    case 'lakeland-dairies':
      return {
        milkYieldData: lakelandDairiesChartData.milkYieldData || {},
        fatPercentageData: lakelandDairiesChartData.fatPercentageData || {},
        proteinPercentageData: lakelandDairiesChartData.proteinPercentageData || {},
        lactosePercentageData: lakelandDairiesChartData.lactosePercentageData || {},
      };
    case 'kerry-dairy':
      return {
        milkYieldData: kerryDairyChartData.milkYieldData || {},
        fatPercentageData: kerryDairyChartData.fatPercentageData || {},
        proteinPercentageData: kerryDairyChartData.proteinPercentageData || {},
        lactosePercentageData: kerryDairyChartData.lactosePercentageData || {},
      };
    case 'dairygold':
      return {
        milkYieldData: dairygoldChartData.milkYieldData || {},
        fatPercentageData: dairygoldChartData.fatPercentageData || {},
        proteinPercentageData: dairygoldChartData.proteinPercentageData || {},
        lactosePercentageData: dairygoldChartData.lactosePercentageData || {},
      };
    // Add more cases as more companies are added
    default:
      return getDefaultChartData();
  }
}

/**
 * Provide default chart data if company-specific data is not available
 * @returns {object} - Default chart data
 */
function getDefaultChartData() {
  // Return Lakeland Dairies data as default for now
  return {
    milkYieldData: lakelandDairiesChartData.milkYieldData || {},
    fatPercentageData: lakelandDairiesChartData.fatPercentageData || {},
    proteinPercentageData: lakelandDairiesChartData.proteinPercentageData || {},
    lactosePercentageData: lakelandDairiesChartData.lactosePercentageData || {},
  };
} 