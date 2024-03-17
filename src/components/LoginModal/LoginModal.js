import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const LoginModal = ({ onClose, handleRegisterModal, onSubmit, isLoading }) => {
  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp(values);
  };

  return (
    <ModalWithForm title="Log In" onClose={onClose} onSubmit={handleSubmit}>
      <label>
        Email
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
        Password
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

      <button className="modal__button" type="submit">
        {isLoading ? "Logging In..." : "Log In"}
      </button>
      <button
        className="modal__button-alt"
        type="button"
        onClick={handleRegisterModal}
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
