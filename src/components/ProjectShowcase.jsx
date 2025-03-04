import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

// Demo component showing different project visualization approaches
const ProjectShowcase = () => {
  const [currentView, setCurrentView] = useState("device-mockup");

  return (
    <div className="bg-slate-900 p-6 rounded-lg">
      <div className="flex gap-4 mb-6 justify-center flex-wrap">
        <button
          onClick={() => setCurrentView("device-mockup")}
          className={`px-3 py-1 rounded ${
            currentView === "device-mockup"
              ? "bg-blue-500 text-white"
              : "bg-slate-700 text-slate-300"
          }`}
        >
          Device Mockup
        </button>
        <button
          onClick={() => setCurrentView("feature-highlight")}
          className={`px-3 py-1 rounded ${
            currentView === "feature-highlight"
              ? "bg-blue-500 text-white"
              : "bg-slate-700 text-slate-300"
          }`}
        >
          Feature Highlight
        </button>
        <button
          onClick={() => setCurrentView("animated-interaction")}
          className={`px-3 py-1 rounded ${
            currentView === "animated-interaction"
              ? "bg-blue-500 text-white"
              : "bg-slate-700 text-slate-300"
          }`}
        >
          Animated Interaction
        </button>
        <button
          onClick={() => setCurrentView("code-showcase")}
          className={`px-3 py-1 rounded ${
            currentView === "code-showcase"
              ? "bg-blue-500 text-white"
              : "bg-slate-700 text-slate-300"
          }`}
        >
          Code + Visual
        </button>
      </div>

      <div className="bg-slate-800 rounded-lg overflow-hidden">
        {currentView === "device-mockup" && <DeviceMockupShowcase />}
        {currentView === "feature-highlight" && <FeatureHighlightShowcase />}
        {currentView === "animated-interaction" && (
          <AnimatedInteractionShowcase />
        )}
        {currentView === "code-showcase" && <CodeAndVisualShowcase />}
      </div>
    </div>
  );
};

// Option 1: Device Mockup - Put your app/site in a device frame
const DeviceMockupShowcase = () => {
  return (
    <div className="p-8 flex justify-center">
      <div className="relative w-full max-w-md">
        {/* Phone frame */}
        <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
          <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
          <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
          <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>

          {/* Screen content */}
          <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white">
            <img
              src="https://via.placeholder.com/272x572.png?text=Sports+Tracker+App"
              className="w-full h-full object-cover"
              alt="Project Preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Option 2: Feature Highlight - Focus on a specific feature with callouts
const FeatureHighlightShowcase = () => {
  return (
    <div className="relative p-8 w-full aspect-video bg-gray-900 flex items-center justify-center">
      <div className="relative w-4/5 h-4/5 border border-slate-700 rounded-md overflow-hidden">
        <img
          src="https://via.placeholder.com/800x450.png?text=Crypto+Widget+UI"
          className="w-full h-full object-cover"
          alt="Feature Preview"
        />

        {/* Feature callouts */}
        <motion.div
          className="absolute top-[20%] left-[65%] w-48 bg-blue-900/80 backdrop-blur-sm p-3 rounded-lg border border-blue-700"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-3 h-3 bg-blue-500 rounded-full absolute -left-1.5 top-1/2 transform -translate-y-1/2"></div>
          <h3 className="text-blue-300 text-sm font-bold">Real-time Updates</h3>
          <p className="text-white text-xs mt-1">
            WebSocket connection provides instant price changes without page
            refresh
          </p>
        </motion.div>

        <motion.div
          className="absolute top-[60%] left-[20%] w-48 bg-blue-900/80 backdrop-blur-sm p-3 rounded-lg border border-blue-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-3 h-3 bg-blue-500 rounded-full absolute -left-1.5 top-1/2 transform -translate-y-1/2"></div>
          <h3 className="text-blue-300 text-sm font-bold">
            Interactive Charts
          </h3>
          <p className="text-white text-xs mt-1">
            Users can zoom, pan and hover for detailed information at any
            timepoint
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Option 3: Animated Interaction - Show a key interaction loop
const AnimatedInteractionShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="relative p-6 w-full aspect-video bg-gray-900 flex items-center justify-center"
    >
      <div className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center">
        {/* This would normally be your GIF or looping video */}
        {isPlaying ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block p-3 rounded-full bg-blue-900/30 mb-4">
                <svg
                  className="animate-spin h-10 w-10 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <p className="text-blue-300 font-medium">Animation playing...</p>
              <p className="text-slate-400 text-sm mt-2">
                Match momentum visualization showing real-time updates
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={() => setIsPlaying(true)}
              className="px-4 py-2 bg-blue-600 rounded-full text-white flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              Play Animation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Option 4: Code + Visual - Show code alongside the output
const CodeAndVisualShowcase = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Code snippet */}
      <div className="p-4 bg-gray-950 text-left overflow-auto max-h-[400px]">
        <pre className="text-sm font-mono">
          <code className="text-blue-300">
            {`// Cryptocurrency widget setup
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CryptoWidget = ({ symbol = 'BTCUSDT' }) => {
  const [priceData, setPriceData] = useState([]);
  
  useEffect(() => {
    // Connect to WebSocket for real-time updates
    const ws = new WebSocket(
      \`wss://stream.binance.com:9443/ws/\${symbol.toLowerCase()}@kline_1m\`
    );
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Process and update price data...
    };
    
    return () => ws.close();
  }, [symbol]);
  
  return (
    <div className="crypto-widget">
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
    </div>
  );
};`}
          </code>
        </pre>
      </div>

      {/* Visual output */}
      <div className="flex items-center justify-center p-4 bg-gray-900">
        <div className="bg-slate-800 rounded-lg p-4 w-full">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                <span className="font-bold text-sm">₿</span>
              </div>
              <div className="ml-2">
                <h3 className="font-bold text-white">Bitcoin</h3>
                <span className="text-xs text-gray-400">BTC/USDT</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg text-white font-bold">$43,211.24</div>
              <div className="text-sm text-green-500">+5.87%</div>
            </div>
          </div>

          <div className="h-32 bg-slate-700 rounded overflow-hidden relative">
            {/* Simplified chart visualization */}
            <div className="absolute inset-0 flex items-end">
              <div className="h-[15%] w-[5%] bg-gray-600"></div>
              <div className="h-[35%] w-[5%] bg-gray-600"></div>
              <div className="h-[45%] w-[5%] bg-green-600"></div>
              <div className="h-[30%] w-[5%] bg-red-600"></div>
              <div className="h-[40%] w-[5%] bg-green-600"></div>
              <div className="h-[60%] w-[5%] bg-green-600"></div>
              <div className="h-[80%] w-[5%] bg-green-600"></div>
              <div className="h-[75%] w-[5%] bg-red-600"></div>
              <div className="h-[85%] w-[5%] bg-green-600"></div>
              <div className="h-[95%] w-[5%] bg-green-600"></div>
              <div className="h-[90%] w-[5%] bg-red-600"></div>
              <div className="h-[80%] w-[5%] bg-red-600"></div>
              <div className="h-[75%] w-[5%] bg-gray-600"></div>
              <div className="h-[85%] w-[5%] bg-green-600"></div>
              <div className="h-[90%] w-[5%] bg-green-600"></div>
              <div className="h-[95%] w-[5%] bg-green-600"></div>
              <div className="h-[98%] w-[5%] bg-green-600"></div>
              <div className="h-[94%] w-[5%] bg-red-600"></div>
              <div className="h-[90%] w-[5%] bg-gray-600"></div>
              <div className="h-[92%] w-[5%] bg-green-600"></div>
            </div>

            {/* Chart overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-700/70 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;
