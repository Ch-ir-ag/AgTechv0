/**
 * Companies data and configuration
 * This file centralizes all company-related data and configurations
 */

// List of all supported companies and their settings
export const companies = {
  'lakeland-dairies': {
    name: 'Lakeland Dairies',
    slug: 'lakeland-dairies',
    // Add more company-specific configurations here
    // theme: 'blue', // future use
    // logoVariant: 'default', // future use
  },
  'kerry-dairy': {
    name: 'Kerry Dairy',
    slug: 'kerry-dairy',
    // Add more company-specific configurations here
  },
  // Add more companies as they come onboard
  // 'example-company': {
  //   name: 'Example Company',
  //   slug: 'example-company',
  // }
};

/**
 * Check if a company slug is valid
 * @param {string} companySlug - The company slug to validate
 * @returns {boolean} - Whether the company is valid
 */
export function isValidCompany(companySlug) {
  return Object.keys(companies).includes(companySlug);
}

/**
 * Get company data by slug
 * @param {string} companySlug - The company slug
 * @returns {object|null} - The company data or null if not found
 */
export function getCompanyData(companySlug) {
  return companies[companySlug] || null;
}

/**
 * Format company name from slug (e.g., "lakeland-dairies" -> "Lakeland Dairies")
 * @param {string} companySlug - The company slug
 * @returns {string} - The formatted company name
 */
export function formatCompanyName(companySlug) {
  // Use the pre-defined name if available
  if (companies[companySlug]) {
    return companies[companySlug].name;
  }
  
  // Fallback to slug formatting
  return companySlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
} 