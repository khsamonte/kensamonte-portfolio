/**
 * Easter Egg Manager - keeps track of found Easter eggs
 * Uses localStorage to persist found Easter eggs between sessions
 */

// Configuration for all available Easter eggs
const EASTER_EGGS = {
  KONAMI_CODE: {
    id: "konami_code",
    name: "Konami Code",
    description: "You unlocked developer mode by entering the Konami Code!",
    hint: `A legendary cheat code from the 80s that starts with a double ascent, followed by a descent...`,
  },
  TERMINAL: {
    id: "terminal",
    name: "Terminal Access",
    description: "You found the hidden terminal!",
    hint: "Between 'Tab' and 'Esc' lies the gateway to a developer’s world.",
  },
  LOGO_CLICKS: {
    id: "logo_clicks",
    name: "Curious Clicker",
    description: "You found the secret by clicking the logo multiple times!",
    hint: "A familiar name at the top might reward those who touch it more than once or twice.",
  },
  MATRIX: {
    id: "matrix",
    name: "The Matrix",
    description: "You entered the Matrix!",
    hint: "This 2000s movie involves hackers in a digital world. Type its title to step into a virtual illusion.",
  },
  SURPRISE: {
    id: "surprise",
    name: "Surprise Party",
    description: "You triggered the surprise animation!",
    hint: "Birthdays have these, and so do parties. This word holds the key.",
  },
};

// Storage key for localStorage
const STORAGE_KEY = "ken_portfolio_easter_eggs";

/**
 * Get all Easter eggs with their discovered status
 * @returns {Object} Map of Easter eggs with discovered status
 */
export const getAllEasterEggs = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  const discoveredEggs = savedData ? JSON.parse(savedData) : {};

  // Create a map of all eggs with their discovered status
  const allEggs = {};

  Object.values(EASTER_EGGS).forEach((egg) => {
    allEggs[egg.id] = {
      ...egg,
      discovered: discoveredEggs[egg.id] === true,
    };
  });

  return allEggs;
};

/**
 * Mark an Easter egg as discovered
 * @param {string} eggId - ID of the Easter egg to mark as discovered
 * @returns {boolean} Success status
 */
export const discoverEasterEgg = (eggId) => {
  // Check if this is a valid Easter egg
  const eggExists = Object.values(EASTER_EGGS).some((egg) => egg.id === eggId);
  if (!eggExists) return false;

  // Load existing data
  const savedData = localStorage.getItem(STORAGE_KEY);
  const discoveredEggs = savedData ? JSON.parse(savedData) : {};

  // Mark as discovered
  discoveredEggs[eggId] = true;

  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(discoveredEggs));

  // Dispatch event for any listeners
  window.dispatchEvent(
    new CustomEvent("easter-egg-discovered", {
      detail: { eggId },
    })
  );

  return true;
};

/**
 * Get the number of discovered Easter eggs
 * @returns {Object} Count of discovered eggs and total eggs
 */
export const getEasterEggStats = () => {
  const eggs = getAllEasterEggs();
  const discovered = Object.values(eggs).filter((egg) => egg.discovered).length;
  const total = Object.values(EASTER_EGGS).length;

  return { discovered, total };
};

/**
 * Check if all Easter eggs have been discovered
 * @returns {boolean} Whether all eggs have been discovered
 */
export const allEasterEggsDiscovered = () => {
  const { discovered, total } = getEasterEggStats();
  return discovered === total;
};

/**
 * Reset all discovered Easter eggs
 */
export const resetEasterEggs = () => {
  localStorage.removeItem(STORAGE_KEY);

  // Dispatch event for any listeners
  window.dispatchEvent(new CustomEvent("easter-eggs-reset"));
};

/**
 * Get a specific Easter egg
 * @param {string} eggId - ID of the Easter egg to get
 * @returns {Object|null} The Easter egg object or null if not found
 */
export const getEasterEgg = (eggId) => {
  const allEggs = getAllEasterEggs();
  return allEggs[eggId] || null;
};

// Export constants for external use
export const EGGS = EASTER_EGGS;
