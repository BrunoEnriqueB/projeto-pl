import useSimplex from "../hooks/useSimplex";

export default function Simplex() {
  const {
    productsRows,
    addConsumption,
    addProduct,
    addResource,
    consumptionProductId,
    consumptionQuantity,
    consumptionResourceId,
    consumptionRows,
    objective,
    processSimplex,
    productCost,
    productDescription,
    productPrice,
    resourceCondition,
    resourceDescription,
    resourceQuantity,
    resourceUom,
    resourcesRows,
    resultState,
    setFoUom,
    setObjective,
    translateResult,
    foUom,
    products,
    resources,
    setProductCost,
    setProductDescription,
    setProductPrice,
    setResourceDescription,
    setResourceCondition,
    setResourceQuantity,
    setResourceUom,
    setConsumptionResourceIdState,
    setConsumptionProductIdState,
    setConsumptionQuantityState,
  } = useSimplex();

  return (
    <>
      <section className="h-screen w-screen bg-zinc-800 overflow-x-hidden">
        <div className="p-4 row items-center">
          <h1 className="text-zinc-50 text-xl font-bold block">
            Simplex - Programação Linear
          </h1>
          <p className="text-zinc-50 text-xl">Bruno, Lucas e Pierre</p>
        </div>
        <div className="mt-8  bg-zinc-800">
          <SectionTitle title="Função Objetivo" />

          <ObjectiveFuncionSection
            foUom={foUom}
            objective={objective}
            setObjective={setObjective}
            setFoUom={setFoUom}
          />

          <SectionTitle title={"Variáveis"} />
          <Variables
            addProduct={addProduct}
            productCost={productCost}
            productDescription={productDescription}
            productPrice={productPrice}
            productsRows={productsRows}
            setProductCost={setProductCost}
            setProductDescription={setProductDescription}
            setProductPrice={setProductPrice}
          />

          <SectionTitle title={"Recursos"} />
          <Resources
            addResource={addResource}
            resourceCondition={resourceCondition}
            resourceDescription={resourceDescription}
            resourceQuantity={resourceQuantity}
            resourceUom={resourceUom}
            resourcesRows={resourcesRows}
            setResourceUom={setResourceUom}
            setResourceCondition={setResourceCondition}
            setResourceDescription={setResourceDescription}
            setResourceQuantity={setResourceQuantity}
          />

          <SectionTitle title={"Gastos"} />
          <Consumption
            addConsumption={addConsumption}
            consumptionProductId={consumptionProductId}
            consumptionQuantity={consumptionQuantity}
            consumptionResourceId={consumptionResourceId}
            consumptionRows={consumptionRows}
            products={products}
            resources={resources}
            setConsumptionProductIdState={setConsumptionProductIdState}
            setConsumptionResourceIdState={setConsumptionResourceIdState}
            setConsumptionQuantityState={setConsumptionQuantityState}
          />

          <div className="flex items-center justify-center w-full mt-10">
            <button
              onClick={processSimplex}
              className="rounded-none py-2 px-20 bg-zinc-50 hover:bg-zinc-300 text-zinc-800"
            >
              CALCULAR
            </button>
          </div>

          {resultState?.algorithms?.length ? (
            <SectionTitle title="Solução" />
          ) : null}
          <div className="items-center w-full p-4 space-y-4 text-gray-500">
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
              <div>
                <div>
                  {resultState.algorithms?.map((algorithm, index) => (
                    <>
                      <div className="relative flex justify-center text-sm leading-5">
                        <h3 className="px-5 text-zinc-50 bg-zinc-800 font-bold">
                          Algoritmo {algorithm.id}
                        </h3>
                      </div>
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr key={0}>
                            {algorithm.algorithm[0].map((header_column) => (
                              <th
                                scope="col"
                                className="py-9 bg-zinc-800 border-b border-zinc-50 text-zinc-50  text-left text-sm uppercase font-normal"
                              >
                                {header_column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {algorithm.algorithm.map((element, index) =>
                            index > 0 ? (
                              <tr>
                                {element.map((value) => (
                                  <td className="py-5 border-b border-zinc-50 bg-zinc-800 text-sm">
                                    <p className="text-zinc-50 whitespace-no-wrap">
                                      {value}
                                    </p>
                                  </td>
                                ))}
                              </tr>
                            ) : null
                          )}
                          <tr></tr>
                        </tbody>
                      </table>
                      <br />
                      <div className="relative flex justify-center text-sm leading-5">
                        <h3 className="px-5 text-zinc-50 bg-zinc-800 font-bold">
                          Solução {resultState.solutions[index].id}
                        </h3>
                      </div>
                      <table>
                        <tr>
                          <th
                            className="py-3 bg-zinc-800  border-b border-zinc-50 text-zinc-50 text-left text-sm uppercase font-normal"
                            rowSpan={
                              resultState.solutions[index].basic_variables
                                .length + 1
                            }
                          >
                            VB:
                          </th>
                        </tr>
                        {resultState.solutions[index].basic_variables.map(
                          (basic_variable) => (
                            <tr>
                              <td className="py-5 border-b border-zinc-50 text-zinc-50 bg-zinc-800 text-sm">{`${basic_variable.id}=${basic_variable.quantity}`}</td>
                            </tr>
                          )
                        )}

                        <tr>
                          <th
                            className="py-3 bg-zinc-800 border-b border-zinc-50 text-zinc-50  text-left text-sm uppercase font-normal"
                            rowSpan={
                              resultState.solutions[index].non_basic_variables
                                .length + 1
                            }
                          >
                            VNB:
                          </th>
                        </tr>
                        {resultState.solutions[index].non_basic_variables.map(
                          (non_basic_variable) => (
                            <tr>
                              <td className="py-5 border-b border-zinc-50 bg-zinc-800 text-zinc-50 text-sm">{`${non_basic_variable.id}=${non_basic_variable.quantity}`}</td>
                            </tr>
                          )
                        )}

                        <tr>
                          <th
                            className="py-3 bg-zinc-800  border-b border-zinc-50 text-zinc-50  text-left text-sm font-normal"
                            rowSpan={2}
                          >
                            Valor Z:
                          </th>
                        </tr>
                        <tr>
                          <td className="py-5 border-b border-zinc-50 bg-zinc-800 text-zinc-50 text-sm">{`${foUom} ${resultState.solutions[index].Z}`}</td>
                        </tr>

                        <tr>
                          <th
                            className="py-3 bg-zinc-800  border-zinc-50 text-zinc-50 text-left text-sm font-normal"
                            rowSpan={2}
                          >
                            Resultado:
                          </th>
                        </tr>
                        <tr>
                          <td className="py-5 border-zinc-50 bg-zinc-800 text-zinc-50 text-sm">{`${translateResult(
                            resultState.solutions[index].result
                          )}`}</td>
                        </tr>
                      </table>
                      <hr className="py-10"/>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const SectionTitle = ({ title }) => {
  return (
    <div className="grid grid-cols-12 items-center px-4">
      <span className="col-span-1 text-lg text-zinc-50 font-bold">{title}</span>
      <div className="col-span-11 border-t border-zinc-50 my-8"></div>
    </div>
  );
};

const ObjectiveFuncionSection = ({
  objective,
  setObjective,
  foUom,
  setFoUom,
}) => {
  return (
    <div className="w-full px-4 pb-3 text-gray-500 max-w-sm space-y-4">
      <div>
        <label className="text-zinc-50">Objetivo:</label>
        <select
          name="objective"
          value={objective}
          onInput={(e) => setObjective(e.target.value)}
          className="rounded-none border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400"
        >
          <option value="">Selecione...</option>
          <option value="MAX">Maximizar Lucro</option>
        </select>
      </div>
      <div>
        <label className="text-zinc-50">Unidade de medida:</label>
        <input
          type="text"
          name="uom_fo"
          value={foUom}
          onInput={(e) => setFoUom(e.target.value)}
          className="rounded-none border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400"
          placeholder="Unidade de medida"
        />
      </div>
    </div>
  );
};

const Variables = ({
  productDescription,
  setProductDescription,
  productPrice,
  setProductPrice,
  productCost,
  setProductCost,
  addProduct,
  productsRows,
}) => {
  return (
    <div className="w-full px-4 pb-3 text-gray-500 space-y-4">
      <div className="grid grid-cols-4 items-center space-x-4 w-full">
        <div className="col-span-1">
          <label className="text-zinc-50">Produto:</label>
          <input
            type="text"
            name="description_product"
            value={productDescription}
            onInput={(e) => setProductDescription(e.target.value)}
            className=" rounded-none border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
            placeholder="Descrição do produto"
          />
        </div>
        <div className="col-span-1">
          <label className="text-zinc-50">Preço:</label>
          <input
            type="number"
            name="price"
            step={0.01}
            value={productPrice}
            onInput={(e) => setProductPrice(e.target.value)}
            className="rounded-none border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
            placeholder="Preço"
          />
        </div>
        <div className="col-span-1">
          <label className="text-zinc-50">Custo:</label>
          <input
            type="number"
            name="cost"
            step={0.01}
            value={productCost}
            onInput={(e) => setProductCost(e.target.value)}
            className="rounded-none border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
            placeholder="Custo"
          />
        </div>
        <div className="col-span-1 h-full flex items-end">
          <button
            onClick={() => {
              addProduct({
                description: productDescription,
                price: Number(productPrice),
                cost: Number(productCost),
              });
            }}
            className="text-base rounded-none px-20 bg-zinc-50 hover:bg-zinc-300 text-zinc-800"
          >
            Adicionar
          </button>
        </div>
      </div>

      {productsRows().length ? (
        <div>
          <div>{productsRows()}</div>
        </div>
      ) : null}
    </div>
  );
};

const Resources = ({
  resourceDescription,
  setResourceDescription,
  resourceCondition,
  setResourceCondition,
  resourceQuantity,
  setResourceQuantity,
  resourceUom,
  setResourceUom,
  addResource,
  resourcesRows,
}) => {
  return (
    <div className="w-full px-4 pb-3 text-gray-500 space-y-4">
      <div className="grid grid-cols-5 items-center space-x-4 w-full">
        <div className="col-span-1">
          <label className="text-zinc-50">Recurso:</label>
          <input
            type="text"
            name="description_resource"
            value={resourceDescription}
            onInput={(e) => setResourceDescription(e.target.value)}
            className=" rounded-none border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
            placeholder="Descrição do recurso"
          />
        </div>

        <div className="col-span-1">
          <label className="text-zinc-50">Condição:</label>
          <select
            name="condition"
            value={resourceCondition}
            onInput={(e) => setResourceCondition(e.target.value)}
            className=" rounded-none border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
          >
            <option defaultValue={""} value="">
              Selecione...
            </option>
            <option value="<=">Menor ou igual</option>
          </select>
        </div>

        <div className="col-span-1">
          <label className="text-zinc-50">Quantidade:</label>
          <input
            type="number"
            name="quantity"
            step={0.01}
            value={resourceQuantity}
            onInput={(e) => setResourceQuantity(e.target.value)}
            className=" rounded-none border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
          />
        </div>

        <div className="col-span-1">
          <label className="text-zinc-50">Unidade de medida:</label>
          <input
            type="text"
            name="uom_resource"
            step={0.01}
            value={resourceUom}
            onInput={(e) => setResourceUom(e.target.value)}
            className=" rounded-none border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
          />
        </div>

        <div className="col-span-1 h-full flex items-end">
          <button
            onClick={() => {
              addResource({
                description: resourceDescription,
                condition: resourceCondition,
                quantity: Number(resourceQuantity),
                uom: resourceUom,
              });
            }}
            className="text-base rounded-none px-20 bg-zinc-50 hover:bg-zinc-300 text-zinc-800"
          >
            Adicionar
          </button>
        </div>
      </div>
      {resourcesRows().length ? <div>{resourcesRows()}</div> : null}
    </div>
  );
};

const Consumption = ({
  consumptionProductId,
  setConsumptionProductIdState,
  products,
  consumptionResourceId,
  setConsumptionResourceIdState,
  resources,
  addConsumption,
  consumptionRows,
  consumptionQuantity,
  setConsumptionQuantityState,
}) => {
  return (
    <div className="w-full px-4 pb-3 text-gray-500 space-y-4">
      <div className="grid grid-cols-4 items-center space-x-4 w-full">
        <div className="col-span-1">
          <label className="text-zinc-50">Produto:</label>
          <select
            name="product_id"
            id="product_id"
            value={consumptionProductId}
            onInput={(e) => setConsumptionProductIdState(e.target.value)}
            className="rounded-none border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
          >
            <option value="">Selecione...</option>
            {products.map((product) => (
              <option
                value={product.id}
              >{`${product.id}-${product.description}`}</option>
            ))}
          </select>
        </div>
        <div className="col-span-1">
          <label className="text-zinc-50">Recurso:</label>
          <select
            name="resource_id"
            id="resource_id"
            value={consumptionResourceId}
            onInput={(e) => setConsumptionResourceIdState(e.target.value)}
            className=" rounded-none border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
          >
            <option value="">Selecione...</option>
            {resources.map((resource) => (
              <option
                value={resource.id}
              >{`${resource.id}-${resource.description}`}</option>
            ))}
          </select>
        </div>
        <div className="col-span-1">
          <div>
            <label className="text-zinc-50">Quantidade:</label>
            <input
              type="number"
              name="quantity_consumption"
              step={0.01}
              value={consumptionQuantity}
              onInput={(e) => setConsumptionQuantityState(e.target.value)}
              className=" rounded-none border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base"
            />
          </div>
        </div>
        <div className="col-span-1 h-full flex items-end">
          <button
            onClick={() => {
              addConsumption({
                product_id: consumptionProductId,
                resource_id: consumptionResourceId,
                quantity: Number(consumptionQuantity),
              });
            }}
            className="text-base rounded-none px-20 bg-zinc-50 hover:bg-zinc-300 text-zinc-800"
          >
            Adicionar
          </button>
        </div>

        <div>{consumptionRows()}</div>
      </div>
    </div>
  );
};
