import React from "react";
import InputSection from "./LoadInput";
import SoilInputs from "./SoilInputs";

export default function LeftPanel({ load, setLoad, soil, setSoil, onCalculate, onReset }) {
  return (
    <section className="bg-white rounded-2xl shadow-md p-5">
      <InputSection load={load} setLoad={setLoad} />

      <SoilInputs soil={soil} setSoil={setSoil} />

      <div className="mt-4 flex gap-3">
        <button
          onClick={onReset}
          className="px-3 py-1 border rounded"
        >
          Reset
        </button>

        <button
          onClick={onCalculate}
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Calculate
        </button>
      </div>
    </section>
  );
}
