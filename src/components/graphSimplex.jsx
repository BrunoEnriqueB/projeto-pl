import useGraphSimplex from "../hooks/useGraphSimplex";
import SectionTitle from "./sectionTitle";

export default function GraphSimplex() {
  const {
    x,
    y,
    setX,
    setY,
    objective,
    setObjective,
    restriction,
    setRestriction,
    addRestriction,
    restrictions,
    proccessGraph,
    showGraph,
    GraphComponent,
    returnResult,
  } = useGraphSimplex();

  return (
    <section className="h-screen w-screen bg-zinc-800 overflow-x-hidden">
      <div className="p-4 row items-center">
        <h1 className="text-zinc-50 text-xl font-bold block">
          Gráfico - Programação Linear
        </h1>
        <p className="text-zinc-50 text-xl">Bruno, Lucas e Pierre</p>
      </div>
      <div className="mt-8  bg-zinc-800">
        <SectionTitle title="Objetivo" />
        <Objective objective={objective} setObjective={setObjective} />
        <SectionTitle title="Variáveis" />
        <Variables setX={setX} x={x} y={y} setY={setY} />
        <SectionTitle title="Restrições" />
        <Restrictions
          restrictions={restrictions}
          setRestriction={setRestriction}
          restriction={restriction}
          addRestriction={addRestriction}
        />
      </div>

      <div className="flex items-center justify-center w-full mt-10">
        <button
          onClick={proccessGraph}
          className="rounded-none py-2 px-20 bg-zinc-50 hover:bg-zinc-300 text-zinc-800"
        >
          CALCULAR
        </button>
      </div>

      {showGraph ? (
        <>
          <SectionTitle title={"Resultado"} />
          <div className="flex-col">
            <div className="flex-col px-4 py-6">
              <div>
                <span className="text-zinc-50">
                  <strong>Função Objetiva:</strong> {returnResult.fo}
                </span>
              </div>
              <div>
                <span className="text-zinc-50">
                  <strong>Coordenadas: </strong>
                  X: {returnResult.coords?.[0]} Y: {returnResult.coords?.[1]}
                </span>
              </div>
            </div>
            <div className="full-width flex items-center justify-center">
              {GraphComponent()}
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}

const Objective = ({ objective, setObjective }) => {
  return (
    <div className="w-full px-4 pb-3 text-gray-500 grid grid-cols-3 space-x-4">
      <div className="col-span-1">
        <label className="text-zinc-50">Objetivo:</label>
        <select
          name="objective"
          value={objective}
          onInput={(e) => setObjective(e.target.value)}
          className="rounded-none border-transparent  appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400"
        >
          <option value="">Selecione...</option>
          <option value="max">Maximizar</option>
          <option value="min">Minimizar</option>
        </select>
      </div>
    </div>
  );
};

const Variables = ({ x, setX, y, setY }) => {
  return (
    <div className="w-full px-4 pb-3 text-gray-500 grid grid-cols-3 space-x-4">
      <div className="col-span-1">
        <label className="text-zinc-50">Valor de X:</label>
        <input
          type="number"
          step={0.01}
          name="x"
          value={x}
          onInput={(e) => setX(e.target.value)}
          className="rounded-none border-transparent  appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400"
          placeholder="X"
        />
      </div>
      <div className="col-span-1">
        <label className="text-zinc-50">Valor de Y:</label>
        <input
          type="number"
          step={0.01}
          name="y"
          value={y}
          onInput={(e) => setY(e.target.value)}
          className="rounded-none border-transparent  appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400"
          placeholder="Y"
        />
      </div>
    </div>
  );
};

const Restrictions = ({
  restriction,
  setRestriction,
  restrictions,
  addRestriction,
}) => {
  return (
    <div className="w-full px-4 pb-3 text-gray-500 space-y-4">
      <div className="grid grid-cols-5 items-center space-x-4 w-full">
        <div className="col-span-1">
          <label className="text-zinc-50">Valor de X:</label>
          <input
            value={restriction.x}
            onInput={(e) =>
              setRestriction((prev) => ({ ...prev, x: e.target.value }))
            }
            type="text"
            className=" rounded-none border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
            placeholder="X"
          />
        </div>
        <div className="col-span-1">
          <label className="text-zinc-50">Valor de Y:</label>
          <input
            value={restriction.y}
            onInput={(e) =>
              setRestriction((prev) => ({ ...prev, y: e.target.value }))
            }
            type="number"
            step={0.01}
            className="rounded-none border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
            placeholder="Y"
          />
        </div>
        <div className="col-span-1">
          <label className="text-zinc-50">Condição:</label>
          <select
            value={restriction.operation}
            onInput={(e) =>
              setRestriction((prev) => ({ ...prev, operation: e.target.value }))
            }
            className="rounded-none border-transparent  appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400"
          >
            <option value="">Selecione...</option>
            <option value="<=">Menor ou Igual </option>
            <option value=">="> Maior ou Igual</option>
            <option value="="> Igual</option>
          </select>
        </div>
        <div className="col-span-1">
          <label className="text-zinc-50">Quantidade:</label>
          <input
            value={restriction.result}
            onInput={(e) =>
              setRestriction((prev) => ({ ...prev, result: e.target.value }))
            }
            type="number"
            step={0.01}
            className="rounded-none border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
          />
        </div>
        <div className="col-span-1 h-full flex items-end">
          <button
            onClick={addRestriction}
            className="text-base rounded-none px-20 bg-zinc-50 hover:bg-zinc-300 text-zinc-800"
          >
            Adicionar
          </button>
        </div>
      </div>
      {restrictions.map((r, idx) => (
        <div className="flex-row" key={idx}>
          <span className="text-zinc-50">
            <strong>{idx + 1}</strong> - {r}
          </span>
        </div>
      ))}
    </div>
  );
};
