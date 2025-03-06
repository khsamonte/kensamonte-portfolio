import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const StoryReader = ({ story }) => {
  const storyContainerRef = useRef(null);

  // Scroll to top when story changes
  useEffect(() => {
    if (storyContainerRef.current) {
      storyContainerRef.current.scrollTop = 0;
    }
  }, [story.id]);

  // Format story content with paragraphs
  const formattedContent = story.content
    .split("\n\n")
    .map((paragraph, index) => (
      <p key={index} className="mb-4">
        {paragraph}
      </p>
    ));

  return (
    <div className="bg-amber-900/30 backdrop-blur-sm rounded-lg p-6 border border-amber-800/50 h-full">
      <h3 className="text-xl font-serif text-amber-200 mb-4">Reading Now</h3>

      {/* Book display */}
      <div className="relative mb-6 overflow-hidden">
        {/* Book cover image */}
        <div
          className="absolute top-4 right-4 w-24 h-36 rounded-md overflow-hidden shadow-lg z-10"
          style={{
            maxWidth: "calc(100% - 2rem)",
            maxHeight: "calc(100% - 2rem)",
          }}
        >
          <img
            src={story.cover}
            alt={story.title}
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/300x450?text=Book+Cover";
            }}
          />
        </div>

        {/* Manuscript background */}
        <div
          className="w-full p-3 min-h-[100px] rounded-lg"
          style={{
            backgroundColor: "#f5f1e6",
            backgroundImage: "url('/images/parchment-texture.jpg')",
            backgroundSize: "cover",
            backgroundBlendMode: "multiply",
          }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-serif font-bold text-amber-900 mb-2">
                {story.title}
              </h2>
              <p className="text-amber-800/80 text-sm">
                Written in {story.year}
              </p>
            </div>
          </div>

          {/* Story synopsis */}
          <div className="mt-4 pr-28">
            <h3 className="text-sm font-serif font-medium text-amber-800">
              Synopsis
            </h3>
            <p className="text-amber-900/90 italic text-sm">{story.synopsis}</p>
          </div>
        </div>
      </div>

      {/* Story content with vintage manuscript styling */}
      <div className="relative">
        <div
          ref={storyContainerRef}
          className="max-h-[400px] overflow-y-auto pr-4 rounded-lg custom-scrollbar creative-works-scrollbar"
        >
          <motion.div
            className="p-5 rounded-lg relative paper-texture"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Decorative book element */}
            <div className="mb-4 border-b border-amber-900/20 pb-2">
              <div className="w-full text-center">
                <h2 className="text-xl font-serif font-bold text-amber-900">
                  {story.title}
                </h2>
              </div>
            </div>

            {/* Opening quote/excerpt */}
            <div className="mb-6 font-serif text-amber-900/90 text-center italic typewriter">
              "{story.excerpt}"
            </div>

            {/* Story content */}
            <div className="font-serif text-amber-900/80 leading-relaxed">
              {formattedContent}
            </div>

            {/* Author signature */}
            <div className="mt-8 text-right font-serif text-amber-800 italic">
              - Ken Samonte
            </div>
          </motion.div>
        </div>

        {/* Shadow gradient to indicate scrollable content */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-amber-900/30 to-transparent pointer-events-none rounded-b-lg"></div>
      </div>

      {/* Page flipping indicator */}
      <div className="mt-4 text-center text-amber-100/70 text-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mx-auto mb-1 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
          />
        </svg>
        Scroll to continue reading
      </div>
    </div>
  );
};

export default StoryReader;
