import "./AddUserModal.scss";
import React from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Typography,
  Checkbox,
  message,
} from "antd";
import { AddUsers } from "../../../../Models/User";
import NumberFormat from "react-number-format";

function AddUserModal({
  addUserVisible,
  setAddUserVisible,
  setUserListVisible,
}) {
  const onFinish = async (values) => {
    const data = await AddUsers(values);

    if (data) {
      message.success("Usuário cadastrado com Sucesso!");
      setAddUserVisible(false);
      setUserListVisible(true);
    } else {
      message.error("Usuário Já cadastrado anteriormente");
    }
  };

  const addForm = () => {
    return (
      <Form name="nest-messages" onFinish={onFinish}>
        <Form.Item name={"UserName"} rules={[{ required: true }]}>
          <Input name="UserName" placeholder="Nome" />
        </Form.Item>
        <Form.Item name={"Email"} rules={[{ type: "email", required: true }]}>
          <Input name="Email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Verifique se seu numero esta correto e com o DDD",
            },
          ]}
          hasFeedback
        >
          <NumberFormat
            format="(##)# ####-####"
            customInput={Input}
            placeholder="Telefone"
          />
        </Form.Item>

        <Form.Item
          name={"Password"}
          rules={[{ required: true, message: "Insira sua senha!" }]}
        >
          <Input name="Password" placeholder="Senha" type="password" />
        </Form.Item>
        <Form.Item
          name={"ConfirmPassword"}
          dependencies={["Password"]}
          rules={[
            {
              required: true,
              message: "Repita sua senha!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("Password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("As Senhas devem ser iguais!");
              },
            }),
          ]}
        >
          <Input
            name="ConfirmPassword"
            placeholder="Confirmar Senha"
            type="password"
          />
        </Form.Item>
        <Form.Item
          valuePropName="checked"
          name={"isAdmin"}
          rules={[{ required: false }]}
        >
          <Checkbox name="isAdmin"> É um Administrador? </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="mr-4 mt-2">
            Salvar
          </Button>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => handleCancel()}
          >
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const handleCancel = () => {
    setAddUserVisible(false);
  };

  return (
    <>
      <Modal
        title="Incluir Usúario"
        visible={addUserVisible}
        footer={false}
        bodyStyle={{ height: 552 }}
        width={600}
        destroyOnClose={true}
        closable={false}
      >
        {addForm()}
      </Modal>
    </>
  );
}

export default AddUserModal;
