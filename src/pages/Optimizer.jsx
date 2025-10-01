// src/pages/Optimizer.jsx
import { useState } from "react";
import ArticleList from "../components/optimizer/ArticleList";
import Engine from "../components/optimizer/Engine";
import LogConsole from "../components/optimizer/LogConsole";

export default function Optimizer() {
  const [activeArticle, setActiveArticle] = useState(null);
  const [logs, setLogs] = useState([]);

  const handleLog = (msg, type = "info") => {
    setLogs(prev => [...prev, { msg, type, time: new Date().toLocaleTimeString() }]);
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-50">
      {/* Left: Articles list */}
      <div className="w-64 border-r border-gray-300 bg-white overflow-y-auto sticky top-0 h-screen">
        <ArticleList onSelect={setActiveArticle} />
      </div>

      {/* Middle: Engine */}
      <div className="flex-1 border-r border-gray-300 p-4 overflow-y-auto">
        {activeArticle ? (
          <>
            <div className="mb-4 p-2 bg-gray-100 border rounded shadow-sm">
              <h2 className="font-bold text-lg">{activeArticle.title}</h2>
              <p className="text-sm text-gray-600">
                Slug: {activeArticle.slug}
              </p>
            </div>
            <Engine article={activeArticle} onLog={handleLog} />
          </>
        ) : (
          <p className="text-gray-600 text-center mt-10">
            Select an article to manage images.
          </p>
        )}
      </div>

      {/* Right: Logs */}
      <div className="w-72 border-l border-gray-300 bg-gray-100 p-4 overflow-y-auto sticky top-0 h-screen">
        <LogConsole logs={logs} />
      </div>
    </div>
  );
}



// // src/pages/Optimizer.jsx
// import { useEffect, useState } from "react";
// import ArticleSelector from "../components/optimizer/ArticleSelector";
// import ImageGrid from "../components/optimizer/ImageGrid";
// import FileTree from "../components/optimizer/FileTree";
// import LogConsole from "../components/optimizer/LogConsole";

// import SettingsPanel from "../components/optimizer/SettingsPanel";
// import { fetchArticles, optimizeArticle, optimizeAll } from "../utils/optimizerApi";

// export default function OptimizerPage() {
//   const [articles, setArticles] = useState([]);
//   const [active, setActive] = useState(null);
//   const [images, setImages] = useState([]);
//   const [logs, setLogs] = useState([]);
//   const [tree, setTree] = useState([]);
//   const [running, setRunning] = useState(false);
//   const [settings, setSettings] = useState({
//     sizes: [400, 800, 1200],
//     formats: ["webp", "avif", "jpg"],
//     quality: 80,
//     coverCrop: true,
//     autoOptimizeOnSelect: false,
//   });

//   useEffect(() => {
//     async function load() {
//       const list = await fetchArticles();
//       setArticles(list || []);
//       if (list && list.length) setActive(list[0].slug);
//     }
//     load();
//   }, []);

//   useEffect(() => {
//     const article = articles.find(a => a.slug === active);
//     setImages(article?.images || []);
//   }, [active, articles]);

//   async function handleOptimize() {
//     if (!active) return;
//     setRunning(true);
//     setLogs([]);
//     setTree([]);
//     try {
//       const res = await optimizeArticle(active, settings);
//       if (res?.messages) setLogs(prev => [...prev, ...res.messages]);
//       if (res?.tree) setTree(res.tree);
//     } catch (err) {
//       setLogs(prev => [...prev, `Error: ${err.message || err}`]);
//     } finally {
//       setRunning(false);
//     }
//   }

//   async function handleOptimizeAll() {
//     setRunning(true);
//     setLogs([]);
//     setTree([]);
//     try {
//       const res = await optimizeAll(settings);
//       setLogs(prev => [...prev, ...(res?.messages || [])]);
//       setTree(res?.tree || []);
//     } catch (err) {
//       setLogs(prev => [...prev, `Error: ${err.message || err}`]);
//     } finally {
//       setRunning(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-semibold">Image Optimizer</h1>
//           <div className="flex gap-3">
//             <button
//               onClick={handleOptimizeAll}
//               disabled={running}
//               className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60"
//             >
//               Optimize All
//             </button>
//             <button
//               onClick={handleOptimize}
//               disabled={running || !active}
//               className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
//             >
//               Optimize Selected
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-12 gap-6">
//           <div className="col-span-3 bg-white rounded shadow p-4">
//             <ArticleSelector
//               articles={articles}
//               active={active}
//               onSelect={setActive}
//               running={running}
//             />
//             <div className="mt-4">
//               <SettingsPanel settings={settings} onChange={setSettings} />
//             </div>
//           </div>

//           <div className="col-span-6 bg-white rounded shadow p-4">
//             <h2 className="text-lg font-medium mb-3">Images (cover & inline)</h2>
//             <ImageGrid images={images} />
//           </div>

//           <div className="col-span-3 bg-white rounded shadow p-4">
//             <h2 className="text-lg font-medium mb-3">Output / Logs</h2>
//             <FileTree tree={tree} />
//             <div className="mt-4">
//               <LogConsole logs={logs} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
