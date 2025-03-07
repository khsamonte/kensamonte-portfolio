import React, { useEffect } from "react";
import { initializeGA, trackPageView } from "../../utils/analytics";

// Component to initialize analytics and provide event tracking
const AnalyticsProvider = ({ children }) => {
  useEffect(() => {
    // Initialize Google Analytics
    initializeGA();

    // Track the initial page view
    trackPageView(window.location.pathname);

    // Track page views when the URL changes without a full page reload
    // This is important for SPAs like your portfolio
    const handleRouteChange = () => {
      trackPageView(window.location.pathname);
    };

    // Listen for changes in browser history
    window.addEventListener("popstate", handleRouteChange);

    // Clean up event listener
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  return children;
};

export default AnalyticsProvider;
