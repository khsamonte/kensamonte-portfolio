import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Terminal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "system", content: "Welcome to Ken's Portfolio Terminal" },
    { type: "system", content: "Type 'help' for available commands" },
  ]);

  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Terminal commands
  const executeCommand = (cmd) => {
    // Add command to history
    setHistory((prev) => [...prev, { type: "command", content: cmd }]);

    // Process command
    const lcCmd = cmd.toLowerCase().trim();

    if (lcCmd === "help") {
      setHistory((prev) => [
        ...prev,
        {
          type: "response",
          content: `Available commands:
- help: Show this help message
- about: Learn about Ken
- skills: List technical skills
- clear: Clear terminal
- projects: List featured projects
- contact: Contact information
- exit: Close terminal

Secret commands:
- There might be some hidden commands... try to discover them!`,
        },
      ]);
    } else if (lcCmd === "about") {
      setHistory((prev) => [
        ...prev,
        {
          type: "response",
          content:
            "Ken Samonte is a front-end developer with 10 years of experience building websites and applications, including 5 years in a product development environment. Currently preparing for the JLPT N3 in Japanese.",
        },
      ]);
    } else if (lcCmd === "skills") {
      setHistory((prev) => [
        ...prev,
        {
          type: "response",
          content: `Technical Skills:
• JavaScript, TypeScript, React, Vue.js
• HTML5, CSS3, Tailwind CSS
• Unity3D, C#
• After Effects, Figma
• API Design, WebSocket`,
        },
      ]);
    } else if (lcCmd === "projects") {
      setHistory((prev) => [
        ...prev,
        {
          type: "response",
          content: `Featured Projects:
• Cryptocurrency Price Widget
• Football Match Tracker
• Sports Content Center
• Design System (100+ Components)
• Parking Reservation System`,
        },
      ]);
    } else if (lcCmd === "contact") {
      setHistory((prev) => [
        ...prev,
        {
          type: "response",
          content: `Contact Information:
• Email: ken@kensamonte.com
• Location: Quezon City, Philippines
• LinkedIn: linkedin.com/in/kensamonte/`,
        },
      ]);
    } else if (lcCmd === "clear") {
      setHistory([{ type: "system", content: "Terminal cleared" }]);
    } else if (lcCmd === "exit") {
      onClose();
    } else if (lcCmd === "") {
      // Do nothing for empty command
    } else if (lcCmd === "surprise" || lcCmd === "party") {
      setHistory((prev) => [
        ...prev,
        { type: "response", content: "🎉 Surprise activated! Enjoy the show!" },
      ]);

      // Trigger the surprise animation
      window.dispatchEvent(new CustomEvent("surprise-activated"));
    } else if (lcCmd === "matrix") {
      setHistory((prev) => [
        ...prev,
        {
          type: "response",
          content: "Entering the Matrix... Follow the white rabbit.",
        },
      ]);

      // Trigger matrix animation
      window.dispatchEvent(new CustomEvent("matrix-activated"));
    } else {
      setHistory((prev) => [
        ...prev,
        {
          type: "error",
          content: `Command not found: ${cmd}. Type 'help' for available commands.`,
        },
      ]);
    }

    // Clear input
    setInput("");
  };

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      executeCommand(input);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            onClick={onClose}
          />

          {/* Terminal window */}
          <motion.div
            className="relative bg-slate-900 border border-blue-500 rounded-lg w-full max-w-2xl shadow-lg overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            {/* Terminal header */}
            <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-slate-400 text-sm font-mono">
                Ken's Portfolio Terminal
              </div>
              <button
                className="text-slate-400 hover:text-white cursor-pointer"
                onClick={onClose}
              >
                ×
              </button>
            </div>

            {/* Terminal content */}
            <div
              ref={terminalRef}
              className="h-96 overflow-auto p-4 font-mono text-sm"
            >
              {history.map((entry, index) => (
                <div
                  key={index}
                  className={`mb-1 ${
                    entry.type === "command"
                      ? "text-blue-300"
                      : entry.type === "error"
                      ? "text-red-400"
                      : entry.type === "system"
                      ? "text-purple-400"
                      : "text-white"
                  }`}
                >
                  {entry.type === "command" ? (
                    <span>
                      <span className="text-green-400">$ </span>
                      {entry.content}
                    </span>
                  ) : (
                    <span className="whitespace-pre-line">{entry.content}</span>
                  )}
                </div>
              ))}

              {/* Input prompt */}
              <div className="flex items-center">
                <span className="text-green-400 mr-2">$ </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-grow bg-transparent outline-none text-white caret-blue-400"
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Terminal;
