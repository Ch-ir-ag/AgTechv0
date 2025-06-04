'use client';

import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "./Navbar";
import MilkYieldChart from "./MilkYieldChart";
import YearlyYieldChart from "./YearlyYieldChart";
import Chatbot from "./Chatbot";
import InteractiveSupplyChainMap from "./InteractiveSupplyChainMap";
import { useAuth } from '../contexts/AuthContext';
import { loadCompanyData } from '../utils/companyDataLoader';

// Create a safe useLayoutEffect that falls back to useEffect for SSR
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface DashboardClientProps {
  companyName: string;
}

// Define the insight type
interface Insight {
  id: string;
  text: string;
  color: string;
  viewed: boolean;
}

export default function DashboardClient({ companyName }: DashboardClientProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  
  // Get company slug from company name for data loading
  const companySlug = companyName.toLowerCase().replace(/\s+/g, '-');
  const companyData = loadCompanyData(companySlug);
  
  // Generate data-based insights
  const generateInsights = () => {
    if (companyName.toLowerCase().includes('kerry')) {
      return [
        { id: '1', text: 'Milk supply will be down 2% because of increased rainfall', color: 'blue', viewed: false },
        { id: '2', text: 'Fat & protein is high this week compared to last week', color: 'green', viewed: false },
        { id: '3', text: 'Next week’s milk output expected to rise due to drier conditions and improved grass growth', color: 'indigo', viewed: false },
        { id: '4', text: 'Storm system incoming — potential 4% dip in collection volumes next week', color: 'green', viewed: false },
      ];
    } else if (companyName.toLowerCase().includes('dairygold')) {
      return [
        { id: '1', text: 'Production efficiency up 6.1% this month with improved feed optimization strategies', color: 'green', viewed: false },
        { id: '2', text: 'Seasonal quality metrics showing excellent fat and protein levels ahead of winter', color: 'blue', viewed: false },
        { id: '3', text: 'Weather forecast indicates stable collection volumes for the next two weeks', color: 'indigo', viewed: false },
        { id: '4', text: 'Feed efficiency ratio optimal at 1.4 L/kg — maintaining competitive advantage', color: 'green', viewed: false },
      ];
    } else { // Default to Lakeland Dairies
      return [
        { id: '1', text: 'Milk supply will be down 2% because of increased rainfall', color: 'blue', viewed: false },
        { id: '2', text: 'Fat & protein is high this week compared to last week', color: 'green', viewed: false },
        { id: '3', text: 'Next week’s milk output expected to rise due to drier conditions and improved grass growth', color: 'indigo', viewed: false },
        { id: '4', text: 'Storm system incoming — potential 4% dip in collection volumes next week', color: 'green', viewed: false },
      ];
    }
  };
  
  // State for insights carousel
  const [insights, setInsights] = useState<Insight[]>(generateInsights);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [allViewed, setAllViewed] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const insightSliderRef = useRef<HTMLDivElement>(null);
  
  // Function to mark current insight as viewed and go to next
  const viewNextInsight = () => {
    // Mark the current insight as viewed
    const updatedInsights = [...insights];
    updatedInsights[currentInsightIndex].viewed = true;
    setInsights(updatedInsights);
    
    if (currentInsightIndex < insights.length - 1) {
      // Go to next insight
      setCurrentInsightIndex(currentInsightIndex + 1);
      scrollToInsight(currentInsightIndex + 1);
    } else {
      // Check if all insights are viewed
      const allAreViewed = updatedInsights.every(insight => insight.viewed);
      if (allAreViewed) {
        // Start hiding animation, then set allViewed to true
        setIsHiding(true);
        setTimeout(() => {
          setAllViewed(true);
        }, 500); // Match this with the CSS transition duration
      }
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
  
  // Immediately mark as all viewed and hide if no insights
  useEffect(() => {
    if (insights.length === 0) {
      setAllViewed(true);
    }
  }, [insights]);
  
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
              <span className="text-black">Yield Prediction Dashboard</span>
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Monitor your dairy production metrics and get accurate AI-powered predictions for future milk yield
              to help optimize your operations and planning with Daisy AI&apos;s advanced analytics.
            </p>
          </div>


          {/* Whoop-style Insight Bar - Hidden when all insights are viewed */}
          {!allViewed && (
            <div className={`mb-8 transition-all duration-500 ease-in-out ${isHiding ? 'opacity-0 transform -translate-y-4' : 'opacity-100'}`}>
              <section id="insights-bar" className="h-full">
                <div className="relative bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-sm overflow-hidden">
                  {/* Scrollable Content - Cards are clickable */}
                  <div 
                    ref={insightSliderRef}
                    className="overflow-x-hidden scrollbar-hide snap-x snap-mandatory scroll-smooth"
                  >
                    <div className="flex w-full">
                      {/* Map through insights to render each one */}
                      {insights.map((insight, index) => (
                        <button 
                          key={insight.id} 
                          onClick={viewNextInsight}
                          className="w-full flex-shrink-0 snap-center text-left cursor-pointer focus:outline-none"
                        >
                          <div className="mx-auto py-5 px-6">
                            <div className={`bg-white rounded-xl p-5 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md`}>
                              <div className="flex items-center justify-between mb-2">
                                <span className={`text-${insight.color}-600 text-xs font-semibold tracking-wider uppercase`}>Insight</span>
                                <div className="flex space-x-1">
                                  {insights.map((_, dotIndex) => (
                                    <div 
                                      key={dotIndex}
                                      className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                                        dotIndex === index ? `bg-${insight.color}-500` : 'bg-gray-300'
                                      } ${dotIndex < currentInsightIndex ? 'opacity-0' : ''}`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-800 font-medium">{insight.text}</p>
                              {index === insights.length - 1 ? (
                                <div className="mt-3 text-xs text-gray-500">Tap to dismiss</div>
                              ) : (
                                <div className="mt-3 text-xs text-gray-500">Tap to continue</div>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
          
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
              <p className="text-2xl sm:text-3xl font-bold text-blue-500">
                {companyData.companyStats?.currentMonthlyYield?.value || '165M'}
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">
                {companyData.companyStats?.currentMonthlyYield?.label || 'Current Monthly Yield (L)'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {companyData.companyStats?.currentMonthlyYield?.confidenceInterval || '±4% confidence interval'}
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-blue-500">
                {companyData.companyStats?.monthlyGrowthRate?.value || '+5.2%'}
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">
                {companyData.companyStats?.monthlyGrowthRate?.label || 'Monthly Growth Rate'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {companyData.companyStats?.monthlyGrowthRate?.confidenceInterval || '±0.8% confidence interval'}
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-blue-500">
                {companyData.companyStats?.projectedAnnualYield?.value || '2.1B'}
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">
                {companyData.companyStats?.projectedAnnualYield?.label || 'Projected Annual Yield (L)'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {companyData.companyStats?.projectedAnnualYield?.confidenceInterval || '±3.2% confidence interval'}
              </p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-blue-500">
                {companyData.companyStats?.predictionAccuracy?.value || '95.8%'}
              </p>
              <p className="text-gray-600 text-xs sm:text-sm">
                {companyData.companyStats?.predictionAccuracy?.label || 'Prediction Accuracy'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {companyData.companyStats?.predictionAccuracy?.confidenceInterval || 'Based on historical validation'}
              </p>
            </div>
          </div>
          
          {/* Chatbot Section */}
          <div className="mb-0">
            <section id="chatbot" className="h-full">
              <Chatbot companyName={companyName} />
            </section>
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