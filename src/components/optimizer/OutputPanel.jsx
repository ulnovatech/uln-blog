import { useState, useEffect } from "react";

export default function OutputPanel({ logs }) {
  return (
    <div>
      <h2 className="font-bold mb-4 text-lg">Logs</h2>
      <ul className="space-y-2 max-h-[80vh] overflow-y-auto">
        {logs.map((log, idx) => (
          <li
            key={idx}
            className={`text-sm ${
              log.type === "error"
                ? "text-red-600"
                : log.type === "success"
                ? "text-green-600"
                : "text-gray-700"
            }`}
          >
            [{new Date(log.timestamp).toLocaleTimeString()}] {log.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

