import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// SVG Icons for navigation
const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// Animation canvas for experience background
const ExperienceCanvas = ({ companyIndex }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Company-specific patterns
    const patterns = [
      // PHixel Creative - Data visualization theme
      () => {
        // Graph-like pattern with animated dots
        const dotCount = 50;
        const dots = Array(dotCount)
          .fill()
          .map(() => ({
            x: Math.random() * rect.width,
            y: Math.random() * rect.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 0.3 - 0.15,
            speedY: Math.random() * 0.3 - 0.15,
            opacity: Math.random() * 0.4 + 0.1,
          }));

        const linesCount = 15;
        const lines = Array(linesCount)
          .fill()
          .map(() => ({
            startX: Math.random() * rect.width,
            startY: Math.random() * rect.height,
            length: Math.random() * 100 + 50,
            angle: Math.random() * Math.PI * 2,
            opacity: Math.random() * 0.15 + 0.05,
          }));

        let animationFrame;

        const animate = () => {
          ctx.clearRect(0, 0, rect.width, rect.height);

          // Draw lines
          lines.forEach((line) => {
            ctx.beginPath();
            ctx.moveTo(line.startX, line.startY);
            const endX = line.startX + Math.cos(line.angle) * line.length;
            const endY = line.startY + Math.sin(line.angle) * line.length;
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = `rgba(59, 130, 246, ${line.opacity})`;
            ctx.stroke();
          });

          // Draw and update dots
          dots.forEach((dot) => {
            dot.x += dot.speedX;
            dot.y += dot.speedY;

            // Wrap around edges
            if (dot.x < 0) dot.x = rect.width;
            if (dot.x > rect.width) dot.x = 0;
            if (dot.y < 0) dot.y = rect.height;
            if (dot.y > rect.height) dot.y = 0;

            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${dot.opacity})`;
            ctx.fill();
          });

          animationFrame = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrame);
      },

      // CH Solutions - Web development theme
      () => {
        // Grid pattern with code-like elements
        const gridSize = 20;
        const elements = [];

        // Create grid of elements
        for (let x = 0; x < rect.width; x += gridSize) {
          for (let y = 0; y < rect.height; y += gridSize) {
            if (Math.random() > 0.85) {
              elements.push({
                x,
                y,
                type: Math.random() > 0.5 ? "square" : "circle",
                size: Math.random() * 4 + 2,
                opacity: Math.random() * 0.3 + 0.05,
              });
            }
          }
        }

        // Add some "code lines"
        const codeLines = 15;
        for (let i = 0; i < codeLines; i++) {
          const y = Math.random() * rect.height;
          const width = Math.random() * 100 + 20;
          elements.push({
            x: Math.random() * rect.width,
            y,
            type: "line",
            width,
            opacity: Math.random() * 0.2 + 0.05,
          });
        }

        let animationFrame;
        let tick = 0;

        const animate = () => {
          ctx.clearRect(0, 0, rect.width, rect.height);
          tick++;

          elements.forEach((el) => {
            const pulsingOpacity =
              el.opacity * (0.7 + Math.sin(tick * 0.05) * 0.3);

            if (el.type === "square") {
              ctx.fillStyle = `rgba(59, 130, 246, ${pulsingOpacity})`;
              ctx.fillRect(el.x, el.y, el.size, el.size);
            } else if (el.type === "circle") {
              ctx.beginPath();
              ctx.arc(el.x, el.y, el.size, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(59, 130, 246, ${pulsingOpacity})`;
              ctx.fill();
            } else if (el.type === "line") {
              ctx.beginPath();
              ctx.moveTo(el.x, el.y);
              ctx.lineTo(el.x + el.width, el.y);
              ctx.strokeStyle = `rgba(59, 130, 246, ${pulsingOpacity})`;
              ctx.stroke();
            }
          });

          animationFrame = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrame);
      },

      // Balar Media Group - Content/media theme
      () => {
        // Media and content creation themed pattern
        const shapeCount = 20;
        const shapes = Array(shapeCount)
          .fill()
          .map(() => ({
            x: Math.random() * rect.width,
            y: Math.random() * rect.height,
            size: Math.random() * 50 + 20,
            type: ["rectangle", "circle"][Math.floor(Math.random() * 2)],
            rotation: Math.random() * Math.PI,
            rotationSpeed: (Math.random() - 0.5) * 0.01,
            opacity: Math.random() * 0.15 + 0.05,
          }));

        let animationFrame;

        const animate = () => {
          ctx.clearRect(0, 0, rect.width, rect.height);

          shapes.forEach((shape) => {
            ctx.save();
            ctx.translate(shape.x, shape.y);
            ctx.rotate(shape.rotation);

            if (shape.type === "rectangle") {
              ctx.fillStyle = `rgba(59, 130, 246, ${shape.opacity})`;
              ctx.fillRect(
                -shape.size / 2,
                -shape.size / 2,
                shape.size,
                shape.size * 0.6
              );
            } else {
              ctx.beginPath();
              ctx.ellipse(
                0,
                0,
                shape.size / 2,
                shape.size / 3,
                0,
                0,
                Math.PI * 2
              );
              ctx.fillStyle = `rgba(59, 130, 246, ${shape.opacity})`;
              ctx.fill();
            }

            ctx.restore();

            // Update rotation
            shape.rotation += shape.rotationSpeed;
          });

          animationFrame = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrame);
      },
    ];

    // Start the animation for the current company
    const cleanup = patterns[companyIndex % patterns.length]();

    // Cleanup function
    return cleanup;
  }, [companyIndex]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10 opacity-30"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

// Improved Experience Item component
const ExperienceItem = ({
  company,
  position,
  period,
  location,
  achievements,
  isActive = false,
}) => {
  return (
    <motion.div
      className="relative bg-slate-800/80 backdrop-blur-sm rounded-lg p-6 border border-slate-700 h-full"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
        <h3 className="text-xl font-bold text-white">{company}</h3>
        <p className="text-slate-400 text-sm whitespace-nowrap">
          {period} • {location}
        </p>
      </div>

      <div className="inline-block bg-blue-900/50 px-3 py-1 rounded-full mb-4">
        <p className="text-blue-300">{position}</p>
      </div>

      <ul className="space-y-2">
        {achievements.map((achievement, index) => (
          <li key={index} className="text-slate-300 flex items-start">
            <span className="text-blue-400 mr-2">•</span>
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

// Education component with distinctive styling
const Education = () => {
  return (
    <motion.div
      className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-lg border border-blue-900/50 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full -ml-12 -mb-12 blur-xl"></div>

      <div className="relative p-6">
        <div className="flex items-center mb-6">
          <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-blue-300">Education</h3>
        </div>

        <div className="space-y-8">
          <div className="relative">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
              <div>
                <h4 className="font-semibold text-white text-lg">
                  Sacred Heart College
                </h4>
                <p className="text-blue-400 mt-1">BS in Computer Science</p>
              </div>
              <span className="bg-blue-900/30 text-blue-200 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                2010 – 2014
              </span>
            </div>
            <ul className="mt-3 text-slate-300 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Best in Student Research (Gold)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>Dean's Lister</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-700/50">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
              <div>
                <h4 className="font-semibold text-white text-lg">
                  Japanese Language Research Center
                </h4>
                <p className="text-blue-400 mt-1">Japanese N4 and N5</p>
              </div>
              <span className="bg-blue-900/30 text-blue-200 px-3 py-1 rounded-full text-sm whitespace-nowrap">
                2023 – 2024
              </span>
            </div>
            <p className="text-slate-300 mt-3">
              Completed a total of 220 hours
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Experience component with slider functionality
const Experience = () => {
  const experiences = [
    {
      company: "PHixel Creative",
      position: "Frontend Developer",
      period: "June 2019 - February 2025",
      location: "Makati City, Philippines",
      achievements: [
        "Developed a plug-and-play cryptocurrency price simulation chart widget using React, Highcharts, and WebSocket for real-time data visualization.",
        "Designed and implemented the front-end and API schema for a sports content center, delivering live head-to-head stats and match timelines.",
        "Programmed the front-end of a fully animated sports match tracker with weather effects and dynamic stadium animations.",
        "Built an interactive real-time match momentum graph widget, visually depicting key match events.",
        "Created a large design system for 100+ components, ensuring consistent UI/UX across multiple products.",
        "Optimized front-end code performance, reducing Safari CPU usage by ~40%.",
        "Developed the front end of the company website.",
        "Wrote a jersey generator tool to produce 1000+ dynamic jersey icons for various sports teams.",
        "Created 2D animations in After Effects and deployed them in web projects using LottieFiles.",
        "Wrote a Figma plugin automating multi-language full-page translations, enhancing team productivity.",
        "Prototyped a 2D football game simulation using C# and Unity3D.",
      ],
      isActive: true,
    },
    {
      company: "CH Solutions",
      position: "Web Developer",
      period: "January 2017 – May 2019",
      location: "Lucena City, Philippines",
      achievements: [
        "Developed multiple websites for the Government of Singapore.",
        "Built an admin system automating healthcare plan forms, reducing manual input time by 70%.",
        "Integrated Sass and Git for version control and improved collaboration.",
        "Authored comprehensive technical documentation for streamlined future development.",
        "Created wireframes and prototypes using Axure.",
      ],
    },
    {
      company: "Balar Media Group",
      position: "Web Developer",
      period: "August 2014 – August 2018",
      location: "Home-based",
      achievements: [
        "Developed and maintained WordPress-based websites.",
        "Built responsive front-end interfaces from PSD designs.",
        "Engineered a jQuery- and PHP-powered parking reservation system.",
        "Optimized page speed and resolved SEO issues.",
        "Wrote content for the company's website.",
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const goToPrevious = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? experiences.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === experiences.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="experience" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-3xl font-bold mb-4 text-blue-300">
          Professional Experience
        </h2>
        <p className="text-slate-400 max-w-3xl">
          Over 10 years of frontend development experience across various
          industries, with a focus on interactive data visualization and user
          experience.
        </p>
      </motion.div>

      {/* Experience Slider */}
      {/* <div className="mb-12"> */}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
            <h3 className="text-xl font-bold text-white">Work History</h3>
            {/* Company tabs for easy navigation */}
            <div className="flex flex-wrap gap-2">
              {experiences.map((exp, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors cursor-pointer text-sm ${
                    index === activeIndex
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                  }`}
                >
                  {exp.company}
                </button>
              ))}
            </div>
          </div>

          {/* Experience card with slider */}
          <div className="relative overflow-hidden rounded-lg bg-slate-900/50 p-1 border border-slate-700">
            {/* Background canvas animation */}
            <ExperienceCanvas companyIndex={activeIndex} />

            {/* Experience content */}
            <div className="relative h-full">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <ExperienceItem
                  key={activeIndex}
                  {...experiences[activeIndex]}
                />
              </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            {/* <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-800/80 cursor-pointer hover:bg-blue-900/80 p-2 rounded-full text-blue-300 transition-colors z-10 shadow-lg"
            aria-label="Previous experience"
          >
            <ArrowLeftIcon />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-800/80 cursor-pointer hover:bg-blue-900/80 p-2 rounded-full text-blue-300 transition-colors z-10 shadow-lg"
            aria-label="Next experience"
          >
            <ArrowRightIcon />
          </button> */}

            {/* Indicator dots for mobile */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 md:hidden">
              {experiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full ${
                    index === activeIndex ? "bg-blue-500" : "bg-slate-600"
                  }`}
                  aria-label={`Go to experience ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Separate Education Component */}
        <div className="lg:col-span-2 h-full">
          <Education />
        </div>
      </div>

      {/* </div> */}

      {/* Separate Education Component */}
      {/* <Education /> */}
    </section>
  );
};

export default Experience;
