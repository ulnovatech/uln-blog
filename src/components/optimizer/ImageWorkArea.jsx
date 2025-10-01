import { useRef } from "react";
import optimizerApi from "../../utils/optimizerApi";

export default function ImageWorkArea({
  activeArticle,
  workingImage,
  setWorkingImage,
  onOptimized,
}) {
  const fileInputRef = useRef();

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setWorkingImage({ file, preview, name: file.name });
    }
  };

  const handleOptimize = async () => {
    if (!workingImage) return;
    const result = await optimizerApi.optimizeImage(workingImage.file);
    onOptimized(result);
  };

  return (
    <div className="border-r p-4">
      <h2 className="font-bold mb-4">Engine</h2>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Import
        </button>
        <button
          onClick={handleOptimize}
          disabled={!workingImage}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Optimize
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImport}
        />
      </div>

      {workingImage ? (
        <div>
          <h3 className="font-semibold mb-2">Working Image</h3>
          <img
            src={workingImage.preview}
            alt=""
            className="max-w-full max-h-64 border rounded"
          />
          <p className="mt-2 text-sm text-gray-600">{workingImage.name}</p>
        </div>
      ) : (
        <p className="text-gray-500">No image selected</p>
      )}
    </div>
  );
}
