import "./EditServices.scss";
import React from "react";
import { Modal } from "antd";

import FormTemplate from "../FormTemplate";

function EditServices({
  editServicesVisibility,
  setEditServicesVisibility,
  setServicesListVisibility,
  setServiceId,
  serviceId,
}) {
  return (
    <>
      <Modal
        title="Editar Usúario"
        visible={editServicesVisibility}
        footer={false}
        bodyStyle={{ height: 552 }}
        width={600}
        destroyOnClose={true}
        closable={false}
      >
        <FormTemplate
          serviceId={serviceId}
          setEditServicesVisibility={setEditServicesVisibility}
          setServicesListVisibility={setServicesListVisibility}
          setServiceId={setServiceId}
        />
      </Modal>
    </>
  );
}

export default EditServices;
