import "../SalonForm/SalonForm.scss";
import React, { useContext, useState } from "react";
import { Form, Input, Modal, Button, message, Spin } from "antd";
import { CreateSalon } from "../../Models/Salon";
import { UserContext } from "../../Context/UserContext";
import NumberFormat from "react-number-format";

const SalonForm = ({ hasSalon, setHasSalon }) => {
  const [form] = Form.useForm();

  const { loggedUser } = useContext(UserContext);
  const [isLoad, setIsLoad] = useState(false);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const onFinish = async (values) => {
    setIsLoad(true);

    values.ownerId = loggedUser?.profile?.sub;
    const msg = await CreateSalon(values);

    if (msg) {
      message.success("Salão criado com sucesso!");

      setTimeout(() => {
        setHasSalon(false);
        window.location.reload();
      }, 500);
    } else {
      message.error(
        "Algo deu errado, entre em contato com os administradores!"
      );
    }
  };

  return (
    <Modal
      title="Cadastre seu salão"
      visible={hasSalon}
      footer={null}
      closable={false}
      maskClosable={false}
    >
      {!isLoad ? (
        <div className="card mt-2 mb-3">
          <div className="card-body">
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{
                residence: ["zhejiang", "hangzhou", "xihu"],
                prefix: "86",
              }}
              scrollToFirstError
            >
              <Form.Item
                name="salonName"
                label="Nome do Salão"
                rules={[
                  {
                    required: true,
                    message: "Digite o nome do seu salão!",
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="owner"
                label="Nome do Propietario"
                rules={[
                  {
                    required: true,
                    message: "Digite o nome do propietario!",
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
              <Form.Item name="cnpj" label="CNPJ">
                <NumberFormat format="##.###.###/####-##" customInput={Input} />
              </Form.Item>
              <Form.Item
                name="neighborhood"
                label="Bairro"
                rules={[
                  {
                    required: true,
                    message: "Digite o nome bairro onde seu salão se localiza!",
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="street"
                label="Rua"
                rules={[
                  {
                    required: true,
                    message: "Digite o nome da rua onde seu salão se localiza!",
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="zipCode"
                label="CEP"
                rules={[
                  {
                    required: true,
                    message: "Digite o CEP da rua onde seu salão se localiza!",
                  },
                ]}
                hasFeedback
              >
                <NumberFormat format="#####-###" customInput={Input} />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Verifique se seu numero esta correto e com o DDD",
                  },
                ]}
                hasFeedback
              >
                <NumberFormat format="(##)# ####-####" customInput={Input} />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 16, offset: 8 },
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      ) : (
        <>
          <div className="form-load">
            <Spin size="default" />
          </div>
        </>
      )}
    </Modal>
  );
};

export default SalonForm;
