import React from "react";
import { useEffect, useState } from "react";

const ThemedSpinner = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotation((prev) => (prev + 15) % 360);
    }, 50);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full min-h-32">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <svg
            className="w-16 h-16 text-gray-200 animate-pulse dark:text-gray-700"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
          <svg
            className="absolute top-0 left-0 w-16 h-16 text-blue-600 dark:text-blue-400"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <path
              d="M50 10 A40 40 0 0 1 90 50"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
        </div>
        {/* <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
          Loading...
        </p> */}
      </div>
    </div>
  );
};

export default ThemedSpinner;
