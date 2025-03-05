import React, { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { Parallax } from "react-parallax";

const Header = () => {
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();

  // Handle scroll-based navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          currentSection = section.getAttribute("id");
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-sm z-50 border-b border-slate-800">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
          <motion.h1
            className="text-xl font-bold text-blue-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Ken Samonte
          </motion.h1>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className={`text-sm font-medium px-1 py-2 border-b-2 transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? "text-blue-400 border-blue-400"
                    : "text-slate-300 border-transparent hover:text-blue-300"
                }`}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="hidden">
            <button className="text-slate-300 hover:text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Gradient Scroll Progress Bar */}
        <div className="h-1 w-full bg-slate-800">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left"
            style={{
              scaleX: scrollYProgress,
              transition: "none",
            }}
          />
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <Parallax
        blur={0}
        bgImage="/images/bg2.jpg"
        bgImageAlt="Background"
        strength={300}
        bgImageStyle={{
          objectFit: "cover",
          objectPosition: "center 30%",
          width: "100%",
          height: "100%",
        }}
        className="parallax-container"
      >
        <section
          id="home"
          className="pt-24 pb-16 min-h-screen flex items-center relative"
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-slate-900/70"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <motion.div
                className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src="/images/ken2.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/400x400.png?text=Your+Photo";
                  }}
                />
              </motion.div>

              {/* Hero Content */}
              <div className="text-center md:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Ken Samonte
                  </h2>
                  <h3 className="text-xl md:text-2xl text-blue-400 mt-2">
                    Front-end Developer
                  </h3>
                </motion.div>

                <motion.p
                  className="text-slate-300 mt-4 max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Front-end developer with 10 years of experience building
                  websites and applications, including 5 years of experience in
                  a product development environment. Currently preparing for the
                  JLPT N3 in Japanese.
                </motion.p>

                <motion.div
                  className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.button
                    onClick={() => scrollToSection("projects")}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md cursor-pointer"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    View Projects
                  </motion.button>

                  <motion.button
                    onClick={() => scrollToSection("contact")}
                    className="px-6 py-3 bg-transparent border-2 border-blue-400 text-blue-400 rounded-lg font-medium hover:bg-blue-900/20 transition shadow-md cursor-pointer"
                    whileHover={{ scale: 1.05, borderColor: "#60a5fa" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    Contact Me
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </Parallax>
    </>
  );
};

export default Header;
