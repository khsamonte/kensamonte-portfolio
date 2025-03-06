/**
 * Utility functions for loading and processing markdown files
 */

/**
 * Loads a markdown file from the public directory
 * @param {string} path - Path to the markdown file relative to the public directory
 * @returns {Promise<string>} - Promise that resolves with the markdown content
 */
export const loadMarkdownFile = async (path) => {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load markdown file: ${path}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Error loading markdown file:", error);
    return "";
  }
};

/**
 * Extracts metadata and content from a markdown file with frontmatter
 * Frontmatter should be in the format:
 * ---
 * title: Title of the story
 * date: YYYY-MM-DD
 * excerpt: Short excerpt
 * synopsis: Brief synopsis
 * cover: /path/to/cover-image.jpg
 * color: #hexcolor
 * ---
 *
 * @param {string} markdown - Markdown content with frontmatter
 * @returns {Object} - Object containing metadata and content
 */
export const parseMarkdownWithFrontmatter = (markdown) => {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return {
      metadata: {},
      content: markdown,
    };
  }

  const [, frontmatterStr, content] = match;
  const metadata = {};

  // Parse frontmatter into key-value pairs
  frontmatterStr.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length) {
      const value = valueParts.join(":").trim();
      metadata[key.trim()] = value;
    }
  });

  return {
    metadata,
    content: content.trim(),
  };
};
