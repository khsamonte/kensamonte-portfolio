import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { motion, AnimatePresence } from "framer-motion";
import { trackSkillInteraction } from "../utils/analytics";

// LanguageCard component
const LanguageCard = ({ language, level, certification = null }) => {
  let proficiencyWidth;

  switch (level) {
    case "N":
      proficiencyWidth = "100%";
      break;
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
    <div className="bg-slate-800/80 rounded-lg p-4 border border-slate-700 hover:border-blue-500/30 transition-colors">
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

// Skill Badge component for the new design
const SkillBadge = ({ name, color, icon, category, onClick, isActive }) => {
  return (
    <motion.div
      className={`px-3 py-2 rounded-lg cursor-pointer border transition-all ${
        isActive
          ? "border-" + color + "-500 bg-" + color + "-500/10"
          : "border-slate-700 bg-slate-800/60 hover:bg-slate-700/40"
      }`}
      whileHover={{ y: -3, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
      whileTap={{ y: -1 }}
      onClick={() => onClick(name, category)}
    >
      <div className="flex items-center space-x-2">
        {icon && <span className={`text-${color}-400`}>{icon}</span>}
        <span
          className={`text-sm font-medium ${
            isActive ? "text-" + color + "-400" : "text-slate-300"
          }`}
        >
          {name}
        </span>
      </div>
    </motion.div>
  );
};

// Skill category card component
const SkillCategoryCard = ({
  category,
  icon,
  color,
  skills,
  isSelected,
  onSelect,
}) => {
  return (
    <motion.div
      className={`rounded-xl overflow-hidden transition-all duration-0 cursor-pointer ${
        isSelected
          ? "border-2 border-" +
            color +
            "-500 bg-gradient-to-br from-slate-800 to-slate-900"
          : "border border-slate-700 bg-slate-800/40 hover:bg-slate-800/70"
      }`}
      // whileHover={{ y: -5 }}
      // whileTap={{ y: -2 }}
      onClick={() => onSelect(category)}
      layout
    >
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-lg mr-3 bg-${color}-500/20`}
          >
            <span className={`text-${color}-400 text-xl`}>{icon}</span>
          </div>
          <h3 className="text-lg font-bold text-white">{category}</h3>
        </div>

        {isSelected ? (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  className={`px-3 py-1 bg-${color}-500/10 text-${color}-400 rounded text-sm border border-${color}-500/30`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-slate-400 text-sm line-clamp-1">
            {skills.slice(0, 3).join(", ")}{" "}
            {skills.length > 3 && `+${skills.length - 3} more`}
          </p>
        )}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const mountRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeView, setActiveView] = useState("categories"); // "categories", "all-skills", "languages"

  // Define skill categories
  const skillCategories = [
    {
      id: "programming",
      category: "Programming Languages",
      color: "red",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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
      ),
      skills: ["JavaScript", "TypeScript", "C#", "Python", "PHP"],
    },
    {
      id: "web",
      category: "Web Technologies",
      color: "green",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
      skills: [
        "HTML5",
        "CSS3",
        "styled-components",
        "Tailwind CSS",
        "Canvas API",
      ],
    },
    {
      id: "frameworks",
      category: "Frameworks & Libraries",
      color: "blue",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      skills: [
        "React",
        "Vue.js",
        "Lottie",
        "Three.js",
        "jQuery",
        "Express.js",
        "framer-motion",
      ],
    },
    {
      id: "platforms",
      category: "Platforms & Runtimes",
      color: "purple",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M8 16h.01"
          />
        </svg>
      ),
      skills: ["Node.js", "WordPress", "Unity3D"],
    },
    {
      id: "devtools",
      category: "Development Tools",
      color: "yellow",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
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
      ),
      skills: [
        "Git/GitHub",
        "Vite",
        "Webpack",
        "json-server",
        "Axios",
        "WebSocket",
        "API Design",
      ],
    },
    {
      id: "deployment",
      category: "Deployment Platforms",
      color: "orange",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"
          />
        </svg>
      ),
      skills: ["Vercel", "Netlify", "Microsoft IIS", "Heroku"],
    },
    {
      id: "design",
      category: "Design Tools",
      color: "pink",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      ),
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

  // Additional skills
  const additionalSkills = [
    "Video Editing",
    "Content Writing",
    "Technical Writing",
    "Animation Integration",
    "Music Production",
  ];

  // Languages data
  const languages = [
    {
      language: "Tagalog",
      level: "N",
      certification: "Native Proficiency",
    },
    {
      language: "English",
      level: "C2",
      certification: "Bilingual Proficiency",
    },
    {
      language: "Japanese",
      level: "B1-",
      certification: "JLPT N4 Passer (July 2024)",
    },
  ];

  // 3D sphere setup
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
    const allSkills = skillCategories.flatMap((category) =>
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

        // Add click detection
        node.userData = { skillName: skill.name };
        node.callback = () => {
          trackSkillInteraction(skill.name);
        };

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
        "Platforms & Runtimes": 0xb04dff, // Purple
        "Deployment Platforms": 0xff8c4d, // Orange
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

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleSkillClick = (event) => {
      // Calculate mouse position in normalized device coordinates
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Cast ray from camera through mouse position
      raycaster.setFromCamera(mouse, camera);

      // Check for intersections with skill nodes
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        if (clickedObject.userData && clickedObject.userData.skillName) {
          trackSkillInteraction(clickedObject.userData.skillName);
        }
      }
    };

    renderer.domElement.addEventListener("click", handleSkillClick);

    // Clean up
    return () => {
      renderer.domElement.removeEventListener("click", handleSkillClick);
      window.removeEventListener("resize", handleResize);
      if (currentRef && renderer.domElement) {
        currentRef.removeChild(renderer.domElement);
      }
    };
  }, []);

  // View tab effects
  const handleTabChange = (tab) => {
    setActiveView(tab);
    setSelectedCategory(null);
  };

  // Get all skills flattened as badges
  const getAllSkillBadges = () => {
    // Flatten all skills
    const allSkills = skillCategories.flatMap((category) =>
      category.skills.map((skill) => ({
        name: skill,
        category: category.category,
        color: category.color,
        icon: null,
      }))
    );

    return allSkills;
  };

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

      {/* Main layout container */}
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

        {/* Right Column - Revamped Skills Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl p-6 border border-blue-900/50 overflow-hidden h-full">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full -ml-12 -mb-12 blur-xl"></div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 bg-slate-900/70 p-1 rounded-lg">
              <motion.button
                className={`flex-1 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${
                  activeView === "categories"
                    ? "bg-blue-600 text-white"
                    : "bg-transparent text-slate-400 hover:text-slate-300"
                }`}
                onClick={() => handleTabChange("categories")}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                Skill Categories
              </motion.button>
              <motion.button
                className={`flex-1 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${
                  activeView === "all-skills"
                    ? "bg-blue-600 text-white"
                    : "bg-transparent text-slate-400 hover:text-slate-300"
                }`}
                onClick={() => handleTabChange("all-skills")}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                All Skills
              </motion.button>
              <motion.button
                className={`flex-1 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${
                  activeView === "languages"
                    ? "bg-blue-600 text-white"
                    : "bg-transparent text-slate-400 hover:text-slate-300"
                }`}
                onClick={() => handleTabChange("languages")}
                whileHover={{ y: -1 }}
                whileTap={{ y: 0 }}
              >
                Languages
              </motion.button>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {/* Categories View */}
              {activeView === "categories" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  key="categories-view"
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skillCategories.map((category) => (
                      <SkillCategoryCard
                        key={category.id}
                        category={category.category}
                        icon={category.icon}
                        color={category.color}
                        skills={category.skills}
                        isSelected={selectedCategory === category.category}
                        onSelect={setSelectedCategory}
                      />
                    ))}
                  </div>

                  {/* Additional Skills Section */}
                  <div className="mt-6">
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
                      <h3 className="text-lg font-bold text-blue-300">
                        Additional Skills
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {additionalSkills.map((skill, index) => (
                        <motion.span
                          key={index}
                          className="inline-block bg-slate-700/50 text-slate-300 px-3 py-1 rounded-full text-sm border border-slate-600 hover:border-blue-500/30 hover:bg-slate-700/80 transition-colors"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ y: -2 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* All Skills View */}
              {activeView === "all-skills" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  key="all-skills-view"
                >
                  {/* Search/Filter */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {skillCategories.map((category) => (
                        <motion.button
                          key={category.id}
                          className={`px-3 py-1 rounded-full text-sm ${
                            selectedCategory === category.category
                              ? `bg-${category.color}-500/20 text-${category.color}-400 border border-${category.color}-500/30`
                              : "bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600 cursor-pointer"
                          }`}
                          onClick={() =>
                            setSelectedCategory(
                              selectedCategory === category.category
                                ? null
                                : category.category
                            )
                          }
                          whileHover={{ y: -2 }}
                          whileTap={{ y: 0 }}
                        >
                          {category.category}
                        </motion.button>
                      ))}
                      {selectedCategory && (
                        <motion.button
                          className="px-3 py-1 rounded-full text-sm bg-slate-800 text-slate-400 border border-slate-700 cursor-pointer"
                          onClick={() => setSelectedCategory(null)}
                          whileHover={{ y: -2 }}
                          whileTap={{ y: 0 }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          Clear Filter
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="flex flex-wrap gap-2">
                    {getAllSkillBadges()
                      .filter(
                        (skill) =>
                          !selectedCategory ||
                          skill.category === selectedCategory
                      )
                      .map((skill, index) => {
                        // Find the category object for this skill to get the icon
                        const category = skillCategories.find(
                          (cat) => cat.category === skill.category
                        );
                        return (
                          <SkillBadge
                            key={skill.name}
                            name={skill.name}
                            color={skill.color || category?.color || "blue"}
                            icon={category?.icon}
                            category={skill.category}
                            onClick={(name, cat) =>
                              setSelectedSkill(
                                selectedSkill === name ? null : name
                              )
                            }
                            isActive={selectedSkill === skill.name}
                          />
                        );
                      })}
                  </div>
                </motion.div>
              )}

              {/* Languages View */}
              {activeView === "languages" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  key="languages-view"
                >
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
                    <h3 className="text-xl font-bold text-blue-300">
                      Languages
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {languages.map((lang, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <LanguageCard
                          language={lang.language}
                          level={lang.level}
                          certification={lang.certification}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Language Proficiency Legend */}
                  <div className="mt-8 p-4 bg-slate-800/60 rounded-lg border border-slate-700">
                    <h4 className="text-sm font-medium text-blue-300 mb-3">
                      Proficiency Legend
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-700 mr-2"></div>
                        <span className="text-slate-300">N: Native</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                        <span className="text-slate-300">C2: Fluent</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-slate-300">C1: Advanced</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                        <span className="text-slate-300">
                          B2: Upper Intermediate
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-300 mr-2"></div>
                        <span className="text-slate-300">B1: Intermediate</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-200 mr-2"></div>
                        <span className="text-slate-300">A2: Basic</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-100 mr-2"></div>
                        <span className="text-slate-300">A1: Elementary</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
