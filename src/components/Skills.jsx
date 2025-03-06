import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { motion } from "framer-motion";

// const THREE = lazy(() => import("three"));
// const OrbitControls = lazy(() => import("three/examples/jsm/controls/OrbitControls"))

// Original LanguageCard component from your code
const LanguageCard = ({ language, level, certification = null }) => {
  let proficiencyWidth;

  switch (level) {
    case "C2":
      proficiencyWidth = "100%";
      break;
    case "C1":
      proficiencyWidth = "80%";
      break;
    case "B2":
      proficiencyWidth = "60%";
      break;
    case "B1":
      proficiencyWidth = "40%";
      break;
    case "B1-":
      proficiencyWidth = "30%";
      break;
    case "A2":
      proficiencyWidth = "20%";
      break;
    case "A1":
      proficiencyWidth = "5%";
      break;
    default:
      proficiencyWidth = "50%";
  }

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-white">{language}</h4>
        <span className="text-blue-300 text-sm">{level}</span>
      </div>

      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          whileInView={{ width: proficiencyWidth }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>

      {certification && (
        <p className="text-slate-400 text-sm mt-2">{certification}</p>
      )}
    </div>
  );
};

const Skills = () => {
  const mountRef = useRef(null);

  // Define additional skills from original component
  const additionalSkills = [
    "Video Editing: Familiar with the basics of Premiere Pro for video content creation.",
    "Content Writing: Experienced in writing SEO-optimized web content and news articles.",
    "Technical Writing: Proficient in creating detailed documentation for internal developer processes.",
    "Animation Integration: Experienced in designing 2D animations and integrating them into the web.",
    "Music Production: Knowledgeable in writing lyrics, producing music, and audio mixing and mastering.",
  ];

  // Define languages from original component
  const languages = [
    {
      language: "English",
      level: "C2",
      certification: "Bilingual Proficiency",
    },
    {
      language: "Tagalog",
      level: "C2",
      certification: "Native Proficiency",
    },
    {
      language: "Japanese",
      level: "B1-",
      certification: "JLPT N4 Passer (July 2024)",
    },
  ];

  useEffect(() => {
    // Current ref value
    const currentRef = mountRef.current;
    if (!currentRef) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0f172a"); // Dark blue background matching the theme

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      currentRef.clientWidth / currentRef.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 26; // Moved camera back for better view

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
    currentRef.appendChild(renderer.domElement);

    // Orbit controls for mouse interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Disable zoom
    controls.enablePan = false; // Disable panning for more integration

    // Define categories and skills (Only technical skills)
    const skillsData = [
      {
        category: "Programming Languages",
        skills: ["JavaScript", "TypeScript", "C#", "Python", "PHP"],
      },
      {
        category: "Web Technologies",
        skills: ["HTML5", "CSS3", "styled components", "Tailwind CSS"],
      },
      {
        category: "Frameworks & Libraries",
        skills: [
          "React",
          "Vue.js",
          "Node.js",
          "Unity3D",
          "Express.js",
          "jQuery",
        ],
      },
      {
        category: "Development Tools",
        skills: [
          "Git/GitHub",
          "Vite on Vercel",
          "Webpack",
          "API Design",
          "WebSocket",
          "Axios",
          "WordPress",
        ],
      },
      {
        category: "Design Tools",
        skills: [
          "Figma",
          "Lightroom",
          "Photoshop",
          "After Effects",
          "LottieFiles",
          "Premiere Pro",
        ],
      },
    ];

    // Create a 3D shape - Using Dodecahedron (12 faces) instead for fewer vertices to reduce overlap
    const geometry = new THREE.DodecahedronGeometry(10, 0);

    // Create gradient shader material for translucent effect
    const gradientMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color("#3b82f6") }, // Light blue
        color2: { value: new THREE.Color("#8b5cf6") }, // Purple
      },
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec3 vPosition;
        void main() {
          // Create a gradient based on position
          float gradientFactor = (vPosition.y + 10.0) / 20.0;
          vec3 color = mix(color1, color2, gradientFactor);
          gl_FragColor = vec4(color, 0.2); // Very translucent
        }
      `,
      transparent: true,
      wireframe: false,
    });

    // Create the main shape with gradient
    const shape = new THREE.Mesh(geometry, gradientMaterial);
    scene.add(shape);

    // Add wireframe outline
    const wireframeGeometry = new THREE.DodecahedronGeometry(10.05, 0); // Slightly larger to avoid z-fighting
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // Extract positions for skill nodes
    const positions = geometry.attributes.position;
    const verticesMap = new Map();

    // Deduplicate vertices by position (to avoid overlapping labels)
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);

      // Create a key for this vertex position (rounded to reduce duplicates)
      const key = `${Math.round(x * 100) / 100},${Math.round(y * 100) / 100},${
        Math.round(z * 100) / 100
      }`;

      if (!verticesMap.has(key)) {
        verticesMap.set(key, new THREE.Vector3(x, y, z));
      }
    }

    // Convert map to array
    const vertices = Array.from(verticesMap.values());

    // Prepare skill list (flattened)
    const allSkills = skillsData.flatMap((category) =>
      category.skills.map((skill) => ({
        category: category.category,
        name: skill,
      }))
    );

    // Limit skills to match vertex count
    const skillsToShow = allSkills.slice(0, vertices.length);

    // Create skill vertex nodes
    skillsToShow.forEach((skill, index) => {
      if (index < vertices.length) {
        // Create sphere at vertex
        const nodeMaterial = new THREE.MeshBasicMaterial({
          color: getCategoryColor(skill.category),
        });
        const nodeGeometry = new THREE.SphereGeometry(0.4, 16, 16);
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);

        // Position at vertex
        node.position.copy(vertices[index]);
        scene.add(node);

        // Create a text sprite for the skill name
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = 256;
        canvas.height = 128;

        // Get the vertex color for this skill
        const skillColor = getCategoryColor(skill.category);
        // Convert hex to RGB for canvas
        const r = (skillColor >> 16) & 255;
        const g = (skillColor >> 8) & 255;
        const b = skillColor & 255;

        // Draw rounded rectangle background
        context.fillStyle = "rgba(20, 30, 50, 0.7)"; // Semi-transparent dark background
        context.beginPath();
        const radius = 20; // Border radius
        const width = canvas.width;
        const height = canvas.height;
        context.moveTo(radius, 0);
        context.lineTo(width - radius, 0);
        context.quadraticCurveTo(width, 0, width, radius);
        context.lineTo(width, height - radius);
        context.quadraticCurveTo(width, height, width - radius, height);
        context.lineTo(radius, height);
        context.quadraticCurveTo(0, height, 0, height - radius);
        context.lineTo(0, radius);
        context.quadraticCurveTo(0, 0, radius, 0);
        context.closePath();
        context.fill();

        // Add a colored border matching the node color
        context.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
        context.lineWidth = 6;
        context.stroke();

        // Add a small colored indicator
        const indicatorSize = 14;
        context.fillStyle = `rgb(${r}, ${g}, ${b})`;
        context.beginPath();
        context.arc(25, height / 2, indicatorSize, 0, Math.PI * 2);
        context.fill();

        // Draw text with slight offset to account for indicator
        context.fillStyle = "#ffffff";
        context.font = "Bold 24px Arial";
        context.textAlign = "center";
        context.fillText(
          skill.name,
          canvas.width / 2 + 10,
          canvas.height / 2 + 8
        );

        // Create texture and sprite
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
        });
        const sprite = new THREE.Sprite(spriteMaterial);

        // Position sprite at a distance from vertex to avoid overlap
        // Use the normalized direction of the vertex and multiply by a larger factor
        const spritePos = vertices[index]
          .clone()
          .normalize()
          .multiplyScalar(15);
        sprite.position.copy(spritePos);

        // Scale based on distance to avoid perspective issues
        sprite.scale.set(4, 2, 1);

        scene.add(sprite);
      }
    });

    // Helper function to get color based on category
    function getCategoryColor(category) {
      const colorMap = {
        "Programming Languages": 0xff4d4d, // Red
        "Web Technologies": 0x4dff4d, // Green
        "Frameworks & Libraries": 0x4d4dff, // Blue
        "Development Tools": 0xffff4d, // Yellow
        "Design Tools": 0xff4dff, // Pink
      };

      return colorMap[category] || 0xffffff;
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(25, 50, 25);
    scene.add(pointLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update controls
      controls.update();

      // Slow rotation when not interacting
      if (!controls.enabled) {
        shape.rotation.x += 0.001;
        shape.rotation.y += 0.002;
        wireframe.rotation.x += 0.001;
        wireframe.rotation.y += 0.002;
      } else {
        // Keep wireframe and shape rotations in sync
        wireframe.rotation.copy(shape.rotation);
      }

      // Update shader uniforms with time for dynamic color effect (optional)
      const time = Date.now() * 0.0005;
      gradientMaterial.uniforms.color1.value.setHSL(
        0.54,
        0.7,
        0.5 + Math.sin(time) * 0.1
      );
      gradientMaterial.uniforms.color2.value.setHSL(
        0.7,
        0.7,
        0.5 + Math.cos(time) * 0.1
      );

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (currentRef) {
        camera.aspect = currentRef.clientWidth / currentRef.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentRef.clientWidth, currentRef.clientHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      if (currentRef && renderer.domElement) {
        currentRef.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section id="skills" className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-blue-900/30 p-3 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-blue-300">
            Skills & Technologies
          </h2>
        </div>
        <p className="text-slate-400 max-w-3xl mb-6">
          A diverse set of technical skills developed over 10 years of
          professional experience, with expertise in front-end development,
          interactive visualization, and creative tools.
        </p>
      </motion.div>

      {/* 3D Technical Skills Visualization */}

      {/* Main skills container - Two column layout for larger screens */}
      {/* Main skills container - Two column layout for larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - 3D Technical Skills Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <div
            ref={mountRef}
            className="w-full h-[400px] sm:h-[650px] lg:h-[700px] rounded-lg"
          />
        </motion.div>

        {/* Right Column - Technical Skills, Languages and Additional Skills combined */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1"
        >
          <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-lg p-6 border border-blue-900/50 overflow-hidden h-full">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full -ml-12 -mb-12 blur-xl"></div>

            {/* Technical Skills Section */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-300">
                  Technical Skills
                </h3>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">❖</span>
                  <div>
                    <span className="font-bold text-red-400">
                      Programming Languages:
                    </span>
                    <span className="text-slate-300">
                      {" "}
                      JavaScript, TypeScript, C#, Python, PHP
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">❖</span>
                  <div>
                    <span className="font-bold text-green-400">
                      Web Technologies:
                    </span>
                    <span className="text-slate-300">
                      {" "}
                      HTML5, CSS3, styled-components, Tailwind CSS, Canvas API
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">❖</span>
                  <div>
                    <span className="font-bold text-blue-400">
                      Frameworks & Libraries:
                    </span>
                    <span className="text-slate-300">
                      {" "}
                      React, Vue.js, Express.js, Lottie, Three.js, jQuery
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">❖</span>
                  <div>
                    <span className="font-bold text-purple-400">
                      Platforms & Runtimes:
                    </span>
                    <span className="text-slate-300">
                      {" "}
                      Node.js, WordPress, Unity3D
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-300 mr-2">❖</span>
                  <div>
                    <span className="font-bold text-yellow-300">
                      Development Tools:
                    </span>
                    <span className="text-slate-300">
                      {" "}
                      Git/GitHub, Vite, Webpack, json-server, Axios, WebSocket,
                      API Design
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2">❖</span>
                  <div>
                    <span className="font-bold text-orange-400">
                      Deployment Platforms:
                    </span>
                    <span className="text-slate-300">
                      {" "}
                      Vercel, Netlify, Microsoft IIS, Heroku
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">❖</span>
                  <div>
                    <span className="font-bold text-pink-400">
                      Design Tools:
                    </span>
                    <span className="text-slate-300">
                      {" "}
                      Figma, Lightroom, Photoshop, After Effects, LottieFiles,
                      Premiere Pro
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Languages Section */}
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-300">Languages</h3>
              </div>

              {/* Languages grid - responsive layout */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {languages.map((lang, index) => (
                  <LanguageCard
                    key={index}
                    language={lang.language}
                    level={lang.level}
                    certification={lang.certification}
                  />
                ))}
              </div>
            </div>

            {/* Additional Skills Section - Compact version */}
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-300">
                  Additional Skills
                </h3>
              </div>
              <div className="text-slate-300 flex flex-wrap gap-2">
                {additionalSkills.map((skill, index) => {
                  // Extract just the skill name (before the colon)
                  const skillName = skill.split(":")[0];
                  return (
                    <React.Fragment key={index}>
                      <span className="inline-block bg-slate-700/50 px-3 py-1 rounded-full text-sm">
                        {skillName}
                      </span>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
