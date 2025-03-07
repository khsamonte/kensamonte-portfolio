import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import EasterEggs from "./components/EasterEggs/EasterEggs";
import EasterEggCollection from "./components/EasterEggs/EasterEggCollection";
import ThemedSpinner from "./components/ThemedSpinner";
import AnalyticsProvider from "./components/Analytics/AnalyticsProvider";

import "./styles/creativeWorks.css";
import "./styles/markdownStyles.css";

// Lazy load components
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const Skills = lazy(() => import("./components/Skills"));
const Contact = lazy(() => import("./components/Contact"));
const CreativeWorks = lazy(() =>
  import("./components/CreativeWorks/CreativeWorks")
);

function App() {
  return (
    <Router>
      <AnalyticsProvider>
        <div className="min-h-screen bg-slate-900 text-white">
          <EasterEggs />
          <EasterEggCollection />
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Suspense fallback={<ThemedSpinner />}>
              <Projects />
            </Suspense>
            <Suspense fallback={<ThemedSpinner />}>
              <Skills />
            </Suspense>
            <Suspense fallback={<ThemedSpinner />}>
              <Experience />
            </Suspense>
            <Suspense fallback={<ThemedSpinner />}>
              <CreativeWorks />
            </Suspense>
            <Suspense fallback={<ThemedSpinner />}>
              <Contact />
            </Suspense>
          </main>
        </div>
      </AnalyticsProvider>
    </Router>
  );
}

export default App;
