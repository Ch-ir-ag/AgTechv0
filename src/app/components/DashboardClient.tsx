'use client';

import React, { useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "./Navbar";
import MilkYieldChart from "./MilkYieldChart";
import YearlyYieldChart from "./YearlyYieldChart";
import Chatbot from "./Chatbot";
import InteractiveSupplyChainMap from "./InteractiveSupplyChainMap";
import { useAuth } from '../contexts/AuthContext';

// Create a safe useLayoutEffect that falls back to useEffect for SSR
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface DashboardClientProps {
  companyName: string;
}

export default function DashboardClient({ companyName }: DashboardClientProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  
  // Check if user is authenticated for Lakeland Dairies and redirect if not
  useEffect(() => {
    // Only perform auth check for lakeland-dairies to ensure backward compatibility
    const companySlug = companyName.toLowerCase().replace(/\s+/g, '-');
    if (companySlug === 'lakeland-dairies' && (!isAuthenticated || user?.company !== 'lakeland-dairies')) {
      router.push('/');
    }
  }, [isAuthenticated, user, companyName, router]);

  // Immediately set scroll position to top as soon as possible
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0);
  }

  // Use layout effect to run before browser paints - higher priority than useEffect
  useIsomorphicLayoutEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0);
    
    // To ensure scrolling works after any potential content loads
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
    
    // Add an event listener to prevent any automatic scrolling
    const preventScroll = () => {
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('scroll', preventScroll, { once: true });
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', preventScroll);
    };
  }, []);
  
  // Regular effect as additional safety
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Try again after a short delay to catch any delayed scrolling
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f7ff]">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              <span className="text-black">{companyName} Yield Prediction Dashboard</span>
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Monitor your dairy production metrics and get accurate AI-powered predictions for future milk yield
              to help optimize your operations and planning with Daisy AI&apos;s advanced analytics.
            </p>
          </div>
          
          {/* Weekly Milk Yield Comparison */}
          <div className="mb-8">
            <section id="analytics" className="h-full">
              <MilkYieldChart />
            </section>
          </div>
          
          {/* Supply Chain Map */}
          <div className="mb-8">
            <section id="supply-chain-map" className="h-full">
              <InteractiveSupplyChainMap companyName={companyName} />
            </section>
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            {/* Yearly Milk Yield vs Prediction */}
            <section id="yearly-prediction" className="h-full">
              <YearlyYieldChart />
            </section>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-blue-500">165M</p>
              <p className="text-gray-600 text-xs sm:text-sm">Current Monthly Yield (L)</p>
              <p className="text-xs text-gray-500 mt-1">±4% confidence interval</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-blue-500">+5.2%</p>
              <p className="text-gray-600 text-xs sm:text-sm">Monthly Growth Rate</p>
              <p className="text-xs text-gray-500 mt-1">±0.8% confidence interval</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-blue-500">2.1B</p>
              <p className="text-gray-600 text-xs sm:text-sm">Projected Annual Yield (L)</p>
              <p className="text-xs text-gray-500 mt-1">±3.2% confidence interval</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-blue-500">95.8%</p>
              <p className="text-gray-600 text-xs sm:text-sm">Prediction Accuracy</p>
              <p className="text-xs text-gray-500 mt-1">Based on historical validation</p>
            </div>
          </div>
          
          {/* Chatbot Section */}
          <div className="mb-0">
            <section id="chatbot" className="h-full">
              <Chatbot companyName={companyName} />
            </section>
          </div>
          
          {/* Features Section */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100 mb-8">
            <h2 className="text-xl font-medium text-gray-800 mb-4 sm:mb-6">
              {companyName} Management Insights
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3 sm:mb-0 sm:mr-4 flex-shrink-0 mx-auto sm:mx-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-medium text-gray-800 mb-1">
                    Production Trends
                  </h3>
                  <p className="text-gray-600">
                    Milk production is trending 5.2% higher than last month, with projected increases continuing through September. Confidence interval: ±0.8%.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-start">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3 sm:mb-0 sm:mr-4 flex-shrink-0 mx-auto sm:mx-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-medium text-gray-800 mb-1">
                    Seasonal Forecast
                  </h3>
                  <p className="text-gray-600">
                    Based on historical patterns, expect a 4-6% decrease in production during the winter months (November-December). Confidence interval: ±1.2%.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-start">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3 sm:mb-0 sm:mr-4 flex-shrink-0 mx-auto sm:mx-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-medium text-gray-800 mb-1">
                    Feed Efficiency
                  </h3>
                  <p className="text-gray-600">
                    Current feed efficiency ratio is 1.5 liters per kg, which is within the optimal range for your herd size and composition. Confidence interval: ±0.1 L/kg.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 sm:py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-gray-600 text-xs sm:text-sm">
              © 2025 Daisy AI. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6">
            <a href="#" className="text-gray-500 hover:text-blue-500 text-xs sm:text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-500 text-xs sm:text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-500 text-xs sm:text-sm">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
} 