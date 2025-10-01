import { useContext } from "react";
import { BlogContext } from "../../context/BlogContext";
import BlogCard from "./BlogCard";

export default function RelatedPosts({ currentSlug, tags }) {
  const { posts } = useContext(BlogContext);
  const related = posts
    .filter(post => post.slug !== currentSlug && tags.some(tag => post.tags?.includes(tag)))
    .slice(0, 3);

  if (!related.length) return null;

  return (
    <div className="related-posts">
      <h3>Related Posts</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {related.map(post => (
          <BlogCard key={post.slug} slug={post.slug} frontmatter={post} />
        ))}
      </div>
    </div>
  );
}