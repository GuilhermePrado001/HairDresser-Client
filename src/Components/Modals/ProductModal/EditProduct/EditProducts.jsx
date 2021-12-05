import "./EditProduct.scss";
import React from "react";
import { Modal, Spin } from "antd";

import FormTemplate from "../FormTemplate";
import { useState } from "react/cjs/react.development";

function EditProduct({
  editProductVisibility,
  setEditProductVisibility,
  setProductListVisibility,
  productId,
  setProductId,
}) {
  const [isLoad, setIsLoad] = useState(false);

  return (
    <>
      <Modal
        title="Editar Usúario"
        visible={editProductVisibility}
        footer={false}
        bodyStyle={{ height: 552 }}
        width={600}
        destroyOnClose={true}
        closable={false}
      >
        {!isLoad ? (
          <FormTemplate
            productId={productId}
            setEditProductVisibility={setEditProductVisibility}
            setProductListVisibility={setProductListVisibility}
            setProductId={setProductId}
            setIsLoad={setIsLoad}
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

export default EditProduct;
