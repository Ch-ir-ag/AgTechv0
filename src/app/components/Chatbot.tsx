'use client';

import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css'; // Import the CSS file

interface ChatbotProps {
  companyName: string;
}

// Define the message type
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp?: string;
}

// Define predefined Q&A pairs
interface PredefinedQA {
  question: string;
  answer: string;
  keywords: string[];
}

const predefinedQAs: PredefinedQA[] = [
  {
    question: "What will be the milk yield prediction for next month?",
    answer: "Based on my analysis, I predict a {{companyName}} milk yield of 152.8M liters for next month, which is an increase of 4.2% compared to the same period last year. This prediction has a confidence interval of ±2.3% and considers both seasonal patterns and recent performance trends.",
    keywords: ["prediction", "next month", "yield", "forecast"]
  },
  {
    question: "How accurate are the forecasts?",
    answer: "Our prediction model for {{companyName}} has achieved a 15%+ improvement in forecast accuracy over market standard. This improvement is consistent across weekly, monthly, and yearly predictions. We continuously refine our models using machine learning with actual yield data to improve accuracy over time.",
    keywords: ["accurate", "accuracy", "forecast", "precision"]
  },
  {
    question: "Which region has the highest protein content?",
    answer: "Currently, the Northern Ireland region shows the highest protein content in {{companyName}} milk at 3.68%. This is 0.22% above the company average. The Munster region follows closely at 3.61%, while Connacht shows 3.52%. These variations are influenced by both feeding regimens and cattle breeds in each region.",
    keywords: ["protein", "region", "highest"]
  },
  {
    question: "What factors are affecting the current milk fat percentage?",
    answer: "The current milk fat percentage at {{companyName}} (4.42%) is being influenced by: 1) Seasonal patterns - typical summer decline, 2) Recent dietary changes in the Northern farms, 3) Higher than average temperatures in July. Our analysis suggests this is within normal variation and should increase to around 4.65% by October.",
    keywords: ["fat", "factors", "percentage", "affecting"]
  },
  {
    question: "How is the milk quality compared to last year?",
    answer: "{{companyName}}'s milk quality metrics have improved significantly compared to last year. Somatic cell count has decreased by 18% (now averaging 176,000 cells/ml), bacteria count is down 12%, and antibiotic residue incidents have been reduced to zero. Protein and fat solids have increased by 0.15% and 0.22% respectively.",
    keywords: ["quality", "compared", "last year"]
  },
  {
    question: "What's the optimal production plan for next quarter?",
    answer: "For {{companyName}}'s optimal Q4 production plan, I recommend: 1) Increase cheese allocation by 5.2% (margin of 5.6%), 2) Maintain butter production at current levels (strong margin at 4.7%), 3) Reduce WMP by 2.1% (lower margin at 2.8%). This optimizes for a projected 3.7% increase in overall profitability based on current market prices.",
    keywords: ["optimal", "production", "plan", "quarter"]
  },
  {
    question: "Are there any anomalies in recent milk production data?",
    answer: "I've detected two anomalies in {{companyName}}'s recent data: 1) The Charleville plant showed an unexpected 7.3% drop in volume last Tuesday, likely due to the scheduled maintenance that ran longer than planned. 2) Protein levels from the western suppliers were 0.18% above seasonal norms, potentially due to the recent feed supplement changes.",
    keywords: ["anomalies", "unusual", "unexpected"]
  },
  {
    question: "How will the weather forecast affect milk production?",
    answer: "The upcoming weather forecast for {{companyName}}'s supply regions indicates a cooler and wetter period than seasonal norms. This typically results in a 2-3% production increase as cows experience less heat stress. However, the heavy rainfall predicted for Northern farms may limit grazing time, potentially offsetting gains in those specific areas.",
    keywords: ["weather", "forecast", "affect"]
  }
];

// Initial welcome message
const initialMessages: Message[] = [
  {
    id: 1,
    text: 'Hello! I\'m your Daisy AI assistant. How can I help you today?',
    sender: 'bot',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

// Sample suggested questions to show in the UI
const suggestedQuestions = [
  "What will be the milk yield prediction for next month?",
  "Which region has the highest protein content?",
  "How is the milk quality compared to last year?",
  "What's the optimal production plan for next quarter?"
];

export default function Chatbot({ companyName }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(suggestedQuestions);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize messages on component mount
  useEffect(() => {
    // Update the welcome message to include company name
    const customWelcomeMessage = {
      ...initialMessages[0],
      text: `Hello! I'm your Daisy AI assistant for ${companyName}. How can I help you today?`
    };
    
    setMessages([customWelcomeMessage]);
  }, [companyName]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to find the best matching answer from predefined QAs
  const findBestAnswer = (userQuestion: string): string => {
    // Convert user question to lowercase for better matching
    const lowercaseQuestion = userQuestion.toLowerCase();
    
    // Try to find an exact question match first
    const exactMatch = predefinedQAs.find(qa => 
      qa.question.toLowerCase() === lowercaseQuestion
    );
    
    if (exactMatch) {
      return exactMatch.answer.replace(/{{companyName}}/g, companyName);
    }
    
    // If no exact match, look for keyword matches
    let bestMatch: PredefinedQA | null = null;
    let maxKeywords = 0;
    
    predefinedQAs.forEach(qa => {
      const keywordMatches = qa.keywords.filter(keyword => 
        lowercaseQuestion.includes(keyword.toLowerCase())
      ).length;
      
      if (keywordMatches > maxKeywords) {
        maxKeywords = keywordMatches;
        bestMatch = qa;
      }
    });
    
    // If we found a keyword match
    if (bestMatch && maxKeywords > 0) {
      return (bestMatch as PredefinedQA).answer.replace(/{{companyName}}/g, companyName);
    }
    
    // Fallback response if no good match
    return `I've analyzed the ${companyName} data related to your question. Based on recent trends and metrics, we're seeing steady performance in milk production levels, with quality indicators remaining stable. Would you like more specific information about yield forecasts, quality metrics, or regional variations?`;
  };

  // Replace the typing simulation with immediate display of the message
  const displayMessage = (text: string, messageId: number) => {
    // Add bot message immediately without typing animation
    setMessages(prev => [
      ...prev, 
      { 
        id: messageId, 
        text: text, 
        sender: 'bot', 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Handle send message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get the message text (either from input or from suggested question)
    const messageText = newMessage.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Get the bot response
    const botResponse = findBestAnswer(messageText);
    
    // Show the bot response immediately without typing effect
    displayMessage(botResponse, messages.length + 2);
    
    // Generate new suggestions based on current conversation
    const newSuggestions = suggestedQuestions
      .filter(q => q !== messageText) // Remove the question that was just asked
      .sort(() => 0.5 - Math.random()) // Shuffle the remaining questions
      .slice(0, 3); // Take the first 3
    
    setCurrentSuggestions(newSuggestions);
  };

  // Handle clicking a suggested question
  const handleSuggestedQuestion = (question: string) => {
    setNewMessage(question);
    // Create a new synthetic event with the correct type
    const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
    handleSendMessage(syntheticEvent);
  };

  // Focus input when clicking anywhere in the input area
  const handleInputAreaClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={`overflow-hidden rounded-lg shadow-lg border dark-mode-transition ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      {/* Header */}
      <div className={`px-4 py-3 flex items-center justify-between dark-mode-transition ${isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 dark-mode-transition ${isDarkMode ? 'bg-blue-600' : 'bg-blue-100'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isDarkMode ? 'text-white' : 'text-blue-600'}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h2 className={`font-medium dark-mode-transition ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Daisy AI Assistant</h2>
            <p className={`text-xs dark-mode-transition ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Ask questions about {companyName} milk yield and forecasting
            </p>
          </div>
        </div>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-full dark-mode-transition ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          {isDarkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={messagesContainerRef}
        className={`h-96 overflow-y-auto p-4 space-y-4 smooth-scroll dark-mode-transition ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex message-container ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'bot' && (
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 mt-1 flex-shrink-0 dark-mode-transition ${isDarkMode ? 'bg-blue-600' : 'bg-blue-100'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isDarkMode ? 'text-white' : 'text-blue-600'}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 message-bubble dark-mode-transition ${
                message.sender === 'user'
                  ? isDarkMode 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-600 text-white'
                  : isDarkMode 
                    ? 'bg-gray-800 text-gray-200 border border-gray-700'
                    : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
              }`}
            >
              <div className={message.sender === 'user' ? 'text-sm font-medium' : 'text-sm'}>{message.text}</div>
              <div className={`text-xs mt-1 text-right dark-mode-transition ${message.sender === 'user' ? 'text-blue-200' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {message.timestamp}
              </div>
            </div>
            {message.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ml-2 mt-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Suggested questions */}
      <div className={`px-4 py-3 border-t dark-mode-transition ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
        <p className={`text-xs mb-2 dark-mode-transition ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Suggested questions:</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {currentSuggestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedQuestion(question)}
              className={`text-xs py-1.5 px-3 rounded-full dark-mode-transition ${
                isDarkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {question}
            </button>
          ))}
        </div>
        
        {/* Input area */}
        <div 
          className={`flex items-center rounded-2xl overflow-hidden input-focus-effect dark-mode-transition ${
            isDarkMode 
              ? 'bg-gray-700 border border-gray-600' 
              : 'bg-white border border-gray-300'
          }`}
          onClick={handleInputAreaClick}
        >
          <form onSubmit={handleSendMessage} className="flex w-full">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your question here..."
              className={`flex-1 p-3 text-sm focus:outline-none dark-mode-transition ${
                isDarkMode 
                  ? 'bg-gray-700 text-white placeholder-gray-400' 
                  : 'bg-white text-gray-800 placeholder-gray-400'
              }`}
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className={`p-3 dark-mode-transition ${
                !newMessage.trim() 
                  ? isDarkMode 
                    ? 'text-gray-500 cursor-not-allowed' 
                    : 'text-gray-400 cursor-not-allowed'
                  : isDarkMode 
                    ? 'text-blue-400 hover:text-blue-300' 
                    : 'text-blue-600 hover:text-blue-500'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}