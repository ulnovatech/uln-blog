import { createContext, useState, useEffect } from "react";
import matter from "front-matter";

export const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const files = import.meta.glob("../../content/posts/*.md", { as: "raw" });
      const loaded = [];

      for (const path in files) {
        const raw = await files[path]();
        const { attributes: frontmatter, body } = matter(raw);
        const slug = path.split("/").pop().replace(".md", "");

        const tags = frontmatter.tags
          ? typeof frontmatter.tags === "string"
            ? frontmatter.tags.split(",").map(tag => tag.trim())
            : Array.isArray(frontmatter.tags)
              ? frontmatter.tags.map(tag => tag.trim())
              : []
          : [];

        loaded.push({
          slug,
          frontmatter: {
            title: frontmatter.title || "Untitled",
            description: frontmatter.description || "No description available",
            date: frontmatter.date || "",
            author: frontmatter.author || "ULN Team",
            tags,
          },
          content: body,
        });
      }

      loaded.sort((a, b) => {
        const dateA = a.frontmatter.date ? new Date(a.frontmatter.date) : new Date(0);
        const dateB = b.frontmatter.date ? new Date(b.frontmatter.date) : new Date(0);
        return dateB - dateA;
      });

      setPosts(loaded);
      setLoading(false);
    }
    loadPosts();
  }, []);

  return (
    <BlogContext.Provider value={{ posts, loading }}>
      {children}
    </BlogContext.Provider>
  );
}



// import { createContext, useState, useEffect } from "react";
// import loadPosts from "../utils/markdownLoader";

// export const BlogContext = createContext();

// export function BlogProvider({ children }) {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchPosts() {
//       const loadedPosts = await loadPosts();
//       setPosts(loadedPosts);
//       setLoading(false);
//     }
//     fetchPosts();
//   }, []);

//   return (
//     <BlogContext.Provider value={{ posts, loading }}>
//       {children}
//     </BlogContext.Provider>
//   );
// }
