// src/utils/markdownLoader.js
import matter from "front-matter";

export async function loadPosts() {
  const modules = import.meta.glob("/content/posts/*.md", { as: "raw", eager: true });
  const posts = [];

  for (const [path, raw] of Object.entries(modules)) {
    try {
      const { attributes: frontmatter, body: content } = matter(raw);

      // Handle tags: support YAML lists, comma-separated strings, or default to empty array
      const tags = frontmatter.tags
        ? typeof frontmatter.tags === "string"
          ? frontmatter.tags.split(",").map((tag) => tag.trim())
          : Array.isArray(frontmatter.tags)
            ? frontmatter.tags.map((tag) => tag.trim())
            : []
        : [];

      posts.push({
        ...frontmatter,
        slug: path.match(/\/([^/]+)\.md$/)[1],
        content,
        tags,
      });
    } catch (error) {
      console.error(`Error parsing markdown file ${path}:`, error);
      continue; // Skip invalid files
    }
  }

  // Sort by date descending (newest first)
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}