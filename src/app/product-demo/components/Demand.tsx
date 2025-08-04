'use client';

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DemandSection = () => {
  const [filterType, setFilterType] = useState<'product' | 'customer'>('product');
  const [timeFrame, setTimeFrame] = useState<'4weeks' | '6months'>('4weeks');
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());
  const [expandedCustomers, setExpandedCustomers] = useState<Set<string>>(new Set());

  const productData = [
    {
      id: 'p1',
      name: 'Organic Greek Yogurt',
      contractStatus: 'active',
      productionStatus: 'in_progress',
      deliveryDate: 'August 15, 2025',
      quantity: '5,000 units',
      value: '$25,000',
      priority: 'High',
      customerCount: 3,
      completionPercentage: 65,
      profitMargin: '18%',
      productionLine: 'Line A',
      qualityScore: 95,
      lastBatch: 'July 28, 2025',
      ingredients: ['Organic Milk', 'Live Cultures', 'Natural Flavoring'],
      packaging: '500g containers',
      shelfLife: '21 days',
      allergens: ['Milk']
    },
    {
      id: 'p2',
      name: 'Premium Cheese Blocks',
      contractStatus: 'pending',
      productionStatus: 'scheduled',
      deliveryDate: 'August 22, 2025',
      quantity: '2,500 units',
      value: '$75,000',
      priority: 'Medium',
      customerCount: 2,
      completionPercentage: 0,
      profitMargin: '28%',
      productionLine: 'Line B',
      qualityScore: 92,
      lastBatch: 'N/A - Scheduled',
      ingredients: ['Premium Milk', 'Rennet', 'Salt', 'Cultures'],
      packaging: '1kg blocks',
      shelfLife: '90 days',
      allergens: ['Milk']
    },
    {
      id: 'p3',
      name: 'Low-Fat Milk Powder',
      contractStatus: 'active',
      productionStatus: 'completed',
      deliveryDate: 'August 8, 2025',
      quantity: '10,000 units',
      value: '$40,000',
      priority: 'High',
      customerCount: 4,
      completionPercentage: 100,
      profitMargin: '22%',
      productionLine: 'Line C',
      qualityScore: 98,
      lastBatch: 'August 6, 2025',
      ingredients: ['Skim Milk'],
      packaging: '25kg bags',
      shelfLife: '2 years',
      allergens: ['Milk']
    },
    {
      id: 'p4',
      name: 'Whole Milk - Fresh',
      contractStatus: 'active',
      productionStatus: 'in_progress',
      deliveryDate: 'August 12, 2025',
      quantity: '15,000 L',
      value: '$18,000',
      priority: 'Medium',
      customerCount: 6,
      completionPercentage: 80,
      profitMargin: '15%',
      productionLine: 'Line A',
      qualityScore: 96,
      lastBatch: 'August 10, 2025',
      ingredients: ['Whole Milk'],
      packaging: '1L cartons',
      shelfLife: '7 days',
      allergens: ['Milk']
    }
  ];

  const customerData = [
    {
      id: 'c1',
      name: 'Whole Foods Market',
      budget: '$500,000',
      budgetUsed: '$320,000',
      currentOrders: [
        { product: 'Organic Greek Yogurt', quantity: '5,000 units', value: '$25,000', status: 'in_progress' },
        { product: 'Whole Milk - Fresh', quantity: '8,000 L', value: '$9,600', status: 'in_progress' }
      ],
      upcomingOrders: [
        { product: 'Organic Milk', quantity: '3,000 L', value: '$4,500', date: 'September 1, 2025' },
        { product: 'Cheese Blocks', quantity: '500 units', value: '$15,000', date: 'September 15, 2025' }
      ],
      satisfaction: 92,
      tier: 'Premium'
    },
    {
      id: 'c2',
      name: 'Target Corporation',
      budget: '$750,000',
      budgetUsed: '$475,000',
      currentOrders: [
        { product: 'Low-Fat Milk Powder', quantity: '10,000 units', value: '$40,000', status: 'completed' }
      ],
      upcomingOrders: [
        { product: 'Greek Yogurt Cups', quantity: '12,000 units', value: '$48,000', date: 'August 20, 2025' },
        { product: 'Cheese Sticks', quantity: '8,000 units', value: '$24,000', date: 'September 5, 2025' }
      ],
      satisfaction: 88,
      tier: 'Enterprise'
    },
    {
      id: 'c3',
      name: 'Costco Wholesale',
      budget: '$1,200,000',
      budgetUsed: '$650,000',
      currentOrders: [
        { product: 'Premium Cheese Blocks', quantity: '2,500 units', value: '$75,000', status: 'scheduled' }
      ],
      upcomingOrders: [
        { product: 'Bulk Yogurt Tubs', quantity: '20,000 units', value: '$120,000', date: 'August 25, 2025' },
        { product: 'Organic Powder', quantity: '5,000 kg', value: '$35,000', date: 'September 10, 2025' }
      ],
      satisfaction: 95,
      tier: 'Enterprise'
    }
  ];

  const forecastData = {
    '4weeks': [
      { period: 'Week 1', demand: 85, forecast: 88, actualOrders: 82 },
      { period: 'Week 2', demand: 92, forecast: 90, actualOrders: 94 },
      { period: 'Week 3', demand: 88, forecast: 94, actualOrders: 91 },
      { period: 'Week 4', demand: 95, forecast: 97, actualOrders: 96 }
    ],
    '6months': [
      { period: 'Aug', demand: 85, forecast: 88, actualOrders: 87 },
      { period: 'Sep', demand: 92, forecast: 90, actualOrders: 89 },
      { period: 'Oct', demand: 88, forecast: 94, actualOrders: 93 },
      { period: 'Nov', demand: 78, forecast: 75, actualOrders: 76 },
      { period: 'Dec', demand: 82, forecast: 80, actualOrders: 81 },
      { period: 'Jan', demand: 88, forecast: 92, actualOrders: 90 }
    ]
  };

  const toggleProductExpansion = (productId: string) => {
    const newExpanded = new Set(expandedProducts);
    if (newExpanded.has(productId)) {
      newExpanded.delete(productId);
    } else {
      newExpanded.add(productId);
    }
    setExpandedProducts(newExpanded);
  };

  const toggleCustomerExpansion = (customerId: string) => {
    const newExpanded = new Set(expandedCustomers);
    if (newExpanded.has(customerId)) {
      newExpanded.delete(customerId);
    } else {
      newExpanded.add(customerId);
    }
    setExpandedCustomers(newExpanded);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#1E4B3A' }}>Demand Management</h2>
      
      {/* Filter Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setFilterType('product')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filterType === 'product' 
                ? 'text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={filterType === 'product' ? { backgroundColor: '#1E4B3A' } : {}}
          >
            By Product
          </button>
          <button
            onClick={() => setFilterType('customer')}
            className={`px-4 py-2 rounded-lg font-medium ${
              filterType === 'customer' 
                ? 'text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={filterType === 'customer' ? { backgroundColor: '#1E4B3A' } : {}}
          >
            By Customer
          </button>
        </div>

        {/* Product View */}
        {filterType === 'product' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold" style={{ color: '#1E4B3A' }}>Product Orders</h3>
              <div className="text-sm text-gray-600">
                {productData.length} active products • Total value: ${productData.reduce((sum, p) => sum + parseInt(p.value.replace(/[$,]/g, '')), 0).toLocaleString()}
              </div>
            </div>
            
            {productData.map((product) => {
              const isExpanded = expandedProducts.has(product.id);
              return (
                <div key={product.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div 
                    className="flex justify-between items-start mb-4 cursor-pointer"
                    onClick={() => toggleProductExpansion(product.id)}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900 text-lg">{product.name}</h4>
                        <svg 
                          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className={`text-xs font-medium ${
                          product.priority === 'High' ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {product.priority} Priority
                        </span>
                        <span className="text-gray-500 text-sm">{product.customerCount} customers</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold" style={{ color: '#1E4B3A' }}>{product.value}</span>
                      <div className="text-xs text-gray-600 mt-1">{product.quantity}</div>
                    </div>
                  </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                  <div>
                    <span className="text-gray-600 text-sm">Contract Status:</span>
                    <div className={`mt-1 text-sm font-medium ${
                      product.contractStatus === 'active' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {product.contractStatus.charAt(0).toUpperCase() + product.contractStatus.slice(1)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Production Status:</span>
                    <div className={`mt-1 text-sm font-medium ${
                      product.productionStatus === 'completed' ? 'text-green-600' : 
                      product.productionStatus === 'in_progress' ? 'text-blue-600' : 
                      'text-gray-600'
                    }`}>
                      {product.productionStatus.replace('_', ' ').charAt(0).toUpperCase() + product.productionStatus.replace('_', ' ').slice(1)}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Delivery Date:</span>
                    <div className="mt-1 font-medium text-gray-900">{product.deliveryDate}</div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                      <div>
                        <span className="text-gray-600 text-sm">Profit Margin:</span>
                        <div className="mt-1 text-lg font-bold text-green-600">{product.profitMargin}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm">Production Line:</span>
                        <div className="mt-1 font-medium text-gray-900">{product.productionLine}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm">Quality Score:</span>
                        <div className="mt-1 text-lg font-bold" style={{ color: '#1E4B3A' }}>{product.qualityScore}%</div>
                      </div>
                      <div>
                        <span className="text-gray-600 text-sm">Last Batch:</span>
                        <div className="mt-1 font-medium text-gray-900">{product.lastBatch}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-3">Product Details</h5>
                        <div className="space-y-2">
                          <div>
                            <span className="text-gray-600 text-sm">Packaging:</span>
                            <div className="mt-1 text-sm text-gray-900">{product.packaging}</div>
                          </div>
                          <div>
                            <span className="text-gray-600 text-sm">Shelf Life:</span>
                            <div className="mt-1 text-sm text-gray-900">{product.shelfLife}</div>
                          </div>
                          <div>
                            <span className="text-gray-600 text-sm">Allergens:</span>
                            <div className="mt-1 text-sm text-gray-900">{product.allergens.join(', ')}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-700 mb-3">Ingredients</h5>
                        <div className="space-y-1">
                          {product.ingredients.map((ingredient, index) => (
                            <div key={index} className="bg-gray-50 px-3 py-2 rounded-md text-sm text-gray-700">
                              {ingredient}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Production Progress</span>
                    <span className="font-medium">{product.completionPercentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${product.completionPercentage}%`,
                        backgroundColor: product.completionPercentage === 100 ? '#10B981' : 
                                       product.completionPercentage > 50 ? '#3B82F6' : '#F59E0B'
                      }}
                    ></div>
                  </div>
                </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Customer View */}
        {filterType === 'customer' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold" style={{ color: '#1E4B3A' }}>Customer Orders</h3>
              <div className="text-sm text-gray-600">
                {customerData.length} active customers • Total budget: ${customerData.reduce((sum, c) => sum + parseInt(c.budget.replace(/[$,]/g, '')), 0).toLocaleString()}
              </div>
            </div>
            
            {customerData.map((customer) => {
              const budgetUsedAmount = parseInt(customer.budgetUsed.replace(/[$,]/g, ''));
              const totalBudget = parseInt(customer.budget.replace(/[$,]/g, ''));
              const budgetUsedPercentage = (budgetUsedAmount / totalBudget) * 100;
              const isExpanded = expandedCustomers.has(customer.id);
              
              return (
                <div key={customer.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div 
                    className="flex justify-between items-start mb-4 cursor-pointer"
                    onClick={() => toggleCustomerExpansion(customer.id)}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-900 text-lg">{customer.name}</h4>
                        <svg 
                          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className={`text-xs font-medium ${
                          customer.tier === 'Enterprise' ? 'text-purple-600' : 'text-blue-600'
                        }`}>
                          {customer.tier}
                        </span>
                        <span className="text-gray-500 text-sm">Satisfaction: {customer.satisfaction}%</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold" style={{ color: '#1E4B3A' }}>{customer.budget}</div>
                      <div className="text-xs text-gray-600">Annual Budget</div>
                    </div>
                  </div>

                  {/* Budget Usage Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Budget Utilization</span>
                      <span className="font-medium">{customer.budgetUsed} ({budgetUsedPercentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${budgetUsedPercentage}%`,
                          backgroundColor: budgetUsedPercentage > 80 ? '#EF4444' : 
                                         budgetUsedPercentage > 60 ? '#F59E0B' : '#10B981'
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Always visible summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <span className="text-gray-600 text-sm">Current Orders:</span>
                      <div className="mt-1 text-xl font-bold text-blue-600">{customer.currentOrders.length}</div>
                    </div>
                    <div>
                      <span className="text-gray-600 text-sm">Upcoming Orders:</span>
                      <div className="mt-1 text-xl font-bold text-green-600">{customer.upcomingOrders.length}</div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h5 className="font-medium text-gray-700 mb-3 flex items-center">
                            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                            Current Orders ({customer.currentOrders.length})
                          </h5>
                          <div className="space-y-2">
                            {customer.currentOrders.map((order, index) => (
                              <div key={index} className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="font-medium text-gray-900">{order.product}</div>
                                    <div className="text-sm text-gray-600">{order.quantity}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-semibold text-blue-600">{order.value}</div>
                                    <div className={`text-xs font-medium mt-1 ${
                                      order.status === 'completed' ? 'text-green-600' :
                                      order.status === 'in_progress' ? 'text-blue-600' :
                                      'text-gray-600'
                                    }`}>
                                      {order.status.replace('_', ' ')}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-gray-700 mb-3 flex items-center">
                            <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                            Upcoming Orders ({customer.upcomingOrders.length})
                          </h5>
                          <div className="space-y-2">
                            {customer.upcomingOrders.map((order, index) => (
                              <div key={index} className="bg-green-50 border border-green-200 p-3 rounded-lg">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="font-medium text-gray-900">{order.product}</div>
                                    <div className="text-sm text-gray-600">{order.quantity}</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-semibold text-green-600">{order.value}</div>
                                    <div className="text-xs text-gray-600 mt-1">{order.date}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Additional customer metrics in expanded view */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <span className="text-gray-600 text-sm">Total Orders Value:</span>
                          <div className="mt-1 text-lg font-bold" style={{ color: '#1E4B3A' }}>
                            ${[...customer.currentOrders, ...customer.upcomingOrders]
                              .reduce((sum, order) => sum + parseInt(order.value.replace(/[$,]/g, '')), 0)
                              .toLocaleString()}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <span className="text-gray-600 text-sm">Average Order Value:</span>
                          <div className="mt-1 text-lg font-bold text-blue-600">
                            ${Math.round([...customer.currentOrders, ...customer.upcomingOrders]
                              .reduce((sum, order) => sum + parseInt(order.value.replace(/[$,]/g, '')), 0) / 
                              [...customer.currentOrders, ...customer.upcomingOrders].length
                            ).toLocaleString()}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <span className="text-gray-600 text-sm">Remaining Budget:</span>
                          <div className="mt-1 text-lg font-bold text-green-600">
                            ${(totalBudget - budgetUsedAmount).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Demand Forecast Chart */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold" style={{ color: '#1E4B3A' }}>Demand Forecast & Analytics</h3>
            <p className="text-sm text-gray-600 mt-1">AI-powered demand prediction with confidence intervals</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeFrame('4weeks')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeFrame === '4weeks' 
                  ? 'text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={timeFrame === '4weeks' ? { backgroundColor: '#1E4B3A' } : {}}
            >
              4 Weeks
            </button>
            <button
              onClick={() => setTimeFrame('6months')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeFrame === '6months' 
                  ? 'text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={timeFrame === '6months' ? { backgroundColor: '#1E4B3A' } : {}}
            >
              6 Months
            </button>
          </div>
        </div>

        {/* Chart */}
        <div className="h-80 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData[timeFrame]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="period" 
                tick={{ fontSize: 12 }}
                stroke="#6B7280"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#6B7280"
                label={{ value: 'Demand Units', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value: number | string, name: string) => [
                  typeof value === 'number' ? value.toFixed(0) : value,
                  name === 'demand' ? 'Historical Demand' :
                  name === 'forecast' ? 'AI Forecast' :
                  name === 'actualOrders' ? 'Actual Orders' : name
                ]}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="demand" 
                stroke="#1E4B3A" 
                strokeWidth={3}
                name="Historical Demand"
                dot={{ fill: '#1E4B3A', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#3B82F6" 
                strokeWidth={3}
                strokeDasharray="5 5"
                name="AI Forecast"
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="actualOrders" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Actual Orders"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-sm font-medium text-green-800 mb-1">
              Growth Trend
            </div>
            <div className="text-xs text-green-700">
              {timeFrame === '4weeks' 
                ? '+8.2% demand increase expected over next 4 weeks' 
                : '+12.5% demand growth projected for next 6 months'}
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-sm font-medium text-blue-800 mb-1">
              Accuracy Rate
            </div>
            <div className="text-xs text-blue-700">
              {timeFrame === '4weeks' 
                ? 'AI forecast accuracy: 94.2% (last 4 weeks)' 
                : 'AI forecast accuracy: 91.8% (last 6 months)'}
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="text-sm font-medium text-purple-800 mb-1">
              Peak Period
            </div>
            <div className="text-xs text-purple-700">
              {timeFrame === '4weeks' 
                ? 'Highest demand expected: Week 4 (97 units)' 
                : 'Peak season anticipated: October (+94 units)'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemandSection;