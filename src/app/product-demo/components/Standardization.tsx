'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Sample data for silos and production lines
const silosData = [
  { id: 'S1', name: 'Silo 1', fat: 4.2, protein: 3.4, lactose: 4.8, volume: 45000, quality: 95 },
  { id: 'S2', name: 'Silo 2', fat: 3.8, protein: 3.1, lactose: 4.9, volume: 38000, quality: 92 },
  { id: 'S3', name: 'Silo 3', fat: 4.5, protein: 3.6, lactose: 4.7, volume: 52000, quality: 97 },
  { id: 'S4', name: 'Silo 4', fat: 3.9, protein: 3.3, lactose: 4.8, volume: 41000, quality: 94 },
  { id: 'S5', name: 'Silo 5', fat: 4.1, protein: 3.5, lactose: 4.9, volume: 48000, quality: 96 },
  { id: 'S6', name: 'Silo 6', fat: 4.3, protein: 3.7, lactose: 4.6, volume: 44000, quality: 93 },
  { id: 'S7', name: 'Silo 7', fat: 3.7, protein: 3.2, lactose: 5.0, volume: 39000, quality: 91 },
  { id: 'S8', name: 'Silo 8', fat: 4.4, protein: 3.8, lactose: 4.7, volume: 50000, quality: 98 }
];

const productionLines = [
  { 
    id: 'L1', 
    name: 'Line 1 - Premium Dairy', 
    targetFat: 4.0, 
    targetProtein: 3.5, 
    targetLactose: 4.8,
    currentSilos: ['S3', 'S5', 'S8'],
    recommendedSilos: ['S3', 'S5', 'S8'],
    efficiency: 96,
    costPerUnit: 0.42,
    deviationFromSpec: 0.8
  },
  { 
    id: 'L2', 
    name: 'Line 2 - Standard Milk', 
    targetFat: 3.8, 
    targetProtein: 3.2, 
    targetLactose: 4.9,
    currentSilos: ['S1', 'S2', 'S4'],
    recommendedSilos: ['S2', 'S4', 'S7'],
    efficiency: 89,
    costPerUnit: 0.38,
    deviationFromSpec: 1.2
  },
  { 
    id: 'L3', 
    name: 'Line 3 - Low Fat', 
    targetFat: 3.5, 
    targetProtein: 3.3, 
    targetLactose: 5.0,
    currentSilos: ['S2', 'S7'],
    recommendedSilos: ['S2', 'S7'],
    efficiency: 97,
    costPerUnit: 0.35,
    deviationFromSpec: 0.6
  },
  { 
    id: 'L4', 
    name: 'Line 4 - High Protein', 
    targetFat: 4.2, 
    targetProtein: 3.8, 
    targetLactose: 4.6,
    currentSilos: ['S1', 'S6'],
    recommendedSilos: ['S3', 'S6', 'S8'],
    efficiency: 87,
    costPerUnit: 0.45,
    deviationFromSpec: 1.5
  }
];

// Overall performance metrics - Kerry Group scale
const performanceMetrics = {
  totalCostSavings: 6200000
};

// AI Assistant messages and responses
interface AssistantMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

const suggestedQuestions = [
  "Why was Silo 8 recommended for Line 4?",
  "What's the cost impact of current vs recommended allocation?",
  "How does changing silo allocation affect quality specs?",
  "Show me optimisation scenarios for tomorrow's production"
];

const StandardizationSection = () => {
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'current' | 'recommended'>('current');
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 1,
             text: "Hello! I'm here to help you optimise raw milk standardisation. I can explain silo allocations, cost impacts, and efficiency improvements.",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const findResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('silo 8') || lowerQuestion.includes('line 4')) {
      return "Silo 8 is recommended for Line 4 because it has the highest protein content (3.8%) and excellent quality score (98%), which aligns perfectly with Line 4's high-protein product requirements. This combination would reduce deviation from spec by 0.7% and improve efficiency by 9%.";
    } else if (lowerQuestion.includes('cost') || lowerQuestion.includes('savings')) {
             return "Implementing the recommended allocation would save €15,200 monthly. Line 2 shows the biggest opportunity - switching from current silos would reduce cost per unit from €0.38 to €0.34, while Line 4 optimisation could save €0.03 per unit despite higher raw material quality.";
    } else if (lowerQuestion.includes('quality') || lowerQuestion.includes('specs')) {
             return "Quality optimisation focuses on minimising deviation from target composition. Current average deviation is 1.03%, but recommended allocation reduces this to 0.68%, a 32% improvement. This means more consistent products and fewer quality adjustments downstream.";
    } else if (lowerQuestion.includes('tomorrow') || lowerQuestion.includes('scenarios')) {
      return "For tomorrow's production, I recommend: Line 1 maintains current allocation (optimal), Line 2 switches to S2+S4+S7 for 12% efficiency gain, Line 3 stays current (already optimal), Line 4 adds S3+S8 to current S6 for premium output quality.";
         } else {
       return "I can help you understand silo allocation optimisation, cost analysis, quality improvements, and production planning. What specific aspect would you like to explore?";
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

  const getActiveLineSilos = (line: { currentSilos: string[]; recommendedSilos: string[] }) => {
    return viewMode === 'current' ? line.currentSilos : line.recommendedSilos;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#1E4B3A' }}>Raw Milk Standardisation</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Optimise silo-to-line allocation for maximum efficiency with real-time analytics and AI-powered insights.
        </p>
      </div>

      {/* Stats Section */}
      <div className="flex justify-center mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center max-w-md">
          <p className="text-3xl font-bold" style={{ color: '#1E4B3A' }}>€{performanceMetrics.totalCostSavings.toLocaleString()}</p>
          <p className="text-gray-600 text-sm mt-2">Monthly Savings Potential</p>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold" style={{ color: '#1E4B3A' }}>Production Line Allocation</h3>
          <div className="flex bg-gray-100 rounded-md p-1">
            <button
              onClick={() => setViewMode('current')}
              className={`px-4 py-2 text-sm rounded transition-colors ${
                viewMode === 'current'
                  ? 'bg-white shadow-sm font-medium'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Current Allocation
            </button>
            <button
              onClick={() => setViewMode('recommended')}
              className={`px-4 py-2 text-sm rounded transition-colors ${
                viewMode === 'recommended'
                  ? 'bg-white shadow-sm font-medium'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              AI Recommended
            </button>
          </div>
        </div>

        {/* Production Lines */}
        <div className="space-y-4">
          {productionLines.map((line) => {
            const activeSilos = getActiveLineSilos(line);
            const isExpanded = activeLineId === line.id;
            
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
                          Connected Silos: {activeSilos.join(', ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">€{line.costPerUnit}/L</div>
                        <div className="text-xs text-gray-500">Cost per unit</div>
                      </div>
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
                        {/* Target Composition */}
                        <div>
                          <h5 className="font-medium mb-2" style={{ color: '#1E4B3A' }}>Target Composition</h5>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white rounded p-3">
                              <div className="text-lg font-semibold">{line.targetFat}%</div>
                              <div className="text-xs text-gray-600">Fat</div>
                            </div>
                            <div className="bg-white rounded p-3">
                              <div className="text-lg font-semibold">{line.targetProtein}%</div>
                              <div className="text-xs text-gray-600">Protein</div>
                            </div>
                            <div className="bg-white rounded p-3">
                              <div className="text-lg font-semibold">{line.targetLactose}%</div>
                              <div className="text-xs text-gray-600">Lactose</div>
                            </div>
                          </div>
                        </div>

                        {/* Connected Silos Details */}
                        <div>
                          <h5 className="font-medium mb-2" style={{ color: '#1E4B3A' }}>
                            {viewMode === 'current' ? 'Current' : 'Recommended'} Silo Allocation
                          </h5>
                          <div className="grid grid-cols-2 gap-3">
                            {activeSilos.map(siloId => {
                              const silo = silosData.find(s => s.id === siloId);
                              if (!silo) return null;
                              
                              return (
                                <div key={siloId} className="bg-white rounded border border-gray-200 p-3">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">{silo.name}</span>
                                    <span className="text-sm text-gray-500">{silo.quality}% Quality</span>
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    Fat: {silo.fat}% | Protein: {silo.protein}% | Lactose: {silo.lactose}%
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    Volume: {(silo.volume / 1000).toFixed(0)}K L
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white rounded p-3">
                            <div className="text-lg font-semibold">€{line.costPerUnit}</div>
                            <div className="text-xs text-gray-600">Cost per Unit</div>
                          </div>
                          <div className="bg-white rounded p-3">
                            <div className="text-lg font-semibold">{line.deviationFromSpec}%</div>
                            <div className="text-xs text-gray-600">Spec Deviation</div>
                          </div>
                        </div>

                        {/* AI Recommendation Banner */}
                        {viewMode === 'current' && JSON.stringify(line.currentSilos) !== JSON.stringify(line.recommendedSilos) && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div>
                              <p className="text-sm font-medium text-blue-800">Daisy AI Recommendation</p>
                              <p className="text-xs text-blue-600">
                                                                 Switch to silos {line.recommendedSilos.join(', ')} for improved efficiency and cost optimisation.
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

      {/* AI Assistant Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200" style={{ backgroundColor: '#f8faf9' }}>
          <div>
                         <h3 className="text-lg font-semibold" style={{ color: '#1E4B3A' }}>AI Standardisation Assistant</h3>
             <p className="text-sm text-gray-600">Ask questions about silo allocation optimisation and efficiency improvements</p>
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
                             placeholder="Ask about standardisation optimisation..."
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

export default StandardizationSection;