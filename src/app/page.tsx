import Navbar from "./components/Navbar";
import MilkYieldChart from "./components/MilkYieldChart";
import YearlyYieldChart from "./components/YearlyYieldChart";
import Chatbot from "./components/Chatbot";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f0f7ff]">
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Dairy Co-op <span className="text-blue-500">Yield Prediction Dashboard</span>
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Monitor your dairy production metrics and get accurate predictions for future milk yield
              to help optimize your operations and planning.
            </p>
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-6 mb-8">
            {/* Weekly Milk Yield Comparison */}
            <section id="analytics" className="h-full">
              <MilkYieldChart />
            </section>
            
            {/* Yearly Milk Yield vs Prediction */}
            <section id="yearly-prediction" className="h-full">
              <YearlyYieldChart />
            </section>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-bold text-blue-500">32,400</p>
              <p className="text-gray-600 text-sm">Current Weekly Yield (L)</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-bold text-blue-500">+5.2%</p>
              <p className="text-gray-600 text-sm">Weekly Growth Rate</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-bold text-blue-500">1.86M</p>
              <p className="text-gray-600 text-sm">Projected Annual Yield (L)</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-bold text-blue-500">95.8%</p>
              <p className="text-gray-600 text-sm">Prediction Accuracy</p>
            </div>
          </div>
          
          {/* Chatbot and Features Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Chatbot */}
            <section id="chatbot" className="h-full">
              <Chatbot />
            </section>
            
            {/* Features Section */}
            <section className="bg-white rounded-lg shadow-sm p-6 h-full border border-gray-100">
              <h2 className="text-xl font-medium text-gray-800 mb-6">
                Dairy Management Insights
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">
                      Production Trends
                    </h3>
                    <p className="text-gray-600">
                      Milk production is trending 5.2% higher than last week, with projected increases continuing through September.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">
                      Seasonal Forecast
                    </h3>
                    <p className="text-gray-600">
                      Based on historical patterns, expect a 4-6% decrease in production during the winter months (November-December).
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mr-4 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-1">
                      Feed Efficiency
                    </h3>
                    <p className="text-gray-600">
                      Current feed efficiency ratio is 1.5 liters per kg, which is within the optimal range for your herd size and composition.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © 2025 DairyTech. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-blue-500 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-500 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-500 text-sm">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
