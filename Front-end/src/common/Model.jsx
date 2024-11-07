import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../components/admin/productsAdmin.scss";
import "./middleware.scss";
import { CiCircleQuestion } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
function Model(props) {
  const [show, setShow] = useState(false);
  const { handleSubmit, textheader, textbody, textfooter, id } = props;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}
      <NavLink
        variant="primary"
        className="btn-primary Create-submit"
        onClick={handleShow}
      >
        {textheader}
      </NavLink>
      <Modal
        className="Modal"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal title</Modal.Title> */}
        </Modal.Header>
        <Modal.Body className="Body">
          <CiCircleQuestion className="body-icon" />
          {textbody}
        </Modal.Body>
        <Modal.Footer className="Footer">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="Footer-Close"
          >
            Đóng
          </Button>

          <Button
            variant="primary"
            onClick={() => {
              handleSubmit(id);
              handleClose();
            }}
            type="submit"
            className="Footer-Save"
          >
            {textfooter}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Model;
