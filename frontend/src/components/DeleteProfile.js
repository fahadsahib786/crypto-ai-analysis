import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(true);
  const handleShow = () => setShow(true);

  return (
    <>

<Modal show={handleShow} onHide={handleClose}
      style={{
        marginTop:'120px'
      }}
      >
        <Modal.Header >
          <Modal.Title>Delete account ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to permenantly delete your account ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleClose}>
Yes          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;