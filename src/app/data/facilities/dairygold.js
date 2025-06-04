/**
 * Dairygold Facilities Data
 * Contains information about Dairygold's processing facilities and collection centers
 */

export const dairygoldFacilities = {
  mitchelstown: {
    id: 'mitchelstown',
    name: 'Mitchelstown Processing Facility',
    location: 'Mitchelstown, Co. Cork',
    type: 'Primary Processing',
    capacity: '1.8B liters annually',
    products: ['Milk Powder', 'Cheese', 'Butter', 'Nutritional Products'],
    employees: 450,
    coordinates: [52.2658, -8.2678],
    established: 1919,
    description: 'Main processing facility and headquarters'
  },
  mallow: {
    id: 'mallow',
    name: 'Mallow Processing Plant',
    location: 'Mallow, Co. Cork',
    type: 'Secondary Processing',
    capacity: '500M liters annually',
    products: ['Nutritional Products', 'Ingredients', 'Specialized Dairy Products'],
    employees: 180,
    coordinates: [52.1394, -8.6503],
    established: 1985,
    description: 'Specialized processing for nutritional and ingredient products'
  },
  moorepark: {
    id: 'moorepark',
    name: 'Moorepark Food Research Centre',
    location: 'Fermoy, Co. Cork',
    type: 'Research & Development',
    capacity: 'Research Facility',
    products: ['Research', 'Product Development', 'Innovation'],
    employees: 120,
    coordinates: [52.1540, -8.2420],
    established: 1988,
    description: 'World-class dairy research and innovation center'
  },
  charleville: {
    id: 'charleville',
    name: 'Charleville Collection Center',
    location: 'Charleville, Co. Cork',
    type: 'Collection & Processing',
    capacity: '300M liters annually',
    products: ['Milk Collection', 'Initial Processing', 'Quality Testing'],
    employees: 85,
    coordinates: [52.3522, -8.6784],
    established: 1995,
    description: 'Regional collection and processing hub'
  },
  kanturk: {
    id: 'kanturk',
    name: 'Kanturk Collection Center',
    location: 'Kanturk, Co. Cork',
    type: 'Collection Center',
    capacity: '200M liters annually',
    products: ['Milk Collection', 'Quality Testing', 'Cooling'],
    employees: 45,
    coordinates: [52.1795, -8.9109],
    established: 2001,
    description: 'Modern milk collection and cooling facility'
  }
};

export const facilitiesData = {
  totalFacilities: 5,
  processingCapacity: '1.3B liters annually',
  employeeCount: 880,
  primaryRegions: ['Cork', 'Kerry', 'Limerick', 'Tipperary', 'Waterford'],
  mainProducts: ['Milk Powder', 'Cheese', 'Butter', 'Nutritional Products', 'Ingredients'],
  established: 1919,
  cooperativeMembers: 3500,
  exportMarkets: ['UK', 'EU', 'Middle East', 'Asia', 'Africa']
};

export const regionalCollectionData = {
  cork: {
    percentage: 60,
    farms: 2100,
    averageHerdSize: 95,
    annualProduction: '1.38B liters',
    facilities: ['mitchelstown', 'mallow', 'charleville', 'kanturk']
  },
  kerry: {
    percentage: 15,
    farms: 525,
    averageHerdSize: 85,
    annualProduction: '345M liters',
    facilities: ['mitchelstown']
  },
  limerick: {
    percentage: 12,
    farms: 420,
    averageHerdSize: 90,
    annualProduction: '276M liters',
    facilities: ['mitchelstown', 'charleville']
  },
  tipperary: {
    percentage: 8,
    farms: 280,
    averageHerdSize: 88,
    annualProduction: '184M liters',
    facilities: ['mitchelstown']
  },
  waterford: {
    percentage: 5,
    farms: 175,
    averageHerdSize: 82,
    annualProduction: '115M liters',
    facilities: ['mitchelstown']
  }
}; 