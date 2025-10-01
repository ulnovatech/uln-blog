import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-4xl mb-6">Admin Dashboard</h1>
      <p>
        Use the <Link to="/admin" className="text-primary hover:underline">Decap CMS Editor</Link> to add, edit, or delete blog posts.
      </p>
      <p className="mt-4 text-sm text-gray-600">
        Changes commit to Git and trigger a Netlify rebuild automatically.
      </p>
      <Link to="/blog" className="primary-button mt-4 inline-block">View Blog</Link>
    </div>
  );
}