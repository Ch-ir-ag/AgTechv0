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

// Define predefined Q&A pairs for product allocation
interface PredefinedQA {
  question: string;
  answer: string;
  keywords: string[];
}

const predefinedQAs: PredefinedQA[] = [
  {
    question: "What product allocation is recommended for next month?",
    answer: "Based on current market trends and forecast demand, I recommend allocating 35% to Whole Milk Powder (WMP), 25% to Skim Milk Powder (SMP), 20% to Cheese, 15% to Butter, and 5% to Specialty Products for next month. This allocation optimizes for both market prices and plant efficiency.",
    keywords: ["allocation", "recommend", "next month"]
  },
  {
    question: "Which product has the highest margin currently?",
    answer: "Currently, Specialty Products have the highest margin at 18.7%, followed by Cheese at 12.5%. Butter is showing 9.8%, WMP at 8.3%, and SMP at 7.2%. Considering these margins and current demand patterns, you might want to consider increasing Specialty Products allocation where plant configuration allows.",
    keywords: ["margin", "highest", "profitable", "profitability"]
  },
  {
    question: "How efficient is the cheese production line?",
    answer: "The Cheese production line is currently operating at 92.4% efficiency, which is 3.1% above target. Recent maintenance and process improvements have contributed to this strong performance. There's potential to increase allocation to Cheese if market demand supports it, given the strong operational metrics.",
    keywords: ["efficient", "efficiency", "cheese", "production line"]
  },
  {
    question: "What are the market trends for WMP?",
    answer: "WMP (Whole Milk Powder) markets are showing positive trends with a forecasted 4.7% price increase in the next quarter. Asian demand remains strong with a 6.2% increase year-over-year. There's some price pressure from increased production in New Zealand (+2.3%), but overall the outlook is favorable for increasing WMP allocation.",
    keywords: ["market", "trends", "WMP", "whole milk powder"]
  },
  {
    question: "Should we increase butter production?",
    answer: "Based on current data, a moderate 3-5% increase in Butter production is recommended. Market prices have risen 2.8% this quarter, and seasonal demand is expected to increase by 7% in the coming months. Plant 3's butter line has 12% unutilized capacity that could be leveraged without significant capital investment.",
    keywords: ["increase", "butter", "production"]
  },
  {
    question: "What's the optimal product mix for Plant 2?",
    answer: "For Plant 2, the optimal mix based on its specific capabilities is: 45% WMP, 25% SMP, 20% Butter, and 10% Specialty Products. This mix takes advantage of Plant 2's newly upgraded drying technology for powders while balancing its smaller butter production line. This allocation would maximize the plant's unique efficiency profile.",
    keywords: ["optimal", "mix", "plant 2", "product mix"]
  },
  {
    question: "Is the SMP market declining?",
    answer: "The SMP (Skim Milk Powder) market is showing signs of softening but not a significant decline. Prices have decreased by 1.8% over the last quarter, but volumes remain stable. Asian markets remain steady while European demand has decreased by 3.2%. I recommend maintaining current SMP allocation with a potential small reduction (2-3%) if this trend continues next quarter.",
    keywords: ["SMP", "skim milk powder", "declining", "market"]
  },
  {
    question: "How does seasonality affect allocation?",
    answer: "Seasonality significantly impacts optimal allocation. During summer months (current season), consumer demand shifts toward UHT products (+9%) and Cheese (+7%). Winter typically sees higher Butter demand (+12%) and WMP for export markets (+5%). I recommend adjusting the allocation to reflect the +7% increase in Cheese demand for the current seasonal period.",
    keywords: ["seasonality", "season", "affect", "allocation"]
  }
];

// Initial welcome message
const initialMessages: Message[] = [
  {
    id: 1,
    text: 'Hello! I\'m your product allocation assistant. How can I help optimize your product mix today?',
    sender: 'bot',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

// Sample suggested questions to show in the UI
const suggestedQuestions = [
  "What product allocation is recommended for next month?",
  "Which product has the highest margin currently?",
  "How efficient is the cheese production line?",
  "What are the market trends for WMP?"
];

export default function ProductAllocationChatbot({ companyName }: ChatbotProps) {
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
      text: `Hello! I'm your ${companyName} product allocation assistant. How can I help optimize your product mix today?`
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
    return `I've analyzed the current product allocation data for ${companyName}. Based on market trends and plant capabilities, I recommend reviewing the allocation for WMP and SMP, which show changing market conditions. Would you like specific information about current margins, market trends, or plant-specific allocation recommendations?`;
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
            <h2 className={`font-medium dark-mode-transition ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Product Allocation Assistant</h2>
            <p className={`text-xs dark-mode-transition ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Ask questions about {companyName} product mix and allocation
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