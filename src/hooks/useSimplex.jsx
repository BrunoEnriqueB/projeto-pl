import { useState } from "react";
import { processCase } from "../common/utils/simplex";
import { formatCurrency } from "../common/utils/format";

let productId = 1;
let resourceId = 1;

const getProductId = () => {
  return (productId++).toString();
};

const getResourceId = () => {
  return (resourceId++).toString();
};

export default function useSimplex() {
  const [objective, setObjective] = useState("MAX");
  const [foUom, setFoUom] = useState("");

  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0.0);
  const [productCost, setProductCost] = useState(0.0);

  const [resourceDescription, setResourceDescription] = useState("");
  const [resourceCondition, setResourceCondition] = useState("<=");
  const [resourceQuantity, setResourceQuantity] = useState(0.0);
  const [resourceUom, setResourceUom] = useState("");

  const [consumptionProductId, setConsumptionProductIdState] = useState(0);
  const [consumptionResourceId, setConsumptionResourceIdState] = useState(0);
  const [consumptionQuantity, setConsumptionQuantityState] = useState(0.0);

  const [products, setProductsState] = useState([]);
  const [resources, setResourcesState] = useState([]);
  const [consumptions, setConsumptionsState] = useState([]);

  const [resultState, setResultState] = useState({"algorithms":[{"id":1,"algorithm":[["Z","x1","xf1","b"],[1,-5,0,0],[0,3,1,3]]},{"id":2,"algorithm":[["Z","x1","xf1","b"],[1,0,1.6666666666666665,5],[0,1,0.3333333333333333,1]]}],"solutions":[{"id":1,"basic_variables":[{"id":"xf1","quantity":3}],"non_basic_variables":[{"id":"x1","quantity":0}],"Z":0,"result":"not great"},{"id":2,"basic_variables":[{"id":"x1","quantity":1}],"non_basic_variables":[{"id":"xf1","quantity":0}],"Z":5,"result":"great"}]});

  function addProduct(product) {
    product.id = getProductId();
    setProductsState([...products, product]);
    resetProductFields();
  }

  function addResource(resource) {
    resource.id = getResourceId();
    setResourcesState([...resources, resource]);
    resetResourceFields();
  }

  function addConsumption(consumption) {
    setConsumptionsState([...consumptions, consumption]);
    resetConsumptionFields();
  }

  function resetProductFields() {
    setProductDescription("");
    setProductPrice("");
    setProductCost("");
  }

  function resetResourceFields() {
    setResourceDescription("");
    setResourceCondition("");
    setResourceQuantity("");
    setResourceUom("");
  }

  function resetConsumptionFields() {
    setConsumptionProductIdState("");
    setConsumptionResourceIdState("");
    setConsumptionQuantityState("");
  }

  function productsRows() {
    return products.map((product, index) => (
      <div className="flex-row" key={index}>
        <span className="text-zinc-50">
          <strong>{product.id}</strong>: {product.description} -{" "}
        </span>
        <span className="text-zinc-50">
          <strong>Preço</strong>: {formatCurrency(product.price)} -{" "}
        </span>
        <span className="text-zinc-50">
          <strong>Custo</strong>: {formatCurrency(product.cost)}
        </span>
      </div>
    ));
  }

  function resourcesRows() {
    return resources.map((resource, index) => (
      <div className="flex-row" key={index}>
        <span className="text-zinc-50">
          <strong>{resource.id}</strong>: {resource.description} -{" "}
        </span>
        <span className="text-zinc-50">
          <strong>Condição</strong>: {resource.condition} -{" "}
        </span>
        <span className="text-zinc-50">
          <strong>Quantidade</strong>: {resource.quantity} -{" "}
        </span>
        <span className="text-zinc-50">
          <strong>Unidade de Medida</strong>: {resource.uom}
        </span>
      </div>
    ));
  }

  function consumptionRows() {
    return consumptions.map((consumption, index) => (
      <div className="flex-row" key={index}>
        <span className="text-zinc-50">
          {products.find((p) => p.id === consumption.product_id).description} -{" "}
        </span>
        <span className="text-zinc-50">
          {resources.find((p) => p.id === consumption.resource_id).description}{" "}
          -{" "}
        </span>
        <span className="text-zinc-50">
          {consumption.quantity} 
        </span>
      </div>
    ));
  }

  function processSimplex() {
    let problemToProcess = {
      fo: {
        objective: "",
        uom: "",
        function_elements: [],
      },
      productions: [],
      resources: [],
      algorithms: [],
      solutions: [],
    };

    //FO
    problemToProcess.fo.objective = objective;
    problemToProcess.fo.uom = foUom;

    products.forEach((product) => {
      problemToProcess.fo.function_elements.push(product.id.toString());

      //Productions
      product.consumptions = [];
      consumptions.forEach((c) => {
        if (c.product_id === product.id && c != null) {
          product.consumptions.push({
            resource_id: c.resource_id,
            quantity: c.quantity,
          });
        }
      });
      problemToProcess.productions.push(product);

      //Resources
      problemToProcess.resources = resources;
      let result = processCase(problemToProcess);
      setResultState(result);
      // console.log(result);
    });
  }

  function translateResult(result) {
    switch (result) {
      case "great":
        return "Ótima";
      case "ok":
        return "OK, mas não ótima";
      case "not great":
        return "Não ótima";
      default:
        return "Não identificado";
    }
  }

  return {
    productsRows,
    objective,
    resourcesRows,
    consumptionProductId,
    processSimplex,
    translateResult,
    consumptionRows,
    addConsumption,
    addResource,
    resultState,
    addProduct,
    consumptionQuantity,
    resourceDescription,
    consumptionResourceId,
    resourceUom,
    resourceQuantity,
    resourceCondition,
    productPrice,
    productCost,
    setFoUom,
    productDescription,
    setObjective,
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
    consumptionQuantity,
    setConsumptionQuantityState,
  };
}
