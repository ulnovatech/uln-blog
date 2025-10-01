import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import BlogCard from "../components/blog/BlogCard";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const { posts, loading } = useContext(BlogContext);
  const featuredPosts = posts.slice(0, 3);

  if (loading) return <p className="text-center mt-10 text-gray-600 text-lg">Loading...</p>;

  return (
    <>
      <Helmet>
        <title>ULN Blog - Latest Tech Insights</title>
        <meta name="description" content="Welcome to ULN Blog: Latest insights, tutorials, and stories from our tech team." />
      </Helmet>
      <div className="home-page container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Welcome to ULN Blog</h1>
        <p className="text-lg mb-8 text-gray-600">Latest insights, tutorials, and stories from our tech team.</p>
        <Link to="/blog" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition mb-12">Read the Blog</Link>
        
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">Featured Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPosts.map(post => (
            <BlogCard key={post.slug} slug={post.slug} frontmatter={post.frontmatter} />
          ))}
        </div>
      </div>
    </>
  );
}
