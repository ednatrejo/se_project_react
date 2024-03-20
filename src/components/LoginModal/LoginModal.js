import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { Link, withRouter } from "react-router-dom";

const LoginModal = ({
  onClose,
  isOpen,
  handleUserLogin,
  onSignUp,
  handleSignUpModal,
}) => {
  const { values, handleChange, setValues } = useForm({});
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    handleUserLogin({ email, password });
  };

  return (
    <ModalWithForm
      className="login__modal"
      title="Login"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleLogin}
    >
      <label className="modal__label" htmlFor="email">
        <p className="modal__header">Email</p>
        <input
          id="email"
          className="modal__input modal__input_type_login-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
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
          onChange={handlePasswordChange}
        />
      </label>
      <div className="button-container">
        <button type="submit" className="modal__button">
          Next
        </button>
        <div>
          <button
            type="button"
            className="modal__button-alt"
            onClick={onSignUp}
          >
            or Register
          </button>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default withRouter(LoginModal);
