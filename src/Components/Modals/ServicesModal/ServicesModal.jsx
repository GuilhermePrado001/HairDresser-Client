import "./ServicesModal.scss";
import React, { useEffect, useState } from "react";
import { Modal, Table, Button } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import AddServices from "./AddServices/AddServices";
import NumberFormat from "react-number-format";
import EditServices from "./EditServices/EditServices";
import { GetAllServices, DeleteService } from "../../../Models/Services";

function ServicesModal({ isVisible, setIsVisible }) {
  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tempo",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Preço",
      dataIndex: "price",
      key: "price",
      render: (text, record) => (
        <>
          <NumberFormat
            thousandSeparator={true}
            displayType="text"
            value={record?.price}
          />
        </>
      ),
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "addractionsess",
      render: (text, record) => (
        <>
          <div>
            <EditTwoTone
              onClick={() => {
                setServiceId(record.id);
                setEditServicesVisibility(true);
                setIsVisible(false);
              }}
              className="edit-icon"
            />
            <DeleteTwoTone
              onClick={() => deleteHandler(record)}
              className="delete-icon"
            />
          </div>
        </>
      ),
    },
  ];

  const [addServicesVisibility, setAddServicesVisibility] = useState();
  const [editServicesVisibility, setEditServicesVisibility] = useState();
  const [serviceId, setServiceId] = useState();
  const [data, setData] = useState();

  const deleteHandler = async (record) => {
    var result = await DeleteService(record.id);
    console.log(result);
    if (result) {
      setData(data.filter((e) => e.id !== record.id));
    }
  };

  useEffect(() => {
    if (isVisible) {
      (async () => {
        var data = await GetAllServices();
        setData(data.filter((item) => !item.isDeleted));
      })();
    }
  }, [isVisible]);

  const handleOkUserModal = () => {
    setIsVisible(false);
  };

  const handleCancelUserModal = () => {
    setIsVisible(false);
  };

  return (
    <>
      <Modal
        title="Gerenciador de Produtos"
        visible={isVisible}
        onOk={handleOkUserModal}
        onCancel={handleCancelUserModal}
        bodyStyle={{ height: 500 }}
        width={600}
        closable={false}
      >
        <Button
          size="small"
          type="primary"
          className="mb-2"
          onClick={() => {
            setAddServicesVisibility(!addServicesVisibility);
            setIsVisible(false);
          }}
        >
          Incluir Serviço
        </Button>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          scroll={{ y: 350 }}
          size="small"
        />
      </Modal>
      <AddServices
        addServicesVisibility={addServicesVisibility}
        setAddServicesVisibility={setAddServicesVisibility}
        setServicesListVisibility={setIsVisible}
      />
      <EditServices
        editServicesVisibility={editServicesVisibility}
        setEditServicesVisibility={setEditServicesVisibility}
        setServicesListVisibility={setIsVisible}
        serviceId={serviceId}
        setServiceId={setServiceId}
      />
    </>
  );
}

export default ServicesModal;
