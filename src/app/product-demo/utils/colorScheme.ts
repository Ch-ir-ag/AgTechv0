/**
 * Consistent Color Scheme for Product Demo
 * Each color represents a semantic meaning across all components
 */

export interface ColorConfig {
  dot: string;
  text: string;
  bg: string;
  accent: string;
}

// Standard color scheme with semantic meanings
export const PRODUCT_COLORS = {
  // Dairy Products - Blue family
  'dairy-primary': { dot: 'bg-blue-500', text: 'text-blue-600', bg: 'bg-blue-50', accent: 'border-blue-200' },
  'dairy-secondary': { dot: 'bg-blue-400', text: 'text-blue-500', bg: 'bg-blue-25', accent: 'border-blue-100' },
  
  // Premium Products - Purple family  
  'premium': { dot: 'bg-purple-500', text: 'text-purple-600', bg: 'bg-purple-50', accent: 'border-purple-200' },
  'premium-secondary': { dot: 'bg-purple-400', text: 'text-purple-500', bg: 'bg-purple-25', accent: 'border-purple-100' },
  
  // Processed Products - Indigo family
  'processed': { dot: 'bg-indigo-500', text: 'text-indigo-600', bg: 'bg-indigo-50', accent: 'border-indigo-200' },
  'processed-secondary': { dot: 'bg-indigo-400', text: 'text-indigo-500', bg: 'bg-indigo-25', accent: 'border-indigo-100' },
} as const;

// Status indicators with consistent meanings
export const STATUS_COLORS = {
  // Operational Status
  'active': { dot: 'bg-green-500', text: 'text-green-600', bg: 'bg-green-50', accent: 'border-green-200' },
  'running': { dot: 'bg-green-500', text: 'text-green-600', bg: 'bg-green-50', accent: 'border-green-200' },
  'completed': { dot: 'bg-green-400', text: 'text-green-600', bg: 'bg-green-25', accent: 'border-green-100' },
  
  // Warning Status
  'warning': { dot: 'bg-yellow-500', text: 'text-yellow-600', bg: 'bg-yellow-50', accent: 'border-yellow-200' },
  'medium': { dot: 'bg-yellow-500', text: 'text-yellow-600', bg: 'bg-yellow-50', accent: 'border-yellow-200' },
  'pending': { dot: 'bg-yellow-400', text: 'text-yellow-500', bg: 'bg-yellow-25', accent: 'border-yellow-100' },
  
  // Critical Status
  'critical': { dot: 'bg-red-500', text: 'text-red-600', bg: 'bg-red-50', accent: 'border-red-200' },
  'high': { dot: 'bg-red-500', text: 'text-red-600', bg: 'bg-red-50', accent: 'border-red-200' },
  'offline': { dot: 'bg-red-400', text: 'text-red-500', bg: 'bg-red-25', accent: 'border-red-100' },
  
  // In Progress Status
  'in_progress': { dot: 'bg-blue-500', text: 'text-blue-600', bg: 'bg-blue-50', accent: 'border-blue-200' },
  'planned': { dot: 'bg-blue-400', text: 'text-blue-500', bg: 'bg-blue-25', accent: 'border-blue-100' },
  
  // Maintenance Status
  'maintenance': { dot: 'bg-orange-500', text: 'text-orange-600', bg: 'bg-orange-50', accent: 'border-orange-200' },
  'scheduled': { dot: 'bg-orange-400', text: 'text-orange-500', bg: 'bg-orange-25', accent: 'border-orange-100' },
  
  // Neutral Status
  'inactive': { dot: 'bg-gray-400', text: 'text-gray-600', bg: 'bg-gray-50', accent: 'border-gray-200' },
  'neutral': { dot: 'bg-gray-300', text: 'text-gray-500', bg: 'bg-gray-25', accent: 'border-gray-100' },
  'low': { dot: 'bg-gray-400', text: 'text-gray-600', bg: 'bg-gray-50', accent: 'border-gray-200' },
} as const;

// Helper functions
export const getProductColor = (productType: string): ColorConfig => {
  // Dairy products
  if (productType.toLowerCase().includes('milk') || 
      productType.toLowerCase().includes('cream') || 
      productType.toLowerCase().includes('butter')) {
    return PRODUCT_COLORS['dairy-primary'];
  }
  
  // Premium/Greek/Organic products
  if (productType.toLowerCase().includes('greek') || 
      productType.toLowerCase().includes('premium') || 
      productType.toLowerCase().includes('organic')) {
    return PRODUCT_COLORS['premium'];
  }
  
  // Processed products (cheese, powder, etc.)
  if (productType.toLowerCase().includes('cheese') || 
      productType.toLowerCase().includes('powder') || 
      productType.toLowerCase().includes('yogurt')) {
    return PRODUCT_COLORS['processed'];
  }
  
  // Default to dairy secondary
  return PRODUCT_COLORS['dairy-secondary'];
};

export const getStatusColor = (status: string): ColorConfig => {
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, '_');
  return STATUS_COLORS[normalizedStatus as keyof typeof STATUS_COLORS] || STATUS_COLORS['neutral'];
};

export const getPriorityColor = (priority: string): ColorConfig => {
  const normalizedPriority = priority.toLowerCase();
  return STATUS_COLORS[normalizedPriority as keyof typeof STATUS_COLORS] || STATUS_COLORS['neutral'];
};