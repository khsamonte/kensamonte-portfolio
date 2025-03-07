import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  createDustParticles,
  createFocalLight,
  playPageTurnSound,
  playRecordScratchSound,
} from "../../utils/shelfUtils";

const Shelf = ({
  albums,
  stories,
  onSelectAlbum,
  onSelectStory,
  selectedItem,
}) => {
  // Helper to check if item is selected
  const isSelected = (item) => {
    if (!selectedItem) return false;
    return selectedItem.id === item.id && selectedItem.type === item.type;
  };

  // Refs for dust particles and focal light
  const shelfContainerRef = useRef(null);

  // Initialize dust particles and focal light effects
  useEffect(() => {
    // Only run these effects if we're in a browser environment
    if (typeof window === "undefined") return;

    let dustCleanup, lightCleanup;

    if (shelfContainerRef.current) {
      // Create dust particles
      dustCleanup = createDustParticles(shelfContainerRef.current, 20);

      // Create focal light effect that follows mouse
      lightCleanup = createFocalLight(shelfContainerRef.current);
    }

    // Cleanup effects when component unmounts
    return () => {
      if (dustCleanup) dustCleanup();
      if (lightCleanup) lightCleanup();
    };
  }, []);

  // Handle album selection with sound effect
  const handleAlbumSelect = (album) => {
    playRecordScratchSound().then(() => {
      onSelectAlbum(album);
    });
  };

  // Handle story selection with page turning sound
  const handleStorySelect = (story) => {
    playPageTurnSound().then(() => {
      onSelectStory(story);
    });
  };

  // Helper function to get woody colors based on book id
  const getWoodyColor = (id) => {
    const woodyColors = [
      "#8B4513", // SaddleBrown
      "#A52A2A", // Brown
      "#5D4037", // Deep brown
      "#795548", // Medium brown
      "#6D4C41", // Warm brown
      "#4E342E", // Dark brown
      "#3E2723", // Very dark brown
      "#8D6E63", // Grayish brown
      "#A1887F", // Light brown
      "#D7CCC8", // Pale brown
      "#9C640C", // Golden brown
      "#873600", // Deep amber
      "#7E5109", // Rustic brown
      "#784212", // Chocolate
      "#6E2C00", // Dark mahogany
      "#641E16", // Burgundy
      "#922B21", // Dark crimson
      "#C0392B", // Auburn red
      "#A04000", // Brick red
      "#BA4A00", // Terracotta
    ];
    // Use the ID to select a color, ensuring the same book always gets the same color
    const colorIndex = id.toString().charCodeAt(0) % woodyColors.length;
    return woodyColors[colorIndex];
  };

  return (
    <div className="relative" ref={shelfContainerRef}>
      {/* Background wooden shelf */}
      <div className="w-full h-full absolute inset-0 rounded-lg overflow-hidden z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/shelf-background.jpg')",
            filter: "brightness(0.7)",
          }}
        ></div>
        {/* Wooden shelf overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#321c0c]/40 to-[#321c0c]/60"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Music Albums Shelf */}
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 flex items-center justify-center mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-amber-200 w-6 h-6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </div>
            <h4 className="text-lg font-serif text-amber-200 drop-shadow-md">
              Albums
            </h4>
          </div>

          {/* Shelving */}
          <div className="relative">
            {/* Shelf top edge */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#3e2712] rounded-t-md shadow-inner"></div>

            {/* Albums row */}
            <div
              className="flex overflow-x-auto py-6 px-2 gap-6 bg-[#5d3b1d]/70 rounded-md shelf-scrollbar"
              style={{ boxShadow: "inset 0 5px 15px rgba(0,0,0,0.3)" }}
            >
              {albums.map((album) => (
                <motion.div
                  key={album.id}
                  className={`flex-shrink-0 cursor-pointer perspective-800 ${
                    isSelected({ ...album, type: "album" }) ? "z-10" : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{
                    rotateY: 15,
                    y: -10,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ y: 0 }}
                  onClick={() => handleAlbumSelect(album)}
                >
                  {/* Vinyl record case */}
                  <div
                    className={`w-32 h-32 rounded-sm shadow-lg transform transition-all duration-300 relative ${
                      isSelected({ ...album, type: "album" })
                        ? "border-2 border-amber-300 shadow-amber-300/40"
                        : "border border-amber-900/50"
                    }`}
                    style={{
                      transformStyle: "preserve-3d",
                      transform: isSelected({ ...album, type: "album" })
                        ? "translateY(-5px) scale(1.05) rotateY(5deg)"
                        : "translateY(0) scale(1) rotateY(0)",
                    }}
                  >
                    {/* Album Cover */}
                    <img
                      src={album.cover}
                      alt={album.title}
                      className="w-full h-full object-cover rounded-sm"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x300?text=Album+Cover";
                      }}
                    />

                    {/* Record spine edge */}
                    <div
                      className="absolute top-0 right-0 bottom-0 w-1 bg-[#1a1a1a]"
                      style={{
                        transform:
                          "translateZ(-2px) rotateY(-20deg) translateX(2px)",
                        transformOrigin: "right center",
                      }}
                    ></div>
                  </div>

                  {/* Title below album */}
                  <div className="mt-2 text-center w-32">
                    <h5 className="text-sm font-medium text-amber-100 line-clamp-2 h-10 overflow-hidden">
                      {album.title}
                    </h5>
                    <p className="text-xs text-amber-200/70">{album.year}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Shelf bottom edge */}
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#3e2712] rounded-b-md transform translate-y-2"></div>

            {/* Shelf support */}
            <div
              className="absolute left-1/4 bottom-0 w-4 h-8 bg-[#3e2712] rounded-b-sm"
              style={{ transform: "translateY(100%)" }}
            ></div>
            <div
              className="absolute right-1/4 bottom-0 w-4 h-8 bg-[#3e2712] rounded-b-sm"
              style={{ transform: "translateY(100%)" }}
            ></div>
          </div>
        </div>

        {/* Books Shelf */}
        <div className="mb-4">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 flex items-center justify-center mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-amber-200 w-6 h-6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <h4 className="text-lg font-serif text-amber-200 drop-shadow-md">
              Stories
            </h4>
          </div>

          {/* Shelving */}
          <div className="relative">
            {/* Shelf top edge */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#3e2712] rounded-t-md shadow-inner"></div>

            {/* Books row */}
            <div
              className="flex overflow-x-auto py-2 pb-0 px-2 gap-1 bg-[#5d3b1d]/70 rounded-md shelf-scrollbar"
              style={{ boxShadow: "inset 0 5px 15px rgba(0,0,0,0.3)" }}
            >
              {stories.map((story) => (
                <motion.div
                  key={story.id}
                  className={`flex-shrink-0 cursor-pointer ${
                    isSelected({ ...story, type: "story" }) ? "z-10" : ""
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{
                    x: 10,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ x: 0 }}
                  onClick={() => handleStorySelect(story)}
                >
                  {/* Book spine */}
                  <div
                    className="book-spine w-12 h-40 relative rounded-sm shadow-lg"
                    style={{
                      backgroundColor: getWoodyColor(story.id), // We'll create this function
                      backgroundImage: "url('/images/book-cover.jpg')",
                      backgroundBlendMode: "multiply",
                      backgroundSize: "cover",
                      boxShadow: isSelected({ ...story, type: "story" })
                        ? `0 0 15px rgba(139, 69, 19, 0.5), 0 0 5px rgba(139, 69, 19, 0.8)`
                        : "none",
                      transform: isSelected({ ...story, type: "story" })
                        ? "translateX(5px)"
                        : "translateX(0)",
                    }}
                  >
                    {/* Book title (vertical) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="transform -rotate-90">
                        <h5
                          className="text-sm font-serif font-medium text-amber-100 px-2"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: "1",
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            width: `${
                              story.title.length > 20 ? "140px" : "120px"
                            }`,
                          }}
                        >
                          {story.title}
                        </h5>
                      </div>
                    </div>

                    {/* Book edges */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/10"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10"></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Shelf bottom edge */}
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#3e2712] rounded-b-md transform translate-y-2"></div>

            {/* Shelf support */}
            <div
              className="absolute left-1/4 bottom-0 w-4 h-8 bg-[#3e2712] rounded-b-sm"
              style={{ transform: "translateY(100%)" }}
            ></div>
            <div
              className="absolute right-1/4 bottom-0 w-4 h-8 bg-[#3e2712] rounded-b-sm"
              style={{ transform: "translateY(100%)" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shelf;
