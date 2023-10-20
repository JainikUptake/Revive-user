import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const CustomModal = ({ isOpen, toggle, title, message }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        {message}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>OK </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;
