import "./UserModal.scss";
import React, { useContext, useEffect, useState } from "react";
import { Modal, Table, Button } from "antd";
import { DeleteUser, GetUsers } from "../../../Models/User";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { UserContext } from "../../../Context/UserContext";
import EditModal from "./EditModal/EditModal";
import AddUserModal from "./AddUserModal/AddUserModal";

function UserModal({ isVisible, setIsVisible }) {
  const { loggedUser } = useContext(UserContext);

  const columns = [
    {
      title: "Nome",
      dataIndex: "userName",
      key: "name",
    },
    {
      title: "E-Mail",
      dataIndex: "email",
      key: "age",
    },
    {
      title: "Ações",
      dataIndex: "address",
      key: "address",
      render: (text, record) => (
        <>
          <div>
            <EditTwoTone
              onClick={() => editHandler(record)}
              className="edit-icon"
            />
            {loggedUser?.profile.sub !== record?.id && (
              <DeleteTwoTone
                onClick={() => deleteHandler(record)}
                className="delete-icon"
              />
            )}
          </div>
        </>
      ),
    },
  ];

  const [editVisible, setEditVisible] = useState(false);
  const [addUserVisible, setAddUserVisible] = useState(false);
  const [userEdit, setUserEdit] = useState();
  const [data, setData] = useState();

  const deleteHandler = async (record) => {
    const result = await DeleteUser(record?.email);

    if (result) {
      setData(data.filter((e) => e.email !== record?.email));
    }
  };

  const editHandler = async (record) => {
    setUserEdit(record);
    setEditVisible(true);
  };

  useEffect(() => {
    if (isVisible) {
      (async () => {
        setData(await GetUsers());
      })();
    }
  }, [isVisible]);

  const handleOkUserModal = () => {
    setIsVisible(false);
  };

  const handleCancelUserModal = () => {
    setIsVisible(false);
  };

  const addUserButton = () => {
    setAddUserVisible(true);
    setIsVisible(false);
  };

  return (
    <>
      <Modal
        title="Gerenciar Usúarios"
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
          onClick={() => addUserButton()}
        >
          Incluir Usuario
        </Button>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          scroll={{ y: 350 }}
          size="small"
        />
      </Modal>
      <AddUserModal
        addUserVisible={addUserVisible}
        setAddUserVisible={setAddUserVisible}
        setUserListVisible={setIsVisible}
      />
      <EditModal
        editVisible={editVisible}
        setEditVisible={setEditVisible}
        currentUser={userEdit}
      />
    </>
  );
}

export default UserModal;
