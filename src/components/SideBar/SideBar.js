import "./SideBar.css";
import avatarImage from "../../images/avatar.svg";

const SideBar = () => {
  const username = "Terrence Tegegne";
  const avatar = "";
  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar-logo"
        src={avatarImage}
        alt="Avatar Logo"
      />
      <div className="sidebar__username">{username}</div>
    </div>
  );
};

export default SideBar;
