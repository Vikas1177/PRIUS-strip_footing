export default function LoadInputs({ load, setLoad }) {
  const handleChange = (key, value) => {
    setLoad(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="rounded-xl border border-gray-200 p-4 mb-4">
      <h4 className="font-semibold mb-3">Load Parameters</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex flex-col text-sm">
          <span className="mb-1">Dead Load (kN)</span>
          <input
            type="number"
            value={load.Live}
            onChange={(e) => handleChange("Live", e.target.value)}
            className="border rounded px-2 py-1"
            placeholder="e.g. 50"
          />
        </label>

        <label className="flex flex-col text-sm">
          <span className="mb-1">Live Load (kN)</span>
          <input
            type="number"
            value={load.Dead}
            onChange={(e) => handleChange("Dead", e.target.value)}
            className="border rounded px-2 py-1"
            placeholder="e.g. 10"
          />
        </label>
      </div>
    </div>
  );
}
