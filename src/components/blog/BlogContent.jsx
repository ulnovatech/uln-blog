import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function BlogContent({ post }) {
  if (!post) return null;

  const { body } = post;

  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-800">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-medium mt-5 mb-2 text-gray-800">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4">{children}</ol>
          ),
          li: ({ children }) => <li className="mb-2">{children}</li>,
          code: ({ node, inline, className, children, ...props }) =>
            inline ? (
              <code
                className="bg-gray-100 px-1 py-0.5 rounded text-sm text-gray-800"
                {...props}
              >
                {children}
              </code>
            ) : (
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm text-gray-800">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ),
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt}
              className="w-full h-auto rounded-lg my-6 shadow-md"
            />
          ),
          a: ({ href, children }) => (
            <a href={href} className="text-blue-600 hover:underline">
              {children}
            </a>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}


// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import "./blog.css";

// export default function BlogContent({ post }) {
//   return (
//     <div className="blog-content">
//       <h1>{post.frontmatter.title}</h1>
//       <p className="blog-meta">{post.frontmatter.description}</p>
//       <small>{post.frontmatter.date}</small>
//       <hr />
//       <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
//     </div>
//   );
// }
