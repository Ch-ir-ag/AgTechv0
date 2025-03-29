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
  isTyping?: boolean;
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
    answer: "Our prediction model for {{companyName}} has achieved 94.7% accuracy over the past 12 months. The weekly forecast accuracy is 96.3%, monthly is 95.6%, and yearly is 93.7%. We continuously refine our models using machine learning with actual yield data to improve accuracy over time.",
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
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

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
      return bestMatch.answer.replace(/{{companyName}}/g, companyName);
    }
    
    // Fallback response if no good match
    return `I've analyzed the ${companyName} data related to your question. Based on recent trends and metrics, we're seeing steady performance in milk production levels, with quality indicators remaining stable. Would you like more specific information about yield forecasts, quality metrics, or regional variations?`;
  };

  // Simulate typing effect for bot messages
  const simulateTyping = (text: string, messageId: number, delay: number = 30) => {
    let displayText = '';
    let charIndex = 0;
    
    // Add a typing indicator message
    setMessages(prev => [
      ...prev, 
      { 
        id: messageId, 
        text: '...', 
        sender: 'bot', 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isTyping: true 
      }
    ]);
    
    setIsTyping(true);
    
    // Type out the message character by character
    const typingInterval = setInterval(() => {
      displayText += text.charAt(charIndex);
      charIndex++;
      
      // Update the message with current text
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId 
            ? { 
                ...msg, 
                text: displayText,
                isTyping: charIndex < text.length
              } 
            : msg
        )
      );
      
      // When finished typing
      if (charIndex >= text.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, delay);
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
    
    // Show the bot response with typing effect
    setTimeout(() => {
      simulateTyping(botResponse, messages.length + 2);
      
      // Generate new suggestions based on current conversation
      const newSuggestions = suggestedQuestions
        .filter(q => q !== messageText) // Remove the question that was just asked
        .sort(() => 0.5 - Math.random()) // Shuffle the remaining questions
        .slice(0, 3); // Take the first 3
      
      setCurrentSuggestions(newSuggestions);
    }, 500);
  };

  // Handle clicking a suggested question
  const handleSuggestedQuestion = (question: string) => {
    setNewMessage(question);
    // Create a new synthetic event with the correct type
    const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
    handleSendMessage(syntheticEvent);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-medium text-gray-800">Daisy AI Assistant</h2>
        <p className="text-sm text-gray-600">
          Ask questions about {companyName} milk yield, regional data, and production analytics
        </p>
      </div>

      {/* Messages */}
      <div 
        ref={messagesContainerRef}
        className="h-96 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-blue-50 text-gray-800 border border-blue-100'
                  : message.isTyping
                    ? 'bg-gray-50 text-gray-800 border border-gray-100 animate-pulse'
                    : 'bg-gray-50 text-gray-800 border border-gray-100'
              }`}
            >
              <div className="text-sm">{message.text}</div>
              <div className="text-xs text-gray-500 mt-1 text-right">
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Suggested questions */}
      {!isTyping && (
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {currentSuggestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="text-xs bg-white hover:bg-blue-50 text-gray-700 py-1 px-2 rounded-full border border-gray-200 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Message input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your question here..."
            disabled={isTyping}
            className={`flex-1 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${isTyping ? 'bg-gray-50' : 'bg-white'}`}
          />
          <button
            type="submit"
            disabled={isTyping || !newMessage.trim()}
            className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-medium ${
              isTyping || !newMessage.trim() 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isTyping ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing
              </span>
            ) : (
              'Send'
            )}
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Ask questions about {companyName} milk yield, regional data, and production analytics
        </div>
      </form>
    </div>
  );
}