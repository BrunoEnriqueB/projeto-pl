import { useState } from "react";
import Graph from "../common/graph";

export default function useGraphSimplex() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [objective, setObjective] = useState("");

  const [restriction, setRestriction] = useState({
    x: 0,
    y: 0,
    operation: "",
    result: 0,
  });
  const [restrictions, setRestrictions] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  const [returnResult, setReturnResult] = useState({})
  const [fo, setFo] = useState(0);
  const [coordsX, setCoordsX] = useState(0)
  const [coordsY, setCoordsY] = useState(0)

  const addRestriction = () => {
    setRestrictions((prev) => {
      const newRestriction = `${restriction.x}x+${restriction.y}y${restriction.operation}${restriction.result}`;
      return [...prev, newRestriction];
    });
    clearRestriction();
  };

  const getResult = (result) => {
    setReturnResult(result);
    setFo(result.fo);
    setCoordsX(result.coords[0]);
    setCoordsY(result.coords[1])
  }

  const clearRestriction = () => {
    setRestriction({
      x: 0,
      y: 0,
      operation: "",
      result: 0,
    });
  };

  const proccessGraph = () => {
    setShowGraph(true);
  };


  const GraphComponent = () => {
    return (
      <Graph
        obj={objective}
        restrictions={restrictions}
        returnResult={getResult}
        x={x}
        y={y}
      />
    );
  };

  return {
    x,
    y,
    setX,
    setY,
    objective,
    setObjective,
    addRestriction,
    restrictions,
    restriction,
    setRestriction,
    GraphComponent,
    showGraph,
    proccessGraph,
    returnResult,
    fo,
    coordsX,
    coordsY
  };
}
