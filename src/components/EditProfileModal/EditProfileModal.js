import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({ onClose, updateUser }) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatar, setAvatar] = useState("");
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser({ name, avatar });
  };

  useEffect(() => {
    setName(currentUser.name);
    setAvatar(currentUser.avatar);
  }, [currentUser.name, currentUser.avatar]);

  return (
    <ModalWithForm
      name="edit-profile"
      title="Change profile data"
      onClose={onClose}
      buttonText="Save changes"
      onSubmit={onSubmit}
    >
      <div>
        <label htmlFor="name-input" className="modal__input-title">
          Name*
        </label>
        <input
          id="name-input"
          className="modal__input"
          type="text"
          name="name"
          placeholder={currentUser.name}
          minLength="1"
          maxLength="45"
          required
          value={name}
          onChange={handleNameChange}
        ></input>
      </div>

      <div>
        <label htmlFor="avatar-input" className="modal__input-title">
          Avatar *
        </label>
        <input
          id="avatar-input"
          className="modal__input"
          type="url"
          name="url"
          placeholder={currentUser.avatar}
          minLength="1"
          maxLength="500"
          required
          value={avatar}
          onChange={handleAvatarChange}
        ></input>
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
