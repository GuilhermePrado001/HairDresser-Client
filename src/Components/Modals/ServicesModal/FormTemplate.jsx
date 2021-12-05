import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import NumberFormat from "react-number-format";
import {
  AddServices,
  GetServiceById,
  UpdateServices,
} from "../../../Models/Services";
import { useState } from "react/cjs/react.development";

function FormTemplate({
  setAddServicesVisibility,
  setServicesListVisibility,
  setEditServicesVisibility,
  setServiceId,
  serviceId,
}) {
  const [form] = Form.useForm();
  const [currentService, setCurrentService] = useState();

  useEffect(() => {
    (async () => {
      if (serviceId) {
        var result = await GetServiceById(serviceId);
        setCurrentService(result);
        form.setFieldsValue(result);
      }
    })();
  }, []);

  const handleCancelAddForm = () => {
    if (setEditServicesVisibility) {
      setEditServicesVisibility(false);
    } else {
      setAddServicesVisibility(false);
    }
    setServicesListVisibility(true);
  };

  const onFinish = async (values) => {
    if (!currentService) {
      await AddServices(values);
    } else {
      values.id = serviceId;
      await UpdateServices(values);
    }

    handleCancelAddForm();
  };

  return (
    <>
      <Form name="nest-messages" onFinish={onFinish} form={form}>
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input placeholder="Nome do Serviço" name="name" maxLength="20" />
        </Form.Item>
        <Form.Item name="time" rules={[{ required: true }]}>
          <NumberFormat
            name="time"
            customInput={Input}
            placeholder="HH:MM"
            thousandSeparator={true}
            format="##:##"
          />
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
