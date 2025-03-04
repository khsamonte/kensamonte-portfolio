// Function to draw an animated visualization for sports content center
export const drawContentCenterVisualization = (
  ctx,
  width,
  height,
  accentColor,
  secondaryColor
) => {
  // Get current timestamp for animations
  const timestamp = Date.now() / 1000;

  // Clear canvas with dark background
  ctx.fillStyle = "rgba(15, 23, 42, 0.8)"; // Dark slate background
  ctx.fillRect(0, 0, width, height);

  // Draw grid for dashboard layout
  ctx.strokeStyle = "rgba(71, 85, 105, 0.2)"; // Slate-600 with opacity
  ctx.lineWidth = 1;

  // Vertical grid lines
  for (let x = 0; x < width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Horizontal grid lines
  for (let y = 0; y < height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Draw connecting lines between widgets (data flow visualization)
  const drawDataConnections = () => {
    ctx.strokeStyle = `${accentColor}30`;
    ctx.lineWidth = 2;

    // Flow animation
    const flowTime = timestamp % 10;

    // Define connection points between widgets
    const connections = [
      { from: [0.35, 0.4], to: [0.25, 0.45], dashOffset: 0 },
      { from: [0.7, 0.2], to: [0.5, 0.45], dashOffset: 0.2 },
      { from: [0.45, 0.95], to: [0.7, 0.4], dashOffset: 0.5 },
      { from: [0.5, 0.7], to: [0.25, 0.7], dashOffset: 0.3 },
    ];

    connections.forEach((connection) => {
      const fromX = width * connection.from[0];
      const fromY = height * connection.from[1];
      const toX = width * connection.to[0];
      const toY = height * connection.to[1];

      // Draw flow path
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);

      // Use bezier curve for a more natural flow
      const controlX = (fromX + toX) / 2 + (Math.random() - 0.5) * width * 0.1;
      const controlY = (fromY + toY) / 2 + (Math.random() - 0.5) * height * 0.1;

      ctx.quadraticCurveTo(controlX, controlY, toX, toY);
      ctx.stroke();

      // Animated data packet along the path
      const packetProgress = (flowTime / 10 + connection.dashOffset) % 1;
      const packetSize = 4;

      // Calculate position along the bezier curve
      const t = packetProgress;
      const packetX =
        (1 - t) * (1 - t) * fromX + 2 * (1 - t) * t * controlX + t * t * toX;
      const packetY =
        (1 - t) * (1 - t) * fromY + 2 * (1 - t) * t * controlY + t * t * toY;

      // Draw data packet
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(packetX, packetY, packetSize, 0, Math.PI * 2);
      ctx.fill();

      // Draw pulse effect
      const pulseSize = packetSize * (1 + Math.sin(timestamp * 10) * 0.5);
      ctx.fillStyle = `${accentColor}40`;
      ctx.beginPath();
      ctx.arc(packetX, packetY, pulseSize, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  // Function to draw controller buttons (navigation)
  const drawControlButtons = () => {
    const buttonSize = Math.min(width, height) * 0.03;
    const buttonSpacing = buttonSize * 2;
    const buttonsY = height * 0.98 - buttonSize;
    const buttonsStartX = width / 2 - (widgets.length * buttonSpacing) / 2;

    // Draw buttons
    for (let i = 0; i < widgets.length; i++) {
      const buttonX = buttonsStartX + i * buttonSpacing;
      const isActive = (i + Math.floor(timestamp / 5)) % widgets.length === 0;

      ctx.fillStyle = isActive ? accentColor : "rgba(255, 255, 255, 0.3)";
      ctx.beginPath();
      ctx.arc(buttonX, buttonsY, buttonSize / 2, 0, Math.PI * 2);
      ctx.fill();

      if (isActive) {
        // Pulse effect for active button
        const pulseSize = buttonSize * (0.6 + Math.sin(timestamp * 3) * 0.2);
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(buttonX, buttonsY, pulseSize, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  };

  // Match time indicator
  const drawMatchTime = () => {
    const timeX = width * 0.5;
    const timeY = height * 0.03;
    const timeWidth = width * 0.15;
    const timeHeight = height * 0.04;

    // Background
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.beginPath();
    ctx.roundRect(
      timeX - timeWidth / 2,
      timeY,
      timeWidth,
      timeHeight,
      timeHeight / 2
    );
    ctx.fill();

    // Time progress
    const matchMinute = Math.floor(
      45 + 45 * ((Math.sin(timestamp * 0.1) + 1) / 2)
    );
    const progressWidth = timeWidth * 0.8 * (matchMinute / 90);

    ctx.fillStyle = matchMinute > 45 ? secondaryColor : accentColor;
    ctx.beginPath();
    ctx.roundRect(
      timeX - timeWidth * 0.4,
      timeY + timeHeight * 0.25,
      progressWidth,
      timeHeight * 0.5,
      timeHeight * 0.25
    );
    ctx.fill();

    // Live indicator pulse
    const pulseOpacity = (Math.sin(timestamp * 5) + 1) / 2;
    ctx.fillStyle = `rgba(255, 50, 50, ${0.5 + pulseOpacity * 0.5})`;
    ctx.beginPath();
    ctx.arc(
      timeX - timeWidth * 0.45,
      timeY + timeHeight / 2,
      timeHeight * 0.2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  };

  // Define widget components for the content center
  const widgets = [
    {
      name: "head-to-head",
      draw: (x, y, w, h, progress, color1, color2) => {
        // Background
        ctx.fillStyle = "rgba(30, 41, 59, 0.7)";
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 8);
        ctx.fill();

        // Dividing line
        ctx.strokeStyle = "rgba(71, 85, 105, 0.4)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + w / 2, y + h * 0.1);
        ctx.lineTo(x + w / 2, y + h * 0.9);
        ctx.stroke();

        // Team circles
        const radius = Math.min(w, h) * 0.15;
        const circleY = y + h * 0.3;

        // Team 1 circle
        ctx.fillStyle = color1;
        ctx.beginPath();
        ctx.arc(x + w * 0.25, circleY, radius, 0, Math.PI * 2);
        ctx.fill();

        // Team 2 circle
        ctx.fillStyle = color2;
        ctx.beginPath();
        ctx.arc(x + w * 0.75, circleY, radius, 0, Math.PI * 2);
        ctx.fill();

        // Stats bars
        const stats = [
          { team1: 0.7, team2: 0.4 },
          { team1: 0.5, team2: 0.6 },
          { team1: 0.8, team2: 0.3 },
        ];

        const barHeight = h * 0.08;
        const barSpacing = h * 0.12;
        const barY = y + h * 0.55;

        stats.forEach((stat, i) => {
          const animProgress = (Math.sin(progress * Math.PI * 2 + i) + 1) / 2;

          // Team 1 stat
          ctx.fillStyle = color1;
          ctx.beginPath();
          ctx.roundRect(
            x + w * 0.05,
            barY + i * barSpacing,
            w * 0.4 * stat.team1 * animProgress,
            barHeight,
            4
          );
          ctx.fill();

          // Team 2 stat
          ctx.fillStyle = color2;
          ctx.beginPath();
          ctx.roundRect(
            x + w - w * 0.05 - w * 0.4 * stat.team2 * animProgress,
            barY + i * barSpacing,
            w * 0.4 * stat.team2 * animProgress,
            barHeight,
            4
          );
          ctx.fill();
        });
      },
    },
    // {
    //   name: "momentum-graph",
    //   draw: (x, y, w, h, progress, color1, color2) => {
    //     // Background
    //     ctx.fillStyle = "rgba(30, 41, 59, 0.7)";
    //     ctx.beginPath();
    //     ctx.roundRect(x, y, w, h, 8);
    //     ctx.fill();

    //     // Grid lines
    //     ctx.strokeStyle = "rgba(71, 85, 105, 0.3)";
    //     ctx.lineWidth = 1;

    //     // Horizontal grid lines
    //     for (let i = 1; i < 3; i++) {
    //       ctx.beginPath();
    //       ctx.moveTo(x + w * 0.05, y + h * (0.33 * i));
    //       ctx.lineTo(x + w * 0.95, y + h * (0.33 * i));
    //       ctx.stroke();
    //     }

    //     // Vertical grid lines (quarters/periods)
    //     for (let i = 1; i < 4; i++) {
    //       ctx.beginPath();
    //       ctx.moveTo(x + w * (0.25 * i), y + h * 0.1);
    //       ctx.lineTo(x + w * (0.25 * i), y + h * 0.9);
    //       ctx.stroke();
    //     }

    //     // Momentum lines
    //     const drawMomentumLine = (teamColor, offset, dashPattern = []) => {
    //       const points = [];
    //       const segments = 20;

    //       // Generate points with animation
    //       for (let i = 0; i <= segments; i++) {
    //         const pointX = x + w * 0.05 + w * 0.9 * (i / segments);

    //         // Create wave pattern with animation
    //         const baseY = y + h * 0.5; // center line
    //         const waveAmplitude = h * 0.3; // wave height

    //         // Combined waves for natural looking momentum
    //         const wave1 = Math.sin(
    //           (i / segments) * Math.PI * 4 + progress * Math.PI * 2 + offset
    //         );
    //         const wave2 =
    //           Math.sin(
    //             (i / segments) * Math.PI * 2.5 + progress * Math.PI + offset * 2
    //           ) * 0.5;
    //         const combined = wave1 * 0.7 + wave2 * 0.3;

    //         const pointY = baseY + combined * waveAmplitude;
    //         points.push({ x: pointX, y: pointY });
    //       }

    //       // Draw the momentum line
    //       ctx.strokeStyle = teamColor;
    //       ctx.lineWidth = 3;
    //       if (dashPattern.length > 0) {
    //         ctx.setLineDash(dashPattern);
    //       } else {
    //         ctx.setLineDash([]);
    //       }

    //       ctx.beginPath();
    //       ctx.moveTo(points[0].x, points[0].y);

    //       // Use bezier curves for smooth lines
    //       for (let i = 0; i < points.length - 1; i++) {
    //         const currentPoint = points[i];
    //         const nextPoint = points[i + 1];

    //         // Control points for curve
    //         const cp1x = currentPoint.x + (nextPoint.x - currentPoint.x) / 2;
    //         const cp1y = currentPoint.y;
    //         const cp2x = currentPoint.x + (nextPoint.x - currentPoint.x) / 2;
    //         const cp2y = nextPoint.y;

    //         ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, nextPoint.x, nextPoint.y);
    //       }

    //       ctx.stroke();
    //       ctx.setLineDash([]);

    //       // Add highlight point for current momentum (at timestamp position)
    //       const highlightPosition = (Math.sin(progress * 3) + 1) / 2; // oscillate between 0-1
    //       const highlightIndex = Math.floor(highlightPosition * segments);
    //       if (highlightIndex < points.length) {
    //         const point = points[highlightIndex];

    //         // Highlight glow
    //         const gradient = ctx.createRadialGradient(
    //           point.x,
    //           point.y,
    //           0,
    //           point.x,
    //           point.y,
    //           10
    //         );
    //         gradient.addColorStop(0, teamColor);
    //         gradient.addColorStop(1, "rgba(0,0,0,0)");

    //         ctx.fillStyle = gradient;
    //         ctx.beginPath();
    //         ctx.arc(point.x, point.y, 10, 0, Math.PI * 2);
    //         ctx.fill();

    //         // Highlight point
    //         ctx.fillStyle = "white";
    //         ctx.beginPath();
    //         ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
    //         ctx.fill();
    //       }
    //     };

    //     // Draw team momentum lines
    //     drawMomentumLine(color1, 0);
    //     drawMomentumLine(color2, Math.PI / 2, [5, 5]); // Offset pattern and dashed
    //   },
    // },
    {
      name: "match-timeline",
      draw: (x, y, w, h, progress, color1, color2) => {
        // Background
        ctx.fillStyle = "rgba(30, 41, 59, 0.7)";
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 8);
        ctx.fill();

        // Timeline bar
        ctx.fillStyle = "rgba(51, 65, 85, 0.7)";
        ctx.beginPath();
        ctx.roundRect(
          x + w * 0.05,
          y + h * 0.5 - h * 0.08,
          w * 0.9,
          h * 0.16,
          h * 0.08
        );
        ctx.fill();

        // Match progress indicator
        const matchProgress = (Math.sin(progress * 0.5) + 1) / 2; // Oscillate slowly

        ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        ctx.beginPath();
        ctx.roundRect(
          x + w * 0.05,
          y + h * 0.5 - h * 0.08,
          w * 0.9 * matchProgress,
          h * 0.16,
          h * 0.08
        );
        ctx.fill();

        // Event markers on timeline
        const events = [
          { position: 0.15, team: 1, type: "goal" },
          { position: 0.35, team: 2, type: "card" },
          { position: 0.42, team: 1, type: "substitution" },
          { position: 0.7, team: 1, type: "goal" },
          { position: 0.85, team: 2, type: "goal" },
        ];

        events.forEach((event) => {
          // Only show events that have "happened" in animation
          if (event.position > matchProgress) return;

          // Event marker position
          const eventX = x + w * 0.05 + w * 0.9 * event.position;
          const eventY = y + h * 0.5;

          // Determine color by team
          const eventColor = event.team === 1 ? color1 : color2;

          // Draw event marker
          ctx.fillStyle = eventColor;

          if (event.type === "goal") {
            // Animated goal pulse
            const pulseSize =
              (Math.sin(timestamp * 3 + event.position * 10) + 1) / 2;

            // Goal base marker
            ctx.beginPath();
            ctx.moveTo(eventX, eventY - h * 0.15);
            ctx.lineTo(eventX + h * 0.06, eventY - h * 0.05);
            ctx.lineTo(eventX - h * 0.06, eventY - h * 0.05);
            ctx.closePath();
            ctx.fill();

            // Pulse effect for goals
            const gradient = ctx.createRadialGradient(
              eventX,
              eventY - h * 0.1,
              0,
              eventX,
              eventY - h * 0.1,
              h * 0.1 * (1 + pulseSize * 0.5)
            );
            gradient.addColorStop(0, `${eventColor}60`);
            gradient.addColorStop(1, `${eventColor}00`);

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(
              eventX,
              eventY - h * 0.1,
              h * 0.1 * (1 + pulseSize * 0.5),
              0,
              Math.PI * 2
            );
            ctx.fill();
          } else if (event.type === "card") {
            // Card marker
            ctx.fillRect(
              eventX - h * 0.03,
              eventY - h * 0.2,
              h * 0.06,
              h * 0.1
            );
          } else if (event.type === "substitution") {
            // Substitution marker - rotating arrows
            ctx.save();
            ctx.translate(eventX, eventY - h * 0.15);
            ctx.rotate(progress * Math.PI * 2);

            // Arrows
            ctx.beginPath();
            ctx.moveTo(0, -h * 0.05);
            ctx.lineTo(h * 0.05, 0);
            ctx.lineTo(0, h * 0.05);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(0, h * 0.05);
            ctx.lineTo(-h * 0.05, 0);
            ctx.lineTo(0, -h * 0.05);
            ctx.closePath();
            ctx.fill();

            ctx.restore();
          }
        });
      },
    },
    {
      name: "statistics",
      draw: (x, y, w, h, progress, color1, color2) => {
        // Background
        ctx.fillStyle = "rgba(30, 41, 59, 0.7)";
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 8);
        ctx.fill();

        // Stats bars
        const stats = [
          { label: "possession", team1: 0.65, team2: 0.35 },
          { label: "shots", team1: 0.45, team2: 0.55 },
          { label: "passes", team1: 0.6, team2: 0.4 },
          { label: "tackles", team1: 0.3, team2: 0.7 },
        ];

        const barHeight = h * 0.1;
        const barSpacing = h * 0.15;
        const barY = y + h * 0.2;

        stats.forEach((stat, i) => {
          // Animation progress - cascade effect
          const delay = i * 0.2;
          const animProgress = Math.max(
            0,
            Math.min(1, (progress * 4 - delay) % 2)
          );

          // Background bar
          ctx.fillStyle = "rgba(51, 65, 85, 0.4)";
          ctx.beginPath();
          ctx.roundRect(
            x + w * 0.1,
            barY + i * barSpacing,
            w * 0.8,
            barHeight,
            4
          );
          ctx.fill();

          // Calculate the actual percentage-based widths
          const totalWidth = w * 0.8;
          const team1Width = totalWidth * stat.team1 * animProgress;
          const team2Width = totalWidth * stat.team2 * animProgress;

          // Team 1 bar
          ctx.fillStyle = color1;
          ctx.beginPath();
          ctx.roundRect(
            x + w * 0.1,
            barY + i * barSpacing,
            team1Width,
            barHeight,
            { upperLeft: 4, lowerLeft: 4, upperRight: 0, lowerRight: 0 }
          );
          ctx.fill();

          // Team 2 bar
          ctx.fillStyle = color2;
          ctx.beginPath();
          ctx.roundRect(
            x + w * 0.1 + team1Width,
            barY + i * barSpacing,
            team2Width,
            barHeight,
            { upperLeft: 0, lowerLeft: 0, upperRight: 4, lowerRight: 4 }
          );
          ctx.fill();

          // Stat value indicators (no text)
          const statCircleRadius = barHeight * 0.3;

          // Team 1 indicator
          // ctx.fillStyle = "white";
          // ctx.beginPath();
          // ctx.arc(
          //   x + w * 0.1 + team1Width - statCircleRadius * 1.5,
          //   barY + i * barSpacing + barHeight / 2,
          //   statCircleRadius,
          //   0,
          //   Math.PI * 2
          // );
          // ctx.fill();

          // Team 2 indicator
          // ctx.fillStyle = "white";
          // ctx.beginPath();
          // ctx.arc(
          //   x + w * 0.1 + team1Width + statCircleRadius * 1.5,
          //   barY + i * barSpacing + barHeight / 2,
          //   statCircleRadius,
          //   0,
          //   Math.PI * 2
          // );
          // ctx.fill();
        });
      },
    },
    {
      name: "standings",
      draw: (x, y, w, h, progress, color1, color2) => {
        // Background
        ctx.fillStyle = "rgba(30, 41, 59, 0.7)";
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 8);
        ctx.fill();

        // Table header
        ctx.fillStyle = "rgba(51, 65, 85, 0.8)";
        ctx.beginPath();
        ctx.roundRect(x + w * 0.05, y + h * 0.1, w * 0.9, h * 0.15, {
          upperLeft: 4,
          upperRight: 4,
          lowerLeft: 0,
          lowerRight: 0,
        });
        ctx.fill();

        // Table rows
        const teams = 5;
        const rowHeight = h * 0.12;

        for (let i = 0; i < teams; i++) {
          // Row background - alternating colors
          ctx.fillStyle =
            i % 2 === 0 ? "rgba(51, 65, 85, 0.3)" : "rgba(51, 65, 85, 0.4)";

          ctx.beginPath();
          ctx.roundRect(
            x + w * 0.05,
            y + h * 0.25 + i * rowHeight,
            w * 0.9,
            rowHeight,
            i === teams - 1
              ? { upperLeft: 0, upperRight: 0, lowerLeft: 4, lowerRight: 4 }
              : 0
          );
          ctx.fill();

          // Highlight active teams
          if (i === 1 || i === 3) {
            const highlightColor = i === 1 ? color1 : color2;
            const pulseOpacity =
              ((Math.sin(progress * Math.PI * 2) + 1) / 2) * 0.4 + 0.1;

            ctx.fillStyle = `${highlightColor}${Math.floor(pulseOpacity * 255)
              .toString(16)
              .padStart(2, "0")}`;
            ctx.beginPath();
            ctx.roundRect(
              x + w * 0.05,
              y + h * 0.25 + i * rowHeight,
              w * 0.9,
              rowHeight,
              0
            );
            ctx.fill();
          }

          // Team position circle
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
          ctx.beginPath();
          ctx.arc(
            x + w * 0.12,
            y + h * 0.25 + i * rowHeight + rowHeight / 2,
            rowHeight * 0.25,
            0,
            Math.PI * 2
          );
          ctx.fill();

          // Team line
          ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
          ctx.fillRect(
            x + w * 0.22,
            y + h * 0.25 + i * rowHeight + rowHeight / 2 - 2,
            w * 0.4,
            4
          );

          // Stats dots
          for (let j = 0; j < 3; j++) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
            ctx.beginPath();
            ctx.arc(
              x + w * (0.7 + j * 0.08),
              y + h * 0.25 + i * rowHeight + rowHeight / 2,
              4,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        }

        // Animate sorting (when progress cycles)
        if (progress % 1 > 0.8 && progress % 1 < 0.9) {
          const sortIndicator = x + w * 0.75;
          const sortY = y + h * 0.175;

          // Sort indicator
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
          ctx.beginPath();
          ctx.moveTo(sortIndicator - 8, sortY - 5);
          ctx.lineTo(sortIndicator + 8, sortY - 5);
          ctx.lineTo(sortIndicator, sortY + 5);
          ctx.closePath();
          ctx.fill();
        }
      },
    },
    {
      name: "score-box",
      draw: (x, y, w, h, progress, color1, color2) => {
        // Background
        ctx.fillStyle = "rgba(30, 41, 59, 0.7)";
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 8);
        ctx.fill();

        // Team areas
        const teamWidth = w * 0.4;

        // Team 1 area
        ctx.fillStyle = `${color1}40`;
        ctx.beginPath();
        ctx.roundRect(x + w * 0.05, y + h * 0.2, teamWidth, h * 0.6, 6);
        ctx.fill();

        // Team 2 area
        ctx.fillStyle = `${color2}40`;
        ctx.beginPath();
        ctx.roundRect(
          x + w - w * 0.05 - teamWidth,
          y + h * 0.2,
          teamWidth,
          h * 0.6,
          6
        );
        ctx.fill();

        // Score divider
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        ctx.beginPath();
        ctx.roundRect(x + w * 0.5 - 1, y + h * 0.3, 2, h * 0.4, 1);
        ctx.fill();

        // Team logos (circles)
        const logoRadius = Math.min(w, h) * 0.15;

        // Team 1 logo
        ctx.fillStyle = color1;
        ctx.beginPath();
        ctx.arc(x + w * 0.25, y + h * 0.35, logoRadius, 0, Math.PI * 2);
        ctx.fill();

        // Team 2 logo
        ctx.fillStyle = color2;
        ctx.beginPath();
        ctx.arc(x + w * 0.75, y + h * 0.35, logoRadius, 0, Math.PI * 2);
        ctx.fill();

        // Score indicators
        const score1 = 2;
        const score2 = 1;

        // Animated score reveal
        const scoreReveal = Math.min(1, (progress * 3) % 3);

        for (let i = 0; i < Math.ceil(score1 * scoreReveal); i++) {
          if (i >= score1) break;

          const fadeIn = Math.min(1, scoreReveal * 3 - i);

          ctx.fillStyle = `rgba(255, 255, 255, ${fadeIn * 0.9})`;
          ctx.beginPath();
          ctx.arc(
            x + w * 0.25 - logoRadius * 0.8 + i * logoRadius * 0.5,
            y + h * 0.65,
            logoRadius * 0.15,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        for (let i = 0; i < Math.ceil(score2 * scoreReveal); i++) {
          if (i >= score2) break;

          const fadeIn = Math.min(1, scoreReveal * 3 - i);

          ctx.fillStyle = `rgba(255, 255, 255, ${fadeIn * 0.9})`;
          ctx.beginPath();
          ctx.arc(
            x + w * 0.75 - logoRadius * 0.8 + i * logoRadius * 0.5,
            y + h * 0.65,
            logoRadius * 0.15,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        // Match time indicator
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.beginPath();
        ctx.roundRect(x + w * 0.35, y + h * 0.8, w * 0.3, h * 0.1, 4);
        ctx.fill();

        // Pulse for "live" indicator
        const livePulse = (Math.sin(timestamp * 3) + 1) / 2;

        ctx.fillStyle = `rgba(255, 59, 59, ${0.5 + livePulse * 0.5})`;
        ctx.beginPath();
        ctx.arc(
          x + w * 0.15,
          y + h * 0.85,
          h * 0.04 * (0.8 + livePulse * 0.2),
          0,
          Math.PI * 2
        );
        ctx.fill();
      },
    },
  ];

  // Now execute the functions to render everything
  layoutWidgets();
  // drawDataConnections();
  // drawControlButtons();
  // drawMatchTime();

  // Layout widgets in a dashboard grid
  function layoutWidgets() {
    // Calculate grid positions
    const grid = [
      // [x, y, width, height]
      [0.05, 0.05, 0.6, 0.35], // Head to head (large top left)
      [0.7, 0.05, 0.25, 0.35], // Score box (top right)
      [0.05, 0.45, 0.4, 0.5], // Momentum graph (bottom left)
      [0.5, 0.45, 0.45, 0.25], // Timeline (bottom middle)
      [0.5, 0.75, 0.45, 0.2], // Stats (bottom right)
    ];

    // Cycle different widget into "focus" based on time
    const focusedIndex = Math.floor(timestamp % 15) % grid.length;

    // Draw each widget
    grid.forEach((position, i) => {
      const [gx, gy, gw, gh] = position;

      // Calculate actual position and size
      const widgetX = width * gx;
      const widgetY = height * gy;
      const widgetW = width * gw;
      const widgetH = height * gh;

      // Get the widget to display (cycle through widgets based on time)
      const widgetIndex = (i + Math.floor(timestamp / 5)) % widgets.length;
      const widget = widgets[widgetIndex];

      // Scale effect for focused widget
      const isFocused = i === focusedIndex;
      const focusScale = isFocused
        ? 1 + (Math.sin(timestamp * 2) + 1) * 0.02
        : 1;

      // Apply focus effect
      if (isFocused) {
        // Glow effect
        const gradient = ctx.createRadialGradient(
          widgetX + widgetW / 2,
          widgetY + widgetH / 2,
          0,
          widgetX + widgetW / 2,
          widgetY + widgetH / 2,
          widgetW * 0.6
        );
        gradient.addColorStop(0, `${accentColor}10`);
        gradient.addColorStop(1, `${accentColor}00`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Calculate adjusted dimensions with scale
      const scaledX = widgetX - (widgetW * (focusScale - 1)) / 2;
      const scaledY = widgetY - (widgetH * (focusScale - 1)) / 2;
      const scaledW = widgetW * focusScale;
      const scaledH = widgetH * focusScale;

      // Widget-specific animation progress
      const animProgress = ((timestamp + i * 0.5) % 2) / 2;

      // Draw the widget
      widget.draw(
        scaledX,
        scaledY,
        scaledW,
        scaledH,
        animProgress,
        accentColor,
        secondaryColor
      );

      // Draw "focus" indicator on active widget
      if (isFocused) {
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 4]);
        ctx.beginPath();
        ctx.roundRect(scaledX - 5, scaledY - 5, scaledW + 10, scaledH + 10, 10);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    });
  }
};
