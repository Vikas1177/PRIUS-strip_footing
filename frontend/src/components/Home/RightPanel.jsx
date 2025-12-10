import React from "react";
import InfoCard from "./InfoCard";
import OutputCard from "./OutputCard";

export default function RightPanel({ output }) {
  return (
    <aside className="space-y-4">
      <InfoCard>
        <p>
          Short description 
        </p>
      </InfoCard>

      <OutputCard output={output} />
    </aside>
  );
}
