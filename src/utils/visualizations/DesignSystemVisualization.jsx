// Function to draw an animated visualization for a design system project
export const drawDesignSystemVisualization = (
  ctx,
  width,
  height,
  accentColor,
  secondaryColor
) => {
  // Get current timestamp for animations
  const timestamp = Date.now() / 1000;

  // Background with grid pattern
  ctx.fillStyle = "rgba(15, 23, 42, 0.8)"; // Dark slate background
  ctx.fillRect(0, 0, width, height);

  // Draw grid
  ctx.strokeStyle = "rgba(71, 85, 105, 0.2)"; // Slate-600 with opacity
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

  // Define component types for the design system
  const componentTypes = [
    {
      name: "button",
      draw: (x, y, size, progress, color) => {
        // Animating button with hover/press effect
        const buttonWidth = size * 1.6;
        const buttonHeight = size * 0.7;
        const cornerRadius = size * 0.15;

        // Button base
        ctx.fillStyle = color;
        ctx.beginPath();
        const scale = 1 + Math.sin(progress * Math.PI * 2) * 0.05; // Subtle pulsing

        ctx.roundRect(
          x - (buttonWidth / 2) * scale,
          y - (buttonHeight / 2) * scale,
          buttonWidth * scale,
          buttonHeight * scale,
          cornerRadius
        );
        ctx.fill();

        // Button inner shadow/highlight
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        ctx.beginPath();
        ctx.roundRect(
          x - (buttonWidth / 2) * scale + 2,
          y - (buttonHeight / 2) * scale + 2,
          buttonWidth * scale - 4,
          buttonHeight * scale - 4,
          cornerRadius - 1
        );
        ctx.fill();
      },
    },
    {
      name: "card",
      draw: (x, y, size, progress, color) => {
        // Animating card with shadow and content
        const cardWidth = size * 1.8;
        const cardHeight = size * 1.5;
        const cornerRadius = size * 0.1;

        // Card shadow (animated)
        const shadowSize = 10 + Math.sin(progress * Math.PI * 2) * 5;
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.beginPath();
        ctx.roundRect(
          x - cardWidth / 2 + shadowSize / 2,
          y - cardHeight / 2 + shadowSize / 2,
          cardWidth,
          cardHeight,
          cornerRadius
        );
        ctx.fill();

        // Card base
        ctx.fillStyle = "rgba(30, 41, 59, 0.9)"; // Darker than background
        ctx.beginPath();
        ctx.roundRect(
          x - cardWidth / 2,
          y - cardHeight / 2,
          cardWidth,
          cardHeight,
          cornerRadius
        );
        ctx.fill();

        // Card header
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(
          x - cardWidth / 2,
          y - cardHeight / 2,
          cardWidth,
          cardHeight * 0.25,
          {
            upperLeft: cornerRadius,
            upperRight: cornerRadius,
            lowerLeft: 0,
            lowerRight: 0,
          }
        );
        ctx.fill();

        // Card content lines (animated)
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        for (let i = 0; i < 3; i++) {
          const lineWidth =
            cardWidth * (0.6 + Math.sin(progress * 2 + i) * 0.1);
          ctx.beginPath();
          ctx.roundRect(
            x - lineWidth / 2,
            y - cardHeight * 0.15 + i * cardHeight * 0.2,
            lineWidth,
            cardHeight * 0.08,
            2
          );
          ctx.fill();
        }
      },
    },
    {
      name: "toggle",
      draw: (x, y, size, progress, color) => {
        // Animating toggle switch
        const toggleWidth = size * 1.2;
        const toggleHeight = size * 0.6;

        // Track
        ctx.fillStyle = "rgba(100, 116, 139, 0.5)"; // Slate-500 with opacity
        ctx.beginPath();
        ctx.roundRect(
          x - toggleWidth / 2,
          y - toggleHeight / 2,
          toggleWidth,
          toggleHeight,
          toggleHeight / 2
        );
        ctx.fill();

        // Knob - animated position
        const toggleState = (Math.sin(progress * Math.PI) + 1) / 2; // 0 to 1
        const knobX =
          x -
          toggleWidth / 2 +
          toggleHeight / 2 +
          toggleState * (toggleWidth - toggleHeight);

        // Glow when active
        if (toggleState > 0.5) {
          ctx.fillStyle = `${color}40`; // With transparency
          ctx.beginPath();
          ctx.roundRect(
            x - toggleWidth / 2,
            y - toggleHeight / 2,
            toggleWidth,
            toggleHeight,
            toggleHeight / 2
          );
          ctx.fill();
        }

        // Knob
        ctx.fillStyle = toggleState > 0.5 ? color : "rgba(255, 255, 255, 0.9)";
        ctx.beginPath();
        ctx.arc(knobX, y, toggleHeight * 0.4, 0, Math.PI * 2);
        ctx.fill();
      },
    },
    {
      name: "input",
      draw: (x, y, size, progress, color) => {
        // Animating input field with focus state
        const inputWidth = size * 1.8;
        const inputHeight = size * 0.7;
        const cornerRadius = 4;

        // Input background
        ctx.fillStyle = "rgba(51, 65, 85, 0.7)"; // Slate-700 with opacity
        ctx.beginPath();
        ctx.roundRect(
          x - inputWidth / 2,
          y - inputHeight / 2,
          inputWidth,
          inputHeight,
          cornerRadius
        );
        ctx.fill();

        // Input focus outline (animated)
        const focusState = (Math.sin(progress * Math.PI * 2) + 1) / 2; // 0 to 1
        if (focusState > 0.5) {
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.roundRect(
            x - inputWidth / 2 - 1,
            y - inputHeight / 2 - 1,
            inputWidth + 2,
            inputHeight + 2,
            cornerRadius
          );
          ctx.stroke();
        }

        // Cursor blink animation
        if (focusState > 0.5 && Math.floor(timestamp * 2) % 2 === 0) {
          const cursorX = x - inputWidth * 0.2;
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.fillRect(cursorX, y - inputHeight * 0.3, 2, inputHeight * 0.6);
        }

        // Some text placeholder
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        for (let i = 0; i < 2; i++) {
          const textWidth = inputWidth * 0.15;
          ctx.fillRect(
            x - inputWidth * 0.4 + i * textWidth * 1.5,
            y - 3,
            textWidth,
            6
          );
        }
      },
    },
    {
      name: "chart",
      draw: (x, y, size, progress, color) => {
        // Animating chart component
        const chartWidth = size * 1.6;
        const chartHeight = size * 1.2;

        // Chart base
        ctx.fillStyle = "rgba(30, 41, 59, 0.6)";
        ctx.beginPath();
        ctx.roundRect(
          x - chartWidth / 2,
          y - chartHeight / 2,
          chartWidth,
          chartHeight,
          4
        );
        ctx.fill();

        // Animated bar chart
        const bars = 5;
        const barWidth = chartWidth * 0.12;
        const maxBarHeight = chartHeight * 0.7;
        const barSpacing = (chartWidth * 0.7) / bars;

        for (let i = 0; i < bars; i++) {
          // Animated bar height
          const heightFactor = Math.abs(Math.sin(progress * 2 + i * 0.7));
          const barHeight = maxBarHeight * (0.3 + heightFactor * 0.7);
          const barX = x - chartWidth * 0.35 + i * barSpacing;
          const barY = y + chartHeight * 0.5 - barHeight;

          // Bar with gradient
          const gradient = ctx.createLinearGradient(
            barX,
            barY + barHeight,
            barX,
            barY
          );
          gradient.addColorStop(0, color);
          gradient.addColorStop(1, `${color}80`);

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.roundRect(barX, barY, barWidth, barHeight, {
            upperLeft: 3,
            upperRight: 3,
            lowerLeft: 0,
            lowerRight: 0,
          });
          ctx.fill();
        }

        // Chart grid lines
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 1;

        // Horizontal grid lines
        for (let i = 0; i < 3; i++) {
          const lineY = y - chartHeight * 0.3 + i * chartHeight * 0.3;
          ctx.beginPath();
          ctx.moveTo(x - chartWidth * 0.4, lineY);
          ctx.lineTo(x + chartWidth * 0.4, lineY);
          ctx.stroke();
        }
      },
    },
    {
      name: "avatar",
      draw: (x, y, size, progress, color) => {
        // Animating avatar component
        const avatarSize = size * 0.8;
        const borderWidth = 2 + Math.sin(progress * Math.PI * 2) * 2;

        // Avatar circle
        ctx.fillStyle = "rgba(51, 65, 85, 0.7)";
        ctx.beginPath();
        ctx.arc(x, y, avatarSize / 2, 0, Math.PI * 2);
        ctx.fill();

        // Avatar border (animated)
        ctx.strokeStyle = color;
        ctx.lineWidth = borderWidth;
        ctx.beginPath();
        ctx.arc(x, y, avatarSize / 2, 0, Math.PI * 2);
        ctx.stroke();

        // Simple face
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";

        // Eyes
        const eyeOffset = avatarSize * 0.15;
        const eyeSize = avatarSize * 0.08;
        ctx.beginPath();
        ctx.arc(x - eyeOffset, y - eyeOffset * 0.5, eyeSize, 0, Math.PI * 2);
        ctx.arc(x + eyeOffset, y - eyeOffset * 0.5, eyeSize, 0, Math.PI * 2);
        ctx.fill();

        // Smile - animated
        const smileWidth = avatarSize * 0.4;
        const smileHeight =
          avatarSize * 0.2 * (0.5 + Math.sin(progress * Math.PI * 2) * 0.5);

        ctx.beginPath();
        ctx.ellipse(
          x,
          y + eyeOffset * 0.8,
          smileWidth / 2,
          smileHeight,
          0,
          0,
          Math.PI
        );
        ctx.stroke();
      },
    },
    {
      name: "modal",
      draw: (x, y, size, progress, color) => {
        // Animating modal component
        const scaleProgress =
          (Math.sin(progress * Math.PI * 2 - Math.PI / 2) + 1) / 2; // 0 to 1
        const modalScale = 0.7 + scaleProgress * 0.3;

        const modalWidth = size * 2 * modalScale;
        const modalHeight = size * 1.5 * modalScale;

        // Modal backdrop
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.fillRect(x - size * 2, y - size * 2, size * 4, size * 4);

        // Modal body
        ctx.fillStyle = "rgba(30, 41, 59, 0.95)";
        ctx.beginPath();
        ctx.roundRect(
          x - modalWidth / 2,
          y - modalHeight / 2,
          modalWidth,
          modalHeight,
          8
        );
        ctx.fill();

        // Modal header
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(
          x - modalWidth / 2,
          y - modalHeight / 2,
          modalWidth,
          modalHeight * 0.18,
          { upperLeft: 8, upperRight: 8, lowerLeft: 0, lowerRight: 0 }
        );
        ctx.fill();

        // Modal content
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        for (let i = 0; i < 3; i++) {
          const lineWidth = modalWidth * (0.8 - i * 0.1);
          ctx.beginPath();
          ctx.roundRect(
            x - lineWidth / 2,
            y - modalHeight * 0.15 + i * modalHeight * 0.18,
            lineWidth,
            modalHeight * 0.08,
            2
          );
          ctx.fill();
        }

        // Modal buttons
        ctx.fillStyle = `${color}80`;
        ctx.beginPath();
        ctx.roundRect(
          x + modalWidth * 0.1,
          y + modalHeight * 0.35,
          modalWidth * 0.25,
          modalHeight * 0.12,
          4
        );
        ctx.fill();

        ctx.fillStyle = "rgba(100, 116, 139, 0.5)";
        ctx.beginPath();
        ctx.roundRect(
          x - modalWidth * 0.1 - modalWidth * 0.25,
          y + modalHeight * 0.35,
          modalWidth * 0.25,
          modalHeight * 0.12,
          4
        );
        ctx.fill();
      },
    },
  ];

  // Animation states
  const animationCycle = timestamp % 15; // 15-second cycle

  // Draw multiple components in a showcase layout
  const drawComponentShowcase = () => {
    // Calculate grid positions for components
    const rows = 2;
    const cols = 3;
    const gridSpacingX = (width * 0.8) / cols;
    const gridSpacingY = (height * 0.7) / rows;
    const gridOffsetX = width * 0.1 + gridSpacingX / 2;
    const gridOffsetY = height * 0.15 + gridSpacingY / 2;

    // Draw components in a grid
    let index = 0;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (index >= componentTypes.length) break;

        const x = gridOffsetX + col * gridSpacingX;
        const y = gridOffsetY + row * gridSpacingY;
        const size = Math.min(gridSpacingX, gridSpacingY) * 0.3;

        // Stagger animation timing based on position
        const staggerOffset = (row * cols + col) * 0.4;
        const progress = ((timestamp + staggerOffset) % 3) / 3;

        // Alternate between accent and secondary colors
        const color = (row + col) % 2 === 0 ? accentColor : secondaryColor;

        // Draw component
        componentTypes[index].draw(x, y, size, progress, color);
        index++;
      }
    }
  };

  // Draw connecting lines between components to symbolize the system
  const drawSystemConnections = () => {
    const gridWidth = width * 0.8;
    const gridHeight = height * 0.7;
    const gridOffsetX = width * 0.1;
    const gridOffsetY = height * 0.15;
    const rows = 2;
    const cols = 3;

    // Calculate connection points
    const points = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (row * cols + col >= componentTypes.length) break;

        points.push({
          x: gridOffsetX + (gridWidth * (col + 0.5)) / cols,
          y: gridOffsetY + (gridHeight * (row + 0.5)) / rows,
        });
      }
    }

    // Draw connections
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        // Only connect some points, not all
        if ((i + j) % 3 !== 0) continue;

        const startPoint = points[i];
        const endPoint = points[j];

        // Animate line drawing
        const lineProgress = (Math.sin(timestamp + i * 0.5 + j * 0.3) + 1) / 2;

        // Calculate midpoint with offset for curved lines
        const midX = (startPoint.x + endPoint.x) / 2;
        const midY = (startPoint.y + endPoint.y) / 2;
        const controlOffsetX = (endPoint.y - startPoint.y) * 0.3;
        const controlOffsetY = (startPoint.x - endPoint.x) * 0.3;

        // Draw curved connection
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.quadraticCurveTo(
          midX + controlOffsetX,
          midY + controlOffsetY,
          endPoint.x,
          endPoint.y
        );
        ctx.stroke();

        // Animated dot along the path
        const dotProgress = (timestamp * 0.5 + i * 0.5 + j * 0.7) % 1;
        const dotX = startPoint.x + (endPoint.x - startPoint.x) * dotProgress;
        const dotY = startPoint.y + (endPoint.y - startPoint.y) * dotProgress;

        // Account for curve in dot position (approximation)
        const curveOffsetX = controlOffsetX * Math.sin(dotProgress * Math.PI);
        const curveOffsetY = controlOffsetY * Math.sin(dotProgress * Math.PI);

        // Draw dot
        ctx.fillStyle = (i + j) % 2 === 0 ? accentColor : secondaryColor;
        ctx.beginPath();
        ctx.arc(
          dotX + curveOffsetX * dotProgress * (1 - dotProgress) * 4,
          dotY + curveOffsetY * dotProgress * (1 - dotProgress) * 4,
          3,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }
  };

  // Draw design system title and information (no text, just visual elements)
  const drawSystemInfo = () => {
    // Design system "title bar"
    const titleBarWidth = width * 0.3;
    const titleBarX = width * 0.15;
    const titleBarY = height * 0.08;

    ctx.fillStyle = accentColor;
    ctx.beginPath();
    ctx.roundRect(titleBarX, titleBarY - 10, titleBarWidth, 20, 5);
    ctx.fill();

    // Version indicator
    const versionSize = 24;
    const versionX = width * 0.85;
    const versionY = height * 0.08;

    ctx.fillStyle = secondaryColor;
    ctx.beginPath();
    ctx.arc(versionX, versionY, versionSize / 2, 0, Math.PI * 2);
    ctx.fill();

    // Animated highlight around active component based on animation cycle
    if (animationCycle < 10) {
      const highlightIndex =
        Math.floor(animationCycle / 1.5) % componentTypes.length;
      const row = Math.floor(highlightIndex / 3);
      const col = highlightIndex % 3;

      const gridSpacingX = (width * 0.8) / 3;
      const gridSpacingY = (height * 0.7) / 2;
      const gridOffsetX = width * 0.1 + gridSpacingX / 2;
      const gridOffsetY = height * 0.15 + gridSpacingY / 2;

      const x = gridOffsetX + col * gridSpacingX;
      const y = gridOffsetY + row * gridSpacingY;

      // Pulsing highlight effect
      const pulseSize = Math.sin(timestamp * 3) * 10 + 40;

      // Create gradient for glow effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, pulseSize);
      gradient.addColorStop(0, `${accentColor}40`);
      gradient.addColorStop(1, `${accentColor}00`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, pulseSize, 0, Math.PI * 2);
      ctx.fill();

      // Connection to documentation
      if (animationCycle > 8 && animationCycle < 9.5) {
        const docX = x + width * 0.25;
        const docY = y;
        const docWidth = width * 0.15;
        const docHeight = height * 0.3;

        // Doc panel with animation
        const openProgress = (animationCycle - 8) / 1.5;
        const panelWidth = docWidth * openProgress;

        // Panel background
        ctx.fillStyle = "rgba(30, 41, 59, 0.9)";
        ctx.beginPath();
        ctx.roundRect(docX, docY - docHeight / 2, panelWidth, docHeight, 5);
        ctx.fill();

        // Panel header
        ctx.fillStyle = secondaryColor;
        ctx.beginPath();
        ctx.roundRect(docX, docY - docHeight / 2, panelWidth, 30, {
          upperLeft: 5,
          upperRight: 5,
          lowerLeft: 0,
          lowerRight: 0,
        });
        ctx.fill();

        // Panel content lines (appear as panel opens)
        if (openProgress > 0.3) {
          const contentProgress = (openProgress - 0.3) / 0.7;
          ctx.fillStyle = "rgba(255, 255, 255, 0.15)";

          for (let i = 0; i < 5; i++) {
            if (i / 5 > contentProgress) continue;

            ctx.beginPath();
            ctx.roundRect(
              docX + 10,
              docY - docHeight / 2 + 40 + i * 25,
              panelWidth - 20,
              15,
              2
            );
            ctx.fill();
          }
        }

        // Connecting line
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(x + 30, y);
        ctx.lineTo(docX, y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  };

  // Draw components showcase
  drawComponentShowcase();

  // Draw connecting system
  drawSystemConnections();

  // Draw system info
  drawSystemInfo();

  // Show animation cycle
  const cycleIndicatorWidth = width * 0.6;
  const cycleIndicatorHeight = 4;
  const cycleProgress = (animationCycle % 15) / 15;

  ctx.fillStyle = "rgba(100, 116, 139, 0.3)";
  ctx.beginPath();
  ctx.roundRect(
    width * 0.2,
    height * 0.95,
    cycleIndicatorWidth,
    cycleIndicatorHeight,
    2
  );
  ctx.fill();

  ctx.fillStyle = accentColor;
  ctx.beginPath();
  ctx.roundRect(
    width * 0.2,
    height * 0.95,
    cycleIndicatorWidth * cycleProgress,
    cycleIndicatorHeight,
    2
  );
  ctx.fill();
};
