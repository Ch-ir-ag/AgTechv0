'use client';

import React, { useState, useEffect } from 'react';

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

// Initial welcome message
const initialMessages: Message[] = [
  {
    id: 1,
    text: 'Hello! I\'m your Daisy AI assistant. How can I help you today?',
    sender: 'bot',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

export default function Chatbot({ companyName }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

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

  // Handle send message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        `I'm analyzing ${companyName} data for you. The milk yield has been increasing steadily over the past month with a confidence interval of ±2.5%.`,
        `Based on current trends, I predict ${companyName} will see a 4.8% increase in production next month, compared to the same period last year.`,
        `I've noticed that milk quality metrics have improved by 5% since implementing the new feeding regimen across ${companyName} farms.`,
        "Would you like me to prepare a detailed report on milk production trends for the past quarter with region-specific breakdowns?",
        "The Northern Ireland region is currently showing the highest yield per cow at 28.5 liters/day.",
        "Based on our AI analysis, you should consider increasing allocations to cheese production by 6% next month to maximize profitability.",
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Message = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
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
      <div className="h-96 overflow-y-auto p-4 space-y-4">
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
      
      {/* Message input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-medium"
          >
            Send
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Ask questions about {companyName} milk yield, regional data, and production analytics
        </div>
      </form>
    </div>
  );
}