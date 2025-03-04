// Default visualization for any other project type
export const drawDefaultVisualization = (
  ctx,
  width,
  height,
  accentColor,
  secondaryColor
) => {
  // Background with gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(30, 41, 59, 0.6)");
  gradient.addColorStop(1, "rgba(15, 23, 42, 0.9)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Random geometric patterns
  for (let i = 0; i < 15; i++) {
    ctx.save();

    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = Math.min(width, height) * (0.05 + Math.random() * 0.15);

    ctx.translate(x, y);
    ctx.rotate(Math.random() * Math.PI * 2);

    // Alternate between accent and secondary color
    ctx.fillStyle = hexToRgba(
      i % 2 === 0 ? accentColor : secondaryColor,
      0.1 + Math.random() * 0.3
    );

    // Random shape type
    const shapeType = Math.floor(Math.random() * 3);

    switch (shapeType) {
      case 0: // Circle
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        ctx.fill();
        break;

      case 1: // Square
        ctx.fillRect(-size / 2, -size / 2, size, size);
        break;

      case 2: // Triangle
        ctx.beginPath();
        ctx.moveTo(0, -size / 2);
        ctx.lineTo(size / 2, size / 2);
        ctx.lineTo(-size / 2, size / 2);
        ctx.closePath();
        ctx.fill();
        break;
    }

    ctx.restore();
  }

  // Connect some dots with lines
  ctx.strokeStyle = hexToRgba(accentColor, 0.3);
  ctx.lineWidth = 1;
  ctx.beginPath();

  const points = [];
  for (let i = 0; i < 8; i++) {
    points.push({
      x: width * (0.2 + Math.random() * 0.6),
      y: height * (0.2 + Math.random() * 0.6),
    });
  }

  // Draw connecting lines
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if (Math.random() > 0.6) continue; // Skip some connections

      ctx.moveTo(points[i].x, points[i].y);
      ctx.lineTo(points[j].x, points[j].y);
    }
  }
  ctx.stroke();

  // Draw points
  ctx.fillStyle = secondaryColor;
  points.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
    ctx.fill();
  });
};

// Design visualization (patterns, shapes, colors)
export const drawDesignVisualization = (
  ctx,
  width,
  height,
  accentColor,
  secondaryColor
) => {
  // Background
  ctx.fillStyle = "rgba(30, 41, 59, 0.4)";
  ctx.fillRect(0, 0, width, height);

  // Draw a set of overlapping shapes
  const shapes = [
    {
      type: "circle",
      x: width * 0.3,
      y: height * 0.4,
      size: Math.min(width, height) * 0.3,
      color: hexToRgba(accentColor, 0.5),
      rotation: 0,
    },
    {
      type: "square",
      x: width * 0.45,
      y: height * 0.3,
      size: Math.min(width, height) * 0.25,
      color: hexToRgba(secondaryColor, 0.5),
      rotation: Math.PI / 6,
    },
    {
      type: "triangle",
      x: width * 0.6,
      y: height * 0.6,
      size: Math.min(width, height) * 0.28,
      color: hexToRgba(accentColor, 0.4),
      rotation: Math.PI / 4,
    },
    {
      type: "rectangle",
      x: width * 0.35,
      y: height * 0.55,
      width: width * 0.4,
      height: height * 0.15,
      color: hexToRgba(secondaryColor, 0.3),
      rotation: -Math.PI / 12,
    },
  ];

  // Draw each shape
  shapes.forEach((shape) => {
    ctx.save();
    ctx.translate(shape.x, shape.y);

    if (shape.rotation) {
      ctx.rotate(shape.rotation);
    }

    ctx.fillStyle = shape.color;

    switch (shape.type) {
      case "circle":
        ctx.beginPath();
        ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "square":
        ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
        break;

      case "triangle":
        ctx.beginPath();
        ctx.moveTo(0, -shape.size / 2);
        ctx.lineTo(shape.size / 2, shape.size / 2);
        ctx.lineTo(-shape.size / 2, shape.size / 2);
        ctx.closePath();
        ctx.fill();
        break;

      case "rectangle":
        ctx.fillRect(
          -shape.width / 2,
          -shape.height / 2,
          shape.width,
          shape.height
        );
        break;
    }

    ctx.restore();
  });

  // Add grid overlay for design effect
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 1;

  // Vertical grid lines
  for (let x = 0; x <= width; x += width / 20) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Horizontal grid lines
  for (let y = 0; y <= height; y += height / 20) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Add ruler marks at the edges
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  for (let x = 0; x <= width; x += width / 10) {
    ctx.fillRect(x, 0, 1, height * 0.02);
    ctx.fillRect(x, height - height * 0.02, 1, height * 0.02);
  }

  for (let y = 0; y <= height; y += height / 10) {
    ctx.fillRect(0, y, width * 0.02, 1);
    ctx.fillRect(width - width * 0.02, y, width * 0.02, 1);
  }
};

// Animation visualization (motion paths, transitions)
export const drawAnimationVisualization = (
  ctx,
  width,
  height,
  accentColor,
  secondaryColor
) => {
  // Background
  ctx.fillStyle = "rgba(30, 41, 59, 0.4)";
  ctx.fillRect(0, 0, width, height);

  // Create several animation paths
  for (let i = 0; i < 5; i++) {
    // Draw motion path
    ctx.beginPath();
    ctx.moveTo(width * 0.1, height * (0.2 + i * 0.15));

    // Create bezier curve
    ctx.bezierCurveTo(
      width * 0.4,
      height * (0.1 + i * 0.15),
      width * 0.6,
      height * (0.3 + i * 0.15),
      width * 0.9,
      height * (0.2 + i * 0.15)
    );

    // Style the path
    ctx.strokeStyle = hexToRgba(accentColor, 0.4);
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw animation dots along the path
    const dotPosition = (Math.sin(Date.now() * 0.001 + i) + 1) / 2; // 0 to 1 value that oscillates

    // Calculate position along the curve (this is a simplification)
    const x = width * (0.1 + dotPosition * 0.8);
    const yOffset = Math.sin(dotPosition * Math.PI) * height * 0.1;
    const y = height * (0.2 + i * 0.15) + yOffset;

    // Draw the dot
    ctx.fillStyle = secondaryColor;
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fill();

    // Draw glow effect
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
    gradient.addColorStop(0, hexToRgba(accentColor, 0.6));
    gradient.addColorStop(1, hexToRgba(accentColor, 0));

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
  }

  // Timeline indicators
  ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
  ctx.fillRect(width * 0.1, height * 0.85, width * 0.8, height * 0.05);

  // Timeline markers
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = i === 2 ? accentColor : "rgba(255, 255, 255, 0.5)";
    ctx.beginPath();
    ctx.arc(
      width * (0.1 + i * 0.2),
      height * 0.875,
      height * 0.015,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  // Playhead
  ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.fillRect(width * 0.5, height * 0.83, width * 0.01, height * 0.09);
};

// Frontend visualization (UI components, layouts)
export const drawFrontendVisualization = (
  ctx,
  width,
  height,
  accentColor,
  secondaryColor
) => {
  // Background
  ctx.fillStyle = "rgba(30, 41, 59, 0.4)";
  ctx.fillRect(0, 0, width, height);

  // Draw browser window
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

  // Header
  ctx.fillStyle = hexToRgba(accentColor, 0.8);
  ctx.fillRect(
    width * 0.15,
    windowY + height * 0.12,
    width * 0.7,
    height * 0.08
  );

  // Navigation
  for (let i = 0; i < 4; i++) {
    ctx.fillStyle = hexToRgba(secondaryColor, 0.6);
    ctx.fillRect(
      width * (0.15 + i * 0.12),
      windowY + height * 0.22,
      width * 0.1,
      height * 0.04
    );
  }

  // Content blocks
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      ctx.fillStyle = hexToRgba(accentColor, 0.2 + Math.random() * 0.3);
      ctx.fillRect(
        width * (0.15 + j * 0.36),
        windowY + height * (0.3 + i * 0.25),
        width * 0.3,
        height * 0.2
      );
    }
  }

  // Text lines
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.fillRect(
      width * 0.15,
      windowY + height * (0.75 + i * 0.04),
      width * (0.5 + Math.random() * 0.2),
      height * 0.02
    );
  }
};

// Data visualization pattern (charts, graphs)
export const drawDataVisualization = (
  ctx,
  width,
  height,
  accentColor,
  secondaryColor
) => {
  // Background with grid
  ctx.fillStyle = "rgba(30, 41, 59, 0.4)"; // slate-800 with opacity
  ctx.fillRect(0, 0, width, height);

  // Draw grid
  ctx.strokeStyle = "rgba(71, 85, 105, 0.2)"; // slate-600 with opacity
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

  // Line chart
  ctx.beginPath();
  ctx.moveTo(0, height * 0.7);

  // Create random but smooth data points
  const points = 10;
  for (let i = 1; i <= points; i++) {
    const x = (width / points) * i;
    const randomY = height * (0.3 + Math.sin(i) * 0.2 + Math.random() * 0.2);
    ctx.lineTo(x, randomY);
  }

  // Style and stroke the line
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Add area under the line
  const lastX = width;
  const lastY = height * (0.3 + Math.sin(points) * 0.2 + Math.random() * 0.2);
  ctx.lineTo(lastX, height);
  ctx.lineTo(0, height);
  ctx.closePath();

  ctx.fillStyle = hexToRgba(accentColor, 0.2);
  ctx.fill();

  // Add dots for data points
  ctx.fillStyle = secondaryColor;
  for (let i = 0; i <= points; i++) {
    const x = (width / points) * i;
    const randomY = height * (0.3 + Math.sin(i) * 0.2 + Math.random() * 0.2);
    ctx.beginPath();
    ctx.arc(x, randomY, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Add bar chart in background
  for (let i = 0; i < 5; i++) {
    const barWidth = width / 12;
    const barHeight = height * (0.1 + Math.random() * 0.3);
    const barX = width * 0.1 + i * (barWidth * 1.5);

    ctx.fillStyle = hexToRgba(secondaryColor, 0.3);
    ctx.fillRect(barX, height - barHeight, barWidth, barHeight);
  }
};
