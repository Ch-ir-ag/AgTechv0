'use client';

import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
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

// Define the insight type
interface Insight {
  id: string;
  icon: string;
  text: string;
  color: string;
}

export default function DashboardClient({ companyName }: DashboardClientProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  
  // State for insights carousel - dynamically set based on company
  const [insights, setInsights] = useState<Insight[]>(() => {
    // Different insights for each cooperative
    if (companyName.toLowerCase().includes('kerry')) {
      return [
        { id: '1', icon: '🔍', text: 'Milk Yield increased in Listowel processing plant due to implementation of new collection systems', color: 'blue' },
        { id: '2', icon: '📈', text: 'Production efficiency up 9% in Kerry\'s southwestern collection region', color: 'green' },
        { id: '3', icon: '⚠️', text: 'Potential supply disruption expected in Kerry County farms due to forecasted storms', color: 'amber' },
        { id: '4', icon: '🌱', text: 'Kerry\'s carbon offset program reduced emissions by 6.5% across the supply chain', color: 'green' },
        { id: '5', icon: '🥛', text: 'Kerry Gold butter production increased by 4.2% for export markets', color: 'blue' },
      ];
    } else { // Default to Lakeland Dairies
      return [
        { id: '1', icon: '🔍', text: 'Milk Yield increased in Bailieborough factory due to heavy rainfall in catchment areas', color: 'blue' },
        { id: '2', icon: '📈', text: 'Production efficiency up 12% in Lakeland\'s northern region facilities', color: 'green' },
        { id: '3', icon: '⚠️', text: 'Potential supply shortage expected in Q3 for Killeshandra processing unit', color: 'amber' },
        { id: '4', icon: '🌱', text: 'Lakeland\'s sustainable practices reducing carbon footprint by 8% year over year', color: 'green' },
        { id: '5', icon: '🧀', text: 'Lakeland\'s premium cheese program showing 15% growth in European markets', color: 'blue' },
      ];
    }
  });
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const insightSliderRef = useRef<HTMLDivElement>(null);
  
  // Function to dismiss an insight
  const dismissInsight = (insightId: string) => {
    // Filter out the dismissed insight
    const updatedInsights = insights.filter(insight => insight.id !== insightId);
    setInsights(updatedInsights);
    
    // Adjust current index if needed
    if (currentInsightIndex >= updatedInsights.length) {
      setCurrentInsightIndex(Math.max(0, updatedInsights.length - 1));
    }
  };
  
  // Function to navigate to previous insight
  const goToPrevInsight = () => {
    if (currentInsightIndex > 0) {
      setCurrentInsightIndex(currentInsightIndex - 1);
      scrollToInsight(currentInsightIndex - 1);
    }
  };
  
  // Function to navigate to next insight
  const goToNextInsight = () => {
    if (currentInsightIndex < insights.length - 1) {
      setCurrentInsightIndex(currentInsightIndex + 1);
      scrollToInsight(currentInsightIndex + 1);
    }
  };
  
  // Function to scroll to a specific insight
  const scrollToInsight = (index: number) => {
    if (insightSliderRef.current) {
      const slideWidth = insightSliderRef.current.offsetWidth;
      insightSliderRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
    }
  };
  
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


          {/* Insight Bar */}
          <div className="mb-8">
            <section id="insights-bar" className="h-full">
              <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm p-2 md:p-3 border border-gray-100">
                {/* Scroll Arrows - Always visible */}
                <button 
                  onClick={goToPrevInsight}
                  disabled={currentInsightIndex === 0 || insights.length === 0}
                  className={`absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-1.5 shadow-md flex items-center justify-center transition-all ${
                    currentInsightIndex === 0 || insights.length === 0 ? 'text-gray-300 cursor-not-allowed opacity-50' : 'text-gray-600 hover:bg-blue-50 hover:scale-105'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button 
                  onClick={goToNextInsight}
                  disabled={currentInsightIndex === insights.length - 1 || insights.length === 0}
                  className={`absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white/90 rounded-full p-1.5 shadow-md flex items-center justify-center transition-all ${
                    currentInsightIndex === insights.length - 1 || insights.length === 0 ? 'text-gray-300 cursor-not-allowed opacity-50' : 'text-gray-600 hover:bg-blue-50 hover:scale-105'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Scrollable Content - Modified for single insight per view */}
                {insights.length > 0 ? (
                  <div 
                    ref={insightSliderRef}
                    className="overflow-x-hidden px-6 md:px-8 scrollbar-hide snap-x snap-mandatory scroll-smooth"
                  >
                    <div className="flex w-full">
                      {/* Map through insights to render each one */}
                      {insights.map((insight) => (
                        <div key={insight.id} className="w-full flex-shrink-0 snap-center py-2">
                          <div className="mx-auto max-w-2xl">
                            <div 
                              className={`flex items-center justify-between bg-white rounded-xl p-4 shadow-sm group transition-all duration-300 ease-in-out hover:shadow-md`}
                            >
                              <div className="flex items-center flex-1 mr-2">
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-${insight.color}-500 bg-opacity-15 flex items-center justify-center mr-4 ring-2 ring-${insight.color}-500 ring-opacity-30`}>
                                  <span className={`text-${insight.color}-600 text-xl`}>{insight.icon}</span>
                                </div>
                                <span className="text-gray-800 font-medium">{insight.text}</span>
                              </div>
                              <button 
                                onClick={() => dismissInsight(insight.id)}
                                className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100 p-1 rounded-full"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>No new insights available</p>
                  </div>
                )}
                
                {/* Indicator dots */}
                {insights.length > 1 && (
                  <div className="flex justify-center mt-2 space-x-1.5">
                    {insights.map((insight, index) => (
                      <button 
                        key={insight.id}
                        onClick={() => {
                          setCurrentInsightIndex(index);
                          scrollToInsight(index);
                        }}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ease-in-out ${
                          index === currentInsightIndex ? `bg-${insights[currentInsightIndex].color}-500 scale-125` : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to insight ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
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