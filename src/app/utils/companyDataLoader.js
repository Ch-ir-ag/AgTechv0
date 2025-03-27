/**
 * Company Data Loader
 * Utility functions to dynamically load company-specific data
 */

import { isValidCompany } from '../data/companies';
import * as lakelandDairiesData from '../data/companyData/lakeland-dairies';

/**
 * Load company-specific data dynamically
 * This function will scale as more companies are added
 * @param {string} companySlug - The company slug
 * @returns {object} - The company data object containing all needed data
 */
export function loadCompanyData(companySlug) {
  // Validate the company exists
  if (!isValidCompany(companySlug)) {
    // Return default data if company not found
    // This is a fallback, but the page component should handle invalid companies
    return getDefaultCompanyData();
  }

  // Extract and return data for specific companies
  // This ensures we're returning plain objects, not modules
  switch (companySlug) {
    case 'lakeland-dairies':
      return {
        companyStats: lakelandDairiesData.companyStats || {},
        companyInsights: lakelandDairiesData.companyInsights || [],
        // Add any additional company data properties here
      };
    // Add more cases as more companies are added
    // case 'example-company':
    //   return {
    //     companyStats: exampleCompanyData.companyStats || {},
    //     companyInsights: exampleCompanyData.companyInsights || [],
    //   };
    default:
      return getDefaultCompanyData();
  }
}

/**
 * Get default company data (fallback)
 * @returns {object} - Default data structure
 */
function getDefaultCompanyData() {
  // Return a minimal data structure as a fallback
  return {
    companyStats: {},
    companyInsights: []
  };
} 