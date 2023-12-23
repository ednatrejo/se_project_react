import React from "react";
import { useEffect, useRef } from "react";
import "./ModalWithForm.css";

const ModalWithForm = ({
  title,
  children,
  buttonText = "Add garment",
  onClose,
  name,
  isOpen,
  setActiveModal,
}) => {
  const ref = useRef();

  const handleOutsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActiveModal();
  };

  return (
    <div className={`modal modal_type_${name}`} onClick={handleOutsideClick}>
      <div className="modal__content" ref={ref}>
        <button
          className="modal__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <h3 className="modal__title">{title}</h3>
        <form setActiveModal={handleSubmit}>
          {children}
          <button className="modal__button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
