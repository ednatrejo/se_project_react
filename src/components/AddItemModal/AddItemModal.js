import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ onClose, onAddItem, isOpen, onSubmit }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [imageUrl, setUrl] = useState("");
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const [weather, setWeatherType] = useState("");

  const handleWeatherChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = () => {
    onAddItem({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      title="New Garment"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText="Add Garment"
    >
      <label>
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          minLength="1"
          maxLength="30"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Image
        <input
          className="modal__input"
          type="url"
          name="imageUrl"
          minLength="1"
          maxLength="999"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleUrlChange}
        />
      </label>
      <p className="modal__label_header">Select the weather type:</p>
      <div className="modal__label_selectors">
        <div>
          <input
            type="radio"
            id="hot"
            name="options"
            value="hot"
            onChange={handleWeatherChange}
          />
          <label htmlFor="hot">Hot</label>
        </div>
        <div>
          <input
            type="radio"
            id="warm"
            name="options"
            value="warm"
            onChange={handleWeatherChange}
          />
          <label htmlFor="warm">Warm</label>
        </div>
        <div>
          <input
            type="radio"
            id="cold"
            name="options"
            value="cold"
            onChange={handleWeatherChange}
          />
          <label htmlFor="cold">Cold</label>
          <div className="button-container">
            <button type="submit" className="add__garment-btn">
              Add Garment
            </button>
          </div>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
