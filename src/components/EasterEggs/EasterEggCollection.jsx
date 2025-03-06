import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getAllEasterEggs,
  getEasterEggStats,
  resetEasterEggs,
} from "../../utils/easterEggs/easterEggManager";

const EasterEggCollection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [easterEggs, setEasterEggs] = useState({});
  const [stats, setStats] = useState({ discovered: 0, total: 0 });
  const [newDiscovery, setNewDiscovery] = useState(false);

  // Load Easter eggs on mount and whenever they change
  useEffect(() => {
    let prevDiscovered = 0;

    const updateEggs = () => {
      setEasterEggs(getAllEasterEggs());

      const currentStats = getEasterEggStats();
      setStats(currentStats);

      // Check if a new egg was discovered
      if (currentStats.discovered > prevDiscovered) {
        setNewDiscovery(true);

        // Reset celebration after animation completes
        setTimeout(() => {
          setNewDiscovery(false);
        }, 3000);
      }

      prevDiscovered = currentStats.discovered;
    };

    // Initial load - delay it slightly to avoid React concurrent mode issues
    setTimeout(updateEggs, 0);

    // Listen for Easter egg discoveries
    const handleEggDiscovered = () => {
      // Debounce updates to prevent multiple rapid state updates
      setTimeout(updateEggs, 50);
    };

    window.addEventListener("easter-egg-discovered", handleEggDiscovered);
    window.addEventListener("easter-eggs-reset", handleEggDiscovered);

    return () => {
      window.removeEventListener("easter-egg-discovered", handleEggDiscovered);
      window.removeEventListener("easter-eggs-reset", handleEggDiscovered);
    };
  }, []);

  // Handle reset
  const handleReset = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all discovered Easter eggs? You'll need to find them again!"
    );

    if (confirmReset) {
      resetEasterEggs();
    }
  };

  return (
    <>
      {/* Button to toggle the collection */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-slate-800 text-blue-400 px-4 py-3 rounded-full text-sm z-[9999] border border-blue-500 cursor-pointer"
        title="Easter Egg Collection"
        style={{
          boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          boxShadow: [
            "0 0 5px rgba(59, 130, 246, 0.6)",
            "0 0 20px rgba(59, 130, 246, 1)",
            "0 0 5px rgba(59, 130, 246, 0.6)",
          ],
        }}
        transition={{
          y: { duration: 0.5 },
          opacity: { duration: 0.5 },
          boxShadow: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      >
        <div className="flex items-center space-x-2">
          <motion.span
            className="text-lg"
            animate={{
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🥚
          </motion.span>
          <span>
            {stats.discovered}/{stats.total} Found
          </span>
        </div>
      </motion.button>

      {/* Collection Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="relative bg-slate-800 rounded-lg shadow-lg max-w-2xl w-full overflow-hidden border border-blue-500/30 max-h-[80vh] flex flex-col"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">
                  Easter Egg Collection
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-300 hover:text-white cursor-pointer"
                >
                  ×
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-blue-400">
                      You've discovered {stats.discovered} of {stats.total}{" "}
                      Easter eggs.
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">
                      Hi! Let's play a little game. Explore the whole webpage to
                      find the Easter eggs. 😉
                    </p>
                  </div>

                  {stats.discovered > 0 && (
                    <button
                      onClick={handleReset}
                      className="text-xs text-red-400 hover:text-red-300 bg-red-900/20 hover:bg-red-900/30 px-2 py-1 rounded cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>

                {/* Easter Egg List */}
                <div className="space-y-4">
                  {Object.values(easterEggs).map((egg) => (
                    <div
                      key={egg.id}
                      className={`p-4 rounded-lg border ${
                        egg.discovered
                          ? "bg-blue-900/20 border-blue-500/30"
                          : "bg-slate-700/30 border-slate-600/30"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4
                            className={`font-medium ${
                              egg.discovered
                                ? "text-blue-300"
                                : "text-slate-400"
                            }`}
                          >
                            {egg.discovered ? egg.name : "???"}
                          </h4>
                          <p
                            className={`mt-1 ${
                              egg.discovered
                                ? "text-slate-300"
                                : "text-slate-500"
                            }`}
                          >
                            {egg.discovered
                              ? egg.description
                              : "This Easter egg has not been discovered yet."}
                          </p>
                        </div>
                        <div className="text-2xl">
                          {egg.discovered ? "🥚" : "🔒"}
                        </div>
                      </div>

                      {!egg.discovered && (
                        <div className="mt-3 border-t border-slate-600/30 pt-3">
                          <p className="text-slate-500 text-sm italic">
                            Hint: {egg.hint}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Complete collection message */}
              {stats.discovered === stats.total && stats.total > 0 && (
                <div className="bg-blue-900/30 p-4 border-t border-blue-500/30 mt-auto">
                  <p className="text-blue-300 text-center">
                    🎉 Congratulations! You've found all the Easter eggs! 🎉
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EasterEggCollection;
