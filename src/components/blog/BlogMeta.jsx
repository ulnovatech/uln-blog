import { formatDate } from "../../utils/dateFormatter";
import { Link } from "react-router-dom";

export default function BlogMeta({ frontmatter }) {
  return (
    <div className="blog-meta">
      <span>{formatDate(frontmatter.date)}</span>
      <span className="mx-2">•</span>
      <span>By {frontmatter.author || "ULN Team"}</span>
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <ul className="tags inline-flex ml-4">
          {frontmatter.tags.map((tag, idx) => (
            <li key={idx} className="mr-2">
              <Link to={`/tags/${tag.trim()}`} className="hover:text-primary">#{tag.trim()}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}



// export default function BlogMeta({ frontmatter }) {
//   return (
//     <div className="blog-meta">
//       <span>{frontmatter.date}</span>
//       {frontmatter.tags && (
//         <ul className="tags">
//           {frontmatter.tags.split(",").map((tag, idx) => (
//             <li key={idx}>#{tag.trim()}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
