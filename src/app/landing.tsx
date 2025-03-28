'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from './components/Logo';

// Define company interface
interface Company {
  id: string;
  name: string;
}

export default function Landing() {
  const router = useRouter();
  const [selectedCompany, setSelectedCompany] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const companies: Company[] = [
    { id: 'lakeland-dairies', name: 'Lakeland Dairies' },
    { id: 'kerry-dairy', name: 'Kerry Dairy' }
  ];

  const handleCompanySelect = (companyId: string) => {
    setSelectedCompany(companyId);
    setIsDropdownOpen(false);
  };

  const goToDashboard = () => {
    if (selectedCompany) {
      // Navigate to dashboard and ensure it starts at the top
      router.push(`/${selectedCompany}/dashboard`, { scroll: true });
    } else {
      // Show dropdown if no company is selected
      setIsDropdownOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Logo className="text-blue-500" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Improving</span>
                  <span className="block text-blue-600">Dairy Production</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 ">
                  Daisy AI delivers highly accurate milk yield predictions and smart product allocation, empowering dairy co-operatives to plan production, optimise supply chains, and secure international contracts with confidence.
                </p>
                <div className="mt-5 sm:mt-8 flex flex-col items-center sm:items-center lg:items-start">
                  {/* Container to ensure same width for dropdown and button row */}
                  <div className="w-full max-w-md">
                    {/* Dropdown */}
                    <div className="w-full mb-3">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full flex items-center justify-between px-8 py-3 border border-gray-200 rounded-md shadow-sm bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 md:py-4 md:text-lg"
                      >
                        <span>{selectedCompany ? companies.find(c => c.id === selectedCompany)?.name : 'Select a company'}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {isDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full max-w-md rounded-md bg-white shadow-lg">
                          <ul className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            {companies.map((company) => (
                              <li
                                key={company.id}
                                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50"
                                onClick={() => handleCompanySelect(company.id)}
                              >
                                {company.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Buttons in a row */}
                    <div className="w-full flex">
                      <div className="flex-1 rounded-md shadow">
                        <button
                          onClick={goToDashboard}
                          className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white ${selectedCompany ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400'} md:py-4 md:text-lg`}
                          disabled={!selectedCompany}
                        >
                          View Demo
                        </button>
                      </div>
                      <div className="flex-1 ml-3">
                        <button
                          onClick={() => router.push('/accuracy-demo')}
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg"
                        >
                          View Kildangan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 relative h-56 sm:h-72 md:h-96 lg:h-full">
          <Image
            src="/images/COWIMAGE1.png"
            alt="Daisy AI"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to manage dairy production
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our AI-powered platform provides comprehensive tools for dairy cooperatives to optimize their operations.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Advanced Analytics</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Comprehensive analytics dashboard with real-time data visualization and historical comparisons.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Yield Prediction</h3>
                  <p className="mt-2 text-base text-gray-500">
                    AI-powered milk yield predictions with high accuracy to help plan production and logistics.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Supply Chain Optimization</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Visualize and optimize your entire supply chain from farm to market with our interactive map.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Product Allocation</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Intelligently allocate milk resources across product lines to maximise returns based on market demand and pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to boost your dairy production?</span>
            <span className="block text-blue-600">Start using Daisy AI today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => {
                  if (selectedCompany) {
                    router.push(`/${selectedCompany}/dashboard`, { scroll: true });
                  } else {
                    setIsDropdownOpen(true);
                  }
                }}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="w-full">
            <p className="text-center text-base text-gray-400">
              &copy; 2025 Daisy AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 