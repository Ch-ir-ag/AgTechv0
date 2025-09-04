'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from './Logo';
import { companies } from '../data/companies';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout, isAuthenticated } = useAuth();
  
  // Check if we're on special demo pages
  const isAccuracyDemo = pathname === '/accuracy-demo';
  const isProcessorForecasting = pathname === '/processor-forecasting';
  const isProductDemo = pathname === '/product-demo';
  const isCommodityDemo = pathname === '/commodity-demo';
  const isSpecialDemoPage = isAccuracyDemo || isProcessorForecasting || isProductDemo || isCommodityDemo;
  
  // Extract company from URL if it exists (e.g., /lakeland-dairies/dashboard)
  const urlParts = pathname.split('/').filter(Boolean);
  const currentCompany = urlParts.length > 0 && urlParts[0] !== 'dashboard' && urlParts[0] !== 'accuracy-demo' && urlParts[0] !== 'processor-forecasting' && urlParts[0] !== 'commodity-demo'
    ? urlParts[0] 
    : Object.keys(companies)[0]; // Use first company as default

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#1E4B3A] border-b`} style={{ borderBottomColor: '#1E4B3A' }}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Logo className="text-[#F7F5F0]" />

        {/* Desktop Navigation - Hidden on special demo pages */}
        {!isSpecialDemoPage && (
          <div className="hidden md:flex space-x-6 items-center">
            <Link 
              href={`/${currentCompany}/dashboard`} 
              className="text-[#F7F5F0] hover:text-white text-sm font-medium"
              scroll={true}
              onClick={() => {
                // Force scroll to top when clicking dashboard link
                setTimeout(() => window.scrollTo(0, 0), 0);
              }}
            >
              Forecasting
            </Link>
            <Link 
              href={`/${currentCompany}/product-allocation`} 
              className="text-[#F7F5F0] hover:text-white text-sm font-medium"
              scroll={true}
              onClick={() => {
                // Force scroll to top when clicking product allocation link
                setTimeout(() => window.scrollTo(0, 0), 0);
              }}
            >
              Product Allocation
            </Link>
            
            {/* Logout Button (only if authenticated) */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-[#F7F5F0] hover:text-white text-sm font-medium"
              >
                Logout
              </button>
            )}
          </div>
        )}

        {/* Special Demo Pages Navigation */}
        {isSpecialDemoPage && (
          <div className="hidden md:flex space-x-6 items-center">
            {isAccuracyDemo && (
              <Link 
                href={`/processor-forecasting`} 
                className="text-[#F7F5F0] hover:text-white text-sm font-medium"
                scroll={true}
                onClick={() => {
                  setTimeout(() => window.scrollTo(0, 0), 0);  
                }}
              >
                Processor Forecasting
              </Link>
            )}
            {isProcessorForecasting && (
              <Link 
                href={`/accuracy-demo`} 
                className="text-[#F7F5F0] hover:text-white text-sm font-medium"
                scroll={true}
                onClick={() => {
                  setTimeout(() => window.scrollTo(0, 0), 0);
                }}
              >
                Accuracy Demo
              </Link>
            )}
          </div>
        )}

        {/* Integrations Status - Always positioned on the right for special demo pages */}
        {isSpecialDemoPage && (
          <div className="relative group">
            <div className="px-3 py-1.5 border border-white rounded-md text-white text-sm font-medium cursor-pointer">
              <span>Integrations - Active</span>
            </div>
            
            {/* Tooltip */}
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30">
              <div className="py-2 px-3">
                <div className="text-sm text-gray-700 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>SAP</span>
                    <span className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-green-600">Active</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>MES</span>
                    <span className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-green-600">Active</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>SCADA</span>
                    <span className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-green-600">Active</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        {(isSpecialDemoPage || !isSpecialDemoPage) && (
          <button
            type="button"
            className="md:hidden text-[#F7F5F0] focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Mobile Menu - Hidden on special demo pages */}
      {!isSpecialDemoPage && isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-sm">
          <div className="flex flex-col space-y-4 px-4 py-6">
            <Link 
              href={`/${currentCompany}/dashboard`} 
              className="text-[#F7F5F0] hover:text-white text-sm font-medium"
              onClick={() => {
                setIsMobileMenuOpen(false);
                // Force scroll to top when clicking dashboard link
                setTimeout(() => window.scrollTo(0, 0), 0);
              }}
              scroll={true}
            >
              Forecasting
            </Link>
            <Link 
              href={`/${currentCompany}/product-allocation`} 
              className="text-[#F7F5F0] hover:text-white text-sm font-medium"
              onClick={() => {
                setIsMobileMenuOpen(false);
                // Force scroll to top when clicking product allocation link
                setTimeout(() => window.scrollTo(0, 0), 0);
              }}
              scroll={true}
            >
              Product Allocation
            </Link>
            
            {/* Logout Button (only if authenticated) */}
            {isAuthenticated && (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
                className="text-[#F7F5F0] hover:text-white text-sm font-medium text-left"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}

      {/* Special Demo Pages Mobile Menu */}
      {isSpecialDemoPage && isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-sm">
          <div className="flex flex-col space-y-4 px-4 py-6">
            {isAccuracyDemo && (
              <Link 
                href={`/processor-forecasting`} 
                className="text-[#F7F5F0] hover:text-white text-sm font-medium"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => window.scrollTo(0, 0), 0);
                }}
                scroll={true}
              >
                Processor Forecasting
              </Link>
            )}
            {isProcessorForecasting && (
              <Link 
                href={`/accuracy-demo`} 
                className="text-[#F7F5F0] hover:text-white text-sm font-medium"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => window.scrollTo(0, 0), 0);
                }}
                scroll={true}
              >
                Accuracy Demo
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 