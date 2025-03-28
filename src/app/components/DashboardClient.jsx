'use client';

import Navbar from "./Navbar";
import MilkYieldChart from "./MilkYieldChart";
import YearlyYieldChart from "./YearlyYieldChart";
import Chatbot from "./Chatbot";
import InteractiveSupplyChainMap from "./InteractiveSupplyChainMap";
import QuantifiedImpact from "./QuantifiedImpact";
import StatsSection from "./dashboard/StatsSection";
import InsightsSection from "./dashboard/InsightsSection";

/**
 * DashboardClient component
 * Main client component for company dashboard
 * 
 * @param {object} props
 * @param {string} props.companyName - The formatted company name
 * @param {object} props.companyData - The company data loaded by data loader
 */
export default function DashboardClient({ companyName, companyData }) {
  const { companyStats, companyInsights } = companyData;

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
              <InteractiveSupplyChainMap />
            </section>
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            {/* Yearly Milk Yield vs Prediction */}
            <section id="yearly-prediction" className="h-full">
              <YearlyYieldChart />
            </section>
          </div>
          
          {/* Quantified Impact Section */}
          <div className="mb-8">
            <QuantifiedImpact />
          </div>
          
          {/* Stats Section */}
          <StatsSection stats={companyStats} />
          
          {/* Chatbot Section */}
          <div className="mb-0">
            <section id="chatbot" className="h-full">
              <Chatbot />
            </section>
          </div>
          
          {/* Insights Section */}
          <InsightsSection 
            companyName={companyName} 
            insights={companyInsights} 
          />
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