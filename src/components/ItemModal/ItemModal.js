import "./ItemModal.css";
import { Modal } from "../Modal/Modal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useContext, useRef } from "react";

const ItemModal = ({
  selectedCard,
  name,
  onClose,
  handleOpenConfirmModal,
  ...props
}) => {
  const ref = useRef();

  // const handleOutsideClick = (e) => {
  //   if (ref.current && !ref.current.contains(e.target)) {
  //     onClose();
  //   }
  // };

  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = selectedCard.owner === currentUser?._id;
  const itemDeleteButtonClassName = `item__delete-button ${
    isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"
  }`;

  return (
    <Modal name={name} onClose={onClose}>
      <div className="modal__content-card" ref={ref}>
        {/* <button
          className="image__close-button"
          type="button"
          onClick={onClose}
        ></button> */}
        <img
          className="modal__image"
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
        />
        <div className="modal__info-wrapper">
          <div className="modal__info">
            <p className="modal__info-name">{selectedCard.name}</p>
            <p className="modal__info-weather">
              Weather type: {selectedCard.weather}
            </p>
          </div>
          <button
            type="text"
            className={itemDeleteButtonClassName}
            onClick={handleOpenConfirmModal}
          >
            Delete Item
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ItemModal;
