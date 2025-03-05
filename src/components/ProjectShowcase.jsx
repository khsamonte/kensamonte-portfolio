import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { drawCryptoPriceVisualization } from "../utils/visualizations/CryptoPriceVisualization";
import { drawSoccerMatchVisualization } from "../utils/visualizations/SoccerMatchVisualization";
import { drawContentCenterVisualization } from "../utils/visualizations/ContentCenterVisualization";
import { drawParkingVisualization } from "../utils/visualizations/ParkingLotVisualization";
import { drawDesignSystemVisualization } from "../utils/visualizations/DesignSystemVisualization";
import { drawPortfolioVisualization } from "../utils/visualizations/PortfolioVisualization";
import { drawDefaultVisualization } from "../utils/visualizations/Visualizations";
import { hexToRgba } from "../utils/visualizations/HexToRGBA";

const ProjectShowcase = ({
  title,
  description,
  technologies = [],
  companyName,
  projectType, // 'crypto', 'frontend', 'matchtracker', 'design'
  accentColor = "#60a5fa", // default blue
  secondaryColor = "#1e40af", // default dark blue
}) => {
  const canvasRef = useRef(null);

  // Generate visualization based on project type
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    // Adjust canvas for retina displays
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw based on project type
    switch (projectType) {
      case "crypto":
        drawCryptoPriceVisualization(
          ctx,
          rect.width,
          rect.height,
          accentColor,
          secondaryColor
        );
        break;
      case "portfolio":
        drawPortfolioVisualization(
          ctx,
          rect.width,
          rect.height,
          accentColor,
          secondaryColor
        );
        break;
      case "content-center":
        drawContentCenterVisualization(
          ctx,
          rect.width,
          rect.height,
          accentColor,
          secondaryColor
        );
        break;
      case "matchtracker":
        drawSoccerMatchVisualization(
          ctx,
          rect.width,
          rect.height,
          accentColor,
          secondaryColor
        );
        break;
      case "design-system":
        drawDesignSystemVisualization(
          ctx,
          rect.width,
          rect.height,
          accentColor,
          secondaryColor
        );
        break;
      case "parking":
        drawParkingVisualization(
          ctx,
          rect.width,
          rect.height,
          accentColor,
          secondaryColor
        );
        break;
      default:
        drawDefaultVisualization(
          ctx,
          rect.width,
          rect.height,
          accentColor,
          secondaryColor
        );
    }
  }, [projectType, accentColor, secondaryColor]);

  // Animation frame for continuous rendering
  useEffect(() => {
    let animationId;

    if (
      projectType === "matchtracker" ||
      projectType === "crypto" ||
      projectType === "design-system" ||
      projectType === "parking" ||
      projectType === "content-center" ||
      projectType === "portfolio"
    ) {
      const animate = () => {
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const rect = canvas.getBoundingClientRect();
          const ctx = canvas.getContext("2d");

          if (projectType === "crypto") {
            drawCryptoPriceVisualization(
              ctx,
              rect.width,
              rect.height,
              accentColor,
              secondaryColor
            );
          } else if (projectType === "matchtracker") {
            drawSoccerMatchVisualization(
              ctx,
              rect.width,
              rect.height,
              accentColor,
              secondaryColor
            );
          } else if (projectType === "parking") {
            drawParkingVisualization(
              ctx,
              rect.width,
              rect.height,
              accentColor,
              secondaryColor
            );
          } else if (projectType === "design-system") {
            drawDesignSystemVisualization(
              ctx,
              rect.width,
              rect.height,
              accentColor,
              secondaryColor
            );
          } else if (projectType === "content-center") {
            drawContentCenterVisualization(
              ctx,
              rect.width,
              rect.height,
              accentColor,
              secondaryColor
            );
          } else if (projectType === "portfolio") {
            drawPortfolioVisualization(
              ctx,
              rect.width,
              rect.height,
              accentColor,
              secondaryColor
            );
          }

          animationId = requestAnimationFrame(animate);
        }
      };

      animate();
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [projectType, accentColor, secondaryColor]);

  return (
    <motion.div
      layout
      className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{
        y: -8,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.3)",
        borderColor: "#60a5fa",
      }}
    >
      {/* Abstract Visualization */}
      <div className="relative overflow-hidden bg-slate-900 aspect-video">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ width: "100%", height: "100%" }}
        />

        {/* Company Badge */}
        {companyName && (
          <div className="absolute top-3 left-3 bg-blue-900/80 text-blue-200 text-xs px-2 py-1 rounded">
            {companyName}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>

        <div className="text-slate-300">
          <p className="text-sm mb-4">{description}</p>

          <div>
            <h4 className="text-sm font-semibold text-blue-300 mb-2">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <motion.span
                  key={tech}
                  className="px-2 py-1 bg-slate-700 rounded text-xs text-slate-300"
                  whileHover={{
                    backgroundColor: hexToRgba(accentColor, 0.2),
                    color: accentColor,
                    scale: 1.05,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectShowcase;
