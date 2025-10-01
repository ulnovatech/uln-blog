import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import BlogContent from "../components/blog/BlogContent";
import RelatedPosts from "../components/blog/RelatedPosts";
import SocialShare from "../components/blog/SocialShare";
import Comments from "../components/blog/Comments";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { formatDate } from "../utils/dateFormatter";

export default function BlogPost() {
  const { slug } = useParams();
  const { posts, loading: postsLoading } = useContext(BlogContext);
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!postsLoading) {
      const found = posts.find(p => p.slug === slug);
      setPost(found || null);
    }
  }, [slug, posts, postsLoading]);

  if (postsLoading) {
    return <p className="text-center mt-10 text-gray-600 text-lg">Loading post...</p>;
  }

  if (!post) {
    return (
      <p className="text-center mt-10 text-red-500 font-semibold text-lg">
        Post not found.
      </p>
    );
  }

  const { frontmatter, content } = post;
  const title = frontmatter?.title || "Untitled Post";
  const description = frontmatter?.description || "";
  const tags = frontmatter?.tags || [];
  const author = frontmatter?.author || "ULN Team";
  const date = frontmatter?.date || "";

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title} – ULN Blog</title>
        <meta name="description" content={description} />
      </Helmet>

      <article className="max-w-3xl mx-auto px-4 py-8">
        {/* Show only meta info; body itself has the title/intro */}
        <p className="text-sm text-gray-500 mb-6">
          {date ? formatDate(date) : ""} • By {author}
        </p>

        <BlogContent post={{ frontmatter, body: content }} />

        <SocialShare title={title} />
        <RelatedPosts currentSlug={slug} tags={tags} />
        <Comments slug={slug} />
      </article>
    </HelmetProvider>
  );
}

