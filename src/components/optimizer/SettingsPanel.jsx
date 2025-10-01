// src/components/optimizer/SettingsPanel.jsx
export default function SettingsPanel({ settings, onChange }) {
  const update = (patch) => onChange({ ...settings, ...patch });

  return (
    <div>
      <h3 className="font-medium mb-2">Settings</h3>
      <label className="block text-xs text-gray-600 mb-1">Sizes (comma separated)</label>
      <input
        className="w-full border rounded p-2 mb-2 text-sm"
        value={settings.sizes.join(",")}
        onChange={(e) => update({ sizes: e.target.value.split(",").map(s => Number(s.trim())).filter(Boolean) })}
      />
      <label className="block text-xs text-gray-600 mb-1">Formats</label>
      <input
        className="w-full border rounded p-2 mb-2 text-sm"
        value={settings.formats.join(",")}
        onChange={(e) => update({ formats: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
      />
      <label className="block text-xs text-gray-600 mb-1">Quality (1-100)</label>
      <input
        type="number"
        className="w-full border rounded p-2 mb-2 text-sm"
        value={settings.quality}
        onChange={(e) => update({ quality: Math.max(1, Math.min(100, Number(e.target.value))) })}
      />
      <label className="inline-flex items-center text-sm">
        <input
          type="checkbox"
          className="mr-2"
          checked={settings.autoOptimizeOnSelect}
          onChange={(e) => update({ autoOptimizeOnSelect: e.target.checked })}
        />
        Auto-optimize when selecting article
      </label>
    </div>
  );
}
