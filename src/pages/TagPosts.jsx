import { useContext } from "react";
import { useParams } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";
import BlogCard from "../components/blog/BlogCard";
import { HelmetProvider } from "react-helmet-async";

export default function TagPosts() {
  const { tag } = useParams();
  const { posts } = useContext(BlogContext);
  const filteredPosts = posts.filter(post => (post.tags || []).includes(tag));

  return (
    <>
      <HelmetProvider>
        <title>Posts tagged "{tag}" - ULN Blog</title>
      </HelmetProvider>
      <div>
        <h1 className="text-4xl mb-6">Posts tagged "{tag}"</h1>
        {filteredPosts.length === 0 ? (
          <p>No posts found with this tag.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map(post => (
              <BlogCard key={post.slug} slug={post.slug} frontmatter={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}