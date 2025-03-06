/**
 * Utility functions for the creative shelf animations and effects
 */

/**
 * Creates a dust particle effect for the vinyl records
 * @param {HTMLElement} container - Container element for the dust particles
 * @param {number} particleCount - Number of dust particles to create
 * @returns {Function} - Cleanup function
 */
export const createDustParticles = (container, particleCount = 30) => {
  if (!container) return () => {};

  const particles = [];

  // Create dust particles
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "absolute bg-amber-100/20 rounded-full";

    // Random size
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    // Random opacity
    particle.style.opacity = (Math.random() * 0.5 + 0.1).toString();

    // Add to container
    container.appendChild(particle);

    // Store for animation
    particles.push({
      element: particle,
      x: parseFloat(particle.style.left),
      y: parseFloat(particle.style.top),
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
    });
  }

  // Animate particles
  let animationId;

  const animate = () => {
    particles.forEach((particle) => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Wrap around screen
      if (particle.x > 100) particle.x = 0;
      if (particle.x < 0) particle.x = 100;
      if (particle.y > 100) particle.y = 0;
      if (particle.y < 0) particle.y = 100;

      // Update element
      particle.element.style.left = `${particle.x}%`;
      particle.element.style.top = `${particle.y}%`;
    });

    animationId = requestAnimationFrame(animate);
  };

  // Start animation
  animate();

  // Return cleanup function
  return () => {
    cancelAnimationFrame(animationId);
    particles.forEach((particle) => {
      if (particle.element.parentNode) {
        particle.element.parentNode.removeChild(particle.element);
      }
    });
  };
};

/**
 * Simulates page turning sound effect
 * @returns {Promise} Promise that resolves when the sound has played
 */
export const playPageTurnSound = () => {
  return new Promise((resolve) => {
    try {
      const audio = new Audio("/audio/page-turn.mp3");
      audio.volume = 0.2;

      audio.onended = () => {
        resolve();
      };

      audio.play().catch((err) => {
        console.log("Audio autoplay prevented:", err);
        resolve();
      });
    } catch (error) {
      console.error("Error playing sound:", error);
      resolve();
    }
  });
};

/**
 * Simulates vinyl record scratch sound effect
 * @returns {Promise} Promise that resolves when the sound has played
 */
export const playRecordScratchSound = () => {
  return new Promise((resolve) => {
    try {
      const audio = new Audio("/audio/record-scratch.mp3");
      audio.volume = 0.1;

      audio.onended = () => {
        resolve();
      };

      audio.play().catch((err) => {
        console.log("Audio autoplay prevented:", err);
        resolve();
      });
    } catch (error) {
      console.error("Error playing sound:", error);
      resolve();
    }
  });
};

/**
 * Simulates ambient room sound
 * @param {number} volume - Volume level between 0 and 1
 * @returns {Object} - Audio control object with play, pause, and cleanup methods
 */
export const createAmbientSound = (volume = 0.05) => {
  let audio = null;

  try {
    audio = new Audio("/audio/room-ambience.mp3");
    audio.volume = volume;
    audio.loop = true;
  } catch (error) {
    console.error("Error creating ambient sound:", error);
  }

  return {
    play: () => {
      if (audio) {
        audio.play().catch((err) => {
          console.log("Ambient audio autoplay prevented:", err);
        });
      }
    },
    pause: () => {
      if (audio) {
        audio.pause();
      }
    },
    cleanup: () => {
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    },
  };
};

/**
 * Creates a focal point light effect following mouse movement
 * @param {HTMLElement} container - Container element for the light effect
 * @returns {Function} - Cleanup function
 */
export const createFocalLight = (container) => {
  if (!container) return () => {};

  // Create light element
  const light = document.createElement("div");
  light.className = "ambient-light";
  container.appendChild(light);

  // Track mouse movement
  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Position light
    light.style.left = `${x}px`;
    light.style.top = `${y}px`;
  };

  // Add event listener
  container.addEventListener("mousemove", handleMouseMove);

  // Return cleanup function
  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    if (light.parentNode) {
      light.parentNode.removeChild(light);
    }
  };
};
