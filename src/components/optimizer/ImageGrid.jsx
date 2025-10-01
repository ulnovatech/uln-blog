// src/components/optimizer/ImageGrid.jsx
export default function ImageGrid({ images = [] }) {
  if (!images || images.length === 0) {
    return <p className="text-sm text-gray-500">No images found for this article.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {images.map((img, idx) => (
        <div key={idx} className="border rounded p-2 flex items-start gap-3">
          <img src={img.src} alt={img.alt || ""} className="w-20 h-16 object-cover rounded" />
          <div className="flex-1">
            <div className="font-medium">{img.role || "inline"}</div>
            <div className="text-xs text-gray-500 break-all">{img.src}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
