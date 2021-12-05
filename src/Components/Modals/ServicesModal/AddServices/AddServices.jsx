import "./AddServices.scss";
import React from "react";
import { Modal } from "antd";

import FormTemplate from "../FormTemplate";

function AddServices({
  addServicesVisibility,
  setAddServicesVisibility,
  setServicesListVisibility,
}) {
  return (
    <>
      <Modal
        title="Adicionar Produto"
        visible={addServicesVisibility}
        footer={false}
        bodyStyle={{ height: 552 }}
        width={600}
        destroyOnClose={true}
        closable={false}
      >
        <FormTemplate
          setAddServicesVisibility={setAddServicesVisibility}
          setServicesListVisibility={setServicesListVisibility}
        />
      </Modal>
    </>
  );
}

export default AddServices;
