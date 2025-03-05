/**
 * Creates a surprise animation of floating icons/emojis
 * @param {number} duration - Duration in ms for each icon to float
 * @param {Array} symbols - Array of symbols/emojis to display
 * @param {number} count - Number of elements to create
 */
export const createSurpriseAnimation = (
  duration = 3000,
  symbols = ["✨", "🚀", "💻", "🎮", "🎨", "🎧", "📱", "⚡", "💡", "🔥"],
  count = 25
) => {
  // Container for our animation elements
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.overflow = "hidden";
  container.style.pointerEvents = "none"; // Don't interfere with clicks
  container.style.zIndex = "100";
  document.body.appendChild(container);

  // Create floating elements
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      // Create element
      const element = document.createElement("div");

      // Random symbol
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      element.innerHTML = symbol;

      // Random size
      const size = Math.random() * 30 + 20;
      element.style.fontSize = `${size}px`;

      // Random position
      const startX = Math.random() * window.innerWidth;
      const startY = window.innerHeight + size;
      element.style.position = "absolute";
      element.style.left = `${startX}px`;
      element.style.top = `${startY}px`;

      // Random rotation
      const rotation = Math.random() * 360;
      element.style.transform = `rotate(${rotation}deg)`;

      // Random color
      const hue = Math.floor(Math.random() * 360);
      element.style.color = `hsl(${hue}, 80%, 60%)`;

      // Add element to container
      container.appendChild(element);

      // Animate floating up
      const endY = -100;
      const startTime = Date.now();

      // How far to float horizontally
      const horizontalOffset = (Math.random() - 0.5) * 200;

      // Animation function
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;

        if (progress < 1) {
          // Move up
          const currentY = startY + (endY - startY) * progress;

          // Add some horizontal movement
          const currentX =
            startX + horizontalOffset * Math.sin(progress * Math.PI);

          // Set position
          element.style.top = `${currentY}px`;
          element.style.left = `${currentX}px`;

          // Continue animation
          requestAnimationFrame(animate);
        } else {
          // Remove element when animation is complete
          container.removeChild(element);

          // Remove container if it's empty
          if (container.childNodes.length === 0) {
            document.body.removeChild(container);
          }
        }
      };

      // Start animation
      requestAnimationFrame(animate);
    }, i * 100); // Stagger the start times
  }
};

/**
 * Creates confetti particles for celebration effect
 */
export const triggerConfetti = (count = 150) => {
  // Container for confetti
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.top = "0";
  container.style.left = "0";
  container.style.width = "100%";
  container.style.height = "100%";
  container.style.overflow = "hidden";
  container.style.pointerEvents = "none";
  container.style.zIndex = "100";
  document.body.appendChild(container);

  // Create confetti pieces
  for (let i = 0; i < count; i++) {
    // Create element
    const element = document.createElement("div");

    // Set shape (square or rectangle)
    const isRectangle = Math.random() > 0.5;
    const width = isRectangle ? Math.random() * 12 + 8 : Math.random() * 10 + 5;
    const height = isRectangle ? Math.random() * 6 + 4 : width;

    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
    element.style.position = "absolute";

    // Random position at the top
    const startX = Math.random() * window.innerWidth;
    const startY = -20;
    element.style.left = `${startX}px`;
    element.style.top = `${startY}px`;

    // Random color
    const colors = [
      "#3b82f6", // blue-500
      "#8b5cf6", // violet-500
      "#ec4899", // pink-500
      "#10b981", // emerald-500
      "#f97316", // orange-500
      "#facc15", // yellow-400
    ];

    const color = colors[Math.floor(Math.random() * colors.length)];
    element.style.backgroundColor = color;

    // Random rotation
    const rotation = Math.random() * 360;
    element.style.transform = `rotate(${rotation}deg)`;

    // Add element to container
    container.appendChild(element);

    // Animation properties
    const duration = Math.random() * 3000 + 2000; // 2-5 seconds
    const horizontalMovement = (Math.random() - 0.5) * 400; // Random horizontal drift
    const startTime = Date.now();
    const rotationSpeed = (Math.random() - 0.5) * 720; // Rotation speed in degrees

    // Animation function
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress < 1) {
        // Vertical movement - accelerate downward
        const verticalProgress = progress * progress;
        const currentY = startY + verticalProgress * (window.innerHeight + 100);

        // Horizontal movement - add some sine wave for swaying
        const horizontalProgress =
          horizontalMovement * Math.sin(progress * Math.PI * 2);
        const currentX = startX + horizontalProgress;

        // Rotation
        const currentRotation = rotation + rotationSpeed * progress;

        // Update position
        element.style.top = `${currentY}px`;
        element.style.left = `${currentX}px`;
        element.style.transform = `rotate(${currentRotation}deg)`;

        // Continue animation
        requestAnimationFrame(animate);
      } else {
        // Remove element when animation is complete
        container.removeChild(element);

        // Remove container if it's empty
        if (container.childNodes.length === 0) {
          document.body.removeChild(container);
        }
      }
    };

    // Start animation with a slight delay for each piece
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, Math.random() * 500);
  }
};
