// This is the new visualization function to add to your utils/visualizations folder

export const drawPortfolioVisualization = (
  ctx,
  width,
  height,
  accentColor,
  secondaryColor
) => {
  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Background
  ctx.fillStyle = "rgba(30, 41, 59, 0.4)";
  ctx.fillRect(0, 0, width, height);

  // Current timestamp for animations
  const time = Date.now();

  // Browser window frame
  const windowHeight = height * 0.8;
  const windowY = height * 0.1;

  // Browser frame
  ctx.fillStyle = "rgba(51, 65, 85, 0.5)";
  ctx.fillRect(width * 0.1, windowY, width * 0.8, windowHeight);

  // Browser header
  ctx.fillStyle = "rgba(30, 41, 59, 0.8)";
  ctx.fillRect(width * 0.1, windowY, width * 0.8, height * 0.08);

  // Header buttons
  ctx.fillStyle = "#ef4444"; // Red
  ctx.beginPath();
  ctx.arc(
    width * 0.15,
    windowY + height * 0.04,
    height * 0.015,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.fillStyle = "#f59e0b"; // Yellow
  ctx.beginPath();
  ctx.arc(
    width * 0.18,
    windowY + height * 0.04,
    height * 0.015,
    0,
    Math.PI * 2
  );
  ctx.fill();

  ctx.fillStyle = "#10b981"; // Green
  ctx.beginPath();
  ctx.arc(
    width * 0.21,
    windowY + height * 0.04,
    height * 0.015,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // URL bar
  ctx.fillStyle = "rgba(15, 23, 42, 0.7)";
  ctx.fillRect(
    width * 0.25,
    windowY + height * 0.02,
    width * 0.5,
    height * 0.04
  );

  // Content area
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(
    width * 0.1,
    windowY + height * 0.08,
    width * 0.8,
    windowHeight - height * 0.08
  );

  // Calculate the pulse effect - ranges from 0.2 to 0.9
  const pulseBase = (Math.sin(time * 0.001) + 1) / 2; // 0 to 1
  const pulse = 0.2 + pulseBase * 0.7; // Scale to 0.2-0.9 range

  // Header - animated
  ctx.fillStyle = `rgba(${hexToRGBValues(accentColor)}, ${pulse})`;
  ctx.fillRect(
    width * 0.15,
    windowY + height * 0.12,
    width * 0.7,
    height * 0.08
  );

  // Navigation - animated
  for (let i = 0; i < 4; i++) {
    // Make each nav item pulse at slightly different rates
    const navPulse = 0.3 + ((Math.sin(time * 0.001 + i * 0.5) + 1) / 2) * 0.6;
    ctx.fillStyle = `rgba(${hexToRGBValues(secondaryColor)}, ${navPulse})`;
    ctx.fillRect(
      width * (0.15 + i * 0.12),
      windowY + height * 0.22,
      width * 0.1,
      height * 0.04
    );
  }

  // Content blocks with skeletal loading animation
  const blockCount = 4;
  const blocksPerRow = 2;

  for (let i = 0; i < blockCount; i++) {
    const row = Math.floor(i / blocksPerRow);
    const col = i % blocksPerRow;

    // Position of this content block
    const blockX = width * (0.15 + col * 0.36);
    const blockY = windowY + height * (0.3 + row * 0.25);
    const blockWidth = width * 0.3;
    const blockHeight = height * 0.2;

    // Draw the skeletal loading content within this block
    drawSkeletalBlock(
      ctx,
      blockX,
      blockY,
      blockWidth,
      blockHeight,
      time,
      accentColor,
      secondaryColor,
      i
    );
  }

  // Text lines with skeletal loading animation
  // for (let i = 0; i < 3; i++) {
  //   // Each text line pulses at a different rate
  //   const linePulse = 0.2 + ((Math.sin(time * 0.002 + i * 1.2) + 1) / 2) * 0.7;

  //   ctx.fillStyle = `rgba(255, 255, 255, ${linePulse})`;

  //   // Vary the width to create a more dynamic effect
  //   const lineWidth = width * (0.3 + Math.sin(time * 0.0005 + i) * 0.1 + 0.3);

  //   ctx.fillRect(
  //     width * 0.15,
  //     windowY + height * (0.75 + i * 0.04),
  //     lineWidth,
  //     height * 0.02
  //   );
  // }
};

// Helper function to draw a skeletal loading block
function drawSkeletalBlock(
  ctx,
  x,
  y,
  width,
  height,
  time,
  accentColor,
  secondaryColor,
  seed = 0
) {
  // Base block with pulsing opacity
  const blockPulse = 0.1 + ((Math.sin(time * 0.001 + seed) + 1) / 2) * 0.3;
  ctx.fillStyle = `rgba(${hexToRGBValues(accentColor)}, ${blockPulse})`;
  ctx.fillRect(x, y, width, height);

  // Image placeholder at the top
  const imgPulse = 0.2 + ((Math.sin(time * 0.0015 + seed * 0.7) + 1) / 2) * 0.5;
  ctx.fillStyle = `rgba(${hexToRGBValues(secondaryColor)}, ${imgPulse})`;
  ctx.fillRect(x + width * 0.1, y + height * 0.1, width * 0.8, height * 0.4);

  // Title line
  const titlePulse =
    0.3 + ((Math.sin(time * 0.002 + seed * 0.5) + 1) / 2) * 0.6;
  ctx.fillStyle = `rgba(255, 255, 255, ${titlePulse})`;
  ctx.fillRect(x + width * 0.1, y + height * 0.6, width * 0.6, height * 0.05);

  // Description lines
  for (let i = 0; i < 2; i++) {
    const descPulse =
      0.2 + ((Math.sin(time * 0.0018 + i * 0.3 + seed) + 1) / 2) * 0.4;
    ctx.fillStyle = `rgba(255, 255, 255, ${descPulse})`;
    // Vary the width of description lines
    const descWidth = width * (0.5 + i * 0.1);
    ctx.fillRect(
      x + width * 0.1,
      y + height * (0.7 + i * 0.08),
      descWidth,
      height * 0.03
    );
  }

  // Create a shimmer effect that moves across the block
  const shimmerPos = ((time * 0.1) % (width * 2)) - width;
  const gradient = ctx.createLinearGradient(
    x + shimmerPos,
    y,
    x + shimmerPos + width * 0.4,
    y + height
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 0)");
  gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.1)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, width, height);
}

// Helper function to convert hex color to RGB values string
function hexToRGBValues(hex) {
  // Remove # if present
  hex = hex.replace("#", "");

  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}
