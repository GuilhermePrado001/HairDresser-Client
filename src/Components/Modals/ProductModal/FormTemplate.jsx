import React, { useState } from "react";
import { Modal, Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toBase64 } from "../../../Helpers/CommonFunctions";
import {
  AddProduct,
  GetProductById,
  UpdateProduct,
} from "../../../Models/Products";
import { useContext, useEffect } from "react/cjs/react.development";
import { UserContext } from "../../../Context/UserContext";
import NumberFormat from "react-number-format";
import { SettingsContext } from "../../../Context/SettingsContext";

function FormTemplate({
  setAddProductVisibility,
  setProductListVisibility,
  productId,
  setEditProductVisibility,
  setIsLoad,
}) {
  const [base64File, setBase64File] = useState();
  const { userConfig } = useContext(UserContext);
  const { loadProducts } = useContext(SettingsContext);

  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      if (productId) {
        form.setFieldsValue({
          imageForm: null,
        });

        var data = await GetProductById(productId);

        if (data) {
          form.setFieldsValue(data);
        }
      }
    })();
  }, []);

  const handleCancelAddForm = () => {
    if (setAddProductVisibility) {
      setProductListVisibility(true);
      setAddProductVisibility(false);
    }

    if (setEditProductVisibility) {
      setProductListVisibility(true);
      setEditProductVisibility(false);
    }
  };

  const onFinish = async (values) => {
    setIsLoad(true);
    values.image = base64File;
    values.storeId = userConfig.storeId;
    values.price = values.price;

    if (!productId) {
      await AddProduct(values);
    } else {
      values.id = productId;
      await UpdateProduct(values);
    }

    loadProducts();
    handleCancelAddForm();

    setTimeout(() => {
      setIsLoad(false);
    }, 500);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const beforeUpload = async (file, fileList) => {
    const base64 = await toBase64(file);
    setBase64File(base64);
    return true;
  };

  return (
    <>
      <Form name="nest-messages" onFinish={onFinish} form={form}>
        <Form.Item name="name" rules={[{ required: true, max: 16 }]}>
          <Input name="name" placeholder="Nome do Produto" maxLength={16} />
        </Form.Item>
        <Form.Item name="price" rules={[{ required: true }]}>
          <NumberFormat
            customInput={Input}
            placeholder="Preço"
            thousandSeparator={true}
            name="price"
            prefix={"R$ "}
          />
        </Form.Item>
        <Form.Item
          name="imageForm"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true }]}
        >
          <Upload
            multiple={false}
            customRequest={({ file, onSuccess }) => onSuccess("ok")}
            accept="image/*"
            beforeUpload={(file, fileList) => beforeUpload(file, fileList)}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>
              Clique aqui para selecionar a foto do produto
            </Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="mr-4 mt-2">
            Salvar
          </Button>
          <Button type="primary" onClick={() => handleCancelAddForm()}>
            Voltar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default FormTemplate;
