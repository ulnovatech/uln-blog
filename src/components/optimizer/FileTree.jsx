// src/components/optimizer/FileTree.jsx
function Node({ node, depth = 0 }) {
  return (
    <div style={{ paddingLeft: depth * 12 }} className="text-sm">
      <div>{node.name}</div>
      {node.children && node.children.map((c, i) => <Node key={i} node={c} depth={depth + 1} />)}
    </div>
  );
}

export default function FileTree({ tree = [] }) {
  if (!tree || tree.length === 0) return <p className="text-sm text-gray-500">No output yet</p>;
  return (
    <div className="max-h-64 overflow-auto bg-gray-50 p-2 rounded">
      {tree.map((n, i) => (<Node key={i} node={n} />))}
    </div>
  );
}
