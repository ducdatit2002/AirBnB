import React, { useState } from "react";
import { Button, Modal } from "antd";
import FormUser from "./FormUser";
export default function ModalUpdateUser({ dataUser }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Update
      </Button>
      <Modal footer={false} open={isModalOpen} onCancel={handleCancel}>
        <FormUser setIsModalOpen={setIsModalOpen} dataUser={dataUser} />
      </Modal>
    </>
  );
}
