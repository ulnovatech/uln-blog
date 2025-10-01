// src/components/optimizer/ArticleSelector.jsx
export default function ArticleSelector({ articles = [], active, onSelect, running }) {
  return (
    <div>
      <label className="block font-medium text-sm mb-2">Active Article</label>
      <select
        className="w-full border rounded p-2"
        value={active || ""}
        onChange={e => onSelect(e.target.value)}
        disabled={running}
      >
        {articles.length === 0 && <option value="">No articles found</option>}
        {articles.map(a => (
          <option key={a.slug} value={a.slug}>
            {a.title} — {a.slug}
          </option>
        ))}
      </select>

      <div className="mt-4">
        <p className="text-xs text-gray-500">Quick view</p>
        {articles.map(a => a.slug === active && (
          <div key={a.slug} className="mt-3 flex gap-3 items-center">
            <img src={a.cover || "/images/default-cover.jpg"} alt="" className="w-16 h-10 object-cover rounded" />
            <div>
              <div className="font-medium">{a.title}</div>
              <div className="text-xs text-gray-500">{a.date} • {a.author}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
