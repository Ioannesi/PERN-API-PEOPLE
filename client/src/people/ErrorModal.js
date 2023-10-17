import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ErrorModal = ({ error, onClear }) => {
  return (
    <Modal show={!!error} onHide={onClear}>
      <Modal.Header closeButton>
        <Modal.Title>Error Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-danger">{error}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="default" onClick={onClear}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorModal;