'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from './components/Logo';
import { useAuth } from './contexts/AuthContext';
import { motion } from 'framer-motion';

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
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideInRight = {
  hidden: { x: 60, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function Landing() {
  const router = useRouter();
  const { user, login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Auto-redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated && user?.company) {
      router.push(`/${user.company}/dashboard`);
    }
  }, [isAuthenticated, user, router]);

  // Handle login form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const success = login(username, password);
    if (success) {
      setUsername('');
      setPassword('');
      router.push(`/${user?.company}/dashboard`);
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const goToAccuracyDemo = () => {
    router.push('/accuracy-demo');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isAuthenticated) {
    return <></>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-white">
      {/* Navigation - Kept as requested */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Logo className="text-blue-600" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 py-16 text-white">
        <div className="absolute inset-0 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.h1 
                variants={fadeIn}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
              >
                <span className="block text-white">AI-Powered</span>
                <span className="block text-blue-200">Milk Forecasting &</span>
                <span className="block text-indigo-200">Product Allocation</span>
                <span className="block text-white">for Dairy Co-Ops</span>
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="mt-6 text-xl text-blue-100 max-w-3xl"
              >
                Predict with 95%+ accuracy. Save more than €10M/year. Maximise margin from every litre.
              </motion.p>
              <motion.div 
                variants={fadeIn}
                className="mt-8 flex flex-wrap gap-4"
              >
                <motion.a 
                  href="mailto:contact@joindaisy.co"
                  className="px-8 py-3 text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50 transition-colors md:py-4 md:text-lg shadow-lg hover:shadow-xl flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Us
                </motion.a>
                <motion.button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="px-8 py-3 text-base font-medium rounded-md text-white bg-blue-400 bg-opacity-30 hover:bg-opacity-40 backdrop-blur-sm transition-colors md:py-4 md:text-lg border border-blue-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  See How It Works
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection('login')}
                  className="px-8 py-3 text-base font-medium rounded-md border border-blue-300 text-white hover:bg-blue-700 hover:bg-opacity-20 transition-colors md:py-4 md:text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Partner Login
                </motion.button>
              </motion.div>
            </div>
            <motion.div 
              variants={slideInRight}
              className="md:w-1/2 md:ml-8 relative h-64 sm:h-72 md:h-96"
            >
              <Image
                src="/images/COWIMAGE1.png"
                alt="Daisy AI"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover', borderRadius: '12px' }}
                className="shadow-2xl"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Problem Section */}
      <div className="py-16 bg-gradient-to-r from-slate-50 to-blue-50">
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
            <h2 className="text-base text-blue-700 font-semibold tracking-wide uppercase">The Problem</h2>
            <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Why Dairy Co-ops Need Better Solutions
            </p>
          </motion.div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <motion.div 
              variants={scaleUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500 transform transition-transform"
            >
              <div className="text-blue-600 text-3xl font-bold mb-3">10%</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Inaccurate Forecasts</h3>
              <p className="text-slate-600">
                Milk supply forecasts are typically 10% inaccurate—resulting in €10M/year in waste for average processors.
              </p>
            </motion.div>
            <motion.div 
              variants={scaleUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-indigo-500 transform transition-transform"
            >
              <div className="text-indigo-600 text-3xl font-bold mb-3">Excel</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Outdated Tools</h3>
              <p className="text-slate-600">
                Co-ops still rely on Excel and intuition for mission-critical decisions that impact millions in revenue.
              </p>
            </motion.div>
            <motion.div 
              variants={scaleUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-purple-500 transform transition-transform"
            >
              <div className="text-purple-600 text-3xl font-bold mb-3">€€€</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lost Profits</h3>
              <p className="text-slate-600">
                Poor forecasts cause overproduction, labour inefficiencies, contract penalties, and missed sales opportunities.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Solution Section */}
      <div id="how-it-works" className="py-16 bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900 text-white">
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
            <h2 className="text-base text-indigo-200 font-semibold tracking-wide uppercase">The Solution</h2>
            <p className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Daisy AI: Purpose-Built for Dairy Co-ops
            </p>
          </motion.div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <motion.div 
              variants={slideInLeft}
              className="bg-gradient-to-br from-blue-800 to-indigo-800 p-8 rounded-xl shadow-xl border border-indigo-600"
            >
              <h3 className="text-2xl font-bold mb-4 text-white">AI-driven Predictive Analytics</h3>
              <p className="text-indigo-100 text-lg mb-6">
                Our specialised AI combines supply forecasting with margin-optimised product allocation, designed specifically for the unique challenges of dairy cooperatives.
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
                  <svg className="h-6 w-6 text-indigo-300 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-blue-100">Neural network-powered predictions with 95%+ accuracy</span>
                </motion.li>
                <motion.li 
                  variants={fadeIn}
                  className="flex items-start"
                >
                  <svg className="h-6 w-6 text-indigo-300 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-blue-100">Real-time inference from diverse data streams</span>
                </motion.li>
                <motion.li 
                  variants={fadeIn}
                  className="flex items-start"
                >
                  <svg className="h-6 w-6 text-indigo-300 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-blue-100">Forecast + allocation in a single interface</span>
                </motion.li>
              </motion.ul>
            </motion.div>
            <motion.div 
              variants={slideInRight}
              className="bg-gradient-to-br from-indigo-800 to-blue-800 p-8 rounded-xl shadow-xl border border-blue-600"
            >
              <h3 className="text-2xl font-bold mb-4 text-white">Measurable Impact</h3>
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center bg-indigo-900 bg-opacity-40 p-4 rounded-lg"
                >
                  <div className="text-3xl font-bold text-indigo-200 w-24">€10M</div>
                  <div className="text-blue-100">Average annual savings potential per processor</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center bg-indigo-900 bg-opacity-40 p-4 rounded-lg"
                >
                  <div className="text-3xl font-bold text-indigo-200 w-24">15%+</div>
                  <div className="text-blue-100">Improvement in forecast accuracy from market standard</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center bg-indigo-900 bg-opacity-40 p-4 rounded-lg"
                >
                  <div className="text-3xl font-bold text-indigo-200 w-24">20+</div>
                  <div className="text-blue-100">Variables modeled in our advanced AI system</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gradient-to-b from-white to-blue-50">
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
            <h2 className="text-base text-blue-700 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Powerful Tools for Dairy Excellence
            </p>
          </motion.div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <motion.div 
              variants={scaleUp}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
              className="relative p-8 bg-white rounded-xl shadow-lg border-b-4 border-blue-500 transition-shadow"
            >
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -top-5 left-6 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg"
              >
                📈
              </motion.div>
              <h3 className="mt-6 text-lg font-semibold text-slate-900">95%+ Forecast Accuracy</h3>
              <p className="mt-3 text-slate-600">
                Precise predictions for milk volume, fat, protein, and lactose content.
              </p>
            </motion.div>
            <motion.div 
              variants={scaleUp}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
              className="relative p-8 bg-white rounded-xl shadow-lg border-b-4 border-indigo-500 transition-shadow"
            >
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -top-5 left-6 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-lg"
              >
                📦
              </motion.div>
              <h3 className="mt-6 text-lg font-semibold text-slate-900">Product Allocation Engine</h3>
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
              className="relative p-8 bg-white rounded-xl shadow-lg border-b-4 border-blue-500 transition-shadow"
            >
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -top-5 left-6 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-lg"
              >
                📊
              </motion.div>
              <h3 className="mt-6 text-lg font-semibold text-slate-900">Visual Dashboards</h3>
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
              className="relative p-8 bg-white rounded-xl shadow-lg border-b-4 border-indigo-500 transition-shadow"
            >
              <motion.div 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -top-5 left-6 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-lg"
              >
                🌍
              </motion.div>
              <h3 className="mt-6 text-lg font-semibold text-slate-900">Data Integration</h3>
              <p className="mt-3 text-slate-600">
                Comprehensive data from internal sources and external factors like weather and market trends.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Login Section */}
      <div id="login" className="py-16 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50">
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
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-6">
                <span className="block">Already a Daisy AI Partner?</span>
                <span className="block text-blue-700">Login to Your Dashboard</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Access your personalised dairy analytics platform to view forecasts, optimise production, and make data-driven decisions.
              </p>
              <motion.button
                onClick={goToAccuracyDemo}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-colors"
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
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                          required
                        />
                      </div>
                      
                  <div>
                    <motion.button
                          type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
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
      <div className="bg-gradient-to-r from-blue-800 via-indigo-800 to-blue-800 text-white">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"
        >
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span className="block">Ready to transform your dairy cooperative?</span>
            <span className="block text-indigo-300">Start with Daisy AI today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow-lg">
              <motion.a
                href="mailto:contact@joindaisy.co"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50 transition-colors shadow-lg"
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
    </div>
  );
} 