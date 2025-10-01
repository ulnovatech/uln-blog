// src/components/optimizer/LogConsole.jsx
export default function LogConsole({ logs = [] }) {
  return (
    <div className="bg-black text-green-200 text-xs p-2 rounded max-h-40 overflow-auto">
      {logs.length === 0 && <div className="opacity-60">Logs will appear here</div>}
      {logs.map((l, i) => <div key={i} className="whitespace-pre-wrap">{l}</div>)}
    </div>
  );
}
