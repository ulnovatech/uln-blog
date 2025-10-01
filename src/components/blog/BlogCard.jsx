import { Link } from "react-router-dom";

export default function BlogCard({ slug, frontmatter }) {
  const { title = "Untitled", description = "No description", date = "", image = "/uploads/default.jpg" } = frontmatter;
  // Format date safely
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No date";
  return (
    <Link to={`/blog/${slug}`} className="block">
      <div className="card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600 mb-4">{description}</p>
          <p className="text-sm text-gray-500">
            {formattedDate} • By ULN Team
          </p>
        </div>
      </div>
    </Link>
  );
}