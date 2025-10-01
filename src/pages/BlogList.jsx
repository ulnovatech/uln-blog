import { useContext, useState, useEffect, useRef } from "react";
import { BlogContext } from "../context/BlogContext";
import BlogCard from "../components/blog/BlogCard";
import SearchBar from "../components/blog/SearchBar";
import { HelmetProvider } from "react-helmet-async";

const POSTS_PER_CHUNK = 6;

export default function BlogList() {
  const { posts, loading } = useContext(BlogContext);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [page, setPage] = useState(1);
  const observerRef = useRef(null);

  // Load initial posts
  useEffect(() => {
    if (!loading && posts.length > 0) {
      setVisiblePosts(posts.slice(0, POSTS_PER_CHUNK));
    }
  }, [loading, posts]);

  // Set up Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && visiblePosts.length < posts.length) {
          setPage((prev) => prev + 1);
          setVisiblePosts((prev) =>
            posts.slice(0, prev.length + POSTS_PER_CHUNK)
          );
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loading, posts, visiblePosts]);

  if (loading) return <p className="text-center mt-10">Loading posts...</p>;

  return (
    <>
      <HelmetProvider>
        <title>ULN Blog - All Posts</title>
        <meta name="description" content="Browse all blog posts on tech topics, insights, and tutorials." />
      </HelmetProvider>
      <div>
        <h1 className="text-4xl mb-6">Blog Posts</h1>
        <SearchBar />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visiblePosts.map((post) => (
            <BlogCard key={post.slug} slug={post.slug} frontmatter={post.frontmatter} />
          ))}
        </div>
        <div ref={observerRef} className="h-10"></div>
      </div>
    </>
  );
}

// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";

// function parseFrontmatter(raw) {
//   const match = raw.match(/^---\n([\s\S]+?)\n---/);
//   let frontmatter = {};
//   let body = raw;
//   if (match) {
//     const yamlText = match[1];
//     frontmatter = Object.fromEntries(
//       yamlText.split("\n").map(line => line.split(": ").map(s => s.trim()))
//     );
//     body = raw.slice(match[0].length);
//   }




//   return { frontmatter, body };


// }

// export default function BlogList() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     async function loadPosts() {
//       const files = import.meta.glob("/content/posts/*.md", { as: "raw" });
//       const loadedPosts = [];

//       for (const path in files) {
//         const raw = await files[path]();
//         const { frontmatter } = parseFrontmatter(raw);
//         const slug = path.split("/").pop().replace(".md", "");
//         loadedPosts.push({ slug, frontmatter });
//       }

//       setPosts(loadedPosts);
//     }

//     loadPosts();
//   }, []);

//   if (!posts.length) return <p>No posts found. Add some in /content/posts.</p>;

//   return (
//     <div>
//       <h1>Blog</h1>
//       <ul>
//         {posts.map(post => (
//           <li key={post.slug}>
//             <Link to={`/blog/${post.slug}`}>
//               <h2>{post.frontmatter.title ?? "Untitled"}</h2>
//               <p>{post.frontmatter.description ?? "No description"}</p>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
