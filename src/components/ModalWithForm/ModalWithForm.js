import { useRef } from "react";
import { Modal } from "../Modal/Modal";
import "./ModalWithForm.css";

const ModalWithForm = ({ name, onClose, onSubmit, ...props }) => {
  const ref = useRef();

  // const handleOutsideClick = (e) => {
  //   if (ref.current && !ref.current.contains(e.target)) {
  //     onClose();
  //   }
  // };

  return (
    <Modal name={name} onClose={onClose}>
      <div className="modal__content-form" ref={ref}>
        <h3 className="modal__title">{props.title}</h3>
        <form onSubmit={onSubmit}>{props.children}</form>
      </div>
    </Modal>
  );
};

export default ModalWithForm;
