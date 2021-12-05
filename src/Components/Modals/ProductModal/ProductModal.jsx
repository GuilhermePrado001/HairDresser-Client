import "./ProductModal.scss";
import React, { useContext, useEffect, useState } from "react";
import { Modal, Table, Button } from "antd";
import { DeleteProduct } from "../../../Models/Products";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import AddProducts from "./AddProduct/AddProducts";
import { SettingsContext } from "../../../Context/SettingsContext";
import NumberFormat from "react-number-format";
import EditProduct from "./EditProduct/EditProducts";

function ProductModal({ isVisible, setIsVisible }) {
  const { productList, setProductList } = useContext(SettingsContext);

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
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
              onClick={() => editUserButton(record)}
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

  const [addProductVisibility, setAddProductVisibility] = useState();
  const [editProductVisibility, setEditProductVisibility] = useState();
  const [productId, setProductId] = useState(null);
  const [disableSomeItens, setDisableSomeItens] = useState(false);

  const deleteHandler = async (record) => {
    setDisableSomeItens(true);
    const result = await DeleteProduct(record.id);

    if (result) {
      setProductList(productList.filter((e) => e.id !== record?.id));
    }

    setDisableSomeItens(false);
  };

  useEffect(() => {
    if (isVisible) {
    }
  }, [isVisible]);

  const handleOkUserModal = () => {
    setIsVisible(false);
  };

  const handleCancelUserModal = () => {
    setIsVisible(false);
  };

  const addUserButton = () => {
    setAddProductVisibility(true);
    setIsVisible(false);
  };

  const editUserButton = (record) => {
    setProductId(record.id);
    setEditProductVisibility(true);
    setIsVisible(false);
  };

  return (
    <>
      <Modal
        title="Gerenciador de Produtos"
        visible={isVisible}
        onOk={handleOkUserModal}
        okButtonProps={{ disabled: disableSomeItens }}
        onCancel={handleCancelUserModal}
        cancelButtonProps={{ disabled: disableSomeItens }}
        bodyStyle={{ height: 500 }}
        width={600}
        closable={false}
        maskClosable={!disableSomeItens}
      >
        <Button
          size="small"
          type="primary"
          className="mb-2"
          onClick={() => addUserButton()}
          disabled={disableSomeItens}
        >
          Incluir Produto
        </Button>
        <Table
          dataSource={productList}
          columns={columns}
          pagination={false}
          scroll={{ y: 350 }}
          size="small"
        />
      </Modal>
      <AddProducts
        addProductVisibility={addProductVisibility}
        setAddProductVisibility={setAddProductVisibility}
        setProductListVisibility={setIsVisible}
      />
      <EditProduct
        editProductVisibility={editProductVisibility}
        setEditProductVisibility={setEditProductVisibility}
        setProductListVisibility={setIsVisible}
        productId={productId}
        setProductId={setProductId}
      />
    </>
  );
}

export default ProductModal;
