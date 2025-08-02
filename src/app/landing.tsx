'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from './components/Logo';
import { useAuth } from './contexts/AuthContext';
import { motion } from 'framer-motion';
import { trackEvent, setTag, identifyUser } from './utils/clarityAnalytics';
import DemoRequestModal from './components/DemoRequestModal';
import { SimpleTextRotate } from '@/components/ui/simple-text-rotate';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';



// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const slideInLeft = {
  hidden: { x: -60, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

const slideInRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

export default function Landing() {
  const router = useRouter();
  const { user, login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  


  // Auto-redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated && user?.company) {
      if (user) {
        identifyUser(user.username, undefined, undefined, user.company);
        setTag('company', user.company);
      }
      router.push(`/${user.company}/dashboard`);
    }
  }, [isAuthenticated, user, router]);

  // Handle login form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    trackEvent('login_attempt');

    const success = login(username, password);
    if (success) {
      trackEvent('login_success');
      setUsername('');
      setPassword('');
      router.push(`/${user?.company}/dashboard`);
    } else {
      trackEvent('login_failed');
      setLoginError('Invalid username or password');
    }
  };

  const goToAccuracyDemo = () => {
    trackEvent('accuracy_demo_click');
    router.push('/accuracy-demo');
  };

  const scrollToSection = (id: string) => {
    trackEvent(`scroll_to_${id}`);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };









  if (isAuthenticated) {
    return <></>;
  }

  return (
    <div className="min-h-screen" style={{background: 'var(--cream)'}}>
      {/* Hero Section with Enhanced Background */}
      <div className="relative overflow-hidden min-h-screen" style={{ 
        background: '#F7F5F0'
      }}>
        
        {/* Navigation Bar */}
        <nav className="relative z-20 px-4 sm:px-6 lg:px-8 py-3 border-b" style={{ backgroundColor: '#1E4B3A', borderBottomColor: '#1E4B3A' }}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left side - Logo */}
            <div className="flex items-center">
              <Logo size="large" />
            </div>
            
            {/* Middle - Industries Dropdown and Partner Login */}
            <div className="flex items-center ml-8 gap-4">
              <div className="relative group">
                <button className="flex items-center px-4 py-2 font-medium transition-colors hover:text-white" style={{ color: '#F7F5F0' }}>
                  Industries
                  <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30">
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors" style={{color: '#1E4B3A'}}>Dairy</a>
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors" style={{color: '#1E4B3A'}}>Coming Soon: Grain</a>
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors" style={{color: '#1E4B3A'}}>Coming Soon: Meat</a>
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors" style={{color: '#1E4B3A'}}>Coming Soon: Fish</a>
                  </div>
                </div>
              </div>
              
              {/* Partner Login */}
              <motion.button 
                onClick={() => scrollToSection('login')}
                className="px-4 py-2 text-base font-medium rounded-md transition-colors hover:text-white"
                style={{ color: '#F7F5F0' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Partner Login
              </motion.button>
            </div>
            
            {/* Right side - Action buttons */}
            <div className="flex items-center gap-4">
              {/* See How It Works */}
              <InteractiveHoverButton 
                onClick={() => scrollToSection('how-it-works')}
                className="text-base font-medium border border-[#F7F5F0] hover:bg-white/10"
                style={{ 
                  color: '#F7F5F0',
                  backgroundColor: 'transparent'
                }}
              >
                See How It Works
              </InteractiveHoverButton>
              
              {/* Contact Us */}
              <InteractiveHoverButton 
                onClick={() => window.open('mailto:contact@joindaisy.co', '_self')}
                className="text-base font-medium border border-[#F7F5F0] hover:bg-white/10"
                style={{ 
                  color: '#F7F5F0',
                  backgroundColor: 'transparent'
                }}
              >
                Contact Us
              </InteractiveHoverButton>
            </div>
          </div>
        </nav>
        
        {/* Floating Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated floating shapes */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-green-100 opacity-30 blur-sm"
          />
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-blue-100 opacity-20 blur-sm"
          />
          <motion.div
            animate={{
              y: [0, -10, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-1/3 left-1/3 w-40 h-40 rounded-full bg-gradient-to-br from-indigo-100 to-green-100 opacity-15 blur-md"
          />
        </div>

                {/* Hero Content */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6 pb-8"
        >
          {/* 3D Container Wrapper */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Content Container */}
            <div className="relative bg-white/60 backdrop-blur-sm rounded-[2rem] shadow-2xl border border-white/30 p-6 md:p-8 lg:p-10 transform transition-transform duration-300 hover:scale-[1.02]">
              {/* Decorative corner elements */}
              <div className="absolute top-4 left-4 w-2 h-2 rounded-full" style={{ backgroundColor: '#1E4B3A' }}></div>
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full" style={{ backgroundColor: '#1E4B3A' }}></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full" style={{ backgroundColor: '#1E4B3A' }}></div>
              <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full" style={{ backgroundColor: '#1E4B3A' }}></div>
            {/* Title Section - Enhanced */}
            <div className="text-center max-w-6xl mx-auto mb-8">
              <motion.h1 
                variants={fadeIn}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-4"
                style={{ color: '#1E4B3A' }}
              >
                <span className="block">
                  The Decision Making{" "}
                  <span className="relative inline-block px-3 py-1 mx-2 rounded-lg border-2 border-[#1E4B3A] bg-gradient-to-r from-[#1E4B3A]/10 to-[#1E4B3A]/20 shadow-lg transform hover:scale-105 transition-all duration-300">
                    <span className="relative z-10 font-bold bg-gradient-to-r from-[#1E4B3A] to-[#2A6B4F] bg-clip-text text-transparent">
                      Engine
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  </span>
                </span>
                <span className="block">for Food Processors</span>
              </motion.h1>
              <motion.div 
                variants={fadeIn}
                className="flex items-center justify-center gap-3 mb-6"
              >
                <div className="text-xl" role="img" aria-label="Analytics icon"></div>
                <p className="text-lg md:text-xl font-light max-w-4xl mx-auto"
                   style={{ color: '#1E4B3A', opacity: 0.8 }}
                >
                  Transforming supply forecasting using AI. 
                </p>
              </motion.div>
              
              {/* Horizontal Separator */}
              <motion.div 
                variants={fadeIn}
                className="flex justify-center mb-8"
              >
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </motion.div>
            </div>

          {/* Industry Cards Section */}
          <motion.div 
            variants={staggerContainer}
            className="max-w-6xl mx-auto mb-8"
          >
            {/* Industry Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-8">
              {/* Dairy */}
              <motion.div 
                variants={scaleUp}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.3 } 
                }}
                className="group"
              >
                <div className="relative">
                  {/* Main card */}
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
                       style={{ border: '2px solid #1E4B3A' }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/images/dairy.jpg"
                        alt="Dairy Industry"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-base md:text-lg font-bold mt-3" style={{ color: '#1E4B3A' }}>
                  Dairy
                </p>
              </motion.div>

              {/* Grain */}
              <motion.div 
                variants={scaleUp}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.3 } 
                }}
                className="group"
              >
                <div className="relative">
                  {/* Main card */}
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
                       style={{ border: '2px solid #1E4B3A' }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/images/grain.jpg"
                        alt="Grain Industry"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-base md:text-lg font-bold mt-3" style={{ color: '#1E4B3A' }}>
                  Grain
                </p>
              </motion.div>

              {/* Meat */}
              <motion.div 
                variants={scaleUp}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.3 } 
                }}
                className="group"
              >
                <div className="relative">
                  {/* Main card */}
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
                       style={{ border: '2px solid #1E4B3A' }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/images/meat.jpg"
                        alt="Meat Industry"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-base md:text-lg font-bold mt-3" style={{ color: '#1E4B3A' }}>
                  Meat
                </p>
              </motion.div>

              {/* Fish */}
              <motion.div 
                variants={scaleUp}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.3 } 
                }}
                className="group"
              >
                <div className="relative">
                  {/* Main card */}
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105"
                       style={{ border: '2px solid #1E4B3A' }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src="/images/fish.jpg"
                        alt="Fish Industry"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-base md:text-lg font-bold mt-3" style={{ color: '#1E4B3A' }}>
                  Fish
                </p>
              </motion.div>
            </div>

            {/* Call-to-Action Button */}
            <motion.div 
              variants={fadeIn}
              className="text-center"
            >
              <div className="relative inline-block">
                <motion.div
                  whileHover={{ 
                    y: -4,
                    transition: { duration: 0.2 } 
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="relative inline-block"
                >
                  <button
                    onClick={goToAccuracyDemo}
                    className="relative px-10 py-4 text-xl md:text-2xl font-semibold rounded-xl text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                    style={{ backgroundColor: '#1E4B3A' }}
                  >
                    <span className="relative z-10">
                      Forecast in{" "}
                      <SimpleTextRotate 
                        texts={[
                          "Dairy",
                          "Grain",
                          "Meat",
                          "Fish"
                        ]}
                        interval={2000}
                        className="min-w-0"
                      />
                    </span>
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Problem Section */}
      <div className="py-16" style={{background: 'var(--cream)'}}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div 
            variants={fadeIn}
            className="text-center"
          >
            <h2 className="text-base font-semibold tracking-wide uppercase" style={{color: 'var(--dark-green)'}}>The Problem</h2>
            <p className="mt-2 text-3xl font-extrabold sm:text-4xl" style={{color: 'var(--dark-green)'}}>
              Why Food Processors Need Better Solutions
            </p>
          </motion.div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <motion.div 
              variants={scaleUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white p-8 rounded-xl shadow-lg border-t-4 transform transition-transform"
              style={{borderTopColor: 'var(--dark-green)'}}
            >
              <div className="text-3xl font-bold mb-3" style={{color: 'var(--dark-green)'}}>Poor</div>
              <h3 className="text-xl font-semibold mb-3" style={{color: 'var(--dark-green)'}}>Forecast accuracy</h3>
              <p className="text-slate-600">
                Supply forecasts are typically inaccurate—resulting in millions in waste for average food processors.
              </p>
            </motion.div>
            <motion.div 
              variants={scaleUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white p-8 rounded-xl shadow-lg border-t-4 transform transition-transform"
              style={{borderTopColor: 'var(--dark-green)'}}
            >
              <div className="text-3xl font-bold mb-3" style={{color: 'var(--dark-green)'}}>Excel</div>
              <h3 className="text-xl font-semibold mb-3" style={{color: 'var(--dark-green)'}}>Outdated Tools</h3>
              <p className="text-slate-600">
                Food processors still rely on Excel and intuition for mission-critical decisions that impact millions in revenue.
              </p>
            </motion.div>
            <motion.div 
              variants={scaleUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white p-8 rounded-xl shadow-lg border-t-4 transform transition-transform"
              style={{borderTopColor: 'var(--dark-green)'}}
            >
              <div className="text-3xl font-bold mb-3" style={{color: 'var(--dark-green)'}}>Millions</div>
              <h3 className="text-xl font-semibold mb-3" style={{color: 'var(--dark-green)'}}>Lost Profits</h3>
              <p className="text-slate-600">
                Poor forecasts cause overproduction, labour inefficiencies, contract penalties, and missed sales opportunities.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Solution Section */}
      <div id="how-it-works" className="py-16 text-white" style={{backgroundColor: 'var(--dark-green)'}}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div 
            variants={fadeIn}
            className="text-center"
          >
            <h2 className="text-base text-white/80 font-semibold tracking-wide uppercase">The Solution</h2>
            <p className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Daisy AI: Purpose-Built for Food Processors
            </p>
          </motion.div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <motion.div 
              variants={slideInLeft}
              className="p-8 rounded-xl shadow-xl border border-white/20"
              style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}
            >
              <h3 className="text-2xl font-bold mb-4 text-white">AI-driven Predictive Analytics</h3>
              <p className="text-white/80 text-lg mb-6">
                Our specialised AI combines supply forecasting with margin-optimised product allocation, designed specifically for the unique challenges of food processing across Dairy, Grain, Meat & Fish industries.
              </p>
              <motion.ul 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                <motion.li 
                  variants={fadeIn}
                  className="flex items-start"
                >
                  <svg className="h-6 w-6 text-white/70 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/90">Exceptional improvement in forecast accuracy from market standard</span>
                </motion.li>
                <motion.li 
                  variants={fadeIn}
                  className="flex items-start"
                >
                  <svg className="h-6 w-6 text-white/70 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/90">Real-time inference from weather, market and satellite data streams</span>
                </motion.li>
                <motion.li 
                  variants={fadeIn}
                  className="flex items-start"
                >
                  <svg className="h-6 w-6 text-white/70 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white/90">Forecast + allocation in a single interface</span>
                </motion.li>
              </motion.ul>
            </motion.div>
            <motion.div 
              variants={slideInRight}
              className="p-8 rounded-xl shadow-xl border border-white/20"
              style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}
            >
              <h3 className="text-2xl font-bold mb-4 text-white">Measurable Impact</h3>
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center p-4 rounded-lg gap-4"
                  style={{backgroundColor: 'rgba(255, 255, 255, 0.15)'}}
                >
                  <div className="text-3xl font-bold text-white flex-shrink-0">Millions</div>
                  <div className="text-white">Average annual savings potential per processor</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center p-4 rounded-lg gap-4"
                  style={{backgroundColor: 'rgba(255, 255, 255, 0.15)'}}
                >
                  <div className="text-3xl font-bold text-white flex-shrink-0">Superior</div>
                  <div className="text-white">Forecast accuracy compared to industry standard</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center p-4 rounded-lg gap-4"
                  style={{backgroundColor: 'rgba(255, 255, 255, 0.15)'}}
                >
                  <div className="text-3xl font-bold text-white flex-shrink-0">20+</div>
                  <div className="text-white">Variables modelled in our AI</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div 
            variants={fadeIn}
            className="text-center"
          >
            <h2 className="text-base font-semibold tracking-wide uppercase" style={{color: 'var(--dark-green)'}}>Features</h2>
            <p className="mt-2 text-3xl font-extrabold sm:text-4xl" style={{color: 'var(--dark-green)'}}>
              Powerful Tools for Food Processing Excellence
            </p>
          </motion.div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <motion.div 
              variants={scaleUp}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
              className="relative p-8 bg-white rounded-xl shadow-lg border-b-4 transition-shadow"
              style={{borderBottomColor: 'var(--dark-green)'}}
            >
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -top-5 left-6 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg"
                style={{backgroundColor: 'var(--dark-green)'}}
              >
                📈
              </motion.div>
              <h3 className="mt-6 text-lg font-semibold" style={{color: 'var(--dark-green)'}}>Accurate Forecasts </h3>
              <p className="mt-3 text-slate-600">
                Precise predictions for supply volume, quality metrics, and composition across all food categories.
              </p>
            </motion.div>
            <motion.div 
              variants={scaleUp}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
              className="relative p-8 bg-white rounded-xl shadow-lg border-b-4 transition-shadow"
              style={{borderBottomColor: 'var(--dark-green)'}}
            >
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -top-5 left-6 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg"
                style={{backgroundColor: 'var(--dark-green)'}}
              >
                📦
              </motion.div>
              <h3 className="mt-6 text-lg font-semibold" style={{color: 'var(--dark-green)'}}>Product Allocation Engine</h3>
              <p className="mt-3 text-slate-600">
                Real-time decisions on what to produce (butter, powder, whey, etc.) for maximum profit.
              </p>
            </motion.div>
            <motion.div 
              variants={scaleUp}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
              className="relative p-8 bg-white rounded-xl shadow-lg border-b-4 transition-shadow"
              style={{borderBottomColor: 'var(--dark-green)'}}
            >
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -top-5 left-6 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg"
                style={{backgroundColor: 'var(--dark-green)'}}
              >
                📊
              </motion.div>
              <h3 className="mt-6 text-lg font-semibold" style={{color: 'var(--dark-green)'}}>Visual Dashboards</h3>
              <p className="mt-3 text-slate-600">
                Intuitive interfaces designed for analysts, operations managers, and executives.
              </p>
            </motion.div>
            <motion.div 
              variants={scaleUp}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
              className="relative p-8 bg-white rounded-xl shadow-lg border-b-4 transition-shadow"
              style={{borderBottomColor: 'var(--dark-green)'}}
            >
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-5 left-6 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg"
                style={{backgroundColor: 'var(--dark-green)'}}
              >
                🌍
              </motion.div>
              <h3 className="mt-6 text-lg font-semibold" style={{color: 'var(--dark-green)'}}>Data Integration</h3>
              <p className="mt-3 text-slate-600">
                Comprehensive data from internal sources and external factors like weather and market trends.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Login Section */}
      <div id="login" className="py-16" style={{background: 'var(--cream)'}}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="md:flex md:items-center md:justify-between">
            <motion.div 
              variants={slideInLeft}
              className="md:w-1/2 mb-8 md:mb-0"
            >
              <h2 className="text-3xl font-extrabold sm:text-4xl mb-6" style={{color: 'var(--dark-green)'}}>
                <span className="block">Already a Daisy AI Partner?</span>
                <span className="block">Login to Your Dashboard</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Access your personalised dairy analytics platform to view forecasts, optimise production, and make data-driven decisions.
              </p>
              <motion.button
                onClick={goToAccuracyDemo}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white transition-colors"
                style={{backgroundColor: 'var(--dark-green)'}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                View Accuracy Demo
              </motion.button>
            </motion.div>
            
            {/* Login Form - Preserved but with animations */}
            <motion.div 
              variants={slideInRight}
              className="md:w-2/5"
            >
              <motion.div 
                whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-xl shadow-xl"
              >
                <h3 className="text-xl font-medium text-slate-900 mb-6">Partner Login</h3>
                    
                    <form onSubmit={handleLogin}>
                      {loginError && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm"
                    >
                          {loginError}
                    </motion.div>
                      )}
                      
                      <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">
                          Username
                        </label>
                        <input
                          type="text"
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--dark-green)] focus:border-[var(--dark-green)] transition-all duration-200"
                          required
                        />
                      </div>
                      
                      <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--dark-green)] focus:border-[var(--dark-green)] transition-all duration-200"
                          required
                        />
                      </div>
                      
                  <div>
                    <motion.button
                          type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-[var(--dark-green)] hover:bg-[var(--primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--dark-green)] transition-colors"
                        >
                          Login
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="text-white" style={{backgroundColor: 'var(--dark-green)'}}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
        >
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span className="block">Ready to transform your food processing operation?</span>
            <span className="block text-white/80">Start with Daisy AI today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow-lg">
              <motion.a
                href="mailto:contact@joindaisy.co"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 transition-colors shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </motion.a>
            </div>
        </div>
        </motion.div>
      </div>

      {/* Supporters Section */}
      <div className="py-12 bg-white">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div 
            variants={fadeIn}
            className="text-center"
          >
            <h2 className="text-base font-semibold tracking-wide uppercase" style={{color: 'var(--dark-green)'}}>Our Supporters</h2>
            <p className="mt-2 text-2xl font-bold sm:text-3xl mb-10" style={{color: 'var(--dark-green)'}}>
              Backed by Leading Innovation Programs
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 lg:gap-28">
            <motion.a 
              href="https://www.entrepreneurfirst.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              variants={scaleUp}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center"
            >
              <div className="h-16 md:h-20 relative">
                <Image
                  src="/images/EF.png"
                  alt="Entrepreneur First"
                  width={80}
                  height={80}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </motion.a>
            <motion.a 
              href="https://www.ndrc.ie/" 
              target="_blank" 
              rel="noopener noreferrer"
              variants={scaleUp}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center"
            >
              <div className="h-16 md:h-20 relative">
                <Image
                  src="/images/ndrc-logo.png"
                  alt="NDRC"
                  width={110}
                  height={80}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </motion.a>
            <motion.a 
              href="https://www.enterprise-ireland.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              variants={scaleUp}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center"
            >
              <div className="h-16 md:h-20 relative">
                <Image
                  src="/images/enterprise-ireland-logo.png"
                  alt="Enterprise Ireland"
                  width={140}
                  height={80}
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-slate-50 to-white py-12">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-7xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8"
        >
          <div className="w-full">
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center text-base text-slate-500"
            >
              &copy; {new Date().getFullYear()} Daisy AI. All rights reserved.
            </motion.p>
          </div>
        </motion.div>
      </footer>

      {/* Demo Request Modal */}
      <DemoRequestModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
      

    </div>
  );
} 