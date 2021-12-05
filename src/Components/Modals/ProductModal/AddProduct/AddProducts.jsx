import "./AddProduct.scss";
import React from "react";
import { Modal, Spin } from "antd";

import FormTemplate from "../FormTemplate";
import { useState } from "react/cjs/react.development";

function AddProducts({
  addProductVisibility,
  setAddProductVisibility,
  setProductListVisibility,
}) {
  const [isLoad, setIsLoad] = useState(false);
  return (
    <>
      <Modal
        title="Adicionar Produto"
        visible={addProductVisibility}
        footer={false}
        bodyStyle={{ height: 552 }}
        width={600}
        destroyOnClose={true}
        closable={false}
      >
        {!isLoad ? (
          <FormTemplate
            setIsLoad={setIsLoad}
            setAddProductVisibility={setAddProductVisibility}
            setProductListVisibility={setProductListVisibility}
          />
        ) : (
          <>
            <div className="form-load">
              <Spin size="default" />
            </div>
          </>
        )}
      </Modal>
    </>
  );
}

export default AddProducts;
