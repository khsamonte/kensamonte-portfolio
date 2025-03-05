// Konami Code sequence: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

let konamiIndex = 0;

/**
 * Setup konami code listener
 * @param {Function} callback - Function to call when Konami code is entered
 * @returns {Function} - Cleanup function to remove event listener
 */
export const setupKonamiCode = (callback) => {
  // Key handler
  const konamiHandler = (event) => {
    // Check if the key matches the next expected key in the sequence
    if (event.code === KONAMI_CODE[konamiIndex]) {
      konamiIndex++;

      // If the entire sequence is entered, trigger callback
      if (konamiIndex === KONAMI_CODE.length) {
        konamiIndex = 0; // Reset index
        callback();
      }
    } else {
      // Reset if there's a wrong key
      konamiIndex = 0;
    }
  };

  // Add event listener
  window.addEventListener("keydown", konamiHandler);

  // Return cleanup function
  return () => {
    window.removeEventListener("keydown", konamiHandler);
  };
};
