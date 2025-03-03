'use client';

import React, { useState } from 'react';

// Define the message type
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

// Initial example messages
const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Hello! I\'m your DairyCo-op assistant. How can I help you today?',
    sender: 'bot',
    timestamp: '10:00 AM',
  },
  {
    id: '2',
    text: 'Can you tell me about the milk yield for last week?',
    sender: 'user',
    timestamp: '10:05 AM',
  },
  {
    id: '3',
    text: 'Last week\'s milk yield was 4,500 liters, which is 3% higher than the previous week. The average fat content was 3.8% and protein was 3.2%.',
    sender: 'bot',
    timestamp: '10:05 AM',
  },
];

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  // Handle sending a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: '10:05 AM',
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "I'm analyzing the data for you. The milk yield has been increasing steadily over the past month.",
        "Based on current trends, we expect next week's yield to be approximately 4,700 liters.",
        "The feed efficiency ratio is currently at 1.5, which is within the optimal range for your herd size.",
        "I've noticed that milk quality metrics have improved by 5% since implementing the new feeding regimen.",
        "Would you like me to prepare a detailed report on milk production trends for the past quarter?",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: '10:05 AM',
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col border border-gray-100">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-medium text-gray-800">
          DairyCo-op Assistant
        </h2>
        <p className="text-sm text-gray-600">
          Ask questions about milk yield, herd health, and production analytics
        </p>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
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
          Try asking about milk yield, feed efficiency, or herd health
        </div>
      </form>
    </div>
  );
} 