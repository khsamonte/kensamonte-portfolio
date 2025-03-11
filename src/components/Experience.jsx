import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Timeline Experience component
const Experience = () => {
  const [activeExperience, setActiveExperience] = useState(null);

  // Timeline data with education first
  const timelineItems = [
    // Work experiences
    {
      id: "csp",
      company: "CSP Creative Inc.",
      position: "Front-end Developer",
      period: "Jun 2019 – Mar 2025",
      location: "Makati City, Philippines",
      color: "#3b82f6", // blue-500
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
      ),
      achievements: [
        "Created a large design system for 100+ components, elements, animations, and widgets, ensuring consistent UI/UX across multiple products.",
        "Developed a plug-and-play cryptocurrency price simulation chart widget using React, Highcharts, and WebSocket for real-time data visualization.",
        "Designed and implemented the front-end and API schema for a sports content center, delivering live head-to-head stats, match timelines, and momentum graphs that visualized key events.",
        "Programmed the front-end of a fully animated sports match tracker, creating the animations in After Effects and utilizing them via LottieFiles.",
        "Optimized front-end code performance for several codebases, reducing Safari CPU usage by ~40%.",
        "Wrote a jersey generator tool to produce 1000+ dynamic jersey SVGs for hundreds of sports teams, automating the painstaking process.",
        "Wrote a Figma plugin automating multi-language full-page translations, enhancing team productivity.",
        "Developed several front-end iterations of the company website.",
      ],
    },
    {
      id: "ch",
      company: "CH Solutions",
      position: "Web Developer",
      period: "Jan 2017 – May 2019",
      location: "Lucena City, Philippines",
      color: "#8b5cf6", // violet-500
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
      achievements: [
        "Developed multiple websites for the Government of Singapore.",
        "Built an admin system automating healthcare plan forms, reducing manual input time by 70%.",
        "Integrated Sass and Git for version control and improved collaboration.",
        "Authored comprehensive technical documentation for streamlined future development.",
        "Created wireframes and prototypes using Axure.",
      ],
    },
    {
      id: "bmg",
      company: "Balar Media Group",
      position: "Web Developer",
      period: "Aug 2014 – Aug 2018",
      location: "Home-based",
      color: "#ec4899", // pink-500
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
        </svg>
      ),
      achievements: [
        "Developed and maintained WordPress-based websites.",
        "Built responsive front-end interfaces from PSD designs.",
        "Engineered a jQuery- and PHP-powered parking reservation system.",
        "Optimized page speed and resolved SEO issues.",
        "Wrote content for the company's website.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-blue-900/30 p-3 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-blue-300">
            Professional Experience
          </h2>
        </div>
        <p className="text-slate-400 max-w-3xl mb-6">
          Over 10 years of front-end development experience across various
          industries, with a focus on interactive data visualization and user
          experience.
        </p>
      </motion.div>

      {/* Enhanced Horizontal Timeline */}
      <div className="relative pb-16">
        {/* Timeline background with gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-slate-700 shadow-xl"></div>

        {/* Timeline horizontal line with gradient */}
        <div className="absolute top-1/2 left-4 right-4 h-2 bg-gradient-to-r from-blue-500/20 via-purple-500/40 to-pink-500/20 rounded-full transform -translate-y-1/2"></div>

        {/* Animated glow effect */}
        <div className="absolute top-1/2 left-0 w-full h-4 bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 rounded-full transform -translate-y-1/2 animate-pulse"></div>

        {/* Connection lines between markers */}
        <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-slate-600 transform -translate-y-1/2 z-0"></div>

        {/* Timeline markers with enhanced styles */}
        <div className="flex justify-between relative px-6 pt-4">
          {timelineItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex flex-col items-center relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {/* Enhanced marker with glow effect */}
              <motion.div
                className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer z-10 ${
                  item.isEducation ? "animate-pulse" : ""
                }`}
                style={{
                  backgroundColor:
                    activeExperience === item.id
                      ? item.color
                      : `${item.color}20`,
                  color: activeExperience === item.id ? "white" : item.color,
                  border:
                    activeExperience === item.id
                      ? "3px solid white"
                      : "2px solid" + item.color,
                  boxShadow:
                    activeExperience === item.id
                      ? `0 0 15px ${item.color}`
                      : "none",
                }}
                onClick={() =>
                  setActiveExperience(
                    activeExperience === item.id ? null : item.id
                  )
                }
                whileHover={{
                  scale: 1.15,
                  boxShadow: `0 0 20px ${item.color}`,
                  y: -5,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {/* Pulsing background for active item */}
                {activeExperience === item.id && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    // animate={{
                    //   boxShadow: [
                    //     `0 0 5px ${item.color}`,
                    //     `0 0 20px ${item.color}`,
                    //     `0 0 5px ${item.color}`,
                    //   ],
                    // }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                <div className="text-2xl">{item.icon}</div>
              </motion.div>

              {/* Connection line to text */}
              <div className="h-4 w-[2px] bg-slate-600 my-1"></div>

              {/* Company name with sliding underline effect */}
              <div className="text-center mt-1 max-w-[180px]">
                <motion.p
                  className="text-sm font-bold text-white relative inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.company}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-current"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                    style={{ color: item.color }}
                  />
                </motion.p>
                <p className="text-xs text-slate-400 mt-1">{item.period}</p>
              </div>

              {activeExperience === item.id && (
                <motion.div
                  className="absolute -bottom-12 bg-slate-800 px-3 py-1 text-center rounded-full border border-slate-700 text-xs"
                  style={{ borderColor: item.color }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {item.position}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Timeline direction indicators */}
        {/* <svg
          className="absolute left-2 top-1/2 h-6 w-6 text-slate-500 transform -translate-y-1/2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <svg
          className="absolute right-2 top-1/2 h-6 w-6 text-slate-500 transform -translate-y-1/2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg> */}
      </div>

      {/* Enhanced Experience Details */}
      <AnimatePresence mode="wait">
        {activeExperience ? (
          <motion.div
            key={activeExperience}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700 mt-4 shadow-xl overflow-hidden"
          >
            {timelineItems.map((item) => {
              if (item.id === activeExperience) {
                // Create dynamic background gradient based on the item's color
                const bgGradient = `radial-gradient(circle at top right, ${item.color}10, transparent 80%)`;

                return (
                  <div key={item.id}>
                    {/* Decorative background elements */}
                    <div
                      className="absolute top-0 right-0 w-full h-full opacity-30 mix-blend-overlay"
                      style={{ background: bgGradient }}
                    ></div>
                    <div
                      className="absolute top-0 right-0 w-64 h-64 rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${item.color}20 0%, transparent 70%)`,
                        filter: "blur(40px)",
                        transform: "translate(20%, -20%)",
                      }}
                    ></div>

                    {/* Header with enhanced styling */}
                    <div className="relative flex flex-col md:flex-row md:items-center mb-8 pb-6 border-b border-slate-700">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mr-6 mb-4 md:mb-0"
                        style={{
                          backgroundColor: `${item.color}20`,
                          border: `2px solid ${item.color}`,
                          boxShadow: `0 0 15px ${item.color}40`,
                        }}
                      >
                        <motion.span
                          className="text-2xl"
                          style={{ color: item.color }}
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {item.icon}
                        </motion.span>
                      </div>

                      <div>
                        <div className="flex items-center">
                          <h3 className="text-2xl font-bold text-white mr-3">
                            {item.company}
                          </h3>
                          <div
                            className="px-3 py-1 rounded-full text-xs font-bold"
                            style={{
                              backgroundColor: `${item.color}30`,
                              color: item.color,
                            }}
                          >
                            {item.isEducation ? "Education" : "Experience"}
                          </div>
                        </div>

                        <p
                          className="text-lg font-medium"
                          style={{ color: item.color }}
                        >
                          {item.position}
                        </p>

                        <div className="flex flex-wrap items-center text-sm text-slate-400 mt-1">
                          <span className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {item.location}
                          </span>
                          <span className="mx-2">•</span>
                          <span className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {item.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Achievement cards with enhanced styling */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                      {item.achievements.map((achievement, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          className="bg-slate-800/70 backdrop-blur-sm p-5 rounded-lg border border-slate-700 hover:border-slate-600 relative overflow-hidden group"
                          whileHover={{
                            y: -5,
                            boxShadow: `0 10px 25px -5px ${item.color}20`,
                            borderColor: item.color,
                            transition: { duration: 0.2 },
                          }}
                        >
                          {/* Achievement number indicator with gradient */}
                          <div
                            className="absolute -right-3 -top-3 w-12 h-12 rounded-full flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity"
                            style={{
                              background: `radial-gradient(circle, ${item.color} 0%, transparent 70%)`,
                            }}
                          >
                            <span
                              className="text-3xl font-bold"
                              style={{ color: item.color }}
                            >
                              {idx + 1}
                            </span>
                          </div>

                          {/* Achievement content */}
                          <div className="flex items-start">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                              style={{
                                backgroundColor: `${item.color}20`,
                                boxShadow: `0 0 10px ${item.color}30`,
                              }}
                            >
                              <span
                                className="text-lg font-bold"
                                style={{ color: item.color }}
                              >
                                {idx + 1}
                              </span>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                              {achievement}
                            </p>
                          </div>

                          {/* Bottom decoration line */}
                          <motion.div
                            className="absolute bottom-0 left-0 h-[3px] rounded-full"
                            style={{ backgroundColor: item.color }}
                            initial={{ width: "0%" }}
                            whileInView={{ width: "50%" }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.8,
                              delay: 0.2 + idx * 0.1,
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-slate-400 p-10 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-4 text-blue-400/70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7l4-4m0 0l4 4m-4-4v18"
                />
              </svg>
              <p className="text-lg">Select a position above to view details</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Experience;
