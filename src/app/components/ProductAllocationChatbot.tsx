'use client';

import React, { useState, useEffect, useRef } from 'react';
import '../components/Chatbot.css'; // Import the CSS file

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
    question: "What is the current allocation across products?",
    answer: "{{companyName}}'s current allocation strategy distributes milk supply as follows: 30% to Whole Milk Powder, 29% to Butter, 26% to Cheese, and 15% to Skim Milk Powder. This allocation has been optimized based on current market prices, plant capacities, and contract obligations.",
    keywords: ["allocation", "current", "products", "distribute"]
  },
  {
    question: "Which product has the highest margin?",
    answer: "Based on current market conditions, Cheese offers {{companyName}} the highest margin at 5.6%, followed by Butter at 4.8%. Whole Milk Powder provides a 3.2% margin, while Skim Milk Powder has the lowest at 1.9%. Our allocation recommendations prioritize higher-margin products while considering plant capacity constraints.",
    keywords: ["margin", "highest", "profit"]
  },
  {
    question: "Are we near production capacity at any plants?",
    answer: "Yes, {{companyName}}'s Charleville plant is currently at 87% capacity, approaching its operational limit. The Listowel plant is at 83% capacity, while Newmarket is at 78%. The Powder production line at Charleville is of particular concern, operating at 90% capacity, which leaves limited room for additional volume during peak season.",
    keywords: ["capacity", "plants", "production", "operational"]
  },
  {
    question: "How can we optimize allocation for better profitability?",
    answer: "To improve {{companyName}}'s profitability, I recommend: 1) Increase Cheese allocation by 3-5% (given its 5.6% margin), 2) Maintain current Butter levels (4.8% margin), 3) Reduce Whole Milk Powder by 2-3% (lower 3.2% margin), 4) Consider further reducing Skim Milk Powder production (1.9% margin) if contracts allow. This could improve overall profitability by approximately 4-7%.",
    keywords: ["optimize", "profitability", "improve", "better"]
  },
  {
    question: "What are the contract statuses for our products?",
    answer: "{{companyName}}'s current contract statuses are: Whole Milk Powder - Contract met (30% of total volume), Butter - Contract in progress (29%), Skim Milk Powder - Contract met (15%), Cheese - Under negotiation (26%). It's particularly important to finalize the Cheese contract, as it represents a significant volume with our highest margin product.",
    keywords: ["contract", "status", "obligations"]
  },
  {
    question: "Are there any supply chain issues affecting allocation?",
    answer: "{{companyName}} is experiencing two notable supply chain challenges: 1) The Charleville plant maintenance scheduled for next month may reduce processing capacity by 15-20% for approximately 5 days, which could temporarily impact Whole Milk Powder production, 2) The Listowel plant is experiencing some delays in packaging material delivery, though this isn't currently affecting production volumes.",
    keywords: ["supply chain", "issues", "affecting", "challenges"]
  },
  {
    question: "What's the recommended allocation plan for next quarter?",
    answer: "For {{companyName}}'s Q3 allocation plan, I recommend: 1) Increase Cheese to 28% (+2%) of total volume, 2) Maintain Butter at 29%, 3) Reduce Whole Milk Powder to 28% (-2%), 4) Keep Skim Milk Powder at 15%. This optimizes for both profitability and plant capacity utilization, while respecting existing contract obligations. This plan is projected to increase overall margin by approximately 2.3%.",
    keywords: ["plan", "allocation", "next quarter", "recommended"]
  },
  {
    question: "How does seasonality affect our product allocation?",
    answer: "Seasonality significantly impacts {{companyName}}'s optimal product allocation. During peak milk production (April-July), we recommend increasing Whole Milk Powder production due to its stability and storage advantages. In autumn and winter months when butterfat levels naturally increase, shifting allocation toward Butter and Cheese can improve margins by 8-10%. Your current allocation plan accounts for the current seasonal phase.",
    keywords: ["seasonality", "seasonal", "affect"]
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
  "What is the current allocation across products?",
  "Which product has the highest margin?",
  "Are we near production capacity at any plants?",
  "How can we optimize allocation for better profitability?"
];

export default function ProductAllocationChatbot({ companyName }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentSuggestions, setCurrentSuggestions] = useState<string[]>(suggestedQuestions);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Initialize messages on component mount
  useEffect(() => {
    // Update the welcome message to include company name
    const customWelcomeMessage = {
      ...initialMessages[0],
      text: `Hello! I'm your Daisy AI assistant for ${companyName} product allocation. How can I help you today?`
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
    return `I've analyzed the ${companyName} allocation data related to your question. Currently, milk is allocated across several product categories with Whole Milk Powder, Butter, and Cheese representing the largest allocations. Would you like specific information about product margins, capacity utilization, or allocation recommendations?`;
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-lg font-medium text-gray-800">Daisy AI Assistant</h2>
        <p className="text-sm text-gray-600">
          Ask questions about {companyName} product allocation, margins, and plant capacity
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
      
      {/* Message input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-medium ${
              !newMessage.trim() 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            Send
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Ask questions about {companyName} product allocation, margins, and plant capacity
        </div>
      </form>
    </div>
  );
} 