import "./ItemModal.css";

import React, { useContext, useRef } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

const ItemModal = ({ selectedCard, onClose, handleOpenConfirmModal }) => {
  const ref = useRef();

  const handleOutsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      onClose();
    }
  };

  const { currentUser } = useContext(CurrentUserContext);

  // Checking if the current user is the owner of the current clothing item

  const isOwn = selectedCard.owner === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button

  const itemDeleteButtonClassName = `item__delete-button ${
    isOwn ? "item__delete-button_visible" : "item__delete-button_hidden"
  }`;

  return (
    <div className="modal" onClick={handleOutsideClick}>
      <div className="modal__content-card" ref={ref}>
        <button
          className="image__close-button"
          type="button"
          onClick={onClose}
        ></button>

        <img
          className="modal__image"
          alt={selectedCard.name}
          src={selectedCard.imageUrl}
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
            className="modal__delete-button_visible"
            onClick={handleOpenConfirmModal}
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
