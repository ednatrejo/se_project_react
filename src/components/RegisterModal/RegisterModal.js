import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const RegisterModal = ({
  handleLoginModal,
  onClose,
  onSubmit,
  isOpen,
  isLoading,
}) => {
  const { values, handleChange, setValues } = useForm({});

  useEffect(() => {
    setValues("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      onClose={onClose}
      isOpen={isOpen}
      onSignUp={handleSubmit}
    >
      <label>
        Email*
        <input
          className="modal__input"
          type="email"
          name="email"
          minLength="1"
          maxLength="30"
          placeholder="Email"
          value={values.email || ""}
          required
          onChange={handleChange}
        />
      </label>
      <label>
        Password*
        <input
          className="modal__input"
          type="password"
          name="password"
          minLength="8"
          maxLength="30"
          placeholder="Password"
          value={values.password || ""}
          required
          onChange={handleChange}
        />
      </label>
      <label>
        Name*
        <input
          className="modal__input"
          type="name"
          name="name"
          minLength="2"
          maxLength="30"
          placeholder="Name"
          value={values.name || ""}
          required
          onChange={handleChange}
        />
      </label>
      <label>
        Avatar URL*
        <input
          className="modal__input"
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar || ""}
          required
          onChange={handleChange}
        />
      </label>
      <button className="modal__button" type="submit">
        {isLoading ? "Submitting..." : "Sign Up"}
      </button>
      <button
        className="modal__button-alt"
        type="button"
        onClick={handleLoginModal}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
