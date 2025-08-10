'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import SupplyChainMap from './SupplyChainMap';




// Kerry Group scale supply chain stats data
const supplyStats = {
  monthlyProcurement: {
    value: '105M L',
    label: 'Monthly Raw Milk Procurement',
    confidenceInterval: 'Next month forecast: 108M L'
  }
};

// Supply chain performance data by timeframe and metric
const supplyPerformanceData = {
  weekly: {
    volume: [
      { period: 'Week 1', thisYear: 25200000, lastYear: 23800000, onTime: 96.2 },
      { period: 'Week 2', thisYear: 26250000, lastYear: 24850000, onTime: 97.1 },
      { period: 'Week 3', thisYear: 23800000, lastYear: 22750000, onTime: 95.8 },
      { period: 'Week 4', thisYear: 27300000, lastYear: 25900000, onTime: 98.3 }
    ],
    fat: [
      { period: 'Week 1', thisYear: 3.95, lastYear: 3.72, onTime: 96.2 },
      { period: 'Week 2', thisYear: 4.31, lastYear: 4.08, onTime: 97.1 },
      { period: 'Week 3', thisYear: 3.87, lastYear: 3.59, onTime: 95.8 },
      { period: 'Week 4', thisYear: 4.45, lastYear: 4.23, onTime: 98.3 }
    ],
    protein: [
      { period: 'Week 1', thisYear: 3.15, lastYear: 2.98, onTime: 96.2 },
      { period: 'Week 2', thisYear: 3.42, lastYear: 3.25, onTime: 97.1 },
      { period: 'Week 3', thisYear: 3.08, lastYear: 2.89, onTime: 95.8 },
      { period: 'Week 4', thisYear: 3.51, lastYear: 3.34, onTime: 98.3 }
    ],
    lactose: [
      { period: 'Week 1', thisYear: 4.67, lastYear: 4.52, onTime: 96.2 },
      { period: 'Week 2', thisYear: 4.94, lastYear: 4.81, onTime: 97.1 },
      { period: 'Week 3', thisYear: 4.59, lastYear: 4.41, onTime: 95.8 },
      { period: 'Week 4', thisYear: 5.02, lastYear: 4.89, onTime: 98.3 }
    ]
  },
  monthly: {
    volume: [
      { period: 'Jan', thisYear: 102550000, lastYear: 99800000, onTime: 96.2 },
      { period: 'Feb', thisYear: 105200000, lastYear: 102100000, onTime: 97.1 },
      { period: 'Mar', thisYear: 99800000, lastYear: 97500000, onTime: 95.8 },
      { period: 'Apr', thisYear: 107600000, lastYear: 104750000, onTime: 98.3 },
      { period: 'May', thisYear: 111850000, lastYear: 109100000, onTime: 97.9 },
      { period: 'Jun', thisYear: 109900000, lastYear: 107200000, onTime: 98.1 }
    ],
    fat: [
      { period: 'Jan', thisYear: 4.35, lastYear: 4.18, onTime: 96.2 },
      { period: 'Feb', thisYear: 4.42, lastYear: 4.26, onTime: 97.1 },
      { period: 'Mar', thisYear: 4.18, lastYear: 3.95, onTime: 95.8 },
      { period: 'Apr', thisYear: 3.89, lastYear: 3.71, onTime: 98.3 },
      { period: 'May', thisYear: 3.72, lastYear: 3.58, onTime: 97.9 },
      { period: 'Jun', thisYear: 3.64, lastYear: 3.49, onTime: 98.1 }
    ],
    protein: [
      { period: 'Jan', thisYear: 3.45, lastYear: 3.28, onTime: 96.2 },
      { period: 'Feb', thisYear: 3.51, lastYear: 3.35, onTime: 97.1 },
      { period: 'Mar', thisYear: 3.32, lastYear: 3.15, onTime: 95.8 },
      { period: 'Apr', thisYear: 3.18, lastYear: 3.02, onTime: 98.3 },
      { period: 'May', thisYear: 3.05, lastYear: 2.89, onTime: 97.9 },
      { period: 'Jun', thisYear: 2.98, lastYear: 2.84, onTime: 98.1 }
    ],
    lactose: [
      { period: 'Jan', thisYear: 4.72, lastYear: 4.58, onTime: 96.2 },
      { period: 'Feb', thisYear: 4.79, lastYear: 4.65, onTime: 97.1 },
      { period: 'Mar', thisYear: 4.86, lastYear: 4.71, onTime: 95.8 },
      { period: 'Apr', thisYear: 4.91, lastYear: 4.78, onTime: 98.3 },
      { period: 'May', thisYear: 4.96, lastYear: 4.83, onTime: 97.9 },
      { period: 'Jun', thisYear: 5.01, lastYear: 4.87, onTime: 98.1 }
    ]
  },
  yearly: {
    volume: [
      { period: '2020', thisYear: 1140000000, lastYear: 1088000000, onTime: 94.8 },
      { period: '2021', thisYear: 1168000000, lastYear: 1140000000, onTime: 95.2 },
      { period: '2022', thisYear: 1204000000, lastYear: 1168000000, onTime: 96.1 },
      { period: '2023', thisYear: 1248000000, lastYear: 1204000000, onTime: 96.8 },
      { period: '2024', thisYear: 1296000000, lastYear: 1248000000, onTime: 97.3 },
      { period: '2025', thisYear: 1344000000, lastYear: 1296000000, onTime: 97.8 }
    ],
    fat: [
      { period: '2020', thisYear: 3.82, lastYear: 3.95, onTime: 94.8 },
      { period: '2021', thisYear: 4.15, lastYear: 3.82, onTime: 95.2 },
      { period: '2022', thisYear: 3.98, lastYear: 4.15, onTime: 96.1 },
      { period: '2023', thisYear: 4.31, lastYear: 3.98, onTime: 96.8 },
      { period: '2024', thisYear: 4.07, lastYear: 4.31, onTime: 97.3 },
      { period: '2025', thisYear: 4.18, lastYear: 4.07, onTime: 97.8 }
    ],
    protein: [
      { period: '2020', thisYear: 3.12, lastYear: 3.25, onTime: 94.8 },
      { period: '2021', thisYear: 3.28, lastYear: 3.12, onTime: 95.2 },
      { period: '2022', thisYear: 3.06, lastYear: 3.28, onTime: 96.1 },
      { period: '2023', thisYear: 3.41, lastYear: 3.06, onTime: 96.8 },
      { period: '2024', thisYear: 3.19, lastYear: 3.41, onTime: 97.3 },
      { period: '2025', thisYear: 3.35, lastYear: 3.19, onTime: 97.8 }
    ],
    lactose: [
      { period: '2020', thisYear: 4.91, lastYear: 4.78, onTime: 94.8 },
      { period: '2021', thisYear: 4.76, lastYear: 4.91, onTime: 95.2 },
      { period: '2022', thisYear: 4.85, lastYear: 4.76, onTime: 96.1 },
      { period: '2023', thisYear: 4.69, lastYear: 4.85, onTime: 96.8 },
      { period: '2024', thisYear: 4.94, lastYear: 4.69, onTime: 97.3 },
      { period: '2025', thisYear: 4.82, lastYear: 4.94, onTime: 97.8 }
    ]
  }
};



// Milk Supply Intake Forecasting Insights
const supplyInsights = [
  {
    id: 1,
    title: "Seasonal Peak Forecasting",
    value: "+12.5%",
    description: "How would an early spring grass growth surge impact milk supply intake volumes in Irish dairy regions?",
    answer: "Early spring growth accelerates cow milk production, increasing daily intake volumes by 12-15% compared to normal seasonal patterns, requiring additional storage capacity.",
    percentageChange: 0.125
  },
  {
    id: 2,
    title: "Weather Impact Assessment",
    value: "-8.2%",
    description: "What effect would a prolonged dry summer period have on regional milk supply intake forecasts?",
    answer: "Extended dry conditions reduce pasture quality and cow comfort, leading to decreased milk production and lower supply intake volumes across affected regions.",
    percentageChange: -0.082
  },
  {
    id: 3,
    title: "Farm Expansion Analysis",
    value: "+18.7%",
    description: "How would new dairy farm developments in the Cork region affect milk supply intake projections?",
    answer: "Planned farm expansions in Cork are expected to increase regional milk supply intake by 18-20%, requiring upgraded collection routes and processing capacity.",
    percentageChange: 0.187
  },
  {
    id: 4,
    title: "Feed Quality Impact",
    value: "+6.9%",
    description: "What impact would premium feed supplementation have on milk supply intake quality and volume?",
    answer: "Premium feed programs improve cow health and milk production efficiency, resulting in higher quality milk with increased fat and protein content.",
    percentageChange: 0.069
  },
  {
    id: 5,
    title: "Collection Route Optimisation",
    value: "+4.3%",
    description: "How would optimised collection schedules affect milk supply intake freshness and volume efficiency?",
    answer: "Optimised collection routes reduce transport time and maintain milk freshness, allowing for increased intake volumes while preserving quality standards.",
    percentageChange: 0.043
  }
];

// Component for manual supply chain insights navigation
const RotatingSupplyInsights = () => {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewedInsights, setViewedInsights] = useState<Set<number>>(new Set([0])); // Start with first insight viewed
  const [isVisible, setIsVisible] = useState(true);
  const [isHiding, setIsHiding] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const animateIn = () => {
    if (!contentRef.current) return;
    
    // Simple fade in
    contentRef.current.animate([
      { opacity: 0 },
      { opacity: 1 }
    ], {
      duration: 300,
      easing: 'ease-in-out',
      fill: 'both'
    });
  };

  const animateOut = (callback: () => void) => {
    if (!contentRef.current) return;
    
    setIsAnimating(true);
    
    const animation = contentRef.current.animate([
      { opacity: 1 },
      { opacity: 0 }
    ], {
      duration: 200,
      easing: 'ease-in-out',
      fill: 'both'
    });

    animation.onfinish = () => {
      callback();
      setIsAnimating(false);
    };
  };

  const changeInsight = (newIndex: number) => {
    if (isAnimating || newIndex === currentInsight) return;
    
    animateOut(() => {
      setCurrentInsight(newIndex);
      
      // Mark this insight as viewed
      const newViewedInsights = new Set(viewedInsights);
      newViewedInsights.add(newIndex);
      setViewedInsights(newViewedInsights);
      
      // Check if all insights have been viewed
      if (newViewedInsights.size === supplyInsights.length) {
        // Hide section smoothly after a brief delay
        setTimeout(() => {
          setIsHiding(true);
          setTimeout(() => setIsVisible(false), 300); // Allow time for fade-out animation
        }, 1000);
      }
    });
  };

  useEffect(() => {
    animateIn();
  }, [currentInsight]);

  const insight = supplyInsights[currentInsight];

  // Removed priority color function as color bar is no longer used

  if (!isVisible) return null;

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-opacity duration-300 ${isHiding ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100" style={{ backgroundColor: '#f8faf9' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#1E4B3A' }}></div>
            <h3 className="text-lg font-semibold" style={{ color: '#1E4B3A' }}>AI Supply Chain Insights</h3>
            <span className="text-xs px-2 py-1 bg-gray-200 rounded-full text-gray-600">
              {viewedInsights.size}/{supplyInsights.length} viewed
            </span>
          </div>
          <div className="flex space-x-2">
            {supplyInsights.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentInsight 
                    ? 'w-6 h-2 rounded-full' 
                    : 'hover:bg-gray-400'
                }`}
                style={{ 
                  backgroundColor: viewedInsights.has(index) 
                    ? (index === currentInsight ? '#1E4B3A' : '#34D399') 
                    : '#d1d5db'
                }}
                onClick={() => changeInsight(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content - Clickable */}
      <div 
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => {
          const nextIndex = (currentInsight + 1) % supplyInsights.length;
          changeInsight(nextIndex);
        }}
      >
        <div 
          ref={contentRef}
          className="bg-gray-50 rounded-lg p-4"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h4 
              className="font-semibold text-lg"
              style={{ color: '#1E4B3A' }}
            >
              {insight.title}
            </h4>
            <span 
              className="text-sm px-3 py-1 rounded-full font-semibold text-white"
              style={{ backgroundColor: '#1E4B3A' }}
            >
              {insight.value}
            </span>
          </div>
          
          <p 
            className="text-sm text-gray-700 leading-relaxed"
          >
            {insight.description}
          </p>
        </div>
      </div>
    </div>
  );
};

// AI Assistant Message Interface
interface AssistantMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

// AI Assistant Component
const AIAssistantSection = () => {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 1,
      text: "Hello! I'm your Supply Chain AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Predefined responses for supply chain questions
  const predefinedResponses: { [key: string]: string } = {
    'supply trends': 'Based on current data, supply volume is trending 8.3% higher than last quarter. Raw milk procurement is expected to reach 2.9M L next month.',
    'supplier performance': 'Supplier on-time delivery rate is currently at 97.3%, which exceeds our target of 95%. Quality compliance remains strong across all active suppliers.',
    'cost optimisation': 'Average procurement cost is €0.42/L, which is 3% below market rate. Consider volume-based pricing negotiations with top 3 suppliers for additional savings.',
    'quality metrics': 'Fat content averaging 4.2%, protein at 3.4%, and lactose at 4.8%. Quality scores show consistent improvement over the past 3 months.',
    'seasonal patterns': 'Seasonal analysis shows typical autumn increase in fat content expected. Production should increase by 2-3% as temperatures cool.',
    'risk assessment': 'Current risk factors include potential weather disruptions in Region A and supplier capacity constraints. Mitigation strategies are in place.',
    'inventory levels': 'Raw milk inventory levels are optimal at 2.1 days supply. Finished goods inventory is at 85% capacity with good rotation.'
  };

  const suggestedQuestions = [
    "What are the current supply trends?",
    "How is supplier performance this month?",
          "Any cost optimisation opportunities?",
    "What about quality metrics?"
  ];

  useEffect(() => {
    // Only scroll when messages change and there are messages (not on initial mount)
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const findResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerQuestion.includes(key) || key.split(' ').some(word => lowerQuestion.includes(word))) {
        return response;
      }
    }
    
    return "I've analyzed the supply chain data. Based on current metrics, everything appears to be operating within normal parameters. Would you like specific information about volume forecasts, quality metrics, or supplier performance?";
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#f8faf9' }}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1E4B3A' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold" style={{ color: '#1E4B3A' }}>AI Supply Assistant</h3>
            <p className="text-sm text-gray-600">Ask questions about supply chain operations and forecasts</p>
          </div>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
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
            placeholder="Type your question here..."
            className="flex-1 p-3 text-sm focus:outline-none bg-white text-gray-800 placeholder-gray-400"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!newMessage.trim()}
            className={`p-3 transition-colors ${
              !newMessage.trim() 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            style={{ color: newMessage.trim() ? '#1E4B3A' : undefined }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Define metric type
type MetricType = 'volume' | 'fat' | 'protein' | 'lactose';
type TimeframeType = 'weekly' | 'monthly' | 'yearly';

// Custom tooltip for charts
const CustomTooltip = ({ active, payload, label, metricType }: { active?: boolean; payload?: Array<{ payload: { thisYear?: number; lastYear?: number; onTime?: number } }>; label?: string; metricType: MetricType }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    const formatNumber = (num: number) => {
      if (metricType === 'volume') {
        if (num >= 1000000000) {
          return `${(num / 1000000000).toFixed(2)}B`;
        }
        if (num >= 1000000) {
          return `${(num / 1000000).toFixed(1)}M`;
        }
        return num.toLocaleString();
      } else {
        return num.toFixed(2);
      }
    };
    
    const getUnit = () => {
      switch (metricType) {
        case 'volume':
          return 'liters';
        case 'fat': 
        case 'protein':
        case 'lactose':
          return '%';
        default:
          return '';
      }
    };
    
    // Calculate percent change
    const percentChange = ((data?.thisYear || 0) - (data?.lastYear || 0)) / (data?.lastYear || 1) * 100;
    const absChange = (data?.thisYear || 0) - (data?.lastYear || 0);
    const formattedAbsChange = metricType === 'volume' && absChange >= 1000000000 
      ? `${(absChange / 1000000000).toFixed(2)}B` 
      : formatNumber(absChange);
    
    return (
      <div className="bg-white p-4 shadow-lg border border-gray-200 rounded-md">
        <p className="mb-2 font-medium text-gray-900 border-b pb-1">{label}</p>
        
        <div className="text-sm space-y-2">
          <div className="flex justify-between items-center">
            <span style={{ color: '#1E4B3A' }}>2025:</span>
            <span className="font-medium">{formatNumber(data?.thisYear || 0)} {getUnit()}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-500">2024:</span>
            <span className="font-medium text-gray-500">{formatNumber(data?.lastYear || 0)} {getUnit()}</span>
          </div>
          
          <div className="flex justify-between items-center mt-1 pt-1 border-t border-gray-100">
            <span className="text-xs text-gray-600">Change:</span>
            <span className={`font-medium text-sm ${percentChange >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
              {percentChange >= 0 ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
              {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(1)}% ({formattedAbsChange} {getUnit()})
            </span>
          </div>
          

        </div>
      </div>
    );
  }
  return null;
};

const SupplySection = () => {
  const [selectedSupplyQuestion, setSelectedSupplyQuestion] = useState<number | null>(null);
  const [supplyResponse, setSupplyResponse] = useState('');
  const [currentSupplyQuestionIndex, setCurrentSupplyQuestionIndex] = useState(0);
  const [isSupplyTransitioning, setIsSupplyTransitioning] = useState(false);
  const [supplyPredictions, setSupplyPredictions] = useState([
    { period: 'Aug 10-16', predictedVolume: 85500 },
    { period: 'Aug 17-23', predictedVolume: 88200 },
    { period: 'Aug 24-30', predictedVolume: 90800 },
    { period: 'Aug 31-Sep 6', predictedVolume: 93500 },
    { period: 'Sep 7-13', predictedVolume: 95200 },
    { period: 'Sep 14-20', predictedVolume: 97800 },
    { period: 'Sep 21-27', predictedVolume: 99400 },
    { period: 'Sep 28-Oct 4', predictedVolume: 96700 }
  ]);

  // Default supply prediction data
  const defaultSupplyPredictions = [
    { period: 'Aug 10-16', predictedVolume: 85500 },
    { period: 'Aug 17-23', predictedVolume: 88200 },
    { period: 'Aug 24-30', predictedVolume: 90800 },
    { period: 'Aug 31-Sep 6', predictedVolume: 93500 },
    { period: 'Sep 7-13', predictedVolume: 95200 },
    { period: 'Sep 14-20', predictedVolume: 97800 },
    { period: 'Sep 21-27', predictedVolume: 99400 },
    { period: 'Sep 28-Oct 4', predictedVolume: 96700 }
  ];

  // Handle supply question selection (toggle on/off)
  const handleSupplyQuestionSelect = (questionId: number) => {
    const selectedQ = supplyInsights.find(q => q.id === questionId);
    if (!selectedQ) return;
    
    // Toggle selection - if already selected, deselect
    if (selectedSupplyQuestion === questionId) {
      setSelectedSupplyQuestion(null);
      setSupplyResponse('');
      setSupplyPredictions(defaultSupplyPredictions);
      return;
    }
    
    setSelectedSupplyQuestion(questionId);
    setSupplyResponse(selectedQ.answer);
    
    // Update predictions based on the percentage change
    const adjustedPredictions = defaultSupplyPredictions.map(item => ({
      ...item,
      predictedVolume: Math.round(item.predictedVolume * (1 + selectedQ.percentageChange))
    }));
    
    setSupplyPredictions(adjustedPredictions);
  };

  // Get the appropriate data for supply predictions
  const getSupplyPredictionData = () => {
    return supplyPredictions;
  };

  // Handle rotating questions
  React.useEffect(() => {
    if (selectedSupplyQuestion) return; // Don't rotate when a question is selected
    
    const rotationInterval = setInterval(() => {
      setIsSupplyTransitioning(true);
      setTimeout(() => {
        setCurrentSupplyQuestionIndex((prevIndex) => 
          prevIndex === supplyInsights.length - 1 ? 0 : prevIndex + 1
        );
        setIsSupplyTransitioning(false);
      }, 400); // Match this with the CSS transition duration
    }, 4000); // Rotate every 4 seconds
    
    return () => clearInterval(rotationInterval);
  }, [selectedSupplyQuestion]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#1E4B3A' }}>Supply Chain Intelligence Dashboard</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Monitor supply chain performance, track supplier metrics, and optimise procurement operations with real-time analytics and AI-powered insights.
        </p>
      </div>

      {/* Ask About Milk Supply Intake Factors */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-8">
        <h2 className="text-xl font-medium text-[#1E4B3A] mb-4">
          Ask About Milk Supply Intake Factors
        </h2>
            <div className="flex flex-col">
          <div className="relative h-[76px] flex items-center">
            <div className="w-full bg-gradient-to-r from-blue-50 to-transparent p-0.5 rounded-lg">
              <div className="question-container w-full min-h-[74px] flex items-center">
                {supplyInsights.map((insight, index) => (
                  <div
                    key={insight.id}
                    onClick={() => handleSupplyQuestionSelect(insight.id)}
                    className={`absolute w-full py-3 px-4 rounded-md cursor-pointer transition-all duration-300 ${
                      selectedSupplyQuestion === insight.id
                        ? 'border-blue-300 bg-blue-50 shadow-sm question-card-selected opacity-100'
                        : index === currentSupplyQuestionIndex 
                          ? `${isSupplyTransitioning ? 'opacity-0 blur-sm transform -translate-y-2' : 'opacity-100'}`
                          : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <p className="text-sm text-gray-800 leading-snug">{insight.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Compact Insight Dropdown */}
        {supplyResponse && (
          <div className="mt-4 relative overflow-hidden">
            <div 
              className="bg-[#F7F5F0] rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all duration-500 ease-out transform"
              style={{
                animation: 'slideDown 0.5s ease-out',
                transformOrigin: 'top'
              }}
            >
              <div className="p-4">
                <p className="text-sm text-gray-700 leading-relaxed mb-3">{supplyResponse}</p>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Impact on Supply Intake:</span>
                  <span 
                    className={`text-sm font-bold ${
                      selectedSupplyQuestion && supplyInsights.find(q => q.id === selectedSupplyQuestion)?.value.includes('+') 
                        ? 'text-green-700' 
                        : 'text-red-700'
                    }`}
                  >
                    {selectedSupplyQuestion && supplyInsights.find(q => q.id === selectedSupplyQuestion)?.value}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Supply Prediction Chart */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-[#1E4B3A]">
            {selectedSupplyQuestion ? (
              `Milk Supply Intake Prediction - Next 8 Weeks (Impact: ${supplyInsights.find(q => q.id === selectedSupplyQuestion)?.value})`
            ) : (
              'Milk Supply Intake Prediction - Next 8 Weeks'
            )}
          </h2>
          <div className="flex items-center space-x-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md bg-[#1E4B3A] text-white">
                Weekly
              </span>
            </div>
          </div>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={getSupplyPredictionData()}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="period" 
                tick={{ fill: '#6b7280' }} 
                axisLine={{ stroke: '#d1d5db' }}
                height={60}
                interval={0}
                angle={-45}
                textAnchor="end"
              />
              <YAxis 
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${Math.round(value / 1000000)}M`;
                  if (value >= 1000) return `${Math.round(value / 1000)}K`;
                  return Math.round(value).toString();
                }}
                tick={{ fill: '#6b7280' }} 
                axisLine={{ stroke: '#d1d5db' }}
                domain={[0, 120000]}
                ticks={[0, 15000, 30000, 45000, 60000, 75000, 90000, 105000, 120000]}
              >
                <Label 
                  value="Volume (Litres)" 
                  angle={-90} 
                  position="insideLeft"
                  style={{ textAnchor: 'middle' }}
                />
              </YAxis>
              <Tooltip 
                formatter={(value) => [`${Number(value).toLocaleString()} L`, 'Predicted Volume']}
                contentStyle={{ backgroundColor: 'white', borderRadius: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                labelFormatter={(value) => `${value}`}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} />
                            <Bar 
                dataKey="predictedVolume" 
                name="Predicted Volume" 
                fill={selectedSupplyQuestion 
                  ? ((supplyInsights.find(q => q.id === selectedSupplyQuestion)?.percentageChange || 0) >= 0 
                      ? "#4ade80" // Green for positive impact
                      : "#ef4444") // Red for negative impact
                  : "#1E4B3A"} // Default colour
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Supply Chain Regional Map */}
      <div className="mb-8">
        <SupplyChainMap />
      </div>

      {/* AI Supply Chain Insights */}
      <RotatingSupplyInsights />

      {/* AI Assistant Section */}
      <AIAssistantSection />
    </div>
  );
};

export default SupplySection;