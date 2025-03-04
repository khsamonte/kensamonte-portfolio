import React from "react";
import { motion } from "framer-motion";

const SkillCategory = ({ title, skills }) => {
  return (
    <motion.div
      className="bg-slate-800/50 rounded-lg p-6 border border-slate-700"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold text-blue-300 mb-4">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="bg-slate-700 rounded-lg p-3 text-center text-white hover:bg-blue-900/50 hover:border-blue-400 border border-transparent transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

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
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["JavaScript", "TypeScript", "C#", "Python", "PHP"],
    },
    {
      title: "Web Technologies",
      skills: [
        "HTML5",
        "CSS3",
        "styled-components",
        "Tailwind CSS",
        "Vite",
        "SASS/SCSS",
      ],
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        "React",
        "Vue.js",
        "Node.js",
        "Unity3D",
        "Express.js",
        "jQuery",
        "Highcharts",
        "Lottie",
      ],
    },
    {
      title: "Development Tools",
      skills: [
        "Git",
        "Webpack",
        "Vite",
        "API Design",
        "json-server",
        "WebSocket",
        "Axios",
        "WordPress",
        "IIS",
      ],
    },
    {
      title: "Design Tools",
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

  const additionalSkills = [
    "Video Editing: Familiar with the basics of Premiere Pro for video content creation.",
    "Content Writing: Experienced in writing SEO-optimized web content and news articles.",
    "Technical Writing: Proficient in creating detailed documentation for internal developer processes.",
    "Animation Integration: Experienced in designing 2D animations and integrating them into the web.",
    "Music Production: Knowledgeable in writing lyrics, producing music, and audio mixing and mastering.",
  ];

  return (
    <section id="skills" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-blue-300">
          Skills & Expertise
        </h2>
        <p className="text-slate-400 max-w-3xl mb-12">
          A diverse set of technical skills developed over 10 years of
          professional experience, with expertise in frontend development,
          interactive visualization, and creative tools.
        </p>
      </motion.div>

      <div className="space-y-8">
        {/* Technical Skills */}
        <div className="space-y-6">
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={index}
              title={category.title}
              skills={category.skills}
            />
          ))}
        </div>

        {/* Languages */}
        <motion.div
          className="bg-slate-800/50 rounded-lg p-6 border border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-blue-300 mb-4">Languages</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {languages.map((lang, index) => (
              <LanguageCard
                key={index}
                language={lang.language}
                level={lang.level}
                certification={lang.certification}
              />
            ))}
          </div>
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          className="bg-slate-800/50 rounded-lg p-6 border border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-blue-300 mb-4">
            Additional Skills
          </h3>
          <ul className="space-y-3">
            {additionalSkills.map((skill, index) => (
              <li key={index} className="text-slate-300 flex items-start">
                <span className="text-blue-400 mr-2">•</span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
