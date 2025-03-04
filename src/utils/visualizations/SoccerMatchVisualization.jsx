import { hexToRgba } from "./HexToRGBA";

// Soccer match animation from top view with ball movement and trail
// This function should replace or be added to the existing animation options in the switch statement
export const drawSoccerMatchVisualization = (
  ctx,
  width,
  height,
  accentColor,
  secondaryColor
) => {
  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Background (grass field)
  ctx.fillStyle = "#2d701b"; // Dark green for soccer field
  ctx.fillRect(0, 0, width, height);

  // Field markings
  ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
  ctx.lineWidth = 2;

  // Field outline
  ctx.strokeRect(width * 0.05, height * 0.05, width * 0.9, height * 0.9);

  // Center circle
  ctx.beginPath();
  ctx.arc(
    width * 0.5,
    height * 0.5,
    Math.min(width, height) * 0.15,
    0,
    Math.PI * 2
  );
  ctx.stroke();

  // Center line
  ctx.beginPath();
  ctx.moveTo(width * 0.5, height * 0.05);
  ctx.lineTo(width * 0.5, height * 0.95);
  ctx.stroke();

  // Center dot
  ctx.beginPath();
  ctx.arc(width * 0.5, height * 0.5, 4, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.fill();

  // Penalty areas
  // Left penalty area
  ctx.strokeRect(width * 0.05, height * 0.3, width * 0.15, height * 0.4);
  // Right penalty area
  ctx.strokeRect(width * 0.8, height * 0.3, width * 0.15, height * 0.4);

  // Goal areas
  // Left goal area
  ctx.strokeRect(width * 0.05, height * 0.4, width * 0.05, height * 0.2);
  // Right goal area
  ctx.strokeRect(width * 0.9, height * 0.4, width * 0.05, height * 0.2);

  // Goals
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  // Left goal
  ctx.fillRect(width * 0.02, height * 0.45, width * 0.03, height * 0.1);
  // Right goal
  ctx.fillRect(width * 0.95, height * 0.45, width * 0.03, height * 0.1);

  // Ball movement logic
  // We'll use time and sine/cosine functions for natural movement
  const time = Date.now() * 0.001;

  // Create a natural flowing path using parametric equations
  // Store last 20 positions for the trail
  const trailLength = 20;
  const trail = [];

  for (let i = 0; i < trailLength; i++) {
    // Use an earlier time for each previous position
    const trailTime = time - i * 0.05;

    // Create a complex movement pattern that looks like a soccer ball in play
    const x =
      width *
      (0.5 +
        0.35 * Math.sin(trailTime * 0.5) * Math.cos(trailTime * 0.3) +
        0.1 * Math.sin(trailTime * 1.5));

    const y =
      height *
      (0.5 +
        0.35 * Math.sin(trailTime * 0.7) * Math.sin(trailTime * 0.4) +
        0.1 * Math.cos(trailTime * 1.2));

    trail.push({ x, y });
  }

  // Draw the trail
  for (let i = trail.length - 1; i > 0; i--) {
    const alpha = i / trail.length; // Fade out older positions
    const size = 4 + (trail.length - i) * 0.5; // Size gets smaller for older positions

    ctx.beginPath();
    ctx.arc(trail[i].x, trail[i].y, size, 0, Math.PI * 2);
    ctx.fillStyle = hexToRgba(accentColor, alpha * 0.5);
    ctx.fill();
  }

  // Draw the soccer ball
  const currentPos = trail[0];

  // Ball shadow
  ctx.beginPath();
  ctx.arc(currentPos.x + 3, currentPos.y + 3, 8, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.fill();

  // Ball
  ctx.beginPath();
  ctx.arc(currentPos.x, currentPos.y, 8, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();

  // Soccer ball pattern (simplified)
  ctx.beginPath();
  ctx.arc(currentPos.x, currentPos.y, 8, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(0, 0, 0, 0.8)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Pentagon pattern on the ball
  const ballRotation = time * 2; // Ball rotation over time
  for (let i = 0; i < 5; i++) {
    const angle = ballRotation + (i * Math.PI * 2) / 5;
    const patternX = currentPos.x + Math.cos(angle) * 4;
    const patternY = currentPos.y + Math.sin(angle) * 4;

    ctx.beginPath();
    ctx.arc(patternX, patternY, 2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fill();
  }
};
