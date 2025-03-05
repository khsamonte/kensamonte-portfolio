import React from "react";
import { motion } from "framer-motion";
import ProjectShowcase from "./ProjectShowcase";

const Projects = () => {
  const projects = [
    {
      title: "Cryptocurrency Price Widget",
      description:
        "A plug-and-play cryptocurrency price simulation chart widget using React, Highcharts, and WebSocket for real-time data visualization, supporting live Binance API integration.",
      technologies: ["React", "WebSocket", "Highcharts", "Binance API"],
      companyName: "CSP Creative Inc.",
      projectType: "crypto",
      accentColor: "#60a5fa", // blue-400
      secondaryColor: "#3b82f6", // blue-500
    },
    {
      title: "Football Match Tracker",
      description:
        "A fully animated football match tracker, simulating real-world minute-per-minute events with weather effects, day and night cycles, and dynamic stadium animations.",
      technologies: ["JavaScript", "LottieFiles", "CSS Animations"],
      companyName: "CSP Creative Inc.",
      projectType: "matchtracker",
      // accentColor: "#100e13", // violet-400
      // secondaryColor: "#8b5cf6", // violet-500
      accentColor: "#34d399", // emerald-400
      secondaryColor: "#10b981", // emerald-500
    },
    {
      title: "Sports Content Center",
      description:
        "A sports content center that delivers live head-to-head stats, match timelines, player lineups, team momentum shifts, scoreboards, and tournament standings via animated widgets.",
      technologies: ["React", "styled-components", "Recharts"],
      companyName: "CSP Creative Inc.",
      projectType: "content-center",
      // accentColor: "#34d399", // emerald-400
      // secondaryColor: "#10b981", // emerald-500
      // accentColor: "#60a5fa", // blue-400
      accentColor: "#FFEE58", // yellow-400
      secondaryColor: "#8b5cf6", // violet-500
    },
    {
      title: "Design System (100+ Components)",
      description:
        "A large design system that houses a library of 100+ components and widgets, ensuring consistent UI/UX across multiple products.",
      technologies: ["React", "styled-components", "Storybook", "Figma"],
      companyName: "CSP Creative Inc.",
      projectType: "design-system",
      accentColor: "#f472b6", // pink-400
      secondaryColor: "#ec4899", // pink-500
    },
    // {
    //   title: "Jersey Generator Tool",
    //   description:
    //     "Wrote a jersey generator tool to produce 1000+ dynamic jersey icons for various sports teams. Automated the creation process for consistent branding across platforms.",
    //   technologies: ["JavaScript", "SVG", "Canvas API"],
    //   companyName: "CSP Creative Inc.",
    //   projectType: "design",
    //   accentColor: "#38bdf8", // sky-400
    //   secondaryColor: "#0ea5e9", // sky-500
    // },
    {
      title: "Parking Reservation System",
      description:
        "A jQuery- and PHP-powered parking reservation system that adds an interactive visual component for reserving slots in the existing booking system.",
      technologies: ["jQuery", "PHP", "MySQL"],
      companyName: "Balar Media Group",
      projectType: "parking",
      accentColor: "#fb923c", // orange-400
      secondaryColor: "#f97316", // orange-500
    },
    {
      title: "Ken's Portfolio",
      description:
        "My portfolio showcase, embellished with lively animations and 3D visualizations, which makes it more of an interactive resume.",
      technologies: ["React", "framer-motion", "Three.js", "Canvas API"],
      companyName: "Personal",
      projectType: "portfolio",
      accentColor: "#38bdf8", // sky-400
      secondaryColor: "#0ea5e9", // sky-500
    },
  ];

  return (
    <section id="projects" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-blue-300">
          Featured Projects
        </h2>
        <p className="text-slate-400 max-w-3xl mb-12">
          A selection of my most recent and notable work, showcasing my
          capabilities in interactive web applications, data visualization, and
          user interface design. Each visualization represents the nature of the
          project.
        </p>

        {/* NDA Notice */}
        <p className="text-xs text-slate-400 italic mb-4">
          Due to the NDA nature of my work in my current company, I utilized
          abstract visualizations to represent the nature of my projects.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectShowcase key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
