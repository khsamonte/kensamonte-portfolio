// Google Analytics utility for portfolio site
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Your Google Analytics Measurement ID
const GA_MEASUREMENT_ID = "G-S8ENWVBRNK"; // Replace with your actual GA4 Measurement ID

// Initialize Google Analytics
export const initializeGA = () => {
  if (typeof window !== "undefined") {
    // Load the GA script
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize the dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);

    // Make gtag available globally
    window.gtag = gtag;
  }
};

// Track page views
export const trackPageView = (path) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: path,
    });
    console.log(`Analytics: Tracked page view for ${path}`);
  }
};

// Track custom events
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
    console.log(`Analytics: Tracked event "${eventName}"`, eventParams);
  }
};

// React hook for automatic page view tracking
export const usePageTracking = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  // Initialize GA once
  useEffect(() => {
    if (!initialized) {
      initializeGA();
      setInitialized(true);
    }
  }, [initialized]);

  // Track page views when location changes
  useEffect(() => {
    if (initialized) {
      trackPageView(location.pathname + location.search);
    }
  }, [location, initialized]);
};

// Special event trackers for your portfolio
export const trackProjectClick = (projectName) => {
  trackEvent("project_click", { project_name: projectName });
};

export const trackSkillInteraction = (skillName) => {
  trackEvent("skill_interaction", { skill_name: skillName });
};

export const trackContactFormSubmission = () => {
  trackEvent("contact_form_submit");
};

export const trackCreativeWorkInteraction = (workType, workName) => {
  trackEvent("creative_work_interaction", {
    work_type: workType,
    work_name: workName,
  });
};

export const trackEasterEggDiscovery = (eggId) => {
  trackEvent("easter_egg_discovery", { egg_id: eggId });
};
