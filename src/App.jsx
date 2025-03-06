import React, { Suspense, lazy } from "react";
import Header from "./components/Header";
import EasterEggs from "./components/EasterEggs/EasterEggs";
import EasterEggCollection from "./components/EasterEggs/EasterEggCollection";
import Footer from "./components/Footer";
import "./styles/creativeWorks.css";

// Lazy load components
const Projects = lazy(() => import("./components/Projects"));
const Experience = lazy(() => import("./components/Experience"));
const Skills = lazy(() => import("./components/Skills"));
const Contact = lazy(() => import("./components/Contact"));
const CreativeWorks = lazy(() =>
  import("./components/CreativeWorks/CreativeWorks")
);

// Loading component
const LoadingFallback = () => (
  <div className="flex justify-center items-center py-16">
    <div className="animate-pulse text-blue-300">Loading...</div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <EasterEggs />
      <EasterEggCollection />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<LoadingFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <CreativeWorks />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <Contact />
        </Suspense>
        <Footer />
      </main>
    </div>
  );
}

export default App;
