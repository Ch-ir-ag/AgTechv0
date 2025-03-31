'use client';

import React, { useEffect } from 'react';
import Navbar from './Navbar';
import ProductAllocationRecommendations from './ProductAllocationRecommendations';
import ProductAllocationChatbot from './ProductAllocationChatbot';

export default function ProductAllocationPage({ companyName }) {
  
  // Force scroll to top when the component mounts
  useEffect(() => {
    // Immediately scroll to top
    window.scrollTo(0, 0);
    
    // Temporarily disable smooth scrolling
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Create a function that forces scroll to top
    const forceScrollTop = () => {
      window.scrollTo(0, 0);
    };
    
    // Apply the scroll multiple times to overcome any delayed content loading
    forceScrollTop();
    const t1 = setTimeout(forceScrollTop, 50);
    const t2 = setTimeout(forceScrollTop, 150);
    const t3 = setTimeout(forceScrollTop, 300);
    
    // Prevent any automatic scrolling to anchors/hash links
    const preventHashScroll = () => {
      if (window.location.hash) {
        window.scrollTo(0, 0);
      }
    };
    
    // Run once and add listener
    preventHashScroll();
    window.addEventListener('hashchange', preventHashScroll);
    
    // Clean up
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('hashchange', preventHashScroll);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
  
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
            
            {/* Chatbot Section - removed ID to prevent auto-scroll */}
            <div className="mb-0">
              <section className="h-full">
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