'use client';

import React, { useState, useRef, useEffect } from 'react';

// Define the insight type
interface Insight {
  id: string;
  text: string;
  color: string;
  viewed: boolean;
}

interface ProductAllocationInsightsProps {
  companyName: string;
}

export default function ProductAllocationInsights({ companyName }: ProductAllocationInsightsProps) {
  // Generate data-based insights specific to product allocation
  const generateInsights = () => {
    if (companyName.toLowerCase().includes('kerry')) {
      return [
        { id: '1', text: 'Cream allocation to butter can be increased by 5% based on current fat content', color: 'blue', viewed: false },
        { id: '2', text: 'Protein levels suggest shifting 3% more milk to cheese production this week', color: 'green', viewed: false },
        { id: '3', text: 'Consider reducing WMP production by 4% to optimize revenue with current market prices', color: 'indigo', viewed: false },
        { id: '4', text: 'Domestic liquid milk demand expected to rise 2.5% due to upcoming holiday', color: 'green', viewed: false },
      ];
    } else { // Default to Lakeland Dairies
      return [
        { id: '1', text: 'Redirect 7% of milk from powders to butter production to maximize margins', color: 'blue', viewed: false },
        { id: '2', text: 'High protein content favors increased cheese allocation this week (+4%)', color: 'green', viewed: false },
        { id: '3', text: 'Consider reducing SMP production by 3% given current market conditions', color: 'indigo', viewed: false },
        { id: '4', text: 'Upcoming contract deliveries require 5% more UHT milk allocation next week', color: 'green', viewed: false },
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
  
  // Return null if all insights have been viewed
  if (allViewed) {
    return null;
  }
  
  return (
    <div className={`mb-8 transition-all duration-500 ease-in-out ${isHiding ? 'opacity-0 transform -translate-y-4' : 'opacity-100'}`}>
      <section id="product-insights-bar" className="h-full">
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
                        <span className={`text-${insight.color}-600 text-xs font-semibold tracking-wider uppercase`}>Allocation Insight</span>
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
  );
} 