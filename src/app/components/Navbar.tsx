'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-sm py-2'
          : 'bg-white py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Logo className="text-blue-500" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-500 text-sm font-medium">
            Dashboard
          </Link>
          <Link href="#analytics" className="text-gray-700 hover:text-blue-500 text-sm font-medium">
            Yield Analytics
          </Link>
          <Link href="#supply-chain-map" className="text-gray-700 hover:text-blue-500 text-sm font-medium">
            Supply Chain
          </Link>
          <Link href="#chatbot" className="text-gray-700 hover:text-blue-500 text-sm font-medium">
            AI Assistant
          </Link>
          <Link href="/accuracy-demo" className="text-gray-700 hover:text-blue-500 text-sm font-medium">
            Accuracy Demo
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden text-gray-700 focus:outline-none"
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
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-sm">
          <div className="flex flex-col space-y-4 px-4 py-6">
            <Link 
              href="/dashboard" 
              className="text-gray-700 hover:text-blue-500 text-sm font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              href="#analytics" 
              className="text-gray-700 hover:text-blue-500 text-sm font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Yield Analytics
            </Link>
            <Link 
              href="#supply-chain-map" 
              className="text-gray-700 hover:text-blue-500 text-sm font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Supply Chain
            </Link>
            <Link 
              href="#chatbot" 
              className="text-gray-700 hover:text-blue-500 text-sm font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              AI Assistant
            </Link>
            <Link 
              href="/accuracy-demo" 
              className="text-gray-700 hover:text-blue-500 text-sm font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accuracy Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 