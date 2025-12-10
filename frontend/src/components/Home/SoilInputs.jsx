export default function SoilInputs({ soil, setSoil, oncalculate }) {
  const handleChange = (key, value) => {
    setSoil(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="mt-4 rounded-xl border border-gray-200 p-4">
      <h4 className="font-semibold mb-3">Soil Parameters</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex flex-col text-sm">
          <span className="mb-1">Cohesion (c)</span>
          <input
            type="number"
            value={soil.cohesion}
            onChange={(e) => handleChange("cohesion", e.target.value)}
            className="border rounded px-2 py-1"
            placeholder="e.g. 12.5"
          />
        </label>

        <label className="flex flex-col text-sm">
          <span className="mb-1">Phi (degrees)</span>
          <input
            type="number"
            value={soil.angle_of_internal_friction}
            onChange={(e) => handleChange("angle_of_internal_friction", e.target.value)}
            className="border rounded px-2 py-1"
          />
        </label>

        <label className="flex flex-col text-sm">
          <span className="mb-1">Gamma (kN/m3)</span>
          <input
            type="number"
            value={soil.unit_weight}
            onChange={(e) => handleChange("unit_weight", e.target.value)}
            className="border rounded px-2 py-1"
          />
        </label>

        <label className="flex flex-col text-sm">
          <span className="mb-1">Depth (m)</span>
          <input
            type="number"
            value={soil.Depth}
            onChange={(e) => handleChange("Depth", e.target.value)}
            className="border rounded px-2 py-1"
          />
        </label>
      </div>

    </div>
  );
}
