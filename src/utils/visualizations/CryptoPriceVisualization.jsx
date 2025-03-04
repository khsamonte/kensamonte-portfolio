// Live cryptocurrency price visualization with animated data
export const drawCryptoPriceVisualization = (
  ctx,
  width,
  height,
  accentColor,
  secondaryColor
) => {
  // Background with grid
  ctx.fillStyle = "rgba(15, 23, 42, 0.8)"; // Dark blue background
  ctx.fillRect(0, 0, width, height);

  // Draw grid
  ctx.strokeStyle = "rgba(71, 85, 105, 0.2)"; // Subtle grid lines
  ctx.lineWidth = 1;

  // Vertical grid lines
  for (let x = 0; x < width; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Horizontal grid lines
  for (let y = 0; y < height; y += 20) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Generate live data points
  const time = Date.now() * 0.001;
  const points = 100; // More points for smoother curve
  const dataPoints = [];

  // Create a base pattern with some randomness to simulate market volatility
  for (let i = 0; i < points; i++) {
    const progress = i / points;

    // Base trend (combination of sine waves with different periods)
    const baseTrend =
      Math.sin(progress * 5 + time * 0.5) * 0.2 +
      Math.sin(progress * 10 + time * 0.2) * 0.1 +
      Math.sin(progress * 2 + time) * 0.1;

    // Add some noise for realism (market volatility)
    const noise =
      Math.sin(progress * 50 + time * 2) * 0.03 +
      Math.sin(progress * 20 + time * 3) * 0.02;

    // The point's y-position (higher means lower price)
    // The 0.5 baseline means the middle of the chart
    // The multiplier affects the amplitude of price changes
    const y = 0.5 - (baseTrend + noise) * 0.8;

    dataPoints.push({
      x: width * progress,
      y: height * y,
    });
  }

  // Create visual effects for "current" price
  const currentPrice = dataPoints[dataPoints.length - 1].y;
  const previousPrice = dataPoints[dataPoints.length - 20].y;
  const priceChange = previousPrice - currentPrice;
  const priceIncreasing = priceChange > 0;

  // Color gradients based on price movement
  const gradientColor = priceIncreasing
    ? "rgba(52, 211, 153, 0.2)" // Green for increasing price
    : "rgba(248, 113, 113, 0.2)"; // Red for decreasing price

  // Draw price line chart
  ctx.beginPath();
  ctx.moveTo(dataPoints[0].x, dataPoints[0].y);

  // Draw a smooth curve through all data points
  for (let i = 1; i < dataPoints.length; i++) {
    // Use quadratic curves for smoother lines
    if (i % 2 === 0) {
      const xc = (dataPoints[i].x + dataPoints[i - 1].x) / 2;
      const yc = (dataPoints[i].y + dataPoints[i - 1].y) / 2;
      ctx.quadraticCurveTo(dataPoints[i - 1].x, dataPoints[i - 1].y, xc, yc);
    } else {
      ctx.lineTo(dataPoints[i].x, dataPoints[i].y);
    }
  }

  // Extend to bottom for fill
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();

  // Create gradient fill under the line
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(
    0,
    priceIncreasing
      ? "rgba(52, 211, 153, 0.5)" // Green for increasing price
      : "rgba(248, 113, 113, 0.5)" // Red for decreasing price
  );
  gradient.addColorStop(1, "rgba(30, 41, 59, 0.1)");

  ctx.fillStyle = gradient;
  ctx.fill();

  // Draw the line with glow effect
  ctx.beginPath();
  ctx.moveTo(dataPoints[0].x, dataPoints[0].y);

  for (let i = 1; i < dataPoints.length; i++) {
    if (i % 2 === 0) {
      const xc = (dataPoints[i].x + dataPoints[i - 1].x) / 2;
      const yc = (dataPoints[i].y + dataPoints[i - 1].y) / 2;
      ctx.quadraticCurveTo(dataPoints[i - 1].x, dataPoints[i - 1].y, xc, yc);
    } else {
      ctx.lineTo(dataPoints[i].x, dataPoints[i].y);
    }
  }

  ctx.strokeStyle = priceIncreasing ? "#34D399" : "#F87171"; // Line color
  ctx.lineWidth = 3;
  ctx.stroke();

  // Add a glow effect to the line
  ctx.save();
  ctx.shadowColor = priceIncreasing
    ? "rgba(52, 211, 153, 0.8)"
    : "rgba(248, 113, 113, 0.8)";
  ctx.shadowBlur = 10;
  ctx.strokeStyle = priceIncreasing ? "#34D399" : "#F87171";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // Add data points with pulsing effect
  const pulsingPoints = [
    Math.floor(points * 0.25),
    Math.floor(points * 0.5),
    Math.floor(points * 0.75),
    points - 1,
  ];

  pulsingPoints.forEach((idx) => {
    const point = dataPoints[idx];
    const pulseMagnitude = (Math.sin(time * 3) + 1) / 2; // 0 to 1 value

    // Point glow
    ctx.beginPath();
    ctx.arc(point.x, point.y, 6 + pulseMagnitude * 4, 0, Math.PI * 2);
    ctx.fillStyle = priceIncreasing
      ? "rgba(52, 211, 153, 0.3)"
      : "rgba(248, 113, 113, 0.3)";
    ctx.fill();

    // Point center
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = priceIncreasing ? "#34D399" : "#F87171";
    ctx.fill();
  });

  // Draw latest price point with special effect
  const lastPoint = dataPoints[dataPoints.length - 1];

  // Large glow for current price
  ctx.beginPath();
  ctx.arc(lastPoint.x, lastPoint.y, 12, 0, Math.PI * 2);
  ctx.fillStyle = priceIncreasing
    ? "rgba(52, 211, 153, 0.2)"
    : "rgba(248, 113, 113, 0.2)";
  ctx.fill();

  // Medium glow
  ctx.beginPath();
  ctx.arc(lastPoint.x, lastPoint.y, 8, 0, Math.PI * 2);
  ctx.fillStyle = priceIncreasing
    ? "rgba(52, 211, 153, 0.4)"
    : "rgba(248, 113, 113, 0.4)";
  ctx.fill();

  // Current price point
  ctx.beginPath();
  ctx.arc(lastPoint.x, lastPoint.y, 6, 0, Math.PI * 2);
  ctx.fillStyle = priceIncreasing ? "#34D399" : "#F87171";
  ctx.fill();

  // Add current price indicator with rounded values
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 14px sans-serif";

  // Generate price with rounded values - nearest $100
  const basePrice = priceIncreasing ? 30000 : 28000;
  const randomOffset = Math.round(Math.random() * 20) * 100; // Random offset in $100 increments
  const priceText = priceIncreasing
    ? `$${(basePrice + randomOffset).toLocaleString()}`
    : `$${(basePrice + randomOffset).toLocaleString()}`;

  // Generate rounded percentage change - nearest 0.5%
  const percentChange = Math.round(Math.random() * 10) / 2; // Random change in 0.5% increments, max 5%
  const priceChangeText = priceIncreasing
    ? `+${percentChange.toFixed(1)}%`
    : `-${percentChange.toFixed(1)}%`;

  // Draw price box
  const priceWidth = ctx.measureText(priceText).width + 20;
  const priceBoxX = width - priceWidth - 20;
  const priceBoxY = 20;

  // Background box
  ctx.fillStyle = "rgba(15, 23, 42, 0.8)";
  ctx.fillRect(priceBoxX, priceBoxY, priceWidth, 60);

  // Border
  ctx.strokeStyle = priceIncreasing
    ? "rgba(52, 211, 153, 0.5)"
    : "rgba(248, 113, 113, 0.5)";
  ctx.lineWidth = 2;
  ctx.strokeRect(priceBoxX, priceBoxY, priceWidth, 60);

  // Price text
  ctx.fillStyle = "#ffffff";
  ctx.fillText(priceText, priceBoxX + 10, priceBoxY + 25);

  // Price change text
  ctx.fillStyle = priceIncreasing ? "#34D399" : "#F87171";
  ctx.font = "12px sans-serif";
  ctx.fillText(priceChangeText, priceBoxX + 10, priceBoxY + 45);

  // Add time indicators at the bottom
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "10px sans-serif";

  const timeLabels = ["1h", "30m", "15m", "5m", "Now"];
  timeLabels.forEach((label, i) => {
    const x = (width * (i + 1)) / (timeLabels.length + 1);
    ctx.fillText(label, x - 10, height - 10);

    // Small tick mark
    ctx.beginPath();
    ctx.moveTo(x, height - 20);
    ctx.lineTo(x, height - 25);
    ctx.stroke();
  });

  // Add volume bars at the bottom with much slower animation
  // Use a separate, slower time factor for just the volume bars
  // const volumeTime = Date.now() * 0.0002; // 5x slower than main animation

  // for (let i = 0; i < 50; i++) {
  //   // Slower changing volume bars with reduced movement
  //   const volumeHeight =
  //     Math.random() * 10 + // Less random variation
  //     15 + // Higher base height
  //     5 * Math.sin((i / 50) * Math.PI * 2 + volumeTime); // Slower, simpler sine wave

  //   ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  //   ctx.fillRect(
  //     i * (width / 50),
  //     height - volumeHeight,
  //     width / 50 - 1,
  //     volumeHeight
  //   );
  // }
};
