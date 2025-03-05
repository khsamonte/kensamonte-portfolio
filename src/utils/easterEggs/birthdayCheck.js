/**
 * Checks if today is the specified birthday
 * @param {number} month - Month (1-12)
 * @param {number} day - Day (1-31)
 * @returns {boolean} - Whether today is the birthday
 */
export const isBirthday = (month, day) => {
  const today = new Date();
  return today.getMonth() + 1 === month && today.getDate() === day;
};

/**
 * Creates a birthday message that appears when the page loads
 * @param {string} name - The name to display in the message
 * @param {number} month - Birth month (1-12)
 * @param {number} day - Birth day (1-31)
 */
export const checkBirthday = (name, month, day) => {
  // Check if today is the birthday
  if (isBirthday(month, day)) {
    // Create container
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "0";
    container.style.left = "0";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.zIndex = "9999";
    container.style.opacity = "0";
    container.style.transition = "opacity 1s ease";

    // Create message
    const message = document.createElement("div");
    message.style.textAlign = "center";
    message.style.padding = "2rem";
    message.style.backgroundColor = "#1e293b"; // slate-800
    message.style.borderRadius = "1rem";
    message.style.boxShadow = "0 0 30px rgba(59, 130, 246, 0.5)"; // blue glow
    message.style.border = "2px solid #3b82f6"; // blue-500
    message.style.maxWidth = "90%";
    message.style.transform = "scale(0.9)";
    message.style.transition = "transform 0.5s ease";

    // Message content
    message.innerHTML = `
      <h1 style="font-size: 2.5rem; font-weight: bold; color: #60a5fa; margin-bottom: 1rem;">Happy Birthday, ${name}! 🎂</h1>
      <p style="font-size: 1.25rem; color: white; margin-bottom: 2rem;">Today is your special day! May your code be bug-free and your deployments smooth.</p>
      <button id="birthday-close-btn" style="padding: 0.75rem 1.5rem; background-color: #3b82f6; color: white; border: none; border-radius: 0.5rem; font-size: 1rem; cursor: pointer; transition: background-color 0.3s;">Thank You!</button>
    `;

    // Add message to container
    container.appendChild(message);

    // Add container to body
    document.body.appendChild(container);

    // Show container after a short delay
    setTimeout(() => {
      container.style.opacity = "1";
      message.style.transform = "scale(1)";
    }, 500);

    // Add event listener to close button
    setTimeout(() => {
      const closeButton = document.getElementById("birthday-close-btn");
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          container.style.opacity = "0";
          setTimeout(() => {
            document.body.removeChild(container);
          }, 1000);
        });
      }
    }, 100);
  }
};
