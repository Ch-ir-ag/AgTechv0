/**
 * Company Data Loader
 * Utility functions to dynamically load company-specific data
 */

import { isValidCompany } from '../data/companies';
import * as lakelandDairiesData from '../data/companyData/lakeland-dairies';
import * as kerryDairyData from '../data/companyData/kerry-dairy';
import * as dairygoldData from '../data/companyData/dairygold';
import * as demoProcessorData from '../data/companyData/demo-processor';

// Define the structure of company stats
interface CompanyStats {
  currentMonthlyYield?: {
    value: string;
    label: string;
    confidenceInterval: string;
  };
  monthlyGrowthRate?: {
    value: string;
    label: string;
    confidenceInterval: string;
  };
  projectedAnnualYield?: {
    value: string;
    label: string;
    confidenceInterval: string;
  };
  predictionAccuracy?: {
    value: string;
    label: string;
    confidenceInterval: string;
  };
}

// Define the structure of company insights
interface CompanyInsight {
  title: string;
  description: string;
  icon: string;
}

// Define the complete company data structure
interface CompanyData {
  companyStats: CompanyStats;
  companyInsights: CompanyInsight[];
}

/**
 * Load company-specific data dynamically
 * This function will scale as more companies are added
 * @param companySlug - The company slug
 * @returns The company data object containing all needed data
 */
export function loadCompanyData(companySlug: string): CompanyData {
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
    case 'kerry-dairy':
      return {
        companyStats: kerryDairyData.companyStats || {},
        companyInsights: kerryDairyData.companyInsights || [],
        // Add any additional company data properties here
      };
    case 'dairygold':
      return {
        companyStats: dairygoldData.companyStats || {},
        companyInsights: dairygoldData.companyInsights || [],
      };
    case 'demo-processor':
      return {
        companyStats: demoProcessorData.companyStats || {},
        companyInsights: demoProcessorData.companyInsights || [],
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
 * @returns Default data structure
 */
function getDefaultCompanyData(): CompanyData {
  // Return a minimal data structure as a fallback
  return {
    companyStats: {},
    companyInsights: []
  };
} 