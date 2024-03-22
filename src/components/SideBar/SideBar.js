import { useContext } from "react";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const SideBar = ({ handleEditProfileModal, handleLogout }) => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar__wrapper">
      <div className="sidebar">
        <img
          className="sidebar__avatar-logo"
          src={currentUser?.avatar}
          alt={currentUser?.name}
        />
        <h3 className="sidebar__username">{currentUser?.name}</h3>
      </div>
      <div className="sidebar__button-wrapper">
        <button className="sidebar__button" onClick={handleEditProfileModal}>
          Change Profile Data
        </button>
        <button className="sidebar__button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default SideBar;
