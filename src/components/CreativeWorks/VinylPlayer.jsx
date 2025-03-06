import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const VinylPlayer = ({ album }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [currentLyric, setCurrentLyric] = useState(album.lyrics || "");

  // Clean up audio when component unmounts or album changes
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [album.id]);

  // Play/pause audio
  const togglePlayback = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.src = album.trackPreview;
      audioRef.current.play().catch((err) => {
        console.error("Audio playback error:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-amber-900/30 backdrop-blur-sm rounded-lg p-6 border border-amber-800/50 h-full">
      <h3 className="text-xl font-serif text-amber-200 mb-6">Now Playing</h3>

      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          {/* Turntable base */}
          <div className="w-64 h-64 rounded-lg bg-[#2c1a0d] shadow-lg relative overflow-hidden">
            {/* Decorative wood grain */}
            <div
              className="absolute inset-0 opacity-30 mix-blend-overlay"
              style={{
                backgroundImage: "url('/images/wood-grain.jpg')",
                backgroundSize: "cover",
              }}
            ></div>

            {/* Turntable platter */}
            <div className="absolute inset-4 rounded-full bg-[#1a1a1a] flex items-center justify-center">
              {/* Vinyl record */}
              <motion.div
                className="w-52 h-52 rounded-full bg-[#111111] relative"
                animate={{
                  rotate: isPlaying ? 360 : 0,
                }}
                transition={{
                  rotate: {
                    duration: 6,
                    ease: "linear",
                    repeat: Infinity,
                  },
                }}
              >
                {/* Record grooves */}
                <div className="absolute inset-4 rounded-full border-2 border-[#2a2a2a]"></div>
                <div className="absolute inset-10 rounded-full border-2 border-[#2a2a2a]"></div>
                <div className="absolute inset-16 rounded-full border-2 border-[#2a2a2a]"></div>
                <div className="absolute inset-22 rounded-full border-2 border-[#2a2a2a]"></div>

                {/* Groove shine effect */}
                <div className="vinyl-groove-shine"></div>

                {/* Dust and scratches overlay */}
                <div className="dust-overlay"></div>

                {/* Center label (album art) */}
                <div className="absolute inset-0 m-auto w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/300x300?text=Album+Cover";
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Tonearm base */}
            <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#3a3a3a]"></div>

            {/* Tonearm */}
            <motion.div
              className={`absolute top-8 right-8 origin-top-right ${
                isPlaying ? "needle-on" : "needle-off"
              }`}
            >
              <div className="h-32 w-1 bg-[#777777]"></div>
              <div className="absolute bottom-0 left-0 w-6 h-2 bg-[#555555] transform -translate-x-2"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Album info */}
      <div className="mb-6 text-center">
        <h3 className="text-lg font-serif text-amber-200">{album.title}</h3>
        <p className="text-amber-100/70 text-sm">{album.year}</p>
        <p className="text-amber-100/80 mt-3">{album.description}</p>
      </div>

      {/* Playback controls */}
      <div className="flex justify-center mb-6">
        <motion.button
          className="bg-amber-800 hover:bg-amber-700 text-amber-100 px-6 py-2 rounded-full flex items-center shadow-lg cursor-pointer"
          onClick={togglePlayback}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              Play
            </>
          )}
        </motion.button>
      </div>

      {/* Lyrics display */}
      {isPlaying && (
        <motion.div
          className="bg-amber-900/20 p-4 rounded-lg border border-amber-800/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            className="text-amber-100/90 text-center italic"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            "{currentLyric}"
          </motion.p>
        </motion.div>
      )}

      {/* Spotify link if available */}
      {album.spotifyLink && (
        <div className="mt-6 text-center">
          <a
            href={album.spotifyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-amber-200 hover:text-amber-100 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
            >
              <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"></path>
            </svg>
            Listen on Spotify
          </a>
        </div>
      )}

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
    </div>
  );
};

export default VinylPlayer;
