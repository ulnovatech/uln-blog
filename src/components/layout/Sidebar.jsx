import { Link } from "react-router-dom";  // Already imported in your code
import { useContext } from "react";
import { BlogContext } from "../../context/BlogContext";

export default function Sidebar() {
  const { posts } = useContext(BlogContext);
  const tags = [...new Set(posts.flatMap(post => post.tags || []))].slice(0, 10);

  return (
    <aside className="hidden lg:block w-64 bg-gray-100 border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Explore</h2>
      <ul className="space-y-3">
        <li><Link className="hover:text-primary" to="/">🏠 Home</Link></li>
        <li>
          <Link 
            to="/admin"  // Relative path: Works on any port (e.g., 5173/admin)
            className="hover:text-primary"
            target="_blank"  // Opens in new tab if needed
            rel="noopener noreferrer"
          >
            Edit Blogs
          </Link>
        </li>
        <li><Link className="hover:text-primary" to="/about">ℹ️ About</Link></li>
        <li><Link className="hover:text-primary" to="/contact">📞 Contact</Link></li>
      </ul>
      <h2 className="text-lg font-semibold mt-8 mb-4">Popular Tags</h2>
      <ul className="space-y-2">
        {tags.map(tag => (
          <li key={tag}>
            <Link to={`/tags/${tag}`} className="hover:text-primary">#{tag}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}


// import { Link } from "react-router-dom";

// export default function Sidebar() {
//   return (
//     <aside className="hidden lg:block w-64 bg-gray-100 border-r border-gray-200 p-4">
//       <h2 className="text-lg font-semibold mb-4">Explore</h2>
//       <ul className="space-y-3">
//         <li><Link className="hover:text-blue-600" to="/">🏠 Home</Link></li>
//         <li><Link className="hover:text-blue-600" to="/blog">📰 Blog</Link></li>
//         <li><a className="hover:text-blue-600" href="#">📚 Resources</a></li>
//         <li><a className="hover:text-blue-600" href="#">📞 Contact</a></li>
//       </ul>
//     </aside>
//   );
// }
