import { useState } from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

const MainContent = () => {
  const [load, setLoad] = useState(
    {
      Live: "0",
      Dead: "0"
    }
  )

  const [soil, setSoil] = useState(
    {
      cohesion: "2",
      angle_of_internal_friction: "35",
      unit_weight: "12",
      Depth: "1"
    }
  )

  const [output, setOutput] = useState(null);

  const handleCalculate = () => {
    const { Live, Dead } = load;
    const { unit_weight, angle_of_internal_friction, cohesion, Depth } = soil;

    if (!unit_weight || !angle_of_internal_friction || !Live || !Dead) {
      setOutput("Missing Inputs: Please enter all the inputs.");
      return;
    }

    const gamma = Number(unit_weight);
    const phi = Number(angle_of_internal_friction);
    const c = Number(cohesion) || 0;
    const Df = Number(Depth) || 0;

    const P = Number(Dead) + Number(Live);
    const F = 2.5;

    const phiRad = (phi * Math.PI) / 180;
    const Nq = Math.pow(Math.tan((Math.PI / 4) + (phiRad / 2)), 2) * Math.exp(Math.PI * Math.tan(phiRad));
    const Nc = (phi > 0) ? (Nq - 1) / Math.tan(phiRad) : 5.14;
    const Ngamma = 2 * (Nq + 1) * Math.tan(phiRad);

    const a_quad = 0.5 * gamma * Ngamma;
    const b_quad = (c * Nc) + (gamma * Df * (Nq - 1));
    const c_quad = -(P * F);

    const discriminant = (b_quad * b_quad) - (4 * a_quad * c_quad);

    if (discriminant < 0) {
      setOutput("Calculation Error: No valid footing width found.");
      return;
    }

    const widthB = (-b_quad + Math.sqrt(discriminant)) / (2 * a_quad);
    setOutput(widthB);
  };


  const handleReset = () => {
    setSoil({
      cohesion: "",
      angle_of_internal_friction: "",
      unit_weight: "",
      Depth: ""
    });

    setLoad({
      Live: "",
      Dead: ""
    });

    setOutput(null); 
  };



  


  return (
    <main className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="h-full">
          <LeftPanel load={load} setLoad={setLoad} soil={soil} setSoil={setSoil} onCalculate ={handleCalculate} onReset={handleReset}/>
        </div>
        <div className="h-full">
          <RightPanel output={output} />
        </div>
      </div>
    </main>
  );
}

export default MainContent
