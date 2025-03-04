import Header from "./components/Header";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills3D from "./components/Skills3D";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Projects />
        <Skills3D />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}

export default App;
