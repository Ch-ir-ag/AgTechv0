'use client';

import Script from 'next/script';
import Navbar from "../components/Navbar";
import MilkYieldChart from "../components/MilkYieldChart";
import YearlyYieldChart from "../components/YearlyYieldChart";
import InteractiveSupplyChainMap from "../components/InteractiveSupplyChainMap";
import QuantifiedImpact from "../components/QuantifiedImpact";
import StatsSection from "../components/dashboard/StatsSection";
import InsightsSection from "../components/dashboard/InsightsSection";
import { loadCompanyData } from '../utils/companyDataLoader';

// Import the styles
import './styles.css';

export default function ProcessorForecasting() {
  const companyName = 'Demo Processor';
  const companySlug = 'demo-processor';
  const companyData = loadCompanyData(companySlug);
  const { companyStats, companyInsights } = companyData;

  return (
    <>
      <Script id="scroll-to-top" strategy="beforeInteractive">
        {`
          if (typeof window !== 'undefined') {
            window.scrollTo(0, 0);
            history.scrollRestoration = 'manual';
            document.documentElement.style.scrollBehavior = 'auto';
            setTimeout(() => { window.scrollTo(0, 0); }, 0);
            setTimeout(() => { window.scrollTo(0, 0); }, 50);
            setTimeout(() => { window.scrollTo(0, 0); }, 100);
          }
        `}
      </Script>
      <div className="flex flex-col min-h-screen bg-[#F7F5F0]">
        <Navbar />
        
        {/* Main Content */}
        <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold text-[#1E4B3A] mb-4">
                <span className="text-[#1E4B3A]">{companyName} Forecasting Capabilities</span>
              </h1>
              <p className="text-[#1E4B3A] max-w-3xl mx-auto">
                Demonstration of our advanced AI-powered forecasting capabilities with anonymized data
                to showcase what we deliver for our current customers.
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
            
            {/* Quantified Impact Section */}
            <div className="mb-8">
              <QuantifiedImpact companyName={companyName} />
            </div>
            
            {/* Stats Section */}
            <StatsSection stats={companyStats} />
            
            {/* Insights Section */}
            <InsightsSection 
              companyName={companyName} 
              insights={companyInsights} 
            />
          </div>
        </main>
      </div>
    </>
  );
} 