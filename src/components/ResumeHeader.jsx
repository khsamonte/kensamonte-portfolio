import React, { useState } from "react";
import { motion } from "framer-motion";

const ResumeHeader = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500 opacity-10"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 - 50 + "%",
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: [
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
              ],
              y: [
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
              ],
            }}
            transition={{
              duration: 20 + Math.random() * 30,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: Math.random() * 200 + 50 + "px",
              height: Math.random() * 200 + 50 + "px",
            }}
          />
        ))}
      </div>

      {/* Content container */}
      <motion.div
        className="z-10 text-center p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Ken Samonte
            </motion.span>
          </h1>
        </motion.div>

        <motion.h2
          className="text-2xl text-blue-300 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Frontend Web Developer
        </motion.h2>

        <motion.div
          className="flex justify-center gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium"
            whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
            whileTap={{ scale: 0.95 }}
          >
            View Portfolio
          </motion.button>
          <motion.button
            className="px-6 py-3 bg-transparent border-2 border-blue-400 text-blue-400 rounded-lg font-medium"
            whileHover={{
              scale: 1.05,
              borderColor: "#60a5fa",
              color: "#60a5fa",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Download Resume
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResumeHeader;
