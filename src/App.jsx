import React, { Suspense, lazy } from "react";
import Header from "./components/Header";
import EasterEggs from "./components/EasterEggs/EasterEggs";
import EasterEggCollection from "./components/EasterEggs/EasterEggCollection";
import Footer from "./components/Footer";
import ThemedSpinner from "./components/ThemedSpinner";
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
        <Footer />
      </main>
    </div>
  );
}

export default App;
