// Function to draw a visualization for parking reservation system
export const drawParkingVisualization = (
  ctx,
  width,
  height,
  accentColor,
  secondaryColor
) => {
  // Animation timing based on timestamp
  const timestamp = Date.now() / 1000;

  // Clear canvas with dark background
  ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
  ctx.fillRect(0, 0, width, height);

  // Draw grid of parking spaces
  const rows = 3;
  const cols = 5;
  const padding = width * 0.1;
  const spaceWidth = (width - padding * 2) / cols;
  const spaceHeight = (height - padding * 2) / rows;
  const spaceMargin = Math.min(spaceWidth, spaceHeight) * 0.1;

  // Draw the grid and parking spaces
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = padding + col * spaceWidth;
      const y = padding + row * spaceHeight;
      const w = spaceWidth - spaceMargin * 2;
      const h = spaceHeight - spaceMargin * 2;

      // Calculate if space is occupied based on various factors for visualization
      const spaceId = row * cols + col;
      const randomFactor = Math.sin(spaceId + timestamp) * 0.5 + 0.5; // Value between 0-1 that changes over time
      const isOccupied = randomFactor > 0.55; // Some spaces occupied, some free
      const isReserved = !isOccupied && randomFactor > 0.3; // Some empty spaces are reserved
      const isHighlighted =
        spaceId === Math.floor(timestamp * 0.5) % (rows * cols); // Highlighting animation

      // Space background
      if (isOccupied) {
        // Occupied space
        ctx.fillStyle = `${secondaryColor}BF`; // Mostly opaque
      } else if (isReserved) {
        // Reserved but not yet occupied
        ctx.fillStyle = `${accentColor}8F`; // Semi-transparent
      } else {
        // Available space
        ctx.fillStyle = "rgba(100, 116, 139, 0.3)"; // Light gray with transparency
      }

      // Draw the parking space
      ctx.beginPath();
      ctx.roundRect(x + spaceMargin, y + spaceMargin, w, h, 5);
      ctx.fill();

      // Highlight effect for the currently selected space
      if (isHighlighted) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 3;
        ctx.stroke();

        // Pulsing glow effect
        const pulseSize = (Math.sin(timestamp * 3) * 0.2 + 0.8) * 15;
        const gradient = ctx.createRadialGradient(
          x + spaceWidth / 2,
          y + spaceHeight / 2,
          0,
          x + spaceWidth / 2,
          y + spaceHeight / 2,
          pulseSize
        );
        gradient.addColorStop(0, `${accentColor}90`);
        gradient.addColorStop(1, `${accentColor}00`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(
          x + spaceMargin - pulseSize / 2,
          y + spaceMargin - pulseSize / 2,
          w + pulseSize,
          h + pulseSize,
          10
        );
        ctx.fill();
      }

      // Draw car in occupied spaces
      if (isOccupied) {
        const carWidth = w * 0.7;
        const carHeight = h * 0.6;
        const carX = x + spaceMargin + (w - carWidth) / 2;
        const carY = y + spaceMargin + (h - carHeight) / 2;

        // Car body
        ctx.fillStyle = `hsl(${(spaceId * 40) % 360}, 70%, 60%)`; // Different colored cars
        ctx.beginPath();
        ctx.roundRect(carX, carY, carWidth, carHeight, 8);
        ctx.fill();

        // Car windows
        ctx.fillStyle = "rgba(30, 41, 59, 0.7)";
        const windowWidth = carWidth * 0.6;
        const windowHeight = carHeight * 0.4;
        const windowX = carX + (carWidth - windowWidth) / 2;
        const windowY = carY + carHeight * 0.15;

        ctx.beginPath();
        ctx.roundRect(windowX, windowY, windowWidth, windowHeight, 4);
        ctx.fill();

        // Car wheels
        ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
        const wheelRadius = carHeight * 0.12;
        const wheelPositions = [
          { x: carX + carWidth * 0.2, y: carY + carHeight },
          { x: carX + carWidth * 0.8, y: carY + carHeight },
        ];

        wheelPositions.forEach((pos) => {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y - wheelRadius / 2, wheelRadius, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    }
  }

  // Entrance and exit indicators
  const entranceWidth = width * 0.15;
  const entranceHeight = height * 0.04;

  // Entrance
  ctx.fillStyle = `${accentColor}`;
  ctx.beginPath();
  ctx.roundRect(width * 0.1, height * 0.92, entranceWidth, entranceHeight, 3);
  ctx.fill();

  // Exit
  ctx.fillStyle = `${secondaryColor}`;
  ctx.beginPath();
  ctx.roundRect(width * 0.75, height * 0.92, entranceWidth, entranceHeight, 3);
  ctx.fill();

  // Parking lot access road
  ctx.fillStyle = "rgba(51, 65, 85, 0.5)";
  ctx.beginPath();
  ctx.roundRect(width * 0.1, height * 0.85, width * 0.8, height * 0.05, 0);
  ctx.fill();

  // Animate a car entering or exiting
  const animateCar = () => {
    const cyclePosition = (timestamp % 10) / 10; // 10-second cycle
    let carX, carY, carWidth, carHeight;

    if (cyclePosition < 0.4) {
      // Car entering the lot
      const progress = cyclePosition / 0.4;
      carWidth = width * 0.08;
      carHeight = height * 0.04;
      carX = width * 0.1 + width * 0.4 * progress;
      carY = height * 0.85 + (height * 0.05 - carHeight) / 2;

      // Draw moving car
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.roundRect(carX, carY, carWidth, carHeight, 5);
      ctx.fill();

      // Car windows
      ctx.fillStyle = "rgba(15, 23, 42, 0.7)";
      ctx.beginPath();
      ctx.roundRect(
        carX + carWidth * 0.3,
        carY + carHeight * 0.2,
        carWidth * 0.5,
        carHeight * 0.4,
        2
      );
      ctx.fill();

      // Car wheels
      ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
      const wheelRadius = carHeight * 0.2;
      const wheelPositions = [
        { x: carX + carWidth * 0.2, y: carY + carHeight },
        { x: carX + carWidth * 0.8, y: carY + carHeight },
      ];

      wheelPositions.forEach((pos) => {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y - wheelRadius / 2, wheelRadius, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (cyclePosition > 0.6 && cyclePosition < 0.95) {
      // Car exiting the lot
      const progress = (cyclePosition - 0.6) / 0.35;
      carWidth = width * 0.08;
      carHeight = height * 0.04;
      carX = width * 0.5 + width * 0.4 * progress;
      carY = height * 0.85 + (height * 0.05 - carHeight) / 2;

      // Draw moving car
      ctx.fillStyle = secondaryColor;
      ctx.beginPath();
      ctx.roundRect(carX, carY, carWidth, carHeight, 5);
      ctx.fill();

      // Car windows
      ctx.fillStyle = "rgba(15, 23, 42, 0.7)";
      ctx.beginPath();
      ctx.roundRect(
        carX + carWidth * 0.3,
        carY + carHeight * 0.2,
        carWidth * 0.5,
        carHeight * 0.4,
        2
      );
      ctx.fill();

      // Car wheels
      ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
      const wheelRadius = carHeight * 0.2;
      const wheelPositions = [
        { x: carX + carWidth * 0.2, y: carY + carHeight },
        { x: carX + carWidth * 0.8, y: carY + carHeight },
      ];

      wheelPositions.forEach((pos) => {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y - wheelRadius / 2, wheelRadius, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  };

  animateCar();

  // Draw reservation selection effect
  const selectionProgress = (timestamp % 15) / 15; // 15-second cycle
  if (selectionProgress < 0.6) {
    const progress = selectionProgress / 0.6;

    // System scanning animation (simulating searching for spaces)
    if (progress < 0.7) {
      const scanPosition = progress / 0.7;
      const scanX = padding + scanPosition * (width - padding * 2);

      // Vertical scan line
      ctx.strokeStyle = `${accentColor}80`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(scanX, padding);
      ctx.lineTo(scanX, height - padding);
      ctx.stroke();

      // Scan glow effect
      const scanGradient = ctx.createLinearGradient(
        scanX - 20,
        0,
        scanX + 20,
        0
      );
      scanGradient.addColorStop(0, `${accentColor}00`);
      scanGradient.addColorStop(0.5, `${accentColor}40`);
      scanGradient.addColorStop(1, `${accentColor}00`);

      ctx.fillStyle = scanGradient;
      ctx.fillRect(scanX - 20, padding, 40, height - padding * 2);
    }

    // Space selection animation
    if (progress > 0.8) {
      const fadeIn = (progress - 0.8) / 0.2;

      // Find a free space to highlight (just for visualization)
      let row = 1;
      let col = 3;

      const x = padding + col * spaceWidth;
      const y = padding + row * spaceHeight;
      const w = spaceWidth - spaceMargin * 2;
      const h = spaceHeight - spaceMargin * 2;

      // Highlight selected space
      ctx.strokeStyle = `rgba(255, 255, 255, ${fadeIn * 0.8})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(x + spaceMargin, y + spaceMargin, w, h, 5);
      ctx.stroke();

      // Reservation confirmation effect
      const pulseSize = fadeIn * 20;
      const gradient = ctx.createRadialGradient(
        x + spaceWidth / 2,
        y + spaceHeight / 2,
        0,
        x + spaceWidth / 2,
        y + spaceHeight / 2,
        w / 2 + pulseSize
      );
      gradient.addColorStop(
        0,
        `${accentColor}${Math.floor(fadeIn * 144)
          .toString(16)
          .padStart(2, "0")}`
      );
      gradient.addColorStop(1, `${accentColor}00`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(
        x + spaceMargin - pulseSize,
        y + spaceMargin - pulseSize,
        w + pulseSize * 2,
        h + pulseSize * 2,
        10
      );
      ctx.fill();
    }
  }
};
