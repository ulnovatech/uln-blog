// src/components/optimizer/ArticleList.jsx
import { useEffect, useState } from "react";
import { fetchArticles } from "../../utils/optimizerApi";

export default function ArticleList({ onSelect }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);

  return (
    <div>
      <h2 className="font-bold text-lg mb-2">All Articles</h2>
      <ul className="space-y-2">
        {articles.map(article => (
          <li
            key={article.slug}
            className="p-2 border rounded cursor-pointer hover:bg-gray-100"
            onClick={() => onSelect(article)}
          >
            <div className="font-semibold">{article.title}</div>
            <div className="text-sm text-gray-500">{article.slug}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
