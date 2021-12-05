import React, { useState, useEffect, useContext } from "react";
import { SettingsContext } from "../../Context/SettingsContext";
import ProductItens from "../ProductItens/ProductItens";

const ProductsList = () => {
  const { productList } = useContext(SettingsContext);
  return (
    <div className="card mt-2 mb-3">
      <div className="card-body">
        <header>
          <h5 className="text-center">Nossos Produtos</h5>
        </header>
        <div className="row">
          {productList.map((p, i) => {
            return <ProductItens key={i} products={p} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
