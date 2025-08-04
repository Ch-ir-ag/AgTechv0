'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Sample data for production lines and products
const productionLines = [
  {
    id: 'L1',
    name: 'Line 1 - Premium Dairy',
    capacity: 25000,
    currentProduct: 'Cream',
    recommendedProduct: 'Skim Milk',
    efficiency: 94,
    costPerUnit: 0.48,
    projectedMargin: 0.32,
    expectedOutput: 23500
  },
  {
    id: 'L2',
    name: 'Line 2 - Standard Processing',
    capacity: 30000,
    currentProduct: 'Whole Milk',
    recommendedProduct: 'Whole Milk',
    efficiency: 97,
    costPerUnit: 0.42,
    projectedMargin: 0.28,
    expectedOutput: 29100
  },
  {
    id: 'L3',
    name: 'Line 3 - Low Fat Production',
    capacity: 22000,
    currentProduct: 'Cream',
    recommendedProduct: 'Skim Milk',
    efficiency: 89,
    costPerUnit: 0.45,
    projectedMargin: 0.25,
    expectedOutput: 19580
  },
  {
    id: 'L4',
    name: 'Line 4 - High Protein',
    capacity: 18000,
    currentProduct: 'Whole Milk',
    recommendedProduct: 'High Protein Milk',
    efficiency: 92,
    costPerUnit: 0.52,
    projectedMargin: 0.38,
    expectedOutput: 16560
  }
];

// Product demand forecast data
const productDemand = [
  { product: 'Skim Milk', currentDemand: 45000, forecastedDemand: 52000, inventory: 8500, priority: 'high' },
  { product: 'Whole Milk', currentDemand: 38000, forecastedDemand: 41000, inventory: 12000, priority: 'medium' },
  { product: 'Cream', currentDemand: 15000, forecastedDemand: 12000, inventory: 3500, priority: 'low' },
  { product: 'High Protein Milk', currentDemand: 8000, forecastedDemand: 9500, inventory: 1200, priority: 'high' }
];

// Overall performance metrics
const performanceMetrics = {
  overallEfficiency: 93.0,
  totalRevenue: 125000,
  avgMargin: 0.31,
  totalOutput: 88740
};

// AI Assistant messages and responses
interface AssistantMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const suggestedQuestions = [
  "Why should Line 3 switch to Skim Milk?",
  "What's the revenue impact of these recommendations?",
  "How does this affect inventory levels?",
  "Show me efficiency optimisation scenarios"
];

const ProductAllocationSection = () => {
  const [activeLineId, setActiveLineId] = useState<string | null>(null);

  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 1,
      text: "Hello! I'm here to help you optimise product allocation across production lines. I can explain recommendations, revenue impacts, and efficiency improvements.",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const findResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('line 3') || lowerQuestion.includes('skim milk')) {
      return "Line 3 should switch to Skim Milk because forecasted demand is 52,000L vs current 45,000L, while Cream demand is decreasing. This would improve efficiency from 89% to 94% and increase projected margin by €0.08 per unit.";
    } else if (lowerQuestion.includes('revenue') || lowerQuestion.includes('impact')) {
      return "The recommended allocation would increase total revenue by €18,500 monthly. Line 3's switch to Skim Milk contributes €7,200, while Line 4's High Protein Milk adds €11,300. Overall margin improves from 28% to 31%.";
    } else if (lowerQuestion.includes('inventory') || lowerQuestion.includes('stock')) {
      return "Current inventory levels show Skim Milk at 8,500L (19% of demand), High Protein Milk at 1,200L (15% of demand) - both critical. The allocation reduces stock-out risk by 65% and improves inventory turnover by 23%.";
    } else if (lowerQuestion.includes('efficiency') || lowerQuestion.includes('scenarios')) {
      return "Revenue optimisation analysis: Current allocation achieves 93% efficiency with €125K revenue. The recommended changes focus on maximising revenue while maintaining operational efficiency. This approach prioritises profit margins and market demand over pure efficiency metrics.";
    } else {
      return "I can help you understand product allocation optimisation, revenue analysis, inventory management, and efficiency scenarios. What specific aspect would you like to explore?";
    }
  };

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || newMessage.trim();
    if (!text) return;

    const userMessage: AssistantMessage = {
      id: messages.length + 1,
      text: text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: AssistantMessage = {
        id: messages.length + 2,
        text: findResponse(text),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 95) return 'text-green-600';
    if (efficiency >= 90) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold" style={{ color: '#1E4B3A' }}>Product Allocation Optimisation</h2>
          <p className="text-gray-600">Optimise product assignments across production lines based on real-time and forecasted variables</p>
        </div>

        {/* Performance Overview Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold" style={{ color: '#1E4B3A' }}>{performanceMetrics.overallEfficiency}%</div>
            <div className="text-sm text-gray-600">Overall Efficiency</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold" style={{ color: '#1E4B3A' }}>€{(performanceMetrics.totalRevenue / 1000).toFixed(0)}K</div>
            <div className="text-sm text-gray-600">Monthly Revenue</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold" style={{ color: '#1E4B3A' }}>{(performanceMetrics.avgMargin * 100).toFixed(0)}%</div>
            <div className="text-sm text-gray-600">Average Margin</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold" style={{ color: '#1E4B3A' }}>{(performanceMetrics.totalOutput / 1000).toFixed(0)}K L</div>
            <div className="text-sm text-gray-600">Total Output</div>
          </div>
        </div>
      </div>

      {/* Revenue Focus Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold" style={{ color: '#1E4B3A' }}>Revenue Optimisation</h3>
        </div>

        {/* Production Lines */}
        <div className="space-y-4">
          {productionLines.map((line) => {
            const isExpanded = activeLineId === line.id;
            const hasRecommendation = line.currentProduct !== line.recommendedProduct;
            
            return (
              <div key={line.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setActiveLineId(isExpanded ? null : line.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h4 className="font-medium" style={{ color: '#1E4B3A' }}>{line.name}</h4>
                        <p className="text-sm text-gray-600">
                          Current: {line.currentProduct} | 
                          Recommended: <span className="font-medium">{line.recommendedProduct}</span> | 
                          Efficiency: <span className={getEfficiencyColor(line.efficiency)}>{line.efficiency}%</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">€{line.projectedMargin}/L</div>
                        <div className="text-xs text-gray-500">Projected margin</div>
                      </div>
                      {hasRecommendation && (
                        <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          Change Recommended
                        </div>
                      )}
                      <div className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                        ▼
                      </div>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200 bg-gray-50"
                    >
                      <div className="p-4 space-y-4">
                        {/* Line Details */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white rounded p-3">
                            <div className="text-lg font-semibold">{line.capacity.toLocaleString()} L</div>
                            <div className="text-xs text-gray-600">Capacity</div>
                          </div>
                          <div className="bg-white rounded p-3">
                            <div className="text-lg font-semibold">{line.expectedOutput.toLocaleString()} L</div>
                            <div className="text-xs text-gray-600">Expected Output</div>
                          </div>
                        </div>

                        {/* Product Comparison */}
                        <div>
                          <h5 className="font-medium mb-2" style={{ color: '#1E4B3A' }}>Product Allocation Analysis</h5>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded border border-gray-200 p-3">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Current: {line.currentProduct}</span>
                                <span className="text-sm text-gray-500">€{line.costPerUnit}/L</span>
                              </div>
                              <div className="text-xs text-gray-600">
                                Efficiency: {line.efficiency}% | Output: {line.expectedOutput.toLocaleString()}L
                              </div>
                            </div>
                            <div className="bg-white rounded border border-blue-200 p-3 bg-blue-50">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Recommended: {line.recommendedProduct}</span>
                                <span className="text-sm text-blue-600">€{(line.costPerUnit + 0.02).toFixed(2)}/L</span>
                              </div>
                              <div className="text-xs text-blue-600">
                                Efficiency: {line.efficiency + 3}% | Output: {(line.expectedOutput * 1.05).toLocaleString()}L
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-white rounded p-3">
                            <div className="text-lg font-semibold" style={{ color: line.efficiency >= 95 ? '#059669' : line.efficiency >= 90 ? '#D97706' : '#DC2626' }}>
                              {line.efficiency}%
                            </div>
                            <div className="text-xs text-gray-600">Efficiency</div>
                          </div>
                          <div className="bg-white rounded p-3">
                            <div className="text-lg font-semibold">€{line.projectedMargin}</div>
                            <div className="text-xs text-gray-600">Projected Margin</div>
                          </div>
                          <div className="bg-white rounded p-3">
                            <div className="text-lg font-semibold">€{(line.projectedMargin * line.expectedOutput).toFixed(0)}</div>
                            <div className="text-xs text-gray-600">Total Revenue</div>
                          </div>
                        </div>

                        {/* AI Recommendation Banner */}
                        {hasRecommendation && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div>
                              <p className="text-sm font-medium text-blue-800">Daisy AI Recommendation</p>
                              <p className="text-xs text-blue-600">
                                Switch from {line.currentProduct} to {line.recommendedProduct} for improved revenue and better resource utilisation.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Demand Forecast Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#1E4B3A' }}>Product Demand Forecast</h3>
        <div className="space-y-3">
          {productDemand.map((product) => (
            <div key={product.product} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="font-medium">{product.product}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(product.priority)}`}>
                  {product.priority} priority
                </span>
              </div>
              <div className="flex items-center space-x-6 text-sm">
                <div className="text-right">
                  <div className="font-medium">{product.currentDemand.toLocaleString()} L</div>
                  <div className="text-xs text-gray-500">Current demand</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{product.forecastedDemand.toLocaleString()} L</div>
                  <div className="text-xs text-gray-500">Forecasted</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{product.inventory.toLocaleString()} L</div>
                  <div className="text-xs text-gray-500">Inventory</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Assistant Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#f8faf9' }}>
          <div>
            <h3 className="text-lg font-semibold" style={{ color: '#1E4B3A' }}>AI Product Allocation Assistant</h3>
            <p className="text-sm text-gray-600">Ask questions about product allocation optimisation and efficiency improvements</p>
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'bot' && (
                <div className="w-7 h-7 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0" style={{ backgroundColor: '#1E4B3A' }}>
                  <span className="text-white text-xs font-medium">AI</span>
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'text-white'
                    : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                }`}
                style={{ backgroundColor: message.sender === 'user' ? '#1E4B3A' : undefined }}
              >
                <div className="text-sm">{message.text}</div>
                <div className={`text-xs mt-1 text-right ${message.sender === 'user' ? 'text-green-200' : 'text-gray-400'}`}>
                  {message.timestamp}
                </div>
              </div>
              {message.sender === 'user' && (
                <div className="w-7 h-7 rounded-full flex items-center justify-center ml-2 mt-1 flex-shrink-0" style={{ backgroundColor: '#1E4B3A' }}>
                  <span className="text-white text-xs font-medium">U</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Suggested questions */}
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
          <p className="text-xs mb-2 text-gray-500">Quick questions:</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(question)}
                className="text-xs py-1.5 px-3 rounded-full bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
          
          {/* Input area */}
          <div className="flex items-center rounded-2xl overflow-hidden bg-white border border-gray-300">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about product allocation optimisation..."
              className="flex-1 px-4 py-3 text-sm border-none outline-none bg-transparent"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!newMessage.trim()}
              className="p-3 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ color: '#1E4B3A' }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAllocationSection; 