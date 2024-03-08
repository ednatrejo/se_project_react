import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useContext } from "react";
import { useForm } from "../../hooks/useForm";

const EditProfileModal = ({ onClose, isOpen, onSubmit, isLoading }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({});

  const [name, setName] = useState("");
  const handleEditName = (e) => {
    setName(e.target.value);
  };

  const [avatar, setAvatar] = useState("");
  const handleEditAvatar = (e) => {
    setAvatar(e.target.value);
  };
};

export default EditProfileModal;
