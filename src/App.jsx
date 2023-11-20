import "./index.css";
import Simplex from "./components/simplex";
import Tabs from "./components/tabs";
import GraphSimplex from "./components/graphSimplex";

export default function App() {
  return (
    <main className="min-h-screen bg-zinc-800 w-screen overflow-x-hidden">
      <Tabs
        title1={"Gráfico"}
        component1={<GraphSimplex />}
        title2={"Simplex"}
        component2={<Simplex />}
      />
    </main>
  );
}
