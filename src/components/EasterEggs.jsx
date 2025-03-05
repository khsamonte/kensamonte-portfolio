import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Terminal from "./Terminal";
import { setupKonamiCode } from "../utils/easterEggs/konamiCode";
import {
  createSurpriseAnimation,
  triggerConfetti,
} from "../utils/easterEggs/surpriseAnimation";
import { checkBirthday } from "../utils/easterEggs/birthdayCheck";
import { discoverEasterEgg, EGGS } from "../utils/easterEggs/easterEggManager";

const EasterEggs = () => {
  // State to track if konami code was entered
  const [konamiActivated, setKonamiActivated] = useState(false);

  // Terminal state
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Setup the konami code listener
  useEffect(() => {
    // Callback function to execute when Konami code is entered
    const activateKonami = () => {
      setKonamiActivated(true);

      // Trigger confetti animation
      triggerConfetti(200);

      // Mark as discovered in our manager
      setTimeout(() => {
        discoverEasterEgg(EGGS.KONAMI_CODE.id);
      }, 0);

      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setKonamiActivated(false);
      }, 5000);
    };

    // Setup listener and get cleanup function
    const cleanup = setupKonamiCode(activateKonami);

    // Clean up event listener on component unmount
    return cleanup;
  }, []);

  // Click counter easter egg state
  const [clickCount, setClickCount] = useState(0);
  const [secretMessageVisible, setSecretMessageVisible] = useState(false);

  // Handle logo click easter egg
  useEffect(() => {
    const handleLogoClick = () => {
      setClickCount((prev) => prev + 1);
    };

    // Listen for custom logo click event
    window.addEventListener("logo-clicked", handleLogoClick);

    return () => {
      window.removeEventListener("logo-clicked", handleLogoClick);
    };
  }, []);

  // Handle logo click easter egg
  useEffect(() => {
    if (clickCount >= 5) {
      setSecretMessageVisible(true);

      setTimeout(() => {
        discoverEasterEgg(EGGS.LOGO_CLICKS.id);
      }, 0);

      // Hide message after 3 seconds
      const timer = setTimeout(() => {
        setSecretMessageVisible(false);
        setClickCount(0);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  // Terminal backtick key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for backtick key (`) to toggle terminal
      if (e.key === "`" || e.key === "~") {
        setTerminalOpen((prev) => {
          // If opening the terminal, record the discovery
          if (!prev) {
            setTimeout(() => {
              discoverEasterEgg(EGGS.TERMINAL.id);
            }, 0);
          }
          return !prev;
        });

        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Birthday easter egg - check on component mount
  useEffect(() => {
    // Set your birthday here (month, day)
    checkBirthday("Ken", 12, 14);
  }, []);

  // Secret terminal commands
  useEffect(() => {
    const handleSurpriseCommand = () => {
      createSurpriseAnimation(
        4000,
        ["🎉", "🚀", "💯", "🔥", "⭐", "💫", "✨", "💥"],
        50
      );

      setTimeout(() => {
        discoverEasterEgg(EGGS.SURPRISE.id);
      }, 0);
    };

    const handleMatrixCommand = () => {
      setTimeout(() => {
        discoverEasterEgg(EGGS.MATRIX.id);
      }, 0);

      // Matrix animation - create letter rain
      const symbols =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-=*/[]{}|&!?@#%^&()~`.,:;<>";
      const colors = ["#3b82f6", "#10b981", "#8b5cf6"]; // blue, green, purple

      // Matrix columns
      const columns = 40;
      const fontSize = Math.floor(window.innerWidth / columns);

      const createMatrixRain = () => {
        // Container for the matrix
        const container = document.createElement("div");
        container.style.position = "fixed";
        container.style.top = "0";
        container.style.left = "0";
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.backgroundColor = "rgba(0, 0, 0, 0.95)";
        container.style.backdropFilter = "blur(4px)";
        container.style.overflow = "hidden";
        container.style.zIndex = "100";
        container.style.fontFamily = "monospace";
        container.style.fontSize = `${fontSize}px`;
        container.id = "matrix-container";

        document.body.appendChild(container);

        // Create columns
        const raindrops = [];

        for (let i = 0; i < columns; i++) {
          const column = document.createElement("div");
          column.style.position = "absolute";
          column.style.top = "0";
          column.style.left = `${i * fontSize}px`;
          column.style.width = `${fontSize}px`;
          column.style.textAlign = "center";
          column.style.userSelect = "none";

          // Random starting position
          const startDelay = Math.random() * 5000;
          column.style.animationDelay = `${startDelay}ms`;

          // Random color
          const color = colors[Math.floor(Math.random() * colors.length)];
          column.style.color = color;

          container.appendChild(column);

          // Random initial position
          const initialY = -Math.floor(Math.random() * 20);
          const speed = Math.random() * 100 + 50;

          raindrops.push({
            element: column,
            chars: [],
            y: initialY,
            speed,
            length: Math.floor(Math.random() * 15) + 5,
            updateInterval: Math.floor(Math.random() * 5) + 1,
          });
        }

        // Animation
        let lastTime = 0;
        let animationId;

        const animate = (time) => {
          const deltaTime = time - lastTime;
          lastTime = time;

          // Update each raindrop
          raindrops.forEach((drop) => {
            // Move down
            drop.y += drop.speed * (deltaTime / 1000);

            // Reset if off screen
            if (drop.y > window.innerHeight / fontSize + drop.length) {
              drop.y = -drop.length;
              drop.speed = Math.random() * 100 + 50;
              drop.length = Math.floor(Math.random() * 15) + 5;
            }

            // Update characters
            drop.element.innerHTML = "";
            for (let i = 0; i < drop.length; i++) {
              if (
                drop.y + i >= 0 &&
                drop.y + i < window.innerHeight / fontSize
              ) {
                // Generate a random character
                const char = symbols.charAt(
                  Math.floor(Math.random() * symbols.length)
                );

                // Create span for the character
                const span = document.createElement("span");
                span.textContent = char;

                // First character is brighter
                if (i === 0) {
                  span.style.color = "white";
                  span.style.textShadow = `0 0 5px ${drop.element.style.color}`;
                } else {
                  // Gradient of opacity
                  const opacity = 1 - i / drop.length;
                  span.style.opacity = opacity;
                }

                // Position
                span.style.position = "absolute";
                span.style.top = `${(drop.y + i) * fontSize}px`;
                span.style.left = "0";
                span.style.width = "100%";

                drop.element.appendChild(span);
              }
            }
          });

          // Continue animation
          animationId = requestAnimationFrame(animate);
        };

        // Start animation
        animationId = requestAnimationFrame(animate);

        // Auto-remove after 10 seconds
        setTimeout(() => {
          cancelAnimationFrame(animationId);
          document.body.removeChild(container);
        }, 5000);
      };

      createMatrixRain();
    };

    // Listen for custom events from terminal
    window.addEventListener("surprise-activated", handleSurpriseCommand);
    window.addEventListener("matrix-activated", handleMatrixCommand);

    return () => {
      window.removeEventListener("surprise-activated", handleSurpriseCommand);
      window.removeEventListener("matrix-activated", handleMatrixCommand);
    };
  }, []);

  return (
    <>
      {/* Konami Code Animation */}
      <AnimatePresence>
        {konamiActivated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xs" />
            <motion.div
              className="relative z-10 text-center"
              animate={{
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 1, repeat: 2 }}
            >
              <h2 className="text-5xl font-bold text-blue-300 mb-4">
                Developer Mode Unlocked!
              </h2>
              <p className="text-white text-2xl">
                You found the Konami Code Easter Egg!
              </p>
              <div className="mt-6 text-blue-400">
                <p>↑ ↑ ↓ ↓ ← → ← → B A</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret Logo Click Message */}
      <AnimatePresence>
        {secretMessageVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-blue-900/90 text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            <p>You found a secret! Great clicking skills! 👏</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Easter Egg */}
      <Terminal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />

      {/* Hint for Terminal (shows briefly on page load) */}
      {/* <AnimatePresence>
        {!terminalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 3, duration: 2 }}
            className="fixed bottom-4 right-4 bg-slate-800/80 text-slate-400 text-xs px-3 py-1 rounded-full z-10"
          >
            Press ` to open terminal
          </motion.div>
        )}
      </AnimatePresence> */}
    </>
  );
};

export default EasterEggs;
