import "./EditModal.scss";
import React, { useEffect } from "react";
import { Modal, Button, Form, Input } from "antd";
import { UpdateUsers } from "../../../../Models/User";
import NumberFormat from "react-number-format";

function EditModal({ editVisible, setEditVisible, currentUser }) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(currentUser);
  }, [currentUser]);

  const onFinish = async (values) => {
    await UpdateUsers(values);
  };

  const editForm = () => {
    return (
      <Form
        name="nest-messages"
        onFinish={onFinish}
        initialValues={currentUser}
      >
        <Form.Item name={"email"} rules={[{ type: "email", required: true }]}>
          <Input name="email" placeholder="Email" />
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
    setEditVisible(false);
  };

  return (
    <>
      <Modal
        title="Editar Usúario"
        visible={editVisible}
        footer={false}
        bodyStyle={{ height: 552 }}
        width={600}
        destroyOnClose={true}
        closable={false}
      >
        {editForm()}
      </Modal>
    </>
  );
}

export default EditModal;
