import { useEffect, useState } from "react";
import {
  fetchArticleImages,
  uploadImage,
  optimizeArticle,
  renameImage,
} from "../../utils/optimizerApi";

export default function Engine({ article, onLog }) {
  // ✅ Always structured as arrays
  const [images, setImages] = useState({ cover: [], inline: [] });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editingType, setEditingType] = useState(null);

  // 🔹 Load images when article changes
  useEffect(() => {
    if (article) {
      fetchArticleImages(article.slug)
        .then((data) => {
          setImages({
            cover: data.cover || [],
            inline: data.inline || [],
          });
        })
        .catch((err) =>
          onLog(`Error loading images: ${err.message}`, "error")
        );
    }
  }, [article, onLog]);

  // 🔹 Handle Upload
  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const result = await uploadImage(article.slug, file, type);
      setImages({
        cover: result.cover || [],
        inline: result.inline || [],
      });
      onLog(`Uploaded ${file.name} as ${type}`, "success");
    } catch (err) {
      onLog(`Upload failed: ${err.message}`, "error");
    }
  };

  // 🔹 Handle Rename
  const handleRename = async (index, type) => {
    const oldName = images[type][index].name;
    const newName = editValue.trim();

    if (!newName || newName === oldName) {
      setEditingIndex(null);
      setEditingType(null);
      return;
    }

    try {
      const result = await renameImage(article.slug, oldName, newName);
      setImages({
        cover: result.cover || [],
        inline: result.inline || [],
      });
      onLog(`Renamed ${oldName} → ${newName}`, "success");
    } catch (err) {
      onLog(`Failed to rename ${oldName}: ${err.message}`, "error");
    }

    setEditingIndex(null);
    setEditingType(null);
  };

  // 🔹 Optimize All
  const handleOptimize = async () => {
    try {
      const result = await optimizeArticle(article.slug);
      setImages({
        cover: result.cover || [],
        inline: result.inline || [],
      });
      onLog(`Optimized all images for ${article.title}`, "success");
    } catch (err) {
      onLog(`Optimization failed: ${err.message}`, "error");
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow">
      <h2 className="font-bold text-lg mb-4">{article.title}</h2>
      <p className="text-sm text-gray-600 mb-2">Slug: {article.slug}</p>

      {/* 🔹 Upload + Optimize */}
      <div className="flex gap-2 mb-4">
        <label className="px-3 py-2 bg-blue-600 text-white rounded cursor-pointer">
          Upload Cover
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleUpload(e, "cover")}
          />
        </label>
        <label className="px-3 py-2 bg-purple-600 text-white rounded cursor-pointer">
          Upload Inline
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleUpload(e, "inline")}
          />
        </label>
        <button
          onClick={handleOptimize}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Optimize All
        </button>
      </div>

      {/* 🔹 Cover Image */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Cover Image</h3>
        {images.cover.length === 0 ? (
          <p className="text-gray-500">No cover image uploaded.</p>
        ) : (
          images.cover.map((img, index) => (
            <ImageRow
              key={img.name}
              img={img}
              index={index}
              type="cover"
              editingIndex={editingIndex}
              editingType={editingType}
              editValue={editValue}
              setEditValue={setEditValue}
              setEditingIndex={setEditingIndex}
              setEditingType={setEditingType}
              handleRename={handleRename}
            />
          ))
        )}
      </div>

      {/* 🔹 Inline Images */}
      <div>
        <h3 className="font-semibold mb-2">Inline Images</h3>
        {images.inline.length === 0 ? (
          <p className="text-gray-500">No inline images uploaded.</p>
        ) : (
          <ul className="space-y-2">
            {images.inline.map((img, index) => (
              <ImageRow
                key={img.name}
                img={img}
                index={index}
                type="inline"
                editingIndex={editingIndex}
                editingType={editingType}
                editValue={editValue}
                setEditValue={setEditValue}
                setEditingIndex={setEditingIndex}
                setEditingType={setEditingType}
                handleRename={handleRename}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// 🔹 Reusable Image Row Component
function ImageRow({
  img,
  index,
  type,
  editingIndex,
  editingType,
  editValue,
  setEditValue,
  setEditingIndex,
  setEditingType,
  handleRename,
}) {
  const isEditing = editingIndex === index && editingType === type;

  return (
    <li className="flex items-center gap-2">
      <img
        src={img.url}
        alt={img.name}
        className="w-16 h-16 object-cover rounded"
      />
      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={() => handleRename(index, type)}
          onKeyDown={(e) =>
            e.key === "Enter" && handleRename(index, type)
          }
          className="border p-1 rounded"
          autoFocus
        />
      ) : (
        <span
          onDoubleClick={() => {
            setEditingIndex(index);
            setEditingType(type);
            setEditValue(img.name);
          }}
          className="cursor-text"
        >
          {img.name}
        </span>
      )}
    </li>
  );
}
