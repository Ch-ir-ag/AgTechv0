'use client';

import React from 'react';
import Navbar from './Navbar';
import ProductAllocationRecommendations from './ProductAllocationRecommendations';
import ProductAllocationChatbot from './ProductAllocationChatbot';

export default function ProductAllocationPage({ companyName }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#f0f7ff]">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{companyName} Product Allocation</h1>
            <p className="mt-2 text-gray-600">
              Optimize your milk supply across product lines to maximize returns and meet contractual obligations.
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Product Allocation Recommendations Section */}
            <ProductAllocationRecommendations />
            
            {/* Chatbot Section */}
            <div className="mb-0">
              <section id="allocation-chatbot" className="h-full">
                <ProductAllocationChatbot companyName={companyName} />
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; 2025 Daisy AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 